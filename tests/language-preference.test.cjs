const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const source = ts.transpileModule(fs.readFileSync('src/lib/i18n/LanguageContext.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX}}).outputText;
function harness(stored, blocked=false) {
  const state=[],effects=[],deps=[];let index=0;const storage={value:stored};const document={documentElement:{lang:'ja'}};
  const exports={};
  vm.runInNewContext(source,{exports,document,navigator:{language:'en-US'},window:{localStorage:{getItem(){if(blocked)throw Error('blocked');return storage.value},setItem(_key,value){if(blocked)throw Error('blocked');storage.value=value}}},require:name=>name==='react'?{createContext:()=>({Provider:'provider'}),useState(initial){const slot=index++;if(!(slot in state))state[slot]=initial;return[state[slot],v=>{state[slot]=typeof v==='function'?v(state[slot]):v}]},useEffect(fn,next){const slot=index++;if(!deps[slot]||next.some((v,i)=>v!==deps[slot][i]))effects.push(fn);deps[slot]=next}}:require(name)});
  function render(){index=0;return exports.LanguageProvider({children:'content'}).props.value}
  function settle(){let result;for(let n=0;n<4;n++){result=render();if(!effects.length)break;effects.splice(0).forEach(fn=>fn())}return result}
  return {render,settle,storage,document};
}
const fresh=harness(null);assert.equal(fresh.render().locale,'ja');assert.equal(fresh.settle().locale,'ja');assert.equal(fresh.storage.value,'ja');
for(const locale of ['ja','en','zh-CN','ko']){const h=harness(locale);const c=h.settle();assert.equal(c.locale,locale);assert.equal(h.document.documentElement.lang,locale)}
const invalid=harness('de');assert.equal(invalid.settle().locale,'ja');
const blocked=harness('en',true);assert.equal(blocked.settle().locale,'ja');
const changing=harness(null);changing.settle().setLang('ko');assert.equal(changing.settle().locale,'ko');assert.equal(changing.storage.value,'ko');changing.settle().setLang('de');assert.equal(changing.settle().locale,'ko');
console.log('language preference: Japanese first regardless of browser, 4 saved languages, invalid/storage failure and explicit selection passed');
