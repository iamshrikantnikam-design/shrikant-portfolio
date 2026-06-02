import type { ReactNode } from "react";
import { Container } from "../components/Container";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Pill, AvailabilityPill } from "../components/Pill";
import { SystemSound } from "../components/SystemSound";

export const metadata = {
  title: "Design System · Shrikant Nikam",
  description:
    "Foundations, components, and motion that make up the portfolio's monochrome SF Pro Display system.",
};

export default function DesignSystemPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-[color:var(--bg)]">
        <Hero />
        <MiniNav />
        <SystemSound>
          <Foundations />
          <Components />
          <Motion />
        </SystemSound>
      </main>
      <Footer />
    </>
  );
}

/* ─────────────────────────── Hero ─────────────────────────── */
function Hero() {
  return (
    <section className="bg-[color:var(--bg)] pt-[100px] md:pt-[140px]">
      <Container>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)] md:text-[12px]">
          v1.0 · Monochrome
        </p>
        <h1 className="mt-3 text-[40px] font-semibold leading-[0.95] tracking-[-0.04em] text-[color:var(--fg)] md:mt-4 md:text-[56px] lg:text-[80px]">
          Design system
        </h1>
        <p className="mt-6 max-w-[640px] text-[16px] leading-[1.75] text-[color:var(--muted)]">
          The foundations, components, and motion that hold this portfolio
          together. SF Pro Display, strict black and white, −0.02em tracking
          everywhere.
        </p>
      </Container>
    </section>
  );
}

/* ─────────────────────────── Mini nav ─────────────────────────── */
function MiniNav() {
  const items = [
    { id: "foundations", label: "01 · Foundations" },
    { id: "components", label: "02 · Components" },
    { id: "motion", label: "03 · Motion" },
  ];
  return (
    <div className="sticky top-[64px] z-40">
      <Container>
        <nav
          aria-label="Design system sections"
          className="flex h-12 items-center gap-2 overflow-x-auto"
        >
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-liquid-glass
              className="inline-flex h-8 flex-shrink-0 items-center rounded-full px-3 font-mono text-[11px] font-semibold uppercase text-[color:var(--fg)]"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </Container>
    </div>
  );
}

/* ─────────────────────────── Foundations ─────────────────────────── */
function Foundations() {
  return (
    <Section id="foundations" eyebrow="01" title="Foundations">
      <Brand />
      <Color />
      <Typography />
      <Spacing />
      <Layout />
      <Radii />
      <Shadow />
    </Section>
  );
}

function Brand() {
  return (
    <SubSection title="Brand" description="Identity tokens used across the system.">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Tile label="Wordmark" mono="SHRIKANT NIKAM">
          <span className="text-[18px] font-bold uppercase tracking-[-0.3px] text-[color:var(--fg)]">
            Shrikant Nikam
          </span>
        </Tile>
        <Tile label="Voice" mono="Plain · direct · warm">
          <span className="text-[14px] text-[color:var(--fg)]">
            Plain · direct · warm
          </span>
        </Tile>
        <Tile label="Aesthetic" mono="Monochrome · functional">
          <span className="text-[14px] text-[color:var(--fg)]">
            Monochrome · functional
          </span>
        </Tile>
      </div>
    </SubSection>
  );
}

function Color() {
  const light: { name: string; token: string; value: string }[] = [
    { name: "Background", token: "--bg", value: "#ffffff" },
    { name: "Foreground", token: "--fg", value: "#000000" },
    { name: "Foreground / Muted", token: "--fg-muted", value: "rgba(0,0,0,0.2)" },
    { name: "Foreground / Soft", token: "--fg-soft", value: "rgba(0,0,0,0.6)" },
    { name: "Surface / Off", token: "--off", value: "#f5f5f5" },
    { name: "Muted text", token: "--muted", value: "#6b6b6b" },
    { name: "Border", token: "--border", value: "#e5e5e5" },
    { name: "Card", token: "--card", value: "#000000" },
  ];
  const dark: { name: string; token: string; value: string }[] = [
    { name: "Background", token: "--bg", value: "#000000" },
    { name: "Foreground", token: "--fg", value: "#ffffff" },
    { name: "Foreground / Muted", token: "--fg-muted", value: "rgba(255,255,255,0.2)" },
    { name: "Foreground / Soft", token: "--fg-soft", value: "rgba(255,255,255,0.6)" },
    { name: "Card", token: "--card", value: "#111111" },
    { name: "Stroke", token: "--stroke", value: "rgba(255,255,255,0.14)" },
  ];

  return (
    <SubSection
      title="Color"
      description="Strictly monochrome. No hues. Light is default; dark is opt-in via the .dark class on a parent."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ThemeBlock label="Light theme" theme="light">
          <Swatches items={light} theme="light" />
        </ThemeBlock>
        <ThemeBlock label="Dark theme" theme="dark">
          <Swatches items={dark} theme="dark" />
        </ThemeBlock>
      </div>
    </SubSection>
  );
}

function ThemeBlock({
  label,
  theme,
  children,
}: {
  label: string;
  theme: "light" | "dark";
  children: ReactNode;
}) {
  return (
    <div
      data-frame
      className={[
        "border",
        theme === "light"
          ? "border-black/10 bg-[#e8e4dc]"
          : "dark border-white/10 bg-[#1a1a1a]",
      ].join(" ")}
    >
      <div className="flex items-center justify-between">
        <p
          className={[
            "font-mono text-[10px] font-semibold uppercase tracking-[0.24em]",
            theme === "light" ? "text-black/55" : "text-white/55",
          ].join(" ")}
        >
          {label}
        </p>
        <span
          className={[
            "h-2 w-2 rounded-full",
            theme === "light" ? "bg-[#d2492a]" : "bg-[#ff6a3d]",
          ].join(" ")}
        />
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Swatches({
  items,
  theme,
}: {
  items: { name: string; token: string; value: string }[];
  theme: "light" | "dark";
}) {
  return (
    <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
      {items.map((s) => (
        <li
          key={s.token}
          data-sysrow
          data-pad
          className={[
            "sys-pad group relative flex flex-col gap-3 rounded-[10px] border p-3",
            theme === "light"
              ? "border-black/10 bg-[#f2efe8] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_1px_1px_rgba(0,0,0,0.06)]"
              : "border-white/10 bg-[#232323] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_1px_1px_rgba(0,0,0,0.6)]",
          ].join(" ")}
        >
          <span
            className={[
              "block aspect-square w-full rounded-[6px] border",
              theme === "light"
                ? "border-black/15 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]"
                : "border-white/15 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]",
            ].join(" ")}
            style={{ background: s.value }}
          />
          <div className="min-w-0">
            <p
              className={[
                "truncate text-[11px] font-semibold uppercase tracking-[0.08em]",
                theme === "light" ? "text-black" : "text-white",
              ].join(" ")}
            >
              {s.name}
            </p>
            <p
              className={[
                "truncate font-mono text-[10px]",
                theme === "light" ? "text-black/55" : "text-white/50",
              ].join(" ")}
            >
              {s.token}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Typography() {
  const scale = [
    { token: "--t-96", px: 96, label: "Display XL", weight: 600 },
    { token: "--t-56", px: 56, label: "Display", weight: 600 },
    { token: "--t-40", px: 40, label: "H1", weight: 600 },
    { token: "--t-36", px: 36, label: "H2", weight: 600 },
    { token: "--t-24", px: 24, label: "H3", weight: 600 },
    { token: "--t-18", px: 18, label: "Lead", weight: 500 },
    { token: "--t-16", px: 16, label: "Body", weight: 400 },
    { token: "--t-14", px: 14, label: "Body / Small", weight: 500 },
    { token: "--t-13", px: 13, label: "Caption", weight: 500 },
    { token: "--t-12", px: 12, label: "Label", weight: 600 },
    { token: "--t-11", px: 11, label: "Eyebrow", weight: 600 },
  ];
  return (
    <SubSection
      title="Typography"
      description='Single family — SF Pro Display — with system fallbacks. Tracking is locked at −0.02em globally.'
    >
      <div className="grid grid-cols-1 gap-3">
        {scale.map((s) => (
          <div
            key={s.token}
            data-sysrow
            className="flex items-baseline justify-between gap-6 rounded-[12px] border border-black/10 bg-[color:var(--bg)] px-5 py-4"
          >
            <span
              className="truncate text-[color:var(--fg)]"
              style={{
                fontSize: `${s.px}px`,
                fontWeight: s.weight,
                lineHeight: 1,
              }}
            >
              Aa
            </span>
            <div className="text-right">
              <p className="text-[13px] font-semibold text-[color:var(--fg)]">
                {s.label}
              </p>
              <p className="font-mono text-[11px] text-[color:var(--muted)]">
                {s.token} · {s.px}px · {s.weight}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[400, 500, 600, 700, 800].map((w) => (
          <div
            key={w}
            data-sysrow
            className="rounded-[12px] border border-black/10 px-5 py-5"
          >
            <p
              className="text-[28px] tracking-[-0.02em] text-[color:var(--fg)]"
              style={{ fontWeight: w }}
            >
              Aa
            </p>
            <p className="mt-2 font-mono text-[11px] text-[color:var(--muted)]">
              weight {w}
            </p>
          </div>
        ))}
      </div>

    </SubSection>
  );
}

function Spacing() {
  const tokens = [4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 100, 120];
  return (
    <SubSection
      title="Spacing"
      description="4 / 8-based scale. Use tokens, not arbitrary pixel values."
    >
      <div className="space-y-2">
        {tokens.map((t) => (
          <div
            key={t}
            data-sysrow
            className="flex items-center gap-4 rounded-[12px] border border-black/10 px-4 py-3"
          >
            <span
              className="h-3 rounded-[2px] bg-[color:var(--fg)]"
              style={{ width: `${t}px` }}
            />
            <p className="font-mono text-[11px] text-[color:var(--muted)]">
              --s-{t} · {t}px
            </p>
          </div>
        ))}
      </div>
    </SubSection>
  );
}

function Layout() {
  return (
    <SubSection
      title="Layout"
      description="1440px max container, responsive padding (20 / 24 / 32). 12-col grid with 8px gutter."
    >
      <div data-frame className="overflow-hidden border border-black/10">
        <div className="border-b border-black/10 bg-[color:var(--off)] px-5 py-3 font-mono text-[11px] text-[color:var(--muted)]">
          1440 max · px-5 → px-6 → px-8
        </div>
        <div className="grid grid-cols-12 gap-2 p-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-16 rounded-[6px] border border-black/15 bg-black/[0.04]"
            />
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
        {[
          { name: "sm", value: "640px" },
          { name: "md", value: "768px" },
          { name: "lg", value: "1024px" },
          { name: "xl", value: "1280px" },
          { name: "2xl", value: "1440px" },
        ].map((bp) => (
          <div
            key={bp.name}
            data-sysrow
            className="rounded-[12px] border border-black/10 px-4 py-4"
          >
            <p className="text-[14px] font-semibold uppercase text-[color:var(--fg)]">
              {bp.name}
            </p>
            <p className="mt-1 font-mono text-[11px] text-[color:var(--muted)]">
              {bp.value}
            </p>
          </div>
        ))}
      </div>
    </SubSection>
  );
}

function Radii() {
  const radii = [
    { name: "Hairline", value: 2 },
    { name: "Tag", value: 6 },
    { name: "Input", value: 8 },
    { name: "Card SM", value: 12 },
    { name: "Card", value: 16 },
    { name: "Card LG", value: 20 },
    { name: "Hero", value: 24 },
    { name: "Pill", value: 9999 },
  ];
  return (
    <SubSection
      title="Radii"
      description="From hairline corners on tags to fully-pill CTAs."
    >
      <div
        data-frame
        className="overflow-hidden border border-black/10 bg-[#f2efe8]"
      >
        <div className="flex items-center justify-between border-b border-black/10 px-4 py-2.5">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-black/55">
            R-08 · radii
          </p>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50">
              on
            </span>
            <span className="h-2 w-2 rounded-full bg-[#d2492a] shadow-[0_0_6px_rgba(210,73,42,0.6)]" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-px bg-black/10 md:grid-cols-4">
          {radii.map((r, i) => (
            <div
              key={r.name}
              className="flex flex-col items-center justify-between gap-5 bg-[#f2efe8] px-4 py-7"
            >
              <div className="flex h-14 items-center justify-center">
                <div
                  className="h-14 w-14 bg-black"
                  style={{ borderRadius: r.value === 9999 ? 9999 : r.value }}
                />
              </div>
              <div className="text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-black">
                  {r.name}
                </p>
                <p className="mt-0.5 font-mono text-[10px] text-black/55">
                  {r.value === 9999 ? "pill" : `${r.value}px`}
                </p>
              </div>
              <span className="font-mono text-[9px] tracking-[0.2em] text-black/35">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SubSection>
  );
}

function Shadow() {
  return (
    <SubSection
      title="Elevation"
      description="One soft hover shadow. Used on cards that lift on group-hover."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div data-sysrow className="rounded-[16px] border border-black/10 bg-white px-6 py-8">
          <p className="font-mono text-[11px] text-[color:var(--muted)]">flat</p>
          <p className="mt-1 text-[14px] text-[color:var(--fg)]">none</p>
        </div>
        <div
          data-sysrow
          className="rounded-[16px] border border-black/10 bg-white px-6 py-8"
          style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.12)" }}
        >
          <p className="font-mono text-[11px] text-[color:var(--muted)]">
            hover
          </p>
          <p className="mt-1 text-[14px] text-[color:var(--fg)]">
            0 24px 60px rgba(0,0,0,0.12)
          </p>
        </div>
      </div>
    </SubSection>
  );
}

/* ─────────────────────────── Components ─────────────────────────── */
function Components() {
  return (
    <Section id="components" eyebrow="02" title="Components">
      <Buttons />
      <Pills />
      <Cards />
      <NavLinks />
    </Section>
  );
}

function Buttons() {
  return (
    <SubSection
      title="Buttons"
      description="One CTA size across the site: 48px tall, 24px horizontal padding, 14px semibold uppercase, fully-pill rounded."
    >
      <div className="space-y-6">
        <Spec>
          height 48px · px 24 · text 14/600 uppercase · radius 9999
        </Spec>

        <Row label="Primary">
          <a
            href="#"
className="inline-flex h-12 items-center justify-center rounded-full bg-[color:var(--fg)] px-6 text-[14px] font-semibold uppercase text-[color:var(--bg)] transition hover:opacity-90"
          >
            View work
          </a>
        </Row>
        <Row label="Secondary (outline)">
          <a
            href="#"
className="inline-flex h-12 items-center justify-center rounded-full border border-[color:var(--border)] px-6 text-[14px] font-semibold uppercase text-[color:var(--fg)] transition hover:bg-[color:var(--off)]"
          >
            Get in touch
          </a>
        </Row>
        <Row label="On dark / Filled">
          <div className="rounded-[16px] bg-black p-5">
            <a
              href="#"
    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-[14px] font-semibold uppercase text-black transition hover:bg-white/90"
            >
              iamshrikantnikam@gmail.com
            </a>
          </div>
        </Row>
        <Row label="On dark / Ghost">
          <div className="rounded-[16px] bg-black p-5">
            <a
              href="#"
    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-6 text-[14px] font-semibold uppercase text-white/70 transition hover:border-white/50 hover:text-white"
            >
              LinkedIn <span aria-hidden>→</span>
            </a>
          </div>
        </Row>
        <Row label="Disabled">
          <button
            disabled
            className="inline-flex h-12 cursor-not-allowed items-center justify-center rounded-full bg-[color:var(--fg)] px-6 text-[14px] font-semibold uppercase text-[color:var(--bg)] opacity-40"
          >
            Unavailable
          </button>
        </Row>
      </div>
    </SubSection>
  );
}

function Pills() {
  return (
    <SubSection
      title="Pills"
      description="Tags, chips, and availability badges. 11/12/13px responsive size, hairline border, fully-pill."
    >
      <div className="flex flex-wrap gap-3">
        <Pill>Default</Pill>
        <Pill variant="accent">Accent</Pill>
        <Pill variant="muted">Muted</Pill>
        <AvailabilityPill>Open to roles</AvailabilityPill>
      </div>
    </SubSection>
  );
}

function Cards() {
  return (
    <SubSection
      title="Cards"
      description="Image-led work cards. Hover lifts the whole article (group-hover translate-y-1)."
    >
      <article className="group">
        <a
          href="#components"
          className="block w-full transition-transform duration-300 group-hover:-translate-y-1"
        >
          <div
            className="relative aspect-[16/9] w-full overflow-hidden rounded-[20px]"
            style={{ background: "#f5f5f5" }}
          >
            <div
              className="absolute bottom-0 left-0 top-0 w-[4px]"
              style={{ background: "#000000" }}
            />
          </div>
        </a>
        <div className="mt-6">
          <div className="flex flex-wrap gap-2">
            <Pill>Mobile · iOS</Pill>
          </div>
          <h3 className="mt-3 text-[22px] font-bold leading-[1.15] tracking-[-0.4px] text-[color:var(--fg)]">
            Card title goes here
          </h3>
          <p className="mt-3 max-w-[560px] text-[14px] leading-[1.7] text-[color:var(--muted)]">
            One sentence describing the project. Card title + description +
            optional CTA underneath.
          </p>
        </div>
      </article>
    </SubSection>
  );
}

function NavLinks() {
  return (
    <SubSection
      title="Nav links"
      description="Sit in a fixed nav with mix-blend-mode: difference; appearance inverts against the background."
    >
      <div className="rounded-[16px] bg-black px-6 py-5">
        <div className="flex items-center gap-10">
          <span className="text-[14px] font-semibold uppercase text-white">
            Shrikant Nikam
          </span>
          <span className="text-[14px] font-semibold uppercase text-white opacity-100">
            Work
          </span>
          <span className="text-[14px] font-semibold uppercase text-white opacity-70">
            About
          </span>
        </div>
      </div>
    </SubSection>
  );
}

/* ─────────────────────────── Motion ─────────────────────────── */
function Motion() {
  return (
    <Section id="motion" eyebrow="03" title="Motion">
      <Animations />
      <EasingDuration />
      <ReducedMotion />
    </Section>
  );
}

function Animations() {
  const items = [
    {
      name: "rise-in",
      desc: "Section enters with a 12px upward slide. Driven by view() timeline.",
    },
    {
      name: "drift-up",
      desc: "Subtle parallax: 18px → −18px while element is in viewport.",
    },
    {
      name: "drift-down",
      desc: "Reverse of drift-up. Used for layered hero details.",
    },
    {
      name: "hero-parallax",
      desc: "Hero copy slides −32px and fades to 0.9 opacity over the first 90vh of scroll.",
    },
    {
      name: "marquee",
      desc: "Continuous translateX 0 → −50% over 35s. Pauses on hover.",
    },
  ];
  return (
    <SubSection
      title="Animations"
      description="Animations are scroll-driven where supported (Chromium 115+), no-op elsewhere."
    >
      <div className="grid grid-cols-1 gap-3">
        {items.map((a) => (
          <div
            key={a.name}
            data-sysrow
            className="rounded-[12px] border border-black/10 px-5 py-4"
          >
            <p className="font-mono text-[12px] font-semibold text-[color:var(--fg)]">
              .{a.name}
            </p>
            <p className="mt-1 text-[13px] text-[color:var(--muted)]">
              {a.desc}
            </p>
          </div>
        ))}
      </div>
    </SubSection>
  );
}

function EasingDuration() {
  return (
    <SubSection
      title="Easing & duration"
      description="Fast hovers, slower scroll-driven motion. Linear for marquee and timeline-based animations."
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Tile label="Hover transition" mono="duration-300 · ease-out">
          <span className="text-[14px] text-[color:var(--fg)]">
            Buttons & links
          </span>
        </Tile>
        <Tile label="Card lift" mono="duration-300 · transform">
          <span className="text-[14px] text-[color:var(--fg)]">
            -translate-y-1 on group-hover
          </span>
        </Tile>
        <Tile label="Marquee" mono="35s · linear · infinite">
          <span className="text-[14px] text-[color:var(--fg)]">
            transform: translateX
          </span>
        </Tile>
        <Tile label="Scroll timeline" mono="animation-timeline: view()">
          <span className="text-[14px] text-[color:var(--fg)]">
            entry / cover ranges
          </span>
        </Tile>
      </div>
    </SubSection>
  );
}

function ReducedMotion() {
  return (
    <SubSection
      title="Reduced motion"
      description="Every keyframe-driven helper is short-circuited under prefers-reduced-motion. Parallax flattens, marquee freezes, opacity stays at 1."
    >
      <div className="rounded-[12px] border border-black/10 bg-[color:var(--off)] px-5 py-5">
        <pre className="overflow-x-auto font-mono text-[12px] leading-[1.6] text-[color:var(--fg)]">
{`@media (prefers-reduced-motion: reduce) {
  .rise-in, .drift-up, .drift-down,
  .hero-parallax, .marquee-track {
    animation: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
}`}
        </pre>
      </div>
    </SubSection>
  );
}

/* ─────────────────────────── Primitives ─────────────────────────── */
function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-20 md:py-[120px]">
      <Container>
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
            {eyebrow}
          </span>
          <h2 className="text-[32px] font-semibold leading-[1] tracking-[-0.04em] text-[color:var(--fg)] md:text-[44px]">
            {title}
          </h2>
        </div>
        <div className="mt-12 space-y-16 md:mt-16 md:space-y-24">{children}</div>
      </Container>
    </section>
  );
}

function SubSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="border-t border-black/10 pt-8">
        <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-[color:var(--fg)] md:text-[24px]">
          {title}
        </h3>
        {description ? (
          <p className="mt-2 max-w-[640px] text-[14px] leading-[1.7] text-[color:var(--muted)]">
            {description}
          </p>
        ) : null}
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div data-sysrow className="flex flex-col gap-3 rounded-[12px] border border-black/10 px-5 py-5 md:flex-row md:items-center md:justify-between">
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--muted)]">
        {label}
      </p>
      <div>{children}</div>
    </div>
  );
}

function Tile({
  label,
  mono,
  children,
}: {
  label: string;
  mono: string;
  children: ReactNode;
}) {
  return (
    <div data-sysrow className="rounded-[12px] border border-black/10 px-5 py-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[color:var(--muted)]">
        {label}
      </p>
      <div className="mt-2">{children}</div>
      <p className="mt-3 font-mono text-[11px] text-[color:var(--muted)]">
        {mono}
      </p>
    </div>
  );
}

function Spec({ children }: { children: ReactNode }) {
  return (
    <p className="inline-block rounded-full border border-black/10 bg-[color:var(--off)] px-3 py-1 font-mono text-[11px] text-[color:var(--muted)]">
      {children}
    </p>
  );
}
