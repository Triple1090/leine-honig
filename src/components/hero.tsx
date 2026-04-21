"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Badge from "./Badge";
import Button from "./Button";

export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
      {/* 1. Hintergrundbild (Optimiert mit Next.js Image) */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/hero-bg.jpg"
          alt="Honigwabe Hintergrund"
          fill
          className="object-cover object-center"
          priority // Lädt das Bild sofort (wichtig für LCP)
          quality={90}
        />
      </div>

      {/* 2. Overlay (Dunkler Filter für Lesbarkeit) */}
      <div className="absolute inset-0 -z-10 bg-black/30 backdrop-blur-[2px]" />

      {/* 3. Inhalt (Glas-Box) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-4 max-w-4xl rounded-[2rem] border border-white/50 bg-white/90 p-6 text-center shadow-2xl backdrop-blur-xl sm:rounded-[3rem] md:p-14"
      >
        {/* Badge */}
        <div className="mb-8 flex justify-center">
          <Badge icon={MapPin}>Region Hannover</Badge>
        </div>

        {/* Headline */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/logo.svg"
            alt="Leine-Honig"
            width={365}
            height={78}
            priority
            className="h-16 w-auto md:h-24"
          />
        </div>
        <h1 className="mb-6 text-2xl leading-tight font-heading font-semibold tracking-tight text-stone-600 md:text-3xl">
          Ehrlicher Honig & Bienenvermietung
        </h1>

        {/* Text */}
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-stone-600 md:text-xl">
          Willkommen bei uns! Wir sind{" "}
          <strong className="text-stone-900">Jürgen und Tjark</strong>. Bei uns
          kommt der Honig ohne Umwege direkt aus der Wabe ins Glas. Und falls du
          Platz im Garten hast, bringen wir das Summen zu dir – wir kümmern uns
          um alles.
        </p>

        {/* Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/honig"
            className="flex transform items-center rounded-full bg-primary px-8 py-4 font-bold text-stone-900 shadow-lg transition-all hover:scale-105 hover:bg-primary-dark hover:shadow-xl"
          >
            Honig kaufen
          </Link>

          <Link
            href="/bienen-mieten"
            className="flex transform items-center rounded-full border-2 border-stone-900/20 bg-white px-8 py-4 font-bold text-stone-900 shadow-lg transition-all hover:scale-105 hover:bg-stone-50 hover:shadow-xl"
          >
            Bienen mieten
          </Link>
        </div>
        <p className="mt-5 text-xs text-stone-500">
          Gläser ab 6,90 € · Versand ab 50 € kostenlos
        </p>
      </motion.div>
    </section>
  );
}
