import type { ProductProps } from "@/types/product";
import { apiRequest } from "@/api/client";

const PRODUCT_LIMIT = 20;

// Fetches the product list, optionally filtered by search query.
export async function fetchProducts(query?: string): Promise<ProductProps[]> {
  const params = new URLSearchParams({ limit: String(PRODUCT_LIMIT) });
  if (query?.trim()) params.set("search", query.trim());
  const response = await apiRequest(`products?${params.toString()}`);

  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText);
    throw new Error(message || `Products request failed (${response.status})`);
  }

  const raw = (await response.json()) as ProductProps[];
  if (!Array.isArray(raw)) {
    throw new Error("Invalid products response");
  }
  return raw;
}
