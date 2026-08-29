'use client';

const motes = [
  { left: '8%', delay: 0, duration: 11, size: 3 },
  { left: '18%', delay: 1.4, duration: 14, size: 2 },
  { left: '27%', delay: 3, duration: 12, size: 4 },
  { left: '39%', delay: 0.8, duration: 16, size: 2 },
  { left: '48%', delay: 2.2, duration: 13, size: 3 },
  { left: '61%', delay: 4, duration: 15, size: 2 },
  { left: '72%', delay: 1, duration: 12, size: 4 },
  { left: '81%', delay: 2.8, duration: 14, size: 2 },
  { left: '91%', delay: 0.4, duration: 17, size: 3 },
];

export function IslamicBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.12),_transparent_42%),radial-gradient(ellipse_at_bottom,_rgba(12,48,40,0.9),_#06110e_70%)]" />
      <div className="islamic-star-pattern absolute inset-0" />
      <div className="islamic-arch-vignette absolute inset-0" />

      <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl animate-glow-breathe" />
      <div className="absolute bottom-[-120px] right-[-80px] h-[380px] w-[380px] rounded-full bg-accent-deep/20 blur-3xl animate-glow-breathe" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[30%] left-[-100px] h-[280px] w-[280px] rounded-full bg-emerald-900/40 blur-3xl" />

      {motes.map((mote, i) => (
        <span
          key={i}
          className="gold-mote"
          style={{
            left: mote.left,
            width: mote.size,
            height: mote.size,
            animationDuration: `${mote.duration}s`,
            animationDelay: `${mote.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
