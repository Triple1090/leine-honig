"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBasket, CreditCard, Building2, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { medusa, formatPrice } from "@/src/lib/medusa";
import { useCart } from "@/src/lib/cart";
import StripePaymentForm from "./StripePaymentForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");
const GERMANY_COUNTRY_CODE = "de";

const DHL_TIERS = [
  { maxWeight: 2000,  amount: 4.29 },
  { maxWeight: 5000,  amount: 6.49 },
  { maxWeight: 10000, amount: 8.49 },
  { maxWeight: 20000, amount: 13.99 },
];

function cartWeightGrams(items: any[]): number {
  return items.reduce((sum, item) => {
    const w = item.variant?.weight ?? (item.variant_title?.includes("250g") ? 440 : 750);
    return sum + w * (item.quantity ?? 1);
  }, 0);
}

export default function KassePage() {
  const router = useRouter();
  const { cartId, refreshCount, isInitialized } = useCart();
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "vorkasse">("vorkasse");
  const [stripeClientSecret, setStripeClientSecret] = useState<string | null>(null);

  const [shippingMethodName, setShippingMethodName] = useState<string | null>(null);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address_1: "",
    city: "",
    postal_code: "",
  });

  useEffect(() => {
    if (!isInitialized) return;
    if (!cartId) { setLoading(false); return; }
    (async () => {
      try {
        const { cart: initialCart } = await medusa.store.cart.retrieve(cartId);
        setCart(initialCart);
        setLoading(false);

        await medusa.store.cart.update(cartId, {
          shipping_address: { country_code: "de" },
        });

        const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
        const pubKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";
        const res = await fetch(`${backendUrl}/store/shipping-options?cart_id=${cartId}`, {
          headers: { "x-publishable-api-key": pubKey },
        });
        const data = await res.json();
        const opts: any[] = data.shipping_options ?? [];
        if (!opts.length) return;

        const totalWeight = cartWeightGrams(initialCart.items ?? []);
        const tier = DHL_TIERS.find(t => totalWeight <= t.maxWeight) ?? DHL_TIERS[DHL_TIERS.length - 1];
        const match = opts.find((o: any) => Math.abs((o.amount ?? 0) - tier.amount) < 0.01) ?? opts[0];

        await medusa.store.cart.addShippingMethod(cartId, { option_id: match.id });
        setShippingMethodName(match.name);
        const { cart: updated } = await medusa.store.cart.retrieve(cartId);
        setCart(updated);
      } catch (err) {
        console.error("Shipping setup error:", err);
        setLoading(false);
      }
    })();
  }, [cartId, isInitialized]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function prepareCart() {
    if (!cartId) return;
    await medusa.store.cart.update(cartId, {
      email: form.email,
      shipping_address: {
        first_name: form.first_name,
        last_name: form.last_name,
        address_1: form.address_1,
        city: form.city,
        postal_code: form.postal_code,
        country_code: GERMANY_COUNTRY_CODE,
        phone: form.phone,
      },
      billing_address: {
        first_name: form.first_name,
        last_name: form.last_name,
        address_1: form.address_1,
        city: form.city,
        postal_code: form.postal_code,
        country_code: GERMANY_COUNTRY_CODE,
      },
    });

    // shipping method is already set on cart via useEffect; nothing to do here
  }

  async function completeOrder() {
    if (!cartId) return;
    const result = await medusa.store.cart.complete(cartId);
    if (result.type === "order") {
      localStorage.removeItem("lh_cart_id");
      await refreshCount();
      const isVorkasse = paymentMethod === "vorkasse";
      router.push(`/kasse/bestaetigung?order=${result.order.display_id}&vorkasse=${isVorkasse}`);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cartId) return;
    setSubmitting(true);

    try {
      await prepareCart();

      if (paymentMethod === "vorkasse") {
        await medusa.store.payment.initiatePaymentSession(
          { id: cartId } as any,
          { provider_id: "pp_system_default" }
        );
        await completeOrder();
      } else {
        const { payment_collection } = await medusa.store.payment.initiatePaymentSession(
          { id: cartId } as any,
          { provider_id: "pp_stripe_stripe" }
        ) as any;
        const session = payment_collection?.payment_sessions?.[0];
        const clientSecret = session?.data?.client_secret;
        if (!clientSecret) throw new Error("Kein Stripe client_secret erhalten.");
        setStripeClientSecret(clientSecret);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      console.error(err);
      alert("Fehler beim Vorbereiten der Bestellung. Bitte versuche es erneut.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: "var(--color-bg)" }}>
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!cartId || !cart?.items?.length) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6" style={{ background: "var(--color-bg)" }}>
        <p className="text-lg" style={{ color: "var(--color-ink-mute)" }}>Dein Warenkorb ist leer.</p>
        <Link href="/honig" className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold" style={{ background: "var(--color-primary)", color: "var(--color-bg)" }}>
          <ShoppingBasket size={18} /> Zum Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 pt-32" style={{ background: "var(--color-bg)" }}>
      <div className="mx-auto max-w-5xl px-6">
        <Link href="/warenkorb" className="mb-8 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary" style={{ color: "var(--color-ink-mute)" }}>
          <ArrowLeft size={16} /> Zurück zum Warenkorb
        </Link>

        {stripeClientSecret ? (
          /* Phase 2: Stripe Elements */
          <div className="mx-auto max-w-lg">
            <div className="rounded-[2.5rem] p-8" style={{ background: "var(--color-bg-soft)", border: "1px solid var(--color-line)" }}>
              <h2 className="font-heading mb-6 text-xl font-light" style={{ color: "var(--color-ink)" }}>Kartenzahlung</h2>
              <Elements stripe={stripePromise} options={{ clientSecret: stripeClientSecret, locale: "de" }}>
                <StripePaymentForm onSuccess={completeOrder} />
              </Elements>
            </div>
          </div>
        ) : (
          /* Phase 1: Address + payment method */
          <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-5">
            <div className="space-y-6 lg:col-span-3">
              <div className="rounded-[2.5rem] p-8" style={{ background: "var(--color-bg-soft)", border: "1px solid var(--color-line)" }}>
                <h2 className="font-heading mb-6 text-xl font-light" style={{ color: "var(--color-ink)" }}>Lieferadresse</h2>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium" style={{ color: "var(--color-ink-mute)" }}>Vorname</label>
                      <input name="first_name" required value={form.first_name} onChange={handleChange} className="w-full rounded-2xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" style={{ background: "var(--color-bg-elev)", border: "1px solid var(--color-line)", color: "var(--color-ink)" }} />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium" style={{ color: "var(--color-ink-mute)" }}>Nachname</label>
                      <input name="last_name" required value={form.last_name} onChange={handleChange} className="w-full rounded-2xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" style={{ background: "var(--color-bg-elev)", border: "1px solid var(--color-line)", color: "var(--color-ink)" }} />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium" style={{ color: "var(--color-ink-mute)" }}>E-Mail</label>
                    <input name="email" type="email" required value={form.email} onChange={handleChange} className="w-full rounded-2xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" style={{ background: "var(--color-bg-elev)", border: "1px solid var(--color-line)", color: "var(--color-ink)" }} />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium" style={{ color: "var(--color-ink-mute)" }}>Telefon (optional)</label>
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} className="w-full rounded-2xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" style={{ background: "var(--color-bg-elev)", border: "1px solid var(--color-line)", color: "var(--color-ink)" }} />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium" style={{ color: "var(--color-ink-mute)" }}>Straße & Hausnummer</label>
                    <input name="address_1" required value={form.address_1} onChange={handleChange} className="w-full rounded-2xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" style={{ background: "var(--color-bg-elev)", border: "1px solid var(--color-line)", color: "var(--color-ink)" }} />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium" style={{ color: "var(--color-ink-mute)" }}>PLZ</label>
                      <input name="postal_code" required value={form.postal_code} onChange={handleChange} className="w-full rounded-2xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" style={{ background: "var(--color-bg-elev)", border: "1px solid var(--color-line)", color: "var(--color-ink)" }} />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium" style={{ color: "var(--color-ink-mute)" }}>Stadt</label>
                      <input name="city" required value={form.city} onChange={handleChange} className="w-full rounded-2xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" style={{ background: "var(--color-bg-elev)", border: "1px solid var(--color-line)", color: "var(--color-ink)" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[2.5rem] p-8" style={{ background: "var(--color-bg-soft)", border: "1px solid var(--color-line)" }}>
                <h2 className="font-heading mb-6 text-xl font-light" style={{ color: "var(--color-ink)" }}>Zahlungsart</h2>
                <div className="space-y-3">
                  <label className="flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 transition-all" style={{ borderColor: paymentMethod === "vorkasse" ? "var(--color-primary)" : "var(--color-line)", background: paymentMethod === "vorkasse" ? "var(--color-primary-light)" : "transparent" }}>
                    <input type="radio" name="payment" value="vorkasse" checked={paymentMethod === "vorkasse"} onChange={() => setPaymentMethod("vorkasse")} className="accent-primary" />
                    <Building2 size={20} style={{ color: "var(--color-ink-mute)" }} />
                    <div>
                      <p className="font-medium" style={{ color: "var(--color-ink)" }}>Vorkasse (Überweisung)</p>
                      <p className="text-sm" style={{ color: "var(--color-ink-mute)" }}>Bankdaten erhältst du nach der Bestellung</p>
                    </div>
                  </label>
                  <label className="flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 transition-all" style={{ borderColor: paymentMethod === "stripe" ? "var(--color-primary)" : "var(--color-line)", background: paymentMethod === "stripe" ? "var(--color-primary-light)" : "transparent" }}>
                    <input type="radio" name="payment" value="stripe" checked={paymentMethod === "stripe"} onChange={() => setPaymentMethod("stripe")} className="accent-primary" />
                    <CreditCard size={20} style={{ color: "var(--color-ink-mute)" }} />
                    <div>
                      <p className="font-medium" style={{ color: "var(--color-ink)" }}>Kreditkarte (Stripe)</p>
                      <p className="text-sm" style={{ color: "var(--color-ink-mute)" }}>Visa, Mastercard, SEPA</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="sticky top-28 rounded-[2.5rem] p-8" style={{ background: "var(--color-bg-soft)", border: "1px solid var(--color-line)" }}>
                <h2 className="font-heading mb-6 text-xl font-light" style={{ color: "var(--color-ink)" }}>Bestellübersicht</h2>
                <div className="space-y-3">
                  {(cart.items ?? []).map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span style={{ color: "var(--color-ink-mute)" }}>{item.title} ({item.variant_title}) × {item.quantity}</span>
                      <span className="font-medium" style={{ color: "var(--color-ink)" }}>{formatPrice(item.subtotal ?? item.unit_price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="my-4" style={{ borderTop: "1px solid var(--color-line)" }} />
                {shippingMethodName ? (
                  <>
                    <div className="mb-2 flex justify-between text-sm" style={{ color: "var(--color-ink-mute)" }}>
                      <span>Zwischensumme</span>
                      <span>{formatPrice(cart.item_subtotal ?? cart.subtotal ?? 0)}</span>
                    </div>
                    <div className="mb-3 flex justify-between text-sm" style={{ color: "var(--color-ink-mute)" }}>
                      <span>Versand ({shippingMethodName})</span>
                      <span>{formatPrice(cart.shipping_subtotal ?? 0)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-medium" style={{ color: "var(--color-ink)" }}>
                      <span>Gesamt</span>
                      <span className="font-heading" style={{ color: "var(--color-primary)" }}>{formatPrice(cart.total ?? 0)}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-lg font-medium" style={{ color: "var(--color-ink)" }}>
                      <span>Warenwert</span>
                      <span className="font-heading" style={{ color: "var(--color-primary)" }}>{formatPrice(cart.item_subtotal ?? cart.subtotal ?? 0)}</span>
                    </div>
                    <p className="mt-1 text-xs" style={{ color: "var(--color-ink-mute)" }}>Versandkosten werden automatisch ermittelt</p>
                  </>
                )}
                <p className="mb-6 mt-1 text-xs" style={{ color: "var(--color-ink-mute)" }}>Inkl. MwSt.</p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold shadow-md transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
                  style={{ background: "var(--color-primary)", color: "var(--color-bg)" }}
                >
                  {submitting ? <Loader2 size={18} className="animate-spin" /> : <ShoppingBasket size={18} />}
                  {submitting ? "Wird vorbereitet…" : paymentMethod === "stripe" ? "Weiter zur Zahlung" : "Jetzt bestellen"}
                </button>
                <p className="mt-4 text-center text-xs" style={{ color: "var(--color-ink-mute)" }}>
                  Durch die Bestellung stimmst du unseren{" "}
                  <Link href="/agb" className="underline hover:text-primary">AGB</Link>{" "}
                  und der{" "}
                  <Link href="/datenschutz" className="underline hover:text-primary">Datenschutzerklärung</Link>{" "}
                  zu.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
