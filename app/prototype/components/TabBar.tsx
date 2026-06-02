"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarIcon,
  HomeIcon,
  InsightsIcon,
  ProfileIcon,
} from "./Icons";

/*
  Persistent bottom tab bar shown across every /prototype/* screen.

  Layout:  Home · Day · (+) · Insights · Profile
  - The center is a raised FAB that always opens /prototype/add-task.
  - Pill floats with shadow, breathing room below for the home-bar gesture
    on iOS.
  - Hidden on the deck index (/prototype) so the overview reads as
    a presentation surface rather than a screen of the app itself.
*/

type Tab = {
  href: string;
  label: string;
  Icon: (props: { size?: number; filled?: boolean }) => JSX.Element;
  match: (path: string) => boolean;
};

const TABS: Tab[] = [
  {
    href: "/prototype/home",
    label: "Home",
    Icon: HomeIcon,
    match: (p) => p === "/prototype/home",
  },
  {
    href: "/prototype/your-day",
    label: "Day",
    Icon: CalendarIcon,
    match: (p) =>
      p === "/prototype/your-day" || p === "/prototype/your-week",
  },
  {
    href: "/prototype/insights-daily",
    label: "Insights",
    Icon: InsightsIcon,
    match: (p) => p.startsWith("/prototype/insights"),
  },
  {
    href: "/prototype/profile",
    label: "Profile",
    Icon: ProfileIcon,
    match: (p) =>
      p === "/prototype/profile" ||
      p === "/prototype/ahead" ||
      p === "/prototype/low-day",
  },
];

export function TabBar() {
  const pathname = usePathname() ?? "";
  if (pathname === "/prototype") return null;

  return (
    <nav
      aria-label="Primary navigation"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-5 pb-4"
    >
      <div className="pointer-events-auto relative flex w-full max-w-[420px] items-center justify-between rounded-[28px] border border-[#1A1A1A]/10 bg-white px-3 py-2 shadow-[0_18px_40px_-14px_rgba(14,14,14,0.32)]">
        <TabButton tab={TABS[0]} active={TABS[0].match(pathname)} />
        <TabButton tab={TABS[1]} active={TABS[1].match(pathname)} />
        <Fab />
        <TabButton tab={TABS[2]} active={TABS[2].match(pathname)} />
        <TabButton tab={TABS[3]} active={TABS[3].match(pathname)} />
      </div>
    </nav>
  );
}

function TabButton({ tab, active }: { tab: Tab; active: boolean }) {
  const { Icon } = tab;
  return (
    <Link
      href={tab.href}
      aria-label={tab.label}
      aria-current={active ? "page" : undefined}
      className={`relative grid h-12 w-12 place-items-center rounded-2xl transition-colors ${
        active ? "text-[#1A1A1A]" : "text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70"
      }`}
    >
      <Icon size={22} filled={active} />
      <span
        aria-hidden
        className={`absolute -bottom-1 h-1 w-1 rounded-full transition-opacity ${
          active ? "bg-[#1A1A1A] opacity-100" : "opacity-0"
        }`}
      />
    </Link>
  );
}

function Fab() {
  return (
    <Link
      href="/prototype/add-task"
      aria-label="Add task"
      className="grid h-14 w-14 -translate-y-3 place-items-center rounded-full bg-[#0E0E0E] text-white shadow-[0_14px_28px_-10px_rgba(14,14,14,0.5)] transition-transform hover:-translate-y-4"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
      >
        <path
          d="M12 5v14M5 12h14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </Link>
  );
}
