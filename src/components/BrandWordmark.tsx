/**
 * Konsistenter Text-Wordmark — entspricht der Schrift im Logo-SVG
 * (Spectral Semi-Bold „Leine-Honig" + optional „REGION HANNOVER"-Subline).
 *
 * Verwende diese Komponente überall, wo „Leine-Honig" als Marke gesetzt wird,
 * damit Logo und Wordmark konsistent bleiben.
 */

interface BrandWordmarkProps {
  size?: "sm" | "md" | "lg";
  /** „inverse" = hellcremeer Text auf dunklem Hintergrund (Footer, Closing-CTA). */
  tone?: "default" | "inverse";
  showSubtitle?: boolean;
  subtitle?: string;
}

const SIZE_MAP = {
  sm: { word: 18, sub: 9 },
  md: { word: 26, sub: 11 },
  lg: { word: 36, sub: 12 },
};

export default function BrandWordmark({
  size = "md",
  tone = "default",
  showSubtitle = false,
  subtitle = "Region Hannover",
}: BrandWordmarkProps) {
  const s = SIZE_MAP[size];
  const wordColor = tone === "inverse" ? "var(--lh-cream)" : "var(--lh-ink)";
  const subColor = tone === "inverse" ? "rgba(245,239,224,0.7)" : "var(--lh-ink-3)";

  return (
    <span className="inline-flex flex-col leading-none">
      <span
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 600,
          fontSize: s.word,
          letterSpacing: "0.005em",
          color: wordColor,
        }}
      >
        Leine-Honig
      </span>
      {showSubtitle && (
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: s.sub,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: subColor,
            marginTop: 6,
          }}
        >
          {subtitle}
        </span>
      )}
    </span>
  );
}
