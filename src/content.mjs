// All hand-written copy for the three languages.
// The activity tips and the legal texts are in content/long-texts.json.
//
// Rules for this copy:
// - Say each fact once per page. No repeated selling points, no repeated contact details.
// - Do not describe the location as quiet (the hospital and its helicopter are next door).
// - Keep the three languages the same length, so headings and labels wrap identically.

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

// Room facts shared by all languages. `dir` is the photo folder.
export const ROOMS = [
  { id: 'standard', name: 'Standard', dir: 'rooms/standard', price: 110, size: 17, guests: '2',
    photos: ['01_standard_bett', '02_standard_zimmer', '03_standard_balkon', '04_standard_bad', '05_standard_zimmer', '06_standard_bett', '07_standard_bad'] },
  { id: 'superior', name: 'Superior', dir: 'rooms/superior', price: 120, size: 23, guests: '2',
    photos: ['01_superior_bett', '02_superior_zimmer', '03_superior_balkon', '04_superior_zimmer', '05_superior_bad', '06_superior_dusche'] },
  { id: 'deluxe', name: 'Deluxe', dir: 'rooms/superior-plus', price: 120, size: 22, guests: '2',
    photos: ['01_superiorplus_zimmer', '02_superiorplus_bett', '03_superiorplus_terrasse', '04_superiorplus_bad'] },
  { id: 'suite', name: 'Suite', dir: 'rooms/deluxe', price: 160, size: 80, guests: '2 (+2)',
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

// One icon per house rule, in the order of `policies` below.
// kids / parking / no-dogs are the original icon files; the others are drawn in build.mjs.
export const POLICY_ICONS = ['euro', 'key', 'file:kids', 'file:parking', 'nosmoke', 'file:no-dogs', 'cancel', 'towel'];

export const T = {
  de: {
    htmlLang: 'de', langName: 'Deutsch', skip: 'Zum Inhalt',
    nav: { farm: 'Unser Hof', rooms: 'Zimmer & Preise', activities: 'Aktivitäten', contact: 'Kontakt' },
    btn: {
      request: 'Anfrage senden', viewRooms: 'Zimmer ansehen', more: 'Mehr erfahren', allTips: 'Alle Tipps',
      route: 'Route planen', details: 'Details ansehen', requestRoom: 'Zimmer anfragen',
      menu: 'Menü', close: 'Schließen', prev: 'Zurück', next: 'Weiter',
    },
    unit: { night: 'Nacht', nights: 'Nächte', perNight: '/ Nacht', guests: 'Personen', photo: 'Foto' },
    home: {
      title: 'Brandlgut – Weinhof & Gästezimmer in Bozen',
      desc: 'Urlaub am Weinhof der Familie Gasser in Bozen: vier Zimmerkategorien, Frühstück am Hof und Blick auf den Mendelkamm.',
      eyebrow: 'Weinhof · Bozen · Südtirol',
      h1: ['Ihr Weinhof', 'in Bozen'],
      lead: 'Wohnen zwischen Reben und Obstgärten, mit Blick auf den Mendelkamm.',
      heroAlt: 'Das Brandlgut zwischen Weinreben, dahinter die Berge',
      facts: [
        ['Nah an der Stadt', '4 km ins Zentrum von Bozen'],
        ['2 Hektar Weingut', 'Lagrein aus eigenem Anbau'],
        ['Frühstück am Hof', 'mit Eiern unserer Hühner'],
        ['Stellplatz inklusive', 'für Ihr Auto reserviert'],
      ],
      welcome: {
        eyebrow: 'Ihre Gastgeber',
        h2: 'Willkommen bei Familie Gasser',
        p: 'Von unserem Hof aus erkunden Sie Bozen, wandern in den Südtiroler Alpen und Dolomiten, radeln durch Weinberge und Obstplantagen oder besuchen den „Ötzi“. Und am Abend verkosten Sie unseren Wein.',
        sign: ['Wir freuen uns auf Sie!', 'Ihre Familie Gasser'],
        alt: 'Familie Gasser in Tracht',
      },
      rooms: { eyebrow: 'Zimmer & Preise', h2: 'Vier Kategorien, jede mit eigenem Flair', note: 'Preise pro Zimmer und Nacht, ab drei Nächten.' },
      farm: {
        eyebrow: 'Hof & Wein',
        h2: 'Wein, Garten und Tiere',
        p: 'Der Hof stammt aus dem späten 19. Jahrhundert. Seit 2016 empfangen wir hier Gäste – in Zimmern, die wir selbst umgebaut und gestaltet haben.',
        alts: ['Unser Wein', 'Obere Sonnenterrasse', 'Unser Frühstücksraum'],
      },
      around: { eyebrow: 'Umgebung', h2: 'Kunst, Kultur und Berge vor der Tür' },
      loc: { eyebrow: 'Anreise', h2: 'So finden Sie uns', alt: 'Das Brandlgut am Abend' },
    },
    cats: ['Kunst & Kultur', 'Freizeit', 'Essen & Trinken', 'Wandern', 'Wintersport', 'Märkte'],
    address: ['Moritzinger Weg 63', '39100 Bozen, Italien'],
    cta: { h2: 'Wann dürfen wir Sie begrüßen?', p: 'Ihre Anfrage ist unverbindlich – wir melden uns umgehend.' },
    footer: { family: 'Familie Gasser', imprint: 'Impressum', privacy: 'Datenschutz' },
    roomsPage: {
      title: 'Zimmer und Preise – Brandlgut', h1: 'Unsere Zimmer und Preise', eyebrow: 'Zimmer & Preise',
      intro: 'Jedes Zimmer hat sein eigenes Flair. Zur Ausstattung gehören antike Möbel, ein Doppelbett aus Zirben- oder Kirschholz, ein modernes Bad mit Haartrockner, Sat-TV, Safe, Kühlschrank und WLAN.',
      good: 'Gut zu wissen',
      spec: { guests: 'Personen', size: 'Größe', outdoor: 'Draußen', bath: 'Bad', kitchen: 'Küche' },
      specs: {
        standard: { outdoor: 'Balkon', bath: 'Dusche' },
        superior: { outdoor: '2 Balkone', bath: 'Dusche' },
        deluxe: { outdoor: 'Terrasse zum Garten', bath: 'Dusche' },
        suite: { outdoor: 'Große Terrasse', bath: 'Wannenbad', kitchen: 'voll ausgestattet' },
      },
      policies: [
        ['Preise & Frühstück', 'Preise pro Zimmer und Nacht, ab drei Nächten. Frühstück gibt es täglich von 8:00 bis 10:00 Uhr für 18 € pro Person.'],
        ['An- & Abreise', 'Anreise 17:00 – 20:00 Uhr, Abreise 9:00 – 10:30 Uhr. Unangekündigter Check-in nach 20:00 Uhr: 20 € pro Stunde. Nach 22:00 Uhr ist kein Einlass möglich.'],
        ['Kinder', 'Bis drei Jahre kostenfrei, von vier bis sechs Jahren 15 € pro Nacht. Beim Frühstück zahlen Kinder von vier bis neun Jahren 4 € weniger, Kleinkinder nichts.'],
        ['Parken', 'Ein Stellplatz ist für Sie reserviert. Größere Fahrzeuge melden Sie bitte vorab an; ein Anhänger kostet 3 € pro Tag.'],
        ['Nichtraucherhaus', 'Im Haus und in den Zimmern wird nicht geraucht – auf Ihrem Balkon oder der Terrasse gerne.'],
        ['Haustiere', 'Haustiere können wir leider nicht aufnehmen: Auf dem Hof leben freilaufende Hühner, Hunde, Katzen und Kleintiere.'],
        ['Stornierung', 'Bei Stornierung weniger als 14 Tage vor Anreise, Nicht-Anreise oder früherer Abreise berechnen wir den vollen Preis.'],
        ['Reinigung & Handtücher', 'Sonntags reinigen wir die Zimmer nur auf Anfrage. Handtücher wechseln wir alle drei Tage, häufiger gegen Aufpreis.'],
      ],
    },
    homeTicks: {
      standard: ['Balkon', 'Dusche'], superior: ['2 Balkone', 'Dusche'],
      deluxe: ['Terrasse zum Garten', 'Dusche'], suite: ['Große Terrasse', 'Küche & Wannenbad'],
    },
    farmPage: {
      title: 'Unser Hof – Brandlgut', h1: 'Unser Hof', eyebrow: 'Hof & Wein',
      intro: 'Der Brandlgut-Hof wurde Ende des 19. Jahrhunderts erbaut und 2006 von uns übernommen. Nach mehreren Jahren Umbau begrüßen wir seit Juli 2016 das ganze Jahr über Gäste.',
      blocks: [
        ['Wein & Garten', ['Auf zwei Hektar in bester Lage wächst unser Lagrein. Ein kleinerer Teil des Hofes gehört Obst und Gemüse – Äpfeln, Birnen, Kirschen, Gurken, Kürbissen – für unsere Gäste und für uns selbst.', 'Sie möchten mehr über die Arbeit als Winzer erfahren? Wir zeigen Ihnen gerne den Hof – sprechen Sie uns einfach an.']],
        ['Frühstück', ['Im Frühstücksraum, ganz aus Fichtenholz gebaut, beginnt der Tag mit Kaffee, frischen Brötchen, lokalen Köstlichkeiten und den Eiern unserer Hühner. Hier kommen wir am liebsten mit unseren Gästen ins Gespräch.']],
        ['Terrasse & Wiese', ['Die große Gemeinschaftsterrasse und die Liegewiese bieten einen weiten Blick über das Tal. Kinder haben viel Platz zum Toben, eine Spielecke mit Sandkasten und eine große Schaukel – und wer gerne mit Hunden spielt, wird Mira lieben.']],
      ],
      gallery: 'Eindrücke vom Hof',
      captions: ['Unser Brandlgut', 'Das Brandlgut am Abend', 'Das Brandlgut im Schnee', 'Obere Sonnenterrasse', 'Untere Sonnenterrasse', 'Spaß für Kinder', 'Unser Frühstücksraum', 'Hausgemachte Marmeladen', 'Täglich frisches Obst', 'Thila möchte spielen', 'Unsere Hühner', 'Eine unserer Katzen', 'Unser Wein', 'Historischer Traktor', 'Christuskreuz'],
    },
    actPage: {
      title: 'Aktivitäten – Brandlgut', h1: 'Aktivitäten', eyebrow: 'Umgebung',
      intro: 'Kunst und Kultur, Sport und Kulinarik: Bozen und Südtirol haben viel zu bieten. Hier sind unsere Tipps – mit der Entfernung vom Hof.',
      note: 'Bitte erkundigen Sie sich nach den saisonalen Öffnungszeiten.',
    },
    req: {
      title: 'Unverbindliche Anfrage – Brandlgut', h1: 'Unverbindliche Anfrage', eyebrow: 'Reservierung',
      intro: 'Ihre Anfrage ist unverbindlich und noch keine Buchung. Wir bestätigen Ihren Wunschtermin umgehend oder schlagen Ihnen eine Alternative vor.',
      s1: 'Ihre Anfrage', s2: 'Ihre Kontaktdaten',
      f: { arrival: 'Anreise', departure: 'Abreise', room: 'Zimmerkategorie', adults: 'Erwachsene', children: 'Kinder', salutation: 'Anrede', first: 'Vorname', last: 'Nachname', address: 'Adresse', email: 'E-Mail', phone: 'Telefon', notes: 'Anmerkungen' },
      salutations: ['Frau', 'Herr', 'Familie', 'Keine Angabe'],
      choose: 'Bitte auswählen', optional: 'optional',
      consent: ['Ich habe die ', 'Datenschutzerklärung', ' gelesen und stimme zu.'],
      submit: 'Anfrage senden', reset: 'Zurücksetzen',
      err: { required: 'Bitte ausfüllen', email: 'Bitte gültige E-Mail angeben', dates: 'Abreise muss nach der Anreise liegen', consent: 'Bitte zustimmen' },
      sum: { title: 'Ihre Auswahl', estimate: 'Geschätzter Zimmerpreis', note: 'zzgl. Frühstück, unverbindlich', minStay: 'Mindestaufenthalt: 3 Nächte', empty: 'Bitte Daten und Zimmer wählen', stay: 'Aufenthalt' },
      ok: { h2: 'Vielen Dank!', p: 'Dies ist eine Vorschau: Ihre Anfrage wurde noch nicht übermittelt. Mit einem Klick können Sie sie per E-Mail senden.', mail: 'Per E-Mail senden', again: 'Neue Anfrage', subject: 'Anfrage via Homepage' },
    },
    legal: { imprintTitle: 'Impressum', privacyTitle: 'Datenschutz' },
  },

  en: {
    htmlLang: 'en', langName: 'English', skip: 'Skip to content',
    nav: { farm: 'Our Farm', rooms: 'Rooms & Prices', activities: 'Activities', contact: 'Contact' },
    btn: {
      request: 'Send request', viewRooms: 'View rooms', more: 'Learn more', allTips: 'All tips',
      route: 'Get directions', details: 'View details', requestRoom: 'Request room',
      menu: 'Menu', close: 'Close', prev: 'Previous', next: 'Next',
    },
    unit: { night: 'night', nights: 'nights', perNight: '/ night', guests: 'guests', photo: 'Photo' },
    home: {
      title: 'Brandlgut – Wine farm & guest rooms in Bolzano',
      desc: 'A holiday on the Gasser family wine farm in Bolzano: four room categories, breakfast on the farm and a view of the Mendel ridge.',
      eyebrow: 'Wine farm · Bolzano · South Tyrol',
      h1: ['Your wine farm', 'in Bolzano'],
      lead: 'Stay among vineyards and orchards, with a view of the Mendel ridge.',
      heroAlt: 'Brandlgut surrounded by vines, with the mountains behind',
      facts: [
        ['Close to town', '4 km to the centre of Bolzano'],
        ['2-hectare winery', 'Lagrein from our own vines'],
        ['Farm breakfast', 'with eggs from our own hens'],
        ['Parking included', 'reserved for your car'],
      ],
      welcome: {
        eyebrow: 'Your hosts',
        h2: 'Welcome to the Gasser family',
        p: 'From our farm you can explore Bolzano, hike in the South Tyrolean Alps and Dolomites, cycle through vineyards and orchards or visit “Ötzi”. And in the evening you can taste our own wine.',
        sign: ['We look forward to seeing you!', 'The Gasser family'],
        alt: 'The Gasser family in traditional dress',
      },
      rooms: { eyebrow: 'Rooms & prices', h2: 'Four categories, each with its own flair', note: 'Prices per room and night, minimum stay three nights.' },
      farm: {
        eyebrow: 'Farm & wine',
        h2: 'Wine, garden and animals',
        p: 'The farm dates from the late 19th century. We have been welcoming guests here since 2016 – in rooms we converted and designed ourselves.',
        alts: ['Our wine', 'Upper sun terrace', 'Our breakfast room'],
      },
      around: { eyebrow: 'Surroundings', h2: 'Art, culture and mountains nearby' },
      loc: { eyebrow: 'Getting here', h2: 'How to find us', alt: 'Brandlgut in the evening' },
    },
    cats: ['Art & culture', 'Leisure', 'Food & drink', 'Hiking', 'Winter sports', 'Markets'],
    address: ['Moritzinger Weg 63', '39100 Bolzano, Italy'],
    cta: { h2: 'When may we welcome you?', p: 'Your request is non-binding – we will reply promptly.' },
    footer: { family: 'The Gasser family', imprint: 'Legal notice', privacy: 'Privacy' },
    roomsPage: {
      title: 'Rooms and prices – Brandlgut', h1: 'Our rooms and prices', eyebrow: 'Rooms & prices',
      intro: 'Each room has its own flair. All of them come with antique furniture, a double bed made of Swiss pine or cherry wood, a modern bathroom with hairdryer, satellite TV, a safe, a fridge and Wi-Fi.',
      good: 'Good to know',
      spec: { guests: 'Guests', size: 'Size', outdoor: 'Outdoor', bath: 'Bathroom', kitchen: 'Kitchen' },
      specs: {
        standard: { outdoor: 'Balcony', bath: 'Shower' },
        superior: { outdoor: '2 balconies', bath: 'Shower' },
        deluxe: { outdoor: 'Garden terrace', bath: 'Shower' },
        suite: { outdoor: 'Large terrace', bath: 'Bathtub & shower', kitchen: 'fully equipped' },
      },
      policies: [
        ['Prices & breakfast', 'Prices are per room and night, for three nights or more. Breakfast is served daily from 8:00 to 10:00 a.m. for €18 per person.'],
        ['Arrival & departure', 'Check-in 5:00 – 8:00 p.m., check-out 9:00 – 10:30 a.m. Unannounced check-in after 8:00 p.m. costs €20 per hour. Arrival is not possible after 10:00 p.m.'],
        ['Children', 'Free up to the age of three, €15 per night from four to six. At breakfast, children from four to nine pay €4 less and toddlers nothing.'],
        ['Parking', 'A parking space is reserved for you. Please tell us in advance about larger vehicles; a trailer costs €3 per day.'],
        ['Non-smoking house', 'There is no smoking in the house or the rooms – you are welcome to smoke on your balcony or the terrace.'],
        ['Pets', 'Unfortunately we cannot accommodate pets: free-range chickens, dogs, cats and other small animals live on the farm.'],
        ['Cancellation', 'For cancellations fewer than 14 days before arrival, no-shows or early departures we charge 100 % of the total price.'],
        ['Cleaning & towels', 'On Sundays we clean the rooms on request only. Towels are changed every three days, more often for a surcharge.'],
      ],
    },
    homeTicks: {
      standard: ['Balcony', 'Shower'], superior: ['2 balconies', 'Shower'],
      deluxe: ['Garden terrace', 'Shower'], suite: ['Large terrace', 'Kitchen & bathtub'],
    },
    farmPage: {
      title: 'Our farm – Brandlgut', h1: 'Our farm', eyebrow: 'Farm & wine',
      intro: 'The Brandlgut farm was built in the late 19th century and we took it over in 2006. After several years of renovation we have been welcoming guests all year round since July 2016.',
      blocks: [
        ['Wine & garden', ['Our Lagrein grows on two hectares in a prime location. A smaller part of the farm is reserved for fruit and vegetables – apples, pears, cherries, cucumbers, pumpkins – for our guests and for ourselves.', 'Would you like to learn more about our work as winemakers? We are happy to show you around – just ask us.']],
        ['Breakfast', ['In the breakfast room, built entirely of spruce wood, the day starts with coffee, fresh rolls, local delicacies and eggs from our own hens. It is where we most enjoy talking to our guests.']],
        ['Terrace & lawn', ['The large shared terrace and the sunbathing lawn offer a wide view over the valley. Children have plenty of room to play, a play corner with a sandbox and a big swing – and anyone who likes playing with dogs will love Mira.']],
      ],
      gallery: 'Impressions of the farm',
      captions: ['Our Brandlgut', 'Brandlgut in the evening', 'Brandlgut in the snow', 'Upper sun terrace', 'Lower sun terrace', 'Fun for children', 'Our breakfast room', 'Homemade jams', 'Fresh fruit every day', 'Thila wants to play', 'Our chickens', 'One of our cats', 'Our wine', 'Historic tractor', 'Wayside cross'],
    },
    actPage: {
      title: 'Activities – Brandlgut', h1: 'Activities', eyebrow: 'Surroundings',
      intro: 'Art and culture, sport and good food: Bolzano and South Tyrol have a lot to offer. Here are our tips – with the distance from the farm.',
      note: 'Please check the seasonal opening hours.',
    },
    req: {
      title: 'Non-binding request – Brandlgut', h1: 'Non-binding request', eyebrow: 'Reservation',
      intro: 'Your request is non-binding and not yet a booking. We will promptly confirm your dates or suggest an alternative.',
      s1: 'Your request', s2: 'Your contact details',
      f: { arrival: 'Arrival', departure: 'Departure', room: 'Room category', adults: 'Adults', children: 'Children', salutation: 'Title', first: 'First name', last: 'Last name', address: 'Address', email: 'E-mail', phone: 'Phone', notes: 'Comments' },
      salutations: ['Mrs', 'Mr', 'Family', 'Not specified'],
      choose: 'Please choose', optional: 'optional',
      consent: ['I have read and accept the ', 'privacy policy', '.'],
      submit: 'Send request', reset: 'Reset form',
      err: { required: 'Please fill in', email: 'Please enter a valid e-mail', dates: 'Departure must be after arrival', consent: 'Please accept' },
      sum: { title: 'Your selection', estimate: 'Estimated room price', note: 'plus breakfast, non-binding', minStay: 'Minimum stay: 3 nights', empty: 'Please choose dates and room', stay: 'Stay' },
      ok: { h2: 'Thank you!', p: 'This is a preview: your request has not been sent yet. You can send it by e-mail with one click.', mail: 'Send by e-mail', again: 'New request', subject: 'Request via website' },
    },
    legal: { imprintTitle: 'Legal notice', privacyTitle: 'Data protection' },
  },

  it: {
    htmlLang: 'it', langName: 'Italiano', skip: 'Vai al contenuto',
    nav: { farm: 'Il nostro maso', rooms: 'Camere e prezzi', activities: 'Attività', contact: 'Contatti' },
    btn: {
      request: 'Invia richiesta', viewRooms: 'Vedi le camere', more: 'Scopri di più', allTips: 'Tutti i consigli',
      route: 'Indicazioni', details: 'Vedi dettagli', requestRoom: 'Richiedi camera',
      menu: 'Menu', close: 'Chiudi', prev: 'Indietro', next: 'Avanti',
    },
    unit: { night: 'notte', nights: 'notti', perNight: '/ notte', guests: 'persone', photo: 'Foto' },
    home: {
      title: 'Brandlgut – Maso vinicolo e camere a Bolzano',
      desc: 'Vacanza nel maso vinicolo della famiglia Gasser a Bolzano: quattro tipologie di camera, colazione al maso e vista sulla Mendola.',
      eyebrow: 'Maso vinicolo · Bolzano · Alto Adige',
      h1: ['Il vostro maso', 'a Bolzano'],
      lead: 'Soggiornate tra vigneti e frutteti, con vista sulla Mendola.',
      heroAlt: 'Il maso Brandlgut tra i vigneti, sullo sfondo le montagne',
      facts: [
        ['Vicino alla città', '4 km dal centro di Bolzano'],
        ['2 ettari di vigneto', 'Lagrein di nostra produzione'],
        ['Colazione al maso', 'con le uova delle nostre galline'],
        ['Parcheggio incluso', 'riservato alla vostra auto'],
      ],
      welcome: {
        eyebrow: 'I padroni di casa',
        h2: 'Benvenuti dalla famiglia Gasser',
        p: 'Dal nostro maso potete scoprire Bolzano, camminare sulle Alpi altoatesine e sulle Dolomiti, pedalare tra vigneti e frutteti o visitare “Ötzi”. E la sera vi aspetta un bicchiere del nostro vino.',
        sign: ['Vi aspettiamo!', 'La vostra famiglia Gasser'],
        alt: 'La famiglia Gasser in costume tradizionale',
      },
      rooms: { eyebrow: 'Camere e prezzi', h2: 'Quattro tipologie, ognuna con il suo stile', note: 'Prezzi per camera e notte, soggiorno minimo tre notti.' },
      farm: {
        eyebrow: 'Maso e vino',
        h2: 'Vino, orto e animali',
        p: 'Il maso risale alla fine del XIX secolo. Dal 2016 accogliamo qui i nostri ospiti – in camere che abbiamo ristrutturato e ideato noi stessi.',
        alts: ['Il nostro vino', 'Terrazza superiore', 'La sala colazioni'],
      },
      around: { eyebrow: 'Dintorni', h2: 'Arte, cultura e montagne a due passi' },
      loc: { eyebrow: 'Come arrivare', h2: 'Come trovarci', alt: 'Il Brandlgut di sera' },
    },
    cats: ['Arte e cultura', 'Tempo libero', 'Gastronomia', 'Escursioni', 'Sport invernali', 'Mercati'],
    address: ['Via San Maurizio 63', '39100 Bolzano, Italia'],
    cta: { h2: 'Quando possiamo accogliervi?', p: 'La richiesta non è vincolante – vi rispondiamo al più presto.' },
    footer: { family: 'Famiglia Gasser', imprint: 'Note legali', privacy: 'Privacy' },
    roomsPage: {
      title: 'Camere e prezzi – Brandlgut', h1: 'Le nostre camere e i prezzi', eyebrow: 'Camere e prezzi',
      intro: 'Ogni camera ha il suo stile. La dotazione comprende mobili antichi, letto matrimoniale in legno di cembro o ciliegio, bagno moderno con asciugacapelli, TV satellitare, cassaforte, frigo e Wi-Fi.',
      good: 'Buono a sapersi',
      spec: { guests: 'Persone', size: 'Superficie', outdoor: 'Esterno', bath: 'Bagno', kitchen: 'Cucina' },
      specs: {
        standard: { outdoor: 'Balcone', bath: 'Doccia' },
        superior: { outdoor: '2 balconi', bath: 'Doccia' },
        deluxe: { outdoor: 'Terrazzo sul giardino', bath: 'Doccia' },
        suite: { outdoor: 'Terrazzo grande', bath: 'Vasca da bagno', kitchen: 'completa' },
      },
      policies: [
        ['Prezzi e colazione', 'Prezzi per camera e notte, per almeno tre notti. La colazione è servita ogni giorno dalle 8:00 alle 10:00 e costa 18 € a persona.'],
        ['Arrivo e partenza', 'Check-in 17:00 – 20:00, check-out 9:00 – 10:30. Per arrivi non annunciati dopo le 20:00 applichiamo 20 € all’ora. Dopo le 22:00 non è più possibile arrivare.'],
        ['Bambini', 'Gratis fino a tre anni, da quattro a sei anni 15 € a notte. A colazione i bambini da quattro a nove anni pagano 4 € in meno, i più piccoli nulla.'],
        ['Parcheggio', 'Un posto auto è riservato per voi. Vi preghiamo di segnalare in anticipo i veicoli più grandi; un rimorchio costa 3 € al giorno.'],
        ['Vietato fumare', 'In casa e nelle camere non si fuma – sul vostro balcone o in terrazza volentieri.'],
        ['Animali domestici', 'Purtroppo non possiamo accogliere animali domestici: nel maso vivono galline in libertà, cani, gatti e altri piccoli animali.'],
        ['Disdetta', 'In caso di disdetta a meno di 14 giorni dall’arrivo, mancato arrivo o partenza anticipata addebitiamo il 100 % del prezzo totale.'],
        ['Pulizia e asciugamani', 'La domenica puliamo le camere solo su richiesta. Gli asciugamani si cambiano ogni tre giorni, più spesso con supplemento.'],
      ],
    },
    homeTicks: {
      standard: ['Balcone', 'Doccia'], superior: ['2 balconi', 'Doccia'],
      deluxe: ['Terrazzo sul giardino', 'Doccia'], suite: ['Terrazzo grande', 'Cucina e vasca'],
    },
    farmPage: {
      title: 'Il nostro maso – Brandlgut', h1: 'Il nostro maso', eyebrow: 'Maso e vino',
      intro: 'Il maso Brandlgut fu costruito nel XIX secolo e dal 2006 è gestito dalla nostra famiglia. Dopo alcuni anni di ristrutturazione, dal luglio 2016 accogliamo ospiti tutto l’anno.',
      blocks: [
        ['Vino e orto', ['Su due ettari in posizione privilegiata cresce l’uva del nostro Lagrein. Una piccola parte del maso è dedicata a frutta e verdura – mele, pere, ciliegie, cetrioli, zucche – per i nostri ospiti e per noi.', 'Volete saperne di più sul lavoro del viticoltore? Chiedeteci pure: vi mostriamo volentieri il maso.']],
        ['Colazione', ['Nella sala colazioni, costruita interamente in legno di abete, la giornata comincia con caffè, pane fresco, prelibatezze locali e le uova delle nostre galline. È qui che amiamo chiacchierare con i nostri ospiti.']],
        ['Terrazza e prato', ['La grande terrazza comune e il prato offrono un’ampia vista sulla valle. I bambini hanno tanto spazio per giocare, un angolo giochi con sabbiera e una grande altalena – e chi ama giocare con i cani adorerà Thila e Mira.']],
      ],
      gallery: 'Impressioni dal maso',
      captions: ['Il nostro Brandlgut', 'Il Brandlgut di sera', 'Il Brandlgut sotto la neve', 'Terrazza superiore', 'Terrazza inferiore', 'Divertimento per i bambini', 'La sala colazioni', 'Marmellate fatte in casa', 'Frutta fresca ogni giorno', 'Thila vuole giocare', 'Le nostre galline', 'Uno dei nostri gatti', 'Il nostro vino', 'Trattore storico', 'Crocifisso'],
    },
    actPage: {
      title: 'Attività – Brandlgut', h1: 'Attività', eyebrow: 'Dintorni',
      intro: 'Arte e cultura, sport e buona cucina: Bolzano e l’Alto Adige hanno molto da offrire. Ecco i nostri consigli – con la distanza dal maso.',
      note: 'Vi preghiamo di verificare gli orari di apertura stagionali.',
    },
    req: {
      title: 'Richiesta non vincolante – Brandlgut', h1: 'Richiesta non vincolante', eyebrow: 'Prenotazione',
      intro: 'La richiesta non è vincolante e non è ancora una prenotazione. Vi confermeremo al più presto le date o vi proporremo un’alternativa.',
      s1: 'La vostra richiesta', s2: 'I vostri dati di contatto',
      f: { arrival: 'Arrivo', departure: 'Partenza', room: 'Tipologia di camera', adults: 'Adulti', children: 'Bambini', salutation: 'Titolo', first: 'Nome', last: 'Cognome', address: 'Indirizzo', email: 'E-mail', phone: 'Telefono', notes: 'Note' },
      salutations: ['Sig.ra', 'Sig.', 'Famiglia', 'Non specificato'],
      choose: 'Selezionare', optional: 'facoltativo',
      consent: ['Ho letto e accetto l’', 'informativa sulla privacy', '.'],
      submit: 'Invia richiesta', reset: 'Reimposta',
      err: { required: 'Campo obbligatorio', email: 'Inserire un’e-mail valida', dates: 'La partenza deve seguire l’arrivo', consent: 'Accettare per continuare' },
      sum: { title: 'La vostra scelta', estimate: 'Prezzo stimato della camera', note: 'colazione esclusa, non vincolante', minStay: 'Soggiorno minimo: 3 notti', empty: 'Scegliere date e camera', stay: 'Soggiorno' },
      ok: { h2: 'Grazie!', p: 'Questa è un’anteprima: la richiesta non è ancora stata inviata. Potete inviarla via e-mail con un clic.', mail: 'Invia via e-mail', again: 'Nuova richiesta', subject: 'Richiesta dal sito web' },
    },
    legal: { imprintTitle: 'Note legali', privacyTitle: 'Privacy' },
  },
};
