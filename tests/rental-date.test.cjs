const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const exportsForDate = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/app/robot-rental/apply/rental-date.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, { exports: exportsForDate });
const { todayInJapan, minimumRentalStartDate, addDays, moveMonth, formatRentalDate } = exportsForDate;
for (const [now, minimum] of [
 ['2026-10-31T14:59:59Z', '2026-12-31'],
 ['2026-10-31T15:00:00Z', '2027-01-01'],
 ['2026-12-31T03:00:00Z', '2027-02-28'],
 ['2027-12-31T03:00:00Z', '2028-02-29'],
 ['2026-07-31T03:00:00Z', '2026-09-30'],
]) assert.equal(minimumRentalStartDate(new Date(now)), minimum);
assert.equal(todayInJapan(new Date('2026-10-29T14:59:59Z')), '2026-10-29');
assert.equal(todayInJapan(new Date('2026-10-29T15:00:00Z')), '2026-10-30');
assert.equal(addDays('2026-12-31', 1), '2027-01-01');
assert.equal(addDays('2028-02-28', 2), '2028-03-01');
assert.equal(addDays('2026-03-01', -1), '2026-02-28');
assert.equal(moveMonth('2026-01-31', 1), '2026-02-28');
assert.equal(moveMonth('2028-01-31', 1), '2028-02-29');
assert.equal(moveMonth('2026-01-31', -1), '2025-12-31');
assert.equal(formatRentalDate('2026-10-30'), '2026年10月30日(金)');
console.log('rental dates: Japan midnight, month/year/leap boundaries and calendar navigation passed');

for (const locale of ['ja','en','zh-CN','ko']) {
 assert.match(formatRentalDate('2026-12-31', locale), /2026/);
 assert.match(formatRentalDate('2027-01-01', locale), /2027/);
}
