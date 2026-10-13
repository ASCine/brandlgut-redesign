// Colour matching for the interior room photos.
//
// The rooms are lit by daylight and warm lamps at once, so one side of a white bed can look
// bluish and the other yellow, and whole pictures differ a lot in warmth. This estimates the
// colour of the light from the white things in the picture (bedding, walls, tiles) region by
// region, pulls it towards one shared, slightly warm white, and evens out the exposure.
// Originals are never modified; this runs on the way to the WebP files.
import sharp from 'sharp';

const TARGET = { r: 1.028, g: 1.0, b: 0.93 };   // the shared white, a touch warm
const STRENGTH = 0.78;                           // 1 = casts removed completely
const GRID_W = 96, GRID_H = 54;                  // resolution of the light estimate
const SIGMA = 7;                                 // in grid cells: only large-scale casts are corrected
const TARGET_WHITE_L = 90.5;                       // brightness the white surfaces are evened out to
const EXPOSURE_LIMIT = [0.95, 1.08];
const WHITE_LAB = [0.4, 4.5];                    // a, b of a clean, slightly warm white wall
const WALL_L = 94;                               // brightness of a well-lit white wall

const toLin = new Float32Array(256);
for (let i = 0; i < 256; i++) { const c = i / 255; toLin[i] = c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }
const toSrgb = v => { v = v <= 0 ? 0 : v >= 1 ? 1 : v; return Math.round(255 * (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055)); };
const lum = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
const f = t => t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116;
function lab(r, g, b) {
  const x = (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047, y = lum(r, g, b), z = (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883;
  const fx = f(x), fy = f(y), fz = f(z);
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}
const finv = t => t > 0.206893 ? t * t * t : (t - 16 / 116) / 7.787;
function fromLab(L, a, b) {
  const fy = (L + 16) / 116, x = 0.95047 * finv(fy + a / 500), y = finv(fy), z = 1.08883 * finv(fy - b / 200);
  return [3.2406 * x - 1.5372 * y - 0.4986 * z, -0.9689 * x + 1.8758 * y + 0.0415 * z, 0.0557 * x - 0.2040 * y + 1.0570 * z];
}
const smooth = (lo, hi, v) => { const t = Math.min(1, Math.max(0, (v - lo) / (hi - lo))); return t * t * (3 - 2 * t); };

// Gaussian blur that averages over the pixels inside the picture only (correct at the borders).
function blur(src, w, h, sigma) {
  const radius = Math.ceil(sigma * 2.5), k = [];
  for (let i = -radius; i <= radius; i++) k.push(Math.exp(-(i * i) / (2 * sigma * sigma)));
  const tmp = new Float32Array(w * h), out = new Float32Array(w * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    let s = 0, n = 0;
    for (let i = -radius; i <= radius; i++) { const xx = x + i; if (xx >= 0 && xx < w) { s += src[y * w + xx] * k[i + radius]; n += k[i + radius]; } }
    tmp[y * w + x] = s / n;
  }
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    let s = 0, n = 0;
    for (let i = -radius; i <= radius; i++) { const yy = y + i; if (yy >= 0 && yy < h) { s += tmp[yy * w + x] * k[i + radius]; n += k[i + radius]; } }
    out[y * w + x] = s / n;
  }
  return out;
}

// Optional second step, `cleanWhites`: white walls that lie in shade can read as grey or blotchy
// ("dirty") once the warm cast is gone. This lifts shaded white surfaces towards white and evens
// out leftover tints on them. Coloured things (wood, fabrics, furniture) are not touched.
//   lift: 0…1, how far shaded whites are brightened; tint: 0…1, how strongly leftover tints are pulled to a
//   clean warm white; smooth: 0…1, how much fine mottling in the plaster is smoothed.
//
// Returns { data, info, stats } with corrected raw sRGB pixels.
export async function matchRoomColours(file, { strength = STRENGTH, cleanWhites = null } = {}) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;
  const n = GRID_W * GRID_H;
  const sw = new Float32Array(n), sr = new Float32Array(n), sg = new Float32Array(n), sb = new Float32Array(n);
  let tw = 0, tr = 0, tg = 0, tb = 0;
  const whiteL = [];

  for (let y = 0; y < H; y++) {
    const gy = Math.min(GRID_H - 1, Math.floor(y * GRID_H / H));
    for (let x = 0; x < W; x++) {
      const p = (y * W + x) * C;
      const r = toLin[data[p]], g = toLin[data[p + 1]], b = toLin[data[p + 2]];
      const [L, a, bb] = lab(r, g, b);
      // "White thing": bright and not strongly coloured. Fully blown-out pixels carry no colour information.
      const w = smooth(58, 74, L) * (1 - smooth(20, 34, Math.hypot(a, bb))) * (1 - smooth(99.4, 100, L));
      if (w <= 0) continue;
      const i = gy * GRID_W + Math.min(GRID_W - 1, Math.floor(x * GRID_W / W));
      sw[i] += w; sr[i] += w * r; sg[i] += w * g; sb[i] += w * b;
      tw += w; tr += w * r; tg += w * g; tb += w * b;
      if (w > 0.5 && (x + y) % 3 === 0) whiteL.push(L);
    }
  }
  const coverage = tw / (W * H);
  if (coverage < 0.1) return { data, info, stats: { coverage, skipped: true } };

  const bw = blur(sw, GRID_W, GRID_H, SIGMA), br = blur(sr, GRID_W, GRID_H, SIGMA), bg = blur(sg, GRID_W, GRID_H, SIGMA), bb = blur(sb, GRID_W, GRID_H, SIGMA);
  const tY = lum(TARGET.r, TARGET.g, TARGET.b);
  const tgt = [TARGET.r / tY, TARGET.g / tY, TARGET.b / tY];
  const gY = lum(tr, tg, tb), glob = [tr / gY, tg / gY, tb / gY];
  const full = (W * H) / n * 0.12 / (2 * Math.PI * SIGMA * SIGMA);   // weight at which the local estimate is fully trusted
  const gr = new Float32Array(n), gg = new Float32Array(n), gb = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const conf = Math.min(1, bw[i] / full);
    let wr = glob[0], wg = glob[1], wb = glob[2];
    if (bw[i] > 1e-6) {
      const y = lum(br[i], bg[i], bb[i]);
      wr = glob[0] + conf * (br[i] / y - glob[0]); wg = glob[1] + conf * (bg[i] / y - glob[1]); wb = glob[2] + conf * (bb[i] / y - glob[2]);
    }
    let r = (tgt[0] / wr) ** strength, g = (tgt[1] / wg) ** strength, b = (tgt[2] / wb) ** strength;
    const keep = 1 / lum(r * wr, g * wg, b * wb);  // the correction must not change brightness
    gr[i] = r * keep; gg[i] = g * keep; gb[i] = b * keep;
  }

  // Exposure: bring the white surfaces to a common brightness.
  whiteL.sort((a, b) => a - b);
  const p80 = whiteL[Math.floor(whiteL.length * 0.8)] ?? TARGET_WHITE_L;
  const yOf = L => ((L + 16) / 116) ** 3;
  const exposure = Math.min(EXPOSURE_LIMIT[1], Math.max(EXPOSURE_LIMIT[0], yOf(TARGET_WHITE_L) / yOf(p80)));

  const out = Buffer.alloc(W * H * 3);
  const N = W * H;
  const planes = cleanWhites ? { L: new Float32Array(N), a: new Float32Array(N), b: new Float32Array(N), w: new Float32Array(N) } : null;
  for (let y = 0; y < H; y++) {
    const fy = Math.min(GRID_H - 1, Math.max(0, (y + 0.5) * GRID_H / H - 0.5)), y0 = Math.floor(fy), y1 = Math.min(GRID_H - 1, y0 + 1), ty = fy - y0;
    for (let x = 0; x < W; x++) {
      const fx = Math.min(GRID_W - 1, Math.max(0, (x + 0.5) * GRID_W / W - 0.5)), x0 = Math.floor(fx), x1 = Math.min(GRID_W - 1, x0 + 1), tx = fx - x0;
      const i00 = y0 * GRID_W + x0, i01 = y0 * GRID_W + x1, i10 = y1 * GRID_W + x0, i11 = y1 * GRID_W + x1;
      const mix = a => (a[i00] * (1 - tx) + a[i01] * tx) * (1 - ty) + (a[i10] * (1 - tx) + a[i11] * tx) * ty;
      const p = (y * W + x) * C, q = (y * W + x) * 3;
      const r0 = toLin[data[p]], g0 = toLin[data[p + 1]], b0 = toLin[data[p + 2]];
      // Windows and lamps that are (nearly) blown out are already white: leave their colour alone.
      const hl = smooth(0.86, 0.995, Math.max(r0, g0, b0)), keep = 1 - hl;
      let r = r0 * (hl + keep * mix(gr)) * exposure, g = g0 * (hl + keep * mix(gg)) * exposure, b = b0 * (hl + keep * mix(gb)) * exposure;
      // Roll highlights off softly instead of clipping a channel (keeps windows and lamps natural).
      const m = Math.max(r, g, b);
      if (m > 0.82) { const k = (0.82 + (1 - 0.82) * Math.tanh((m - 0.82) / (1 - 0.82))) / m; r *= k; g *= k; b *= k; }
      if (planes) {
        const [L, a, b2] = lab(r, g, b), i = y * W + x;
        planes.L[i] = L; planes.a[i] = a; planes.b[i] = b2;
        // How much a pixel counts as "white surface": bright and hardly coloured.
        planes.w[i] = (1 - smooth(14, 30, Math.hypot(a, b2))) * smooth(54, 72, L);
      } else {
        out[q] = toSrgb(r); out[q + 1] = toSrgb(g); out[q + 2] = toSrgb(b);
      }
    }
  }

  if (planes) {
    const { L, a, b } = planes;
    // Restrict the clean-up to flat surfaces (walls, tiles): where the picture has detail - window
    // views, folds in the bedding, curtains - the local contrast is high and the pixel is left alone.
    const sq = new Float32Array(N); for (let i = 0; i < N; i++) sq[i] = L[i] * L[i];
    const mL = blur(L, W, H, 3), mSq = blur(sq, W, H, 3);
    const flat = new Float32Array(N);
    for (let i = 0; i < N; i++) flat[i] = planes.w[i] * (1 - smooth(2.2, 6, Math.sqrt(Math.max(0, mSq[i] - mL[i] * mL[i]))));
    const w = blur(flat, W, H, 2.5);              // soft mask, so the correction has no hard borders
    const weighted = p => { const o = new Float32Array(N); for (let i = 0; i < N; i++) o[i] = p[i] * flat[i]; return o; };
    // Averages are taken over these surfaces only, so nothing bleeds in from furniture or floors.
    const sL = 4, sC = 9;
    const wL = blur(flat, W, H, sL), Lb = blur(weighted(L), W, H, sL);
    const wC = blur(flat, W, H, sC), ab = blur(weighted(a), W, H, sC), bb2 = blur(weighted(b), W, H, sC);
    for (let i = 0; i < N; i++) {
      let Lv = L[i], av = a[i], bv = b[i];
      const wi = Math.min(1, w[i]);
      if (wi > 0.01) {
        // Mottling in the plaster (small brightness differences) is smoothed; real edges stay.
        if (wL[i] > 1e-3) { const d = Lb[i] / wL[i] - Lv; Lv += wi * cleanWhites.smooth * d * (1 - smooth(3, 7, Math.abs(d))); }
        // Colour blotches are evened out over a wider area.
        if (wC[i] > 1e-3) { av += wi * 0.85 * (ab[i] / wC[i] - av); bv += wi * 0.85 * (bb2[i] / wC[i] - bv); }
        // Shaded parts are lifted towards the brightness of a well-lit wall, the lighter the less.
        if (Lv < WALL_L) Lv += wi * cleanWhites.lift * (WALL_L - Lv);
        av += wi * Math.min(1, cleanWhites.tint + 0.25) * (WHITE_LAB[0] - av);   // a white wall is never pink or green
        bv += wi * cleanWhites.tint * (WHITE_LAB[1] - bv);
      }
      const [r, g, bl] = fromLab(Lv, av, bv);
      out[i * 3] = toSrgb(r); out[i * 3 + 1] = toSrgb(g); out[i * 3 + 2] = toSrgb(bl);
    }
  }
  const [, ga, gbb] = lab(glob[0] * 0.6, glob[1] * 0.6, glob[2] * 0.6);
  return { data: out, info: { width: W, height: H, channels: 3 }, stats: { coverage: +coverage.toFixed(2), whiteA: +ga.toFixed(1), whiteB: +gbb.toFixed(1), whiteL: +p80.toFixed(1), exposure: +exposure.toFixed(3) } };
}

export const toSharp = ({ data, info }) => sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } });
