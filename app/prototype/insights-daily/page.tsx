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
  title: "Daily insights · Task Management",
  description: "Today's energy + tasks, with what MoodPlan noticed.",
};

/*
  Today's insights. 2-hour-bucketed bars from 6 AM → 8 PM, the peak
  window callout, and four pattern cards scoped to today.
*/

const BARS: Bar[] = [
  { label: "6a", energy: 20, tasks: 0 },
  { label: "8a", energy: 55, tasks: 30 },
  { label: "10a", energy: 88, tasks: 70 },
  { label: "12p", energy: 72, tasks: 55 },
  { label: "2p", energy: 32, tasks: 18 },
  { label: "4p", energy: 50, tasks: 40 },
  { label: "6p", energy: 38, tasks: 30 },
  { label: "8p", energy: 22, tasks: 12 },
];

const PEAK = {
  headline: "Peak window: 10am – 12pm.",
  body: "MoodPlan front-loads deep focus work into this morning slot for you.",
};

const INSIGHTS: InsightCardData[] = [
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

export default function InsightsDailyPage() {
  return (
    <main
      className={`${oswald.className} min-h-screen bg-[#EFEFEF] text-[#1A1A1A]`}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-white pb-[160px]">
        <StatusBar />

        <div className="flex flex-col gap-5 px-5 pt-4">
          <PageTitle />
          <DateAndToggle mode="daily" dateLabel="Wed, 20 May" />

          <div className="relative">
            <ChartAndPeakCard mode="daily" bars={BARS} peak={PEAK} />
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

/* anton is imported to keep the font side-effect; reference it here
   to satisfy strict unused-import checks while keeping the import
   intentional. */
void anton;
