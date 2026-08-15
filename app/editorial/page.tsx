import type { Metadata } from 'next';
import Container from '@/components/Container';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import { editorialServices } from '@/content/services';

export const metadata: Metadata = {
  title: 'Book editing services — manuscript assessment to proofreading',
  description:
    'Manuscript assessment, developmental editing, copyediting and proofreading for fiction and nonfiction. What each stage is, who needs it, and exactly what you receive.',
  alternates: { canonical: '/editorial' },
};

export default function EditorialPage() {
  return (
    <>
      <PageHero
        eyebrow="Editorial"
        title="Good books begin with good editing."
        lede="Four levels of editorial work, done in a fixed order. Most manuscripts need two of them. Buying the wrong one at the wrong stage is the most common way authors waste money."
      >
        <Button href="/start-your-book?service=editorial" variant="primary" size="lg">
          Request a manuscript assessment
        </Button>
      </PageHero>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <p className="max-w-measure text-lede text-ink-soft">
              Editing is not proofreading with a bigger budget. Each stage assumes the one before it
              is finished: there is no sense polishing sentences in a chapter that is about to be
              cut, and no sense proofreading a file that has not been typeset yet.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* The four services */}
      <section className="pb-8">
        <Container wide>
          {editorialServices.map((s, i) => (
            <Reveal key={s.slug}>
              <article
                id={s.slug}
                className="scroll-mt-28 grid gap-8 border-t border-ink/15 py-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16 lg:py-20"
              >
                <div className="lg:sticky lg:top-32 lg:self-start">
                  <p className="eyebrow text-burgundy">{String(i + 1).padStart(2, '0')}</p>
                  <h2 className="mt-5 font-display text-display-sm text-ink">{s.name}</h2>
                </div>

                <dl className="grid gap-10 sm:grid-cols-3 sm:gap-8">
                  <div>
                    <dt className="eyebrow text-ink-faint">What it is</dt>
                    <dd className="mt-4 font-text text-[1rem] leading-relaxed text-ink-soft">{s.what}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-ink-faint">Who needs it</dt>
                    <dd className="mt-4 font-text text-[1rem] leading-relaxed text-ink-soft">{s.who}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-burgundy">What you receive</dt>
                    <dd className="mt-4 font-text text-[1rem] leading-relaxed text-ink">{s.delivered}</dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          ))}
        </Container>
      </section>

      {/* Order matters */}
      <section className="bg-paper-deep py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="A note on order"
            title="Start with an assessment if you are not sure."
            lede="A full read and a written report costs a fraction of a full edit and frequently changes what the author decides to buy next. It is the only editorial service we recommend to everyone."
          />
          <Reveal delay={120} className="mt-10">
            <Button href="/start-your-book?service=editorial" variant="secondary">
              Request a manuscript assessment
            </Button>
          </Reveal>
        </Container>
      </section>

      <CTASection
        eyebrow="Editorial"
        title="Not sure what your manuscript needs?"
        body="Send us the draft and tell us where you think it stands. We will tell you which stage it is actually at — including when the answer is that it needs nothing."
        cta={{ label: 'Start your book', href: '/start-your-book?service=editorial' }}
        bookSlug="small-hours"
      />
    </>
  );
}
