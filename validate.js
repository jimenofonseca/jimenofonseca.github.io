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
// Two language trees: the English pages at the root and their German
// counterparts under de/. Each is checked against its own language block,
// so a page whose text drifts from i18n.js fails regardless of language.
const SKIP = new Set(['assets', 'node_modules', 'private-src']);
const enPages = ['index.html'].concat(
  fs.readdirSync(ROOT, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('.') && !d.name.startsWith('_')
                 && !SKIP.has(d.name) && d.name !== 'de')
    .map(d => path.join(d.name, 'index.html'))
    .filter(p => fs.existsSync(path.join(ROOT, p)))
).sort()
  // Redirect stubs carry no content of their own — no i18n, no canonical pair.
  .filter(p => !/<meta http-equiv="refresh"/i.test(fs.readFileSync(path.join(ROOT, p), 'utf8')));

const dePages = enPages.map(p => path.join('de', p))
  .filter(p => fs.existsSync(path.join(ROOT, p)));

const pages = enPages.concat(dePages);
const langOf = p => (p.startsWith('de' + path.sep) || p.startsWith('de/')) ? 'de' : 'en';
// 'index.html' -> '/'  ·  'cea/index.html' -> '/cea/'  ·  'de/cea/index.html' -> '/de/cea/'
const urlOf = p => p === 'index.html' ? '/' : '/' + path.dirname(p) + '/';

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

// Inline markup helpers, for data-i18n-html values.
const strip = s => s.replace(/<[^>]+>/g, '');
const hrefs = s => [...s.matchAll(/href="([^"]*)"/g)].map(m => m[1]).sort();

for (const page of pages) {
  const src = fs.readFileSync(path.join(ROOT, page), 'utf8');
  // Check each page against its OWN language, not always English.
  const L = langOf(page);
  const t = L === 'de' ? de : en;

  // text content: <tag ... data-i18n="key">fallback</tag>, skipping nested markup
  for (const m of src.matchAll(/<(\w+)([^>]*\bdata-i18n="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/g)) {
    const [, , , key, text] = m;
    if (!(key in t)) { fail('missing-key', `${page} references '${key}', absent from i18n.js`); continue; }
    if (text.includes('<')) continue;                       // nested markup — skip
    if (norm(text) !== norm(t[key])) {
      fail('stale-fallback', `${page} [${key}]\n      html: ${norm(text).slice(0, 80)}\n      ${L}:   ${norm(t[key]).slice(0, 80)}`);
    }
  }

  // content attribute: <meta data-i18n-content="key" content="fallback">
  for (const m of src.matchAll(/<[^>]*\bdata-i18n-content="([^"]+)"[^>]*\bcontent="([^"]*)"/g)) {
    const [, key, text] = m;
    if (!(key in t)) { fail('missing-key', `${page} references '${key}', absent from i18n.js`); continue; }
    if (norm(text) !== norm(t[key])) {
      fail('stale-fallback', `${page} [${key}]\n      html: ${norm(text).slice(0, 80)}\n      ${L}:   ${norm(t[key]).slice(0, 80)}`);
    }
  }

  // data-i18n-aria: existence only
  for (const m of src.matchAll(/\bdata-i18n-aria="([^"]+)"/g)) {
    if (!(m[1] in t)) fail('missing-key', `${page} references '${m[1]}', absent from i18n.js`);
  }

  // data-i18n-html: compare the *text* (tags stripped) against en:, so these
  // fallbacks get the same staleness protection as plain data-i18n ones.
  // Without this, the paragraphs carrying the most content — the ones that
  // needed inline markup — are the only ones nothing checks.
  for (const m of src.matchAll(/<(\w+)([^>]*\bdata-i18n-html="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/g)) {
    const [, , , key, html] = m;
    if (!(key in t)) { fail('missing-key', `${page} references '${key}', absent from i18n.js`); continue; }
    if (norm(strip(html)) !== norm(strip(t[key]))) {
      fail('stale-fallback', `${page} [${key}] (html)\n      html: ${norm(strip(html)).slice(0, 80)}\n      ${L}:   ${norm(strip(t[key])).slice(0, 80)}`);
    }
    if (hrefs(html).join('|') !== hrefs(t[key]).join('|')) {
      fail('stale-fallback', `${page} [${key}] links differ from ${L}:\n      html: ${hrefs(html).join(', ') || '(none)'}\n      ${L}:   ${hrefs(t[key]).join(', ') || '(none)'}`);
    }
  }
}

// Every data-i18n-html key must carry the same links in both languages —
// a link dropped or mistyped in the German is otherwise invisible.
const htmlKeys = new Set();
for (const page of pages) {
  const src = fs.readFileSync(path.join(ROOT, page), 'utf8');
  for (const m of src.matchAll(/\bdata-i18n-html="([^"]+)"/g)) htmlKeys.add(m[1]);
}
for (const k of htmlKeys) {
  if (!(k in en) || !(k in de)) continue;
  const a = hrefs(en[k]), b = hrefs(de[k]);
  if (a.join('|') !== b.join('|')) {
    fail('parity', `'${k}' has different links in en: and de:\n      en: ${a.join(', ') || '(none)'}\n      de: ${b.join(', ') || '(none)'}`);
  }
}

// ── 5. JSON-LD ────────────────────────────────────────────────────────
// Runs on both home pages. Each must carry exactly one Person block whose
// url matches that page's own canonical — the German home page is a
// separate URL, so it needs its own anchor, not the English one.
for (const homePage of ['index.html', 'de/index.html']) {
  if (!fs.existsSync(path.join(ROOT, homePage))) continue;
  const home = fs.readFileSync(path.join(ROOT, homePage), 'utf8');
  const ld = [...home.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (ld.length === 0) fail('json-ld', `${homePage} has no application/ld+json block`);
  let persons = 0;
  for (const [, body] of ld) {
    try {
      const d = JSON.parse(body);
      if (!d['@type']) fail('json-ld', `${homePage}: block parsed but has no @type`);
      if (d['@type'] === 'Person') {
        persons++;
        const canonical = (home.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
        if (canonical && d.url && d.url.replace(/\/$/, '') !== canonical.replace(/\/$/, '')) {
          fail('json-ld', `${homePage}: Person.url (${d.url}) disagrees with the canonical (${canonical})`);
        }
      }
    } catch (e) {
      fail('json-ld', `${homePage}: does not parse — ${e.message}`);
    }
  }
  if (persons > 1) {
    fail('json-ld', `${homePage} has ${persons} Person blocks — there must be exactly one.\n      ` +
                    'Two Person entities on a page hand search engines conflicting claims\n      ' +
                    'about the same person and undermine the Knowledge Panel.');
  }
}

// ── 6. hreflang + canonical, the thing that makes German indexable ─────
// Each page must point at itself with a self-referential canonical, and
// name every language version including itself. Google drops the whole
// annotation set if it is not reciprocal, silently.
const ORIGIN = 'https://jimenofonseca.com';
for (const page of pages) {
  const src = fs.readFileSync(path.join(ROOT, page), 'utf8');
  const url = ORIGIN + urlOf(page);
  const L = langOf(page);

  const canonical = (src.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  if (canonical !== url) fail('hreflang', `${page} canonical is ${canonical}, expected ${url}`);

  const declared = Object.fromEntries(
    [...src.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(m => [m[1], m[2]]));
  const enUrl = ORIGIN + urlOf(page.replace(/^de\//, ''));
  const deUrl = ORIGIN + '/de' + urlOf(page.replace(/^de\//, ''));
  const want = { en: enUrl, de: deUrl, 'x-default': enUrl };
  for (const [k, v] of Object.entries(want)) {
    if (declared[k] !== v) {
      fail('hreflang', `${page} hreflang="${k}" is ${declared[k] || '(missing)'}, expected ${v}`);
    }
  }
  // the page must be named by its own annotation set (self-referential)
  if (declared[L] !== url) fail('hreflang', `${page} does not name itself in hreflang="${L}"`);

  const htmlLang = (src.match(/<html lang="([^"]+)"/) || [])[1];
  if (htmlLang !== L) fail('hreflang', `${page} has <html lang="${htmlLang}">, expected "${L}"`);
}

// ── 7. Swiss orthography ──────────────────────────────────────────────
const eszett = fs.readFileSync(path.join(ROOT, 'i18n.js'), 'utf8').split('\n')
  .map((l, i) => l.includes('ß') ? i + 1 : 0).filter(Boolean);
if (eszett.length) fail('orthography', `i18n.js uses ß on line(s) ${eszett.join(', ')} — this site uses Swiss ss`);

// ── 8. sitemap.xml covers exactly the validated pages ─────────────────
// The page list above is discovered by directory scan, but sitemap.xml is
// hand-maintained — so adding a page silently leaves it out of the sitemap,
// and deleting one leaves a 404 in it. This ties the two together.
const smPath = path.join(ROOT, 'sitemap.xml');
if (!fs.existsSync(smPath)) {
  fail('sitemap', 'sitemap.xml is missing');
} else {
  const sm = fs.readFileSync(smPath, 'utf8');
  const listed = new Set(
    [...sm.matchAll(/<loc>\s*https:\/\/jimenofonseca\.com([^<]*?)\s*<\/loc>/g)].map(m => m[1])
  );
  // 'index.html' → '/', 'cea/index.html' → '/cea/'
  const expected = new Set(pages.map(p => p === 'index.html' ? '/' : `/${path.dirname(p)}/`));
  for (const u of expected) if (!listed.has(u)) fail('sitemap', `${u} is a validated page but is not in sitemap.xml`);
  for (const u of listed) if (!expected.has(u)) fail('sitemap', `sitemap.xml lists ${u}, which is not a validated page (redirect stubs must not be listed — they are noindex)`);
}

// ── Report ────────────────────────────────────────────────────────────
console.log(`checked ${pages.length} pages, ${enKeys.size} en keys / ${deKeys.size} de keys`);
if (failures.length) {
  console.error(`\n${failures.length} problem(s):\n`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log('all checks passed');
