'use client';

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
    { name: "Unser Honig", href: "/#sorten" },
    { name: "Bienen mieten", href: "/#bienen-mieten" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-2" // Etwas weniger Padding beim Scrollen
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* 2. LOGO BILD */}
        <Link href="/" className="relative z-50 group">
          <Image 
            src="/images/lunsen-honig-ohne.png" // Pfad zum Bild (public wird weggelassen)
            alt="Lunsen Honig Logo"
            width={180} // Originalbreite (wird durch CSS skaliert)
            height={60} // Originalhöhe
            className="h-10 w-auto md:h-12 object-contain transition-transform hover:scale-105" 
            priority // Lädt das Logo sofort
          />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-semibold transition-colors hover:text-primary ${
                scrolled ? "text-stone-600" : "text-stone-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Shop Button */}
          <Link
            href="/shop"
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg font-bold text-sm transform hover:scale-105"
          >
            <ShoppingBasket size={18} />
            Zum Shop
          </Link>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-50 p-2 text-stone-800 focus:outline-none"
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
            className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-bold text-stone-800 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            <Link
              href="/shop"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg"
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