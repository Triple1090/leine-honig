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
    <div className="min-h-screen" style={{ background: "var(--lh-cream)" }}>
      <PageHeader
        image="/images/juergen/bienenstand2.jpeg"
        imageAlt="Bienenstand"
        badgeIcon={MessageSquare}
        badge="Kontakt"
        title={<>Schreib dem <em style={{ color: "var(--lh-gold)", fontStyle: "italic" }}>Schwarm</em></>}
        subtitle="Ob Bienenmiete oder Honig-Bestellung — wir freuen uns auf deine Nachricht."
      />

      <section className="px-6 py-16" id="kontakt">
        <div className="mx-auto max-w-3xl">
          {state.status === "success" ? (
            <div
              className="flex flex-col items-center gap-4 p-12 text-center"
              style={{
                background: "var(--lh-paper)",
                border: "1px solid var(--color-line)",
                borderRadius: 14,
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <CheckCircle size={48} style={{ color: "var(--color-success)" }} />
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--fs-30)",
                  fontWeight: 500,
                  color: "var(--lh-ink)",
                }}
              >
                Nachricht gesendet.
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", color: "var(--lh-ink-2)" }}>
                Vielen Dank — wir melden uns so schnell wie möglich bei dir.
              </p>
            </div>
          ) : (
            <form
              action={action}
              className="space-y-6 p-8 md:p-10"
              style={{
                background: "var(--lh-paper)",
                border: "1px solid var(--color-line)",
                borderRadius: 14,
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {state.status === "error" && (
                <div
                  className="flex items-center gap-3 px-5 py-4"
                  style={{
                    background: "rgba(178,58,44,0.08)",
                    color: "var(--color-error)",
                    border: "1px solid rgba(178,58,44,0.25)",
                    borderRadius: 10,
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                  }}
                >
                  <AlertCircle size={16} className="shrink-0" />
                  {state.message}
                </div>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                <div className="lh-field">
                  <label className="lh-label flex items-center gap-2"><User size={14} /> Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Dein Name"
                    className="lh-input"
                  />
                </div>
                <div className="lh-field">
                  <label className="lh-label flex items-center gap-2"><Mail size={14} /> E-Mail</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="deine@email.de"
                    className="lh-input"
                  />
                </div>
              </div>

              <div className="lh-field">
                <label className="lh-label flex items-center gap-2"><Hexagon size={14} /> Anliegen</label>
                <select name="subject" className="lh-select">
                  <option value="Allgemeine Anfrage">Allgemeine Anfrage</option>
                  <option value="Bienen mieten">Bienen mieten</option>
                  <option value="Honig Bestellung">Honig Bestellung</option>
                  <option value="Sonstiges">Sonstiges</option>
                </select>
              </div>

              <div className="lh-field">
                <label className="lh-label flex items-center gap-2"><MessageSquare size={14} /> Deine Nachricht</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Wie können wir dir helfen?"
                  className="lh-textarea"
                />
              </div>

              <div
                className="flex items-start gap-3 px-5 py-4"
                style={{ background: "var(--lh-paper-soft)", border: "1px solid var(--color-line)", borderRadius: 10 }}
              >
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy_consent"
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer"
                  style={{ accentColor: "var(--lh-gold)" }}
                />
                <label
                  htmlFor="privacy"
                  className="cursor-pointer"
                  style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--lh-ink-2)" }}
                >
                  Ich habe die{" "}
                  <a href="/datenschutz" style={{ color: "var(--lh-ink)", textDecoration: "underline", textDecorationColor: "var(--lh-gold)" }}>
                    Datenschutzerklärung
                  </a>{" "}
                  gelesen und bin mit der Verarbeitung meiner Daten einverstanden.
                </label>
              </div>

              <div className="flex items-center justify-end">
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
