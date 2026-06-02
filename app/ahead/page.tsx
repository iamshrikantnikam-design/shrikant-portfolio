import { Oswald } from "next/font/google";
import {
  HeroCard,
  StateCard,
  SectionLabel,
  StateTaskList,
  CtaPair,
  StatusBar,
  type StateTask,
} from "../components/DayState";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "You're ahead · Task Management",
  description:
    "Done early — energy surge state. MoodPlan pulls tomorrow's tasks forward.",
};

const FINISHED: StateTask[] = [
  {
    id: "f1",
    category: "Finished early",
    title: "Design wireframe",
    level: "maximal",
    state: "DONE",
  },
  {
    id: "f2",
    category: "Finished early",
    title: "Client emails",
    level: "moderate",
    state: "DONE",
  },
];

const PULLED: StateTask[] = [
  {
    id: "p1",
    category: "Deep focus · Pulled forward",
    title: "Client strategy deck",
    level: "maximal",
    meta: "Thu · ~45 min",
    pts: 10,
  },
  {
    id: "p2",
    category: "Medium energy · Pulled forward",
    title: "Review design system doc",
    level: "moderate",
    meta: "Fri · ~30 min",
    pts: 7,
  },
  {
    id: "p3",
    category: "Easy win · Pulled forward",
    title: "Update project status doc",
    level: "low",
    meta: "Thu · ~15 min",
    pts: 5,
  },
];

export default function AheadPage() {
  return (
    <main
      className={`${oswald.className} min-h-screen bg-[#EFEFEF] text-[#1A1A1A]`}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-white pb-44">
        <StatusBar />

        <div className="flex flex-col gap-5 px-5 pt-4">
          <HeroCard
            tone="ahead"
            headline="You're ahead, Priya."
            body="You're 90 mins ahead of schedule. Energy is still high — MoodPlan has pulled forward tasks that match your current state."
            badge="+2 done early · +17 pts"
          />

          <SectionLabel>Finished early</SectionLabel>
          <StateTaskList tasks={FINISHED} />

          <StateCard
            tone="ahead"
            title="Energy surge detected"
            body="You're at 85% — well above your usual 11am level. MoodPlan pulled 3 tasks from tomorrow's queue."
            meta="~90 min of high-focus time remaining"
          />

          <SectionLabel>Pulled forward — use this energy</SectionLabel>
          <StateTaskList tasks={PULLED} />

          <CtaPair primary="Use this energy" secondary="Rest instead" />
        </div>
      </div>
    </main>
  );
}
