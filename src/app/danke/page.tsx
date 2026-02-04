import Link from "next/link";
import { Heart, Home, ArrowRight, CheckCircle2 } from "lucide-react";
import Badge from "@/src/components/Badge";

export const metadata = {
  title: "Danke für deine Nachricht | Lunsen Honig",
  description:
    "Wir haben deine Nachricht erhalten und melden uns bald bei dir.",
};

export default function DankePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-4 py-20 text-center">
      {/* Erfolgssymbol */}
      <div className="relative mb-8">
        <div className="bg-primary/20 absolute inset-0 scale-150 animate-pulse rounded-full blur-3xl"></div>
        <div className="relative rounded-full border border-stone-100 bg-white p-6 shadow-xl">
          <CheckCircle2 size={64} className="text-primary" />
        </div>
      </div>

      <div className="mx-auto max-w-2xl">
        <Badge icon={Heart} className="mx-auto mb-6">
          Nachricht erhalten
        </Badge>

        <h1 className="font-heading mb-6 text-4xl font-extrabold text-stone-900 md:text-6xl">
          Vielen Dank für <br />
          <span className="text-primary">dein Vertrauen!</span>
        </h1>

        <p className="mb-10 text-xl leading-relaxed text-stone-600">
          Deine Nachricht ist sicher bei uns angekommen.{" "}
          <br className="hidden md:block" />
          Wir schauen sie uns so schnell wie möglich an und melden uns bei dir
          zurück.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="group bg-primary hover:bg-primary-dark hover:shadow-primary/40 flex items-center justify-center gap-2 rounded-full px-10 py-4 font-bold text-white shadow-lg transition-all"
          >
            <Home size={20} /> Zur Startseite
          </Link>
        </div>
      </div>

      {/* Kleine persönliche Note am Rand */}
      <p className="mt-16 flex items-center gap-2 text-sm text-stone-400">
        Summende Grüße aus Luttmersen{" "}
        <Heart size={14} className="fill-red-400 text-red-400" />
      </p>
    </div>
  );
}
