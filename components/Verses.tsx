'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { inviteConfig } from '@/lib/invite.config';
import { SectionOrnament } from '@/components/SectionOrnament';

export function Verses() {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!inviteConfig.verses.enabled || inviteConfig.verses.items.length === 0) {
    return null;
  }

  const items = inviteConfig.verses.items;
  const currentVerse = items[currentIndex];

  const nextVerse = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevVerse = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <motion.section
      className="relative px-4 py-20 md:py-32"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative mx-auto max-w-3xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionOrnament label={inviteConfig.verses.scriptAccent} />
          <h2 className="mb-4 font-display text-4xl text-accent md:text-5xl">
            {inviteConfig.verses.title}
          </h2>
          <p className="text-lg text-muted-soft">{inviteConfig.verses.text}</p>
        </motion.div>

        <motion.div
          className={`invite-panel mb-8 rounded-sm border-l-4 p-8 md:p-12 ${currentVerse.border}`}
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="mb-6 font-serif text-xs uppercase tracking-widest text-accent-soft">
            {currentVerse.label}
          </p>
          <div className="mb-8 text-right">
            <p className="font-script text-3xl leading-loose text-accent md:text-4xl">
              {currentVerse.script}
            </p>
          </div>
          <div className="my-8 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          <p className="mb-6 font-serif text-lg italic leading-relaxed text-foreground md:text-xl">
            “{currentVerse.translation}”
          </p>
          <p className="font-serif text-sm text-accent-soft">— {currentVerse.source}</p>
        </motion.div>

        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={prevVerse}
            className="rounded-full p-2 transition-smooth hover:bg-accent-dim"
            aria-label="Previous verse"
          >
            <span className="text-2xl text-accent">←</span>
          </button>
          <div className="flex gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 w-2 rounded-full transition-smooth ${
                  idx === currentIndex ? 'bg-accent' : 'bg-accent-dim'
                }`}
                aria-label={`Go to verse ${idx + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextVerse}
            className="rounded-full p-2 transition-smooth hover:bg-accent-dim"
            aria-label="Next verse"
          >
            <span className="text-2xl text-accent">→</span>
          </button>
        </div>

        <p className="text-center text-sm text-muted-faint">{inviteConfig.verses.swipeHint}</p>

        <motion.div
          className="invite-panel mt-16 rounded-sm p-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="mb-4 font-script text-2xl text-accent-soft md:text-3xl">
            {inviteConfig.verses.closingScript}
          </p>
          <p className="italic text-foreground">{inviteConfig.verses.closingTranslation}</p>
        </motion.div>
      </div>
    </motion.section>
  );
}
