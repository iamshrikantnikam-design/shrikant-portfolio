import { Container } from "../../../components/Container";

/* ────────────────────────────────────────────────────────────────────────────
   MoodPlan case study — screen details section.

   Five product screens, each with a phone-frame mockup (real screen export
   at /case-study/moodplan/screens/sX-*.png — falls back to a labelled cream
   placeholder if the file isn't there yet) and detailed callouts:
     • Screen ID + name + tagline
     • What it does (body)
     • Key elements (bulleted)
     • Design choice (one-line callout)

   Layout alternates left/right between rows so the reading rhythm stays
   active. Sits between MoodPlanSolution ("How it works") and the
   principles / reward / identity section.
──────────────────────────────────────────────────────────────────────────── */

const TEAL_LIGHT = "#7DE5DA";
const TEAL = "#22B5A6";
const AMBER = "#F2C26B";
const PURPLE = "#5650D9";
const PURPLE_LIGHT = "#C2BCFF";
const CREAM = "#EFE7D2";
const INK = "#0A1714";

type ScreenSpec = {
  id: string;
  name: string;
  tagline: string;
  accent: string;
  imgSrc: string;
  imgAlt: string;
  body: React.ReactNode;
  elements: { dot: string; label: string; note: string }[];
  designChoice: React.ReactNode;
};

const SCREENS: ScreenSpec[] = [
  {
    id: "S1",
    name: "Home · Morning check-in",
    tagline: "The 30-second moment that sets the entire day.",
    accent: TEAL_LIGHT,
    imgSrc: "/case-study/moodplan/screens/s1-home.png",
    imgAlt: "MoodPlan home screen — Good morning Priya, mood and energy check-in, AI sorted day, 340 reward points",
    body: (
      <>
        The first thing the app asks is the only question that matters:
        how are you, today, right now? A mood pill (Great, Okay, Low,
        Anxious) and an energy gauge — that&rsquo;s the entire input. The
        AI takes those two signals and rebuilds the day around them
        before the user has even put the phone down.
      </>
    ),
    elements: [
      { dot: TEAL, label: "Mood selector", note: "Five named states. Tap-once interaction." },
      { dot: PURPLE_LIGHT, label: "Energy gauge", note: "68% with semicircle visual — quick read, no math." },
      { dot: AMBER, label: "AI-sorted day", note: "Tasks already arranged by deep focus / medium / easy." },
      { dot: "#fff", label: "Reward + streak strip", note: "340 pts ≈ ₹34, 7-day streak. Real-world value, visible always." },
    ],
    designChoice: (
      <>
        The greeting uses the user&rsquo;s name (&ldquo;Good morning,
        Priya&rdquo;). It&rsquo;s a small thing. It changes the tone of
        the entire app from &ldquo;tool&rdquo; to{" "}
        <span className="font-semibold text-white">someone who knows you.</span>
      </>
    ),
  },
  {
    id: "S2",
    name: "Today · Day view",
    tagline: "The plan, after the AI has read the morning.",
    accent: PURPLE_LIGHT,
    imgSrc: "/case-study/moodplan/screens/s2-day.png",
    imgAlt: "MoodPlan today screen — energy key legend, AI reasoning callout, timeline with Now indicator on Design homepage wireframe",
    body: (
      <>
        The day view is what the AI built. Tasks are colour-coded by
        energy demand and dropped onto a vertical timeline. A &ldquo;Now&rdquo;
        marker tracks where the user is right now — and the AI explains
        every choice it made above the timeline, in plain language.
      </>
    ),
    elements: [
      { dot: PURPLE_LIGHT, label: "Energy key legend", note: "Three swatches teaching the colour language once." },
      { dot: TEAL_LIGHT, label: "AI reasoning callout", note: "&ldquo;MoodPlan moved 2 tasks. Deep work at 11:30am — your peak window.&rdquo;" },
      { dot: AMBER, label: "Timeline with Now", note: "Live position indicator + colour-coded task blocks." },
      { dot: "#fff", label: "Reward strip", note: "+10 pts check-in · +5 pts task done · 340 total." },
    ],
    designChoice: (
      <>
        Colour does most of the work — purple for deep focus, amber for
        medium, teal for easy. The user reads the day in two seconds{" "}
        <span className="font-semibold text-white">
          before reading a single word.
        </span>
      </>
    ),
  },
  {
    id: "S3",
    name: "Add a task",
    tagline: "Tell MoodPlan what it needs. It&rsquo;ll find the right time.",
    accent: AMBER,
    imgSrc: "/case-study/moodplan/screens/s3-add-task.png",
    imgAlt: "MoodPlan add a task screen — task name, how long pills, energy needed cards, AI scheduling callout",
    body: (
      <>
        Adding a task isn&rsquo;t scheduling — it&rsquo;s tagging. The
        user picks a duration and an energy demand. The AI does the
        scheduling, and tells the user up-front exactly when and why it
        will land in the day.
      </>
    ),
    elements: [
      { dot: TEAL, label: "How long pills", note: "30m / 1hr / 90m / 2hr+ — coarse on purpose." },
      { dot: PURPLE, label: "Energy needed", note: "Three cards with the same colour language as the day view." },
      { dot: TEAL_LIGHT, label: "AI scheduling preview", note: "&ldquo;Will schedule during your next deep focus window — tomorrow 9–10:30am.&rdquo;" },
      { dot: AMBER, label: "Reward preview", note: "&ldquo;Earn +5 pts toward your ₹34 voucher.&rdquo;" },
    ],
    designChoice: (
      <>
        No date picker. No time picker. The AI commits to a slot and{" "}
        <span className="font-semibold text-white">
          shows its work before the user has to ask
        </span>{" "}
        — removing both friction and anxiety in the same gesture.
      </>
    ),
  },
  {
    id: "S4",
    name: "Insights · Your patterns",
    tagline: "Seven days of you, made legible.",
    accent: TEAL,
    imgSrc: "/case-study/moodplan/screens/s4-insights.png",
    imgAlt: "MoodPlan insights screen — energy vs tasks chart, peak days callout, what MoodPlan noticed list, 2x completion stat",
    body: (
      <>
        The Insights tab is the long-term reward for showing up. Energy
        vs tasks completed across the week. Patterns the user
        didn&rsquo;t know they had. The 2× completion-rate stat that
        proves the whole premise of the app — when tasks match energy,
        twice as many get done.
      </>
    ),
    elements: [
      { dot: PURPLE, label: "Energy vs tasks chart", note: "Side-by-side bars, week at a glance." },
      { dot: PURPLE_LIGHT, label: "Peak day callout", note: "&ldquo;Your peak days are Mon &amp; Tue. MoodPlan front-loads deep work.&rdquo;" },
      { dot: AMBER, label: "Pattern recognition", note: "Best deep work before noon · 1–3pm crash · weekend rest zone." },
      { dot: TEAL, label: "2× completion stat", note: "78% completion this week vs 34% before MoodPlan." },
    ],
    designChoice: (
      <>
        Insights are{" "}
        <span className="font-semibold text-white">descriptive, not prescriptive.</span>{" "}
        The app tells the user what it noticed — never what they should
        change. The behaviour change happens because the user understands
        themselves better, not because the app nags.
      </>
    ),
  },
  {
    id: "S5",
    name: "Low energy mode",
    tagline: "&ldquo;That&rsquo;s okay, Priya.&rdquo; Rest as a legitimate outcome.",
    accent: PURPLE,
    imgSrc: "/case-study/moodplan/screens/s5-low-energy.png",
    imgAlt: "MoodPlan low energy mode — That's okay Priya, Keep light day or Override, easy-only tasks, breathing exercise, Rest fully button",
    body: (
      <>
        When the user reports low energy, the app does not show them
        their normal day and hope they push through. It rebuilds. Heavy
        tasks move to tomorrow. Only the genuinely manageable stays. The
        first sentence on screen is{" "}
        <span className="italic">&ldquo;That&rsquo;s okay.&rdquo;</span>{" "}
        — said by name, not by category.
      </>
    ),
    elements: [
      { dot: PURPLE_LIGHT, label: "Mode banner", note: "&ldquo;Low energy mode is on · 3 deep tasks moved to tomorrow.&rdquo;" },
      { dot: TEAL, label: "What&rsquo;s on today — easy only", note: "Errands, easy emails, a scheduled rest block." },
      { dot: AMBER, label: "Moved to tomorrow", note: "Strikethrough list — visible, accounted for, not lost." },
      { dot: "#fff", label: "Rest fully button", note: "Equally weighted alongside &ldquo;Start my light day.&rdquo; Rest earns +30 pts." },
    ],
    designChoice: (
      <>
        The app says &ldquo;that&rsquo;s okay&rdquo; before it says
        anything else. Most products would treat low energy as a state
        to be fixed.{" "}
        <span className="font-semibold text-white">
          MoodPlan treats it as a legitimate way the day can go
        </span>{" "}
        — and pays the user for it.
      </>
    ),
  },
];

export function MoodPlanScreens() {
  return (
    <section
      id="screens"
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
              Screen details
            </p>
            <h2 className="mt-6 text-[36px] font-black leading-[1.05] tracking-[-0.025em] sm:text-[48px] md:text-[64px] lg:text-[72px]">
              Five screens.{" "}
              <span style={{ color: TEAL_LIGHT }}>One product.</span>
            </h2>
            <p className="mt-6 max-w-[640px] text-[16px] leading-[1.7] text-white/65 md:text-[17px]">
              Every screen is one moment in the user&rsquo;s day — the
              morning check-in, the live timeline, the new-task input, the
              weekly mirror, the hard day. Each one earns its place by
              answering a specific question the research raised.
            </p>
          </div>
        </div>

        {/* Five screen blocks */}
        <div className="mt-20 flex flex-col gap-32 md:mt-28 md:gap-40">
          {SCREENS.map((s, i) => (
            <ScreenBlock key={s.id} spec={s} reverse={i % 2 === 1} />
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────── one screen block */

function ScreenBlock({
  spec,
  reverse,
}: {
  spec: ScreenSpec;
  reverse: boolean;
}) {
  return (
    <article className="grid grid-cols-12 items-start gap-8 md:gap-12">
      {/* Phone frame */}
      <div
        className={[
          "col-span-12 md:col-span-5",
          reverse ? "md:order-2" : "md:order-1",
        ].join(" ")}
      >
        <PhoneFrame
          src={spec.imgSrc}
          alt={spec.imgAlt}
          screenId={spec.id}
          screenName={spec.name}
        />
      </div>

      {/* Copy column */}
      <div
        className={[
          "col-span-12 md:col-span-7",
          reverse ? "md:order-1" : "md:order-2",
        ].join(" ")}
      >
        <div className="flex items-baseline gap-4">
          <span
            className="text-[36px] font-black leading-none tracking-[-0.03em] md:text-[44px]"
            style={{ color: spec.accent, opacity: 0.9 }}
          >
            {spec.id}
          </span>
          <span
            className="text-[12px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: spec.accent }}
          >
            Screen
          </span>
        </div>

        <h3 className="mt-4 text-[26px] font-black leading-[1.15] tracking-[-0.02em] sm:text-[32px] md:text-[40px]">
          {spec.name}
        </h3>
        <p
          className="mt-3 text-[16px] font-semibold italic leading-[1.4] md:text-[18px]"
          style={{ color: spec.accent }}
          dangerouslySetInnerHTML={{ __html: spec.tagline }}
        />

        <p className="mt-6 text-[16px] leading-[1.7] text-white/75 md:text-[17px]">
          {spec.body}
        </p>

        {/* Elements list */}
        <ul className="mt-8 space-y-2">
          {spec.elements.map((el) => (
            <li
              key={el.label}
              className="flex items-start gap-3 rounded-2xl border px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.025)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <span
                aria-hidden
                className="mt-1.5 inline-block h-2 w-2 flex-shrink-0 rounded-full"
                style={{ background: el.dot }}
              />
              <div className="min-w-0">
                <p className="text-[14px] font-bold text-white">{el.label}</p>
                <p
                  className="mt-0.5 text-[13px] leading-[1.5] text-white/60"
                  dangerouslySetInnerHTML={{ __html: el.note }}
                />
              </div>
            </li>
          ))}
        </ul>

        {/* Design choice */}
        <div
          className="mt-6 rounded-2xl border p-5"
          style={{
            background: `${hexToRgba(spec.accent, 0.06)}`,
            borderColor: `${hexToRgba(spec.accent, 0.2)}`,
          }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ color: spec.accent }}
          >
            Design choice
          </p>
          <p className="mt-2 text-[14px] leading-[1.65] text-white/80 md:text-[15px]">
            {spec.designChoice}
          </p>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────── phone frame */

function PhoneFrame({
  src,
  alt,
  screenId,
  screenName,
}: {
  src: string;
  alt: string;
  screenId: string;
  screenName: string;
}) {
  return (
    <div
      className="relative mx-auto w-full max-w-[320px] overflow-hidden rounded-[42px] border p-2 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]"
      style={{
        background: "linear-gradient(180deg, #0a1714 0%, #02100D 100%)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[34px]"
        style={{ background: CREAM }}
      >
        {/* Fallback content — shows when the real export hasn't been dropped in yet */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <span
            className="text-[60px] font-black leading-none tracking-[-0.03em]"
            style={{ color: "rgba(10,23,20,0.18)" }}
          >
            {screenId}
          </span>
          <span
            className="mt-3 text-[13px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: "rgba(10,23,20,0.45)" }}
          >
            {screenName}
          </span>
          <span
            className="mt-6 text-[10px] font-medium uppercase tracking-[0.1em]"
            style={{ color: "rgba(10,23,20,0.30)" }}
          >
            drop screen export to replace
          </span>
        </div>

        {/*
          Real screen export rendered as a CSS background-image. If the file
          isn't there yet, the background is simply transparent and the
          placeholder underneath shows through — no broken-image icon. Once
          the file lands at /case-study/moodplan/screens/sX-*.png, it covers
          the placeholder cleanly.
        */}
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url('${src}')` }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── tiny color util */

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
