"use client";

import { useActionState } from "react";
import { Send, User, Mail, MessageSquare, Hexagon, CheckCircle, AlertCircle } from "lucide-react";
import Button from "@/src/components/Button";
import PageHeader from "@/src/components/PageHeader";
import { sendContactEmail, type ContactState } from "@/src/app/actions/contact";

const initialState: ContactState = { status: "idle" };

export default function Kontakt() {
  const [state, action, pending] = useActionState(sendContactEmail, initialState);

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
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
          {state.status === "success" ? (
            <div className="flex flex-col items-center gap-4 rounded-[2.5rem] border border-green-100 bg-white p-12 text-center shadow-sm">
              <CheckCircle className="text-green-500" size={48} />
              <h2 className="font-heading text-2xl font-bold text-accent">Nachricht gesendet!</h2>
              <p className="text-stone-600">Vielen Dank – wir melden uns so schnell wie möglich bei dir.</p>
            </div>
          ) : (
            <form
              action={action}
              className="space-y-6 rounded-[2.5rem] border border-stone-100 bg-white p-8 shadow-sm md:p-12"
            >
              {state.status === "error" && (
                <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">
                  <AlertCircle size={16} className="shrink-0" />
                  {state.message}
                </div>
              )}

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
                <Button type="submit" icon={Send} disabled={pending}>
                  {pending ? "Wird gesendet…" : "Absenden"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
