import type { Product } from '@/lib/types';

/**
 * Mock STAYFOCUS catalog. The shape mirrors the Shopify Storefront API so the
 * `shopify.ts` client can later return the same `Product[]` from real data.
 * Images use a neutral placeholder service; swap for Shopify media / glTF.
 */
function img(seed: string): string {
  return `https://picsum.photos/seed/stayfocus-${seed}/800/1000`;
}

const eur = (amount: number) => ({ amount, currencyCode: 'EUR' as const });

export const PRODUCTS: Product[] = [
  {
    id: 'sf-001',
    handle: 'focus-heavy-hoodie',
    title: 'FOCUS Heavy Hoodie',
    category: 'tops',
    price: eur(120),
    compareAtPrice: eur(150),
    rating: 4.8,
    reviewCount: 214,
    accent: 'cyan',
    colors: [
      { name: 'Black', value: '#0a0a0a' },
      { name: 'Bone', value: '#e7e5e4' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [img('hoodie-1'), img('hoodie-2')],
    description: '450gsm boxy hoodie, brushed interior, puff-print STAYFOCUS lockup.',
    inStock: true,
    badge: 'DROP',
  },
  {
    id: 'sf-002',
    handle: 'static-cargo-pant',
    title: 'STATIC Cargo Pant',
    category: 'bottoms',
    price: eur(95),
    rating: 4.6,
    reviewCount: 132,
    accent: 'gold',
    colors: [
      { name: 'Charcoal', value: '#1a1a1a' },
      { name: 'Sand', value: '#c2b280' },
    ],
    sizes: ['28', '30', '32', '34', '36'],
    images: [img('cargo-1'), img('cargo-2')],
    description: 'Relaxed ripstop cargo with riveted utility pockets and tonal webbing.',
    inStock: true,
    badge: 'NEW',
  },
  {
    id: 'sf-003',
    handle: 'signal-puffer',
    title: 'SIGNAL Puffer',
    category: 'outerwear',
    price: eur(240),
    rating: 4.9,
    reviewCount: 78,
    accent: 'magenta',
    colors: [
      { name: 'Void', value: '#000000' },
      { name: 'Neon', value: '#e11d8f' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [img('puffer-1'), img('puffer-2')],
    description: 'Glossy ripstop puffer, sealed seams, reflective STAYFOCUS tab.',
    inStock: true,
    badge: 'LIMITED',
  },
  {
    id: 'sf-004',
    handle: 'grid-beanie',
    title: 'GRID Beanie',
    category: 'accessories',
    price: eur(35),
    rating: 4.7,
    reviewCount: 301,
    accent: 'lime',
    colors: [
      { name: 'Black', value: '#0a0a0a' },
      { name: 'Lime', value: '#bef264' },
    ],
    sizes: ['OS'],
    images: [img('beanie-1'), img('beanie-2')],
    description: 'Chunky rib beanie with woven box logo. One size.',
    inStock: true,
  },
  {
    id: 'sf-005',
    handle: 'noise-tee',
    title: 'NOISE Boxy Tee',
    category: 'tops',
    price: eur(55),
    rating: 4.5,
    reviewCount: 188,
    accent: 'purple',
    colors: [
      { name: 'Black', value: '#0a0a0a' },
      { name: 'Off White', value: '#f5f5f4' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [img('tee-1'), img('tee-2')],
    description: '240gsm heavyweight tee, dropped shoulder, glitch-graphic back hit.',
    inStock: true,
    badge: 'DROP',
  },
  {
    id: 'sf-006',
    handle: 'render-work-jacket',
    title: 'RENDER Work Jacket',
    category: 'outerwear',
    price: eur(180),
    rating: 4.8,
    reviewCount: 64,
    accent: 'cyan',
    colors: [
      { name: 'Slate', value: '#242424' },
      { name: 'Black', value: '#000000' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [img('jacket-1'), img('jacket-2')],
    description: 'Boxy canvas chore jacket, triple-needle stitch, contrast neon lining.',
    inStock: false,
    badge: 'SOLD OUT',
  },
  {
    id: 'sf-007',
    handle: 'vector-shorts',
    title: 'VECTOR Mesh Shorts',
    category: 'bottoms',
    price: eur(65),
    rating: 4.4,
    reviewCount: 96,
    accent: 'gold',
    colors: [
      { name: 'Black', value: '#0a0a0a' },
      { name: 'Gold', value: '#f5c518' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [img('shorts-1'), img('shorts-2')],
    description: 'Double-layer mesh shorts with bonded STAYFOCUS side print.',
    inStock: true,
    badge: 'NEW',
  },
  {
    id: 'sf-008',
    handle: 'pixel-crossbody',
    title: 'PIXEL Crossbody',
    category: 'accessories',
    price: eur(80),
    rating: 4.9,
    reviewCount: 142,
    accent: 'magenta',
    colors: [
      { name: 'Black', value: '#0a0a0a' },
      { name: 'Magenta', value: '#e11d8f' },
    ],
    sizes: ['OS'],
    images: [img('bag-1'), img('bag-2')],
    description: 'Tactical crossbody with magnetic buckle and reflective trim.',
    inStock: true,
    badge: 'LIMITED',
  },
];

export const FEATURED: Product[] = PRODUCTS.filter((p) => p.badge === 'DROP' || p.badge === 'LIMITED').slice(0, 4);

export function getProductByHandle(handle: string): Product | undefined {
  return PRODUCTS.find((p) => p.handle === handle);
}
