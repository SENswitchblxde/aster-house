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
 * `icon` is an optional path to a file in /public/social. Each platform
 * supplies its own official mark — download them from the brand pages listed
 * in public/social/README.md and drop them in. Leave `icon` unset and the
 * link simply renders as type.
 */
export const socials: {
  name: string;
  label: string;
  href: string;
  icon?: string;
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
    icon: '/social/linkedin.svg',
  },
  {
    name: 'Facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61593367052395',
    icon: '/social/facebook.svg',
  },
];

export const CTA = {
  start: { label: 'Start your book', href: '/start-your-book' },
  publishing: { label: 'Explore publishing', href: '/publish' },
  ghostwriting: { label: 'Explore ghostwriting', href: '/ghostwriting' },
  editorial: { label: 'Explore editorial', href: '/editorial' },
  create: { label: 'Explore book production', href: '/create' },
} as const;
