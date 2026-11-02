const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const trustedMeoContactIds = new WeakMap(), notifications = [], relay = [];
const exportsObject = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/app/api/contact/route.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,{
  exports:exportsObject, require:name=>name==='@/lib/meo-onboarding'?{trustedMeoContactIds}:name==='@/lib/validators'?{validateContactForm:()=>({}),INQUIRY_TYPES:['business'],SERVICE_KEYS:['meo'],SERVICE_LABELS:{meo:'MEO'},DOCUMENT_KEYS:[],DOCUMENT_LABELS:{}}:name==='resend'?{Resend:class{emails={send:async(...args)=>{notifications.push(args);return{data:{id:'test'}}}}}}:require(name),
  process:{env:{CONTACT_DASHBOARD_ENDPOINT:'https://relay.example',CONTACT_INGEST_SECRET:'secret',RESEND_API_KEY:'test'}},
  Request,Response,Headers,TextEncoder,AbortSignal,console:{log(){},error(){},warn(){}},
  fetch:async(url,options)=>{relay.push(JSON.parse(options.body));return Response.json({ok:true})},
});
(async()=>{
  const body={inquiryType:'business',service:'meo',company:'店舗',name:'山田',email:'test@example.com',message:'MEO'};
  const request=()=>new Request('https://clearai.jp/api/contact',{method:'POST',body:JSON.stringify(body),headers:{'X-MEO-Submission-ID':'attacker'}});
  const trustedId='12345678-1234-4234-a234-123456789012';
  for(let i=0;i<2;i++){const req=request();trustedMeoContactIds.set(req,trustedId);assert.equal((await exportsObject.POST(req)).status,200)}
  assert.equal(relay[0].submissionId,trustedId);
  assert.equal(relay[1].submissionId,trustedId);
  assert.equal(notifications[0][1].idempotencyKey,`meo-contact/${trustedId}`);
  assert.equal(notifications[1][1].idempotencyKey,`meo-contact/${trustedId}`);
  assert.equal((await exportsObject.POST(request())).status,200);
  assert.equal(notifications[2][1],undefined,'generic contact behavior unchanged; user headers cannot set trusted ids');
  assert.notEqual(relay[2].submissionId,'attacker');
  console.log('meo-contact-idempotency: stable trusted relay/mail ids, generic contact isolation passed');
})().catch(error=>{console.error(error);process.exitCode=1});
