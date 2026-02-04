'use client';

import { Sprout, ShieldCheck, Hexagon } from "lucide-react";
import Image from "next/image";
import FAQ from "./FAQ"; // Wir importieren unsere neue FAQ

export default function RentBees() {
  return (
    <div id="bienen-mieten" className="bg-stone-50 pb-24">
      
      {/* -------------------------------------------
          1. INTRO SEKTION (Grauer Hintergrund)
         ------------------------------------------- */}
      <section className="pt-24 pb-32 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          
          <div className="order-2 md:order-1">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-sm font-bold uppercase tracking-wider mb-6 shadow-sm">
              Für Firmen & Privat
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 leading-tight mb-6">
              Dein eigenes <span className="text-primary">Bienenvolk.</span><br />
              Volle Ernte, <span className="text-stone-400">null Arbeit.</span>
            </h2>
            
            <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
              <p>
                Hast du ein Stück Wiese im Garten oder auf dem Firmengelände,
                das eigentlich mehr verdient hat als nur regelmäßiges
                Rasenmähen? Wir machen es dir leicht, zum{" "}
                <strong className="text-stone-900 font-bold">Naturschützer</strong>{" "}
                zu werden.
              </p>
              <p>
                Das Prinzip ist einfach:{" "}
                <strong className="text-stone-900">Du stellst den Platz, wir bringen das Leben.</strong>{" "}
                Wir siedeln ein professionell betreutes Bienenvolk bei dir an
                und kümmern uns um alles.
              </p>
            </div>

            <div className="flex gap-4 mt-8">
              <a
                href="mailto:info@lunsen-honig.de?subject=Beratung Bienen mieten"
                className="group bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg hover:shadow-primary/40 flex items-center gap-2"
              >
                Beratung anfragen
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="aspect-video md:aspect-square relative rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 bg-stone-200 border-4 border-white">
               <Image 
                 src="/images/juergen/bienenstand2.jpeg" 
                 alt="Unser Bienenstand im Grünen"
                 fill
                 className="object-cover"
                 sizes="(max-width: 768px) 100vw, 50vw"
               />
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------
          2. DIE GROSSE WEISSE KARTE (Vorteile + Ablauf + FAQ)
          Das hier sorgt für den "Guss"-Effekt!
         ------------------------------------------- */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-20 relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-stone-100 p-8 md:p-16">
          
          {/* TEIL A: VORTEILE */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              { icon: Sprout, title: "Naturschutz", text: "Direkter Beitrag zur Biodiversität in Lunsen & Neustadt." },
              { icon: Hexagon, title: "Dein Honig", text: "Du bekommst den Ertrag deines Volkes (ca. 20kg). Eigenes Etikett möglich." },
              { icon: ShieldCheck, title: "Null Arbeit", text: "Wir kümmern uns um Pflege, Gesundheit und Ernte. Kein Risiko." }
            ].map((card, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-stone-50 transition-colors">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4">
                  <card.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-stone-800 mb-2">{card.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>

          {/* TEIL C: FAQ (Integriert) */}
          <FAQ />

        </div>
      </div>

    </div>
  );
}