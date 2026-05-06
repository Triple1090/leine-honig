import { Plus, Mail } from "lucide-react";
import Button from "./Button";

const faqData = [
  {
    id: 1,
    question: "Woher kommt euer Honig?",
    answer:
      "Alle unsere Bienenvölker stehen in der Leineregion rund um Neustadt am Rübenberge. Der Honig kommt direkt aus der Wabe ins Glas — ohne Umwege, ohne Zusätze.",
  },
  {
    id: 2,
    question: "Ist euer Honig Bio-zertifiziert?",
    answer:
      "Wir sind keine Bio-zertifizierte Imkerei, arbeiten aber nach denselben Grundsätzen: kein Einsatz von Pestiziden, keine Zusätze, keine Wärmebehandlung. Ehrlicher Honig eben.",
  },
  {
    id: 3,
    question: "Warum kristallisiert mein Honig aus?",
    answer:
      "Kristallisation ist ein natürlicher Prozess und ein Zeichen für echten, unverfälschten Honig. Einfach das Glas in warmes Wasser (max. 40 °C) stellen — dann wird er wieder flüssig.",
  },
  {
    id: 4,
    question: "Wie lange ist Honig haltbar?",
    answer:
      "Honig ist praktisch unbegrenzt haltbar, wenn er trocken und lichtgeschützt gelagert wird. Das Mindesthaltbarkeitsdatum auf unseren Gläsern ist gesetzlich vorgeschrieben, nicht die tatsächliche Grenze.",
  },
  {
    id: 5,
    question: "Kann ich ein Bienenvolk für meinen Garten mieten?",
    answer:
      "Ja. Wir bringen ein professionell betreutes Volk zu dir und kümmern uns um alles. Du brauchst nur einen geeigneten Standplatz. Schreib uns einfach.",
  },
  {
    id: 6,
    question: "Wie läuft die Bienenmiete ab?",
    answer:
      "Wir besprechen gemeinsam den Standplatz, bringen das Volk im Frühjahr und holen es im Herbst wieder ab. Du bekommst am Ende der Saison deinen eigenen Honig — ca. 20 kg.",
  },
];

export default function FAQ() {
  return (
    <div className="mx-auto max-w-4xl" id="faq">
      <div className="lh-section-header">
        <p className="lh-eyebrow">Häufige Fragen</p>
        <span className="flex-1" style={{ height: 1, background: "var(--color-line)" }} />
      </div>

      <div className="mb-12">
        <h3
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(28px, 3vw, 36px)",
            fontWeight: 500,
            color: "var(--lh-ink)",
          }}
        >
          Noch Fragen?
        </h3>
        <p className="mt-2 lh-body-sm" style={{ color: "var(--lh-ink-3)" }}>
          Alles Wichtige auf einen Blick.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {faqData.map((item) => (
          <details
            key={item.id}
            className="group h-fit transition-all duration-300"
            style={{
              background: "var(--lh-paper-soft)",
              border: "1px solid var(--color-line)",
              borderRadius: 12,
            }}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between p-5 select-none">
              <span
                className="pr-4"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--lh-ink)",
                }}
              >
                {item.question}
              </span>
              <div
                className="flex-shrink-0 transition-transform duration-300 group-open:rotate-45"
                style={{ color: "var(--lh-gold-deep)" }}
              >
                <Plus size={20} />
              </div>
            </summary>
            <div
              className="px-5 pt-0 pb-5"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                lineHeight: 1.6,
                color: "var(--lh-ink-2)",
              }}
            >
              {item.answer}
            </div>
          </details>
        ))}
      </div>

      <div className="flex items-center justify-center pt-10">
        <Button href="/kontakt" icon={Mail} size="lg">
          Frage stellen
        </Button>
      </div>
    </div>
  );
}
