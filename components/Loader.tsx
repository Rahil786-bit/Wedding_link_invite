'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { inviteConfig } from '@/lib/invite.config';
import { MonogramLetter } from '@/components/MonogramLetter';

export function Loader() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!inviteConfig.loader.enabled) {
      setIsVisible(false);
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 200);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && inviteConfig.loader.enabled && (
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-background-deep"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="islamic-star-pattern pointer-events-none absolute inset-0 opacity-20" />
          <motion.div
            className="relative z-10 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-6 font-script text-2xl text-accent-soft md:text-3xl" dir="rtl">
              {inviteConfig.loader.script}
            </p>
            <div className="mb-4 flex justify-center">
              <MonogramLetter
                left={inviteConfig.celebration.monogram.left}
                right={inviteConfig.celebration.monogram.right}
                size="md"
              />
            </div>
            <p className="font-display text-lg text-accent">
              {inviteConfig.celebration.primaryName}
            </p>
            <p className="font-serif italic text-accent">&</p>
            <p className="mb-8 font-display text-lg text-accent">
              {inviteConfig.celebration.secondaryName}
            </p>
          </motion.div>

          <div className="relative z-10 mb-6 h-1 w-64 overflow-hidden rounded-full bg-accent-dim">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-soft to-accent"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <p className="relative z-10 text-sm text-accent-soft">{inviteConfig.loader.caption}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
