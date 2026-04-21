"use client";

import { Plus, Minus, Loader2 } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/src/lib/cart";
import { useToast } from "@/src/components/Toast";

interface QuickAddButtonProps {
  variantId: string;
}

export default function QuickAddButton({ variantId }: QuickAddButtonProps) {
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
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-accent shadow transition-all hover:bg-primary-dark active:scale-90 disabled:opacity-50"
      >
        {loading === "inc" ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
      </button>
    );
  }

  return (
    <div
      className="flex items-center gap-1 rounded-full bg-primary px-1 py-1 shadow"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
    >
      <button
        onClick={handleDecrease}
        disabled={loading !== null}
        aria-label="Weniger"
        className="flex h-8 w-8 items-center justify-center rounded-full text-accent transition hover:bg-primary-dark active:scale-90 disabled:opacity-50"
      >
        {loading === "dec" ? <Loader2 size={15} className="animate-spin" /> : <Minus size={15} />}
      </button>
      <span className="min-w-[1.5rem] text-center text-sm font-bold text-accent">
        {quantity}
      </span>
      <button
        onClick={handleIncrease}
        disabled={loading !== null}
        aria-label="Mehr"
        className="flex h-8 w-8 items-center justify-center rounded-full text-accent transition hover:bg-primary-dark active:scale-90 disabled:opacity-50"
      >
        {loading === "inc" ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
      </button>
    </div>
  );
}
