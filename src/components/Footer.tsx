"use client";

import Link from "next/link";
import { Mail, MapPin, Instagram } from "lucide-react";
import LeineHonigLogo from "./LeineHonigLogo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: "var(--color-bg-deep)", borderTop: "1px solid var(--color-line)" }}>
      <div className="mx-auto max-w-7xl px-8 py-16">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-3">

          {/* Spalte 1: Marke */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="inline-block select-none">
              <LeineHonigLogo size="md" />
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-ink-mute)" }}>
              Echter Honig aus Neustadt am Rübenberge. Regional, transparent und zum Schutz unserer Natur.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all hover:border-primary hover:text-primary"
              style={{ borderColor: "var(--color-line)", color: "var(--color-ink-mute)" }}
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>

          {/* Spalte 2: Rechtliches */}
          <div>
            <h4
              className="mb-5 text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-primary)", letterSpacing: "3px" }}
            >
              Rechtliches
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Impressum", href: "/impressum" },
                { label: "Datenschutz", href: "/datenschutz" },
                { label: "AGB", href: "/agb" },
                { label: "Widerrufsbelehrung", href: "/widerruf" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-primary"
                    style={{ color: "var(--color-ink-mute)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Spalte 3: Kontakt */}
          <div>
            <h4
              className="mb-5 text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-primary)", letterSpacing: "3px" }}
            >
              Kontakt
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3" style={{ color: "var(--color-ink-mute)" }}>
                <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                <span className="leading-tight">
                  Imkerei Leine-Honig<br />
                  31535 Neustadt, OT Luttmersen
                </span>
              </li>
              <li className="flex items-center gap-3" style={{ color: "var(--color-ink-mute)" }}>
                <Mail size={16} className="shrink-0 text-primary" />
                <a href="mailto:info@leine-honig.de" className="transition-colors hover:text-primary">
                  info@leine-honig.de
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="mt-12 flex flex-col items-center justify-between gap-3 border-t pt-8 md:flex-row"
          style={{ borderColor: "var(--color-line)" }}
        >
          <p className="text-xs" style={{ color: "rgba(245,239,222,0.25)" }}>
            © {currentYear} Leine-Honig. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs" style={{ color: "rgba(245,239,222,0.25)" }}>
            Imkerei aus Leidenschaft · Neustadt am Rübenberge
          </p>
        </div>
      </div>
    </footer>
  );
}
