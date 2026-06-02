import { Container } from "../../../components/Container";

/* ────────────────────────────────────────────────────────────────────────────
   MoodPlan case study — research / insights section.

   Long-read structure:
     • Eyebrow + headline: "I didn't start with assumptions…"
     • Intro narrative (3 paragraphs)
     • Methodology card — "Who I spoke to" (5 ppl, ages, cities, apps)
     • The reveal — "They talked about themselves failing"
     • Three detailed insight blocks (energy / morning / guilt), each with:
         number kicker, big headline, body, user quote, design-unlock card
     • Closing reframe — "You are not consistent. You are human."

   Each insight block uses a different accent (teal / amber / purple) so they
   read as distinct chapters within the section.
──────────────────────────────────────────────────────────────────────────── */

const TEAL_LIGHT = "#7DE5DA";
const TEAL = "#22B5A6";
const AMBER = "#F2C26B";
const PURPLE_LIGHT = "#C2BCFF";
const PURPLE = "#5650D9";

export function MoodPlanResearch() {
  return (
    <section
      id="research"
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
        {/* ── Eyebrow + headline ──────────────────────── */}
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
              03 — Research
            </p>

          </div>
        </div>

        {/* ── Intro narrative ─────────────────────────── */}
        <div className="mt-16 grid grid-cols-12 gap-6 md:mt-20">
          <div className="col-span-12 md:col-span-8">
            <Paragraph>
              Before I sketched a screen, I wanted to know why people
              who want to be productive still fail every week. So I
              talked to people —{" "}
              <span className="font-semibold text-white">
                not as users. As people.
              </span>
            </Paragraph>
          </div>
        </div>

        {/* ── Methodology card ────────────────────────── */}
        <div className="mt-16 grid grid-cols-12 gap-6 md:mt-20">
          <div className="col-span-12 md:col-span-10 md:col-start-2">
            <MethodologyCard />
          </div>
        </div>

        {/* ── The reveal ──────────────────────────────── */}
        <div className="mt-16 grid grid-cols-12 gap-6 md:mt-20">
          <div className="col-span-12 md:col-span-8">
            <Paragraph>
              No survey. I asked one question:{" "}
              <span className="italic text-white">
                tell me about a day when you had a full list and did
                nothing on it.
              </span>
            </Paragraph>
            <Paragraph>The answers surprised me.</Paragraph>
          </div>
        </div>

        {/* Big pull line — the reveal */}
        <div className="mt-12 grid grid-cols-12 gap-6 md:mt-16">
          <p className="col-span-12 text-[28px] font-bold leading-[1.2] tracking-[-0.02em] sm:text-[36px] md:col-span-10 md:col-start-2 md:text-[44px]">
            <span className="text-white/55">
              They didn&rsquo;t talk about the apps failing.
            </span>{" "}
            <span style={{ color: TEAL_LIGHT }}>
              They talked about themselves failing.
            </span>
          </p>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <Paragraph>
              Everyone described the same arc. A plan made Sunday. A
              morning that didn&rsquo;t match it. By 4pm, the list was
              untouched and the feeling was{" "}
              <span className="font-semibold text-white">shame</span> —
              the kind that makes you delete the app and try a new one.
            </Paragraph>
            <Paragraph>
              The problem wasn&rsquo;t a missing feature. It was a
              mismatch between how these tools work and how human energy
              actually works.
            </Paragraph>
          </div>
        </div>

        {/* ── Insight 01 — Energy has a shape ──────────── */}
        <InsightBlock
          number="01"
          accent={TEAL_LIGHT}
          accentSoft="rgba(125,229,218,0.10)"
          accentBorder="rgba(125,229,218,0.22)"
          kicker="Energy, not time"
          headline={
            <>
              Energy has a shape.{" "}
              <span style={{ color: TEAL_LIGHT }}>
                Productivity tools pretend it doesn&rsquo;t.
              </span>
            </>
          }
          body={
            <Paragraph>
              Sharp in the morning, a dip after lunch, small recovery
              later. That&rsquo;s biology — and yet no calendar or
              planner knows that 2pm is a different hour than 10am.
              They schedule your hardest task at your worst moment.
            </Paragraph>
          }
          quote={{
            text: "Some days I wake up and I know it's going to be a bad day for deep work. But my apps show me the same list.",
            name: "Priya",
            meta: "22 · BMS student, Mumbai",
          }}
          unlockTitle="The AI as biological ally"
          unlockBody={
            <>
              The AI doesn&rsquo;t just sort by deadline. It tags task
              energy as{" "}
              <span className="font-semibold text-white">deep focus</span>,{" "}
              <span className="font-semibold text-white">medium</span>, or{" "}
              <span className="font-semibold text-white">easy</span> —
              and matches it to the energy you have today. Hard work in
              your sharp window. Admin in the dip. Easy wins in the
              evening.
            </>
          }
        />

        {/* ── Insight 02 — Morning is the leverage point ─ */}
        <InsightBlock
          number="02"
          accent={AMBER}
          accentSoft="rgba(242,194,107,0.10)"
          accentBorder="rgba(242,194,107,0.25)"
          kicker="The morning window"
          headline={
            <>
              The morning is the{" "}
              <span style={{ color: AMBER }}>highest-leverage moment</span>{" "}
              nobody is designing for.
            </>
          }
          body={
            <Paragraph>
              People with their best days didn&rsquo;t have more time —
              they had a clear picture of the day before it started.
              People with their worst days opened their phone, felt
              overwhelmed, and never got their direction back.
            </Paragraph>
          }
          quote={{
            text: "If I don't plan in the morning, it doesn't happen. But opening five apps at 8am is too much. So I don't.",
            name: "Rohan",
            meta: "24 · Junior developer, Pune",
          }}
          unlockTitle="S1 — the morning check-in is the entire product"
          unlockBody={
            <>
              Thirty seconds. Mood. Energy. Done. The AI does the rest.
              No decisions from the user when decisions cost the most.{" "}
              <span className="font-semibold text-white">
                The check-in isn&rsquo;t a feature. It&rsquo;s the
                whole product.
              </span>
            </>
          }
        />

        {/* ── Insight 03 — Apps make people feel bad ─── */}
        <InsightBlock
          number="03"
          accent={PURPLE_LIGHT}
          accentSoft="rgba(86,80,217,0.12)"
          accentBorder="rgba(86,80,217,0.25)"
          kicker="Guilt, not complexity"
          headline={
            <>
              Gen Z doesn&rsquo;t abandon apps because they&rsquo;re hard.{" "}
              <span style={{ color: PURPLE_LIGHT }}>
                They abandon them because they feel bad.
              </span>
            </>
          }
          body={
            <Paragraph>
              When I asked why people stopped using an app, the answer
              was rarely complexity. It was:{" "}
              <em>the app made me feel like I was failing it.</em> Apps
              that make people feel guilty don&rsquo;t get engagement —
              they get deleted.
            </Paragraph>
          }
          quote={{
            text: "Every app I've tried makes me feel like I'm failing it. Not that it's failing me.",
            name: "Meera",
            meta: "23 · Graphic design student, Nashik",
          }}
          unlockTitle="S5 — low energy mode, where rest is a legitimate outcome"
          unlockBody={
            <>
              When you check in with low energy, the app doesn&rsquo;t
              show you the full list and hope. It says: that&rsquo;s
              okay. Moves hard tasks to tomorrow. Shows only what
              you can do. Gives points for resting.{" "}
              <span className="font-semibold text-white">
                Rest counts as a real outcome — not a failure.
              </span>
            </>
          }
        />

        {/* ── Closing reframe ─────────────────────────── */}
        <div className="mt-32 grid grid-cols-12 gap-6 md:mt-40">
          <p className="col-span-12 text-[28px] font-bold leading-[1.2] tracking-[-0.02em] sm:text-[36px] md:col-span-10 md:col-start-2 md:text-[48px]">
            <span className="text-white/55">You are not consistent.</span>{" "}
            <span style={{ color: TEAL_LIGHT }}>You are human.</span>{" "}
            <span className="text-white/55">
              The app should absorb that — not punish you for it.
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

/* ─────────────────────────────────────────────── methodology card */

function MethodologyCard() {
  const stats = [
    { value: "5", label: "People interviewed" },
    { value: "21–26", label: "Age range" },
    { value: "3", label: "Cities · Pune, Mumbai, Nashik" },
    { value: "2+", label: "Productivity apps each" },
  ];
  return (
    <div
      className="relative overflow-hidden rounded-[24px] border p-8 backdrop-blur-md md:p-10"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
        borderColor: "rgba(255,255,255,0.10)",
      }}
    >
      <p
        className="text-[10px] font-bold uppercase tracking-[0.18em]"
        style={{ color: TEAL }}
      >
        Who I spoke to
      </p>

      <h4 className="mt-4 max-w-[640px] text-[20px] font-semibold leading-[1.4] tracking-[-0.01em] text-white md:text-[22px]">
        Five people. Students, early-career, freelancers — all
        already using two productivity apps and still feeling behind.
      </h4>

      <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-1">
            <span className="text-[36px] font-black leading-none tracking-[-0.03em] text-white md:text-[44px]">
              {s.value}
            </span>
            <span className="text-[11px] uppercase tracking-[0.1em] text-white/55">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── insight block */

type Quote = { text: string; name: string; meta: string };

function InsightBlock({
  number,
  accent,
  accentSoft,
  accentBorder,
  kicker,
  headline,
  body,
  quote,
  unlockTitle,
  unlockBody,
}: {
  number: string;
  accent: string;
  accentSoft: string;
  accentBorder: string;
  kicker: string;
  headline: React.ReactNode;
  body: React.ReactNode;
  quote: Quote;
  unlockTitle: string;
  unlockBody: React.ReactNode;
}) {
  return (
    <div className="mt-32 md:mt-40">
      {/* eyebrow row: number + kicker */}
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
              Research insight · {kicker}
            </span>
          </div>

          <h3 className="mt-6 text-[28px] font-black leading-[1.1] tracking-[-0.02em] sm:text-[36px] md:text-[48px] lg:text-[56px]">
            {headline}
          </h3>
        </div>
      </div>

      {/* body */}
      <div className="mt-10 grid grid-cols-12 gap-6 md:mt-12">
        <div className="col-span-12 md:col-span-8">{body}</div>
      </div>

      {/* quote + unlock side-by-side on desktop */}
      <div className="mt-12 grid grid-cols-12 gap-6 md:mt-16">
        <div className="col-span-12 md:col-span-6">
          <InsightQuote {...quote} accent={accent} />
        </div>
        <div className="col-span-12 md:col-span-6">
          <UnlockCard
            accent={accent}
            accentSoft={accentSoft}
            accentBorder={accentBorder}
            title={unlockTitle}
            body={unlockBody}
          />
        </div>
      </div>
    </div>
  );
}

function InsightQuote({
  text,
  name,
  meta,
  accent,
}: Quote & { accent: string }) {
  return (
    <figure
      className="relative h-full overflow-hidden rounded-[24px] border p-8 backdrop-blur-md md:p-10"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
        borderColor: "rgba(255,255,255,0.10)",
      }}
    >
      <span
        aria-hidden
        className="absolute right-6 top-2 select-none text-[120px] font-black leading-none md:right-8 md:top-3 md:text-[160px]"
        style={{ color: `${accent}1A` }}
      >
        &ldquo;
      </span>

      <blockquote className="relative">
        <p className="text-[20px] font-semibold italic leading-[1.4] tracking-[-0.01em] text-white md:text-[22px]">
          &ldquo;{text}&rdquo;
        </p>
      </blockquote>

      <figcaption className="relative mt-8 flex items-center gap-3">
        <span
          aria-hidden
          className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full text-[14px] font-bold"
          style={{ background: `${accent}28`, color: accent }}
        >
          {name.charAt(0)}
        </span>
        <div className="text-[14px] leading-tight">
          <span className="font-semibold text-white">{name}</span>
          <span className="ml-2 text-white/55">{meta}</span>
        </div>
      </figcaption>
    </figure>
  );
}

function UnlockCard({
  accent,
  accentSoft,
  accentBorder,
  title,
  body,
}: {
  accent: string;
  accentSoft: string;
  accentBorder: string;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <div
      className="relative h-full overflow-hidden rounded-[24px] border p-8 backdrop-blur-md md:p-10"
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
        What this unlocked in the design
      </p>

      <h4 className="relative mt-4 text-[20px] font-bold leading-[1.25] tracking-[-0.015em] text-white md:text-[22px]">
        {title}
      </h4>

      <p className="relative mt-4 text-[15px] leading-[1.65] text-white/70 md:text-[16px]">
        {body}
      </p>
    </div>
  );
}
