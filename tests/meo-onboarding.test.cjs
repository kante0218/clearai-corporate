const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const sent = [], requests = [];
let onboardingBody = {setup_url:'https://dashboard.example/auth/setup?token=secret'}, mailError = null;
const env = { MEO_DASHBOARD_URL:'https://dashboard.example', MEO_ONBOARDING_SECRET:'test-secret', RESEND_API_KEY:'test-key', CONTACT_FROM_EMAIL:'ClearAI <info@clearai.jp>' };
const exportsObject = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/meo-onboarding.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,{
  exports:exportsObject, require: name => name === './booking' ? {BOOKING_URL:'https://timerex.net/s/test'} : name === 'resend' ? {Resend:class {emails={send:async(...args)=>{sent.push(args);return {error:mailError}}}}} : require(name),
  process:{env}, Request, Response, URL, AbortSignal,
  fetch:async(url,options)=>{requests.push({url,options});return Response.json(onboardingBody)},
});
const application={applicationId:'id',email:'test@example.com',name:'山田',company:'テスト社',store:'店舗',location:'東京都'};
(async()=>{
  let result=await exportsObject.sendMeoSetupInvitation(application);
  assert.equal(result.account_ready,undefined);
  assert.equal(result.setup_url,undefined);
  assert.equal(result.dashboard_url,'https://dashboard.example/account.html');
  assert.equal(requests[0].options.headers.Authorization,'Bearer test-secret');
  assert.equal(JSON.parse(requests[0].options.body).applicationId,'id');
  assert.match(sent[0][0].text,/https:\/\/dashboard.example\/auth\/setup\?token=secret/);
  assert.match(sent[0][0].text,/https:\/\/timerex.net/);
  assert.equal(sent[0][1].idempotencyKey,'meo-setup/id');
  onboardingBody={setup_url:null};
  result=await exportsObject.sendMeoSetupInvitation(application);
  assert.equal(result.account_ready,undefined);
  assert.equal(sent.length,2);
  assert.equal(sent[1][1].idempotencyKey,'meo-signin/id');
  assert.match(sent[1][0].text,/https:\/\/dashboard.example\/account.html/);
  assert.match(sent[1][0].text,/リンクが期限切れ/);
  assert.match(sent[1][0].text,/再設定メールを申請/);
  assert.doesNotMatch(sent[1][0].text,/アカウントは設定済み/);
  assert.doesNotMatch(sent[1][0].text,/token=secret/);
  onboardingBody={setup_url:'https://attacker.example/setup'};
  await assert.rejects(()=>exportsObject.sendMeoSetupInvitation(application));
  assert.equal(sent.length,2);
  onboardingBody={setup_url:'https://dashboard.example/auth/setup?token=secret'};
  mailError={message:'delivery failed'};
  await assert.rejects(()=>exportsObject.sendMeoSetupInvitation(application));
  env.CONTACT_FROM_EMAIL='onboarding@resend.dev';
  assert.throws(()=>exportsObject.meoOnboardingConfig());
  console.log('meo-onboarding: trusted origin, idempotent mail, existing accounts and truthful failures passed');
})().catch(error=>{console.error(error);process.exitCode=1});
