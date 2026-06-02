import { Anton, Oswald } from "next/font/google";

const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap" });
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Colour system · Task Management",
  description: "Palette in use across the redesign.",
};

/*
  Colour glance. Four groups:
   1. Energy ladder — the five level fills, drives task cards, bolts,
      add-task picker, week heatmap.
   2. Surfaces — page bg, card surfaces, done state, soft tints.
   3. Dark + ink — primary dark for CTA/nav, primary text, future grey.
   4. Text opacity ramp — the standard /55, /65, /70 etc. we reach for.
*/

type Swatch = {
  name: string;
  hex: string;
  use: string;
  textOn?: "dark" | "light";
};

const ENERGY: Swatch[] = [
  { name: "Low", hex: "#B6E2DD", use: "0–15 min · Easy win · cyan bolt" },
  { name: "Light", hex: "#C9E8B5", use: "15–30 min · Light lift · mint" },
  { name: "Moderate", hex: "#FFD9D6", use: "30–45 min · Medium energy · peach" },
  { name: "High", hex: "#F5DE7B", use: "45–60 min · Focus block · yellow" },
  { name: "Maximal", hex: "#FF5A4A", use: "60–90 min · Deep focus · coral" },
];

const SURFACES: Swatch[] = [
  { name: "Page bg", hex: "#EFEFEF", use: "App shell behind the phone canvas" },
  { name: "Card / White", hex: "#FFFFFF", use: "Default card surface" },
  { name: "Done / Mute", hex: "#F4F4F4", use: "Completed task tile · status pills" },
  { name: "Soft tint", hex: "#F8F8F8", use: "Heatmap card · chart well" },
  { name: "Future grey", hex: "#D9D9D9", use: "Upcoming week bars · neutral fills" },
];

const INK: Swatch[] = [
  { name: "Primary dark", hex: "#0E0E0E", use: "CTA, sticky nav, dark cards", textOn: "light" },
  { name: "Primary text", hex: "#1A1A1A", use: "All headlines, body, glyph stroke", textOn: "light" },
  { name: "Accent · Now", hex: "#FF5A4A", use: "Now / Today markers, live state" },
];

const OPACITIES: { stop: string; opacity: number; use: string }[] = [
  { stop: "100", opacity: 1, use: "Primary text" },
  { stop: "75", opacity: 0.75, use: "Strong secondary" },
  { stop: "65", opacity: 0.65, use: "Body secondary" },
  { stop: "55", opacity: 0.55, use: "Meta captions, labels" },
  { stop: "45", opacity: 0.45, use: "Done / disabled text" },
  { stop: "25", opacity: 0.25, use: "Dashed outlines, hint" },
  { stop: "12", opacity: 0.12, use: "Hairline borders" },
  { stop: "8", opacity: 0.08, use: "Dividers between rows" },
];

export default function ColorsPage() {
  return (
    <main
      className={`${oswald.className} min-h-screen bg-[#EFEFEF] px-6 py-16 text-[#1A1A1A] md:px-12 md:py-24`}
    >
      <div className="mx-auto max-w-[1100px]">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#7C7C7C]">
          v1 · Task Management
        </p>
        <h1
          className={`${anton.className} mt-3 text-[56px] leading-[0.9] tracking-tight md:text-[88px]`}
        >
          Colour system
        </h1>
        <p className="mt-5 max-w-[560px] text-[15px] leading-[1.6] text-[#4A4A4A]">
          Everything in use across the redesign — energy ladder, surfaces,
          ink, and the text-opacity ramp we reach for again and again.
        </p>

        {/* Energy ladder */}
        <Section label="01 / Energy" title="Five-step energy ladder">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
            {ENERGY.map((s) => (
              <BigSwatch key={s.hex} swatch={s} />
            ))}
          </div>
          <p className="mt-4 text-[13px] text-[#1A1A1A]/60">
            Sits behind the bolt icons. Same fills used on task cards (home),
            duration picker (add-task), heatmap bars + day cards (week view).
          </p>
        </Section>

        {/* Surfaces */}
        <Section label="02 / Surfaces" title="Backgrounds & tints">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
            {SURFACES.map((s) => (
              <BigSwatch key={s.hex} swatch={s} />
            ))}
          </div>
        </Section>

        {/* Ink + accent */}
        <Section label="03 / Ink" title="Primary dark + accent">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {INK.map((s) => (
              <BigSwatch key={s.hex} swatch={s} />
            ))}
          </div>
        </Section>

        {/* Opacity ramp */}
        <Section label="04 / Opacity" title="Text & line ramp">
          <div className="overflow-hidden rounded-3xl bg-white">
            <table className="w-full text-left text-[14px]">
              <thead className="bg-[#F4F4F4] text-[11px] uppercase tracking-[0.18em] text-[#7C7C7C]">
                <tr>
                  <th className="px-5 py-3 font-medium">Stop</th>
                  <th className="px-5 py-3 font-medium">Sample</th>
                  <th className="px-5 py-3 font-medium">Use</th>
                </tr>
              </thead>
              <tbody>
                {OPACITIES.map((o) => (
                  <tr key={o.stop} className="border-t border-[#EFEFEF]">
                    <td className="px-5 py-4">
                      <span
                        className={`${anton.className} text-[18px] uppercase tracking-tight`}
                      >
                        /{o.stop}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {o.opacity >= 0.4 ? (
                        <span
                          className="text-[16px]"
                          style={{ color: `rgba(26,26,26,${o.opacity})` }}
                        >
                          Sample text on white
                        </span>
                      ) : (
                        <span
                          className="block h-6 w-40 rounded-full"
                          style={{
                            background: `rgba(26,26,26,${o.opacity})`,
                          }}
                          aria-hidden
                        />
                      )}
                    </td>
                    <td className="px-5 py-4 text-[#4A4A4A]">{o.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* In-context preview */}
        <Section label="05 / In-context" title="Energy ladder, in use">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
            {ENERGY.map((s) => (
              <TaskTilePreview key={s.hex} swatch={s} />
            ))}
          </div>
        </Section>

        <p className="mt-16 text-[12px] uppercase tracking-[0.2em] text-[#7C7C7C]">
          /colors · v1
        </p>
      </div>
    </main>
  );
}

function Section({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7C7C7C]">
        {label}
      </p>
      <h2
        className={`${anton.className} mt-2 text-[32px] uppercase leading-none tracking-tight md:text-[40px]`}
      >
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function BigSwatch({ swatch }: { swatch: Swatch }) {
  const onDark = swatch.textOn === "light";
  return (
    <div
      className="flex h-[180px] flex-col justify-between rounded-3xl p-5"
      style={{
        background: swatch.hex,
        color: onDark ? "#FFFFFF" : "#1A1A1A",
        boxShadow: "0 10px 22px -14px rgba(14,14,14,0.18)",
      }}
    >
      <div>
        <p
          className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${
            onDark ? "text-white/65" : "text-[#1A1A1A]/55"
          }`}
        >
          {swatch.hex}
        </p>
        <p
          className={`${anton.className} mt-1 text-[22px] uppercase leading-none tracking-tight`}
        >
          {swatch.name}
        </p>
      </div>
      <p
        className={`text-[11px] leading-[1.4] ${
          onDark ? "text-white/70" : "text-[#1A1A1A]/65"
        }`}
      >
        {swatch.use}
      </p>
    </div>
  );
}

function TaskTilePreview({ swatch }: { swatch: Swatch }) {
  return (
    <div
      className="flex flex-col gap-3 rounded-2xl p-4"
      style={{
        background: swatch.hex,
        boxShadow: "0 10px 22px -14px rgba(14,14,14,0.18)",
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className={`${anton.className} text-[16px] uppercase tracking-tight`}
        >
          {swatch.name === "Maximal" ? "60–90 MIN" : sampleRange(swatch.name)}
        </span>
        <Bolt />
      </div>
      <p
        className={`${anton.className} text-[14px] uppercase leading-tight tracking-tight`}
      >
        Sample task
      </p>
    </div>
  );
}

function sampleRange(level: string) {
  switch (level) {
    case "Low":
      return "0–15 MIN";
    case "Light":
      return "15–30 MIN";
    case "Moderate":
      return "30–45 MIN";
    case "High":
      return "45–60 MIN";
    default:
      return "60–90 MIN";
  }
}

function Bolt() {
  return (
    <svg width="18" height="18" viewBox="0 0 36 36" fill="none" aria-hidden>
      <path
        d="M20.5 4 L9.5 21 H16 L14 32 L26.5 15 H20 L20.5 4 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}
