import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Award, User } from "lucide-react";
import PageHeader from "@/src/components/PageHeader";

export const metadata = {
  title: "Über uns | Leine-Honig",
  description: "Jürgen & Tjark – Die Gesichter hinter dem echten Honig aus Neustadt.",
};

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-stone-50 pb-20">

      <PageHeader
        image="/images/pexels-robertkso-17381656.jpg"
        imageAlt="Imker bei der Arbeit"
        badgeIcon={User}
        badge="Das Team"
        title={<>Vier Hände, <span className="text-white">eine Mission.</span></>}
        subtitle="Wir sind Jürgen & Tjark. Imker aus Leidenschaft. Gemeinsam produzieren wir echten Honig ohne jegliche Zusatzstoffe."
        creditName="Robertkso"
        creditUrl="https://www.pexels.com/de-de/@robertkso/"
      />

      {/* Duo – Große Bilder nebeneinander */}
      <section className="rounded-b-[3rem] bg-white px-6 pt-16 pb-24 shadow-sm">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">

          {/* Jürgen */}
          <div className="group relative aspect-[3/4] overflow-hidden rounded-3xl bg-stone-200 shadow-xl">
            <Image
              src="/images/juergen/juergen-bienenstand.jpeg"
              alt="Jürgen Hochegger"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 text-white">
              <div className="translate-y-4 transform transition-transform duration-500 group-hover:translate-y-0">
                <h3 className="mb-1 text-3xl font-bold">Jürgen</h3>
                <p className="text-primary mb-4 text-sm font-bold tracking-wide uppercase">
                  Der Bienenflüsterer
                </p>
                <p className="text-sm leading-relaxed text-stone-200 opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100">
                  Mit seiner jahrelangen Erfahrung und der Ruhe, die man am
                  Bienenstand braucht. Er kennt jeden Flugradius und weiß genau,
                  wann die Tracht am besten ist.
                </p>
              </div>
            </div>
          </div>

          {/* Tjark */}
          <div className="group relative aspect-[3/4] overflow-hidden rounded-3xl bg-stone-200 shadow-xl">
            <Image
              src="/images/tjark/tjark.jpg"
              alt="Tjark Radewaldt"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 text-white">
              <div className="translate-y-4 transform transition-transform duration-500 group-hover:translate-y-0">
                <h3 className="mb-1 text-3xl font-bold">Tjark</h3>
                <p className="text-primary mb-4 text-sm font-bold tracking-wide uppercase">
                  Organisation & Macher
                </p>
                <p className="text-sm leading-relaxed text-stone-200 opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100">
                  Tjark ist neu dabei und lernt stetig neue faszinierende Fakten
                  aus der Welt der Bienen. Als gelernter IT'ler kümmert er sich
                  auch um das Digitale.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Story */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-3xl rounded-3xl border border-stone-100 bg-white p-8 text-center shadow-sm md:p-12 md:text-left">
          <h3 className="mb-6 text-center text-2xl font-bold text-stone-900">
            Wie alles begann
          </h3>
          <div className="space-y-6 text-lg leading-relaxed text-stone-600">
            <p>
              Eigentlich wollten wir nur ein bisschen was für die Natur tun.
              Doch aus dem ersten Bienenvolk im Garten wurde schnell eine echte
              Passion.
            </p>
            <p>
              Wir haben gelernt, gestaunt (und wurden auch mal gestochen), aber
              vor allem haben wir verstanden:
            </p>
            <div className="border-primary my-8 border-l-4 py-2 pl-6">
              <span className="block text-2xl font-bold text-stone-900">
                „Bienen sind der Motor unserer Natur."
              </span>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 border-t border-stone-100 pt-10 md:grid-cols-3">
            <div className="text-center">
              <Heart className="text-primary mx-auto mb-3 h-8 w-8" />
              <span className="text-sm font-bold text-stone-800">Keine Tricks</span>
            </div>
            <div className="text-center">
              <MapPin className="text-primary mx-auto mb-3 h-8 w-8" />
              <span className="text-sm font-bold text-stone-800">100% Neustadt</span>
            </div>
            <div className="text-center">
              <Award className="text-primary mx-auto mb-3 h-8 w-8" />
              <span className="text-sm font-bold text-stone-800">Respekt vorm Tier</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-stone-900">Lern uns kennen!</h2>
        <p className="mx-auto mb-8 max-w-xl text-stone-600">
          Komm gerne mal vorbei oder schreib uns. Wir beißen nicht – und unsere
          Bienen stechen (fast) nie.
        </p>
        <Link
          href="/kontakt"
          className="group bg-primary hover:bg-primary-dark inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-stone-900 shadow-lg transition-all hover:shadow-xl"
        >
          Kontakt aufnehmen
        </Link>
      </section>

    </div>
  );
}
