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
  payload: { id: string } | { index: number };
};

type CartAction = AddItemAction | RemoveItemAction;

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.item];

    case "REMOVE_ITEM": {
      const { payload } = action;
      if ("index" in payload) {
        const i = payload.index;
        if (i < 0 || i >= state.length) return state;
        return state.filter((_, idx) => idx !== i);
      }
      return state.filter((item) => item.id !== payload.id);
    }

    default:
      return state;
  }
}

export type CartContextValue = {
  cart: CartState;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (by: { id: string } | { index: number }) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function getInitialCart(): CartState {
  return getStoredCart();
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, null, getInitialCart);

  useEffect(() => {
    setStoredCart(cart);
  }, [cart]);

  const addItem = useCallback((item: Omit<CartItem, "id">) => {
    dispatch({
      type: "ADD_ITEM",
      item: { ...item, id: uuidv4() },
    });
  }, []);

  const removeItem = useCallback((by: { id: string } | { index: number }) => {
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
