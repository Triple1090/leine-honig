import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ArrowLeft, Package } from "lucide-react";
import { medusa, formatPrice } from "@/src/lib/medusa";
import QuickAddButton from "@/src/components/QuickAddButton";

interface Props {
  params: Promise<{ handle: string }>;
}

async function getProduct(handle: string) {
  try {
    const { products } = await medusa.store.product.list({
      handle,
      fields: "id,handle,title,description,thumbnail,images,variants.id,variants.title,variants.prices,variants.inventory_quantity",
    });
    return products[0] ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return { title: "Produkt nicht gefunden" };

  const image = (product as any).thumbnail ?? ((product as any).images as any[])?.[0]?.url;
  const lowestPrice = ((product as any).variants as any[])
    ?.flatMap((v: any) => v.prices ?? [])
    .filter((p: any) => p.currency_code === "eur")
    .map((p: any) => Number(p.amount))
    .sort((a: number, b: number) => a - b)[0];

  return {
    title: product.title,
    description: (product as any).description ?? `${product.title} – Echter Honig vom Imker Leine-Honig aus Neustadt am Rübenberge.`,
    openGraph: {
      type: "website",
      title: `${product.title} | Leine-Honig`,
      description: (product as any).description ?? `${product.title} – direkt vom Imker.`,
      images: image ? [{ url: image, width: 800, height: 800, alt: product.title }] : undefined,
      url: `https://www.leine-honig.de/honig/${handle}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | Leine-Honig`,
      images: image ? [image] : undefined,
    },
    ...(lowestPrice != null && {
      other: {
        "product:price:amount": String(lowestPrice),
        "product:price:currency": "EUR",
      },
    }),
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const eurVariants = (product.variants as any[])?.map((v) => ({
    ...v,
    price: (v.prices ?? []).find((p: any) => p.currency_code === "eur"),
  }));

  const image = (product as any).thumbnail ?? ((product as any).images as any[])?.[0]?.url;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: (product as any).description ?? undefined,
    image: image ?? undefined,
    brand: { "@type": "Brand", name: "Leine-Honig" },
    url: `https://www.leine-honig.de/honig/${handle}`,
    offers: eurVariants
      ?.filter((v) => v.price)
      .map((v) => ({
        "@type": "Offer",
        name: v.title,
        price: String(v.price.amount),
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: "Leine-Honig" },
      })),
  };

  return (
    <div className="min-h-screen pb-24 pt-32" style={{ background: "var(--lh-cream)" }}>
      <Script
        id="product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="lh-container">
        <Link
          href="/honig"
          className="lh-btn lh-btn--ghost mb-8"
          style={{ paddingLeft: 0 }}
        >
          <ArrowLeft size={16} /> Alle Sorten
        </Link>

        <div
          className="grid gap-12 p-8 md:grid-cols-2 md:p-12"
          style={{
            background: "var(--lh-paper)",
            border: "1px solid var(--color-line)",
            borderRadius: 14,
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {/* Image */}
          <div
            className="flex items-center justify-center p-8"
            style={{
              background: "linear-gradient(160deg, #F5E6A8 0%, #C9A642 100%)",
              borderRadius: 12,
            }}
          >
            {image ? (
              <Image
                src={image}
                alt={product.title}
                width={400}
                height={400}
                className="max-h-80 w-auto object-contain"
              />
            ) : (
              <div className="flex h-64 w-64 items-center justify-center rounded-full" style={{ background: "rgba(20,18,16,0.05)" }}>
                <Package size={80} style={{ color: "var(--lh-ink-3)" }} />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <p className="lh-eyebrow">Honig direkt vom Imker</p>
            <h1
              className="mt-3"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 500,
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                color: "var(--lh-ink)",
              }}
            >
              {product.title}
            </h1>

            {(product as any).description && (
              <p
                className="mt-5"
                style={{ fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.6, color: "var(--lh-ink-2)" }}
              >
                {(product as any).description}
              </p>
            )}

            <div className="mt-8 space-y-3">
              {eurVariants?.map((variant: any) => (
                <div
                  key={variant.id}
                  className="flex items-center justify-between px-5 py-3"
                  style={{
                    background: "var(--lh-paper-soft)",
                    border: "1px solid var(--color-line)",
                    borderRadius: 10,
                  }}
                >
                  <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, color: "var(--lh-ink)" }}>
                    {variant.title}
                  </span>
                  <div className="flex items-center gap-4">
                    {variant.price && (
                      <span
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: 22,
                          fontWeight: 500,
                          color: "var(--lh-gold-deep)",
                        }}
                      >
                        {formatPrice(variant.price.amount)}
                      </span>
                    )}
                    <QuickAddButton variantId={variant.id} />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 lh-meta">
              Versandkosten werden im Checkout berechnet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
