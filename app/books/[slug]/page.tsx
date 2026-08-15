import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import Reveal from '@/components/Reveal';
import BookCover from '@/components/BookCover';
import BookCard from '@/components/BookCard';
import CTASection from '@/components/CTASection';
import { books, bookBySlug } from '@/content/books';

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = bookBySlug(slug);
  if (!book) return {};
  return {
    title: `${book.title} — sample edition`,
    description: `${book.title}: a ${book.category.toLowerCase()} sample edition from Aster House. ${book.note}`,
    alternates: { canonical: `/books/${book.slug}` },
  };
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = bookBySlug(slug);
  if (!book) notFound();

  const others = books.filter((b) => b.slug !== book.slug).slice(0, 3);

  return (
    <>
      <section className="pb-20 pt-10 sm:pb-28 sm:pt-16">
        <Container wide>
          <Reveal>
            <Link href="/books" className="font-text text-[0.72rem] uppercase tracking-[0.16em] text-ink-faint link-draw">
              &larr; All books
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            <Reveal className="mx-auto w-[72%] sm:w-[55%] lg:mx-0 lg:w-full">
              <BookCover book={book} />
            </Reveal>

            <Reveal delay={120}>
              {book.sample && (
                <span className="inline-block bg-burgundy px-3 py-1.5 font-text text-[0.65rem] font-medium uppercase tracking-[0.18em] text-paper-light">
                  Sample edition
                </span>
              )}
              <h1 className="mt-8 font-display text-display-md text-ink">{book.title}</h1>
              {book.subtitle && (
                <p className="mt-4 font-display text-[1.5rem] text-ink-soft">{book.subtitle}</p>
              )}
              <p className="mt-6 font-text text-[0.78rem] uppercase tracking-[0.18em] text-ink-faint">
                {book.category}
              </p>

              <p className="mt-10 max-w-measure font-text text-lede text-ink">{book.note}</p>

              <div className="mt-12 border-t border-ink/15 pt-8">
                <h2 className="eyebrow text-burgundy">The approach</h2>
                <p className="mt-5 max-w-measure font-text text-body text-ink-soft">{book.approach}</p>
              </div>

              <div className="mt-12 border-t border-ink/15 pt-8">
                <h2 className="eyebrow text-ink-faint">Specification</h2>
                <dl className="mt-6">
                  {book.spec.map((s) => (
                    <div
                      key={s.label}
                      className="grid grid-cols-[8rem_1fr] gap-4 border-b border-ink/10 py-3 sm:grid-cols-[11rem_1fr]"
                    >
                      <dt className="font-text text-[0.8rem] uppercase tracking-[0.12em] text-ink-faint">
                        {s.label}
                      </dt>
                      <dd className="font-text text-[1rem] text-ink">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-12 border-t border-ink/15 pt-8">
                <h2 className="eyebrow text-ink-faint">Services demonstrated</h2>
                <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
                  {book.services.map((s) => (
                    <li key={s} className="font-text text-[0.95rem] text-ink-soft">
                      {s}
                      <span aria-hidden="true" className="ml-3 text-burgundy/50">
                        /
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-12 max-w-measure border-l-2 border-burgundy pl-6 font-text text-[0.95rem] leading-relaxed text-ink-soft">
                This is a design specimen produced by Aster House, not a published title. It is not
                for sale and carries no author attribution. When our first list is announced, real
                editions will appear here with their authors, ISBNs and purchase links.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-ink/12 py-20 sm:py-28">
        <Container wide>
          <h2 className="eyebrow text-ink-faint">More sample editions</h2>
          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-3 lg:gap-x-12">
            {others.map((b, i) => (
              <Reveal key={b.slug} delay={i * 70}>
                <BookCard book={b} showNote={false} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection bookSlug={book.slug} />
    </>
  );
}
