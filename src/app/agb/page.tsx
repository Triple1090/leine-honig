import Badge from "@/src/components/Badge";
import { Gavel, Bug, ShieldAlert, Calendar, CreditCard } from "lucide-react";

export const metadata = {
  title: "AGB Bienenmiete | Lunsen-Honig",
  description:
    "Allgemeine Geschäftsbedingungen für die Vermietung von Bienenvölkern.",
};

export default function AGB() {
  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <section className="border-b border-stone-100 bg-white px-6 pt-32 pb-16 text-center">
        <div className="mx-auto max-w-4xl">
          <Badge icon={Gavel} className="mb-4">
            Rechtlicher Rahmen
          </Badge>
          <h1 className="mb-6 text-4xl font-extrabold text-stone-900 md:text-5xl">
            AGB <span className="text-primary">Bienenmiete</span>
          </h1>
          <p className="text-lg text-stone-600">
            Allgemeine Geschäftsbedingungen für die Vermietung von Bienenvölkern
            durch Lunsen-Honig.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-stone-100 bg-white p-8 shadow-sm md:p-16">
          <div className="prose prose-stone max-w-none space-y-12 text-stone-600">
            {/* 1. Vertragspartner & Geltung */}
            <div>
              <h2 className="font-heading mb-4 flex items-center gap-3 text-2xl text-stone-900">
                <Gavel size={24} className="text-primary" /> 1. Geltungsbereich
              </h2>
              <p>
                Diese AGB gelten für alle Verträge über die Vermietung von
                Bienenvölkern zwischen der Lunsen-Honig (Vermieter) und deren
                Kunden (Mieter).
              </p>
            </div>

            {/* 2. Standplatz & Sicherheit */}
            <div>
              <h2 className="font-heading mb-4 flex items-center gap-3 text-2xl text-stone-900">
                <ShieldAlert size={24} className="text-primary" /> 2. Pflichten
                des Mieters
              </h2>
              <p>
                Der Mieter stellt einen geeigneten Standplatz zur Verfügung. Er
                ist dafür verantwortlich, dass:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>
                  Dritte über die Anwesenheit der Bienen informiert werden.
                </li>
                <li>
                  Der Standplatz gegen unbefugten Zugriff geschützt ist
                  (Obhutspflicht).
                </li>
                <li>
                  Keine Eingriffe am Volk oder der Beute ohne Absprache
                  vorgenommen werden.
                </li>
              </ul>
            </div>

            {/* 3. Haftung - WICHTIGSTE ANPASSUNG */}
            <div className="rounded-2xl border border-stone-100 bg-stone-50 p-6">
              <h2 className="font-heading mb-4 text-2xl text-stone-900">
                3. Haftung
              </h2>
              <p className="mb-4">
                Der Vermieter haftet unbeschränkt für Schäden aus der Verletzung
                des Lebens, des Körpers oder der Gesundheit, die auf einer
                vorsätzlichen oder fahrlässigen Pflichtverletzung beruhen.
              </p>
              <p>
                Für sonstige Schäden (Sachschäden) ist die Haftung auf Vorsatz
                und grobe Fahrlässigkeit beschränkt. Der Mieter trägt das Risiko
                für allergische Reaktionen bei sich oder Dritten am
                Aufstellungsort, sofern er seiner Informationspflicht gegenüber
                Besuchern nicht nachkommt.
              </p>
            </div>

            {/* 4. Mietdauer & Zahlung */}
            <div>
              <h2 className="font-heading mb-4 flex items-center gap-3 text-2xl text-stone-900">
                <CreditCard size={24} className="text-primary" /> 4. Mietdauer
                und Zahlung
              </h2>
              <p>
                Die Mietsaison beginnt in der Regel im April und endet im August
                eines Kalenderjahres. Der Mietzins ist im Voraus nach
                Rechnungsstellung ohne Abzug fällig.
              </p>
            </div>

            {/* 5. Völkerverluste */}
            <div>
              <h2 className="font-heading mb-4 flex items-center gap-3 text-2xl text-stone-900">
                <Bug size={24} className="text-primary" /> 5. Ertrag und
                Verluste
              </h2>
              <p>
                Bienen sind Lebewesen. Ein bestimmter Honigertrag wird nicht
                garantiert. Bei Völkerverlust durch Krankheiten oder
                Wetterereignisse bemüht sich der Vermieter um Ersatz. Ein
                Minderungsanspruch besteht nur, wenn kein Ersatzvolk innerhalb
                von 14 Tagen gestellt werden kann.
              </p>
            </div>

            {/* 6. Widerruf */}
            <div className="border-t border-stone-100 pt-8">
              <h3 className="mb-2 font-bold text-stone-900">
                6. Widerrufsrecht
              </h3>
              <p className="text-sm">
                Verbrauchern steht ein gesetzliches Widerrufsrecht zu.
                Informationen hierzu finden Sie in unserer separaten
                Widerrufsbelehrung.
              </p>
            </div>

            <div className="text-xs text-stone-400 italic">
              Stand: Februar 2026. Gerichtsstand ist Neustadt am Rübenberge.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
