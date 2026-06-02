import { Oswald } from "next/font/google";
import {
  HeroCard,
  StateCard,
  SectionLabel,
  StateTaskList,
  CtaPair,
  PtsStrip,
  StatusBar,
  type StateTask,
} from "../components/DayState";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "That's okay · Task Management",
  description:
    "Low energy state. MoodPlan adjusts your day — only the essentials.",
};

const EASY: StateTask[] = [
  {
    id: "e1",
    category: "Easy win",
    title: "Buy groceries",
    level: "low",
    meta: "Anytime today · ~30 min",
    pts: 5,
  },
  {
    id: "e2",
    category: "Easy win",
    title: "Reply to 3 emails",
    level: "low",
    meta: "Afternoon · ~20 min",
    pts: 5,
  },
  {
    id: "e3",
    category: "Rest block",
    title: "Rest block",
    level: "rest",
    meta: "Scheduled · 1–3 PM",
    pts: 3,
    state: "REST",
  },
];

export default function LowDayPage() {
  return (
    <main
      className={`${oswald.className} min-h-screen bg-[#EFEFEF] text-[#1A1A1A]`}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-white pb-[220px]">
        <StatusBar />

        <div className="flex flex-col gap-5 px-5 pt-4">
          <HeroCard
            tone="low"
            headline="That's okay, Priya."
            body="Low energy days happen. MoodPlan has already adjusted your day — only the essentials, nothing heavy."
          />

          <StateCard
            tone="low"
            title="Low energy mode is on"
            body="Your heavy work is safely rescheduled. Today is for small wins, rest, and showing up gently. You still earn points — rest counts too."
            meta="3 deep tasks moved to tomorrow"
          />

          <CtaPair primary="Keep light day" secondary="Override" />

          <SectionLabel>What's on today — easy only</SectionLabel>
          <StateTaskList tasks={EASY} />

          <div className="px-1 pt-1">
            <PtsStrip
              leftLabel="+10 pts for check-in"
              rightLabel="340 pts"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
