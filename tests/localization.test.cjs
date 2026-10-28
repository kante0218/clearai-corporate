const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const messages = require('../src/lib/i18n/messages.json');
function load(file, mocks = {}) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2020,esModuleInterop:true}}).outputText, {exports,require:name=>mocks[name]||require(name)});
  return exports;
}
const { translateText } = load('src/lib/i18n/localize.ts', {'./messages.json':messages});
for(const [source,values] of Object.entries(messages)) for(const locale of ['en','zh-CN','ko']) {
  assert.ok(values[locale]?.trim(),`${source}: ${locale}`);
  assert.doesNotMatch(values[locale],/QX\d{4}|\[\d{4}\]/);
}
assert.equal(translateText('  会社概要  ','zh-CN'),'  公司简介  ');
assert.equal(translateText('company@example.com','ko'),'company@example.com');
assert.equal(translateText('未登録の原文','zh-CN'),'未登録の原文');
assert.equal(translateText('会社概要','ja'),'会社概要');
const onSubmit=()=>{};const onChange=()=>{};const form=React.createElement('form',{key:'stable',onSubmit},React.createElement('input',{key:'email',value:'test@example.com',onChange}),React.createElement('option',{key:'service',value:'robot-rental'},'ロボットレンタル'),React.createElement('p',{'data-original-language':'ja'},'会社概要'));
const Localized=load('src/components/LocalizedContent.tsx',{'@/lib/i18n/LanguageContext':{useLanguage:()=>({locale:'zh-CN'})},'@/lib/i18n/localize':{translateText}}).default;
const result=Localized({children:form});
assert.equal(result.key,'stable');assert.equal(result.props.onSubmit,onSubmit);
assert.equal(result.props.children[0].props.value,'test@example.com');assert.equal(result.props.children[0].props.onChange,onChange);assert.equal(result.props.children[0].key,'email');
assert.equal(result.props.children[1].props.value,'robot-rental');assert.equal(result.props.children[1].props.children,'机器人租赁');assert.equal(result.props.children[2].props.children,'会社概要');
for(const [key,amount] of [['50万円','500,000'],['150万円','1,500,000']]) assert.ok(messages[key].en.includes(amount));
assert.ok(messages['AIR / PRO はソフトウェア開発不可。2次開発が可能なのは R&D のみです。']['zh-CN'].includes('不支持'));
console.log(`localization: ${Object.keys(messages).length} entries, fallback, stable identity, form values/handlers and monetary scope passed`);
function checkClientPages(directory) {
  for (const entry of fs.readdirSync(directory,{withFileTypes:true})) {
    const file=require('node:path').join(directory,entry.name);
    if(entry.isDirectory()) checkClientPages(file);
    else if(file.endsWith('.tsx')) {
      const text=fs.readFileSync(file,'utf8');
      if(!/^['"]use client['"]/.test(text.trimStart())) continue;
      const ast=ts.createSourceFile(file,text,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
      for(const statement of ast.statements) if(ts.isFunctionDeclaration(statement)&&statement.modifiers?.some(m=>m.kind===ts.SyntaxKind.DefaultKeyword)) assert.ok(!statement.modifiers.some(m=>m.kind===ts.SyntaxKind.AsyncKeyword),`Async client page: ${file}`);
    }
  }
}
checkClientPages('src');
