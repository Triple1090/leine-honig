"use client";

import Link from "next/link";
import { Mail, MapPin, Instagram } from "lucide-react";
import BrandWordmark from "./BrandWordmark";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: "var(--lh-ink)", color: "var(--lh-cream)" }}>
      {/* Honigwabe als oberer Akzent-Streifen */}
      <div
        className="lh-honeycomb"
        style={{
          height: 80,
          ["--hc-color" as string]: "var(--lh-gold)",
          ["--hc-opacity" as string]: 0.18,
          ["--hc-size" as string]: "32px",
          maskImage: "linear-gradient(to bottom, black, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="lh-container py-16" style={{ paddingLeft: 32, paddingRight: 32 }}>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Spalte 1: Marke */}
          <div className="flex flex-col gap-5">
            <Link href="/" aria-label="Leine-Honig Startseite" className="inline-block">
              <BrandWordmark size="lg" tone="inverse" showSubtitle />
            </Link>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-14)", lineHeight: 1.6, color: "rgba(245,239,224,0.7)" }}>
              Echter Honig aus Neustadt am Rübenberge. Regional, transparent und zum Schutz unserer Natur.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors"
              style={{ border: "1px solid rgba(245,239,224,0.25)", color: "var(--lh-cream)" }}
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>

          {/* Spalte 2: Rechtliches */}
          <div>
            <p className="lh-eyebrow" style={{ color: "var(--lh-gold)" }}>Rechtliches</p>
            <ul className="mt-5 space-y-3" style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-14)" }}>
              {[
                { label: "Impressum", href: "/impressum" },
                { label: "Datenschutz", href: "/datenschutz" },
                { label: "AGB", href: "/agb" },
                { label: "Widerrufsbelehrung", href: "/widerruf" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:opacity-100"
                    style={{ color: "rgba(245,239,224,0.75)", textDecoration: "none" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Spalte 3: Kontakt */}
          <div>
            <p className="lh-eyebrow" style={{ color: "var(--lh-gold)" }}>Kontakt</p>
            <ul className="mt-5 space-y-4" style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-14)" }}>
              <li className="flex items-start gap-3" style={{ color: "rgba(245,239,224,0.75)" }}>
                <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: "var(--lh-gold)" }} />
                <span style={{ lineHeight: 1.4 }}>
                  Imkerei Leine-Honig<br />
                  31535 Neustadt, OT Luttmersen
                </span>
              </li>
              <li className="flex items-center gap-3" style={{ color: "rgba(245,239,224,0.75)" }}>
                <Mail size={16} className="shrink-0" style={{ color: "var(--lh-gold)" }} />
                <a
                  href="mailto:info@leine-honig.de"
                  className="transition-colors"
                  style={{ color: "rgba(245,239,224,0.75)", textDecoration: "none" }}
                >
                  info@leine-honig.de
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 flex flex-col items-center justify-between gap-3 border-t pt-8 md:flex-row"
          style={{ borderColor: "rgba(245,239,224,0.12)", fontFamily: "var(--font-sans)", fontSize: "var(--fs-12)", color: "rgba(245,239,224,0.45)" }}
        >
          <p>© {currentYear} Leine-Honig. Alle Rechte vorbehalten.</p>
          <p>Imkerei aus Leidenschaft · Neustadt am Rübenberge</p>
        </div>
      </div>
    </footer>
  );
}
