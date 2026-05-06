"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  minPrice?: number;
  minShipping?: number;
}

export default function Hero({ minPrice, minShipping }: HeroProps) {
  return (
    <section
      className="relative overflow-hidden px-6 pt-28 pb-24"
      style={{ background: "var(--lh-cream)" }}
    >
      {/* Honigwabe-Pattern, dezent radial maskiert */}
      <div
        className="lh-honeycomb pointer-events-none absolute"
        style={{
          inset: 0,
          ["--hc-color" as string]: "var(--lh-gold)",
          ["--hc-opacity" as string]: 0.09,
          ["--hc-size" as string]: "48px",
          maskImage: "radial-gradient(ellipse at 88% 25%, black 0%, transparent 55%)",
          WebkitMaskImage: "radial-gradient(ellipse at 88% 25%, black 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />

      {/* Goldene Vertical Rule, links — editorial frame */}
      <div
        className="pointer-events-none absolute hidden md:block"
        style={{
          left: "max(24px, calc((100% - 1200px) / 2 + 24px))",
          top: 96,
          bottom: 80,
          width: 1,
          background: "linear-gradient(to bottom, transparent 0%, var(--lh-gold) 30%, var(--lh-gold) 70%, transparent 100%)",
          opacity: 0.3,
        }}
        aria-hidden="true"
      />

      <div className="lh-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 1] }}
          className="grid items-center gap-16 md:grid-cols-[1.2fr_1fr]"
        >
          <div className="md:pl-8">
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 500,
                fontSize: "clamp(44px, 6.5vw, 84px)",
                lineHeight: 1.02,
                letterSpacing: "-0.015em",
                color: "var(--lh-ink)",
              }}
            >
              Regionaler Honig &
              <br />
              <em
                style={{
                  color: "var(--lh-gold-deep)",
                  fontStyle: "italic",
                  fontWeight: 500,
                }}
              >
                Bienenvermietung.
              </em>
            </h1>

            <p
              className="mt-7 max-w-lg"
              style={{
                fontFamily: "var(--font-heading)",
                fontStyle: "italic",
                fontSize: "var(--fs-20)",
                lineHeight: 1.5,
                color: "var(--lh-ink-2)",
              }}
            >
              Honig direkt vom Imker kaufen oder ein Bienenvolk mieten — aus der Region Hannover, für zuhause oder dein Unternehmen.
            </p>

            <div className="lh-cluster mt-9">
              <Link href="/honig" className="lh-btn lh-btn--primary lh-btn--lg">
                Honig kaufen
                <span style={{ marginLeft: 4 }}>→</span>
              </Link>
              <Link href="/bienen-mieten" className="lh-btn lh-btn--secondary lh-btn--lg">
                Bienen mieten
              </Link>
            </div>

          </div>

          {/* Vertikales Lockup als Markensiegel mit goldenem Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.2, 0.65, 0.3, 1] }}
            className="relative hidden md:flex justify-center"
          >
            <div
              className="absolute inset-0 -z-10"
              style={{
                background: "radial-gradient(circle at center, rgba(224,168,46,0.18) 0%, transparent 65%)",
                transform: "scale(1.4)",
              }}
              aria-hidden="true"
            />
            <Image
              src="/brand/Leine-Honig_hero.svg"
              alt="Leine-Honig"
              width={305}
              height={198}
              priority
              className="h-auto w-[320px] lg:w-[400px]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
