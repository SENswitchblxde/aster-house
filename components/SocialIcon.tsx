'use client';

import { useState } from 'react';

/**
 * A platform mark from /public/social.
 *
 * Two things it handles that a plain <img> doesn't:
 *
 * 1. MISSING FILE — the icons are downloaded from each platform's own brand
 *    page rather than committed here (see public/social/README.md). Until a
 *    file exists, this renders nothing instead of a broken-image glyph.
 *
 * 2. COLOUR — a downloaded glyph arrives in the platform's own black or brand
 *    colour, which sits awkwardly beside ink-coloured type. Using the file as
 *    a CSS mask paints it in `currentColor` instead, so it matches the link it
 *    sits beside and turns burgundy on hover along with the text.
 *
 *    Pass `monochrome={false}` to show the file exactly as supplied, in its
 *    own colours. Use that if a platform's guidelines require full colour.
 */
export default function SocialIcon({
  src,
  monochrome = true,
}: {
  src?: string;
  monochrome?: boolean;
}) {
  const [missing, setMissing] = useState(false);

  if (!src || missing) return null;

  // Full colour: the file as supplied.
  if (!monochrome) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={src}
        alt=""
        aria-hidden="true"
        width={22}
        height={22}
        onError={() => setMissing(true)}
        className="h-[1.05em] w-[1.05em] shrink-0"
      />
    );
  }

  return (
    <>
      {/*
        A zero-size <img> is the only reliable way to know whether the file
        exists — CSS masks fail silently, and a failed mask would otherwise
        paint a solid square.
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
        className="h-[1.05em] w-[1.05em] shrink-0 bg-current opacity-75 transition-opacity duration-300 group-hover:opacity-100"
        style={{
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
