import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const JOURNAL_DIR = path.join(process.cwd(), 'content', 'journal');

const IMAGE_EXTENSIONS = ['.svg', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif'];

/** Every article URL is /journal/<filename>-journal */
const URL_SUFFIX = '';

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
  /** Route slug — what appears in the URL, e.g. `my-post-journal`. */
  slug: string;
  /** Source filename without extension, e.g. `my-post`. */
  file: string;
  title: string;
  standfirst: string;
  category: Category;
  date: string;
  readingTime: number;
  /** Public path to the hero image, e.g. `/journal/my-post.jpg`. */
  heroImage: string;
  heroAlt: string;
  cta: { label: string; href: string };
};

export type Article = ArticleMeta & { html: string };

/* ────────────────────────── slug helpers ────────────────────────── */

export const routeSlugFor = (file: string) => `${file}${URL_SUFFIX}`;

export const fileForRouteSlug = (slug: string) =>
  URL_SUFFIX && slug.endsWith(URL_SUFFIX)
    ? slug.slice(0, -URL_SUFFIX.length)
    : slug;

/* ────────────────────────── discovery ────────────────────────── */

/** Every .md file in content/journal is an article. Nothing to register. */
export function getArticleFiles(): string[] {
  if (!fs.existsSync(JOURNAL_DIR)) return [];
  return fs
    .readdirSync(JOURNAL_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

/** Route slugs, for generateStaticParams and the sitemap. */
export function getArticleSlugs(): string[] {
  return getArticleFiles().map(routeSlugFor);
}

/* ────────────────────────── metadata ────────────────────────── */

/**
 * Metadata lives in a sidecar `<name>.txt` beside `<name>.md`:
 *
 *   title: What a book editor actually does
 *   image: editor.svg
 *   alt: Overlapping manuscript pages with a burgundy rule.
 *   standfirst: One sentence that makes someone want to read on.
 *   category: Editing
 *   date: 2026-06-18
 *   cta-label: Explore editorial services
 *   cta-href: /editorial
 *
 * Blank lines and lines starting with # are ignored. Any missing key falls
 * back to the .md file's frontmatter, then to a sensible default — so an
 * article never breaks the build for want of a field.
 */
function readSidecar(file: string): Record<string, string> {
  const txtPath = path.join(JOURNAL_DIR, `${file}.txt`);
  if (!fs.existsSync(txtPath)) return {};

  const out: Record<string, string> = {};
  for (const line of fs.readFileSync(txtPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const separator = trimmed.indexOf(':');
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim().toLowerCase();
    const value = trimmed.slice(separator + 1).trim();
    if (key) out[key] = value;
  }
  return out;
}

/** Any image sitting in content/journal with the article's basename. */
function findMatchingImage(file: string): string | null {
  for (const ext of IMAGE_EXTENSIONS) {
    if (fs.existsSync(path.join(JOURNAL_DIR, `${file}${ext}`))) return `${file}${ext}`;
  }
  return null;
}

/** Bare filenames resolve to /journal/<name>; absolute paths pass through. */
function toPublicPath(value: string): string {
  if (!value) return '';
  if (value.startsWith('/') || value.startsWith('http')) return value;
  return `/journal/${value.replace(/^\.\//, '')}`;
}

function titleFromFilename(file: string): string {
  const words = file.replace(/[-_]+/g, ' ').trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function readingTimeFor(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

function fileDate(file: string): string {
  try {
    return fs.statSync(path.join(JOURNAL_DIR, `${file}.md`)).mtime.toISOString().slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

function parseMarkdown(file: string) {
  const raw = fs.readFileSync(path.join(JOURNAL_DIR, `${file}.md`), 'utf8');
  return matter(raw);
}

export function getArticleMeta(file: string): ArticleMeta {
  const meta = readSidecar(file);
  const { data, content } = parseMarkdown(file);

  const rawCategory = meta.category ?? data.category ?? '';
  const category = (CATEGORIES as readonly string[]).includes(rawCategory)
    ? (rawCategory as Category)
    : 'Publishing';

  const image =
    meta.image ?? meta['hero-image'] ?? data.heroImage ?? findMatchingImage(file) ?? '';

  return {
    slug: routeSlugFor(file),
    file,
    title: meta.title || data.title || titleFromFilename(file),
    standfirst: meta.standfirst || data.standfirst || '',
    category,
    date: meta.date || data.date || fileDate(file),
    readingTime: Number(meta['reading-time']) || data.readingTime || readingTimeFor(content),
    heroImage: toPublicPath(image),
    heroAlt: meta.alt || meta['hero-alt'] || data.heroAlt || '',
    cta: {
      label: meta['cta-label'] || data.cta?.label || 'Start your book',
      href: meta['cta-href'] || data.cta?.href || '/start-your-book',
    },
  };
}

export async function getArticle(file: string): Promise<Article> {
  const meta = getArticleMeta(file);
  const { content } = parseMarkdown(file);
  const processed = await remark().use(html).process(content);

  let body = processed.toString();

  // Images written as ![alt](picture.jpg) resolve to the journal folder.
  body = body.replace(/src="(?!https?:|\/)([^"]+)"/g, (_m, src) => `src="/journal/${src}"`);

  // Under a GitHub Pages project sub-path, prefix everything.
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  if (base) body = body.replace(/src="\//g, `src="${base}/`);

  return { ...meta, html: body };
}

/* ────────────────────────── collections ────────────────────────── */

export function getAllArticles(): ArticleMeta[] {
  return getArticleFiles()
    .map(getArticleMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getRelatedArticles(file: string, category: string, limit = 3) {
  const all = getAllArticles().filter((a) => a.file !== file);
  const sameCategory = all.filter((a) => a.category === category);
  const rest = all.filter((a) => a.category !== category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export function formatDate(iso: string) {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return iso;
  return parsed.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
