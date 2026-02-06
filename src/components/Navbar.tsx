"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; // <--- 1. NEU: Image importieren
import { Menu, X, ShoppingBasket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Dieser Effekt merkt, wenn du scrollst
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Links-Liste
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
          ? "bg-white/90 py-2 shadow-md backdrop-blur-md" // Etwas weniger Padding beim Scrollen
          : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* 2. LOGO BILD */}
        <Link href="/" className="group relative z-50">
          <Image
            src="/images/lunsen-honig-ohne.png" // Pfad zum Bild (public wird weggelassen)
            alt="Lunsen-Honig Logo"
            width={180} // Originalbreite (wird durch CSS skaliert)
            height={60} // Originalhöhe
            className="h-10 w-auto object-contain transition-transform hover:scale-105 md:h-12"
            priority // Lädt das Logo sofort
          />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`hover:text-primary text-sm font-semibold transition-colors ${
                scrolled ? "text-stone-600" : "text-stone-700"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Shop Button */}
          <Link
            href="/shop"
            className="bg-primary hover:bg-primary-dark flex transform items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
          >
            <ShoppingBasket size={18} />
            Zum Shop
          </Link>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 p-2 text-stone-800 focus:outline-none md:hidden"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center space-y-8 bg-white md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="hover:text-primary text-2xl font-bold text-stone-800 transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/#preise"
              onClick={() => setIsOpen(false)}
              className="bg-primary flex items-center gap-2 rounded-full px-8 py-4 text-xl font-bold text-white shadow-lg"
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
