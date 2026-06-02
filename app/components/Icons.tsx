import type { SVGProps } from "react";

/* ────────────────────────────────────────────────────────────
   Icon system for the Task Management redesign.

   Shipped:
     • ProfileIcon — geometric avatar mark.
     • Energy icons — Low, Light, Moderate, High, Maximal.
       Each is a lightning bolt inside a circle. The bolt's
       visual weight grows with the level so the scale reads as
       a glance ladder:
         Low      outline bolt, faint backdrop
         Light    outline bolt, soft backdrop
         Moderate flat-filled bolt
         High     gradient bolt (silver → amber)
         Maximal  gradient bolt + radiating spark halo
   ──────────────────────────────────────────────────────────── */

export type EnergyLevel = "low" | "light" | "moderate" | "high" | "maximal";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const baseSvgProps = (
  size = 24,
  viewBox = "0 0 24 24",
): Partial<SVGProps<SVGSVGElement>> => ({
  width: size,
  height: size,
  viewBox,
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
});

/* ─────────────────────────── Profile ─────────────────────────── */
export function ProfileIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg {...baseSvgProps(size)} {...rest}>
      <circle cx="12" cy="8.25" r="3.75" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4.5 20.25c0-3.728 3.358-6.75 7.5-6.75s7.5 3.022 7.5 6.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M19.5 5.25l1.25 1.25-1.25 1.25-1.25-1.25 1.25-1.25z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ───────────────────────── Navigation set ───────────────────────── */
/* All single-stroke marks at 24×24, 1.6px round joins/caps so they
   sit consistently next to the profile mark. Use currentColor for
   theming. */

export function HomeIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg {...baseSvgProps(size)} {...rest}>
      <path
        d="M3.5 10.75 12 4l8.5 6.75V20a.75.75 0 0 1-.75.75H4.25A.75.75 0 0 1 3.5 20v-9.25Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.75 20.75v-5.5h4.5v5.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CalendarIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg {...baseSvgProps(size)} {...rest}>
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="15"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M3.5 10h17"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M8 3.5v3.5M16 3.5v3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="8.25" cy="14" r="0.9" fill="currentColor" />
      <circle cx="12" cy="14" r="0.9" fill="currentColor" />
      <circle cx="15.75" cy="14" r="0.9" fill="currentColor" />
      <circle cx="8.25" cy="17.25" r="0.9" fill="currentColor" />
      <circle cx="12" cy="17.25" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function InsightsIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg {...baseSvgProps(size)} {...rest}>
      {/* baseline */}
      <path
        d="M3.5 20.5h17"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* trend line */}
      <path
        d="M4.5 15.5 9 11l3.5 3 7-7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* end arrow */}
      <path
        d="M15.5 7h4v4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* data dot */}
      <circle cx="9" cy="11" r="1.4" fill="currentColor" />
    </svg>
  );
}

/* ─────────────────────────── Theme set ─────────────────────────── */

export function LightModeIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg {...baseSvgProps(size)} {...rest}>
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <g
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <line x1="12" y1="2.5" x2="12" y2="4.5" />
        <line x1="12" y1="19.5" x2="12" y2="21.5" />
        <line x1="2.5" y1="12" x2="4.5" y2="12" />
        <line x1="19.5" y1="12" x2="21.5" y2="12" />
        <line x1="5.2" y1="5.2" x2="6.6" y2="6.6" />
        <line x1="17.4" y1="17.4" x2="18.8" y2="18.8" />
        <line x1="18.8" y1="5.2" x2="17.4" y2="6.6" />
        <line x1="6.6" y1="17.4" x2="5.2" y2="18.8" />
      </g>
    </svg>
  );
}

export function DarkModeIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg {...baseSvgProps(size)} {...rest}>
      <path
        d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a6.75 6.75 0 0 0 11 11Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* ─────────────────────── Cheer / status mark ─────────────────────── */
/*
  A single sparkle used in both success ("ahead, doing best") and
  recovery ("not doing well") states. The vibe shifts via the copy
  that sits next to it; the mark itself stays warm and supportive so
  it never feels celebratory in a moment that calls for empathy.
*/
export function CheerIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg {...baseSvgProps(size)} {...rest}>
      {/* main 4-point sparkle */}
      <path
        d="M12 3 13.4 10.6 21 12 13.4 13.4 12 21 10.6 13.4 3 12 10.6 10.6Z"
        fill="currentColor"
      />
      {/* satellite sparkle */}
      <path
        d="M19 3.5 19.6 6.4 22.5 7 19.6 7.6 19 10.5 18.4 7.6 15.5 7 18.4 6.4Z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
}

/* ─────────────────────────── Energy: bolt ─────────────────────────── */

/*
  Plain bolt — no surrounding frame, no extras. Centered in a 36×36
  viewBox. Fill matches the level's task colour; border is consistent
  across the family.
*/
const BOLT_PATH =
  "M20.5 4 L9.5 21 H16 L14 32 L26.5 15 H20 L20.5 4 Z";

const BOLT_STROKE = "#1A1A1A";
const BOLT_STROKE_WIDTH = 1.6;

type EnergyIconProps = IconProps;

function Bolt({ fill }: { fill: string }) {
  return (
    <path
      d={BOLT_PATH}
      fill={fill}
      stroke={BOLT_STROKE}
      strokeWidth={BOLT_STROKE_WIDTH}
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  );
}

export function EnergyLowIcon({ size = 32, ...rest }: EnergyIconProps) {
  return (
    <svg {...baseSvgProps(size, "0 0 36 36")} {...rest}>
      <Bolt fill="#B6E2DD" />
    </svg>
  );
}

export function EnergyLightIcon({ size = 32, ...rest }: EnergyIconProps) {
  return (
    <svg {...baseSvgProps(size, "0 0 36 36")} {...rest}>
      <Bolt fill="#C9E8B5" />
    </svg>
  );
}

export function EnergyModerateIcon({ size = 32, ...rest }: EnergyIconProps) {
  return (
    <svg {...baseSvgProps(size, "0 0 36 36")} {...rest}>
      <Bolt fill="#FFD9D6" />
    </svg>
  );
}

export function EnergyHighIcon({ size = 32, ...rest }: EnergyIconProps) {
  return (
    <svg {...baseSvgProps(size, "0 0 36 36")} {...rest}>
      <Bolt fill="#F5DE7B" />
    </svg>
  );
}

export function EnergyMaximalIcon({ size = 32, ...rest }: EnergyIconProps) {
  return (
    <svg {...baseSvgProps(size, "0 0 36 36")} {...rest}>
      <Bolt fill="#FF5A4A" />
    </svg>
  );
}

/* ─────────────────────── Lookup helpers ─────────────────────── */

export const ENERGY_META: Record<
  EnergyLevel,
  {
    label: string;
    range: string;
    minMinutes: number;
    maxMinutes: number;
    color: string;
    description: string;
  }
> = {
  low: {
    label: "Low",
    range: "0–15 min",
    minMinutes: 0,
    maxMinutes: 15,
    color: "#B6E2DD",
    description: "Small tasks. Quick wins. Inbox-zero energy.",
  },
  light: {
    label: "Light",
    range: "15–30 min",
    minMinutes: 15,
    maxMinutes: 30,
    color: "#C9E8B5",
    description: "Short, focused work. Reply, review, sketch.",
  },
  moderate: {
    label: "Moderate",
    range: "30–45 min",
    minMinutes: 30,
    maxMinutes: 45,
    color: "#FFD9D6",
    description: "A real chunk. Steady, no heroics.",
  },
  high: {
    label: "High",
    range: "45–60 min",
    minMinutes: 45,
    maxMinutes: 60,
    color: "#F5DE7B",
    description: "Important task. Heads down, phone away.",
  },
  maximal: {
    label: "Maximal",
    range: "60–90 min",
    minMinutes: 60,
    maxMinutes: 90,
    color: "#FF5A4A",
    description: "Deep focus. The one that moves the needle.",
  },
};

export function EnergyIcon({
  level,
  size = 32,
  ...rest
}: EnergyIconProps & { level: EnergyLevel }) {
  switch (level) {
    case "low":
      return <EnergyLowIcon size={size} {...rest} />;
    case "light":
      return <EnergyLightIcon size={size} {...rest} />;
    case "moderate":
      return <EnergyModerateIcon size={size} {...rest} />;
    case "high":
      return <EnergyHighIcon size={size} {...rest} />;
    case "maximal":
      return <EnergyMaximalIcon size={size} {...rest} />;
  }
}
