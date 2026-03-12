// Formats a price as "3000 EUR".
export function formatPrice(price: number): string {
  return Math.round(price) + " EUR";
}
