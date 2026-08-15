export type Stage = { n: string; title: string; body: string };

export const publishingProcess: Stage[] = [
  { n: '01', title: 'Assess', body: 'We start by understanding the manuscript and what it needs.' },
  { n: '02', title: 'Edit', body: 'We strengthen the writing, structure, clarity and consistency.' },
  { n: '03', title: 'Design', body: 'We create the cover and interior around the character of the book.' },
  { n: '04', title: 'Produce', body: 'We prepare the final files, proof the book and manage printing.' },
  { n: '05', title: 'Publish', body: 'We handle ISBN, metadata and appropriate distribution channels.' },
  { n: '06', title: 'Deliver', body: 'You receive your finished book and ongoing support.' },
];

export const ghostwritingProcess: Stage[] = [
  { n: '01', title: 'Discovery', body: 'We work out what the book is, who it is for, and whether it should exist in this form.' },
  { n: '02', title: 'Research', body: 'Reading, archives, source material, prior interviews, company or family records.' },
  { n: '03', title: 'Interviews', body: 'Recorded conversations, usually 15–40 hours, structured around the shape of the book.' },
  { n: '04', title: 'Structure', body: 'A full chapter outline you approve before a word of the book is written.' },
  { n: '05', title: 'Writing', body: 'Chapters delivered in batches, in your voice, with your notes at every stage.' },
  { n: '06', title: 'Editorial', body: 'Developmental and line editing of the complete draft.' },
  { n: '07', title: 'Final manuscript', body: 'A finished book-length manuscript that belongs to you.' },
  { n: '08', title: 'Publishing', body: 'Design, production and publication — with us, or wherever you choose.' },
];
