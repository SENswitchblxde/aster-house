/**
 * Copies every image sitting in content/journal into public/journal, so an
 * article and its picture can live in the same folder.
 *
 * Runs automatically before `npm run dev` and `npm run build`.
 * Write an article, drop the image beside it, done — nothing to register.
 */
import fs from 'node:fs';
import path from 'node:path';

const SOURCE = path.join(process.cwd(), 'content', 'journal');
const TARGET = path.join(process.cwd(), 'public', 'journal');

const IMAGE_EXTENSIONS = ['.svg', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif'];

if (!fs.existsSync(SOURCE)) {
  console.log('journal: no content/journal folder, nothing to sync');
  process.exit(0);
}

fs.mkdirSync(TARGET, { recursive: true });

const images = fs
  .readdirSync(SOURCE)
  .filter((file) => IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase()));

let copied = 0;
for (const image of images) {
  const from = path.join(SOURCE, image);
  const to = path.join(TARGET, image);

  // Skip files that are already identical, so builds stay fast.
  if (fs.existsSync(to) && fs.statSync(to).mtimeMs >= fs.statSync(from).mtimeMs) continue;

  fs.copyFileSync(from, to);
  copied += 1;
}

console.log(
  `journal: ${images.length} image${images.length === 1 ? '' : 's'} found, ${copied} copied to public/journal`,
);
