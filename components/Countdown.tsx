'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { inviteConfig } from '@/lib/invite.config';
import { SectionOrnament } from '@/components/SectionOrnament';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  const [flash, setFlash] = useState(false);
  const previous = useRef<number | null>(null);

  useEffect(() => {
    if (previous.current === null) {
      previous.current = value;
      return;
    }
    if (previous.current !== value) {
      previous.current = value;
      setFlash(true);
      const timeout = setTimeout(() => setFlash(false), 320);
      return () => clearTimeout(timeout);
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center">
      <div className="invite-panel mb-3 min-w-20 rounded-sm p-4 md:min-w-24 md:p-6">
        <p
          className={`font-display text-3xl text-accent md:text-4xl transition-transform duration-300 ${
            flash ? 'scale-125 brightness-125' : 'scale-100'
          }`}
        >
          {String(value).padStart(2, '0')}
        </p>
      </div>
      <p className="font-serif text-sm uppercase tracking-wider text-accent-soft">{label}</p>
    </div>
  );
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    if (!inviteConfig.countdown.enabled) {
      return;
    }

    const updateCountdown = () => {
      const target = new Date(inviteConfig.countdown.targetIso).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!inviteConfig.countdown.enabled || !timeLeft) {
    return null;
  }

  return (
    <motion.section
      className="relative px-4 py-20 md:py-32"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionOrnament />
          <h2 className="mb-4 font-display text-4xl text-accent md:text-5xl">
            {inviteConfig.countdown.title}
          </h2>
          <p className="text-lg text-muted-soft">{inviteConfig.countdown.text}</p>
        </motion.div>

        <div className="mb-16 flex flex-wrap justify-center gap-4 md:gap-8">
          <TimeUnit value={timeLeft.days} label="Days" />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <TimeUnit value={timeLeft.minutes} label="Minutes" />
          <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </div>

        <motion.p
          className="mb-4 font-script text-2xl text-accent-soft"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {inviteConfig.countdown.scriptAccent}
        </motion.p>
        <motion.p
          className="text-sm text-muted-soft"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {inviteConfig.countdown.caption}
        </motion.p>
      </div>
    </motion.section>
  );
}
