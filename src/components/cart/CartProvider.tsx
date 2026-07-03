"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "petmemoshop-cart";

export interface CartItem {
  productSlug: string;
  title: string;
  unitPrice: number;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  updateQuantity: (productSlug: string, quantity: number) => void;
  removeItem: (productSlug: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function readStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStorage(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(items);
  }, [items, hydrated]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((line) => line.productSlug === item.productSlug);
      if (existing) {
        return current.map((line) =>
          line.productSlug === item.productSlug
            ? { ...line, quantity: Math.min(10, line.quantity + quantity) }
            : line
        );
      }
      return [...current, { ...item, quantity: Math.min(10, Math.max(1, quantity)) }];
    });
  }, []);

  const updateQuantity = useCallback((productSlug: string, quantity: number) => {
    setItems((current) => {
      if (quantity <= 0) {
        return current.filter((line) => line.productSlug !== productSlug);
      }
      return current.map((line) =>
        line.productSlug === productSlug
          ? { ...line, quantity: Math.min(10, quantity) }
          : line
      );
    });
  }, []);

  const removeItem = useCallback((productSlug: string) => {
    setItems((current) => current.filter((line) => line.productSlug !== productSlug));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [items, itemCount, subtotal, addItem, updateQuantity, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
