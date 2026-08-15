import Link from 'next/link';
import Image from 'next/image';
import type { ArticleMeta } from '@/lib/journal';
import { formatDate } from '@/lib/journal';

export default function ArticleCard({
  article,
  featured = false,
}: {
  article: ArticleMeta;
  featured?: boolean;
}) {
  return (
    <article className={featured ? 'lg:col-span-2' : ''}>
      <Link href={`/journal/${article.slug}`} className="group block">
        <div className="relative aspect-[16/10] overflow-hidden bg-paper-deep">
          <Image
            src={article.heroImage}
            alt={article.heroAlt}
            fill
            unoptimized
            sizes={featured ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 1024px) 30vw, 100vw'}
            className="object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.04]"
          />
        </div>
        <div className="mt-6">
          <p className="eyebrow flex items-center gap-3 text-burgundy">
            <span>{article.category}</span>
            <span aria-hidden="true" className="h-px w-6 bg-ink/25" />
            <span className="text-ink-faint">{article.readingTime} min read</span>
          </p>
          <h3
            className={`mt-4 font-display leading-tight text-ink ${
              featured ? 'text-[2rem] sm:text-[2.6rem]' : 'text-[1.6rem]'
            }`}
          >
            <span className="link-draw">{article.title}</span>
          </h3>
          <p className="mt-4 max-w-measure font-text text-body text-ink-soft">{article.standfirst}</p>
          <p className="mt-5 font-text text-sm text-ink-faint">{formatDate(article.date)}</p>
        </div>
      </Link>
    </article>
  );
}
