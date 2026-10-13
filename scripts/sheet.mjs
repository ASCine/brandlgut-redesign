// Dev helper: node scripts/sheet.mjs <out.jpg> <cols> <cellWidth> <file...>  → contact sheet for visual comparison.
import sharp from 'sharp';
const [out, cols, cw, ...files] = process.argv.slice(2);
const C = +cols, W = +cw, H = Math.round(W * 478 / 850), G = 6;
const tiles = await Promise.all(files.map(f => sharp(f).resize(W, H, { fit: 'cover' }).toBuffer()));
const rows = Math.ceil(tiles.length / C);
await sharp({ create: { width: C * (W + G) + G, height: rows * (H + G) + G, channels: 3, background: '#808080' } })
  .composite(tiles.map((input, i) => ({ input, left: G + (i % C) * (W + G), top: G + Math.floor(i / C) * (H + G) })))
  .jpeg({ quality: 90 }).toFile(out);
