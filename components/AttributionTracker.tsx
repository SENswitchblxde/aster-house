'use client';

import { useEffect } from 'react';
import { captureAttribution } from '@/lib/attribution';

/**
 * Records where a visit came from, on whatever page it starts.
 *
 * Mounted in the root layout rather than on the form, because most people
 * land on a journal post or the home page and only reach the form later.
 * Renders nothing.
 */
export default function AttributionTracker() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
