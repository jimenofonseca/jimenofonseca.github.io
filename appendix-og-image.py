#!/usr/bin/env python3
"""Regenerate assets/og-image.jpg — the 1200x630 social share card.

Run from the repo root. Requires: pillow, fonttools, brotli.
Pulls Inter Tight from npm so the card matches the site's typography.

    pip install pillow fonttools brotli
    python3 appendix-og-image.py
"""
import os, subprocess, glob, tarfile, tempfile
from PIL import Image, ImageDraw, ImageFont

# The card mirrors the Intro page: the name is the headline, then two durable
# facts, then the employer. It used to lead with a slogan over a strapline
# that appeared nowhere on the site — both were retired from the page, and
# the card was the last place the slogan survived.
#
# Two standing rules for this text, both because OG images cache hard and a
# stale card is worse than a plain one:
#   * no job title — it would go out of date on every promotion.
#   * no city — the location was removed from the footer, the JSON-LD
#     homeLocation and og:image:alt on request, and this is the most public
#     surface of the four.
# SUB names achievements rather than a role, so it stays true either way.
HEAD = "Jimeno Fonseca"
SUB  = "Developer of City Energy Analyst. Founder of Superurbana GmbH."
META = "Axpo Grid"

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
f_head, f_sub  = F("600", 74), F("400", 26)
f_meta         = F("400", 21)
f_label        = F("500", 16)

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

# Centre the text block rather than pinning it to y=150: the copy is short
# now, and a fixed origin left it riding high in a 630px panel.
head_lines, sub_lines = wrap(HEAD, f_head, tw), wrap(SUB, f_sub, tw)
block = len(head_lines) * 86 + 14 + len(sub_lines) * 36 + 30 + 28 + 28
y = max(150, (H - block) // 2 + 20)
for ln in head_lines:
    d.text((x, y), ln, font=f_head, fill=FG); y += 86
y += 14
for ln in sub_lines:
    d.text((x, y), ln, font=f_sub, fill=MUTE); y += 36
y += 30
d.line([(x, y), (x + tw, y)], fill=HAIR, width=1); y += 28
d.text((x, y), META, font=f_meta, fill=MUTE)

card.save("assets/og-image.jpg", "JPEG", quality=90, optimize=True)
print("wrote assets/og-image.jpg", card.size,
      os.path.getsize("assets/og-image.jpg") // 1024, "KB")
