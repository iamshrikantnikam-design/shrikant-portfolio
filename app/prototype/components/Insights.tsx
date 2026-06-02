import Link from "next/link";
import { Anton, Oswald } from "next/font/google";

/*
  Shared bits used by /insights-daily and /insights-weekly.

  - Mode type
  - Title + Date / Mode toggle (toggle navigates between routes)
  - ChartAndPeakCard: coral hero with yellow pillars + white tick + nested
    "Peak …" card
  - InsightCard, SummaryStrip
  - Glyphs (star/clock/smile/check, sparkle, status bar)
*/

const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap" });
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export type InsightsMode = "daily" | "weekly";

export type Bar = { label: string; energy: number; tasks: number };

export type InsightCardData = {
  id: string;
  glyph: "star" | "clock" | "smile" | "check";
  title: string;
  body: string;
  tone: "dark" | "light";
};

/* ───────────────────────── header ───────────────────────── */

export function PageTitle() {
  return (
    <h1
      className={`${anton.className} text-[44px] uppercase leading-[0.95] tracking-tight`}
    >
      Your insights
    </h1>
  );
}

export function DateAndToggle({
  mode,
  dateLabel,
}: {
  mode: InsightsMode;
  dateLabel: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="inline-flex items-center gap-2 rounded-full border border-[#1A1A1A]/12 px-3 py-1.5 text-[12px] font-medium text-[#1A1A1A]/75">
        {dateLabel}
      </span>

      <div className="flex items-center rounded-full bg-[#F4F4F4] p-1 text-[11px] font-semibold uppercase tracking-[0.16em]">
        <ToggleLink href="/prototype/insights-daily" active={mode === "daily"}>
          Daily
        </ToggleLink>
        <ToggleLink href="/prototype/insights-weekly" active={mode === "weekly"}>
          Weekly
        </ToggleLink>
      </div>
    </div>
  );
}

function ToggleLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-1.5 transition ${
        active ? "bg-[#0E0E0E] text-white" : "text-[#1A1A1A]/55"
      }`}
    >
      {children}
    </Link>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#1A1A1A]/55">
      {children}
    </p>
  );
}

/* ───────────────────────── chart + peak ───────────────────────── */

export function ChartAndPeakCard({
  mode,
  bars,
  peak,
}: {
  mode: InsightsMode;
  bars: Bar[];
  peak: { headline: string; body: string };
}) {
  /*
    Coral container holds the chart and its takeaway. One yellow
    pillar per slot = energy, white horizontal tick = tasks done.
    Peak insight nests as a white card-on-coral.
  */
  const CHART_H = 110;

  return (
    <section
      className="rounded-3xl p-5"
      style={{
        background: "#FF5A4A",
        boxShadow: "0 18px 36px -16px rgba(255,90,74,0.45)",
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={`${anton.className} text-[14px] uppercase tracking-tight text-[#1A1A1A]`}
        >
          Energy vs tasks
        </span>
        <div className="flex items-center gap-3 text-[12px] font-medium text-[#1A1A1A]">
          <Legend swatch="#F5DE7B" label="Energy" />
          <Legend swatch="#FFFFFF" label="Tasks" />
        </div>
      </div>

      <div
        className="relative mt-6 flex items-end gap-2.5"
        style={{ height: CHART_H }}
      >
        {bars.map((b) => {
          const eH = (b.energy / 100) * CHART_H;
          const tY = (b.tasks / 100) * CHART_H;
          return (
            <div
              key={b.label}
              className="relative flex h-full flex-1 items-end justify-center"
            >
              <span
                className="relative w-full max-w-[28px] rounded-sm bg-[#F5DE7B]"
                style={{ height: eH }}
                aria-hidden
              >
                <span
                  className="absolute left-[-4px] right-[-4px] h-[3px] rounded-full bg-white"
                  style={{ bottom: `calc(${tY}px - 1.5px)` }}
                  aria-hidden
                />
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-2 flex gap-2.5">
        {bars.map((b) => (
          <span
            key={b.label + "-x"}
            className={`flex-1 text-center text-[10px] font-semibold uppercase tracking-[0.14em] ${
              isPeak(b, bars) ? "text-[#1A1A1A]" : "text-[#1A1A1A]/55"
            }`}
          >
            {b.label}
          </span>
        ))}
      </div>

      <p
        className={`${oswald.className} mt-3 text-[11px] font-light text-[#1A1A1A]/70`}
      >
        {mode === "weekly"
          ? "Daily averages. Higher = better."
          : "2-hour averages across today."}
      </p>

      <div className="mt-4 flex items-start gap-3 rounded-2xl bg-white p-4">
        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#FF5A4A]">
          <SparkleGlyph dark={false} />
        </span>
        <div>
          <p
            className={`${anton.className} text-[18px] uppercase leading-[1.1] tracking-tight`}
          >
            {peak.headline}
          </p>
          <p className="mt-1 text-[12px] text-[#1A1A1A]/75">{peak.body}</p>
        </div>
      </div>
    </section>
  );
}

function isPeak(b: { energy: number }, bars: { energy: number }[]): boolean {
  return b.energy === Math.max(...bars.map((x) => x.energy));
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{ background: swatch }}
        aria-hidden
      />
      {label}
    </span>
  );
}

/* ───────────────────────── insight cards ───────────────────────── */

export function InsightCard({ data }: { data: InsightCardData }) {
  const isDark = data.tone === "dark";
  return (
    <article
      className="flex items-start gap-3 rounded-2xl p-4"
      style={{
        background: isDark ? "#0E0E0E" : "#F4F4F4",
        color: isDark ? "#FFFFFF" : "#1A1A1A",
      }}
    >
      <span
        className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full"
        style={{
          background: isDark ? "rgba(255,255,255,0.08)" : "#FFFFFF",
        }}
      >
        <Glyph type={data.glyph} dark={!isDark} />
      </span>
      <div>
        <h3
          className={`${anton.className} text-[17px] uppercase leading-[1.1] tracking-tight`}
        >
          {data.title}
        </h3>
        <p
          className={`mt-1.5 text-[12px] leading-[1.5] ${
            isDark ? "text-white/65" : "text-[#1A1A1A]/65"
          }`}
        >
          {data.body}
        </p>
      </div>
    </article>
  );
}

function Glyph({
  type,
  dark,
}: {
  type: InsightCardData["glyph"];
  dark: boolean;
}) {
  const stroke = dark ? "#1A1A1A" : "#FFFFFF";
  const fill = dark ? "#1A1A1A" : "#FFFFFF";

  switch (type) {
    case "star":
      return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path
            d="M7 1.5 8.5 5l3.7.4-2.8 2.5.8 3.6L7 9.7 3.8 11.5l.8-3.6L1.8 5.4l3.7-.4L7 1.5Z"
            fill={fill}
          />
        </svg>
      );
    case "clock":
      return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <circle cx="7" cy="7" r="5.5" stroke={stroke} strokeWidth="1.3" />
          <path
            d="M7 3.8V7l2 1.2"
            stroke={stroke}
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      );
    case "smile":
      return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <circle cx="7" cy="7" r="5.5" stroke={stroke} strokeWidth="1.3" />
          <circle cx="5" cy="6" r="0.7" fill={stroke} />
          <circle cx="9" cy="6" r="0.7" fill={stroke} />
          <path
            d="M4.5 8.5c.7 1 1.6 1.5 2.5 1.5s1.8-.5 2.5-1.5"
            stroke={stroke}
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      );
    case "check":
      return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path
            d="M2.5 7.5 5.5 10.5 11.5 4"
            stroke={stroke}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

function SparkleGlyph({ dark = true }: { dark?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M7 1.5 8 6l4.5 1L8 8l-1 4.5L6 8 1.5 7 6 6Z"
        fill={dark ? "#1A1A1A" : "#FFFFFF"}
      />
    </svg>
  );
}

/* ───────────────────────── summary pill ───────────────────────── */

export function SummaryStrip() {
  return (
    <div
      className="flex items-center justify-between gap-3 rounded-full bg-[#0E0E0E] p-1.5 pl-4 text-white"
      style={{
        boxShadow:
          "0 22px 40px -14px rgba(14,14,14,0.45), 0 6px 14px -6px rgba(14,14,14,0.25)",
      }}
    >
      <div className="flex items-center gap-4">
        <Stat label="Tasks" value="18" />
        <Divider />
        <Stat label="Streak" value="7" />
        <Divider />
        <Stat label="Pts" value="340" />
      </div>
      <button
        type="button"
        className={`${anton.className} h-9 rounded-full bg-white px-4 text-[12px] uppercase tracking-[0.18em] text-[#1A1A1A]`}
      >
        Redeem
      </button>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="leading-none">
      <p className={`${anton.className} text-[18px] uppercase tracking-tight`}>
        {value}
      </p>
      <p className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.22em] text-white/55">
        {label}
      </p>
    </div>
  );
}

function Divider() {
  return <span className="h-7 w-px bg-white/15" aria-hidden />;
}

/* ───────────────────────── status bar ───────────────────────── */

export function StatusBar() {
  return (
    <div className="flex h-11 items-center justify-between px-6 pt-2 text-[15px] font-medium">
      <span>9:41</span>
      <div className="h-7 w-[110px] rounded-full bg-black" />
      <span className="flex items-center gap-1.5">
        <SignalGlyph />
        <WifiGlyph />
        <BatteryGlyph />
      </span>
    </div>
  );
}

function SignalGlyph() {
  return (
    <svg width="17" height="11" viewBox="0 0 17 11" fill="none" aria-hidden>
      <rect x="0" y="7" width="3" height="4" rx="0.5" fill="currentColor" />
      <rect x="4.5" y="5" width="3" height="6" rx="0.5" fill="currentColor" />
      <rect x="9" y="3" width="3" height="8" rx="0.5" fill="currentColor" />
      <rect
        x="13.5"
        y="0.5"
        width="3"
        height="10.5"
        rx="0.5"
        fill="currentColor"
      />
    </svg>
  );
}

function WifiGlyph() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden>
      <path
        d="M1 4.5a10 10 0 0 1 14 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M3.5 7a6.5 6.5 0 0 1 9 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="8" cy="10" r="1.3" fill="currentColor" />
    </svg>
  );
}

function BatteryGlyph() {
  return (
    <svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden>
      <rect
        x="0.5"
        y="0.5"
        width="22"
        height="11"
        rx="3"
        stroke="currentColor"
        opacity="0.5"
      />
      <rect x="2" y="2" width="16" height="8" rx="1.5" fill="currentColor" />
      <rect
        x="24"
        y="4"
        width="1.5"
        height="4"
        rx="0.75"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  );
}
