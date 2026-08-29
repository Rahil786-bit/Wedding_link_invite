'use client';

import { motion } from 'framer-motion';
import { inviteConfig } from '@/lib/invite.config';
import { SectionOrnament } from '@/components/SectionOrnament';
import { MonogramLetter } from '@/components/MonogramLetter';

export function Footer() {
  return (
    <motion.footer
      className="relative border-t border-accent/25 px-4 py-16 md:py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative mx-auto max-w-4xl text-center">
        <SectionOrnament />
        <motion.div
          className="mb-8 font-serif text-4xl text-accent"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center">
            <MonogramLetter
              left={inviteConfig.celebration.monogram.left}
              right={inviteConfig.celebration.monogram.right}
              size="sm"
            />
          </div>
        </motion.div>

        <motion.h2
          className="mb-6 font-display text-2xl md:text-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-accent">{inviteConfig.celebration.primaryName}</span>
          <span className="mx-2 text-accent">&</span>
          <span className="text-accent">{inviteConfig.celebration.secondaryName}</span>
        </motion.h2>

        <motion.div
          className="mb-8 whitespace-pre-line leading-relaxed text-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="mb-6 font-serif text-lg">{inviteConfig.footer.blessing}</p>
          <p className="mb-8 font-script text-xl text-accent-soft md:text-2xl">
            {inviteConfig.footer.script}
          </p>
        </motion.div>

        <motion.p
          className="mb-6 text-muted-soft"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {inviteConfig.celebration.footerNote}
        </motion.p>

        <motion.p
          className="text-xs text-muted-faint"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {inviteConfig.footer.credit}
        </motion.p>
      </div>
    </motion.footer>
  );
}
