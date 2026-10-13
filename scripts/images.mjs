// Turns the working photos in src/images/original into optimised WebP files in docs/assets/img.
// - Room photos are colour-matched first (see scripts/colour.mjs).
// - All other photos are only resized, lightly sharpened and compressed.
// The originals are never changed; untouched copies also live in backup/original-images.
import sharp from 'sharp';
import { readdir, mkdir, writeFile, copyFile } from 'node:fs/promises';
import { join, dirname, extname } from 'node:path';
import { matchRoomColours, toSharp } from './colour.mjs';

const SRC = 'src/images/original';
const OUT = 'docs/assets/img';
// The home page hero is shown very large and gets an extra, carefully sharpened 1600px version.
const HERO = new Set(['galerie-01/01-das-ist-unser-brandlgut']);
// Room photos taken outdoors: nothing to match there.
const NO_MATCH = new Set(['rooms/superior-plus/03_superiorplus_terrasse']);

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
let matched = 0;
for (const rel of (await walk(SRC)).sort()) {
  const ext = extname(rel).toLowerCase();
  const key = rel.slice(0, -ext.length);
  await mkdir(dirname(join(OUT, rel)), { recursive: true });
  if (ext === '.svg') { if (!rel.startsWith('logo')) await copyFile(join(SRC, rel), join(OUT, rel)); continue; }
  if (ext !== '.jpg') continue;

  let source = () => sharp(join(SRC, rel));
  if (key.startsWith('rooms/') && !NO_MATCH.has(key)) {
    const res = await matchRoomColours(join(SRC, rel));
    if (!res.stats.skipped) { const png = await toSharp(res).png().toBuffer(); source = () => sharp(png); matched++; }
  }
  const { width, height } = await sharp(join(SRC, rel)).metadata();
  const widths = width <= 200 ? [width] : [480, width];
  if (HERO.has(key)) widths.push(1600);
  manifest[key] = { w: width, h: height, widths };
  for (const w of widths) {
    let p = source().resize({ width: w, kernel: 'lanczos3' });
    if (w > width) p = p.sharpen({ sigma: 1.1, m1: 0.6, m2: 1.6 });
    else if (w < width) p = p.sharpen({ sigma: 0.5 });
    await p.webp({ quality: w > width ? 80 : 84, effort: 5 }).toFile(join(OUT, `${key}-${w}.webp`));
  }
}
await writeFile('src/images/manifest.json', JSON.stringify(manifest, null, 1));
console.log(`processed ${Object.keys(manifest).length} photos, colour-matched ${matched} room photos`);
