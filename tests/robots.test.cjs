const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const { resolveRobots } = require('next/dist/build/webpack/loaders/metadata/resolve-route-data');
const source = fs.readFileSync('src/app/robots.ts', 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const moduleResult = { exports: {} };
new Function('exports', compiled)(moduleResult.exports);
const robots = moduleResult.exports.default();
const output = resolveRobots(robots);

// Evaluate this site's prefix-only rules from Next's generated output, not the source object.
const groups = output.trim().split(/\n\s*\n/).map(block => {
  const lines = block.split('\n').map(line => line.split(/:\s(.*)/s).slice(0, 2));
  return {
    agent: lines.find(([key]) => key === 'User-Agent')?.[1],
    rules: lines.filter(([key]) => key === 'Allow' || key === 'Disallow'),
  };
}).filter(group => group.agent);
function allowed(agent, pathname) {
  const specific = groups.filter(group => group.agent !== '*' && agent.toLowerCase().includes(group.agent.toLowerCase()));
  const longest = Math.max(0, ...specific.map(group => group.agent.length));
  const selected = specific.length ? specific.filter(group => group.agent.length === longest) : groups.filter(group => group.agent === '*');
  const matching = selected.flatMap(group => group.rules).filter(([, prefix]) => pathname.startsWith(prefix));
  matching.sort((a, b) => b[1].length - a[1].length || (a[0] === 'Allow' ? -1 : 1));
  return !matching.length || matching[0][0] === 'Allow';
}
const wildcard = groups.find(group => group.agent === '*');
assert.deepEqual(wildcard.rules, [
  ['Allow', '/'], ['Allow', '/_next/static/'],
  ['Disallow', '/api/'], ['Disallow', '/_next/'], ['Disallow', '/hero-mecha-preview'],
]);
assert.equal(allowed('Googlebot', '/_next/static/chunks/app.js'), true);
assert.equal(allowed('UnknownBot', '/_next/static/css/site.css'), true);
assert.equal(allowed('UnknownBot', '/_next/image?url=x'), false);
assert.equal(allowed('UnknownBot', '/api/contact'), false);
assert.equal(allowed('UnknownBot', '/hero-mecha-preview'), false);
assert.equal(allowed('Googlebot', '/blog/example'), true);
for (const group of groups.filter(group => group.agent !== '*')) {
  assert.deepEqual(group.rules, [['Allow', '/'], ['Disallow', '/api/'], ['Disallow', '/hero-mecha-preview']]);
  // Specific User-Agent rules replace wildcard rules; /_next/ stays permitted for these agents.
  assert.equal(allowed(group.agent, '/_next/image'), true);
  assert.equal(allowed(group.agent, '/api/contact'), false);
  assert.equal(allowed(group.agent, '/hero-mecha-preview'), false);
}
assert.equal(allowed('gptbot', '/_next/image'), true);
assert.ok(output.includes('Sitemap: https://clearai.jp/sitemap.xml\n'));
assert.ok(output.includes('Host: https://clearai.jp\n'));
const sitemapSource = fs.readFileSync('src/app/sitemap.ts', 'utf8');
const ast = ts.createSourceFile('sitemap.ts', sitemapSource, ts.ScriptTarget.Latest, true);
const revalidate = ast.statements.flatMap(statement => ts.isVariableStatement(statement) && statement.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword) ? [...statement.declarationList.declarations] : []).find(declaration => declaration.name.getText(ast) === 'revalidate');
assert.equal(revalidate?.initializer?.getText(ast), '60');
console.log(`robots: generated output, wildcard precedence, ${groups.length - 1} specific agents and sitemap revalidate passed`);
