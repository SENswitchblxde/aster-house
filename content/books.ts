/**
 * SAMPLE EDITIONS.
 *
 * These are design specimens produced in-house to demonstrate Aster House's
 * approach to covers, typography and production. They are not published titles
 * and carry no author attribution by design — the imprint line stands where an
 * author name would sit. When real titles exist, add them here with an
 * `author` field and set `sample: false`.
 */

export type CoverVariant =
  | 'stack'
  | 'rule'
  | 'arc'
  | 'grid'
  | 'band'
  | 'frame'
  | 'field';

export type Book = {
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  sample: boolean;
  cover: {
    variant: CoverVariant;
    bg: string;
    fg: string;
    accent: string;
    /** 'display' = serif, 'text' = sans, 'book' = secondary serif */
    face: 'display' | 'text' | 'book';
    tracking?: string;
  };
  /** One line used on cards and hover states. */
  note: string;
  /** Longer design rationale shown on the sample edition page. */
  approach: string;
  spec: { label: string; value: string }[];
  services: string[];
};

export const books: Book[] = [
  {
    slug: 'nine-monsoons',
    title: 'Nine Monsoons',
    category: 'Fiction',
    sample: true,
    cover: { variant: 'stack', bg: '#252321', fg: '#F5F0E7', accent: '#641F2A', face: 'display' },
    note: 'A literary novel set across three decades. Type-only cover, no illustration.',
    approach:
      'Literary fiction rarely needs an image. It needs a voice, set once and set confidently. The title is broken across three lines at a size that would be uncomfortable on a smaller book and is exactly right at 129 × 198mm, with a single burgundy rule doing the work an illustration would otherwise do. The back cover reverses to ivory so the book reads as a pair of surfaces rather than one dark slab.',
    spec: [
      { label: 'Format', value: 'Paperback with flaps, 129 × 198mm' },
      { label: 'Extent', value: '328 pages' },
      { label: 'Text face', value: 'Adobe Caslon, 10.5/15pt' },
      { label: 'Paper', value: '80gsm cream bookwove' },
      { label: 'Finish', value: 'Soft-touch matt lamination, blind deboss on title' },
    ],
    services: ['Developmental editing', 'Copyediting', 'Cover design', 'Interior design', 'Print production'],
  },
  {
    slug: 'small-hours',
    title: 'Small Hours',
    subtitle: 'Poems',
    category: 'Poetry',
    sample: true,
    cover: { variant: 'rule', bg: '#FBF8F2', fg: '#252321', accent: '#641F2A', face: 'display' },
    note: 'A first collection. Quiet cover, generous interior measure.',
    approach:
      'Poetry is a typesetting problem before it is a cover problem. The interior is set on a wide, high margin so that long lines never break awkwardly and short poems are not marooned. The cover holds almost nothing: a title, two hairline rules and a great deal of paper. Restraint here is not shyness, it is a promise about how the poems inside are treated.',
    spec: [
      { label: 'Format', value: 'Paperback, 135 × 210mm' },
      { label: 'Extent', value: '88 pages' },
      { label: 'Text face', value: 'Arnhem, 11/17pt' },
      { label: 'Paper', value: '100gsm uncoated ivory' },
      { label: 'Finish', value: 'Uncoated board, letterpress-weight impression' },
    ],
    services: ['Manuscript assessment', 'Copyediting', 'Cover design', 'Typesetting'],
  },
  {
    slug: 'the-long-way-home',
    title: 'The Long Way Home',
    subtitle: 'A memoir',
    category: 'Memoir',
    sample: true,
    cover: { variant: 'arc', bg: '#641F2A', fg: '#F5F0E7', accent: '#E4DACA', face: 'display' },
    note: 'A memoir of migration and return. Full burgundy field, single geometric mark.',
    approach:
      'Memoir covers default to a photograph of the author, which usually flattens the book into a document. Here a single arc — a horizon, a road, a curve of return, depending on how far into the book you are — carries the whole idea. The burgundy is the house colour used at full strength, which is the only place on any Aster House object where that happens.',
    spec: [
      { label: 'Format', value: 'Hardback with jacket, 153 × 234mm' },
      { label: 'Extent', value: '272 pages, 16pp plate section' },
      { label: 'Text face', value: 'Freight Text, 10.5/15pt' },
      { label: 'Paper', value: '90gsm cream bookwove, 150gsm matt art plates' },
      { label: 'Finish', value: 'Matt jacket, burgundy cloth spine, foil blocking' },
    ],
    services: ['Ghostwriting', 'Developmental editing', 'Cover design', 'Plate section design', 'Print production'],
  },
  {
    slug: 'the-founders-notebook',
    title: "The Founder's Notebook",
    subtitle: 'Building a company in public',
    category: 'Business',
    sample: true,
    cover: { variant: 'grid', bg: '#EDE5D8', fg: '#252321', accent: '#641F2A', face: 'text' },
    note: 'A founder book. Grid-led cover borrowing from the notebook it is named after.',
    approach:
      'Business books are usually designed to look like every other business book, which is a strange decision for a category that sells on the distinctiveness of the person writing it. The cover is built on a visible baseline grid — a notebook rule — with the title set in the sans used across the house identity rather than the expected serif. The interior carries a wide margin for pull quotes and marginal notes, which is how these books are actually read.',
    spec: [
      { label: 'Format', value: 'Hardback, 140 × 216mm' },
      { label: 'Extent', value: '256 pages' },
      { label: 'Text face', value: 'Lyon Text, 10/15pt with sans marginalia' },
      { label: 'Paper', value: '80gsm white bookwove' },
      { label: 'Finish', value: 'Printed board, no jacket, spot UV on rule' },
    ],
    services: ['Ghostwriting', 'Developmental editing', 'Cover design', 'Interior design', 'Print production'],
  },
  {
    slug: 'beyond-the-brief',
    title: 'Beyond the Brief',
    subtitle: 'Notes on professional practice',
    category: 'Professional',
    sample: true,
    cover: { variant: 'band', bg: '#1C3345', fg: '#F5F0E7', accent: '#C4922F', face: 'text' },
    note: 'An authority book for a practising expert. Banded cover, series-ready.',
    approach:
      'This is a cover designed to become a series. The horizontal band, the position of the title and the placement of the imprint stay fixed; only the field colour and the band colour change from book to book. That is how a professional list starts to look like a list rather than a collection of one-offs.',
    spec: [
      { label: 'Format', value: 'Paperback, 135 × 216mm' },
      { label: 'Extent', value: '224 pages' },
      { label: 'Text face', value: 'Charter, 10/14.5pt' },
      { label: 'Paper', value: '80gsm white bookwove' },
      { label: 'Finish', value: 'Matt lamination, gloss varnish on band' },
    ],
    services: ['Ghostwriting', 'Copyediting', 'Series identity', 'Interior design'],
  },
  {
    slug: 'cities-without-maps',
    title: 'Cities Without Maps',
    subtitle: 'Informal urbanism in South Asia',
    category: 'Academic',
    sample: true,
    cover: { variant: 'frame', bg: '#F5F0E7', fg: '#252321', accent: '#641F2A', face: 'display' },
    note: 'A monograph. Framed cover, footnoted interior, full apparatus.',
    approach:
      'Academic books are judged on their apparatus before their argument. The interior handles footnotes, running heads, a bibliography, a two-level index and 40 figures with numbered captions, all on a grid that keeps the notes on the page they belong to. The cover uses a printed frame — a plate mark — to signal a scholarly edition without resorting to a stock photograph of a city.',
    spec: [
      { label: 'Format', value: 'Paperback, 156 × 234mm' },
      { label: 'Extent', value: '384 pages, 40 figures' },
      { label: 'Text face', value: 'Minion Pro, 10/13pt, notes at 8.5/11pt' },
      { label: 'Paper', value: '80gsm white bookwove' },
      { label: 'Finish', value: 'Matt lamination' },
    ],
    services: ['Copyediting', 'Indexing', 'Figure preparation', 'Typesetting', 'ISBN & metadata'],
  },
  {
    slug: 'how-the-kite-learned-to-fly',
    title: 'How the Kite Learned to Fly',
    category: "Children's",
    sample: true,
    cover: { variant: 'field', bg: '#24352E', fg: '#F5F0E7', accent: '#C4922F', face: 'display' },
    note: 'A picture book. Illustration coordinated, colour proofed on press.',
    approach:
      'A picture book is a colour-management project wearing a friendly jacket. We commission and art-direct the illustrator, plan the page turns against the text before any final artwork is made, and proof on the actual stock — because a kite that is warm ochre on screen can arrive from press looking like mustard.',
    spec: [
      { label: 'Format', value: 'Hardback, 240 × 240mm' },
      { label: 'Extent', value: '32 pages' },
      { label: 'Text face', value: 'Bree Serif, 16/24pt' },
      { label: 'Paper', value: '170gsm matt art, 2.5mm greyboard' },
      { label: 'Finish', value: 'Matt lamination, spot gloss on kite' },
    ],
    services: ['Illustration coordination', 'Art direction', 'Interior design', 'Colour proofing', 'Print production'],
  },
  {
    slug: 'meri-dilli',
    title: 'Meri Dilli!',
    subtitle: 'A photographic record',
    category: 'Photography',
    sample: true,
    cover: { variant: 'field', bg: '#252321', fg: '#F5F0E7', accent: '#641F2A', face: 'text', tracking: '0.3em' },
    note: 'A large-format photography book. Duotone proofing, offset print run.',
    approach:
      'Photography books live or die on the reproduction. The sequence is edited on a wall before it is edited on a screen, images are scanned or supplied at full resolution and separated individually, and the book is proofed on press rather than signed off from a PDF. The cover gives the title almost no room, because the pictures are the argument.',
    spec: [
      { label: 'Format', value: 'Hardback, 280 × 240mm landscape' },
      { label: 'Extent', value: '192 pages, 118 plates' },
      { label: 'Text face', value: 'Founders Grotesk, 9/14pt' },
      { label: 'Paper', value: '170gsm silk, FSC certified' },
      { label: 'Finish', value: 'Cloth-bound boards, tipped-in cover image, ribbon' },
    ],
    services: ['Picture editing', 'Sequencing', 'Interior design', 'Colour separation', 'Offset print management'],
  },
  {
    slug: 'a-life-in-letters',
    title: 'A Life in Letters',
    subtitle: 'A family record, 1938–2004',
    category: 'Family & Legacy',
    sample: true,
    cover: { variant: 'frame', bg: '#2E3B36', fg: '#F5F0E7', accent: '#C4922F', face: 'display' },
    note: 'A private edition of 60 copies. Cloth, foil, slipcase.',
    approach:
      'A family book has one reader who matters and about sixty who will keep it forever. Correspondence and photographs are catalogued and transcribed, gaps are filled from interviews, and the whole is set as a proper book with a contents page, dates in the running heads and an index of names. Bound in cloth with foil blocking, in a slipcase, in an edition small enough to be numbered by hand.',
    spec: [
      { label: 'Format', value: 'Case-bound hardback, 165 × 240mm' },
      { label: 'Extent', value: '208 pages, 74 reproductions' },
      { label: 'Text face', value: 'Sabon, 10.5/15pt' },
      { label: 'Paper', value: '120gsm uncoated ivory, archival' },
      { label: 'Finish', value: 'Book cloth, gold foil, head and tail bands, slipcase' },
    ],
    services: ['Research', 'Ghostwriting', 'Transcription', 'Archival scanning', 'Bespoke production'],
  },
];

export const bookBySlug = (slug: string) => books.find((b) => b.slug === slug);

export const booksByCategory = (cats: string[]) =>
  cats.map((c) => books.find((b) => b.category === c)).filter(Boolean) as Book[];

export const booksBySlugs = (slugs: string[]) =>
  slugs.map((s) => bookBySlug(s)).filter(Boolean) as Book[];
