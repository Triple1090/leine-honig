import Link from "next/link";
import { CheckCircle2, Home, Building2, CreditCard } from "lucide-react";
import Badge from "@/src/components/Badge";

interface Props {
  searchParams: Promise<{ order?: string; vorkasse?: string }>;
}

export const metadata = {
  title: "Bestellung bestätigt | Leine-Honig",
};

function formatOrderNumber(displayId: string): string {
  return `LH-${String(displayId).padStart(4, "0")}`;
}

export default async function BestaetigungPage({ searchParams }: Props) {
  const { order, vorkasse } = await searchParams;
  const isVorkasse = vorkasse === "true";
  const orderNumber = order ? formatOrderNumber(order) : null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center" style={{ background: "var(--color-bg)" }}>
      <div className="relative mb-8">
        <div className="absolute inset-0 scale-150 animate-pulse rounded-full blur-3xl" style={{ background: "var(--color-primary-light)" }} />
        <div className="relative rounded-full p-6 shadow-xl" style={{ background: "var(--color-bg-soft)", border: "1px solid var(--color-line)" }}>
          <CheckCircle2 size={64} className="text-green-400" />
        </div>
      </div>

      <div className="mx-auto max-w-2xl">
        <Badge icon={CheckCircle2} className="mx-auto mb-6">
          Bestellung eingegangen
        </Badge>

        <h1 className="mb-4 font-heading text-4xl font-light md:text-6xl" style={{ color: "var(--color-ink)" }}>
          Vielen Dank!
        </h1>

        {orderNumber && (
          <p className="mb-2 text-sm" style={{ color: "var(--color-ink-mute)" }}>
            Bestellnummer: <span className="font-mono font-semibold" style={{ color: "var(--color-ink)" }}>{orderNumber}</span>
          </p>
        )}

        <p className="mb-10 text-xl leading-relaxed" style={{ color: "var(--color-ink-mute)" }}>
          Deine Bestellung ist bei uns angekommen. Du erhältst in Kürze eine
          Bestätigung per E-Mail.
        </p>

        {isVorkasse && (
          <div className="mb-10 rounded-[2rem] p-8 text-left" style={{ background: "var(--color-primary-light)", border: "1px solid var(--color-primary)" }}>
            <div className="mb-4 flex items-center gap-3">
              <Building2 size={24} style={{ color: "var(--color-primary)" }} />
              <h2 className="font-heading text-xl font-light" style={{ color: "var(--color-ink)" }}>
                Bankverbindung für Vorkasse
              </h2>
            </div>
            <div className="space-y-2 font-mono text-sm" style={{ color: "var(--color-ink-soft)" }}>
              <p>
                <span className="font-bold">Empfänger:</span> Leine-Honig / Tjark Radewaldt
              </p>
              <p>
                <span className="font-bold">IBAN:</span> DE00 0000 0000 0000 0000 00
              </p>
              <p>
                <span className="font-bold">BIC:</span> BELADEBEXXX
              </p>
              <p>
                <span className="font-bold">Verwendungszweck:</span>{" "}
                {orderNumber ?? "Deine Bestellnummer"}
              </p>
            </div>
            <p className="mt-4 text-sm" style={{ color: "var(--color-ink-mute)" }}>
              Bitte überweise den Betrag innerhalb von 7 Tagen. Der Versand erfolgt
              nach Zahlungseingang.
            </p>
          </div>
        )}

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-full px-10 py-4 font-semibold shadow-lg transition-all hover:opacity-90 active:scale-95"
            style={{ background: "var(--color-primary)", color: "var(--lh-ink)" }}
          >
            <Home size={20} /> Zur Startseite
          </Link>
          <Link
            href="/honig"
            className="flex items-center justify-center gap-2 rounded-full px-10 py-4 font-medium transition-colors"
            style={{ background: "var(--color-bg-soft)", color: "var(--color-ink-mute)", border: "1px solid var(--color-line)" }}
          >
            Weiter einkaufen
          </Link>
        </div>
      </div>
    </div>
  );
}
