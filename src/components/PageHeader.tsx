import Image from "next/image";
import { type LucideIcon } from "lucide-react";
import Badge from "./Badge";

interface Props {
  image: string;
  imageAlt?: string;
  badge?: string;
  badgeIcon?: LucideIcon;
  title: React.ReactNode;
  subtitle?: string;
  overlay?: string;
  creditName?: string;
  creditUrl?: string;
}

export default function PageHeader({
  image,
  imageAlt = "",
  badge,
  badgeIcon,
  title,
  subtitle,
  overlay,
  creditName,
  creditUrl,
}: Props) {
  return (
    <section className="relative flex min-h-[44vh] items-end justify-start overflow-hidden pb-16 pt-32">
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover object-center"
        priority
        quality={90}
      />
      {/* Cream-to-Ink Overlay für editorial-warmen Look */}
      <div
        className={`absolute inset-0 ${overlay ?? ""}`.trim()}
        style={
          overlay
            ? undefined
            : {
                background:
                  "linear-gradient(180deg, rgba(20,18,16,0.05) 0%, rgba(20,18,16,0.55) 70%, rgba(20,18,16,0.85) 100%)",
              }
        }
      />
      {creditName && creditUrl && (
        <a
          href={creditUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-4 z-10 lh-meta"
          style={{ color: "rgba(245,239,224,0.55)" }}
        >
          Foto: {creditName} / Pexels
        </a>
      )}
      <div className="lh-container relative z-10">
        {badge && badgeIcon && (
          <div className="mb-5">
            <Badge icon={badgeIcon} variant="primary">
              {badge}
            </Badge>
          </div>
        )}
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 500,
            fontSize: "clamp(36px, 5vw, 60px)",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            color: "var(--lh-cream)",
            maxWidth: 760,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-4"
            style={{
              fontFamily: "var(--font-heading)",
              fontStyle: "italic",
              fontSize: "var(--fs-20)",
              lineHeight: 1.5,
              color: "rgba(245,239,224,0.85)",
              maxWidth: 580,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
