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
    <div className="min-h-screen bg-stone-50 pb-24 pt-32">
      <Script
        id="product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-5xl px-6">
        <Link
          href="/honig"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-stone-500 transition-colors hover:text-stone-900"
        >
          <ArrowLeft size={16} /> Alle Sorten
        </Link>

        <div className="grid gap-12 rounded-[2.5rem] border border-stone-100 bg-white p-8 shadow-sm md:grid-cols-2 md:p-12">
          {/* Image */}
          <div className="flex items-center justify-center rounded-[2rem] bg-stone-50 p-8">
            {image ? (
              <Image
                src={image}
                alt={product.title}
                width={400}
                height={400}
                className="max-h-80 w-auto object-contain"
              />
            ) : (
              <div className="flex h-64 w-64 items-center justify-center rounded-full bg-primary/10">
                <Package size={80} className="text-primary/40" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-3xl font-extrabold text-stone-900 md:text-4xl">
              {product.title}
            </h1>

            {(product as any).description && (
              <p className="mb-8 text-base leading-relaxed text-stone-600">
                {(product as any).description}
              </p>
            )}

            <div className="space-y-3">
              {eurVariants?.map((variant: any) => (
                <div
                  key={variant.id}
                  className="flex items-center justify-between rounded-2xl border border-stone-100 bg-stone-50 px-5 py-3"
                >
                  <span className="font-bold text-stone-800">{variant.title}</span>
                  <div className="flex items-center gap-4">
                    {variant.price && (
                      <span className="font-heading text-xl font-black text-primary">
                        {formatPrice(variant.price.amount)}
                      </span>
                    )}
                    <QuickAddButton variantId={variant.id} />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-stone-400">
              Inkl. MwSt. · Versandkosten werden im Checkout berechnet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
