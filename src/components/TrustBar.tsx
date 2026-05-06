const signals = [
  { num: "01", label: "100 % regional",             detail: "Alle Völker rund um Neustadt am Rübenberge." },
  { num: "02", label: "Ohne Zusätze",                detail: "Direkt aus der Wabe ins Glas — nichts weiter." },
  { num: "03", label: "Ungefiltert",                 detail: "Kalt geschleudert, schonend abgefüllt." },
  { num: "04", label: "Seit über 15 Jahren",         detail: "Imkerei aus Leidenschaft, nicht aus Pflicht." },
];

export default function TrustBar() {
  return (
    <section
      className="px-6 py-14"
      style={{
        background: "var(--lh-cream)",
        borderTop: "1px solid var(--color-line)",
        borderBottom: "1px solid var(--color-line)",
      }}
    >
      <div className="lh-container">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
          {signals.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col gap-2 md:px-5 ${i > 0 ? "md:border-l" : ""}`}
              style={i > 0 ? { borderLeftColor: "var(--color-line)" } : undefined}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  color: "var(--lh-gold-deep)",
                }}
              >
                {s.num}
              </span>
              <p
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 22,
                  fontWeight: 500,
                  lineHeight: 1.2,
                  color: "var(--lh-ink)",
                }}
              >
                {s.label}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: "var(--lh-ink-3)",
                }}
              >
                {s.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
