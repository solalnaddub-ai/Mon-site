import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from './Logo';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useSound } from '@/hooks/useSound';

/**
 * Page-load intro: logo scales in with a glow sweep, a progress hairline fills,
 * then the curtain lifts (brief: "Intro animée avec logo — rotation, scale-in,
 * glow"). Shown once per browser session; honors reduced-motion and offers a
 * skip control (immersive-pattern best practice).
 */
export function IntroLoader() {
  const reduced = useReducedMotion();
  const play = useSound((s) => s.play);
  const [done, setDone] = useState(() => {
    if (typeof sessionStorage === 'undefined') return false;
    return sessionStorage.getItem('stayfocus:intro') === 'seen';
  });

  useEffect(() => {
    if (done) return;
    play('intro');
    const ms = reduced ? 350 : 2100;
    const t = setTimeout(finish, ms);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finish() {
    sessionStorage.setItem('stayfocus:intro', 'seen');
    setDone(true);
  }

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-ink scanlines"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          role="status"
          aria-label="Chargement de l'expérience STAYFOCUS"
        >
          <div className="flex flex-col items-center gap-8">
            <motion.div
              initial={{ scale: 0.4, rotate: reduced ? 0 : -25, opacity: 0 }}
              animate={{
                scale: 1,
                rotate: 0,
                opacity: 1,
                transition: { duration: reduced ? 0.2 : 0.9, ease: [0.16, 1, 0.3, 1] },
              }}
              className="text-glow-cyan"
            >
              <Logo withWordmark className="scale-[1.6]" />
            </motion.div>

            {/* progress hairline */}
            <div className="h-px w-56 overflow-hidden bg-ink-600">
              <motion.div
                className="h-full bg-neon-cyan shadow-glow-cyan"
                initial={{ width: '0%' }}
                animate={{ width: '100%', transition: { duration: reduced ? 0.2 : 1.8, ease: 'easeInOut' } }}
              />
            </div>

            <button
              onClick={finish}
              className="font-mono text-[10px] uppercase tracking-widest text-chalk-dim transition-colors hover:text-chalk"
            >
              Skip ↵
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
