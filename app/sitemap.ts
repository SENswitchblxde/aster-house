import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { books } from '@/content/books';
import { getArticleSlugs } from '@/lib/journal';

// Required by output: 'export' — metadata routes are dynamic by default.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    '',
    '/publish',
    '/ghostwriting',
    '/editorial',
    '/create',
    '/books',
    '/journal',
    '/about',
    '/faq',
    '/start-your-book',
    '/privacy',
    '/terms',
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    priority: path === '' ? 1 : 0.8,
  }));

  const bookRoutes = books.map((b) => ({
    url: `${site.url}/books/${b.slug}`,
    lastModified: now,
    priority: 0.6,
  }));

  const journalRoutes = getArticleSlugs().map((slug) => ({
    url: `${site.url}/journal/${slug}`,
    lastModified: now,
    priority: 0.7,
  }));

  return [...staticRoutes, ...bookRoutes, ...journalRoutes];
}
