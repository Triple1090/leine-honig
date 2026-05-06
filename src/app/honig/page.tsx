import Link from "next/link";
import Image from "next/image";
import { ShoppingBasket } from "lucide-react";
import { medusa, formatPrice } from "@/src/lib/medusa";
import QuickAddButton from "@/src/components/QuickAddButton";


export const dynamic = "force-dynamic";

export const metadata = {
  title: "Honigsorten | Leine-Honig",
  description: "Alle Honigsorten direkt vom Imker — Blüten-, Wald- und Rapshonig aus Neustadt am Rübenberge.",
};

const HoneyJarPlaceholder = () => (
  <svg viewBox="0 0 64 64" className="h-20 w-20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M48,12H16c-2.2,0-4,1.8-4,4v4c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4v-4C52,13.8,50.2,12,48,12z M48,20H16v-4h32V20z"
      fill="var(--lh-gold)"
      fillOpacity="0.55"
    />
    <path
      d="M14,26v22c0,4.4,3.6,8,8,8h20c4.4,0,8-3.6,8-8V26H14z M42,48c0,1.1-0.9,2-2,2h-4c-1.1,0-2-0.9-2-2v-4c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2V48z"
      fill="var(--lh-gold)"
      fillOpacity="0.45"
    />
  </svg>
);

async function getProducts() {
  try {
    const { products } = await medusa.store.product.list({
      limit: 100,
      fields: "id,handle,title,description,thumbnail,variants.id,variants.title,variants.prices",
    });
    return products;
  } catch {
    return [];
  }
}

export default async function HonigPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen pb-24" style={{ background: "var(--lh-cream)" }}>
      <section className="px-6 pt-32 pb-12">
        <div className="lh-container">
          <p className="lh-eyebrow">Sortenübersicht</p>
          <h1
            className="mt-4"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: "var(--lh-ink)",
              maxWidth: 760,
            }}
          >
            Unsere <em style={{ color: "var(--lh-gold-deep)" }}>Honigsorten.</em>
          </h1>
          <p
            className="mt-5 max-w-xl"
            style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: "var(--fs-20)", lineHeight: 1.45, color: "var(--lh-ink-2)" }}
          >
            Alle Sorten in 250 g und 500 g erhältlich — direkt vom Imker aus Neustadt am Rübenberge.
          </p>
        </div>
      </section>

      <section className="px-6 py-8">
        <div className="lh-container">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {(products as any[]).map((product) => {
                const variants = product.variants ?? [];
                const lowestPrice = variants
                  .flatMap((v: any) => v.prices ?? [])
                  .filter((p: any) => p.currency_code === "eur")
                  .sort((a: any, b: any) => a.amount - b.amount)[0];
                const singleVariantId = variants.length === 1 ? variants[0].id : null;

                return (
                  <Link
                    key={product.id}
                    href={`/honig/${product.handle}`}
                    className="lh-card lh-card--hoverable group flex h-full flex-col"
                    style={{ padding: 16, textDecoration: "none" }}
                  >
                    <div
                      className="flex aspect-[4/3] items-center justify-center overflow-hidden"
                      style={{
                        background: "linear-gradient(160deg, #F5E6A8 0%, #C9A642 100%)",
                        borderRadius: 10,
                      }}
                    >
                      {product.thumbnail ? (
                        <Image
                          src={product.thumbnail}
                          alt={product.title}
                          width={200}
                          height={200}
                          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <HoneyJarPlaceholder />
                      )}
                    </div>
                    <div className="mt-5 flex flex-grow flex-col">
                      <p className="lh-eyebrow">Honig direkt vom Imker</p>
                      <div className="mt-2 flex items-start justify-between gap-3">
                        <h2
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "var(--fs-20)",
                            fontWeight: 500,
                            lineHeight: 1.2,
                            color: "var(--lh-ink)",
                          }}
                        >
                          {product.title}
                        </h2>
                        {lowestPrice && (
                          <span
                            style={{
                              fontFamily: "var(--font-heading)",
                              fontSize: "var(--fs-20)",
                              fontWeight: 500,
                              color: "var(--lh-gold-deep)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            ab {formatPrice(lowestPrice.amount)}
                          </span>
                        )}
                      </div>
                      {product.description && (
                        <p
                          className="mt-2 line-clamp-2"
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "var(--fs-14)",
                            lineHeight: 1.55,
                            color: "var(--lh-ink-3)",
                          }}
                        >
                          {product.description}
                        </p>
                      )}
                    </div>
                    <div className="mt-5">
                      {singleVariantId ? (
                        <QuickAddButton variantId={singleVariantId} fullWidth />
                      ) : (
                        <span className="lh-btn lh-btn--ghost" style={{ paddingLeft: 0, paddingRight: 0 }}>
                          <ShoppingBasket size={15} /> Variante wählen →
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="py-24 text-center">
              <HoneyJarPlaceholder />
              <p className="mt-6 lh-body" style={{ color: "var(--lh-ink-3)" }}>
                Unsere Honigsorten werden gerade eingerichtet. Schau bald wieder vorbei.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
