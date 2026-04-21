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

export default function KassePage() {
  const router = useRouter();
  const { cartId, refreshCount, isInitialized } = useCart();
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "vorkasse">("vorkasse");
  const [stripeClientSecret, setStripeClientSecret] = useState<string | null>(null);

  const [shippingOptions, setShippingOptions] = useState<any[]>([]);
  const [selectedShippingOptionId, setSelectedShippingOptionId] = useState<string | null>(null);

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
    medusa.store.cart.retrieve(cartId)
      .then(async ({ cart }) => {
        setCart(cart);
        setLoading(false);
        try {
          await medusa.store.cart.update(cartId, {
            shipping_address: { country_code: "de" },
          });
          const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
          const pubKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";
          const res = await fetch(`${backendUrl}/store/shipping-options?cart_id=${cartId}`, {
            headers: { "x-publishable-api-key": pubKey },
          });
          const data = await res.json();
          const opts = data.shipping_options ?? [];
          if (opts.length) {
            setShippingOptions(opts);
            setSelectedShippingOptionId(opts[0].id);
          }
        } catch (err) {
          console.error("Shipping options error:", err);
        }
      })
      .catch(() => setLoading(false));
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

    try {
      let optionId = selectedShippingOptionId;
      if (!optionId) {
        const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
        const pubKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";
        const res = await fetch(`${backendUrl}/store/shipping-options?cart_id=${cartId}`, {
          headers: { "x-publishable-api-key": pubKey },
        });
        const data = await res.json();
        optionId = data.shipping_options?.[0]?.id ?? null;
      }
      if (optionId) {
        await medusa.store.cart.addShippingMethod(cartId, { option_id: optionId });
      }
    } catch { /* optional */ }
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
      <div className="flex min-h-screen items-center justify-center bg-stone-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!cartId || !cart?.items?.length) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-stone-50">
        <p className="text-lg text-stone-600">Dein Warenkorb ist leer.</p>
        <Link href="/honig" className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-bold text-white">
          <ShoppingBasket size={18} /> Zum Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-24 pt-32">
      <div className="mx-auto max-w-5xl px-6">
        <Link href="/warenkorb" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-stone-500 hover:text-stone-900">
          <ArrowLeft size={16} /> Zurück zum Warenkorb
        </Link>

        {stripeClientSecret ? (
          /* Phase 2: Stripe Elements */
          <div className="mx-auto max-w-lg">
            <div className="rounded-[2.5rem] border border-stone-100 bg-white p-8 shadow-sm">
              <h2 className="font-heading mb-6 text-xl font-bold text-stone-900">Kartenzahlung</h2>
              <Elements stripe={stripePromise} options={{ clientSecret: stripeClientSecret, locale: "de" }}>
                <StripePaymentForm onSuccess={completeOrder} />
              </Elements>
            </div>
          </div>
        ) : (
          /* Phase 1: Address + payment method */
          <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-5">
            <div className="space-y-6 lg:col-span-3">
              <div className="rounded-[2.5rem] border border-stone-100 bg-white p-8 shadow-sm">
                <h2 className="font-heading mb-6 text-xl font-bold text-stone-900">Lieferadresse</h2>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-bold text-stone-700">Vorname</label>
                      <input name="first_name" required value={form.first_name} onChange={handleChange} className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-bold text-stone-700">Nachname</label>
                      <input name="last_name" required value={form.last_name} onChange={handleChange} className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-bold text-stone-700">E-Mail</label>
                    <input name="email" type="email" required value={form.email} onChange={handleChange} className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-bold text-stone-700">Telefon (optional)</label>
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-bold text-stone-700">Straße & Hausnummer</label>
                    <input name="address_1" required value={form.address_1} onChange={handleChange} className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-primary" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-bold text-stone-700">PLZ</label>
                      <input name="postal_code" required value={form.postal_code} onChange={handleChange} className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-bold text-stone-700">Stadt</label>
                      <input name="city" required value={form.city} onChange={handleChange} className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-primary" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[2.5rem] border border-stone-100 bg-white p-8 shadow-sm">
                <h2 className="font-heading mb-6 text-xl font-bold text-stone-900">Zahlungsart</h2>
                <div className="space-y-3">
                  <label className={`flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 transition-all ${paymentMethod === "vorkasse" ? "border-primary bg-primary/5" : "border-stone-200 hover:border-stone-300"}`}>
                    <input type="radio" name="payment" value="vorkasse" checked={paymentMethod === "vorkasse"} onChange={() => setPaymentMethod("vorkasse")} className="accent-primary" />
                    <Building2 size={20} className="text-stone-500" />
                    <div>
                      <p className="font-bold text-stone-800">Vorkasse (Überweisung)</p>
                      <p className="text-sm text-stone-500">Bankdaten erhältst du nach der Bestellung</p>
                    </div>
                  </label>
                  <label className={`flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 transition-all ${paymentMethod === "stripe" ? "border-primary bg-primary/5" : "border-stone-200 hover:border-stone-300"}`}>
                    <input type="radio" name="payment" value="stripe" checked={paymentMethod === "stripe"} onChange={() => setPaymentMethod("stripe")} className="accent-primary" />
                    <CreditCard size={20} className="text-stone-500" />
                    <div>
                      <p className="font-bold text-stone-800">Kreditkarte (Stripe)</p>
                      <p className="text-sm text-stone-500">Visa, Mastercard, SEPA</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="sticky top-28 rounded-[2.5rem] border border-stone-100 bg-white p-8 shadow-sm">
                <h2 className="font-heading mb-6 text-xl font-bold text-stone-900">Bestellübersicht</h2>
                <div className="space-y-3">
                  {(cart.items ?? []).map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-stone-700">{item.title} ({item.variant_title}) × {item.quantity}</span>
                      <span className="font-bold text-stone-900">{formatPrice(item.subtotal ?? item.unit_price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="my-4 border-t border-stone-100" />
                {shippingOptions.length > 0 ? (
                  <div className="mb-3 space-y-2">
                    {shippingOptions.map((opt) => (
                      <label key={opt.id} className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 px-4 py-3 text-sm transition-all ${selectedShippingOptionId === opt.id ? "border-primary bg-primary/5" : "border-stone-200 hover:border-stone-300"}`}>
                        <span className="flex items-center gap-2">
                          <input type="radio" name="shipping" value={opt.id} checked={selectedShippingOptionId === opt.id} onChange={() => setSelectedShippingOptionId(opt.id)} className="accent-primary" />
                          <span className="font-medium text-stone-800">{opt.name}</span>
                        </span>
                        <span className="font-bold text-stone-900">{formatPrice(opt.amount ?? 0)}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="mb-3 flex justify-between text-sm text-stone-500">
                    <span>Versand</span>
                    <span>wird berechnet</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-stone-900">
                  <span>Gesamt</span>
                  <span className="font-heading text-primary">
                    {formatPrice((cart.subtotal ?? cart.total ?? 0) + (shippingOptions.find(o => o.id === selectedShippingOptionId)?.amount ?? 0))}
                  </span>
                </div>
                <p className="mb-6 text-xs text-stone-400">Inkl. MwSt.</p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 font-bold text-white shadow-md transition-all hover:bg-accent-hover disabled:opacity-50"
                >
                  {submitting ? <Loader2 size={18} className="animate-spin" /> : <ShoppingBasket size={18} />}
                  {submitting ? "Wird vorbereitet…" : paymentMethod === "stripe" ? "Weiter zur Zahlung" : "Jetzt bestellen"}
                </button>
                <p className="mt-4 text-center text-xs text-stone-400">
                  Durch die Bestellung stimmst du unseren{" "}
                  <Link href="/agb" className="underline hover:text-stone-700">AGB</Link>{" "}
                  und der{" "}
                  <Link href="/datenschutz" className="underline hover:text-stone-700">Datenschutzerklärung</Link>{" "}
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
