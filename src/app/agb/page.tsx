import PageHeader from "@/src/components/PageHeader";
import { Gavel, Bug, ShieldAlert, CreditCard, ShoppingBag, Package, FileCheck } from "lucide-react";

export const metadata = {
  title: "AGB | Leine-Honig",
  description:
    "Allgemeine Geschäftsbedingungen für Honigbestellungen und die Vermietung von Bienenvölkern.",
};

export default function AGB() {
  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <PageHeader
        image="/images/juergen/zarge.jpeg"
        imageAlt="Bienenbeute"
        badgeIcon={Gavel}
        badge="Rechtlicher Rahmen"
        title={<>Allgemeine <span className="text-primary">Geschäftsbedingungen</span></>}
        subtitle="Für den Kauf von Honig in unserem Online-Shop und die Vermietung von Bienenvölkern."
      />

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl space-y-10">

          {/* ============ TEIL 1: SHOP-AGB ============ */}
          <div className="rounded-[2.5rem] border border-stone-100 bg-white p-8 shadow-sm md:p-16">
            <div className="prose prose-stone max-w-none space-y-10 text-stone-600">
              <div>
                <h2 className="font-heading mb-2 flex items-center gap-3 text-3xl text-stone-900">
                  <ShoppingBag size={28} className="text-primary" /> AGB Online-Shop
                </h2>
                <p className="text-sm text-stone-500">Für den Kauf von Honig und sonstigen Imkerei-Produkten.</p>
              </div>

              <div>
                <h3 className="font-heading mb-3 text-xl text-stone-900">§ 1 Geltungsbereich &amp; Anbieter</h3>
                <p>
                  Diese AGB gelten für alle Bestellungen, die Verbraucher (§ 13 BGB) über den
                  Online-Shop unter <strong>shop.leine-honig.de</strong> / <strong>www.leine-honig.de</strong> aufgeben.
                </p>
                <p className="mt-3">
                  Anbieter: Leine-Honig · Jürgen Hochegger &amp; Tjark Radewaldt ·
                  OT Luttmersen, 31535 Neustadt am Rübenberge · info@leine-honig.de
                </p>
              </div>

              <div>
                <h3 className="font-heading mb-3 text-xl text-stone-900">§ 2 Vertragsschluss</h3>
                <p>
                  Die Präsentation der Produkte im Online-Shop stellt kein rechtlich bindendes
                  Angebot, sondern eine Einladung zur Bestellung dar. Mit Klick auf „Jetzt
                  kaufen" geben Sie ein verbindliches Angebot zum Abschluss eines Kaufvertrags
                  ab. Der Vertrag kommt durch unsere Bestellbestätigung per E-Mail zustande.
                </p>
              </div>

              <div>
                <h3 className="font-heading mb-3 flex items-center gap-2 text-xl text-stone-900">
                  <CreditCard size={20} className="text-primary" /> § 3 Preise &amp; Zahlung
                </h3>
                <p>
                  Alle Preise sind Endpreise in Euro. Aufgrund der Kleinunternehmerregelung
                  gemäß § 19 UStG wird keine Umsatzsteuer ausgewiesen.
                  Versandkosten werden gesondert berechnet und in der Bestellübersicht
                  transparent angezeigt.
                </p>
                <p className="mt-3">
                  Zahlung per Kreditkarte (Stripe) oder Vorkasse per Überweisung. Bei Vorkasse
                  erfolgt der Versand nach Zahlungseingang. Bitte überweisen Sie den Betrag
                  innerhalb von 7 Tagen unter Angabe der Bestellnummer als Verwendungszweck.
                </p>
              </div>

              <div>
                <h3 className="font-heading mb-3 flex items-center gap-2 text-xl text-stone-900">
                  <Package size={20} className="text-primary" /> § 4 Lieferung &amp; Versand
                </h3>
                <p>
                  Versand erfolgt ausschließlich innerhalb Deutschlands über DHL. Die
                  Versandart wird automatisch anhand des Bestellgewichts gewählt. Die
                  Lieferzeit beträgt in der Regel 2–5 Werktage ab Zahlungseingang.
                </p>
                <p className="mt-3">
                  Verzögerungen aufgrund höherer Gewalt oder Lieferengpässen teilen wir
                  unverzüglich mit. Honig ist ein Naturprodukt — geringe Abweichungen bei
                  Konsistenz und Farbe sind natürlich und begründen keinen Mangel.
                </p>
              </div>

              <div>
                <h3 className="font-heading mb-3 text-xl text-stone-900">§ 5 Eigentumsvorbehalt</h3>
                <p>Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.</p>
              </div>

              <div>
                <h3 className="font-heading mb-3 flex items-center gap-2 text-xl text-stone-900">
                  <FileCheck size={20} className="text-primary" /> § 6 Gewährleistung
                </h3>
                <p>
                  Es gelten die gesetzlichen Gewährleistungsbestimmungen. Bei Mängeln bitten
                  wir um unverzügliche Kontaktaufnahme per E-Mail an info@leine-honig.de unter
                  Angabe der Bestellnummer.
                </p>
                <p className="mt-3 text-sm text-stone-500">
                  Mindesthaltbarkeit: Honig ist bei korrekter Lagerung (kühl, trocken,
                  lichtgeschützt) mindestens 2 Jahre ab Abfülldatum haltbar. Kristallisation
                  ist ein natürlicher Vorgang und kein Mangel.
                </p>
              </div>

              <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
                <h3 className="font-heading mb-3 text-xl text-amber-900">§ 7 Widerrufsrecht</h3>
                <p className="text-amber-800">
                  Verbrauchern steht ein gesetzliches 14-tägiges Widerrufsrecht zu. Details
                  und das Widerrufsformular finden Sie in unserer separaten{" "}
                  <a href="/widerruf" className="underline">Widerrufsbelehrung</a>.
                </p>
                <p className="mt-3 text-sm text-amber-800">
                  <strong>Hinweis:</strong> Das Widerrufsrecht erlischt bei versiegelten
                  Lebensmitteln (Honigglas) nach Öffnung der Versiegelung (§ 312g Abs. 2 Nr. 3 BGB).
                </p>
              </div>

              <div>
                <h3 className="font-heading mb-3 text-xl text-stone-900">§ 8 Streitbeilegung</h3>
                <p className="text-sm">
                  Die EU-Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:{" "}
                  <a
                    href="https://ec.europa.eu/consumers/odr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    ec.europa.eu/consumers/odr
                  </a>
                  . Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungs-
                  verfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>

              <div className="text-xs text-stone-400 italic">
                Stand: April 2026. Gerichtsstand für Kaufleute ist Neustadt am Rübenberge.
              </div>
            </div>
          </div>

          {/* ============ TEIL 2: BIENENMIETE-AGB ============ */}
          <div className="rounded-[2.5rem] border border-stone-100 bg-white p-8 shadow-sm md:p-16">
            <div className="prose prose-stone max-w-none space-y-10 text-stone-600">
              <div>
                <h2 className="font-heading mb-2 flex items-center gap-3 text-3xl text-stone-900">
                  <Bug size={28} className="text-primary" /> AGB Bienenmiete
                </h2>
                <p className="text-sm text-stone-500">Für die Vermietung von Bienenvölkern.</p>
              </div>

              <div>
                <h3 className="font-heading mb-3 flex items-center gap-2 text-xl text-stone-900">
                  <Gavel size={20} className="text-primary" /> 1. Geltungsbereich
                </h3>
                <p>
                  Diese AGB gelten für alle Verträge über die Vermietung von Bienenvölkern
                  zwischen Leine-Honig (Vermieter) und deren Kunden (Mieter).
                </p>
              </div>

              <div>
                <h3 className="font-heading mb-3 flex items-center gap-2 text-xl text-stone-900">
                  <ShieldAlert size={20} className="text-primary" /> 2. Pflichten des Mieters
                </h3>
                <p>
                  Der Mieter stellt einen geeigneten Standplatz zur Verfügung. Er ist dafür
                  verantwortlich, dass:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5">
                  <li>Dritte über die Anwesenheit der Bienen informiert werden.</li>
                  <li>Der Standplatz gegen unbefugten Zugriff geschützt ist (Obhutspflicht).</li>
                  <li>Keine Eingriffe am Volk oder der Beute ohne Absprache vorgenommen werden.</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-stone-100 bg-stone-50 p-6">
                <h3 className="font-heading mb-3 text-xl text-stone-900">3. Haftung</h3>
                <p className="mb-4">
                  Der Vermieter haftet unbeschränkt für Schäden aus der Verletzung des Lebens,
                  des Körpers oder der Gesundheit, die auf einer vorsätzlichen oder
                  fahrlässigen Pflichtverletzung beruhen.
                </p>
                <p>
                  Für sonstige Schäden (Sachschäden) ist die Haftung auf Vorsatz und grobe
                  Fahrlässigkeit beschränkt. Der Mieter trägt das Risiko für allergische
                  Reaktionen bei sich oder Dritten am Aufstellungsort, sofern er seiner
                  Informationspflicht gegenüber Besuchern nicht nachkommt.
                </p>
              </div>

              <div>
                <h3 className="font-heading mb-3 flex items-center gap-2 text-xl text-stone-900">
                  <CreditCard size={20} className="text-primary" /> 4. Mietdauer und Zahlung
                </h3>
                <p>
                  Die Mietsaison beginnt in der Regel im April und endet im August eines
                  Kalenderjahres. Der Mietzins ist im Voraus nach Rechnungsstellung ohne Abzug
                  fällig.
                </p>
              </div>

              <div>
                <h3 className="font-heading mb-3 flex items-center gap-2 text-xl text-stone-900">
                  <Bug size={20} className="text-primary" /> 5. Ertrag und Verluste
                </h3>
                <p>
                  Bienen sind Lebewesen. Ein bestimmter Honigertrag wird nicht garantiert. Bei
                  Völkerverlust durch Krankheiten oder Wetterereignisse bemüht sich der
                  Vermieter um Ersatz. Ein Minderungsanspruch besteht nur, wenn kein
                  Ersatzvolk innerhalb von 14 Tagen gestellt werden kann.
                </p>
              </div>

              <div className="border-t border-stone-100 pt-6">
                <h3 className="font-heading mb-3 text-xl text-stone-900">6. Widerrufsrecht</h3>
                <p className="text-sm">
                  Verbrauchern steht ein gesetzliches Widerrufsrecht zu. Informationen hierzu
                  finden Sie in unserer separaten{" "}
                  <a href="/widerruf" className="text-primary underline">Widerrufsbelehrung</a>.
                </p>
              </div>

              <div className="text-xs text-stone-400 italic">
                Stand: April 2026. Gerichtsstand ist Neustadt am Rübenberge.
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
