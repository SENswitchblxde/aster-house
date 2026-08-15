export const site = {
  name: 'Aster House',
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

export const CTA = {
  start: { label: 'Start your book', href: '/start-your-book' },
  publishing: { label: 'Explore publishing', href: '/publish' },
  ghostwriting: { label: 'Explore ghostwriting', href: '/ghostwriting' },
  editorial: { label: 'Explore editorial', href: '/editorial' },
  create: { label: 'Explore book production', href: '/create' },
} as const;
