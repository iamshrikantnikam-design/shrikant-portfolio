import Link from "next/link";
import { Anton, Oswald } from "next/font/google";

/*
  Shared bits used by both /your-day and /your-week.

  - Types (Mode, TimelineState)
  - Status-bar mock + small glyphs
  - Header, Toggle-as-nav, Date chip
  - InsightsCard (Weekly stats + pts collected)
  - WhiteBolt
*/

const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap" });
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export type Mode = "day" | "week";

export type TimelineState = "DONE" | "NOW" | "NEXT" | "BREAK";

export function PageHeader({ mode }: { mode: Mode }) {
  return (
    <div>
      <h1
        className={`${anton.className} text-[44px] uppercase leading-[0.95] tracking-tight`}
      >
        {mode === "day" ? "Your day" : "Your week"}
      </h1>
      <p
        className={`${oswald.className} mt-1 text-[13px] font-light text-[#1A1A1A]/65`}
      >
        AI sorted · 68% energy budget
      </p>
    </div>
  );
}

export function DateAndToggle({ mode }: { mode: Mode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="inline-flex items-center gap-2 rounded-full border border-[#1A1A1A]/12 px-3 py-1.5 text-[12px] font-medium text-[#1A1A1A]/75">
        <CalendarGlyph />
        Wed, 20 May
      </span>

      <div className="flex items-center rounded-full bg-[#F4F4F4] p-1 text-[11px] font-semibold uppercase tracking-[0.16em]">
        <NavToggle href="/your-day" active={mode === "day"}>
          Day
        </NavToggle>
        <NavToggle href="/your-week" active={mode === "week"}>
          Week
        </NavToggle>
      </div>
    </div>
  );
}

function NavToggle({
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

export function InsightsCard() {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#0E0E0E] p-5 text-white">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/65">
          Weekly insights
        </p>
        <p
          className={`${anton.className} mt-1 text-[22px] uppercase leading-none tracking-tight`}
        >
          2× completion
        </p>
        <p className="mt-1 text-[12px] text-white/65">
          18 tasks · 7 day streak
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right leading-none">
          <p
            className={`${anton.className} text-[44px] uppercase tracking-tight leading-[0.85]`}
          >
            340
          </p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
            Pts collected
          </p>
        </div>
        <button
          type="button"
          aria-label="Open insights"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10"
        >
          <ArrowGlyph />
        </button>
      </div>
    </div>
  );
}

export function WhiteBolt({
  size = 18,
  dark = false,
}: {
  size?: number;
  dark?: boolean;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden>
      <path
        d="M20.5 4 L9.5 21 H16 L14 32 L26.5 15 H20 L20.5 4 Z"
        fill={dark ? "#1A1A1A" : "#FFFFFF"}
      />
    </svg>
  );
}

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

/* ─────────────────────── small glyphs ─────────────────────── */

function CalendarGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="15"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M3.5 10h17M8 3.5v3.5M16 3.5v3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4 12 12 4M5 4h7v7"
        stroke="currentColor"
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
