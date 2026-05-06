import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Maria K.",
    location: "Hannover",
    text: "Ich kaufe seit zwei Jahren bei Leine-Honig. Der Blütenhonig schmeckt völlig anders als das, was man im Supermarkt bekommt — man merkt einfach, dass da echte Leidenschaft dahintersteckt.",
    stars: 5,
    product: "Blütenhonig 500 g",
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
    text: "Perfekte Weihnachtsgeschenke — ich habe sechs Gläser bestellt und alle waren begeistert. Schöne, schlichte Aufmachung, und der Geschmack spricht für sich. Sehr empfehlenswert.",
    stars: 5,
    product: "Waldhonig & Rapshonig",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} fill="var(--lh-gold)" stroke="var(--lh-gold)" />
      ))}
    </div>
  );
}

export default function Tes() {
  return (
    <section className="px-6 py-24" style={{ background: "var(--lh-cream)" }}>
      <div className="lh-container">
        <div className="mb-14 max-w-2xl">
          <p className="lh-eyebrow">Stimmen aus der Region</p>
          <h2
            className="mt-4"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(32px, 4.5vw, 56px)",
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "var(--lh-ink)",
            }}
          >
            Echte Stimmen — <em style={{ color: "var(--lh-gold-deep)", fontStyle: "italic" }}>unbearbeitet.</em>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="flex flex-col"
              style={{
                background: "var(--lh-paper)",
                border: "1px solid var(--color-line)",
                borderRadius: 14,
                padding: 32,
                position: "relative",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 16,
                  right: 24,
                  fontFamily: "var(--font-heading)",
                  fontSize: 96,
                  fontWeight: 500,
                  lineHeight: 1,
                  color: "var(--lh-gold)",
                  opacity: 0.25,
                }}
              >
                „
              </span>

              <Stars count={t.stars} />

              <p
                className="mt-5 flex-grow"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontStyle: "italic",
                  fontSize: 18,
                  lineHeight: 1.55,
                  color: "var(--lh-ink-2)",
                }}
              >
                {t.text}
              </p>

              <div
                className="mt-8 pt-5 flex items-baseline gap-3"
                style={{ borderTop: "1px solid var(--color-line)" }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 16,
                    height: 1,
                    background: "var(--lh-gold)",
                    flexShrink: 0,
                    transform: "translateY(-4px)",
                  }}
                />
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 600,
                      fontSize: 14,
                      color: "var(--lh-ink)",
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      color: "var(--lh-ink-3)",
                      marginTop: 2,
                    }}
                  >
                    {t.location.toUpperCase()} · {t.product}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
