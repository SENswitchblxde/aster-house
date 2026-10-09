# Social icons

The three marks in the footer. All are official assets, taken from each
platform's own brand pack:

    instagram.svg   Instagram_Glyph_Black.svg      (vector)
    linkedin.png    InBug-Black.png, resized       (® retained)
    facebook.png    Facebook_Logo_Secondary.png, resized

## How they're coloured

The footer uses each file as a CSS mask rather than displaying it, so the
glyph is painted in the same ink as the link beside it and turns burgundy on
hover along with the text. Whatever colour the file happens to be is ignored —
only its transparency matters.

That means any replacement must have a **transparent background**. A mark on a
white or coloured tile will mask as a solid block. If you ever need one shown
in its own colours, pass `monochrome={false}` to `SocialIcon` in
`components/Footer.tsx`.

## Optical sizing

`scale` in `content/site.ts` is an optical adjustment, not a size. A solid
mark reads heavier than an outlined one at the same height, so:

    Instagram   1.00   outlined camera, lightest
    LinkedIn    0.96   solid square, heaviest
    Facebook    0.94   solid circle

Nudge these if a replacement mark sits differently.

## LinkedIn's ®

Every LinkedIn In Bug ships with the registered mark attached, and there is no
official version without it. It is kept here rather than cropped. At footer
size it is sub-pixel and invisible; it only shifts the bug a fraction left of
centre, which the scale above accounts for.

## Replacing or removing

Drop a new file in with the same name and it is picked up on the next build.
To remove icons entirely, delete the three `icon:` lines in
`content/site.ts` — the links go back to being type only.
