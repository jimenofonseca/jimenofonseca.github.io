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
    'home.title':         'Jimeno Fonseca | Digital Technology Leader in Energy & Infrastructure',
    'home.desc':          'Jimeno Fonseca turns digital technology into lasting capability. Head of Digital Engineering at Axpo Grid, creator of City Energy Analyst, co-founder of Superurbana GmbH, PhD from ETH Zürich.',
    'hero.h1':            'I turn digital technology into lasting capability.',
    'hero.p':             'Data, code and AI do not last on their own.',
    'hero.proof':         'Today I lead Digital Engineering at Axpo Grid in Switzerland, where I built the department bringing BIM and digital twins to the construction and operation of power networks. Before that I created City Energy Analyst, an open-source urban energy simulation platform now used in 75+ countries — it has kept running since I handed it over to the next generation of researchers. I also co-founded Superurbana GmbH, which commercialised that work until 2025.',
    'hero.creds':         'PhD from ETH Zürich, certified Agile Manager, active member of CIGRE, and past contributor to the IPCC 6th Assessment Report on Climate Change.',
    'hero.p2':            'Off the clock, I spent years tinkering with microcontrollers and home IoT experiments. These days I have boiled it all down to two long-term loves: music and photography.',
    'hero.cta':           'Let’s Talk!',
    'news.h2':            'Latest News',
    'news.more':          'More News',

    // ── Redesign (home v2) ───────────────────────
    'v2.role':            'Digital Engineering — Axpo Grid',
    'v2.eyebrow.now':     'Now',
    'v2.eyebrow.work':    'Selected Work',
    'v2.eyebrow.recently':'Recently',
    'v2.eyebrow.connect': 'Connect',
    'v2.now':             'Currently leading the Digital Engineering department at Axpo Grid in Switzerland, advancing the adoption of digital technologies for the construction and operation of power networks.',
    'v2.work.company.desc':       'Founded and ran an energy consultancy — 30+ clients across 12+ countries',
    'v2.work.product.desc':       'Took a research prototype to 1,000+ users in 75+ countries',
    'v2.work.training.desc':      'Mentored 40 students building 5 MVPs with industry at ETH Zürich',
    'v2.work.transformation.desc':'Built a new department, secured >30m CHF, delivered the DACH region\'s first paperless substation',
    'v2.work.openSource.desc':    'Grew and handed over a 40+ contributor community over 12 years',
    'v2.work.company.year':       '2016 – 25',
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
    'nav.personal':       'Personal',
    'nav.music':          'Music',
    'nav.photography':    'Photography',
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
    'v2.stat.clients':    'Satisfied Clients',
    'v2.stat.years':      'Years',
    'v2.stat.mvps':       'MVPs Built',
    'v2.stat.partner':    'Industry Partner',
    'v2.stat.students':   'Students Mentored',
    'v2.stat.stakeholders':'Stakeholders',
    'v2.stat.paperless':  'Substation digitally built in DACH',
    'v2.stat.depts':      'mCHF revenue secured',
    'v2.stat.repos':      'Personal Repos',
    'v2.stat.stars':      'Stars (CEA)',
    'v2.stat.talks':      'Talks Given',
    'v2.stat.institutions':'Institutions',
    'v2.stat.langs':      'Languages',
    'v2.stat.i10':        'Countries using the tools',

    // Hero blocks for media-less subpages
    'v2.os.repos.label':  'Featured Repos',
    'v2.os.repo.cea.desc':      'Open-source urban building energy modelling for low-carbon cities',
    'v2.os.repo.deg.desc':      'Physics-based forecast of building energy in the USA — cited by IPCC 6th Assessment Report',
    'v2.os.repo.finebank.desc': 'Personal finance toolkit with live FX rates and OCR for bank statements',
    'v2.pub.featured.label':    'Most Cited · 2016',
    'v2.pub.featured.cites':    'citations',
    'v2.pub.chart.label':       'Citations per year',
    'v2.pub.chart.note':        '2,541 total · source: Google Scholar',

    'v2.superurbana.title':       'Superurbana',
    'v2.superurbana.lede':        'From energy consultancy to asset management — a Swiss firm with a decade of urban energy practice.',
    'v2.superurbana.caption.kind':'Promo',
    'v2.superurbana.caption.text':'A glimpse at the Superurbana practice',

    'v2.innov.title':             'Innovation Leadership',
    'v2.innov.lede':              'Teaching engineers at ETH Zürich how to build Minimum Viable Products in partnership with industry.',
    'v2.innov.caption.kind':      'Talk',
    'v2.innov.caption.text':      'On building Minimum Viable Products',

    'v2.transf.title':            'Digital Transformation',
    'v2.transf.lede':             'Bringing BIM and digital twins to power networks engineering at Axpo Grid.',
    'v2.transf.caption.kind':     'Talk',
    'v2.transf.caption.text':     'On integrating BIM and digital twins at Axpo',

    'v2.os.title':                'Open Source',
    'v2.os.lede':                 'Contributing to replicable science through transparent, open computational tools.',

    'v2.app.title':               'Appearances',
    'v2.app.lede':                'Conversations I have been part of, on urban energy systems and the digital transformation of the power sector.',
    'v2.app.caption.kind':        'Talk',
    'v2.app.caption.text':        'ETH Zürich — on urban energy and digital tools',

    'v2.pub.title':               'Publications',
    'v2.pub.lede':                'Research that turned into tools industry actually uses — and a contribution to the IPCC 6th Assessment Report.',

    // ── Superurbana ──────────────────────────────
    'superurbana.title':  'Superurbana | Empower Urban Energy Solutions — Jimeno Fonseca',
    'superurbana.desc':   'Discover Superurbana\'s expertise in urban energy consulting, training, and innovative energy system solutions for cities across Europe and the Middle East.',
    'superurbana.h2':     '<span>Superurbana</span>Energy Efficiency Made in Switzerland',
    'superurbana.p1':     'I co-founded Superurbana GmbH to bring urban energy simulation into private practice — one of the first firms in the world to deploy the City Energy Analyst (CEA) platform commercially. What started as an energy consultancy for cities grew into a full-service practice offering building energy renovations and professional CEA training, before pivoting toward asset management in 2025.',
    'superurbana.p2':     'Between 2023 and 2025, Superurbana delivered hands-on energy retrofit projects across Switzerland and trained dozens of companies in Europe and the Middle East — engineers, planners, and real estate professionals learning to use data-driven energy analysis in their daily practice. In 2025, the firm pivoted toward asset management, building on nearly a decade of accumulated domain knowledge.',

    // ── CEA ──────────────────────────────────────
    'cea.title':          'City Energy Analyst | Enhance Urban Energy Planning — Jimeno Fonseca',
    'cea.desc':           'Discover City Energy Analyst, an open-source tool for urban energy system analysis, used worldwide for sustainable city performance and digital transformation.',
    'cea.h2':             '<span>City Energy Analyst</span>Urban Performance at your Fingertips',
    'cea.stat.countries': 'Countries',
    'cea.stat.users':     'Users',
    'cea.stat.contrib':   'Contributors',
    'cea.stat.founded':   'Founded',
    'cea.p1':             'What began as a few lines of Python during my doctoral studies at ETH Zürich in 2013 has grown into a global standard for open-source urban energy analysis. City Energy Analyst (CEA) is today used in over 75 countries by more than a thousand engineers, researchers, and city planners — a reach that still surprises me, for a tool born in an academic lab.',
    'cea.p2':             'Over nearly a decade I grew CEA from a personal research instrument into an open-source project with 40+ contributors across multiple countries. I led its evolution through my academic career at ETH Zürich and the ETH-Singapore Centre, and later brought it into real-world practice through Superurbana, where it underpinned commercial consultancy and CEA training across Europe and the Middle East.',
    'cea.p3':             'CEA is now in the hands of the next generation of PhD researchers at ETH Zürich — a fitting home for a tool that has always been driven by rigorous science and a commitment to open, transparent computation.',

    // ── Innovation (Training) ────────────────────
    'innov.title':        'Innovation Leadership | Drive Innovation Today — Jimeno Fonseca',
    'innov.desc':         'Explore Jimeno Fonseca\'s insights on innovation leadership, digital transformation, and creating impactful minimum viable products in technology and energy sectors.',
    'innov.h2':           '<span>Innovation Leadership</span>How to build Minimum Viable Products?',
    'innov.p1':           'Bringing new technology to life is fantastic. Bringing it to life inside a company is exhilarating. As part of the Master in Energy and Technology at ETH Zürich, I taught students how to define a digital service with an industry partner — Implenia AG, in Switzerland — and ship a working Minimum Viable Product in a single semester.',
    'innov.p2':           'The result: one of five student teams was hired by the industrial partner and developed their MVP into a real digital service. The course ran from 2023 to 2024.',

    // ── Digital Transformation ───────────────────
    'transf.title':       'Digital Transformation | Drive Innovation Now — Jimeno Fonseca',
    'transf.desc':        'Explore Jimeno Fonseca\'s expertise in digital transformation, integrating BIM and digital twins to enhance infrastructure planning and market competitiveness.',
    'transf.h2':          '<span>Digital Transformation</span>Integrating BIM and Digital Twins in Axpo',
    'transf.p1':          'Building Information Modeling (BIM) is reshaping how infrastructure gets planned and built. It is now standard in more than 40 countries, and in Switzerland it is a baseline expectation for quality and efficiency on any serious project.',
    'transf.p2':          'At Axpo Grid, I built the vision and strategy to bring BIM and digital twins into our team of 400 stakeholders — asset managers, engineers, procurement and sales officers. In three years we repositioned ourselves in the market: first in the DACH region to build a high-voltage substation with 3D information models alone (no paper plans, no printing), with a new department launched, a team built overseas, and new commercial services on offer.',

    // ── Open Source ──────────────────────────────
    'os.title':           'Open Source Code | Explore Open Source Coding Opportunities — Jimeno Fonseca',
    'os.desc':            'Discover Jimeno Fonseca\'s open source code for scientific reproducibility, accessible for developers and researchers seeking transparent, reusable projects.',
    'os.h2':              '<span>Open-Source</span>Contributing to replicable science',
    'os.p1':              'I believe science and engineering advance fastest when models, data, and methods are open and reproducible. Across more than a decade of research at ETH Zürich and the ETH-Singapore Centre, and through my own ventures, I have built and contributed to open-source tools that are now used in 75+ countries and have shaped international policy — including contributions to the IPCC 6th Assessment Report on Climate Change.',
    'os.p2':              'Three threads run through the catalog. <strong>Urban energy science</strong> — <a class="inline-link" href="https://github.com/architecture-building-systems/CityEnergyAnalyst" target="_blank" rel="noopener">City Energy Analyst</a> (CEA), the flagship, alongside smaller libraries like EnthalpyGradients for building thermodynamics. <strong>Climate forecasting at policy scale</strong> — DEG-USA and HBLM-USA, the two IPCC-cited models for U.S. building energy.',
    'os.p3':              '<strong>Hardware and small experiments</strong> — WoW-SG is a beginner-friendly weather station on wheels exploring microcontrollers and sensors. BSTS-SG and causalimpact are Bayesian time-series and causal-inference toolkits. FineBank is a personal finance app with OCR for bank statements. Different domains, same conviction: useful tools should be free.',
    'os.card.h3':         'jimenofonseca — GitHub',
    'os.card.p':          'Advocate of open and transparent computational models and data analysis techniques. View all public repositories, sorted by stars.',
    'os.cta':             'Get the Code',

    // ── Appearances ──────────────────────────────
    'app.title':          'Appearances | Open Conversations on Energy Systems — Jimeno Fonseca',
    'app.desc':           'Jimeno Fonseca shares his work on urban energy systems and digital tools through talks and interviews with institutions like ETH Zurich, Axpo Grid, and the European Commission.',
    'app.h2':             '<span>On Video</span>Open conversations on digitalization and energy systems',
    'app.p1':             'I regularly share my work on urban energy systems and digital tools through talks and interviews — with institutions like ETH Zürich, Axpo Grid, the European Commission, CIGRE, and IEEE, and via media outlets including Channel News Asia, WDR, and the Future Design Podcast.',
    'app.p2':             'What I try to do in each: explain a technical idea (BIM, digital twins, urban energy modelling) in a way that engineers and planners can act on, not just nod at.',
    'app.cta':            'Let’s Talk!',

    // ── Publications ─────────────────────────────
    'pub.title':          'Publications | Explore Urban Energy Research — Jimeno Fonseca',
    'pub.desc':           'Discover Jimeno Fonseca\'s scientific publications on district energy modeling, urban energy systems, and sustainable city planning. 80+ peer-reviewed studies, cited over 2,500 times.',
    'pub.h2':             '<span>Scientific Publications</span>Setting groundwork on district energy systems modeling',
    'pub.stat.pubs':      'Publications',
    'pub.stat.cites':     'Citations',
    'pub.stat.h':         'IPCC contributor',
    'pub.p1':             'Two threads run through the work. The first is multiphysics simulation of energy systems at building and district scale. The second is data-driven inference — machine learning and Bayesian statistics — applied to the same systems. Most of it has been done with colleagues at ETH Zürich, the ETH-Singapore Future Cities Lab, and EPFL.',
    'pub.p2':             'Alongside the peer-reviewed work, I try to translate it for a broader audience interested in digital replicas of the power sector — and the open question of how to bring their emulation closer to real-world operation. Engineers, planners, and anyone working at the intersection of physics and software.',
    'pub.card.h3':        'Google Scholar — Jimeno Fonseca',
    'pub.card.p':         'Publications on data analysis, information technology, energy systems and more. View full profile with all citations and metrics.',
    'pub.cta':            'Get Access',

    // ── Music ─────────────────────────────────────
    'v2.music.lede':         'A long-time hobby, mostly off-camera. Occasionally a clip slips out.',
    'v2.music.p1':           'Music has been a thread through most of my life — from picking up instruments as a teenager to noodling around at home now. I mostly play for myself; once in a while I record something worth keeping. The clip above is one of those.',
    'v2.music.cta':          'Back to home',

    // ── Photography ───────────────────────────────
    'v2.photo.lede':         'Selected photos — places, people, light.',
    'v2.photo.caption.kind': 'Selected · 2018 – 2025',
    'v2.photo.p1':           'I\'ve been making photographs for as long as I\'ve been making models — the same instinct, just different tools. Places, people, the way light falls on a building at the wrong time of day.',
    'v2.photo.p2':           'The collection on this page is small on purpose: photos I keep coming back to, not everything I\'ve ever shot. Click any image to enlarge — use arrow keys or swipe to move through them.',
    'v2.photo.cta':          'Back to home',
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
    'home.title':         'Jimeno Fonseca | Digital- und Technologieführung für Energie & Infrastruktur',
    'home.desc':          'Jimeno Fonseca verwandelt digitale Technologie in dauerhafte Fähigkeiten. Leiter Digital Engineering bei Axpo Grid, Entwickler von City Energy Analyst, Mitgründer von Superurbana GmbH, Doktortitel der ETH Zürich.',
    'hero.h1':            'Ich verwandle digitale Technologie in dauerhafte Fähigkeiten.',
    'hero.p':             'Daten, Code und KI haben allein keinen Bestand.',
    'hero.proof':         'Heute leite ich Digital Engineering bei Axpo Grid in der Schweiz, wo ich die Abteilung aufgebaut habe, die BIM und digitale Zwillinge in den Bau und Betrieb von Stromnetzen bringt. Davor habe ich City Energy Analyst entwickelt, eine Open-Source-Plattform für urbane Energiesimulation, die heute in über 75 Ländern eingesetzt wird — sie läuft weiter, seit ich sie an die nächste Generation von Forschenden übergeben habe. Ausserdem habe ich Superurbana GmbH mitgegründet, die diese Arbeit bis 2025 kommerzialisiert hat.',
    'hero.creds':         'Doktortitel der ETH Zürich, zertifizierter Agile Manager, aktives Mitglied von CIGRE und ehemaliger Mitwirkender am 6. IPCC-Sachstandsbericht zum Klimawandel.',
    'hero.p2':            'Nach Feierabend habe ich jahrelang an Mikrocontrollern und IoT-Experimenten zu Hause getüftelt. Heute habe ich alles auf zwei lang gehegte Leidenschaften reduziert: Musik und Fotografie.',
    'hero.cta':           'Kontakt aufnehmen!',
    'news.h2':            'Aktuelle Neuigkeiten',
    'news.more':          'Mehr Neuigkeiten',

    // ── Redesign (home v2) ───────────────────────
    'v2.role':            'Digital Engineering — Axpo Grid',
    'v2.eyebrow.now':     'Aktuell',
    'v2.eyebrow.work':    'Ausgewählte Arbeit',
    'v2.eyebrow.recently':'Zuletzt',
    'v2.eyebrow.connect': 'Kontakt',
    'v2.now':             'Derzeit leite ich die Abteilung Digital Engineering bei Axpo Grid in der Schweiz und treibe die Einführung digitaler Technologien für den Bau und Betrieb von Stromnetzen voran.',
    'v2.work.company.desc':       'Aufbau und Leitung einer Energieberatung — 30+ Kunden in 12+ Ländern',
    'v2.work.product.desc':       'Von der Forschungssoftware zu 1.000+ Nutzern in 75+ Ländern',
    'v2.work.training.desc':      '40 Studierende betreut, die an der ETH Zürich 5 MVPs mit der Industrie gebaut haben',
    'v2.work.transformation.desc':'Neue Abteilung aufgebaut, >30 Mio. CHF gesichert, erstes papierloses Unterwerk der DACH-Region realisiert',
    'v2.work.openSource.desc':    'In 12 Jahren eine Community mit 40+ Mitwirkenden aufgebaut und übergeben',
    'v2.work.company.year':       '2016 – 25',
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
    'nav.personal':       'Persönlich',
    'nav.music':          'Musik',
    'nav.photography':    'Fotografie',
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
    'v2.stat.clients':    'Zufriedene Kunden',
    'v2.stat.years':      'Jahre',
    'v2.stat.mvps':       'Entwickelte MVPs',
    'v2.stat.partner':    'Industriepartner',
    'v2.stat.students':   'Betreute Studierende',
    'v2.stat.stakeholders':'Stakeholder',
    'v2.stat.paperless':  'Unterwerk digital erbaut in DACH',
    'v2.stat.depts':      'mCHF Umsatz gesichert',
    'v2.stat.repos':      'Eigene Repos',
    'v2.stat.stars':      'Sterne (CEA)',
    'v2.stat.talks':      'Vorträge',
    'v2.stat.institutions':'Institutionen',
    'v2.stat.langs':      'Sprachen',
    'v2.stat.i10':        'Länder, die die Tools nutzen',

    // Hero-Blöcke für medienlose Unterseiten
    'v2.os.repos.label':  'Ausgewählte Repos',
    'v2.os.repo.cea.desc':      'Open-Source-Modellierung urbaner Gebäudeenergie für CO₂-arme Städte',
    'v2.os.repo.deg.desc':      'Physikbasierte Prognose des Gebäudeenergieverbrauchs in den USA — zitiert im 6. IPCC-Sachstandsbericht',
    'v2.os.repo.finebank.desc': 'Werkzeug für persönliche Finanzen mit Live-Wechselkursen und OCR für Kontoauszüge',
    'v2.pub.featured.label':    'Meistzitiert · 2016',
    'v2.pub.featured.cites':    'Zitierungen',
    'v2.pub.chart.label':       'Zitierungen pro Jahr',
    'v2.pub.chart.note':        '2.541 gesamt · Quelle: Google Scholar',

    'v2.superurbana.title':       'Superurbana',
    'v2.superurbana.lede':        'Von der Energieberatung zum Asset Management — ein Schweizer Unternehmen mit einem Jahrzehnt urbaner Energiepraxis.',
    'v2.superurbana.caption.kind':'Promo',
    'v2.superurbana.caption.text':'Einblick in die Praxis von Superurbana',

    'v2.innov.title':             'Innovationsführerschaft',
    'v2.innov.lede':              'Ingenieuren an der ETH Zürich beibringen, Minimum Viable Products in Partnerschaft mit der Industrie zu entwickeln.',
    'v2.innov.caption.kind':      'Vortrag',
    'v2.innov.caption.text':      'Über den Aufbau von Minimum Viable Products',

    'v2.transf.title':            'Digitale Transformation',
    'v2.transf.lede':             'BIM und digitale Zwillinge ins Power Networks Engineering bei Axpo Grid bringen.',
    'v2.transf.caption.kind':     'Vortrag',
    'v2.transf.caption.text':     'Über die Integration von BIM und digitalen Zwillingen bei Axpo',

    'v2.os.title':                'Open Source',
    'v2.os.lede':                 'Beitrag zur reproduzierbaren Wissenschaft durch transparente, offene Werkzeuge.',

    'v2.app.title':               'Auftritte',
    'v2.app.lede':                'Gespräche, an denen ich beteiligt war — über urbane Energiesysteme und die digitale Transformation des Energiesektors.',
    'v2.app.caption.kind':        'Vortrag',
    'v2.app.caption.text':        'ETH Zürich — über urbane Energie und digitale Werkzeuge',

    'v2.pub.title':               'Publikationen',
    'v2.pub.lede':                'Forschung, aus der Werkzeuge wurden, die die Industrie tatsächlich nutzt — und ein Beitrag zum 6. IPCC-Sachstandsbericht.',

    // ── Superurbana ──────────────────────────────
    'superurbana.title':  'Superurbana | Urbane Energielösungen stärken — Jimeno Fonseca',
    'superurbana.desc':   'Entdecken Sie die Expertise von Superurbana in urbaner Energieberatung, Schulung und innovativen Energiesystemlösungen für Städte in Europa und im Nahen Osten.',
    'superurbana.h2':     '<span>Superurbana</span>Energieeffizienz Made in Switzerland',
    'superurbana.p1':     'Ich habe Superurbana GmbH mitgegründet, um urbane Energiesimulation in die private Praxis zu bringen — eines der ersten Unternehmen weltweit, das die City Energy Analyst (CEA)-Plattform kommerziell einsetzte. Was als Energieberatung für Städte begann, entwickelte sich zu einer Full-Service-Praxis mit energetischen Gebäudesanierungen und professionellen CEA-Schulungen, bevor sie 2025 zum Asset Management wechselte.',
    'superurbana.p2':     'Zwischen 2023 und 2025 realisierte Superurbana praxisnahe Energiesanierungsprojekte in der ganzen Schweiz und schulte Dutzende Unternehmen in Europa und im Nahen Osten — Ingenieure, Planer und Immobilienprofis, die lernten, datengetriebene Energieanalyse in ihrer täglichen Arbeit einzusetzen. 2025 wechselte das Unternehmen zum Asset Management und baute dabei auf fast einem Jahrzehnt gewachsenem Fachwissen auf.',

    // ── CEA ──────────────────────────────────────
    'cea.title':          'City Energy Analyst | Urbane Energieplanung verbessern — Jimeno Fonseca',
    'cea.desc':           'Entdecken Sie City Energy Analyst, ein Open-Source-Tool zur Analyse urbaner Energiesysteme, weltweit eingesetzt für nachhaltige Stadtperformance und digitale Transformation.',
    'cea.h2':             '<span>City Energy Analyst</span>Urbane Performance auf Knopfdruck',
    'cea.stat.countries': 'Länder',
    'cea.stat.users':     'Nutzer',
    'cea.stat.contrib':   'Mitwirkende',
    'cea.stat.founded':   'Gegründet',
    'cea.p1':             'Was 2013 als ein paar Zeilen Python während meiner Promotion an der ETH Zürich begann, ist zu einem globalen Standard für Open-Source-Analyse urbaner Energiesysteme geworden. City Energy Analyst (CEA) wird heute in über 75 Ländern von mehr als tausend Ingenieuren, Forschenden und Stadtplanern genutzt — eine Reichweite, die mich noch immer überrascht, für ein Werkzeug aus einem akademischen Labor.',
    'cea.p2':             'Über fast ein Jahrzehnt habe ich CEA von einem persönlichen Forschungsinstrument zu einem Open-Source-Projekt mit über 40 Mitwirkenden aus mehreren Ländern entwickelt. Ich habe seine Entwicklung während meiner akademischen Laufbahn an der ETH Zürich und am ETH-Singapore Centre vorangetrieben und es später durch Superurbana in die reale Praxis gebracht, wo es kommerzielle Beratung und CEA-Schulungen in Europa und im Nahen Osten getragen hat.',
    'cea.p3':             'CEA befindet sich nun in den Händen der nächsten Generation von Doktorierenden an der ETH Zürich — ein passendes Zuhause für ein Werkzeug, das schon immer von strenger Wissenschaft und einem Engagement für offene, transparente Berechnung angetrieben wurde.',

    // ── Innovation (Training) ────────────────────
    'innov.title':        'Innovationsführerschaft | Innovation heute vorantreiben — Jimeno Fonseca',
    'innov.desc':         'Entdecken Sie Jimeno Fonsecas Einsichten zu Innovationsführerschaft, digitaler Transformation und der Entwicklung wirkungsvoller Minimum Viable Products in Technologie- und Energiesektor.',
    'innov.h2':           '<span>Innovationsführerschaft</span>Wie baut man Minimum Viable Products?',
    'innov.p1':           'Neue Technologie zum Leben zu erwecken ist fantastisch. Sie in einem Unternehmen zum Leben zu erwecken ist mitreissend. Im Rahmen des Master in Energy and Technology an der ETH Zürich habe ich Studierende gelehrt, wie sie mit einem Industriepartner — Implenia AG in der Schweiz — einen Digitalservice definieren und in einem einzigen Semester ein funktionierendes Minimum Viable Product realisieren.',
    'innov.p2':           'Das Ergebnis: Eines von fünf studentischen Teams wurde vom Industriepartner übernommen und entwickelte sein MVP zu einem echten Digitalservice weiter. Der Kurs lief von 2023 bis 2024.',

    // ── Digital Transformation ───────────────────
    'transf.title':       'Digitale Transformation | Innovation jetzt vorantreiben — Jimeno Fonseca',
    'transf.desc':        'Entdecken Sie Jimeno Fonsecas Expertise in digitaler Transformation und der Integration von BIM und digitalen Zwillingen zur Verbesserung der Infrastrukturplanung und Marktwettbewerbsfähigkeit.',
    'transf.h2':          '<span>Digitale Transformation</span>Integration von BIM und Digitalen Zwillingen bei Axpo',
    'transf.p1':          'Building Information Modeling (BIM) verändert grundlegend, wie Infrastruktur geplant und gebaut wird. Es ist heute Standard in mehr als 40 Ländern und in der Schweiz eine Grundvoraussetzung für Qualität und Effizienz in jedem ernsthaften Projekt.',
    'transf.p2':          'Bei Axpo Grid habe ich eine Vision und Strategie entwickelt, um BIM und digitale Zwillinge in unser Team von 400 Stakeholdern zu bringen — Asset Managern, Ingenieuren, Beschaffungs- und Vertriebsmitarbeitern. In drei Jahren haben wir uns am Markt neu positioniert und als Erste in der DACH-Region ein Hochspannungs-Unterwerk allein mit 3D-Informationsmodellen realisiert (keine Pläne, kein Drucken). Eine komplett neue Abteilung wurde aufgebaut, ein Team im Ausland etabliert und neue kommerzielle Dienstleistungen geschaffen.',

    // ── Open Source ──────────────────────────────
    'os.title':           'Open-Source-Code | Möglichkeiten in Open-Source-Entwicklung entdecken — Jimeno Fonseca',
    'os.desc':            'Entdecken Sie Jimeno Fonsecas Open-Source-Code für wissenschaftliche Reproduzierbarkeit, zugänglich für Entwickler und Forschende, die transparente, wiederverwendbare Projekte suchen.',
    'os.h2':              '<span>Open-Source</span>Beitrag zur reproduzierbaren Wissenschaft',
    'os.p1':              'Ich glaube, dass Wissenschaft und Technik am schnellsten voranschreiten, wenn Modelle, Daten und Methoden offen und reproduzierbar sind. In über einem Jahrzehnt Forschung an der ETH Zürich und am ETH-Singapore Centre sowie durch meine eigenen Unternehmungen habe ich Open-Source-Werkzeuge entwickelt und mitgestaltet, die heute in über 75 Ländern verwendet werden und internationale Politik mitgeprägt haben — einschliesslich Beiträgen zum 6. IPCC-Sachstandsbericht zum Klimawandel.',
    'os.p2':              'Drei Themen durchziehen den Katalog. <strong>Urbane Energiewissenschaft</strong> — <a class="inline-link" href="https://github.com/architecture-building-systems/CityEnergyAnalyst" target="_blank" rel="noopener">City Energy Analyst</a> (CEA), das Flaggschiff, ergänzt durch kleinere Bibliotheken wie EnthalpyGradients für die Gebäudethermodynamik. <strong>Klimaprognose auf politischer Ebene</strong> — DEG-USA und HBLM-USA, die beiden vom IPCC zitierten Modelle für den Gebäudeenergieverbrauch in den USA.',
    'os.p3':              '<strong>Hardware und kleine Experimente</strong> — WoW-SG ist eine anfängerfreundliche Wetterstation auf Rädern, die Mikrocontroller und Sensoren erkundet. BSTS-SG und causalimpact sind Werkzeuge für Bayes\'sche Zeitreihen- und Kausalanalyse. FineBank ist eine App zur persönlichen Finanzverwaltung mit OCR für Kontoauszüge. Verschiedene Domänen, dieselbe Überzeugung: Nützliche Werkzeuge sollten frei verfügbar sein.',
    'os.card.h3':         'jimenofonseca — GitHub',
    'os.card.p':          'Verfechter offener und transparenter Berechnungsmodelle und Datenanalysetechniken. Alle öffentlichen Repositories anzeigen, sortiert nach Sternen.',
    'os.cta':             'Code abrufen',

    // ── Appearances ──────────────────────────────
    'app.title':          'Auftritte | Offene Gespräche über Energiesysteme — Jimeno Fonseca',
    'app.desc':           'Jimeno Fonseca teilt seine Arbeit zu urbanen Energiesystemen und digitalen Werkzeugen durch Vorträge und Interviews mit Institutionen wie ETH Zürich, Axpo Grid und der Europäischen Kommission.',
    'app.h2':             '<span>Auf Video</span>Offene Gespräche über Digitalisierung und Energiesysteme',
    'app.p1':             'Ich teile meine Arbeit zu urbanen Energiesystemen und digitalen Werkzeugen regelmässig durch Vorträge und Interviews — mit Institutionen wie ETH Zürich, Axpo Grid, der Europäischen Kommission, CIGRE und IEEE sowie über Medien wie Channel News Asia, WDR und den Future Design Podcast.',
    'app.p2':             'Was ich in jedem Format versuche: eine technische Idee (BIM, digitale Zwillinge, urbane Energiemodellierung) so zu erklären, dass Ingenieure und Planer damit arbeiten können — nicht nur höflich nicken.',
    'app.cta':            'Kontakt aufnehmen!',

    // ── Publications ─────────────────────────────
    'pub.title':          'Publikationen | Forschung zu urbaner Energie entdecken — Jimeno Fonseca',
    'pub.desc':           'Entdecken Sie Jimeno Fonsecas wissenschaftliche Publikationen zur Modellierung von Quartierenergie, urbanen Energiesystemen und nachhaltiger Stadtplanung. 80+ peer-reviewte Studien, über 2.500 Mal zitiert.',
    'pub.h2':             '<span>Wissenschaftliche Publikationen</span>Grundlagen für die Modellierung von Quartierenergiesystemen schaffen',
    'pub.stat.pubs':      'Publikationen',
    'pub.stat.cites':     'Zitierungen',
    'pub.stat.h':         'IPCC-Mitwirkender',
    'pub.p1':             'Zwei Themen durchziehen die Arbeit. Das erste ist die multiphysikalische Simulation von Energiesystemen auf Gebäude- und Quartiersebene. Das zweite ist datengetriebene Inferenz — maschinelles Lernen und Bayes\'sche Statistik — angewandt auf dieselben Systeme. Vieles davon entstand mit Kolleginnen und Kollegen an der ETH Zürich, am ETH-Singapore Future Cities Lab und an der EPFL.',
    'pub.p2':             'Neben der begutachteten Forschung versuche ich, diese Arbeit für ein breiteres Publikum verständlich zu machen — für alle, die sich für digitale Abbilder des Energiesektors interessieren und für die offene Frage, wie sich deren Emulation näher an den realen Betrieb bringen lässt. Ingenieure, Planer und alle, die an der Schnittstelle von Physik und Software arbeiten.',
    'pub.card.h3':        'Google Scholar — Jimeno Fonseca',
    'pub.card.p':         'Publikationen zu Daten, Informationstechnologie, Energiesysteme und mehr. Vollständiges Profil mit allen Zitierungen und Kennzahlen anzeigen.',
    'pub.cta':            'Zugang erhalten',

    // ── Musik ─────────────────────────────────────
    'v2.music.lede':         'Ein langjähriges Hobby, grösstenteils abseits der Kamera. Ab und zu entweicht ein Clip.',
    'v2.music.p1':           'Musik begleitet mich schon den grössten Teil meines Lebens — angefangen damit, als Teenager Instrumente aufzugreifen, bis hin zum heutigen Noodeln zu Hause. Ich spiele hauptsächlich für mich selbst; ab und zu nehme ich etwas auf, das es wert ist, aufbewahrt zu werden. Der Clip oben ist eines dieser Stücke.',
    'v2.music.cta':          'Zur Startseite',

    // ── Fotografie ────────────────────────────────
    'v2.photo.lede':         'Ausgewählte Fotos — Orte, Menschen, Licht.',
    'v2.photo.caption.kind': 'Auswahl · 2018 – 2025',
    'v2.photo.p1':           'Ich fotografiere schon so lange, wie ich Modelle baue — derselbe Instinkt, nur andere Werkzeuge. Orte, Menschen, die Art, wie Licht zur falschen Tageszeit auf ein Gebäude fällt.',
    'v2.photo.p2':           'Die Sammlung auf dieser Seite ist bewusst klein: Fotos, zu denen ich immer wieder zurückkehre, nicht alles, was ich je aufgenommen habe. Klicken Sie auf ein Bild, um es zu vergrössern — navigieren Sie mit den Pfeiltasten oder wischen Sie.',
    'v2.photo.cta':          'Zur Startseite',
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
