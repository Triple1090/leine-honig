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
      setTotal(cart.total ?? 0);
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
      <div className="flex min-h-screen items-center justify-center bg-stone-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-24 pt-32">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="mb-10 text-3xl font-extrabold text-stone-900 md:text-4xl">
          Dein Warenkorb
        </h1>

        {items.length === 0 ? (
          <div className="rounded-[2.5rem] border border-stone-100 bg-white p-16 text-center shadow-sm">
            <Package size={64} className="mx-auto mb-4 text-stone-300" />
            <p className="mb-8 text-lg text-stone-600">Dein Warenkorb ist leer.</p>
            <Link
              href="/honig"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-bold text-white shadow-md transition-all hover:bg-accent-hover hover:shadow-xl"
            >
              <ShoppingBasket size={18} /> Zum Shop
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Items */}
            <div className="rounded-[2.5rem] border border-stone-100 bg-white shadow-sm">
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 p-6 ${
                    idx < items.length - 1 ? "border-b border-stone-100" : ""
                  }`}
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-stone-50">
                    {item.thumbnail ? (
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        width={56}
                        height={56}
                        className="max-h-14 w-auto object-contain"
                      />
                    ) : (
                      <Package size={32} className="text-stone-300" />
                    )}
                  </div>

                  <div className="flex-grow">
                    <p className="font-bold text-stone-900">{item.title}</p>
                    <p className="text-sm text-stone-500">{item.variant_title}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-colors hover:bg-stone-200"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center font-bold text-stone-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-colors hover:bg-stone-200"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="w-24 text-right">
                    <p className="font-heading font-black text-primary">
                      {formatPrice(item.total)}
                    </p>
                    <p className="text-xs text-stone-400">
                      {formatPrice(item.unit_price)} / Stk.
                    </p>
                  </div>

                  <button
                    onClick={() => updateQuantity(item.id, 0)}
                    className="ml-2 text-stone-300 transition-colors hover:text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="rounded-[2.5rem] border border-stone-100 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between text-lg font-bold text-stone-900">
                <span>Gesamt</span>
                <span className="font-heading text-2xl font-black text-primary">
                  {formatPrice(total)}
                </span>
              </div>
              <p className="mt-1 text-sm text-stone-400">Inkl. MwSt. · zzgl. Versandkosten</p>

              <Link
                href="/kasse"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 font-bold text-white shadow-md transition-all hover:bg-accent-hover hover:shadow-xl"
              >
                Zur Kasse <ArrowRight size={18} />
              </Link>

              <Link
                href="/honig"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-stone-100 px-8 py-3 text-sm font-bold text-stone-700 transition-colors hover:bg-stone-200"
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
