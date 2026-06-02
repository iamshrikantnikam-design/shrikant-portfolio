/* eslint-disable @next/next/no-img-element */

const LOGO = "/case-study/moodplan/logo";

const VARIANTS = [
  { src: `${LOGO}/mark.svg`, label: "mark.svg", w: 96 },
  { src: `${LOGO}/mark-mono.svg`, label: "mark-mono.svg", w: 96, themed: true },
  { src: `${LOGO}/wordmark.svg`, label: "wordmark.svg", w: 220 },
  { src: `${LOGO}/lockup-horizontal.svg`, label: "lockup-horizontal.svg", w: 280 },
  { src: `${LOGO}/lockup-stacked.svg`, label: "lockup-stacked.svg", w: 200 },
];

export default function MoodPlanLogoPage() {
  return (
    <main className="min-h-screen w-full bg-[#0A0604] py-16 text-white">
      <div className="mx-auto max-w-5xl px-6">
        <header className="mb-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/45">
            MoodPlan · Brand
          </p>
          <h1 className="mt-2 text-[28px] font-black tracking-[-0.02em]">
            Logo system
          </h1>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-white/60">
            Mark, wordmark, and lockups. SVGs live in{" "}
            <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[12px]">
              /public/case-study/moodplan/logo/
            </code>
            .
          </p>
        </header>

        {/* Dark surface */}
        <Section title="On dark" surface="#0A0604">
          {VARIANTS.map((v) => (
            <Tile key={`d-${v.label}`} {...v} colorTone="white" />
          ))}
        </Section>

        {/* Cream surface (matches MoodPlan UI) */}
        <Section title="On cream" surface="#EFE7D2">
          {VARIANTS.map((v) => (
            <Tile
              key={`c-${v.label}`}
              {...v}
              colorTone="ink"
              forceWordmarkTone="ink"
            />
          ))}
        </Section>

        {/* Color tokens */}
        <section className="mt-16 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-white/70">
            Tokens
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Token name="Ember" hex="#D8651F" />
            <Token name="Ember Bright" hex="#F08A38" />
            <Token name="Teal Light" hex="#7DE5DA" />
            <Token name="Ink" hex="#0A1714" />
          </div>
        </section>
      </div>
    </main>
  );
}

function Section({
  title,
  surface,
  children,
}: {
  title: string;
  surface: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/55">
        {title}
      </h2>
      <div
        className="grid grid-cols-2 gap-4 rounded-2xl p-6 sm:grid-cols-3 lg:grid-cols-5"
        style={{ background: surface }}
      >
        {children}
      </div>
    </section>
  );
}

function Tile({
  src,
  label,
  w,
  colorTone,
  themed,
  forceWordmarkTone,
}: {
  src: string;
  label: string;
  w: number;
  colorTone: "white" | "ink";
  themed?: boolean;
  forceWordmarkTone?: "ink";
}) {
  const isWordmarkBased =
    label.includes("wordmark") || label.includes("lockup");
  const filter =
    forceWordmarkTone === "ink" && isWordmarkBased
      ? "invert(1) hue-rotate(180deg)"
      : undefined;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="flex h-[140px] w-full items-center justify-center rounded-xl"
        style={{
          background:
            colorTone === "white" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)",
          color: colorTone === "white" ? "#fff" : "#0A1714",
        }}
      >
        {themed ? (
          <span style={{ width: w, height: w, color: "currentColor" }}>
            {/* Inline SVG so currentColor themes to surface */}
            <svg
              viewBox="0 0 64 64"
              fill="none"
              width="100%"
              height="100%"
              aria-hidden
            >
              <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
              <circle cx="32" cy="32" r="19" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
              <circle cx="32" cy="32" r="10" stroke="currentColor" strokeWidth="1.75" opacity="0.85" />
              <circle cx="32" cy="32" r="4.2" fill="currentColor" />
            </svg>
          </span>
        ) : (
          <img src={src} alt={label} style={{ width: w, filter }} />
        )}
      </div>
      <code
        className={`text-[10px] tracking-tight ${colorTone === "white" ? "text-white/55" : "text-black/55"}`}
      >
        {label}
      </code>
    </div>
  );
}

function Token({ name, hex }: { name: string; hex: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3">
      <span
        className="h-9 w-9 rounded-lg ring-1 ring-white/10"
        style={{ background: hex }}
      />
      <div className="flex flex-col">
        <span className="text-[12px] font-medium text-white/85">{name}</span>
        <code className="text-[11px] text-white/50">{hex}</code>
      </div>
    </div>
  );
}
