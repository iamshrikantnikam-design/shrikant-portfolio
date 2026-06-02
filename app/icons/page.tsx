import { Anton, Oswald } from "next/font/google";
import {
  ProfileIcon,
  EnergyIcon,
  ENERGY_META,
  HomeIcon,
  CalendarIcon,
  InsightsIcon,
  LightModeIcon,
  DarkModeIcon,
  CheerIcon,
  type EnergyLevel,
} from "../components/Icons";

const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap" });
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata = {
  title: "Icon System · Task Management",
  description: "Profile icon + bolt-in-circle energy scale.",
};

const LEVELS: EnergyLevel[] = ["low", "light", "moderate", "high", "maximal"];

export default function IconsPage() {
  return (
    <main
      className={`${oswald.className} min-h-screen bg-[#EFEFEF] px-6 py-16 text-[#1A1A1A] md:px-12 md:py-24`}
    >
      <div className="mx-auto max-w-[1100px]">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#7C7C7C]">
          v2 · Task Management
        </p>
        <h1
          className={`${anton.className} mt-3 text-[56px] leading-[0.9] tracking-tight md:text-[88px]`}
        >
          Icon System
        </h1>
        <p className="mt-5 max-w-[560px] text-[15px] leading-[1.6] text-[#4A4A4A]">
          Profile mark + five-step bolt-in-circle energy scale. Each level grows
          in weight: outline → flat fill → gradient → gradient with halo.
        </p>

        {/* ─── Profile ─── */}
        <section className="mt-16">
          <SectionHead label="01 / Profile" title="Avatar mark" />
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <ProfileCard size={20} caption="20 · sm" />
            <ProfileCard size={28} caption="28 · md" />
            <ProfileCard size={40} caption="40 · lg" />
            <ProfileCard size={56} caption="56 · xl" />
          </div>
        </section>

        {/* ─── Navigation ─── */}
        <section className="mt-20">
          <SectionHead label="02 / Navigation" title="Primary nav set" />
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <IconTile label="Home"><HomeIcon size={32} /></IconTile>
            <IconTile label="Calendar"><CalendarIcon size={32} /></IconTile>
            <IconTile label="Insights"><InsightsIcon size={32} /></IconTile>
            <IconTile label="Profile"><ProfileIcon size={32} /></IconTile>
          </div>
        </section>

        {/* ─── Theme ─── */}
        <section className="mt-20">
          <SectionHead label="03 / Theme" title="Mode toggle" />
          <div className="mt-6 grid grid-cols-2 gap-3">
            <IconTile label="Light mode" tone="light">
              <LightModeIcon size={32} />
            </IconTile>
            <IconTile label="Dark mode" tone="dark">
              <DarkModeIcon size={32} />
            </IconTile>
          </div>
        </section>

        {/* ─── Cheer ─── */}
        <section className="mt-20">
          <SectionHead
            label="04 / Status"
            title="One mark, two moods"
          />
          <p className="mt-3 max-w-[560px] text-[14px] text-[#7C7C7C]">
            A single sparkle pairs with the copy. The vibe shifts via the
            message; the mark stays warm in both moments.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
            <CheerCard
              tone="win"
              headline="Ahead of the day."
              sub="You're crushing it. Keep the streak alive."
            />
            <CheerCard
              tone="recover"
              headline="Heavy day, huh?"
              sub="One small task is enough. We'll start there."
            />
          </div>
        </section>

        {/* ─── Energy ─── */}
        <section className="mt-20">
          <SectionHead
            label="05 / Energy"
            title="Five-step energy & time scale"
          />
          <p className="mt-3 max-w-[560px] text-[14px] text-[#7C7C7C]">
            Energy doubles as task duration. Bolt weight grows with the level.
          </p>

          {/* Hero row — coloured cards */}
          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-5">
            {LEVELS.map((lvl) => (
              <EnergyCard key={lvl} level={lvl} />
            ))}
          </div>

          {/* Size ladder on white */}
          <div className="mt-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7C7C7C]">
              Size ladder
            </p>
            <div className="mt-4 grid grid-cols-5 gap-3 rounded-3xl bg-white p-8">
              {LEVELS.map((lvl) => (
                <div
                  key={lvl}
                  className="flex flex-col items-center gap-5 py-2"
                >
                  <EnergyIcon level={lvl} size={24} />
                  <EnergyIcon level={lvl} size={36} />
                  <EnergyIcon level={lvl} size={56} />
                  <span
                    className={`${anton.className} mt-1 text-[14px] uppercase tracking-wide`}
                  >
                    {ENERGY_META[lvl].label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* In-context pills */}
          <div className="mt-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7C7C7C]">
              In context · pill specimens
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {LEVELS.map((lvl) => {
                const m = ENERGY_META[lvl];
                return (
                  <div
                    key={lvl}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-2 py-1.5 pr-4 text-[13px]"
                  >
                    <EnergyIcon level={lvl} size={28} />
                    <span
                      className={`${anton.className} uppercase tracking-wide`}
                    >
                      {m.label}
                    </span>
                    <span className="text-[#1A1A1A]/55">· {m.range}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Spec table ─── */}
        <section className="mt-20">
          <SectionHead label="06 / Spec" title="Mapping reference" />
          <div className="mt-6 overflow-hidden rounded-3xl bg-white">
            <table className="w-full text-left text-[14px]">
              <thead className="bg-[#F4F4F4] text-[11px] uppercase tracking-[0.18em] text-[#7C7C7C]">
                <tr>
                  <th className="px-5 py-3 font-medium">Level</th>
                  <th className="px-5 py-3 font-medium">Duration</th>
                  <th className="px-5 py-3 font-medium">Use for</th>
                </tr>
              </thead>
              <tbody>
                {LEVELS.map((lvl) => {
                  const m = ENERGY_META[lvl];
                  return (
                    <tr key={lvl} className="border-t border-[#EFEFEF]">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <EnergyIcon level={lvl} size={36} />
                          <span
                            className={`${anton.className} text-[18px] uppercase tracking-wide`}
                          >
                            {m.label}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[#1A1A1A]">{m.range}</td>
                      <td className="px-5 py-4 text-[#4A4A4A]">
                        {m.description}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <p className="mt-16 text-[12px] uppercase tracking-[0.2em] text-[#7C7C7C]">
          /icons · v2
        </p>
      </div>
    </main>
  );
}

function SectionHead({ label, title }: { label: string; title: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7C7C7C]">
        {label}
      </p>
      <h2 className="mt-2 text-[28px] tracking-tight md:text-[36px]">
        {title}
      </h2>
    </div>
  );
}

function ProfileCard({ size, caption }: { size: number; caption: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-3xl bg-white py-10">
      <ProfileIcon size={size} />
      <span className="text-[11px] uppercase tracking-[0.18em] text-[#7C7C7C]">
        {caption}
      </span>
    </div>
  );
}

function IconTile({
  label,
  children,
  tone = "default",
}: {
  label: string;
  children: React.ReactNode;
  tone?: "default" | "light" | "dark";
}) {
  const bg =
    tone === "dark" ? "#0E0E0E" : tone === "light" ? "#FFFFFF" : "#FFFFFF";
  const fg = tone === "dark" ? "#FFFFFF" : "#1A1A1A";
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 rounded-3xl py-10"
      style={{ background: bg, color: fg }}
    >
      {children}
      <span
        className={`${anton.className} text-[14px] uppercase tracking-wide`}
      >
        {label}
      </span>
    </div>
  );
}

function CheerCard({
  tone,
  headline,
  sub,
}: {
  tone: "win" | "recover";
  headline: string;
  sub: string;
}) {
  const bg = tone === "win" ? "#C9E8B5" : "#FFD9D6";
  return (
    <div
      className="flex flex-col gap-4 rounded-3xl p-6"
      style={{ background: bg }}
    >
      <CheerIcon size={36} />
      <div>
        <h3
          className={`${anton.className} text-[28px] uppercase leading-[0.95] tracking-tight`}
        >
          {headline}
        </h3>
        <p className="mt-2 text-[14px] text-[#1A1A1A]/70">{sub}</p>
      </div>
    </div>
  );
}

function EnergyCard({ level }: { level: EnergyLevel }) {
  const m = ENERGY_META[level];
  return (
    <div className="rounded-3xl p-5" style={{ background: m.color }}>
      <div className="flex items-start justify-between">
        <EnergyIcon level={level} size={44} />
        <span className="text-[11px] uppercase tracking-[0.18em] text-[#1A1A1A]/60">
          {String(LEVELS.indexOf(level) + 1).padStart(2, "0")}
        </span>
      </div>
      <h3
        className={`${anton.className} mt-8 text-[26px] uppercase leading-none tracking-tight`}
      >
        {m.label}
      </h3>
      <p className="mt-1.5 text-[13px] text-[#1A1A1A]/70">{m.range}</p>
    </div>
  );
}
