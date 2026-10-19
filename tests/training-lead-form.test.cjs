const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function load(filename, mocks = {}) {
  const output = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const exports = {};
  vm.runInNewContext(output, { exports, require: name => mocks[name] || require(name) });
  return exports;
}
const validators = load('src/lib/validators.ts');
const source = ts.transpileModule(fs.readFileSync('src/components/TrainingLeadForm.tsx', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
}).outputText;
function harness(values, fetch, compact = false) {
  const state = [];
  const exports = {};
  vm.runInNewContext(source, {
    exports, fetch,
    FormData: class { get(name) { return values[name] ?? null; } },
    require: name => ({
      react: { useId: () => 'test', useRef: () => ({ current: false }), useState: initial => {
        const index = state.length; state.push(initial); return [initial, value => { state[index] = value; }];
      } },
      '@/lib/validators': validators,
      '@/lib/booking': { BOOKING_URL: 'https://example.com/booking' },
      './TrainingLeadForm.module.css': {},
      'react/jsx-runtime': { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) },
    })[name],
  });
  const form = exports.default({ courseName: 'Codex研修', sourcePath: '/training/codex', compact });
  let focused = false;
  return { state, form, submit: () => form.props.onSubmit({ preventDefault() {}, currentTarget: { querySelector: () => ({ focus() { focused = true; } }) } }), focused: () => focused };
}
(async () => {
  const valid = { company: '株式会社テスト', name: '山田', email: 'test@example.com', privacy: 'on', purpose: '受講申し込みの相談' };
  const compact = harness(valid, async () => ({ ok: true, json: async () => ({ ok: true }) }), true);
  function inputs(node) {
    if (!node || typeof node !== 'object') return [];
    const children = [node.props?.children].flat(Infinity);
    return [...(node.props?.name ? [node] : []), ...children.flatMap(inputs)];
  }
  const compactFields = inputs(compact.form);
  assert.equal(compactFields.find(field => field.props.name === 'purpose').props.value, '無料相談・見積もり');
  assert.ok(!compactFields.some(field => ['phone', 'message'].includes(field.props.name)));
  assert.ok(['company', 'name', 'email', 'privacy'].every(name => compactFields.some(field => field.props.name === name && field.props.required)));
  await compact.submit();
  assert.equal(compact.state[0], 'success');
  let calls = 0;
  const invalid = harness({ ...valid, email: 'invalid' }, async () => { calls++; });
  await invalid.submit();
  assert.equal(calls, 0);
  assert.ok(invalid.state[1].email);
  assert.ok(invalid.focused());
  const noConsent = harness({ ...valid, privacy: null }, async () => { calls++; });
  await noConsent.submit();
  assert.ok(noConsent.state[1].privacy);
  assert.equal(calls, 0);
  let resolve;
  const pending = harness(valid, async (_url, request) => {
    calls++;
    const payload = JSON.parse(request.body);
    assert.equal(payload.service, 'education');
    assert.equal(payload.inquiryType, 'business');
    assert.match(payload.message, /Codex研修/);
    assert.match(payload.message, /\/training\/codex/);
    assert.match(payload.message, /受講申し込みの相談/);
    assert.equal(Object.keys(validators.validateContactForm(payload)).length, 0);
    return new Promise(done => { resolve = done; });
  });
  const first = pending.submit();
  await pending.submit();
  assert.equal(calls, 1, 'duplicate submissions must be blocked');
  resolve({ ok: true, json: async () => ({ ok: true }) });
  await first;
  assert.equal(pending.state[0], 'success');
  const failed = harness(valid, async () => { throw new Error('offline'); });
  await failed.submit();
  assert.equal(failed.state[0], 'idle');
  assert.match(failed.state[1]._form, /接続/);
  const serverError = harness(valid, async () => ({ ok: false, json: async () => ({ errors: { email: 'メールを確認してください。' } }) }));
  await serverError.submit();
  assert.equal(serverError.state[1].email, 'メールを確認してください。');
  assert.ok(serverError.state[1]._form);
  console.log('training-lead-form: validation, context, consent, duplicate prevention, success, network and server errors passed');
})().catch(error => { console.error(error); process.exitCode = 1; });
