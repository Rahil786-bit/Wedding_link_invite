'use client';

import { motion } from 'framer-motion';
import { inviteConfig } from '@/lib/invite.config';
import { OrnateCorners } from '@/components/OrnateCorners';
import { MonogramLetter } from '@/components/MonogramLetter';

interface HeroProps {
  onViewInvitation: () => void;
  onLeaveWish: () => void;
}

function CrescentLantern({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <div className={`pointer-events-none absolute ${className}`} aria-hidden>
      <div className="animate-lantern" style={{ animationDelay: `${delay}s` }}>
        <div className="mx-auto h-10 w-px bg-gradient-to-b from-transparent to-accent/70" />
        <div className="relative mx-auto flex h-16 w-12 items-center justify-center rounded-b-full border border-accent/50 bg-accent/10 shadow-[0_0_24px_rgba(212,175,55,0.25)]">
          <span className="text-2xl text-accent">☾</span>
        </div>
      </div>
    </div>
  );
}

export function Hero({ onViewInvitation, onLeaveWish }: HeroProps) {
  const { celebration } = inviteConfig;

  return (
    <motion.section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <CrescentLantern className="top-16 left-[8%] hidden sm:block" delay={0} />
      <CrescentLantern className="top-24 right-[10%] hidden sm:block" delay={1.2} />

      <motion.div
        className="relative z-10 w-full max-w-3xl px-4 py-12 md:px-12 md:py-16"
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15 }}
      >
        <div className="invite-panel relative rounded-sm px-6 py-14 md:px-14 md:py-16">
          <OrnateCorners />
          <div className="pointer-events-none absolute inset-3 rounded-sm border border-accent/15" />

          <motion.p
            className="mb-6 text-center font-script text-2xl leading-loose text-accent-soft md:text-3xl"
            dir="rtl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.8 }}
          >
            {celebration.bismillah}
          </motion.p>

          <div className="mx-auto mb-8 h-px w-40 shimmer-gold" />

          <motion.p
            className="mb-3 text-center font-serif text-sm tracking-[0.35em] text-accent uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            {celebration.kicker}
          </motion.p>

          <motion.div
            className="mb-6 text-center"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <MonogramLetter
              left={celebration.monogram.left}
              right={celebration.monogram.right}
              size="lg"
            />
          </motion.div>

          <motion.div
            className="mb-3 text-center"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <h1 className="font-display text-4xl leading-tight md:text-6xl">
              <span className="block text-accent">{celebration.primaryName}</span>
              <span className="my-2 block font-serif text-2xl italic text-accent md:text-3xl">
                {celebration.joiner}
              </span>
              <span className="block text-accent">{celebration.secondaryName}</span>
            </h1>
          </motion.div>

          <motion.p
            className="mb-8 text-center font-script text-xl text-accent-soft md:text-2xl"
            dir="rtl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {celebration.arabicPrimary}  ✦  {celebration.arabicSecondary}
          </motion.p>

          <motion.p
            className="mx-auto mb-10 max-w-xl text-center font-serif text-lg leading-relaxed text-foreground md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {celebration.intro}
          </motion.p>

          <motion.div
            className="flex flex-col justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95 }}
          >
            <button
              onClick={onViewInvitation}
              className="rounded-sm border border-accent bg-accent px-8 py-3 font-serif text-background transition-smooth hover:scale-105 hover:bg-accent-soft"
            >
              View the Invitation
            </button>
            {inviteConfig.wishes.enabled && (
              <button
                onClick={onLeaveWish}
                className="rounded-sm border-2 border-accent px-8 py-3 font-serif text-accent transition-smooth hover:scale-105 hover:bg-accent hover:text-background"
              >
                Leave a Dua
              </button>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
