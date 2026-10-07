export type Language = 'ru' | 'kz' | 'uz';

export interface Translations {
  music: {
    label: string;
    playTitle: string;
    pauseTitle: string;
  };
  section1: {
    photoMereyAlt: string;
    photoManasAlt: string;
    captionMerey: string;
    captionManas: string;
    heading: string;
    p1_1: string;
    p1_2: string;
    p2_1: string;
    p2_2: string;
    p3_1: string;
    p3_2: string;
    p3_3: string;
    p4_1: string;
    p4_2: string;
    dateLabel: string;
    dateValue: string;
    withLove: string;
    drawnCoupleAlt: string;
  };
  timing: {
    title: string;
    subtitle: string;
    banquetTime: string;
    banquetDesc: string;
  };
  location: {
    title: string;
    venueName: string;
    address: string;
    openMapBtn: string;
    yandexLink: string;
    mapIframeTitle: string;
  };
  wishes: {
    title: string;
    p1_1: string;
    p1_2: string;
    p1_3: string;
    p1_4: string;
    p1_5: string;
    p1_6: string;
    p2_1: string;
    p2_2: string;
    p2_3: string;
    p2_4: string;
    p2_5: string;
    p2_6: string;
  };
  rsvp: {
    title1: string;
    title2: string;
    subtitle1: string;
    subtitle2: string;
    deadline: string;
    attendanceLabel: string;
    optionWillAttend: string;
    optionWithPlusOne: string;
    optionCannotAttend: string;
    nameLabel: string;
    nameHelp: string;
    namePlaceholder: string;
    errorRequired: string;
    submitBtn: string;
    submittingBtn: string;
    thankYouTitle: string;
    thankYouAccepted: (names: string) => string;
    thankYouDeclined: (names: string) => string;
    editResponseBtn: string;
  };
  calendar: {
    monthTitle: string;
    weekdays: string[];
    timerTitle: string;
    timerSubtitle: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  intro: {
    title: string;
    date: string;
    openBtn: string;
    musicHint: string;
    skip: string;
  };
  scrollDown: string;
}

export const translations: Record<Language, Translations> = {
  ru: {
    scrollDown: 'Листайте вниз',
    intro: {
      title: 'Пригласительное от Манаса и Мерей...',
      date: '22 октября 2026',
      openBtn: 'Открыть',
      musicHint: 'включится музыка',
      skip: 'Пропустить',
    },
    music: {
      label: 'Музыка',
      playTitle: 'Включить фоновую музыку',
      pauseTitle: 'Выключить музыку',
    },
    section1: {
      photoMereyAlt: 'Мерей в детстве',
      photoManasAlt: 'Манас в детстве',
      captionMerey: 'Мерей',
      captionManas: 'Манас',
      heading: 'Узнали этих ребятишек?',
      p1_1: 'Да-да, это мы! Время пролетело так',
      p1_2: 'быстро, представляете?',
      p2_1: 'И вот мы повзрослели и приняли',
      p2_2: 'решение, что пора жениться!',
      p3_1: 'Приглашаем вас присоединиться к',
      p3_2: 'нашему первому семейному празднику —',
      p3_3: 'нашей свадьбе!',
      p4_1: 'Будем рады, если это событие вы',
      p4_2: 'разделите вместе с нами.',
      dateLabel: 'СВАДЬБА СОСТОИТСЯ:',
      dateValue: '22 октября',
      withLove: 'С любовью, Манас и Мерей!',
      drawnCoupleAlt: 'Нарисованная пара — Манас и Мерей',
    },
    timing: {
      title: 'Время',
      subtitle: 'Будем счастливы разделить этот праздничный вечер вместе с вами!',
      banquetTime: '— 18:00 Начало банкета',
      banquetDesc: 'Tinchlik Plaza, танцы, веселье и любовь',
    },
    location: {
      title: 'Локация',
      venueName: 'Tinchlik Plaza',
      address: 'Навои, Yoshlik Street, 70',
      openMapBtn: 'Открыть карту',
      yandexLink: 'Открыть в Яндекс Картах',
      mapIframeTitle: 'Локация Tinchlik Plaza на Google Maps',
    },
    wishes: {
      title: 'Пожелания',
      p1_1: 'Дорогие гости! Наш праздник',
      p1_2: 'пройдёт в формате 16+. Просим вас',
      p1_3: 'провести этот вечер во взрослой',
      p1_4: 'компании и оставить детей дома,',
      p1_5: 'чтобы отдохнуть и насладиться',
      p1_6: 'атмосферой торжества.',
      p2_1: 'Пожалуйста, воздержитесь от покупки',
      p2_2: 'цветов — в путешествии мы не успеем',
      p2_3: 'насладиться их красотой. Мы будем искренне',
      p2_4: 'признательны, если ваши пожелания',
      p2_5: 'поместятся в небольшом конверте,',
      p2_6: 'который поможет осуществить нашу мечту.',
    },
    rsvp: {
      title1: 'Пожалуйста, подтвердите',
      title2: 'свое присутствие',
      subtitle1: 'Ваши ответы помогут нам при организации',
      subtitle2: 'нашего торжества.',
      deadline: 'Мы будем ждать от вас ответ до 15 октября',
      attendanceLabel: 'Присутствие на торжестве',
      optionWillAttend: 'Я приду/Мы придем',
      optionWithPlusOne: 'Буду с парой (+1)',
      optionCannotAttend: 'Прийти не получается',
      nameLabel: 'Имя и Фамилия',
      nameHelp: 'Если вы придете с парой, внесите все имена. Просьба написать без запятых и символов',
      namePlaceholder: 'Иван Иванов',
      errorRequired: 'Пожалуйста, укажите имя и фамилию',
      submitBtn: 'Отправить',
      submittingBtn: 'Отправка...',
      thankYouTitle: 'Спасибо за ответ!',
      thankYouAccepted: (names: string) => `Мы очень рады, ${names}! С нетерпением ждем встречи с вами 22 октября!`,
      thankYouDeclined: (names: string) => `Очень жаль, ${names}, что не получится разделить этот день с нами! Мы ценим ваше внимание!`,
      editResponseBtn: 'Изменить ответ',
    },
    calendar: {
      monthTitle: 'ОКТЯБРЬ 2026',
      weekdays: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
      timerTitle: 'ДО НАШЕЙ СВАДЬБЫ',
      timerSubtitle: 'ОСТАЛОСЬ...',
      days: 'дней',
      hours: 'часов',
      minutes: 'минут',
      seconds: 'секунд',
    },
  },

  kz: {
    scrollDown: 'Төмен сырғытыңыз',
    intro: {
      title: 'Манас пен Мерейден шақыру...',
      date: '22 қазан 2026',
      openBtn: 'Ашу',
      musicHint: 'әуен қосылады',
      skip: 'Өткізіп жіберу',
    },
    music: {
      label: 'Музыка',
      playTitle: 'Әуенді қосу',
      pauseTitle: 'Әуенді өшіру',
    },
    section1: {
      photoMereyAlt: 'Мерей балалық шағында',
      photoManasAlt: 'Манас балалық шағында',
      captionMerey: 'Мерей',
      captionManas: 'Манас',
      heading: 'Бұл бүлдіршіндерді таныдыңыз ба?',
      p1_1: 'Иә-иә, бұл бізбіз! Уақыт қас-қағым',
      p1_2: 'сәтте зымырап өтті, солай емес пе?',
      p2_1: 'Міне, біз де есейіп, шаңырақ',
      p2_2: 'көтеруге шешім қабылдадық!',
      p3_1: 'Сіздерді алғашқы отбасылық мерекеміз —',
      p3_2: 'үйлену тойымыздың қадірлі',
      p3_3: 'қонағы болуға шақырамыз!',
      p4_1: 'Осынау қуанышты күнімізді бізбен',
      p4_2: 'бірге бөліссеңіздер, өте қуаныштымыз.',
      dateLabel: 'ТОЙ КҮНІ:',
      dateValue: '22 қазан',
      withLove: 'Махаббатпен, Манас пен Мерей!',
      drawnCoupleAlt: 'Суреттелген жұп — Манас пен Мерей',
    },
    timing: {
      title: 'Уақыты',
      subtitle: 'Бұл мерекелік кешті сіздермен бірге өткізуге шын жүректен қуаныштымыз!',
      banquetTime: '— 18:00 Тойдың басталуы',
      banquetDesc: 'Tinchlik Plaza, би, шаттық пен махаббат',
    },
    location: {
      title: 'Мекенжай',
      venueName: 'Tinchlik Plaza',
      address: 'Науаи, Yoshlik Street, 70',
      openMapBtn: 'Картаны ашу',
      yandexLink: 'Яндекс Картадан ашу',
      mapIframeTitle: 'Tinchlik Plaza орналасқан жері (Google Maps)',
    },
    wishes: {
      title: 'Тілектер',
      p1_1: 'Құрметті қонақтар! Біздің кешіміз',
      p1_2: '16+ форматында өтеді. Бұл кешті',
      p1_3: 'ересектер ортасында өткізіп,',
      p1_4: 'алаңсыз демалып, мерекелік атмосферадан',
      p1_5: 'ләззат алу үшін балаларды',
      p1_6: 'үйде қалдыруларыңызды өтінеміз.',
      p2_1: 'Гүл сыйламауыңызды сұраймыз —',
      p2_2: 'саяхатқа шығатындықтан, олардың',
      p2_3: 'сұлулығына тоя алмаймыз. Егер жылы',
      p2_4: 'лебіздеріңіз арманымызды орындауға',
      p2_5: 'септігін тигізетін шағын конвертке сыйса,',
      p2_6: 'шексіз риза боламыз.',
    },
    rsvp: {
      title1: 'Келетініңізді',
      title2: 'растауыңызды сұраймыз',
      subtitle1: 'Сіздердің жауаптарыңыз мерекемізді',
      subtitle2: 'мінсіз ұйымдастыруға көмектеседі.',
      deadline: 'Жауабыңызды 15 қазанға дейін күтеміз',
      attendanceLabel: 'Тойға қатысу',
      optionWillAttend: 'Мен келемін/Біз келеміз',
      optionWithPlusOne: 'Жұбыммен келемін (+1)',
      optionCannotAttend: 'Өкінішке орай, келе алмаймын',
      nameLabel: 'Аты-жөніңіз',
      nameHelp: 'Жұбыңызбен келетін болсаңыз, барлық есімдерді жазыңыз. Үтірсіз және артық белгісіз жазуды сұраймыз',
      namePlaceholder: 'Айдос Сейітов',
      errorRequired: 'Аты-жөніңізді енгізіңіз',
      submitBtn: 'Жіберу',
      submittingBtn: 'Жіберілуде...',
      thankYouTitle: 'Жауабыңызға рахмет!',
      thankYouAccepted: (names: string) => `Өте қуаныштымыз, ${names}! Сіздерді 22 қазанда асыға күтеміз!`,
      thankYouDeclined: (names: string) => `Өкінішке орай, ${names}, бұл күнді бізбен бөлісе алмайтыныңызға өкінеміз! Ықыласыңызға рахмет!`,
      editResponseBtn: 'Жауапты өзгерту',
    },
    calendar: {
      monthTitle: 'ҚАЗАН 2026',
      weekdays: ['ДҮ', 'СЕ', 'СӘ', 'БЕ', 'ЖҰ', 'СЕ', 'ЖЕ'],
      timerTitle: 'ҮЙЛЕНУ ТОЙЫМЫЗҒА',
      timerSubtitle: 'ҚАЛДЫ...',
      days: 'күн',
      hours: 'сағат',
      minutes: 'минут',
      seconds: 'секунд',
    },
  },

  uz: {
    scrollDown: 'Pastga suring',
    intro: {
      title: 'Manas va Mereydan taklifnoma...',
      date: '22 oktyabr 2026',
      openBtn: 'Ochish',
      musicHint: 'musiqa yoqiladi',
      skip: 'O‘tkazib yuborish',
    },
    music: {
      label: 'Musiqa',
      playTitle: 'Musiqani yoqish',
      pauseTitle: 'Musiqani o‘chirish',
    },
    section1: {
      photoMereyAlt: 'Merey bolalikda',
      photoManasAlt: 'Manas bolalikda',
      captionMerey: 'Merey',
      captionManas: 'Manas',
      heading: 'Bu jajilarni tanidingizmi?',
      p1_1: 'Ha-ha, bu bizmiz! Vaqt qanday tez',
      p1_2: 'o‘tib ketganini tasavvur qilyapsizmi?',
      p2_1: 'Mana endi biz ham ulg‘aydik va',
      p2_2: 'oila qurishga ahd qildik!',
      p3_1: 'Sizlarni ilk oilaviy bayramimiz —',
      p3_2: 'to‘yimizning aziz mehmoni',
      p3_3: 'bo‘lishga taklif etamiz!',
      p4_1: 'Ushbu quvonchli kunimizni biz bilan',
      p4_2: 'birga baham ko‘rsangiz, behad mamnun bo‘lamiz.',
      dateLabel: 'TO‘Y KUNI:',
      dateValue: '22-oktabr',
      withLove: 'Muhabbat bilan, Manas va Merey!',
      drawnCoupleAlt: 'Chizilgan juftlik — Manas va Merey',
    },
    timing: {
      title: 'Vaqti',
      subtitle: 'Ushbu bayram oqshomini siz bilan birga o‘tkazishdan baxtiyormiz!',
      banquetTime: '— 18:00 To‘y oqshomi boshlanishi',
      banquetDesc: 'Tinchlik Plaza, raqslar, quvonch va muhabbat',
    },
    location: {
      title: 'Manzil',
      venueName: 'Tinchlik Plaza',
      address: 'Navoiy, Yoshlik ko‘chasi, 70',
      openMapBtn: 'Xaritani ochish',
      yandexLink: 'Yandex Xaritada ochish',
      mapIframeTitle: 'Tinchlik Plaza manzili (Google Maps)',
    },
    wishes: {
      title: 'Tilaklar',
      p1_1: 'Aziz mehmonlar! Bayramimiz',
      p1_2: '16+ formatida o‘tadi. Maroqli',
      p1_3: 'hordiq chiqarib, tantananing ajoyib',
      p1_4: 'muhitidan bahramand bo‘lishingiz uchun',
      p1_5: 'bu oqshomni kattalar davrasida o‘tkazib,',
      p1_6: 'bolalarni uyda qoldirishingizni iltimos qilamiz.',
      p2_1: 'Iltimos, guldastalar xarid qilishdan',
      p2_2: 'o‘zingizni tiying — sayohatga chiqayotganimiz',
      p2_3: 'sababli ularning chiroyidan bahramand bo‘lishga',
      p2_4: 'ulgurmaymiz. Orzularimizni ro‘yobga',
      p2_5: 'chiqarishga yordam beradigan samimiy tilaklaringiz',
      p2_6: 'mitti konvertga joylansa, behad minnatdor bo‘lamiz.',
    },
    rsvp: {
      title1: 'Iltimos, tashrifingizni',
      title2: 'tasdiqlang',
      subtitle1: 'Sizning javoblaringiz bayramimizni',
      subtitle2: 'mukammal tashkil qilishga yordam beradi.',
      deadline: 'Javobingizni 15-oktabrgacha kutamiz',
      attendanceLabel: 'Tantanada ishtirok etish',
      optionWillAttend: 'Men boraman/Biz boramiz',
      optionWithPlusOne: 'Juftim bilan boraman (+1)',
      optionCannotAttend: 'Afsuski, bora olmayman',
      nameLabel: 'Ism va Familiyangiz',
      nameHelp: 'Agar juftingiz bilan kelsangiz, barcha ismlarni yozing. Vergul va ortiqcha belgilarsiz yozishingizni so‘raymiz',
      namePlaceholder: 'Anvar Karimov',
      errorRequired: 'Iltimos, ism va familiyangizni kiriting',
      submitBtn: 'Yuborish',
      submittingBtn: 'Yuborilmoqda...',
      thankYouTitle: 'Javobingiz uchun rahmat!',
      thankYouAccepted: (names: string) => `Juda xursandmiz, ${names}! Sizni 22-oktabr kuni intiqlik bilan kutamiz!`,
      thankYouDeclined: (names: string) => `Afsus, ${names}, bu kunni biz bilan o‘tkaza olmasligingizdan xafamiz! E’tiboringiz uchun rahmat!`,
      editResponseBtn: 'Javobni o‘zgartirish',
    },
    calendar: {
      monthTitle: 'OKTABR 2026',
      weekdays: ['DU', 'SE', 'CHO', 'PA', 'JU', 'SHAN', 'YAK'],
      timerTitle: 'TO‘YIMIZGACHA',
      timerSubtitle: 'QOLDI...',
      days: 'kun',
      hours: 'soat',
      minutes: 'daqiqa',
      seconds: 'soniya',
    },
  },
};
