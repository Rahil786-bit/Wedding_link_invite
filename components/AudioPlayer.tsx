'use client';

import { useState, useRef } from 'react';
import { inviteConfig } from '@/lib/invite.config';

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  if (!inviteConfig.audio.enabled || !inviteConfig.audio.src) {
    return null;
  }

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        console.log('Audio playback failed');
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={inviteConfig.audio.src}
        onEnded={handleAudioEnd}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        loop
      />

      <div className="fixed top-5 right-5 z-[60] md:top-7 md:right-7">
        <div
          className="relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {showTooltip && (
            <div className="absolute top-full right-0 mt-3 px-3 py-2 bg-accent text-background text-sm rounded-lg whitespace-nowrap animate-fade-in shadow-lg">
              {isPlaying ? 'Pause nasheed' : 'Play nasheed'}
              <div className="absolute bottom-full right-4 border-4 border-transparent border-b-accent" />
            </div>
          )}

          {isPlaying && (
            <>
              <span className="absolute inset-0 rounded-full border border-accent" style={{ animation: 'music-ring 1.6s ease-out infinite' }} />
              <span className="absolute inset-0 rounded-full border border-accent-soft" style={{ animation: 'music-ring 1.6s ease-out infinite 0.45s' }} />
            </>
          )}

          <button
            onClick={togglePlay}
            className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-accent/50 font-display text-2xl shadow-[0_0_24px_rgba(212,175,55,0.35)] transition-all duration-300 ${
              isPlaying
                ? 'bg-accent text-background scale-105'
                : 'bg-background-deep/80 text-accent hover:bg-accent hover:text-background backdrop-blur-md'
            }`}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
          >
            {isPlaying ? '❚❚' : '♪'}
          </button>
        </div>
      </div>
    </>
  );
}
