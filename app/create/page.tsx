import type { Metadata } from 'next';
import Container from '@/components/Container';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import PageHero from '@/components/PageHero';
import BookCover from '@/components/BookCover';
import BookCard from '@/components/BookCard';
import CTASection from '@/components/CTASection';
import { bespokeServices } from '@/content/services';
import { booksBySlugs, bookBySlug } from '@/content/books';

export const metadata: Metadata = {
  title: 'Book design & production — covers, typesetting, printing, bespoke editions',
  description:
    'Cover design, interior design and typesetting, illustration coordination, print production and bespoke book manufacture. Family histories, corporate histories, photography and art books, commemorative editions.',
  alternates: { canonical: '/create' },
};

const craft = [
  {
    name: 'Cover design',
    body: 'Two or three considered routes, never twelve. Designed to work at 40mm in a retail listing, at three feet on a table, and in the hand as an object.',
  },
  {
    name: 'Interior design & typesetting',
    body: 'A text face chosen for the book, a measure set for reading, margins that survive binding, and running heads, folios and part openers that behave for three hundred pages.',
  },
  {
    name: 'Illustration & photography',
    body: 'We commission and art-direct illustrators and photographers, plan page turns against the text, and edit picture sequences before anything is placed.',
  },
  {
    name: 'Print production',
    body: 'Print-on-demand or offset, paper specified by weight and shade, matt or soft-touch lamination, foil, deboss, spot varnish, cloth, head and tail bands, slipcases.',
  },
];

export default function CreatePage() {
  const covers = booksBySlugs(['meri-dilli', 'how-the-kite-learned-to-fly', 'a-life-in-letters']);
  const hero = bookBySlug('a-life-in-letters')!;

  return (
    <>
      <PageHero
        eyebrow="Book production"
        title="Some books are meant to be made once."
        lede="Cover, interior, typography, illustration and print production — made as carefully as the words. Including private and institutional editions produced to a specification rather than a template."
        aside={
          <div className="mx-auto w-[70%] lg:w-[80%] lg:justify-self-end">
            <BookCover book={hero} />
          </div>
        }
      >
        <Button href="/start-your-book?service=bespoke" variant="primary" size="lg">
          Discuss your project
        </Button>
      </PageHero>

      {/* Craft */}
      <section className="py-24 sm:py-32">
        <Container wide>
          <SectionHeading eyebrow="The work" title="Four things that decide whether a book feels made." />
          <div className="mt-16 grid gap-x-14 sm:grid-cols-2">
            {craft.map((c, i) => (
              <Reveal key={c.name} delay={(i % 2) * 70}>
                <div className="border-t border-ink/15 py-9">
                  <h3 className="font-display text-[1.9rem] leading-tight text-ink">{c.name}</h3>
                  <p className="mt-4 max-w-md font-text text-body text-ink-soft">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Bespoke */}
      <section id="illustrated" className="scroll-mt-28 bg-ink py-24 text-paper-light sm:py-32">
        <Container wide>
          <div className="grid gap-16 lg:grid-cols-[1fr_0.85fr] lg:gap-24">
            <div>
              <SectionHeading
                eyebrow="Bespoke books"
                tone="paper"
                title="Editions of sixty. Editions of one."
                lede="A bespoke book is specified before it is designed: format, extent, paper, binding, finish and print run. Then it is made, proofed and delivered as an object that will outlast everyone involved."
              />
              <Reveal delay={120} className="mt-14">
                <ul className="grid gap-x-12 sm:grid-cols-2">
                  {bespokeServices.map((s) => (
                    <li key={s} className="border-t border-paper/20 py-4 font-display text-[1.35rem] text-paper-light">
                      {s}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={180} className="mt-14">
                <Button href="/start-your-book?service=bespoke" variant="onDark">
                  Discuss your project
                </Button>
              </Reveal>
            </div>

            <Reveal delay={150} className="self-center">
              <div className="grid grid-cols-2 gap-6">
                {covers.slice(0, 2).map((b, i) => (
                  <div key={b.slug} className={i === 1 ? 'translate-y-12' : ''}>
                    <BookCover book={b} />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Samples */}
      <section className="py-24 sm:py-32">
        <Container wide>
          <SectionHeading
            eyebrow="Sample editions"
            title="Production, demonstrated."
            lede="Each specimen names its format, paper and finish, because those are the decisions that make a book feel like one."
          />
          <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-3 lg:gap-x-12">
            {covers.map((b, i) => (
              <Reveal key={b.slug} delay={i * 80} className={i === 1 ? 'lg:translate-y-12' : ''}>
                <BookCard book={b} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Bespoke"
        title="Tell us what the book has to be."
        body="Family history, corporate record, photography monograph or commemorative edition — start with the specification and the print run, and we will work back from there."
        cta={{ label: 'Create a bespoke book', href: '/start-your-book?service=bespoke' }}
        bookSlug="meri-dilli"
      />
    </>
  );
}
