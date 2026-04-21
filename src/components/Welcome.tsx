import Link from "next/link";
import { Hexagon, Sprout, ShoppingBasket } from "lucide-react";

const cards = [
  {
    icon: ShoppingBasket,
    title: "Echter Honig",
    text: "Direkt aus der Wabe ins Glas — ohne Umwege, ohne Zusätze. In 250g und 500g erhältlich.",
    href: "/honig",
    cta: "Honig kaufen",
    iconBg: "bg-primary/15 text-primary",
    ctaBg: "bg-primary text-accent hover:bg-primary-dark",
  },
  {
    icon: Sprout,
    title: "Bienen mieten",
    text: "Du stellst den Platz, wir bringen das Leben. Ein professionell betreutes Volk für deinen Garten oder dein Unternehmen.",
    href: "/bienen-mieten",
    cta: "Mehr erfahren",
    iconBg: "bg-accent/8 text-accent",
    ctaBg: "bg-accent text-white hover:bg-accent-hover",
  },
  {
    icon: Hexagon,
    title: "Region Hannover",
    text: "Alle unsere Bienenvölker stehen rund um Neustadt am Rübenberge — nah, regional und transparent.",
    href: "/ueber-uns",
    cta: "Über uns",
    iconBg: "bg-[#6A9FB8]/12 text-[#6A9FB8]",
    ctaBg: "bg-stone-100 text-accent hover:bg-stone-200",
  },
];

export default function Welcome() {
  return (
    <section className="bg-stone-50 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <h2 className="font-heading text-4xl font-extrabold text-accent md:text-5xl">
            Willkommen bei{" "}
            <span className="text-primary">Leine-Honig</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-stone-500">
            Wir sind Jürgen & Tjark — zwei Imker aus Leidenschaft aus der Region Hannover.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col rounded-[2.5rem] border border-stone-200 bg-white p-8 shadow-sm transition-all hover:shadow-md"
            >
              <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${card.iconBg}`}>
                <card.icon size={28} />
              </div>
              <h3 className="mb-3 font-heading text-xl font-extrabold text-accent">{card.title}</h3>
              <p className="flex-grow text-sm leading-relaxed text-stone-500">{card.text}</p>
              <Link
                href={card.href}
                className={`mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-colors ${card.ctaBg}`}
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
