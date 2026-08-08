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

- ✅ **Here (project-specific)**: file structure of THIS site, current
  cache version, the actual number of LinkedIn embeds, gear list contents,
  etc.
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
  into `docs/*.md` and leave this file as an index pointing to them.
- Commit CLAUDE.md changes alongside the work that motivated them, not as
  isolated "documentation" commits — they're easier to find later that way.

---



Personal website of Jimeno Fonseca, served on GitHub Pages at
`https://jimenofonseca.com` (CNAME → `jimenofonseca.github.io`).
Pure static HTML/CSS/JS, no framework. Nothing builds in CI — GitHub Pages
serves committed files. One local generator, `build-i18n.py`, produces the
German tree; its output is committed, exactly like `build-gallery.py`.

## File layout

```
.
├── index.html                        # Home — the "About" page: hero, proof of
│                                     #   scale, enterprise outcomes, 8 operating
│                                     #   principles (titles + summaries only),
│                                     #   LinkedIn feed
├── principles/                       # The 8 principles in full — the long
│                                     #   bodies the home page links out to
├── de/                               # GENERATED — the whole site in German.
│                                     #   Never hand-edit; run build-i18n.py
├── digital-transformation/  cea/     # Case Studies (01-03)
├── ipcc/                             # was /open-source/ (stub left behind)
├── projects/  open-source/           # redirect stubs only — see "Old URLs"
├── appearances/  publications/       # Media (04-05)
├── music/  photography/              # Personal (09-10) — public plain HTML
├── private-src/                      # GITIGNORED — optional local editing drafts
│   ├── music.html
│   └── photography.html
├── assets/
│   ├── portrait.jpg                  # Hero portrait (home page)
│   ├── og-image.jpg                  # 1200×630 social share card (all pages)
│   ├── photography/                  # Web-size gallery photos (gitignored: _originals/)
│   │   ├── *.jpg                     # ~1600px max, ~500KB
│   │   ├── thumb/*.jpg               # 600×600 square crops
│   │   └── _originals/               # GITIGNORED — full-res master files
│                                     #   (large videos are gitignored — see below)
├── style.css                         # All site styles
├── app.js                            # Theme toggle, mobile sidebar, lightbox
├── i18n.js                           # EN/DE translations + lang switcher
├── build-gallery.py                  # Photo pipeline (originals → thumbs + fulls)
├── appendix-og-image.py              # Regenerates assets/og-image.jpg
├── build-i18n.py                     # Generates de/ from the EN pages + i18n.js
├── validate.js                       # Site checks — run before committing; CI runs it too
├── sitemap.xml                       # 9 pages x 2 languages; stubs excluded (noindex)
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

Two redirect stubs, both meta-refresh + canonical + `noindex, follow` +
a JS `location.replace`:

| Stub | → | Why |
|---|---|---|
| `/projects/` | `/` | The former Jekyll site published a Projects page (`_old/Projects.md` → `/Projects.html`). Nothing has served it since the rebuild, so it 404s for anyone still linking to it. |
| `/open-source/` | `/ipcc/` | Case study 03 lived there while it was framed around the open-source platform. Reframed around the IPCC contribution and moved. |

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
- **Theme**: light/dark via `[data-theme]` on `<html>`, persists in localStorage
- **Language**: EN/DE via `[data-i18n]` attributes + JS swap, persists in localStorage
- **Auto-detection**: first visit honours `navigator.language` (DE if starts with `de`)
  and `prefers-color-scheme: dark`. Explicit toggle wins after.

## Sidebar navigation order

0. **About** (unnumbered): Short bio · Proof of scale · Key outcomes ·
   Operating principles. The first three are anchors into the home page, so
   `#bio` on the home page itself and `/#bio` from every subpage.
   **Operating principles is the exception** — it is a real page link
   (`/principles/`, `→` not `↓`) on every page including the home page.
   Deliberately unnumbered: numbering them would either restart the counter
   mid-sidebar or renumber Case Studies, and Case Studies 01–03 must keep
   matching the home page's outcomes 01–03.
1. **Case Studies** (01–03): Digital Transformation (`/digital-transformation/`)
   · Cloud Solution (`/cea/`) · Insights for IPCC (`/ipcc/`) — these
   three match the home page's Key enterprise outcomes 01–03 exactly
2. **Media** (04–06): Appearances · Publications · News (anchor to home `#recently`)
3. **Personal** (07–08): Music · Photography — *public, no password*
4. **Connect** (09–11): LinkedIn · GitHub · Google Scholar — all external

`/superurbana/` and `/innovation/` are **fully retired**. They live in
`_old/retired-pages/`, which Jekyll's underscore rule keeps out of the
published site, and no live page links to them any more — the case-study
pagers now form a closed loop across the three case studies. Their i18n
keys (`nav.company`, `nav.training`, `superurbana.*`, `innov.*`,
`v2.superurbana.*`, `v2.innov.*`) were deleted with the rest of the
orphans; git history has them if the pages ever come back.

## ⚠ Case studies must mirror the home page

Each case-study page closes with an **Outcome / Impact** pair. The home
page's Key enterprise outcomes render the **Impact half of the same keys** —
not a copy, the same string:

| Page | Home outcome | Case study renders | Home page renders |
|---|---|---|---|
| `/digital-transformation/` | 01 | `about.out1.outcome` + `about.out1.impact` | `about.out1.impact` |
| `/cea/` | 02 | `about.out2.outcome` + `about.out2.impact` | `about.out2.impact` |
| `/ipcc/` | 03 | `about.out3.outcome` + `about.out3.impact` | `about.out3.impact` |

Editing an `.impact` key updates the home page and the case study together,
which is the point — a headhunter who reads the summary on the home page
and then opens the case study must not find two different claims.
**Never fork these into page-specific keys.**

The home page deliberately shows **Impact only, unlabelled**, so all three
of its sections read the same way: title, one paragraph, optional link. The
`.outcome` strings are the concrete "what was built" detail and live on the
case study, which is what the "See case study →" link is for. The labels
`v2.about.outcome.label` / `v2.about.impact.label` now render on the
case-study pages only.

⚠ One consequence to know about: outcome 02's `.impact` string carries no
numbers, so the home page no longer states CEA's "over 75 countries" or
"30+ enterprise clients" on that row. The 75-countries claim still appears
in Proof of scale (`about.proof3`). **Do not fix this by adding the numbers
to `about.out2.impact`** — that key also renders on `/cea/`, directly below
an Outcome line that already states them, and the no-repetition rule below
exists precisely to stop that.

### Case study page shape

Every case study runs the same flow:

```
page-intro   eyebrow · H1 · lede · full-width stat band
01 WHY       The Problem     <ns>.cs1
02 HOW       The Execution   <ns>.cs2 + <ns>.cs3
03 WHAT      The Result      about.outN.outcome + about.outN.impact
page-media   the talk video — LAST, before the pager
page-nav     closed loop 01 → 02 → 03 → 01
```

`<ns>` is `transf`, `cea` or `ipcc`. Section titles come from the shared
keys `v2.cs.challenge` / `v2.cs.strategy` / `v2.cs.outcome`, and the
Why/How/What rail labels from `v2.cs.why` / `.how` / `.what`.

**Chapters must not repeat each other.** The Execution chapter says *how*
the work was done — approach, sequence, what was stood up. It must not
restate the numbers or first-of claims that belong to The Result. This is
easy to get wrong: all three pages once carried their own outcome twice
(Axpo's DACH-first substation in both, CEA's 75 countries in both, the
IPCC contribution in both). A quick check before shipping copy:

```bash
node -e "…compare <ns>.cs2 + <ns>.cs3 against about.outN.* for shared claims…"
```

The video sits at the end deliberately: it is a talk *about* the work, so
it corroborates a claim the reader has already met, and being below the
fold means its lazy-loaded iframe usually never loads at all.

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

### Working on Music and Photography pages

Both pages are **public plain HTML** — the whole site is public, with no
password or client-side encryption anywhere. Edit `music/index.html` and
`photography/index.html` directly and commit.

- **Music**: embeds a YouTube iframe (`6dDU8wfSiEg`). Local video files are
  gitignored (`assets/music/` — all content now on YouTube).

⚠ **`.gitignore` does not untrack.** Both site videos were committed
*before* the ignore rules existed, so `assets/music/music.mp4` (42.5 MB)
and `assets/Superurbana_Promo.mp4` (48 MB) kept shipping — 92 MB published
on the live domain that no page referenced. They were removed from the
index with `git rm --cached` (files kept on disk). If you add a large asset
and later ignore it, check `git ls-files` rather than trusting the ignore
rule. Note this frees the *published* site, not `.git` (118 MB) — the
objects stay in history, and rewriting that would break every clone.
- **Photography**: gallery sourced from `assets/photography/`. Edit via
  `build-gallery.py` (see "Updating the photo gallery" below).

`private-src/music.html` and `private-src/photography.html` may be kept as
convenient local editing drafts (gitignored), but the committed files in
`music/` and `photography/` are the authoritative sources.

### Updating the photo gallery

```
# 1. Drop full-size originals (any size, any name) into:
open assets/photography/_originals/

# 2. Generate web-size fulls + 600×600 thumbnails AND auto-inject <figure>
#    blocks between <!-- GALLERY-START --> / <!-- GALLERY-END --> markers
#    in photography/index.html:
python3 build-gallery.py

# 3. Commit and push
git add assets/photography/ photography/
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

English lives at `/`, `/cea/`, `/ipcc/`… and German at `/de/`, `/de/cea/`,
`/de/ipcc/`… Every page ships its text as plain HTML in **one** language.

**Why, in one sentence:** Google indexes what is in the HTML, and it does
not run the language switcher — so while both languages shared one URL,
every German string on this site was invisible to search, including to the
German-speaking recruiters the site is aimed at.

How the pieces fit:

| | |
|---|---|
| `i18n.js` | the only place copy lives, `en:` + `de:`. **Build input — not served to browsers.** |
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
silently. `validate.js` checks this on all 18 pages.

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

- ✅ `node validate.js` checks **18 pages** — 9 English plus 9 German — each
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

- `nav.*` — sidebar navigation (Initiatives, Media labels, item titles)
- `v2.eyebrow.*` / `v2.stats.*` — section labels (NOW, IMPACT, SNAPSHOT, etc.)
- `v2.stat.*` — stat labels in the right sidebar (Years, Countries, Stakeholders, …)
- `v2.<page>.*` — page-specific (v2.cea.title, v2.cea.lede, v2.cea.caption.kind)
- `v2.work.<id>.desc` / `.year` — home page Selected Work list
- `<page>.p1`, `<page>.p2` — body paragraphs of subpages
- `<page>.title`, `<page>.desc` — meta tag content per subpage

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

All 9 content pages carry `<link rel="canonical">`, Open Graph (`og:type`,
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
  `sameAs` holds Wikidata (`Q140798347`) plus the three sidebar links
  (LinkedIn, GitHub, Google Scholar).

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
| `i18n.js` → `v2.role` | sidebar role line, all 9 pages |
| `i18n.js` → `home.desc` | "Head of Digital Engineering at Axpo Grid…" |
| `index.html` JSON-LD | `"jobTitle"` and `"description"` |
| `index.html` og/twitter | `og:description`, `twitter:description` |

## Home page

The home page *is* the About page — **there is no `/about/` URL**, and
nothing links to one. The sidebar group named "About" is anchors into this
page (`#bio`, `#proof`, `#outcomes`) plus the `/principles/` link. Worth
knowing, because a group called "About" invites the assumption that
`/about/` exists. Sections, in order:

1. Hero — `hero.h1` + `hero.p`, portrait right, Short Bio beside it
   (the third-person copy-ready bio, for recruiters and event organisers)
2. **01 Proof of scale** — org footprint, budget oversight, global reach
3. **02 Key enterprise outcomes** — three, each **title + the Impact
   paragraph only, unlabelled**, plus a "See case study →" link pointing at
   `/digital-transformation/`, `/cea/` and `/ipcc/` respectively.
4. **03 Operating principles** — eight, each **title + one-line summary
   only**, then a "Read the principles in full →" link to `/principles/`
5. **04 Recently** — six LinkedIn embeds, the `#recently` anchor the
   sidebar's News item points at

Retired when this replaced the old home page: the **Selected Work** list
(five quantified initiative rows), the **Now** section (it restated the
hero almost verbatim) and the **Connect** section (it duplicated the
sidebar's links 11–13).

## ⚠ The principles live in two places — don't merge them back

The eight operating principles are split across two pages by design:

| | Home page `#principles` | `/principles/` |
|---|---|---|
| number + `v2.about.pN.title` | ✅ | ✅ |
| `v2.about.pN.sum` (one line) | ✅ | ✅ |
| `about.pN` (the long body) | ❌ | ✅ |

The bodies were 1,089 of the home page's 1,350 words — 81% of everything
below the hero — so a recruiter hit eight full essays before reaching the
LinkedIn feed. Trimming them took the home page to ~470 words while still
showing all eight principles.

Two things to keep true:

- **The keys are shared, not forked.** `v2.about.pN.title` and
  `v2.about.pN.sum` render on both pages, exactly like the case-study
  Outcome/Impact keys. Editing one updates both — that is the point. Never
  fork them into page-specific keys.
- **`index.html` keeps `id="principles"`** even though nothing in the
  sidebar points at it any more. Old deep links (`/#principles`) still land
  on the summary list.

Adding a ninth principle means editing **both** pages: title + summary on
the home page, title + summary + body on `/principles/`.

## Home page hero portrait

A single static portrait (`assets/portrait.jpg`, 3:4) with a one-line
caption holding just the name. No rotation, no dots, no JS.

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
- **No-flash-of-English**: an inline head script reads localStorage *before*
  body renders and sets `data-lang="de"` so CSS can hide the body until
  `applyLang()` finishes. Don't remove that pre-script.
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
