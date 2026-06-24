import { clsx, type ClassValue } from 'clsx';

/** Tiny className combiner. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export function formatMoney(amount: number, currency: 'EUR' | 'USD' = 'EUR'): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}
