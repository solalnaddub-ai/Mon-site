import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { useCart } from '@/lib/store';
import { useSound } from '@/hooks/useSound';
import { formatMoney } from '@/lib/cn';

/**
 * Slide-out cart (brief: "Contenu panier avec slide-out animation", real-time
 * total). Scrim isolates foreground (40-60% black per design checklist).
 */
export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const lines = useCart((s) => s.lines);
  const setQuantity = useCart((s) => s.setQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const subtotal = useCart((s) => s.subtotal());
  const play = useSound((s) => s.play);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[70] flex h-dvh w-full max-w-md flex-col border-l-2 border-neon-cyan bg-ink-900"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            role="dialog"
            aria-label="Panier"
          >
            <header className="flex items-center justify-between border-b-2 border-ink-700 p-5">
              <h2 className="flex items-center gap-2 font-display text-2xl uppercase">
                <ShoppingBag className="h-5 w-5" /> Panier
              </h2>
              <button
                onClick={() => {
                  play('click');
                  close();
                }}
                aria-label="Fermer le panier"
                className="grid h-10 w-10 place-items-center border-2 border-ink-600 text-chalk hover:border-neon-cyan"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <ShoppingBag className="h-10 w-10 text-chalk-dim" />
                <p className="font-mono text-sm uppercase tracking-widest text-chalk-muted">
                  Ton panier est vide
                </p>
                <button onClick={close} className="btn-brutal btn-brutal--neon mt-2">
                  Continuer le shopping
                </button>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-ink-700 overflow-y-auto">
                  {lines.map((line) => (
                    <motion.li
                      key={`${line.productId}-${line.size}-${line.color}`}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      className="flex gap-4 p-5"
                    >
                      <div className="grid h-16 w-16 shrink-0 place-items-center border-2 border-ink-600 bg-ink-800 font-display text-xl text-chalk-dim">
                        {line.title.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="truncate font-display text-base uppercase">{line.title}</h3>
                          <button
                            onClick={() => {
                              play('click');
                              removeItem(line.productId, line.size, line.color);
                            }}
                            aria-label={`Retirer ${line.title}`}
                            className="text-chalk-dim transition-colors hover:text-neon-magenta"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="font-mono text-xs text-chalk-dim">
                          {line.color} · {line.size}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center border-2 border-ink-600">
                            <button
                              onClick={() => {
                                play('click');
                                setQuantity(line.productId, line.size, line.color, line.quantity - 1);
                              }}
                              aria-label="Diminuer la quantité"
                              className="grid h-8 w-8 place-items-center text-chalk hover:bg-ink-700"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center font-mono text-sm tabular-nums">
                              {line.quantity}
                            </span>
                            <button
                              onClick={() => {
                                play('click');
                                setQuantity(line.productId, line.size, line.color, line.quantity + 1);
                              }}
                              aria-label="Augmenter la quantité"
                              className="grid h-8 w-8 place-items-center text-chalk hover:bg-ink-700"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="font-mono text-sm font-bold tabular-nums">
                            {formatMoney(line.price.amount * line.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>

                <footer className="border-t-2 border-ink-700 p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-chalk-muted">
                      Sous-total
                    </span>
                    <motion.span
                      key={subtotal}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className="font-display text-2xl tabular-nums"
                    >
                      {formatMoney(subtotal)}
                    </motion.span>
                  </div>
                  <button
                    onClick={() => play('transition')}
                    className="btn-brutal w-full bg-chalk text-ink hover:bg-neon-cyan"
                  >
                    Checkout →
                  </button>
                  <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-chalk-dim">
                    Checkout sécurisé via Shopify
                  </p>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
