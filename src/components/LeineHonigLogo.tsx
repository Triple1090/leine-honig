/**
 * Leine-Honig Logo
 *
 * Wrapper um die offiziellen Lockup-SVGs aus /public/brand/.
 *
 * Standard-Lockup ist `Leine-Honig_official.svg` — horizontale Wabe + Spectral-Wordmark
 * + "REGION HANNOVER"-Eyebrow + Gold-Unterstrich. Aspect ~3.9 : 1.
 *
 * Über `layout`/`variant` lassen sich zusätzlich die Nur-Marke- und Vertikal-Varianten wählen.
 */

import Image from "next/image";

type Size = "sm" | "md" | "lg";
type Layout = "horizontal" | "vertikal";
type Variant = "mit-Schrift" | "nur-Marke" | "official";

const OFFICIAL_HEIGHT: Record<Size, number> = { sm: 36, md: 56, lg: 88 };
const HORIZONTAL_HEIGHT: Record<Size, number> = { sm: 36, md: 48, lg: 72 };
const VERTIKAL_HEIGHT: Record<Size, number> = { sm: 56, md: 80, lg: 120 };
const MARK_SIZE: Record<Size, number> = { sm: 28, md: 40, lg: 64 };

const ASPECT = {
  official: 410.03 / 104.82,
  horizontal: 520 / 200,
  vertikal: 360 / 380,
  mark: 1,
} as const;

export interface LeineHonigLogoProps {
  size?: Size;
  layout?: Layout;
  variant?: Variant;
  className?: string;
  priority?: boolean;
}

export function LeineHonigLogo({
  size = "md",
  layout = "horizontal",
  variant = "official",
  className = "",
  priority = false,
}: LeineHonigLogoProps) {
  let file: string;
  let height: number;
  let width: number;

  if (variant === "official") {
    file = "/brand/Leine-Honig_official.svg";
    height = OFFICIAL_HEIGHT[size];
    width = Math.round(height * ASPECT.official);
  } else if (variant === "nur-Marke") {
    file = `/brand/Leine-Honig_${layout}_nur-Marke.svg`;
    height = MARK_SIZE[size];
    width = MARK_SIZE[size];
  } else if (layout === "horizontal") {
    file = `/brand/Leine-Honig_horizontal_mit-Schrift.svg`;
    height = HORIZONTAL_HEIGHT[size];
    width = Math.round(height * ASPECT.horizontal);
  } else {
    file = `/brand/Leine-Honig_vertikal_mit-Schrift.svg`;
    height = VERTIKAL_HEIGHT[size];
    width = Math.round(height * ASPECT.vertikal);
  }

  return (
    <Image
      src={file}
      alt="Leine-Honig"
      height={height}
      width={width}
      priority={priority}
      className={`select-none ${className}`}
    />
  );
}

export default LeineHonigLogo;
