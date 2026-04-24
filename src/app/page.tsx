import Hero from "../components/hero";
import Welcome from "../components/Welcome";
import TrustBar from "../components/TrustBar";
import Tes from "../components/Tes";
import { medusa } from "@/src/lib/medusa";

const MIN_SHIPPING = 4.29;

async function getMinPrice(): Promise<number | undefined> {
  try {
    const { products } = await medusa.store.product.list({
      limit: 100,
      fields: "id,variants.id,variants.prices",
    });
    const prices = (products as any[])
      .flatMap((p) => p.variants ?? [])
      .flatMap((v: any) => v.prices ?? [])
      .filter((p: any) => p.currency_code === "eur")
      .map((p: any) => Number(p.amount));
    return prices.length ? Math.min(...prices) : undefined;
  } catch {
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
