"use client"; // <-- Das muss ganz oben stehen!

import Badge from "@/src/components/Badge";
import { Scale, Info, Mail, MapPin, UserCheck } from "lucide-react";

export const metadata = {
  title: "Impressum | Lunsen-Honig",
  description: "Gesetzliche Anbieterkennung von Lunsen-Honig.",
};

export default function Impressum() {
  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <section className="border-b border-stone-100 bg-white px-6 pt-32 pb-16 text-center">
        <div className="mx-auto max-w-4xl">
          <Badge icon={Info} className="mb-4">
            Anbieterkennung
          </Badge>
          <h1 className="mb-6 text-4xl font-extrabold text-stone-900 md:text-5xl">
            Impressum
          </h1>
          <p className="text-lg text-stone-600 italic">
            Lunsen-Honig – Imkerei aus Leidenschaft & Handwerk
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-stone-100 bg-white p-8 shadow-sm md:p-16">
          <div className="grid gap-12 text-stone-600 md:grid-cols-2">
            {/* Linke Spalte: Wer und Wo */}
            <div className="space-y-6">
              <div>
                <h2 className="font-heading decoration-primary/30 mb-6 flex items-center gap-3 text-2xl text-stone-900 underline underline-offset-8">
                  <Scale size={24} className="text-primary" /> Kontakt
                </h2>
                <p className="text-lg font-bold text-stone-800">Lunsen-Honig</p>
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
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href =
                        "mailto:" + "info" + "@" + "lunsen-honig.de";
                    }}
                    className="hover:text-primary transition"
                  >
                    info@lunsen-honig.de
                  </a>
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
