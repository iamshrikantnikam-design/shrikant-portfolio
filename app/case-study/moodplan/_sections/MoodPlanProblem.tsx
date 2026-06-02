import { Container } from "../../../components/Container";

/* ────────────────────────────────────────────────────────────────────────────
   MoodPlan case study — problem section.

   Tightened pass: cuts the guilt-machine recap that repeated the stat
   visuals; replaces fabricated abandonment + burnout numbers with cited
   secondary sources (Statista, Deloitte/Gallup); halves bold usage.

   Type roles in this file:
     <h2>     section title (Header)        — 36/48/64/72
     <p.eyebrow>  kicker label              — 12 uppercase
     <Lede>   centered pull-quote (Header2) — 28/36/48
     <BigParagraph> primary body            — 18/20/22
     <Paragraph>   standard body            — 16/17
     <Source>      tiny inline citation     — 11
──────────────────────────────────────────────────────────────────────────── */

const TEAL_LIGHT = "#7DE5DA";
const TEAL = "#22B5A6";
const PURPLE = "#5650D9";

export function MoodPlanProblem() {
  return (
    <section
      id="problem"
      className="relative isolate overflow-hidden bg-[#04130F] py-32 text-white md:py-40"
    >
      <Divider />

      <Container className="relative">
        {/* H2 — section title */}
        <header className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-10">
            <Eyebrow>02 — The problem</Eyebrow>
            <h2 className="mt-6 text-[36px] font-black leading-[1.05] tracking-[-0.025em] sm:text-[48px] md:text-[64px] lg:text-[72px]">
              The problem wasn&rsquo;t the plan.
              <br />
              <span style={{ color: TEAL_LIGHT }}>
                It was the person the plan ignored.
              </span>
            </h2>
          </div>
        </header>

        {/* Tuesday narrative */}
        <div className="mt-20 grid grid-cols-12 gap-6 md:mt-24">
          <div className="col-span-12 md:col-span-8">
            <Paragraph>
              Tuesday. Half the energy of Monday. Same list.
            </Paragraph>
            <Paragraph>
              You know — before you&rsquo;ve opened an app — today
              won&rsquo;t be that day.
            </Paragraph>
            <Paragraph>Every tool still treats it like it is.</Paragraph>
          </div>
        </div>

        {/* Hero pull-line */}
        <div className="mt-24 grid grid-cols-12 gap-6 md:mt-32">
          <p className="col-span-12 text-center text-[36px] font-black leading-[1.05] tracking-[-0.025em] sm:text-[52px] md:text-[72px] lg:text-[88px]">
            Productivity software has{" "}
            <span style={{ color: TEAL_LIGHT }}>a blind spot — the person.</span>
          </p>
        </div>

        {/* Combined block: copy + stacked stat cards */}
        <div className="mt-20 grid grid-cols-12 items-start gap-8 md:mt-24">
          <div className="col-span-12 md:col-span-7">
            <BigParagraph>
              It knows your deadlines, meetings, free hours. It has
              never asked how much you have to give today.
            </BigParagraph>
            <BigParagraph>
              Time and energy aren&rsquo;t the same. Four free hours
              mean nothing if you can&rsquo;t use them.
            </BigParagraph>
          </div>

          <div className="col-span-12 flex flex-col gap-4 md:col-span-5 md:sticky md:top-20">
            <AbandonStat />
            <BurnoutStat />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────── shared bits */

function Divider() {
  return (
    <div
      aria-hidden
      className="absolute inset-x-0 top-0 h-px"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(125,229,218,0.15) 50%, transparent)",
      }}
    />
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em]"
      style={{ color: "rgba(125,229,218,0.75)" }}
    >
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: TEAL_LIGHT }}
      />
      {children}
    </p>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-2 text-[16px] leading-[1.55] text-white/75 first:mt-0 md:text-[17px]">
      {children}
    </p>
  );
}

function BigParagraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 text-[18px] leading-[1.6] text-white/80 first:mt-0 sm:text-[20px] md:text-[22px]">
      {children}
    </p>
  );
}

function Source({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-[11px] uppercase tracking-[0.12em] text-white/40">
      {children}
    </p>
  );
}

/* ─────────────────────────────────────────────── stat cards */

function AbandonStat() {
  return (
    <div
      className="relative overflow-hidden rounded-[18px] border p-5 backdrop-blur-md md:p-6"
      style={{
        background:
          "linear-gradient(180deg, rgba(125,229,218,0.06) 0%, rgba(125,229,218,0.02) 100%)",
        borderColor: "rgba(125,229,218,0.18)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full"
        style={{ background: "rgba(125,229,218,0.12)", filter: "blur(36px)" }}
      />

      <p
        className="text-[10px] font-bold uppercase tracking-[0.18em]"
        style={{ color: TEAL }}
      >
        App abandonment
      </p>

      <div className="mt-2 flex items-baseline gap-3">
        <span
          className="text-[48px] font-black leading-none tracking-[-0.04em] md:text-[56px]"
          style={{ color: TEAL_LIGHT }}
        >
          1 in 4
        </span>
      </div>

      <p className="mt-2 text-[13px] leading-[1.55] text-white/65">
        users drop a mobile app after one open.
      </p>
      <Source>Source · Statista, mobile app retention 2023</Source>
    </div>
  );
}

function BurnoutStat() {
  return (
    <div
      className="relative overflow-hidden rounded-[18px] border p-5 backdrop-blur-md md:p-6"
      style={{
        background:
          "linear-gradient(180deg, rgba(86,80,217,0.10) 0%, rgba(86,80,217,0.02) 100%)",
        borderColor: "rgba(86,80,217,0.22)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full"
        style={{ background: "rgba(86,80,217,0.18)", filter: "blur(36px)" }}
      />

      <p
        className="text-[10px] font-bold uppercase tracking-[0.18em]"
        style={{ color: "#A6A0FF" }}
      >
        Gen Z burnout
      </p>

      <div className="mt-2 flex items-baseline gap-2.5">
        <span
          className="text-[48px] font-black leading-none tracking-[-0.04em] md:text-[56px]"
          style={{ color: "#C2BCFF" }}
        >
          46%
        </span>
        <span className="text-[12px] font-semibold text-white/70">
          stressed all the time
        </span>
      </div>

      <p className="mt-2 text-[13px] leading-[1.55] text-white/65">
        Gen Z reports the highest burnout of any generation.
      </p>
      <Source>Source · Deloitte Gen Z &amp; Millennial Survey 2024</Source>
    </div>
  );
}
