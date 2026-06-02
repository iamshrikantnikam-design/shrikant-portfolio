"use client";

import { useState } from "react";

const EMBER = "#D8651F";
const EMBER_DEEP = "#7A2E0A";
const EMBER_FAINT = "rgba(216, 101, 31, 0.18)";
const EMBER_LINE = "rgba(216, 101, 31, 0.32)";
const SHELL = "#0A0604";

export default function MoodPlanSplashPage() {
  const [nonce, setNonce] = useState(0);

  return (
    <main className="min-h-screen w-full bg-black text-white">
      <div className="mx-auto flex min-h-screen max-w-[480px] flex-col items-center justify-center gap-8 px-6 py-12">
        <header className="w-full text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/45">
            MoodPlan · Splash
          </p>
          <h1 className="mt-2 text-[18px] font-semibold tracking-[-0.01em] text-white/90">
            Cold-launch screen
          </h1>
        </header>

        <PhoneFrame key={nonce} />

        <button
          onClick={() => setNonce((n) => n + 1)}
          className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-2 text-[12px] font-medium uppercase tracking-[0.16em] text-white/80 transition hover:bg-white/[0.08] hover:text-white"
        >
          Replay
        </button>
      </div>

      <style>{css}</style>
    </main>
  );
}

function PhoneFrame() {
  return (
    <div
      className="relative overflow-hidden rounded-[44px] border p-[6px]"
      style={{
        background: "linear-gradient(180deg, #1a1a1a 0%, #050505 100%)",
        borderColor: "rgba(255,255,255,0.08)",
        boxShadow: "0 60px 140px -40px rgba(0,0,0,0.9)",
      }}
    >
      <div
        className="relative h-[760px] w-[360px] overflow-hidden rounded-[38px]"
        style={{ background: SHELL }}
      >
        {/* base ember radial */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(120% 70% at 50% 105%, ${EMBER} 0%, ${EMBER_DEEP} 22%, rgba(20,8,3,0) 55%),
              radial-gradient(80% 60% at 50% 45%, rgba(216,101,31,0.08) 0%, rgba(0,0,0,0) 70%)
            `,
          }}
        />

        {/* breathing ember */}
        <div
          aria-hidden
          className="ember-breath absolute inset-x-0 bottom-0 h-[55%]"
          style={{
            background: `radial-gradient(70% 100% at 50% 100%, ${EMBER} 0%, rgba(216,101,31,0) 70%)`,
            mixBlendMode: "screen",
          }}
        />

        {/* status bar */}
        <div className="relative z-10 flex items-center justify-between px-7 pt-3 text-[14px] font-semibold text-white/85">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <SignalIcon />
            <WifiIcon />
            <BatteryIcon />
          </div>
        </div>

        {/* dynamic island */}
        <div className="absolute left-1/2 top-3 z-20 h-[34px] w-[120px] -translate-x-1/2 rounded-full bg-black" />

        {/* concentric rings */}
        <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center">
          <div className="relative grid place-items-center" style={{ marginTop: -60 }}>
            <Ring size={220} delay={0} />
            <Ring size={150} delay={0.35} />
            <Ring size={90} delay={0.7} />
            <div
              className="dot-core absolute h-[10px] w-[10px] rounded-full"
              style={{
                background: EMBER,
                boxShadow: `0 0 18px ${EMBER}, 0 0 4px #fff`,
              }}
            />
          </div>
        </div>

        {/* loading dots */}
        <div className="absolute inset-x-0 bottom-[120px] z-10 flex items-center justify-center gap-2">
          <Dot delay="0s" />
          <Dot delay="0.18s" />
          <Dot delay="0.36s" />
        </div>

        {/* home indicator */}
        <div className="absolute inset-x-0 bottom-2 z-20 flex justify-center">
          <span className="h-[5px] w-[120px] rounded-full bg-white/55" />
        </div>
      </div>
    </div>
  );
}

function Ring({ size, delay }: { size: number; delay: number }) {
  return (
    <span
      className="ring absolute rounded-full"
      style={{
        width: size,
        height: size,
        border: `1px solid ${EMBER_LINE}`,
        boxShadow: `inset 0 0 30px ${EMBER_FAINT}`,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="loading-dot h-[7px] w-[7px] rounded-full"
      style={{ background: EMBER, animationDelay: delay }}
    />
  );
}

function SignalIcon() {
  return (
    <svg width="18" height="11" viewBox="0 0 18 11" fill="none">
      {[3, 5, 7, 9].map((h, i) => (
        <rect
          key={i}
          x={i * 4}
          y={11 - h}
          width="3"
          height={h}
          rx="0.6"
          fill="rgba(255,255,255,0.9)"
        />
      ))}
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
      <path
        d="M8 9.5a1.2 1.2 0 1 0 0 .01M3.6 6.1a6.2 6.2 0 0 1 8.8 0M1.2 3.7a9.6 9.6 0 0 1 13.6 0"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
      <rect
        x="0.5"
        y="0.5"
        width="22"
        height="11"
        rx="3"
        stroke="rgba(255,255,255,0.9)"
        fill="none"
      />
      <rect x="2" y="2" width="19" height="8" rx="1.6" fill="rgba(255,255,255,0.9)" />
      <rect x="23.5" y="3.5" width="2" height="5" rx="1" fill="rgba(255,255,255,0.9)" />
    </svg>
  );
}

const css = `
@keyframes ringPulse {
  0%   { transform: scale(0.6); opacity: 0; }
  35%  { opacity: 1; }
  100% { transform: scale(1.15); opacity: 0; }
}
.ring {
  animation: ringPulse 2.6s ease-out infinite;
}
@keyframes dotCore {
  0%, 100% { transform: scale(1); opacity: 0.95; }
  50%      { transform: scale(1.3); opacity: 1; }
}
.dot-core { animation: dotCore 1.8s ease-in-out infinite; }

@keyframes loadingDot {
  0%, 80%, 100% { opacity: 0.25; transform: translateY(0); }
  40%           { opacity: 1; transform: translateY(-3px); }
}
.loading-dot { animation: loadingDot 1.1s ease-in-out infinite; }

@keyframes emberBreath {
  0%, 100% { opacity: 0.85; transform: translateY(0); }
  50%      { opacity: 1; transform: translateY(-6px); }
}
.ember-breath { animation: emberBreath 3.6s ease-in-out infinite; }
`;
