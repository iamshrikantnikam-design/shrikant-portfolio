"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Floating contact CTA, pinned to the bottom-right of the viewport.
 *
 * Replaces the prior Contact item in the top nav. Mounted at the layout
 * level so it persists across every route. z-index sits below the nav
 * (z-90 vs nav's z-100) so the nav still wins when their hit zones
 * overlap on narrow viewports.
 *
 * Smart docking — when the SHRIKANT NIKAM signature (data-pill-stop
 * marker) enters the viewport from below, the pill rises with it so
 * it always rests in the empty dark space ABOVE the signature instead
 * of overlapping it. Off the contact section, the pill sits at its
 * normal viewport-bottom offset.
 */
const PILL_HEIGHT = 48;
const DEFAULT_BOTTOM = 32; // md:bottom-8 ≈ 32px
const SAFE_GAP = 20;

export function FloatingContact() {
  const pathname = usePathname() ?? "";
  const [bottomPx, setBottomPx] = useState(DEFAULT_BOTTOM);

  // The Contact pill is a top-level navigation aid for the website
  // shell only. Show it on the home (which doubles as "Work") and
  // the About page. Hide on every detail surface — case-study
  // long-reads, design-system, and the prototype deck — where the
  // pill would compete with that surface's own chrome (e.g. the
  // prototype's bottom tab bar, the case study's contact section).
  const isPillRoute = pathname === "/" || pathname === "/about";
  if (!isPillRoute) return null;


  useEffect(() => {
    const stop = document.querySelector<HTMLElement>("[data-pill-stop]");
    if (!stop) return;
    const compute = () => {
      const r = stop.getBoundingClientRect();
      const vp = window.innerHeight;
      // Where the signature top sits in viewport coords.
      const sigTopInVp = r.top;
      // If the pill at its default bottom would overlap the
      // signature (i.e., the signature top is above where the pill
      // ends), push the pill up so its top sits SAFE_GAP above the
      // signature top.
      // Threshold = where the pill's bottom currently sits, plus the
      // safety gap. If the signature top crosses ABOVE that line
      // (i.e., it's higher up in the viewport), the pill needs to
      // rise to stay clear.
      const overlapThreshold = vp - DEFAULT_BOTTOM + SAFE_GAP;
      if (sigTopInVp < overlapThreshold) {
        setBottomPx(vp - sigTopInVp + SAFE_GAP);
      } else {
        setBottomPx(DEFAULT_BOTTOM);
      }
    };
    compute();
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        compute();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <a
      href="#contact"
      aria-label="Jump to contact section"
      className="fixed right-5 z-[90] inline-flex h-12 items-center justify-center rounded-full border border-white/50 px-6 text-[13px] font-semibold uppercase tracking-[0.04em] text-white backdrop-blur-md backdrop-saturate-125 transition-transform duration-200 ease-out hover:-translate-y-0.5 md:right-8"
      style={{ mixBlendMode: "difference", bottom: `${bottomPx}px` }}
    >
      Contact
    </a>
  );
}
