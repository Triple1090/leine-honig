"use client";

import Link from "next/link";
import { Mail, MapPin, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Spalte 1: Marke */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="inline-block select-none">
              <span className="font-heading text-2xl font-extrabold tracking-tight text-white">
                Leine<span className="text-amber-400">-</span>Honig
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-stone-400">
              Echter Honig aus Neustadt am Rübenberge. Regional, transparent
              und zum Schutz unserer Natur.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-700 text-stone-400 transition-all hover:border-amber-400 hover:text-amber-400"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>

          {/* Spalte 2: Navigation */}
          <div>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-widest text-stone-500">
              Entdecken
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Startseite", href: "/" },
                { label: "Honig kaufen", href: "/honig" },
                { label: "Bienen mieten", href: "/bienen-mieten" },
                { label: "Über uns", href: "/ueber-uns" },
                { label: "Kontakt", href: "/kontakt" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-stone-400 transition-colors hover:text-amber-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Spalte 3: Rechtliches */}
          <div>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-widest text-stone-500">
              Rechtliches
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Impressum", href: "/impressum" },
                { label: "Datenschutz", href: "/datenschutz" },
                { label: "AGB & Widerruf", href: "/agb" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-stone-400 transition-colors hover:text-amber-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Spalte 4: Kontakt */}
          <div>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-widest text-stone-500">
              Kontakt
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-stone-400">
                <MapPin size={16} className="mt-0.5 shrink-0 text-amber-400" />
                <span className="leading-tight">
                  Imkerei Leine-Honig
                  <br />
                  31535 Neustadt, OT Luttmersen
                </span>
              </li>
              <li className="flex items-center gap-3 text-stone-400">
                <Mail size={16} className="shrink-0 text-amber-400" />
                <a
                  href="mailto:info@leine-honig.de"
                  className="transition-colors hover:text-amber-400"
                >
                  info@leine-honig.de
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-stone-800 pt-8 flex flex-col items-center justify-between gap-3 md:flex-row">
          <p className="text-xs text-stone-600">
            © {currentYear} Leine-Honig. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs text-stone-600">
            Imkerei aus Leidenschaft · Neustadt am Rübenberge
          </p>
        </div>
      </div>
    </footer>
  );
}
