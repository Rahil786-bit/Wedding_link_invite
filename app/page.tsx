'use client';

import { useRef } from 'react';
import { Loader } from '@/components/Loader';
import { Hero } from '@/components/Hero';
import { Letter } from '@/components/Letter';
import { Ribbon } from '@/components/Ribbon';
import { Events } from '@/components/Events';
import { Countdown } from '@/components/Countdown';
import { Verses } from '@/components/Verses';
import { Wishes } from '@/components/Wishes';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  const eventsRef = useRef<HTMLDivElement>(null);
  const wishesRef = useRef<HTMLDivElement>(null);

  const handleViewInvitation = () => {
    eventsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLeaveWish = () => {
    wishesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Loader />
      <Hero onViewInvitation={handleViewInvitation} onLeaveWish={handleLeaveWish} />
      <Letter />
      <Ribbon />
      <div ref={eventsRef}>
        <Events />
      </div>
      <Countdown />
      <Verses />
      <div ref={wishesRef}>
        <Wishes />
      </div>
      <Footer />
    </>
  );
}
