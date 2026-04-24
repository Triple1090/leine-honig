import Link from "next/link";
import { Heart, Home, ArrowRight, CheckCircle2 } from "lucide-react";
import Badge from "@/src/components/Badge";

export const metadata = {
  title: "Danke für deine Nachricht | Leine-Honig",
  description:
    "Wir haben deine Nachricht erhalten und melden uns bald bei dir.",
};

export default function DankePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center" style={{ background: "var(--color-bg)" }}>
      {/* Erfolgssymbol */}
      <div className="relative mb-8">
        <div className="absolute inset-0 scale-150 animate-pulse rounded-full blur-3xl" style={{ background: "var(--color-primary-light)" }}></div>
        <div className="relative rounded-full p-6 shadow-xl" style={{ background: "var(--color-bg-soft)", border: "1px solid var(--color-line)" }}>
          <CheckCircle2 size={64} style={{ color: "var(--color-primary)" }} />
        </div>
      </div>

      <div className="mx-auto max-w-2xl">
        <Badge icon={Heart} className="mx-auto mb-6">
          Nachricht erhalten
        </Badge>

        <h1 className="font-heading mb-6 text-4xl font-light md:text-6xl" style={{ color: "var(--color-ink)" }}>
          Vielen Dank für <br />
          <span className="italic" style={{ color: "var(--color-primary)" }}>dein Vertrauen!</span>
        </h1>

        <p className="mb-10 text-xl leading-relaxed" style={{ color: "var(--color-ink-mute)" }}>
          Deine Nachricht ist sicher bei uns angekommen.{" "}
          <br className="hidden md:block" />
          Wir schauen sie uns so schnell wie möglich an und melden uns bei dir
          zurück.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-full px-10 py-4 font-semibold shadow-lg transition-all hover:opacity-90 active:scale-95"
            style={{ background: "var(--color-primary)", color: "var(--color-bg)" }}
          >
            <Home size={20} /> Zur Startseite
          </Link>
        </div>
      </div>

      {/* Kleine persönliche Note am Rand */}
      <p className="mt-16 flex items-center gap-2 text-sm" style={{ color: "var(--color-ink-mute)" }}>
        Summende Grüße aus Luttmersen{" "}
        <Heart size={14} className="fill-red-400 text-red-400" />
      </p>
    </div>
  );
}
