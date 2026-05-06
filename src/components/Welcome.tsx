import Link from "next/link";
import { ArrowRight } from "lucide-react";

const cards = [
  {
    eyebrow: "Echter Honig",
    title: "Direkt aus der Wabe ins Glas.",
    text: "Ohne Umwege, ohne Zusätze. Sechs Sorten in 250 g und 500 g — kalt geschleudert, schonend abgefüllt.",
    href: "/honig",
    cta: "Sorten ansehen",
    accent: true,
  },
  {
    eyebrow: "Bienenvermietung",
    title: "Ihr eigenes Bienenvolk.",
    text: "Du stellst den Platz, wir bringen das Leben. Ein professionell betreutes Volk für deinen Garten oder dein Firmengelände.",
    href: "/bienen-mieten",
    cta: "Mehr erfahren",
    accent: false,
  },
  {
    eyebrow: "Region Hannover",
    title: "Aus Neustadt am Rübenberge.",
    text: "Alle unsere Bienenvölker stehen rund um die Leine — nah, regional und transparent.",
    href: "/ueber-uns",
    cta: "Über uns",
    accent: false,
  },
];

export default function Welcome() {
  return (
    <section className="px-6 py-24" style={{ background: "var(--lh-paper)" }}>
      <div className="lh-container">
        <div className="mb-14 max-w-2xl">
          <p className="lh-eyebrow">Was wir tun</p>
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
            Drei Wege, mit der Imkerei <em style={{ color: "var(--lh-gold-deep)", fontStyle: "italic" }}>verbunden</em> zu sein.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <article
              key={card.title}
              className="group flex flex-col transition-transform duration-300 hover:-translate-y-1"
              style={{
                background: card.accent ? "var(--lh-cream)" : "var(--lh-paper-soft)",
                border: card.accent
                  ? "1px solid var(--lh-gold)"
                  : "1px solid var(--color-line)",
                borderRadius: 14,
                padding: 28,
                position: "relative",
                overflow: "hidden",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {card.accent && (
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: "var(--lh-gold)",
                  }}
                />
              )}
              <div className="flex items-baseline justify-between">
                <p className="lh-eyebrow">{card.eyebrow}</p>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--lh-ink-3)",
                    letterSpacing: "0.08em",
                  }}
                >
                  0{i + 1}
                </span>
              </div>

              <h3
                className="mt-5"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 28,
                  fontWeight: 500,
                  lineHeight: 1.15,
                  letterSpacing: "-0.005em",
                  color: "var(--lh-ink)",
                }}
              >
                {card.title}
              </h3>
              <p
                className="mt-3 flex-grow"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "var(--lh-ink-2)",
                }}
              >
                {card.text}
              </p>
              <Link
                href={card.href}
                className="mt-7 inline-flex items-center gap-2 transition-colors"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--lh-ink)",
                  textDecoration: "underline",
                  textDecorationColor: "var(--lh-gold)",
                  textDecorationThickness: 2,
                  textUnderlineOffset: 4,
                }}
              >
                {card.cta}
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
