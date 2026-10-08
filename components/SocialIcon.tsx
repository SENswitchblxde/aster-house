'use client';

import { useState } from 'react';

/**
 * Renders a platform mark from /public/social, and removes itself if the file
 * isn't there — so the footer never shows a broken image while the official
 * icons are still being downloaded. See public/social/README.md.
 */
export default function SocialIcon({ src }: { src?: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return null;

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt=""
      aria-hidden="true"
      width={22}
      height={22}
      onError={() => setFailed(true)}
      className="h-[1.05em] w-[1.05em] shrink-0 opacity-75 transition-opacity duration-300 group-hover:opacity-100"
    />
  );
}
