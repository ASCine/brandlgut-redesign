// Static site generator for the Brandlgut redesign. No framework, no dependencies:
// `node build.mjs` turns src/ into plain HTML, CSS and JS in docs/.
// Run `node scripts/images.mjs` first whenever photos in src/images/original change.
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { LANGS, SLUGS, CONTACT, ROOMS, FARM_PHOTOS, POLICY_ICONS, T } from './src/content.mjs';

const OUT = 'docs';
const manifest = JSON.parse(await readFile('src/images/manifest.json', 'utf8'));
const longTexts = JSON.parse(await readFile('src/content/long-texts.json', 'utf8'));
const YEAR = 2026;

// Stylesheet and script get their content hash in the address, so browsers fetch a changed file
// at once instead of showing the cached one for another ten minutes.
const version = async file => createHash('sha1').update(await readFile(file)).digest('hex').slice(0, 8);
const CSS_V = await version('src/styles.css');
const JS_V = await version('src/site.js');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

// ---------- helpers ----------

const rootOf = key => key === 'home' ? '../' : '../../';
const url = (root, lang, key) => `${root}${lang}/${SLUGS[key][lang] ? SLUGS[key][lang] + '/' : ''}`;

// The photo at its full original size, and the small version for cards and thumbnails.
const full = (root, key) => `${root}assets/img/${manifest[key].files.find(x => x.w === manifest[key].w).f}`;
const small = (root, key) => `${root}assets/img/${manifest[key].files[0].f}`;

function pic(root, key, { alt = '', sizes = '100vw', cls = '', eager = false } = {}) {
  const m = manifest[key];
  if (!m) throw new Error('missing image ' + key);
  const srcset = m.files.map(x => `${root}assets/img/${x.f} ${x.w}w`).join(', ');
  return `<img${cls ? ` class="${cls}"` : ''} src="${full(root, key)}" srcset="${srcset}" sizes="${sizes}" width="${m.w}" height="${m.h}" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;
}

const ICONS = {
  pin: '<path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
  grape: '<circle cx="9" cy="10" r="2.4"/><circle cx="15" cy="10" r="2.4"/><circle cx="12" cy="14.6" r="2.4"/><circle cx="12" cy="19.4" r="2.2"/><path d="M12 7.6V3.5m0 0c1.6-.9 3.3-.9 5 0"/>',
  cup: '<path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V9Z"/><path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16M8 3v2.5M12 3v2.5"/>',
  car: '<path d="M4.5 16.5v-4l1.8-4.6A2 2 0 0 1 8.2 6.5h7.6a2 2 0 0 1 1.9 1.4l1.8 4.6v4"/><path d="M3.5 12.5h17v4h-17zM6.5 16.5v2M17.5 16.5v2"/>',
  phone: '<path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="m4.5 7.5 7.5 6 7.5-6"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  arrow: '<path d="M5 12h14m-5.5-5.5L19 12l-5.5 5.5"/>',
  left: '<path d="m14.5 6-6 6 6 6"/>',
  right: '<path d="m9.5 6 6 6-6 6"/>',
  x: '<path d="m6 6 12 12M18 6 6 18"/>',
  // House rules
  euro: '<circle cx="12" cy="12" r="9.2"/><path d="M15.4 8.5a4.5 4.5 0 1 0 0 7M7 10.8h6M7 13.2h6"/>',
  key: '<circle cx="8" cy="15.6" r="4.4"/><path d="m11.2 12.4 8.3-8.3M16.4 7.200l2.600 2.600M13.600 10l2.200 2.200"/>',
  nosmoke: '<circle cx="12" cy="12" r="9.2"/><path d="M5.900 10.900h8.600v2.800H5.900zM16.400 10.900v2.800M18.300 10.900v2.800"/><path d="m5.500 5.500 13 13"/>',
  cancel: '<rect x="3.6" y="5" width="16.8" height="15.4" rx="2.6"/><path d="M3.600 10h16.800M8 3v4M16 3v4M9.700 12.900l4.600 4.600m0-4.600-4.600 4.600"/>',
  towel: '<path d="M10 3.200l1.700 4.600 4.600 1.700-4.600 1.700L10 15.800l-1.700-4.600-4.600-1.700 4.600-1.700L10 3.200Z"/><path d="M17.500 14l.9 2.300 2.300.9-2.300.9-.9 2.300-.9-2.300-2.300-.9 2.300-.9.900-2.300Z"/>',
};
const icon = (name, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;

const btn = (href, label, cls = '') => `<a class="btn${cls ? ' ' + cls : ''}" href="${href}">${esc(label)}</a>`;

// ---------- shared layout ----------

// `band` adds the closing "send a request" band. It is left out where the page already
// offers that step itself (rooms, request form) and on the legal pages.
function layout({ lang, key, title, desc, body, band = false, extraScript = '' }) {
  const t = T[lang];
  const root = rootOf(key);
  const u = k => url(root, lang, k);
  const navLinks = [['farm', u('farm')], ['rooms', u('rooms')], ['activities', u('activities')], ['contact', '#kontakt']]
    .map(([k, href]) => `<a class="nav-a${k === key ? ' is-active' : ''}" href="${href}">${esc(t.nav[k])}</a>`).join('');
  const langLinks = LANGS.map(l => `<a class="lang-a${l === lang ? ' is-active' : ''}" href="${url(root, l, key)}" hreflang="${l}" lang="${l}" title="${T[l].langName}"${l === lang ? ' aria-current="true"' : ''}>${l.toUpperCase()}</a>`).join('');
  const alternates = LANGS.map(l => `<link rel="alternate" hreflang="${l}" href="${url(root, l, key)}">`).join('\n');

  return `<!doctype html>
<html lang="${t.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="noindex, nofollow">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:image" content="${full(root, 'galerie-01/01-das-ist-unser-brandlgut')}">
${alternates}
<link rel="icon" href="${root}assets/img/logo-mark.svg" type="image/svg+xml">
<link rel="preload" href="${root}assets/fonts/fraunces-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${root}assets/fonts/figtree-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${root}assets/styles.css?v=${CSS_V}">
</head>
<body class="page-${key}">
<a class="skip" href="#main">${esc(t.skip)}</a>

<header class="hdr">
  <div class="wrap hdr-in">
    <a class="brand" href="${u('home')}" aria-label="Brandlgut">
      <img class="brand-mark" src="${root}assets/img/logo-mark.svg" alt="" width="48" height="48">
      <img class="brand-word" src="${root}assets/img/logo-word.svg" alt="Brandlgut" width="138" height="38">
    </a>
    <nav class="nav" id="nav" aria-label="${esc(t.btn.menu)}">
      ${navLinks}
      <div class="lang nav-lang">${langLinks}</div>
    </nav>
    <div class="lang hdr-lang">${langLinks}</div>
    ${btn(key === 'request' ? '#req-form' : u('request'), t.btn.request, 'btn-sm hdr-cta')}
    <button class="burger" type="button" aria-controls="nav" aria-expanded="false" aria-label="${esc(t.btn.menu)}"><span></span></button>
  </div>
</header>

<main id="main">
${body}
${band ? `
<section class="cta">
  <div class="wrap cta-in">
    <h2>${esc(t.cta.h2)}</h2>
    <p>${esc(t.cta.p)}</p>
    ${btn(u('request'), t.btn.request, 'btn-light')}
  </div>
</section>` : ''}
</main>

<footer class="ftr" id="kontakt">
  <div class="wrap ftr-in">
    <div class="ftr-brand">
      <a class="brand" href="${u('home')}" aria-label="Brandlgut">
        <img class="brand-mark" src="${root}assets/img/logo-mark.svg" alt="" width="48" height="48" loading="lazy">
        <img class="brand-word" src="${root}assets/img/logo-word.svg" alt="Brandlgut" width="138" height="38" loading="lazy">
      </a>
      <p class="ftr-copy">© ${YEAR} Brandlgut · ${esc(t.footer.family)}</p>
    </div>
    <ul class="ftr-contact">
      <li>${icon('phone')}<a href="${CONTACT.phoneHref}">${CONTACT.phone}</a></li>
      <li>${icon('mail')}<a href="mailto:${CONTACT.mail}">${CONTACT.mail}</a></li>
    </ul>
    <nav class="ftr-nav">
      <a href="${u('home')}#anreise">${esc(t.home.loc.eyebrow)}</a>
      <a href="${u('imprint')}">${esc(t.footer.imprint)}</a>
      <a href="${u('privacy')}">${esc(t.footer.privacy)}</a>
    </nav>
  </div>
</footer>

<dialog class="lb" aria-label="${esc(t.unit.photo)}">
  <button class="lb-btn lb-close" type="button" aria-label="${esc(t.btn.close)}">${icon('x')}</button>
  <button class="lb-btn lb-prev" type="button" aria-label="${esc(t.btn.prev)}">${icon('left')}</button>
  <figure class="lb-fig"><img class="lb-img" alt="" width="850" height="478"><figcaption class="lb-cap"></figcaption></figure>
  <button class="lb-btn lb-next" type="button" aria-label="${esc(t.btn.next)}">${icon('right')}</button>
</dialog>
${extraScript}
<script src="${root}assets/site.js?v=${JS_V}" defer></script>
</body>
</html>
`;
}

function pageHead({ root, eyebrow, h1, intro, note, img, alt }) {
  return `<section class="phead${img ? '' : ' phead-plain'}">
  <div class="wrap phead-in">
    <div class="phead-txt">
      <p class="eyebrow">${esc(eyebrow)}</p>
      <h1>${esc(h1)}</h1>
      ${intro ? `<p class="lead">${esc(intro)}</p>` : ''}
      ${note ? `<p class="phead-note">${icon('clock')}<span>${esc(note)}</span></p>` : ''}
    </div>
    ${img ? `<div class="phead-img">${pic(root, img, { alt, sizes: '(min-width: 960px) 520px, 100vw', eager: true })}</div>` : ''}
  </div>
</section>`;
}

// ---------- pages ----------

function home(lang) {
  const t = T[lang], h = t.home, root = rootOf('home');
  const u = k => url(root, lang, k);
  const factIcons = ['pin', 'grape', 'cup', 'car'];
  const cats = longTexts[lang].activities;

  const body = `<section class="hero">
  <div class="hero-panel">
    ${pic(root, 'galerie-01/01-das-ist-unser-brandlgut', { alt: h.heroAlt, sizes: '(min-width: 1400px) 1368px, 100vw', cls: 'hero-img', eager: true })}
    <div class="hero-txt">
      <div class="hero-copy">
        <p class="eyebrow">${esc(h.eyebrow)}</p>
        <h1>${esc(h.h1[0])} <br class="br-m">${esc(h.h1[1])}</h1>
        <p class="lead">${esc(h.lead)}</p>
      </div>
      ${btn(u('rooms'), t.btn.viewRooms, 'btn-light')}
    </div>
  </div>
</section>

<section class="sec sec-facts">
  <div class="wrap">
    <ul class="facts">
      ${h.facts.map(([a, b], i) => `<li class="fact"><span class="fact-ic">${icon(factIcons[i])}</span><strong>${esc(a)}</strong><span>${esc(b)}</span></li>`).join('\n      ')}
    </ul>
  </div>
</section>

<section class="sec">
  <div class="wrap split split-portrait">
    <figure class="split-img split-img-portrait">${pic(root, 'diegassers_2018', { alt: h.welcome.alt, sizes: '(min-width: 960px) 400px, 100vw' })}</figure>
    <div class="split-txt">
      <p class="eyebrow">${esc(h.welcome.eyebrow)}</p>
      <h2>${esc(h.welcome.h2)}</h2>
      <p>${esc(h.welcome.p)}</p>
      <p class="sign">${h.welcome.sign.map(esc).join('<br>')}</p>
    </div>
  </div>
</section>

<section class="sec sec-sand" id="zimmer">
  <div class="wrap">
    <div class="sec-head">
      <p class="eyebrow">${esc(h.rooms.eyebrow)}</p>
      <h2>${esc(h.rooms.h2)}</h2>
    </div>
    <div class="cards cards-4">
      ${ROOMS.map(r => `<a class="card room-card" href="${u('rooms')}#${r.id}">
        ${pic(root, `${r.dir}/${r.photos[0]}`, { alt: `${r.name} – ${t.unit.photo} 1`, sizes: '(min-width: 960px) 270px, (min-width: 600px) 50vw, 100vw' })}
        <div class="card-body">
          <h3>${r.name}</h3>
          <p class="card-meta">${esc(`${r.guests} ${t.unit.guests} · ca. ${r.size} m²`)}</p>
          <ul class="ticks">${t.homeTicks[r.id].map(f => `<li>${icon('check')}<span>${esc(f)}</span></li>`).join('')}</ul>
          <p class="price"><strong>${r.price} €</strong><span>${esc(t.unit.perNight)}</span></p>
        </div>
      </a>`).join('\n      ')}
    </div>
    <div class="sec-foot">
      <p>${esc(h.rooms.note)}</p>
      ${btn(u('rooms'), t.btn.details, 'btn-outline')}
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap split split-rev">
    <div class="mosaic">
      ${pic(root, 'galerie-01/13-unser-wein', { alt: h.farm.alts[0], sizes: '(min-width: 960px) 540px, 100vw' })}
      ${pic(root, 'galerie-01/04-entspannen-sie-auf-der-oberen-sonnenterrasse', { alt: h.farm.alts[1], sizes: '(min-width: 960px) 265px, 50vw' })}
      ${pic(root, 'galerie-01/07-unser-fruehstuecksraum', { alt: h.farm.alts[2], sizes: '(min-width: 960px) 265px, 50vw' })}
    </div>
    <div class="split-txt">
      <p class="eyebrow">${esc(h.farm.eyebrow)}</p>
      <h2>${esc(h.farm.h2)}</h2>
      <p>${esc(h.farm.p)}</p>
      ${btn(u('farm'), t.btn.more, 'btn-outline')}
    </div>
  </div>
</section>

<section class="sec sec-sand">
  <div class="wrap">
    <div class="sec-head">
      <p class="eyebrow">${esc(h.around.eyebrow)}</p>
      <h2>${esc(h.around.h2)}</h2>
    </div>
    <div class="chips">
      ${cats.map((c, i) => `<a class="chip" href="${u('activities')}#${c.id}">${pic(root, `activities/${c.id}`, { alt: '', sizes: '96px' })}<span>${esc(t.cats[i])}</span></a>`).join('\n      ')}
    </div>
    <div class="sec-foot sec-foot-center">${btn(u('activities'), t.btn.allTips, 'btn-outline')}</div>
  </div>
</section>

<section class="sec" id="anreise">
  <div class="wrap loc">
    <figure class="loc-img">${pic(root, 'galerie-01/02-das-brandlgut-am-abend', { alt: h.loc.alt, sizes: '(min-width: 960px) 660px, 100vw' })}</figure>
    <div class="loc-txt">
      <p class="eyebrow">${esc(h.loc.eyebrow)}</p>
      <h2>${esc(h.loc.h2)}</h2>
      <address>Brandlgut<br>${t.address.map(esc).join('<br>')}</address>
      <a class="btn btn-outline" href="${CONTACT.maps}" target="_blank" rel="noopener">${esc(t.btn.route)}</a>
    </div>
  </div>
</section>`;
  return layout({ lang, key: 'home', title: h.title, desc: h.desc, body, band: true });
}

function rooms(lang) {
  const t = T[lang], p = t.roomsPage, root = rootOf('rooms');
  const u = k => url(root, lang, k);

  const roomBlocks = ROOMS.map(r => {
    const keys = r.photos.map(n => `${r.dir}/${n}`);
    const s = p.specs[r.id];
    const rows = [[p.spec.guests, r.guests], [p.spec.size, `ca. ${r.size} m²`], [p.spec.outdoor, s.outdoor], [p.spec.bath, s.bath]];
    if (s.kitchen) rows.push([p.spec.kitchen, s.kitchen]);
    const thumbs = keys.map((k, i) => `<button class="gal-th${i === 0 ? ' is-active' : ''}" type="button" data-i="${i}" aria-label="${esc(t.unit.photo)} ${i + 1}"><img src="${small(root, k)}" alt="" width="160" height="90" loading="lazy" decoding="async"></button>`).join('');
    return `<article class="room" id="${r.id}">
      <div class="gal" data-gal data-name="${r.name}" data-photos='${JSON.stringify(keys.map(k => full(root, k)))}'>
        <div class="gal-stage">
          <button class="gal-main" type="button" aria-label="${esc(r.name)} – ${esc(t.unit.photo)}">${pic(root, keys[0], { alt: `${r.name} – ${t.unit.photo} 1`, sizes: '(min-width: 960px) 660px, 100vw' })}</button>
          <button class="gal-nav gal-prev" type="button" aria-label="${esc(t.btn.prev)}">${icon('left')}</button>
          <button class="gal-nav gal-next" type="button" aria-label="${esc(t.btn.next)}">${icon('right')}</button>
          <span class="gal-count"><b>1</b> / ${keys.length}</span>
        </div>
        <div class="gal-thumbs">${thumbs}</div>
      </div>
      <div class="room-info">
        <h2>${r.name}</h2>
        <dl class="spec">${rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>
        <div class="room-buy">
          <p class="price price-lg"><strong>${r.price} €</strong><span>${esc(t.unit.perNight)}</span></p>
          ${btn(`${u('request')}?room=${r.id}`, t.btn.requestRoom)}
        </div>
      </div>
    </article>`;
  }).join('\n    ');

  const policyIcon = name => name.startsWith('file:')
    ? `<img src="${root}assets/img/${name.slice(5)}.svg" alt="" width="30" height="30" loading="lazy">`
    : icon(name);

  const body = `${pageHead({ root, eyebrow: p.eyebrow, h1: p.h1, intro: p.intro, img: 'rooms/standard/02_standard_zimmer', alt: 'Standard' })}

<section class="sec sec-tight">
  <div class="wrap rooms">
    ${roomBlocks}
  </div>
</section>

<section class="sec sec-sand">
  <div class="wrap">
    <div class="sec-head"><h2>${esc(p.good)}</h2></div>
    <ul class="policies">
      ${p.policies.map(([title, txt], i) => `<li class="policy">
        <span class="policy-ic">${policyIcon(POLICY_ICONS[i])}</span>
        <div><h3>${esc(title)}</h3><p>${esc(txt)}</p></div>
      </li>`).join('\n      ')}
    </ul>
  </div>
</section>`;
  return layout({ lang, key: 'rooms', title: p.title, desc: p.intro, body });
}

function request(lang) {
  const t = T[lang], q = t.req, f = q.f, root = rootOf('request');
  const u = k => url(root, lang, k);
  const req = ' <i aria-hidden="true">*</i>';
  const opt = ` <em>${esc(q.optional)}</em>`;
  const field = (id, label, control, { required = false, cls = '' } = {}) =>
    `<div class="field${cls ? ' ' + cls : ''}"><label for="f-${id}">${esc(label)}${required ? req : opt}</label>${control}<p class="hint" data-hint="${id}" aria-live="polite"></p></div>`;
  const num = (id, from, to, sel) => `<select id="f-${id}" name="${id}">${Array.from({ length: to - from + 1 }, (_, i) => `<option${from + i === sel ? ' selected' : ''}>${from + i}</option>`).join('')}</select>`;

  const strings = {
    err: q.err, sum: q.sum, labels: f, unit: t.unit, subject: q.ok.subject, mail: CONTACT.mail,
    rooms: Object.fromEntries(ROOMS.map(r => [r.id, { name: r.name, price: r.price, img: full(root, `${r.dir}/${r.photos[0]}`) }])),
    locale: { de: 'de-DE', en: 'en-GB', it: 'it-IT' }[lang],
  };

  const body = `${pageHead({ root, eyebrow: q.eyebrow, h1: q.h1, intro: q.intro })}

<section class="sec sec-tight">
  <div class="wrap req">
    <form class="req-form card" id="req-form" novalidate>
      <h2>${esc(q.s1)}</h2>
      <div class="fields">
        ${field('arrival', f.arrival, `<input id="f-arrival" name="arrival" type="date" required>`, { required: true })}
        ${field('departure', f.departure, `<input id="f-departure" name="departure" type="date" required>`, { required: true })}
      </div>
      <fieldset class="field field-rooms">
        <legend>${esc(f.room)}${req}</legend>
        <div class="room-opts">
          ${ROOMS.map(r => `<label class="room-opt"><input type="radio" name="room" value="${r.id}" required>
            <img src="${small(root, `${r.dir}/${r.photos[0]}`)}" alt="" width="160" height="90" loading="lazy">
            <strong>${r.name}</strong><span>${r.price} € ${esc(t.unit.perNight)}</span></label>`).join('\n          ')}
        </div>
        <p class="hint" data-hint="room" aria-live="polite"></p>
      </fieldset>
      <div class="fields">
        ${field('adults', f.adults, num('adults', 1, 5, 2), { required: true })}
        ${field('children', f.children, num('children', 0, 5, 0))}
      </div>

      <h2>${esc(q.s2)}</h2>
      <div class="fields">
        ${field('salutation', f.salutation, `<select id="f-salutation" name="salutation" required><option value="">${esc(q.choose)}</option>${q.salutations.map(s => `<option>${esc(s)}</option>`).join('')}</select>`, { required: true })}
        <div class="field field-spacer" aria-hidden="true"></div>
        ${field('first', f.first, `<input id="f-first" name="first" type="text" autocomplete="given-name">`)}
        ${field('last', f.last, `<input id="f-last" name="last" type="text" autocomplete="family-name" required>`, { required: true })}
        ${field('email', f.email, `<input id="f-email" name="email" type="email" autocomplete="email" required>`, { required: true })}
        ${field('phone', f.phone, `<input id="f-phone" name="phone" type="tel" autocomplete="tel">`)}
        ${field('address', f.address, `<textarea id="f-address" name="address" rows="3" autocomplete="street-address"></textarea>`, { cls: 'field-tall' })}
        ${field('notes', f.notes, `<textarea id="f-notes" name="notes" rows="3"></textarea>`, { cls: 'field-tall' })}
      </div>
      <div class="field field-consent">
        <label class="check"><input type="checkbox" name="consent" required><span>${esc(q.consent[0])}<a href="${u('privacy')}" target="_blank" rel="noopener">${esc(q.consent[1])}</a>${esc(q.consent[2])}${req}</span></label>
        <p class="hint" data-hint="consent" aria-live="polite"></p>
      </div>
      <div class="btn-row">
        <button class="btn" type="submit">${esc(q.submit)}</button>
        <button class="btn btn-ghost" type="reset">${esc(q.reset)}</button>
      </div>
    </form>

    <div class="req-ok card" id="req-ok" hidden>
      <span class="ok-ic">${icon('check')}</span>
      <h2>${esc(q.ok.h2)}</h2>
      <p>${esc(q.ok.p)}</p>
      <dl class="ok-list" id="ok-list"></dl>
      <div class="btn-row">
        <a class="btn" id="ok-mail" href="mailto:${CONTACT.mail}">${esc(q.ok.mail)}</a>
        <button class="btn btn-ghost" type="button" id="ok-again">${esc(q.ok.again)}</button>
      </div>
    </div>

    <aside class="req-sum card" aria-label="${esc(q.sum.title)}">
      <div class="sum-img"><img id="sum-img" src="${full(root, 'galerie-01/01-das-ist-unser-brandlgut')}" data-default="${full(root, 'galerie-01/01-das-ist-unser-brandlgut')}" alt="" width="850" height="478"></div>
      <div class="sum-body">
        <p class="eyebrow">${esc(q.sum.title)}</p>
        <p class="sum-room" id="sum-room">${esc(q.sum.empty)}</p>
        <dl class="sum-rows">
          <dt>${esc(q.sum.stay)}</dt><dd id="sum-stay">–</dd>
          <dt>${esc(q.sum.estimate)}</dt><dd id="sum-price">–</dd>
        </dl>
        <p class="sum-note">${esc(q.sum.note)}</p>
        <p class="sum-min" id="sum-min">${icon('clock')}<span>${esc(q.sum.minStay)}</span></p>
      </div>
    </aside>
  </div>
</section>`;
  const extraScript = `<script type="application/json" id="req-i18n">${JSON.stringify(strings).replace(/</g, '\\u003c')}</script>`;
  return layout({ lang, key: 'request', title: q.title, desc: q.intro, body, extraScript });
}

function farm(lang) {
  const t = T[lang], p = t.farmPage, root = rootOf('farm');
  const photos = [[FARM_PHOTOS[12], p.captions[12]], [FARM_PHOTOS[6], p.captions[6]], [FARM_PHOTOS[3], p.captions[3]]];

  const body = `${pageHead({ root, eyebrow: p.eyebrow, h1: p.h1, intro: p.intro, img: FARM_PHOTOS[0], alt: p.captions[0] })}

${p.blocks.map(([h2, paras], i) => `<section class="sec${i % 2 ? '' : ' sec-sand'}">
  <div class="wrap split${i % 2 ? ' split-rev' : ''}">
    <figure class="split-img">${pic(root, photos[i][0], { alt: photos[i][1], sizes: '(min-width: 960px) 540px, 100vw' })}</figure>
    <div class="split-txt"><h2>${esc(h2)}</h2>${paras.map(s => `<p>${esc(s)}</p>`).join('')}</div>
  </div>
</section>`).join('\n')}

<section class="sec">
  <div class="wrap">
    <div class="sec-head"><h2>${esc(p.gallery)}</h2></div>
    <div class="grid-gal" data-gal data-photos='${JSON.stringify(FARM_PHOTOS.map(k => full(root, k)))}' data-caps='${esc(JSON.stringify(p.captions))}'>
      ${FARM_PHOTOS.map((k, i) => `<button class="grid-gal-item" type="button" data-i="${i}">${pic(root, k, { alt: p.captions[i], sizes: '(min-width: 960px) 370px, 50vw' })}<span>${esc(p.captions[i])}</span></button>`).join('\n      ')}
    </div>
  </div>
</section>`;
  return layout({ lang, key: 'farm', title: p.title, desc: p.intro, body, band: true });
}

function activities(lang) {
  const t = T[lang], p = t.actPage, root = rootOf('activities');
  const cats = longTexts[lang].activities;
  const body = `${pageHead({ root, eyebrow: p.eyebrow, h1: p.h1, intro: p.intro, note: p.note, img: 'galerie-01/05-entspannen-sie-auf-der-unteren-sonnenterrasse', alt: '' })}

<section class="sec sec-tight">
  <div class="wrap">
    <div class="chips">
      ${cats.map((c, i) => `<a class="chip" href="#${c.id}">${pic(root, `activities/${c.id}`, { alt: '', sizes: '96px' })}<span>${esc(t.cats[i])}</span></a>`).join('\n      ')}
    </div>
  </div>
</section>

${cats.map((c, i) => `<section class="sec sec-act${i % 2 ? '' : ' sec-sand'}" id="${c.id}">
  <div class="wrap">
    <div class="act-head">${pic(root, `activities/${c.id}`, { alt: '', sizes: '72px' })}<h2>${esc(t.cats[i])}</h2></div>
    <ul class="tips">
      ${c.items.map(it => `<li class="tip"><h3>${esc(it.name)}</h3>${it.meta ? `<p class="tip-meta">${esc(it.meta)}</p>` : '<p class="tip-meta tip-meta-empty">Brandlgut</p>'}<p>${esc(it.text)}</p>${it.link ? `<a class="tip-link" href="${esc(it.link.href)}" target="_blank" rel="noopener">${esc(cap(it.link.label))}${icon('arrow')}</a>` : ''}</li>`).join('\n      ')}
    </ul>
  </div>
</section>`).join('\n\n')}`;
  return layout({ lang, key: 'activities', title: p.title, desc: p.intro, body, band: true });
}

function legal(lang, key) {
  const t = T[lang], root = rootOf(key);
  const h1 = key === 'imprint' ? t.legal.imprintTitle : t.legal.privacyTitle;
  const body = `${pageHead({ root, eyebrow: 'Brandlgut', h1 })}
<section class="sec sec-tight">
  <div class="wrap"><div class="prose card">${longTexts[lang][key]}</div></div>
</section>`;
  return layout({ lang, key, title: `${h1} – Brandlgut`, desc: h1, body });
}

// ---------- write ----------

async function write(path, content) {
  await mkdir(join(OUT, path, '..'), { recursive: true });
  await writeFile(join(OUT, path), content);
}

const pages = { home, farm, rooms, request, activities, imprint: l => legal(l, 'imprint'), privacy: l => legal(l, 'privacy') };
let count = 0;
for (const lang of LANGS) {
  for (const [key, fn] of Object.entries(pages)) {
    const slug = SLUGS[key][lang];
    await write(`${lang}/${slug ? slug + '/' : ''}index.html`, fn(lang));
    count++;
  }
}

// Root: send visitors to their language (German by default).
await write('index.html', `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex, nofollow">
<title>Brandlgut</title>
<script>
  var l = (navigator.language || 'de').slice(0, 2).toLowerCase();
  location.replace((l === 'it' || l === 'en' ? l : 'de') + '/');
</script>
<meta http-equiv="refresh" content="0; url=de/">
</head>
<body><p><a href="de/">Deutsch</a> · <a href="en/">English</a> · <a href="it/">Italiano</a></p></body>
</html>
`);
await write('robots.txt', 'User-agent: *\nDisallow: /\n');
await write('.nojekyll', '');

// Assets
await mkdir(join(OUT, 'assets/fonts'), { recursive: true });
for (const f of ['fraunces-latin.woff2', 'figtree-latin.woff2']) await copyFile(join('src/fonts', f), join(OUT, 'assets/fonts', f));
await copyFile('src/styles.css', join(OUT, 'assets/styles.css'));
await copyFile('src/site.js', join(OUT, 'assets/site.js'));

// Header logo: the stacked original is cut into its monogram and its wordmark.
const logo = await readFile('src/images/original/logobrandlgut.svg', 'utf8');
const crop = (vb, w, h) => logo.replace(/width="1580px"\s+height="2200px" viewBox="0 0 1580 2200" enable-background="new 0 0 1580 2200"/, `width="${w}" height="${h}" viewBox="${vb}"`);
await write('assets/img/logo-mark.svg', crop('0 0 1580 1580', 48, 48));
await write('assets/img/logo-word.svg', crop('0 1776 1580 435', 138, 38));

console.log(`built ${count} pages`);
