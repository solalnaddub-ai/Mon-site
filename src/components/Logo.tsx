import { cn } from '@/lib/cn';

type LogoProps = {
  className?: string;
  /** show the full wordmark next to the mark */
  withWordmark?: boolean;
  title?: string;
};

/**
 * STAYFOCUS mark — a crosshair / focus-reticle glyph in a hard square frame.
 * Pure SVG so it scales crisply and adapts to currentColor (theming).
 */
export function Logo({ className, withWordmark = true, title = 'STAYFOCUS' }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-3 text-chalk', className)}>
      <svg
        viewBox="0 0 64 64"
        className="h-8 w-8 shrink-0"
        role="img"
        aria-label={title}
        fill="none"
      >
        <rect x="4" y="4" width="56" height="56" stroke="currentColor" strokeWidth="3" />
        <path d="M18 24 H46 M32 22 V46" stroke="currentColor" strokeWidth="6" strokeLinecap="square" />
        <circle cx="32" cy="46" r="3" className="fill-neon-gold" />
        <path d="M4 32 H12 M52 32 H60" stroke="currentColor" strokeWidth="2" />
      </svg>
      {withWordmark && (
        <span className="font-display text-2xl uppercase leading-none tracking-tight">STAYFOCUS</span>
      )}
    </span>
  );
}
