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
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-4 py-20 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 scale-150 animate-pulse rounded-full bg-green-100 blur-3xl" />
        <div className="relative rounded-full border border-stone-100 bg-white p-6 shadow-xl">
          <CheckCircle2 size={64} className="text-green-500" />
        </div>
      </div>

      <div className="mx-auto max-w-2xl">
        <Badge icon={CheckCircle2} className="mx-auto mb-6">
          Bestellung eingegangen
        </Badge>

        <h1 className="mb-4 text-4xl font-extrabold text-stone-900 md:text-6xl">
          Vielen Dank!
        </h1>

        {orderNumber && (
          <p className="mb-2 text-sm text-stone-400">
            Bestellnummer: <span className="font-mono font-bold text-stone-600">{orderNumber}</span>
          </p>
        )}

        <p className="mb-10 text-xl leading-relaxed text-stone-600">
          Deine Bestellung ist bei uns angekommen. Du erhältst in Kürze eine
          Bestätigung per E-Mail.
        </p>

        {isVorkasse && (
          <div className="mb-10 rounded-[2rem] border border-amber-200 bg-amber-50 p-8 text-left shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <Building2 size={24} className="text-amber-700" />
              <h2 className="font-heading text-xl font-bold text-amber-900">
                Bankverbindung für Vorkasse
              </h2>
            </div>
            <div className="space-y-2 font-mono text-sm text-amber-800">
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
            <p className="mt-4 text-sm text-amber-700">
              Bitte überweise den Betrag innerhalb von 7 Tagen. Der Versand erfolgt
              nach Zahlungseingang.
            </p>
          </div>
        )}

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="group bg-primary hover:bg-primary-dark flex items-center justify-center gap-2 rounded-full px-10 py-4 font-bold text-stone-900 shadow-lg transition-all"
          >
            <Home size={20} /> Zur Startseite
          </Link>
          <Link
            href="/honig"
            className="flex items-center justify-center gap-2 rounded-full bg-stone-100 px-10 py-4 font-bold text-stone-700 transition-colors hover:bg-stone-200"
          >
            Weiter einkaufen
          </Link>
        </div>
      </div>
    </div>
  );
}
