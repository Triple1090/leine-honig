import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Award } from "lucide-react";
import Badge from "@/src/components/Badge";

export const metadata = {
  title: "Über uns | Lunsen Honig",
  description:
    "Jürgen & Tjark – Die Gesichter hinter dem echten Honig aus Neustadt.",
};

export default function AboutUs() {
  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* 1. Header Text */}
      <section className="pt-32 pb-16 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="mb-6">
            {" "}
            {/* Margin macht man besser am Container, nicht im Badge selbst */}
            <Badge>Das Team</Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-stone-900 mb-6">
            Vier Hände, <span className="text-primary">eine Mission.</span>
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Wir sind Jürgen & Tjark. Imker aus Leidenschaft. Gemeinsam
            produzieren wir echten Honig ohne jegliche Zusatzstoffe.
          </p>
        </div>
      </section>

      {/* 2. DAS DUO - Große Bilder nebeneinander */}
      <section className="px-6 pb-24 bg-white rounded-b-[3rem] shadow-sm mb-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* KARTE JÜRGEN */}
          <div className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-stone-200 shadow-xl">
            {/* Bild */}
            <Image
              src="/images/juergen/juergen-bienenstand.jpeg"
              alt="Jürgen Hochegger"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay Text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
              <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                <h3 className="text-3xl font-bold mb-1">Jürgen</h3>
                <p className="text-primary font-bold text-sm uppercase tracking-wide mb-4">
                  Der Bienenflüsterer
                </p>
                <p className="text-stone-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 leading-relaxed">
                  Mit seiner jahrelangen Erfahrung und der Ruhe, die man am
                  Bienenstand braucht. Er kennt jeden Flugradius und weiß genau,
                  wann die Tracht am besten ist.
                </p>
              </div>
            </div>
          </div>

          {/* KARTE TJARK */}
          <div className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-stone-200 shadow-xl">
            {/* Platzhalter Bild für Tjark - Bitte Datei 'tjark.jpg' in public/images ablegen! */}
            <div className="absolute inset-0 bg-stone-300 flex items-center justify-center text-stone-500 font-bold z-0">
              Hier Bild: tjark.jpg
            </div>

            {/* Wenn du ein Bild hast, entferne den Kommentar unten: */}
            <Image
              src="/images/tjark/tjark.jpg"
              alt="Tjark Radewaldt"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay Text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white z-10">
              <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                <h3 className="text-3xl font-bold mb-1">Tjark</h3>
                <p className="text-primary font-bold text-sm uppercase tracking-wide mb-4">
                  Organisation & Macher
                </p>
                <p className="text-stone-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 leading-relaxed">
                  Tjark ist neu dabei und lernt stetig neue faszinierende Fakten
                  aus der Welt der Bienen. Als gelernter IT'ler kümmert er sich
                  auch um das Digitale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Gemeinsame Story Text */}
      <section className="px-6 py-12">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-100 text-center md:text-left">
          <h3 className="text-2xl font-bold text-stone-900 mb-6 text-center">
            Wie alles begann
          </h3>
          <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
            <p>
              Eigentlich wollten wir nur "ein bisschen was für die Natur tun".
              Doch aus dem ersten Bienenvolk im Garten wurde schnell eine echte
              Passion. Wir haben gelernt, gestaunt (und wurden auch mal
              gestochen), aber vor allem haben wir verstanden:
              <strong>Bienen sind der Motor unserer Natur.</strong>
            </p>
            <p>
              Heute imkern wir gemeinsam in Lunsen und Neustadt. Wir ergänzen
              uns perfekt: Jürgen hat das Auge für die Bienen, Tjark sorgt
              dafür, dass der Honig auch zu euch kommt. Unser Ziel ist nicht der
              maximale Ertrag, sondern gesunde Völker und ein Honig, der seine
              Herkunft nicht versteckt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 pt-10 border-t border-stone-100">
            <div className="text-center">
              <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
              <span className="font-bold text-stone-800 text-sm">
                Keine Tricks
              </span>
            </div>
            <div className="text-center">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
              <span className="font-bold text-stone-800 text-sm">
                100% Neustadt
              </span>
            </div>
            <div className="text-center">
              <Award className="w-8 h-8 text-primary mx-auto mb-3" />
              <span className="font-bold text-stone-800 text-sm">
                Respekt vorm Tier
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="text-center px-6 py-12">
        <h2 className="text-3xl font-bold text-stone-900 mb-4">
          Lern uns kennen!
        </h2>
        <p className="text-stone-600 mb-8 max-w-xl mx-auto">
          Komm gerne mal vorbei oder schreib uns. Wir beißen nicht – und unsere
          Bienen stechen (fast) nie.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="mailto:info@lunsen-honig.de"
            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg"
          >
            Kontakt aufnehmen
          </a>
        </div>
      </section>
    </div>
  );
}
