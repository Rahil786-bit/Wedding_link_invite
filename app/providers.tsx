'use client';

import { SessionProvider } from 'next-auth/react';
import { AudioPlayer } from '@/components/AudioPlayer';
import { IslamicBackground } from '@/components/IslamicBackground';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <IslamicBackground />
      <div className="relative z-10">{children}</div>
      <AudioPlayer />
    </SessionProvider>
  );
}
