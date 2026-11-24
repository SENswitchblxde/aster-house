/**
 * Where an enquiry came from.
 *
 * Captured once, on the first page of a visit, and kept in sessionStorage so
 * it survives the visitor reading three journal posts before they fill in the
 * form. Capturing at submit time would be useless — by then `document.referrer`
 * is whichever page of ours they clicked through from.
 *
 * No cookies, no third party, nothing personal: only which site sent them and
 * which page they landed on. Cleared when the browser tab closes.
 */

const KEY = 'ahb:attribution';

export type Attribution = {
  /** A readable label, e.g. "Instagram" or "Google search". */
  source: string;
  /** The raw referring URL, for when the label isn't enough. */
  referrer: string;
  /** The first page of ours they saw, with its query string. */
  landingPage: string;
  /** utm_campaign, if the link carried one. */
  campaign: string;
  capturedAt: string;
};

/** Hosts worth naming. Anything else falls back to its own hostname. */
const NETWORKS: [RegExp, string][] = [
  [/(^|\.)instagram\.com$/, 'Instagram'],
  [/(^|\.)linkedin\.com$/, 'LinkedIn'],
  [/^lnkd\.in$/, 'LinkedIn'],
  [/(^|\.)facebook\.com$/, 'Facebook'],
  [/^fb\.(me|com)$/, 'Facebook'],
  [/(^|\.)messenger\.com$/, 'Facebook'],
  [/(^|\.)google\./, 'Google search'],
  [/(^|\.)bing\.com$/, 'Bing search'],
  [/(^|\.)duckduckgo\.com$/, 'DuckDuckGo'],
  [/(^|\.)ecosia\.org$/, 'Ecosia'],
  [/(^|\.)yahoo\./, 'Yahoo search'],
  [/^t\.co$/, 'X (Twitter)'],
  [/(^|\.)(twitter|x)\.com$/, 'X (Twitter)'],
  [/(^|\.)youtube\.com$/, 'YouTube'],
  [/(^|\.)reddit\.com$/, 'Reddit'],
  [/(^|\.)pinterest\./, 'Pinterest'],
  [/(^|\.)whatsapp\.com$/, 'WhatsApp'],
  [/(^|\.)substack\.com$/, 'Substack'],
  [/(^|\.)medium\.com$/, 'Medium'],
];

function describe(referrer: string, utmSource: string): string {
  // An explicit tag on the link always wins — it's the one thing we control.
  if (utmSource) return utmSource;
  if (!referrer) return 'Direct or typed in';

  try {
    const host = new URL(referrer).hostname.toLowerCase();
    if (host === window.location.hostname) return 'Direct or typed in';
    for (const [pattern, name] of NETWORKS) {
      if (pattern.test(host)) return name;
    }
    return host.replace(/^www\./, '');
  } catch {
    return 'Unknown';
  }
}

/** Call once per page load. Only the first call in a visit does anything. */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return;

  try {
    if (sessionStorage.getItem(KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const data: Attribution = {
      source: describe(document.referrer, params.get('utm_source') ?? ''),
      referrer: document.referrer || '',
      landingPage: window.location.pathname + window.location.search,
      campaign: params.get('utm_campaign') ?? '',
      capturedAt: new Date().toISOString(),
    };

    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // Private windows and blocked storage both throw. Attribution is a
    // nice-to-have; an enquiry without it is still an enquiry.
  }
}

export function getAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}
