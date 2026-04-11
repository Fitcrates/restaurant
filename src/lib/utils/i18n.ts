/* ──────────────────────────────────────────────────────────
   i18n — Bilingual translation system (EN / PL)
   ────────────────────────────────────────────────────────── */

type Locale = 'en' | 'pl';
type Dict = Record<string, Record<string, string>>;

const dict: Dict = {
  en: {
    /* ── Navbar ── */
    'nav.fire': 'Fire',
    'nav.craft': 'Craft',
    'nav.signature': 'Signature',
    'nav.atmosphere': 'Atmosphere',
    'nav.menu': 'Menu',
    'nav.reserve': 'Reserve',

    /* ── Hero ── */
    'hero.tagline': 'HWA / 火',
    'hero.brandSub': 'Premium Korean BBQ',
    'hero.word1': 'RAW.',
    'hero.word2': 'FIRE.',
    'hero.word3': 'SOUL.',
    'hero.word4': 'FLAVOR.',
    'hero.subtitle': 'Experience the essence of Seoul. Traditional flavors, reimagined. The kitchen is a stage — we are storytellers.',
    'hero.scrollCue': 'SCROLL TO EXPLORE',

    /* ── Typography / Brand Statement ── */
    'typo.line1': 'FIRE DEFINES',
    'typo.line2': 'flavor.',
    'typo.line3': 'TIME DEFINES DEPTH.',
    'typo.body': "At HWA, every cut is deliberate. Every flame is controlled. We don't cook — we compose. Authentic. Fermented. Scorched. We embrace the elemental art of grilling over live fire.",

    /* ── Split / Philosophy ── */
    'split.label': 'Our Philosophy',
    'split.heading': 'BORN FROM\nFIRE, SHAPED\nBY PATIENCE.',
    'split.body': 'Every dish at HWA begins with respect — for the ingredient, the technique, and the moment it reaches your table. We believe the best flavors are not invented. They are revealed, slowly, through heat and time.',

    /* ── Process ── */
    'process.step1.title': 'FIRE',
    'process.step1.desc': 'Binchotan charcoal from centuries-old Japanese kilns. Pure, clean heat that lets the ingredient speak.',
    'process.step2.title': 'INGREDIENT',
    'process.step2.desc': '45-day dry-aged cuts. Heritage pork from mountain farms. Every ingredient is selected, never settled for.',
    'process.step3.title': 'PRECISION',
    'process.step3.desc': 'Temperature, timing, thickness — controlled to the degree. The grill is our instrument, not our tool.',
    'process.step4.title': 'SERVE',
    'process.step4.desc': 'From grill to plate in seconds. The sear still singing. The aroma still rising. This is the moment.',

    /* ── Chaos ── */
    'chaos.big1': 'TASTE.',
    'chaos.big2': 'SMOKE.',
    'chaos.big3': 'RAW ENERGY.',
    'chaos.small': 'Authentic. Fermented. Scorched. We embrace the elemental art of grilling over live fire. A city that never sleeps — a grill that never cools.',

    /* ── Dishes ── */
    'dishes.label': 'Signature Collection',
    'dishes.heading': 'OUR TABLE.',
    'dishes.kobe.name': 'Kobe A5 Striploin',
    'dishes.kobe.desc': 'Uncompromising marbling, served with local sea salt and wasabi.',
    'dishes.gejang.name': 'Ganjang Gejang',
    'dishes.gejang.desc': 'Raw crab marinated in artisanal soy sauce for 3 days.',
    'dishes.samgyeopsal.name': 'Heritage Samgyeopsal',
    'dishes.samgyeopsal.desc': 'Thick-cut mountain pork belly with house-made ssamjang.',
    'dishes.bulgogi.name': 'Wagyu Bulgogi',
    'dishes.bulgogi.desc': 'Marinated in pear and soy. Grilled over binchotan.',
    'dishes.galbi.name': 'Galbi-jjim',
    'dishes.galbi.desc': 'Slow-braised short ribs. 8 hours. Complex and tender.',
    'dishes.japchae.name': 'Japchae',
    'dishes.japchae.desc': 'Sweet potato noodles with seasonal vegetables, sesame oil finish.',
    'dishes.doenjang.name': 'Doenjang Jjigae',
    'dishes.doenjang.desc': 'Fermented soybean stew. Deep, earthy, comforting.',

    /* ── Closeups ── */
    'closeups.focusLabel': 'FOCUS',
    'closeups.item1': 'The Grill',
    'closeups.item2': 'Texture',
    'closeups.item3': 'Detail',

    /* ── Atmosphere ── */
    'atmos.heading': 'THE SPACE.',
    'atmos.subtitle': "Designed so nothing distracts from what's on your plate. Intimate. Warm. Unapologetically dark.",

    /* ── Grid Breaker ── */
    'grid.floatingText': 'EVERY\nDETAIL.',

    /* ── Menu ── */
    'menu.label': 'Menu Preview',
    'menu.heading': 'A Selection.',
    'menu.kobe.desc': 'Dry-aged 45 days, sea salt finish',
    'menu.samgyeopsal.desc': 'Mountain pork, house ssamjang',
    'menu.bulgogi.desc': 'Pear-soy marinade, binchotan grilled',
    'menu.gejang.desc': 'Raw crab, 3-day soy cure',
    'menu.galbi.desc': '8-hour braised short rib',
    'menu.japchae.desc': 'Sweet potato noodles, seasonal vegetables',
    'menu.doenjang.desc': 'Fermented soybean stew',

    /* ── Final Statement ── */
    'final.heading': 'THE SOUL IS\nBORN FROM FIRE.',
    'final.subtitle': "A ritual. A gathering. A moment where flame, food, and people become one. This is not a restaurant — it's an experience.",

    /* ── CTA / Reservation ── */
    'cta.heading': 'Meet us at the grill.',
    'cta.location.label': 'Location',
    'cta.location.value': 'ul. Mokotowska 1, Warszawa',
    'cta.hours.label': 'Hours',
    'cta.hours.value': 'Tue — Sun: 17:00 — 23:00',
    'cta.form.name': 'Your Name',
    'cta.form.email': 'Email Address',
    'cta.form.phone': 'Phone Number',
    'cta.form.date': 'Preferred Date',
    'cta.form.time': 'Preferred Time',
    'cta.form.timePlaceholder': 'Select time',
    'cta.form.guests': 'Number of Guests',
    'cta.form.guestsPlaceholder': 'Select',
    'cta.form.special': 'Special Requests',
    'cta.form.specialPlaceholder': 'Allergies, dietary needs, celebrations...',
    'cta.form.submit': 'Reserve a Table',
    'cta.form.sending': 'Sending...',
    'cta.form.successHeading': 'Reservation Request Sent',
    'cta.form.successText': "We'll confirm your table within 24 hours.",
    'cta.form.errorGeneric': 'Something went wrong. Please try again.',
    'cta.form.errorRateLimit': 'Too many requests. Please wait a moment.',
    'cta.err.name': 'Name is required',
    'cta.err.email': 'Valid email is required',
    'cta.err.phone': 'Valid phone number is required',
    'cta.err.date': 'Please select a future date',
    'cta.err.time': 'Please select a time',
    'cta.err.guests': 'Please select number of guests',
    'cta.guest': 'guest',
    'cta.guests': 'guests',
  },

  pl: {
    /* ── Navbar ── */
    'nav.fire': 'Ogień',
    'nav.craft': 'Rzemiosło',
    'nav.signature': 'Dania',
    'nav.atmosphere': 'Atmosfera',
    'nav.menu': 'Menu',
    'nav.reserve': 'Rezerwacja',

    /* ── Hero ── */
    'hero.tagline': 'HWA / 火',
    'hero.brandSub': 'Koreański Grill Premium',
    'hero.word1': 'SUROWE.',
    'hero.word2': 'OGIEŃ.',
    'hero.word3': 'DUSZA.',
    'hero.word4': 'SMAK.',
    'hero.subtitle': 'Doświadcz esencji Seulu. Tradycyjne smaki, na nowo odkryte. Kuchnia jest sceną — my jesteśmy narratorami.',
    'hero.scrollCue': 'PRZEWIŃ, ABY ODKRYĆ',

    /* ── Typography / Brand Statement ── */
    'typo.line1': 'OGIEŃ DEFINIUJE',
    'typo.line2': 'smak.',
    'typo.line3': 'CZAS NADAJE GŁĘBIĘ.',
    'typo.body': 'W HWA każde cięcie jest zamierzone. Każdy płomień kontrolowany. Nie gotujemy — komponujemy. Autentycznie. Fermentowane. Przypalone. Celebrujemy elementarną sztukę grillowania na żywym ogniu.',

    /* ── Split / Philosophy ── */
    'split.label': 'Nasza Filozofia',
    'split.heading': 'ZRODZONE\nZ OGNIA,\nUKSZTAŁTOWANE\nCIERPLIWOŚCIĄ.',
    'split.body': 'Każde danie w HWA zaczyna się od szacunku — do składnika, techniki i chwili, gdy trafia na Twój stół. Wierzymy, że najlepsze smaki nie są wymyślane. Są odkrywane, powoli, przez żar i czas.',

    /* ── Process ── */
    'process.step1.title': 'OGIEŃ',
    'process.step1.desc': 'Węgiel drzewny binchotan z wielowiekowych japońskich pieców. Czyste, naturalne ciepło, które pozwala składnikowi przemówić.',
    'process.step2.title': 'SKŁADNIK',
    'process.step2.desc': '45-dniowe dojrzewanie. Wieprzowina z górskich hodowli. Każdy składnik jest wyselekcjonowany, nigdy przypadkowy.',
    'process.step3.title': 'PRECYZJA',
    'process.step3.desc': 'Temperatura, czas, grubość — kontrolowane co do stopnia. Grill jest naszym instrumentem, nie narzędziem.',
    'process.step4.title': 'PODANIE',
    'process.step4.desc': 'Z grilla na talerz w sekundy. Skwierczenie wciąż słyszalne. Aromat wciąż unoszący się. To jest ta chwila.',

    /* ── Chaos ── */
    'chaos.big1': 'SMAK.',
    'chaos.big2': 'DYM.',
    'chaos.big3': 'SUROWA ENERGIA.',
    'chaos.small': 'Autentycznie. Fermentowane. Przypalone. Celebrujemy elementarną sztukę grillowania na żywym ogniu. Miasto, które nigdy nie śpi — grill, który nigdy nie stygnie.',

    /* ── Dishes ── */
    'dishes.label': 'Kolekcja Szefa Kuchni',
    'dishes.heading': 'NASZ STÓŁ.',
    'dishes.kobe.name': 'Kobe A5 Striploin',
    'dishes.kobe.desc': 'Niezrównany marmur, podawany z morską solą i wasabi.',
    'dishes.gejang.name': 'Ganjang Gejang',
    'dishes.gejang.desc': 'Surowy krab marynowany w rzemieślniczym sosie sojowym przez 3 dni.',
    'dishes.samgyeopsal.name': 'Heritage Samgyeopsal',
    'dishes.samgyeopsal.desc': 'Grubo krojony boczek z górskiej wieprzowiny z domowym ssamjang.',
    'dishes.bulgogi.name': 'Wagyu Bulgogi',
    'dishes.bulgogi.desc': 'Marynowany w gruszce i soi. Grillowany na binchotanie.',
    'dishes.galbi.name': 'Galbi-jjim',
    'dishes.galbi.desc': 'Wolno duszone żeberka. 8 godzin. Złożony i kruchy smak.',
    'dishes.japchae.name': 'Japchae',
    'dishes.japchae.desc': 'Makaron ze słodkich ziemniaków z sezonowymi warzywami, wykończony olejem sezamowym.',
    'dishes.doenjang.name': 'Doenjang Jjigae',
    'dishes.doenjang.desc': 'Gulasz z fermentowanej pasty sojowej. Głęboki, ziemisty, kojący.',

    /* ── Closeups ── */
    'closeups.focusLabel': 'KADR',
    'closeups.item1': 'Grill',
    'closeups.item2': 'Tekstura',
    'closeups.item3': 'Detal',

    /* ── Atmosphere ── */
    'atmos.heading': 'PRZESTRZEŃ.',
    'atmos.subtitle': 'Zaprojektowana tak, by nic nie odciągało uwagi od tego, co na talerzu. Kameralna. Ciepła. Bezkompromisowo mroczna.',

    /* ── Grid Breaker ── */
    'grid.floatingText': 'KAŻDY\nDETAL.',

    /* ── Menu ── */
    'menu.label': 'Podgląd Menu',
    'menu.heading': 'Wybór.',
    'menu.kobe.desc': 'Dojrzewany 45 dni, wykończony morską solą',
    'menu.samgyeopsal.desc': 'Wieprzowina górska, domowy ssamjang',
    'menu.bulgogi.desc': 'Marynata gruszkowa, grillowany na binchotanie',
    'menu.gejang.desc': 'Surowy krab, 3-dniowa marynata sojowa',
    'menu.galbi.desc': '8-godzinne duszone żeberka',
    'menu.japchae.desc': 'Makaron ze słodkich ziemniaków, sezonowe warzywa',
    'menu.doenjang.desc': 'Gulasz z fermentowanej pasty sojowej',

    /* ── Final Statement ── */
    'final.heading': 'DUSZA RODZI SIĘ\nZ OGNIA.',
    'final.subtitle': 'Rytuał. Spotkanie. Chwila, w której płomień, jedzenie i ludzie stają się jednym. To nie restauracja — to doświadczenie.',

    /* ── CTA / Reservation ── */
    'cta.heading': 'Spotkajmy się przy grillu.',
    'cta.location.label': 'Lokalizacja',
    'cta.location.value': 'ul. Mokotowska 1, Warszawa',
    'cta.hours.label': 'Godziny Otwarcia',
    'cta.hours.value': 'Wt — Nd: 17:00 — 23:00',
    'cta.form.name': 'Twoje Imię',
    'cta.form.email': 'Adres Email',
    'cta.form.phone': 'Numer Telefonu',
    'cta.form.date': 'Preferowana Data',
    'cta.form.time': 'Preferowana Godzina',
    'cta.form.timePlaceholder': 'Wybierz godzinę',
    'cta.form.guests': 'Liczba Gości',
    'cta.form.guestsPlaceholder': 'Wybierz',
    'cta.form.special': 'Specjalne Życzenia',
    'cta.form.specialPlaceholder': 'Alergie, wymagania dietetyczne, uroczystości...',
    'cta.form.submit': 'Zarezerwuj Stolik',
    'cta.form.sending': 'Wysyłanie...',
    'cta.form.successHeading': 'Prośba o Rezerwację Wysłana',
    'cta.form.successText': 'Potwierdzimy Twój stolik w ciągu 24 godzin.',
    'cta.form.errorGeneric': 'Coś poszło nie tak. Spróbuj ponownie.',
    'cta.form.errorRateLimit': 'Za dużo prób. Proszę poczekać chwilę.',
    'cta.err.name': 'Imię jest wymagane',
    'cta.err.email': 'Wymagany poprawny adres email',
    'cta.err.phone': 'Wymagany poprawny numer telefonu',
    'cta.err.date': 'Proszę wybrać przyszłą datę',
    'cta.err.time': 'Proszę wybrać godzinę',
    'cta.err.guests': 'Proszę wybrać liczbę gości',
    'cta.guest': 'gość',
    'cta.guests': 'gości',
  },
};

/**
 * Look up a static UI string from the translation dictionary.
 * Falls back: requested locale → English → key itself.
 */
export function d(key: string, lang: string = 'en'): string {
  const locale: Locale = lang === 'pl' ? 'pl' : 'en';
  return dict[locale]?.[key] ?? dict.en?.[key] ?? key;
}

/**
 * Resolve a Sanity localized field object ({ en, pl }).
 * Falls back: requested locale → English → empty string.
 */
export const t = (field: any, lang: string): string => {
  return field?.[lang] || field?.en || '';
};
