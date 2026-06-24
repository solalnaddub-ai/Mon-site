import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useSound } from '@/hooks/useSound';
import { cn } from '@/lib/cn';

/** Newsletter signup with inline validation + success feedback (Quick Ref §8). */
export function Newsletter() {
  const play = useSound((s) => s.play);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setError('Adresse e-mail invalide');
      play('error');
      return;
    }
    setError(null);
    setDone(true);
    play('addToCart');
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="relative overflow-hidden border-2 border-neon-cyan bg-ink-900 p-8 shadow-glow-cyan sm:p-14">
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl uppercase sm:text-5xl">Rejoins le mouvement</h2>
          <p className="mx-auto mt-4 max-w-md font-body text-chalk-muted">
            Accès anticipé aux drops, codes exclusifs, et zéro spam. Juste l'essentiel.
          </p>

          {done ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 inline-flex items-center gap-2 border-2 border-neon-lime px-6 py-3 font-mono text-sm uppercase tracking-widest text-neon-lime"
            >
              <Check className="h-4 w-4" /> Tu es dans la boucle
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row" noValidate>
              <div className="flex-1 text-left">
                <label htmlFor="nl-email" className="sr-only">
                  Adresse e-mail
                </label>
                <input
                  id="nl-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="ton@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'nl-error' : undefined}
                  className={cn(
                    'h-12 w-full border-2 bg-ink px-4 font-mono text-sm text-chalk placeholder:text-chalk-dim focus:outline-none',
                    error ? 'border-neon-magenta' : 'border-ink-600 focus:border-neon-cyan',
                  )}
                />
                {error && (
                  <p id="nl-error" role="alert" className="mt-2 font-mono text-xs text-neon-magenta">
                    {error}
                  </p>
                )}
              </div>
              <button
                type="submit"
                onMouseEnter={() => play('hover')}
                className="btn-brutal h-12 bg-chalk text-ink hover:bg-neon-cyan"
              >
                S'inscrire
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
