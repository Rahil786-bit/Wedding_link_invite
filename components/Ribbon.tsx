'use client';

import { useEffect, useRef, useState } from 'react';
import { inviteConfig } from '@/lib/invite.config';
import { motion } from 'framer-motion';

function RibbonItem({
  item,
}: {
  item: (typeof inviteConfig.ribbon.items)[number];
}) {
  return (
    <div className="flex shrink-0 items-center px-8">
      <span
        className={
          item.style === 'script'
            ? 'font-script text-2xl text-accent'
            : item.style === 'mark'
              ? 'font-display text-lg leading-none text-accent'
              : 'font-display text-lg tracking-wide text-accent'
        }
      >
        {item.text}
      </span>
    </div>
  );
}

export function Ribbon() {
  const items = inviteConfig.ribbon.items;
  const firstSetRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [setWidth, setSetWidth] = useState(0);
  const [copies, setCopies] = useState(3);

  useEffect(() => {
    const setEl = firstSetRef.current;
    const viewEl = viewportRef.current;
    if (!setEl || !viewEl) return;

    const measure = () => {
      const width = setEl.getBoundingClientRect().width;
      if (!width) return;
      setSetWidth(width);
      const viewport = viewEl.clientWidth;
      setCopies(Math.max(3, Math.ceil((viewport * 2) / width) + 1));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(setEl);
    observer.observe(viewEl);
    return () => observer.disconnect();
  }, []);

  if (!inviteConfig.ribbon.enabled || items.length === 0) {
    return null;
  }

  const duration = setWidth > 0 ? Math.max(18, setWidth / 28) : 32;

  return (
    <motion.section
      className="relative overflow-hidden border-y border-accent/20 bg-accent/5 py-10 md:py-14"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div ref={viewportRef} className="relative flex h-20 items-center overflow-hidden md:h-24">
        <motion.div
          className="flex w-max whitespace-nowrap"
          animate={setWidth > 0 ? { x: [0, -setWidth] } : { x: 0 }}
          transition={{
            duration,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {Array.from({ length: copies }, (_, copyIdx) => (
            <div
              key={copyIdx}
              ref={copyIdx === 0 ? firstSetRef : undefined}
              className="flex shrink-0"
              aria-hidden={copyIdx > 0}
            >
              {items.map((item, idx) => (
                <RibbonItem key={`${copyIdx}-${idx}`} item={item} />
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
