import { Anton, Oswald } from "next/font/google";
import { ENERGY_META, type EnergyLevel } from "./Icons";

/*
  Shared shell + bits for the two "state" screens:
    /ahead   — you're ahead of the day, energy surge
    /low-day — low energy, light load

  Both pages share the structure:
    Hero card  → "You're ahead" or "That's okay"
    Insight card (dark) — energy surge / low energy mode
    Section label
    Task chips (color-coded by level / state)
    CTA pair (primary + ghost)
    Floating points strip at bottom
*/

const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap" });
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export type StateTone = "ahead" | "low";

/* ───────────────────────── hero card ───────────────────────── */

export function HeroCard({
  tone,
  headline,
  body,
  badge,
}: {
  tone: StateTone;
  headline: string;
  body: string;
  badge?: string;
}) {
  const isAhead = tone === "ahead";

  if (isAhead) {
    /*
      Celebration variant — yellow wash, bigger star with radial spark
      rays, optional achievement badge ("+2 done early"). Whole card
      reads as a "moment" rather than a soft notification.
    */
    return (
      <section
        className="relative overflow-hidden rounded-3xl px-5 py-7 text-center"
        style={{
          background: "#F5DE7B",
          boxShadow:
            "0 22px 38px -16px rgba(245,222,123,0.65), 0 6px 16px -6px rgba(14,14,14,0.12)",
        }}
      >
        {/* satellite confetti */}
        <ConfettiDot className="left-6 top-6" />
        <ConfettiDot className="right-10 top-4" />
        <ConfettiDot className="right-6 top-16" small />
        <ConfettiDot className="left-10 bottom-8" small />
        <ConfettiDot className="right-12 bottom-6" />

        <span className="relative mx-auto block h-14 w-14">
          <SparkRays />
          <span className="absolute inset-0 grid place-items-center rounded-full bg-[#1A1A1A]">
            <StarGlyph fill="#F5DE7B" size={20} />
          </span>
        </span>

        <h1
          className={`${anton.className} mt-5 text-[34px] uppercase leading-[1] tracking-tight`}
        >
          {headline}
        </h1>

        <p
          className={`${oswald.className} mx-auto mt-2 max-w-[320px] text-[13px] font-light leading-[1.55] text-[#1A1A1A]/75`}
        >
          {body}
        </p>

        {badge ? (
          <span
            className={`${anton.className} mt-4 inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] px-4 py-1.5 text-[12px] uppercase tracking-[0.18em] text-white`}
          >
            <SparkleTinyGlyph />
            {badge}
          </span>
        ) : null}
      </section>
    );
  }

  /* Low-energy variant — calm, supportive, no celebration. */
  return (
    <section className="rounded-3xl border border-[#1A1A1A]/10 bg-white px-5 py-6 text-center">
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#F4F4F4]">
        <PauseGlyph />
      </span>
      <h1
        className={`${anton.className} mt-4 text-[30px] uppercase leading-[1] tracking-tight`}
      >
        {headline}
      </h1>
      <p
        className={`${oswald.className} mx-auto mt-2 max-w-[320px] text-[13px] font-light leading-[1.55] text-[#1A1A1A]/70`}
      >
        {body}
      </p>
    </section>
  );
}

function ConfettiDot({
  className,
  small,
}: {
  className: string;
  small?: boolean;
}) {
  return (
    <span
      className={`absolute rounded-full bg-[#1A1A1A]/85 ${small ? "h-1.5 w-1.5" : "h-2 w-2"} ${className}`}
      aria-hidden
    />
  );
}

function SparkRays() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      aria-hidden
      className="absolute inset-0 h-full w-full"
    >
      <g stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round">
        <line x1="28" y1="0.5" x2="28" y2="4" />
        <line x1="28" y1="52" x2="28" y2="55.5" />
        <line x1="0.5" y1="28" x2="4" y2="28" />
        <line x1="52" y1="28" x2="55.5" y2="28" />
        <line x1="8" y1="8" x2="10.5" y2="10.5" />
        <line x1="45.5" y1="45.5" x2="48" y2="48" />
        <line x1="48" y1="8" x2="45.5" y2="10.5" />
        <line x1="10.5" y1="45.5" x2="8" y2="48" />
      </g>
    </svg>
  );
}

function SparkleTinyGlyph() {
  return (
    <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M7 1.5 8 6l4.5 1L8 8l-1 4.5L6 8 1.5 7 6 6Z"
        fill="#F5DE7B"
      />
    </svg>
  );
}

/* ─────────────────────── status insight card ─────────────────────── */

export function StateCard({
  tone,
  title,
  body,
  meta,
}: {
  tone: StateTone;
  title: string;
  body: string;
  meta?: string;
}) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl bg-[#0E0E0E] p-5 text-white">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10">
          {tone === "ahead" ? <BoltGlyph /> : <MoonGlyph />}
        </span>
        <div>
          <h3
            className={`${anton.className} text-[16px] uppercase leading-[1.15] tracking-tight`}
          >
            {title}
          </h3>
          <p className="mt-1.5 text-[12px] leading-[1.55] text-white/65">
            {body}
          </p>
        </div>
      </div>

      {meta ? (
        <p
          className={`${anton.className} text-[14px] uppercase tracking-[0.04em] text-[#F5DE7B]`}
        >
          {meta}
        </p>
      ) : null}
    </article>
  );
}

/* ───────────────────────── task chip list ───────────────────────── */

export type StateTask = {
  id: string;
  category: string; // e.g. "DEEP FOCUS · PULLED FORWARD"
  title: string;
  level: EnergyLevel | "rest";
  meta?: string; // "Thu · ~45 min"
  pts?: number;
  state?: "DONE" | "OPEN" | "REST";
};

export function StateTaskList({ tasks }: { tasks: StateTask[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {tasks.map((t) => (
        <StateTaskChip key={t.id} task={t} />
      ))}
    </ul>
  );
}

function StateTaskChip({ task }: { task: StateTask }) {
  const isDone = task.state === "DONE";
  const isRest = task.level === "rest" || task.state === "REST";
  const energy = !isRest ? ENERGY_META[task.level as EnergyLevel] : null;

  const bg = isDone
    ? "#F4F4F4"
    : isRest
      ? "transparent"
      : (energy?.color ?? "#FFFFFF");

  return (
    <li
      className={`flex items-center justify-between gap-3 rounded-2xl px-4 py-3 ${
        isRest ? "border border-dashed border-[#1A1A1A]/25" : ""
      }`}
      style={{
        background: bg,
        boxShadow:
          isRest || isDone
            ? undefined
            : "0 6px 14px -10px rgba(14,14,14,0.15)",
      }}
    >
      <div className="flex items-center gap-3">
        {isDone ? (
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white">
            <CheckGlyph />
          </span>
        ) : null}

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1A1A1A]/65">
            {task.category}
          </p>
          <p
            className={`${anton.className} mt-0.5 text-[17px] uppercase leading-[1.1] tracking-tight ${
              isDone ? "text-[#1A1A1A]/50 line-through decoration-[1.5px]" : ""
            }`}
          >
            {task.title}
          </p>
          {task.meta ? (
            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#1A1A1A]/55">
              {task.meta}
            </p>
          ) : null}
        </div>
      </div>

      {task.pts != null ? (
        <span
          className={`${anton.className} shrink-0 text-[14px] uppercase tracking-tight text-[#1A1A1A]`}
        >
          +{task.pts} pts
        </span>
      ) : null}
    </li>
  );
}

/* ───────────────────────── CTA pair ───────────────────────── */

export function CtaPair({
  primary,
  secondary,
}: {
  primary: string;
  secondary: string;
}) {
  /*
    Sticky at the bottom of the phone canvas. Content scrolls behind it.
    A short white→transparent gradient sits above the buttons so cards
    fade out cleanly instead of touching the CTAs.

    The page wrapper needs ~pb-40 so the last card never tucks under
    this pill (CTA ~48 + 32 page padding + ~64 future bottom nav).
  */
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-center">
      <div className="pointer-events-auto w-full max-w-[440px] px-5 pb-6 pt-10">
        {/* fade scrim above the buttons */}
        <div
          className="pointer-events-none absolute inset-x-0 -top-4 h-16"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #FFFFFF 60%)",
          }}
          aria-hidden
        />
        <div className="relative grid grid-cols-2 gap-3">
          <button
            type="button"
            className={`${anton.className} h-12 rounded-full bg-[#0E0E0E] text-[13px] uppercase tracking-[0.18em] text-white shadow-[0_12px_26px_-12px_rgba(0,0,0,0.4)]`}
          >
            {primary}
          </button>
          <button
            type="button"
            className={`${anton.className} h-12 rounded-full border border-[#1A1A1A] bg-white text-[13px] uppercase tracking-[0.18em] text-[#1A1A1A]`}
          >
            {secondary}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────── floating pts strip ─────────────────────── */

export function PtsStrip({
  leftLabel,
  rightLabel,
}: {
  leftLabel: string;
  rightLabel: string;
}) {
  return (
    <div
      className="flex items-center justify-between gap-3 rounded-full bg-[#0E0E0E] px-5 py-3 text-white"
      style={{
        boxShadow:
          "0 22px 40px -14px rgba(14,14,14,0.45), 0 6px 14px -6px rgba(14,14,14,0.25)",
      }}
    >
      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
        {leftLabel}
      </span>
      <span
        className={`${anton.className} text-[16px] uppercase tracking-tight`}
      >
        {rightLabel}
      </span>
    </div>
  );
}

/* ───────────────────────── section label ───────────────────────── */

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#1A1A1A]/55">
      {children}
    </p>
  );
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

/* ───────────────────────── glyphs ───────────────────────── */

function StarGlyph({
  fill = "#1A1A1A",
  size = 18,
}: {
  fill?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
    >
      <path
        d="M9 1.5 11 6.5l5.5.5-4.2 3.7 1.2 5.4L9 13.3 4.5 16.1l1.2-5.4L1.5 7l5.5-.5L9 1.5Z"
        fill={fill}
      />
    </svg>
  );
}

function PauseGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="7.5" stroke="#1A1A1A" strokeWidth="1.4" />
      <path
        d="M6 6h2.5M9.5 6H12M6 9h2.5M9.5 9H12M6 12h2.5M9.5 12H12"
        stroke="#1A1A1A"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M9 5v4l2.5 1.2"
        stroke="#1A1A1A"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BoltGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 36 36" fill="none" aria-hidden>
      <path
        d="M20.5 4 L9.5 21 H16 L14 32 L26.5 15 H20 L20.5 4 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function MoonGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M14.5 11A6.5 6.5 0 1 1 7 3.5a5 5 0 0 0 7.5 7.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function CheckGlyph() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M2.5 7.5 5.5 10.5 11.5 4"
        stroke="#1A1A1A"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
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
