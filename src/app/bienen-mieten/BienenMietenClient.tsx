"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Building2,
  Sprout,
  Hexagon,
  ShieldCheck,
  FileText,
  BarChart3,
  Gift,
  Megaphone,
  Users,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

type Persona = "privat" | "firma";

/* ─── Persona-Selector ──────────────────────────────────────────── */
function PersonaCard({
  icon: Icon,
  title,
  tagline,
  tags,
  active,
  onClick,
}: {
  icon: React.ElementType;
  title: string;
  tagline: string;
  tags: string[];
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative w-full rounded-[2rem] border-2 p-7 text-left transition-all duration-300 ${
        active
          ? "border-primary bg-primary/5 shadow-lg"
          : "border-stone-200 bg-white hover:border-primary/40 hover:shadow-md"
      }`}
    >
      {active && (
        <span className="absolute right-5 top-5 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
          <CheckCircle2 size={14} className="text-stone-900" />
        </span>
      )}
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${
          active ? "bg-primary text-stone-900" : "bg-stone-100 text-stone-500 group-hover:bg-primary/10 group-hover:text-primary-dark"
        }`}
      >
        <Icon size={24} />
      </div>
      <h3 className="mb-1 text-lg font-heading font-extrabold text-stone-900">{title}</h3>
      <p className="mb-4 text-sm text-stone-500">{tagline}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              active
                ? "bg-primary/15 text-stone-800"
                : "bg-stone-100 text-stone-600"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}

/* ─── Privat-Content ────────────────────────────────────────────── */
function PrivatContent() {
  const vorteile = [
    {
      icon: Sprout,
      title: "Aktiver Naturschutz",
      text: "Ein Bienenvolk bestäubt bis zu 3 Millionen Blüten täglich. Du leistest einen direkten, messbaren Beitrag zur Biodiversität in deiner Umgebung.",
    },
    {
      icon: Hexagon,
      title: "Dein eigener Honig",
      text: "Am Ende der Saison bekommst du ca. 20 kg Honig aus dem Ertrag deines Volkes — in Gläsern mit eigenem Etikett, wenn du möchtest.",
    },
    {
      icon: ShieldCheck,
      title: "Null Aufwand für dich",
      text: "Wir kümmern uns um Aufstellung, Pflege, Gesundheitskontrolle und Ernte. Du brauchst kein Vorwissen, keine Ausrüstung, keine Zeit.",
    },
  ];

  const ablauf = [
    { step: "1", text: "Kurzes Gespräch — wir schauen gemeinsam, ob dein Standort passt." },
    { step: "2", text: "Aufstellung im Frühjahr — wir bringen das Volk, richten alles ein." },
    { step: "3", text: "Saison läuft — du machst nichts, wir besuchen das Volk regelmäßig." },
    { step: "4", text: "Ernte im Spätsommer — du bekommst deinen Honig persönlich übergeben." },
  ];

  return (
    <div className="space-y-16">
      {/* Intro */}
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="space-y-5 text-lg leading-relaxed text-stone-600">
          <p>
            Hast du ein Stück Wiese im Garten, das mehr verdient als regelmäßiges
            Rasenmähen? Wir machen es dir leicht, aktiv zum{" "}
            <strong className="text-stone-900">Naturschützer</strong> zu werden —
            ohne Vorkenntnisse, ohne Aufwand.
          </p>
          <p>
            <strong className="text-stone-900">Du stellst den Platz, wir bringen das Leben.</strong>{" "}
            Ein professionell betreutes Bienenvolk bei dir zuhause — und am Ende der
            Saison steht dein eigener Honig auf dem Tisch.
          </p>
          <Link
            href="/kontakt"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-bold text-stone-900 shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl"
          >
            Anfrage stellen
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-3xl border-4 border-white shadow-2xl transition-transform duration-500 hover:rotate-0 rotate-1">
          <Image
            src="/images/juergen/bienenstand2.jpeg"
            alt="Bienenstand im Garten"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Vorteile */}
      <div>
        <h3 className="mb-8 text-2xl font-heading font-extrabold text-stone-900">
          Was du davon hast
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          {vorteile.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-stone-100 bg-stone-50 p-6 transition-all hover:border-primary/20 hover:shadow-sm"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <v.icon size={22} className="text-primary-dark" />
              </div>
              <h4 className="mb-2 font-heading font-bold text-stone-900">{v.title}</h4>
              <p className="text-sm leading-relaxed text-stone-600">{v.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ablauf */}
      <div>
        <h3 className="mb-8 text-2xl font-heading font-extrabold text-stone-900">So läuft es ab</h3>
        <div className="space-y-4">
          {ablauf.map((a) => (
            <div key={a.step} className="flex items-start gap-4 rounded-2xl border border-stone-100 bg-white p-5 shadow-sm">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-black text-stone-900">
                {a.step}
              </span>
              <p className="pt-0.5 text-sm leading-relaxed text-stone-700">{a.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Firma-Content ─────────────────────────────────────────────── */
function FirmaContent() {
  const argumente = [
    {
      icon: FileText,
      badge: "CSRD · ESRS E4",
      title: "Berichtspflicht erfüllen",
      text: "Die Corporate Sustainability Reporting Directive (EU 2022/2464) verpflichtet seit 2024 große Unternehmen zur Offenlegung von Biodiversitätsdaten — konkret nach ESRS E4 (Biodiversität und Ökosysteme). Ein Bienenvolk bei dir ist ein dokumentierbarer, messbarer Beitrag.",
      highlight: true,
    },
    {
      icon: BarChart3,
      badge: "ESG · EU-Taxonomie",
      title: "ESG-Rating verbessern",
      text: "Aktive Biodiversitätsmaßnahmen werden von externen Ratingagenturen (Sustainalytics, MSCI ESG) positiv bewertet. Die EU-Taxonomie klassifiziert Biodiversitätsschutz explizit als ökologisch nachhaltige Wirtschaftstätigkeit.",
      highlight: false,
    },
    {
      icon: Gift,
      badge: "Corporate Gifting",
      title: "Eigener Firmenhonig",
      text: "Aus dem Ertrag deines Volkes entstehen ca. 20 kg Honig pro Saison — in Gläsern mit deinem Firmenlogo und Etikett. Hochwertig, regional, authentisch. Ein Kundengeschenk mit echter Geschichte dahinter.",
      highlight: false,
    },
    {
      icon: Megaphone,
      badge: "PR & Social Media",
      title: "Kommunizierbarer Inhalt",
      text: "Ein Bienenvolk auf dem Firmengelände liefert echten Content: Lokalmedien, LinkedIn, Mitarbeiter-Newsletter. Nachhaltigkeitskommunikation, die glaubwürdig ist — weil sie real ist.",
      highlight: false,
    },
    {
      icon: Users,
      badge: "Employer Branding",
      title: "Attraktiver Arbeitgeber",
      text: "Laut Deloitte Global Millennial Survey bewerten über 60 % der Millennials und Gen Z nachhaltiges Engagement als relevantes Kriterium bei der Arbeitgeberwahl. Ein sichtbares Projekt auf dem Gelände wirkt.",
      highlight: false,
    },
  ];

  return (
    <div className="space-y-16">
      {/* Intro */}
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="space-y-5 text-lg leading-relaxed text-stone-600">
          <p>
            Biodiversität ist kein Nice-to-have mehr — sie ist{" "}
            <strong className="text-stone-900">Bestandteil regulatorischer Anforderungen</strong> und
            ein messbarer Faktor in ESG-Ratings. Mit einem Bienenvolk auf deinem Firmengelände
            setzt du ein Zeichen, das du auch belegen kannst.
          </p>
          <p>
            Wir kümmern uns um das gesamte operative Management. Du bekommst
            am Ende der Saison Honig mit deinem Etikett — und{" "}
            <strong className="text-stone-900">dokumentierbare Nachhaltigkeitsdaten</strong>{" "}
            für deinen Bericht.
          </p>
          <Link
            href="/kontakt"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-bold text-stone-900 shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl"
          >
            Unternehmensanfrage stellen
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-3xl border-4 border-white shadow-2xl transition-transform duration-500 hover:rotate-0 rotate-1">
          <Image
            src="/images/juergen/bienenstand2.jpeg"
            alt="Bienenvolk auf dem Firmengelände"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Argumente */}
      <div>
        <h3 className="mb-2 text-2xl font-heading font-extrabold text-stone-900">
          Warum es sich lohnt
        </h3>
        <p className="mb-8 text-stone-500">Faktenbasierte Argumente — keine Erfindungen.</p>
        <div className="space-y-4">
          {argumente.map((a) => (
            <div
              key={a.title}
              className={`rounded-2xl border p-6 transition-all hover:shadow-md ${
                a.highlight
                  ? "border-primary/30 bg-primary/5"
                  : "border-stone-100 bg-white"
              }`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <a.icon size={22} className="text-primary-dark" />
                </div>
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h4 className="font-heading font-bold text-stone-900">{a.title}</h4>
                    <span className="rounded-full bg-stone-900 px-2.5 py-0.5 text-xs font-medium text-white">
                      {a.badge}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-stone-600">{a.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Was wir liefern */}
      <div className="rounded-2xl border border-stone-200 bg-stone-900 p-8 text-white">
        <h3 className="mb-6 text-xl font-heading font-extrabold">Was wir für Unternehmen liefern</h3>
        <ul className="space-y-3 text-sm text-stone-300">
          {[
            "Professionell betreutes Bienenvolk (Aufstellung, Pflege, Ernte)",
            "Dokumentation für Nachhaltigkeitsbericht (Bestäubungsleistung, Saisonbericht)",
            "Ca. 20 kg Honig pro Saison in Gläsern mit deinem Firmenlogo",
            "Foto- und Videomaterial für interne und externe Kommunikation auf Anfrage",
            "Persönliche Beratung zur Standortwahl und Kommunikationsstrategie",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─── Hauptkomponente ───────────────────────────────────────────── */
export default function BienenMietenClient() {
  const [persona, setPersona] = useState<Persona | null>(null);

  return (
    <>
      {/* Persona-Auswahl */}
      <section className="px-6 pt-16 pb-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-heading font-extrabold text-stone-900">
              Für wen ist die Bienenvermietung?
            </h2>
            <p className="text-stone-500">Wähle aus, was auf dich zutrifft — der Inhalt passt sich an.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <PersonaCard
              icon={User}
              title="Ich bin Privatperson"
              tagline="Garten, Familie, Naturerlebnis"
              tags={["Eigener Honig", "Naturschutz", "Null Aufwand"]}
              active={persona === "privat"}
              onClick={() => setPersona("privat")}
            />
            <PersonaCard
              icon={Building2}
              title="Ich vertrete ein Unternehmen"
              tagline="ESG, Nachhaltigkeit, Firmenhonig"
              tags={["CSRD · ESRS E4", "ESG-Rating", "Corporate Gifting"]}
              active={persona === "firma"}
              onClick={() => setPersona("firma")}
            />
          </div>
        </div>
      </section>

      {/* Content-Bereich */}
      {persona && (
        <section className="px-6 pb-24">
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="rounded-[2.5rem] border border-stone-100 bg-white p-8 shadow-xl md:p-14">
              {persona === "privat" ? <PrivatContent /> : <FirmaContent />}
            </div>
          </div>
        </section>
      )}

      {/* Fallback wenn noch keine Auswahl */}
      {!persona && (
        <div className="pb-24 text-center text-stone-400 text-sm">
          ↑ Wähle oben aus, um die passenden Informationen zu sehen.
        </div>
      )}
    </>
  );
}
