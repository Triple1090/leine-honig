"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { medusa } from "./medusa";

interface CartItem {
  id: string;
  variant_id: string;
  quantity: number;
}

interface CartContextType {
  cartId: string | null;
  itemCount: number;
  cartTotal: number;
  items: CartItem[];
  isDrawerOpen: boolean;
  isInitialized: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (variantId: string, quantity: number, silent?: boolean) => Promise<void>;
  decreaseItem: (variantId: string) => Promise<void>;
  refreshCount: () => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  cartId: null,
  itemCount: 0,
  cartTotal: 0,
  items: [],
  isDrawerOpen: false,
  isInitialized: false,
  openDrawer: () => {},
  closeDrawer: () => {},
  addItem: async () => {},
  decreaseItem: async () => {},
  refreshCount: async () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [itemCount, setItemCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("lh_cart_id");
    if (stored) {
      setCartId(stored);
      loadCount(stored).finally(() => setIsInitialized(true));
    } else {
      setIsInitialized(true);
    }
  }, []);

  async function loadCount(id: string) {
    try {
      const { cart } = await medusa.store.cart.retrieve(id);
      if ((cart as any).completed_at || (cart as any).status === "completed") {
        localStorage.removeItem("lh_cart_id");
        setCartId(null);
        setItemCount(0);
        setCartTotal(0);
        setItems([]);
        return;
      }
      const count = cart.items?.reduce((sum: number, i: any) => sum + i.quantity, 0) ?? 0;
      setItemCount(count);
      const itemSubtotal = (cart.items ?? []).reduce((sum: number, i: any) => sum + (i.subtotal ?? i.unit_price * i.quantity), 0);
      setCartTotal(itemSubtotal);
      setItems((cart.items ?? []).map((i: any) => ({
        id: i.id,
        variant_id: i.variant_id,
        quantity: i.quantity,
      })));
    } catch {
      localStorage.removeItem("lh_cart_id");
      setCartId(null);
      setItemCount(0);
      setCartTotal(0);
      setItems([]);
    }
  }

  async function ensureCart(): Promise<string> {
    if (cartId) return cartId;
    const { cart } = await medusa.store.cart.create({ region_id: "" });
    localStorage.setItem("lh_cart_id", cart.id);
    setCartId(cart.id);
    return cart.id;
  }

  async function addItem(variantId: string, quantity: number, silent = false) {
    const id = await ensureCart();
    await medusa.store.cart.createLineItem(id, { variant_id: variantId, quantity });
    await loadCount(id);
    if (!silent) setIsDrawerOpen(true);
  }

  async function decreaseItem(variantId: string) {
    if (!cartId) return;
    const item = items.find((i) => i.variant_id === variantId);
    if (!item) return;
    if (item.quantity <= 1) {
      await medusa.store.cart.deleteLineItem(cartId, item.id);
    } else {
      await medusa.store.cart.updateLineItem(cartId, item.id, { quantity: item.quantity - 1 });
    }
    await loadCount(cartId);
  }

  async function refreshCount() {
    if (cartId) await loadCount(cartId);
  }

  return (
    <CartContext.Provider value={{
      cartId, itemCount, cartTotal, items, isDrawerOpen, isInitialized,
      openDrawer: () => setIsDrawerOpen(true),
      closeDrawer: () => setIsDrawerOpen(false),
      addItem, decreaseItem, refreshCount,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
