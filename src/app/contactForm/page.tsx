"use client";

import { Send, User, Mail, MessageSquare, Hexagon } from "lucide-react";
import Badge from "@/src/components/Badge";

export default function ContactForm() {
  return (
    <section className="bg-white px-6 py-20" id="kontakt">
      <div className="mx-auto max-w-3xl">
        {/* Einleitung */}
        <div className="mb-12 text-center">
          <Badge icon={MessageSquare} className="mb-4">
            Kontakt
          </Badge>
          <h2 className="font-heading mb-4 text-3xl font-extrabold text-stone-900 md:text-5xl">
            Schreib dem <span className="text-primary">Schwarm</span>
          </h2>
          <p className="text-stone-600">
            Hast du Fragen zur Bienenmiete oder möchtest du Honig bestellen?
            Schreib uns einfach eine Nachricht – wir melden uns bei dir!
          </p>
        </div>

        {/* Das Formular - verweist auf dein PHP-Skript im public-Ordner */}
        <form
          action="/send-mail.php"
          method="POST"
          className="space-y-6 rounded-[2.5rem] border border-stone-100 bg-stone-50 p-8 shadow-sm md:p-12"
        >
          {/* Honeypot Spam-Schutz (für Menschen unsichtbar) */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="website_honey"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Name */}
            <div className="space-y-2">
              <label className="ml-1 flex items-center gap-2 text-sm font-bold text-stone-700">
                <User size={14} /> Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Dein Name"
                className="focus:border-primary focus:ring-primary/20 w-full rounded-2xl border border-stone-200 px-5 py-3 transition outline-none focus:ring-2"
              />
            </div>

            {/* E-Mail */}
            <div className="space-y-2">
              <label className="ml-1 flex items-center gap-2 text-sm font-bold text-stone-700">
                <Mail size={14} /> E-Mail
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="deine@email.de"
                className="focus:border-primary focus:ring-primary/20 w-full rounded-2xl border border-stone-200 px-5 py-3 transition outline-none focus:ring-2"
              />
            </div>
          </div>

          {/* Betreff (Anliegen) */}
          <div className="space-y-2">
            <label className="ml-1 flex items-center gap-2 text-sm font-bold text-stone-700">
              <Hexagon size={14} /> Anliegen
            </label>
            <select
              name="subject"
              className="focus:border-primary focus:ring-primary/20 w-full rounded-2xl border border-stone-200 bg-white px-5 py-3 transition outline-none focus:ring-2"
            >
              <option value="Allgemeine Anfrage">Allgemeine Anfrage</option>
              <option value="Bienen mieten">Bienen mieten</option>
              <option value="Honig Bestellung">Honig Bestellung</option>
              <option value="Sonstiges">Sonstiges</option>
            </select>
          </div>

          {/* Nachricht */}
          <div className="space-y-2">
            <label className="ml-1 flex items-center gap-2 text-sm font-bold text-stone-700">
              <MessageSquare size={14} /> Deine Nachricht
            </label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Wie können wir dir helfen?"
              className="focus:border-primary focus:ring-primary/20 w-full rounded-2xl border border-stone-200 px-5 py-3 transition outline-none focus:ring-2"
            ></textarea>
          </div>

          {/* Datenschutz-Zustimmung */}
          <div className="ml-1 flex items-start gap-3 text-sm text-stone-500">
            <input
              type="checkbox"
              required
              className="text-primary focus:ring-primary accent-primary mt-1 h-4 w-4 rounded border-stone-300"
            />
            <p>
              Ich akzeptiere die{" "}
              <a href="/datenschutz" className="text-primary hover:underline">
                Datenschutzerklärung
              </a>{" "}
              und willige ein, dass meine Daten zur Bearbeitung der Anfrage
              gespeichert werden.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark hover:shadow-primary/30 group flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-bold text-white shadow-lg transition-all"
          >
            <Send
              size={18}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
            Nachricht absenden
          </button>
        </form>
      </div>
    </section>
  );
}
