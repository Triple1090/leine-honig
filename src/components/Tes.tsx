import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Maria K.",
    location: "Hannover",
    text: "Ich kaufe seit zwei Jahren bei Leine-Honig. Der Blütenhonig schmeckt völlig anders als das, was man im Supermarkt bekommt – man merkt einfach, dass da echte Leidenschaft dahintersteckt.",
    stars: 5,
    product: "Blütenhonig 500g",
  },
  {
    name: "Tobias R.",
    location: "Neustadt am Rübenberge",
    text: "Wir haben ein Bienenvolk für unseren Firmenpark gemietet. Jürgen und Tjark kümmern sich um alles, die Kollegen lieben es. Und den eigenen Honig aus der Ernte zu probieren ist unbezahlbar.",
    stars: 5,
    product: "Bienen mieten",
  },
  {
    name: "Sabine W.",
    location: "Garbsen",
    text: "Perfekte Weihnachtsgeschenke – ich habe sechs Gläser bestellt und alle waren begeistert. Schöne, schlichte Aufmachung, und der Geschmack spricht für sich. Sehr empfehlenswert!",
    stars: 5,
    product: "Waldhonig & Rapshonig",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="fill-primary text-primary" />
      ))}
    </div>
  );
}

export default function Tes() {
  return (
    <section className="bg-primary-light px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <h2 className="font-heading text-4xl font-extrabold text-accent md:text-5xl">
            Was unsere Kunden sagen
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-stone-500">
            Echte Stimmen aus der Region – unbearbeitet und direkt.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-[2.5rem] border border-primary/20 bg-white p-8 shadow-sm transition-all hover:shadow-md"
            >
              {/* Quote-Icon in Marken-Schieferblau — aus der Logo-Welle */}
              <Quote size={28} className="mb-4 text-[#6A9FB8]/60" />
              <p className="flex-grow text-sm leading-relaxed text-stone-600">
                {t.text}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-5">
                <div>
                  <p className="text-sm font-bold text-accent">{t.name}</p>
                  <p className="text-xs text-stone-400">{t.location} · {t.product}</p>
                </div>
                <Stars count={t.stars} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
