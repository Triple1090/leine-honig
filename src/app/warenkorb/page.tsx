"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBasket, Trash2, Plus, Minus, ArrowRight, Package } from "lucide-react";
import { medusa, formatPrice } from "@/src/lib/medusa";
import { useCart } from "@/src/lib/cart";

interface CartItem {
  id: string;
  title: string;
  thumbnail: string | null;
  variant_title: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export default function WarenkorbPage() {
  const { cartId, refreshCount } = useCart();
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  async function loadCart() {
    if (!cartId) {
      setLoading(false);
      return;
    }
    try {
      const { cart } = await medusa.store.cart.retrieve(cartId);
      const mapped: CartItem[] = (cart.items ?? []).map((i: any) => ({
        id: i.id,
        title: i.title,
        thumbnail: i.thumbnail ?? null,
        variant_title: i.variant_title ?? "",
        quantity: i.quantity,
        unit_price: i.unit_price,
        total: i.subtotal ?? i.unit_price * i.quantity,
      }));
      setItems(mapped);
      const itemSubtotal = (cart.items ?? []).reduce((sum: number, i: any) => sum + (i.subtotal ?? i.unit_price * i.quantity), 0);
      setTotal(itemSubtotal);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCart();
  }, [cartId]);

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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: "var(--color-bg)" }}>
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 pt-32" style={{ background: "var(--color-bg)" }}>
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="mb-10 font-heading text-3xl font-light md:text-4xl" style={{ color: "var(--color-ink)" }}>
          Dein Warenkorb
        </h1>

        {items.length === 0 ? (
          <div className="rounded-[2.5rem] p-16 text-center" style={{ background: "var(--color-bg-soft)", border: "1px solid var(--color-line)" }}>
            <Package size={64} className="mx-auto mb-4" style={{ color: "var(--color-line)" }} />
            <p className="mb-8 text-lg" style={{ color: "var(--color-ink-mute)" }}>Dein Warenkorb ist leer.</p>
            <Link
              href="/honig"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold shadow-md transition-all hover:opacity-90 active:scale-95"
              style={{ background: "var(--color-primary)", color: "var(--lh-ink)" }}
            >
              <ShoppingBasket size={18} /> Zum Shop
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Items */}
            <div className="rounded-[2.5rem]" style={{ background: "var(--color-bg-soft)", border: "1px solid var(--color-line)" }}>
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-6"
                  style={idx < items.length - 1 ? { borderBottom: "1px solid var(--color-line)" } : {}}
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl" style={{ background: "var(--color-bg-elev)" }}>
                    {item.thumbnail ? (
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        width={56}
                        height={56}
                        className="max-h-14 w-auto object-contain"
                      />
                    ) : (
                      <Package size={32} style={{ color: "var(--color-ink-mute)" }} />
                    )}
                  </div>

                  <div className="flex-grow">
                    <p className="font-medium" style={{ color: "var(--color-ink)" }}>{item.title}</p>
                    <p className="text-sm" style={{ color: "var(--color-ink-mute)" }}>{item.variant_title}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                      style={{ background: "var(--color-bg-elev)", color: "var(--color-ink-mute)" }}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center font-medium" style={{ color: "var(--color-ink)" }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                      style={{ background: "var(--color-bg-elev)", color: "var(--color-ink-mute)" }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="w-24 text-right">
                    <p className="font-heading font-semibold" style={{ color: "var(--color-primary)" }}>
                      {formatPrice(item.total)}
                    </p>
                    <p className="text-xs" style={{ color: "var(--color-ink-mute)" }}>
                      {formatPrice(item.unit_price)} / Stk.
                    </p>
                  </div>

                  <button
                    onClick={() => updateQuantity(item.id, 0)}
                    className="ml-2 transition-colors hover:text-red-400"
                    style={{ color: "var(--color-ink-mute)" }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="rounded-[2.5rem] p-8" style={{ background: "var(--color-bg-soft)", border: "1px solid var(--color-line)" }}>
              <div className="flex items-center justify-between text-lg font-medium" style={{ color: "var(--color-ink)" }}>
                <span>Warenwert</span>
                <span className="font-heading text-2xl font-semibold" style={{ color: "var(--color-primary)" }}>
                  {formatPrice(total)}
                </span>
              </div>
              <p className="mt-1 text-sm" style={{ color: "var(--color-ink-mute)" }}>Versandkosten werden im Checkout berechnet</p>

              <Link
                href="/kasse"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold shadow-md transition-all hover:opacity-90 active:scale-95"
                style={{ background: "var(--color-primary)", color: "var(--lh-ink)" }}
              >
                Zur Kasse <ArrowRight size={18} />
              </Link>

              <Link
                href="/honig"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-medium transition-colors"
                style={{ background: "var(--color-bg-elev)", color: "var(--color-ink-mute)" }}
              >
                <ShoppingBasket size={16} /> Weiter einkaufen
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
