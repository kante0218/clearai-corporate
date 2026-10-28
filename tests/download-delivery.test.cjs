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
assert.equal(buildDownloadDelivery(['training','company','software-development','claude-code']), null);
const all = buildDownloadDelivery([...DOCUMENT_KEYS,'training',DOCUMENT_KEYS[0]]);
assert.equal(all.files.length, 5);
assert.equal(all.title,'事業紹介資料 5点セット');
assert.match(all.zipUrl,/clearai-guides-current\.zip$/);
for(const content of [all.text,all.html,all.title,JSON.stringify(all.files)]) assert.doesNotMatch(content,/AI内製化研修|Claude Code研修|ai-training-guide|company-guide|software-development-guide|8資料|8点/);
const single=buildDownloadDelivery(['meo']);assert.equal(single.zipUrl,null);assert.equal(single.files.length,1);
const files=Object.values(DOCUMENT_FILES).sort();
const zip=JSON.parse(execFileSync('python3',['-c',`import zipfile,json,pathlib,hashlib
p=pathlib.Path('public/downloads');a=pathlib.Path('archive/downloads/pre-codex-only-20261028')
with zipfile.ZipFile(p/'${DOCUMENT_ZIP}') as current,zipfile.ZipFile(a/'clearai-guides.zip') as old:
 names=sorted(current.namelist())
 for n in names:
  assert current.read(n)==(p/n).read_bytes()==old.read(n)
 for n in ['company-guide.pdf','software-development-guide.pdf','ai-training-guide.pdf']:
  assert not (p/n).exists()
  assert (a/n).read_bytes()==old.read(n)
 assert not (p/'clearai-guides.zip').exists()
 print(json.dumps(names))`],{encoding:'utf8'}));
assert.deepEqual(zip,files);
const route=fs.readFileSync('src/app/api/download/route.ts','utf8');assert.match(route,/buildDownloadDelivery\(documents\)/);assert.match(route,/text,\s*html,/);
console.log('download delivery: 5 current PDFs, ZIP byte equality, retired files archived, receipt content and rejected retired keys passed; no sends');
