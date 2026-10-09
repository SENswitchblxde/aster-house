'use client';

import { useState } from 'react';

/**
 * A platform mark from /public/social.
 *
 * The file is used as a CSS mask rather than displayed directly, so the glyph
 * is painted in `currentColor` — it matches the ink of the link beside it and
 * turns burgundy on hover along with the text. The official marks arrive in
 * black, blue or white depending on the pack; masking makes that irrelevant.
 *
 * `scale` is an optical adjustment: a solid mark reads heavier than an
 * outlined one at the same height, so the filled marks sit fractionally
 * smaller to look like one set. See content/site.ts.
 *
 * `monochrome={false}` shows the file exactly as supplied instead, for a mark
 * whose guidelines require full colour.
 */
export default function SocialIcon({
  src,
  scale = 1,
  monochrome = true,
}: {
  src?: string;
  scale?: number;
  monochrome?: boolean;
}) {
  const [missing, setMissing] = useState(false);

  if (!src || missing) return null;

  const size = `${1.05 * scale}em`;

  if (!monochrome) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={src}
        alt=""
        aria-hidden="true"
        onError={() => setMissing(true)}
        className="shrink-0 object-contain"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <>
      {/*
        A zero-size <img> is the only reliable way to know the file is there.
        CSS masks fail silently, and a failed mask paints a solid block.
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        onError={() => setMissing(true)}
        className="absolute h-0 w-0 opacity-0"
      />
      <span
        aria-hidden="true"
        className="shrink-0 bg-current opacity-80 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          width: size,
          height: size,
          maskImage: `url(${src})`,
          WebkitMaskImage: `url(${src})`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
        }}
      />
    </>
  );
}
