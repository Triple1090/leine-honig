"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingBasket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll-Erkennung
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Links
  const navLinks = [
    { name: "Startseite", href: "/" },
    { name: "Über uns", href: "/ueber-uns" },
    { name: "Kontakt", href: "/contactForm" },
    { name: "Unser Honig", href: "/#sorten" },
    { name: "Bienen mieten", href: "/#bienen-mieten" },
  ];

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary/95 py-3 shadow-md backdrop-blur-md" // Zustand: Gescrollt (Grüner Hintergrund)
          : "bg-transparent py-5" // Zustand: Oben (Transparenter Hintergrund)
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* --- LOGO --- */}
        <Link href="/" className="relative z-50 flex items-center gap-2">
          {/* Logo-Wechsel wäre hier möglich, aber wir nutzen einfach das Standard-Logo */}
          <Image
            src="/images/lunsen-honig.svg"
            alt="Lunsen-Honig Logo"
            width={160}
            height={50}
            className="h-10 w-auto object-contain transition-transform hover:scale-105 md:h-12"
            priority
          />
        </Link>

        {/* --- DESKTOP MENU --- */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`hover:text-accent text-sm font-bold transition-colors ${
                scrolled
                  ? "text-stone-900" // Gescrollt: Dunkler Text auf Gelb
                  : "text-stone-800" // Oben: Dunkler Text (für Lesbarkeit auf hellem Bild/Weiß)
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* CTA Button: Immer Gold, immer gut sichtbar */}
          <Link
            href="/shop"
            className="bg-accent hover:bg-accent-hover flex transform items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-xl"
          >
            <ShoppingBasket size={18} />
            <span>Zum Shop</span>
          </Link>
        </div>

        {/* --- MOBILE HAMBURGER --- */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative z-50 transition-colors focus:outline-none md:hidden ${
            isOpen ? "text-stone-900" : scrolled ? "text-stone-900" : "text-stone-800"
          }`}
          aria-label="Menü öffnen"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* --- MOBILE OVERLAY (Bleibt immer Grün) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="bg-primary fixed inset-0 z-40 flex flex-col items-center justify-center space-y-8 text-stone-900 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="hover:text-accent text-2xl font-bold text-stone-900 transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/shop"
              onClick={() => setIsOpen(false)}
              className="bg-accent mt-4 flex items-center gap-3 rounded-full px-8 py-4 text-xl font-bold text-white shadow-lg transition-transform active:scale-95"
            >
              <ShoppingBasket size={24} />
              Zum Shop
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
