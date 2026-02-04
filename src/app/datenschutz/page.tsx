import Badge from "@/src/components/Badge";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export const metadata = {
  title: "Datenschutz | Lunsen-Honig",
  description:
    "Informationen zum Schutz Ihrer persönlichen Daten bei Lunsen-Honig.",
};

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Header */}
      <section className="border-b border-stone-100 bg-white px-6 pt-32 pb-16 text-center">
        <div className="mx-auto max-w-4xl">
          <Badge icon={Shield} className="mb-4">
            Sicherheit & Vertrauen
          </Badge>
          <h1 className="mb-6 text-4xl font-extrabold text-stone-900 md:text-5xl">
            Datenschutzerklärung
          </h1>
          <p className="text-lg text-stone-600">
            Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Hier
            erfahren Sie, wie wir mit Ihren Daten umgehen.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-stone-100 bg-white p-8 shadow-sm md:p-16">
          <div className="prose prose-stone max-w-none space-y-12 leading-relaxed text-stone-600">
            {/* 1. Verantwortlicher */}
            <div>
              <h2 className="font-heading mb-4 flex items-center gap-3 text-2xl text-stone-900">
                <Lock size={24} className="text-primary" /> 1. Verantwortlicher
              </h2>
              <p>
                Verantwortlich für die Datenverarbeitung auf dieser Website im
                Sinne der DSGVO ist:
                <br />
                <br />
                <strong>Lunsen-Honig</strong>
                <br />
                Jürgen Hochegger & Tjark Radewaldt
                <br />
                OT Luttmersen
                <br />
                31535 Neustadt am Rübenberge
                <br />
                E-Mail: info@lunsen-honig.de
              </p>
            </div>

            {/* 2. Datenerfassung */}
            <div>
              <h2 className="font-heading mb-4 flex items-center gap-3 text-2xl text-stone-900">
                <Eye size={24} className="text-primary" /> 2. Datenerfassung auf
                unserer Website
              </h2>
              <h3 className="mt-4 mb-2 font-bold text-stone-800">Cookies</h3>
              <p>
                Unsere Website verwendet teilweise so genannte Cookies. Diese
                dienen dazu, unser Angebot nutzerfreundlicher, effektiver und
                sicherer zu machen. Cookies sind kleine Textdateien, die auf
                Ihrem Rechner abgelegt werden und die Ihr Browser speichert. Die
                meisten der von uns verwendeten Cookies sind so genannte
                „Session-Cookies“, die nach Ende Ihres Besuchs automatisch
                gelöscht werden.
              </p>
              <h3 className="mt-6 mb-2 font-bold text-stone-800">
                Server-Log-Dateien
              </h3>
              <p>
                Der Provider der Seiten erhebt und speichert automatisch
                Informationen in so genannten Server-Log-Dateien, die Ihr
                Browser automatisch an uns übermittelt. Dies sind: Browsertyp,
                Betriebssystem, Referrer URL, Hostname des zugreifenden
                Rechners, Uhrzeit der Serveranfrage und IP-Adresse. Eine
                Zusammenführung dieser Daten mit anderen Datenquellen wird nicht
                vorgenommen.
              </p>
            </div>

            {/* 3. Shop & Bienenmiete */}
            <div>
              <h2 className="font-heading mb-4 flex items-center gap-3 text-2xl text-stone-900">
                <FileText size={24} className="text-primary" /> 3.
                Datenverarbeitung bei Bestellung & Miete
              </h2>
              <p>
                Wenn Sie in unserem Shop Honig bestellen oder ein Bienenvolk
                mieten, erfassen wir die für die Geschäftsabwicklung notwendigen
                Daten (Name, Anschrift, E-Mail, Zahlungsdaten). Die Verarbeitung
                erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO zur
                Vertragserfüllung.
              </p>
              <p className="mt-4">
                Wir geben Ihre Daten nur an Dritte weiter, wenn dies zur
                Vertragsabwicklung notwendig ist (z. B. an das mit der Lieferung
                beauftragte Versandunternehmen oder das mit der
                Zahlungsabwicklung beauftragte Kreditinstitut).
              </p>
            </div>

            {/* 4. Ihre Rechte */}
            <div className="rounded-2xl border border-stone-100 bg-stone-50 p-6">
              <h2 className="font-heading mb-4 text-2xl text-stone-900">
                4. Ihre Rechte
              </h2>
              <p>Sie haben jederzeit das Recht:</p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>
                  Auskunft über Ihre gespeicherten Daten zu erhalten (Art. 15
                  DSGVO).
                </li>
                <li>
                  Die Berichtigung oder Löschung Ihrer Daten zu verlangen (Art.
                  16 & 17 DSGVO).
                </li>
                <li>Die Verarbeitung einzuschränken (Art. 18 DSGVO).</li>
                <li>
                  Widerspruch gegen die Verarbeitung einzulegen (Art. 21 DSGVO).
                </li>
                <li>
                  Eine Beschwerde bei der zuständigen Aufsichtsbehörde
                  einzureichen.
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm text-stone-400 italic">
                Stand: Februar 2026. Diese Datenschutzerklärung wurde mit
                Sorgfalt erstellt, ersetzt jedoch keine individuelle
                Rechtsberatung.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
