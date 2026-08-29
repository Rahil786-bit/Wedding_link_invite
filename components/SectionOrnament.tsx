export function SectionOrnament({ label }: { label?: string }) {
  return (
    <div className="mb-8 flex items-center justify-center gap-3 text-accent" aria-hidden>
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-accent/70 md:w-16" />
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2 L14.2 9.2 L22 12 L14.2 14.8 L12 22 L9.8 14.8 L2 12 L9.8 9.2 Z" />
      </svg>
      {label ? (
        <span className="font-script text-lg text-accent-soft md:text-xl">{label}</span>
      ) : null}
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2 L14.2 9.2 L22 12 L14.2 14.8 L12 22 L9.8 14.8 L2 12 L9.8 9.2 Z" />
      </svg>
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-accent/70 md:w-16" />
    </div>
  );
}
