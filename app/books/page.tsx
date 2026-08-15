import type { Metadata } from 'next';
import Container from '@/components/Container';
import Reveal from '@/components/Reveal';
import BookCard from '@/components/BookCard';
import CTASection from '@/components/CTASection';
import { books } from '@/content/books';

export const metadata: Metadata = {
  title: 'Books — sample editions from Aster House',
  description:
    'Sample editions designed in-house by Aster House, showing our approach to cover design, typography, interior layout and print production across fiction, poetry, memoir, business, academic, illustrated and bespoke books.',
  alternates: { canonical: '/books' },
};

export default function BooksPage() {
  /* Uneven column spans keep this reading as a press catalogue rather than a shop grid. */
  const layout = ['lg:col-span-3', 'lg:col-span-3', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-3', 'lg:col-span-3', 'lg:col-span-2', 'lg:col-span-2'];
  const offset = ['', 'lg:translate-y-16', '', 'lg:translate-y-10', 'lg:translate-y-24', '', 'lg:translate-y-12', '', 'lg:translate-y-8'];

  return (
    <>
      <section className="border-b border-ink/12 pb-16 pt-12 sm:pb-20 sm:pt-20">
        <Container wide>
          <Reveal>
            <p className="eyebrow text-burgundy">The list</p>
            <h1 className="mt-8 max-w-4xl font-display text-display-lg text-ink">
              Coming from Aster House.
            </h1>
            <p className="mt-9 max-w-measure text-lede text-ink-soft">
              Our first list is taking shape. Until then, these are sample editions — books designed,
              set and specified in-house to show how we work. They are not published titles, and we
              would rather show you real design than borrowed credibility.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container wide>
          <Reveal>
            <div className="flex items-center gap-4 border-b border-ink/15 pb-5">
              <span className="bg-burgundy px-3 py-1.5 font-text text-[0.65rem] font-medium uppercase tracking-[0.18em] text-paper-light">
                Sample editions
              </span>
              <span className="font-text text-sm text-ink-faint">
                {books.length} specimens &mdash; no titles published yet
              </span>
            </div>
          </Reveal>

          <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-16 sm:gap-x-12 lg:grid-cols-6 lg:gap-x-12">
            {books.map((b, i) => (
              <Reveal
                key={b.slug}
                delay={(i % 3) * 70}
                className={`${layout[i] ?? 'lg:col-span-2'} ${offset[i] ?? ''}`}
              >
                <BookCard book={b} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="h-24 lg:h-40" />

      <CTASection
        eyebrow="The list"
        title="The next one could be yours."
        body="We are reading manuscripts and taking commissions for our first list. Tell us what you have."
        bookSlug="nine-monsoons"
      />
    </>
  );
}
