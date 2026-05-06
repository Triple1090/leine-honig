import React from "react";

interface ProductCardProps {
  title: string;
  price: string;
  description: string;
  imageSrc?: string;
  shopifyButton: React.ReactNode;
  eyebrow?: string;
}

const HoneyJarPlaceholder = () => (
  <svg viewBox="0 0 64 64" className="h-24 w-24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M48,12H16c-2.2,0-4,1.8-4,4v4c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4v-4C52,13.8,50.2,12,48,12z M48,20H16v-4h32V20z"
      fill="var(--lh-gold)"
      fillOpacity="0.55"
    />
    <path
      d="M14,26v22c0,4.4,3.6,8,8,8h20c4.4,0,8-3.6,8-8V26H14z M42,48c0,1.1-0.9,2-2,2h-4c-1.1,0-2-0.9-2-2v-4c0-1.1,0.9-2,2-2h4 c1.1,0,2,0.9,2,2V48z"
      fill="var(--lh-gold)"
      fillOpacity="0.45"
    />
  </svg>
);

export default function ProductCard({
  title,
  price,
  description,
  imageSrc,
  shopifyButton,
  eyebrow,
}: ProductCardProps) {
  return (
    <div className="lh-card lh-card--hoverable flex h-full flex-col" style={{ padding: 16 }}>
      <div
        className="flex aspect-[4/3] items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #F5E6A8 0%, #C9A642 100%)",
          borderRadius: 10,
        }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <HoneyJarPlaceholder />
        )}
      </div>

      <div className="mt-5 flex flex-grow flex-col">
        {eyebrow && <p className="lh-eyebrow">{eyebrow}</p>}
        <div className="mt-2 flex items-start justify-between gap-3">
          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--fs-24)",
              fontWeight: 500,
              lineHeight: 1.2,
              color: "var(--lh-ink)",
            }}
          >
            {title}
          </h3>
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--fs-24)",
              fontWeight: 500,
              color: "var(--lh-gold-deep)",
              whiteSpace: "nowrap",
            }}
          >
            {price}
          </span>
        </div>
        <p
          className="mt-2 line-clamp-3"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--fs-14)",
            lineHeight: 1.55,
            color: "var(--lh-ink-3)",
          }}
        >
          {description}
        </p>
      </div>

      <div className="mt-6">{shopifyButton}</div>
    </div>
  );
}
