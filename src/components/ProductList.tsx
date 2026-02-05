import ProductCard from "./ProductCard";

export default function ShopPage() {
  return (
    <section className="bg-stone-50 px-6 py-20">
      {/* Dieser Container hält alles zusammen und begrenzt die Breite */}
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-3xl font-extrabold text-stone-900">
          Unser Honig aus der Region
        </h2>

        {/* Das Grid hat jetzt einen festen Rahmen durch das div oben */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <ProductCard
            title="Frühtracht Honig"
            price="8,50 €"
            description="Mild und cremig, direkt aus den Frühlingsblüten von Neustadt."
            // imageSrc="/images/honig-frueh.jpg"
            shopifyButton={
              <button className="bg-primary w-full rounded-xl py-3 font-bold text-white">
                In den Warenkorb
              </button>
            }
          />

          <ProductCard
            title="Sommertracht"
            price="9,00 €"
            description="Kräftig im Geschmack mit der vollen Energie des Sommers."
            shopifyButton={
              <button className="bg-primary w-full rounded-xl py-3 font-bold text-white">
                In den Warenkorb
              </button>
            }
          />
        </div>
      </div>
    </section>
  );
}
