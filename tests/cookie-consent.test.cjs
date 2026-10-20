const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const path = require('node:path');
const ts = require('typescript');
const filename = path.resolve('src/lib/cookie-consent.ts');
const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const compiled = new Module(filename, module);
compiled.filename = filename;
compiled.paths = Module._nodeModulePaths(path.dirname(filename));
compiled._compile(source, filename);
const { readCookieConsent, consentCookie, validMeasurementId, canLoadAnalytics, enableAnalytics, disableAnalytics, sanitizedAnalyticsUrl, trackPageView, reconcileAnalyticsConsent, isAnalyticsPage } = compiled.exports;
const test = require('node:test');

test('consent parser rejects absent, malformed and older cookie values', () => {
  for (const value of ['', 'other=v1:accepted', 'clearai-cookie-consent=accepted', 'clearai-cookie-consent=v2:accepted', 'clearai-cookie-consent=v1:rejected-extra']) assert.equal(readCookieConsent(value), null);
  assert.equal(readCookieConsent('other=x; clearai-cookie-consent=v1:accepted'), 'accepted');
  assert.equal(readCookieConsent('clearai-cookie-consent=v1:rejected; other=x'), 'rejected');
});
test('cookie is path-wide, SameSite=Lax, 180 days and Secure on HTTPS', () => {
  assert.equal(consentCookie('accepted', true), 'clearai-cookie-consent=v1:accepted; Max-Age=15552000; Path=/; SameSite=Lax; Secure');
  assert.ok(!consentCookie('rejected', false).includes('Secure'));
});
test('measurement is allowed only with explicit consent and a valid GA4 ID', () => {
  for (const id of [undefined, '', 'UA-12345', 'G-test', 'G-XXXXXXXXXX', 'G-0000000000', 'G-YOURGAID', 'G-ABC12&x=y', '<script>']) {
    assert.equal(validMeasurementId(id), null);
    assert.equal(canLoadAnalytics('accepted', id), false);
  }
  assert.equal(canLoadAnalytics(null, 'G-ABCDE12345'), false);
  assert.equal(canLoadAnalytics('rejected', 'G-ABCDE12345'), false);
  assert.equal(canLoadAnalytics('accepted', 'G-ABCDE12345'), true);
});
test('no script before consent; one script after opt-in; revocation preserves necessary cookies', () => {
  let cookies = 'clearai-cookie-consent=v1:rejected';
  const writes = [], scripts = [];
  let reloads = 0;
  global.window = { location: { hostname: 'www.clearai.jp', pathname: '/about', href: 'https://www.clearai.jp/about?token=secret#private', reload() { reloads++; } } };
  global.document = {
    referrer: 'https://example.com/referrer?email=private#secret',
    get cookie() { return cookies; }, set cookie(value) { writes.push(value); },
    getElementById: () => scripts[0],
    createElement: () => ({ remove() { scripts.pop(); } }),
    head: { appendChild(script) { scripts.push(script); } },
  };
  enableAnalytics('G-ABCDE12345');
  assert.equal(scripts.length, 0);
  cookies = 'clearai-cookie-consent=v1:accepted';
  enableAnalytics(undefined);
  assert.equal(scripts.length, 0);
  enableAnalytics('G-ABCDE12345');
  enableAnalytics('G-ABCDE12345');
  assert.equal(scripts.length, 1);
  assert.equal(scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=G-ABCDE12345');
  assert.equal(window.dataLayer[0][2].ad_storage, 'denied');
  assert.equal(window.dataLayer[2][2].allow_google_signals, false);
  assert.equal(window.dataLayer[2][2].send_page_view, false);
  assert.equal(window.dataLayer[2][2].page_location, 'https://www.clearai.jp/about');
  assert.equal(window.dataLayer[2][2].page_referrer, 'https://example.com/referrer');
  trackPageView('G-ABCDE12345');
  window.location.href = 'https://www.clearai.jp/contact?token=next-secret';
  trackPageView('G-ABCDE12345');
  assert.equal(window.dataLayer.at(-1)[2].page_location, 'https://www.clearai.jp/contact');
  assert.ok(!JSON.stringify(window.dataLayer).includes('secret'));
  cookies += '; _ga=test; _ga_ABCDE12345=test; rental-identity=keep';
  cookies = cookies.replace('v1:accepted', 'v1:rejected');
  const eventsBeforeRejection = window.dataLayer.length;
  trackPageView('G-ABCDE12345');
  assert.equal(window.dataLayer.length, eventsBeforeRejection);
  reconcileAnalyticsConsent('G-ABCDE12345');
  assert.equal(reloads, 1);
  assert.equal(window['ga-disable-G-ABCDE12345'], true);
  assert.equal(scripts.length, 0);
  assert.ok(writes.some(value => value.includes('Domain=clearai.jp')));
  assert.ok(writes.every(value => value.startsWith('_ga')));
  delete global.window;
  delete global.document;
});

test('analytics URLs never include query, fragments, credentials or non-http protocols', () => {
  assert.equal(sanitizedAnalyticsUrl('https://example.com/path?secret=value#private'), 'https://example.com/path');
  assert.equal(sanitizedAnalyticsUrl('https://user:pass@example.com/path?secret=value'), 'https://example.com/path');
  assert.equal(sanitizedAnalyticsUrl('javascript:alert(1)'), '');
  assert.equal(sanitizedAnalyticsUrl(''), '');
});

test('rental application, identity and checkout return routes never allow analytics', () => {
  for (const pathname of ['/robot-rental/apply', '/robot-rental/apply/complete', '/robot-rental/apply/identity']) assert.equal(isAnalyticsPage(pathname), false);
  assert.equal(isAnalyticsPage('/robot-rental'), true);
  let loaded = false;
  global.window = { location: { pathname: '/robot-rental/apply/complete' } };
  global.document = { cookie: 'clearai-cookie-consent=v1:accepted', getElementById: () => null, createElement() { loaded = true; } };
  enableAnalytics('G-ABCDE12345');
  trackPageView('G-ABCDE12345');
  assert.equal(loaded, false);
  delete global.window;
  delete global.document;
});
