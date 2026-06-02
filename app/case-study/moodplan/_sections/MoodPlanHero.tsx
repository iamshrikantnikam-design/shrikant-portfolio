import { Container } from "../../../components/Container";

/* ────────────────────────────────────────────────────────────────────────────
   MoodPlan case study — hero ("cover") section.

   Two-column layout on desktop, single column on mobile. Left column carries
   the wordmark, eyebrow, headline, lede, and primary CTAs. Right column is
   a stage of five floating product UI cards positioned absolutely so they
   feel composed, not gridded.

   Bottom strip: dotted meta pills + a "stat row" (2x / 340 / 5) and the
   priority legend. Behind everything sits a faint cyan grid + a giant
   "MoodPlan" watermark bleeding off the bottom edge.
──────────────────────────────────────────────────────────────────────────── */

const TEAL = "#22B5A6"; // primary teal — CTA, accents
const TEAL_LIGHT = "#7DE5DA"; // bright cyan — accent in heading
const CREAM = "#EFE7D2"; // warm cream — light surface cards
const INK = "#0A1714"; // text on cream
const PURPLE = "#5650D9"; // purple "live now" card
const AMBER = "#F2C26B"; // amber priority dot

export function MoodPlanHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#04130F] text-white">
      {/*
        Butterfly-in keyframe + class — inlined here (instead of globals.css)
        so the dev pipeline picks it up reliably with the component. Each
        wrapper sets --bf-x / --bf-y / --bf-r as the offset/rotation it
        animates FROM (vector back to stage centre + slight inward fold).
      */}
      <style>{`
        /*
          Planetary orbit system. Each card has its own ring of radius --R
          and orbital period --T. The .orbit-anchor sits at the title's
          centre and spins in place; its child .orbit-arm holds the card
          translated outward by --R so it traces a circle as the parent
          rotates. The card itself counter-rotates at the same speed so it
          stays upright in the viewport. Negative animation-delay (--phase)
          moves each card's starting angle around the ring — like planets
          spread around the sun. All anchors AND counter-rotators must
          share the same direction sense and matching --T per card so the
          card never tilts.
        */
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbit-counter {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes orbit-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .orbit-anchor {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 0;
          height: 0;
          animation: orbit-spin var(--T, 22s) linear var(--phase, 0s) infinite,
            orbit-fade-in 1s ease-out backwards;
          animation-delay: var(--phase, 0s), 0.3s;
          will-change: transform;
        }
        .orbit-arm {
          position: absolute;
          transform: translate(var(--R, 280px), 0) translate(-50%, -50%);
        }
        .orbit-counter {
          animation: orbit-counter var(--T, 22s) linear var(--phase, 0s) infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .orbit-anchor, .orbit-counter { animation: none; }
        }
      `}</style>

      {/* faint grid behind everything */}
      <GridBackdrop />

      {/* "MoodPlan" watermark bleeding off the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-40px] flex justify-center md:bottom-[-80px]"
      >
        <span
          className="select-none text-[20vw] font-black leading-[0.85] tracking-[-0.04em]"
          style={{ color: "rgba(125, 229, 218, 0.06)" }}
        >
          MoodPlan
        </span>
      </div>

      <Container className="relative">
        {/* ── Top row: wordmark ──────────────────────────────────── */}
        <div className="relative z-20 flex items-center pt-[68px] md:pt-[80px]">
          <Wordmark />
        </div>

        {/*
          Hero stage — title sits VERTICALLY CENTRED in the viewport with
          orbiting cards behind it. Stage is min-h calculated so wordmark
          sits at top, then the remaining viewport height centres the
          title block. Cards orbit absolutely inside this same stage so
          they revolve around the title regardless of viewport size.
        */}
        <div className="relative flex min-h-[calc(100vh-160px)] items-center justify-center md:min-h-[calc(100vh-180px)]">
          {/* Background orbit — cards behind, lower opacity, no clicks */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 select-none opacity-40"
          >
            <CardStage />
          </div>

          {/* Title block on top */}
          <div className="relative z-20 flex flex-col items-center px-2 text-center">
            <h1 className="text-[40px] font-black leading-[0.95] tracking-[-0.035em] sm:text-[56px] md:text-[72px] lg:text-[84px]">
              A planner to
              <br />
              <span style={{ color: TEAL_LIGHT }}>your feelings.</span>
            </h1>

            <p
              className="mt-5 max-w-[560px] text-[15px] leading-[1.6] md:text-[16px]"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Most apps plan around time. MoodPlan plans around energy.
            </p>
          </div>
        </div>

        {/*
          Bottom strip — stats first (numbers as anchors), pills + energy
          key bar underneath as a supporting band of context. Points pill
          removed (the live 340-pt reward strip in the prototype already
          carries that data).
        */}
        <div className="mt-8 flex flex-wrap items-end justify-center gap-10 md:mt-12 md:gap-14">
          <Stat value="2×" label="Task completion" />
          <Stat value="340" label="Reward points" />
          <Stat value="5" label="Screens designed" />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 pb-10 md:mt-8 md:pb-14">
          <DotPill dot={TEAL_LIGHT}>
            <strong className="text-white">Peak</strong>
            <span className="text-white/55"> · Mon &amp; Tue</span>
          </DotPill>
          <DotPill dot="#8C7BF5">
            <strong className="text-white">Dip</strong>
            <span className="text-white/55"> · 1–3pm rest</span>
          </DotPill>
          <DotPill dot={TEAL}>
            <strong className="text-white">Matched</strong>
            <span className="text-white/55"> · 78% done</span>
          </DotPill>
          <DotPill dot={TEAL_LIGHT}>
            <strong className="text-white">Streak</strong>
            <span className="text-white/55"> · 7 days</span>
          </DotPill>

          {/* Energy-key colour bar — purple · amber · teal */}
          <EnergyKeyBar />
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────────── helpers / sub-pieces */

function Wordmark() {
  return (
    <div className="text-[22px] font-black tracking-[-0.02em] md:text-[24px]">
      <span className="text-white">Mood</span>
      <span style={{ color: TEAL_LIGHT }}>Plan</span>
    </div>
  );
}

function GridBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(rgba(125,229,218,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(125,229,218,0.05) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage:
          "radial-gradient(ellipse at 60% 35%, black 30%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at 60% 35%, black 30%, transparent 75%)",
      }}
    />
  );
}

function DotPill({
  children,
  dot,
}: {
  children: React.ReactNode;
  dot: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-1.5 text-[12px] tracking-[0.01em]"
      style={{ borderColor: "rgba(255,255,255,0.10)" }}
    >
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: dot }}
      />
      {children}
    </span>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-[28px] font-black leading-none tracking-[-0.03em] text-white md:text-[36px]">
        {value}
      </span>
      <span className="mt-1.5 text-[10px] uppercase tracking-[0.12em] text-white/50 md:text-[11px]">
        {label}
      </span>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: color }}
      />
      {label}
    </span>
  );
}

/*
  EnergyKeyBar — three coloured segments (purple / amber / teal) showing
  the energy categories at a glance. Replaces the dotted legend so it
  reads as a real "key" rather than three separate items, and slots
  inline alongside the meta pills as one cohesive strip.
*/
function EnergyKeyBar() {
  const segments: { label: string; color: string }[] = [
    { label: "Deep focus", color: PURPLE },
    { label: "Medium", color: AMBER },
    { label: "Easy win", color: TEAL },
  ];
  return (
    <span
      className="inline-flex h-9 items-stretch overflow-hidden rounded-full border"
      style={{ borderColor: "rgba(255,255,255,0.10)" }}
    >
      {segments.map((s) => (
        <span
          key={s.label}
          className="flex items-center gap-1.5 px-3 text-[11px] font-medium tracking-[0.02em] text-white/80"
          style={{
            background: `${s.color}26`,
            borderRight: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: s.color }}
          />
          {s.label}
        </span>
      ))}
    </span>
  );
}

/* ────────────────────────────────────────── floating card stage */

function CardStage() {
  /*
    Cards spread horizontally across the full width of the container, with
    soft vertical staggering. Top row holds Mood / Energy / LiveFocus; bottom
    row holds SortedList / Toast (overlapping the top row for that "floating
    composition" feel).
  */
  /*
    Each card wrapper carries CSS vars (--bf-x / --bf-y / --bf-r) — these
    are the offset and rotation it animates FROM, i.e. the vector pulling
    each card back toward the stage centre at the start of the animation.
    Cards on the left fold rightward (+rotation), cards on the right fold
    leftward (-rotation), which gives the butterfly-wing opening effect.
    Stagger delays propagate outward from centre.
  */
  /*
    Each Planet has its own radius (R) and orbital period (T). All planets
    rotate in the same direction (counter-clockwise here). Phase delays
    spread the cards around their orbits at start so they aren't bunched.

    Radii pattern (small-to-large):
      Mood        260   12s   phase  0
      Energy      290   18s   phase  -3.6 (72° in 18s)
      LiveFocus   330   24s   phase  -9.6 (144° in 24s)
      SortedList  300   16s   phase  -9.6
      Toast       360   28s   phase  -16.8

    Different periods = real planetary feel (closer planets orbit faster).
    Width on each card is the rendered card width, used to size the inner
    wrapper.
  */
  const planets: {
    component: React.ReactNode;
    r: string;
    period: string;
    phase: string;
    width: string;
  }[] = [
    { component: <MoodCard />,        r: "260px", period: "12s", phase: "0s",     width: "210px" },
    { component: <EnergyCard />,      r: "290px", period: "18s", phase: "-3.6s",  width: "220px" },
    { component: <LiveFocusCard />,   r: "330px", period: "24s", phase: "-9.6s",  width: "220px" },
    { component: <SortedListCard />,  r: "300px", period: "16s", phase: "-9.6s",  width: "220px" },
    { component: <ToastCard />,       r: "360px", period: "28s", phase: "-16.8s", width: "220px" },
  ];

  return (
    <div className="relative h-full w-full">
      {planets.map((p, i) => (
        <Planet key={i} r={p.r} period={p.period} phase={p.phase} width={p.width}>
          {p.component}
        </Planet>
      ))}
    </div>
  );
}

function Planet({
  r,
  period,
  phase,
  width,
  children,
}: {
  r: string;
  period: string;
  phase: string;
  width: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="orbit-anchor"
      style={
        {
          "--R": r,
          "--T": period,
          "--phase": phase,
        } as React.CSSProperties
      }
    >
      <div className="orbit-arm">
        <div
          className="orbit-counter"
          style={
            {
              "--T": period,
              "--phase": phase,
              width,
            } as React.CSSProperties
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* card surfaces */

function MoodCard() {
  const options = [
    { label: "Great", selected: false },
    { label: "Okay", selected: true },
    { label: "Low", selected: false },
    { label: "Anxious", selected: false },
  ];
  return (
    <div
      className="rounded-[20px] p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)]"
      style={{ background: CREAM, color: INK }}
    >
      <p
        className="text-[10px] font-bold uppercase tracking-[0.15em]"
        style={{ color: TEAL }}
      >
        How are you feeling?
      </p>
      <ul className="mt-4 space-y-1.5">
        {options.map((o) => (
          <li
            key={o.label}
            className="flex items-center justify-between rounded-xl px-3 py-2.5 text-[14px] font-semibold"
            style={{
              background: o.selected ? TEAL : "transparent",
              color: o.selected ? "#ffffff" : INK,
            }}
          >
            <span>{o.label}</span>
            <span
              aria-hidden
              className="grid h-4 w-4 place-items-center rounded-full border"
              style={{
                borderColor: o.selected ? "#ffffff" : "rgba(10,23,20,0.25)",
              }}
            >
              {o.selected ? (
                <span className="block h-1.5 w-1.5 rounded-full bg-white" />
              ) : null}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EnergyCard() {
  return (
    <div
      className="rounded-[20px] border p-5 backdrop-blur-md shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
      style={{
        background: "rgba(8, 30, 26, 0.65)",
        borderColor: "rgba(125,229,218,0.18)",
      }}
    >
      <p
        className="text-[10px] font-bold uppercase tracking-[0.15em]"
        style={{ color: "rgba(125,229,218,0.7)" }}
      >
        Energy Level Today
      </p>

      <div className="mt-3 flex items-start justify-between">
        <div>
          <div className="flex items-baseline">
            <span
              className="text-[56px] font-black leading-none tracking-[-0.04em]"
              style={{ color: TEAL_LIGHT }}
            >
              68
            </span>
            <span
              className="ml-1 text-[20px] font-bold"
              style={{ color: TEAL_LIGHT }}
            >
              %
            </span>
          </div>
          <p className="mt-1 text-[12px] text-white/65">Medium charge</p>
        </div>

        {/* mini gauge arc */}
        <svg
          viewBox="0 0 80 60"
          className="h-12 w-16"
          aria-hidden
        >
          <path
            d="M 8 50 A 32 32 0 0 1 72 50"
            stroke="rgba(125,229,218,0.15)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 8 50 A 32 32 0 0 1 64 24"
            stroke={TEAL_LIGHT}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {/* progress rail */}
      <div className="mt-4">
        <div
          className="relative h-[6px] w-full rounded-full"
          style={{ background: "rgba(125,229,218,0.15)" }}
        >
          <div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{
              width: "68%",
              background: `linear-gradient(90deg, ${TEAL} 0%, ${TEAL_LIGHT} 100%)`,
            }}
          />
          <div
            className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: "68%",
              background: TEAL_LIGHT,
              boxShadow: "0 0 0 4px rgba(125,229,218,0.18)",
            }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-white/50">
          <span>Running on empty</span>
          <span>Fully charged</span>
        </div>
      </div>
    </div>
  );
}

function SortedListCard() {
  type Row = {
    label: string;
    tag: string;
    dot: string;
    tagBg: string;
    tagFg: string;
  };
  const rows: Row[] = [
    {
      label: "Design homepage wireframe",
      tag: "Focus",
      dot: PURPLE,
      tagBg: "rgba(86,80,217,0.15)",
      tagFg: PURPLE,
    },
    {
      label: "Finish client deck",
      tag: "Focus",
      dot: PURPLE,
      tagBg: "rgba(86,80,217,0.15)",
      tagFg: PURPLE,
    },
    {
      label: "Reply to 3 client emails",
      tag: "Med",
      dot: AMBER,
      tagBg: "rgba(242,194,107,0.18)",
      tagFg: "#A8761E",
    },
    {
      label: "Buy groceries",
      tag: "Easy",
      dot: TEAL,
      tagBg: "rgba(34,181,166,0.18)",
      tagFg: "#0E7A6D",
    },
  ];

  return (
    <div
      className="rounded-[20px] p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)]"
      style={{ background: CREAM, color: INK }}
    >
      <p
        className="text-[10px] font-bold uppercase tracking-[0.15em]"
        style={{ color: TEAL }}
      >
        AI sorted your day
      </p>
      <ul className="mt-4 space-y-2.5">
        {rows.map((r) => (
          <li
            key={r.label}
            className="flex items-center justify-between gap-3 text-[13px] font-semibold"
          >
            <span className="flex min-w-0 items-center gap-2">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                style={{ background: r.dot }}
              />
              <span className="truncate">{r.label}</span>
            </span>
            <span
              className="flex-shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em]"
              style={{ background: r.tagBg, color: r.tagFg }}
            >
              {r.tag}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LiveFocusCard() {
  return (
    <div
      className="rounded-[20px] p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)]"
      style={{ background: PURPLE, color: "#ffffff" }}
    >
      <span
        className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em]"
      >
        <span
          aria-hidden
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ background: TEAL_LIGHT }}
        />
        Live now
      </span>
      <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.15em] text-white/65">
        Deep focus
      </p>
      <p className="mt-1 text-[20px] font-extrabold leading-[1.1] tracking-[-0.01em]">
        Design homepage wireframe
      </p>
      <p className="mt-2 text-[12px] text-white/70">
        11:30 AM – 1:00 PM · 90 min
      </p>
      <div className="mt-4 h-[5px] w-full rounded-full bg-white/15">
        <div
          className="h-full rounded-full bg-white"
          style={{ width: "38%" }}
        />
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-white/65">
        <span>38% complete</span>
        <span>52 min left</span>
      </div>
    </div>
  );
}

function ToastCard() {
  return (
    <div
      className="rounded-[16px] border p-4 backdrop-blur-md shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]"
      style={{
        background: "rgba(6, 22, 19, 0.92)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex gap-3">
        <span
          aria-hidden
          className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full"
          style={{ background: "rgba(125,229,218,0.18)" }}
        >
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5"
            fill="none"
            stroke={TEAL_LIGHT}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="8" cy="8" r="6" />
            <path d="M8 5v3l2 1.5" />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="text-[13px] font-bold text-white">
            MoodPlan moved 2 tasks
          </p>
          <p className="mt-1 text-[12px] leading-[1.5] text-white/65">
            Deep work at 11:30am — your energy peaks before noon. Emails
            pushed to 3pm after your recharge break.
          </p>
        </div>
      </div>
    </div>
  );
}
