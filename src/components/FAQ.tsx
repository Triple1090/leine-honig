import { Plus, Mail } from "lucide-react";
import Button from "./Button";

const faqData = [
  {
    id: 1,
    question: "Woher kommt euer Honig?",
    answer: "Alle unsere Bienenvölker stehen in der Leineregion rund um Neustadt am Rübenberge. Der Honig kommt direkt aus der Wabe ins Glas — ohne Umwege, ohne Zusätze.",
  },
  {
    id: 2,
    question: "Ist euer Honig Bio-zertifiziert?",
    answer: "Wir sind keine Bio-zertifizierte Imkerei, arbeiten aber nach denselben Grundsätzen: kein Einsatz von Pestiziden, keine Zusätze, keine Wärmebehandlung. Ehrlicher Honig eben.",
  },
  {
    id: 3,
    question: "Warum kristallisiert mein Honig aus?",
    answer: "Kristallisation ist ein natürlicher Prozess und ein Zeichen für echten, unverfälschten Honig. Einfach das Glas in warmes Wasser (max. 40°C) stellen — dann wird er wieder flüssig.",
  },
  {
    id: 4,
    question: "Wie lange ist Honig haltbar?",
    answer: "Honig ist praktisch unbegrenzt haltbar, wenn er trocken und lichtgeschützt gelagert wird. Das Mindesthaltbarkeitsdatum auf unseren Gläsern ist gesetzlich vorgeschrieben, nicht die tatsächliche Grenze.",
  },
  {
    id: 5,
    question: "Kann ich ein Bienenvolk für meinen Garten mieten?",
    answer: "Ja! Wir bringen ein professionell betreutes Volk zu dir und kümmern uns um alles. Du brauchst nur einen geeigneten Standplatz. Schreib uns einfach.",
  },
  {
    id: 6,
    question: "Wie läuft die Bienenmiete ab?",
    answer: "Wir besprechen gemeinsam den Standplatz, bringen das Volk im Frühjahr und holen es im Herbst wieder ab. Du bekommst am Ende der Saison deinen eigenen Honig — ca. 20 kg.",
  },
];

export default function FAQ() {
  return (
    <div className="mx-auto max-w-4xl" id="faq">
      <div className="mb-12 text-center">
        <h3 className="mb-2 text-2xl font-bold text-stone-900">Noch Fragen?</h3>
        <p className="text-stone-500">Alles Wichtige auf einen Blick.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {faqData.map((item) => (
          <details
            key={item.id}
            className="group hover:border-primary/20 open:border-primary/10 h-fit rounded-2xl border border-transparent bg-stone-50 transition-all duration-300 open:bg-white open:shadow-md"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between p-5 select-none">
              <span className="group-hover:text-primary pr-4 text-sm font-bold text-stone-800 transition-colors md:text-base">
                {item.question}
              </span>
              <div className="group-open:text-primary flex-shrink-0 text-stone-400 transition-transform duration-300 group-open:rotate-45">
                <Plus size={20} />
              </div>
            </summary>
            <div className="px-5 pt-0 pb-5 text-sm leading-relaxed text-stone-600">
              {item.answer}
            </div>
          </details>
        ))}
      </div>

      <div className="flex items-center justify-center pt-10">
        <Button href="/kontakt" icon={Mail}>
          Frage stellen
        </Button>
      </div>
    </div>
  );
}
