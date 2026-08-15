import type { Metadata } from 'next';
import Container from '@/components/Container';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import PageHero from '@/components/PageHero';
import ProcessStep from '@/components/ProcessStep';
import BookCover from '@/components/BookCover';
import BookCard from '@/components/BookCard';
import PricingBlock from '@/components/PricingBlock';
import CTASection from '@/components/CTASection';
import { publishingProcess } from '@/content/process';
import { pricing } from '@/content/pricing';
import { booksBySlugs } from '@/content/books';

export const metadata: Metadata = {
  title: 'Publish your book — assisted publishing in India',
  description:
    'Assisted publishing for authors with a manuscript: editorial assessment, editing, cover and interior design, print production, ISBN, metadata and distribution. Your copyright stays yours.',
  alternates: { canonical: '/publish' },
};

const rights = [
  {
    title: 'Copyright remains with you',
    body: 'Copyright in the work is yours and stays yours, subject to the contract we both sign. We do not take ownership of your book as a condition of publishing it.',
  },
  {
    title: 'Publishing rights are contractually defined',
    body: 'The contract states exactly which rights you licence to us, for which formats, in which territories and for how long. Anything not written down is not granted.',
  },
  {
    title: 'Costs are transparent',
    body: 'You receive a written proposal with itemised scope and costs before work starts. If the scope changes mid-project, we quote the change before doing it.',
  },
  {
    title: 'Deliverables are specified',
    body: 'The proposal names the editorial stages, the number of author review rounds, the design routes, the format, the paper, the finish and the print quantity.',
  },
  {
    title: 'Sales are not guaranteed',
    body: 'We can control the quality of the book and the accuracy of its metadata. We cannot control whether readers buy it, and we will not pretend otherwise.',
  },
  {
    title: 'Bestseller status is never guaranteed',
    body: 'We do not run chart campaigns or promise list placements. Any publisher who guarantees this is describing a purchase, not a readership.',
  },
];

const genres = [
  {
    id: 'fiction',
    name: 'Fiction',
    body: 'Novels, novellas and short story collections. Structural editing first, then a cover that sets the register before a reader has read a word.',
  },
  {
    id: 'poetry',
    name: 'Poetry',
    body: 'Collections and anthologies. Typesetting is the whole job here — long lines, stanza breaks, section dividers, and a measure wide enough that nothing turns awkwardly.',
  },
  {
    id: 'memoir',
    name: 'Memoir & Biography',
    body: 'A life, or one part of it. Usually needs developmental work to find the shape, and a plate section designed rather than dropped in.',
  },
  {
    id: 'business',
    name: 'Business & Professional',
    body: 'Expertise turned into a readable book. Wide margins for marginalia, pull quotes, and an interior built for people who read in twenty-minute pieces.',
  },
  {
    id: 'academic',
    name: 'Academic & Specialist',
    body: 'Footnotes on the right page, a two-level index, numbered figures, a bibliography set to a consistent style, and a trim size your discipline expects.',
  },
  {
    id: 'children',
    name: "Children's Books",
    body: 'Picture books and early readers. Illustration commissioned and art-directed, page turns planned against the text, colour proofed on the actual stock.',
  },
];

export default function PublishPage() {
  const covers = booksBySlugs(['nine-monsoons', 'small-hours', 'the-long-way-home', 'the-founders-notebook']);

  return (
    <>
      <PageHero
        eyebrow="Publishing"
        title="Publish your book."
        lede="You bring the manuscript. We handle everything from editorial assessment to finished book — and tell you exactly what each stage costs before it starts."
        aside={
          <div className="grid grid-cols-2 gap-6 sm:gap-8">
            {covers.slice(0, 2).map((b, i) => (
              <div key={b.slug} className={i === 1 ? 'translate-y-10' : ''}>
                <BookCover book={b} />
              </div>
            ))}
          </div>
        }
      >
        <div className="flex flex-wrap gap-4">
          <Button href="/start-your-book?service=publishing" variant="primary" size="lg">
            Submit your manuscript
          </Button>
          <Button href="#process" variant="secondary" size="lg">
            See the process
          </Button>
        </div>
      </PageHero>

      {/* What assisted publishing is */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeading eyebrow="What it is" title="Assisted publishing, explained plainly." />
            <Reveal delay={100} className="max-w-measure space-y-6 font-text text-body text-ink-soft">
              <p>
                In traditional publishing, a publisher acquires your book, pays you an advance,
                bears the cost of production and keeps most of the revenue. Very few manuscripts are
                acquired this way, and the wait is measured in years.
              </p>
              <p>
                In assisted publishing, you commission the work. You pay for the editorial, design
                and production, you keep your copyright, and you keep a far larger share of what the
                book earns. What you are buying is a professional publishing process rather than a
                lottery ticket.
              </p>
              <p>
                The difference between a good assisted publisher and a bad one is not the business
                model. It is whether the editorial is real, whether the design was made for your book
                or pulled from a template, whether the production is specified properly, and whether
                anyone tells you the truth about what a book is likely to sell.
              </p>
              <p className="border-l-2 border-burgundy pl-6 text-ink">
                We do not accept every manuscript. If a book needs more work than you want to do, or
                if what you want is not something we can honestly deliver, we will say so at the
                assessment stage rather than after you have paid.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section id="process" className="scroll-mt-28 bg-paper-deep py-24 sm:py-32">
        <Container wide>
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <SectionHeading
              eyebrow="The process"
              title="From manuscript to finished book."
              lede="Six stages. Each one ends with something you can read, see or hold, and your approval before the next begins."
              className="lg:sticky lg:top-32 lg:self-start"
            />
            <Reveal delay={100}>
              <ol className="border-b border-ink/15">
                {publishingProcess.map((s) => (
                  <ProcessStep key={s.n} stage={s} />
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Genres */}
      <section className="py-24 sm:py-32">
        <Container wide>
          <SectionHeading
            eyebrow="What we publish"
            title="Different books need different work."
            lede="The stages are the same. What happens inside them is not."
          />
          <div className="mt-16 grid gap-x-14 gap-y-0 sm:grid-cols-2">
            {genres.map((g, i) => (
              <Reveal key={g.id} delay={(i % 2) * 60}>
                <div id={g.id} className="scroll-mt-28 border-t border-ink/15 py-8">
                  <h3 className="font-display text-[1.8rem] leading-tight text-ink">{g.name}</h3>
                  <p className="mt-4 max-w-md font-text text-body text-ink-soft">{g.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Rights */}
      <section className="bg-ink py-24 text-paper-light sm:py-32">
        <Container wide>
          <SectionHeading eyebrow="Terms" tone="paper" title="Your rights remain yours." />
          <div className="mt-16 grid gap-x-12 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
            {rights.map((r, i) => (
              <Reveal key={r.title} delay={(i % 3) * 70}>
                <div className="border-t border-paper/20 py-8">
                  <h3 className="font-text text-[0.78rem] font-medium uppercase tracking-[0.16em] text-paper-light">
                    {r.title}
                  </h3>
                  <p className="mt-4 font-text text-[1rem] leading-relaxed text-paper/70">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Sample editions */}
      <section className="py-24 sm:py-32">
        <Container wide>
          <SectionHeading
            eyebrow="Sample editions"
            title="What we mean by design."
            lede="Four specimens produced in-house, each one solving a different problem."
          />
          <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-4 lg:gap-x-10">
            {covers.map((b, i) => (
              <Reveal key={b.slug} delay={i * 70} className={i % 2 === 1 ? 'sm:translate-y-10' : ''}>
                <BookCard book={b} showNote={false} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section className="bg-paper-deep py-24 sm:py-32">
        <Container wide>
          <SectionHeading
            eyebrow="Costs"
            title="Publishing, without the mystery."
            lede="Every book is different. Costs depend on manuscript length, editorial requirements, design complexity, format and print quantity."
          />
          <div className="mt-14 border-b border-ink/15">
            {pricing.map((line, i) => (
              <Reveal key={line.service} delay={i * 50}>
                <PricingBlock line={line} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <p className="max-w-measure font-text text-body text-ink-soft">
              Every project receives a written proposal outlining scope, deliverables and costs
              before work begins.
            </p>
          </Reveal>
        </Container>
      </section>

      <CTASection
        eyebrow="Ready to publish?"
        title="Send us the manuscript."
        body="Tell us where the book is, what you think it needs, and we will read it before we quote anything."
        cta={{ label: 'Submit your manuscript', href: '/start-your-book?service=publishing' }}
        bookSlug="nine-monsoons"
      />
    </>
  );
}
