# Brandlgut – redesign preview

Redesign proposal for [brandlgut.com](https://brandlgut.com): a static site in German, English and Italian
with seven pages per language (home, farm, rooms & prices, request form, activities, legal notice, privacy).

This is a **preview**, not the live site. All pages carry `noindex`, and the request form does not send
anything by itself – after "send" it shows a summary and offers to open a pre-filled e-mail.

## Structure

| Path | Purpose |
| --- | --- |
| `docs/` | Generated site, served by GitHub Pages. Do not edit by hand. |
| `src/content.mjs` | All hand-written copy for the three languages, room data, page slugs. |
| `src/content/generated.json` | Longer texts taken over from the live site (farm, house rules, activities, legal). |
| `src/styles.css`, `src/site.js` | One stylesheet and one small script for every page. |
| `src/images/original/` | Photos, icons and logo from the live site. |
| `build.mjs` | Generates `docs/` from the above. No dependencies. |
| `scripts/images.mjs` | Converts the photos to WebP (needs `sharp`). |
| `scripts/measure.js` | Browser helper that compares element sizes across the three languages. |

## Build

```bash
npm install          # only needed for the image step
npm run images       # after changing photos
npm run build        # after changing copy, templates, CSS or JS
```

## Layout rules

Buttons, navigation items, form controls and cards have fixed sizes, so the layout is identical in all
three languages. When changing copy, load `scripts/measure.js` in the browser console on the local preview
and run `await measure(1320)` and `await measure(375)`: it lists every element whose size differs between
languages and every label that no longer fits its box.
