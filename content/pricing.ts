export type PriceLine = {
  service: string;
  price: string;
  note: string;
  href: string;
};

/**
 * Prices are intentionally placeholders. Replace the `price` strings with real
 * figures before launch, or wire this array to the CMS.
 */
export const pricing: PriceLine[] = [
  {
    service: 'Manuscript Assessment',
    price: 'From ₹[PRICE]',
    note: 'A full read and a written report. Priced by word count.',
    href: '/editorial#manuscript-assessment',
  },
  {
    service: 'Editorial',
    price: 'From ₹[PRICE]',
    note: 'Developmental editing, copyediting and proofreading, quoted separately or together.',
    href: '/editorial',
  },
  {
    service: 'Publishing',
    price: 'From ₹[PRICE]',
    note: 'Editorial, design, production, ISBN, print files and distribution setup.',
    href: '/publish',
  },
  {
    service: 'Ghostwriting',
    price: 'Bespoke',
    note: 'Scoped per book. Depends on length, research and interview time.',
    href: '/ghostwriting',
  },
  {
    service: 'Bespoke Books',
    price: 'Bespoke',
    note: 'Private and institutional editions, quoted against specification and print run.',
    href: '/create',
  },
];
