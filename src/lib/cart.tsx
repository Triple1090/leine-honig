"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { medusa } from "./medusa";

interface CartContextType {
  cartId: string | null;
  itemCount: number;
  cartTotal: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (variantId: string, quantity: number) => Promise<void>;
  refreshCount: () => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  cartId: null,
  itemCount: 0,
  cartTotal: 0,
  isDrawerOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
  addItem: async () => {},
  refreshCount: async () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [itemCount, setItemCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("lh_cart_id");
    if (stored) {
      setCartId(stored);
      loadCount(stored);
    }
  }, []);

  async function loadCount(id: string) {
    try {
      const { cart } = await medusa.store.cart.retrieve(id);
      const count = cart.items?.reduce((sum: number, i: any) => sum + i.quantity, 0) ?? 0;
      setItemCount(count);
      setCartTotal(cart.total ?? 0);
    } catch {
      localStorage.removeItem("lh_cart_id");
      setCartId(null);
      setItemCount(0);
      setCartTotal(0);
    }
  }

  async function ensureCart(): Promise<string> {
    if (cartId) return cartId;
    const { cart } = await medusa.store.cart.create({ region_id: "" });
    localStorage.setItem("lh_cart_id", cart.id);
    setCartId(cart.id);
    return cart.id;
  }

  async function addItem(variantId: string, quantity: number) {
    const id = await ensureCart();
    await medusa.store.cart.createLineItem(id, { variant_id: variantId, quantity });
    await loadCount(id);
    setIsDrawerOpen(true);
  }

  async function refreshCount() {
    if (cartId) await loadCount(cartId);
  }

  return (
    <CartContext.Provider value={{
      cartId, itemCount, cartTotal, isDrawerOpen,
      openDrawer: () => setIsDrawerOpen(true),
      closeDrawer: () => setIsDrawerOpen(false),
      addItem, refreshCount,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
