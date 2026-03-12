"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { v4 as uuidv4 } from "uuid";
import type { CartItem } from "@/types/cart";
import { getStoredCart, setStoredCart } from "./cartStorage";

export type CartState = CartItem[];

type AddItemAction = { type: "ADD_ITEM"; item: CartItem };

type RemoveItemAction = {
  type: "REMOVE_ITEM";
  payload: { id: string };
};

type InitCartAction = {
  type: "INIT_CART";
  payload: CartItem[];
};

type CartAction = AddItemAction | RemoveItemAction | InitCartAction;

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "INIT_CART":
      return action.payload;

    case "ADD_ITEM":
      return [...state, action.item];

    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload.id);

    default:
      return state;
  }
}

export type CartContextValue = {
  cart: CartState;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (by: { id: string }) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  // Start empty so server and client render the same initial state, then
  // load persisted items after mount to avoid a hydration mismatch.
  useEffect(() => {
    dispatch({ type: "INIT_CART", payload: getStoredCart() });
  }, []);

  useEffect(() => {
    setStoredCart(cart);
  }, [cart]);

  const addItem = useCallback((item: Omit<CartItem, "id">) => {
    dispatch({
      type: "ADD_ITEM",
      item: { ...item, id: uuidv4() },
    });
  }, []);

  const removeItem = useCallback((by: { id: string }) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: by,
    });
  }, []);

  const value: CartContextValue = useMemo(
    () => ({
      cart,
      addItem,
      removeItem,
    }),
    [cart, addItem, removeItem]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (ctx == null) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
