export type FaqItem = {
  q: string;
  a: string;
  link?: { label: string; href: string };
};

export const faqs: FaqItem[] = [
  {
    q: 'Do I retain copyright?',
    a: 'Yes. Copyright in your work remains yours. Our contract defines a specific, limited licence to produce and distribute the edition we make together — it does not transfer ownership of the work. The licence, its term and its territory are written down before you sign anything.',
  },
  {
    q: 'Do I need a finished manuscript?',
    a: 'No. Some authors come to us with a completed draft. Others come with a partial manuscript, a set of notes, or nothing but the idea and the material in their head. Each of those is a different starting point with a different route to a book.',
    link: { label: 'Tell us where your book begins', href: '/start-your-book' },
  },
  {
    q: 'Can you help me write my book?',
    a: 'Yes. Our ghostwriting team develops and writes complete nonfiction books — founder stories, professional and authority books, memoirs, family and corporate histories — through research, structured interviews and drafting in your voice.',
    link: { label: 'Learn about ghostwriting', href: '/ghostwriting' },
  },
  {
    q: 'What is ghostwriting?',
    a: 'A professional writer researches, structures and writes the book, working from your material and extended interviews with you. The book is published under your name. You approve the outline, read every chapter, and direct the work throughout.',
  },
  {
    q: 'How much does publishing cost?',
    a: 'It depends on the length of the manuscript, how much editorial work it needs, the complexity of the design, the format and the print quantity. We publish starting prices openly, and every project gets a written proposal with scope, deliverables and costs before work begins.',
    link: { label: 'See publishing options', href: '/publish' },
  },
  {
    q: 'How much does editing cost?',
    a: 'Editorial work is quoted by word count and by the level of intervention the manuscript needs. A manuscript assessment is the cheapest way to find out what your book actually requires before committing to anything larger.',
    link: { label: 'Explore editorial services', href: '/editorial' },
  },
  {
    q: 'Do you provide an ISBN?',
    a: 'Yes, for the editions we publish. We register the ISBN, prepare the metadata that bookshops and retailers read, and make sure the record is correct — an incorrect metadata record is one of the most common reasons a book is hard to find.',
  },
  {
    q: 'Do I have to print hundreds of copies?',
    a: 'No. We work with both print-on-demand and offset printing. Print-on-demand suits most trade paperbacks and carries no inventory. Offset becomes cheaper per copy at higher quantities and gives more control over paper, binding and finish — which matters for illustrated and bespoke books.',
  },
  {
    q: 'Where will my book be available?',
    a: 'Distribution depends on the format and the plan we agree. Typically this includes major online retailers in India and internationally. Physical bookshop placement is never guaranteed by any publisher, ourselves included, and we will tell you that plainly rather than imply otherwise.',
  },
  {
    q: 'Do you work with authors outside India?',
    a: 'Yes. We are based in India and work with authors globally. Interviews and editorial calls are scheduled around your timezone, and files, proofs and contracts are handled remotely.',
  },
  {
    q: 'Do you guarantee sales?',
    a: 'No. Nobody can. We can control the quality of the editing, the design, the production and the metadata. We cannot control whether readers buy the book, and any publisher who tells you otherwise is selling you something else.',
  },
  {
    q: 'Do you guarantee bestseller status?',
    a: 'No. We do not run bestseller campaigns, buy chart positions or promise list placements.',
  },
  {
    q: 'How long does publishing take?',
    a: 'For a standard trade book with a clean manuscript, four to seven months from assessment to finished copies is realistic. Heavy editorial work, illustration, or an offset print run with proofing will extend that. A ghostwritten book usually takes nine to eighteen months.',
  },
  {
    q: 'Can you print hardcover books?',
    a: 'Yes — case-bound hardcovers with cloth or printed boards, dust jackets, head and tail bands, foil, emboss and specialist papers. Hardcover suits gift editions, illustrated books, institutional publications and commemorative work.',
  },
  {
    q: 'Can you create illustrated books?',
    a: "Yes. We coordinate illustrators and photographers, art-direct the work, and design the interior around the images rather than dropping them into a text template.",
    link: { label: 'Explore book production', href: '/create' },
  },
  {
    q: 'Can you create family histories?',
    a: 'Yes, and it is some of the work we most enjoy. A family history can be researched and ghostwritten from interviews and documents, or edited and designed from material you already have. These are usually short private print runs, made properly.',
    link: { label: 'Create a bespoke book', href: '/create' },
  },
  {
    q: 'What happens if I want another edition?',
    a: 'We keep your production files. A reprint, a corrected edition, a new format or a revised second edition can be produced from them. The terms for subsequent editions are set out in the original contract, so there is no renegotiation from zero.',
  },
];
