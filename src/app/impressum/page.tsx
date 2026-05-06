import PageHeader from "@/src/components/PageHeader";
import BrandWordmark from "@/src/components/BrandWordmark";
import { Scale, Info, Mail, MapPin, UserCheck } from "lucide-react";

export const metadata = {
  title: "Impressum | Leine-Honig",
  description: "Gesetzliche Anbieterkennung von Leine-Honig.",
};

export default function Impressum() {
  return (
    <div className="min-h-screen pb-20" style={{ background: "var(--color-bg)" }}>
      <PageHeader
        image="/images/juergen/bienenstand.jpeg"
        imageAlt="Bienenstand"
        badgeIcon={Info}
        badge="Anbieterkennung"
        title="Impressum"
        subtitle="Leine-Honig – Imkerei aus Leidenschaft & Handwerk"
      />

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-stone-100 bg-white p-8 shadow-sm md:p-16">
          <div className="grid gap-12 text-stone-600 md:grid-cols-2">
            {/* Linke Spalte: Wer und Wo */}
            <div className="space-y-6">
              <div>
                <h2 className="font-heading decoration-primary/30 mb-6 flex items-center gap-3 text-2xl text-stone-900 underline underline-offset-8">
                  <Scale size={24} className="text-primary" /> Kontakt
                </h2>
                <BrandWordmark size="md" />
                <p className="mt-2">
                  Jürgen Hochegger & Tjark Radewaldt
                  <br />
                  OT Luttmersen
                  <br />
                  31535 Neustadt am Rübenberge
                </p>
              </div>

              <div className="space-y-3 border-t border-stone-50 pt-4">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-primary" />
                  info( @ )leine-honig.de
                </div>
                <div className="flex items-center gap-3 text-sm italic">
                  <UserCheck size={18} className="text-primary" />
                  <span>Landwirtschaftliche Imkerei (§ 13a EStG)</span>
                </div>
              </div>
            </div>

            {/* Rechte Spalte: Rechtliche Details */}
            <div className="space-y-8 rounded-3xl border border-stone-100 bg-stone-50 p-8">
              <div>
                <h3 className="mb-2 font-bold text-stone-900">
                  Vertretungsberechtigt
                </h3>
                <p className="text-sm">Jürgen Hochegger & Tjark Radewaldt</p>
              </div>

              <div>
                <h3 className="mb-2 font-bold text-stone-900">
                  Steuer-Hinweis
                </h3>
                <p className="text-sm leading-relaxed">
                  Die Besteuerung erfolgt nach den allgemeinen Sätzen der Land-
                  und Forstwirtschaft. Umsatzsteuerbefreit im Rahmen der
                  Kleinunternehmerregelung gemäß § 19 UStG (oder
                  Pauschalierung).
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-bold text-stone-900">
                  Online-Streitbeilegung
                </h3>
                <p className="text-xs leading-relaxed text-stone-500">
                  Plattform der EU-Kommission zur Online-Streitbeilegung:
                  <a
                    href="https://ec.europa.eu/consumers/odr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary ml-1 underline"
                  >
                    ec.europa.eu/consumers/odr
                  </a>
                  . Wir sind zur Teilnahme an einem Streitbeilegungsverfahren
                  nicht verpflichtet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
