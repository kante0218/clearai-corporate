const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function load(file, mocks = {}) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, { exports, require: name => mocks[name] || require(name), Request, Response, Headers, TextEncoder });
  return exports;
}
const validators = load('src/lib/validators.ts');
const application = load('src/lib/meo-application.ts', { './validators': validators });
const valid = { company: 'テスト会社', store: 'テスト店舗', location: '東京都港区', name: '山田', email: 'test@example.com', privacy: true, acknowledged: true };
assert.equal(Object.keys(application.prepareMeoApplication(valid).errors).length, 0);
for (const field of ['company', 'store', 'location', 'name', 'email', 'privacy', 'acknowledged']) {
  assert.ok(application.prepareMeoApplication({ ...valid, [field]: '' }).errors[field], field);
}
assert.ok(application.prepareMeoApplication({ ...valid, details: 'a'.repeat(3001) }).errors.details);
const payload = application.prepareMeoApplication(valid).payload;
assert.equal(payload.service, 'meo');
assert.match(payload.message, /MEO支援のお申し込み/);
assert.match(payload.message, /テスト店舗/);
assert.match(payload.message, /6か月/);
let received;
const route = load('src/app/api/meo/apply/route.ts', {
  '@/lib/meo-application': application,
  '@/app/api/contact/route': { POST: async request => { received = await request.json(); return Response.json({ ok: true }); } },
});
(async () => {
  const send = body => route.POST(new Request('https://clearai.jp/api/meo/apply', { method: 'POST', body: JSON.stringify(body) }));
  assert.equal((await send({ ...valid, privacy: false })).status, 400);
  assert.equal(received, undefined, 'invalid applications must never reach delivery');
  assert.equal((await send(valid)).status, 200);
  assert.equal(received.service, 'meo');
  assert.match(received.message, /テスト店舗/);
  assert.equal((await send({ details: 'a'.repeat(21000) })).status, 413);
  assert.equal((await send([])).status, 400);
  console.log('meo-application: required fields, consent, limits, plan, actual delivery handoff passed');
})().catch(error => { console.error(error); process.exitCode = 1; });
