"use client";

import { Send, User, Mail, MessageSquare, Hexagon } from "lucide-react";
import Button from "@/src/components/Button";
import PageHeader from "@/src/components/PageHeader";

export default function Kontakt() {
  return (
    <div className="min-h-screen bg-stone-50">
      <PageHeader
        image="/images/juergen/bienenstand2.jpeg"
        imageAlt="Bienenstand"
        badgeIcon={MessageSquare}
        badge="Kontakt"
        title={<>Schreib dem <span className="text-primary">Schwarm</span></>}
        subtitle="Ob Bienenmiete oder Honig-Bestellung – wir freuen uns auf deine Nachricht!"
      />

      <section className="px-6 py-16" id="kontakt">
        <div className="mx-auto max-w-3xl">
          <form
            action="https://submit-form.com/huKidvzeo"
            method="POST"
            className="space-y-6 rounded-[2.5rem] border border-stone-100 bg-white p-8 shadow-sm md:p-12"
          >
            <input type="hidden" name="_redirect" value="https://leine-honig.de/danke" />
            <input type="checkbox" name="_honeypot" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="ml-1 flex items-center gap-2 text-sm font-bold text-stone-700">
                  <User size={14} /> Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Dein Name"
                  className="focus:border-primary focus:ring-primary/20 w-full rounded-2xl border border-stone-200 bg-stone-50 px-5 py-3 transition outline-none focus:ring-2"
                />
              </div>
              <div className="space-y-2">
                <label className="ml-1 flex items-center gap-2 text-sm font-bold text-stone-700">
                  <Mail size={14} /> E-Mail
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="deine@email.de"
                  className="focus:border-primary focus:ring-primary/20 w-full rounded-2xl border border-stone-200 bg-stone-50 px-5 py-3 transition outline-none focus:ring-2"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="ml-1 flex items-center gap-2 text-sm font-bold text-stone-700">
                <Hexagon size={14} /> Anliegen
              </label>
              <select
                name="subject"
                className="focus:border-primary focus:ring-primary/20 w-full appearance-none rounded-2xl border border-stone-200 bg-stone-50 px-5 py-3 transition outline-none focus:ring-2"
              >
                <option value="Allgemeine Anfrage">Allgemeine Anfrage</option>
                <option value="Bienen mieten">Bienen mieten</option>
                <option value="Honig Bestellung">Honig Bestellung</option>
                <option value="Sonstiges">Sonstiges</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="ml-1 flex items-center gap-2 text-sm font-bold text-stone-700">
                <MessageSquare size={14} /> Deine Nachricht
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Wie können wir dir helfen?"
                className="focus:border-primary focus:ring-primary/20 w-full rounded-2xl border border-stone-200 bg-stone-50 px-5 py-3 transition outline-none focus:ring-2"
              />
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4">
              <input
                type="checkbox"
                id="privacy"
                name="privacy_consent"
                required
                className="accent-primary mt-0.5 h-4 w-4 shrink-0 cursor-pointer"
              />
              <label htmlFor="privacy" className="cursor-pointer text-sm text-stone-600">
                Ich habe die{" "}
                <a href="/datenschutz" className="text-primary underline underline-offset-2 hover:text-primary-dark">
                  Datenschutzerklärung
                </a>{" "}
                gelesen und bin mit der Verarbeitung meiner Daten einverstanden.
              </label>
            </div>

            <div className="flex items-center justify-center">
              <Button type="submit" icon={Send}>Absenden</Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
