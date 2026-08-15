import Link from 'next/link';
import Container from '@/components/Container';
import Reveal from '@/components/Reveal';
import Eyebrow from '@/components/Eyebrow';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import ServiceBlock from '@/components/ServiceBlock';
import ProcessStep from '@/components/ProcessStep';
import BookStack from '@/components/BookStack';
import BookCover from '@/components/BookCover';
import BookCard from '@/components/BookCard';
import PricingBlock from '@/components/PricingBlock';
import ArticleCard from '@/components/ArticleCard';
import CTASection from '@/components/CTASection';
import { services, bookTypes, beliefs, editorialServices, bespokeServices } from '@/content/services';
import { publishingProcess } from '@/content/process';
import { pricing } from '@/content/pricing';
import { booksBySlugs, books } from '@/content/books';
import { getAllArticles } from '@/lib/journal';
import { site } from '@/content/site';

export default function HomePage() {
  const heroBooks = booksBySlugs(['the-long-way-home', 'nine-monsoons', 'small-hours']);
  const ghostBooks = booksBySlugs(['the-founders-notebook', 'a-life-in-letters', 'beyond-the-brief']);
  const shelf = booksBySlugs([
    'nine-monsoons',
    'the-long-way-home',
    'the-founders-notebook',
    'meri-dilli',
    'small-hours',
    'how-the-kite-learned-to-fly',
  ]);
  const articles = getAllArticles().slice(0, 3);

  return (
    <>
      {/* ─────────────────────────── 1. HERO ─────────────────────────── */}
      <section className="relative overflow-hidden pb-20 pt-10 sm:pb-28 sm:pt-16">
        <Container wide>
          <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <Reveal>
              <Eyebrow tone="burgundy">{site.descriptor}</Eyebrow>
              <h1 className="mt-8 font-display text-display-xl text-ink">
                You bring the story.
                <span className="block text-burgundy">We make the book.</span>
              </h1>
              <p className="mt-10 max-w-measure text-lede text-ink-soft">
                Some books begin with a manuscript. Others begin with a story, an idea or a lifetime
                of experience. We help turn them into books.
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-4">
                <Button href="/start-your-book" variant="primary" size="lg">
                  Start your book
                </Button>
                <Button href="/publish#process" variant="secondary" size="lg">
                  How it works
                </Button>
              </div>
            </Reveal>

            <Reveal delay={150} className="lg:pl-6">
              <BookStack books={heroBooks} />
              <p className="mt-12 text-center font-text text-[0.72rem] uppercase tracking-[0.2em] text-ink-faint">
                Sample editions &mdash; designed in-house
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ────────────────────── 2. FOUR SERVICES ────────────────────── */}
      <section className="border-t border-ink/12 py-24 sm:py-32" aria-labelledby="services-heading">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            <SectionHeading
              eyebrow="What we do"
              title="From first idea to final page."
              as="h2"
              className="lg:sticky lg:top-32 lg:self-start"
            />
            <Reveal delay={100}>
              <p className="max-w-measure text-lede text-ink-soft">
                Some authors arrive with a finished manuscript. Others arrive with an idea, a
                lifetime of experience or a story they don&apos;t yet know how to tell. We meet you
                wherever the book begins.
              </p>
            </Reveal>
          </div>

          <div id="services-heading" className="sr-only">
            Our services
          </div>

          <div className="mt-20 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 80} className={i % 2 === 1 ? 'lg:pt-14' : ''}>
                <ServiceBlock service={s} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────────────────── 3. BOOK TYPES ───────────────────── */}
      <section className="bg-paper-deep py-24 sm:py-32">
        <Container wide>
          <SectionHeading eyebrow="Categories" title="Whatever the book, start here." />

          <ul className="mt-16 grid gap-x-14 sm:grid-cols-2">
            {bookTypes.map((t, i) => (
              <li key={t.name}>
                <Reveal delay={(i % 2) * 60}>
                  <Link
                    href={t.href}
                    className="group flex items-baseline justify-between gap-6 border-t border-ink/15 py-7 transition-colors duration-500 hover:border-burgundy"
                  >
                    <span className="min-w-0">
                      <span className="block font-display text-[1.7rem] leading-tight text-ink transition-colors duration-300 group-hover:text-burgundy sm:text-[2rem]">
                        {t.name}
                      </span>
                      <span className="mt-2 block font-text text-[0.95rem] text-ink-soft">
                        {t.note}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 pt-2 font-text text-ink-faint transition-transform duration-500 ease-editorial group-hover:translate-x-1 group-hover:text-burgundy"
                    >
                      &rarr;
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ───────────────────── 4. BELIEFS (no CTA — this section breathes) ───────────────────── */}
      <section className="py-28 sm:py-40">
        <Container>
          <Reveal>
            <h2 className="mx-auto max-w-4xl text-center font-display text-display-md text-ink">
              Publishing should be more than putting a file into print.
            </h2>
            <p className="mx-auto mt-10 max-w-measure text-center text-lede text-ink-soft">
              We believe the difference is in the details: a manuscript that&apos;s been properly
              edited, a cover that belongs to the book, typography that makes reading effortless, and
              production that respects the work.
            </p>
          </Reveal>

          <div className="mt-20 grid gap-12 sm:mt-24 sm:grid-cols-3 sm:gap-10">
            {beliefs.map((b, i) => (
              <Reveal key={b.title} delay={i * 100}>
                <div className="border-t-2 border-burgundy pt-6">
                  <h3 className="font-text text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink">
                    {b.title}
                  </h3>
                  <p className="mt-4 font-text text-body text-ink-soft">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────────────────── 5. PROCESS ───────────────────── */}
      <section className="border-t border-ink/12 py-24 sm:py-32">
        <Container wide>
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHeading
                eyebrow="The process"
                title="From manuscript to finished book."
                lede="Six stages. You see the work at every one of them, and nothing moves forward without your approval."
              />
              <Reveal delay={150} className="mt-10">
                <Button href="/publish#process" variant="secondary">
                  See how publishing works
                </Button>
              </Reveal>
            </div>

            <Reveal delay={100}>
              <ol className="border-b border-ink/15">
                {publishingProcess.map((stage) => (
                  <ProcessStep key={stage.n} stage={stage} />
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ───────────────────── 6. GHOSTWRITING ───────────────────── */}
      <section className="bg-ink py-24 text-paper-light sm:py-32">
        <Container wide>
          <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Ghostwriting"
                tone="paper"
                title={
                  <>
                    You have the story.
                    <span className="block">We find the words.</span>
                  </>
                }
                lede="Not every author starts with a manuscript. Sometimes the book begins with an idea, a career, a body of expertise or a lifetime of experiences. Our ghostwriting team helps turn that material into a complete nonfiction book."
              />

              <Reveal delay={120} className="mt-12">
                <ul className="grid gap-x-8 sm:grid-cols-2">
                  {[
                    'Founders & Entrepreneurs',
                    'Experts & Professionals',
                    'Memoirs & Life Stories',
                    'Family & Legacy Books',
                  ].map((c) => (
                    <li
                      key={c}
                      className="border-t border-paper/20 py-4 font-text text-[1.05rem] text-paper/85"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={180} className="mt-12">
                <Button href="/ghostwriting" variant="onDark">
                  Explore ghostwriting
                </Button>
              </Reveal>
            </div>

            <Reveal delay={150} className="self-center">
              <div className="grid grid-cols-3 items-end gap-4 sm:gap-6">
                {ghostBooks.map((b, i) => (
                  <div key={b.slug} className={i === 1 ? '-translate-y-8 sm:-translate-y-12' : ''}>
                    <BookCover book={b} />
                  </div>
                ))}
              </div>
              <p className="mt-10 text-center font-text text-[0.72rem] uppercase tracking-[0.2em] text-paper/45">
                Books can begin with an idea
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ───────────────────── 7. EDITORIAL ───────────────────── */}
      <section className="py-24 sm:py-32">
        <Container wide>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Editorial"
                title="Good books begin with good editing."
                lede="Four levels of editorial work, done in order. Most manuscripts need two of them; almost none need all four at once."
              />
              <Reveal delay={150} className="mt-10">
                <Button href="/editorial" variant="secondary">
                  Explore editorial
                </Button>
              </Reveal>
            </div>

            <Reveal delay={100}>
              <dl className="border-b border-ink/15">
                {editorialServices.map((s) => (
                  <div key={s.slug} className="border-t border-ink/15 py-7">
                    <dt className="font-display text-[1.6rem] leading-tight text-ink">{s.name}</dt>
                    <dd className="mt-3 max-w-xl font-text text-body text-ink-soft">{s.what}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ───────────────────── 8. COMING FROM ASTER HOUSE ───────────────────── */}
      <section className="bg-paper-deep py-24 sm:py-32">
        <Container wide>
          <SectionHeading
            eyebrow="The list"
            title="Coming from Aster House."
            lede="Our first list is taking shape. Until then, explore a selection of sample editions showing how we approach book design, editorial presentation and production."
          />

          {/* Irregular shelf: sizes and baselines deliberately uneven */}
          <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-16 sm:gap-x-12 lg:grid-cols-6 lg:gap-x-10">
            <Reveal className="lg:col-span-2">
              <BookCard book={shelf[0]} />
            </Reveal>
            <Reveal delay={80} className="lg:col-span-2 lg:translate-y-14">
              <BookCard book={shelf[1]} />
            </Reveal>
            <Reveal delay={160} className="lg:col-span-2">
              <BookCard book={shelf[2]} />
            </Reveal>
            <Reveal delay={40} className="lg:col-span-3 lg:translate-y-6">
              <BookCard book={shelf[3]} />
            </Reveal>
            <Reveal delay={120} className="lg:col-span-2 lg:translate-y-20">
              <BookCard book={shelf[4]} />
            </Reveal>
            <Reveal delay={200} className="col-span-2 mx-auto w-1/2 sm:w-full lg:col-span-1 lg:mx-0 lg:w-full lg:translate-y-6">
              <BookCard book={shelf[5]} showNote={false} />
            </Reveal>
          </div>

          <Reveal delay={100} className="mt-28 lg:mt-40">
            <Button href="/books" variant="secondary">
              Explore sample editions
            </Button>
          </Reveal>
        </Container>
      </section>

      {/* ───────────────────── 9. BESPOKE ───────────────────── */}
      <section className="py-24 sm:py-32">
        <Container wide>
          <div className="grid gap-16 lg:grid-cols-[1fr_0.75fr] lg:gap-24">
            <div>
              <SectionHeading
                eyebrow="Bespoke books"
                title="Some books are meant to be made once."
                lede="Private and institutional editions, made to a specification rather than a template: cloth binding, foil, archival paper, hand-numbered print runs, slipcases."
              />

              <Reveal delay={120} className="mt-14">
                <ul className="grid gap-x-12 sm:grid-cols-2">
                  {bespokeServices.map((s) => (
                    <li
                      key={s}
                      className="border-t border-ink/15 py-4 font-display text-[1.35rem] text-ink"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={180} className="mt-14">
                <Button href="/create" variant="primary">
                  Create a bespoke book
                </Button>
              </Reveal>
            </div>

            <Reveal delay={150} className="self-center">
              <div className="mx-auto w-[70%] lg:w-full">
                <BookCover book={books.find((b) => b.slug === 'meri-dilli')!} />
              </div>
              <p className="mt-8 text-center font-text text-[0.72rem] uppercase tracking-[0.2em] text-ink-faint">
                Sample edition &mdash; Meri Dilli!
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ───────────────────── 10. PRICING ───────────────────── */}
      <section className="bg-paper-deep py-24 sm:py-32">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <SectionHeading
              eyebrow="Costs"
              title="Publishing, without the mystery."
              className="lg:sticky lg:top-32 lg:self-start"
            />
            <Reveal delay={100}>
              <p className="max-w-measure text-lede text-ink-soft">
                Every book is different. Costs depend on manuscript length, editorial requirements,
                design complexity, format and print quantity.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 border-b border-ink/15">
            {pricing.map((line, i) => (
              <Reveal key={line.service} delay={i * 60}>
                <PricingBlock line={line} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={100} className="mt-12">
            <p className="max-w-measure font-text text-body text-ink-soft">
              Every project receives a written proposal outlining scope, deliverables and costs
              before work begins.
            </p>
            <div className="mt-8">
              <Button href="/start-your-book" variant="secondary">
                Get a project quote
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ───────────────────── 11. JOURNAL ───────────────────── */}
      <section className="py-24 sm:py-32">
        <Container wide>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="Journal"
              title="The Aster House Journal"
              lede="Notes on writing, editing, publishing and making books."
            />
            <Reveal delay={120}>
              <Button href="/journal" variant="quiet">
                All articles
              </Button>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={i * 80}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────────────────── 12. FINAL CTA ───────────────────── */}
      <CTASection />
    </>
  );
}
