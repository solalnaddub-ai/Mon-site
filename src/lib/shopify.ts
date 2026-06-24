import type { Product } from '@/lib/types';
import { PRODUCTS, getProductByHandle } from '@/data/products';

/**
 * Shopify Storefront API client — interface seam.
 *
 * Today this resolves against the mock catalog so the UI is fully functional
 * without credentials. To go live, set the env vars below and implement the
 * GraphQL calls inside `fetchStorefront`; the public `getProducts` /
 * `getProduct` signatures stay identical, so no UI code changes.
 *
 *   VITE_SHOPIFY_DOMAIN=your-store.myshopify.com
 *   VITE_SHOPIFY_STOREFRONT_TOKEN=xxxxxxxx
 */

const DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN as string | undefined;
const TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string | undefined;

export const isShopifyConfigured = Boolean(DOMAIN && TOKEN);

// Simulate async so the UI exercises real loading/skeleton states (Quick Ref §3).
function delay<T>(value: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

async function fetchStorefront<T>(_query: string, _variables?: Record<string, unknown>): Promise<T> {
  // TODO(live): POST to `https://${DOMAIN}/api/2024-10/graphql.json`
  // with header `X-Shopify-Storefront-Access-Token: ${TOKEN}` and map the
  // response to our `Product` type.
  throw new Error('Shopify Storefront API not configured. Using mock catalog.');
}

export const shopify = {
  async getProducts(): Promise<Product[]> {
    if (!isShopifyConfigured) return delay(PRODUCTS);
    return fetchStorefront<Product[]>('# products query');
  },
  async getProduct(handle: string): Promise<Product | undefined> {
    if (!isShopifyConfigured) return delay(getProductByHandle(handle));
    return fetchStorefront<Product | undefined>('# product query', { handle });
  },
};
