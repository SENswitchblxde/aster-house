#!/usr/bin/env bash
#
# Aster House Books — publish a new journal post.
# Usage:  ./newpost.sh
#
# Creates the .md and .txt, finds the picture in Downloads, renames everything
# to match, commits and pushes. Nothing is deleted after you start writing.

set -uo pipefail

REPO="$HOME/aster-house"
JOURNAL="$REPO/content/journal"

red()  { printf '\033[31m%s\033[0m\n' "$*"; }
grn()  { printf '\033[32m%s\033[0m\n' "$*"; }
bold() { printf '\033[1m%s\033[0m\n' "$*"; }

cd "$REPO" 2>/dev/null || { red "Can't find $REPO"; exit 1; }

# ── 1. Get the latest version of the site ────────────────────────────────
bold "Getting the latest version of the site..."
if ! git fetch origin --quiet; then
  red "Couldn't reach GitHub. Check the internet connection and try again."
  exit 1
fi
git reset --hard origin/main --quiet
git clean -fd --quiet
grn "Up to date."
echo

# ── 2. Ask for the post name ─────────────────────────────────────────────
bold "What is the web address for this post?"
echo "Lowercase words with hyphens, no spaces. Example: how-to-start-a-memoir"
read -rp "> " SLUG
SLUG=$(echo "$SLUG" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd 'a-z0-9-')

if [ -z "$SLUG" ]; then red "No name given. Stopping."; exit 1; fi

if [ -f "$JOURNAL/$SLUG.md" ]; then
  red "A post called '$SLUG' already exists."
  read -rp "Replace it? (y/n) " ok
  [ "$ok" = "y" ] || exit 1
fi
echo
grn "The post will be at: asterhousebooks.com/journal/$SLUG"
echo

# ── 3. The article ───────────────────────────────────────────────────────
bold "STEP 1 of 3 — the article"
echo "nano will open. Right-click to paste the .md text from ChatGPT."
echo "Then press Ctrl+O, Enter, Ctrl+X to save."
read -rp "Press Enter to open nano..."
nano "$JOURNAL/$SLUG.md"

if [ ! -s "$JOURNAL/$SLUG.md" ]; then
  red "The article is empty. Nothing was saved. Stopping."
  rm -f "$JOURNAL/$SLUG.md"
  exit 1
fi
grn "Article saved."
echo

# ── 4. The details ───────────────────────────────────────────────────────
bold "STEP 2 of 3 — the details"
echo "nano will open again. Paste the .txt text from ChatGPT."
echo "Then Ctrl+O, Enter, Ctrl+X."
read -rp "Press Enter to open nano..."
nano "$JOURNAL/$SLUG.txt"

if [ ! -s "$JOURNAL/$SLUG.txt" ]; then
  red "The details file is empty. Stopping."
  rm -f "$JOURNAL/$SLUG.md" "$JOURNAL/$SLUG.txt"
  exit 1
fi
grn "Details saved."
echo

# ── 5. The picture ───────────────────────────────────────────────────────
bold "STEP 3 of 3 — the picture"

DOWNLOADS=""
for d in /mnt/c/Users/*/Downloads; do
  [ -d "$d" ] && DOWNLOADS="$d" && break
done

if [ -z "$DOWNLOADS" ]; then
  red "Couldn't find the Downloads folder."
  read -rp "Type the full path to the picture: " PIC
else
  mapfile -t PICS < <(find "$DOWNLOADS" -maxdepth 1 -type f \
    \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' \) \
    -printf '%T@ %p\n' 2>/dev/null | sort -rn | head -8 | cut -d' ' -f2-)

  if [ ${#PICS[@]} -eq 0 ]; then
    red "No pictures found in Downloads."
    read -rp "Type the full path to the picture: " PIC
  else
    echo "Newest pictures in Downloads:"
    for i in "${!PICS[@]}"; do
      printf "  %d) %s\n" "$((i+1))" "$(basename "${PICS[$i]}")"
    done
    read -rp "Which number is the picture for this post? " n
    PIC="${PICS[$((n-1))]:-}"
  fi
fi

if [ ! -f "$PIC" ]; then
  red "That picture doesn't exist. Stopping."
  rm -f "$JOURNAL/$SLUG.md" "$JOURNAL/$SLUG.txt"
  exit 1
fi

EXT="${PIC##*.}"
EXT=$(echo "$EXT" | tr '[:upper:]' '[:lower:]')
cp "$PIC" "$JOURNAL/$SLUG.$EXT"
grn "Picture saved as $SLUG.$EXT"

# Make the details file point at the right picture, whatever ChatGPT wrote.
if grep -qi '^image:' "$JOURNAL/$SLUG.txt"; then
  sed -i "s|^[Ii]mage:.*|image: $SLUG.$EXT|" "$JOURNAL/$SLUG.txt"
else
  printf 'image: %s.%s\n' "$SLUG" "$EXT" >> "$JOURNAL/$SLUG.txt"
fi
grn "Details file updated to match the picture."
echo

# ── 6. Publish ───────────────────────────────────────────────────────────
bold "Ready to publish:"
echo "  $SLUG.md    the article"
echo "  $SLUG.txt   the details"
echo "  $SLUG.$EXT  the picture"
echo
read -rp "Publish now? (y/n) " go
if [ "$go" != "y" ]; then
  echo "Not published. The files are saved, run this again when ready."
  exit 0
fi

git add -A
git commit -q -m "New journal post: $SLUG"

if git push --quiet; then
  echo
  grn "Published."
  echo "The site updates in about 2 minutes:"
  echo "  https://asterhousebooks.com/journal/$SLUG"
else
  echo
  red "The push failed. Nothing is lost — the post is saved on this computer."
  echo "Show this screen to whoever set this up."
fi
