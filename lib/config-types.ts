export interface EventItem {
  key: string; // stable ID — baked into old links, never rename/reorder, only append
  title: string;
  scriptTitle: string;
  date: string;
  day: string;
  time: string;
  venue: string;
  location: string;
  address: string;
  mapUrl: string;
  note: string;
  accent: string; // Tailwind gradient class
  glow: string; // rgba color for glows
  spotColor: string;
  borderColor: string;
  details: string[];
  gallery: {
    src: string;
    caption?: string;
  }[];
  /** Optional extra invitation image if gallery is empty. */
  inviteImage?: string;
}

export interface ShareMessage {
  id: string;
  label: string;
  body: string; // supports {{guest}} / {{link}} tokens
}

export interface InviteConfig {
  site: {
    title: string;
    description: string;
    faviconEmoji: string;
  };
  celebration: {
    primaryName: string;
    secondaryName: string;
    arabicPrimary: string;
    arabicSecondary: string;
    joiner: string;
    monogram: {
      left: string;
      right: string;
    };
    bismillah: string;
    kicker: string;
    intro: string;
    footerNote: string;
  };
  theme: {
    palette: {
      background: string;
      backgroundDeep: string;
      foreground: string;
      ivory: string;
      accent: string;
      accentSoft: string;
      accentDeep: string;
      accentDim: string;
      accentAlt: string;
      muted: string;
      mutedSoft: string;
      mutedFaint: string;
      accentRgb: string; // "r, g, b" strings for rgba() glows
      accentSoftRgb: string;
      accentAltRgb: string;
    };
    fonts: {
      googleFontsUrl: string;
      display: string;
      serif: string;
      body: string;
      script: string;
    };
  };
  loader: {
    enabled: boolean;
    script: string;
    caption: string;
  };
  audio: {
    enabled: boolean;
    src: string;
  };
  letter: {
    enabled: boolean;
    kicker: string;
    title: string;
    fallbackSalutation: string;
    paragraphs: string[];
    closingLine: string;
    signOff: string;
    signOffScript: string;
  };
  ribbon: {
    enabled: boolean;
    items: {
      text: string;
      style: "script" | "display" | "mark";
    }[];
  };
  events: {
    titleMany: string;
    titleOne: string;
    textMany: string;
    textOne: string;
    locked: {
      kicker: string;
      title: string;
      text: string;
      script: string;
      badge: string;
      panelText: string;
    };
    items: EventItem[];
  };
  countdown: {
    enabled: boolean;
    targetIso: string;
    title: string;
    text: string;
    scriptAccent: string;
    caption: string;
  };
  verses: {
    enabled: boolean;
    title: string;
    text: string;
    scriptAccent: string;
    closingScript: string;
    closingTranslation: string;
    swipeHint: string;
    items: {
      label: string;
      script: string;
      translation: string;
      source: string;
      border: string;
    }[];
  };
  wishes: {
    enabled: boolean;
    requireApproval: boolean;
    displayLimit: number;
    maxMessageLength: number;
    scriptAccent: string;
    title: string;
    text: string;
    form: {
      kicker: string;
      title: string;
      note: string;
      nameLabel: string;
      messageLabel: string;
      submitLabel: string;
      submittingLabel: string;
      idleHint: string;
      successHint: string;
    };
    wall: {
      title: string;
      text: string;
      pendingLabel: string;
      emptyScript: string;
      emptyTitle: string;
      emptyText: string;
    };
    toasts: {
      successTitle: string;
      successMessage: string;
      successMessageInstant: string;
      errorTitle: string;
      errorMessage: string;
    };
  };
  footer: {
    script: string;
    blessing: string;
    credit: string;
  };
  shareMessages: ShareMessage[];
}
