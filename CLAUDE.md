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
| `docs/hyperjump.md` | the page-transition anatomy and its tuning knobs |
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
**Art** (`/art/`).

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
├── docs/                       # retired-site.md · deploy-and-git.md · hyperjump.md
├── private-src/                # GITIGNORED — optional local drafts
├── assets/
│   ├── portrait.jpg            # Intro portrait
│   ├── og-image.jpg            # 1200×630 share card (both pages)
│   └── photography/            # 13 gallery photos + thumb/ (_originals/ gitignored)
├── style.css                   # All site styles
├── app.js                      # Theme toggle, mobile sidebar, lightbox, hyperjump
├── i18n.js                     # EN/DE copy — 22 keys each. Build input only
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

### Old URLs — the reduction chose 404 over redirects

Sixteen URLs went away (`/principles/`, `/digital-transformation/`, `/cea/`,
`/ipcc/`, `/appearances/`, `/publications/`, `/music/`, `/photography/`, each
in both languages). **They serve 404 on purpose** — stubs pointing everything
at `/` were offered and declined.

The cost, not reversible on Google's timetable: every indexed result and
inbound link for the case studies breaks, the URLs drop out within weeks, and
anything restored later returns cold. The pages are intact in
`_old/retired-pages/`; restoring one is a `git mv` back, a `build-i18n.py`
run, its `<loc>` entries, and its i18n keys out of git history.

**One stub survives**: `/projects/` → `/` (meta-refresh + canonical +
`noindex, follow` + JS `location.replace`), because the old Jekyll site
published `/Projects.html` and the destination still exists.
`/open-source/` was deleted with the rest — it pointed at `/ipcc/`, and a
redirect to a 404 is worse than a 404.

⚠ **Do not re-justify `/projects/` with LinkedIn.** This file once claimed
the profile's Portfolio link pointed at `www.jimenofonseca.com/projects`. It
does not — the field is the bare domain. **Disproven, not merely
unverified.** `validate.js` skips any page with a `<meta http-equiv>`.

## Design system (Swiss / minimalist)

- **Typography**: Inter Tight (sans) + IBM Plex Mono (labels, numbers)
- **Layout**: flush-left sticky sidebar (240px) + content column (max 1200px)
- **Hairlines, not boxes**: borders between rows, no card shadows
- **Mono is for labels, sans is for content.** IBM Plex Mono uppercase in
  `--accent` marks things that are *not* prose: section eyebrows, the number
  rail, media-caption kinds, the gear list. Everything a reader actually
  reads is Inter Tight.
- **One title treatment, never per-section.** Titles are Inter Tight, weight
  500, `var(--fg)`. The retired pages learned this the hard way: one section
  used a 10.5px mono uppercase accent heading, which made it look like a
  different *kind* of content from its neighbours.
- **Language**: one per URL, plain HTML. No JS swap, no browser-language
  detection — see "Two language trees".

### Theme — dark is the default

Light/dark via `[data-theme]` on `<html>`, persisted in localStorage. **Dark
is a design decision, not a reading of the visitor's OS**: every page ships
`<html lang="…" data-theme="dark">` in the markup, so the default survives JS
being off with no first-paint flash, and `<meta name="color-scheme"
content="dark light">` lets the UA paint its canvas dark before `style.css`
lands. `prefers-color-scheme` is **not consulted anywhere** — don't
reintroduce it thinking it is missing.

Three places carry the default and must agree: each page's `<html>` tag
(`data-theme="dark"`), each page's sidebar toggle (`class="opt active"` on
the **dark** span), and `app.js`'s `|| 'dark'` fallbacks in `toggleTheme()`
and init.

⚠ **`app.js`'s init must never call `applyTheme()`.** It writes to
localStorage, so calling it on load stamps a theme on a first-time visitor
who never chose one — freezing the guess and making any future change to the
site default invisible to everyone who has ever loaded the page. Init only
syncs the toggle's `.active` class. This was a live bug while light was the
default: `localStorage.getItem('theme') || 'light'` wrote `light` on first
paint.

`style.css` is the exception to dark-first: `:root` holds the **light**
palette and `html[data-theme="dark"]` overrides it. Deliberate — the markup
default does the work, and swapping the blocks is a risky refactor for no
visible gain.

## Sidebar navigation order

**Three items, one flat `.nav-group`, no group label** — numbered 01–03
because nothing conflicts any more (the old About group was deliberately
*un*numbered to avoid colliding with Case Studies 01–03).

| | | |
|---|---|---|
| 01 | Intro | `/` — `→` |
| 02 | Work | `https://www.linkedin.com/in/jimenofonseca/` — `↗`, `target="_blank"` |
| 03 | Art | `/art/` — `→` |

**Work is an outbound link, not a page.** There is no `/work/`, and
`app.js`'s `isInternalNav()` excludes `target="_blank"`, so the hyperjump
correctly does not fire on it.

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

### Working on the Art page

`/art/` is **one page, two parts** — Music then Photography, each a plain
`<section class="art-part">` with a numbered eyebrow. The base `section` rule
supplies the hairline between them and `section:first-of-type` keeps
`.page-intro` borderless, so the parts need no layout CSS of their own; only
`.art-text` was added, for the body copy under each media block.

- **Music**: a YouTube iframe (`6dDU8wfSiEg`) with `loading="lazy"`.
- **Photography**: 13 photos from `assets/photography/`. The `app.js`
  lightbox binds to `.photo-grid figure[data-full]`.
- **Kit list**: `.gear-list` is hardcoded English with no i18n keys — they
  are model names, which do not translate. Six items, edited in the markup.

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
run, and the page's two `<loc>` entries in `sitemap.xml`. Copy the inline
`<head>` script from an existing page too, or the new page flashes the wrong
theme and lands without the arrival animation.

For anything large, build it as `art/index-new.html` / `index-new.html` with
temporary asset names, preview locally, then swap the `-new` files onto the
canonical names and fix the internal references — all in one commit.

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

| | |
|---|---|
| `i18n.js` | the only place copy lives, `en:` + `de:`, 22 keys each. **Build input — never served to browsers** |
| English pages | hand-authored; `build-i18n.py` refreshes their fallbacks from `en:` |
| `de/**` | **generated. Never hand-edit** — the generator deletes and rewrites the tree |
| `hreflang` | every page names `en`, `de` and `x-default`, itself included |
| canonical | self-referential |

- **No redirect by browser language.** Each URL serves one language always;
  the sidebar switcher links to the counterpart. Google advises against
  language-sniffing redirects, and one would contradict the canonical.
- **`x-default` points at English**, the primary language.
- The `hreflang` set must be **reciprocal** — if German names English but not
  vice versa, Google silently discards the whole annotation.

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

✅ `node validate.js` checks **4 pages** — 2 English, 2 German — each against
its *own* language block, plus: EN/DE key parity; every `data-i18n` key
exists; exactly one `Person` JSON-LD per home page with a `url` matching its
canonical; a self-referential canonical and a reciprocal `hreflang` set
(`en`/`de`/`x-default`) with a matching `<html lang>`; and that `sitemap.xml`
lists **exactly** the validated pages. CI runs it on every push and PR.

That sitemap check exists because the page list comes from a directory scan
while `sitemap.xml` is hand-written. **Add a page → add its `<loc>`.**

❌ Nothing verifies the German is *good*, only that it exists — still a human
job. `data-i18n-html` keys are checked for existence only, so verify inline
markup by hand.

## i18n key conventions

22 keys per language. `nav.*` is the sidebar plus the two Art part headings;
`home.*` / `art.*` are per-page `<title>` and `<meta description>`;
`hero.h1` is the Intro heading (the name); `about.bio` is the bio; `v2.*` is
everything else — `v2.role`, `v2.art.lede`, `v2.music.p1`, `v2.photo.p1/p2`,
the caption kinds, and the chrome (`v2.theme.label`, `v2.lang.label`,
`v2.menu.open`).

The `v2.` prefix is an artefact of an old redesign, not a version scheme.
Not worth renaming 12 keys to remove it.

Every key MUST exist in both blocks. `node -c i18n.js` after editing.

| Attribute | Sets |
|---|---|
| `data-i18n` | `textContent` |
| `data-i18n-html` | `innerHTML` (content with inline markup) |
| `data-i18n-content` | the `content` attribute (`<meta>`) |
| `data-i18n-aria` | `aria-label` |

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
`og:site_name`, `og:locale`, `og:url`, `og:title`, `og:description`,
`og:image` + width/height/alt) and Twitter card tags, all pointing at
`https://jimenofonseca.com/assets/og-image.jpg` (1200x630).

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

Regenerate the share card with `python3 appendix-og-image.py` (needs
`pillow`, `fonttools`, `brotli`; pulls Inter Tight from npm so the card
matches site typography). **It carries no job title on purpose** — LinkedIn
caches OG images hard, so a title on it would go stale.

After changing meta or the card: re-scrape at
<https://www.linkedin.com/post-inspector/> and validate at
<https://search.google.com/test/rich-results>.

### When the job title changes

`Head of Digital Engineering` sits in five places — change them together,
EN **and** DE: `i18n.js` → `v2.role`, `home.desc`, `about.bio`; and
`index.html`'s JSON-LD (`jobTitle`, `description`) and `og:`/`twitter:`
descriptions.

⚠ **Re-derive that list if the pages change shape.** It has been wrong
before — it once carried two keys that rendered on no page at all.

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
back.** Unfiltered, aged badly, duplicated a surface that already exists, and
~7.5s of script evaluation on an emulated mid-range phone — the largest
single cost the site ever carried.

### The portrait

`assets/portrait.jpg`, 3:4, no caption and no JS. To replace: drop a new file
in `assets/` (~900x1200, under 200 KB) and repoint the `<img src>` in
`.hero-figure`. On macOS, `sips -c` crops and `sips -Z 1200` resizes.

`assets/portrait_music.jpg` and `assets/portrait_photography.jpg` are left
over from a retired 3-slide reel, referenced nowhere. Delete if it is not
coming back.

## Page transition (hyperjump)

Every internal navigation plays a ~2s Star Wars hyperspace jump: an overlay
covers the content frame (the sidebar stays anchored), ~120 stars streak
right, and the new page arrives scaled-up and blurred. Theme-aware, and
`prefers-reduced-motion: reduce` gets an instant page swap instead.

Three pieces: CSS at the end of `style.css`, the second IIFE at the end of
`app.js`, and the inline `<head>` script that reads the `sessionStorage` flag
*before paint* so the arrival starts on frame 1.

**Tuning, disabling, and the full anatomy: `docs/hyperjump.md`.**

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

Still open, both needing macOS `sips`: the portrait is served at 901x1202
into a 560x747 box (~55 KiB wasted, wants a `srcset`), and `/art/`'s gallery
thumbnails are ~4x oversized (1.4 MB across 13 files).

⚠ **`style.css` keeps many dead rules** after the reduction — `.principle*`,
`.proof*`, `.outcome*`, `.cs-*`, `.page-nav`, `.page-stats`, `.page-actions`,
`.cta-link`, `.bio-label`, `.feed-more`. Left alone on purpose: one cached
file, zero runtime cost, and a blind prune risks the **runtime-created**
classes that look dead to a grep — `hyperjump`, `hyperjump-flash`,
`hyper-arrive`, `star`, `lightbox`, `lightbox-caption`, `lightbox-close`,
`lightbox-nav`, `open`.

## Common gotchas

- **Edited `i18n.js` and forgot `build-i18n.py`** — `validate.js` fails with
  `stale-fallback`. Run the generator; do not hand-patch HTML.
- **Hand-edited something under `de/`** — the next generator run silently
  discards it. German copy lives in `i18n.js`, nowhere else.
- **The inline `<head>` script is load-bearing.** It applies a stored theme
  choice and the hyperjump arrival flag before paint. A new page must copy
  it. It does *no* language detection — that went with the runtime `i18n.js`,
  along with `?v=N` cache-busting and the pre-commit hook.
- **Absolute asset paths** (`/style.css`, `/app.js`) so they resolve from any
  nested directory.
- **`.gitignore` does not untrack.** Two videos committed *before* the ignore
  rules kept shipping — 92 MB published that no page referenced.
  `git rm --cached` fixed it. Add a large asset and later ignore it → check
  `git ls-files`, not the ignore rule. This frees the *published* site, not
  `.git`; the objects stay in history.
- **Photos in `_originals/` never reach GitHub** (gitignored). Copy the
  folder by hand when switching machines.
- **Pages rebuild lag**: 30–60s after a push.

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
