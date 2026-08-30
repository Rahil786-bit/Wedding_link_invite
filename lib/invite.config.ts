import { InviteConfig } from './config-types';

/**
 * IMPORTANT: Event keys (events.items[].key) are stable identifiers baked into guest links.
 * Never rename, delete, or reorder existing events — only append new ones.
 */
export const inviteConfig: InviteConfig = {
  site: {
    title: 'Gulam Sabbani & Shabnam Bano — Nikah Invitation',
    description:
      'With the blessing of Allah, you are invited to the nikah of Gulam Sabbani and Shabnam Bano',
    faviconEmoji: '🌙',
  },
  celebration: {
    primaryName: 'Gulam Sabbani',
    secondaryName: 'Shabnam Bano',
    arabicPrimary: 'غلام صبانی',
    arabicSecondary: 'شبنم بانو',
    joiner: '&',
    monogram: {
      left: 'S',
      right: 'S',
    },
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    kicker: 'In the name of God, the most gracious, the most merciful',
    intro:
      'With praise to Allah and hearts full of shukr, the families request the honour of your presence as Gulam Sabbani and Shabnam Bano begin their life together in the bond of nikah.',
    footerNote: 'Dua ka niyaaz hai — aapki duaon aur ashraaf ke liye',
  },
  theme: {
    palette: {
      background: '#2a1018',
      backgroundDeep: '#13070c',
      foreground: '#f9ebee',
      ivory: '#fff7f3',
      accent: '#d4af67',
      accentSoft: '#f1d48d',
      accentDeep: '#8e6925',
      accentDim: '#61421a',
      accentAlt: '#e8c986',
      muted: '#b69369',
      mutedSoft: '#d6bf97',
      mutedFaint: '#402c23',
      accentRgb: '212, 175, 103',
      accentSoftRgb: '241, 212, 141',
      accentAltRgb: '232, 201, 134',
    },
    fonts: {
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Great+Vibes&family=Manrope:wght@400;600;700&family=Noto+Nastaliq+Urdu:wght@400;700&display=swap',
      display: '"Cinzel", serif',
      serif: '"Cormorant Garamond", serif',
      body: '"Manrope", sans-serif',
      script: '"Amiri", "Noto Nastaliq Urdu", serif',
    },
  },
  loader: {
    enabled: true,
    script: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    caption: 'A blessed union, inshaAllah',
  },
  audio: {
    enabled: true,
    src: '/sounds/wedding_nausheed.mp3',
  },
  letter: {
    enabled: true,
    kicker: 'A Humble Invitation',
    title: 'You Are Invited',
    fallbackSalutation: 'Assalamu Alaikum',
    paragraphs: [
      'Alhamdulillah. With the mercy of Allah, two families are becoming one. We invite you to share in the nikah of Gulam Sabbani and Shabnam Bano.',
      'Your presence, duas, and barakah mean more to us than any celebration. Please join us as we begin this journey with faith, love, and gratitude.',
      'May Allah accept this union, fill their home with sakoon, and keep them on the path of righteousness. Ameen.',
    ],
    closingLine: 'With love, respect, and duas,',
    signOff: 'The Sabbani & Shabnam Families',
    signOffScript: ' صبانی و شبنم کی طرف سے',
  },
  ribbon: {
    enabled: true,
    items: [
      { text: '✦', style: 'mark' },
      { text: ' Sabbani ', style: 'display' },
      { text: '♥', style: 'mark' },
      { text: ' Shabnam ', style: 'display' },
       { text: '✦', style: 'mark' },
      { text: 'صباني', style: 'script' },
      { text: '♥', style: 'mark' },
      { text: 'شبنم', style: 'script' },
    ],
  },
  events: {
    titleMany: 'Wedding Events',
    titleOne: 'The Celebration',
    textMany: 'Join us for these blessed gatherings',
    textOne: 'You are invited to',
    locked: {
      kicker: 'Personal Link Required',
      title: 'View Your Invitation',
      text: 'To see all the celebration details and events you are invited to, please open your personal invitation link.',
      script: 'ہمیں آپ کی موجودگی کا انتظار ہے',
      badge: 'Private Invitation',
      panelText: 'Open your personalized link to see which events you are invited to.',
    },
    items: [
      {
        key: 'nikah',
        title: 'Nikah',
        scriptTitle: 'نکاح',
        date: '2026-12-25',
        day: 'Friday',
        time: '5:00 PM',
        venue: 'Green Lawn',
        location: 'Green Lawn,Madhosingh Trilokpur,Aurai, UttarPradesh, India',
        address: '123 Heritage Lane, City Center',
        mapUrl: 'https://goo.gl/maps/1LDY8c5UGPnrQ53e8?g_st=aw',
        note: "The groom's procession arrival",
        accent: 'from-accent-soft to-accent-deep',
        glow: 'rgba(242, 138, 168, 0.22)',
        spotColor: '#f28aa8',
        borderColor: '#7d112c',
        details: [
          'Vows exchanged, blessings given, two families becoming one',
          'Please arrive a little early to share in the prayers',
          'Family photographs',
          'Celebration with loved ones',
        ],
        gallery: [],
      },
      {
        key: 'walima',
        title: 'Walimah',
        scriptTitle: 'ولیمہ',
        date: '2026-12-27',
        day: 'Sunday',
        time: '7:00 PM',
        venue: 'Green Lawn',
        location: 'Madhosingh Tilokpur',
        address: 'Green Lawn,Madhosingh Trilokpur,Aurai, UttarPradesh, India',
        mapUrl: 'https://goo.gl/maps/1LDY8c5UGPnrQ53e8?g_st=aw',
        note: 'The wedding feast, following the Sunnah',
        accent: 'from-accent-alt to-accent-soft',
        glow: 'rgba(231, 161, 181, 0.24)',
        spotColor: '#e7a1b5',
        borderColor: '#c61f4f',
        details: [
          'Walimah dinner for family and friends',
          'A feast, long conversations, and more photographs than anyone planned for',
          'One last excuse to keep the celebration going — come celebrate the newlyweds',
          'The best moments are never on the schedule; they just happen',
        ],
        gallery: [
          { src: '/walima1.jpeg', caption: 'The lit gateway into the celebration' },
          { src: '/walima2.jpeg', caption: 'An evening of feast and togetherness' },
          { src: '/walima3.jpeg', caption: 'Duas, photographs, and warm gathering' },
        ],
      },
      {
        key: 'mehendi',
        title: 'Mehendi & Sangeet',
        scriptTitle: 'مہندی و سنگیت',
        date: '2026-12-24',
        day: 'Thursday',
        time: '6:00 PM',
        venue: 'Firdous Family Garden',
        location: 'Petal Park',
        address: '789 Garden Street, Petal Park',
        mapUrl: 'https://maps.google.com',
        note: "Henna, song, and the bride's celebration",
        accent: 'from-accent-deep to-accent-dim',
        glow: 'rgba(198, 31, 79, 0.25)',
        spotColor: '#c61f4f',
        borderColor: '#7d112c',
        details: [
          'Mehendi by a professional artist',
          'Songs, dholak, and family performances',
          'Festive dinner',
          'An evening of colour and dua',
        ],
        gallery: [
          {
            src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800',
            caption: "Henna, song, and the bride's celebration",
          },
        ],
      },
    ],
  },
  countdown: {
    enabled: true,
    targetIso: '2026-12-25T13:30:00+05:30',
    title: 'Countdown to Nikah',
    text: 'The blessed hour draws near',
    scriptAccent: 'آپ کی دعائیں',
    caption: 'May Allah bless this union with sakoon, barakah, and a righteous home',
  },
  verses: {
    enabled: true,
    title: 'Divine Blessings',
    text: 'Ayat of love, mercy, and companionship',
    scriptAccent: 'دعا و برکت',
    closingScript: 'رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا',
    closingTranslation:
      'Our Lord, grant us from Yourself mercy and prepare for us right guidance in our affair',
    swipeHint: 'Swipe to explore',
    items: [
      {
        label: 'Tranquility',
        script: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا',
        translation:
          'And of His signs is that He created for you from yourselves mates that you may dwell in tranquility with them',
        source: 'Quran 30:21',
        border: 'border-accent-soft',
      },
      {
        label: 'Companionship',
        script: 'هُنَّ لِبَاسٌ لَّكُمْ وَأَنتُمْ لِبَاسٌ لَّهُنَّ',
        translation: 'They are clothing for you and you are clothing for them',
        source: 'Quran 2:187',
        border: 'border-accent-alt',
      },
      {
        label: 'Mercy',
        script: 'وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
        translation: 'And He has placed between you affection and mercy',
        source: 'Quran 30:21',
        border: 'border-accent-deep',
      },
    ],
  },
  wishes: {
    enabled: true,
    requireApproval: true,
    displayLimit: 20,
    maxMessageLength: 280,
    scriptAccent: 'نیکی و برکت',
    title: 'Duas & Blessings',
    text: 'Leave a heartfelt dua for Sabbani and Shabnam',
    form: {
      kicker: 'Share Your Dua',
      title: 'Leave a Wish',
      note: 'Your message will be reviewed before appearing on our wall',
      nameLabel: 'Your Name',
      messageLabel: 'Your Dua or Blessing',
      submitLabel: 'Send Dua',
      submittingLabel: 'Sending...',
      idleHint: 'Share your blessings and warm wishes',
      successHint: 'JazakAllah khair for your dua!',
    },
    wall: {
      title: 'Messages of Love',
      text: 'Duas from family and friends',
      pendingLabel: 'Pending Approval',
      emptyScript: 'ابھی کوئی دعائیں نہیں',
      emptyTitle: 'No Wishes Yet',
      emptyText: 'Be the first to share your duas and blessings!',
    },
    toasts: {
      successTitle: 'Dua Received',
      successMessage: 'Your wish is pending approval and will appear soon',
      successMessageInstant: 'JazakAllah khair — your dua has been posted',
      errorTitle: 'Oops!',
      errorMessage: 'Could not submit your wish. Please try again.',
    },
  },
  footer: {
    script: 'بارك الله لهما وبارك عليهما وجمع بينهما في خير',
    blessing: 'May Allah bless them, shower barakah upon them,\nand unite them in goodness. Ameen.',
    credit: 'Crafted with love for Sabbani & Shabnam',
  },
  shareMessages: [
    {
      id: 'warm',
      label: 'Warm',
      body: `🌙 Assalamu Alaikum, {{guest}}

With the infinite mercy and blessings of Allah ﷻ, we are delighted to invite you to celebrate our wedding and share in one of the most cherished moments of our lives.

💌 We've created a personalised invitation especially for you. Tap the link below to view it:

{{link}}

You'll find all the event details, venue information, and timings inside.

May Allah ﷻ bless us all with love, happiness, barakah, and togetherness. We look forward to celebrating with you, In Sha Allah.

JazakAllahu Khairan. 🤍`,
    },
    {
      id: 'formal',
      label: 'Formal',
      body: `Assalamu Alaikum, {{guest}}

With the blessings of Allah ﷻ, you are cordially invited to the nikah of Gulab Sabbani and Shabnam Bano.

💌 *We've created a personalised invitation especially for you. Please tap the link below to view it:*

{{link}}

You will find all the event details, venue information, and timings within your invitation.

We would be truly honoured to have you celebrate this joyous occasion with us.

*With warm regards,*
*Sabbani & Shabnam Families* 🤍`,
    },
    {
      id: 'urdu',
      label: 'Urdu',
      body: `السلام علیکم {{guest}} 🌙

اللہ ﷻ کے فضل سے محمد راہل اور روحی فردوس کی نکاح کی تقریب میں آپ کو دل کی گہرائیوں سے مدعو کرتے ہیں۔

💌 *آپ کے لیے ایک ذاتی دعوت نامہ تیار کیا گیا ہے۔ نیچے دیے گئے لنک پر کلک کریں:*

{{link}}

اس دعوت میں تمام تقریبات، مقام اور اوقات موجود ہیں۔

جزاک اللہ خیرا۔ 🤍`,
    },
  ],
};
