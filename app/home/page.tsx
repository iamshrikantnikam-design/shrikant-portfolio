import { Anton, Oswald } from "next/font/google";
import {
  ProfileIcon,
  EnergyIcon,
  ENERGY_META,
  type EnergyLevel,
} from "../components/Icons";

const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap" });
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Home · Task Management",
  description:
    "Home screen — energy state, AI-sorted day, rewards, streak, plan-my-day CTA.",
};

/* ─────────────────────────── data ─────────────────────────── */
/*
  Content carried over from the v1 skeleton (Image 1). Energy state +
  4 AI-sorted tasks + reward/streak + Plan-my-day CTA.

  Energy levels map to icon + colour from the design system.
*/

type Task = {
  title: string;
  level: EnergyLevel;
  state: "DONE" | "NOW" | "NEXT";
  category: string;
  time: string;
};

const ENERGY_STATE = {
  label: "GOOD",
  scale: ["Anxious", "Low", "Okay", "Good", "Great"] as const,
  index: 3, // GOOD → 4th step (0-indexed)
};

const TASKS: Task[] = [
  {
    title: "Design homepage wireframe",
    level: "maximal",
    state: "NOW",
    category: "Deep focus",
    time: "11:30 AM – 1:00 PM",
  },
  {
    title: "Reply to 3 client emails",
    level: "moderate",
    state: "NEXT",
    category: "Medium energy",
    time: "2:00 PM – 2:45 PM",
  },
  {
    title: "Buy groceries",
    level: "low",
    state: "NEXT",
    category: "Easy win",
    time: "6:00 PM – 6:15 PM",
  },
  {
    title: "Finish client deck",
    level: "high",
    state: "DONE",
    category: "Deep focus",
    time: "9:00 AM – 11:00 AM",
  },
];

const STREAK_DAYS = 7;

/* ─────────────────────────── page ─────────────────────────── */

export default function HomePage() {
  return (
    <main
      className={`${oswald.className} min-h-screen bg-[#EFEFEF] text-[#1A1A1A]`}
    >
      {/* phone-width canvas — full bleed on mobile, centred on desktop */}
      <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-white pb-32">
        <StatusBar />
        <div className="flex flex-col gap-5 px-5">
          <Header />
          <AiSortedHeader count={TASKS.length} />
          <EnergyCard />
          <TaskHeroCard count={TASKS.filter((t) => t.state !== "DONE").length} />
          <div className="flex flex-col gap-3">
            {TASKS.map((t) => (
              <TaskCard key={t.title} task={t} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <RewardCard points={340} voucher="₹34" />
            <StreakCard days={STREAK_DAYS} />
          </div>
        </div>

        <PlanMyDayCta />
      </div>
    </main>
  );
}

/* ─────────────────────────── sections ─────────────────────────── */

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

function Header() {
  return (
    <header className="flex items-start justify-between pt-4">
      <div>
        <p className="text-[14px] tracking-tight text-[#1A1A1A]/70">
          Hi <span aria-hidden>👋</span> Priya
        </p>
        <h1
          className={`${anton.className} mt-0.5 text-[40px] uppercase leading-[0.95] tracking-tight`}
        >
          Welcome Back
        </h1>
      </div>
      <button
        type="button"
        aria-label="Open profile"
        className="grid h-12 w-12 place-items-center rounded-full bg-[#0E0E0E] text-white"
      >
        <ProfileIcon size={22} />
      </button>
    </header>
  );
}

function EnergyCard() {
  const filled = (ENERGY_STATE.index + 1) / ENERGY_STATE.scale.length;
  return (
    <section
      aria-label="Today's energy"
      className="rounded-[28px] p-6"
      style={{ background: "#C9E8B5" }}
    >
      <div className="flex items-end justify-center">
        <h2
          className={`${anton.className} text-[56px] uppercase leading-none tracking-tight`}
        >
          {ENERGY_STATE.label}
        </h2>
        <span
          className={`${anton.className} -ml-px pb-1.5 text-[9px] uppercase tracking-[0.18em] text-[#1A1A1A]/65`}
        >
          Energy
        </span>
      </div>

      <div className="mt-6 h-6 overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full bg-[#0E0E0E]"
          style={{ width: `${filled * 100}%` }}
        />
      </div>
    </section>
  );
}

function AiSortedHeader({ count }: { count: number }) {
  return (
    <div className="mt-2 flex items-baseline justify-between">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1A1A1A]">
        AI sorted your day
      </p>
      <p className="text-[12px] text-[#1A1A1A]/65">
        {count} tasks · Thursday
      </p>
    </div>
  );
}

function TaskHeroCard({ count }: { count: number }) {
  return (
    <div className="px-1">
      <h3
        className={`${oswald.className} whitespace-nowrap text-[18px] font-light uppercase leading-[1] tracking-[0.04em]`}
      >
        You have {count} tasks for today
      </h3>
    </div>
  );
}

function TaskCard({ task }: { task: Task }) {
  const m = ENERGY_META[task.level];
  const isDone = task.state === "DONE";

  return (
    <article
      className="relative overflow-hidden rounded-[22px] p-5"
      style={{
        background: isDone ? "#F4F4F4" : m.color,
      }}
    >
      {/* Title leads — the task is what matters. Bolt sits top-right,
          aligned to the first line of the title. */}
      <div className="flex items-start justify-between gap-3">
        <h4
          className={`${anton.className} flex-1 text-[32px] uppercase leading-[1.02] tracking-tight ${
            isDone
              ? "text-[#1A1A1A]/50 line-through decoration-[1.5px]"
              : "text-[#1A1A1A]"
          }`}
        >
          {task.title}
        </h4>
        {isDone ? (
          <DoneBadge />
        ) : (
          <span className="mt-[-2px] grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/70">
            <EnergyIcon level={task.level} size={22} />
          </span>
        )}
      </div>

      {/* Meta row — category + state on the left, time/range on the right. */}
      <div className="mt-3 flex items-center justify-between gap-3">
        <span
          className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${
            isDone ? "text-[#1A1A1A]/45" : "text-[#1A1A1A]/75"
          }`}
        >
          {task.category} · {task.state}
        </span>
        <span
          className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
            isDone ? "text-[#1A1A1A]/45" : "text-[#1A1A1A]/65"
          }`}
        >
          {m.range}
        </span>
      </div>
    </article>
  );
}

function DoneBadge() {
  return (
    <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-[#0E0E0E] px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
      <svg
        width="10"
        height="10"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden
      >
        <path
          d="M2.5 6.5 5 9l4.5-6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Done
    </span>
  );
}

function RewardCard({ points, voucher }: { points: number; voucher: string }) {
  return (
    <div className="flex flex-col justify-between rounded-[22px] bg-[#0E0E0E] p-5 text-white">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/65">
        Reward
      </p>

      <div className="mt-2 flex items-baseline gap-1.5">
        <span
          className={`${anton.className} text-[68px] leading-[0.85] tracking-tight`}
        >
          {points}
        </span>
        <span
          className={`${anton.className} text-[18px] uppercase tracking-wide text-white/55`}
        >
          pts
        </span>
      </div>

      <div className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/85">
        <span aria-hidden>✦</span>
        {voucher} voucher ready
      </div>
    </div>
  );
}

function StreakCard({ days }: { days: number }) {
  const total = 10;
  const filled = Math.min(days, total);
  return (
    <div
      className="flex flex-col justify-between rounded-[22px] p-5"
      style={{ background: "#F5DE7B" }}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1A1A1A]/70">
        Streak
      </p>

      <div className="mt-2 flex items-baseline gap-1.5">
        <span
          className={`${anton.className} text-[68px] leading-[0.85] tracking-tight`}
        >
          {days}
        </span>
        <span
          className={`${anton.className} text-[18px] uppercase tracking-wide text-[#1A1A1A]/55`}
        >
          days
        </span>
      </div>

      <div className="mt-4 flex items-center gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              i < filled ? "bg-[#1A1A1A]" : "bg-[#1A1A1A]/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function PlanMyDayCta() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-10 flex justify-center px-5 pb-5">
      <div className="pointer-events-auto w-full max-w-[400px]">
        <button
          type="button"
          className={`${anton.className} h-14 w-full rounded-full bg-[#0E0E0E] text-[17px] uppercase tracking-[0.16em] text-white shadow-[0_12px_28px_-12px_rgba(0,0,0,0.45)]`}
        >
          Plan my day
        </button>
      </div>
    </div>
  );
}

/* ──────────────── status-bar glyphs (decorative) ──────────────── */

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
      <rect x="24" y="4" width="1.5" height="4" rx="0.75" fill="currentColor" opacity="0.5" />
    </svg>
  );
}
