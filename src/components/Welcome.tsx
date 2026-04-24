import Link from "next/link";
import { Hexagon, Sprout, ShoppingBasket } from "lucide-react";

const cards = [
  {
    icon: ShoppingBasket,
    title: "Echter Honig",
    text: "Direkt aus der Wabe ins Glas — ohne Umwege, ohne Zusätze. In 250g und 500g erhältlich.",
    href: "/honig",
    cta: "Honig kaufen",
  },
  {
    icon: Sprout,
    title: "Bienen mieten",
    text: "Du stellst den Platz, wir bringen das Leben. Ein professionell betreutes Volk für deinen Garten oder dein Unternehmen.",
    href: "/bienen-mieten",
    cta: "Mehr erfahren",
  },
  {
    icon: Hexagon,
    title: "Region Hannover",
    text: "Alle unsere Bienenvölker stehen rund um Neustadt am Rübenberge — nah, regional und transparent.",
    href: "/ueber-uns",
    cta: "Über uns",
  },
];

export default function Welcome() {
  return (
    <section className="px-6 py-24" style={{ background: "var(--color-bg)" }}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p
            className="mb-3 text-xs font-medium uppercase tracking-widest"
            style={{ color: "var(--color-primary)", letterSpacing: "3px" }}
          >
            Willkommen
          </p>
          <h2 className="font-heading text-4xl font-light md:text-5xl" style={{ color: "var(--color-ink)" }}>
            Leine-<span className="italic" style={{ color: "var(--color-primary)" }}>Honig</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base" style={{ color: "var(--color-ink-mute)", lineHeight: "1.65" }}>
            Wir sind Jürgen & Tjark — zwei Imker aus Leidenschaft aus der Region Hannover.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col rounded-[2.5rem] p-8 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "var(--color-bg-soft)",
                border: "1px solid var(--color-line)",
              }}
            >
              <div
                className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ background: "var(--color-primary-light)" }}
              >
                <card.icon size={24} style={{ color: "var(--color-primary)" }} />
              </div>
              <h3 className="mb-3 font-heading text-xl" style={{ color: "var(--color-ink)" }}>{card.title}</h3>
              <p className="flex-grow text-sm leading-relaxed" style={{ color: "var(--color-ink-mute)" }}>{card.text}</p>
              <Link
                href={card.href}
                className="mt-8 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:border-primary hover:text-primary"
                style={{ borderColor: "var(--color-line)", color: "var(--color-ink-soft)" }}
              >
                {card.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
