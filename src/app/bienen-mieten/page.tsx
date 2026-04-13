import Image from "next/image";
import { Sprout, ShieldCheck, Hexagon } from "lucide-react";
import PageHeader from "@/src/components/PageHeader";
import FAQ from "@/src/components/FAQ";
import Link from "next/link";

export const metadata = {
  title: "Bienen mieten | Leine-Honig",
  description: "Dein eigenes Bienenvolk im Garten oder auf dem Firmengelände – wir kümmern uns um alles.",
};

export default function BienenMieten() {
  return (
    <div className="min-h-screen bg-stone-50 pb-24">
      <PageHeader
        image="/images/juergen/bienenstand-schnee.jpeg"
        imageAlt="Bienenstand"
        badge="Für Firmen & Privat"
        title={<>Dein eigenes <span className="text-primary">Bienenvolk.</span></>}
        subtitle="Du stellst den Platz, wir bringen das Leben."
      />

      {/* Intro */}
      <section className="overflow-hidden px-6 pt-16 pb-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <div className="space-y-6 text-lg leading-relaxed text-stone-600">
              <p>
                Hast du ein Stück Wiese im Garten oder auf dem Firmengelände,
                das eigentlich mehr verdient hat als nur regelmäßiges
                Rasenmähen? Wir machen es dir leicht, zum{" "}
                <strong className="text-stone-900">Naturschützer</strong>{" "}
                zu werden.
              </p>
              <p>
                Das Prinzip ist einfach:{" "}
                <strong className="text-stone-900">
                  Du stellst den Platz, wir bringen das Leben.
                </strong>{" "}
                Wir siedeln ein professionell betreutes Bienenvolk bei dir an
                und kümmern uns um alles — von der Aufstellung bis zur Ernte.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/kontakt"
                className="group bg-primary hover:bg-primary-dark inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-stone-900 shadow-lg transition-all hover:shadow-xl"
              >
                Beratung anfragen
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative aspect-video rotate-2 overflow-hidden rounded-3xl border-4 border-white bg-stone-200 shadow-2xl transition-transform duration-500 hover:rotate-0 md:aspect-square">
              <Image
                src="/images/juergen/bienenstand2.jpeg"
                alt="Unser Bienenstand im Grünen"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vorteile + FAQ */}
      <div className="relative z-10 mx-auto -mt-20 max-w-7xl px-4 md:px-6">
        <div className="rounded-[2.5rem] border border-stone-100 bg-white p-8 shadow-xl md:p-16">
          <div className="mb-20 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Sprout,
                title: "Naturschutz",
                text: "Direkter Beitrag zur Biodiversität in der Leine-Region & Neustadt.",
              },
              {
                icon: Hexagon,
                title: "Dein Honig",
                text: "Du bekommst den Ertrag deines Volkes (ca. 20 kg). Eigenes Etikett möglich.",
              },
              {
                icon: ShieldCheck,
                title: "Null Arbeit",
                text: "Wir kümmern uns um Pflege, Gesundheit und Ernte. Kein Risiko.",
              },
            ].map((card, i) => (
              <div key={i} className="flex flex-col items-center rounded-2xl p-6 text-center transition-colors hover:bg-stone-50">
                <div className="bg-primary/10 text-primary mb-4 flex h-14 w-14 items-center justify-center rounded-2xl">
                  <card.icon size={28} />
                </div>
                <h3 className="mb-2 text-xl font-bold text-stone-800">{card.title}</h3>
                <p className="text-sm leading-relaxed text-stone-500">{card.text}</p>
              </div>
            ))}
          </div>

          <FAQ />
        </div>
      </div>
    </div>
  );
}
