"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/src/lib/cart";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount, cartTotal, openDrawer } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Startseite", href: "/" },
    { name: "Bienen mieten", href: "/bienen-mieten" },
    { name: "Über uns", href: "/ueber-uns" },
    { name: "Kontakt", href: "/kontakt" },
  ];

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#3A2E1A]/97 py-3 shadow-lg backdrop-blur-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="relative z-50 select-none">
          <Image
            src="/logo.svg"
            alt="Leine-Honig"
            width={200}
            height={54}
            priority
            className={`h-[3.6rem] w-auto transition-all duration-300 ${scrolled ? "brightness-0 invert" : ""}`}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-bold transition-colors hover:text-primary ${
                scrolled ? "text-white/90" : "text-accent"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/honig"
            className={`flex transform items-center rounded-full px-6 py-2.5 text-sm font-bold shadow-md transition-all hover:scale-105 hover:shadow-lg ${
              scrolled
                ? "bg-primary text-accent hover:bg-primary-dark"
                : "bg-accent text-white hover:bg-accent-hover"
            }`}
          >
            Honig kaufen
          </Link>

          <button
            onClick={openDrawer}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all hover:shadow-md ${
              scrolled
                ? "border-white/30 text-white/90 hover:border-primary hover:text-primary"
                : "border-accent/30 text-accent hover:border-primary hover:text-primary"
            }`}
            aria-label="Warenkorb öffnen"
          >
            <ShoppingCart size={16} />
            {new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(cartTotal)}
          </button>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={openDrawer}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${
              scrolled ? "border-white/30 text-white/90" : "border-accent/30 text-accent"
            }`}
            aria-label="Warenkorb öffnen"
          >
            <ShoppingCart size={14} />
            {new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(cartTotal)}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative z-50 transition-colors focus:outline-none ${
              isOpen ? "text-accent" : scrolled ? "text-white" : "text-accent"
            }`}
            aria-label="Menü öffnen"
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center space-y-8 bg-[#3A2E1A] md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-bold text-white/90 transition-colors hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/honig"
              onClick={() => setIsOpen(false)}
              className="mt-4 rounded-full bg-primary px-8 py-4 text-xl font-bold text-accent shadow-lg transition-transform active:scale-95"
            >
              Honig kaufen
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
