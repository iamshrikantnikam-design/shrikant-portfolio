import { Container } from "../../../components/Container";

/* ────────────────────────────────────────────────────────────────────────────
   MoodPlan case study — principles + reward + identity section.

   Sits AFTER MoodPlanScreens. Order:
     • Three design principles (colour / AI transparency / rest)
         each with: number kicker, headline, body, visual proof element
     • Reward system block — narrative + black contrast card with 340 pts
     • "What MoodPlan is not" closing
──────────────────────────────────────────────────────────────────────────── */

const TEAL_LIGHT = "#7DE5DA";
const TEAL = "#22B5A6";
const AMBER = "#F2C26B";
const PURPLE = "#5650D9";
const PURPLE_LIGHT = "#C2BCFF";
const INK = "#0A1714";

export function MoodPlanPrinciples() {
  return (
    <section
      id="principles"
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
        {/* ── Three principles intro ───────────────────── */}
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
              The three principles
            </p>
            <h2 className="mt-6 text-[36px] font-black leading-[1.05] tracking-[-0.025em] sm:text-[48px] md:text-[64px] lg:text-[72px]">
              Every screen, every interaction was tested against{" "}
              <span style={{ color: TEAL_LIGHT }}>three principles.</span>
            </h2>
            <p className="mt-6 max-w-[640px] text-[16px] leading-[1.7] text-white/65 md:text-[17px]">
              If a decision didn&rsquo;t match at least one, it was cut.
            </p>
          </div>
        </div>

        {/* Principle 01 — Colour communicates */}
        <PrincipleBlock
          number="01"
          accent={PURPLE_LIGHT}
          accentSoft="rgba(86,80,217,0.10)"
          accentBorder="rgba(86,80,217,0.22)"
          eyebrow="Colour communicates before language does"
          headline={
            <>
              A user should be able to{" "}
              <span style={{ color: PURPLE_LIGHT }}>
                read their day without reading a single word.
              </span>
            </>
          }
          body={
            <>
              <Paragraph>
                Purple means deep focus — hard work, your best hours.
                Amber means medium — works at most points in the day.
                Teal means easy win — low effort, right for the evening.
              </Paragraph>
              <Paragraph>
                This isn&rsquo;t a colour preference.{" "}
                <span className="font-semibold text-white">
                  It&rsquo;s a language.
                </span>{" "}
                The same colours show up on the check-in, the timeline,
                the task screen, the weekly view. Learn it on day one.
                Read it without thinking by day three.
              </Paragraph>
              <Paragraph>
                The legend bar teaches the language once, then fades
                into habit. That&rsquo;s the right job for a legend —
                a teacher, not a crutch.
              </Paragraph>
            </>
          }
          proof={<ColourLegendProof />}
          proofLabel="The colour language"
        />

        {/* Principle 02 — AI shows reasoning */}
        <PrincipleBlock
          number="02"
          accent={TEAL_LIGHT}
          accentSoft="rgba(125,229,218,0.10)"
          accentBorder="rgba(125,229,218,0.22)"
          eyebrow="The AI must show its reasoning"
          headline={
            <>
              Anything the AI does on your behalf,{" "}
              <span style={{ color: TEAL_LIGHT }}>
                it has to explain in plain language.
              </span>
            </>
          }
          body={
            <>
              <Paragraph>
                Apps that act for you without explaining feel scary. You
                open it. Something has moved. You don&rsquo;t know why.
                You feel less in control than before.
              </Paragraph>
              <Paragraph>
                MoodPlan keeps the AI&rsquo;s reasoning visible. On the
                day view:{" "}
                <em className="text-white/85">
                  &ldquo;Moved 2 tasks. Deep work at 11:30am — your peak
                  window.&rdquo;
                </em>{" "}
                On task creation:{" "}
                <em className="text-white/85">
                  &ldquo;Scheduled tomorrow 9–10:30am — your next focus
                  window.&rdquo;
                </em>
              </Paragraph>
              <Paragraph>
                Not a notification. Not a badge. A plain sentence right
                where you&rsquo;re looking, before confusion can land.
              </Paragraph>
            </>
          }
          proof={<ReasoningProof />}
          proofLabel="What the AI tells you"
        />

        {/* Principle 03 — Rest is productive */}
        <PrincipleBlock
          number="03"
          accent={AMBER}
          accentSoft="rgba(242,194,107,0.10)"
          accentBorder="rgba(242,194,107,0.25)"
          eyebrow="Rest is productive · The app must believe this too"
          headline={
            <>
              Some days the most productive thing you can do is{" "}
              <span style={{ color: AMBER }}>rest.</span>
            </>
          }
          body={
            <>
              <Paragraph>
                This was the hardest principle to hold. Productivity
                design pulls toward more — more tasks, more streaks,
                more accountability. The whole category sells the
                promise that doing more is the goal.
              </Paragraph>
              <Paragraph>
                MoodPlan starts from a different place.{" "}
                <span className="font-semibold text-white">
                  Rest isn&rsquo;t failure. It&rsquo;s a real,
                  point-earning, schedule-worthy outcome.
                </span>
              </Paragraph>
              <Paragraph>
                Rest blocks sit on the timeline as scheduled tasks.
                Low energy mode earns points. &ldquo;Rest fully&rdquo;
                is a real option, equal to &ldquo;Start my light
                day.&rdquo; And the first thing the app says when
                you&rsquo;re low isn&rsquo;t push through. It&rsquo;s:{" "}
                <span style={{ color: AMBER }} className="font-semibold">
                  &ldquo;That&rsquo;s okay.&rdquo;
                </span>
              </Paragraph>
            </>
          }
          proof={<RestProof />}
          proofLabel="Low energy mode"
        />

        {/* ── Reward system ───────────────────────────── */}
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
              The reward system
            </p>
            <h3 className="mt-6 text-[28px] font-black leading-[1.1] tracking-[-0.02em] sm:text-[36px] md:text-[48px]">
              Where behaviour change meets the{" "}
              <span style={{ color: TEAL_LIGHT }}>business model.</span>
            </h3>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-7">
            <Paragraph>
              MoodPlan has a points system threaded through every
              screen. Check in — earn points. Finish a task — earn
              points. Keep a streak — earn points.{" "}
              <span className="font-semibold text-white">
                Rest on a low day — earn points.
              </span>
            </Paragraph>
            <Paragraph>
              Points become real vouchers with Swiggy, Zepto, Myntra.
              100 points = ₹10. The 340 points you see across these
              screens = a ₹34 voucher, ready to use.
            </Paragraph>
            <Paragraph>
              This isn&rsquo;t gamification for its own sake. It&rsquo;s
              a loop that pays everyone back. Users get real value for
              showing up. Brands get an engaged audience. MoodPlan gets
              users who return because{" "}
              <span style={{ color: TEAL_LIGHT }} className="font-semibold">
                their self-care is paying them back.
              </span>
            </Paragraph>
          </div>

          <div className="col-span-12 md:col-span-5">
            <RewardCard />
          </div>
        </div>

        {/* ── Point of view closer ────────────────────── */}
        <div className="mt-32 grid grid-cols-12 gap-6 md:mt-40">
          <p className="col-span-12 text-[24px] font-bold leading-[1.25] tracking-[-0.015em] sm:text-[32px] md:col-span-10 md:col-start-2 md:text-[40px]">
            <span className="text-white/60">A planner with a point of view:</span>{" "}
            <span style={{ color: TEAL_LIGHT }}>
              the person matters more than the plan.
            </span>
          </p>
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────── shared paragraph */

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-5 text-[16px] leading-[1.7] text-white/75 first:mt-0 md:text-[17px]">
      {children}
    </p>
  );
}

/* ─────────────────────────────────────────────── principle block + proofs */

function PrincipleBlock({
  number,
  accent,
  accentSoft,
  accentBorder,
  eyebrow,
  headline,
  body,
  proof,
  proofLabel,
}: {
  number: string;
  accent: string;
  accentSoft: string;
  accentBorder: string;
  eyebrow: string;
  headline: React.ReactNode;
  body: React.ReactNode;
  proof: React.ReactNode;
  proofLabel: string;
}) {
  return (
    <div className="mt-32 md:mt-40">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-10">
          <div className="flex items-baseline gap-4">
            <span
              className="text-[40px] font-black leading-none tracking-[-0.03em] md:text-[56px]"
              style={{ color: accent, opacity: 0.85 }}
            >
              {number}
            </span>
            <span
              className="text-[12px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: accent }}
            >
              Principle · {eyebrow}
            </span>
          </div>
          <h3 className="mt-6 text-[28px] font-black leading-[1.1] tracking-[-0.02em] sm:text-[36px] md:text-[48px] lg:text-[52px]">
            {headline}
          </h3>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-12 gap-6 md:mt-16">
        <div className="col-span-12 md:col-span-7">{body}</div>
        <div className="col-span-12 md:col-span-5">
          <div
            className="relative h-full overflow-hidden rounded-[24px] border p-8 backdrop-blur-md md:p-9"
            style={{
              background: `linear-gradient(180deg, ${accentSoft} 0%, rgba(255,255,255,0.01) 100%)`,
              borderColor: accentBorder,
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full"
              style={{ background: `${accent}22`, filter: "blur(48px)" }}
            />
            <p
              className="relative text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{ color: accent }}
            >
              {proofLabel}
            </p>
            <div className="relative mt-5">{proof}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ColourLegendProof() {
  const rows = [
    { color: PURPLE, light: PURPLE_LIGHT, label: "Deep focus", note: "Hard. Best hours." },
    { color: "#D8A246", light: AMBER, label: "Medium", note: "Manageable. Mid-day." },
    { color: TEAL, light: TEAL_LIGHT, label: "Easy win", note: "Low effort. Evening or low days." },
  ];
  return (
    <ul className="space-y-3">
      {rows.map((r) => (
        <li
          key={r.label}
          className="flex items-center gap-3 rounded-2xl border px-4 py-3"
          style={{
            background: "rgba(255,255,255,0.025)",
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          <span
            aria-hidden
            className="inline-block h-3 w-3 flex-shrink-0 rounded-full"
            style={{ background: `linear-gradient(135deg, ${r.color}, ${r.light})` }}
          />
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-white">{r.label}</p>
            <p className="text-[11px] text-white/55">{r.note}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function ReasoningProof() {
  const lines = [
    "MoodPlan moved 2 tasks. Deep work placed at 11:30am — your peak window.",
    "Scheduled in your next deep focus window — tomorrow 9–10:30am.",
    "3 deep tasks moved to tomorrow.",
  ];
  return (
    <ul className="space-y-3">
      {lines.map((l, i) => (
        <li
          key={i}
          className="flex gap-3 rounded-2xl border px-4 py-3"
          style={{
            background: "rgba(0,0,0,0.25)",
            borderColor: "rgba(125,229,218,0.18)",
          }}
        >
          <span
            aria-hidden
            className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full text-[10px] font-bold"
            style={{ background: "rgba(125,229,218,0.18)", color: TEAL_LIGHT }}
          >
            ✦
          </span>
          <p className="text-[13px] leading-[1.5] text-white/80">{l}</p>
        </li>
      ))}
    </ul>
  );
}

function RestProof() {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{
        background: "rgba(0,0,0,0.25)",
        borderColor: "rgba(242,194,107,0.18)",
      }}
    >
      <p className="text-[18px] font-bold leading-[1.25] text-white">
        That&rsquo;s okay.
      </p>
      <p className="mt-2 text-[13px] leading-[1.55] text-white/60">
        3 deep tasks moved to tomorrow. Today is set up for recovery.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <button
          className="rounded-full py-2.5 text-[12px] font-semibold tracking-[0.01em]"
          style={{ background: AMBER, color: INK }}
        >
          Start my light day
        </button>
        <button
          className="rounded-full border py-2.5 text-[12px] font-semibold tracking-[0.01em] text-white/85"
          style={{ borderColor: "rgba(255,255,255,0.25)" }}
        >
          Rest fully
        </button>
      </div>
      <p className="mt-4 text-[11px]" style={{ color: AMBER }}>
        + 30 points · Rest counts.
      </p>
    </div>
  );
}

function RewardCard() {
  return (
    <div
      className="relative h-full overflow-hidden rounded-[24px] p-8 md:p-10"
      style={{
        background: "#020907",
        boxShadow: "0 30px 60px -20px rgba(0,0,0,0.7)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <p
        className="text-[10px] font-bold uppercase tracking-[0.2em]"
        style={{ color: AMBER }}
      >
        Your reward balance
      </p>
      <div className="mt-5 flex items-baseline gap-3">
        <span
          className="text-[80px] font-black leading-none tracking-[-0.04em]"
          style={{ color: "#fff" }}
        >
          340
        </span>
        <span className="text-[14px] font-semibold uppercase tracking-[0.08em] text-white/55">
          pts
        </span>
      </div>
      <p className="mt-2 text-[14px] text-white/55">
        ≈ <span className="font-semibold text-white">₹34</span> · ready to
        redeem
      </p>
      <div className="mt-8 grid grid-cols-3 gap-2">
        {["Swiggy", "Zepto", "Myntra"].map((p) => (
          <div
            key={p}
            className="rounded-xl border px-3 py-2 text-center text-[11px] font-semibold tracking-[0.02em] text-white/75"
            style={{ borderColor: "rgba(255,255,255,0.10)" }}
          >
            {p}
          </div>
        ))}
      </div>
      <div
        className="mt-6 rounded-xl border px-4 py-3"
        style={{
          background: "rgba(242,194,107,0.06)",
          borderColor: "rgba(242,194,107,0.18)",
        }}
      >
        <p className="text-[11px] uppercase tracking-[0.1em] text-white/55">
          Conversion
        </p>
        <p className="mt-1 text-[14px] font-semibold text-white">
          100 pts <span className="text-white/45">·</span> ₹10
        </p>
      </div>
      <p className="mt-6 text-[12px] leading-[1.55] text-white/55">
        Even rest earns. The closed loop that keeps users coming back —
        without a single guilt-trip.
      </p>
    </div>
  );
}
