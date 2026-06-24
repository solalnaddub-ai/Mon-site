import { cn } from '@/lib/cn';

/**
 * Infinite uppercase marquee — a signature Kinetic-Brutalism element. The track
 * is duplicated and translated -50% so the loop is seamless. Pauses on
 * reduced-motion (animation neutralized globally via CSS) and on hover.
 */
export function Marquee({
  items,
  className,
  speed = 'normal',
}: {
  items: string[];
  className?: string;
  speed?: 'normal' | 'fast';
}) {
  const sequence = [...items, ...items];
  return (
    <div
      className={cn(
        'group relative flex overflow-hidden border-y-2 border-chalk bg-neon-cyan py-3 text-ink',
        className,
      )}
      role="presentation"
      aria-hidden="true"
    >
      <div
        className={cn(
          'flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 group-hover:[animation-play-state:paused]',
          speed === 'fast' ? 'animate-marquee-fast' : 'animate-marquee',
        )}
      >
        {sequence.map((item, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-lg uppercase tracking-wide">
            {item}
            <span className="text-xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
