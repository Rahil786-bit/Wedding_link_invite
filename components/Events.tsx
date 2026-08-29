'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { inviteConfig } from '@/lib/invite.config';
import { SectionOrnament } from '@/components/SectionOrnament';

type EventItem = (typeof inviteConfig.events.items)[0];

interface EventsProps {
  guestName?: string;
  allowedEventKeys?: string[];
}

interface EventCardProps {
  event: EventItem;
  onOpenDetails: (eventKey: string) => void;
  index: number;
}

function resolveImageSrc(src: string) {
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/')) {
    return src;
  }
  return `/${src}`;
}

function getSlides(event: EventItem) {
  const slides = event.gallery.map((item) => ({
    src: resolveImageSrc(item.src),
    caption: item.caption || event.venue,
  }));

  if (slides.length === 0 && event.inviteImage) {
    slides.push({
      src: resolveImageSrc(event.inviteImage),
      caption: event.venue,
    });
  }

  return slides;
}

function formatEventWhen(event: EventItem) {
  const parsed = new Date(`${event.date}T12:00:00`);
  const dayName = Number.isNaN(parsed.getTime())
    ? event.day
    : parsed.toLocaleDateString('en-GB', { weekday: 'long' });
  const dateLabel = Number.isNaN(parsed.getTime())
    ? event.date
    : parsed.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  return `${dayName}, ${dateLabel} — ${event.time} onwards`;
}

function mapsHref(event: EventItem) {
  const query = `${event.venue}, ${event.address}`;
  if (event.mapUrl && !event.mapUrl.match(/maps\.google\.com\/?$/)) {
    return event.mapUrl;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function CalendarIcon() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent-soft" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={`shrink-0 text-accent-soft ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s7-6.2 7-11.2A7 7 0 1 0 5 9.8C5 14.8 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="9.8" r="2.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function EventCard({ event, onOpenDetails, index }: EventCardProps) {
  return (
    <motion.div
      className="invite-panel cursor-pointer overflow-hidden rounded-sm border-l-4 transition-smooth hover:shadow-[0_0_32px_rgba(212,175,55,0.18)]"
      style={{ borderColor: event.borderColor }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      onClick={() => onOpenDetails(event.key)}
    >
      <div className="p-6">
        <div className="mb-4">
          <p className="mb-2 font-script text-sm text-accent-soft">{event.scriptTitle}</p>
          <h3 className="font-display text-2xl" style={{ color: event.spotColor }}>
            {event.title}
          </h3>
        </div>
        <div className="mb-6 space-y-2 text-sm text-muted-soft">
          <div className="flex items-center gap-2">
            <span className="text-accent">📅</span>
            <span>
              {event.day}, {event.date}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-accent">⏰</span>
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-accent">📍</span>
            <span>{event.venue}</span>
          </div>
        </div>
        <p className="mb-4 font-serif text-sm italic text-foreground/80">{event.note}</p>
        <div className="flex items-center justify-between">
          <span className="font-serif text-foreground">{event.location}</span>
          <span className="font-serif" style={{ color: event.spotColor }}>
            View Details →
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function EventDetailModal({ event, onClose }: { event: EventItem; onClose: () => void }) {
  const slides = getSlides(event);
  const [index, setIndex] = useState(0);
  const current = slides[index];

  useEffect(() => {
    setIndex(0);
  }, [event.key]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && slides.length > 1) {
        setIndex((i) => (i + 1) % slides.length);
      }
      if (e.key === 'ArrowLeft' && slides.length > 1) {
        setIndex((i) => (i - 1 + slides.length) % slides.length);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, slides.length]);

  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-h-[94vh] w-full max-w-6xl overflow-y-auto rounded-2xl border border-white/10 bg-[#111111] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.55)] md:p-7"
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 font-body text-[11px] tracking-[0.28em] text-muted-soft uppercase">
              Event Details
            </p>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="font-display text-4xl tracking-wide text-ivory md:text-5xl">
                {event.title.toUpperCase()}
              </h3>
              <span className="font-script text-2xl text-accent-soft md:text-3xl" dir="rtl">
                {event.scriptTitle}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-ivory/80 transition-smooth hover:border-accent/50 hover:text-accent"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="relative min-h-[280px] overflow-hidden rounded-xl bg-black md:min-h-[420px]">
            {current ? (
              <img
                src={current.src}
                alt={current.caption}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="islamic-star-pattern absolute inset-0 opacity-40" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

            {slides.length > 1 && (
              <div className="absolute top-3 right-3 z-10 flex gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous image"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-ivory backdrop-blur-sm"
                >
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                    <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next image"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-ivory backdrop-blur-sm"
                >
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}

            <p className="absolute bottom-8 left-5 z-10 max-w-[85%] font-serif text-sm italic text-ivory/90 md:text-base">
              {current?.caption || event.venue}
            </p>

            {slides.length > 0 && (
              <div className="absolute right-4 bottom-3 left-4 z-10 flex gap-1.5">
                {slides.map((slide, i) => (
                  <button
                    key={slide.src + i}
                    type="button"
                    aria-label={`Show image ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-[3px] flex-1 rounded-full ${
                      i === index ? 'bg-accent-soft' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-5 md:p-6">
              <div className="mb-4 flex gap-3 text-sm text-ivory/90 md:text-[15px]">
                <CalendarIcon />
                <p>{formatEventWhen(event)}</p>
              </div>
              <div className="mb-5 flex gap-3">
                <PinIcon className="mt-1 h-4 w-4" />
                <div>
                  <p className="font-serif text-lg text-ivory">{event.venue}</p>
                  <p className="text-sm leading-relaxed text-muted-soft">{event.address}</p>
                </div>
              </div>
              <ul className="space-y-3">
                {event.details.map((detail) => (
                  <li key={detail} className="flex gap-3 text-sm leading-relaxed text-ivory/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-soft" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-white/8 bg-white/[0.03] p-5 md:p-6">
              <div className="islamic-star-pattern pointer-events-none absolute inset-0 opacity-[0.12]" />
              <div className="relative">
                <p className="mb-2 font-body text-[11px] tracking-[0.28em] text-muted-soft uppercase">
                  Venue
                </p>
                <p className="mb-1 font-serif text-2xl text-ivory">{event.venue}</p>
                <p className="mb-5 text-sm text-muted-soft">{event.address}</p>
                <a
                  href={mapsHref(event)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 font-body text-xs tracking-[0.18em] text-ivory uppercase transition-smooth hover:border-accent hover:text-accent"
                >
                  <PinIcon className="h-3.5 w-3.5" />
                  Open in Maps
                  <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M6 3h7v7M13 3L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Events({ guestName, allowedEventKeys }: EventsProps) {
  const [selectedEventKey, setSelectedEventKey] = useState<string | null>(null);
  const selectedEvent = selectedEventKey
    ? inviteConfig.events.items.find((e) => e.key === selectedEventKey)
    : null;

  const isPersonalized = !!guestName && allowedEventKeys && allowedEventKeys.length > 0;
  const eventsToShow = isPersonalized
    ? inviteConfig.events.items.filter((e) => allowedEventKeys?.includes(e.key))
    : inviteConfig.events.items;

  const isSingleEvent = eventsToShow.length === 1;
  const titleKey = isSingleEvent ? 'titleOne' : 'titleMany';
  const textKey = isSingleEvent ? 'textOne' : 'textMany';

  useEffect(() => {
    if (!selectedEventKey) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [selectedEventKey]);

  return (
    <motion.section
      className="relative px-4 py-20 md:py-32"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8 }}
      id="events"
    >
      <div className="relative mx-auto max-w-5xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionOrnament />
          <h2 className="mb-4 font-display text-4xl text-accent md:text-5xl">
            {inviteConfig.events[titleKey]}
          </h2>
          {isPersonalized && guestName && (
            <p className="mb-2 text-foreground">Dear {guestName},</p>
          )}
          <p className="text-lg text-muted-soft">{inviteConfig.events[textKey]}</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {eventsToShow.map((event, index) => (
            <EventCard
              key={event.key}
              event={event}
              index={index}
              onOpenDetails={setSelectedEventKey}
            />
          ))}
        </div>

        {selectedEvent && (
          <EventDetailModal event={selectedEvent} onClose={() => setSelectedEventKey(null)} />
        )}
      </div>
    </motion.section>
  );
}
