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
          className="invite-panel relative rounded-sm border border-accent/40 bg-[linear-gradient(135deg,rgba(46,18,24,0.93),rgba(19,7,12,0.97))] p-8 shadow-[0_25px_70px_rgba(19,7,12,0.6)] md:p-12"
          initial={{ scale: 0.94, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <OrnateCorners />
          <p className="mb-4 font-serif text-sm tracking-[0.32em] text-accent-soft">
            {inviteConfig.letter.kicker.toUpperCase()}
          </p>
          <h2 className="mb-8 font-display text-3xl text-accent-soft drop-shadow-[0_0_22px_rgba(212,175,103,0.22)] md:text-4xl">
            {inviteConfig.letter.title}
          </h2>
          <div className="space-y-6 leading-relaxed text-foreground">
            <p className="font-serif text-lg text-[rgba(255,247,243,0.98)]">{salutation},</p>
            {inviteConfig.letter.paragraphs.map((paragraph, idx) => (
              <p key={idx} className="font-body text-[rgba(249,235,238,0.9)] leading-relaxed">
                {paragraph}
              </p>
            ))}
            <p className="mt-8 italic text-accent-soft">{inviteConfig.letter.closingLine}</p>
            <div className="border-t border-accent/30 pt-8">
              <p className="font-serif text-lg text-[rgba(255,247,243,0.98)]">{inviteConfig.letter.signOff}</p>
              <p className="mt-2 font-script text-2xl text-accent-soft drop-shadow-[0_0_10px_rgba(212,175,103,0.18)]">
                {inviteConfig.letter.signOffScript}
              </p>
            </div>
          </div>
          <div className="mt-12 flex justify-center text-3xl text-accent-soft">✦</div>
        </motion.div>
      </div>
    </motion.section>
  );
}
