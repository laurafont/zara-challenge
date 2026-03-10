import type { CartItem } from "@/types/cart";

const STORAGE_KEY = "zara-cart";

function isCartItemArray(value: unknown): value is CartItem[] {
  return Array.isArray(value) && value.every(isCartItem);
}

function isCartItem(value: unknown): value is CartItem {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof (value as CartItem).id === "string" &&
    "productId" in value &&
    typeof (value as CartItem).productId === "string" &&
    "color" in value &&
    typeof (value as CartItem).color === "string" &&
    "storage" in value &&
    typeof (value as CartItem).storage === "string" &&
    "unitPrice" in value &&
    typeof (value as CartItem).unitPrice === "number"
  );
}

/**
 * Reads cart from localStorage. Returns empty array on missing/invalid data.
 */
export function getStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw == null) return [];
    const parsed: unknown = JSON.parse(raw);
    return isCartItemArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Writes cart to localStorage.
 */
export function setStoredCart(cart: CartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // Ignore quota or serialization errors
  }
}
