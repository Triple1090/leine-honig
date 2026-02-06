"use client"; // Sagt Next.js: Das hier ist interaktiv!
import { motion } from "framer-motion";
import { Bug, ShoppingBasket, Handshake, MapPin, Laugh } from "lucide-react";
import Link from "next/link"; // <--- WICHTIG: Import für die Buttons
import Badge from "./Badge";
import Button from "./Button";

export default function Hero() {
  return (
    // HIER WAR DER FEHLER: Leerzeichen zwischen ] und flex eingefügt
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-[url('/images/hero-bg.jpg')] bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-brightness-90" />

      {/* Die Glas-Box mit Animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }} // Dauer etwas schneller gemacht (0.8s), 3s ist sehr lang
        className="relative z-10 mx-4 max-w-4xl rounded-[40px] border border-white/40 bg-white/80 p-8 text-center shadow-2xl backdrop-blur-xl md:p-12"
      >
        {/* Badge */}
        <div className="mb-6">
          {" "}
          {/* Margin macht man besser am Container, nicht im Badge selbst */}
          <Badge icon={MapPin}>Region Hannover</Badge>
        </div>

        {/* Headline */}
        <h1 className="mb-4 text-4xl leading-tight font-black text-slate-900 md:text-6xl">
          Lunsen-Honig <br />
          <span className="text-primary-dark">
            Ehrlicher Honig & Bienenvermietung
          </span>
        </h1>

        {/* Der persönliche Text */}
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-700 md:text-xl">
          Willkommen bei uns! Wir sind <strong>Jürgen und Tjark</strong>, und
          bei uns kommt der Honig ohne Umwege direkt aus der Wabe ins Glas.
          Falls du Platz im Garten hast, bringen wir das Summen zu dir – wir
          kümmern uns um alles.
        </p>

        {/* Buttons (Jetzt mit Funktion!) */}
        <div className="flex flex-col justify-center gap-4 md:flex-row">
          <Button href="/#preise" icon={ShoppingBasket} variant="primary">
            Honig Online-Shop
          </Button>

          <Button href="/#bienen-mieten" icon={Laugh} variant="secondary">
            Bienen mieten
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
