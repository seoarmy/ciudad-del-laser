import sharp from 'sharp';
import { readdir, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const MAX_WIDTH = 1200; // suficiente para el uso más grande (marquee/gallery), evita servir originales de 3000px+
const QUALITY = 78;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(png|jpe?g)$/i.test(entry.name)) yield full;
  }
}

let totalBefore = 0;
let totalAfter = 0;
let count = 0;

for await (const file of walk(IMAGES_DIR)) {
  const before = (await stat(file)).size;
  const outFile = file.replace(/\.(png|jpe?g)$/i, '.webp');

  await sharp(file)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outFile);

  const after = (await stat(outFile)).size;
  await unlink(file);

  totalBefore += before;
  totalAfter += after;
  count++;
  console.log(
    `${path.relative(IMAGES_DIR, file)} → ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB`
  );
}

console.log(
  `\n${count} imágenes: ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB`
);
