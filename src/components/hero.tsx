"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Link from "next/link";
import LeineHonigLogo from "./LeineHonigLogo";

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-6 text-center"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Dekoratives Waben-Muster */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <polygon points="30,2 58,17 58,47 30,62 2,47 2,17" fill="none" stroke="#e8b863" strokeWidth="0.8"/>
              <polygon points="30,28 58,43 58,73 30,88 2,73 2,43" fill="none" stroke="#e8b863" strokeWidth="0.8"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex)"/>
        </svg>
      </div>

      {/* Gradient glow top */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-96 w-[600px] rounded-full blur-[120px] opacity-20"
        style={{ background: "var(--color-primary)" }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-3xl"
      >
        {/* Eyebrow Badge */}
        <div className="mb-8 flex justify-center">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-widest"
            style={{
              borderColor: "var(--color-primary)",
              color: "var(--color-primary)",
              background: "var(--color-primary-light)",
              letterSpacing: "3px",
            }}
          >
            <MapPin size={12} /> Region Hannover
          </span>
        </div>

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <LeineHonigLogo size="lg" />
        </div>

        {/* Headline */}
        <h1
          className="font-heading mb-6 text-4xl font-light leading-tight md:text-6xl"
          style={{ color: "var(--color-ink)" }}
        >
          Ehrlicher Honig &{" "}
          <span className="italic" style={{ color: "var(--color-primary)" }}>
            Bienenvermietung
          </span>
        </h1>

        {/* Subline */}
        <p
          className="mx-auto mb-10 max-w-lg text-base leading-relaxed md:text-lg"
          style={{ color: "var(--color-ink-soft)", lineHeight: "1.65" }}
        >
          Wir sind Jürgen & Tjark — zwei Imker aus Leidenschaft. Bei uns kommt der Honig ohne Umwege direkt aus der Wabe ins Glas.
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/honig"
            className="inline-flex items-center rounded-full px-8 py-4 text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ background: "var(--color-primary)", color: "var(--color-bg)", borderRadius: "999px" }}
          >
            Honig kaufen →
          </Link>
          <Link
            href="/bienen-mieten"
            className="inline-flex items-center rounded-full border px-8 py-4 text-sm font-semibold transition-all duration-200 hover:border-primary hover:text-primary active:scale-95"
            style={{
              borderColor: "var(--color-line)",
              color: "var(--color-ink-soft)",
              borderRadius: "999px",
            }}
          >
            Bienen mieten
          </Link>
        </div>

        <p className="mt-6 text-xs" style={{ color: "var(--color-ink-mute)" }}>
          Gläser ab 6,90 € · Versand ab 5,99 €
        </p>
      </motion.div>
    </section>
  );
}
