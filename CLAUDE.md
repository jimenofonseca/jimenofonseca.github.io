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
Pure static HTML/CSS/JS — no build step, no framework.

## File layout

```
.
├── index.html                        # Home — "How I Lead": hero, proof of
│                                     #   scale, enterprise outcomes, 8 operating
│                                     #   principles, LinkedIn feed
├── superurbana/  cea/  innovation/   # Initiatives (01-05)
├── digital-transformation/  open-source/
├── appearances/  publications/       # Media (06-07)
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
│   └── Superurbana_Promo.mp4
├── style.css                         # All site styles
├── app.js                            # Theme toggle, mobile sidebar, lightbox
├── i18n.js                           # EN/DE translations + lang switcher
├── build-gallery.py                  # Photo pipeline (originals → thumbs + fulls)
├── appendix-og-image.py              # Regenerates assets/og-image.jpg
├── validate.js                       # Site checks — run before committing; CI runs it too
└── .githooks/pre-commit              # Auto-bumps i18n.js?v=N when i18n.js is staged
```

`core.hooksPath` is configured to `.githooks` (versioned hooks). On a fresh
clone, run `git config core.hooksPath .githooks` once.

## Design system (Swiss / minimalist)

- **Typography**: Inter Tight (sans) + IBM Plex Mono (labels, numbers)
- **Layout**: Flush-left sticky sidebar (240px) + content column (max 1200px)
- **Hairlines, not boxes**: borders between rows, no card shadows
- **Theme**: light/dark via `[data-theme]` on `<html>`, persists in localStorage
- **Language**: EN/DE via `[data-i18n]` attributes + JS swap, persists in localStorage
- **Auto-detection**: first visit honours `navigator.language` (DE if starts with `de`)
  and `prefers-color-scheme: dark`. Explicit toggle wins after.

## Sidebar navigation order

1. **Initiatives** (01–05): Company · Product · Training · Transformation · Open Source
2. **Media** (06–08): Appearances · Publications · News (anchor to home `#recently`)
3. **Personal** (09–10): Music · Photography — *public, no password*
4. **Connect** (11–13): LinkedIn · GitHub · Google Scholar — all external

## Workflows

### Updating translations (`i18n.js`)

1. Edit `i18n.js` — both `en:` and `de:` blocks.
2. `git add i18n.js && git commit -m "..."` — **the pre-commit hook auto-bumps**
   `?v=N → ?v=N+1` across every HTML file that references `i18n.js`, and stages
   those HTML files into the same commit. No manual cache-bust needed.
3. `git push`.

If you ever need to bypass the bump: `git commit --no-verify`.

### Updating page content (HTML / CSS)

Edit the HTML directly (public pages: `index.html`, `*/index.html`).
No cache-bust needed for HTML/CSS — only the `i18n.js?v=N` query string is
versioned. Browser caches HTML/CSS via the GitHub Pages cache-control headers
(usually re-fetched within minutes).

### Working on Music and Photography pages

Both pages are **public plain HTML** — the whole site is public, with no
password or client-side encryption anywhere. Edit `music/index.html` and
`photography/index.html` directly and commit.

- **Music**: embeds a YouTube iframe (`BzljIozglH0`). Local video files are
  gitignored (`assets/music/` — all content now on YouTube).
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

- ✅ The pre-commit hook bumps `i18n.js?v=N` so the new content actually
  reaches browsers.
- ✅ `node validate.js` checks EN/DE parity, that every `data-i18n` key
  exists, that HTML fallbacks match their `en:` values, that there is
  exactly one `Person` JSON-LD block whose `url` matches the canonical, and
  that all 11 pages agree on the cache version. CI runs it on every push and
  PR — run it locally before committing.
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

All 10 pages carry `<link rel="canonical">`, Open Graph (`og:type`,
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

The current title (`Head of Digital Engineering`) is spread across six
places. Change all of them together, EN **and** DE:

| Location | Contains |
|---|---|
| `i18n.js` → `v2.role` | sidebar role line, all 10 pages |
| `i18n.js` → `v2.now` | "…the Digital Engineering department at Axpo Grid…" |
| `i18n.js` → `hero.proof` | "Today I lead Digital Engineering at Axpo Grid…" |
| `i18n.js` → `home.desc` | "Head of Digital Engineering at Axpo Grid…" |
| `index.html` JSON-LD | `"jobTitle"` and `"description"` |
| `index.html` og/twitter | `og:description`, `twitter:description` |

## Home page

The home page *is* the About / "How I Lead" page — there is no separate
`/about/`. Sections, in order:

1. Hero — `hero.h1` + `hero.p`, portrait right, Short Bio beside it
   (the third-person copy-ready bio, for recruiters and event organisers)
2. **01 Proof of scale** — org footprint, budget oversight, global reach
3. **02 Key enterprise outcomes** — three, each Outcome / Impact plus a
   "See case study →" link. Those links currently point at
   `/digital-transformation/`, `/cea/` and `/open-source/` as placeholders
   until the dedicated case-study pages exist.
4. **03 Operating principles** — eight, each with a one-line summary
5. **04 Recently** — six LinkedIn embeds, the `#recently` anchor the
   sidebar's News item points at

Retired when this replaced the old home page: the **Selected Work** list
(five quantified initiative rows), the **Now** section (it restated the
hero almost verbatim) and the **Connect** section (it duplicated the
sidebar's links 11–13).

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

- **Cache stale after pushing translations**: the pre-commit hook should bump
  `?v=N` automatically. If translations don't show after deploy, hard-refresh
  (Cmd+Shift+R) and check that the version actually bumped in the HTML.
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
