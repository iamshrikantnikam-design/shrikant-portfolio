"use client";

import { useState } from "react";

// Cover halves are transparent — the black frame behind shows through.
// On open, the halves slide outward, taking only the inner white
// mini-frames with them; the black surface stays put.
const COVER_CLASS = "overflow-hidden rounded-[20px]";
const REVEAL_CLASS =
  "absolute inset-0 overflow-hidden rounded-[20px] bg-black shadow-[0_8px_30px_-12px_rgba(0,0,0,0.4)]";

const REVEAL_DURATION_MS = 1100;

/**
 * VisualFeed — click-to-reveal. Closed: one white frame (two halves
 * abutting at center). Clicking the frame slides the halves outward
 * over ~3.5s, revealing a single black frame behind. One-shot.
 */
export function VisualFeed() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative aspect-[4/3] w-full md:aspect-[11/6]">
      {/* Frame 2 — single solid black surface revealed once the cover
          splits away. */}
      <div className={REVEAL_CLASS} />

      {/*
        Cover: two white halves abut at center so the closed state reads
        as one continuous frame. Inner edges are borderless and outer
        corners rounded so the seam is invisible. On open, each half
        slides outward off its own side.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-visible"
      >
        {/*
          Each half is w-1/2 and holds one column of the 2×2 staggered
          grid:
          - Left:  small (top) + big (bottom)
          - Right: big   (top) + small (bottom)
          Gutters are all 24px:
          - p-6 = 24px margin from the outer container edges
          - gap-6 = 24px vertical gap between top and bottom rows
          - pr-3 + pl-3 = 24px center gap between the two columns
        */}
        <div
          className={`${COVER_CLASS} absolute inset-y-0 left-0 flex w-1/2 flex-col gap-6 rounded-r-none p-6 pr-3`}
          style={{
            transform: open ? "translateX(-110%)" : "translateX(0)",
            transition: `transform ${REVEAL_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          }}
        >
          <div className="flex-[2] rounded-[14px] bg-white" />
          <div className="flex-[3] rounded-[14px] bg-white" />
        </div>
        <div
          className={`${COVER_CLASS} absolute inset-y-0 right-0 flex w-1/2 flex-col gap-6 rounded-l-none p-6 pl-3`}
          style={{
            transform: open ? "translateX(110%)" : "translateX(0)",
            transition: `transform ${REVEAL_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          }}
        >
          <div className="flex-[3] rounded-[14px] bg-white" />
          <div className="flex-[2] rounded-[14px] bg-white" />
        </div>
      </div>

      {/*
        Click target — sits on top of the closed cover so the whole
        frame is one tap zone. Unmounts once open so it doesn't block
        anything behind the revealed frame.
      */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open visual feed"
          className="absolute inset-0 cursor-pointer rounded-[20px] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
        />
      )}
    </div>
  );
}
