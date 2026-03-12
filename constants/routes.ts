/**
 * Application route paths.
 */
export const ROUTES = {
  HOME: "/",
  PRODUCT: "/product/[id]",
  CART: "/cart",
} as const;

/**
 * Builds the product detail URL for a given product id.
 */
export function productPath(id: string): string {
  return ROUTES.PRODUCT.replace("[id]", id);
}
