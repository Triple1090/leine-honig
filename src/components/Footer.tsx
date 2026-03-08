"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Instagram, Heart, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary pt-20 pb-10 text-stone-100">
      <div className="mx-auto max-w-7xl px-6">
        {/* Hauptbereich */}
        <div className="mb-16 grid grid-cols-1 gap-12 md:gap-8 lg:grid-cols-4">
          {/* Spalte 1: Marke & Mission */}
          <div className="flex flex-col items-start gap-6">
            <Link href="/" className="inline-block">
              {/* Logo weiß färben mittels CSS-Filter für dunklen Hintergrund */}
              <Image
                src="/images/lunsen-honig.svg"
                alt="Leine-Honig Logo"
                width={160}
                height={50}
                className="h-12 w-auto opacity-90 brightness-0 invert transition-opacity hover:opacity-100"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-stone-200">
              Echter Honig aus Neustadt am Rübenberge. Wir stehen für regionale
              Imkerei, Transparenz und den Schutz unserer Natur.
            </p>
          </div>

          {/* Spalte 2: Navigation */}
          <div>
            <h4 className="mb-6 text-lg font-bold tracking-wide text-white">
              Entdecken
            </h4>
            <ul className="space-y-3 text-sm text-stone-300">
              <li>
                <Link
                  href="/"
                  className="hover:text-accent flex items-center gap-2 transition-colors duration-300"
                >
                  <span>Startseite</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/ueber-uns"
                  className="hover:text-accent transition-colors duration-300"
                >
                  Über uns
                </Link>
              </li>
              <li>
                <Link
                  href="/#sorten"
                  className="hover:text-accent transition-colors duration-300"
                >
                  Unsere Honigsorten
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="hover:text-accent font-semibold text-white transition-colors duration-300"
                >
                  Zum Online-Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Spalte 3: Rechtliches */}
          <div>
            <h4 className="mb-6 text-lg font-bold tracking-wide text-white">
              Rechtliches
            </h4>
            <ul className="space-y-3 text-sm text-stone-300">
              <li>
                <Link
                  href="/impressum"
                  className="hover:text-accent transition-colors duration-300"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="hover:text-accent transition-colors duration-300"
                >
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link
                  href="/agb"
                  className="hover:text-accent transition-colors duration-300"
                >
                  AGB & Widerruf
                </Link>
              </li>
            </ul>
          </div>

          {/* Spalte 4: Kontakt & Social */}
          <div>
            <h4 className="mb-6 text-lg font-bold tracking-wide text-white">
              Kontakt
            </h4>
            <ul className="space-y-4 text-sm text-stone-300">
              <li className="group flex items-start gap-3">
                <MapPin
                  size={18}
                  className="text-accent mt-0.5 transition-colors group-hover:text-white"
                />
                <span className="leading-tight">
                  Imkerei Leine-Honig
                  <br />
                  31535 Neustadt
                  <br />
                  OT Luttmersen
                </span>
              </li>
              <li className="group flex items-center gap-3">
                <Mail
                  size={18}
                  className="text-accent transition-colors group-hover:text-white"
                />
                <a
                  href="mailto:info@leine-honig.de"
                  className="transition-colors hover:text-white"
                >
                  info@leine-honig.de
                </a>
              </li>

              {/* Social Media Icons */}
              <li className="pt-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-accent inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:text-white"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Trennlinie */}
        <div className="mb-8 border-t border-white/10" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-stone-400 md:flex-row">
          <p>© {currentYear} Leine-Honig. Alle Rechte vorbehalten.</p>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 opacity-80 transition-opacity hover:opacity-100">
              Design mit{" "}
              <Heart size={12} className="fill-red-500 text-red-500" /> für
              Bienen
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
