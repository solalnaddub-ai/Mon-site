import { Marquee } from '@/components/Marquee';
import { ProductCard } from '@/components/ProductCard';
import { ProductSkeleton } from '@/components/ProductSkeleton';
import { SectionHeading } from '@/components/SectionHeading';
import { useProducts } from '@/hooks/useProducts';

export function Featured() {
  const { products, loading } = useProducts();
  const featured = products.filter((p) => p.badge === 'DROP' || p.badge === 'LIMITED').slice(0, 4);

  return (
    <>
      <Marquee
        items={['NOUVELLE COLLECTION', 'SÉRIE LIMITÉE', 'LIVRAISON MONDIALE', 'DROP 001']}
        className="mt-2"
      />

      <section id="featured" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading index="01 — DROPS" kicker="Sélection" title="Pièces phares" />

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
            : featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </>
  );
}
