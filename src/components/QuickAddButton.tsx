"use client";

import { Plus, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/src/lib/cart";

interface QuickAddButtonProps {
  variantId: string;
}

export default function QuickAddButton({ variantId }: QuickAddButtonProps) {
  const { addItem, items } = useCart();
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const quantity = items.find((i) => i.variant_id === variantId)?.quantity ?? 0;

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (state !== "idle") return;
    setState("loading");
    try {
      await addItem(variantId, 1);
      setState("done");
      setTimeout(() => setState("idle"), 1500);
    } catch {
      setState("idle");
    }
  }

  return (
    <div className="flex items-center gap-2">
      {quantity > 0 && (
        <span className="min-w-[1.25rem] text-center text-sm font-bold text-accent">
          {quantity}×
        </span>
      )}
      <button
        onClick={handleClick}
        aria-label="In den Warenkorb"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-accent shadow transition-all hover:bg-primary-dark active:scale-90 disabled:opacity-50"
        disabled={state === "loading"}
      >
        {state === "loading" && <Loader2 size={18} className="animate-spin" />}
        {state === "done" && <Check size={18} />}
        {state === "idle" && <Plus size={18} />}
      </button>
    </div>
  );
}
