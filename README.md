# Brandlgut – redesign preview

Redesign proposal for [brandlgut.com](https://brandlgut.com): a static site in German, English and Italian
with seven pages per language (home, farm, rooms & prices, request form, activities, legal notice, privacy).

This is a **preview**, not the live site. All pages carry `noindex`, and the request form does not send
anything by itself – after "send" it shows a summary and offers to open a pre-filled e-mail.

## What it is built with

No CMS and no framework. The published site is plain HTML, one CSS file and one small JavaScript file
(no jQuery, no Bootstrap). `build.mjs`, a single Node script without dependencies, generates the pages
from the copy in `src/`. The only package used is `sharp`, and only for preparing the photos.
Fonts (Fraunces, Figtree) are served from the site itself.

## Structure

| Path | Purpose |
| --- | --- |
| `docs/` | Generated site, served by GitHub Pages. Do not edit by hand. |
| `src/content.mjs` | All hand-written copy for the three languages, room data, page addresses. |
| `src/content/long-texts.json` | Activity tips and legal texts. |
| `src/styles.css`, `src/site.js` | One stylesheet and one small script for every page. |
| `src/images/original/` | Working copies of the photos, icons and logo. |
| `backup/original-images/` | Untouched originals with their original names. Never written to. |
| `build.mjs` | Generates `docs/` from the above. |
| `scripts/images.mjs` | Converts the photos to WebP; colour-matches the room photos on the way. |
| `scripts/colour.mjs` | The colour matching: evens out mixed daylight / lamp light and brings all rooms to one white. |
| `scripts/measure.js` | Browser helper that compares element sizes across the three languages. |
| `scripts/sheet.mjs` | Makes contact sheets for comparing photos side by side. |

## Build

```bash
npm install          # only needed for the image step
npm run images       # after changing photos or the colour matching
npm run build        # after changing copy, templates, CSS or JS
```

## Copy and layout rules

- Each fact is said once per page; contact details appear once (footer), the address once (home, "find us").
- The location is not described as quiet.
- Buttons, navigation items, form controls and cards have fixed sizes, so the layout is identical in all
  three languages. After changing copy, serve `docs/` locally, load `scripts/measure.js` in the browser
  console and run `await measure(1360)` and `await measure(375)`: it lists every element whose size differs
  between languages and every label that no longer fits its box.
