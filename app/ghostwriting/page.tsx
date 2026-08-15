import type { Metadata } from 'next';
import Container from '@/components/Container';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import PageHero from '@/components/PageHero';
import ProcessStep from '@/components/ProcessStep';
import BookCover from '@/components/BookCover';
import BookCard from '@/components/BookCard';
import CTASection from '@/components/CTASection';
import { ghostwritingProcess } from '@/content/process';
import { ghostwritingClients, ghostwritingBookTypes } from '@/content/services';
import { booksBySlugs } from '@/content/books';

export const metadata: Metadata = {
  title: 'Nonfiction ghostwriting — founder stories, memoirs, family histories',
  description:
    'Full-service nonfiction ghostwriting: founder and authority books, memoirs, family and corporate histories. Research, structured interviews, a chapter outline you approve, and a complete manuscript in your voice.',
  alternates: { canonical: '/ghostwriting' },
};

const audiences = [
  {
    id: 'business',
    name: 'Founders & Entrepreneurs',
    body: 'The book that explains how the company was actually built, rather than the version told on stage. Usually part memoir, part method — and the hardest part is deciding which parts of the story you are willing to tell honestly.',
  },
  {
    id: 'expert',
    name: 'Experts & Professionals',
    body: 'Doctors, lawyers, academics, consultants and specialists with twenty years of knowledge and no ordered way to present it. The work is largely structural: deciding what the reader must understand first.',
  },
  {
    id: 'memoir',
    name: 'Memoirs & Life Stories',
    body: 'A life, or the part of it that has a shape. We interview at length, read whatever archive exists, and find the spine of the book before writing a word of it.',
  },
  {
    id: 'legacy',
    name: 'Family & Legacy Books',
    body: 'A record made for the people who come after: parents and grandparents interviewed while there is still time, letters and photographs catalogued, and the whole thing produced as a proper book rather than a folder.',
  },
];

export default function GhostwritingPage() {
  const covers = booksBySlugs(['the-founders-notebook', 'a-life-in-letters', 'beyond-the-brief']);

  return (
    <>
      <PageHero
        eyebrow="Ghostwriting"
        title={
          <>
            You have the story.
            <span className="block text-burgundy">We find the words.</span>
          </>
        }
        lede="Full-service nonfiction ghostwriting. We research, interview, structure and write a complete book in your voice — published under your name, directed by you at every stage."
        aside={
          <div className="grid grid-cols-3 items-end gap-4 sm:gap-6">
            {covers.map((b, i) => (
              <div key={b.slug} className={i === 1 ? '-translate-y-10' : ''}>
                <BookCover book={b} />
              </div>
            ))}
          </div>
        }
      >
        <Button href="/start-your-book?service=ghostwriting" variant="primary" size="lg">
          Tell us about your book
        </Button>
      </PageHero>

      {/* What it is */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeading eyebrow="What it is" title="Someone else writes it. It is still your book." />
            <Reveal delay={100} className="max-w-measure space-y-6 font-text text-body text-ink-soft">
              <p>
                A ghostwriter does not invent your life or borrow your expertise. They conduct
                fifteen to forty hours of structured interviews, read whatever archive exists,
                propose a chapter outline, and then do the part that is a craft rather than a memory:
                turning what you know into sentences a stranger will read willingly.
              </p>
              <p>
                You approve the outline before drafting begins. You read every chapter as it is
                delivered. You direct changes, cut what you do not want in the world, and hold the
                final say on every line. The book is published under your name because it is yours.
              </p>
              <p>
                This is not a shortcut for people who cannot write. It is the right tool for people
                who have something worth reading and a job that makes writing it impossible.
              </p>
              <p className="border-l-2 border-burgundy pl-6 text-ink">
                We write nonfiction. We do not ghostwrite novels, and we will tell you politely if
                what you actually want is an editor rather than a writer.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-ink py-24 text-paper-light sm:py-32">
        <Container wide>
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <SectionHeading
              eyebrow="The process"
              tone="paper"
              title="Eight stages, nine to eighteen months."
              lede="Nothing is written before the outline is signed off, and nothing is a surprise."
              className="lg:sticky lg:top-32 lg:self-start"
            />
            <Reveal delay={100}>
              <ol className="border-b border-paper/20">
                {ghostwritingProcess.map((s) => (
                  <ProcessStep key={s.n} stage={s} tone="paper" />
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Who it's for */}
      <section className="py-24 sm:py-32">
        <Container wide>
          <SectionHeading eyebrow="Who we work with" title="Four kinds of book, four kinds of author." />
          <div className="mt-16 grid gap-x-14 sm:grid-cols-2">
            {audiences.map((a, i) => (
              <Reveal key={a.id} delay={(i % 2) * 80}>
                <div id={a.id} className="scroll-mt-28 border-t border-ink/15 py-9">
                  <h3 className="font-display text-[1.9rem] leading-tight text-ink">{a.name}</h3>
                  <p className="mt-4 max-w-md font-text text-body text-ink-soft">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-20 grid gap-12 border-t border-ink/15 pt-12 sm:grid-cols-2 lg:gap-20">
            <Reveal>
              <h3 className="eyebrow text-ink-faint">Authors we work with</h3>
              <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
                {ghostwritingClients.map((c) => (
                  <li key={c} className="font-display text-[1.3rem] text-ink">
                    {c}
                    <span aria-hidden="true" className="ml-3 text-burgundy/50">
                      /
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="eyebrow text-ink-faint">Books we write</h3>
              <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
                {ghostwritingBookTypes.map((c) => (
                  <li key={c} className="font-display text-[1.3rem] text-ink">
                    {c}
                    <span aria-hidden="true" className="ml-3 text-burgundy/50">
                      /
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Sample editions */}
      <section className="bg-paper-deep py-24 sm:py-32">
        <Container wide>
          <SectionHeading
            eyebrow="Sample editions"
            title="Books that can begin with an idea."
            lede="Three specimens showing how ghostwritten books are presented once they are finished."
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
        eyebrow="Ghostwriting"
        title="Tell us about your book."
        body="A conversation costs nothing and usually clarifies whether the book you have in mind is a book, a long essay, or three different books wearing one coat."
        cta={{ label: 'Tell us about your book', href: '/start-your-book?service=ghostwriting' }}
        bookSlug="the-founders-notebook"
      />
    </>
  );
}
