# jimenofonseca.github.io

## ⚙ Maintenance — keep this file alive

This file is the project's memory. Treat it as reference **and** as something
to correct when it is wrong. Propose additions at the end of any session that
introduced a pattern or a non-obvious gotcha; edit immediately on "remember
this"; on "review CLAUDE.md", re-read the whole thing and flag stale
sections, dead file references, redundancy, and claims that contradict each
other.

| Where things go | |
|---|---|
| here | the live site: two pages, three menu items, current mechanics |
| `docs/retired-site.md` | the nine-page site. **Do not re-document retired pages here** |
| `docs/deploy-and-git.md` | deploy internals, push auth, credential troubleshooting |
| `~/.claude/skills/static-site-workflow/SKILL.md` | anything that would apply to a *second* static site |

- Small surgical edits beat sweeping rewrites; show the diff before
  committing, and commit alongside the work that motivated it.
- **Keep this under ~500 lines.** It hit 983 once. When it grows, factor into
  `docs/` — do not trim by deleting knowledge.
- ⚠ **A stale claim here is worse than a missing one.** This file has
  asserted, at various times: a browser-language redirect that had been
  deleted, light as the theme default after dark became it, a LinkedIn link
  that never existed, and a five-row table it described as four. Each sent a
  session down the wrong path. **When you change behaviour, grep this file
  for what you just made untrue.**

---

Personal website of Jimeno Fonseca, served on GitHub Pages at
`https://jimenofonseca.com` (CNAME → `jimenofonseca.github.io`).
Pure static HTML/CSS/JS, no framework. Nothing builds in CI — GitHub Pages
serves committed files. One local generator, `build-i18n.py`, produces the
German tree; its output is committed, exactly like `build-gallery.py`.

**Two content pages, two languages.** The menu is three items: **Intro**
(`/`), **Work** (an outbound link to the LinkedIn profile — no page) and
**Off the clock** (`/art/`).

⚠ **This used to be a nine-page site** built around an enterprise CDIO/CTO
pitch: Proof of scale, three case studies, eight operating principles,
Appearances, Publications. All retired in the Intro/Work/Art reduction. The
pages sit in `_old/retired-pages/`, and **`docs/retired-site.md` holds
everything that was documented about them** — the case-study mirroring
contract, the employer-disclosure rules in full, the principles split. Read
it before restoring any of it; that reasoning is not re-derivable from the
markup.

## File layout

```
.
├── index.html                  # Intro — h1 (the name), short bio, portrait
├── art/                        # Art — Music + Photography on one page
├── de/                         # GENERATED. Never hand-edit; run build-i18n.py
├── projects/                   # redirect stub → / (see "Old URLs")
├── _old/                       # UNPUBLISHED (Jekyll underscore rule)
│   ├── retired-pages/          #   the nine-page site, archived intact
│   └── …                       #   plus the original Jekyll site
├── docs/                       # retired-site.md · deploy-and-git.md
├── private-src/                # GITIGNORED — optional local drafts
├── assets/
│   ├── portrait.jpg            # Intro portrait
│   ├── og-image.jpg            # 1200×630 share card (both pages)
│   └── photography/            # 12 gallery photos + thumb/ (_originals/ gitignored)
├── style.css                   # All site styles
├── app.js                      # Mobile sidebar + photo lightbox. Nothing else
├── i18n.js                     # EN/DE copy — 16 keys each. Build input only
├── build-gallery.py            # Photo pipeline → writes into art/index.html
├── build-i18n.py               # Generates de/ from the EN pages + i18n.js
├── appendix-og-image.py        # Regenerates assets/og-image.jpg
├── validate.js                 # Site checks — CI runs this on every push
├── sitemap.xml                 # 2 pages × 2 languages; the stub is excluded
└── robots.txt                  # Allow all + Sitemap: pointer
```

### How the site deploys

Branch deploy (Settings → Pages → "Deploy from a branch"). No build step —
Pages serves committed files. `.github/workflows/ci.yml` is the only
workflow and it just runs `node validate.js`.

⚠ **Never add a `.nojekyll` file.** Jekyll's underscore rule is what keeps
`_old/` unpublished, and `_old/` holds the entire former Jekyll site *plus
`_old/retired-pages/`* — the whole nine-page site taken down in the
reduction. `.nojekyll` would publish all of it at `/_old/...`, including a
stray `CNAME` and every page that was deliberately retired.

**Why there is no `pages.yml`, and the rebuild-lag figure:
`docs/deploy-and-git.md`.**

### Old URLs

Sixteen URLs went away in the reduction and **serve 404 on purpose** —
redirect stubs pointing at `/` were offered and declined. One stub survives,
`/projects/` → `/`, because the old Jekyll site published `/Projects.html`
and the destination still exists. `validate.js` skips any page with a
`<meta http-equiv>`.

**The full list, the SEO cost, and the "do not re-justify `/projects/` with
LinkedIn" correction: `docs/retired-site.md`.**

## Design system (Swiss / minimalist)

- **Typography**: Inter Tight (sans) + IBM Plex Mono (labels, numbers)
- **Layout**: flush-left sticky sidebar (240px) + content column (max 1200px)
- **Hairlines, not boxes**: borders between rows, no card shadows
- **Mono is for labels, sans is for content.** IBM Plex Mono uppercase in
  `--accent` marks what is *not* prose: eyebrows, the number rail,
  media-caption kinds, the gear list. Everything read is Inter Tight.
- **One title treatment, never per-section.** Titles are Inter Tight, weight
  500, `var(--fg)`. The retired pages learned this the hard way: one section
  used a 10.5px mono uppercase accent heading, which made it look like a
  different *kind* of content from its neighbours.
- **Language**: one per URL, plain HTML. No JS swap, no browser-language
  detection — see "Two language trees".

### Theme — there isn't one

**The site is dark, permanently.** One palette in `:root`, no toggle, no
`prefers-color-scheme`, no theme attribute or selector anywhere, and
`<meta name="color-scheme" content="dark">` so the UA paints its canvas dark
before `style.css` lands. **Do not reintroduce any of it** — nothing reads a
theme any more, and a `:root`-vs-override split would just be a trap for
whichever page forgot the attribute.

Removed with it: `applyTheme()`, `toggleTheme()`, the `v2.theme.label` key,
the sidebar's Theme row, and the **entire inline `<head>` script** — its only
remaining job had been applying a stored theme before paint. `app.js` no
longer touches `localStorage` at all.

⚠ This was the "large, risky refactor" earlier versions of this file
deliberately deferred: `:root` held the *light* palette with a dark override
on `<html>`, which was correct while a toggle existed. With the toggle gone
the refactor became the safe option, so the dark values now live in `:root`
directly. Verified after the change: dark with JS on, dark with JS off, and
dark with the OS set to light.

## Sidebar navigation order

**Three items, one flat `.nav-group`, no group label** — numbered 01–03
because nothing conflicts any more (the old About group was deliberately
*un*numbered to avoid colliding with Case Studies 01–03).

| | | |
|---|---|---|
| 01 | Intro | `/` — `→` |
| 02 | Work | `https://www.linkedin.com/in/jimenofonseca/` — `↗`, `target="_blank"` |
| 03 | Off the clock | `/art/` — `→` |

**Work is an outbound link, not a page.** There is no `/work/`. Nothing
intercepts clicks any more, so it needs no special handling — the browser
just follows it.

⚠ **The third item is called "Off the clock" but lives at `/art/`**, and its
keys are still `nav.art`, `art.title`, `art.desc`, `v2.art.lede`. The label
was renamed from "Art"; the URL and the key names were deliberately left
alone — same call as `nav.openSource` on the retired IPCC page. `/art/` is
short, already in `sitemap.xml` and submitted to Search Console, and no
reader sees a key name. **Do not rename either for tidiness.** German:
**Feierabend**, which is precisely the time after work and keeps the menu to
single words: *Intro · Arbeit · Feierabend*.

⚠ **GitHub and Google Scholar are gone from the site *and* from the Person
JSON-LD `sameAs`** — an explicit decision, not an oversight. `sameAs` holds
Wikidata (`Q140798347`) and LinkedIn only. Do not "restore" them.

## Workflows

### Updating copy

1. Edit `i18n.js` — **both** `en:` and `de:`.
2. `python3 build-i18n.py` — rewrites the English fallbacks from `en:` and
   regenerates the whole `de/` tree from `de:`.
3. `node validate.js`, then commit `i18n.js`, the English pages and `de/`
   together.

Forgetting step 2 fails CI by design. ⚠ `og:`/`twitter:` tags carry no i18n
attribute, so they do **not** follow — hand-edit them in the same pass.

### Updating structure (HTML / CSS)

Edit the **English** page (`index.html`, `art/index.html`), then run
`build-i18n.py` to mirror it into `de/`. Never hand-edit `de/`.

### Working on the Off-the-clock page (`/art/`)

`/art/` is **one page, two parts** — Music then Photography, each a plain
`<section class="art-part">`: a numbered eyebrow, the media, one caption
line. The base `section` rule supplies the hairline between them and
`section:first-of-type` keeps `.page-intro` borderless, so the parts carry no
layout CSS beyond `.art-part .eyebrow { margin-bottom: 18px }`, which pulls
each label down onto its media so the pair reads as one block.

- **Music**: a YouTube iframe (`6dDU8wfSiEg`) with `loading="lazy"`.
- **Photography**: 12 photos from `assets/photography/`. The `app.js`
  lightbox binds to `.photo-grid figure[data-full]`; `cursor: zoom-in` is the
  only affordance, since no prose tells people to click.

⚠ **To drop a photo, delete it from `_originals/` too.** The gallery markup
is generated, so pulling a `<figure>` and the two JPEGs is only half the job
— the next `build-gallery.py` run rebuilds the list from `_originals/` and
brings the photo straight back. `photo-05.jpg` was removed this way and its
original still needs deleting on Jimeno's machine.

⚠ **The page has no prose at all, and that is the design.** The whole page is
the h1, two numbered eyebrows, two media blocks and two caption lines.
Removed in stages: three paragraphs (`v2.music.p1`, `v2.photo.p1`,
`v2.photo.p2`), the `.gear-list` camera aside, and finally the lede
(`v2.art.lede`, "Music I have recorded, and photographs I keep coming back
to.") — the h1 already says what the page is. `.art-text`, `.gear-*` and the
last use of `.page-lede` went with them. **Do not add explanatory prose
back.**

⚠ **A lone final thumbnail is centred, not spanned** —
`figure:last-child:nth-child(3n + 1) { grid-column: 2 }`, keyed to
`:nth-child` so it survives `build-gallery.py` changing the photo count, and
scoped to `min-width: 901px` where 3 columns actually apply. Spanning the row
was rejected: the thumbs are 600x600 centre crops, so a 3:1 stretch would
slice the middle out of one. At 12 photos the rule is dormant — 12 divides by
3 — so **do not assume it works because the grid looks right today.**

### Updating the photo gallery

```bash
# 1. Drop full-size originals (any size, any name) into:
open assets/photography/_originals/

# 2. Generate web-size fulls + 600x600 thumbs AND rewrite the <figure> blocks
#    between the GALLERY-START / GALLERY-END markers in art/index.html:
python3 build-gallery.py

# 3. Commit
git add assets/photography/ art/ && git commit -m "Update photo gallery" && git push origin main
```

Uses macOS native `sips`, no ImageMagick. `_originals/` is gitignored.

⚠ **`build-gallery.py` writes into `art/index.html`.** Its target moved when
the gallery did. If you ever restore `/photography/`, move the target back,
or the generator silently updates a page nobody serves.

### Adding a new page

Three things are required or CI fails: the English file, a `build-i18n.py`
run, and the page's two `<loc>` entries in `sitemap.xml`. There is no head
script to copy any more.

For anything large, build it as `art/index-new.html` / `index-new.html` with
temporary asset names, preview locally, then swap onto the canonical names
and fix the internal references — all in one commit.

### Local preview

```bash
python3 -m http.server 8080    # → http://localhost:8080/
```

`.claude/launch.json` defines the same for Claude's preview tool.

## Two language trees — one URL per language

English at `/` and `/art/`, German at `/de/` and `/de/art/`. Every page ships
its text as plain HTML in **one** language.

**Why:** Google indexes what is in the HTML and does not run a language
switcher — so while both languages shared one URL, every German string was
invisible to search, including to the German-speaking recruiters the `/de/`
tree exists for.

`i18n.js` is the only place copy lives (`en:` + `de:`, 16 keys each) and is
**build input, never served to browsers**. English pages are hand-authored
and `build-i18n.py` refreshes their fallbacks from `en:`; **`de/**` is
generated and must never be hand-edited** — the generator deletes and
rewrites the tree.

- Every page has a **self-referential canonical** and names `en`, `de` and
  `x-default` in its `hreflang` set, itself included. The set must be
  **reciprocal**: if German names English but not vice versa, Google
  silently discards the whole annotation.
- **`x-default` points at English**, the primary language.
- **No redirect by browser language.** Each URL serves one language always;
  the sidebar switcher links to the counterpart. Google advises against
  language-sniffing redirects, and one would contradict the canonical.

## ⚠ EN/DE parity — non-negotiable

**Every change to an English `i18n.js` key MUST update the German equivalent
in the same edit and the same commit.** Never defer "I'll do German later".

`grep -n "'your.key.name'" i18n.js` returns two lines — one per block. Edit
both. If you cannot write the German, ship a literal translation with a
`// FIXME(de)` comment rather than an English-only key.

⚠ Two traps. **On bulk edits, assert the change landed exactly twice** — a
regex requiring whitespace after the colon silently misses keys written
`'key':'value'`, which has caused a real one-sided edit here. And **parity
means *equivalent*, not *simultaneously edited***: "The Outcome" maps to
"Das Ergebnis" because German does not split Result/Outcome, so an English
rewording sometimes needs no German change. Do not "fix" those.

### What the tooling enforces, and what it does not

✅ `node validate.js` checks **4 pages** — 2 English, 2 German — each
against its *own* language block, plus: EN/DE key parity; every `data-i18n`
key exists; exactly one `Person` JSON-LD per home page with a `url` matching
its canonical; a self-referential canonical and a reciprocal `hreflang` set
with a matching `<html lang>`; and that `sitemap.xml` lists **exactly** the
validated pages — that last one because the page list comes from a directory
scan while the sitemap is hand-written, so **add a page → add its `<loc>`**.
CI runs it on every push and PR.

❌ Nothing verifies the German is *good*, only that it exists — still a human
job. `data-i18n-html` keys are checked for existence only, so verify inline
markup by hand.

## i18n key conventions

16 keys per language. `nav.*` is the sidebar plus the two Art part headings;
`home.*` / `art.*` are per-page `<title>` and `<meta description>`;
`hero.h1` is the Intro heading (the name); `about.bio` is the bio; `v2.*` is
everything else — the two caption kinds and the chrome
(`v2.lang.label`, `v2.menu.open`). The `v2.` prefix is an
artefact of an old redesign, not a version scheme.

Every key MUST exist in both blocks; `node -c i18n.js` after editing.
`data-i18n` sets `textContent`, `-html` sets `innerHTML`, `-content` sets a
`<meta>`'s `content`, `-aria` sets `aria-label`.

## ⚠ HTML fallbacks must match the `en:` values

Every `data-i18n` element carries hardcoded fallback text and every
`data-i18n-content` a hardcoded `content` attribute. **Crawlers index that
fallback** — Google never runs `applyLang()`. So `build-i18n.py` rewrites
them from `en:`; never hand-patch the HTML.

Skip the generator and the site serves two versions: current copy to
visitors, superseded copy to search engines and LinkedIn's scraper. That
happened — the publications page advertised "an h-index of 20" to Googlebot
long after the visible text moved on. `validate.js` catches it now.

## Social meta & structured data

Both pages carry `<link rel="canonical">`, Open Graph (`og:type`,
`og:site_name`, `og:locale`, `og:url`, `og:title`, `og:image` +
width/height/alt) and Twitter card tags, all pointing at
`https://jimenofonseca.com/assets/og-image.jpg` (1200x630).

⚠ **Every description on the site is the string `Jimeno Fonseca`** — all
twelve of them: `<meta name="description">`, `og:description` and
`twitter:description`, on both pages in both languages. `home.title` and
`art.title`'s page name aside, the titles are the same. This is deliberate
and was arrived at twice.

They used to read "Jimeno Fonseca turns digital technology into lasting
capability. Head of Digital Engineering at Axpo Grid, …" — the retired
slogan plus the job title, stripped from the hero, the sidebar, the share
card and the title tag, with the metadata as the last place it survived.

⚠ **They were briefly deleted outright, and that was wrong.** Removing
`og:description` does not give LinkedIn nothing — it makes LinkedIn **scrape
the page body instead**, so the card quotes the bio (Axpo, the PhD, the lot)
with no control over which sentence it picks. A deliberately minimal
description is the only way to suppress that. **Do not remove them again.**

The Person JSON-LD keeps **no** `description`: nothing scrapes it, so it has
no fallback to suppress, and a copy of `name` would be noise. The entity
still carries name, url, image, jobTitle, worksFor, alumniOf, knowsAbout and
sameAs.

⚠ **The SEO cost is accepted.** `<title>` is the strongest on-page signal
there is, and the home page no longer matches a query like *"digital
technology leader energy"*; nothing in the metadata carries those keywords
now. A name search is unaffected, or slightly better, since the title is
exactly the query. **Do not "restore" the positioning line.**

⚠ **Four keys now share the `en:` value `Jimeno Fonseca`** — `hero.h1`,
`home.title`, `home.desc`, `art.desc`. `translate_static_meta()` builds its
reverse map with `setdefault`, so the first one wins (currently `art.desc`)
and the rest are unreachable through it. That is harmless only because all
four have the *same* German value. **Give any one of them a different German
string and a static `og:` tag on some other page will silently pick up the
wrong translation.** If that day comes, disambiguate the English values or
give the tag its own key.

- ⚠ **The `og:`/`twitter:` tags are deliberately static — never wire them to
  `data-i18n`.** Scrapers run no JS, so an i18n attribute buys nothing and
  doubles the parity burden. The flip side, and the thing that keeps biting:
  **when an `i18n.js` key changes, the social copy does not follow.** Edit it
  by hand in the same pass. `build-i18n.py` translates these into German by
  exact reverse-lookup of the `en:` values, so the English tag must match its
  key's value verbatim or the German card silently stays English.
- ⚠ **Exactly one `Person` JSON-LD block, on `index.html` only.** It is the
  entity anchor; a second block hands Google conflicting claims about the
  same person. That has happened once — a hand-edit added one at the top of
  `<head>` while the original sat further down. Its `url` must match the
  page's canonical exactly (no `www.`, keep the trailing slash).
  `validate.js` enforces both. `sameAs` holds Wikidata (`Q140798347`) and
  LinkedIn; GitHub and Google Scholar were removed deliberately.
- ⚠ **No location anywhere.** The footer's "Zürich, CH", the JSON-LD
  `homeLocation` and the city in `og:image:alt` were all removed on request.
  `homeLocation` is a genuine local-SEO signal for a Zürich-based candidate,
  so it is the kind of thing a later session will want to "restore" — don't.
  The only Zürich left is **ETH Zürich**, which is a degree, not an address.

Regenerate the share card with `python3 appendix-og-image.py` (needs
`pillow`, `fonttools`, `brotli`; pulls Inter Tight from npm so the card
matches site typography). ⚠ **It reads `assets/portrait.jpg` and crops a
panel of it**, so swapping the portrait silently staled the card until this
was noticed — regenerate it in the same commit, always.

The card is **dark** (the exact `:root` tokens) and carries **the name, the
domain, and the portrait — nothing else.** No rule either: a hairline with
nothing under it reads as a cut-off card rather than a deliberate one.

⚠ **Everything that could go stale is deliberately absent**, because
LinkedIn caches OG images hard and a wrong card outlives the correction:

| Out | Why |
|---|---|
| slogan | It led with "I turn technology into lasting capability." over a strapline found nowhere on the site. The card was the last place that survived the reduction. |
| company | Neither the employer nor Superurbana. |
| job title | Would go out of date on every promotion. |
| city | Removed from the footer, the JSON-LD `homeLocation` and `og:image:alt` on request; this is the most public surface of the four. |

A name is the one thing that cannot become untrue. **Do not add copy back.**
`og:image:alt` is just `"Jimeno Fonseca"` so it describes what the image
actually shows.

After changing meta or the card, re-scrape at
<https://www.linkedin.com/post-inspector/> and validate at
<https://search.google.com/test/rich-results>.

### When the job title changes

`Head of Digital Engineering` sits in four places — change them together,
EN **and** DE: `i18n.js` → `home.desc` and `about.bio`; and `index.html`'s
JSON-LD (`jobTitle`, `description`) and `og:`/`twitter:` descriptions.

⚠ **Re-derive that list if the pages change shape.** It has been wrong twice
— it once carried two keys that rendered on no page at all, and it listed
`v2.role` after the sidebar role line was deleted.

**The sidebar carries the name only** — the `Digital Engineering — Axpo
Grid` role line was removed from the brand block on both pages and `v2.role`
deleted, so nothing states the title above the fold any more; it survives
only in the bio and the metadata.

⚠ **The bio still names Axpo**, so the employer-disclosure rules still bite
even with the case studies gone: never publish Axpo revenue, margin, pricing
method or internal headcount; budget *scope* is Jimeno's own authority and is
fine as a band; never call the role a "department" / "Abteilung"; name the
issuing body on every credential. **A claim with no number in it can still be
disclosure** — "revenue-generating" and "OPEX liability" survived two sweeps
that were only looking for figures. Full reasoning in
`docs/retired-site.md`.

## The Intro page

An `<h1>`, one paragraph, and the portrait. That is all it is meant to be.

⚠ **`hero.h1` holds the name, not a slogan.** It used to read "I turn digital
technology into lasting capability.", with `hero.p` as a supporting lede;
both went in the reduction. An `<h1>` was *kept*, with the name in it,
because this page is now the site's entire search surface and a home page
with no heading is a real defect. **Do not read the sparse hero as
unfinished**, and do not add a tagline unless asked. Gone with the slogan:
the `page-eyebrow`, the `bio-label`, and the portrait's `figcaption` (it held
the name, which the `h1` now says centimetres away). `#bio` stays so old deep
links land.

⚠ **The `#recently` section held nine LinkedIn embeds. Do not bring them
back** — unfiltered, aged badly, duplicated a surface that already exists,
and ~7.5s of script evaluation on a mid-range phone.

### The portrait, and the dead space under it

`assets/portrait.jpg`, 3:4, no caption and no JS. To replace: drop a new file
in `assets/` (~900x1200, under 200 KB) and repoint the `<img src>` in
`.hero-figure`. On macOS, `sips -c` crops and `sips -Z 1200` resizes.

⚠ **`main.content` is stretched to 100vh whatever is on the page**, because
`.shell` carries a `min-height: 100vh` and the sticky sidebar is
`height: 100vh`. On a one-section page that dumped the whole surplus below
the portrait — measured at 1440x900: 64px of section padding, **196px of
empty stretched content box**, and 96px of main padding, so **356px of
nothing** between the picture and the footer, growing on taller screens.

Two changes fixed it, and the numbers are worth keeping because the cause is
not visible in the markup:

| | |
|---|---|
| `--portrait-w` 360px → **440px** | fills the surplus with the subject of the page rather than removing space. The portrait is the only visual on it. |
| `main.content:has(> .hero)` gets `flex` + `justify-content: center`, `padding-bottom: 56px`, and its `.hero` loses `padding-bottom` | turns the remaining slack into balanced space above and below instead of a gap at the bottom |

Dead space under the portrait went 356px → 153px at 1440x900, and at
1440x1080 it is now symmetric (251px above the name, 243px below the
picture) rather than all at the bottom.

**The `:has()` scoping is load-bearing**: the Off-the-clock page has real
sections and must start at the top, so it must keep `display: block` and its
96px padding. Verified after the change — do not widen the selector to plain
`main.content`.

⚠ **The left column will still look empty below the bio**, and that is
unavoidable: a ~220px bio next to a 587px portrait cannot balance without
making the text column absurdly narrow. Asymmetric whitespace is normal in
this layout; do not "fix" it by shrinking the portrait, which just moves the
gap back under the picture.

## Page transition

A 220ms cross-fade, done by the browser. Four rules in `style.css` and **no
JavaScript at all**:

```css
@view-transition { navigation: auto; }
::view-transition-old(root), ::view-transition-new(root) { animation-duration: 220ms; }
.sidebar { view-transition-name: sidebar; }   /* holds still across pages */
@media (prefers-reduced-motion: reduce) { @view-transition { navigation: none; } }
```

Cross-document view transitions need the at-rule in **both** documents,
which they get by sharing `style.css`. Unsupported browsers (Firefox, for
now) navigate instantly — normal web behaviour, and no worse than before.

⚠ **This replaced a ~2s "hyperspace jump"** — a JS overlay of 120 stretching
star streaks plus an arrival deceleration: 109 lines of `app.js`, ~135 of
`style.css`, its own theme tokens, and a `sessionStorage` flag read before
paint. **Its real cost was 1150ms added to every navigation**, because the
click handler let the animation finish before navigating. Gone, with
`docs/hyperjump.md`; git history has both.

It also took `isInternalNav()` with it, so nothing intercepts link clicks
now. If you ever reintroduce that, it existed to exclude cross-origin links
and `target="_blank"` so the Work link never triggered the effect.

## Mobile performance

Measured on an emulated Pixel 5, 4x CPU throttle, third party answering in
800ms. Two changes did nearly all the work: the non-blocking font stylesheet
took FCP from ~1,100ms to ~330ms, and deleting the LinkedIn embeds removed
~7.5s of the 11.5s main-thread total.

- **The Google Fonts stylesheet must stay non-blocking.** A third-party
  `<link rel="stylesheet">` in the critical path holds first paint for a full
  round trip. It loads as `media="print" onload="this.media='all'"` with a
  `preload` warming the request and a `<noscript>` fallback; `display=swap`
  keeps text readable meanwhile. **Do not "tidy" this into a plain link.**
- **Only request weights that exist in `style.css`** — 300, 400, 500.
- **gtag loads on the `load` event**, queueing into `dataLayer` first so the
  pageview is not lost. In the head it cost a 171ms forced reflow.
- The portrait carries `width`/`height`, `fetchpriority="high"`,
  `decoding="async"` and `aspect-ratio: 3/4`, so CLS is 0.

Still open, needing macOS `sips`: `/art/`'s gallery thumbnails are ~4x
oversized (~1.3 MB across 12 files).

The portrait's oversizing resolved itself when `--portrait-w` went to 440px:
a 440px CSS box is 880 device px on a 2x display and the file is 896px wide,
so it is now about right and no longer wants a `srcset`. **Keep replacements
near 896x1200** to hold that.

⚠ **`style.css` keeps many dead rules** after the reduction — `.principle*`,
`.proof*`, `.outcome*`, `.cs-*`, `.page-nav`, `.page-stats`, `.page-actions`,
`.cta-link`, `.bio-label`, `.feed-more`. Left alone on purpose: one cached
file, zero runtime cost, and a blind prune risks the **runtime-created**
classes that look dead to a grep — `lightbox`, `lightbox-caption`,
`lightbox-close`, `lightbox-nav`, `open`.

## Common gotchas

- **Edited `i18n.js` and forgot `build-i18n.py`** — `validate.js` fails with
  `stale-fallback`. Run the generator; do not hand-patch HTML.
- **Hand-edited something under `de/`** — the next generator run silently
  discards it. German copy lives in `i18n.js`, nowhere else.
- **There is no inline `<head>` script any more.** It had three jobs and
  lost all of them: language detection (with the runtime `i18n.js`), the
  hyperjump arrival flag (with the hyperjump), and applying a stored theme
  (with the theme). A new page needs no script block.
- **Absolute asset paths** (`/style.css`, `/app.js`) so they resolve from any
  nested directory.
- ⚠ **`style.css` and `app.js` carry `?v=N` — bump it when their behaviour
  changes.** Both are still fetched at runtime, and GitHub Pages serves them
  with `Cache-Control: max-age=600` and no way to change that without a CDN.
  Unversioned, a returning visitor keeps running the old JS for up to ten
  minutes. That bit us the moment the hyperjump was deleted: the code was
  gone from `main`, Pages had deployed, and the effect still played from
  cache. Currently `v=1`.

  There is **no pre-commit hook** doing this any more — the old one existed
  for `i18n.js` and went when `i18n.js` stopped being served. Bumping is
  manual, so a change to either file that visitors must see immediately
  needs the version bumped in **both** English pages, then
  `build-i18n.py`. Note also that a rebase fires no hooks, which is how the
  old scheme once shipped `v=38` twice.
- **`.gitignore` does not untrack.** Two videos committed *before* the ignore
  rules kept shipping — 92 MB published that no page referenced.
  `git rm --cached` fixed it. Add a large asset and later ignore it → check
  `git ls-files`, not the ignore rule. This frees the *published* site, not
  `.git`; the objects stay in history.
- **Photos in `_originals/` never reach GitHub** (gitignored). Copy the
  folder by hand when switching machines.
- **Pages rebuild lag**: 30–60s after a push. If a change still is not
  visible after that, check the deploy actually ran
  (`pages build and deployment`, not just CI) before assuming the code is
  wrong — and then check the browser cache, which is the likelier answer for
  `style.css` / `app.js`.

## Pushing

**Always `git push origin main`** — never the URL-with-embedded-token form.
Pushing to an explicit URL uploads the commits but leaves
`refs/remotes/origin/main` stale, so every local tool reports unpushed work
and Jimeno has to "push" again from GitHub Desktop to sync the ref.

The PAT is in the macOS Keychain via the `osxkeychain` helper, so plain
`git push origin main` just works. `git config http.postBuffer 524288000` is
already set for this clone — needed for 20+ MB photo batches.

**Credential troubleshooting and large-push symptoms:
`docs/deploy-and-git.md`.**
