/**
 * Prepares content/journal before the site is built.
 *
 * 1. UNPACK — any `.zip` in content/journal is opened. Everything inside is
 *    renamed to match the zip's own filename, so `how-to-start-a-memoir.zip`
 *    produces how-to-start-a-memoir.md / .txt / .jpg regardless of what the
 *    files were called inside. The zip is then removed.
 *
 * 2. CHECK — every post is verified. If something is missing or malformed the
 *    build stops with a message written for a human, not a developer.
 *
 * Run locally with:  npm run journal:check
 */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';

const JOURNAL = path.join(process.cwd(), 'content', 'journal');
const IMAGES = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.avif', '.gif'];
const CATEGORIES = [
  'Writing',
  'Editing',
  'Publishing',
  'Book Design',
  'Ghostwriting',
  'Authors',
  'Industry',
];

const problems = [];
const notes = [];

const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/\.[^.]+$/, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

if (!fs.existsSync(JOURNAL)) {
  console.log('journal: no content/journal folder — nothing to do');
  process.exit(0);
}

/* ─────────────────────────── 1. UNPACK ZIPS ─────────────────────────── */

const zips = fs.readdirSync(JOURNAL).filter((f) => f.toLowerCase().endsWith('.zip'));

for (const zip of zips) {
  const slug = slugify(zip);
  const zipPath = path.join(JOURNAL, zip);

  if (!slug) {
    problems.push(
      `The file "${zip}" has no usable name.\n` +
        `   Rename it to something like  how-to-start-a-memoir.zip  and upload again.`,
    );
    continue;
  }

  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'journal-'));
  try {
    execFileSync('unzip', ['-o', '-q', '-j', zipPath, '-d', temp], { stdio: 'pipe' });
  } catch {
    problems.push(
      `"${zip}" could not be opened. It may be damaged.\n` +
        `   Try making the zip again, or upload the three files on their own.`,
    );
    continue;
  }

  // -j flattens folders, and we ignore Mac/Windows housekeeping files.
  const inside = fs
    .readdirSync(temp)
    .filter((f) => !f.startsWith('.') && !f.startsWith('__MACOSX'));

  const pick = (test) => inside.find(test);
  const article = pick((f) => f.toLowerCase().endsWith('.md'));
  const details = pick((f) => f.toLowerCase().endsWith('.txt'));
  const picture = pick((f) => IMAGES.includes(path.extname(f).toLowerCase()));

  const missing = [];
  if (!article) missing.push('the article (.md file)');
  if (!details) missing.push('the details (.txt file)');

  if (missing.length) {
    problems.push(
      `"${zip}" is missing ${missing.join(' and ')}.\n` +
        `   It contained: ${inside.length ? inside.join(', ') : '(nothing)'}\n` +
        `   Add the missing file to the zip and upload it again.`,
    );
    continue;
  }

  fs.copyFileSync(path.join(temp, article), path.join(JOURNAL, `${slug}.md`));
  fs.copyFileSync(path.join(temp, details), path.join(JOURNAL, `${slug}.txt`));

  let imageName = null;
  if (picture) {
    const ext = path.extname(picture).toLowerCase();
    imageName = `${slug}${ext}`;
    fs.copyFileSync(path.join(temp, picture), path.join(JOURNAL, imageName));
  }

  // Point the details file at the picture we just saved, whatever it said.
  const detailsPath = path.join(JOURNAL, `${slug}.txt`);
  let text = fs.readFileSync(detailsPath, 'utf8');
  if (imageName) {
    text = /^image:/im.test(text)
      ? text.replace(/^image:.*$/im, `image: ${imageName}`)
      : `${text.trimEnd()}\nimage: ${imageName}\n`;
    fs.writeFileSync(detailsPath, text);
  }

  fs.rmSync(zipPath, { force: true });
  fs.rmSync(temp, { recursive: true, force: true });

  notes.push(`Unpacked "${zip}" into ${slug}.md, ${slug}.txt${imageName ? `, ${imageName}` : ''}`);
}

/* ─────────────────────────── 2. CHECK POSTS ─────────────────────────── */

const files = fs.readdirSync(JOURNAL);
const posts = files.filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));

if (posts.length === 0) problems.push('There are no posts in content/journal at all.');

for (const slug of posts) {
  const label = `"${slug}"`;
  const detailsPath = path.join(JOURNAL, `${slug}.txt`);

  if (!fs.existsSync(detailsPath)) {
    problems.push(
      `${label} has an article but no details file.\n` +
        `   Add a file called  ${slug}.txt  with at least a title line in it.`,
    );
    continue;
  }

  const meta = {};
  for (const line of fs.readFileSync(detailsPath, 'utf8').split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf(':');
    if (i > 0) meta[t.slice(0, i).trim().toLowerCase()] = t.slice(i + 1).trim();
  }

  if (!meta.title) {
    problems.push(
      `${label} has no title.\n` +
        `   Open ${slug}.txt and add a line like:  title: Why publish your book yourself?`,
    );
  }

  if (meta.category && !CATEGORIES.includes(meta.category)) {
    notes.push(
      `${label} has category "${meta.category}", which isn't one of ours — it will show as Publishing.\n` +
        `   Valid categories: ${CATEGORIES.join(', ')}`,
    );
  }

  // The image can be named in the .txt, or just sit in the folder as <slug>.jpg
  const named = meta.image && !meta.image.startsWith('/') && !meta.image.startsWith('http')
    ? meta.image
    : null;
  const matching = IMAGES.map((e) => `${slug}${e}`).find((f) => files.includes(f));

  if (named && !files.includes(named) && !fs.existsSync(path.join(JOURNAL, named))) {
    problems.push(
      `${label} points at a picture called "${named}", but there is no such file.\n` +
        `   Either upload ${named}, or rename your picture to ${slug}.jpg and remove the image line.`,
    );
  } else if (!named && !matching && !meta.image) {
    problems.push(
      `${label} has no picture.\n` +
        `   Upload one named  ${slug}.jpg  into the same folder.`,
    );
  }

  if (fs.statSync(path.join(JOURNAL, `${slug}.md`)).size < 40) {
    problems.push(`${label} looks empty — the article file has almost nothing in it.`);
  }
}

/* ─────────────────────────── 3. REPORT ─────────────────────────── */

for (const note of notes) console.log(`journal: ${note}`);

if (problems.length) {
  console.error('\n' + '─'.repeat(64));
  console.error(`  THE SITE WAS NOT UPDATED — ${problems.length} problem${problems.length > 1 ? 's' : ''} to fix`);
  console.error('─'.repeat(64) + '\n');
  problems.forEach((p, i) => console.error(` ${i + 1}. ${p}\n`));
  console.error('─'.repeat(64));
  console.error('  Nothing was lost. Fix the above and upload again.');
  console.error('─'.repeat(64) + '\n');
  process.exit(1);
}

console.log(`journal: ${posts.length} post${posts.length === 1 ? '' : 's'} checked, all good`);
