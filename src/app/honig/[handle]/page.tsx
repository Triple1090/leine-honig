import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";
import { medusa, formatPrice } from "@/src/lib/medusa";
import AddToCartButton from "./AddToCartButton";

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
  if (!product) return { title: "Produkt nicht gefunden | Leine-Honig" };
  return {
    title: `${product.title} | Leine-Honig`,
    description: product.description ?? undefined,
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

  const image = product.thumbnail ?? (product.images as any[])?.[0]?.url;

  return (
    <div className="min-h-screen bg-stone-50 pb-24 pt-32">
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

            {product.description && (
              <p className="mb-8 text-base leading-relaxed text-stone-600">
                {product.description}
              </p>
            )}

            <div className="space-y-3">
              {eurVariants?.map((variant: any) => (
                <div
                  key={variant.id}
                  className="rounded-2xl border border-stone-100 bg-stone-50 p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-bold text-stone-800">{variant.title}</span>
                    {variant.price && (
                      <span className="font-heading text-xl font-black text-primary">
                        {formatPrice(variant.price.amount)}
                      </span>
                    )}
                  </div>
                  <AddToCartButton
                    variantId={variant.id}
                    disabled={variant.inventory_quantity === 0}
                  />
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
