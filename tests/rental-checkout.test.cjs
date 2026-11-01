const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const messages = require('../src/lib/i18n/messages.json');
const completePage = fs.readFileSync('src/app/robot-rental/apply/complete/page.tsx', 'utf8');
for (const status of ['unavailable', 'paid', 'payment_processing', 'expired']) {
  const strings = completePage.split('\n').find(line => line.startsWith(`    ${status}: [`));
  assert.ok(strings, `Completion copy exists for ${status}`);
  for (const [, text] of strings.matchAll(/"([^"\n]+)"/g)) {
    for (const locale of ['en', 'zh-CN', 'ko']) assert.ok(messages[text]?.[locale], `${status} translation: ${locale}`);
  }
}

async function run({ existing = false, enabled = true, status = 'open', payment_status = 'unpaid', url = 'https://checkout.stripe.com/test', amount = '110000', rental_start = '2027-01-01', now = '2026-11-01T03:00:00Z' } = {}) {
  const created = [], updated = [], retrieved = [], expired = [];
  const checkout = { id: 'cs_test', status, payment_status, url };
  const customer = { id: 'cus_test', metadata: { amount_including_tax: amount, rental_start, model_name: 'Robot', rental_nights: '2', ...(existing ? { rental_checkout_session_id: 'cs_test' } : {}) } };
  const stripe = {
    customers: { retrieve: async () => customer, update: async (...args) => updated.push(args) },
    checkout: { sessions: { expire: async id => expired.push(id), retrieve: async id => { retrieved.push(id); return checkout; }, create: async (...args) => { created.push(args); return checkout; } } },
  };
  const exports = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/robot-rental-finalize.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, {
    exports, Date: class extends Date { static now() { return Date.parse(now); } }, process: { env: { NEXT_PUBLIC_ROBOT_RENTAL_APPLICATION_ENABLED: enabled ? 'true' : 'false' } },
    require: name => name === '@/lib/stripe' ? { getStripe: () => stripe } : name === '@/app/robot-rental/apply/rental-date' ? { minimumRentalStartDate: date => date ? '2027-01-02' : '2027-01-01', todayInJapan: () => '2026-11-01', addDays: () => '2026-11-02' } : {},
  });
  const result = await exports.finalizeVerifiedRentalApplication({ id: 'vs_test', status: 'verified', related_customer: 'cus_test' });
  return { result, created, updated, retrieved, expired };
}

(async () => {
  const created = await run();
  assert.equal(created.result.status, 'verified');
  assert.equal(created.created.length, 1);
  const [params, options] = created.created[0];
  assert.equal(params.line_items[0].price_data.unit_amount, 110000);
  assert.equal(params.expires_at, Date.parse('2026-11-02T00:00:00+09:00') / 1000);
  assert.equal(params.customer_update.address, 'auto');
  assert.equal(params.customer_update.shipping, undefined);
  assert.equal(params.shipping_address_collection, undefined);
  assert.equal(params.integration_identifier, 'clearai-rental-qwertyui');
  assert.equal(options.idempotencyKey, 'rental-checkout-vs_test');
  assert.equal(created.updated.length, 1);
  for (const [status, payment_status, expected] of [
    ['open', 'unpaid', 'verified'], ['complete', 'paid', 'paid'],
    ['complete', 'no_payment_required', 'paid'], ['complete', 'unpaid', 'payment_processing'],
    ['expired', 'unpaid', 'expired'],
  ]) {
    const test = await run({ existing: true, enabled: false, status, payment_status, url: status === 'open' ? 'https://checkout.stripe.com/test' : null });
    assert.equal(test.result.status, expected);
    assert.equal(test.result.checkoutUrl, expected === 'verified' ? 'https://checkout.stripe.com/test' : null);
    assert.equal(test.created.length, 0);
    assert.equal(test.updated.length, 0);
    assert.equal(test.retrieved.length, 1);
  }
  for (const rental_start of ['2026-12-31', '', undefined]) {
    for (const existing of [false, true]) {
      const nearTerm = await run({ rental_start: rental_start ?? '', existing });
      assert.equal(nearTerm.result.status, 'unavailable');
      assert.equal(nearTerm.result.checkoutUrl, null);
      assert.equal(nearTerm.created.length, 0);
      assert.equal(nearTerm.expired.length, existing ? 1 : 0);
    }
  }
  for (const [status, payment_status, expected] of [
    ['complete', 'paid', 'paid'], ['complete', 'unpaid', 'payment_processing'], ['expired', 'unpaid', 'expired'],
  ]) {
    const terminal = await run({ existing: true, rental_start: '2026-11-01', status, payment_status, url: null });
    assert.equal(terminal.result.status, expected);
    assert.equal(terminal.expired.length, 0);
  }
  const nearMidnight = await run({ now: '2026-11-01T14:45:00Z' });
  assert.equal(nearMidnight.result.status, 'unavailable');
  assert.equal(nearMidnight.created.length, 0);
  const farFuture = await run({ rental_start: '2027-01-02', now: '2026-11-01T14:45:00Z' });
  assert.equal(farFuture.created.length, 1);
  assert.equal(farFuture.created[0][0].expires_at, undefined);
  const thirtyMinutes = await run({ now: '2026-11-01T14:29:00Z' });
  assert.equal(thirtyMinutes.created.length, 1);
  const disabled = await run({ enabled: false });
  assert.equal(disabled.result.status, 'unavailable');
  assert.equal(disabled.created.length, 0);
  await assert.rejects(run({ amount: 'NaN' }), /Invalid rental amount/);
  await assert.rejects(run({ existing: true, status: null }), /Unknown checkout status/);
  await assert.rejects(run({ url: null }), /Checkout URL was not returned/);
  console.log('rental checkout: creation, trusted payment states, idempotence, amount, shipping and disabled gate passed');
})().catch(error => { console.error(error); process.exitCode = 1; });
