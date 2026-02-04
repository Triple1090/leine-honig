'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-400 py-16 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        
        {/* Spalte 1: Marke & Slogan */}
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="inline-block mb-4">
            <span className="text-2xl font-bold text-white tracking-tight">
              Lunsen<span className="text-primary font-extrabold">Honig</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed mb-6">
            Echter Honig aus der Region Neustadt. 
            Von Jürgen & Tjark mit Leidenschaft geimkert. 
            Natur pur im Glas.
          </p>
        </div>

        {/* Spalte 2: Navigation */}
        <div>
          <h4 className="text-white font-bold mb-6">Entdecken</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/" className="hover:text-primary transition">Startseite</Link></li>
            <li><Link href="/#sorten" className="hover:text-primary transition">Unsere Sorten</Link></li>
            <li><Link href="/#bienen-mieten" className="hover:text-primary transition">Bienen mieten</Link></li>
            <li><Link href="/shop" className="hover:text-primary transition">Online Shop</Link></li>
          </ul>
        </div>

        {/* Spalte 3: Kontakt */}
        <div>
          <h4 className="text-white font-bold mb-6">Kontakt</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <span>
                Jürgen Hochegger & Tjark Radewaldt<br />
                c/o Zum Schützenhaus 6<br />
                31535 Neustadt
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary flex-shrink-0" />
              <a href="tel:+4950727703730" className="hover:text-white transition">05072 7703730</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary flex-shrink-0" />
              <a href="mailto:info@lunsen-honig.de" className="hover:text-white transition">info@lunsen-honig.de</a>
            </li>
          </ul>
        </div>

        {/* Spalte 4: Rechtliches */}
        <div>
          <h4 className="text-white font-bold mb-6">Rechtliches</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/impressum" className="hover:text-white transition">Impressum</Link></li>
            <li><Link href="/datenschutz" className="hover:text-white transition">Datenschutz</Link></li>
            <li><Link href="/agb" className="hover:text-white transition">AGB</Link></li>
          </ul>
        </div>

      </div>

      {/* Copyright Leiste ganz unten */}
      <div className="max-w-6xl mx-auto px-6 mt-16 pt-8 border-t border-stone-800 text-xs text-center md:text-left flex flex-col md:flex-row justify-between items-center text-stone-500">
        <p>&copy; {currentYear} Lunsen Honig. Alle Rechte vorbehalten.</p>
        <p className="mt-2 md:mt-0">Made with 🍯 in Neustadt</p>
      </div>
    </footer>
  );
}