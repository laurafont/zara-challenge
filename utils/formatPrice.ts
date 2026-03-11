//Formats a price for display as "3000 EUR"

export function formatPrice(price: number, locale = "de-DE"): string {
  return (
    new Intl.NumberFormat(locale, {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(price) + " EUR"
  );
}
