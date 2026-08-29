interface MonogramMarkProps {
  left: string;
  right: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'h-28 w-28 text-2xl',
  md: 'h-36 w-36 text-4xl md:h-40 md:w-40',
  lg: 'h-44 w-44 text-5xl md:h-56 md:w-56 md:text-6xl',
};

export function MonogramLetter({ left, right, size = 'lg' }: MonogramMarkProps) {
  return (
    <span
      className={`monogram-mark relative inline-flex items-center justify-center ${sizes[size]}`}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 200 200"
        aria-hidden
      >
        <circle
          cx="100"
          cy="100"
          r="78"
          fill="none"
          stroke="rgba(212, 175, 55, 0.16)"
          strokeWidth="0.6"
        />

        <g className="monogram-ring monogram-ring--1">
          <circle
            cx="100"
            cy="100"
            r="92"
            fill="none"
            stroke="rgba(240, 215, 140, 0.42)"
            strokeWidth="1.15"
            strokeDasharray="28 12 4 12 8 12"
            strokeLinecap="round"
          />
          {[0, 90, 180, 270].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 100 100)`}>
              <path
                d="M100 6 L104 14 L100 18 L96 14 Z"
                fill="rgba(240, 215, 140, 0.55)"
              />
            </g>
          ))}
        </g>

        <g className="monogram-ring monogram-ring--2">
          <circle
            cx="100"
            cy="100"
            r="84"
            fill="none"
            stroke="rgba(212, 175, 55, 0.32)"
            strokeWidth="0.9"
            strokeDasharray="2.2 6.5"
            strokeLinecap="round"
          />
          {[45, 135, 225, 315].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 100 100)`}>
              <circle cx="100" cy="16" r="1.6" fill="rgba(240, 215, 140, 0.5)" />
            </g>
          ))}
        </g>

        <g className="monogram-ring monogram-ring--3">
          <circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="rgba(240, 215, 140, 0.28)"
            strokeWidth="0.75"
            strokeDasharray="16 10 3 10"
            strokeLinecap="round"
          />
        </g>
      </svg>

      <span className="relative z-[1] flex items-center gap-2 font-serif leading-none text-accent md:gap-3">
        <span>{left}</span>
        <span className="text-[0.42em] italic font-serif text-accent-soft">&amp;</span>
        <span>{right}</span>
      </span>
    </span>
  );
}
