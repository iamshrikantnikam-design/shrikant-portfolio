import { Container } from "../../../components/Container";

/* ────────────────────────────────────────────────────────────────────────────
   MoodPlan case study — tension + hook section.

   The pivot from problem to solution. Names the core tension (structure vs
   human) and ends on a single open question that the rest of the case
   study answers.
──────────────────────────────────────────────────────────────────────────── */

const TEAL_LIGHT = "#7DE5DA";
const TEAL = "#22B5A6";

export function MoodPlanTension() {
  return (
    <section
      id="tension"
      className="relative isolate overflow-hidden bg-[#04130F] py-32 text-white md:py-40"
    >
      {/* hairline divider */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(125,229,218,0.15) 50%, transparent)",
        }}
      />

      <Container className="relative">
        {/* Eyebrow + heading */}
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
              The tension
            </p>

            <h2 className="mt-6 text-[36px] font-black leading-[1.05] tracking-[-0.025em] sm:text-[48px] md:text-[64px] lg:text-[72px]">
              The tension this product had to{" "}
              <span style={{ color: TEAL_LIGHT }}>resolve.</span>
            </h2>
          </div>
        </div>

        {/* Two-column tension */}
        <div className="mt-14 grid grid-cols-12 gap-6 md:mt-20">
          <div className="col-span-12 md:col-span-6">
            <TensionCard
              title="People need structure"
              tone="amber"
              body="Without a frame, the day scatters. Decisions burn energy that should have gone into the work."
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <TensionCard
              title="But rigid structure breaks"
              tone="teal"
              body="The moment a real human shows up — tired, anxious, off — the rigid plan stops helping and starts accusing."
            />
          </div>
        </div>

        {/* Resolution sentence */}
        <div className="mt-12 grid grid-cols-12 gap-6">
          <p className="col-span-12 text-[20px] font-semibold leading-[1.5] tracking-[-0.01em] text-white/80 sm:text-[22px] md:col-span-10 md:col-start-2 md:text-[24px]">
            Most productivity tools solve for structure and ignore the
            human.{" "}
            <span style={{ color: TEAL_LIGHT }}>
              MoodPlan does the opposite —
            </span>{" "}
            it puts the human first and lets the AI carry the rigidity.
          </p>
        </div>

        {/* The hook question */}
        <div className="mt-24 grid grid-cols-12 gap-6 md:mt-32">
          <div className="col-span-12 md:col-span-10 md:col-start-2">
            <p
              className="mb-8 text-[12px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: "rgba(125,229,218,0.65)" }}
            >
              Which led to one question
            </p>

            <div
              className="relative overflow-hidden rounded-[28px] border p-10 md:p-14"
              style={{
                background:
                  "linear-gradient(135deg, rgba(125,229,218,0.08) 0%, rgba(86,80,217,0.06) 60%, rgba(125,229,218,0.04) 100%)",
                borderColor: "rgba(125,229,218,0.20)",
              }}
            >
              {/* corner glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full"
                style={{
                  background: "rgba(125,229,218,0.12)",
                  filter: "blur(60px)",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full"
                style={{
                  background: "rgba(86,80,217,0.14)",
                  filter: "blur(60px)",
                }}
              />

              <p
                className="relative text-[10px] font-bold uppercase tracking-[0.22em]"
                style={{ color: TEAL }}
              >
                The question everything was built around
              </p>

              <p className="relative mt-6 text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-white sm:text-[36px] md:text-[44px] lg:text-[52px]">
                What if a planner{" "}
                <span style={{ color: TEAL_LIGHT }}>
                  started every day by asking how you feel
                </span>{" "}
                — and changed your day based on the answer?
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────── helpers */

function TensionCard({
  title,
  body,
  tone,
}: {
  title: string;
  body: string;
  tone: "amber" | "teal";
}) {
  const accent = tone === "amber" ? "#F2C26B" : TEAL_LIGHT;
  const tint =
    tone === "amber" ? "rgba(242,194,107,0.10)" : "rgba(125,229,218,0.10)";
  return (
    <div
      className="relative h-full overflow-hidden rounded-[24px] border p-8 backdrop-blur-md md:p-10"
      style={{
        background: `linear-gradient(180deg, ${tint} 0%, rgba(255,255,255,0.015) 100%)`,
        borderColor:
          tone === "amber"
            ? "rgba(242,194,107,0.22)"
            : "rgba(125,229,218,0.22)",
      }}
    >
      <p
        className="text-[10px] font-bold uppercase tracking-[0.18em]"
        style={{ color: accent }}
      >
        {tone === "amber" ? "On one hand" : "On the other"}
      </p>
      <h4 className="mt-4 text-[24px] font-bold leading-[1.2] tracking-[-0.015em] text-white md:text-[28px]">
        {title}
      </h4>
      <p className="mt-4 text-[15px] leading-[1.65] text-white/65 md:text-[16px]">
        {body}
      </p>
    </div>
  );
}
