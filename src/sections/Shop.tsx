import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ProductCard } from '@/components/ProductCard';
import { ProductSkeleton } from '@/components/ProductSkeleton';
import { SectionHeading } from '@/components/SectionHeading';
import { useProducts } from '@/hooks/useProducts';
import { useSound } from '@/hooks/useSound';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/cn';

const FILTERS: { label: string; value: Product['category'] | 'all' }[] = [
  { label: 'Tout', value: 'all' },
  { label: 'Hauts', value: 'tops' },
  { label: 'Outerwear', value: 'outerwear' },
  { label: 'Bas', value: 'bottoms' },
  { label: 'Accessoires', value: 'accessories' },
];

export function Shop() {
  const { products, loading } = useProducts();
  const play = useSound((s) => s.play);
  const [active, setActive] = useState<Product['category'] | 'all'>('all');

  const visible = useMemo(
    () => (active === 'all' ? products : products.filter((p) => p.category === active)),
    [products, active],
  );

  return (
    <section id="shop" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading index="02 — SHOP" kicker="Catalogue" title="Le vestiaire" />

      {/* Filter chips */}
      <div className="mb-10 flex flex-wrap gap-3" role="tablist" aria-label="Filtres catégorie">
        {FILTERS.map((f) => {
          const isActive = active === f.value;
          return (
            <button
              key={f.value}
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                play('click');
                setActive(f.value);
              }}
              onMouseEnter={() => play('hover')}
              className={cn(
                'border-2 px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-colors duration-150',
                isActive
                  ? 'border-neon-cyan bg-neon-cyan text-ink'
                  : 'border-ink-600 text-chalk-muted hover:border-chalk hover:text-chalk',
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.div key={p.id} layout exit={{ opacity: 0, scale: 0.96 }}>
                <ProductCard product={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {!loading && visible.length === 0 && (
        <p className="py-16 text-center font-mono text-sm uppercase tracking-widest text-chalk-dim">
          Aucune pièce dans cette catégorie
        </p>
      )}
    </section>
  );
}
