'use client';

import { HelpCircle, Plus } from 'lucide-react';

const faqData = [
  {
    question: "Muss ich mich um die Bienen kümmern?",
    answer: "Nein, überhaupt nicht. Das ist zu 100% unser Job. Wir kümmern uns um die komplette Pflege, Gesundheit, Anmeldung beim Veterinäramt und die Ernte. Du kannst das Bienenvolk einfach genießen und beobachten."
  },
  {
    question: "Sind die Bienen gefährlich?",
    answer: "Wir nutzen speziell gezüchtete, besonders sanftmütige Bienen (Carnica). Sie haben kein Interesse am Stechen und tun dies nur in absoluter Notwehr. Wenn man sie in Ruhe fliegen lässt, sind sie völlig friedliche Nachbarn."
  },
  {
    question: "Wie viel Platz brauche ich?",
    answer: "Weniger als du denkst! Eine ebene Fläche von ca. 2x2 Metern reicht aus. Wichtig ist, dass der Standort sonnig oder halbschattig und etwas windgeschützt ist."
  },
  {
    question: "Wem gehört der Honig?",
    answer: "Dir! Du erhältst den Honigertrag deiner Bienen. Wir schleudern ihn für dich, füllen ihn ab und auf Wunsch bekommst du sogar dein eigenes Etikett."
  },
  {
    question: "Was passiert im Winter?",
    answer: "Die Bienen halten Winterruhe. Wir sorgen im Herbst dafür, dass sie genug Futter haben. Je nach Absprache bleiben die Kästen bei dir stehen oder wir überwintern sie bei uns."
  },
  {
    question: "Bin ich versichert?",
    answer: "Ja. Unsere Völker sind über uns haftpflichtversichert. Sollte durch die Bienen ein Schaden entstehen, ist das abgedeckt. Auch gegen Diebstahl ist gesorgt."
  }
];

export default function FAQ() {
  return (
    <div className="max-w-4xl mx-auto" id="faq">
      
      {/* Header innerhalb der Karte */}
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-stone-900 mb-2">Noch Fragen?</h3>
        <p className="text-stone-500">Alles Wichtige auf einen Blick.</p>
      </div>

      {/* Die Fragen */}
      <div className="grid md:grid-cols-2 gap-4">
        {faqData.map((item, index) => (
          <details 
            key={index} 
            className="group bg-stone-50 rounded-2xl border border-transparent hover:border-primary/20 transition-all duration-300 open:bg-white open:shadow-md open:border-primary/10 h-fit"
          >
            <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none">
              <span className="font-bold text-stone-800 text-sm md:text-base group-hover:text-primary transition-colors pr-4">
                {item.question}
              </span>
              
              {/* Kleines Plus-Icon, das sich dreht */}
              <div className="flex-shrink-0 text-stone-400 group-open:rotate-45 group-open:text-primary transition-transform duration-300">
                <Plus size={20} />
              </div>
            </summary>
            
            <div className="px-5 pb-5 pt-0 text-stone-600 leading-relaxed text-sm">
              {item.answer}
            </div>
          </details>
        ))}
      </div>

      {/* Kontakt Link */}
      <div className="mt-10 text-center text-sm text-stone-400">
        Deine Frage war nicht dabei? <a href="mailto:info@lunsen-honig.de" className="text-primary font-bold hover:underline">Schreib uns einfach!</a>
      </div>

    </div>
  );
}