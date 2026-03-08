import Link from "next/link";
import Image from "next/image";
import { Hexagon, Home, Leaf } from "lucide-react"; // Hier nehmen wir ein Waben- und Blatt-Icon

export const metadata = {
  title: "Seite nicht gefunden (404) | Leine-Honig",
  description:
    "Ups! Diese Seite scheint der Schwarm nicht gefunden zu haben. Kehre zum Honig zurück!",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-4 py-20 text-center">
      {/* Das Bild der traurigen Biene */}
      <div className="relative mb-10 h-48 w-48 md:h-64 md:w-64">
        <Image
          src="/images/sad-bee.png" // <--- HIER DEIN BILD ABLEGEN!
          alt="Eine traurige Biene"
          fill
          className="animate-float object-contain" // Animation lässt sie leicht schweben
          priority
        />
      </div>

      <h1 className="font-heading mb-4 text-4xl font-extrabold text-stone-900 md:text-6xl">
        Seite nicht gefunden
      </h1>
      <p className="mb-8 max-w-lg text-xl leading-relaxed text-stone-600">
        Oh je, diese Seite scheint der Schwarm nicht gefunden zu haben.
        Vielleicht ist sie gerade auf Nektarsuche...
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="group bg-primary hover:bg-primary-dark hover:shadow-primary/40 flex items-center gap-2 rounded-full px-8 py-3 font-bold text-white shadow-lg transition-all"
        >
          <Home size={20} /> Zur Startseite
        </Link>
      </div>
    </div>
  );
}
