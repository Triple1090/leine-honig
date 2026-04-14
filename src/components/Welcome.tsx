import Link from "next/link";
import { Hexagon, Sprout, ShoppingBasket } from "lucide-react";

const cards = [
  {
    icon: ShoppingBasket,
    title: "Echter Honig",
    text: "Direkt aus der Wabe ins Glas — ohne Umwege, ohne Zusätze. In 250g und 500g erhältlich.",
    href: "/honig",
    cta: "Honig kaufen",
    accent: "bg-primary/10 text-primary",
  },
  {
    icon: Sprout,
    title: "Bienen mieten",
    text: "Du stellst den Platz, wir bringen das Leben. Ein professionell betreutes Volk für deinen Garten oder dein Unternehmen.",
    href: "/bienen-mieten",
    cta: "Mehr erfahren",
    accent: "bg-accent/10 text-accent",
  },
  {
    icon: Hexagon,
    title: "Region Hannover",
    text: "Alle unsere Bienenvölker stehen rund um Neustadt am Rübenberge — nah, regional und transparent.",
    href: "/ueber-uns",
    cta: "Über uns",
    accent: "bg-stone-900/5 text-stone-700",
  },
];

export default function Welcome() {
  return (
    <section className="bg-stone-50 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-heading font-extrabold text-stone-900 md:text-5xl">
            Willkommen bei <span className="text-primary">Leine-Honig</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-stone-600">
            Wir sind Jürgen & Tjark — zwei Imker aus Leidenschaft aus der Region Hannover.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col rounded-[2.5rem] border border-stone-200 bg-white p-8 shadow-sm transition-all hover:shadow-md"
            >
              <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${card.accent}`}>
                <card.icon size={28} />
              </div>
              <h3 className="mb-3 text-xl font-heading font-extrabold text-stone-900">{card.title}</h3>
              <p className="flex-grow text-sm leading-relaxed text-stone-600">{card.text}</p>
              <Link
                href={card.href}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-stone-100 px-6 py-3 text-sm font-bold text-stone-800 transition-colors hover:bg-stone-200"
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
