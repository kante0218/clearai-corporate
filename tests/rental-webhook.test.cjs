const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const path = require('node:path');
const ts = require('typescript');
const Stripe = require('stripe');

const webhookSecret = 'whsec_rental_webhook_test';
process.env.STRIPE_WEBHOOK_SECRET = webhookSecret;
const updates = [];
let updateFails = false;
const stripe = new Stripe('sk_test_rental_webhook');
stripe.customers.update = async (...args) => {
  if (updateFails) throw new Error('simulated update failure');
  updates.push(args);
};

const filename = path.resolve('src/app/api/stripe/webhook/route.ts');
const compiled = new Module(filename, module);
compiled.filename = filename;
compiled.paths = Module._nodeModulePaths(path.dirname(filename));
compiled.require = (id) => {
  if (id === '@/lib/stripe') return { getStripe: () => stripe };
  if (id === '@/lib/robot-rental-finalize') return {
    finalizeVerifiedRentalApplication: async () => { throw new Error('Unexpected identity finalization'); },
  };
  return require(id);
};
compiled._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText, filename);
const { POST } = compiled.exports;

async function deliver(type, overrides = {}, signatureOverride) {
  const body = JSON.stringify({
    id: 'evt_rental', object: 'event', type,
    data: { object: {
      id: 'cs_rental', customer: 'cus_rental', payment_intent: 'pi_rental',
      payment_status: 'paid', metadata: { application_type: 'robot_rental' },
      ...overrides,
    } },
  });
  const signature = signatureOverride ?? stripe.webhooks.generateTestHeaderString({ payload: body, secret: webhookSecret });
  return POST(new Request('https://clearai.jp/api/stripe/webhook', {
    method: 'POST', headers: { 'stripe-signature': signature }, body,
  }));
}

(async () => {
  for (const type of ['checkout.session.completed', 'checkout.session.async_payment_succeeded']) {
    const response = await deliver(type);
    assert.equal(response.status, 200);
    assert.deepEqual(updates.at(-1), ['cus_rental', { metadata: {
      application_status: 'paid_pending_availability',
      rental_checkout_session_id: 'cs_rental', rental_payment_intent_id: 'pi_rental',
    } }]);
  }
  assert.equal(updates.length, 2);
  for (const [type, overrides] of [
    ['checkout.session.completed', { payment_status: 'unpaid' }],
    ['checkout.session.async_payment_succeeded', { metadata: { application_type: 'other' } }],
    ['checkout.session.async_payment_failed', {}],
  ]) {
    assert.equal((await deliver(type, overrides)).status, 200);
    assert.equal(updates.length, 2);
  }
  assert.equal((await deliver('checkout.session.completed', {}, 'invalid')).status, 400);
  assert.equal(updates.length, 2);

  updateFails = true;
  const originalError = console.error;
  console.error = () => {};
  try {
    assert.equal((await deliver('checkout.session.async_payment_succeeded')).status, 500);
  } finally {
    console.error = originalError;
  }
  assert.equal(updates.length, 2);
  console.log('rental webhook: signed completed/async payments, ignored events, signature rejection and retry passed');
})().catch((error) => { console.error(error); process.exitCode = 1; });
