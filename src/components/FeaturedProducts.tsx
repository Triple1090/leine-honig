import Link from "next/link";
import Image from "next/image";
import { medusa, formatPrice } from "@/src/lib/medusa";
import QuickAddButton from "@/src/components/QuickAddButton";

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

const SORT_GRADIENTS: Record<string, [string, string]> = {
  raps: ["#F5E6A8", "#C9A642"],
  blueten: ["#F1B43A", "#A07820"],
  bluetenhonig: ["#F1B43A", "#A07820"],
  heide: ["#B26A8E", "#693246"],
  heidehonig: ["#B26A8E", "#693246"],
  heidelbeer: ["#7C5BA8", "#3F2F61"],
  sommer: ["#9A6510", "#4A3008"],
  sommertracht: ["#9A6510", "#4A3008"],
  wald: ["#5A3E18", "#2D1F0C"],
  waldhonig: ["#5A3E18", "#2D1F0C"],
};

function gradientFor(handle: string): string {
  const key = (handle ?? "").toLowerCase();
  for (const k of Object.keys(SORT_GRADIENTS)) {
    if (key.includes(k)) {
      const [a, b] = SORT_GRADIENTS[k];
      return `linear-gradient(160deg, ${a} 0%, ${b} 100%)`;
    }
  }
  return "linear-gradient(160deg, #F5E6A8 0%, #C9A642 100%)";
}

async function getProducts() {
  try {
    const { products } = await medusa.store.product.list({
      limit: 4,
      fields: "id,handle,title,description,thumbnail,variants.id,variants.title,variants.prices",
    });
    return products;
  } catch {
    return [];
  }
}

export default async function FeaturedProducts() {
  const products = await getProducts();

  return (
    <section className="px-6 py-24" style={{ background: "var(--lh-cream)" }}>
      <div className="lh-container">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <p className="lh-eyebrow">Aktuelle Sorten</p>
            <h2
              className="mt-4"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(32px, 4.5vw, 56px)",
                fontWeight: 500,
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                color: "var(--lh-ink)",
              }}
            >
              Honig <em style={{ color: "var(--lh-gold-deep)", fontStyle: "italic" }}>direkt</em> vom Imker.
            </h2>
            <p
              className="mt-3"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 16,
                color: "var(--lh-ink-3)",
              }}
            >
              Alle Sorten in 250 g und 500 g — kalt geschleudert, schonend abgefüllt.
            </p>
          </div>
          <Link href="/honig" className="lh-btn lh-btn--ghost" style={{ paddingLeft: 0 }}>
            Alle Sorten ansehen →
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                  style={{ padding: 14, textDecoration: "none" }}
                >
                  <div
                    className="flex aspect-[4/5] items-center justify-center overflow-hidden"
                    style={{
                      background: gradientFor(product.handle ?? ""),
                      borderRadius: 10,
                    }}
                  >
                    {product.thumbnail ? (
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        width={200}
                        height={250}
                        className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <HoneyJarPlaceholder />
                    )}
                  </div>
                  <div className="mt-5 flex flex-grow flex-col">
                    <p className="lh-eyebrow" style={{ fontSize: 10 }}>Honig direkt vom Imker</p>
                    <h3
                      className="mt-2"
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: 22,
                        fontWeight: 500,
                        lineHeight: 1.15,
                        color: "var(--lh-ink)",
                      }}
                    >
                      {product.title}
                    </h3>
                    {lowestPrice && (
                      <p
                        className="mt-2"
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: 22,
                          fontWeight: 500,
                          color: "var(--lh-gold-deep)",
                        }}
                      >
                        ab {formatPrice(lowestPrice.amount)}
                      </p>
                    )}
                  </div>
                  <div className="mt-5">
                    {singleVariantId ? (
                      <QuickAddButton variantId={singleVariantId} fullWidth />
                    ) : (
                      <span className="lh-btn lh-btn--ghost w-full" style={{ paddingLeft: 0, paddingRight: 0 }}>
                        Variante wählen →
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {["Rapshonig", "Blütenhonig", "Sommertracht", "Waldhonig"].map((name) => (
              <div key={name} className="lh-card flex h-full flex-col" style={{ padding: 14 }}>
                <div
                  className="flex aspect-[4/5] items-center justify-center"
                  style={{ background: gradientFor(name), borderRadius: 10 }}
                >
                  <HoneyJarPlaceholder />
                </div>
                <div className="mt-5">
                  <p className="lh-eyebrow" style={{ fontSize: 10 }}>Honig direkt vom Imker</p>
                  <h3
                    className="mt-2"
                    style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 500, color: "var(--lh-ink)" }}
                  >
                    {name}
                  </h3>
                  <p className="mt-1 lh-meta">Bald verfügbar</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
