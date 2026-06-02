import { Anton, Oswald } from "next/font/google";
import { ENERGY_META, type EnergyLevel } from "../components/Icons";
import {
  PageHeader,
  DateAndToggle,
  InsightsCard,
  StatusBar,
  WhiteBolt,
  type TimelineState,
} from "../components/Schedule";

const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap" });
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Your day · Task Management",
  description: "Hour-anchored timeline of today's blocks.",
};

type TimelineItem = {
  id: string;
  hour: string;
  title: string;
  level: EnergyLevel;
  state: TimelineState;
  duration: string;
};

const DAY_ITEMS: TimelineItem[] = [
  {
    id: "deck",
    hour: "9 AM",
    title: "Finish client deck",
    level: "high",
    state: "DONE",
    duration: "9:00 – 11:00 AM",
  },
  {
    id: "wireframe",
    hour: "Now",
    title: "Design homepage wireframe",
    level: "maximal",
    state: "NOW",
    duration: "11:30 AM – 1:00 PM",
  },
  {
    id: "break",
    hour: "1 PM",
    title: "Lunch + recharge",
    level: "low",
    state: "BREAK",
    duration: "1:00 – 2:00 PM",
  },
  {
    id: "emails",
    hour: "2 PM",
    title: "Reply to 3 client emails",
    level: "moderate",
    state: "NEXT",
    duration: "2:00 – 3:00 PM",
  },
  {
    id: "groceries",
    hour: "6 PM",
    title: "Buy groceries",
    level: "low",
    state: "NEXT",
    duration: "6:00 – 6:30 PM",
  },
];

export default function YourDayPage() {
  return (
    <main
      className={`${oswald.className} min-h-screen bg-[#EFEFEF] text-[#1A1A1A]`}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-white pb-8">
        <StatusBar />

        <div className="flex flex-col gap-5 px-5 pt-4">
          <PageHeader mode="day" />
          <DateAndToggle mode="day" />

          <DayTimeline />
          <InsightsCard />
        </div>
      </div>
    </main>
  );
}

function DayTimeline() {
  return (
    <section>
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#1A1A1A]/55">
        Timeline
      </p>
      <ul className="mt-4 flex flex-col gap-2.5">
        {DAY_ITEMS.map((item) => (
          <TimelineRow key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
}

function TimelineRow({ item }: { item: TimelineItem }) {
  const m = ENERGY_META[item.level];
  const isDone = item.state === "DONE";
  const isNow = item.state === "NOW";
  const isBreak = item.state === "BREAK";

  return (
    <li className="flex items-stretch gap-3">
      <div className="flex w-14 shrink-0 flex-col items-end justify-center text-right">
        <span
          className={`${anton.className} uppercase tracking-tight leading-none ${
            isNow
              ? "text-[26px] text-[#FF5A4A]"
              : "text-[16px] text-[#1A1A1A]"
          }`}
        >
          {item.hour}
        </span>
        {isNow ? (
          <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FF5A4A]">
            Live
          </span>
        ) : null}
      </div>

      <article
        className={`flex-1 rounded-2xl p-4 ${
          isBreak ? "border border-dashed border-[#1A1A1A]/25" : ""
        }`}
        style={{
          background: isDone
            ? "#F4F4F4"
            : isNow
              ? "#0E0E0E"
              : isBreak
                ? "transparent"
                : m.color,
          color: isNow ? "#FFFFFF" : "#1A1A1A",
          boxShadow: isNow
            ? "0 16px 30px -10px rgba(14,14,14,0.35)"
            : isBreak
              ? undefined
              : "0 8px 18px -10px rgba(14,14,14,0.18)",
        }}
      >
        <div className="flex items-center justify-between">
          <span
            className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${
              isNow
                ? "text-white/70"
                : isDone
                  ? "text-[#1A1A1A]/45"
                  : "text-[#1A1A1A]/65"
            }`}
          >
            {isBreak ? "Break" : `${m.label} energy · ${item.state}`}
          </span>
          {!isBreak ? <WhiteBolt size={18} dark={!isNow} /> : null}
        </div>

        <h4
          className={`${anton.className} mt-2 text-[20px] uppercase leading-[1.04] tracking-tight ${
            isDone ? "text-[#1A1A1A]/50 line-through decoration-[1.5px]" : ""
          }`}
        >
          {item.title}
        </h4>

        <p
          className={`mt-1.5 text-[11px] font-medium ${
            isNow
              ? "text-white/65"
              : isDone
                ? "text-[#1A1A1A]/45"
                : "text-[#1A1A1A]/65"
          }`}
        >
          {item.duration}
        </p>
      </article>
    </li>
  );
}
