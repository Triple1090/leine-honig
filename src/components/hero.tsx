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
        className="relative z-10 mx-4 max-w-4xl rounded-[3rem] border border-white/50 bg-white/90 p-8 text-center shadow-2xl backdrop-blur-xl md:p-14"
      >
        {/* Badge */}
        <div className="mb-8 flex justify-center">
          <Badge icon={MapPin}>Region Hannover</Badge>
        </div>

        {/* Headline */}
        <h1 className="mb-6 text-4xl leading-tight font-extrabold tracking-tight text-stone-900 md:text-6xl">
          Leine-Honig <br />
          <span className="text-primary mt-2 block text-3xl md:text-5xl">
            Ehrlicher Honig & Bienenvermietung
          </span>
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
            className="bg-accent hover:bg-accent-hover flex transform items-center rounded-full px-8 py-4 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
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
      </motion.div>
    </section>
  );
}
