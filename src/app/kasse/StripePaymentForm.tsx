"use client";

import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Loader2, ShoppingBasket } from "lucide-react";

interface Props {
  onSuccess: () => Promise<void>;
}

export default function StripePaymentForm({ onSuccess }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError(null);

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (stripeError) {
      setError(stripeError.message ?? "Zahlung fehlgeschlagen.");
      setSubmitting(false);
      return;
    }

    try {
      await onSuccess();
    } catch {
      setError("Bestellung konnte nicht abgeschlossen werden.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || submitting}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 font-bold text-white shadow-md transition-all hover:bg-accent-hover disabled:opacity-50"
      >
        {submitting ? <Loader2 size={18} className="animate-spin" /> : <ShoppingBasket size={18} />}
        {submitting ? "Wird verarbeitet…" : "Jetzt bezahlen"}
      </button>
    </form>
  );
}
