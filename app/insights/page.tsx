"use client";

import { useState } from "react";
import { Anton, Oswald } from "next/font/google";

const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap" });
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

/*
  Insights screen.

  Daily / Weekly toggle. Looks back at what happened, not what's
  coming. Content adapted from the v1 reference deck:

    - paired Energy vs. Tasks bar chart (7 days / 24 hrs)
    - "Peak days / Peak window" headline insight
    - "What MoodPlan noticed" — a list of pattern cards
    - bottom summary strip with the streak + redeem CTA
*/

type Mode = "daily" | "weekly";

/* ───────────── data ───────────── */

const WEEK_BARS = [
  { label: "Thu", energy: 38, tasks: 30 },
  { label: "Fri", energy: 30, tasks: 35 },
  { label: "Sat", energy: 18, tasks: 22 },
  { label: "Sun", energy: 16, tasks: 18 },
  { label: "Mon", energy: 86, tasks: 72 },
  { label: "Tue", energy: 92, tasks: 80 },
  { label: "Wed", energy: 70, tasks: 65 },
];

const DAY_BARS = [
  { label: "6a", energy: 20, tasks: 0 },
  { label: "8a", energy: 55, tasks: 30 },
  { label: "10a", energy: 88, tasks: 70 },
  { label: "12p", energy: 72, tasks: 55 },
  { label: "2p", energy: 32, tasks: 18 },
  { label: "4p", energy: 50, tasks: 40 },
  { label: "6p", energy: 38, tasks: 30 },
  { label: "8p", energy: 22, tasks: 12 },
];

type InsightCardData = {
  id: string;
  glyph: "star" | "clock" | "smile" | "check";
  title: string;
  body: string;
  tone: "dark" | "light";
};

const WEEKLY_INSIGHTS: InsightCardData[] = [
  {
    id: "deep",
    glyph: "star",
    title: "You do your best deep work before noon",
    body: "83% of completed deep-focus tasks happened before 12pm. MoodPlan will keep protecting your mornings.",
    tone: "dark",
  },
  {
    id: "crash",
    glyph: "clock",
    title: "You crash between 1–3pm every day",
    body: "Energy drops 40% after lunch. MoodPlan now blocks this window for breaks or easy wins only.",
    tone: "dark",
  },
  {
    id: "weekend",
    glyph: "smile",
    title: "Weekends are your rest zone",
    body: "Your energy is consistently low on Sat & Sun. MoodPlan avoids scheduling anything heavy on weekends unless you ask.",
    tone: "light",
  },
  {
    id: "match",
    glyph: "check",
    title: "Tasks matched to energy = 2× completion",
    body: "This week you completed 78% of mood-matched tasks vs 34% the week before MoodPlan.",
    tone: "light",
  },
];

const DAILY_INSIGHTS: InsightCardData[] = [
  {
    id: "today-morning",
    glyph: "star",
    title: "Today's deep block landed at 10am",
    body: "You hit 88% energy in the 10–12 window — your highest peak today. MoodPlan placed your hardest task here.",
    tone: "dark",
  },
  {
    id: "today-dip",
    glyph: "clock",
    title: "Energy dipped at 2pm",
    body: "Down to 32% right after lunch. MoodPlan rerouted the wireframe review out of this window.",
    tone: "dark",
  },
  {
    id: "today-recover",
    glyph: "smile",
    title: "You recovered by 4pm",
    body: "A 10-minute walk and email triage pulled energy back to 50% for the afternoon block.",
    tone: "light",
  },
  {
    id: "today-match",
    glyph: "check",
    title: "4/5 today's tasks matched their window",
    body: "Only one task ran outside its predicted energy band. Completion: 80%.",
    tone: "light",
  },
];

/* ───────────── page ───────────── */

export default function InsightsPage() {
  const [mode, setMode] = useState<Mode>("weekly");
  const data = mode === "weekly" ? WEEK_BARS : DAY_BARS;
  const insights = mode === "weekly" ? WEEKLY_INSIGHTS : DAILY_INSIGHTS;

  return (
    <main
      className={`${oswald.className} min-h-screen bg-[#EFEFEF] text-[#1A1A1A]`}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-white pb-10">
        <StatusBar />

        <div className="flex flex-col gap-5 px-5 pt-4">
          <Header mode={mode} />
          <DateAndToggle mode={mode} onChange={setMode} />

          <div className="relative">
            <ChartAndPeakCard mode={mode} bars={data} />
            <div className="relative z-10 -mt-6 px-1">
              <SummaryStrip />
            </div>
          </div>

          <SectionLabel>What MoodPlan noticed</SectionLabel>
          <div className="flex flex-col gap-3">
            {insights.map((c) => (
              <InsightCard key={c.id} data={c} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

/* ───────────── header ───────────── */

function Header(_props: { mode: Mode }) {
  return (
    <div>
      <h1
        className={`${anton.className} text-[44px] uppercase leading-[0.95] tracking-tight`}
      >
        Your insights
      </h1>
    </div>
  );
}

function DateAndToggle({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (m: Mode) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="inline-flex items-center gap-2 rounded-full border border-[#1A1A1A]/12 px-3 py-1.5 text-[12px] font-medium text-[#1A1A1A]/75">
        {mode === "weekly" ? "May 14 – 20" : "Wed, 20 May"}
      </span>

      <div className="flex items-center rounded-full bg-[#F4F4F4] p-1 text-[11px] font-semibold uppercase tracking-[0.16em]">
        <ToggleBtn active={mode === "daily"} onClick={() => onChange("daily")}>
          Daily
        </ToggleBtn>
        <ToggleBtn
          active={mode === "weekly"}
          onClick={() => onChange("weekly")}
        >
          Weekly
        </ToggleBtn>
      </div>
    </div>
  );
}

function ToggleBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 transition ${
        active ? "bg-[#0E0E0E] text-white" : "text-[#1A1A1A]/55"
      }`}
    >
      {children}
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#1A1A1A]/55">
      {children}
    </p>
  );
}

/* ───────────── chart ───────────── */

function ChartAndPeakCard({
  mode,
  bars,
}: {
  mode: Mode;
  bars: { label: string; energy: number; tasks: number }[];
}) {
  /*
    One outer container holds both the chart and the headline ("Peak
    days are…") so they read as a single thought: "here's the data,
    here's what it means." Outer = white card with hairline border
    (same shell as the add-task title card). The peak insight stays
    mint inside to keep the "MoodPlan noticed" voice consistent.
  */
  /*
    Visual reset — simple, basic.
    One filled black pillar per day = energy.
    A horizontal white tick on the pillar = tasks done.
    Less ornament, easier to read at a glance.
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
          <Legend swatch="#F5DE7B" label="Energy" filled />
          <Legend swatch="#FFFFFF" label="Tasks" filled />
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
              {/* energy pillar */}
              <span
                className="relative w-full max-w-[28px] rounded-sm bg-[#F5DE7B]"
                style={{ height: eH }}
                aria-hidden
              >
                {/* tasks tick — white horizontal line on the pillar */}
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

      <div className="mt-4 flex gap-2.5">
        {bars.map((b) => (
          <span
            key={b.label + "-x"}
            className={`${anton.className} flex-1 text-center text-[14px] uppercase tracking-tight ${
              isPeak(b, bars) ? "text-[#1A1A1A]" : "text-[#1A1A1A]/55"
            }`}
          >
            {b.label}
          </span>
        ))}
      </div>

      <p
        className={`${oswald.className} mt-4 text-[13px] font-light text-[#1A1A1A]/75`}
      >
        {mode === "weekly"
          ? "Daily averages. Higher = better."
          : "2-hour averages across today."}
      </p>

      {/* Peak insight nested inside the same shell. */}
      <div className="mt-4">
        <PeakInsight mode={mode} />
      </div>
    </section>
  );
}

function isPeak(
  b: { energy: number },
  bars: { energy: number }[],
): boolean {
  return b.energy === Math.max(...bars.map((x) => x.energy));
}

function Legend({
  swatch,
  label,
  filled = true,
}: {
  swatch: string;
  label: string;
  filled?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="h-3 w-3 rounded-full"
        style={{
          background: filled ? swatch : "transparent",
          border: filled ? "none" : `1.5px solid ${swatch}`,
        }}
        aria-hidden
      />
      {label}
    </span>
  );
}

/* ───────────── peak insight (headline card) ───────────── */

function PeakInsight({ mode }: { mode: Mode }) {
  const text =
    mode === "weekly"
      ? {
          headline: "Peak days are Mon & Tue.",
          body: "MoodPlan front-loads deep focus work into those days automatically.",
        }
      : {
          headline: "Peak window: 10am – 12pm.",
          body: "MoodPlan front-loads deep focus work into this morning slot for you.",
        };
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-white p-5">
      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#FF5A4A]">
        <SparkleGlyph dark={false} />
      </span>
      <div>
        <p
          className={`${anton.className} text-[22px] uppercase leading-[1.05] tracking-tight`}
        >
          {text.headline}
        </p>
        <p className="mt-1.5 text-[13px] text-[#1A1A1A]/75">{text.body}</p>
      </div>
    </div>
  );
}

/* ───────────── insight cards ───────────── */

function InsightCard({ data }: { data: InsightCardData }) {
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
          <path d="M7 1.5 8.5 5l3.7.4-2.8 2.5.8 3.6L7 9.7 3.8 11.5l.8-3.6L1.8 5.4l3.7-.4L7 1.5Z" fill={fill} />
        </svg>
      );
    case "clock":
      return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <circle cx="7" cy="7" r="5.5" stroke={stroke} strokeWidth="1.3" />
          <path d="M7 3.8V7l2 1.2" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case "smile":
      return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <circle cx="7" cy="7" r="5.5" stroke={stroke} strokeWidth="1.3" />
          <circle cx="5" cy="6" r="0.7" fill={stroke} />
          <circle cx="9" cy="6" r="0.7" fill={stroke} />
          <path d="M4.5 8.5c.7 1 1.6 1.5 2.5 1.5s1.8-.5 2.5-1.5" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case "check":
      return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M2.5 7.5 5.5 10.5 11.5 4" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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

/* ───────────── bottom summary strip ───────────── */

function SummaryStrip() {
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
      <p
        className={`${anton.className} text-[18px] uppercase tracking-tight`}
      >
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

/* ───────────── status bar ───────────── */

function StatusBar() {
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
      <rect x="13.5" y="0.5" width="3" height="10.5" rx="0.5" fill="currentColor" />
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
