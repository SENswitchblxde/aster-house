import type { Metadata } from 'next';
import { Suspense } from 'react';
import Container from '@/components/Container';
import Reveal from '@/components/Reveal';
import EnquiryForm from '@/components/EnquiryForm';
import BookCover from '@/components/BookCover';
import { bookBySlug } from '@/content/books';

export const metadata: Metadata = {
  title: 'Start your book — tell us where your book begins',
  description:
    'Tell us about your book: a finished manuscript, a partial draft or an idea. Publishing, ghostwriting, manuscript assessment, editing, book design and bespoke editions.',
  alternates: { canonical: '/start-your-book' },
};

export default function StartYourBookPage() {
  const book = bookBySlug('the-long-way-home')!;

  return (
    <>
      <section className="border-b border-ink/12 pb-16 pt-12 sm:pb-20 sm:pt-20">
        <Container wide>
          <div className="grid items-end gap-14 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal>
              <p className="eyebrow text-burgundy">Start your book</p>
              <h1 className="mt-8 max-w-3xl font-display text-display-lg text-ink">
                Tell us where your book begins.
              </h1>
              <p className="mt-9 max-w-measure text-lede text-ink-soft">
                A finished manuscript, a half-formed idea, a collection of stories, or simply
                something you&apos;ve been thinking about for years — we&apos;d like to hear about it.
              </p>
            </Reveal>

            <Reveal delay={150} className="hidden lg:block lg:justify-self-end">
              <div className="w-[13rem]">
                <BookCover book={book} />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1.4fr_0.6fr] lg:gap-24">
            <div className="max-w-2xl">
              <Suspense fallback={<p className="font-text text-ink-faint">Loading the form&hellip;</p>}>
                <EnquiryForm />
              </Suspense>
            </div>

            <aside className="lg:sticky lg:top-32 lg:self-start">
              <h2 className="eyebrow text-ink-faint">What happens next</h2>
              <ol className="mt-6 space-y-6">
                {[
                  ['One', 'An editor reads your enquiry — not an autoresponder.'],
                  ['Two', 'We reply within two working days, usually with questions.'],
                  ['Three', 'If it looks like a fit, we read the material properly.'],
                  ['Four', 'You receive a written proposal with scope, deliverables and costs.'],
                ].map(([n, t]) => (
                  <li key={n} className="border-t border-ink/15 pt-4">
                    <p className="font-text text-[0.7rem] uppercase tracking-[0.18em] text-burgundy">{n}</p>
                    <p className="mt-2 font-text text-[1rem] leading-relaxed text-ink-soft">{t}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-10 font-text text-[0.9rem] leading-relaxed text-ink-faint">
                Nothing is charged, and no work begins, until you have read and accepted a written
                proposal.
              </p>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
