import Link from "next/link";
import Image from "next/image";
import { ShoppingBasket } from "lucide-react";
import { medusa, formatPrice } from "@/src/lib/medusa";
import Badge from "@/src/components/Badge";


export const dynamic = "force-dynamic";

export const metadata = {
  title: "Honigsorten | Leine-Honig",
  description: "Alle Honigsorten direkt vom Imker – Blüten-, Wald- und Rapshonig aus Neustadt am Rübenberge.",
};

const HoneyJarPlaceholder = () => (
  <svg viewBox="0 0 64 64" className="h-20 w-20 fill-primary/20" xmlns="http://www.w3.org/2000/svg">
    <path d="M48,12H16c-2.2,0-4,1.8-4,4v4c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4v-4C52,13.8,50.2,12,48,12z M48,20H16v-4h32V20z" />
    <path d="M14,26v22c0,4.4,3.6,8,8,8h20c4.4,0,8-3.6,8-8V26H14z M42,48c0,1.1-0.9,2-2,2h-4c-1.1,0-2-0.9-2-2v-4c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2V48z" />
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
    <div className="min-h-screen bg-stone-50 pb-24">
      <section className="relative flex min-h-[40vh] items-end justify-center overflow-hidden pb-16 pt-32 text-center">
        {/* Hintergrundbild */}
        <Image
          src="/images/pexels-adonyi-foto-5634211.jpg"
          alt="Honiggläser"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        <a
          href="https://www.pexels.com/de-de/@adonyi-foto/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-4 z-10 text-xs text-white/50 transition-colors hover:text-white/80"
        >
          Foto: Adonyi Foto / Pexels
        </a>

        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <Badge icon={ShoppingBasket} className="mb-6">
            Direkt vom Imker
          </Badge>
          <h1 className="mb-4 text-4xl font-heading font-extrabold text-white md:text-6xl">
            Unsere <span className="text-primary">Honigsorten</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-white/80">
            Ab 5 Gläsern gibt es einen Mengenrabatt. Alle Sorten in 250g und 500g erhältlich.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {(products as any[]).map((product) => {
                const lowestPrice = product.variants
                  ?.flatMap((v: any) => v.prices ?? [])
                  .filter((p: any) => p.currency_code === "eur")
                  .sort((a: any, b: any) => a.amount - b.amount)[0];

                return (
                  <Link
                    key={product.id}
                    href={`/honig/${product.handle}`}
                    className="group flex h-full flex-col rounded-[2.5rem] border border-stone-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30"
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
                        <h2 className="font-heading text-lg font-extrabold leading-tight text-stone-900">
                          {product.title}
                        </h2>
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
                    <div className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-stone-900 shadow-sm transition-all group-hover:bg-primary-dark">
                      <ShoppingBasket size={16} />
                      Auswählen
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="py-24 text-center">
              <HoneyJarPlaceholder />
              <p className="mt-6 text-lg text-stone-600">
                Unsere Honigsorten werden gerade eingerichtet. Schau bald wieder vorbei!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
