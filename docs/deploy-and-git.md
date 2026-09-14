# Deploying, and pushing to GitHub

Live procedure. `CLAUDE.md` carries the two rules that matter
(`git push origin main`, never add `.nojekyll`); the reasoning and the
troubleshooting live here.

## How the site actually deploys

GitHub Pages serves this repo **from the branch** (Settings → Pages →
"Deploy from a branch"). There is no deploy workflow and there should not be
one — a `pages.yml` running `bundle exec jekyll build` used to sit here and
failed all 71 of its runs, because the repo stopped being a Jekyll site and
has no `Gemfile`. It never deployed anything; it only produced a red X on
every push. Deleted.

`.github/workflows/ci.yml` is the only workflow, and it just runs
`node validate.js`.

### ⚠ Never add a `.nojekyll` file

Pages still runs Jekyll on the branch, and it is Jekyll's underscore rule
that keeps `_old/` out of the published site. `_old/` is not a couple of
retired pages — it is **the entire former Jekyll site** (`_config.yml`,
`_includes/`, `Gemfile`, a second `CNAME`, `Projects.md`, `Publications.md`)
**plus `_old/retired-pages/`, the whole nine-page site archived in the
Intro/Work/Art reduction.** Adding `.nojekyll` would publish all of it
verbatim at `/_old/...`, including a stray CNAME, the old site's config, and
every page that was deliberately taken down.

Jekyll running over the site is not a problem to solve — it has processed
every one of the successful `pages-build-deployment` runs, and the underscore
exclusion is load-bearing.

Rebuild lag after a push is usually 30–60s. Live URL is
`https://jimenofonseca.com` (custom domain via `CNAME`).

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
