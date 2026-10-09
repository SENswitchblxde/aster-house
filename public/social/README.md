# Social icons

Three files go here. Once they exist, the footer picks them up with no code
change — nothing to switch on.

    instagram.svg
    linkedin.svg
    facebook.svg

Until then the links render as type only, which is how the site looks now.

## Where to get them

Each platform's mark is its own trademark, and each company publishes the
official file along with rules for using it. Use theirs rather than a redrawn
copy — it's both correct and sharper.

Download the **glyph** or **icon** version: the plain single-colour mark, not
the wordmark and not the full-colour app tile.

- Instagram — https://about.meta.com/brand/resources/instagram/icons
- Facebook  — https://about.meta.com/brand/resources/facebook/logo
- LinkedIn  — https://brand.linkedin.com/downloads

Rename each to the filenames above and drop them in this folder.

If a download gives you a `.png` instead of a `.svg`, that works too — change
the `icon:` path in `content/site.ts` to match the extension.

## How they're coloured

The footer uses each file as a CSS mask rather than displaying it directly, so
the glyph is painted in the same ink colour as the link beside it and turns
burgundy on hover along with the text. Whatever colour the downloaded file
happens to be is ignored.

To show a mark in its own colours instead, open `components/Footer.tsx` and
pass `monochrome={false}`:

    <SocialIcon src={s.icon} monochrome={false} />

## To drop icons entirely

Delete the three `icon:` lines in `content/site.ts`. The links go back to
being type only.
