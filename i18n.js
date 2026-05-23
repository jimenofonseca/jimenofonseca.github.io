var TRANSLATIONS = {
  en: {
    // ── Shared ───────────────────────────────────
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
    'btn.moreInfo':       'More Info',

    // ── Home ─────────────────────────────────────
    'home.title':         'Jimeno Fonseca | Explore Digital Engineering for Energy Systems',
    'home.desc':          'Jimeno Fonseca leads innovation in digital engineering for energy systems; explore projects, training, and open-source tools in the energy sector.',
    'hero.h1':            'Manager, Founder, and Educator driving Digital Innovation in the Energy Sector',
    'hero.p':             'I am Jimeno, department head of Digital Engineering at Axpo Grid in Switzerland. There, I lead the adoption of digital technologies for construction and operation of power systems. I am also co-founder of the open-source simulation software City Energy Analyst (CEA) and the construction office Superurbana GmbH. I hold a PhD in urban energy systems from the ETH Zürich, and I am a certified Agile Manager. I am active member of CIGRE and past-contributor to the IPCC report on Climate Change. I used to build software until I found making high-performance teams my passion and bringing digital technologies to the energy sector my mission.',
    'hero.cta':           'Let’s Talk!',
    'news.h2':            'Latest News',
    'news.more':          'More News',

    // ── Redesign (home v2) ───────────────────────
    'v2.role':            'Digital Engineering — Axpo Grid',
    'v2.eyebrow.now':     'Now',
    'v2.eyebrow.work':    'Selected Work',
    'v2.eyebrow.recently':'Recently',
    'v2.eyebrow.connect': 'Connect',
    'v2.now':             'Currently leading the Digital Engineering department at Axpo Grid in Switzerland, advancing the adoption of digital technologies for the construction and operation of power systems.',
    'v2.work.company.desc':       'Energy efficiency consultancy, made in Switzerland',
    'v2.work.product.desc':       'Open-source urban energy simulation used in 25+ countries',
    'v2.work.training.desc':      'Teaching minimum viable products at ETH Zürich',
    'v2.work.transformation.desc':'Integrating BIM and digital twins at Axpo',
    'v2.work.openSource.desc':    'Contributing to replicable, transparent science',
    'v2.work.company.year':       '2018 – 25',
    'v2.work.product.year':       '2013 – 24',
    'v2.work.training.year':      '2023 – 24',
    'v2.work.transformation.year':'2022 –',
    'v2.work.openSource.year':    '2014 –',
    'v2.recently.more':   'More updates on LinkedIn',
    'v2.contact.linkedin':'LinkedIn',
    'v2.contact.github':  'GitHub',
    'v2.contact.scholar': 'Google Scholar',
    'v2.contact.email':   'Get in touch',
    'v2.theme.label':     'Theme',
    'v2.lang.label':      'Language',
    'v2.menu.open':       'Menu',
    'v2.menu.close':      'Close',
    'v2.prev':            'Previous',
    'v2.next':            'Next',
    'v2.cea.title':       'City Energy Analyst',
    'v2.cea.lede':        'Urban Performance at your Fingertips — open-source modelling for low-carbon cities.',
    'v2.cea.caption.kind':'Demo',
    'v2.cea.caption.text':'A short tour of the City Energy Analyst platform',
    'v2.stats.impact':    'Impact',
    'v2.stats.snapshot':  'Snapshot',
    'v2.stats.cohort':    'Cohort',
    'v2.stats.scope':     'Scope',
    'v2.stats.footprint': 'Footprint',
    'v2.stats.reach':     'Reach',
    'v2.stats.metrics':   'Metrics',

    // Stat labels (subpages)
    'v2.stat.yearsActive':'Years Active',
    'v2.stat.companies':  'Companies Trained',
    'v2.stat.years':      'Years',
    'v2.stat.mvps':       'MVPs Built',
    'v2.stat.partner':    'Industry Partner',
    'v2.stat.students':   'Students Mentored',
    'v2.stat.stakeholders':'Stakeholders',
    'v2.stat.paperless':  'Paperless Substation (CH)',
    'v2.stat.depts':      'New Department',
    'v2.stat.repos':      'Personal Repos',
    'v2.stat.stars':      'Stars (CEA)',
    'v2.stat.talks':      'Talks Given',
    'v2.stat.institutions':'Institutions',
    'v2.stat.langs':      'Languages',
    'v2.stat.i10':        'i10-index',

    // Hero blocks for media-less subpages
    'v2.os.repos.label':  'Featured Repos',
    'v2.os.repo.cea.desc':      'Open-source urban building energy modelling for low-carbon cities',
    'v2.os.repo.deg.desc':      'Physics-based forecast of building energy in the USA — cited by IPCC 6th Assessment Report',
    'v2.os.repo.finebank.desc': 'Personal finance toolkit with live FX rates and OCR for bank statements',
    'v2.pub.featured.label':    'Most Cited · 2016',
    'v2.pub.featured.cites':    'citations',

    'v2.superurbana.title':       'Superurbana',
    'v2.superurbana.lede':        'Energy efficiency consultancy and CEA training, made in Switzerland.',
    'v2.superurbana.caption.kind':'Promo',
    'v2.superurbana.caption.text':'A glimpse at the Superurbana practice',

    'v2.innov.title':             'Innovation Leadership',
    'v2.innov.lede':              'Teaching engineers how to build Minimum Viable Products with industry partners at ETH Zürich.',
    'v2.innov.caption.kind':      'Talk',
    'v2.innov.caption.text':      'On building Minimum Viable Products',

    'v2.transf.title':            'Digital Transformation',
    'v2.transf.lede':             'Bringing BIM and digital twins to power systems engineering at Axpo, Switzerland.',
    'v2.transf.caption.kind':     'Talk',
    'v2.transf.caption.text':     'On integrating BIM and digital twins at Axpo',

    'v2.os.title':                'Open Source',
    'v2.os.lede':                 'Contributing to replicable science through transparent, open computational tools.',

    'v2.app.title':               'Appearances',
    'v2.app.lede':                'Talks and interviews on urban energy systems and digital transformation.',
    'v2.app.caption.kind':        'Talk',
    'v2.app.caption.text':        'ETH Zürich — on urban energy and digital tools',

    'v2.pub.title':               'Publications',
    'v2.pub.lede':                'Peer-reviewed research on urban energy modelling, BIM, digital twins, and district-scale systems.',

    // ── Superurbana ──────────────────────────────
    'superurbana.title':  'Superurbana | Empower Urban Energy Solutions — Jimeno Fonseca',
    'superurbana.desc':   'Discover Superurbana\'s expertise in urban energy consulting, training, and innovative energy system solutions for cities across Europe and the Middle East.',
    'superurbana.h2':     '<span>Superurbana</span>Energy Efficiency Made in Switzerland',
    'superurbana.p1':     'I co-founded Superurbana GmbH to bring cutting-edge urban energy simulation into private practice — making it one of the first companies in the world to deploy the City Energy Analyst (CEA) platform commercially. What started as an energy consultancy for cities evolved into a full-service firm offering building energy renovations and professional CEA training.',
    'superurbana.p2':     'In its final years (2023–2025), Superurbana delivered hands-on energy retrofit projects across Switzerland and trained dozens of companies throughout Europe and the Middle East — helping engineers, planners, and real estate professionals harness the power of data-driven energy analysis. In 2025, the company strategically pivoted toward asset management, building on the deep domain expertise accumulated over nearly a decade.',

    // ── CEA ──────────────────────────────────────
    'cea.title':          'City Energy Analyst | Enhance Urban Energy Planning — Jimeno Fonseca',
    'cea.desc':           'Discover City Energy Analyst, an open-source tool for urban energy system analysis, used worldwide for sustainable city performance and digital transformation.',
    'cea.h2':             '<span>City Energy Analyst</span>Urban Performance at your Fingertips',
    'cea.stat.countries': 'Countries',
    'cea.stat.users':     'Users',
    'cea.stat.contrib':   'Contributors',
    'cea.stat.founded':   'Founded',
    'cea.p1':             'What began as a few lines of Python written during my doctoral studies at ETH Zürich in 2013 has grown into one of the most widely adopted open-source platforms for urban energy analysis in the world. City Energy Analyst (CEA) is today used in over 25 countries by more than a thousand engineers, researchers, and city planners — a reach that still feels remarkable for a tool born in an academic lab.',
    'cea.p2':             'Over nearly a decade, I grew CEA from a personal research instrument into a thriving open-source project with a community of 40+ contributors spanning multiple countries. I led its evolution through my academic career at ETH Zürich and the ETH-Singapore Centre, and later brought it into real-world practice through Superurbana, where it powered commercial energy consultancy and training across Europe and the Middle East.',
    'cea.p3':             'CEA is now in the capable hands of the next generation of PhD researchers at ETH Zürich — a fitting home for a tool that has always been driven by rigorous science and a commitment to open, transparent computation.',

    // ── Innovation (Training) ────────────────────
    'innov.title':        'Innovation Leadership | Drive Innovation Today — Jimeno Fonseca',
    'innov.desc':         'Explore Jimeno Fonseca\'s insights on innovation leadership, digital transformation, and creating impactful minimum viable products in technology and energy sectors.',
    'innov.h2':           '<span>Innovation Leadership</span>How to build Minimum Viable Products?',
    'innov.p1':           'What a fantastic topic it is to bring new technology to life. Even more exhilarating is when it is actually brought and put to good use inside a company. As part of the Master in Energy and Technology of the ETH Zürich, I taught the art of defining new technology and digital service requirements with an industrial partner — Implenia AG in Switzerland — to later build a Minimum Viable Product in no time.',
    'innov.p2':           'The result: one out of five teams working on brilliant ideas made it to the next stage, becoming part of the industrial partner and developing the MVP into a new digital service. The teaching season lasted between 2023 and 2024.',

    // ── Digital Transformation ───────────────────
    'transf.title':       'Digital Transformation | Drive Innovation Now — Jimeno Fonseca',
    'transf.desc':        'Explore Jimeno Fonseca\'s expertise in digital transformation, integrating BIM and digital twins to enhance infrastructure planning and market competitiveness.',
    'transf.h2':          '<span>Digital Transformation</span>Integrating BIM and Digital Twins in Axpo',
    'transf.p':           'The BIM (Building Information Modeling) method is changing completely the way one can plan and build pretty much any infrastructure. It is a standard being implemented in more than 40 countries and in Switzerland it is a must to maintain high levels of quality and efficiency. It became a crucial topic to remain competitive at Axpo in Switzerland. I built a vision and strategy to ramp up skills, technologies, and processes in our team of 200 asset managers, engineers, procurement and sales officers. In three years time, we re-positioned ourselves in the market, being the first to build a Substation with 3D information models (no plans, no printing). I launched also a complete new department, built a team overseas and created new sources of revenue.',

    // ── Open Source ──────────────────────────────
    'os.title':           'Open Source Code | Explore Open Source Coding Opportunities — Jimeno Fonseca',
    'os.desc':            'Discover Jimeno Fonseca\'s open source code for scientific reproducibility, accessible for developers and researchers seeking transparent, reusable projects.',
    'os.h2':              '<span>Open-Source</span>Contributing to replicable science',
    'os.p1':              'I\'m a firm believer that science and engineering advance fastest when models, data, and methods are open and reproducible. Across more than a decade of research at ETH Zürich and the ETH-Singapore Centre, and through my own ventures, I\'ve built and contributed to open-source tools that are now used in 25+ countries and have shaped international policy — including contributions to the IPCC 6th Assessment Report on Climate Change.',
    'os.p2':              'My flagship project, <a class="inline-link" href="https://github.com/architecture-building-systems/CityEnergyAnalyst" target="_blank" rel="noopener">City Energy Analyst</a> (CEA), co-founded at ETH Zürich, has become a global standard for urban building energy modelling — used by researchers, city planners, and engineers worldwide to design low-carbon cities.',
    'os.p3':              'Beyond CEA, my GitHub hosts a collection of tools spanning climate forecasting, IoT, and personal finance — built out of curiosity, scientific rigour, and a conviction that useful tools should be freely available.',
    'os.card.h3':         'jimenofonseca — GitHub',
    'os.card.p':          'Advocate of open and transparent computational models and data analysis techniques. View all public repositories, sorted by stars.',
    'os.cta':             'Get the Code',

    // ── Appearances ──────────────────────────────
    'app.title':          'Appearances | Open Conversations on Energy Systems — Jimeno Fonseca',
    'app.desc':           'Jimeno Fonseca shares his work on urban energy systems and digital tools through talks and interviews with institutions like ETH Zurich, Axpo Grid, and the European Commission.',
    'app.h2':             '<span>On Video</span>Open conversations on digitalization and energy systems',
    'app.p1':             'I constantly share my work on urban energy systems and digital tools through talks and interviews with institutions like ETH Zurich, Axpo Grid, the European Commission, and AIA New York. My insights have reached international audiences via platforms such as Channel News Asia, WDR, and various podcasts and webinars like the Future Design Podcast.',
    'app.p2':             'From building information modeling to energy planning, these appearances highlight my commitment to making technical knowledge practical and accessible.',
    'app.cta':            'Let’s Talk!',

    // ── Publications ─────────────────────────────
    'pub.title':          'Publications | Explore Urban Energy Research — Jimeno Fonseca',
    'pub.desc':           'Discover Jimeno Fonseca\'s scientific publications on district energy modeling, urban energy systems, and sustainable city planning. Over 60 key studies support innovation.',
    'pub.h2':             '<span>Scientific Publications</span>Setting groundwork on district energy systems modeling',
    'pub.stat.pubs':      'Publications',
    'pub.stat.cites':     'Citations',
    'pub.stat.h':         'h-index',
    'pub.p1':             'With over 60 scientific publications, 2,000 citations, and an h-index of 20, my work has focused on advancing urban energy systems through tools like the City Energy Analyst (CEA) and innovative methods for modeling energy use at the district scale.',
    'pub.p2':             'I\'ve worked to integrate spatial, behavioral, and systems-level insights into urban energy planning, helping cities transition toward more sustainable and efficient futures. Through collaborations with institutions such as ETH Zürich and EPFL, my work continues to support data-driven strategies for shaping the cities of tomorrow.',
    'pub.card.h3':        'Google Scholar — Jimeno Fonseca',
    'pub.card.p':         'Publications on urban energy modeling, BIM, digital twins, deep learning, and more. View full profile with all citations and metrics.',
    'pub.cta':            'Get Access',
  },

  de: {
    // ── Shared ───────────────────────────────────
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
    'btn.moreInfo':       'Mehr erfahren',

    // ── Home ─────────────────────────────────────
    'home.title':         'Jimeno Fonseca | Digitales Engineering für Energiesysteme entdecken',
    'home.desc':          'Jimeno Fonseca treibt Innovation im digitalen Engineering für Energiesysteme voran – entdecken Sie Projekte, Schulungen und Open-Source-Tools im Energiesektor.',
    'hero.h1':            'Manager, Gründer und Bildner, der digitale Innovation im Energiesektor vorantreibt',
    'hero.p':             'Ich bin Jimeno, Abteilungsleiter Digital Engineering bei Axpo Grid in der Schweiz. Dort leite ich die Einführung digitaler Technologien für den Bau und Betrieb von Energiesystemen. Ich bin auch Mitgründer der Open-Source-Simulationssoftware City Energy Analyst (CEA) und des Konstruktionsbüros Superurbana GmbH. Ich habe einen Doktortitel in urbanen Energiesystemen von der ETH Zürich und bin zertifizierter Agile Manager. Ich bin aktives Mitglied von CIGRE und ehemaliger Mitwirkender am IPCC-Bericht zum Klimawandel. Früher habe ich Software entwickelt, bis ich meine Leidenschaft dafür entdeckt habe, leistungsstarke Teams aufzubauen, und es zu meiner Mission gemacht habe, digitale Technologien in den Energiesektor zu bringen.',
    'hero.cta':           'Kontakt aufnehmen!',
    'news.h2':            'Aktuelle Neuigkeiten',
    'news.more':          'Mehr Neuigkeiten',

    // ── Redesign (home v2) ───────────────────────
    'v2.role':            'Digital Engineering — Axpo Grid',
    'v2.eyebrow.now':     'Aktuell',
    'v2.eyebrow.work':    'Ausgewählte Arbeit',
    'v2.eyebrow.recently':'Zuletzt',
    'v2.eyebrow.connect': 'Kontakt',
    'v2.now':             'Derzeit leite ich die Abteilung Digital Engineering bei Axpo Grid in der Schweiz und treibe die Einführung digitaler Technologien für den Bau und Betrieb von Energiesystemen voran.',
    'v2.work.company.desc':       'Beratung für Energieeffizienz, Made in Switzerland',
    'v2.work.product.desc':       'Open-Source-Simulation urbaner Energie, eingesetzt in über 25 Ländern',
    'v2.work.training.desc':      'Lehre zu Minimum Viable Products an der ETH Zürich',
    'v2.work.transformation.desc':'Integration von BIM und digitalen Zwillingen bei Axpo',
    'v2.work.openSource.desc':    'Beitrag zu reproduzierbarer, transparenter Wissenschaft',
    'v2.work.company.year':       '2018 – 25',
    'v2.work.product.year':       '2013 – 24',
    'v2.work.training.year':      '2023 – 24',
    'v2.work.transformation.year':'2022 –',
    'v2.work.openSource.year':    '2014 –',
    'v2.recently.more':   'Weitere Beiträge auf LinkedIn',
    'v2.contact.linkedin':'LinkedIn',
    'v2.contact.github':  'GitHub',
    'v2.contact.scholar': 'Google Scholar',
    'v2.contact.email':   'Kontakt aufnehmen',
    'v2.theme.label':     'Theme',
    'v2.lang.label':      'Sprache',
    'v2.menu.open':       'Menü',
    'v2.menu.close':      'Schliessen',
    'v2.prev':            'Vorherige',
    'v2.next':            'Nächste',
    'v2.cea.title':       'City Energy Analyst',
    'v2.cea.lede':        'Urbane Performance auf Knopfdruck — Open-Source-Modellierung für CO₂-arme Städte.',
    'v2.cea.caption.kind':'Demo',
    'v2.cea.caption.text':'Ein kurzer Überblick zur City-Energy-Analyst-Plattform',
    'v2.stats.impact':    'Wirkung',
    'v2.stats.snapshot':  'Überblick',
    'v2.stats.cohort':    'Kohorte',
    'v2.stats.scope':     'Umfang',
    'v2.stats.footprint': 'Reichweite',
    'v2.stats.reach':     'Publikum',
    'v2.stats.metrics':   'Kennzahlen',

    // Stat-Labels (Unterseiten)
    'v2.stat.yearsActive':'Aktive Jahre',
    'v2.stat.companies':  'Geschulte Unternehmen',
    'v2.stat.years':      'Jahre',
    'v2.stat.mvps':       'Entwickelte MVPs',
    'v2.stat.partner':    'Industriepartner',
    'v2.stat.students':   'Betreute Studierende',
    'v2.stat.stakeholders':'Stakeholder',
    'v2.stat.paperless':  'Papierloses Unterwerk (CH)',
    'v2.stat.depts':      'Neue Abteilung',
    'v2.stat.repos':      'Eigene Repos',
    'v2.stat.stars':      'Sterne (CEA)',
    'v2.stat.talks':      'Vorträge',
    'v2.stat.institutions':'Institutionen',
    'v2.stat.langs':      'Sprachen',
    'v2.stat.i10':        'i10-Index',

    // Hero-Blöcke für medienlose Unterseiten
    'v2.os.repos.label':  'Ausgewählte Repos',
    'v2.os.repo.cea.desc':      'Open-Source-Modellierung urbaner Gebäudeenergie für CO₂-arme Städte',
    'v2.os.repo.deg.desc':      'Physikbasierte Prognose des Gebäudeenergieverbrauchs in den USA — zitiert im 6. IPCC-Sachstandsbericht',
    'v2.os.repo.finebank.desc': 'Werkzeug für persönliche Finanzen mit Live-Wechselkursen und OCR für Kontoauszüge',
    'v2.pub.featured.label':    'Meistzitiert · 2016',
    'v2.pub.featured.cites':    'Zitierungen',

    'v2.superurbana.title':       'Superurbana',
    'v2.superurbana.lede':        'Beratung für Energieeffizienz und CEA-Schulungen, Made in Switzerland.',
    'v2.superurbana.caption.kind':'Promo',
    'v2.superurbana.caption.text':'Einblick in die Praxis von Superurbana',

    'v2.innov.title':             'Innovationsführerschaft',
    'v2.innov.lede':              'Lehre zum Aufbau von Minimum Viable Products mit Industriepartnern an der ETH Zürich.',
    'v2.innov.caption.kind':      'Vortrag',
    'v2.innov.caption.text':      'Über den Aufbau von Minimum Viable Products',

    'v2.transf.title':            'Digitale Transformation',
    'v2.transf.lede':             'BIM und digitale Zwillinge im Bereich Power Systems Engineering bei Axpo, Schweiz.',
    'v2.transf.caption.kind':     'Vortrag',
    'v2.transf.caption.text':     'Über die Integration von BIM und digitalen Zwillingen bei Axpo',

    'v2.os.title':                'Open Source',
    'v2.os.lede':                 'Beitrag zur reproduzierbaren Wissenschaft durch transparente, offene Werkzeuge.',

    'v2.app.title':               'Auftritte',
    'v2.app.lede':                'Vorträge und Interviews zu urbanen Energiesystemen und digitaler Transformation.',
    'v2.app.caption.kind':        'Vortrag',
    'v2.app.caption.text':        'ETH Zürich — über urbane Energie und digitale Werkzeuge',

    'v2.pub.title':               'Publikationen',
    'v2.pub.lede':                'Begutachtete Forschung zu urbaner Energiemodellierung, BIM, digitalen Zwillingen und Quartiersystemen.',

    // ── Superurbana ──────────────────────────────
    'superurbana.title':  'Superurbana | Urbane Energielösungen stärken — Jimeno Fonseca',
    'superurbana.desc':   'Entdecken Sie die Expertise von Superurbana in urbaner Energieberatung, Schulung und innovativen Energiesystemlösungen für Städte in Europa und im Nahen Osten.',
    'superurbana.h2':     '<span>Superurbana</span>Energieeffizienz Made in Switzerland',
    'superurbana.p1':     'Ich habe Superurbana GmbH mitgegründet, um modernste urbane Energiesimulation in die private Praxis zu bringen — und damit eines der ersten Unternehmen der Welt geschaffen, das die City Energy Analyst (CEA)-Plattform kommerziell einsetzt. Was als Energieberatung für Städte begann, entwickelte sich zu einem Full-Service-Unternehmen, das energetische Gebäudesanierungen und professionelle CEA-Schulungen anbietet.',
    'superurbana.p2':     'In ihren letzten Jahren (2023–2025) realisierte Superurbana praxisnahe Energiesanierungsprojekte in der ganzen Schweiz und schulte Dutzende Unternehmen in Europa und im Nahen Osten — und half Ingenieuren, Planern und Immobilienprofis, die Kraft der datengetriebenen Energieanalyse zu nutzen. Im Jahr 2025 richtete sich das Unternehmen strategisch auf Asset Management aus und baute auf der tiefen Fachexpertise auf, die über fast ein Jahrzehnt gewachsen war.',

    // ── CEA ──────────────────────────────────────
    'cea.title':          'City Energy Analyst | Urbane Energieplanung verbessern — Jimeno Fonseca',
    'cea.desc':           'Entdecken Sie City Energy Analyst, ein Open-Source-Tool zur Analyse urbaner Energiesysteme, weltweit eingesetzt für nachhaltige Stadtperformance und digitale Transformation.',
    'cea.h2':             '<span>City Energy Analyst</span>Urbane Performance auf Knopfdruck',
    'cea.stat.countries': 'Länder',
    'cea.stat.users':     'Nutzer',
    'cea.stat.contrib':   'Mitwirkende',
    'cea.stat.founded':   'Gegründet',
    'cea.p1':             'Was 2013 als ein paar Zeilen Python während meiner Promotion an der ETH Zürich begann, ist zu einer der weltweit am weitesten verbreiteten Open-Source-Plattformen für urbane Energieanalyse geworden. City Energy Analyst (CEA) wird heute in über 25 Ländern von mehr als tausend Ingenieuren, Forschern und Stadtplanern genutzt — eine Reichweite, die für ein Werkzeug aus einem akademischen Labor noch immer bemerkenswert ist.',
    'cea.p2':             'Über fast ein Jahrzehnt habe ich CEA von einem persönlichen Forschungsinstrument zu einem florierenden Open-Source-Projekt mit einer Community von über 40 Mitwirkenden aus mehreren Ländern entwickelt. Ich habe seine Entwicklung während meiner akademischen Laufbahn an der ETH Zürich und am ETH-Singapore Centre vorangetrieben und es später durch Superurbana in die reale Praxis gebracht, wo es kommerzielle Energieberatung und Schulungen in Europa und im Nahen Osten ermöglichte.',
    'cea.p3':             'CEA befindet sich nun in den fähigen Händen der nächsten Generation von Doktorierenden an der ETH Zürich — ein passendes Zuhause für ein Werkzeug, das schon immer von strenger Wissenschaft und einem Engagement für offene, transparente Berechnung angetrieben wurde.',

    // ── Innovation (Training) ────────────────────
    'innov.title':        'Innovationsführerschaft | Innovation heute vorantreiben — Jimeno Fonseca',
    'innov.desc':         'Entdecken Sie Jimeno Fonsecas Einsichten zu Innovationsführerschaft, digitaler Transformation und der Entwicklung wirkungsvoller Minimum Viable Products in Technologie- und Energiesektor.',
    'innov.h2':           '<span>Innovationsführerschaft</span>Wie baut man Minimum Viable Products?',
    'innov.p1':           'Was für ein fantastisches Thema es ist, neue Technologie zum Leben zu erwecken. Noch aufregender ist es, wenn sie tatsächlich in einem Unternehmen sinnvoll eingesetzt wird. Im Rahmen des Master in Energy and Technology an der ETH Zürich habe ich die Kunst gelehrt, neue Technologie- und Digitalservice-Anforderungen mit einem Industriepartner — der Implenia AG in der Schweiz — zu definieren, um danach in kürzester Zeit ein Minimum Viable Product zu bauen.',
    'innov.p2':           'Das Ergebnis: Eines von fünf Teams, die an brillanten Ideen arbeiteten, schaffte es in die nächste Phase, wurde Teil des Industriepartners und entwickelte das MVP zu einem neuen Digitalservice. Die Lehrtätigkeit dauerte von 2023 bis 2024.',

    // ── Digital Transformation ───────────────────
    'transf.title':       'Digitale Transformation | Innovation jetzt vorantreiben — Jimeno Fonseca',
    'transf.desc':        'Entdecken Sie Jimeno Fonsecas Expertise in digitaler Transformation und der Integration von BIM und digitalen Zwillingen zur Verbesserung der Infrastrukturplanung und Marktwettbewerbsfähigkeit.',
    'transf.h2':          '<span>Digitale Transformation</span>Integration von BIM und Digitalen Zwillingen bei Axpo',
    'transf.p':           'Die BIM-Methode (Building Information Modeling) verändert komplett die Art und Weise, wie nahezu jede Infrastruktur geplant und gebaut werden kann. Es ist ein Standard, der in mehr als 40 Ländern eingeführt wird, und in der Schweiz ein Muss, um hohe Qualitäts- und Effizienzstandards zu halten. Es wurde zu einem entscheidenden Thema, um bei Axpo in der Schweiz wettbewerbsfähig zu bleiben. Ich habe eine Vision und Strategie entwickelt, um Fähigkeiten, Technologien und Prozesse in unserem Team von 200 Asset Managern, Ingenieuren, Beschaffungs- und Vertriebsmitarbeitern auszubauen. In drei Jahren haben wir uns am Markt neu positioniert und als Erste eine Unterstation mit 3D-Informationsmodellen realisiert (keine Pläne, kein Drucken). Ich habe ausserdem eine komplett neue Abteilung aufgebaut, ein Team im Ausland etabliert und neue Umsatzquellen geschaffen.',

    // ── Open Source ──────────────────────────────
    'os.title':           'Open-Source-Code | Möglichkeiten in Open-Source-Entwicklung entdecken — Jimeno Fonseca',
    'os.desc':            'Entdecken Sie Jimeno Fonsecas Open-Source-Code für wissenschaftliche Reproduzierbarkeit, zugänglich für Entwickler und Forschende, die transparente, wiederverwendbare Projekte suchen.',
    'os.h2':              '<span>Open-Source</span>Beitrag zur reproduzierbaren Wissenschaft',
    'os.p1':              'Ich bin fest davon überzeugt, dass Wissenschaft und Technik am schnellsten voranschreiten, wenn Modelle, Daten und Methoden offen und reproduzierbar sind. In über einem Jahrzehnt Forschung an der ETH Zürich und am ETH-Singapore Centre sowie durch meine eigenen Unternehmungen habe ich Open-Source-Werkzeuge entwickelt und dazu beigetragen, die heute in über 25 Ländern verwendet werden und internationale Politik mitgeprägt haben — einschliesslich Beiträgen zum 6. IPCC-Sachstandsbericht zum Klimawandel.',
    'os.p2':              'Mein Vorzeigeprojekt, <a class="inline-link" href="https://github.com/architecture-building-systems/CityEnergyAnalyst" target="_blank" rel="noopener">City Energy Analyst</a> (CEA), das ich an der ETH Zürich mitgegründet habe, ist zu einem globalen Standard für urbane Gebäudeenergiemodellierung geworden — weltweit von Forschenden, Stadtplanern und Ingenieuren genutzt, um CO₂-arme Städte zu gestalten.',
    'os.p3':              'Über CEA hinaus beherbergt mein GitHub eine Sammlung von Werkzeugen, die von Klimavorhersage über IoT bis hin zu persönlichen Finanzen reichen — entstanden aus Neugier, wissenschaftlicher Strenge und der Überzeugung, dass nützliche Werkzeuge frei verfügbar sein sollten.',
    'os.card.h3':         'jimenofonseca — GitHub',
    'os.card.p':          'Verfechter offener und transparenter Berechnungsmodelle und Datenanalysetechniken. Alle öffentlichen Repositories anzeigen, sortiert nach Sternen.',
    'os.cta':             'Code abrufen',

    // ── Appearances ──────────────────────────────
    'app.title':          'Auftritte | Offene Gespräche über Energiesysteme — Jimeno Fonseca',
    'app.desc':           'Jimeno Fonseca teilt seine Arbeit zu urbanen Energiesystemen und digitalen Werkzeugen durch Vorträge und Interviews mit Institutionen wie ETH Zürich, Axpo Grid und der Europäischen Kommission.',
    'app.h2':             '<span>Auf Video</span>Offene Gespräche über Digitalisierung und Energiesysteme',
    'app.p1':             'Ich teile meine Arbeit zu urbanen Energiesystemen und digitalen Werkzeugen regelmässig durch Vorträge und Interviews mit Institutionen wie der ETH Zürich, Axpo Grid, der Europäischen Kommission und AIA New York. Meine Einsichten haben internationale Zuhörer über Plattformen wie Channel News Asia, WDR sowie verschiedene Podcasts und Webinare wie den Future Design Podcast erreicht.',
    'app.p2':             'Von Building Information Modeling bis hin zur Energieplanung verdeutlichen diese Auftritte mein Engagement, technisches Wissen praxisnah und zugänglich zu machen.',
    'app.cta':            'Kontakt aufnehmen!',

    // ── Publications ─────────────────────────────
    'pub.title':          'Publikationen | Forschung zu urbaner Energie entdecken — Jimeno Fonseca',
    'pub.desc':           'Entdecken Sie Jimeno Fonsecas wissenschaftliche Publikationen zur Modellierung von Quartierenergie, urbanen Energiesystemen und nachhaltiger Stadtplanung. Über 60 zentrale Studien fördern Innovation.',
    'pub.h2':             '<span>Wissenschaftliche Publikationen</span>Grundlagen für die Modellierung von Quartierenergiesystemen schaffen',
    'pub.stat.pubs':      'Publikationen',
    'pub.stat.cites':     'Zitierungen',
    'pub.stat.h':         'h-Index',
    'pub.p1':             'Mit über 60 wissenschaftlichen Publikationen, 2.000 Zitierungen und einem h-Index von 20 konzentriert sich meine Arbeit darauf, urbane Energiesysteme durch Werkzeuge wie den City Energy Analyst (CEA) und innovative Methoden zur Modellierung des Energieverbrauchs auf Quartierebene voranzubringen.',
    'pub.p2':             'Ich habe daran gearbeitet, räumliche, verhaltensbezogene und systemische Erkenntnisse in die urbane Energieplanung zu integrieren und Städten zu helfen, sich in Richtung nachhaltigerer und effizienterer Zukünfte zu entwickeln. Durch Kooperationen mit Institutionen wie der ETH Zürich und der EPFL unterstützt meine Arbeit weiterhin datengestützte Strategien zur Gestaltung der Städte von morgen.',
    'pub.card.h3':        'Google Scholar — Jimeno Fonseca',
    'pub.card.p':         'Publikationen zu urbaner Energiemodellierung, BIM, digitalen Zwillingen, Deep Learning und mehr. Vollständiges Profil mit allen Zitierungen und Kennzahlen anzeigen.',
    'pub.cta':            'Zugang erhalten',
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
