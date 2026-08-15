export type Service = {
  slug: string;
  name: string;
  folio: string;
  summary: string;
  href: string;
  ctaLabel: string;
};

export const services: Service[] = [
  {
    slug: 'publish',
    name: 'Publish',
    folio: 'i',
    summary:
      'Have a manuscript? We handle the editorial, design, production and publishing process.',
    href: '/publish',
    ctaLabel: 'Explore publishing',
  },
  {
    slug: 'ghostwrite',
    name: 'Ghostwrite',
    folio: 'ii',
    summary:
      'Have a book in you, but not the time to write it? We develop and write nonfiction books with you.',
    href: '/ghostwriting',
    ctaLabel: 'Explore ghostwriting',
  },
  {
    slug: 'edit',
    name: 'Edit',
    folio: 'iii',
    summary: 'Make the manuscript stronger before it becomes a book.',
    href: '/editorial',
    ctaLabel: 'Explore editorial',
  },
  {
    slug: 'create',
    name: 'Create',
    folio: 'iv',
    summary:
      'Cover, interior, typography, illustration and print production — made as carefully as the words.',
    href: '/create',
    ctaLabel: 'Explore book production',
  },
];

export type BookType = {
  name: string;
  note: string;
  href: string;
};

export const bookTypes: BookType[] = [
  { name: 'Fiction', note: 'Novels, novellas, short story collections', href: '/publish#fiction' },
  { name: 'Poetry', note: 'Single collections and anthologies', href: '/publish#poetry' },
  { name: 'Memoir & Biography', note: 'A life, or one part of it, told well', href: '/ghostwriting#memoir' },
  { name: 'Business & Professional', note: 'Expertise turned into a readable book', href: '/ghostwriting#business' },
  { name: 'Academic & Specialist', note: 'Referenced, indexed, properly set', href: '/publish#academic' },
  { name: "Children's Books", note: 'Picture books, early readers, middle grade', href: '/publish#children' },
  { name: 'Art & Illustrated Books', note: 'Image-led books that need real design', href: '/create#illustrated' },
  { name: 'Family & Legacy Books', note: 'Private editions made to be kept', href: '/ghostwriting#legacy' },
];

export const beliefs = [
  {
    title: 'Editorial matters.',
    body: 'Every book benefits from a careful editorial eye.',
  },
  {
    title: 'Design matters.',
    body: 'A book is an object as well as a text.',
  },
  {
    title: 'Transparency matters.',
    body:
      "You should always understand what you're paying for, what you're getting and what happens to your rights.",
  },
];

export const editorialServices = [
  {
    slug: 'manuscript-assessment',
    name: 'Manuscript Assessment',
    what:
      'A senior editor reads the complete manuscript and writes a detailed report on what is working, what is not, and what to do about it.',
    who:
      'Authors who have finished a draft and want an honest professional read before deciding what happens next.',
    delivered:
      'A written report of 8–15 pages covering structure, pacing, voice, character or argument, market position, and a prioritised list of revisions. Followed by a call.',
  },
  {
    slug: 'developmental-editing',
    name: 'Developmental Editing',
    what:
      'Structural work on the book itself: what to cut, what to move, what to expand, where the argument or the story loses the reader.',
    who:
      'Authors whose draft is complete but not yet shaped, and nonfiction authors whose material is strong but unordered.',
    delivered:
      'An annotated manuscript, a revision plan, chapter-level notes, and two rounds of discussion as you rewrite.',
  },
  {
    slug: 'copyediting',
    name: 'Copyediting',
    what:
      'Line-by-line work on grammar, syntax, consistency, register and factual coherence, against a style sheet built for your book.',
    who:
      'Authors whose structure is settled and who want the prose to read cleanly and consistently.',
    delivered:
      'A tracked-changes manuscript, a style sheet, a queries list, and a clean copy once you have accepted the changes.',
  },
  {
    slug: 'proofreading',
    name: 'Proofreading',
    what:
      'The final read, done on typeset pages rather than the manuscript: typographic errors, bad breaks, widows, running heads, page numbers, contents accuracy.',
    who: 'Every book, before it goes to print. No exceptions.',
    delivered: 'A marked proof and a corrections list applied to the print files.',
  },
];

export const ghostwritingAudiences = [
  'Founders & Entrepreneurs',
  'Experts & Professionals',
  'Memoirs & Life Stories',
  'Family & Legacy Books',
];

export const ghostwritingClients = [
  'Founders',
  'Entrepreneurs',
  'Executives',
  'Doctors',
  'Lawyers',
  'Academics',
  'Experts',
  'Memoirists',
  'Families',
];

export const ghostwritingBookTypes = [
  'Authority books',
  'Founder stories',
  'Memoirs',
  'Family histories',
  'Professional books',
  'Corporate histories',
  'Legacy books',
];

export const bespokeServices = [
  'Family histories',
  'Memoirs',
  'Corporate histories',
  'Institutional publications',
  'Photography books',
  'Art books',
  'Architecture books',
  'Commemorative editions',
];
