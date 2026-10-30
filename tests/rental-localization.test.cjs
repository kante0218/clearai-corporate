const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const messages=require('../src/lib/i18n/messages.json');
function load(file,mocks={}){const exports={};vm.runInNewContext(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2020,esModuleInterop:true}}).outputText,{exports,require:name=>mocks[name]||require(name),fetch:()=>{throw Error('No network permitted in render test')}});return exports}
const {translateText}=load('src/lib/i18n/localize.ts',{'./messages.json':messages});
const order=load('src/lib/robot-rental-order.ts');
const dates=load('src/app/robot-rental/apply/rental-date.ts');
for(const locale of ['ja','en','zh-CN','ko']){
 const Localized=load('src/components/LocalizedContent.tsx',{'@/lib/i18n/LanguageContext':{useLanguage:()=>({locale})},'@/lib/i18n/localize':{translateText}}).default;
 const Picker=load('src/app/robot-rental/apply/RentalDatePicker.tsx',{'@/components/LocalizedContent':{__esModule:true,default:Localized},'./rental-date':dates,'@/lib/i18n/LanguageContext':{useLanguage:()=>({locale})},'@/lib/i18n/localize':{translateText}}).default;
 const Form=load('src/app/robot-rental/apply/RentalApplicationForm.tsx',{'@/components/LocalizedContent':{__esModule:true,default:Localized},'@/lib/robot-rental-order':order,'./RentalDatePicker':{__esModule:true,default:Picker},'./rental-date':dates,'@/lib/i18n/LanguageContext':{useLanguage:()=>({locale})},'next/link':props=>React.createElement('a',props)}).default;
 const html=renderToStaticMarkup(React.createElement(Form,{initialSelection:order.parseRentalSelection({model:'g1',grade:'R&D',nights:'3',engineerPlan:'day'})}));
 assert.ok(html.includes(translateText('申込内容を入力',locale)));
 assert.ok(html.includes('value="g1" selected=""'));
 assert.match(html, /<option[^>]*selected=""[^>]*>R&amp;D<\/option>/);
 assert.ok(html.includes('name="email"'));
 assert.match(html, /<form[^>]*novalidate/i);
 assert.ok(html.includes('250,000'));
 assert.ok(html.includes(translateText('今日を選ぶ',locale)));
 assert.ok(html.includes(translateText('選択した利用日程',locale)));
 assert.ok(html.includes(translateText('次の月',locale)));
 if(locale !== 'ja') assert.ok(!html.includes('今日を選ぶ'));
 const selected=renderToStaticMarkup(React.createElement(Picker,{value:'2026-12-31',nights:2,onChange:()=>{}}));
 assert.ok(selected.includes(dates.formatRentalDate('2026-12-31',locale)));
 assert.ok(selected.includes(translateText('利用開始日',locale)));
}
console.log('rental localization: 4 render languages, stable model/grade/price and no network; guarded route not enabled');
