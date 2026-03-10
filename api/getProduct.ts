import type { ProductDetailProps } from "@/types/product";
import { apiRequest } from "@/api/client";

//Fetches a single product by id
export async function getProduct(id: string): Promise<ProductDetailProps> {
  const path = `products/${encodeURIComponent(id)}`;
  const response = await apiRequest(path);

  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText);
    throw new Error(message || `Product request failed (${response.status})`);
  }

  const raw = (await response.json()) as ProductDetailProps;
  if (!raw || typeof raw !== "object") {
    throw new Error("Invalid product response");
  }

  return {
    ...raw,
    colorOptions: raw.colorOptions ?? [],
    storageOptions: raw.storageOptions ?? [],
    similarProducts: raw.similarProducts ?? [],
  };
}
