"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBasket, Package, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { medusa, formatPrice } from "@/src/lib/medusa";
import { useCart } from "@/src/lib/cart";

interface CartItem {
  id: string;
  title: string;
  thumbnail: string | null;
  variant_title: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export default function CartDrawer() {
  const { cartId, isDrawerOpen, closeDrawer, refreshCount } = useCart();
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadCart = useCallback(async () => {
    if (!cartId) { setItems([]); return; }
    setLoading(true);
    try {
      const { cart } = await medusa.store.cart.retrieve(cartId);
      setItems((cart.items ?? []).map((i: any) => ({
        id: i.id,
        title: i.title,
        thumbnail: i.thumbnail ?? null,
        variant_title: i.variant_title ?? "",
        quantity: i.quantity,
        unit_price: i.unit_price,
        subtotal: i.subtotal ?? i.unit_price * i.quantity,
      })));
      setTotal(cart.total ?? 0);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [cartId]);

  useEffect(() => {
    if (isDrawerOpen) loadCart();
  }, [isDrawerOpen, loadCart]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeDrawer(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeDrawer]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isDrawerOpen]);

  async function updateQuantity(lineId: string, quantity: number) {
    if (!cartId) return;
    if (quantity < 1) {
      await medusa.store.cart.deleteLineItem(cartId, lineId);
    } else {
      await medusa.store.cart.updateLineItem(cartId, lineId, { quantity });
    }
    await loadCart();
    await refreshCount();
  }

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={closeDrawer}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-100 px-6 py-5">
              <div className="flex items-center gap-3">
                <ShoppingBasket size={20} className="text-accent" />
                <h2 className="text-lg font-extrabold text-stone-900">Warenkorb</h2>
              </div>
              <button
                onClick={closeDrawer}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-500 transition-colors hover:bg-stone-200"
              >
                <X size={16} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {loading ? (
                <div className="flex h-full items-center justify-center">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              ) : items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <Package size={48} className="text-stone-200" />
                  <p className="text-stone-500">Dein Warenkorb ist leer.</p>
                  <button
                    onClick={closeDrawer}
                    className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-stone-900 transition-colors hover:bg-primary-dark"
                  >
                    Weiter einkaufen
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-stone-100 bg-stone-50 p-3">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white">
                        {item.thumbnail ? (
                          <Image
                            src={item.thumbnail}
                            alt={item.title}
                            width={48}
                            height={48}
                            className="max-h-12 w-auto object-contain"
                          />
                        ) : (
                          <Package size={24} className="text-stone-300" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-stone-900">{item.title}</p>
                        <p className="text-xs text-stone-400">{item.variant_title}</p>
                        <p className="mt-0.5 text-sm font-black text-primary">
                          {formatPrice(item.subtotal)}
                        </p>
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-stone-500 shadow-sm transition-colors hover:bg-stone-100"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="w-4 text-center text-sm font-bold text-stone-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-stone-500 shadow-sm transition-colors hover:bg-stone-100"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                        <button
                          onClick={() => updateQuantity(item.id, 0)}
                          className="text-stone-300 transition-colors hover:text-red-400"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-stone-100 px-6 py-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-stone-500">Gesamt</span>
                  <span className="text-xl font-black text-stone-900">
                    {formatPrice(total)}
                  </span>
                </div>
                <p className="mb-4 text-xs text-stone-400">Inkl. MwSt. · zzgl. Versandkosten</p>
                <Link
                  href="/kasse"
                  onClick={closeDrawer}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 font-bold text-white shadow-md transition-all hover:bg-accent-hover"
                >
                  Zur Kasse <ArrowRight size={16} />
                </Link>
                <button
                  onClick={closeDrawer}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-stone-100 py-3 text-sm font-bold text-stone-600 transition-colors hover:bg-stone-200"
                >
                  Weiter einkaufen
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
