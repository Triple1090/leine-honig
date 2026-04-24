"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/src/lib/cart";
import LeineHonigLogo from "./LeineHonigLogo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartTotal, openDrawer } = useCart();

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
    <>
    <nav
      className="fixed top-0 right-0 left-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(20, 27, 43, 0.95)"
          : "rgba(26, 35, 54, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(245,239,222,0.22)",
        padding: "14px 32px",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-50 select-none">
          <LeineHonigLogo size="md" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium tracking-wide transition-colors duration-200 hover:text-primary"
              style={{ color: "var(--color-ink-soft)", letterSpacing: "0.5px" }}
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/honig"
            className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{
              background: "var(--color-primary)",
              color: "var(--color-bg)",
              borderRadius: "999px",
              letterSpacing: "0.5px",
            }}
          >
            Jetzt bestellen
          </Link>

          <button
            onClick={openDrawer}
            className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 hover:border-primary hover:text-primary"
            style={{
              borderColor: "rgba(245,239,222,0.3)",
              color: "var(--color-ink-soft)",
            }}
            aria-label="Warenkorb öffnen"
          >
            <ShoppingCart size={15} />
            {new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(cartTotal)}
          </button>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={openDrawer}
            className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
            style={{ borderColor: "rgba(245,239,222,0.3)", color: "var(--color-ink-soft)" }}
            aria-label="Warenkorb öffnen"
          >
            <ShoppingCart size={14} />
            {new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(cartTotal)}
          </button>
          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              className="transition-colors focus:outline-none"
              style={{ color: "var(--color-ink)" }}
              aria-label="Menü öffnen"
            >
              <Menu size={28} />
            </button>
          )}
        </div>
      </div>

    </nav>

      {/* Mobile Overlay — must be outside <nav> so backdrop-filter doesn't trap fixed positioning */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center space-y-8 md:hidden"
            style={{ background: "var(--color-bg-deep)" }}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-8 transition-colors focus:outline-none"
              style={{ color: "var(--color-ink)" }}
              aria-label="Menü schließen"
            >
              <X size={28} />
            </button>
            <LeineHonigLogo size="lg" />
            <div className="mt-4 flex flex-col items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-heading transition-colors hover:text-primary"
                  style={{ color: "var(--color-ink-soft)" }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Link
              href="/honig"
              onClick={() => setIsOpen(false)}
              className="mt-4 rounded-full px-10 py-4 text-xl font-semibold transition-all active:scale-95"
              style={{ background: "var(--color-primary)", color: "var(--color-bg)" }}
            >
              Honig kaufen
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
