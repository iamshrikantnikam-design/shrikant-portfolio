import { Container } from "../../../components/Container";
import { InteractivePrototype } from "../_prototype/InteractivePrototype";

/* ────────────────────────────────────────────────────────────────────────────
   MoodPlan case study — prototype section.

   Hosts the interactive in-page prototype. Five real screens wired with
   React state — mood, energy, tasks, low-energy detection, points all
   work. No external Figma needed.
──────────────────────────────────────────────────────────────────────────── */

const TEAL_LIGHT = "#7DE5DA";
const TEAL = "#22B5A6";

export function MoodPlanPrototype() {
  return (
    <section
      id="prototype"
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
              The interactive prototype
            </p>
            <h2 className="mt-6 text-[36px] font-black leading-[1.05] tracking-[-0.025em] sm:text-[48px] md:text-[64px] lg:text-[72px]">
              Tap through it.{" "}
              <span style={{ color: TEAL_LIGHT }}>
                Run a morning yourself.
              </span>
            </h2>
            <p className="mt-6 max-w-[680px] text-[16px] leading-[1.7] text-white/65 md:text-[17px]">
              A real, working prototype — not a recording. Tap a mood, drag
              your energy, watch the AI rebuild your day. Drop the energy
              under 40 to see the low-energy mode trigger automatically.
              Add a task. Tap a task to mark it done and earn points. Every
              state change is real React state.
            </p>
          </div>
        </div>

        {/* Try-it hints */}
        <div className="mt-10 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-10">
            <div className="flex flex-wrap gap-3 text-[12px] text-white/60">
              <Hint label="① Pick a mood" />
              <Hint label="② Drag energy" />
              <Hint label="③ Plan my day" />
              <Hint label="④ Tap tasks to complete" />
              <Hint label="⑤ Try energy &lt; 40" />
            </div>
          </div>
        </div>

        {/* Prototype stage */}
        <div className="mt-12 grid grid-cols-12 gap-6 md:mt-16">
          <div className="col-span-12 md:col-span-10 md:col-start-2">
            <div
              className="relative overflow-hidden rounded-[28px] border p-6 md:p-10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(125,229,218,0.06) 0%, rgba(86,80,217,0.04) 60%, rgba(125,229,218,0.03) 100%)",
                borderColor: "rgba(125,229,218,0.18)",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full"
                style={{
                  background: "rgba(125,229,218,0.10)",
                  filter: "blur(60px)",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full"
                style={{
                  background: "rgba(86,80,217,0.10)",
                  filter: "blur(60px)",
                }}
              />

              <div className="relative">
                <InteractivePrototype />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Hint({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full border px-3 py-1.5 text-[12px] font-medium"
      style={{
        background: "rgba(255,255,255,0.025)",
        borderColor: "rgba(255,255,255,0.10)",
        color: "rgba(255,255,255,0.7)",
      }}
    >
      {label}
    </span>
  );
}
