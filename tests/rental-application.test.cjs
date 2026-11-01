const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const path = require('node:path');
const ts = require('typescript');

function load(relativePath, imports = {}) {
  const filename = path.resolve(relativePath);
  const compiled = new Module(filename, module);
  compiled.filename = filename;
  compiled.paths = Module._nodeModulePaths(path.dirname(filename));
  compiled.require = (id) => imports[id] ?? require(id);
  compiled._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText, filename);
  return compiled.exports;
}

const RealDate = Date;
global.Date = class extends RealDate {
  constructor(...args) { super(...(args.length ? args : ['2026-10-31T15:00:00Z'])); }
};
try {
  const dates = load('src/app/robot-rental/apply/rental-date.ts');
  const { parseRentalApplication } = load('src/lib/robot-rental-order.ts', {
    '@/app/robot-rental/apply/rental-date': dates,
  });
  const application = {
    submissionId: '12345678-1234-4234-8234-123456789012',
    model: 'r1', grade: 'Basic', nights: 1, engineerPlan: 'hourly', engineerHours: 1,
    startDate: '2027-01-01', company: 'Test company', name: 'Test user', email: 'test@example.com',
    phone: '09012345678', postalCode: '1000001', prefecture: '東京都', address1: '千代田区',
    useCase: 'research', accepted: true,
  };
  const result = parseRentalApplication(application);
  assert.equal(result.ok, true);
  assert.equal(result.returnDate, '2027-01-02');
  assert.equal(result.amountIncludingTax, 66000);
  assert.equal(parseRentalApplication({ ...application, startDate: '2027-01-02' }).ok, true);
  for (const startDate of ['2026-12-31', '2026-11-01', '2027-02-30']) {
    const rejected = parseRentalApplication({ ...application, startDate });
    assert.equal(rejected.ok, false, startDate);
    assert.match(rejected.error, /2か月後以降/);
  }
  console.log('rental application: JST minimum boundary, date tampering and price passed');
} finally {
  global.Date = RealDate;
}
