"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "lh-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try { localStorage.setItem(STORAGE_KEY, "accepted"); } catch {}
    setVisible(false);
  };

  const reject = () => {
    try { localStorage.setItem(STORAGE_KEY, "rejected"); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie-Hinweis"
      className="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-2xl rounded-2xl border border-stone-200 bg-white/95 p-5 shadow-xl backdrop-blur md:bottom-6 md:left-6 md:right-6"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <div className="flex shrink-0 items-center justify-center rounded-full bg-primary/10 p-2">
          <Cookie className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 text-sm text-stone-600">
          <p className="mb-2 font-semibold text-stone-800">Wir verwenden nur notwendige Cookies.</p>
          <p>
            Für Warenkorb und Bestellablauf setzen wir technisch notwendige Cookies. Wir nutzen
            kein Tracking, keine Analyse-Tools und keine Werbe-Cookies. Details in der{" "}
            <Link href="/datenschutz" className="text-primary underline underline-offset-2 hover:text-primary/80">
              Datenschutzerklärung
            </Link>.
          </p>
        </div>
        <div className="flex gap-2 md:flex-col">
          <button
            onClick={accept}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            Verstanden
          </button>
          <button
            onClick={reject}
            className="rounded-full border border-stone-200 px-5 py-2 text-sm text-stone-600 transition hover:border-stone-300"
          >
            Ablehnen
          </button>
        </div>
      </div>
    </div>
  );
}
