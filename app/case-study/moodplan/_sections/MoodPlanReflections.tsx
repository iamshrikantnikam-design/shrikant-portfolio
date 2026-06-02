import { Container } from "../../../components/Container";

/* ────────────────────────────────────────────────────────────────────────────
   MoodPlan case study — reflections / what's next.

   Closes the long-read. Honest about scope (concept, not shipped product).
   Names what I'd change if starting again. Points at where the underlying
   idea — energy as input — goes next. Ends on a personal note.
──────────────────────────────────────────────────────────────────────────── */

const TEAL_LIGHT = "#7DE5DA";
const TEAL = "#22B5A6";
const AMBER = "#F2C26B";
const PURPLE_LIGHT = "#C2BCFF";

export function MoodPlanReflections() {
  return (
    <section
      id="reflections"
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
              05 — Reflections
            </p>
            <h2 className="mt-6 text-[36px] font-black leading-[1.05] tracking-[-0.025em] sm:text-[48px] md:text-[64px] lg:text-[72px]">
              What this project taught me about{" "}
              <span style={{ color: TEAL_LIGHT }}>
                designing for humans, not users.
              </span>
            </h2>
          </div>
        </div>

        {/* Opening — honest disclosure */}
        <div className="mt-16 grid grid-cols-12 gap-6 md:mt-20">
          <div className="col-span-12 md:col-span-8">
            <Paragraph>
              It started as an exercise. It became a system that takes
              someone seriously on the days nothing else does.
            </Paragraph>
            <Paragraph>
              MoodPlan is a concept and prototype — not a shipped
              product. The 340 points, the 7-day streak, the ₹34
              voucher are scenarios. The research, the three principles,
              and the five screens are the part that holds up.
            </Paragraph>
          </div>
        </div>

        {/* What I'd change */}
        <div className="mt-32 grid grid-cols-12 gap-6 md:mt-40">
          <div className="col-span-12 md:col-span-10">
            <p
              className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: AMBER }}
            >
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: AMBER }}
              />
              What I&rsquo;d change if I started again
            </p>
            <h3 className="mt-6 text-[28px] font-black leading-[1.1] tracking-[-0.02em] sm:text-[36px] md:text-[44px]">
              <span style={{ color: AMBER }}>
                Every input field is an invitation
              </span>{" "}
              for the user to stop telling the truth.
            </h3>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <Paragraph>
              The first check-in was four screens. Mood. Energy. Time.
              Tasks. Real users would have quit by screen two. One
              piece of feedback fixed it:{" "}
              <em className="text-white/85">
                &ldquo;If it takes more than thirty seconds, I&rsquo;m
                going to lie to it.&rdquo;
              </em>
            </Paragraph>
            <Paragraph>
              <span className="font-semibold text-white">
                AI products are most honest when users aren&rsquo;t
                asked to perform.
              </span>{" "}
              If I started over, even the slider would be one tap.
            </Paragraph>
          </div>
        </div>

        {/* What's next */}
        <div className="mt-32 grid grid-cols-12 gap-6 md:mt-40">
          <div className="col-span-12 md:col-span-10">
            <p
              className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: PURPLE_LIGHT }}
            >
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: PURPLE_LIGHT }}
              />
              What&rsquo;s next
            </p>
            <h3 className="mt-6 text-[28px] font-black leading-[1.1] tracking-[-0.02em] sm:text-[36px] md:text-[44px]">
              Energy as input is{" "}
              <span style={{ color: PURPLE_LIGHT }}>
                a category, not a feature.
              </span>
            </h3>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <Paragraph>
              The bet: the next decade of software will stop assuming
              users are consistent and start designing for{" "}
              <span className="font-semibold text-white">
                variability as the default.
              </span>{" "}
              A tool that knows you&rsquo;re tired isn&rsquo;t a feature
              — it&rsquo;s a category. Reading, learning, messaging.
              Same idea, different surface.
            </Paragraph>
          </div>
        </div>

        {/* Three forward-looking cards */}
        <div className="mt-12 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <NextCard
              accent={PURPLE_LIGHT}
              accentSoft="rgba(86,80,217,0.10)"
              accentBorder="rgba(86,80,217,0.22)"
              kicker="V2 Concept"
              title="Replace the slider with one tap."
              body="Empty · Low · Okay · Charged. Four pills. One tap. More truth than a number."
            />
          </div>
          <div className="col-span-12 md:col-span-4">
            <NextCard
              accent={TEAL_LIGHT}
              accentSoft="rgba(125,229,218,0.10)"
              accentBorder="rgba(125,229,218,0.22)"
              kicker="Validation"
              title="Run a 14-day study."
              body="Five real users. Daily check-ins. See if the AI's reasoning builds trust over time, or just becomes noise."
            />
          </div>
          <div className="col-span-12 md:col-span-4">
            <NextCard
              accent={AMBER}
              accentSoft="rgba(242,194,107,0.10)"
              accentBorder="rgba(242,194,107,0.25)"
              kicker="The wider bet"
              title="Use energy-as-input elsewhere."
              body="Reading. Learning. Messaging. Any place where 'what should I do now?' belongs to the product, not the user."
            />
          </div>
        </div>

        {/* Personal closing note */}
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
              The final word
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-12 gap-6">
          <p className="col-span-12 text-[28px] font-bold leading-[1.2] tracking-[-0.02em] sm:text-[36px] md:col-span-10 md:col-start-2 md:text-[48px]">
            <span className="text-white/55">
              A small-town kid with a fine arts degree, designing into
              AI product design one project at a time.
            </span>{" "}
            <span style={{ color: TEAL_LIGHT }}>
              MoodPlan is the closest I&rsquo;ve come to a product I
              want to use.
            </span>
          </p>
        </div>

        <div className="mt-10 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <Paragraph>
              That feels like the right place to start. If you&rsquo;re
              building in this direction, I&rsquo;d love to compare
              notes.
            </Paragraph>
          </div>
        </div>

        {/* Signature CTAs */}
        <div className="mt-14 grid grid-cols-12 gap-6 md:mt-20">
          <div className="col-span-12 md:col-span-10 md:col-start-2">
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex h-12 items-center justify-center rounded-full px-7 text-[14px] font-semibold tracking-[0.01em] transition-colors hover:brightness-110"
                style={{ background: TEAL, color: "#0A1714" }}
              >
                Get in touch
              </a>
              <a
                href="/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/30 px-7 text-[14px] font-semibold tracking-[0.01em] text-white/90 transition-colors hover:border-white/60 hover:text-white"
              >
                <span aria-hidden>←</span> Back to all work
              </a>
            </div>
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

function NextCard({
  accent,
  accentSoft,
  accentBorder,
  kicker,
  title,
  body,
}: {
  accent: string;
  accentSoft: string;
  accentBorder: string;
  kicker: string;
  title: string;
  body: string;
}) {
  return (
    <div
      className="relative h-full overflow-hidden rounded-[24px] border p-7 backdrop-blur-md md:p-8"
      style={{
        background: `linear-gradient(180deg, ${accentSoft} 0%, rgba(255,255,255,0.01) 100%)`,
        borderColor: accentBorder,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full"
        style={{ background: `${accent}1F`, filter: "blur(48px)" }}
      />
      <p
        className="relative text-[10px] font-bold uppercase tracking-[0.18em]"
        style={{ color: accent }}
      >
        {kicker}
      </p>
      <h4 className="relative mt-4 text-[20px] font-bold leading-[1.25] tracking-[-0.015em] text-white md:text-[22px]">
        {title}
      </h4>
      <p className="relative mt-4 text-[14px] leading-[1.6] text-white/65 md:text-[15px]">
        {body}
      </p>
    </div>
  );
}
