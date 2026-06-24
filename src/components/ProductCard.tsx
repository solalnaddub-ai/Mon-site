import { motion } from 'framer-motion';
import { Plus, Star } from 'lucide-react';
import type { Product } from '@/lib/types';
import { useCart } from '@/lib/store';
import { useSound } from '@/hooks/useSound';
import { cn, formatMoney } from '@/lib/cn';

const ACCENT_RING: Record<Product['accent'], string> = {
  gold: 'group-hover:border-neon-gold group-hover:shadow-glow-gold',
  cyan: 'group-hover:border-neon-cyan group-hover:shadow-glow-cyan',
  magenta: 'group-hover:border-neon-magenta group-hover:shadow-glow-magenta',
  purple: 'group-hover:border-neon-purple group-hover:shadow-glow-purple',
  lime: 'group-hover:border-neon-lime',
};

const ACCENT_TEXT: Record<Product['accent'], string> = {
  gold: 'text-neon-gold',
  cyan: 'text-neon-cyan',
  magenta: 'text-neon-magenta',
  purple: 'text-neon-purple',
  lime: 'text-neon-lime',
};

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);
  const openCart = useCart((s) => s.open);
  const play = useSound((s) => s.play);

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    if (!product.inStock) {
      play('error');
      return;
    }
    addItem(product, { size: product.sizes[0], color: product.colors[0].name });
    play('addToCart');
    openCart();
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <a
        href={`#product-${product.handle}`}
        onClick={() => play('click')}
        onMouseEnter={() => play('hover')}
        className="block"
        aria-label={`${product.title}, ${formatMoney(product.price.amount)}`}
      >
        <div
          className={cn(
            'relative aspect-[4/5] overflow-hidden border-2 border-ink-600 bg-ink-800 transition-all duration-300',
            ACCENT_RING[product.accent],
          )}
        >
          <img
            src={product.images[0]}
            alt={product.title}
            loading="lazy"
            width={800}
            height={1000}
            className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
          />

          {product.badge && (
            <span
              className={cn(
                'absolute left-0 top-0 border-b-2 border-r-2 border-chalk bg-ink px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest',
                product.badge === 'SOLD OUT' ? 'text-chalk-dim' : ACCENT_TEXT[product.accent],
              )}
            >
              {product.badge}
            </span>
          )}

          {/* quick add — appears on hover, always reachable via keyboard */}
          <button
            onClick={quickAdd}
            onMouseEnter={() => play('hover')}
            disabled={!product.inStock}
            aria-label={product.inStock ? `Ajouter ${product.title} au panier` : 'Rupture de stock'}
            className={cn(
              'absolute bottom-3 right-3 grid h-11 w-11 place-items-center border-2 border-chalk bg-ink text-chalk',
              'opacity-0 transition-all duration-200 focus-visible:opacity-100 group-hover:opacity-100',
              'hover:bg-chalk hover:text-ink disabled:cursor-not-allowed disabled:opacity-40',
            )}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg uppercase leading-tight tracking-tight">{product.title}</h3>
            <div className="mt-1 flex items-center gap-1.5 font-mono text-xs text-chalk-muted">
              <Star className={cn('h-3 w-3 fill-current', ACCENT_TEXT[product.accent])} />
              <span className="tabular-nums">{product.rating.toFixed(1)}</span>
              <span className="text-chalk-dim">({product.reviewCount})</span>
            </div>
          </div>
          <div className="text-right">
            <span className="block font-mono text-sm font-bold tabular-nums">
              {formatMoney(product.price.amount)}
            </span>
            {product.compareAtPrice && (
              <span className="block font-mono text-xs text-chalk-dim line-through tabular-nums">
                {formatMoney(product.compareAtPrice.amount)}
              </span>
            )}
          </div>
        </div>
      </a>
    </motion.article>
  );
}
