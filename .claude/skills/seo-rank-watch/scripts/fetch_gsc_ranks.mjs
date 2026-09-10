#!/usr/bin/env node
import { readFile, writeFile, rename, open, unlink, mkdtemp, rm } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { tmpdir } from 'node:os';
import { parseArgs } from 'node:util';
import assert from 'node:assert/strict';

const fail = (message) => { throw new Error(message); };
const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value);
const validMetric = (value) => Number.isFinite(value) && value >= 0;
const validRank = (value) => value === null || (Number.isFinite(value) && value >= 1);
const validResult = (row) => isObject(row) && typeof row.keyword === 'string' && typeof row.targetPath === 'string' && validRank(row.rank) && validMetric(row.impressions) && validMetric(row.clicks);
const readArray = async (path) => {
  const value = JSON.parse(await readFile(path, 'utf8'));
  if (!Array.isArray(value)) fail('SEO data must be JSON arrays.');
  return value;
};
function validateWatchwords(rows) {
  const seen = new Set();
  for (const row of rows) {
    if (!isObject(row) || typeof row.keyword !== 'string' || !row.keyword.trim() || row.keyword.length > 4096 || typeof row.targetPath !== 'string' || !row.targetPath.startsWith('/') || row.targetPath.startsWith('//') || /[?#\\]/.test(row.targetPath) || !Number.isInteger(row.priority) || row.priority < 1 || seen.has(row.keyword)) fail('Invalid or duplicate watchword. Use keyword, targetPath and priority (positive integer; 1 is highest).');
    seen.add(row.keyword);
  }
}
function validateHistory(rows) {
  for (const row of rows) {
    if (row?.source === 'websearch') {
      if (!Number.isFinite(Date.parse(row.capturedAt)) || typeof row.query !== 'string' || typeof row.note !== 'string' || !Array.isArray(row.urls) || !row.urls.every((url) => typeof url === 'string' && /^https?:\/\//.test(url)) || !Array.isArray(row.ranks) || !row.ranks.every((rank) => isObject(rank) && typeof rank.keyword === 'string' && typeof rank.targetPath === 'string' && rank.rank === null && rank.impressions === null && rank.clicks === null)) fail('Invalid WebSearch observation.');
      continue;
    }
    if (!isObject(row) || row.source !== 'gsc' || !Number.isFinite(Date.parse(row.capturedAt)) || !isObject(row.range) || !/^\d{4}-\d{2}-\d{2}$/.test(row.range.startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(row.range.endDate) || !Number.isInteger(row.range.days) || row.range.days < 1 || !isObject(row.scope) || !['siteUrl', 'device', 'country', 'type', 'dataState', 'timeZone'].every((key) => typeof row.scope[key] === 'string') || !Array.isArray(row.ranks) || !row.ranks.every(validResult) || !Array.isArray(row.discoveries) || !row.discoveries.every(validResult)) fail('Invalid rank-history record; nothing overwritten.');
  }
}
function dateRange(days, now) {
  const todayPT = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
  const end = new Date(`${todayPT}T00:00:00Z`);
  end.setUTCDate(end.getUTCDate() - 3);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - days + 1);
  return { startDate: start.toISOString().slice(0, 10), endDate: end.toISOString().slice(0, 10), days };
}
function metrics(row) {
  if (!row) return { rank: null, impressions: 0, clicks: 0 };
  if (!validMetric(row.impressions) || !validMetric(row.clicks) || !Number.isFinite(row.position) || row.position < 1) fail('Invalid GSC metrics; history unchanged.');
  return { rank: row.position, impressions: row.impressions, clicks: row.clicks };
}
async function collect(watchwords, days, siteUrl, query, now = new Date()) {
  const origin = siteUrl.startsWith('sc-domain:') ? `https://${siteUrl.slice(10)}` : new URL(siteUrl).origin;
  const range = dateRange(days, now);
  const scope = { siteUrl, device: 'all', country: 'all', type: 'web', dataState: 'final', timeZone: 'America/Los_Angeles', aggregationType: 'auto', dimensions: 'query,page' };
  const base = { startDate: range.startDate, endDate: range.endDate, type: scope.type, dataState: scope.dataState, aggregationType: scope.aggregationType, dimensions: ['query', 'page'] };
  async function rows(body) {
    const data = await query({ ...base, ...body });
    if (!isObject(data) || (data.rows !== undefined && !Array.isArray(data.rows))) fail('Invalid GSC response; history unchanged.');
    return data.rows ?? [];
  }
  const ranks = [];
  for (const word of watchwords) {
    const page = new URL(word.targetPath, origin).href;
    const result = await rows({ dimensionFilterGroups: [{ groupType: 'and', filters: [{ dimension: 'query', operator: 'equals', expression: word.keyword }, { dimension: 'page', operator: 'equals', expression: page }] }], rowLimit: 1 });
    if (result.length && (result[0].keys?.[0] !== word.keyword || result[0].keys?.[1] !== page)) fail('Unexpected GSC query/page response.');
    ranks.push({ keyword: word.keyword, targetPath: word.targetPath, ...metrics(result[0]) });
  }
  // ponytail: top 25,000 query/page rows only; paginate if discovery coverage needs grow.
  const found = await rows({ rowLimit: 25000 });
  const discoveries = [];
  for (const row of found) {
    if (!Array.isArray(row.keys) || row.keys.length !== 2 || !row.keys.every((key) => typeof key === 'string')) fail('Invalid GSC discovery row.');
    const page = new URL(row.keys[1]);
    if (page.origin !== origin || watchwords.some((word) => word.keyword === row.keys[0])) continue;
    discoveries.push({ keyword: row.keys[0], targetPath: page.pathname + page.search, ...metrics(row) });
  }
  return { source: 'gsc', capturedAt: now.toISOString(), range, scope, ranks, discoveries, discoveryRowLimit: 25000, discoveryMayBeIncomplete: true };
}
async function appendHistory(path, snapshot) {
  const lockPath = `${path}.lock`;
  const lock = await open(lockPath, 'wx');
  const temporary = `${path}.${process.pid}.tmp`;
  try {
    const previous = await readArray(path);
    validateHistory(previous);
    validateHistory([snapshot]);
    await writeFile(temporary, `${JSON.stringify([...previous, snapshot], null, 2)}\n`, { flag: 'wx' });
    await rename(temporary, path);
  } finally {
    await unlink(temporary).catch(() => {});
    await lock.close();
    await unlink(lockPath);
  }
}
async function selfTest() {
  const word = { keyword: 'AI 導入', targetPath: '/services', priority: 1 };
  validateWatchwords([word]);
  assert.throws(() => validateWatchwords([word, word]));
  assert.throws(() => validateWatchwords([{ ...word, targetPath: '//other.test' }]));
  const now = new Date('2026-09-11T01:00:00Z');
  const missing = await collect([word], 7, 'sc-domain:clearai.jp', async () => ({}), now);
  assert.deepEqual(missing.range, { startDate: '2026-09-01', endDate: '2026-09-07', days: 7 });
  assert.equal(missing.ranks[0].rank, null);
  const measured = await collect([word], 7, 'https://clearai.jp/', async (body) => {
    assert.equal(body.dataState, 'final');
    if (body.dimensionFilterGroups) {
      assert.equal(body.dimensionFilterGroups[0].filters[1].expression, 'https://clearai.jp/services');
      return { rows: [{ keys: [word.keyword, 'https://clearai.jp/services'], position: 1.04, impressions: 50, clicks: 3 }] };
    }
    return { rows: [{ keys: ['別の検索', 'https://clearai.jp/other'], position: 8, impressions: 12, clicks: 1 }] };
  }, now);
  assert.equal(measured.scope.siteUrl, 'https://clearai.jp/');
  assert.equal(measured.ranks[0].rank, 1.04);
  assert.equal(measured.discoveries[0].keyword, '別の検索');
  const directory = await mkdtemp(join(tmpdir(), 'seo-rank-watch-'));
  try {
    const path = join(directory, 'history.json');
    const fallback = { source: 'websearch', capturedAt: now.toISOString(), query: word.keyword, note: 'Approximate visibility only', urls: ['https://clearai.jp/services'], ranks: [{ keyword: word.keyword, targetPath: word.targetPath, rank: null, impressions: null, clicks: null }] };
    await writeFile(path, JSON.stringify([fallback, missing]));
    await appendHistory(path, measured);
    assert.deepEqual(await readArray(path), [fallback, missing, measured]);
    const before = await readFile(path, 'utf8');
    await assert.rejects(async () => appendHistory(path, await collect([word], 7, 'sc-domain:clearai.jp', async () => { throw new Error('API failed'); }, now)));
    assert.equal(await readFile(path, 'utf8'), before);
    await assert.rejects(() => collect([word], 7, 'sc-domain:clearai.jp', async () => ({ rows: 'invalid' }), now));
    await writeFile(path, '[{"invalid":true}]');
    await assert.rejects(() => appendHistory(path, measured));
    assert.equal(await readFile(path, 'utf8'), '[{"invalid":true}]');
  } finally { await rm(directory, { recursive: true, force: true }); }
  console.log('SEO Rank Watch self-test passed: exact filters, PT dates, missing data, unrounded ranks, discovery, append preservation, API and invalid-input failures.');
}
async function main() {
  const { values } = parseArgs({ options: { repo: { type: 'string' }, days: { type: 'string', default: '28' }, append: { type: 'boolean' }, 'self-test': { type: 'boolean' } }, strict: true });
  if (values['self-test']) return selfTest();
  const days = Number(values.days);
  if (!values.repo || !Number.isInteger(days) || days < 1 || days > 365) fail('Usage: --repo <path> [--days 1..365] [--append], or --self-test');
  const directory = resolve(values.repo, 'data/seo');
  const words = await readArray(join(directory, 'watchwords.json'));
  validateWatchwords(words);
  validateHistory(await readArray(join(directory, 'rank-history.json')));
  const siteUrl = process.env.GSC_SITE_URL || 'https://clearai.jp/';
  if (!/^(sc-domain:[a-zA-Z0-9.-]+|https?:\/\/[^\s]+)$/.test(siteUrl)) fail('Invalid GSC_SITE_URL.');
  const { GoogleAuth } = await import('google-auth-library');
  const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/webmasters.readonly'] });
  const client = await auth.getClient();
  const snapshot = await collect(words, days, siteUrl, async (body) => {
    const response = await client.request({ url: `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, method: 'POST', data: body });
    return response.data;
  });
  if (values.append) await appendHistory(join(directory, 'rank-history.json'), snapshot);
  console.log(JSON.stringify(snapshot, null, 2));
}
main().catch(() => {
  console.error('SEO Rank Watch failed. No snapshot appended. Check arguments, JSON schema, ADC or GOOGLE_APPLICATION_CREDENTIALS, and GSC property access. Error details are suppressed to protect credentials.');
  process.exitCode = 1;
});
