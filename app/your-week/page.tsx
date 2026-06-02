import { Anton, Oswald } from "next/font/google";
import { ENERGY_META, type EnergyLevel } from "../components/Icons";
import {
  PageHeader,
  DateAndToggle,
  InsightsCard,
  StatusBar,
  type TimelineState,
} from "../components/Schedule";

const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap" });
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Your week · Task Management",
  description:
    "Weekly energy heatmap, insights, and day-by-day task summary.",
};

/* ─────────────────────────── data ─────────────────────────── */

type DayPhase = "past" | "today" | "future";

type WeekDay = {
  short: string;
  date: number;
  taskCount: number;
  energy: number; // 0-100, used as column height
  dominant: EnergyLevel;
  phase: DayPhase;
};

const WEEK: WeekDay[] = [
  { short: "Mon", date: 14, taskCount: 5, energy: 72, dominant: "high", phase: "past" },
  { short: "Tue", date: 15, taskCount: 4, energy: 60, dominant: "moderate", phase: "past" },
  { short: "Wed", date: 16, taskCount: 5, energy: 84, dominant: "maximal", phase: "today" },
  { short: "Thu", date: 17, taskCount: 3, energy: 45, dominant: "light", phase: "future" },
  { short: "Fri", date: 18, taskCount: 4, energy: 55, dominant: "moderate", phase: "future" },
  { short: "Sat", date: 19, taskCount: 2, energy: 30, dominant: "low", phase: "future" },
  { short: "Sun", date: 20, taskCount: 1, energy: 20, dominant: "low", phase: "future" },
];

type WeekTask = {
  id: string;
  dayKey: string;
  title: string;
  level: EnergyLevel;
  state: TimelineState;
  duration: string;
  hour: string;
};

const WEEK_TASKS: WeekTask[] = [
  { id: "m1", dayKey: "Mon14", hour: "10 AM", title: "Sprint planning", level: "high", state: "DONE", duration: "10:00 – 11:00 AM" },
  { id: "m2", dayKey: "Mon14", hour: "2 PM", title: "Design review", level: "moderate", state: "DONE", duration: "2:00 – 2:45 PM" },
  { id: "m3", dayKey: "Mon14", hour: "4 PM", title: "Send weekly report", level: "low", state: "DONE", duration: "4:00 – 4:10 PM" },

  { id: "t1", dayKey: "Tue15", hour: "9 AM", title: "Onboarding doc revision", level: "moderate", state: "DONE", duration: "9:00 – 10:00 AM" },
  { id: "t2", dayKey: "Tue15", hour: "3 PM", title: "Client sync", level: "light", state: "DONE", duration: "3:00 – 3:30 PM" },

  { id: "w1", dayKey: "Wed16", hour: "9 AM", title: "Finish client deck", level: "high", state: "DONE", duration: "9:00 – 11:00 AM" },
  { id: "w2", dayKey: "Wed16", hour: "Now", title: "Design homepage wireframe", level: "maximal", state: "NOW", duration: "11:30 AM – 1:00 PM" },
  { id: "w3", dayKey: "Wed16", hour: "1 PM", title: "Lunch + recharge", level: "low", state: "BREAK", duration: "1:00 – 2:00 PM" },
  { id: "w4", dayKey: "Wed16", hour: "2 PM", title: "Reply to 3 client emails", level: "moderate", state: "NEXT", duration: "2:00 – 3:00 PM" },
  { id: "w5", dayKey: "Wed16", hour: "6 PM", title: "Buy groceries", level: "low", state: "NEXT", duration: "6:00 – 6:30 PM" },

  { id: "th1", dayKey: "Thu17", hour: "10 AM", title: "Roadmap revisions", level: "moderate", state: "NEXT", duration: "10:00 – 11:00 AM" },
  { id: "th2", dayKey: "Thu17", hour: "3 PM", title: "Pair with Aman", level: "light", state: "NEXT", duration: "3:00 – 3:30 PM" },

  { id: "f1", dayKey: "Fri18", hour: "10 AM", title: "Demo prep", level: "high", state: "NEXT", duration: "10:00 – 11:30 AM" },
  { id: "f2", dayKey: "Fri18", hour: "2 PM", title: "Team retro", level: "moderate", state: "NEXT", duration: "2:00 – 3:00 PM" },

  { id: "s1", dayKey: "Sat19", hour: "11 AM", title: "Read research paper", level: "low", state: "NEXT", duration: "11:00 – 11:15 AM" },

  { id: "su1", dayKey: "Sun20", hour: "5 PM", title: "Plan next week", level: "low", state: "NEXT", duration: "5:00 – 5:15 PM" },
];

/* ─────────────────────────── page ─────────────────────────── */

export default function YourWeekPage() {
  return (
    <main
      className={`${oswald.className} min-h-screen bg-[#EFEFEF] text-[#1A1A1A]`}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-white pb-8">
        <StatusBar />

        <div className="flex flex-col gap-5 px-5 pt-4">
          <PageHeader mode="week" />
          <DateAndToggle mode="week" />

          <WeekHeatmap />
          <InsightsCard />

          <section>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#1A1A1A]/55">
              Tasks
            </p>
            <div className="mt-3 flex flex-col gap-3">
              {WEEK.map((d) => {
                const dayKey = d.short + d.date;
                const tasks = WEEK_TASKS.filter((t) => t.dayKey === dayKey);
                return <WeekDayCard key={dayKey} day={d} tasks={tasks} />;
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

/* ─────────────────────────── heatmap ─────────────────────────── */

function WeekHeatmap() {
  const max = Math.max(...WEEK.map((d) => d.energy));
  return (
    <div className="rounded-2xl bg-[#F8F8F8] p-4">
      <div className="flex items-end justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1A1A1A]/45">
        <span>Energy load</span>
        <span>{max}%</span>
      </div>

      <div className="mt-3 flex h-[120px] items-end justify-between gap-2">
        {WEEK.map((d) => {
          const m = ENERGY_META[d.dominant];
          const heightPct = (d.energy / 100) * 100;
          const isFuture = d.phase === "future";
          const isToday = d.phase === "today";

          if (isFuture) {
            return (
              <div
                key={d.short + d.date}
                className="flex h-full flex-1"
                aria-hidden
              />
            );
          }

          return (
            <div
              key={d.short + d.date}
              className="flex h-full flex-1 flex-col items-center justify-end gap-1.5"
            >
              <span
                className={`text-[9px] font-semibold uppercase tracking-[0.12em] ${
                  isToday ? "text-[#1A1A1A]" : "text-[#1A1A1A]/55"
                }`}
              >
                {d.energy}%
              </span>
              <div
                className="w-full overflow-hidden rounded-t-md"
                style={{
                  height: `${heightPct}%`,
                  background: m.color,
                  boxShadow: isToday
                    ? "0 8px 14px -8px rgba(14,14,14,0.25)"
                    : undefined,
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-start justify-between gap-2">
        {WEEK.map((d) => (
          <div
            key={d.short + d.date + "-lbl"}
            className="flex flex-1 flex-col items-center"
          >
            <span
              className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${
                d.phase === "today" ? "text-[#FF5A4A]" : "text-[#1A1A1A]/55"
              }`}
            >
              {d.short}
            </span>
            <span
              className={`${anton.className} mt-0.5 text-[14px] uppercase leading-none ${
                d.phase === "today" ? "text-[#FF5A4A]" : "text-[#1A1A1A]"
              }`}
            >
              {d.date}
            </span>
            {d.phase === "today" ? (
              <span className="mt-1 h-[2px] w-5 rounded-full bg-[#FF5A4A]" />
            ) : (
              <span className="mt-1 h-[2px] w-5" aria-hidden />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────── day card ─────────────────────────── */

function WeekDayCard({
  day,
  tasks,
}: {
  day: WeekDay;
  tasks: WeekTask[];
}) {
  const m = ENERGY_META[day.dominant];
  const isFuture = day.phase === "future";
  const isToday = day.phase === "today";

  const cardBg = isFuture ? "#F4F4F4" : m.color;

  return (
    <section
      className="rounded-2xl p-5"
      style={{
        background: cardBg,
        boxShadow: isToday
          ? "0 18px 32px -10px rgba(14,14,14,0.28), 0 4px 10px -4px rgba(14,14,14,0.18)"
          : "0 8px 20px -12px rgba(14,14,14,0.12)",
      }}
    >
      <div className="flex items-baseline justify-between">
        <h3
          className={`${anton.className} text-[32px] uppercase leading-none tracking-tight ${
            isFuture ? "text-[#1A1A1A]/70" : "text-[#1A1A1A]"
          }`}
        >
          {day.short} {day.date}
        </h3>
        {isToday ? (
          <span className="rounded-full bg-[#1A1A1A] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-white">
            Today
          </span>
        ) : isFuture ? (
          <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#1A1A1A]/40">
            Upcoming
          </span>
        ) : null}
      </div>

      {tasks.length === 0 ? (
        <p
          className={`mt-3 text-[13px] italic ${
            isFuture ? "text-[#1A1A1A]/40" : "text-[#1A1A1A]/50"
          }`}
        >
          Nothing scheduled.
        </p>
      ) : (
        <ul className="mt-3 flex flex-col">
          {tasks.map((t) => {
            const isDone = t.state === "DONE";
            return (
              <li
                key={t.id}
                className={`${anton.className} border-t py-2.5 text-[18px] uppercase leading-[1.1] tracking-tight first:border-t-0 first:pt-3 ${
                  isFuture ? "border-[#1A1A1A]/10" : "border-[#1A1A1A]/12"
                } ${
                  isDone
                    ? "text-[#1A1A1A]/45 line-through decoration-[1.5px]"
                    : isFuture
                      ? "text-[#1A1A1A]/75"
                      : "text-[#1A1A1A]"
                }`}
              >
                {t.title}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
