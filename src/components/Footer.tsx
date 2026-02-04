"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Instagram, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-100 bg-white px-6 pt-16 pb-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Spalte 1: Logo & Mission */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="mb-6 inline-block">
              <Image
                src="/images/lunsen-honig-ohne.png"
                alt="Lunsen-Honig Logo"
                width={150}
                height={50}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed text-stone-500">
              Ehrlicher Honig aus der Region Hannover. Wir stehen für
              Transparenz, Naturschutz und echtes Handwerk aus Neustadt.
            </p>
          </div>

          {/* Spalte 2: Navigation */}
          <div>
            <h4 className="font-heading mb-6 font-bold text-stone-900">
              Navigation
            </h4>
            <ul className="space-y-4 text-sm text-stone-600">
              <li>
                <Link href="/" className="hover:text-primary transition">
                  Startseite
                </Link>
              </li>
              <li>
                <Link
                  href="/ueber-uns"
                  className="hover:text-primary transition"
                >
                  Über uns
                </Link>
              </li>
              <li>
                <Link
                  href="/#bienen-mieten"
                  className="hover:text-primary transition"
                >
                  Bienen mieten
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-primary transition">
                  Online-Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Spalte 3: Rechtliches */}
          <div>
            <h4 className="font-heading mb-6 font-bold text-stone-900">
              Rechtliches
            </h4>
            <ul className="space-y-4 text-sm text-stone-600">
              <li>
                <Link
                  href="/impressum"
                  className="hover:text-primary transition"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="hover:text-primary transition"
                >
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/agb" className="hover:text-primary transition">
                  AGB
                </Link>
              </li>
              <li>
                <Link
                  href="/widerruf"
                  className="hover:text-primary transition"
                >
                  Widerruf
                </Link>
              </li>
            </ul>
          </div>

          {/* Spalte 4: Kontakt */}
          <div>
            <h4 className="font-heading mb-6 font-bold text-stone-900">
              Kontakt
            </h4>
            <ul className="space-y-4 text-sm text-stone-600">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-primary" />
                <a
                  href="mailto:info@lunsen-honig.de"
                  className="hover:text-primary transition"
                >
                  info@lunsen-honig.de
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-primary mt-1" />
                <span>
                  31535 Neustadt <br /> OT Luttmersen
                </span>
              </li>
              <li className="flex items-center gap-3 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  className="hover:bg-primary/10 hover:text-primary flex h-8 w-8 items-center justify-center rounded-full bg-stone-50 transition"
                >
                  <Instagram size={18} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-stone-50 pt-8 text-xs text-stone-400 md:flex-row">
          <p>© {currentYear} Lunsen-Honig. Alle Rechte vorbehalten.</p>
          <p className="flex items-center gap-1">
            Mit <Heart size={12} className="fill-red-400 text-red-400" />{" "}
            gemacht in Neustadt.
          </p>
        </div>
      </div>
    </footer>
  );
}
