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
# A name cannot become untrue, and neither can a conferred degree — which is
# why SUB is allowed where a job title is not.
HEAD = "Jimeno Fonseca"
SUB  = "Dr. sc. ETH Zürich"

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
# The card is dark whatever the site toggle says — it is a generated JPEG and
# cannot follow a runtime theme. These are the exact :root dark tokens.
BG, FG, MUTE, HAIR = (12,12,12), (245,245,244), (168,162,158), (31,31,31)
ACCENT = (106, 165, 240)
DIA    = 470       # portrait diameter
MARGIN = 72        # same gutter as the text

d_ = inter_tight_ttfs()
F = lambda w, px: ImageFont.truetype(os.path.join(d_, f"InterTight-{w}.ttf"), px)
f_head  = F("600", 68)
f_sub   = F("400", 27)
f_label = F("500", 16)

card = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(card)

# The portrait is a circular avatar, so show the WHOLE circle rather than
# cropping a full-bleed panel out of it — a panel sliced its left and right
# edges off. Square-cropped to centre, scaled to DIA, then pasted through a
# circular mask: the mask also drops the source's pure-black corners, which
# would otherwise sit on the card's #0c0c0c as a faint visible rectangle.
p = Image.open("assets/portrait.jpg").convert("RGB")
side = min(p.size)
p = p.crop(((p.width - side) // 2, (p.height - side) // 2,
            (p.width + side) // 2, (p.height + side) // 2))
p = p.resize((DIA, DIA), Image.LANCZOS)

SS = 4                                  # supersample the mask for a clean edge
mask = Image.new("L", (DIA * SS, DIA * SS), 0)
ImageDraw.Draw(mask).ellipse((0, 0, DIA * SS - 1, DIA * SS - 1), fill=255)
mask = mask.resize((DIA, DIA), Image.LANCZOS)

PX, PY = W - MARGIN - DIA, (H - DIA) // 2
card.paste(p, (PX, PY), mask)

x, tw = MARGIN, PX - MARGIN - 56      # text stops short of the circle

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

# Name, then the degree beneath it, optically centred as one block. No rule:
# a hairline with nothing under it reads as a cut-off card.
head_lines = wrap(HEAD, f_head, tw)
sub_lines  = wrap(SUB, f_sub, tw)
block = len(head_lines) * 86 + 12 + len(sub_lines) * 38
y = (H - block) // 2 + 6
for ln in head_lines:
    d.text((x, y), ln, font=f_head, fill=FG); y += 86
y += 12
for ln in sub_lines:
    d.text((x, y), ln, font=f_sub, fill=MUTE); y += 38

card.save("assets/og-image.jpg", "JPEG", quality=90, optimize=True)
print("wrote assets/og-image.jpg", card.size,
      os.path.getsize("assets/og-image.jpg") // 1024, "KB")
