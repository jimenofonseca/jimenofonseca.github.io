#!/usr/bin/env node
/**
 * Static site validator — no dependencies, no build step.
 *
 *   node validate.js
 *
 * Guards the invariants CLAUDE.md calls non-negotiable but that nothing
 * previously enforced:
 *
 *   1. i18n.js parses
 *   2. EN and DE hold identical key sets
 *   3. Every data-i18n key referenced in HTML exists in i18n.js
 *   4. Hardcoded HTML fallbacks match their en: values  ← crawlers index these
 *   5. The Person JSON-LD on the home page is valid JSON
 *   6. Every page requests the same i18n.js?v=N
 *   7. Swiss orthography: no eszett
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = __dirname;
const failures = [];
const fail = (check, msg) => failures.push(`${check}: ${msg}`);

// ── Pages ─────────────────────────────────────────────────────────────
const pages = ['index.html'].concat(
  fs.readdirSync(ROOT, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('.') && !d.name.startsWith('_'))
    .map(d => path.join(d.name, 'index.html'))
    .filter(p => fs.existsSync(path.join(ROOT, p)))
).sort()
  // Redirect stubs carry no content of their own — no i18n, no cache version.
  .filter(p => !/<meta http-equiv="refresh"/i.test(fs.readFileSync(path.join(ROOT, p), 'utf8')));

// ── 1. Load i18n.js ───────────────────────────────────────────────────
// It ends in an IIFE that touches document/localStorage, so stub them.
const sandbox = {
  document: {
    documentElement: { classList: { add() {}, toggle() {} }, setAttribute() {} },
    querySelectorAll: () => ({ forEach() {} }),
    addEventListener() {},
    readyState: 'complete',
    title: '',
  },
  localStorage: { getItem: () => null, setItem() {} },
  console,
};
sandbox.window = sandbox;

let T;
try {
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'i18n.js'), 'utf8'), sandbox, { filename: 'i18n.js' });
  T = sandbox.TRANSLATIONS;
  if (!T || !T.en || !T.de) throw new Error('TRANSLATIONS.en / .de missing');
} catch (e) {
  fail('i18n.js', `failed to load — ${e.message}`);
  console.error(failures.join('\n'));
  process.exit(1);
}
const { en, de } = T;

// ── 2. EN/DE key parity ───────────────────────────────────────────────
const enKeys = new Set(Object.keys(en));
const deKeys = new Set(Object.keys(de));
for (const k of enKeys) if (!deKeys.has(k)) fail('parity', `'${k}' exists in en: but not de:`);
for (const k of deKeys) if (!enKeys.has(k)) fail('parity', `'${k}' exists in de: but not en:`);

// ── 3-4. HTML keys resolve, and fallbacks match en: ───────────────────
const NAMED = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
const norm = s => s
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
  .replace(/&(\w+);/g, (m, n) => (n in NAMED ? NAMED[n] : m))
  .replace(/&amp;/g, '&')
  .replace(/\s+/g, ' ').trim();

for (const page of pages) {
  const src = fs.readFileSync(path.join(ROOT, page), 'utf8');

  // text content: <tag ... data-i18n="key">fallback</tag>, skipping nested markup
  for (const m of src.matchAll(/<(\w+)([^>]*\bdata-i18n="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/g)) {
    const [, , , key, text] = m;
    if (!(key in en)) { fail('missing-key', `${page} references '${key}', absent from i18n.js`); continue; }
    if (text.includes('<')) continue;                       // nested markup — skip
    if (norm(text) !== norm(en[key])) {
      fail('stale-fallback', `${page} [${key}]\n      html: ${norm(text).slice(0, 80)}\n      en:   ${norm(en[key]).slice(0, 80)}`);
    }
  }

  // content attribute: <meta data-i18n-content="key" content="fallback">
  for (const m of src.matchAll(/<[^>]*\bdata-i18n-content="([^"]+)"[^>]*\bcontent="([^"]*)"/g)) {
    const [, key, text] = m;
    if (!(key in en)) { fail('missing-key', `${page} references '${key}', absent from i18n.js`); continue; }
    if (norm(text) !== norm(en[key])) {
      fail('stale-fallback', `${page} [${key}]\n      html: ${norm(text).slice(0, 80)}\n      en:   ${norm(en[key]).slice(0, 80)}`);
    }
  }

  // data-i18n-html / -aria: existence only, markup not compared
  for (const m of src.matchAll(/\bdata-i18n-(?:html|aria)="([^"]+)"/g)) {
    if (!(m[1] in en)) fail('missing-key', `${page} references '${m[1]}', absent from i18n.js`);
  }
}

// ── 5. JSON-LD ────────────────────────────────────────────────────────
const home = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const ld = [...home.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
if (ld.length === 0) fail('json-ld', 'index.html has no application/ld+json block');
let persons = 0;
for (const [, body] of ld) {
  try {
    const d = JSON.parse(body);
    if (!d['@type']) fail('json-ld', 'block parsed but has no @type');
    if (d['@type'] === 'Person') {
      persons++;
      // The entity anchor must agree with the page's own canonical, or
      // Google is handed two different URLs for the same person.
      const canonical = (home.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
      if (canonical && d.url && d.url.replace(/\/$/, '') !== canonical.replace(/\/$/, '')) {
        fail('json-ld', `Person.url (${d.url}) disagrees with the canonical (${canonical})`);
      }
    }
  } catch (e) {
    fail('json-ld', `does not parse — ${e.message}`);
  }
}
if (persons > 1) {
  fail('json-ld', `index.html has ${persons} Person blocks — there must be exactly one.\n      ` +
                  'Two Person entities on a page hand search engines conflicting claims\n      ' +
                  'about the same person and undermine the Knowledge Panel.');
}

// ── 6. Cache version consistency ──────────────────────────────────────
const versions = new Map();
for (const page of pages) {
  const m = fs.readFileSync(path.join(ROOT, page), 'utf8').match(/i18n\.js\?v=(\d+)/);
  if (!m) { fail('cache-version', `${page} does not reference i18n.js?v=N`); continue; }
  if (!versions.has(m[1])) versions.set(m[1], []);
  versions.get(m[1]).push(page);
}
if (versions.size > 1) {
  const detail = [...versions.entries()].map(([v, ps]) => `v=${v}: ${ps.join(', ')}`).join('\n      ');
  fail('cache-version', `pages disagree on the i18n.js version — a page pinned to an old\n      version serves stale translations from cache:\n      ${detail}`);
}

// ── 7. Swiss orthography ──────────────────────────────────────────────
const eszett = fs.readFileSync(path.join(ROOT, 'i18n.js'), 'utf8').split('\n')
  .map((l, i) => l.includes('ß') ? i + 1 : 0).filter(Boolean);
if (eszett.length) fail('orthography', `i18n.js uses ß on line(s) ${eszett.join(', ')} — this site uses Swiss ss`);

// ── Report ────────────────────────────────────────────────────────────
console.log(`checked ${pages.length} pages, ${enKeys.size} en keys / ${deKeys.size} de keys`);
if (failures.length) {
  console.error(`\n${failures.length} problem(s):\n`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log('all checks passed');
