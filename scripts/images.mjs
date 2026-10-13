// Prepares the photos in src/images/original for the site (docs/assets/img).
//
// Quality first: the sources are only 850px wide, so nothing may be lost on the way.
// - Full size: photos that need no processing are copied as they are (the photographer's own JPEG,
//   no re-compression). Colour-matched room photos are saved as high-quality JPEG.
// - A 480px WebP is made for small slots only (cards, thumbnails).
// - The home page hero is shown very large and gets an extra, carefully enlarged 1600px version.
// The originals are never changed; untouched copies also live in backup/original-images.
import sharp from 'sharp';
import { readdir, mkdir, writeFile, copyFile, rm } from 'node:fs/promises';
import { join, dirname, extname } from 'node:path';
import { matchRoomColours, toSharp } from './colour.mjs';

const SRC = 'src/images/original';
const OUT = 'docs/assets/img';
const HERO = new Set(['galerie-01/01-das-ist-unser-brandlgut']);
// Room photos taken outdoors: nothing to match there.
const NO_MATCH = new Set(['rooms/superior-plus/03_superiorplus_terrasse']);
const JPEG = { quality: 93, chromaSubsampling: '4:4:4', mozjpeg: true };

async function walk(dir, base = '') {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const rel = join(base, e.name);
    if (e.isDirectory()) out.push(...await walk(join(dir, e.name), rel));
    else out.push(rel);
  }
  return out;
}

await rm(OUT, { recursive: true, force: true });
const manifest = {};
let matched = 0, copied = 0;
for (const rel of (await walk(SRC)).sort()) {
  const ext = extname(rel).toLowerCase();
  const key = rel.slice(0, -ext.length);
  await mkdir(dirname(join(OUT, rel)), { recursive: true });
  if (ext === '.svg') { if (!rel.startsWith('logo')) await copyFile(join(SRC, rel), join(OUT, rel)); continue; }
  if (ext !== '.jpg') continue;

  const { width, height } = await sharp(join(SRC, rel)).metadata();
  const files = [];
  let source = () => sharp(join(SRC, rel));
  let processed = false;
  if (key.startsWith('rooms/') && !NO_MATCH.has(key)) {
    const res = await matchRoomColours(join(SRC, rel));
    if (!res.stats.skipped) { const png = await toSharp(res).png().toBuffer(); source = () => sharp(png); processed = true; matched++; }
  }

  if (width > 200) {
    await source().resize({ width: 480, kernel: 'lanczos3' }).sharpen({ sigma: 0.4 }).webp({ quality: 88, effort: 5 }).toFile(join(OUT, `${key}-480.webp`));
    files.push({ w: 480, f: `${key}-480.webp` });
  }
  const full = `${key}-${width}.jpg`;
  if (processed) await source().jpeg(JPEG).toFile(join(OUT, full));
  else { await copyFile(join(SRC, rel), join(OUT, full)); copied++; }
  files.push({ w: width, f: full });
  if (HERO.has(key)) {
    await source().resize({ width: 1600, kernel: 'lanczos3' }).sharpen({ sigma: 0.9, m1: 0.5, m2: 1.2 }).webp({ quality: 86, effort: 6 }).toFile(join(OUT, `${key}-1600.webp`));
    files.push({ w: 1600, f: `${key}-1600.webp` });
  }
  manifest[key] = { w: width, h: height, files };
}
await writeFile('src/images/manifest.json', JSON.stringify(manifest, null, 1));
console.log(`${Object.keys(manifest).length} photos: ${copied} copied unchanged, ${matched} room photos colour-matched`);
