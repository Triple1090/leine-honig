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
  overlay = "bg-black/50",
  creditName,
  creditUrl,
}: Props) {
  return (
    <section className="relative flex min-h-[40vh] items-end justify-center overflow-hidden pb-16 pt-32 text-center">
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover object-center"
        priority
        quality={90}
      />
      <div className={`absolute inset-0 ${overlay}`} />
      {creditName && creditUrl && (
        <a
          href={creditUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-4 z-10 text-xs text-white/50 transition-colors hover:text-white/80"
        >
          Foto: {creditName} / Pexels
        </a>
      )}
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        {badge && badgeIcon && (
          <div className="mb-6">
            <Badge icon={badgeIcon}>{badge}</Badge>
          </div>
        )}
        <h1 className="mb-4 text-4xl font-extrabold text-white md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto max-w-xl text-lg text-white/80">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
