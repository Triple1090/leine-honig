import { getPayload } from "payload";
import configPromise from "@payload-config";

export default async function PriceList() {
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: "honey-sorts",
    where: { available: { equals: true } },
    sort: "sortOrder",
    limit: 20,
  });

  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-stone-200 bg-white p-8 shadow-sm md:p-10">
      <div className="mb-8 text-center">
        <h3 className="font-heading text-2xl font-bold text-stone-900">
          Unsere Honig-Preise
        </h3>
        <p className="mt-2 text-sm text-stone-500">
          Direkt vom Imker • Saison 2026
        </p>
      </div>

      <div className="w-full">
        <div className="border-primary/20 mb-4 grid grid-cols-3 border-b-2 pb-2 text-lg font-bold text-stone-900">
          <div className="text-left">Sorte</div>
          <div className="text-right">500g</div>
          <div className="text-right">250g</div>
        </div>

        <ul className="space-y-3">
          {docs.map((item) => (
            <li
              key={item.id}
              className="grid grid-cols-3 items-center border-b border-stone-100 pb-3 last:border-0"
            >
              <div className="font-medium text-stone-800">{item.sorte}</div>
              <div className="text-primary text-right font-bold">
                {item.price500}
              </div>
              <div className="text-right font-bold text-stone-600">
                {item.price250}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 rounded-xl bg-stone-50 p-4 text-center">
        <p className="text-sm text-stone-600">
          ♻️ Wir nehmen unsere Gläser gerne zurück!
        </p>
      </div>
    </div>
  );
}
