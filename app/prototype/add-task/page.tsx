"use client";

import { useState } from "react";
import { Anton, Oswald } from "next/font/google";
import {
  ENERGY_META,
  type EnergyLevel,
} from "../components/Icons";

const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap" });
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

/*
  Add-task screen.

  Reference deck (image 1) split the question in two — "how long" + "energy
  needed". Our system already collapses those: energy IS duration. So this
  screen presents one 5-level picker (the same bolt scale used everywhere
  else) and lets the AI schedule it.

  Sections, top → bottom:
    • back row
    • title block (Anton huge + Oswald sub)
    • task name input
    • energy / duration picker (5 rows)
    • MoodPlan info card
    • reward chip
    • sticky CTA
*/

const LEVELS: EnergyLevel[] = ["low", "light", "moderate", "high", "maximal"];

const LEVEL_COPY: Record<EnergyLevel, string> = {
  low: "Easy win",
  light: "Light lift",
  moderate: "Medium energy",
  high: "Focus block",
  maximal: "Deep focus",
};

export default function AddTaskPage() {
  const [taskName, setTaskName] = useState("");
  const [selected, setSelected] = useState<EnergyLevel>("maximal");

  return (
    <main
      className={`${oswald.className} min-h-screen bg-[#EFEFEF] text-[#1A1A1A]`}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-white pb-[200px]">
        <StatusBar />

        <div className="flex flex-col gap-6 px-5">
          <TopRow />

          <TitleAndInputCard value={taskName} onChange={setTaskName} />

          <ScheduleHint level={selected} />

          <Section label="How much time needed">
            <div className="flex flex-col gap-2.5">
              {LEVELS.map((lvl) => (
                <EnergyRow
                  key={lvl}
                  level={lvl}
                  active={selected === lvl}
                  onSelect={() => setSelected(lvl)}
                />
              ))}
            </div>
          </Section>
        </div>

        <AddToDayCta enabled={taskName.trim().length > 0} />
      </div>
    </main>
  );
}

/* ──────────────────────── pieces ──────────────────────── */

function TopRow() {
  return (
    <div className="flex items-center justify-between pt-4">
      <button
        type="button"
        aria-label="Back"
        className="grid h-11 w-11 place-items-center rounded-full bg-[#F4F4F4]"
      >
        <BackGlyph />
      </button>
      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1A1A1A]/55">
        New task
      </span>
      <div className="w-11" aria-hidden />
    </div>
  );
}

function TitleAndInputCard({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <section className="rounded-3xl border border-[#1A1A1A]/15 p-5">
      <h1
        className={`${anton.className} flex items-center gap-3 text-[44px] uppercase leading-[0.95] tracking-tight`}
      >
        Add a task
        <span
          aria-hidden
          className="grid h-9 w-9 place-items-center rounded-full border border-[#1A1A1A] text-[#1A1A1A]"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden
          >
            <path
              d="M9 3v12M3 9h12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </h1>

      <div className="mt-6 pb-4">
        <input
          id="task-name"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Task name"
          className={`${oswald.className} block h-12 w-full bg-transparent text-[18px] outline-none`}
        />
      </div>
    </section>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#1A1A1A]/55">
        {label}
      </p>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function TaskInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative rounded-2xl border border-[#1A1A1A]/12 bg-white">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Design homepage wireframe"
        className={`${oswald.className} w-full rounded-2xl bg-transparent px-4 py-4 text-[16px] outline-none placeholder:text-[#1A1A1A]/30`}
      />
    </div>
  );
}

function EnergyRow({
  level,
  active,
  onSelect,
}: {
  level: EnergyLevel;
  active: boolean;
  onSelect: () => void;
}) {
  const m = ENERGY_META[level];
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className="flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition"
      style={{
        background: m.color,
        boxShadow: active
          ? "0 18px 32px -10px rgba(14,14,14,0.32), 0 4px 10px -4px rgba(14,14,14,0.18)"
          : "0 10px 22px -10px rgba(14,14,14,0.18), 0 3px 8px -4px rgba(14,14,14,0.10)",
      }}
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center">
        <WhiteBolt />
      </span>

      <div className="flex flex-1 items-baseline gap-2">
        <p
          className={`${anton.className} text-[24px] uppercase leading-none tracking-tight text-[#1A1A1A]`}
        >
          {m.range}
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#1A1A1A]/55">
          {m.label} energy
        </p>
      </div>

      <Radio active={active} />
    </button>
  );
}

function Radio({ active }: { active: boolean }) {
  return (
    <span
      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${
        active ? "border-[#1A1A1A] bg-[#1A1A1A]" : "border-[#1A1A1A]/30 bg-transparent"
      }`}
    >
      {active ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
    </span>
  );
}

function ScheduleHint({ level }: { level: EnergyLevel }) {
  const m = ENERGY_META[level];
  const windowCopy = scheduleWindow(level);
  return (
    <div className="rounded-2xl bg-[#F4F4F4] p-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white">
          <SparkleGlyph />
        </span>
        <p className="text-[13px] leading-[1.55] text-[#1A1A1A]/75">
          <span className="font-semibold text-[#1A1A1A]">
            MoodPlan will schedule this
          </span>{" "}
          during your next {LEVEL_COPY[level].toLowerCase()} window — looks
          like <span className="font-semibold">{windowCopy}</span> based on
          your energy pattern. {m.range} block.
        </p>
      </div>
    </div>
  );
}

function scheduleWindow(level: EnergyLevel): string {
  switch (level) {
    case "low":
      return "this evening 6:00–6:15 PM";
    case "light":
      return "tomorrow 4:30–5:00 PM";
    case "moderate":
      return "tomorrow 2:00–2:45 PM";
    case "high":
      return "tomorrow 11:00 AM–12:00 PM";
    case "maximal":
      return "tomorrow 9:00–10:30 AM";
  }
}

function RewardChip({
  points,
  voucher,
}: {
  points: number;
  voucher: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-[#0E0E0E] p-4 text-white">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-[14px]">
        ✦
      </span>
      <p className="text-[13px] leading-[1.4]">
        Complete this task →{" "}
        <span className={`${anton.className} text-[16px]`}>+{points} pts</span>{" "}
        toward your {voucher} voucher.
      </p>
    </div>
  );
}

function AddToDayCta({ enabled }: { enabled: boolean }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-10 flex justify-center px-5 pb-[112px]">
      <div className="pointer-events-auto w-full max-w-[400px]">
        <button
          type="button"
          disabled={!enabled}
          className={`${anton.className} h-14 w-full rounded-full text-[17px] uppercase tracking-[0.16em] shadow-[0_12px_28px_-12px_rgba(0,0,0,0.45)] transition ${
            enabled
              ? "bg-[#0E0E0E] text-white"
              : "cursor-not-allowed bg-[#0E0E0E]/35 text-white"
          }`}
        >
          Add to my day
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────── glyphs ──────────────────────── */

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

function WhiteBolt() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden
    >
      <path
        d="M20.5 4 L9.5 21 H16 L14 32 L26.5 15 H20 L20.5 4 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function BackGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M11 3.5 5.5 9l5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkleGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M7 1.5 8 6l4.5 1L8 8l-1 4.5L6 8 1.5 7 6 6Z"
        fill="#1A1A1A"
      />
    </svg>
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
