import Hero from "../components/hero";
import Welcome from "../components/Welcome";
import TrustBar from "../components/TrustBar";
import Tes from "../components/Tes";
import { medusa } from "@/src/lib/medusa";

export const dynamic = "force-dynamic";

const MIN_SHIPPING = 4.29;

async function getMinPrice(): Promise<number | undefined> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
    const pubKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";
    const res = await fetch(`${backendUrl}/store/products?limit=100&fields=id,variants.id,variants.prices`, {
      headers: { "x-publishable-api-key": pubKey },
      cache: "no-store",
    });
    const data = await res.json();
    const prices = (data.products as any[])
      .flatMap((p: any) => p.variants ?? [])
      .flatMap((v: any) => v.prices ?? [])
      .filter((p: any) => p.currency_code === "eur")
      .map((p: any) => Number(p.amount));
    console.log("[homepage] raw fetch prices:", prices, "| first variant sample:", JSON.stringify((data.products?.[0]?.variants?.[0] ?? {})));
    return prices.length ? Math.min(...prices) : undefined;
  } catch (e) {
    console.error("[homepage] getMinPrice failed:", e);
    return undefined;
  }
}

export default async function Home() {
  const minPrice = await getMinPrice();
  return (
    <>
      <Hero minPrice={minPrice} minShipping={MIN_SHIPPING} />
      <TrustBar />
      <Welcome />
      <Tes />
    </>
  );
}
