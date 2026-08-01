#!/usr/bin/env python3
"""Regenerate assets/og-image.jpg — the 1200x630 social share card.

Run from the repo root. Requires: pillow, fonttools, brotli.
Pulls Inter Tight from npm so the card matches the site's typography.

    pip install pillow fonttools brotli
    python3 appendix-og-image.py
"""
import os, subprocess, glob, tarfile, tempfile
from PIL import Image, ImageDraw, ImageFont

HEAD = "I turn technology into lasting capability."
SUB  = "The organisation, the procedures, the people, and the connections between them."
NAME = "Jimeno Fonseca"
META = "Axpo Grid   ·   Zürich, CH"  # no job title: OG images cache hard

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
BG, FG, MUTE, HAIR = (255,255,255), (10,10,10), (110,110,110), (219,219,219)
ACCENT = (11, 79, 168)
PANEL_W = 430

d_ = inter_tight_ttfs()
F = lambda w, px: ImageFont.truetype(os.path.join(d_, f"InterTight-{w}.ttf"), px)
f_head, f_sub  = F("600", 62), F("400", 26)
f_name, f_meta = F("600", 29), F("400", 21)
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

y = 150
for ln in wrap(HEAD, f_head, tw):
    d.text((x, y), ln, font=f_head, fill=FG); y += 74
y += 14
for ln in wrap(SUB, f_sub, tw):
    d.text((x, y), ln, font=f_sub, fill=MUTE); y += 36
y += 30
d.line([(x, y), (x + tw, y)], fill=HAIR, width=1); y += 28
d.text((x, y), NAME, font=f_name, fill=FG); y += 41
d.text((x, y), META, font=f_meta, fill=MUTE)

card.save("assets/og-image.jpg", "JPEG", quality=90, optimize=True)
print("wrote assets/og-image.jpg", card.size,
      os.path.getsize("assets/og-image.jpg") // 1024, "KB")
