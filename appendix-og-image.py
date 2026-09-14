#!/usr/bin/env python3
"""Regenerate assets/og-image.jpg — the 1200x630 social share card.

Run from the repo root. Requires: pillow, fonttools, brotli.
Pulls Inter Tight from npm so the card matches the site's typography.

    pip install pillow fonttools brotli
    python3 appendix-og-image.py
"""
import os, subprocess, glob, tarfile, tempfile
from PIL import Image, ImageDraw, ImageFont

# The card is the name, the domain, and the portrait. Nothing else.
#
# Everything that could go stale is deliberately absent, because OG images
# cache hard in LinkedIn and a wrong card outlives the correction:
#   * no slogan      — it led with "I turn technology into lasting
#                      capability." over a strapline found nowhere on the
#                      site; the card was the last place that survived.
#   * no company     — neither the employer nor Superurbana.
#   * no job title   — it would go out of date on every promotion.
#   * no city        — removed from the footer, the JSON-LD homeLocation and
#                      og:image:alt on request; this is the most public
#                      surface of the four.
#
# A name is the one thing that cannot become untrue. Do not add copy back.
HEAD = "Jimeno Fonseca"

def inter_tight_ttfs():
    """Fetch Inter Tight from npm and convert woff2 -> ttf for Pillow."""
    from fontTools.ttLib import TTFont
    out = os.path.join(tempfile.gettempdir(), "inter-tight-ttf")
    if glob.glob(os.path.join(out, "*.ttf")):
        return out
    os.makedirs(out, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(["npm", "pack", "@fontsource/inter-tight", "--silent"],
                       cwd=tmp, check=True)
        tgz = glob.glob(os.path.join(tmp, "*.tgz"))[0]
        with tarfile.open(tgz) as t:
            t.extractall(tmp)
        for w in ("400", "500", "600"):
            src = os.path.join(tmp, "package", "files",
                               f"inter-tight-latin-{w}-normal.woff2")
            f = TTFont(src); f.flavor = None
            f.save(os.path.join(out, f"InterTight-{w}.ttf"))
    return out

W, H = 1200, 630
# The site is permanently dark, so the card is too — these are the exact
# :root tokens from style.css. The portrait's pale background carries the
# contrast on the right-hand panel.
BG, FG, MUTE, HAIR = (12,12,12), (245,245,244), (168,162,158), (31,31,31)
ACCENT = (106, 165, 240)
PANEL_W = 430

d_ = inter_tight_ttfs()
F = lambda w, px: ImageFont.truetype(os.path.join(d_, f"InterTight-{w}.ttf"), px)
f_head  = F("600", 74)
f_label = F("500", 16)

card = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(card)

# Portrait panel, right edge, full-bleed centre crop
p = Image.open("assets/portrait.jpg").convert("RGB")
s = H / p.height
new = p.resize((int(p.width * s), H), Image.LANCZOS)
left = max(0, (new.width - PANEL_W) // 2)
card.paste(new.crop((left, 0, left + PANEL_W, H)), (W - PANEL_W, 0))
d.line([(W - PANEL_W - 1, 0), (W - PANEL_W - 1, H)], fill=HAIR, width=1)

x, tw = 72, W - PANEL_W - 72 - 64

# Eyebrow with accent tick
d.rectangle([x, 64, x + 22, 67], fill=ACCENT)
d.text((x + 34, 58), "JIMENOFONSECA.COM", font=f_label, fill=MUTE)

def wrap(text, font, width):
    lines, cur = [], ""
    for word in text.split():
        trial = (cur + " " + word).strip()
        if d.textlength(trial, font=font) <= width:
            cur = trial
        else:
            lines.append(cur); cur = word
    lines.append(cur)
    return lines

# One line of type, optically centred in the panel. No rule: a hairline with
# nothing under it reads as a cut-off card rather than a deliberate one.
head_lines = wrap(HEAD, f_head, tw)
y = (H - len(head_lines) * 86) // 2 + 6
for ln in head_lines:
    d.text((x, y), ln, font=f_head, fill=FG); y += 86

card.save("assets/og-image.jpg", "JPEG", quality=90, optimize=True)
print("wrote assets/og-image.jpg", card.size,
      os.path.getsize("assets/og-image.jpg") // 1024, "KB")
