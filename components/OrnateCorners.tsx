export function OrnateCorners({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      {[
        'top-3 left-3 rotate-0',
        'top-3 right-3 rotate-90',
        'bottom-3 right-3 rotate-180',
        'bottom-3 left-3 -rotate-90',
      ].map((pos) => (
        <svg
          key={pos}
          className={`absolute h-16 w-16 text-accent/70 md:h-24 md:w-24 ${pos}`}
          viewBox="0 0 80 80"
          fill="none"
        >
          <path
            d="M8 72 V28 C8 12 12 8 28 8 H72"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M18 72 V34 C18 20 22 18 34 18 H72"
            stroke="currentColor"
            strokeWidth="0.7"
            opacity="0.7"
          />
          <circle cx="28" cy="28" r="2.2" fill="currentColor" />
          <path
            d="M28 18 L32 28 L28 38 L24 28 Z"
            fill="currentColor"
            opacity="0.85"
          />
        </svg>
      ))}
    </div>
  );
}
