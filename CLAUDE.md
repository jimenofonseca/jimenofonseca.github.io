# jimenofonseca.github.io

## ⚙ Maintenance — keep this file alive

This file is the project's memory. It should *grow* as the site grows.
Future Claude sessions reading this should treat it as both reference AND
something to improve when warranted.

**When to propose an update:**

1. **End of any session** that introduced a new pattern, file, workflow,
   refinement, or non-obvious gotcha → before wrapping up, ask the user:
   *"Should I capture anything from this session into CLAUDE.md?"* and
   propose specific additions.

2. **Mid-session, on explicit user request** — phrases like *"remember
   this"*, *"add this to CLAUDE.md"*, *"checkpoint what we just learned"*,
   *"save that lesson"* should immediately trigger an edit + commit.

3. **Periodic review** when the user says *"review CLAUDE.md"* or
   *"audit project memory"* — re-read the whole file, flag stale sections,
   outdated cache versions, removed files still referenced, redundancies,
   and propose a cleanup pass.

**What belongs HERE vs. in the skill:**

- ✅ **Here (project-specific)**: file structure of THIS site, the three
  menu items, gear list contents, etc.
- 🗄 **In `docs/retired-site.md`**: anything about the nine-page site that no
  longer exists. Do not re-document retired pages here.
- ↗️ **In `~/.claude/skills/static-site-workflow/SKILL.md` (generalizable)**:
  the *pattern* of cache-busting via pre-commit hook, the *pattern* of
  dev-then-prod swaps. Anything that would apply to a hypothetical second
  static site.

If a lesson is useful in both places, capture it in both — project-specific
detail here, generalized lesson in the skill.

**Hygiene rules:**

- Always show diffs before committing CLAUDE.md updates; small surgical
  edits beat sweeping rewrites.
- Keep this file under ~500 lines. If it grows past that, factor sections
  into `docs/*.md` and leave this file as an index pointing to them. This
  happened once already: the file hit 983 lines, and the Intro/Work/Art
  reduction was the occasion to move the retired-page material into
  `docs/retired-site.md`.
- Commit CLAUDE.md changes alongside the work that motivated them, not as
  isolated "documentation" commits — they're easier to find later that way.

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
Appearances, Publications. All of it was retired in the Intro/Work/Art
reduction. The pages are in `_old/retired-pages/` and
**`docs/retired-site.md` holds everything that was documented about them** —
the case-study/home-page mirroring contract, the employer-disclosure rules in
full, the principles split. Read that file before restoring any of it; the
reasoning was expensive and is not re-derivable from the markup.

## File layout

```
.
├── index.html                        # Intro — the h1 is the name, then the
│                                     #   short bio and the portrait. Nothing else.
├── art/                              # Art — Music and Photography merged onto
│                                     #   one page. Was /music/ + /photography/
├── de/                               # GENERATED — the whole site in German.
│                                     #   Never hand-edit; run build-i18n.py
├── projects/                         # redirect stub only — see "Old URLs"
├── _old/                             # UNPUBLISHED (Jekyll underscore rule)
│   ├── retired-pages/                #   the nine-page site, archived intact
│   └── …                             #   plus the original Jekyll site
├── docs/
│   └── retired-site.md               # what was documented about the retired pages
├── private-src/                      # GITIGNORED — optional local editing drafts
├── assets/
│   ├── portrait.jpg                  # Intro portrait
│   ├── og-image.jpg                  # 1200×630 social share card (both pages)
│   ├── photography/                  # Gallery photos (gitignored: _originals/)
│   │   ├── *.jpg                     # 13 files, ~1600px max
│   │   ├── thumb/*.jpg               # 600×600 square crops
│   │   └── _originals/               # GITIGNORED — full-res master files
│                                     #   (large videos are gitignored — see below)
├── style.css                         # All site styles
├── app.js                            # Theme toggle, mobile sidebar, lightbox, hyperjump
├── i18n.js                           # EN/DE translations — 22 keys each
├── build-gallery.py                  # Photo pipeline → writes into art/index.html
├── appendix-og-image.py              # Regenerates assets/og-image.jpg
├── build-i18n.py                     # Generates de/ from the EN pages + i18n.js
├── validate.js                       # Site checks — run before committing; CI runs it too
├── sitemap.xml                       # 2 pages x 2 languages; the stub is excluded (noindex)
└── robots.txt                        # Allow all + Sitemap: pointer
```

### How the site actually deploys

GitHub Pages serves this repo **from the branch** (Settings → Pages →
"Deploy from a branch"). There is no deploy workflow and there should not
be one — a `pages.yml` running `bundle exec jekyll build` used to sit here
and failed all 71 of its runs, because the repo stopped being a Jekyll
site and has no `Gemfile`. It never deployed anything; it only produced a
red X on every push. Deleted.

`.github/workflows/ci.yml` is the only workflow, and it just runs
`node validate.js`.

**Do not add a `.nojekyll` file.** Pages still runs Jekyll on the branch,
and it is Jekyll's underscore rule that keeps `_old/` out of the published
site. `_old/` is not a couple of retired pages — it is the **entire former
Jekyll site**: `_config.yml`, `_includes/`, `Gemfile`, a second `CNAME`,
`Projects.md`, `Publications.md`, plus the retired `superurbana/` and
`innovation/` pages. Adding `.nojekyll` would publish all of it verbatim
at `/_old/...`, including a stray CNAME and the old site's config.

Jekyll running over the site is not a problem to solve — it has processed
every one of the 72 successful `pages-build-deployment` runs, and the
underscore exclusion is load-bearing.

### Old URLs

**One redirect stub survives**: `/projects/` → `/`, a meta-refresh +
canonical + `noindex, follow` + a JS `location.replace`. The former Jekyll
site published a Projects page (`_old/Projects.md` → `/Projects.html`), so a
bookmark or inbound link still lands somewhere. Its destination survived the
reduction, which is why it stayed.

`/open-source/` was deleted with the rest: it pointed at `/ipcc/`, and a
redirect to a 404 is worse than a 404.

### ⚠ The reduction chose 404 over redirects — deliberately

Sixteen URLs went away (`/principles/`, `/digital-transformation/`, `/cea/`,
`/ipcc/`, `/appearances/`, `/publications/`, `/music/`, `/photography/`, each
in both languages). **They serve 404 on purpose.** Stubs pointing everything
at `/` were offered and declined.

Know what that costs, because it is not reversible on Google's timetable:
every indexed result and inbound link for the case studies breaks, Google
drops the URLs within weeks, and re-indexing them later is slow. If any page
comes back, it returns to a cold URL.

The pages themselves are intact in `_old/retired-pages/` — restoring one is
`git mv` back, a `build-i18n.py` run, its `<loc>` entries in `sitemap.xml`,
and its i18n keys out of git history.

⚠ **Settled, and the record was wrong.** An earlier version of this file
claimed the Portfolio link on Jimeno's LinkedIn profile pointed at
`www.jimenofonseca.com/projects`, and the `/projects/` stub was committed
on that basis. Jimeno has since checked the profile: **the website field is
`jimenofonseca.com`, the bare domain.** The claim was never true — it came
from a third-party analysis that was taken at face value, and no tooling in
this repo can see LinkedIn.

The stub stays, on the evidence that actually holds: `/projects` was a real
URL on the former Jekyll site and has 404'd since the rebuild, so anyone
with an old bookmark or inbound link still lands somewhere. **Do not
reintroduce the LinkedIn justification** — it is disproven, not merely
unverified.

`validate.js` skips any page containing a `<meta http-equiv="refresh">`,
since redirect stubs carry no i18n or cache version of their own.

## Design system (Swiss / minimalist)

- **Typography**: Inter Tight (sans) + IBM Plex Mono (labels, numbers)
- **Layout**: Flush-left sticky sidebar (240px) + content column (max 1200px)
- **Hairlines, not boxes**: borders between rows, no card shadows
- **Mono is for labels, sans is for content.** IBM Plex Mono uppercase in
  `--accent` marks things that are *not* prose: section eyebrows, number
  rails, stat labels, the `See case study →` links. Every item **title** on
  a page is Inter Tight 17–19px, weight 500, `var(--fg)` — `.proof-label`,
  `.outcome-text h2` and `.principle-text h2` are deliberately identical.
  `.proof-label` used to be 10.5px mono uppercase accent, which made
  section 01 look like a different kind of content from 02 and 03. Don't
  reintroduce a per-section title treatment.
- **Theme**: light/dark via `[data-theme]` on `<html>`, persists in localStorage.
  **Dark is the default**, and it is a design decision rather than a reading
  of the visitor's OS: every page ships `<html lang="…" data-theme="dark">`
  in the markup, so the default survives JS being off and there is no
  first-paint flash. `prefers-color-scheme` is no longer consulted anywhere
  on the site — don't reintroduce it thinking it is a missing feature. A
  `<meta name="color-scheme" content="dark light">` sits next to the viewport
  tag so the UA paints its own canvas dark before `style.css` arrives.
- **Language**: one language per URL, shipped as plain HTML. No JS swap, no
  browser-language detection — see "Two language trees" below.

⚠ **`app.js`'s init must never call `applyTheme()`.** `applyTheme()` writes
to localStorage, so calling it on load would stamp a theme on a first-time
visitor who never picked one — freezing whatever the code guessed and making
any future change to the site default invisible to everyone who has ever
loaded the page. Init only syncs the toggle's `.active` class; the inline
head script has already applied any *stored* choice. This was a live bug
while light was the default: `localStorage.getItem('theme') || 'light'` wrote
`light` on first paint, which silently overrode the head script's
`prefers-color-scheme: dark` detection.

The three places that carry the default, and must agree:

| Where | What |
|---|---|
| every page's `<html>` tag | `data-theme="dark"` |
| every page's sidebar toggle | `class="opt active"` on the **dark** span |
| `app.js` | the `\|\| 'dark'` fallbacks in `toggleTheme()` and init |

`style.css` is the exception: `:root` still holds the **light** palette and
`html[data-theme="dark"]` overrides it. That inversion is deliberate — the
markup default does the work, and swapping the two CSS blocks would be a
large, risky refactor for no visible gain.

## Sidebar navigation order

**Three items, one flat `.nav-group`, no group label.**

| | | |
|---|---|---|
| 01 | Intro | `/` — `→` |
| 02 | Work | `https://www.linkedin.com/in/jimenofonseca/` — `↗`, `target="_blank"` |
| 03 | Art | `/art/` — `→` |

They are numbered 01–03 because nothing conflicts any more. The old About
group was deliberately *un*numbered to avoid colliding with Case Studies
01–03; that constraint is gone.

**Work is an outbound link, not a page.** There is no `/work/`, and
`app.js`'s `isInternalNav()` excludes `target="_blank"`, so the hyperjump
correctly does not fire on it.

⚠ **GitHub and Google Scholar are gone from the site *and* from the Person
JSON-LD `sameAs` array** — that was an explicit decision, not an oversight.
`sameAs` now holds Wikidata (`Q140798347`) and LinkedIn only. Do not
"restore" them.

`/superurbana/` and `/innovation/` were retired long before this, and live in
`_old/retired-pages/` alongside everything else.

## Workflows

### Updating translations (`i18n.js`)

1. Edit `i18n.js` — both `en:` and `de:` blocks.
2. **`python3 build-i18n.py`** — rewrites the English fallbacks from `en:`
   and regenerates the whole `de/` tree from `de:`.
3. `node validate.js`, then commit `i18n.js`, the English pages and `de/`
   together.

**Forgetting step 2 fails CI**, by design: `validate.js` compares every
page's text against its own language block, so an edited `i18n.js` with a
stale page is caught.

⚠ **`i18n.js` is no longer sent to browsers.** It is build input only. The
pages ship their text as plain HTML, which is the whole reason German is now
indexable. There is therefore no `?v=N` cache-busting and no pre-commit hook
any more — both were deleted, along with the no-flash-of-English hack and
the `data-lang` pre-paint script, which existed only to hide the swap.

### Updating page content (HTML / CSS)

Edit the **English** page directly (`index.html`, `*/index.html`), then run
`python3 build-i18n.py` to mirror the change into `de/`. Never hand-edit
anything under `de/` — the generator overwrites it.

### Working on the Art page

`/art/` is **one page with two parts**, Music then Photography, each a plain
`<section class="art-part">` with its own numbered eyebrow. The base
`section` rule supplies the hairline that separates them, and
`section:first-of-type` keeps `.page-intro` borderless — so the parts need no
layout CSS of their own. Only `.art-text` was added, for the body copy under
each part's media block.

The page is public plain HTML, like the rest of the site — no password or
client-side encryption anywhere. Edit `art/index.html` and commit.

- **Music**: embeds a YouTube iframe (`6dDU8wfSiEg`), now with
  `loading="lazy"`, which the standalone `/music/` page never had.
- **Kit list**: the `.gear-list` aside is hardcoded English in the markup and
  carries no i18n keys — it is model names, which do not translate. Six
  items; edit them in `art/index.html`.

⚠ **`.gitignore` does not untrack.** Both site videos were committed
*before* the ignore rules existed, so `assets/music/music.mp4` (42.5 MB)
and `assets/Superurbana_Promo.mp4` (48 MB) kept shipping — 92 MB published
on the live domain that no page referenced. They were removed from the
index with `git rm --cached` (files kept on disk). If you add a large asset
and later ignore it, check `git ls-files` rather than trusting the ignore
rule. Note this frees the *published* site, not `.git` (118 MB) — the
objects stay in history, and rewriting that would break every clone.
- **Photography**: 13 photos sourced from `assets/photography/`. Edit via
  `build-gallery.py` (see "Updating the photo gallery" below). The lightbox
  in `app.js` binds to `.photo-grid figure[data-full]`, which the merged page
  preserves unchanged.

⚠ **`build-gallery.py` writes into `art/index.html`.** Its target moved when
the gallery did. If you ever restore `/photography/`, move the target back —
otherwise the generator silently updates a page nobody serves.

### Updating the photo gallery

```
# 1. Drop full-size originals (any size, any name) into:
open assets/photography/_originals/

# 2. Generate web-size fulls + 600×600 thumbnails AND auto-inject <figure>
#    blocks between <!-- GALLERY-START --> / <!-- GALLERY-END --> markers
#    in art/index.html:
python3 build-gallery.py

# 3. Commit and push
git add assets/photography/ art/
git commit -m "Update photo gallery"
git push
```

Uses macOS native `sips` (no ImageMagick dependency).
`_originals/` is gitignored — only optimised versions ship to GitHub.

### Adding a new page (Dev-then-Prod workflow)

When designing something new (e.g., a redesign or a new subpage), don't edit
the live file directly. Use the dev-then-swap pattern:

1. **Build in a separate file**: e.g., `cea/index-new.html` or `index-new.html`.
   Reference temporary asset names (`style-new.css`, `app-new.js`) if doing a
   large design change.
2. **Preview locally** via the dev server (see "Local preview" below). Iterate.
3. **When approved, swap**: rename `-new` files to canonical names (overwriting
   the old), update all internal references (`/style-new.css → /style.css`), and
   bump `i18n.js?v=N` if needed. Use Python or sed for batch renames.
4. **Single commit**: ship the swap as one atomic change.

### Local preview

```
# .claude/launch.json defines a Python static server on :8080
# Start via Claude's preview tool (preferred) or manually:
python3 -m http.server 8080
# → http://localhost:8080/
```

Every page is public plain HTML, so the local preview shows the live
content directly — no password gate.

## Two language trees — one URL per language

English lives at `/` and `/art/`, German at `/de/` and `/de/art/`. Every
page ships its text as plain HTML in **one** language.

**Why, in one sentence:** Google indexes what is in the HTML, and it does
not run the language switcher — so while both languages shared one URL,
every German string on this site was invisible to search, including to the
German-speaking recruiters the site is aimed at.

How the pieces fit:

| | |
|---|---|
| `i18n.js` | the only place copy lives, `en:` + `de:`, 22 keys each. **Build input — not served to browsers.** |
| English pages | hand-authored; `build-i18n.py` refreshes their fallbacks from `en:` |
| `de/**` | **generated, never hand-edited** |
| `hreflang` | every page names `en`, `de` and `x-default`, including itself |
| canonical | self-referential — each page points at its own URL |

Rules that keep it correct:

- **Never hand-edit `de/`.** The generator deletes and rewrites the tree.
- **A new page needs three things**: the English file, a `build-i18n.py`
  run, and its two `<loc>` entries in `sitemap.xml`. `validate.js` fails if
  the sitemap and the page set disagree.
- **No automatic redirect by browser language.** Each URL serves one
  language, always; the sidebar switcher links to the counterpart. Google
  advises against language-sniffing redirects, and a redirect would also
  contradict the canonical.
- **`x-default` points at English**, which is the site's primary language.

The `hreflang` set must be reciprocal — if the German page names the
English one but not vice versa, Google discards the whole annotation
silently. `validate.js` checks this on all 4 pages.

## ⚠ EN/DE parity — non-negotiable

**Every change to an English `i18n.js` key MUST update the German equivalent
in the same edit and the same commit.** Never defer "I'll do German later" —
that's how stale translations accumulate and German-speaking visitors see
contradictory content.

This matters more than it sounds because the site auto-detects browser
language: a visitor with `navigator.language` starting with `de-` lands
straight on the German version and may never see your English update.

### How to keep parity

1. When editing `i18n.js`, find both occurrences of the key:
   ```bash
   grep -n "'your.key.name'" i18n.js
   ```
   You'll get two line numbers — one in the `en:` block (top half of the
   file), one in the `de:` block (bottom half).
2. Edit **both** in the same session, before the commit.
3. If you don't speak German well enough for a phrase, write a literal
   translation and leave a `// FIXME(de)` comment so the parity exists and
   the polish can come later — but never ship EN-only.

### What the tooling enforces vs. what it doesn't

- ✅ `node validate.js` checks **4 pages** — 2 English plus 2 German — each
  against its **own** language block, so a page that drifts from `i18n.js`
  fails whichever language it is in. It also checks EN/DE key parity, that
  every `data-i18n` key exists, that each home page carries exactly one
  `Person` JSON-LD block whose `url` matches that page's canonical, that
  every page has a self-referential canonical and a complete reciprocal
  `hreflang` set (`en` / `de` / `x-default`) with a matching `<html lang>`,
  and that `sitemap.xml` lists **exactly** the validated pages. CI runs it
  on every push and PR — run it locally before committing.

  That last check exists because the page list is discovered by directory
  scan while `sitemap.xml` is hand-written: without it, adding a page
  silently leaves it out of the sitemap and deleting one leaves a 404 in
  it. **Add a page → add its `<loc>`**, or CI fails.
- ❌ Nothing verifies that the German is *good*, only that it exists.
  That's still a human job.

If you're proposing copy changes (a single key or a batch), always end with
the German equivalent diff alongside the English one — no exceptions.

## i18n key conventions

Keys are namespaced. When adding a new key:

- `nav.*` — sidebar navigation (`nav.intro`, `nav.work`, `nav.art`) and the
  two Art part headings (`nav.music`, `nav.photography`)
- `home.*` / `art.*` — per-page `<title>` and `<meta description>`
- `hero.h1` — the Intro page's heading (the name)
- `about.bio` — the short bio, the only body copy on the Intro page
- `v2.*` — everything else: `v2.role`, `v2.art.lede`, `v2.music.p1`,
  `v2.photo.p1`, `v2.photo.p2`, the two `*.caption.kind` labels, and the
  chrome (`v2.theme.label`, `v2.lang.label`, `v2.menu.open`)

The `v2.` prefix is a historical artefact of a redesign, not a version
scheme. It is not worth renaming 12 keys to remove it.

Every key MUST exist in both `en:` and `de:` blocks. Validate with
`node -c i18n.js` after editing.

For HTML elements:
- `data-i18n="key"` → sets `textContent`
- `data-i18n-html="key"` → sets `innerHTML` (for content with inline markup like `<span>` or `<a>`)
- `data-i18n-content="key"` → sets `content` attribute (for `<meta>` tags)
- `data-i18n-aria="key"` → sets `aria-label`

## ⚠ HTML fallbacks must match the `en:` values

Every `data-i18n` element carries hardcoded fallback text, and every
`data-i18n-content` a hardcoded `content` attribute. **Crawlers index that
fallback, not the JS-rendered text** — Google never runs `applyLang()`.

So when you change an `en:` value in `i18n.js`, change the fallback in the
HTML too, in the same commit. If you don't, the site silently serves two
different versions: the current copy to visitors, superseded copy to search
engines and to LinkedIn's scraper. This actually happened — the publications
page advertised "an h-index of 20" to Googlebot long after the visible text
had moved on.

`node validate.js` catches this: for every `data-i18n="k"` it checks that the
element's text equals `en[k]` whitespace-normalised, and likewise for
`data-i18n-content="k"` and its `content` attribute. `data-i18n-html` keys
are checked for existence only — the inline markup isn't compared, so verify
those by hand.

## Social meta & structured data

Both content pages carry `<link rel="canonical">`, Open Graph (`og:type`,
`og:site_name`, `og:locale`, `og:url`, `og:title`, `og:description`,
`og:image` + width/height/alt) and Twitter card tags. Share cards point at
`https://jimenofonseca.com/assets/og-image.jpg` (1200×630).

Two rules that are easy to get wrong:

- **These tags are deliberately static — never wire them to `data-i18n`.**
  Scrapers don't execute JS, so an i18n attribute buys nothing and doubles
  the parity burden. The flip side: when a matching `i18n.js` key changes,
  the `og:`/`twitter:` copy does **not** follow. Edit it by hand in the same
  pass.
- **`Person` JSON-LD lives on `index.html` only, and there must be exactly
  ONE block.** It's the entity anchor; a second Person block on the same
  page hands Google conflicting claims about the same person and undermines
  the Knowledge Panel. This has happened once — a hand-edit added a second
  block at the top of `<head>` while the original sat further down. Its
  `url` must also match the page's `<link rel="canonical">` exactly
  (no `www.`, keep the trailing slash). `validate.js` now enforces both.
  `sameAs` holds Wikidata (`Q140798347`) and LinkedIn — GitHub and Google
  Scholar were removed from it deliberately along with their sidebar links.

Regenerate the share card with `python3 appendix-og-image.py` (needs
`pillow`, `fonttools`, `brotli`; pulls Inter Tight from npm so the card
matches site typography). **The card carries no job title on purpose** —
LinkedIn caches OG images hard, so a title on it would go stale.

After changing meta or the card: force a re-scrape at
<https://www.linkedin.com/post-inspector/> and validate the schema at
<https://search.google.com/test/rich-results>.

### When the job title changes

The current title (`Head of Digital Engineering`) is spread across four
places. Change all of them together, EN **and** DE.

This table used to list six, including `hero.proof` and `v2.now` — both of
which had become orphans rendering on no page, so following the old list
meant editing two dead keys and believing the job was done. Re-derive the
list rather than trusting it if the home page changes shape again.

| Location | Contains |
|---|---|
| `i18n.js` → `v2.role` | sidebar role line, both pages |
| `i18n.js` → `home.desc` | "Head of Digital Engineering at Axpo Grid…" |
| `i18n.js` → `about.bio` | the short bio's opening clause |
| `index.html` JSON-LD | `"jobTitle"` and `"description"` |
| `index.html` og/twitter | `og:description`, `twitter:description` |

⚠ **The bio still names Axpo**, so the employer-disclosure rules still bite
even though the case studies are gone. The short version: never publish Axpo
revenue, margin, pricing method or internal headcount; budget *scope* is
Jimeno's own authority and is fine as a band; never call the role a
"department" / "Abteilung"; name the issuing body on every credential. The
full reasoning, with every phrase that was cut and why, is in
`docs/retired-site.md` — read it before adding any employer detail back.

## The Intro page

The whole page is an `<h1>`, one paragraph and the portrait. That is all it
is meant to be.

⚠ **`hero.h1` holds the name, not a slogan.** It used to read "I turn digital
technology into lasting capability."; `hero.p` carried a supporting lede.
Both were dropped — but an `<h1>` was kept, with the name in it, because this
is now the site's entire search surface and a home page with no heading is a
real defect. **Do not read the empty-looking hero as unfinished**, and do not
reintroduce a tagline unless asked.

Gone with the slogan: the `page-eyebrow` ("About"), the `bio-label` ("Short
bio") and the portrait's `figcaption` — the caption held the name, which the
`h1` now says a few centimetres away.

`#bio` is still on the bio block so old deep links (`/#bio`) land, though
nothing links to it any more.

### The portrait

A single static portrait (`assets/portrait.jpg`, 3:4). No caption, no
rotation, no dots, no JS.

It used to be a 3-slide auto-rotating reel cycling
`portrait.jpg` → `portrait_music.jpg` → `portrait_photography.jpg`, with
the caption's right side swapping to match. That was removed — along with
its JS block in `app.js` and CSS layer in `style.css` — so `.hero-figure`
is now plain markup styled entirely by the base rules near the top of
`style.css`.

`assets/portrait_music.jpg` and `assets/portrait_photography.jpg` are
still in the repo but referenced nowhere. Delete them if the reel is not
coming back.

### Changing the portrait

Drop a replacement into `assets/` (3:4, ~900×1200, under 200 KB) and
point the `<img src>` in the `.hero-figure` at it. On macOS, `sips -c` to
crop and `sips -Z 1200` to resize.

## Page transition (hyperjump)

Every internal navigation triggers a **Star Wars-style hyperspace jump**:
a black/white overlay covers the main content frame (the sidebar stays
anchored), ~120 white/black stars stretch into long streaks racing right,
then the new page emerges scaled-up + blurred and settles. About 2 seconds
total, theme-aware (inverts colors in light vs. dark theme).

### Where the pieces live

- **CSS**: end of `style.css`, under the `Hyperspace jump page transition`
  heading. Defines `.hyperjump`, `.hyperjump .star`, `@keyframes streak`,
  and `html.hyper-arrive` (the arrival decel).
- **JS**: end of `app.js`, the second IIFE. Intercepts internal-link
  clicks, injects the starfield overlay, sets a `sessionStorage` flag,
  navigates after 1150ms.
- **Inline `<head>` script** on every page reads
  `sessionStorage.getItem('hyperjump-arriving')` *before paint* and adds
  `html.hyper-arrive` if true. This is why the arrival animation starts
  on frame 1 with no snap-then-jiggle. **If you add a new page, copy this
  block into its `<head>` script** — it's the same one that handles
  lang + theme auto-detection.

### Theme-aware colors

Two CSS vars at `:root` (and overridden by `html[data-theme="dark"]`):

| Theme | `--hyperjump-bg` | `--hyperjump-star` |
|-------|------------------|---------------------|
| Light (default) | `#ffffff` | `#000000` |
| Dark | `#000000` | `#ffffff` |

To tweak intensity: bump star count in `app.js` (`STAR_COUNT = 120`),
streak distance in `@keyframes streak` (`scaleX(300)`), or duration in
the `setTimeout(…, 1150)` + matching CSS animation-durations.

### To disable it temporarily

Either:
- Remove the IIFE block at the end of `app.js`, or
- Comment out the `if(sessionStorage.getItem("hyperjump-arriving")…)`
  block in the inline `<head>` script (the arrival half).

Or for a single user opt-out: respect `prefers-reduced-motion: reduce` —
already wired. Users with that preference get instant page-swap, no jump.

## Mobile performance

Measured on an emulated Pixel 5, 4x CPU throttle, third party answering in
800ms. **FCP went from ~1,100ms to ~330ms** on one change.

- **The Google Fonts stylesheet must stay non-blocking.** A third-party
  `<link rel="stylesheet">` in the critical path holds up first paint by a
  full round trip to `fonts.googleapis.com` — nothing renders until it
  resolves. It is loaded as `media="print" onload="this.media='all'"` with a
  `preload` warming the request and a `<noscript>` fallback. `display=swap`
  keeps text readable in the fallback face meanwhile. **Do not "tidy" this
  back into a plain stylesheet link.**
- **Only request weights that exist in `style.css`** — currently 300, 400
  and 500. Weight 600 was requested for years and used nowhere: one whole
  font file per page load for nothing.
- **The LinkedIn embeds are gone**, and with them `.feed-item` and its
  `content-visibility: auto` / `contain-intrinsic-size` treatment. Those
  existed to make nine third-party iframes survivable on a phone; deleting
  the iframes was the better fix. There is now **no third-party script on
  the home page** except Google Fonts and gtag.
- The hero portrait carries `width`/`height`, `fetchpriority="high"` and
  `decoding="async"`. CLS is 0 — `.hero-figure img` also has
  `aspect-ratio: 3/4`, so the box is reserved before the image lands.

Resolved: the LinkedIn embeds were ~7.5s of the 11.5s main-thread total on
an emulated mid-range phone, and removing them removes essentially all of
it. `app.js` is 3.5 KiB transferred, so what remains is fonts and gtag.

The Intro page is now about as light as a page with a web font and an
analytics tag can be: one image, no iframes, no third-party scripts beyond
fonts and gtag.

Still open, both needing macOS `sips` on Jimeno's machine: the portrait is
served at 901x1202 for a 560x747 box (~55 KiB wasted, wants a `srcset`), and
the gallery thumbnails on `/art/` are ~4x oversized (1.4 MB across 13 files).
The `loading="lazy"` the music iframe was missing is now on it.

⚠ **`style.css` carries a lot of dead rules** after the reduction —
`.principle*`, `.proof*`, `.outcome*`, `.cs-*`, `.page-nav`, `.page-stats`,
`.page-actions`, `.cta-link`, `.bio-label`, `.feed-more` and more. It was
left alone on purpose: it is one cached file and the classes cost nothing at
runtime, whereas a blind prune risks the **runtime-created** classes that
look dead to a grep but are not — `hyperjump`, `hyperjump-flash`,
`hyper-arrive`, `star`, `lightbox`, `lightbox-caption`, `lightbox-close`,
`lightbox-nav`, `open`. If you do prune, restoring a retired page means
restoring its CSS too.

## Common gotchas

- **Edited `i18n.js` and forgot `build-i18n.py`** — `validate.js` fails with
  `stale-fallback`. Run the generator; do not hand-patch the HTML.
- **Hand-edited something under `de/`** — the next generator run silently
  discards it. German copy lives in `i18n.js`, nowhere else.
- **Cache-busting and the pre-commit hook are gone.** They existed because
  `i18n.js` was fetched at runtime; it is not any more. If you re-introduce
  a runtime script, note that a rebase does not fire hooks — that bit us
  once, when `2130478` shipped v=38 and the rebased commit on top would have
  shipped v=38 again.
- **The inline `<head>` script is load-bearing, but not for language any
  more.** It applies a stored theme choice and the hyperjump arrival flag
  before paint. The no-flash-of-English half is gone with the runtime
  `i18n.js`. **A new page must copy this block**, or it flashes the default
  theme and lands without the arrival animation.
- **Path conventions**: subpage HTML references assets with absolute paths
  (`/style.css`, `/app.js`) so they resolve from any nested directory.
- **GitHub Pages rebuild lag**: usually 30–60s after push. Live URL is
  `https://jimenofonseca.com` (custom domain via `CNAME`).
- **Photos in `_originals/` never go to GitHub**: gitignored. If switching
  machines, manually copy `_originals/` over.

## Push authentication

**Always push with `git push origin main`** — nothing fancier.

The PAT is already stored in **macOS Keychain** via the `osxkeychain`
credential helper (set up by GitHub Desktop). Plain `git push origin main`
finds it automatically and works seamlessly.

### ⚠ Do NOT use the URL-with-embedded-token form

```bash
# ❌ DON'T do this:
git push https://USERNAME:TOKEN@github.com/...  main

# ✅ DO this:
git push origin main
```

Why it matters: pushing to an explicit URL **does not update the local
`refs/remotes/origin/main` reference** even though the commits do reach
github.com. The result is that local tools (GitHub Desktop, `git status`,
`git log origin/main..main`) all think there are unpushed commits — and
the user has to "push" manually from GitHub Desktop just to update the
tracking ref. The actual upload is a no-op; the tracking-ref sync is
what they perceive as "the push working".

Symptom to watch for: user says *"your commits are landing but I have to
push manually from GitHub Desktop"*. That's this bug. Switch to
`git push origin main` and the tracking ref updates atomically.

### Large pushes (photo batches, etc.)

Pushing 20+ MB in one go can fail with `fatal: the remote end hung up
unexpectedly` because git's default HTTP post buffer (1 MB) is too small.
The fix is a one-time setting per clone:

```bash
git config http.postBuffer 524288000   # 500 MB
```

Already set for this repo. If you ever re-clone, run it once. Symptom:
push exits with the "hung up" error, but `git log origin/main..main` shows
the commit is still unpushed. After the buffer fix, the same `git push
origin main` succeeds.

### Verify credentials still work

```bash
git push origin main --dry-run
# → "Everything up-to-date" (good)
# → auth prompt or error (PAT expired / keychain entry stale)
```

If the keychain entry ever stops working, regenerate the PAT at
github.com/settings/tokens and run `git push origin main` once
interactively to refresh the keychain entry.
