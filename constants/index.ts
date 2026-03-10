/**
 * API base URL. Set NEXT_PUBLIC_API_BASE_URL in .env.
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

/**
 * x-api-key for API authentication. Set NEXT_PUBLIC_API_KEY in .env for production.
 * Fallback is the dev api key.
 */
const DEV_API_KEY = "87909682e6cd74208f41a6ef39fe4191";
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY ?? DEV_API_KEY;

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
  return `/product/${id}`;
}
