'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@/components/Loader';
import { Hero } from '@/components/Hero';
import { Letter } from '@/components/Letter';
import { Ribbon } from '@/components/Ribbon';
import { Events } from '@/components/Events';
import { Countdown } from '@/components/Countdown';
import { Verses } from '@/components/Verses';
import { Wishes } from '@/components/Wishes';
import { Footer } from '@/components/Footer';

interface GuestData {
  name: string;
  eventKeys: string[];
}

export default function InvitePage({ params }: { params: { slug: string } }) {
  const [guestData, setGuestData] = useState<GuestData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const eventsRef = useRef<HTMLDivElement>(null);
  const wishesRef = useRef<HTMLDivElement>(null);

  // Fetch guest data
  useEffect(() => {
    const fetchGuestData = async () => {
      try {
        const response = await fetch(`/api/guests/${params.slug}`);
        if (!response.ok) {
          throw new Error('Guest not found');
        }
        const data = await response.json();
        setGuestData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load invitation');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuestData();
  }, [params.slug]);

  // Mark noindex for private invites
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  const handleViewInvitation = () => {
    eventsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLeaveWish = () => {
    wishesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-accent-dim border-t-accent rounded-full animate-spin"></div>
          <p className="mt-4 text-foreground">Loading your invitation...</p>
        </div>
      </div>
    );
  }

  if (error || !guestData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-display text-3xl text-accent mb-4">Invitation Not Found</h1>
          <p className="text-foreground mb-6">
            {error || 'We could not find your personal invitation link.'}
          </p>
          <p className="text-muted-soft mb-6">
            Please check the link and try again, or contact the couple for a new invitation.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-accent text-background font-serif rounded-lg hover:bg-accent-soft transition-smooth"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Loader />
      <Hero onViewInvitation={handleViewInvitation} onLeaveWish={handleLeaveWish} />
      <Letter guestName={guestData.name} />
      <Ribbon />
      <div ref={eventsRef}>
        <Events guestName={guestData.name} allowedEventKeys={guestData.eventKeys} />
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
