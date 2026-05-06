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
        className={`lh-btn lh-btn--primary ${fullWidth ? "w-full" : ""}`}
      >
        {loading === "inc" ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <>
            <ShoppingBasket size={16} />
            {fullWidth ? "In den Warenkorb" : <Plus size={13} strokeWidth={3} />}
          </>
        )}
      </button>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1 ${fullWidth ? "w-full justify-between" : ""}`}
      style={{
        background: "var(--lh-gold)",
        color: "var(--lh-ink)",
        borderRadius: 999,
        padding: "4px",
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <button
        onClick={handleDecrease}
        disabled={loading !== null}
        aria-label="Weniger"
        className="flex h-9 w-9 items-center justify-center rounded-full transition active:scale-95 disabled:opacity-50"
        style={{ color: "var(--lh-ink)" }}
      >
        {loading === "dec" ? <Loader2 size={15} className="animate-spin" /> : <Minus size={15} />}
      </button>
      <span
        className="min-w-[2rem] text-center text-sm"
        style={{ color: "var(--lh-ink)", fontWeight: 700 }}
      >
        {quantity}
      </span>
      <button
        onClick={handleIncrease}
        disabled={loading !== null}
        aria-label="Mehr"
        className="flex h-9 w-9 items-center justify-center rounded-full transition active:scale-95 disabled:opacity-50"
        style={{ color: "var(--lh-ink)" }}
      >
        {loading === "inc" ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
      </button>
    </div>
  );
}
