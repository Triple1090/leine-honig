import { Leaf, MapPin, FlaskConical, CalendarDays } from "lucide-react";

const signals = [
  { icon: MapPin,        label: "100 % regional",             detail: "Alle Völker rund um Neustadt am Rübenberge" },
  { icon: Leaf,          label: "Ohne Zusätze",                detail: "Direkt aus der Wabe ins Glas – nichts weiter" },
  { icon: FlaskConical,  label: "Ungefiltert & naturbelassen", detail: "Kalt geschleudert, schonend abgefüllt" },
  { icon: CalendarDays,  label: "Seit über 15 Jahren",         detail: "Imkerei aus Leidenschaft, nicht aus Pflicht" },
];

export default function TrustBar() {
  return (
    <section
      className="px-6 py-10"
      style={{
        borderTop: "1px solid var(--color-line)",
        borderBottom: "1px solid var(--color-line)",
        background: "var(--color-bg-elev)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {signals.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2 text-center">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-2xl"
                style={{ background: "var(--color-primary-light)" }}
              >
                <s.icon size={22} style={{ color: "var(--color-primary)" }} />
              </div>
              <p className="text-sm font-semibold" style={{ color: "var(--color-ink)" }}>{s.label}</p>
              <p className="text-xs leading-snug" style={{ color: "var(--color-ink-mute)" }}>{s.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
