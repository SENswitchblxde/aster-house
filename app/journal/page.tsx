import type { Metadata } from 'next';
import Container from '@/components/Container';
import Reveal from '@/components/Reveal';
import ArticleCard from '@/components/ArticleCard';
import CTASection from '@/components/CTASection';
import { getAllArticles, CATEGORIES } from '@/lib/journal';

export const metadata: Metadata = {
  title: 'The Aster House Journal — notes on writing, editing and publishing',
  description:
    'Practical writing about manuscripts, editing, book design, ghostwriting and the publishing process — including what publishing a book in India actually costs.',
  alternates: { canonical: '/journal' },
};

export default function JournalPage() {
  const articles = getAllArticles();
  const [lead, ...rest] = articles;
  const used = new Set(articles.map((a) => a.category));

  return (
    <>
      <section className="border-b border-ink/12 pb-14 pt-12 sm:pb-16 sm:pt-20">
        <Container wide>
          <Reveal>
            <p className="eyebrow text-burgundy">Journal</p>
            <h1 className="mt-8 max-w-3xl font-display text-display-lg text-ink">
              The Aster House Journal
            </h1>
            <p className="mt-9 max-w-measure text-lede text-ink-soft">
              Notes on writing, editing, publishing and making books.
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-12">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {CATEGORIES.map((c) => (
                <li
                  key={c}
                  className={`font-text text-[0.78rem] uppercase tracking-[0.14em] ${
                    used.has(c) ? 'text-ink' : 'text-ink-faint/60'
                  }`}
                >
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container wide>
          {lead && (
            <Reveal className="mb-24">
              <ArticleCard article={lead} featured />
            </Reveal>
          )}

          <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a, i) => (
              <Reveal key={a.slug} delay={i * 80}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Journal"
        title="Reading is not the same as starting."
        body="If something here answered a question you had, the next step is telling us about the book itself."
        bookSlug="small-hours"
      />
    </>
  );
}
