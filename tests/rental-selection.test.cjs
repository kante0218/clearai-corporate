const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const ts = require('typescript');
const filename = require('node:path').resolve('src/lib/robot-rental-order.ts');
const compiled = new Module(filename, module);
compiled.filename = filename;
compiled.paths = Module._nodeModulePaths(require('node:path').dirname(filename));
compiled._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, filename);
const { parseRentalSelection } = compiled.exports;
for (const model of ['r1', 'g1', 'go2']) {
 for (const grade of [model === 'go2' ? 'Air' : 'Basic', 'R&D']) {
  for (const nights of [1,7]) {
   const params = {model, grade, nights:String(nights), engineerPlan:'hourly', engineerHours:'9'};
   const roundTrip = Object.fromEntries(new URLSearchParams(params));
   assert.deepEqual(parseRentalSelection(roundTrip), {model,grade,nights,engineerPlan:'hourly',engineerHours:9});
  }
 }
}
assert.deepEqual(parseRentalSelection({model:'__proto__',grade:'invalid',nights:'0',engineerPlan:'invalid',engineerHours:'Infinity'}), {model:'r1',grade:'Basic',nights:1,engineerPlan:'day',engineerHours:1});
for (const bad of ['1.5','8','-1','NaN','']) assert.equal(parseRentalSelection({nights:bad}).nights,1);
console.log('rental selection: all models/grades, URL round-trip, boundaries and invalid input passed');
