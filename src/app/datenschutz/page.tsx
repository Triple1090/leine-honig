import PageHeader from "@/src/components/PageHeader";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export const metadata = {
  title: "Datenschutz | Leine-Honig",
  description:
    "Informationen zum Schutz deiner persönlichen Daten bei Leine-Honig.",
};

export default function Datenschutz() {
  return (
    <div className="min-h-screen pb-20" style={{ background: "var(--color-bg)" }}>
      <PageHeader
        image="/images/juergen/raps-abfuellen.jpeg"
        imageAlt="Honig abfüllen"
        badgeIcon={Shield}
        badge="Sicherheit & Vertrauen"
        title="Datenschutzerklärung"
        subtitle="Wir nehmen den Schutz deiner persönlichen Daten sehr ernst."
      />

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
                <strong>Leine-Honig</strong>
                <br />
                Tjark Radewaldt
                <br />
                Zum Schützenhaus 6
                <br />
                31535 Neustadt
                <br />
                E-Mail: info@leine-honig.de
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
                deinem Rechner abgelegt werden und die dein Browser speichert. Die
                meisten der von uns verwendeten Cookies sind so genannte
                „Session-Cookies“, die nach Ende deines Besuchs automatisch
                gelöscht werden.
              </p>
              <h3 className="mt-6 mb-2 font-bold text-stone-800">
                Server-Log-Dateien
              </h3>
              <p>
                Der Provider der Seiten erhebt und speichert automatisch
                Informationen in so genannten Server-Log-Dateien, die dein
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
                Wenn du in unserem Shop Honig bestellst oder ein Bienenvolk
                mietest, erfassen wir die für die Geschäftsabwicklung notwendigen
                Daten (Name, Anschrift, E-Mail, Zahlungsdaten). Die Verarbeitung
                erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO zur
                Vertragserfüllung.
              </p>
              <p className="mt-4">
                Wir geben deine Daten nur an Dritte weiter, wenn dies zur
                Vertragsabwicklung notwendig ist (z. B. an das mit der Lieferung
                beauftragte Versandunternehmen oder das mit der
                Zahlungsabwicklung beauftragte Kreditinstitut).
              </p>
            </div>

            {/* 4. Deine Rechte */}
            <div className="rounded-2xl border border-stone-100 bg-stone-50 p-6">
              <h2 className="font-heading mb-4 text-2xl text-stone-900">
                4. Deine Rechte
              </h2>
              <p>Du hast jederzeit das Recht:</p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>
                  Auskunft über deine gespeicherten Daten zu erhalten (Art. 15
                  DSGVO).
                </li>
                <li>
                  Die Berichtigung oder Löschung deiner Daten zu verlangen (Art.
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
