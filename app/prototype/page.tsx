import Link from "next/link";
import { Anton, Oswald } from "next/font/google";

const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap" });
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Prototype · All screens",
  description: "Updated MoodPlan task management screens — presentation deck.",
};

/*
  Presentation index. Each tile is a fixed 280×580 phone frame holding
  an iframe sized to the actual mobile viewport (440×900), then
  transform-scaled down to fit. This avoids the “mobile page sitting
  inside a too-wide browser viewport with whitespace” problem of the
  earlier responsive approach.
*/

type Screen = {
  slug: string;
  label: string;
  group: "Home" | "Schedule" | "Insights" | "States" | "Account";
};

const SCREENS: Screen[] = [
  { slug: "home", label: "Home", group: "Home" },
  { slug: "add-task", label: "Add task", group: "Home" },
  { slug: "your-day", label: "Your day", group: "Schedule" },
  { slug: "your-week", label: "Your week", group: "Schedule" },
  { slug: "insights", label: "Insights (toggle)", group: "Insights" },
  { slug: "insights-daily", label: "Insights · daily", group: "Insights" },
  { slug: "insights-weekly", label: "Insights · weekly", group: "Insights" },
  { slug: "ahead", label: "You're ahead", group: "States" },
  { slug: "low-day", label: "That's okay", group: "States" },
  { slug: "profile", label: "Profile", group: "Account" },
];

// Frame ~150×310 — small enough that 4–6 columns of phone shapes
// fit per row on a typical desktop viewport, so the whole 10-screen
// deck reads as one composition rather than a long scroll. iframe
// renders the mobile page at its native 440×900 viewport then scales
// down via CSS transform.
const FRAME_W = 150;
const FRAME_H = 310;
const IFRAME_W = 440;
const IFRAME_H = FRAME_H / (FRAME_W / IFRAME_W);

export default function PrototypeIndex() {
  const scale = FRAME_W / IFRAME_W;

  return (
    <main className={`${oswald.className} min-h-screen bg-[#0A0A0A] text-white`}>
      <header className="border-b border-white/10 px-4 py-5 md:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
          MoodPlan · Updated screens
        </p>
        <h1
          className={`${anton.className} mt-1 text-[28px] uppercase leading-[0.95] tracking-tight md:text-[40px]`}
        >
          All screens
        </h1>
      </header>

      <div className="flex flex-wrap justify-center gap-x-3 gap-y-6 px-4 py-6 md:gap-x-4 md:px-8">
        {SCREENS.map((s) => (
          <Link
            key={s.slug}
            href={`/prototype/${s.slug}`}
            className="group flex flex-col gap-3"
            style={{ width: FRAME_W }}
          >
            <div
              className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-[0_24px_44px_-20px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:-translate-y-1"
              style={{ width: FRAME_W, height: FRAME_H }}
            >
              <iframe
                src={`/prototype/${s.slug}`}
                title={s.label}
                loading="lazy"
                style={{
                  border: 0,
                  width: IFRAME_W,
                  height: IFRAME_H,
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                  pointerEvents: "none",
                }}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <h2
                className={`${anton.className} text-[13px] uppercase leading-none tracking-tight`}
              >
                {s.label}
              </h2>
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/45">
                {s.group}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
