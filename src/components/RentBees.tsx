import { Sprout, ShieldCheck, Hexagon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FAQ from "./FAQ";

export default function RentBees() {
  return (
    <div id="bienen-mieten" style={{ background: "var(--lh-cream)" }} className="pb-24">
      <section className="overflow-hidden px-6 pt-24 pb-32">
        <div className="lh-container grid items-center gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <p className="lh-eyebrow">Für Firmen & Privat</p>
            <h2
              className="mt-4"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: 500,
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                color: "var(--lh-ink)",
              }}
            >
              Dein eigenes <em style={{ color: "var(--lh-gold-deep)" }}>Bienenvolk.</em>
              <br />
              Volle Ernte, <span style={{ color: "var(--lh-ink-3)" }}>null Arbeit.</span>
            </h2>

            <div
              className="mt-6 space-y-5"
              style={{ fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.6, color: "var(--lh-ink-2)" }}
            >
              <p>
                Du hast ein Stück Wiese im Garten oder auf dem Firmengelände, das eigentlich mehr verdient hat als nur regelmäßiges Rasenmähen? Wir machen es dir leicht, zum{" "}
                <strong style={{ color: "var(--lh-ink)" }}>Naturschützer</strong> zu werden.
              </p>
              <p>
                Das Prinzip ist einfach:{" "}
                <strong style={{ color: "var(--lh-ink)" }}>Du stellst den Platz, wir bringen das Leben.</strong>{" "}
                Wir siedeln ein professionell betreutes Bienenvolk bei dir an und kümmern uns um alles.
              </p>
            </div>

            <div className="mt-8">
              <Link href="/kontakt" className="lh-btn lh-btn--primary lh-btn--lg">
                Beratung anfragen →
              </Link>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div
              className="relative aspect-square overflow-hidden"
              style={{
                background: "var(--lh-paper)",
                border: "8px solid var(--lh-paper-soft)",
                borderRadius: 14,
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <Image
                src="/images/juergen/bienenstand2.jpeg"
                alt="Unser Bienenstand im Grünen"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-20 max-w-7xl px-4 md:px-6">
        <div
          className="p-8 md:p-16"
          style={{
            background: "var(--lh-paper)",
            border: "1px solid var(--color-line)",
            borderRadius: 18,
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <div className="mb-16 grid gap-8 md:grid-cols-3">
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
              <div
                key={i}
                className="flex flex-col items-start p-2"
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center"
                  style={{ background: "var(--color-primary-light)", borderRadius: 10, color: "var(--lh-gold-deep)" }}
                >
                  <card.icon size={24} />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: 24,
                    fontWeight: 500,
                    color: "var(--lh-ink)",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  className="mt-2"
                  style={{ fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.55, color: "var(--lh-ink-3)" }}
                >
                  {card.text}
                </p>
              </div>
            ))}
          </div>

          <FAQ />
        </div>
      </div>
    </div>
  );
}
