import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartLine, Product } from '@/lib/types';

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  /** transient flag the cart badge watches to trigger its bounce animation */
  lastAddedAt: number | null;
  open: () => void;
  close: () => void;
  toggle: () => void;
  addItem: (product: Product, opts: { size: string; color: string; quantity?: number }) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  setQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
};

const sameLine = (a: CartLine, productId: string, size: string, color: string) =>
  a.productId === productId && a.size === size && a.color === color;

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      lastAddedAt: null,

      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (product, { size, color, quantity = 1 }) =>
        set((s) => {
          const existing = s.lines.find((l) => sameLine(l, product.id, size, color));
          const lines = existing
            ? s.lines.map((l) =>
                sameLine(l, product.id, size, color) ? { ...l, quantity: l.quantity + quantity } : l,
              )
            : [
                ...s.lines,
                {
                  productId: product.id,
                  handle: product.handle,
                  title: product.title,
                  price: product.price,
                  size,
                  color,
                  quantity,
                  accent: product.accent,
                },
              ];
          return { lines, lastAddedAt: Date.now() };
        }),

      removeItem: (productId, size, color) =>
        set((s) => ({ lines: s.lines.filter((l) => !sameLine(l, productId, size, color)) })),

      setQuantity: (productId, size, color, quantity) =>
        set((s) => ({
          lines: s.lines
            .map((l) => (sameLine(l, productId, size, color) ? { ...l, quantity: Math.max(0, quantity) } : l))
            .filter((l) => l.quantity > 0),
        })),

      clear: () => set({ lines: [] }),

      count: () => get().lines.reduce((n, l) => n + l.quantity, 0),
      subtotal: () => get().lines.reduce((sum, l) => sum + l.price.amount * l.quantity, 0),
    }),
    { name: 'stayfocus:cart', partialize: (s) => ({ lines: s.lines }) },
  ),
);
