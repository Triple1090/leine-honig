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
    if (!cartId) {
      setItems([]);
      return;
    }
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
      const itemSubtotal = (cart.items ?? []).reduce((sum: number, i: any) => sum + (i.subtotal ?? i.unit_price * i.quantity), 0);
      setTotal(itemSubtotal);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [cartId]);

  useEffect(() => {
    if (isDrawerOpen) loadCart();
  }, [isDrawerOpen, loadCart]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeDrawer]);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50"
            style={{ background: "rgba(20,18,16,0.45)", backdropFilter: "blur(2px)" }}
            onClick={closeDrawer}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col"
            style={{ background: "var(--lh-cream)", boxShadow: "var(--shadow-xl)" }}
          >
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: "1px solid var(--color-line)" }}
            >
              <div className="flex items-center gap-3">
                <ShoppingBasket size={18} style={{ color: "var(--lh-gold-deep)" }} />
                <h2
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "var(--fs-20)",
                    fontWeight: 500,
                    color: "var(--lh-ink)",
                  }}
                >
                  Warenkorb
                </h2>
              </div>
              <button
                onClick={closeDrawer}
                className="lh-btn lh-btn--ghost"
                style={{ width: 36, height: 36, padding: 0, borderRadius: 999 }}
                aria-label="Warenkorb schließen"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {loading ? (
                <div className="flex h-full items-center justify-center">
                  <div
                    className="h-6 w-6 animate-spin rounded-full"
                    style={{ border: "2px solid var(--lh-gold)", borderTopColor: "transparent" }}
                  />
                </div>
              ) : items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <Package size={48} style={{ color: "var(--color-line)" }} />
                  <p style={{ fontFamily: "var(--font-sans)", color: "var(--lh-ink-3)" }}>
                    Dein Warenkorb ist leer.
                  </p>
                  <button onClick={closeDrawer} className="lh-btn lh-btn--primary">
                    Weiter einkaufen
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-3"
                      style={{
                        background: "var(--lh-paper)",
                        border: "1px solid var(--color-line)",
                        borderRadius: 12,
                      }}
                    >
                      <div
                        className="flex h-14 w-14 shrink-0 items-center justify-center"
                        style={{ background: "var(--lh-paper-soft)", borderRadius: 10 }}
                      >
                        {item.thumbnail ? (
                          <Image
                            src={item.thumbnail}
                            alt={item.title}
                            width={48}
                            height={48}
                            className="max-h-12 w-auto object-contain"
                          />
                        ) : (
                          <Package size={24} style={{ color: "var(--lh-ink-3)" }} />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p
                          className="truncate"
                          style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-14)", fontWeight: 600, color: "var(--lh-ink)" }}
                        >
                          {item.title}
                        </p>
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-12)", color: "var(--lh-ink-3)" }}>
                          {item.variant_title}
                        </p>
                        <p
                          className="mt-0.5"
                          style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-16)", fontWeight: 500, color: "var(--lh-gold-deep)" }}
                        >
                          {formatPrice(item.subtotal)}
                        </p>
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <div
                          className="flex items-center gap-1.5"
                          style={{ background: "var(--lh-cream)", borderRadius: 999, padding: 2 }}
                        >
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full"
                            style={{ color: "var(--lh-ink)" }}
                            aria-label="Weniger"
                          >
                            <Minus size={10} />
                          </button>
                          <span
                            className="w-5 text-center"
                            style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-14)", fontWeight: 600, color: "var(--lh-ink)" }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full"
                            style={{ color: "var(--lh-ink)" }}
                            aria-label="Mehr"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                        <button
                          onClick={() => updateQuantity(item.id, 0)}
                          aria-label="Entfernen"
                          style={{ color: "var(--lh-ink-3)" }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-6 py-5" style={{ borderTop: "1px solid var(--color-line)" }}>
                <div className="mb-3 flex items-center justify-between">
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-14)", color: "var(--lh-ink-3)" }}>
                    Warenwert
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--fs-24)",
                      fontWeight: 500,
                      color: "var(--lh-ink)",
                    }}
                  >
                    {formatPrice(total)}
                  </span>
                </div>
                <p className="mb-4 lh-meta">Versandkosten werden im Checkout berechnet.</p>
                <Link
                  href="/kasse"
                  onClick={closeDrawer}
                  className="lh-btn lh-btn--primary lh-btn--lg w-full"
                >
                  Zur Kasse <ArrowRight size={16} />
                </Link>
                <button
                  onClick={closeDrawer}
                  className="lh-btn lh-btn--ghost mt-2 w-full"
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
