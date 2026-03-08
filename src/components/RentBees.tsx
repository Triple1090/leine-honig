import { Sprout, ShieldCheck, Hexagon } from "lucide-react";
import Image from "next/image";
import FAQ from "./FAQ"; // Wir importieren unsere neue FAQ

export default function RentBees() {
  return (
    <div id="bienen-mieten" className="bg-stone-50 pb-24">
      {/* -------------------------------------------
          1. INTRO SEKTION (Grauer Hintergrund)
         ------------------------------------------- */}
      <section className="overflow-hidden px-6 pt-24 pb-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <span className="bg-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold tracking-wider text-stone-900 uppercase shadow-sm">
              Für Firmen & Privat
            </span>
            <h2 className="mb-6 text-4xl leading-tight font-extrabold text-stone-900 md:text-5xl">
              Dein eigenes <span className="text-primary">Bienenvolk.</span>
              <br />
              Volle Ernte, <span className="text-stone-400">null Arbeit.</span>
            </h2>

            <div className="space-y-6 text-lg leading-relaxed text-stone-600">
              <p>
                Hast du ein Stück Wiese im Garten oder auf dem Firmengelände,
                das eigentlich mehr verdient hat als nur regelmäßiges
                Rasenmähen? Wir machen es dir leicht, zum{" "}
                <strong className="font-bold text-stone-900">
                  Naturschützer
                </strong>{" "}
                zu werden.
              </p>
              <p>
                Das Prinzip ist einfach:{" "}
                <strong className="text-stone-900">
                  Du stellst den Platz, wir bringen das Leben.
                </strong>{" "}
                Wir siedeln ein professionell betreutes Bienenvolk bei dir an
                und kümmern uns um alles.
              </p>
            </div>

            <div className="mt-8 flex gap-4">
              <a
                href="/contactForm"
                className="group bg-primary hover:bg-primary-dark hover:shadow-primary/40 flex items-center gap-2 rounded-full px-8 py-4 font-bold text-stone-900 shadow-lg transition-all"
              >
                Beratung anfragen
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
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

      {/* -------------------------------------------
          2. DIE GROSSE WEISSE KARTE (Vorteile + Ablauf + FAQ)
          Das hier sorgt für den "Guss"-Effekt!
         ------------------------------------------- */}
      <div className="relative z-10 mx-auto -mt-20 max-w-7xl px-4 md:px-6">
        <div className="rounded-[2.5rem] border border-stone-100 bg-white p-8 shadow-xl md:p-16">
          {/* TEIL A: VORTEILE */}
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
                text: "Du bekommst den Ertrag deines Volkes (ca. 20kg). Eigenes Etikett möglich.",
              },
              {
                icon: ShieldCheck,
                title: "Null Arbeit",
                text: "Wir kümmern uns um Pflege, Gesundheit und Ernte. Kein Risiko.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="flex flex-col items-center rounded-2xl p-6 text-center transition-colors hover:bg-stone-50"
              >
                <div className="bg-primary/10 text-primary mb-4 flex h-14 w-14 items-center justify-center rounded-2xl">
                  <card.icon size={28} />
                </div>
                <h3 className="mb-2 text-xl font-bold text-stone-800">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-stone-500">
                  {card.text}
                </p>
              </div>
            ))}
          </div>

          {/* TEIL C: FAQ (Integriert) */}
          <FAQ />
        </div>
      </div>
    </div>
  );
}
