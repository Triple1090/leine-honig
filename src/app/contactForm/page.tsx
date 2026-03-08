"use client";

import { Send, User, Mail, MessageSquare, Hexagon } from "lucide-react";
import Badge from "@/src/components/Badge";
import Button from "@/src/components/Button";

export default function ContactForm() {
  return (
    <section className="bg-white px-6 py-20" id="kontakt">
      <div className="mx-auto max-w-3xl">
        {/* Titel & Einleitung */}
        <div className="mb-12 text-center">
          <Badge icon={MessageSquare} className="mb-4">
            Kontakt
          </Badge>
          <h2 className="font-heading mb-4 text-3xl font-extrabold text-stone-900 md:text-5xl">
            Schreib dem <span className="text-primary">Schwarm</span>
          </h2>
          <p className="text-stone-600">
            Ob Bienenmiete oder Honig-Bestellung – wir freuen uns auf deine
            Nachricht!
          </p>
        </div>

        {/* Formspark Formular */}
        <form
          action="https://submit-form.com/huKidvzeo"
          method="POST"
          className="space-y-6 rounded-[2.5rem] border border-stone-100 bg-stone-50 p-8 shadow-sm md:p-12"
        >
          {/* EINSTELLUNGEN FÜR FORMSPARK */}
          {/* 1. Leitet den Nutzer nach dem Absenden auf deine Danke-Seite weiter */}
          <input
            type="hidden"
            name="_redirect"
            value="https://leine-honig.lunsen-digital.de/danke"
          />

          {/* 2. Honeypot Spam-Schutz (für Menschen unsichtbar) */}
          <input
            type="checkbox"
            name="_honeypot"
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Eingabefelder: Name & Email */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="ml-1 flex items-center gap-2 text-sm font-bold text-stone-700">
                <User size={14} /> Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Dein Name"
                className="focus:border-primary focus:ring-primary/20 w-full rounded-2xl border border-stone-200 bg-white px-5 py-3 transition outline-none focus:ring-2"
              />
            </div>

            <div className="space-y-2">
              <label className="ml-1 flex items-center gap-2 text-sm font-bold text-stone-700">
                <Mail size={14} /> E-Mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="deine@email.de"
                className="focus:border-primary focus:ring-primary/20 w-full rounded-2xl border border-stone-200 bg-white px-5 py-3 transition outline-none focus:ring-2"
              />
            </div>
          </div>

          {/* Betreff Auswahl */}
          <div className="space-y-2">
            <label className="ml-1 flex items-center gap-2 text-sm font-bold text-stone-700">
              <Hexagon size={14} /> Anliegen
            </label>
            <select
              name="subject"
              className="focus:border-primary focus:ring-primary/20 w-full appearance-none rounded-2xl border border-stone-200 bg-white px-5 py-3 transition outline-none focus:ring-2"
            >
              <option value="Allgemeine Anfrage">Allgemeine Anfrage</option>
              <option value="Bienen mieten">Bienen mieten</option>
              <option value="Honig Bestellung">Honig Bestellung</option>
              <option value="Sonstiges">Sonstiges</option>
            </select>
          </div>

          {/* Nachricht Textarea */}
          <div className="space-y-2">
            <label className="ml-1 flex items-center gap-2 text-sm font-bold text-stone-700">
              <MessageSquare size={14} /> Deine Nachricht
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Wie können wir dir helfen?"
              className="focus:border-primary focus:ring-primary/20 w-full rounded-2xl border border-stone-200 bg-white px-5 py-3 transition outline-none focus:ring-2"
            ></textarea>
          </div>

          {/* Absende-Button */}
          <div className="flex items-center justify-center">
            <Button type="submit" icon={Send}>
              Absenden
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
