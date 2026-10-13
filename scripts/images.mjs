// Converts the original photos in src/images/original into optimised WebP files in docs/assets/img.
// The photos are already graded, so this only resizes, sharpens lightly and compresses.
import sharp from 'sharp';
import { readdir, mkdir, writeFile, copyFile } from 'node:fs/promises';
import { join, dirname, extname } from 'node:path';

const SRC = 'src/images/original';
const OUT = 'docs/assets/img';
// Photos used as large heroes get a carefully sharpened 1600px version.
const HERO = new Set(['galerie-01/01-das-ist-unser-brandlgut', 'galerie-01/02-das-brandlgut-am-abend']);

async function walk(dir, base = '') {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const rel = join(base, e.name);
    if (e.isDirectory()) out.push(...await walk(join(dir, e.name), rel));
    else out.push(rel);
  }
  return out;
}

const manifest = {};
for (const rel of (await walk(SRC)).sort()) {
  const ext = extname(rel).toLowerCase();
  const key = rel.slice(0, -ext.length);
  await mkdir(dirname(join(OUT, rel)), { recursive: true });
  if (ext === '.svg') { await copyFile(join(SRC, rel), join(OUT, rel)); continue; }
  if (ext !== '.jpg') continue;
  const img = sharp(join(SRC, rel));
  const { width, height } = await img.metadata();
  const widths = width <= 200 ? [width] : [480, width];
  if (HERO.has(key)) widths.push(1600);
  manifest[key] = { w: width, h: height, widths };
  for (const w of widths) {
    let p = sharp(join(SRC, rel)).resize({ width: w, kernel: 'lanczos3' });
    if (w > width) p = p.sharpen({ sigma: 1.1, m1: 0.6, m2: 1.6 });
    else if (w < width) p = p.sharpen({ sigma: 0.5 });
    await p.webp({ quality: w > width ? 80 : 82, effort: 5 }).toFile(join(OUT, `${key}-${w}.webp`));
  }
}
await writeFile('src/images/manifest.json', JSON.stringify(manifest, null, 1));
console.log('processed', Object.keys(manifest).length, 'photos');
