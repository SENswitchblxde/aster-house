export const site = {
  name: 'Aster House Books',
  descriptor: 'Independent Publishing & Editorial Studio',
  positioning: 'You bring the story. We make the book.',
  url: 'https://asterhousebooks.com',
  email: 'hello@asterhousebooks.com',
  location: 'India • Working globally',
} as const;

export const nav = [
  { label: 'Publish', href: '/publish' },
  { label: 'Ghostwriting', href: '/ghostwriting' },
  { label: 'Editorial', href: '/editorial' },
  { label: 'Books', href: '/books' },
  { label: 'Journal', href: '/journal' },
  { label: 'About', href: '/about' },
] as const;

export const footerNav = {
  services: [
    { label: 'Publishing', href: '/publish' },
    { label: 'Ghostwriting', href: '/ghostwriting' },
    { label: 'Editorial', href: '/editorial' },
    { label: 'Book Production', href: '/create' },
  ],
  house: [
    { label: 'Books', href: '/books' },
    { label: 'Journal', href: '/journal' },
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/faq' },
  ],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
} as const;

/**
 * `icon` points at a file in /public/social. Each mark is the official asset
 * from that platform's own brand pack — see public/social/README.md.
 *
 * `scale` is an optical adjustment, not a size. A solid mark reads heavier
 * than an outlined one at the same height, so the filled square and circle
 * sit fractionally back from the Instagram camera to look like one set.
 */
export const socials: {
  name: string;
  label: string;
  href: string;
  icon?: string;
  scale?: number;
}[] = [
  {
    name: 'Instagram',
    label: '@asterhousebooks',
    href: 'https://www.instagram.com/asterhousebooks',
    icon: '/social/instagram.svg',
  },
  {
    name: 'LinkedIn',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/aster-house-books/',
    icon: '/social/linkedin.png',
    scale: 0.96,
  },
  {
    name: 'Facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61593367052395',
    icon: '/social/facebook.png',
    scale: 0.94,
  },
];

export const CTA = {
  start: { label: 'Start your book', href: '/start-your-book' },
  publishing: { label: 'Explore publishing', href: '/publish' },
  ghostwriting: { label: 'Explore ghostwriting', href: '/ghostwriting' },
  editorial: { label: 'Explore editorial', href: '/editorial' },
  create: { label: 'Explore book production', href: '/create' },
} as const;
