"use client";

import { Plus, Minus, Loader2, ShoppingBasket } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/src/lib/cart";
import { useToast } from "@/src/components/Toast";

interface QuickAddButtonProps {
  variantId: string;
  fullWidth?: boolean;
}

export default function QuickAddButton({ variantId, fullWidth }: QuickAddButtonProps) {
  const { addItem, decreaseItem, items } = useCart();
  const { showToast } = useToast();
  const [loading, setLoading] = useState<"inc" | "dec" | null>(null);

  const quantity = items.find((i) => i.variant_id === variantId)?.quantity ?? 0;

  async function handleIncrease(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (loading) return;
    setLoading("inc");
    try {
      await addItem(variantId, 1, true);
      showToast("Zum Warenkorb hinzugefügt");
    } finally {
      setLoading(null);
    }
  }

  async function handleDecrease(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (loading) return;
    setLoading("dec");
    try {
      await decreaseItem(variantId);
    } finally {
      setLoading(null);
    }
  }

  if (quantity === 0) {
    return (
      <button
        onClick={handleIncrease}
        aria-label="In den Warenkorb"
        disabled={loading !== null}
        className={`flex h-11 items-center justify-center gap-2 rounded-full bg-primary text-accent shadow transition-all hover:bg-primary-dark active:scale-95 disabled:opacity-50 ${fullWidth ? "w-full px-6 font-bold" : "px-3"}`}
      >
        {loading === "inc"
          ? <Loader2 size={16} className="animate-spin" />
          : <><ShoppingBasket size={16} /><Plus size={13} strokeWidth={3} /></>
        }
        {fullWidth && "In den Warenkorb"}
      </button>
    );
  }

  return (
    <div
      className={`flex items-center gap-1 rounded-full bg-primary px-1 py-1 shadow ${fullWidth ? "w-full justify-between" : ""}`}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
    >
      <button
        onClick={handleDecrease}
        disabled={loading !== null}
        aria-label="Weniger"
        className="flex h-9 w-9 items-center justify-center rounded-full text-accent transition hover:bg-primary-dark active:scale-90 disabled:opacity-50"
      >
        {loading === "dec" ? <Loader2 size={15} className="animate-spin" /> : <Minus size={15} />}
      </button>
      <span className="min-w-[2rem] text-center text-sm font-bold text-accent">
        {quantity}
      </span>
      <button
        onClick={handleIncrease}
        disabled={loading !== null}
        aria-label="Mehr"
        className="flex h-9 w-9 items-center justify-center rounded-full text-accent transition hover:bg-primary-dark active:scale-90 disabled:opacity-50"
      >
        {loading === "inc" ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
      </button>
    </div>
  );
}
