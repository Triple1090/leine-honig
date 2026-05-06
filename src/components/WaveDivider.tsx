/**
 * Schmaler Doppelwellen-Trenner mit Leine-Bezug.
 * Optionaler `flip` für Footer-Übergänge.
 */
interface WaveDividerProps {
  color?: string;
  background?: string;
  flip?: boolean;
}

export default function WaveDivider({
  color = "var(--lh-gold)",
  background = "var(--lh-cream)",
  flip = false,
}: WaveDividerProps) {
  return (
    <div
      aria-hidden="true"
      style={{ background, padding: "32px 0" }}
    >
      <svg
        viewBox="0 0 600 24"
        preserveAspectRatio="none"
        className="mx-auto block"
        style={{
          width: "min(560px, 70%)",
          height: 16,
          transform: flip ? "scaleY(-1)" : undefined,
        }}
      >
        <path
          d="M 0,12 Q 50,2 100,12 T 200,12 T 300,12 T 400,12 T 500,12 T 600,12"
          fill="none"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M 0,16 Q 50,6 100,16 T 200,16 T 300,16 T 400,16 T 500,16 T 600,16"
          fill="none"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.45"
        />
      </svg>
    </div>
  );
}
