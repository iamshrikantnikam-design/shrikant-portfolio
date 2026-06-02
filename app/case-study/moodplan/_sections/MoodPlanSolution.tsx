import { Container } from "../../../components/Container";

/* ────────────────────────────────────────────────────────────────────────────
   MoodPlan case study — solution section (intro + how-it-works only).

   The principles, reward system, and "What MoodPlan is not" closer were
   moved to MoodPlanPrinciples so the Screens detail block can sit between
   the high-level "how it works" narrative and the deeper principle work.
──────────────────────────────────────────────────────────────────────────── */

const TEAL_LIGHT = "#7DE5DA";
const TEAL = "#22B5A6";
const CREAM = "#EFE7D2";
const INK = "#0A1714";

export function MoodPlanSolution() {
  return (
    <section
      id="solution"
      className="relative isolate overflow-hidden bg-[#04130F] py-32 text-white md:py-40"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(125,229,218,0.15) 50%, transparent)",
        }}
      />

      <Container className="relative">
        {/* Eyebrow + headline */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-10">
            <p
              className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: "rgba(125,229,218,0.75)" }}
            >
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: TEAL_LIGHT }}
              />
              04 — The solution
            </p>
            <h2 className="mt-6 text-[36px] font-black leading-[1.05] tracking-[-0.025em] sm:text-[48px] md:text-[64px] lg:text-[72px]">
              Not a smarter calendar.
              <br />
              <span style={{ color: TEAL_LIGHT }}>
                A planner that finally knows who it&rsquo;s talking to.
              </span>
            </h2>
          </div>
        </div>

        {/* The solution in one sentence */}
        <div className="mt-16 grid grid-cols-12 gap-6 md:mt-20">
          <div className="col-span-12 md:col-span-10 md:col-start-2">
            <div
              className="relative overflow-hidden rounded-[28px] border p-10 md:p-14"
              style={{
                background:
                  "linear-gradient(135deg, rgba(125,229,218,0.08) 0%, rgba(86,80,217,0.06) 60%, rgba(125,229,218,0.04) 100%)",
                borderColor: "rgba(125,229,218,0.20)",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full"
                style={{ background: "rgba(125,229,218,0.12)", filter: "blur(60px)" }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full"
                style={{ background: "rgba(86,80,217,0.14)", filter: "blur(60px)" }}
              />
              <p
                className="relative text-[10px] font-bold uppercase tracking-[0.22em]"
                style={{ color: TEAL }}
              >
                The solution in one sentence
              </p>
              <p className="relative mt-6 text-[26px] font-bold leading-[1.25] tracking-[-0.015em] text-white sm:text-[32px] md:text-[40px]">
                A daily planner that{" "}
                <span style={{ color: TEAL_LIGHT }}>
                  starts with how you feel
                </span>{" "}
                — and rebuilds your day around the version of you that
                showed up.
              </p>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-32 grid grid-cols-12 gap-6 md:mt-40">
          <div className="col-span-12 md:col-span-10">
            <p
              className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: "rgba(125,229,218,0.75)" }}
            >
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: TEAL_LIGHT }}
              />
              How it works
            </p>
            <h3 className="mt-6 text-[28px] font-black leading-[1.1] tracking-[-0.02em] sm:text-[36px] md:text-[48px]">
              Thirty seconds in the morning.{" "}
              <span style={{ color: TEAL_LIGHT }}>
                The rest of the day, rearranged for you.
              </span>
            </h3>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-7">
            <Paragraph>
              One check-in each morning. Pick a mood, drag a slider.{" "}
              <span className="font-semibold text-white">
                That&rsquo;s the whole input.
              </span>{" "}
              The AI reshuffles your list — deep focus into your sharp
              hours, easy wins in the evening, heavy stuff pushed to
              tomorrow on low days.
            </Paragraph>
            <Paragraph>
              Over time the app learns your patterns.{" "}
              <span style={{ color: TEAL_LIGHT }} className="font-semibold">
                You stop fighting the tool and start trusting it.
              </span>
            </Paragraph>
          </div>

          <div className="col-span-12 md:col-span-5">
            <CheckInMock />
          </div>
        </div>
      </Container>
    </section>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-5 text-[16px] leading-[1.7] text-white/75 first:mt-0 md:text-[17px]">
      {children}
    </p>
  );
}

function CheckInMock() {
  const moods = [
    { label: "Great", on: false },
    { label: "Okay", on: true },
    { label: "Low", on: false },
    { label: "Anxious", on: false },
    { label: "Tired", on: false },
  ];
  return (
    <div
      className="rounded-[20px] p-6 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)]"
      style={{ background: CREAM, color: INK }}
    >
      <p
        className="text-[10px] font-bold uppercase tracking-[0.18em]"
        style={{ color: TEAL }}
      >
        Morning check-in · 30 seconds
      </p>
      <p className="mt-3 text-[16px] font-bold">How are you feeling?</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {moods.map((m) => (
          <span
            key={m.label}
            className="rounded-full px-3 py-1.5 text-[12px] font-semibold"
            style={{
              background: m.on ? TEAL : "rgba(10,23,20,0.06)",
              color: m.on ? "#fff" : INK,
            }}
          >
            {m.label}
          </span>
        ))}
      </div>
      <p className="mt-6 text-[16px] font-bold">Energy level</p>
      <div
        className="relative mt-3 h-[8px] w-full rounded-full"
        style={{ background: "rgba(10,23,20,0.10)" }}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: "55%",
            background: `linear-gradient(90deg, ${TEAL} 0%, ${TEAL_LIGHT} 100%)`,
          }}
        />
        <div
          className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow"
          style={{ left: "55%", background: TEAL }}
        />
      </div>
      <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.06em] text-[color:rgba(10,23,20,0.55)]">
        <span>Empty</span>
        <span>Charged</span>
      </div>
      <button
        className="mt-6 w-full rounded-full py-3 text-[14px] font-semibold tracking-[0.01em]"
        style={{ background: INK, color: "#fff" }}
      >
        Plan my day →
      </button>
      <p className="mt-3 text-[12px] text-[color:rgba(10,23,20,0.55)]">
        That&rsquo;s the whole input. The AI does the rest.
      </p>
    </div>
  );
}
