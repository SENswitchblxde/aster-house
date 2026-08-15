import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const JOURNAL_DIR = path.join(process.cwd(), 'content', 'journal');

export const CATEGORIES = [
  'Writing',
  'Editing',
  'Publishing',
  'Book Design',
  'Ghostwriting',
  'Authors',
  'Industry',
] as const;

export type Category = (typeof CATEGORIES)[number];

export type ArticleMeta = {
  slug: string;
  title: string;
  standfirst: string;
  category: Category;
  date: string;
  readingTime: number;
  /**
   * Hero image lives in /public/journal. Drop a file in that folder and
   * reference it here, or point this at a CMS asset URL later.
   */
  heroImage: string;
  heroAlt: string;
  cta: { label: string; href: string };
};

export type Article = ArticleMeta & { html: string };

function readingTimeFor(body: string) {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(JOURNAL_DIR)) return [];
  return fs
    .readdirSync(JOURNAL_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

function parse(slug: string) {
  const raw = fs.readFileSync(path.join(JOURNAL_DIR, `${slug}.md`), 'utf8');
  const { data, content } = matter(raw);
  return { data, content };
}

export function getArticleMeta(slug: string): ArticleMeta {
  const { data, content } = parse(slug);
  return {
    slug,
    title: data.title,
    standfirst: data.standfirst,
    category: data.category,
    date: data.date,
    readingTime: data.readingTime ?? readingTimeFor(content),
    heroImage: data.heroImage,
    heroAlt: data.heroAlt ?? '',
    cta: data.cta,
  };
}

export async function getArticle(slug: string): Promise<Article> {
  const meta = getArticleMeta(slug);
  const { content } = parse(slug);
  const processed = await remark().use(html).process(content);

  // Markdown images are written as /journal/foo.jpg. Under a GitHub Pages
  // project repo the site is served from a sub-path, so rewrite them.
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const body = base
    ? processed.toString().replace(/src="\//g, `src="${base}/`)
    : processed.toString();

  return { ...meta, html: body };
}

export function getAllArticles(): ArticleMeta[] {
  return getArticleSlugs()
    .map(getArticleMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getRelatedArticles(slug: string, category: string, limit = 3) {
  const all = getAllArticles().filter((a) => a.slug !== slug);
  const sameCategory = all.filter((a) => a.category === category);
  const rest = all.filter((a) => a.category !== category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
