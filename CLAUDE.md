# jimenofonseca.github.io

Personal website of Jimeno Fonseca, served on GitHub Pages at
`https://jimenofonseca.com` (CNAME → `jimenofonseca.github.io`).
Pure static HTML/CSS/JS — no build step, no framework.

## File layout

```
.
├── index.html                        # Home
├── superurbana/  cea/  innovation/   # Initiatives (01-05)
├── digital-transformation/  open-source/
├── appearances/  publications/       # Media (06-07)
├── music/  photography/              # Personal (09-10) — ENCRYPTED via StatiCrypt
├── private-src/                      # GITIGNORED — plaintext sources for music + photography
│   ├── music.html
│   └── photography.html
├── assets/
│   ├── portrait.jpg                  # Hero portrait (home page)
│   ├── photography/                  # Web-size gallery photos (gitignored: _originals/)
│   │   ├── *.jpg                     # ~1600px max, ~500KB
│   │   ├── thumb/*.jpg               # 600×600 square crops
│   │   └── _originals/               # GITIGNORED — full-res master files
│   └── Superurbana_Promo.mp4
├── style.css                         # All site styles
├── app.js                            # Theme toggle, mobile sidebar, lightbox
├── i18n.js                           # EN/DE translations + lang switcher
├── encrypt.sh                        # StatiCrypt wrapper for private pages
├── build-gallery.py                  # Photo pipeline (originals → thumbs + fulls)
├── package.json                      # Pins staticrypt as a dev dependency
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
3. **Personal** (09–10): Music · Photography — *both encrypted*
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

### Working on private pages (Music, Photography)

These pages use **StatiCrypt** for soft password protection.
Plaintext lives in `private-src/` (gitignored). Encrypted output goes to
`music/index.html` and `photography/index.html` (committed, public, served).

```
# 1. Edit plaintext source
nano private-src/music.html

# 2. Re-encrypt with the real password
./encrypt.sh "yourpassword"
# or  STATICRYPT_PASSWORD=xxx ./encrypt.sh
# or  ./encrypt.sh  (prompts)

# 3. Commit + push
git add music/index.html photography/index.html
git commit -m "..."
git push
```

**Important**: `changeme` is the placeholder password used in early commits.
Always replace with the real shared password before sharing the URL.

**What protection means here**: StatiCrypt encrypts only the page body; any
asset URL (e.g. `/assets/photography/foo.jpg`) is still publicly fetchable.
Suitable for "don't want it indexed / casual visitors stay out". Not for
actual secrets — for that, host elsewhere (Cloudflare Pages with Access).

### Updating the photo gallery

```
# 1. Drop full-size originals (any size, any name) into:
open assets/photography/_originals/

# 2. Generate web-size fulls + 600×600 thumbnails AND auto-inject <figure>
#    blocks between <!-- GALLERY-START --> / <!-- GALLERY-END --> markers
#    in private-src/photography.html:
python3 build-gallery.py

# 3. Re-encrypt and push
./encrypt.sh "yourpassword"
git add assets/photography/ private-src/photography.html photography/
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

When previewing private pages locally, you'll see the StatiCrypt gate —
enter the password to view content.

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

Pushes use a fine-grained personal access token over HTTPS (not stored in
git config). Run pushes via:
`git push https://USERNAME:TOKEN@github.com/jimenofonseca/jimenofonseca.github.io.git main`

(Token should be kept out of any committed file. Set as env var for convenience.)
