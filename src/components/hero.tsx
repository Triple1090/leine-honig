"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Badge from "./Badge";

export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
      {/* Hintergrundbild */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/hero-bg.jpg"
          alt="Honigwabe Hintergrund"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
      </div>

      {/* Overlay — warmer Bernstein-Ton statt neutralem Schwarz */}
      <div className="absolute inset-0 -z-10 bg-[#3A2E1A]/40 backdrop-blur-[2px]" />

      {/* Glas-Karte */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-4 max-w-4xl rounded-[2rem] border border-primary/20 bg-white/92 p-6 text-center shadow-2xl backdrop-blur-xl sm:rounded-[3rem] md:p-14"
      >
        {/* Badge */}
        <div className="mb-8 flex justify-center">
          <Badge icon={MapPin}>Region Hannover</Badge>
        </div>

        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <Image
            src="/logo.svg"
            alt="Leine-Honig"
            width={365}
            height={78}
            priority
            className="h-16 w-auto md:h-24"
          />
        </div>

        {/* Untertitel */}
        <p className="mb-10 font-heading text-xl font-semibold tracking-wide text-accent/60 md:text-2xl">
          Ehrlicher Honig & Bienenvermietung
        </p>

        {/* Beschreibungstext */}
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-stone-600 md:text-xl">
          Wir sind <strong className="text-accent">Jürgen und Tjark</strong>. Bei uns
          kommt der Honig ohne Umwege direkt aus der Wabe ins Glas. Und falls du
          Platz im Garten hast, bringen wir das Summen zu dir – wir kümmern uns
          um alles.
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/honig"
            className="flex transform items-center rounded-full bg-primary px-8 py-4 font-bold text-accent shadow-lg transition-all hover:scale-105 hover:bg-primary-dark hover:shadow-xl"
          >
            Honig kaufen
          </Link>
          <Link
            href="/bienen-mieten"
            className="flex transform items-center rounded-full border-2 border-accent/15 bg-white px-8 py-4 font-bold text-accent shadow-lg transition-all hover:scale-105 hover:border-primary/40 hover:shadow-xl"
          >
            Bienen mieten
          </Link>
        </div>

        <p className="mt-5 text-xs text-stone-400">
          Gläser ab 6,90 € · Versand ab 50 € kostenlos
        </p>
      </motion.div>
    </section>
  );
}
