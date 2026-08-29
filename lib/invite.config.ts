import { InviteConfig } from './config-types';

/**
 * IMPORTANT: Event keys (events.items[].key) are stable identifiers baked into guest links.
 * Never rename, delete, or reorder existing events — only append new ones.
 */
export const inviteConfig: InviteConfig = {
  site: {
    title: 'Mohammad Rahil & Ruhi Firdous — Nikah Invitation',
    description:
      'With the blessing of Allah, you are invited to the nikah of Mohammad Rahil and Ruhi Firdous',
    faviconEmoji: '🌙',
  },
  celebration: {
    primaryName: 'Mohammad Rahil',
    secondaryName: 'Ruhi Firdous',
    arabicPrimary: 'محمد راہل',
    arabicSecondary: 'روحی فردوس',
    joiner: '&',
    monogram: {
      left: 'R',
      right: 'R',
    },
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    kicker: 'Nikah Mubarak',
    intro:
      'With praise to Allah and hearts full of shukr, the families request the honour of your presence as Mohammad Rahil and Ruhi Firdous begin their life together in the bond of nikah.',
    footerNote: 'Dua ka niyaaz hai — aapki duaon aur ashraaf ke liye',
  },
  theme: {
    palette: {
      background: '#0b1c18',
      backgroundDeep: '#06110e',
      foreground: '#f4ead6',
      ivory: '#fff8ea',
      accent: '#d4af37',
      accentSoft: '#f0d78c',
      accentDeep: '#8a6a1f',
      accentDim: '#5c4a24',
      accentAlt: '#c4a35a',
      muted: '#6d7f76',
      mutedSoft: '#9aada3',
      mutedFaint: '#3d4f48',
      accentRgb: '212, 175, 55',
      accentSoftRgb: '240, 215, 140',
      accentAltRgb: '196, 163, 90',
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
      'Alhamdulillah. With the mercy of Allah, two families are becoming one. We invite you to share in the nikah of Mohammad Rahil and Ruhi Firdous.',
      'Your presence, duas, and barakah mean more to us than any celebration. Please join us as we begin this journey with faith, love, and gratitude.',
      'May Allah accept this union, fill their home with sakoon, and keep them on the path of righteousness. Ameen.',
    ],
    closingLine: 'With love, respect, and duas,',
    signOff: 'Mohammad Rahil & Ruhi Firdous',
    signOffScript: 'محمد راہل و روحی فردوس',
  },
  ribbon: {
    enabled: true,
    items: [
      { text: '♥', style: 'mark' },
      { text: ' Rahil & Ruhi ', style: 'display' },
      { text: '♥', style: 'mark' },
      { text: ' راہل و روحی ', style: 'script' },
      { text: '✦', style: 'mark' },
      { text: 'محمد  و روحي ', style: 'script' },
      { text: '✦', style: 'mark' },
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
        glow: 'rgba(212, 175, 55, 0.3)',
        spotColor: '#d4af37',
        borderColor: '#8a6a1f',
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
        glow: 'rgba(196, 163, 90, 0.3)',
        spotColor: '#c4a35a',
        borderColor: '#d4af37',
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
        glow: 'rgba(138, 106, 31, 0.3)',
        spotColor: '#8a6a1f',
        borderColor: '#5c4a24',
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
      {
        key: 'nikah',
        title: 'Nikah',
        scriptTitle: 'نکاح',
        date: '2026-12-25',
        day: 'Friday',
        time: '1:30 PM',
        venue: 'Masjid Al-Noor',
        location: 'City Center',
        address: '12 Faith Avenue, City Center',
        mapUrl: 'https://maps.google.com',
        note: 'The sacred contract, by the will of Allah',
        accent: 'from-accent-soft to-accent',
        glow: 'rgba(240, 215, 140, 0.28)',
        spotColor: '#f0d78c',
        borderColor: '#d4af37',
        details: [
          'Khutbah and nikah ceremony',
          'Dua for the couple and both families',
          'Dates and sherbet after the nikah',
          'Modest dress requested',
        ],
        gallery: [
          {
            src: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800',
            caption: 'The sacred contract, by the will of Allah',
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
    text: 'Leave a heartfelt dua for Rahil and Ruhi',
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
    credit: 'Crafted with love for Mohammad Rahil & Ruhi Firdous',
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

With the blessings of Allah ﷻ, you are cordially invited to the nikah of Mohammad Rahil and Ruhi Firdous.

💌 *We've created a personalised invitation especially for you. Please tap the link below to view it:*

{{link}}

You will find all the event details, venue information, and timings within your invitation.

We would be truly honoured to have you celebrate this joyous occasion with us.

*With warm regards,*
*Rahil & Ruhi* 🤍`,
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
