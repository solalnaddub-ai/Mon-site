import { useEffect, useState } from 'react';
import type { Product } from '@/lib/types';
import { shopify } from '@/lib/shopify';

/** Loads the catalog through the Shopify client seam (mock today). */
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    shopify
      .getProducts()
      .then((data) => {
        if (active) setProducts(data);
      })
      .catch((e: unknown) => {
        if (active) setError(e instanceof Error ? e.message : 'Erreur de chargement');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { products, loading, error };
}
