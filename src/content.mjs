// Hand-written copy for all three languages.
// Long texts taken over from the live site (farm text, house rules, activities, legal pages)
// live in content/generated.json.

export const LANGS = ['de', 'en', 'it'];

export const SLUGS = {
  home:        { de: '',             en: '',             it: '' },
  farm:        { de: 'hof',          en: 'farm',         it: 'maso' },
  rooms:       { de: 'zimmer',       en: 'rooms',        it: 'camere' },
  request:     { de: 'anfrage',      en: 'request',      it: 'richiesta' },
  activities:  { de: 'aktivitaeten', en: 'activities',   it: 'attivita' },
  imprint:     { de: 'impressum',    en: 'legal-notice', it: 'note-legali' },
  privacy:     { de: 'datenschutz',  en: 'privacy',      it: 'privacy' },
};

export const CONTACT = {
  phone: '+39 349 2134607',
  phoneHref: 'tel:+393492134607',
  mail: 'info@brandlgut.com',
  maps: 'https://www.google.com/maps/search/?api=1&query=Brandlgut+Moritzinger+Weg+63+Bozen',
};

// Room facts shared by all languages. `dir` is the photo folder on the live site.
export const ROOMS = [
  { id: 'standard', name: 'Standard', dir: 'rooms/standard', price: 110, size: 17, extra: false,
    photos: ['01_standard_bett', '02_standard_zimmer', '03_standard_balkon', '04_standard_bad', '05_standard_zimmer', '06_standard_bett', '07_standard_bad'] },
  { id: 'superior', name: 'Superior', dir: 'rooms/superior', price: 120, size: 23, extra: false,
    photos: ['01_superior_bett', '02_superior_zimmer', '03_superior_balkon', '04_superior_zimmer', '05_superior_bad', '06_superior_dusche'] },
  { id: 'deluxe', name: 'Deluxe', dir: 'rooms/superior-plus', price: 120, size: 22, extra: false,
    photos: ['01_superiorplus_zimmer', '02_superiorplus_bett', '03_superiorplus_terrasse', '04_superiorplus_bad'] },
  { id: 'suite', name: 'Suite', dir: 'rooms/deluxe', price: 160, size: 80, extra: true,
    photos: ['01_deluxe_schlafzimmer', '02_deluxe_bett', '03_deluxe_kueche', '04_deluxe_kuechenausstattung', '05_deluxe_badewanne', '06_deluxe_bad', '07_deluxe_entree', '08_deluxe_essbereich'] },
];

export const FARM_PHOTOS = [
  '01-das-ist-unser-brandlgut', '02-das-brandlgut-am-abend', '03-das-brandlgut-im-schnee',
  '04-entspannen-sie-auf-der-oberen-sonnenterrasse', '05-entspannen-sie-auf-der-unteren-sonnenterrasse',
  '06-entspannung-und-spass-fuer-kinder', '07-unser-fruehstuecksraum',
  '08-zwei-hausgemachte-marmeladen-sind-nur-ein-teil-unserer-fruehstuecksauswahl',
  '09-taeglich-frisches-obst-fuer-sie-zum-geniessen', '10-thila-moechte-spielen',
  '11-unsere-huehner-finden-sie-ueberall-auf-dem-hof', '12-eine-unserer-katzen', '13-unser-wein',
  '14-einer-unserer-historischen-traktoren', '15-christuskreuz',
].map(n => 'galerie-01/' + n);

// Order matches the paragraphs in generated.json → policies (the last two are merged into one card).
export const POLICY_ICONS = ['info', 'checkinout', 'kids', 'parking', 'no-smoking', 'no-dogs', 'cancel', 'info'];

export const T = {
  de: {
    htmlLang: 'de',
    langName: 'Deutsch',
    nav: { farm: 'Unser Hof', rooms: 'Zimmer & Preise', activities: 'Aktivitäten', contact: 'Kontakt' },
    btn: {
      request: 'Anfrage senden', viewRooms: 'Zimmer ansehen', more: 'Mehr erfahren', allTips: 'Alle Tipps',
      route: 'Route planen', call: 'Anrufen', details: 'Details ansehen', requestRoom: 'Zimmer anfragen',
      requestNow: 'Jetzt anfragen', menu: 'Menü', close: 'Schließen', prev: 'Zurück', next: 'Weiter',
    },
    unit: { night: 'Nacht', nights: 'Nächte', perNight: '/ Nacht', from: 'ab', guests: 'Personen', exclBreakfast: 'exkl. Frühstück', photo: 'Foto' },
    home: {
      title: 'Brandlgut – Weinhof & Gästezimmer in Bozen',
      desc: 'Urlaub am Weinhof der Familie Gasser in Moritzing, Bozen: vier Zimmerkategorien, Frühstück mit hofeigenen Eiern und Blick auf den Mendelkamm.',
      eyebrow: 'Weinhof · Moritzing · Bozen',
      h1: ['Ihr Weinhof', 'in Bozen'],
      lead: 'Wohnen zwischen Reben und Obstgärten, frühstücken mit Eiern vom eigenen Hof und abends unseren Wein mit Blick auf den Mendelkamm genießen.',
      badge: 'Zimmer',
      heroAlt: 'Das Brandlgut zwischen Weinreben',
      quick: { arrival: 'Anreise', departure: 'Abreise', room: 'Zimmer', any: 'Noch offen' },
      facts: [
        ['Ruhig & zentral', 'Moritzing, Ortsteil von Bozen'],
        ['2 Hektar Weingut', 'Lagrein aus eigenem Anbau'],
        ['Frühstück am Hof', 'täglich 8:00 – 10:00 Uhr'],
        ['Stellplatz inklusive', 'für Ihr Auto reserviert'],
      ],
      welcome: {
        eyebrow: 'Willkommen',
        h2: 'Ihr Südtirol-Urlaub beginnt bei uns',
        p: [
          'Erkunden Sie Bozen, spazieren Sie entlang schönster Wanderwege, besteigen Sie die Gipfel der Südtiroler Alpen und Dolomiten, radeln Sie durch Weinberge und Obstplantagen oder besuchen Sie den „Ötzi“.',
          'Bei uns profitieren Sie von der zentralen Lage in Moritzing, einem ruhigen Ortsteil von Bozen – und von der Entspannung, die Sie bei uns garantiert finden werden.',
        ],
        sign: ['Wir freuen uns auf Sie!', 'Ihre Familie Gasser'],
        alt: 'Familie Gasser in Tracht',
      },
      rooms: {
        eyebrow: 'Zimmer & Preise',
        h2: 'Vier Kategorien, jede mit eigenem Flair',
        p: 'Antike Möbel, Doppelbett aus Zirben- oder Kirschholz, modernes Bad, Sat-TV, Safe, Kühlschrank und WLAN in jedem Zimmer.',
        note: 'Preise pro Zimmer und Nacht ab drei Nächten, exkl. Frühstück (18 € pro Person und Tag).',
      },
      farm: {
        eyebrow: 'Hof & Wein',
        h2: 'Ein Weingut aus dem 19. Jahrhundert',
        p: [
          'Der Brandlgut-Hof wurde Ende des 19. Jahrhunderts erbaut. Seit 2016 begrüßen wir ganzjährig Gäste in unseren selbstgestalteten Zimmern.',
          'Auf zwei Hektar wächst unser Lagrein. Obst, Gemüse und die Eier unserer freilaufenden Hühner kommen jeden Morgen frisch auf den Frühstückstisch.',
        ],
        alts: ['Unser Wein', 'Obere Sonnenterrasse', 'Unser Frühstücksraum'],
      },
      around: { eyebrow: 'Umgebung', h2: 'Kunst, Kultur und Berge vor der Tür' },
    },
    cats: ['Kunst & Kultur', 'Freizeit', 'Essen & Trinken', 'Wandern', 'Wintersport', 'Märkte'],
    contact: {
      eyebrow: 'Lage & Kontakt', h2: 'So finden Sie uns',
      address: ['Brandlgut', 'Moritzinger Weg 63', '39100 Bozen, Italien'],
      rows: [['Mobil', 'phone'], ['E-Mail', 'mail'], ['Anreise', '17:00 – 20:00 Uhr'], ['Abreise', '9:00 – 10:30 Uhr']],
      mapNote: 'Die Karte öffnet sich erst nach Ihrem Klick in Google Maps.',
    },
    cta: { h2: 'Wann dürfen wir Sie begrüßen?', p: 'Senden Sie uns eine unverbindliche Anfrage – wir melden uns umgehend.' },
    footer: { family: 'Familie Gasser', imprint: 'Impressum', privacy: 'Datenschutz' },
    roomsPage: {
      title: 'Zimmer und Preise – Brandlgut', h1: 'Unsere Zimmer und Preise', eyebrow: 'Zimmer & Preise',
      intro: 'Wählen Sie ein Zimmer aus unseren vier Kategorien. Jedes Zimmer hat ein eigenes Flair und Besonderheiten. Einzigartige antike Möbel runden unsere Standardausstattung mit Doppelbett aus Zirben- oder Kirschholz, Balkon, modernem Duschbad, WC, Satelliten-TV, Safe sowie kleinem Kühlschrank ab.',
      good: 'Gut zu wissen',
      policyTitles: ['Preise & Frühstück', 'An- & Abreise', 'Kinder', 'Parken', 'Nichtraucherhaus', 'Haustiere', 'Stornierung', 'Reinigung & Handtücher'],
    },
    persons: n => `für ${n} Personen`,
    features: {
      standard: ['Balkon', 'Dusche', 'Haartrockner', 'Sat-TV', 'WLAN', 'Safe & Kühlschrank'],
      superior: ['2 Balkone', 'Dusche', 'Haartrockner', 'Sat-TV', 'WLAN', 'Safe & Kühlschrank'],
      deluxe: ['Terrasse zum Garten', 'Dusche', 'Haartrockner', 'Sat-TV', 'WLAN', 'Safe & Kühlschrank'],
      suite: ['Große Terrasse', 'Voll ausgestattete Küche', 'Wannenbad', 'Haartrockner', 'Sat-TV', 'WLAN'],
    },
    farmPage: {
      title: 'Unser Hof – Brandlgut', h1: 'Unser Hof', eyebrow: 'Hof & Wein', gallery: 'Eindrücke vom Hof',
      captions: ['Unser Brandlgut', 'Das Brandlgut am Abend', 'Das Brandlgut im Schnee', 'Obere Sonnenterrasse', 'Untere Sonnenterrasse', 'Spaß für Kinder', 'Unser Frühstücksraum', 'Hausgemachte Marmeladen', 'Täglich frisches Obst', 'Thila möchte spielen', 'Unsere Hühner', 'Eine unserer Katzen', 'Unser Wein', 'Historischer Traktor', 'Christuskreuz'],
    },
    actPage: {
      title: 'Aktivitäten – Brandlgut', h1: 'Aktivitäten', eyebrow: 'Umgebung',
      note: 'Bitte erkundigen Sie sich gegebenenfalls nach den saisonbedingten Öffnungszeiten.',
    },
    req: {
      title: 'Unverbindliche Anfrage – Brandlgut', h1: 'Unverbindliche Anfrage', eyebrow: 'Reservierung',
      intro: 'Mit dem folgenden Formular können Sie eine unverbindliche Reservierungs-Anfrage stellen. Diese Anfrage entspricht keiner Buchung – wir bitten dafür um Verständnis. Nachdem wir die Anfrage erhalten haben, werden wir Ihnen umgehend den gewünschten Termin bestätigen oder ein alternatives Angebot unterbreiten.',
      s1: 'Ihre Anfrage', s2: 'Ihre Kontaktdaten',
      f: { arrival: 'Anreise', departure: 'Abreise', room: 'Zimmerkategorie', adults: 'Erwachsene', children: 'Kinder', salutation: 'Anrede', first: 'Vorname', last: 'Nachname', address: 'Adresse', email: 'E-Mail', phone: 'Telefon', notes: 'Anmerkungen' },
      salutations: ['Frau', 'Herr', 'Familie', 'Keine Angabe'],
      choose: 'Bitte auswählen', optional: 'optional',
      consent: ['Ich habe die ', 'Datenschutzerklärung', ' gelesen und stimme zu.'],
      submit: 'Anfrage senden', reset: 'Zurücksetzen',
      err: { required: 'Bitte ausfüllen', email: 'Bitte gültige E-Mail angeben', dates: 'Abreise muss nach der Anreise liegen', consent: 'Bitte zustimmen' },
      sum: { title: 'Ihre Auswahl', estimate: 'Geschätzter Zimmerpreis', note: 'zzgl. Frühstück, unverbindlich', minStay: 'Mindestaufenthalt: 3 Nächte', empty: 'Bitte Daten und Zimmer wählen', stay: 'Aufenthalt' },
      ok: { h2: 'Vielen Dank!', p: 'Dies ist eine Demo-Seite: Ihre Anfrage wurde noch nicht übermittelt. Mit einem Klick können Sie sie per E-Mail senden.', mail: 'Per E-Mail senden', again: 'Neue Anfrage', subject: 'Anfrage via Homepage' },
    },
    legal: { imprintTitle: 'Impressum', privacyTitle: 'Datenschutz' },
  },

  en: {
    htmlLang: 'en',
    langName: 'English',
    nav: { farm: 'Our Farm', rooms: 'Rooms & Prices', activities: 'Activities', contact: 'Contact' },
    btn: {
      request: 'Send request', viewRooms: 'View rooms', more: 'Learn more', allTips: 'All tips',
      route: 'Get directions', call: 'Call us', details: 'View details', requestRoom: 'Request room',
      requestNow: 'Request now', menu: 'Menu', close: 'Close', prev: 'Previous', next: 'Next',
    },
    unit: { night: 'night', nights: 'nights', perNight: '/ night', from: 'from', guests: 'guests', exclBreakfast: 'excl. breakfast', photo: 'Photo' },
    home: {
      title: 'Brandlgut – Wine farm & guest rooms in Bolzano',
      desc: 'A holiday on the Gasser family wine farm in Moritzing, Bolzano: four room categories, breakfast with eggs from our own hens and a view of the Mendel ridge.',
      eyebrow: 'Wine farm · Moritzing · Bolzano',
      h1: ['Your wine farm', 'in Bolzano'],
      lead: 'Stay among vineyards and orchards, enjoy breakfast with eggs from our own farm and taste our wine in the evening with a view of the Mendel ridge.',
      badge: 'Rooms',
      heroAlt: 'Brandlgut surrounded by vines',
      quick: { arrival: 'Arrival', departure: 'Departure', room: 'Room', any: 'Not sure yet' },
      facts: [
        ['Quiet & central', 'Moritzing, a district of Bolzano'],
        ['2-hectare winery', 'Lagrein from our own vines'],
        ['Farm breakfast', 'daily 8:00 – 10:00 a.m.'],
        ['Parking included', 'reserved for your car'],
      ],
      welcome: {
        eyebrow: 'Welcome',
        h2: 'Your South Tyrol holiday starts at our farm',
        p: [
          'Discover Bolzano, walk along some of the most beautiful hiking trails, climb the summits of the South Tyrolean Alps and Dolomites, cycle through vineyards and orchards or visit “Ötzi”.',
          'With us you benefit from the central location of Moritzing, a quiet district of Bolzano – and from the relaxation you will definitely find at our farm.',
        ],
        sign: ['We look forward to seeing you!', 'The Gasser family'],
        alt: 'The Gasser family in traditional dress',
      },
      rooms: {
        eyebrow: 'Rooms & prices',
        h2: 'Four categories, each with its own flair',
        p: 'Antique furniture, a double bed made of Swiss pine or cherry wood, modern bathroom, satellite TV, safe, fridge and Wi-Fi in every room.',
        note: 'Prices per room and night for stays of three nights or more, excl. breakfast (€18 per person per day).',
      },
      farm: {
        eyebrow: 'Farm & wine',
        h2: 'A winery from the 19th century',
        p: [
          'The Brandlgut farm was built in the late 19th century. Since 2016 we have been welcoming guests all year round in rooms we designed ourselves.',
          'Our Lagrein grows on two hectares. Fruit, vegetables and the eggs of our free-range hens come fresh to the breakfast table every morning.',
        ],
        alts: ['Our wine', 'Upper sun terrace', 'Our breakfast room'],
      },
      around: { eyebrow: 'Surroundings', h2: 'Art, culture and mountains nearby' },
    },
    cats: ['Art & culture', 'Leisure', 'Food & drink', 'Hiking', 'Winter sports', 'Markets'],
    contact: {
      eyebrow: 'Location & contact', h2: 'How to find us',
      address: ['Brandlgut', 'Moritzinger Weg 63', '39100 Bolzano, Italy'],
      rows: [['Mobile', 'phone'], ['E-mail', 'mail'], ['Check-in', '5:00 – 8:00 p.m.'], ['Check-out', '9:00 – 10:30 a.m.']],
      mapNote: 'The map only opens in Google Maps after you click.',
    },
    cta: { h2: 'When may we welcome you?', p: 'Send us a non-binding request – we will get back to you promptly.' },
    footer: { family: 'The Gasser family', imprint: 'Legal notice', privacy: 'Privacy' },
    roomsPage: {
      title: 'Rooms and prices – Brandlgut', h1: 'Our rooms and prices', eyebrow: 'Rooms & prices',
      intro: 'You can choose your room from four categories. Each room has its very own flair and features. Unique antique furniture complements our standard features: a double bed made of Swiss pine or cherry wood, a balcony, a modern bathroom with shower and WC, satellite TV, a safe and a small fridge.',
      good: 'Good to know',
      policyTitles: ['Prices & breakfast', 'Arrival & departure', 'Children', 'Parking', 'Non-smoking house', 'Pets', 'Cancellation', 'Cleaning & towels'],
    },
    persons: n => `for ${n} guests`,
    features: {
      standard: ['Balcony', 'Shower', 'Hairdryer', 'Satellite TV', 'Wi-Fi', 'Safe & fridge'],
      superior: ['2 balconies', 'Shower', 'Hairdryer', 'Satellite TV', 'Wi-Fi', 'Safe & fridge'],
      deluxe: ['Garden terrace', 'Shower', 'Hairdryer', 'Satellite TV', 'Wi-Fi', 'Safe & fridge'],
      suite: ['Large terrace', 'Fully equipped kitchen', 'Bathtub & shower', 'Hairdryer', 'Satellite TV', 'Wi-Fi'],
    },
    farmPage: {
      title: 'Our farm – Brandlgut', h1: 'Our farm', eyebrow: 'Farm & wine', gallery: 'Impressions of the farm',
      captions: ['Our Brandlgut', 'Brandlgut in the evening', 'Brandlgut in the snow', 'Upper sun terrace', 'Lower sun terrace', 'Fun for children', 'Our breakfast room', 'Homemade jams', 'Fresh fruit every day', 'Thila wants to play', 'Our chickens', 'One of our cats', 'Our wine', 'Historic tractor', 'Wayside cross'],
    },
    actPage: {
      title: 'Activities – Brandlgut', h1: 'Activities', eyebrow: 'Surroundings',
      note: 'Please enquire about seasonal opening hours if necessary.',
    },
    req: {
      title: 'Non-binding request – Brandlgut', h1: 'Non-binding request', eyebrow: 'Reservation',
      intro: 'You can send us a non-binding request with the following form. Please note – this request is not a booking! Shortly after we have received your request we will either confirm your desired travel dates or propose an alternative offer.',
      s1: 'Your request', s2: 'Your contact details',
      f: { arrival: 'Arrival', departure: 'Departure', room: 'Room category', adults: 'Adults', children: 'Children', salutation: 'Title', first: 'First name', last: 'Last name', address: 'Address', email: 'E-mail', phone: 'Phone', notes: 'Comments' },
      salutations: ['Mrs', 'Mr', 'Family', 'Not specified'],
      choose: 'Please choose', optional: 'optional',
      consent: ['I have read and accept the ', 'privacy policy', '.'],
      submit: 'Send request', reset: 'Reset form',
      err: { required: 'Please fill in', email: 'Please enter a valid e-mail', dates: 'Departure must be after arrival', consent: 'Please accept' },
      sum: { title: 'Your selection', estimate: 'Estimated room price', note: 'plus breakfast, non-binding', minStay: 'Minimum stay: 3 nights', empty: 'Please choose dates and room', stay: 'Stay' },
      ok: { h2: 'Thank you!', p: 'This is a demo page: your request has not been sent yet. You can send it by e-mail with one click.', mail: 'Send by e-mail', again: 'New request', subject: 'Request via website' },
    },
    legal: { imprintTitle: 'Legal notice', privacyTitle: 'Data protection' },
  },

  it: {
    htmlLang: 'it',
    langName: 'Italiano',
    nav: { farm: 'Il nostro maso', rooms: 'Camere e prezzi', activities: 'Attività', contact: 'Contatti' },
    btn: {
      request: 'Invia richiesta', viewRooms: 'Vedi le camere', more: 'Scopri di più', allTips: 'Tutti i consigli',
      route: 'Indicazioni', call: 'Chiama', details: 'Vedi dettagli', requestRoom: 'Richiedi camera',
      requestNow: 'Richiedi ora', menu: 'Menu', close: 'Chiudi', prev: 'Indietro', next: 'Avanti',
    },
    unit: { night: 'notte', nights: 'notti', perNight: '/ notte', from: 'da', guests: 'persone', exclBreakfast: 'colazione esclusa', photo: 'Foto' },
    home: {
      title: 'Brandlgut – Maso vinicolo e camere a Bolzano',
      desc: 'Vacanza nel maso vinicolo della famiglia Gasser a San Maurizio, Bolzano: quattro tipologie di camera, colazione con uova del maso e vista sulla Mendola.',
      eyebrow: 'Maso vinicolo · San Maurizio · Bolzano',
      h1: ['Il vostro maso', 'a Bolzano'],
      lead: 'Soggiornate tra vigneti e frutteti, fate colazione con le uova del nostro maso e la sera gustate il nostro vino con vista sulla Mendola.',
      badge: 'Camere',
      heroAlt: 'Il maso Brandlgut tra i vigneti',
      quick: { arrival: 'Arrivo', departure: 'Partenza', room: 'Camera', any: 'Da decidere' },
      facts: [
        ['Tranquillo e centrale', 'San Maurizio, quartiere di Bolzano'],
        ['2 ettari di vigneto', 'Lagrein di nostra produzione'],
        ['Colazione al maso', 'ogni giorno 8:00 – 10:00'],
        ['Parcheggio incluso', 'riservato alla vostra auto'],
      ],
      welcome: {
        eyebrow: 'Benvenuti',
        h2: 'La vostra vacanza in Alto Adige comincia qui',
        p: [
          'Scoprite Bolzano, passeggiate lungo innumerevoli sentieri, salite sulle cime delle Dolomiti, pedalate lungo le piste ciclabili immerse nella natura o visitate l’uomo dei ghiacci “Ötzi”.',
          'Da noi approfittate della posizione centrale di San Maurizio, quartiere tranquillo di Bolzano – e del relax che troverete sicuramente nel nostro maso.',
        ],
        sign: ['Vi aspettiamo!', 'La vostra famiglia Gasser'],
        alt: 'La famiglia Gasser in costume tradizionale',
      },
      rooms: {
        eyebrow: 'Camere e prezzi',
        h2: 'Quattro tipologie, ognuna con il suo stile',
        p: 'Mobili antichi, letto matrimoniale in legno di cembro o ciliegio, bagno moderno, TV satellitare, cassaforte, frigo e Wi-Fi in ogni camera.',
        note: 'Prezzi per camera e notte per soggiorni di almeno tre notti, colazione esclusa (18 € a persona al giorno).',
      },
      farm: {
        eyebrow: 'Maso e vino',
        h2: 'Un maso vinicolo del XIX secolo',
        p: [
          'Il maso Brandlgut fu costruito nel XIX secolo. Dal 2016 accogliamo ospiti tutto l’anno nelle camere ideate e rinnovate da noi.',
          'Su due ettari cresce il nostro Lagrein. Frutta, verdura e le uova delle nostre galline arrivano fresche ogni mattina sulla tavola della colazione.',
        ],
        alts: ['Il nostro vino', 'Terrazza superiore', 'La sala colazioni'],
      },
      around: { eyebrow: 'Dintorni', h2: 'Arte, cultura e montagne a due passi' },
    },
    cats: ['Arte e cultura', 'Tempo libero', 'Gastronomia', 'Escursioni', 'Sport invernali', 'Mercati'],
    contact: {
      eyebrow: 'Posizione e contatti', h2: 'Come trovarci',
      address: ['Brandlgut', 'Via San Maurizio 63', '39100 Bolzano, Italia'],
      rows: [['Cellulare', 'phone'], ['E-mail', 'mail'], ['Check-in', '17:00 – 20:00'], ['Check-out', '9:00 – 10:30']],
      mapNote: 'La mappa si apre in Google Maps solo dopo il clic.',
    },
    cta: { h2: 'Quando possiamo accogliervi?', p: 'Inviateci una richiesta non vincolante – vi risponderemo al più presto.' },
    footer: { family: 'Famiglia Gasser', imprint: 'Note legali', privacy: 'Privacy' },
    roomsPage: {
      title: 'Camere e prezzi – Brandlgut', h1: 'Le nostre camere e i prezzi', eyebrow: 'Camere e prezzi',
      intro: 'Mettiamo a disposizione 4 tipologie di camera. Ognuna di esse si distingue per stile e unicità. Mobili antichi e raffinati completano la nostra dotazione standard con un letto matrimoniale in legno di pino cembro o ciliegio, balcone, una moderna vasca da bagno o doccia, WC, TV satellitare, cassaforte e mini frigo.',
      good: 'Buono a sapersi',
      policyTitles: ['Prezzi e colazione', 'Arrivo e partenza', 'Bambini', 'Parcheggio', 'Vietato fumare', 'Animali domestici', 'Disdetta', 'Pulizia e asciugamani'],
    },
    persons: n => `per ${n} persone`,
    features: {
      standard: ['Balcone', 'Doccia', 'Asciugacapelli', 'TV satellitare', 'Wi-Fi', 'Cassaforte e frigo'],
      superior: ['2 balconi', 'Doccia', 'Asciugacapelli', 'TV satellitare', 'Wi-Fi', 'Cassaforte e frigo'],
      deluxe: ['Terrazzo sul giardino', 'Doccia', 'Asciugacapelli', 'TV satellitare', 'Wi-Fi', 'Cassaforte e frigo'],
      suite: ['Terrazzo grande', 'Cucina completa', 'Vasca da bagno', 'Asciugacapelli', 'TV satellitare', 'Wi-Fi'],
    },
    farmPage: {
      title: 'Il nostro maso – Brandlgut', h1: 'Il nostro maso', eyebrow: 'Maso e vino', gallery: 'Impressioni dal maso',
      captions: ['Il nostro Brandlgut', 'Il Brandlgut di sera', 'Il Brandlgut sotto la neve', 'Terrazza superiore', 'Terrazza inferiore', 'Divertimento per i bambini', 'La sala colazioni', 'Marmellate fatte in casa', 'Frutta fresca ogni giorno', 'Thila vuole giocare', 'Le nostre galline', 'Uno dei nostri gatti', 'Il nostro vino', 'Trattore storico', 'Crocifisso'],
    },
    actPage: {
      title: 'Attività – Brandlgut', h1: 'Attività', eyebrow: 'Dintorni',
      note: 'Si prega di informarsi sugli orari di apertura stagionali.',
    },
    req: {
      title: 'Richiesta non vincolante – Brandlgut', h1: 'Richiesta non vincolante', eyebrow: 'Prenotazione',
      intro: 'Con il seguente modulo è possibile effettuare una richiesta di prenotazione non vincolante. Tale richiesta non è una prenotazione ufficiale. Una volta ricevuta la vostra richiesta, sarà nostra premura ufficializzarla o proporvi una soluzione alternativa.',
      s1: 'La vostra richiesta', s2: 'I vostri dati di contatto',
      f: { arrival: 'Arrivo', departure: 'Partenza', room: 'Tipologia di camera', adults: 'Adulti', children: 'Bambini', salutation: 'Titolo', first: 'Nome', last: 'Cognome', address: 'Indirizzo', email: 'E-mail', phone: 'Telefono', notes: 'Note' },
      salutations: ['Sig.ra', 'Sig.', 'Famiglia', 'Non specificato'],
      choose: 'Selezionare', optional: 'facoltativo',
      consent: ['Ho letto e accetto l’', 'informativa sulla privacy', '.'],
      submit: 'Invia richiesta', reset: 'Reimposta',
      err: { required: 'Campo obbligatorio', email: 'Inserire un’e-mail valida', dates: 'La partenza deve seguire l’arrivo', consent: 'Accettare per continuare' },
      sum: { title: 'La vostra scelta', estimate: 'Prezzo stimato della camera', note: 'colazione esclusa, non vincolante', minStay: 'Soggiorno minimo: 3 notti', empty: 'Scegliere date e camera', stay: 'Soggiorno' },
      ok: { h2: 'Grazie!', p: 'Questa è una pagina demo: la richiesta non è ancora stata inviata. Potete inviarla via e-mail con un clic.', mail: 'Invia via e-mail', again: 'Nuova richiesta', subject: 'Richiesta dal sito web' },
    },
    legal: { imprintTitle: 'Note legali', privacyTitle: 'Privacy' },
  },
};

// Obvious spelling slips in the live English texts, corrected when they are taken over.
export const EN_FIXES = [
  ['wineary', 'winery'], ['moderinization', 'modernization'], ['openes.', 'openness.'], ['effectivly', 'effectively'],
  ['simultanously', 'simultaneously'], ['we applies', 'we apply'], ['one of our the terraces', 'one of our terraces'],
  ['completely build of', 'completely built of'], ['variety of guest ', 'variety of guests '],
];
