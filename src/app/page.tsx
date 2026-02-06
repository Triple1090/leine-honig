import FAQ from "../components/FAQ";
import Hero from "../components/hero";
// import ProductList from "../components/ProductList"; // Vorerst ausgeblendet, da Shop im Aufbau
import RentBees from "../components/RentBees";
import PriceList from "../components/PriceList";

export default function Home() {
  return (
    <>
      <Hero />

      {/* --- PREISLISTE (Statt Shop) --- */}
      <section id="preise" className="bg-stone-50 px-6 py-24">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <h2 className="mb-4 text-4xl font-bold text-stone-900">
            Direktverkauf
          </h2>
          <p className="text-lg text-stone-600">
            Solange unser Online-Shop noch im Aufbau ist, findest du hier unsere
            aktuelle Preisliste. Persönliche Abholung sowie Versand per DHL ist
            jederzeit möglich!
          </p>
        </div>

        {/* Hier wird deine neue DRY-Komponente eingebunden */}
        <PriceList />
      </section>

      <RentBees />

      {/* Ich habe FAQ hier ergänzt, da du es oben importiert hattest */}
      <FAQ />
    </>
  );
}
