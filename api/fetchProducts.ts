import type { ProductProps } from "@/types/product";
import { apiRequest } from "@/api/client";

// Fetches the product list, optionally filtered by search query.

export async function fetchProducts(query?: string): Promise<ProductProps[]> {
  const path = query?.trim()
    ? `products?search=${encodeURIComponent(query.trim())}`
    : "products";
  const response = await apiRequest(path);

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
