# Page transition — the hyperjump

Live feature. Summarised in `CLAUDE.md`; the tuning detail is here because it
is long and rarely needed.

---

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
  block into its `<head>` script** — it is the same one that applies a
  stored theme choice. It does no language detection; that was deleted with
  the runtime `i18n.js`.

### Theme-aware colors

Two CSS vars at `:root` (and overridden by `html[data-theme="dark"]`):

| Theme | `--hyperjump-bg` | `--hyperjump-star` |
|-------|------------------|---------------------|
| Light | `#ffffff` | `#000000` |
| Dark **(the site default)** | `#000000` | `#ffffff` |

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
