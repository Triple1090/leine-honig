import Link from "next/link";
import Image from "next/image";
import { ShoppingBasket } from "lucide-react";
import { medusa, formatPrice } from "@/src/lib/medusa";
import QuickAddButton from "@/src/components/QuickAddButton";

const HoneyJarPlaceholder = () => (
  <svg viewBox="0 0 64 64" className="h-20 w-20 fill-primary/20" xmlns="http://www.w3.org/2000/svg">
    <path d="M48,12H16c-2.2,0-4,1.8-4,4v4c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4v-4C52,13.8,50.2,12,48,12z M48,20H16v-4h32V20z" />
    <path d="M14,26v22c0,4.4,3.6,8,8,8h20c4.4,0,8-3.6,8-8V26H14z M42,48c0,1.1-0.9,2-2,2h-4c-1.1,0-2-0.9-2-2v-4c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2V48z" />
  </svg>
);

async function getProducts() {
  try {
    const { products } = await medusa.store.product.list({
      limit: 8,
      fields: "id,handle,title,description,thumbnail,variants.id,variants.title,variants.prices",
    });
    return products;
  } catch {
    return [];
  }
}

export default async function ProductSection() {
  const products = await getProducts();

  const placeholders = ["Blütenhonig", "Waldhonig", "Rapshonig", "Lindenblütenhonig"];

  return (
    <section id="sorten" className="bg-stone-50 px-6 py-24">
      <div className="mx-auto mb-12 max-w-7xl">
        <div className="mb-12 text-center">
          <span className="bg-primary mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold tracking-wider text-stone-900 uppercase shadow-sm">
            🐝 Direkt vom Imker
          </span>
          <h2 className="mt-4 text-4xl font-bold text-stone-900 md:text-5xl">
            Unsere Honigsorten
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-stone-600">
            Ab 5 Gläsern gibt es einen Mengenrabatt. Alle Sorten in 250g und 500g erhältlich.
          </p>
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
                  className="group flex h-full flex-col rounded-[2.5rem] border border-stone-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex aspect-square items-center justify-center overflow-hidden rounded-[2rem] bg-stone-50 p-6">
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
                  <div className="mt-5 flex flex-grow flex-col px-2">
                    <div className="flex items-start justify-between gap-2">
                      <h5 className="font-heading text-lg font-extrabold leading-tight text-stone-900">
                        {product.title}
                      </h5>
                      {lowestPrice && (
                        <span className="whitespace-nowrap font-heading text-lg font-black text-primary">
                          ab {formatPrice(lowestPrice.amount)}
                        </span>
                      )}
                    </div>
                    {product.description && (
                      <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-stone-600">
                        {product.description}
                      </p>
                    )}
                  </div>
                  <div className="mt-6 flex w-full items-center justify-end px-2">
                    {singleVariantId
                      ? <QuickAddButton variantId={singleVariantId} />
                      : <span className="flex items-center gap-2 text-sm font-semibold text-stone-400 group-hover:text-stone-600 transition-colors"><ShoppingBasket size={15} /> Variante wählen</span>
                    }
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {placeholders.map((name) => (
              <div key={name} className="flex h-full flex-col rounded-[2.5rem] border border-stone-200 bg-white p-4 shadow-sm">
                <div className="flex aspect-square items-center justify-center rounded-[2rem] bg-stone-50">
                  <HoneyJarPlaceholder />
                </div>
                <div className="mt-5 px-2">
                  <h5 className="font-heading text-lg font-extrabold text-stone-900">{name}</h5>
                  <p className="mt-1 text-sm text-stone-400">Bald verfügbar</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/honig"
            className="bg-accent hover:bg-accent-hover inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-white shadow-md transition-all hover:shadow-xl"
          >
            <ShoppingBasket size={18} />
            Alle Sorten im Shop
          </Link>
        </div>
      </div>
    </section>
  );
}
