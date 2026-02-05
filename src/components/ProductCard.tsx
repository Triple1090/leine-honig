import React from "react";

// Definition der benötigten Daten (Props) für die Karte
interface ProductCardProps {
  title: string;
  price: string;
  description: string;
  imageSrc?: string; // Optional: Falls kein Bild da ist, kommt der Platzhalter
  shopifyButton: React.ReactNode; // Nimmt den Shopify-Code auf
}

// Der Platzhalter, falls kein Produktbild vorhanden ist
const HoneyJarPlaceholder = () => (
  <svg
    viewBox="0 0 64 64"
    className="fill-primary/20 h-24 w-24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M48,12H16c-2.2,0-4,1.8-4,4v4c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4v-4C52,13.8,50.2,12,48,12z M48,20H16v-4h32V20z" />
    <path d="M14,26v22c0,4.4,3.6,8,8,8h20c4.4,0,8-3.6,8-8V26H14z M42,48c0,1.1-0.9,2-2,2h-4c-1.1,0-2-0.9-2-2v-4c0-1.1,0.9-2,2-2h4 c1.1,0,2,0.9,2,2V48z" />
  </svg>
);

export default function ProductCard({
  title,
  price,
  description,
  imageSrc,
  shopifyButton,
}: ProductCardProps) {
  return (
    /* flex-col und h-full sorgen dafür, dass alle Karten einer Reihe gleich hoch sind */
    <div className="flex h-full flex-col rounded-[2.5rem] border border-stone-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      {/* 1. Bildbereich: Perfekt zentriert durch flex items-center justify-center */}
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-[2rem] bg-stone-50 p-6">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            /* max-w-full sorgt dafür, dass das Bild mittig bleibt und nicht verzerrt */
            className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <HoneyJarPlaceholder />
        )}
      </div>

      {/* 2. Textbereich: flex-grow schiebt den Button-Bereich immer nach ganz unten */}
      <div className="mt-5 flex flex-grow flex-col">
        <div className="flex items-start justify-between gap-2">
          <h5 className="text-lg leading-tight font-extrabold text-stone-900">
            {title}
          </h5>
          <span className="text-primary text-lg font-black whitespace-nowrap">
            {price}
          </span>
        </div>
        <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-stone-600">
          {description}
        </p>
      </div>

      {/* 3. Button Bereich: Fixiert am unteren Rand der Karte */}
      <div className="mt-6">
        <div className="shopify-button-container w-full">{shopifyButton}</div>
      </div>
    </div>
  );
}
