import React from "react";

// 1. Type-Definition für die neuen Daten (DRY & Type Safe)
type HoneyPrice = {
  sorte: string;
  price500: string;
  price250: string;
};

// 2. Die Daten aus deinem Bild
// Zentral an einem Ort gepflegt.
const CURRENT_PRICES: HoneyPrice[] = [
  { sorte: "Raps", price500: "7 €", price250: "4 €" },
  { sorte: "Blüten", price500: "7 €", price250: "4 €" },
  { sorte: "Sommertracht", price500: "7 €", price250: "4 €" },
  { sorte: "Heidelbeere", price500: "8 €", price250: "4 €" },
  { sorte: "Wald", price500: "8 €", price250: "4 €" },
];

export default function PriceList() {
  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-stone-200 bg-white p-8 shadow-sm md:p-10">
      <div className="mb-8 text-center">
        <h3 className="font-heading text-2xl font-bold text-stone-900">
          Unsere Honig-Preise
        </h3>
        <p className="mt-2 text-sm text-stone-500">
          Direkt vom Imker • Saison 2026
        </p>
      </div>

      {/* 3. Tabelle für bessere Vergleichbarkeit */}
      <div className="w-full">
        {/* Tabellenkopf */}
        <div className="border-primary/20 mb-4 grid grid-cols-3 border-b-2 pb-2 text-lg font-bold text-stone-900">
          <div className="text-left">Sorte</div>
          <div className="text-right">500g</div>
          <div className="text-right">250g</div>
        </div>

        {/* Tabelleninhalt (Generiert durch .map) */}
        <ul className="space-y-3">
          {CURRENT_PRICES.map((item, index) => (
            <li
              key={index}
              className="grid grid-cols-3 items-center border-b border-stone-100 pb-3 last:border-0"
            >
              {/* Spalte 1: Name */}
              <div className="font-medium text-stone-800">{item.sorte}</div>

              {/* Spalte 2: 500g Preis */}
              <div className="text-primary text-right font-bold">
                {item.price500}
              </div>

              {/* Spalte 3: 250g Preis */}
              <div className="text-right font-bold text-stone-600">
                {item.price250}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer / Pfand-Hinweis */}
      <div className="mt-8 rounded-xl bg-stone-50 p-4 text-center">
        <p className="text-sm text-stone-600">
          ♻️ Wir nehmen unsere Gläser gerne zurück!
        </p>
      </div>
    </div>
  );
}
