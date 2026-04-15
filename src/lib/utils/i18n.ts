/* ──────────────────────────────────────────────────────────
   i18n — Bilingual translation system (EN / PL)
   ────────────────────────────────────────────────────────── */

type Locale = 'en' | 'pl' | 'ko';
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
    'dishes.kobe.desc': 'A5 striploin tempered slowly, kissed over binchotan for seconds, then finished with sea salt and fresh wasabi.',
    'dishes.gejang.name': 'Ganjang Gejang',
    'dishes.gejang.desc': 'A Seoul coastal classic. Blue crab cured for 72 hours in soy, kelp, and citrus until the flesh turns silk-soft.',
    'dishes.samgyeopsal.name': 'Heritage Samgyeopsal',
    'dishes.samgyeopsal.desc': 'Heritage pork belly, cut thick and grilled tableside, meant to be wrapped with ssamjang, herbs, and warm rice.',
    'dishes.bulgogi.name': 'Wagyu Bulgogi',
    'dishes.bulgogi.desc': 'Inspired by old Seoul bulgogi houses: wagyu sliced thin, marinated in pear and soy, then flashed over charcoal.',
    'dishes.galbi.name': 'Galbi-jjim',
    'dishes.galbi.desc': 'Short ribs braised low for eight hours in stock, soy, and aromatics until the glaze turns dark, rich, and glossy.',
    'dishes.japchae.name': 'Japchae',
    'dishes.japchae.desc': 'Once reserved for Korean royal banquets, glass noodles are tossed to order with vegetables and toasted sesame oil.',
    'dishes.doenjang.name': 'Doenjang Jjigae',
    'dishes.doenjang.desc': 'House-fermented soybean stew built patiently with anchovy stock, tofu, and vegetables for deep everyday comfort.',

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
    'hero.word1': 'ESENCJA.',
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
    'process.step2.title': 'SKŁADNIKI',
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
    'dishes.kobe.desc': 'A5 striploin odpoczywa do temperatury serwisu, trafia nad binchotan tylko na chwilę i wykańczany jest solą morską oraz świeżym wasabi.',
    'dishes.gejang.name': 'Ganjang Gejang',
    'dishes.gejang.desc': 'Klasyk koreańskiego wybrzeża. Krab dojrzewa 72 godziny w sosie sojowym z kombu i cytrusami, aż mięso staje się jedwabiście miękkie.',
    'dishes.samgyeopsal.name': 'Heritage Samgyeopsal',
    'dishes.samgyeopsal.desc': 'Grubo cięty boczek z wieprzowiny heritage grillowany przy stole, podawany do zawijania z ssamjang, ziołami i ciepłym ryżem.',
    'dishes.bulgogi.name': 'Wagyu Bulgogi',
    'dishes.bulgogi.desc': 'Ukłon w stronę dawnych domów bulgogi w Seulu: cienko krojone wagyu marynowane w gruszce i soi, krótko opalane nad węglem.',
    'dishes.galbi.name': 'Galbi-jjim',
    'dishes.galbi.desc': 'Żeberka duszone osiem godzin w wywarze, sosie sojowym i aromatach, aż sos staje się ciemny, lśniący i głęboki.',
    'dishes.japchae.name': 'Japchae',
    'dishes.japchae.desc': 'Danie niegdyś obecne na królewskich ucztach. Makaron ze słodkich ziemniaków mieszany na bieżąco z warzywami i prażonym olejem sezamowym.',
    'dishes.doenjang.name': 'Doenjang Jjigae',
    'dishes.doenjang.desc': 'Domowy jjigae na fermentowanej paście sojowej, budowany cierpliwie na wywarze z anchois, tofu i warzywach dla codziennego comfort food.',

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

  ko: {
    /* ── Navbar ── */
    'nav.fire': '불 (Fire)',
    'nav.craft': '공예 (Craft)',
    'nav.signature': '시그니처 (Signature)',
    'nav.atmosphere': '분위기 (Atmosphere)',
    'nav.menu': '메뉴 (Menu)',
    'nav.reserve': '예약 (Reserve)',

    /* ── Hero ── */
    'hero.tagline': 'HWA / 火',
    'hero.brandSub': '프리미엄 코리안 바베큐',
    'hero.word1': '본질.',
    'hero.word2': '불.',
    'hero.word3': '영혼.',
    'hero.word4': '맛.',
    'hero.subtitle': '서울의 정수를 경험하세요. 재해석된 전통의 맛. 주방은 무대이며, 우리는 이야기꾼입니다.',
    'hero.scrollCue': '스크롤하여 탐색',

    /* ── Typography / Brand Statement ── */
    'typo.line1': '불이 맛을',
    'typo.line2': '정의하고.',
    'typo.line3': '시간이 깊이를 더한다.',
    'typo.body': "HWA에서는 모든 컷이 의도적입니다. 모든 불꽃은 통제됩니다. 우리는 요리하지 않고 작곡합니다. 전통적입니다. 발효되었습니다. 직화로 구웠습니다. 우리는 살아있는 불 위에서 굽는 원초적인 예술을 수용합니다.",

    /* ── Split / Philosophy ── */
    'split.label': '우리의 철학',
    'split.heading': '불에서 태어나\n인내로\n만들어지다.',
    'split.body': 'HWA의 모든 요리는 존중에서 시작됩니다. 식재료, 기술, 그리고 그것이 테이블에 도달하는 순간에 대한 존중입니다. 우리는 최고의 맛은 발명되는 것이 아니라, 열과 시간을 통해 천천히 발견되는 것이라고 믿습니다.',

    /* ── Process ── */
    'process.step1.title': '불',
    'process.step1.desc': '수백 년 된 일본식 가마에서 만든 비장탄. 식재료 본연의 맛을 살려주는 순수하고 깨끗한 열.',
    'process.step2.title': '식재료',
    'process.step2.desc': '45일 건식 숙성육. 산지 농장의 전통 흑돼지. 모든 식재료는 우연이 아닌 철저한 선택입니다.',
    'process.step3.title': '정밀함',
    'process.step3.desc': '온도, 타이밍, 두께 — 1도 단위까지 통제됩니다. 그릴은 단순한 도구가 아니라 우리의 악기입니다.',
    'process.step4.title': '서빙',
    'process.step4.desc': '그릴에서 접시까지 단 몇 초. 여전히 소리가 나고 향기가 피어오를 때. 바로 이 순간입니다.',

    /* ── Chaos ── */
    'chaos.big1': '맛.',
    'chaos.big2': '연기.',
    'chaos.big3': '원초적인 에너지.',
    'chaos.small': '전통. 발효. 직화. 우리는 살아있는 불 위에서 굽는 원초적인 예술을 포용합니다. 결코 잠들지 않는 도시 — 결코 식지 않는 그릴.',

    /* ── Dishes ── */
    'dishes.label': '시그니처 컬렉션',
    'dishes.heading': '우리의 식탁.',
    'dishes.kobe.name': '고베 A5 스트립로인',
    'dishes.kobe.desc': 'A5 스트립로인을 천천히 온도 맞춘 뒤 비장탄 위에서 몇 초만 구워 천일염과 생와사비로 마무리합니다.',
    'dishes.gejang.name': '간장게장',
    'dishes.gejang.desc': '서울에서도 사랑받는 해안의 고전. 꽃게를 간장, 다시마, 감귤 향과 함께 72시간 숙성해 살을 비단처럼 부드럽게 만듭니다.',
    'dishes.samgyeopsal.name': '전통 삼겹살',
    'dishes.samgyeopsal.desc': '두껍게 썬 헤리티지 삼겹살을 테이블에서 구워 수제 쌈장, 허브, 따뜻한 밥과 함께 싸 먹도록 냅니다.',
    'dishes.bulgogi.name': '와규 불고기',
    'dishes.bulgogi.desc': '옛 서울 불고기집에서 영감을 받은 방식으로, 얇게 썬 와규를 배와 간장에 재운 뒤 숯불에 빠르게 올립니다.',
    'dishes.galbi.name': '갈비찜',
    'dishes.galbi.desc': '소갈비를 육수, 간장, 향채와 함께 8시간 동안 천천히 조려 윤기 있고 깊은 맛의 글레이즈를 만듭니다.',
    'dishes.japchae.name': '잡채',
    'dishes.japchae.desc': '한때 궁중 잔칫상에 오르던 요리로, 고구마 당면을 채소와 함께 즉석에서 볶아 고소한 참기름으로 마무리합니다.',
    'dishes.doenjang.name': '된장찌개',
    'dishes.doenjang.desc': '집에서 끓이듯 천천히 쌓아 올린 된장찌개로, 멸치 육수와 두부, 채소가 일상의 깊은 위로를 만듭니다.',

    /* ── Closeups ── */
    'closeups.focusLabel': '초점',
    'closeups.item1': '그릴',
    'closeups.item2': '질감',
    'closeups.item3': '디테일',

    /* ── Atmosphere ── */
    'atmos.heading': '공간.',
    'atmos.subtitle': '접시 위의 요리에만 집중할 수 있도록 디자인되었습니다. 아늑하고 따뜻하며, 타협 없이 어둡습니다.',

    /* ── Grid Breaker ── */
    'grid.floatingText': '모든\n디테일.',

    /* ── Menu ── */
    'menu.label': '메뉴 미리보기',
    'menu.heading': '선택.',
    'menu.kobe.desc': '45일 건식 숙성, 천일염 마무리',
    'menu.samgyeopsal.desc': '산지 흑돼지, 수제 쌈장',
    'menu.bulgogi.desc': '배-간장 마리네이드, 비장탄 구이',
    'menu.gejang.desc': '생꽃게, 3일 간장 숙성',
    'menu.galbi.desc': '8시간 브레이징한 소갈비',
    'menu.japchae.desc': '고구마 당면, 제철 채소',
    'menu.doenjang.desc': '전통 된장 스튜',

    /* ── Final Statement ── */
    'final.heading': '영혼은 불에서\n태어난다.',
    'final.subtitle': '의식. 모임. 불꽃, 음식, 그리고 사람이 하나가 되는 순간. 이것은 식당이 아닙니다 — 경험입니다.',

    /* ── CTA / Reservation ── */
    'cta.heading': '그릴에서 만납시다.',
    'cta.location.label': '위치',
    'cta.location.value': 'ul. Mokotowska 1, Warszawa',
    'cta.hours.label': '영업 시간',
    'cta.hours.value': '화 — 일: 17:00 — 23:00',
    'cta.form.name': '이름',
    'cta.form.email': '이메일 주소',
    'cta.form.phone': '전화번호',
    'cta.form.date': '선호하는 날짜',
    'cta.form.time': '선호하는 시간',
    'cta.form.timePlaceholder': '시간 선택',
    'cta.form.guests': '방문 인원',
    'cta.form.guestsPlaceholder': '인원 선택',
    'cta.form.special': '특별 요청 사항',
    'cta.form.specialPlaceholder': '알레르기, 식단 요청, 기념일...',
    'cta.form.submit': '테이블 예약',
    'cta.form.sending': '전송 중...',
    'cta.form.successHeading': '예약 요청 전송됨',
    'cta.form.successText': "24시간 이내에 예약을 확정해 드립니다.",
    'cta.form.errorGeneric': '문제가 발생했습니다. 다시 시도해 주세요.',
    'cta.form.errorRateLimit': '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.',
    'cta.err.name': '이름을 입력해주세요',
    'cta.err.email': '유효한 이메일을 입력해주세요',
    'cta.err.phone': '유효한 전화번호를 입력해주세요',
    'cta.err.date': '미래의 날짜를 선택해주세요',
    'cta.err.time': '시간을 선택해주세요',
    'cta.err.guests': '방문 인원을 선택해주세요',
    'cta.guest': '명',
    'cta.guests': '명',
  },
};

/**
 * Look up a static UI string from the translation dictionary.
 * Falls back: requested locale → English → key itself.
 */
export function d(key: string, lang: string = 'en'): string {
  const locale: Locale = lang === 'pl' ? 'pl' : lang === 'ko' ? 'ko' : 'en';
  return dict[locale]?.[key] ?? dict.en?.[key] ?? key;
}

/**
 * Resolve a Sanity localized field object ({ en, pl }).
 * Falls back: requested locale → English → empty string.
 */
export const t = (field: Partial<Record<Locale, string>> | null | undefined, lang: string): string => {
  const locale: Locale = lang === 'pl' ? 'pl' : lang === 'ko' ? 'ko' : 'en';
  return field?.[locale] || field?.en || '';
};
