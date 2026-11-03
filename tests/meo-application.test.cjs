const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function load(file, mocks = {}) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, { exports, require: name => mocks[name] || require(name), Request, Response, Headers, TextEncoder, URL, AbortSignal, process: { env: {CONTACT_INGEST_SECRET:"test-secret"} }, fetch: mocks.fetch || global.fetch });
  return exports;
}
const validators = load('src/lib/validators.ts');
const application = load('src/lib/meo-application.ts', { './validators': validators });
const valid = { company: 'テスト会社', store: 'テスト店舗', location: '東京都港区', name: '山田', email: 'test@example.com', privacy: true, acknowledged: true, authority:true, scope:true, consentVersion:"2026-11-03" };
assert.equal(Object.keys(application.prepareMeoApplication(valid).errors).length, 0);
for (const field of ['company', 'store', 'location', 'name', 'email', 'privacy', 'acknowledged', 'authority', 'scope', 'consentVersion']) {
  assert.ok(application.prepareMeoApplication({ ...valid, [field]: '' }).errors[field], field);
}
for (const field of ['privacy','acknowledged','authority','scope']) assert.ok(application.prepareMeoApplication({...valid,[field]:'true'}).errors[field]);
assert.ok(application.prepareMeoApplication({...valid,consentVersion:'old'}).errors.consentVersion);
assert.ok(application.prepareMeoApplication({ ...valid, details: 'a'.repeat(3001) }).errors.details);
const payload = application.prepareMeoApplication(valid).payload;
assert.equal(payload.service, 'meo');
assert.match(payload.message, /MEO支援のお申し込み/);
assert.match(payload.message, /テスト店舗/);
assert.match(payload.message, /6か月/);
const onboarding = load('src/lib/meo-onboarding.ts', { './booking': { BOOKING_URL: 'https://timerex.net/s/test' } });
const applicationId = '12345678-1234-4234-a234-123456789012';
assert.equal(onboarding.meoSubmissionId('invalid', payload), null);
assert.equal(onboarding.meoSubmissionId(applicationId, payload), onboarding.meoSubmissionId(applicationId, payload));
assert.notEqual(onboarding.meoSubmissionId(applicationId, payload), onboarding.meoSubmissionId(applicationId, {...payload, email:'other@example.com'}));
let received, invites = 0, failInvitation = false, failPrepare = false, receivedFingerprint, receivedConsent;
const route = load('src/app/api/meo/apply/route.ts', {
  '@/lib/meo-application': application,
  '@/lib/meo-onboarding': { ...onboarding, prepareMeoAccount: async app => { receivedFingerprint=app.fingerprint; receivedConsent=app.consent; if (failPrepare) throw {status:429}; return {setup_url:'https://dashboard.example/setup'}; }, meoOnboardingConfig: () => ({}), sendMeoSetupInvitation: async () => { invites++; if (failInvitation) throw new Error('failed'); return {dashboard_url:'https://dashboard.example/account.html'}; } },
  '@/app/api/contact/route': { POST: async request => { received = await request.json(); return Response.json({ ok: true }); } },
});
(async () => {
  const send = body => route.POST(new Request('https://clearai.jp/api/meo/apply', { method: 'POST', body: JSON.stringify({ applicationId, ...body }) }));
  assert.equal((await send({ ...valid, privacy: false })).status, 400);
  assert.equal(received, undefined, 'invalid applications must never reach delivery');
  failPrepare = true;
  const limited = await send(valid);
  assert.equal(limited.status,429);
  assert.equal(received,undefined,'rate-limited applications cannot trigger internal contact notification');
  assert.equal(invites,0);
  failPrepare = false;
  const success = await send(valid);
  assert.match(receivedFingerprint,/^[0-9a-f]{64}$/);
  assert.equal(receivedConsent.version,'2026-11-03');
  for (const name of ['privacy','acknowledged','authority','scope']) assert.equal(receivedConsent[name],true);
  assert.match(receivedConsent.acceptedAt,/^\d{4}-\d{2}-\d{2}T/);
  assert.notEqual(receivedFingerprint,'unknown');
  assert.equal(success.status, 200);
  const successBody = await success.json();
  assert.equal(successBody.dashboard_url, 'https://dashboard.example/account.html');
  assert.equal(successBody.setup_url, undefined, 'setup tokens must never reach the client');
  assert.equal(successBody.account_ready,undefined,'existing account state must not reach client');
  assert.equal(invites, 1);
  const contactCount = invites;
  assert.equal((await send({...valid, website:'bot'})).status,200);
  assert.equal(invites,contactCount,'honeypot must not provision accounts or send emails');
  failInvitation = true;
  const partial = await send(valid);
  assert.equal(partial.status,502);
  assert.match((await partial.json()).errors._form,/内容は受け付けました/);
  failInvitation = false;
  assert.equal((await send({...valid, applicationId:'bad'})).status,400);
  assert.equal(received.service, 'meo');
  assert.match(received.message,/privacy=true, acknowledged=true, authority=true, scope=true/);
  assert.match(received.message,/サーバー受付日時：\d{4}-\d{2}-\d{2}T/);
  assert.match(received.message, /テスト店舗/);
  assert.equal((await send({ details: 'a'.repeat(21000) })).status, 413);
  assert.equal((await route.POST(new Request('https://clearai.jp/api/meo/apply',{method:'POST',body:'[]'}))).status, 400);
  console.log('meo-application: required fields, consent, limits, plan, actual delivery handoff passed');
})().catch(error => { console.error(error); process.exitCode = 1; });
