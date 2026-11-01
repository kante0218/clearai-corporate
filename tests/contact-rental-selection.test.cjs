const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
function load(file, mocks = {}, suffix = '') {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8') + suffix, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText, { exports, require: (name) => mocks[name] || require(name) });
  return exports;
}
const dates = load('src/app/robot-rental/apply/rental-date.ts');
const order = load('src/lib/robot-rental-order.ts', { '@/app/robot-rental/apply/rental-date': dates });
const validators = load('src/lib/validators.ts');
function prefill(query, lang = 'ja', existingMessage = '') {
  const states = [];
  const effects = [];
  const component = load('src/app/contact/page.tsx', {
    react: { ...React, useState: (initial) => {
      const index = states.length;
      states.push(index === 1 ? { ...initial, message: existingMessage } : initial);
      return [states[index], (update) => { states[index] = typeof update === 'function' ? update(states[index]) : update; }];
    }, useEffect: (effect) => effects.push(effect) },
    '@/components/LocalizedContent': { __esModule: true, default: ({ children }) => children },
    '@/lib/booking': { BOOKING_URL: 'https://example.com' },
    '@/lib/robot-rental-order': order,
    '@/lib/validators': validators,
    '@/lib/i18n/LanguageContext': { useLanguage: () => ({ lang }) },
    'next/navigation': { useSearchParams: () => new URLSearchParams(query) },
  }, '\nexports.ContactPageInner = ContactPageInner;');
  component.ContactPageInner();
  effects.forEach((effect) => effect());
  return states[1];
}
const query = 'service=robot-rental&model=go2&grade=R%26D&nights=3&engineerPlan=hourly&engineerHours=4';
const ja = prefill(query);
assert.equal(ja.service, 'robot-rental');
for (const text of ['Unitree Go2', 'R&D', '3泊4日', '4時間']) assert.ok(ja.message.includes(text), text);
const en = prefill(query, 'en');
for (const text of ['Unitree Go2', 'Grade: R&D', '3 night(s), 4 days', '4 hour(s)']) assert.ok(en.message.includes(text), text);
assert.equal(prefill(query, 'ja', '入力済みの相談内容').message, '入力済みの相談内容');
assert.equal(prefill('service=robot-rental&model=g1').message, 'Unitree G1の空き状況・利用条件（希望日：未定）について相談します。\n');
assert.ok(!prefill('service=website&model=g1&grade=R%26D&nights=3').message.includes('グレード'));
assert.equal(prefill('service=robot-rental&model=__proto__&grade=R%26D').message, '');
const invalid = prefill('service=robot-rental&model=go2&grade=invalid&nights=999&engineerPlan=invalid&engineerHours=999');
for (const text of ['グレード：Air', '1泊2日', '初日エンジニア帯同：1日']) assert.ok(invalid.message.includes(text), text);
console.log('contact rental prefill: bilingual selection, existing text, simple inquiry and invalid input passed');
