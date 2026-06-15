"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { label: "Work", href: "/" },
  { label: "About", href: "/about" },
  { label: "System", href: "/design-system" },
] as const;

/**
 * Floating navbar — pill-shaped with white border.
 * Clean, minimal design with adaptive text color.
 */
export function Nav() {
  const pathname = usePathname();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center pt-4 md:pt-6">
      <nav className="pointer-events-auto inline-flex items-center gap-6 rounded-full border border-white/30 bg-white/5 px-8 py-3 backdrop-blur-xl backdrop-saturate-150 md:gap-8 md:px-10 md:py-4">
        <Link
          href="/"
          className="text-sm font-bold uppercase tracking-wider text-black md:text-base"
        >
          Shrikant Nikam
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`text-sm font-semibold uppercase tracking-wide transition-opacity duration-300 ${
                  isActive ? "text-black opacity-100" : "text-black/60 hover:text-black hover:opacity-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
