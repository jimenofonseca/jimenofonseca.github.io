var TRANSLATIONS = {
  en: {
    // ── Shared ───────────────────────────────────
    'skip':               'Skip to Content',
    'nav.intro':             'Intro',
    'nav.work':              'Work',
    'nav.art':               'Off the clock',
    'v2.art.lede':           'Music I have recorded, and photographs I keep coming back to.',
    'art.title':             'Off the Clock | Music and Photography — Jimeno Fonseca',
    'art.desc':              'Music and photography by Jimeno Fonseca — a long-time hobby, selected clips and photographs.',

    // ── Home ─────────────────────────────────────
    'home.title':         'Jimeno Fonseca',
    'home.desc':          'Jimeno Fonseca turns digital technology into lasting capability. Head of Digital Engineering at Axpo Grid, developer of City Energy Analyst, founder of Superurbana GmbH, PhD from ETH Zürich.',
    'hero.h1':            'Jimeno Fonseca',

    // ── Redesign (home v2) ───────────────────────
    'v2.lang.label':      'Language',
    'v2.menu.open':       'Menu',
    'nav.music':          'Music',
    'nav.photography':    'Photography',

    // Stat labels (subpages)

    // Hero blocks for media-less subpages







    // ── Case studies ─────────────────────────────

    // ── About ───────────────────────────────────
    'about.bio':                  'Jimeno Fonseca leads Digital Engineering at Axpo Grid in Switzerland, where he drives the digitalisation of power networks — including the first substation in the DACH region built entirely without paper plans. He is the developer of City Energy Analyst, an open-source cloud platform for energy simulation now used in more than 75 countries, and founder of Superurbana GmbH, which commercialised that work until 2025. He holds a PhD from ETH Zürich, is a PMI Agile Certified Practitioner (PMI-ACP) and contributes to CIGRE\'s work on digital twins. Privately, he plays music and takes photographs.',


    // ── Superurbana ──────────────────────────────

    // ── CEA ──────────────────────────────────────

    // ── Innovation (Training) ────────────────────

    // ── Digital Transformation ───────────────────

    // ── Open Source ──────────────────────────────

    // ── Appearances ──────────────────────────────

    // ── Publications ─────────────────────────────

    // ── Music ─────────────────────────────────────
    'v2.music.caption.kind': 'Clip',

    // ── Photography ───────────────────────────────
    'v2.photo.caption.kind': 'Selected · 2018 – 2025',
  },

  de: {
    // ── Shared ───────────────────────────────────
    'skip':               'Zum Inhalt springen',
    'nav.intro':             'Intro',
    'nav.work':              'Arbeit',
    'nav.art':               'Feierabend',
    'v2.art.lede':           'Musik, die ich aufgenommen habe, und Fotografien, zu denen ich immer wieder zurückkehre.',
    'art.title':             'Feierabend | Musik und Fotografie — Jimeno Fonseca',
    'art.desc':              'Musik und Fotografie von Jimeno Fonseca — ein langjähriges Hobby, ausgewählte Clips und Fotografien.',

    // ── Home ─────────────────────────────────────
    'home.title':         'Jimeno Fonseca',
    'home.desc':          'Jimeno Fonseca verwandelt digitale Technologie in dauerhafte Fähigkeiten. Leiter Digital Engineering bei Axpo Grid, Entwickler von City Energy Analyst, Gründer von Superurbana GmbH, Doktortitel der ETH Zürich.',
    'hero.h1':            'Jimeno Fonseca',

    // ── Redesign (home v2) ───────────────────────
    'v2.lang.label':      'Sprache',
    'v2.menu.open':       'Menü',
    'nav.music':          'Musik',
    'nav.photography':    'Fotografie',

    // Stat-Labels (Unterseiten)

    // Hero-Blöcke für medienlose Unterseiten







    // ── Case studies ─────────────────────────────

    // ── About ───────────────────────────────────
    'about.bio':                  'Jimeno Fonseca leitet das Digital Engineering bei Axpo Grid in der Schweiz und treibt dort die Digitalisierung der Stromnetze voran — unter anderem beim ersten Unterwerk im DACH-Raum, das vollständig ohne Papierpläne gebaut wurde. Er ist Entwickler des City Energy Analyst, einer Open-Source-Cloud-Plattform für Energiesimulation, die heute in über 75 Ländern eingesetzt wird, und Gründer der Superurbana GmbH, die diese Arbeit bis 2025 kommerzialisiert hat. Er hat an der ETH Zürich promoviert, ist PMI Agile Certified Practitioner (PMI-ACP) und engagiert sich in der CIGRE zum Thema digitale Zwillinge. Privat macht er Musik und fotografiert.',


    // ── Superurbana ──────────────────────────────

    // ── CEA ──────────────────────────────────────

    // ── Innovation (Training) ────────────────────

    // ── Digital Transformation ───────────────────

    // ── Open Source ──────────────────────────────

    // ── Appearances ──────────────────────────────

    // ── Publications ─────────────────────────────

    // ── Musik ─────────────────────────────────────
    'v2.music.caption.kind': 'Clip',

    // ── Fotografie ────────────────────────────────
    'v2.photo.caption.kind': 'Auswahl · 2018 – 2025',
  }
};

function applyLang(lang) {
  var t = TRANSLATIONS[lang];
  document.documentElement.lang = lang;

  // Plain text content
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // HTML content (for elements with inline markup like spans or links)
  document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
    var key = el.getAttribute('data-i18n-html');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // Attribute: content (for <meta> tags)
  document.querySelectorAll('[data-i18n-content]').forEach(function(el) {
    var key = el.getAttribute('data-i18n-content');
    if (t[key] !== undefined) el.setAttribute('content', t[key]);
  });

  // Attribute: aria-label
  document.querySelectorAll('[data-i18n-aria]').forEach(function(el) {
    var key = el.getAttribute('data-i18n-aria');
    if (t[key] !== undefined) el.setAttribute('aria-label', t[key]);
  });

  // Toggle button indicator
  document.querySelectorAll('.lang-opt').forEach(function(el) {
    el.classList.toggle('active', el.getAttribute('data-lang') === lang);
  });

  localStorage.setItem('lang', lang);
  window.__lang = lang;

  // Reveal body once translations have been applied (prevents flash of English content)
  document.documentElement.classList.add('lang-ready');
}

function toggleLang() {
  applyLang(window.__lang === 'de' ? 'en' : 'de');
}

(function() {
  var saved = localStorage.getItem('lang');
  var lang = (saved === 'de' || saved === 'en') ? saved : 'en';
  window.__lang = lang;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { applyLang(lang); });
  } else {
    applyLang(lang);
  }
})();
