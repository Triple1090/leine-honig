import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Award, User } from "lucide-react";
import PageHeader from "@/src/components/PageHeader";

export const metadata = {
  title: "Über uns | Leine-Honig",
  description: "Jürgen & Tjark — die Gesichter hinter dem echten Honig aus Neustadt.",
};

export default function AboutUs() {
  return (
    <div className="min-h-screen pb-20" style={{ background: "var(--lh-cream)" }}>
      <PageHeader
        image="/images/pexels-robertkso-17381656.jpg"
        imageAlt="Imker bei der Arbeit"
        badgeIcon={User}
        badge="Das Team"
        title={<>Vier Hände, <em style={{ color: "var(--lh-gold)", fontStyle: "italic" }}>eine Mission.</em></>}
        subtitle="Wir sind Jürgen & Tjark. Imker aus Leidenschaft. Gemeinsam produzieren wir echten Honig ohne jegliche Zusatzstoffe."
        creditName="Robertkso"
        creditUrl="https://www.pexels.com/de-de/@robertkso/"
      />

      {/* Duo */}
      <section className="px-6 pt-16 pb-24" style={{ background: "var(--lh-paper)" }}>
        <div className="lh-container grid gap-8 md:grid-cols-2">
          {[
            {
              name: "Jürgen",
              role: "Der Bienenflüsterer",
              image: "/images/juergen/juergen-bienenstand.jpeg",
              text: "Mit seiner jahrelangen Erfahrung und der Ruhe, die man am Bienenstand braucht. Er kennt jeden Flugradius und weiß genau, wann die Tracht am besten ist.",
            },
            {
              name: "Tjark",
              role: "Organisation & Macher",
              image: "/images/tjark/tjark.jpg",
              text: "Tjark ist neu dabei und lernt stetig neue faszinierende Fakten aus der Welt der Bienen. Als gelernter IT&apos;ler kümmert er sich auch um das Digitale.",
            },
          ].map((p) => (
            <div
              key={p.name}
              className="group relative aspect-[3/4] overflow-hidden"
              style={{ borderRadius: 14, boxShadow: "var(--shadow-lg)" }}
            >
              <Image
                src={p.image}
                alt={p.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 flex flex-col justify-end p-8"
                style={{
                  background:
                    "linear-gradient(to top, rgba(20,18,16,0.85) 0%, rgba(20,18,16,0.2) 60%, transparent 100%)",
                  color: "var(--lh-cream)",
                }}
              >
                <p className="lh-eyebrow" style={{ color: "var(--lh-gold)" }}>{p.role}</p>
                <h3
                  className="mt-2"
                  style={{ fontFamily: "var(--font-heading)", fontSize: 36, fontWeight: 500, color: "var(--lh-cream)" }}
                >
                  {p.name}
                </h3>
                <p
                  className="mt-3 opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100"
                  style={{ fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.6, color: "rgba(245,239,224,0.9)" }}
                  dangerouslySetInnerHTML={{ __html: p.text }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="px-6 py-16">
        <div
          className="mx-auto max-w-3xl p-8 md:p-12"
          style={{
            background: "var(--lh-paper-soft)",
            border: "1px solid var(--color-line)",
            borderRadius: 14,
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <p className="lh-eyebrow text-center">Unsere Geschichte</p>
          <h3
            className="mt-3 text-center"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 36,
              fontWeight: 500,
              color: "var(--lh-ink)",
            }}
          >
            Wie alles begann.
          </h3>
          <div
            className="mt-8 space-y-5"
            style={{ fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.65, color: "var(--lh-ink-2)" }}
          >
            <p>
              Eigentlich wollten wir nur ein bisschen was für die Natur tun. Doch aus dem ersten Bienenvolk im Garten wurde schnell eine echte Passion.
            </p>
            <p>
              Wir haben gelernt, gestaunt (und wurden auch mal gestochen), aber vor allem haben wir verstanden:
            </p>
            <blockquote
              className="my-6 pl-5"
              style={{
                borderLeft: "3px solid var(--lh-gold)",
                fontFamily: "var(--font-heading)",
                fontStyle: "italic",
                fontSize: 26,
                lineHeight: 1.3,
                color: "var(--lh-ink)",
              }}
            >
              „Bienen sind der Motor unserer Natur."
            </blockquote>
          </div>

          <div
            className="mt-10 grid grid-cols-1 gap-6 pt-10 md:grid-cols-3"
            style={{ borderTop: "1px solid var(--color-line)" }}
          >
            {[
              { icon: Heart, label: "Keine Tricks" },
              { icon: MapPin, label: "100 % Neustadt" },
              { icon: Award, label: "Respekt vorm Tier" },
            ].map((card) => (
              <div key={card.label} className="text-center">
                <card.icon className="mx-auto mb-3 h-7 w-7" style={{ color: "var(--lh-gold-deep)" }} />
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, color: "var(--lh-ink-2)" }}>
                  {card.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-12 text-center">
        <h2
          style={{ fontFamily: "var(--font-heading)", fontSize: 32, fontWeight: 500, color: "var(--lh-ink)" }}
        >
          Lern uns kennen.
        </h2>
        <p
          className="mx-auto mt-3 mb-8 max-w-xl"
          style={{ fontFamily: "var(--font-sans)", color: "var(--lh-ink-3)" }}
        >
          Komm gerne vorbei oder schreib uns. Wir beißen nicht — und unsere Bienen stechen (fast) nie.
        </p>
        <Link href="/kontakt" className="lh-btn lh-btn--primary lh-btn--lg">
          Kontakt aufnehmen
        </Link>
      </section>
    </div>
  );
}
