import PageHeader from "@/src/components/PageHeader";
import FAQ from "@/src/components/FAQ";
import BienenMietenClient from "./BienenMietenClient";

export const metadata = {
  title: "Bienen mieten | Leine-Honig",
  description: "Dein eigenes Bienenvolk im Garten oder auf dem Firmengelände – wir kümmern uns um alles. Für Privatpersonen und Unternehmen (CSRD, ESG).",
};

export default function BienenMieten() {
  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <PageHeader
        image="/images/juergen/bienenstand-schnee.jpeg"
        imageAlt="Bienenstand"
        title={
          <>
            Dein eigenes <span className="text-primary">Bienenvolk.</span>
          </>
        }
        subtitle="Du stellst den Platz, wir bringen das Leben — für Privatpersonen und Unternehmen."
      />

      <BienenMietenClient />

      {/* FAQ bleibt für alle sichtbar */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <FAQ />
        </div>
      </section>
    </div>
  );
}
