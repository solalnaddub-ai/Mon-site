import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { Logo } from './Logo';
import { SoundToggle } from './SoundToggle';
import { useCart } from '@/lib/store';
import { useSound } from '@/hooks/useSound';
import { cn } from '@/lib/cn';

const LINKS = [
  { label: 'Shop', href: '#shop' },
  { label: 'Drops', href: '#featured' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const count = useCart((s) => s.count());
  const lastAddedAt = useCart((s) => s.lastAddedAt);
  const openCart = useCart((s) => s.open);
  const play = useSound((s) => s.play);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled ? 'border-b-2 border-ink-700 bg-ink/85 backdrop-blur-md' : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#top" aria-label="STAYFOCUS — Accueil" onMouseEnter={() => play('hover')}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="nav-link" onMouseEnter={() => play('hover')}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <SoundToggle className="hidden sm:grid" />

          {/* Cart with bounce-on-add badge */}
          <button
            onClick={() => {
              play('click');
              openCart();
            }}
            onMouseEnter={() => play('hover')}
            aria-label={`Panier, ${count} article${count > 1 ? 's' : ''}`}
            className="relative grid h-11 w-11 place-items-center border-2 border-ink-600 text-chalk transition-colors hover:border-neon-cyan hover:text-neon-cyan"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <motion.span
                key={lastAddedAt ?? count}
                initial={{ scale: 0.4 }}
                animate={{ scale: [1.4, 0.85, 1] }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center bg-neon-magenta px-1 font-mono text-[10px] font-bold text-chalk"
              >
                {count}
              </motion.span>
            )}
          </button>

          <button
            onClick={() => {
              play('click');
              setOpen(true);
            }}
            aria-label="Ouvrir le menu"
            className="grid h-11 w-11 place-items-center border-2 border-ink-600 text-chalk md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-ink/70 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed right-0 top-0 z-50 flex h-dvh w-[78%] max-w-sm flex-col border-l-2 border-neon-cyan bg-ink-900 p-6 md:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              role="dialog"
              aria-label="Menu de navigation"
            >
              <div className="mb-10 flex items-center justify-between">
                <Logo withWordmark={false} />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le menu"
                  className="grid h-11 w-11 place-items-center border-2 border-ink-600 text-chalk"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="flex flex-col gap-2">
                {LINKS.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.1 }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block border-b border-ink-700 py-4 font-display text-3xl uppercase text-chalk"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-chalk-dim">SFX</span>
                <SoundToggle />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
