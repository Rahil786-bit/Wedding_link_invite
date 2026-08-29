'use client';

import { motion } from 'framer-motion';
import { inviteConfig } from '@/lib/invite.config';
import { OrnateCorners } from '@/components/OrnateCorners';
import { SectionOrnament } from '@/components/SectionOrnament';

interface LetterProps {
  guestName?: string;
}

export function Letter({ guestName }: LetterProps) {
  if (!inviteConfig.letter.enabled) {
    return null;
  }

  const salutation = guestName
    ? `Dear ${guestName}`
    : inviteConfig.letter.fallbackSalutation;

  return (
    <motion.section
      className="relative px-4 py-20 md:py-32"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative mx-auto max-w-2xl">
        <SectionOrnament label="دعوة" />
        <motion.div
          className="invite-panel relative rounded-sm p-8 md:p-12"
          initial={{ scale: 0.94, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <OrnateCorners />
          <p className="mb-4 font-serif text-sm tracking-widest text-accent-soft">
            {inviteConfig.letter.kicker.toUpperCase()}
          </p>
          <h2 className="mb-8 font-display text-3xl text-accent md:text-4xl">
            {inviteConfig.letter.title}
          </h2>
          <div className="space-y-6 leading-relaxed text-foreground">
            <p className="font-serif text-lg">{salutation},</p>
            {inviteConfig.letter.paragraphs.map((paragraph, idx) => (
              <p key={idx} className="font-body">
                {paragraph}
              </p>
            ))}
            <p className="mt-8 italic text-muted-soft">{inviteConfig.letter.closingLine}</p>
            <div className="border-t border-accent-dim pt-8">
              <p className="font-serif text-lg text-accent">{inviteConfig.letter.signOff}</p>
              <p className="mt-2 font-script text-2xl text-accent-soft">
                {inviteConfig.letter.signOffScript}
              </p>
            </div>
          </div>
          <div className="mt-12 flex justify-center text-3xl text-accent-dim">✦</div>
        </motion.div>
      </div>
    </motion.section>
  );
}
