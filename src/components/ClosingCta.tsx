import Link from "next/link";

export default function ClosingCta() {
  return (
    <section
      className="relative overflow-hidden px-6 py-28"
      style={{ background: "var(--lh-ink)", color: "var(--lh-cream)" }}
    >
      {/* Honigwabe als dezente Akzent-Fläche */}
      <div
        className="lh-honeycomb pointer-events-none absolute"
        style={{
          inset: 0,
          ["--hc-color" as string]: "var(--lh-gold)",
          ["--hc-opacity" as string]: 0.16,
          ["--hc-size" as string]: "40px",
          maskImage: "radial-gradient(ellipse at 75% 50%, black 0%, transparent 60%)",
          WebkitMaskImage: "radial-gradient(ellipse at 75% 50%, black 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="lh-container relative z-10 grid items-center gap-10 md:grid-cols-[1fr_auto]">
        <div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--lh-gold)",
            }}
          >
            Direkt vom Imker bestellen
          </p>
          <h2
            className="mt-4 max-w-2xl"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(32px, 4.5vw, 56px)",
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "var(--lh-cream)",
            }}
          >
            Ein Glas <em style={{ color: "var(--lh-gold)", fontStyle: "italic" }}>Region</em> für deinen Tisch.
          </h2>
          <p
            className="mt-5 max-w-xl"
            style={{
              fontFamily: "var(--font-heading)",
              fontStyle: "italic",
              fontSize: 18,
              lineHeight: 1.5,
              color: "rgba(245,239,224,0.78)",
            }}
          >
            Sechs Sorten, handgefüllt in Neustadt am Rübenberge — versandfertig in 1–3 Werktagen.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <Link href="/honig" className="lh-btn lh-btn--primary lh-btn--lg">
            Honig kaufen →
          </Link>
          <Link
            href="/bienen-mieten"
            className="lh-btn lh-btn--inverse lh-btn--lg"
            style={{ background: "transparent", borderColor: "rgba(245,239,224,0.35)", color: "var(--lh-cream)" }}
          >
            Bienenvermietung
          </Link>
        </div>
      </div>
    </section>
  );
}
