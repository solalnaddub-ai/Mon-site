import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

/** Reusable brutalist section heading with an index tag and reveal. */
export function SectionHeading({
  index,
  title,
  kicker,
  className,
}: {
  index: string;
  title: string;
  kicker?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn('mb-10 flex items-end justify-between gap-6 border-b-2 border-ink-700 pb-5', className)}
    >
      <div>
        {kicker && (
          <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-neon-cyan">
            {kicker}
          </span>
        )}
        <h2 className="font-display text-5xl uppercase leading-none sm:text-6xl">{title}</h2>
      </div>
      <span className="font-mono text-sm text-chalk-dim tabular-nums">{index}</span>
    </motion.div>
  );
}
