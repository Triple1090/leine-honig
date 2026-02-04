"use client"; // Sagt Next.js: Das hier ist interaktiv!
import { motion } from "framer-motion";
import { Bug, ShoppingBasket, Handshake, MapPin } from "lucide-react";
import Link from "next/link"; // <--- WICHTIG: Import für die Buttons
import Badge from "./Badge";

export default function Hero() {
  return (
    // HIER WAR DER FEHLER: Leerzeichen zwischen ] und flex eingefügt
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[url('/images/hero-bg.jpg')] bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-brightness-90" />

      {/* Die Glas-Box mit Animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }} // Dauer etwas schneller gemacht (0.8s), 3s ist sehr lang
        className="relative z-10 max-w-4xl mx-4 p-8 md:p-12 rounded-[40px] bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl text-center"
      >
        {/* Badge */}
        <div className="mb-6">
          {" "}
          {/* Margin macht man besser am Container, nicht im Badge selbst */}
          <Badge icon={MapPin}>
            Region Hannover
          </Badge>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-4">
          Lunsen-Honig <br />
          <span className="text-primary-dark">
            Ehrlicher Honig & Bienenvermietung
          </span>
        </h1>

        {/* Der persönliche Text */}
        <p className="text-lg md:text-xl text-slate-700 mb-10 leading-relaxed max-w-2xl mx-auto">
          Willkommen bei uns! Wir sind <strong>Jürgen und Tjark</strong>, und
          bei uns kommt der Honig ohne Umwege direkt aus der Wabe ins Glas.
          Falls du Platz im Garten hast, bringen wir das Summen zu dir – wir
          kümmern uns um alles.
        </p>

        {/* Buttons (Jetzt mit Funktion!) */}
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            href="/shop"
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-primary/30"
          >
            <ShoppingBasket size={20} /> Honig kaufen
          </Link>

          <Link
            href="/#bienen-mieten"
            className="flex items-center justify-center gap-2 bg-white hover:bg-stone-50 text-stone-900 border border-stone-200 font-bold py-4 px-8 rounded-full transition-all hover:scale-105 shadow-lg"
          >
            <Handshake size={20} /> Bienen mieten
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
