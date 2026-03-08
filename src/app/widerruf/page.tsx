import Badge from "@/src/components/Badge";
import { RotateCcw, AlertCircle, Mail, Truck, FileText } from "lucide-react";

export const metadata = {
  title: "Widerrufsbelehrung | Leine-Honig",
  description: "Informationen zu Ihrem Widerrufsrecht bei Leine-Honig.",
};

export default function Widerruf() {
  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Header */}
      <section className="border-b border-stone-100 bg-white px-6 pt-32 pb-16 text-center">
        <div className="mx-auto max-w-4xl">
          <Badge icon={RotateCcw} className="mb-4">
            Verbraucherrechte
          </Badge>
          <h1 className="mb-6 text-4xl font-extrabold text-stone-900 md:text-5xl">
            Widerrufs<span className="text-primary">belehrung</span>
          </h1>
          <p className="text-lg text-stone-600">
            Hier erfahren Sie, wie Sie Verträge widerrufen können und welche
            Ausnahmen gelten.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-stone-100 bg-white p-8 shadow-sm md:p-16">
          <div className="prose prose-stone max-w-none space-y-12 text-stone-600">
            {/* 1. Das Recht */}
            <div>
              <h2 className="font-heading mb-4 flex items-center gap-3 text-2xl text-stone-900">
                <FileText size={24} className="text-primary" /> Widerrufsrecht
              </h2>
              <p>
                Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von
                Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt
                vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen
                benannter Dritter die Waren in Besitz genommen haben.
              </p>
            </div>

            {/* 2. Ausübung */}
            <div>
              <h2 className="font-heading mb-4 flex items-center gap-3 text-2xl text-stone-900">
                <Mail size={24} className="text-primary" /> Ausübung des
                Widerrufs
              </h2>
              <p className="mb-4">
                Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer
                eindeutigen Erklärung (z. B. ein mit der Post versandter Brief
                oder eine E-Mail) über Ihren Entschluss informieren:
              </p>
              <div className="rounded-2xl border border-stone-100 bg-stone-50 p-6 italic">
                <strong>Leine-Honig</strong>
                <br />
                Jürgen Hochegger & Tjark Radewaldt
                <br />
                OT Luttmersen, 31535 Neustadt am Rübenberge
                <br />
                E-Mail: info@leine-honig.de
              </div>
            </div>

            {/* 3. WICHTIG: Ausschluss bei Honig */}
            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
              <h2 className="font-heading mb-4 flex items-center gap-3 text-2xl text-amber-900 text-stone-900">
                <AlertCircle size={24} /> Vorzeitiges Erlöschen
              </h2>
              <p className="text-amber-800">
                <strong>Wichtiger Hinweis für Honig-Bestellungen:</strong>
                <br />
                Das Widerrufsrecht erlischt vorzeitig bei Verträgen zur
                Lieferung versiegelter Waren, die aus Gründen des
                Gesundheitsschutzes oder der Hygiene nicht zur Rückgabe geeignet
                sind, wenn ihre Versiegelung nach der Lieferung entfernt wurde.
                Sobald das Honigglas geöffnet wurde, ist ein Widerruf
                ausgeschlossen.
              </p>
            </div>

            {/* 4. Folgen */}
            <div>
              <h2 className="font-heading mb-4 flex items-center gap-3 text-2xl text-stone-900">
                <Truck size={24} className="text-primary" /> Folgen des
                Widerrufs
              </h2>
              <p>
                Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle
                Zahlungen, die wir von Ihnen erhalten haben (einschließlich der
                Lieferkosten), unverzüglich zurückzuzahlen. Für diese
                Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei
                der ursprünglichen Transaktion eingesetzt haben.
              </p>
              <p className="mt-4">
                Sie tragen die unmittelbaren Kosten der Rücksendung der Waren.
                Bei der Bienenmiete erfolgt die Rückholung der Völker durch uns;
                hierbei können vereinbarte Transportpauschalen anfallen.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
