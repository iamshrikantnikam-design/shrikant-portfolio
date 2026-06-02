import { Anton, Oswald } from "next/font/google";
import {
  PageTitle,
  DateAndToggle,
  ChartAndPeakCard,
  InsightCard,
  SectionLabel,
  SummaryStrip,
  StatusBar,
  type Bar,
  type InsightCardData,
} from "../components/Insights";

const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap" });
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Weekly insights · Task Management",
  description: "7 days of energy + tasks, with what MoodPlan noticed.",
};

/*
  Past 7 days of insights. One bar per day, peak-days callout, and
  four pattern cards scoped to the week.
*/

const BARS: Bar[] = [
  { label: "Thu", energy: 38, tasks: 30 },
  { label: "Fri", energy: 30, tasks: 35 },
  { label: "Sat", energy: 18, tasks: 22 },
  { label: "Sun", energy: 16, tasks: 18 },
  { label: "Mon", energy: 86, tasks: 72 },
  { label: "Tue", energy: 92, tasks: 80 },
  { label: "Wed", energy: 70, tasks: 65 },
];

const PEAK = {
  headline: "Peak days are Mon & Tue.",
  body: "MoodPlan front-loads deep focus work into those days automatically.",
};

const INSIGHTS: InsightCardData[] = [
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

export default function InsightsWeeklyPage() {
  return (
    <main
      className={`${oswald.className} min-h-screen bg-[#EFEFEF] text-[#1A1A1A]`}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-white pb-[160px]">
        <StatusBar />

        <div className="flex flex-col gap-5 px-5 pt-4">
          <PageTitle />
          <DateAndToggle mode="weekly" dateLabel="May 14 – 20" />

          <div className="relative">
            <ChartAndPeakCard mode="weekly" bars={BARS} peak={PEAK} />
            <div className="relative z-10 -mt-6 px-1">
              <SummaryStrip />
            </div>
          </div>

          <SectionLabel>What MoodPlan noticed</SectionLabel>
          <div className="flex flex-col gap-3">
            {INSIGHTS.map((c) => (
              <InsightCard key={c.id} data={c} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

void anton;
