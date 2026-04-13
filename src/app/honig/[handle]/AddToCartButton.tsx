"use client";

import { useState } from "react";
import { ShoppingBasket, Check, Loader2 } from "lucide-react";
import { useCart } from "@/src/lib/cart";

interface Props {
  variantId: string;
  disabled?: boolean;
}

export default function AddToCartButton({ variantId, disabled }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "added">("idle");
  const { addItem } = useCart();

  async function handleClick() {
    if (status !== "idle" || disabled) return;
    setStatus("loading");
    try {
      await addItem(variantId, 1);
      setStatus("added");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("idle");
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled || status === "loading"}
      className={`flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold shadow-md transition-all ${
        status === "added"
          ? "bg-green-500 text-white"
          : "bg-accent hover:bg-accent-hover text-white hover:shadow-xl"
      } disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {status === "loading" && <Loader2 size={18} className="animate-spin" />}
      {status === "added" && <Check size={18} />}
      {status === "idle" && <ShoppingBasket size={18} />}
      {status === "added" ? "Im Warenkorb!" : "In den Warenkorb"}
    </button>
  );
}
