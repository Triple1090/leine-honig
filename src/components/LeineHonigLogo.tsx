/**
 * Leine-Honig Logo
 * Horizontales Kopf-Logo: Wabe + Biene links, gestapelte Wortmarke rechts.
 *
 * Verwendung:
 *   <LeineHonigLogo />                      // default, size="md"
 *   <LeineHonigLogo size="sm" />            // für kleine Headers
 *   <LeineHonigLogo showSubtitle={false} /> // ohne „Region Hannover"
 *
 * Farben werden aus CSS-Variablen gelesen (tokens.css).
 * Falls nicht vorhanden, greifen die Fallbacks.
 */

type Size = "sm" | "md" | "lg";

const SIZE_MAP: Record<Size, { hex: number; word: number; wordLetter: string; wave: number; sub: number }> = {
  sm: { hex: 32, word: 14, wordLetter: "2.5px", wave: 100, sub: 6.5 },
  md: { hex: 38, word: 17, wordLetter: "3px",   wave: 120, sub: 7.5 },
  lg: { hex: 54, word: 24, wordLetter: "4px",   wave: 170, sub: 10 },
};

export interface LeineHonigLogoProps {
  size?: Size;
  showSubtitle?: boolean;
  subtitle?: string;
  /** override falls ein Wrapper eine andere Linkfarbe erzwingt */
  className?: string;
}

export function LeineHonigLogo({
  size = "md",
  showSubtitle = true,
  subtitle = "Region Hannover",
  className = "",
}: LeineHonigLogoProps) {
  const s = SIZE_MAP[size];

  return (
    <span
      className={`inline-flex items-center gap-3 ${className}`}
      aria-label="Leine-Honig"
    >
      {/* Wabe + Biene */}
      <svg
        width={s.hex}
        height={s.hex * 1.1}
        viewBox="0 0 112 112"
        aria-hidden="true"
        className="flex-none"
      >
        <polygon
          points="56,6 99,30 99,82 56,106 13,82 13,30"
          fill="none"
          stroke="var(--color-primary, #e8b863)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <polygon
          points="56,16 90,35 90,77 56,96 22,77 22,35"
          fill="none"
          stroke="var(--color-ink-soft, #e2d8bc)"
          strokeWidth="0.6"
          opacity="0.35"
          strokeLinejoin="round"
        />
        <g transform="translate(34 34)">
          {/* Flügel */}
          <ellipse
            cx="16" cy="12" rx="9" ry="5"
            fill="none"
            stroke="var(--color-ink-soft, #e2d8bc)"
            strokeWidth="0.9"
            opacity="0.6"
            transform="rotate(-30 16 12)"
          />
          <ellipse
            cx="28" cy="12" rx="9" ry="5"
            fill="none"
            stroke="var(--color-ink-soft, #e2d8bc)"
            strokeWidth="0.9"
            opacity="0.6"
            transform="rotate(30 28 12)"
          />
          {/* Körper */}
          <ellipse
            cx="22" cy="24" rx="6.5" ry="11"
            fill="var(--color-primary, #e8b863)"
            stroke="var(--color-ink-soft, #e2d8bc)"
            strokeWidth="0.9"
          />
          <rect x="15.5" y="19" width="13" height="1.6" fill="#1a2336" />
          <rect x="15.5" y="24" width="13" height="1.6" fill="#1a2336" />
          <rect x="15.5" y="29" width="13" height="1.6" fill="#1a2336" />
          {/* Kopf + Fühler */}
          <circle cx="22" cy="14" r="3.2" fill="#1a2336" />
          <path d="M20.8 11.5 Q 19 8, 20 6" fill="none" stroke="var(--color-ink-soft, #e2d8bc)" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M23.2 11.5 Q 25 8, 24 6" fill="none" stroke="var(--color-ink-soft, #e2d8bc)" strokeWidth="0.8" strokeLinecap="round" />
          <circle cx="20" cy="6" r="0.8" fill="var(--color-ink-soft, #e2d8bc)" />
          <circle cx="24" cy="6" r="0.8" fill="var(--color-ink-soft, #e2d8bc)" />
        </g>
      </svg>

      {/* Gestapelte Textelemente */}
      <span className="flex flex-col items-start gap-[3px] leading-none">
        <span className="flex items-baseline gap-[6px] font-heading">
          <span
            style={{
              fontSize: `${s.word}px`,
              letterSpacing: s.wordLetter,
              fontWeight: 400,
              color: "var(--color-ink, #f5efde)",
            }}
          >
            LEINE
          </span>
          <span
            style={{
              fontSize: `${s.word + 1}px`,
              fontStyle: "italic",
              fontWeight: 300,
              color: "var(--color-primary, #e8b863)",
            }}
          >
            Honig
          </span>
        </span>

        <svg
          width={s.wave}
          height="6"
          viewBox="0 0 120 6"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <path
            d="M0 3 Q 24 0.5, 48 3 T 96 3 T 120 3"
            fill="none"
            stroke="var(--color-river, #8aa8c4)"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>

        {showSubtitle && (
          <span
            className="font-heading uppercase"
            style={{
              fontSize: `${s.sub}px`,
              letterSpacing: "2.5px",
              color: "var(--color-ink-mute, #b8a98a)",
            }}
          >
            {subtitle}
          </span>
        )}
      </span>
    </span>
  );
}

export default LeineHonigLogo;
