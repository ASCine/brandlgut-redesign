// Dev helper (not linked): compares element boxes across the three languages.
window.measure = async function (width, keys) {
  const PAGES = {
    home: ['de/', 'en/', 'it/'], rooms: ['de/zimmer/', 'en/rooms/', 'it/camere/'],
    request: ['de/anfrage/', 'en/request/', 'it/richiesta/'], farm: ['de/hof/', 'en/farm/', 'it/maso/'],
    activities: ['de/aktivitaeten/', 'en/activities/', 'it/attivita/'], imprint: ['de/impressum/', 'en/legal-notice/', 'it/note-legali/'],
  };
  const FIXED = '.btn,.nav-a,.lang-a,.brand,.burger,.eyebrow,.hero-panel,.hero-txt,.hero h1,.hero .lead,.fact,.fact strong,.room-card,.card-body h3,.card-meta,.ticks li,.price,.chip,.loc-img,.loc-txt,.cta-in,.ftr-in,.ftr-contact li,.ftr-nav a,.phead-img,.room,.gal-stage,.room-info h2,.spec dt,.spec dd,.room-buy,.policy h3,.field > label,.field > legend,.field input,.field select,.field textarea,.hint,.room-opt,.req-sum,.sum-room,.sum-rows dt,.sum-rows dd,.sum-note,.sum-min,.grid-gal-item,.grid-gal-item span,.act-head,.split-txt h2';
  const NOWRAP = '.btn,.nav-a,.eyebrow,.fact strong,.fact span,.card-body h3,.card-meta,.ticks li,.price,.chip span,.room-info h2,.spec dt,.spec dd,.field > label,.field > legend,.room-opt span,.room-opt strong,.sum-room,.sum-rows dt,.sum-rows dd,.sum-note,.sum-min,.grid-gal-item span,.ftr-nav a,.ftr-copy,.ftr-contact li,.req-form h2,.lang-a';
  const out = {};
  for (const key of keys || Object.keys(PAGES)) {
    const data = [];
    for (const path of PAGES[key]) {
      const f = document.createElement('iframe');
      f.style.cssText = `position:fixed;left:-5000px;top:0;width:${width}px;height:900px;border:0`;
      f.src = '/' + path; document.body.append(f);
      await new Promise(r => f.onload = r);
      const d = f.contentDocument; await d.fonts.ready; await new Promise(r => setTimeout(r, 150));
      const rect = e => { const b = e.getBoundingClientRect(); return [Math.round(b.left), Math.round(b.top + f.contentWindow.scrollY), Math.round(b.width), Math.round(b.height)]; };
      const vis = e => e.getClientRects().length > 0;
      const boxes = {};
      FIXED.split(',').forEach(sel => { boxes[sel] = [...d.querySelectorAll(sel)].filter(vis).map(e => [rect(e), e.textContent.trim().slice(0, 24)]); });
      const clipped = [];
      NOWRAP.split(',').forEach(sel => d.querySelectorAll(sel).forEach(e => {
        if (!vis(e)) return;
        const r = document.createRange(); r.selectNodeContents(e); const tw = r.getBoundingClientRect().width; const cs = f.contentWindow.getComputedStyle(e);
        const inner = e.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
        if (tw > inner + 1 || e.scrollWidth > e.clientWidth + 1) clipped.push(`${sel} "${e.textContent.trim().slice(0, 30)}" text ${Math.round(tw)} > box ${Math.round(inner)}`);
      }));
      const heads = [...d.querySelectorAll('h1,h2')].filter(vis).map(e => Math.round(e.getBoundingClientRect().height / parseFloat(f.contentWindow.getComputedStyle(e).lineHeight)));
      data.push({ boxes, clipped, heads, hscroll: d.documentElement.scrollWidth > width, height: d.documentElement.scrollHeight });
      f.remove();
    }
    const diffs = [];
    for (const sel of FIXED.split(',')) {
      const [a, b, c] = data.map(x => x.boxes[sel]);
      if (a.length !== b.length || a.length !== c.length) { diffs.push(`${sel}: count ${a.length}/${b.length}/${c.length}`); continue; }
      let n = 0;
      a.forEach((x, i) => {
        const r = [x[0], b[i][0], c[i][0]];
        const same = k => r[0][k] === r[1][k] && r[0][k] === r[2][k];
        if (!(same(0) && same(2) && same(3))) { if (n++ < 2) diffs.push(`${sel}[${i}] "${x[1]}" x/w/h de ${r[0][0]}/${r[0][2]}/${r[0][3]} en ${r[1][0]}/${r[1][2]}/${r[1][3]} it ${r[2][0]}/${r[2][2]}/${r[2][3]}`); }
      });
      if (n > 2) diffs.push(`${sel}: … ${n} differing in total`);
    }
    out[key] = { sizeDiffs: diffs, clipped: data.map((x, i) => x.clipped.map(s => ['de', 'en', 'it'][i] + ' ' + s)).flat(), headingLines: data.map(x => x.heads.join('')), hscroll: data.map(x => x.hscroll), pageHeight: data.map(x => x.height) };
  }
  return out;
};
