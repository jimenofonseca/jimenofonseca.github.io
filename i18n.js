var TRANSLATIONS = {
  en: {
    'skip':               'Skip to Content',
    'nav.initiatives':    'Initiatives',
    'nav.company':        'Company',
    'nav.product':        'Product',
    'nav.training':       'Training',
    'nav.transformation': 'Transformation',
    'nav.openSource':     'Open Source',
    'nav.media':          'Media',
    'nav.appearances':    'Appearances',
    'nav.publications':   'Publications',
    'nav.news':           'News',
    'nav.hamburger':      'Open menu',
    'hero.h1':            'Manager, Founder, and Educator driving Digital Innovation in the Energy Sector',
    'hero.p':             'I am Jimeno, department head of Digital Engineering at Axpo Grid in Switzerland. There, I lead the adoption of digital technologies for construction and operation of power systems. I am also co-founder of the open-source simulation software City Energy Analyst (CEA) and the construction office Superurbana GmbH. I hold a PhD in urban energy systems from the ETH Zürich, and I am a certified Agile Manager. I am active member of CIGRE and past-contributor to the IPCC report on Climate Change. I used to build software until I found making high-performance teams my passion and bringing digital technologies to the energy sector my mission.',
    'hero.cta':           'Let’s Talk!',
    'news.h2':            'Latest News',
    'news.more':          'More News',
    'meta.title':         'Jimeno Fonseca | Explore Digital Engineering for Energy Systems',
    'meta.description':   'Jimeno Fonseca leads innovation in digital engineering for energy systems; explore projects, training, and open-source tools in the energy sector.',
  },
  de: {
    'skip':               'Zum Inhalt springen',
    'nav.initiatives':    'Initiativen',
    'nav.company':        'Unternehmen',
    'nav.product':        'Produkt',
    'nav.training':       'Weiterbildung',
    'nav.transformation': 'Transformation',
    'nav.openSource':     'Open Source',
    'nav.media':          'Medien',
    'nav.appearances':    'Auftritte',
    'nav.publications':   'Publikationen',
    'nav.news':           'Neuigkeiten',
    'nav.hamburger':      'Menü öffnen',
    'hero.h1':            'Manager, Gründer und Bildner, der digitale Innovation im Energiesektor vorantreibt',
    'hero.p':             'Ich bin Jimeno, Abteilungsleiter Digital Engineering bei Axpo Grid in der Schweiz. Dort leite ich die Einführung digitaler Technologien für den Bau und Betrieb von Energiesystemen. Ich bin auch Mitgründer der Open-Source-Simulationssoftware City Energy Analyst (CEA) und des Konstruktionsbüros Superurbana GmbH. Ich habe einen Doktortitel in urbanen Energiesystemen von der ETH Zürich und bin zertifizierter Agile Manager. Ich bin aktives Mitglied von CIGRE und ehemaliger Mitwirkender am IPCC-Bericht zum Klimawandel. Früher habe ich Software entwickelt, bis ich meine Leidenschaft dafür entdeckt habe, leistungsstarke Teams aufzubauen, und es zu meiner Mission gemacht habe, digitale Technologien in den Energiesektor zu bringen.',
    'hero.cta':           'Kontakt aufnehmen!',
    'news.h2':            'Aktuelle Neuigkeiten',
    'news.more':          'Mehr Neuigkeiten',
    'meta.title':         'Jimeno Fonseca | Digitales Engineering für Energiesysteme entdecken',
    'meta.description':   'Jimeno Fonseca treibt Innovation im digitalen Engineering für Energiesysteme voran – entdecken Sie Projekte, Schulungen und Open-Source-Tools im Energiesektor.',
  }
};

function applyLang(lang) {
  var t = TRANSLATIONS[lang];
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-aria]').forEach(function(el) {
    var key = el.getAttribute('data-i18n-aria');
    if (t[key] !== undefined) el.setAttribute('aria-label', t[key]);
  });

  document.title = t['meta.title'];
  var desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', t['meta.description']);

  document.querySelectorAll('.lang-opt').forEach(function(el) {
    el.classList.toggle('active', el.getAttribute('data-lang') === lang);
  });

  localStorage.setItem('lang', lang);
  window.__lang = lang;
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
