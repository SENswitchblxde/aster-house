import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';
import ArticleCard from '@/components/ArticleCard';
import {
  getArticle,
  getArticleFiles,
  getArticleSlugs,
  getArticleMeta,
  getRelatedArticles,
  fileForRouteSlug,
  formatDate,
} from '@/lib/journal';

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

/** Route slug -> source file, or null if there is no such article. */
function resolve(slug: string): string | null {
  const file = fileForRouteSlug(slug);
  return getArticleFiles().includes(file) ? file : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const file = resolve(slug);
  if (!file) return {};
  const meta = getArticleMeta(file);
  return {
    title: meta.title,
    description: meta.standfirst,
    alternates: { canonical: `/journal/${slug}` },
    openGraph: {
      type: 'article',
      title: meta.title,
      description: meta.standfirst,
      publishedTime: meta.date,
      images: [meta.heroImage],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const file = resolve(slug);
  if (!file) notFound();

  const article = await getArticle(file);
  const related = getRelatedArticles(file, article.category);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.standfirst,
    datePublished: article.date,
    articleSection: article.category,
    author: { '@type': 'Organization', name: 'Aster House Books' },
    publisher: { '@type': 'Organization', name: 'Aster House Books' },
  };

  return (
    <>
      <article>
        <header className="pb-14 pt-12 sm:pt-20">
          <Container>
            <Reveal>
              <Link
                href="/journal"
                className="font-text text-[0.72rem] uppercase tracking-[0.16em] text-ink-faint link-draw"
              >
                &larr; The Journal
              </Link>

              <p className="eyebrow mt-10 flex flex-wrap items-center gap-3 text-burgundy">
                <span>{article.category}</span>
                <span aria-hidden="true" className="h-px w-6 bg-ink/25" />
                <span className="text-ink-faint">{formatDate(article.date)}</span>
                <span aria-hidden="true" className="h-px w-6 bg-ink/25" />
                <span className="text-ink-faint">{article.readingTime} min read</span>
              </p>

              <h1 className="mt-7 max-w-4xl font-display text-display-md text-ink">{article.title}</h1>
              <p className="mt-8 max-w-measure text-lede text-ink-soft">{article.standfirst}</p>
            </Reveal>
          </Container>
        </header>

        <Reveal>
          {/*
            Height is clamped rather than a fixed ratio: an aspect ratio scales
            with viewport width, so 21/9 becomes 800px tall on a 1920 monitor
            and taller still on an ultrawide. This keeps the band a consistent
            slice of the screen on a phone, a laptop and a 34-inch display.
          */}
          <div
            className="relative w-full overflow-hidden bg-paper-deep"
            style={{ height: 'clamp(220px, 38vw, 560px)' }}
          >
            <Image
              src={article.heroImage}
              alt={article.heroAlt}
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Container>
          <div
            className="prose-editorial mx-auto mt-16 max-w-[42rem] sm:mt-24"
            dangerouslySetInnerHTML={{ __html: article.html }}
          />

          <div className="mx-auto mt-20 max-w-[42rem] border-t-2 border-burgundy pt-10">
            <Button href={article.cta.href} variant="primary">
              {article.cta.label}
            </Button>
          </div>
        </Container>
      </article>

      <section className="mt-24 border-t border-ink/12 py-20 sm:mt-32 sm:py-28">
        <Container wide>
          <h2 className="eyebrow text-ink-faint">Related reading</h2>
          <div className="mt-12 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a, i) => (
              <Reveal key={a.slug} delay={i * 70}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
