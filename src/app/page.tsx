import Hero from "@/src/components/hero";
import TrustBar from "@/src/components/TrustBar";
import FeaturedProducts from "@/src/components/FeaturedProducts";
import Welcome from "@/src/components/Welcome";
import ClosingCta from "@/src/components/ClosingCta";

export const dynamic = "force-dynamic";

const MIN_SHIPPING = 4.29;

async function getMinPrice(): Promise<number | undefined> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
    const pubKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";
    const headers = { "x-publishable-api-key": pubKey };

    const regRes = await fetch(`${backendUrl}/store/regions`, { headers, cache: "no-store" });
    const regData = await regRes.json();
    const regionId: string | undefined = regData.regions?.[0]?.id;
    if (!regionId) return undefined;

    const url = `${backendUrl}/store/products?limit=100&region_id=${regionId}&fields=id,variants.id,variants.calculated_price`;
    const res = await fetch(url, { headers, cache: "no-store" });
    const data = await res.json();

    const amounts = (data.products as any[])
      .flatMap((p: any) => p.variants ?? [])
      .map((v: any) => v.calculated_price?.calculated_amount ?? v.calculated_price?.original_amount)
      .filter((a): a is number => typeof a === "number");

    return amounts.length ? Math.min(...amounts) : undefined;
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
      <FeaturedProducts />
      <Welcome />
      <ClosingCta />
    </>
  );
}
