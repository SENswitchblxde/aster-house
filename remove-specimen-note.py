#!/usr/bin/env python3
"""
Removes the "design specimen" disclaimer from the sample edition pages.

Run from anywhere inside the repo:

    python3 remove-specimen-note.py

Every book page is generated from one template — app/books/[slug]/page.tsx —
so this edits a single file and all nine pages change.

Safe to run twice: it says so and does nothing if the note is already gone.
"""

import re
import sys
from pathlib import Path

MARKER = "design specimen produced by"


def find_repo_root() -> Path:
    """Walk upwards looking for the project root, so cwd doesn't matter."""
    here = Path(__file__).resolve().parent
    for candidate in [here, *here.parents]:
        if (candidate / "package.json").exists() and (candidate / "app").is_dir():
            return candidate
    print("Couldn't find the project root (no package.json with an app/ folder).")
    print("Run this from inside the aster-house folder.")
    sys.exit(1)


def strip_paragraph(source: str) -> tuple[str, int]:
    """
    Removes any <p ...>...</p> block containing the marker text, along with
    the blank line before it. Matches on content rather than exact classes,
    so it still works if the styling has been tweaked.
    """
    pattern = re.compile(
        r"\n*[ \t]*<p\b[^>]*>(?:(?!</p>).)*?"
        + re.escape(MARKER)
        + r"(?:(?!</p>).)*?</p>",
        re.DOTALL,
    )
    return pattern.subn("", source)


def main() -> None:
    root = find_repo_root()
    target = root / "app" / "books" / "[slug]" / "page.tsx"

    if not target.exists():
        print(f"Can't find {target}")
        sys.exit(1)

    original = target.read_text(encoding="utf-8")

    if MARKER not in original:
        print("The note isn't there — nothing to do.")
        return

    updated, count = strip_paragraph(original)

    if count == 0:
        print("Found the text but couldn't match the surrounding <p> tag.")
        print("It may have been reformatted. Remove it by hand instead.")
        sys.exit(1)

    backup = target.with_suffix(".tsx.bak")
    backup.write_text(original, encoding="utf-8")
    target.write_text(updated, encoding="utf-8")

    print(f"Removed the note from {target.relative_to(root)}")
    print(f"Backup saved as {backup.name}")
    print()
    print("Now run:  npm run build")
    print("If it builds, delete the .bak file and push.")


if __name__ == "__main__":
    main()
