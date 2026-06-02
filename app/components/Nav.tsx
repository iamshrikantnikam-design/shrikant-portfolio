"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Container } from "./Container";

const ITEMS = [
  { label: "Work", href: "/" },
  { label: "About", href: "/about" },
  { label: "System", href: "/design-system" },
] as const;

type Theme = "onDark" | "onLight";

/**
 * Sample the actual background behind the nav. Same per-pixel-luma
 * check as before, but now it runs once for the parent pill (rather
 * than per child item) since all the nav content lives in a single
 * glass container.
 */
function detectTheme(el: HTMLElement): Theme {
  const r = el.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  // Hide the WHOLE nav (header) during the sample so the parent
  // pill's own tinted bg isn't what we detect — we want the page
  // content sitting behind the nav, not the nav itself.
  const header = el.closest("header") as HTMLElement | null;
  const hidden = header ?? el;
  const prev = hidden.style.visibility;
  hidden.style.visibility = "hidden";
  const behind = document.elementFromPoint(x, y);
  hidden.style.visibility = prev;

  // Walk up looking for the SOLID background — semi-transparent
  // tints (e.g. `rgba(0,0,0,0.05)` decorative overlays) compose to
  // mostly-the-color-behind-them, so we ignore them and keep
  // climbing until we find an element whose bg has alpha ≥ 0.5.
  // Then read its rgb to classify dark vs light.
  let target: Element | null = behind;
  let bg = "";
  while (target && target !== document.documentElement) {
    const cs = getComputedStyle(target);
    if (
      cs.backgroundColor &&
      cs.backgroundColor !== "rgba(0, 0, 0, 0)" &&
      cs.backgroundColor !== "transparent"
    ) {
      const match = cs.backgroundColor.match(/(\d+(?:\.\d+)?)/g);
      if (match && match.length >= 3) {
        const alpha = match.length >= 4 ? +match[3] : 1;
        if (alpha >= 0.5) {
          bg = cs.backgroundColor;
          break;
        }
        // Otherwise: thin tint — keep walking
      }
    }
    target = target.parentElement;
  }
  // If we never hit a solid bg, fall back to the page default (light).
  if (!bg) return "onLight";
  const m = bg.match(/(\d+(?:\.\d+)?)/g);
  if (!m || m.length < 3) return "onLight";
  const [r2, g, b] = [+m[0], +m[1], +m[2]];
  const luma = 0.299 * r2 + 0.587 * g + 0.114 * b;
  return luma < 128 ? "onDark" : "onLight";
}

/**
 * Per-element theme hook. Each text element runs its own backdrop
 * sample so children can have different inks at the same time when
 * the parent pill straddles a dark/light boundary.
 */
function useAdaptiveTheme<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [theme, setTheme] = useState<Theme>("onLight");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setTheme(detectTheme(el));
    const initialRaf = requestAnimationFrame(() =>
      requestAnimationFrame(update),
    );
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(initialRaf);
      cancelAnimationFrame(raf);
    };
  }, []);
  return [ref, theme] as const;
}

/**
 * Floating navbar — one parent glass pill with per-text adaptive
 * coloring. The pill shell samples its center for border/bg tint.
 * Each text element samples its OWN position separately so brand and
 * link cluster pick their inks independently when the pill straddles
 * a light/dark boundary behind the nav.
 */
export function Nav() {
  const pathname = usePathname();
  const [shellRef, shellTheme] = useAdaptiveTheme<HTMLDivElement>();

  // Shell uses two stacked rings (outer light + inner dark) so the
  // outline reads against ANY backdrop — when one ring fades into
  // the page, the other shows through. A faint adaptive frost fill is
  // layered behind the heavier backdrop-blur so the pill always gives
  // its (also-adaptive) ink a consistent surface to read against —
  // without it, busy high-contrast backdrops (e.g. dark display type
  // peeking through a light panel) leave the text illegible.

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[100]">
      <Container className="md:!px-10">
        <nav className="flex h-[52px] items-center justify-center md:h-16">
          <div
            ref={shellRef}
            className="pointer-events-auto inline-flex h-10 items-center gap-7 rounded-full px-5 backdrop-blur-md backdrop-saturate-150 md:h-12 md:gap-8 md:px-6"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.5), inset 0 0 0 1px rgba(0,0,0,0.2)",
              backgroundColor:
                shellTheme === "onDark"
                  ? "rgba(10,10,15,0.45)"
                  : "rgba(255,255,255,0.55)",
            }}
          >
            <NavLink href="/" label="Shrikant Nikam" />
            <div className="hidden items-center gap-6 md:flex">
              {ITEMS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(item.href);
                return (
                  <NavLink
                    key={item.href}
                    {...item}
                    active={!!isActive}
                  />
                );
              })}
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}

/**
 * Adaptive text link — runs its own backdrop sample and flips ink
 * color independently of the parent pill's shell theme.
 */
function NavLink({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active?: boolean;
}) {
  const [ref, theme] = useAdaptiveTheme<HTMLAnchorElement>();
  return (
    <Link
      ref={ref}
      href={href}
      aria-current={active ? "page" : undefined}
      className={`text-[13px] font-semibold uppercase tracking-[0.02em] transition-colors duration-300 ${
        theme === "onDark" ? "text-white" : "text-black"
      } ${active === false ? "opacity-80 hover:opacity-100" : "opacity-100"}`}
    >
      {label}
    </Link>
  );
}
