#!/usr/bin/env python3
"""
Build the photography gallery from full-size originals.

Workflow
--------
1. Drop your original photos (any size) into:
     assets/photography/_originals/

   Supported: .jpg .jpeg .png  (HEIC: convert to JPG first via macOS Preview)

2. Run this script:
     python3 build-gallery.py

3. The script generates:
     assets/photography/<name>.jpg          ← web-size (max 1600px long side)
     assets/photography/thumb/<name>.jpg    ← square 600×600 thumbnail
   and replaces the <figure> blocks inside private-src/photography.html
   between the markers:
     <!-- GALLERY-START -->
     <!-- GALLERY-END -->

4. Re-encrypt and push:
     ./encrypt.sh "yourpassword"
     git add assets/photography/ private-src/photography.html photography/
     git commit -m "Update photo gallery"
     git push

Note: assets/photography/_originals/ is gitignored — your big RAW exports
stay on your machine only, only the optimised versions go to GitHub.
"""

import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
ORIG = ROOT / "assets" / "photography" / "_originals"
FULL = ROOT / "assets" / "photography"
THUMB = ROOT / "assets" / "photography" / "thumb"
HTML = ROOT / "private-src" / "photography.html"

ORIG.mkdir(parents=True, exist_ok=True)
THUMB.mkdir(parents=True, exist_ok=True)

EXTENSIONS = {".jpg", ".jpeg", ".png"}
originals = sorted(p for p in ORIG.iterdir()
                   if p.suffix.lower() in EXTENSIONS and not p.name.startswith("."))

if not originals:
    print(f"No images in {ORIG.relative_to(ROOT)}/")
    print("Drop your originals there first, then re-run.")
    sys.exit(1)


def sips(*args):
    """Run sips silently; raise on failure."""
    subprocess.run(["sips", *args], check=True, capture_output=True)


def dims(path):
    """Return (width, height) using sips."""
    r = subprocess.run(
        ["sips", "-g", "pixelWidth", "-g", "pixelHeight", str(path)],
        capture_output=True, text=True, check=True,
    )
    w = int(re.search(r"pixelWidth:\s*(\d+)", r.stdout).group(1))
    h = int(re.search(r"pixelHeight:\s*(\d+)", r.stdout).group(1))
    return w, h


print(f"Processing {len(originals)} photo(s) from _originals/ …\n")
figures = []
for src in originals:
    stem = src.stem
    out_full = FULL / f"{stem}.jpg"
    out_thumb = THUMB / f"{stem}.jpg"
    print(f"  · {stem}")

    # Web-size full
    sips("-Z", "1600",
         "-s", "format", "jpeg",
         "-s", "formatOptions", "80",
         str(src), "--out", str(out_full))

    # Square thumbnail (center crop, then resize to 600)
    w, h = dims(src)
    short = min(w, h)
    tmp = THUMB / f"{stem}.__tmp__.jpg"
    sips("-c", str(short), str(short), str(src), "--out", str(tmp))
    sips("-Z", "600",
         "-s", "format", "jpeg",
         "-s", "formatOptions", "80",
         str(tmp), "--out", str(out_thumb))
    tmp.unlink()

    figures.append(
        f'          <figure data-full="/assets/photography/{stem}.jpg">\n'
        f'            <img src="/assets/photography/thumb/{stem}.jpg" '
        f'alt="{stem.replace("-", " ").replace("_", " ")}" loading="lazy" />\n'
        f'          </figure>'
    )

# Inject between markers
html = HTML.read_text()
new_block = "\n".join(figures)
pattern = re.compile(
    r"(<!-- GALLERY-START -->\n).*?(\n\s*<!-- GALLERY-END -->)",
    re.DOTALL,
)
if not pattern.search(html):
    print("\n⚠️  Could not find <!-- GALLERY-START --> / <!-- GALLERY-END --> markers")
    print(f"    in {HTML.relative_to(ROOT)}. Add them inside the photo-grid div, then re-run.")
    sys.exit(1)

html = pattern.sub(lambda m: m.group(1) + new_block + m.group(2), html)
HTML.write_text(html)

print(f"\n✓ {len(originals)} photo(s) optimised + grid markup updated.")
print("\nNext steps:")
print('  ./encrypt.sh "yourpassword"')
print("  git add assets/photography/ private-src/photography.html photography/")
print('  git commit -m "Update photo gallery"')
print("  git push")
