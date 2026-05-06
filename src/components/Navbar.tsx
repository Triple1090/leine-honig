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
  const { cartTotal, itemCount, openDrawer } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Startseite", href: "/" },
    { name: "Honig kaufen", href: "/honig" },
    { name: "Bienen mieten", href: "/bienen-mieten" },
    { name: "Über uns", href: "/ueber-uns" },
    { name: "Kontakt", href: "/kontakt" },
  ];

  const totalLabel = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(cartTotal);

  return (
    <>
      <nav
        className="fixed top-0 right-0 left-0 z-50 transition-colors duration-300"
        style={{
          background: scrolled ? "rgba(255, 255, 255, 0.96)" : "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--color-line)",
          padding: "10px 28px",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center" aria-label="Leine-Honig Startseite">
            <LeineHonigLogo size="md" variant="official" priority />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: "var(--lh-ink-2)", fontFamily: "var(--font-sans)" }}
              >
                {link.name}
              </Link>
            ))}

            <button
              onClick={openDrawer}
              className="lh-btn lh-btn--ghost"
              aria-label="Warenkorb öffnen"
              style={{ padding: "8px 14px" }}
            >
              <ShoppingCart size={16} />
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 500 }}>{totalLabel}</span>
              {itemCount > 0 && (
                <span
                  className="ml-1 inline-flex items-center justify-center rounded-full"
                  style={{
                    background: "var(--lh-gold)",
                    color: "var(--lh-ink)",
                    minWidth: 20,
                    height: 20,
                    padding: "0 6px",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={openDrawer}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
              style={{
                background: "var(--lh-gold)",
                color: "var(--lh-ink)",
                border: "1px solid var(--lh-gold)",
              }}
              aria-label="Warenkorb öffnen"
            >
              <ShoppingCart size={14} />
              {totalLabel}
            </button>
            {!isOpen && (
              <button
                onClick={() => setIsOpen(true)}
                className="focus:outline-none"
                style={{ color: "var(--lh-ink)" }}
                aria-label="Menü öffnen"
              >
                <Menu size={28} />
              </button>
            )}
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 md:hidden"
            style={{ background: "var(--lh-cream)" }}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-8 focus:outline-none"
              style={{ color: "var(--lh-ink)" }}
              aria-label="Menü schließen"
            >
              <X size={28} />
            </button>
            <LeineHonigLogo size="lg" variant="official" />
            <div className="mt-2 flex flex-col items-center gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl"
                  style={{ color: "var(--lh-ink)", fontFamily: "var(--font-heading)", fontWeight: 500 }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Link
              href="/honig"
              onClick={() => setIsOpen(false)}
              className="lh-btn lh-btn--primary lh-btn--lg mt-2"
            >
              Honig kaufen
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
