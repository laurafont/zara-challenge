/**
 * API base URL. Set NEXT_PUBLIC_API_BASE_URL in .env.
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

/**
 * x-api-key for API authentication. Set NEXT_PUBLIC_API_KEY in .env.
 */
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY ?? "";

if (!API_KEY) {
  throw new Error(
    "Missing required environment variable: NEXT_PUBLIC_API_KEY. Add it to .env."
  );
}
