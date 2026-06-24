/** Domain types — shaped to map cleanly onto the Shopify Storefront API later. */

export type Money = {
  amount: number;
  currencyCode: 'EUR' | 'USD';
};

export type ProductColor = {
  name: string;
  /** hex swatch */
  value: string;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  /** product category for Shop filters */
  category: 'tops' | 'outerwear' | 'bottoms' | 'accessories';
  price: Money;
  compareAtPrice?: Money;
  rating: number; // 0..5
  reviewCount: number;
  /** neon accent token used for hover glow per product */
  accent: 'gold' | 'cyan' | 'magenta' | 'purple' | 'lime';
  colors: ProductColor[];
  sizes: string[];
  /** placeholder visuals; real build swaps in Shopify media + glTF models */
  images: string[];
  description: string;
  inStock: boolean;
  badge?: 'DROP' | 'SOLD OUT' | 'LIMITED' | 'NEW';
};

export type CartLine = {
  productId: string;
  handle: string;
  title: string;
  price: Money;
  size: string;
  color: string;
  quantity: number;
  accent: Product['accent'];
};
