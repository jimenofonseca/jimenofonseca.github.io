#!/usr/bin/env bash
# Encrypt the private Music + Photography pages.
#
# Usage:
#   ./encrypt.sh                  → prompts for password
#   ./encrypt.sh "yourpassword"   → uses arg directly
#   STATICRYPT_PASSWORD=xxx ./encrypt.sh  → uses env var
#
# Reads source HTML from private-src/ and writes encrypted output to
# music/index.html and photography/index.html (which are committed and
# served publicly). The plaintext source stays gitignored.

set -e
cd "$(dirname "$0")"

PASS="${1:-${STATICRYPT_PASSWORD:-}}"
if [ -z "$PASS" ]; then
  read -rs -p "Password: " PASS
  echo
fi

if [ -z "$PASS" ]; then
  echo "✗ No password provided. Aborting."
  exit 1
fi

mkdir -p music photography

encrypt_one () {
  local src="$1"          # e.g. private-src/music.html
  local out_dir="$2"      # e.g. music
  local title="$3"        # e.g. "Music"

  [ -f "$src" ] || { echo "✗ Missing $src — skipping"; return; }

  npx --yes staticrypt "$src" \
    --password "$PASS" \
    --short \
    --remember 30 \
    --directory "$out_dir" \
    --template-button "Enter" \
    --template-instructions "$title — enter the password to view." \
    --template-color-primary "#0a0a0a" \
    --template-color-secondary "#fafaf9"

  # staticrypt names the output after the source file → rename to index.html
  mv "$out_dir/$(basename "$src")" "$out_dir/index.html"
  echo "✓ $out_dir/index.html"
}

encrypt_one  private-src/music.html        music        "Music"
encrypt_one  private-src/photography.html  photography  "Photography"

echo
echo "Done. Commit and push to deploy."
