// Brandlgut – small behaviours: mobile menu, photo galleries, lightbox and the request form.
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // ----- Mobile menu -----
  const burger = $('.burger');
  const nav = $('#nav');
  if (burger && nav) {
    const setOpen = open => {
      nav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
    };
    burger.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    nav.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  }

  // ----- Lightbox -----
  const lb = $('.lb');
  const lbImg = $('.lb-img');
  const lbCap = $('.lb-cap');
  let lbPhotos = [], lbCaps = [], lbIndex = 0, lbName = '';
  const lbShow = i => {
    lbIndex = (i + lbPhotos.length) % lbPhotos.length;
    lbImg.src = lbPhotos[lbIndex];
    const cap = lbCaps[lbIndex] || `${lbName} · ${lbIndex + 1} / ${lbPhotos.length}`;
    lbImg.alt = cap;
    lbCap.textContent = cap;
  };
  const lbOpen = (photos, caps, name, i) => {
    lbPhotos = photos; lbCaps = caps; lbName = name;
    lbShow(i);
    lb.showModal();
  };
  if (lb) {
    $('.lb-close').addEventListener('click', () => lb.close());
    $('.lb-prev').addEventListener('click', () => lbShow(lbIndex - 1));
    $('.lb-next').addEventListener('click', () => lbShow(lbIndex + 1));
    lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') lbShow(lbIndex - 1);
      if (e.key === 'ArrowRight') lbShow(lbIndex + 1);
    });
  }

  // ----- Galleries -----
  $$('[data-gal]').forEach(gal => {
    const photos = JSON.parse(gal.dataset.photos);
    const caps = gal.dataset.caps ? JSON.parse(gal.dataset.caps) : [];
    const name = gal.dataset.name || '';

    // Photo grid (farm page): every tile opens the lightbox.
    $$('.grid-gal-item', gal).forEach(b => b.addEventListener('click', () => lbOpen(photos, caps, name, +b.dataset.i)));

    // Room gallery: stage + thumbnails.
    const main = $('.gal-main', gal);
    if (!main) return;
    const img = $('img', main);
    const count = $('.gal-count b', gal);
    const thumbs = $$('.gal-th', gal);
    let index = 0;
    const show = i => {
      index = (i + photos.length) % photos.length;
      img.removeAttribute('srcset');
      img.src = photos[index];
      count.textContent = index + 1;
      thumbs.forEach((t, n) => t.classList.toggle('is-active', n === index));
    };
    thumbs.forEach(t => t.addEventListener('click', () => show(+t.dataset.i)));
    $('.gal-prev', gal).addEventListener('click', () => show(index - 1));
    $('.gal-next', gal).addEventListener('click', () => show(index + 1));
    main.addEventListener('click', () => lbOpen(photos, caps, name, index));
  });

  // ----- Date inputs: no past dates, departure after arrival -----
  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const addDays = (s, n) => { const d = new Date(s + 'T12:00:00'); d.setDate(d.getDate() + n); return iso(d); };
  $$('form').forEach(form => {
    const a = $('[name="arrival"]', form), d = $('[name="departure"]', form);
    if (!a || !d) return;
    a.min = iso(new Date());
    d.min = addDays(a.min, 1);
    a.addEventListener('change', () => {
      if (!a.value) return;
      d.min = addDays(a.value, 1);
      if (d.value && d.value <= a.value) d.value = '';
    });
  });

  // ----- Request form -----
  const form = $('#req-form');
  if (!form) return;
  const S = JSON.parse($('#req-i18n').textContent);
  const ok = $('#req-ok');
  const el = n => form.elements[n];
  const fmtDate = s => new Date(s + 'T12:00:00').toLocaleDateString(S.locale, { day: '2-digit', month: '2-digit', year: 'numeric' });
  const nights = () => {
    const a = el('arrival').value, d = el('departure').value;
    if (!a || !d) return 0;
    return Math.round((new Date(d + 'T12:00:00') - new Date(a + 'T12:00:00')) / 864e5);
  };

  // Prefill from the quick bar or a room's request button.
  const params = new URLSearchParams(location.search);
  ['arrival', 'departure'].forEach(k => { const v = params.get(k); if (/^\d{4}-\d{2}-\d{2}$/.test(v || '')) el(k).value = v; });
  if (S.rooms[params.get('room')]) el('room').value = params.get('room');

  const sumImg = $('#sum-img'), sumRoom = $('#sum-room'), sumStay = $('#sum-stay'), sumPrice = $('#sum-price'), sumMin = $('#sum-min');
  const updateSummary = () => {
    const room = S.rooms[el('room').value];
    const n = nights();
    sumImg.src = room ? room.img : sumImg.dataset.default;
    sumRoom.textContent = room ? room.name : S.sum.empty;
    sumRoom.classList.toggle('is-empty', !room);
    sumStay.textContent = n > 0 ? `${fmtDate(el('arrival').value)} – ${fmtDate(el('departure').value)} · ${n} ${n === 1 ? S.unit.night : S.unit.nights}` : '–';
    sumPrice.textContent = room && n > 0 ? `${n} × ${room.price} € = ${n * room.price} €` : '–';
    sumMin.classList.toggle('is-warn', n > 0 && n < 3);
  };
  form.addEventListener('input', updateSummary);
  form.addEventListener('change', updateSummary);
  updateSummary();

  const setError = (name, msg) => {
    const hint = $(`[data-hint="${name}"]`, form);
    if (!hint) return;
    hint.textContent = msg || '';
    hint.closest('.field').classList.toggle('has-error', !!msg);
  };
  const validate = () => {
    const errors = {};
    ['arrival', 'departure', 'salutation', 'last', 'email'].forEach(n => { if (!el(n).value.trim()) errors[n] = S.err.required; });
    if (!el('room').value) errors.room = S.err.required;
    if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el('email').value.trim())) errors.email = S.err.email;
    if (!errors.arrival && !errors.departure && nights() < 1) errors.departure = S.err.dates;
    if (!el('consent').checked) errors.consent = S.err.consent;
    ['arrival', 'departure', 'room', 'salutation', 'last', 'email', 'consent'].forEach(n => setError(n, errors[n]));
    return Object.keys(errors);
  };
  form.addEventListener('input', e => { if (e.target.name) setError(e.target.name, ''); });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const bad = validate();
    if (bad.length) {
      const first = bad[0] === 'room' ? $('.room-opt input', form) : el(bad[0]);
      first.focus();
      return;
    }
    const L = S.labels, n = nights(), room = S.rooms[el('room').value];
    const rows = [
      [L.arrival, fmtDate(el('arrival').value)],
      [L.departure, `${fmtDate(el('departure').value)} (${n} ${n === 1 ? S.unit.night : S.unit.nights})`],
      [L.room, room.name],
      [L.adults, el('adults').value],
      [L.children, el('children').value],
      [L.salutation, el('salutation').value],
      [L.first, el('first').value],
      [L.last, el('last').value],
      [L.email, el('email').value],
      [L.phone, el('phone').value],
      [L.address, el('address').value],
      [L.notes, el('notes').value],
    ].filter(r => String(r[1]).trim());

    const list = $('#ok-list');
    list.textContent = '';
    rows.forEach(([k, v]) => {
      const dt = document.createElement('dt'); dt.textContent = k;
      const dd = document.createElement('dd'); dd.textContent = v;
      list.append(dt, dd);
    });
    const body = rows.map(([k, v]) => `${k}: ${String(v).replace(/\s*\n\s*/g, ', ')}`).join('\n');
    $('#ok-mail').href = `mailto:${S.mail}?subject=${encodeURIComponent(S.subject)}&body=${encodeURIComponent(body)}`;

    form.hidden = true;
    ok.hidden = false;
    ok.scrollIntoView({ block: 'start' });
  });

  form.addEventListener('reset', () => setTimeout(() => {
    $$('.hint', form).forEach(h => { h.textContent = ''; h.closest('.field').classList.remove('has-error'); });
    updateSummary();
  }));
  $('#ok-again').addEventListener('click', () => {
    ok.hidden = true;
    form.hidden = false;
    form.scrollIntoView({ block: 'start' });
  });
})();
