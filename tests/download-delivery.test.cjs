const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const { execFileSync } = require('node:child_process');
const ts = require('typescript');
const prior = require.extensions['.ts'];
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, filename);
const { buildDownloadDelivery, DOCUMENT_FILES, DOCUMENT_ZIP } = require(path.resolve('src/lib/download-delivery.ts'));
const { DOCUMENT_KEYS } = require(path.resolve('src/lib/validators.ts'));
if (prior) require.extensions['.ts'] = prior; else delete require.extensions['.ts'];
assert.deepEqual(DOCUMENT_KEYS, ['meo', 'software-development', 'robot-rental', 'training']);
assert.equal(buildDownloadDelivery(['aio', 'website-production', 'sns-management', 'company', 'claude-code']), null);
const all = buildDownloadDelivery([...DOCUMENT_KEYS,'aio',DOCUMENT_KEYS[0]]);
assert.equal(all.files.length, 4);
assert.equal(all.title,'事業紹介資料 4点セット');
assert.match(all.zipUrl,/clearai-guides-current\.zip$/);
for (const content of [all.text, all.html, all.title, JSON.stringify(all.files)]) assert.doesNotMatch(content, /AIO・|ホームページ制作|SNS運用代行/);
const single=buildDownloadDelivery(['meo']);assert.equal(single.zipUrl,null);assert.equal(single.files.length,1);
const files=Object.values(DOCUMENT_FILES).sort();
const zip=JSON.parse(execFileSync('python3',['-c',`import zipfile,json,pathlib,hashlib
p=pathlib.Path('public/downloads')
with zipfile.ZipFile(p/'${DOCUMENT_ZIP}') as current:
 names=sorted(current.namelist())
 for n in names:
  assert current.read(n)==(p/n).read_bytes()
 print(json.dumps(names))`],{encoding:'utf8'}));
assert.deepEqual(zip,files);
const route=fs.readFileSync('src/app/api/download/route.ts','utf8');assert.match(route,/buildDownloadDelivery\(documents\)/);assert.match(route,/text,\s*html,/);
const page=fs.readFileSync('src/components/DownloadPageContent.tsx','utf8');
assert.doesNotMatch(page, /guide-preview-title|guideMetadata|配布を停止/);
const form=fs.readFileSync('src/components/DownloadRequestForm.tsx','utf8');
assert.doesNotMatch(form, /d\.lead/);
console.log('download delivery: four requested PDFs, ZIP byte equality, receipt content, rejected removed keys and simplified UI passed; no sends');
