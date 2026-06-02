import { Anton, Oswald } from "next/font/google";
import { ProfileIcon, LightModeIcon } from "../components/Icons";

const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap" });
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Profile · Task Management",
  description:
    "Profile, points wallet, gift voucher redemption, recent activity.",
};

/*
  Profile screen.

  Layout, top → bottom:
    Header        "Profile" title + light/dark mode chip
    User card     Avatar, name, email, 3-stat row
    Points wallet Big pts number, ₹ value, progress bar to next tier
    Redeem as     Brand voucher card with chips
    Recent        Two-row activity list
    Sticky CTA    "Redeem ₹X now"
*/

const PTS = 340;
const NEXT_TIER = 500;
const CASH = "₹34";

const BRANDS = ["Amazon", "Flipkart", "Swiggy", "Zomato", "Myntra"];

const ACTIVITY = [
  { id: "a1", title: "Task completed", when: "Today · 11:30 AM", pts: 5 },
  { id: "a2", title: "Daily check-in", when: "Today · 9:00 AM", pts: 10 },
  { id: "a3", title: "Streak bonus", when: "Yesterday", pts: 15 },
];

export default function ProfilePage() {
  return (
    <main
      className={`${oswald.className} min-h-screen bg-[#EFEFEF] text-[#1A1A1A]`}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-white pb-[220px]">
        <StatusBar />

        <div className="flex flex-col gap-5 px-5 pt-4">
          <Header />
          <UserCard />
          <WalletCard pts={PTS} cash={CASH} nextTier={NEXT_TIER} />
          <SectionLabel>Redeem as</SectionLabel>
          <VoucherCard brands={BRANDS} />
          <ActivityCard />
        </div>

        <RedeemCta cash={CASH} />
      </div>
    </main>
  );
}

/* ───────────────────────── header ───────────────────────── */

function Header() {
  return (
    <div className="flex items-center justify-between pt-2">
      <h1
        className={`${anton.className} text-[44px] uppercase leading-[0.95] tracking-tight`}
      >
        Profile
      </h1>
      <button
        type="button"
        aria-label="Switch theme"
        className="grid h-10 w-10 place-items-center rounded-full bg-[#F4F4F4] text-[#1A1A1A]"
      >
        <LightModeIcon size={18} />
      </button>
    </div>
  );
}

/* ───────────────────────── user card ───────────────────────── */

function UserCard() {
  return (
    <section className="rounded-3xl bg-[#0E0E0E] p-5 text-white">
      <div className="flex items-center gap-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white/10">
          <ProfileIcon size={26} />
        </span>
        <div className="min-w-0">
          <p
            className={`${anton.className} truncate text-[22px] uppercase leading-none tracking-tight`}
          >
            Priya Sharma
          </p>
          <p className="mt-1.5 truncate text-[12px] text-white/65">
            priya.sharma@gmail.com
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/10 pt-5 text-center">
        <Stat value="340" label="pts total" />
        <Stat value="18" label="tasks done" />
        <Stat value="7" label="day streak" />
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="leading-none">
      <p className={`${anton.className} text-[28px] uppercase tracking-tight`}>
        {value}
      </p>
      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
        {label}
      </p>
    </div>
  );
}

/* ───────────────────────── wallet card ───────────────────────── */

function WalletCard({
  pts,
  cash,
  nextTier,
}: {
  pts: number;
  cash: string;
  nextTier: number;
}) {
  const pct = Math.min(100, (pts / nextTier) * 100);
  return (
    <section className="rounded-3xl border border-[#1A1A1A]/10 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#1A1A1A]/55">
            Points wallet
          </p>
          <p
            className={`${anton.className} mt-2 text-[40px] uppercase leading-none tracking-tight`}
          >
            {pts}
          </p>
          <p className="mt-1.5 text-[12px] text-[#1A1A1A]/60">
            pts available to redeem
          </p>
        </div>

        <div className="text-right leading-none">
          <p
            className={`${anton.className} text-[28px] uppercase tracking-tight text-[#FF5A4A]`}
          >
            {cash}
          </p>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1A1A1A]/55">
            Cash value
          </p>
        </div>
      </div>

      <div className="mt-5">
        <div className="h-2 overflow-hidden rounded-full bg-[#1A1A1A]/8">
          <div
            className="h-full rounded-full bg-[#1A1A1A]"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1A1A1A]/55">
          <span>{pts} pts</span>
          <span>Next tier: {nextTier} pts</span>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── voucher card ───────────────────────── */

function VoucherCard({ brands }: { brands: string[] }) {
  return (
    <section className="rounded-3xl bg-[#0E0E0E] p-5 text-white">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/10">
          <GiftGlyph />
        </span>
        <div>
          <h3
            className={`${anton.className} text-[20px] uppercase leading-none tracking-tight`}
          >
            Gift voucher
          </h3>
          <p className="mt-1.5 text-[12px] text-white/65">
            Redeem across popular brands
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {brands.map((b) => (
          <span
            key={b}
            className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/85"
          >
            {b}
          </span>
        ))}
      </div>

      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
        100 pts = ₹10
      </p>
    </section>
  );
}

/* ───────────────────────── activity card ───────────────────────── */

function ActivityCard() {
  return (
    <section className="rounded-3xl border border-[#1A1A1A]/10 bg-white p-5">
      <div className="flex items-baseline justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#1A1A1A]/55">
          Recent activity
        </p>
        <button
          type="button"
          className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FF5A4A]"
        >
          See all
        </button>
      </div>

      <ul className="mt-3 flex flex-col">
        {ACTIVITY.map((a) => (
          <li
            key={a.id}
            className="flex items-center justify-between gap-3 border-t border-[#1A1A1A]/8 py-3 first:border-t-0 first:pt-2"
          >
            <div>
              <p
                className={`${anton.className} text-[16px] uppercase leading-none tracking-tight`}
              >
                {a.title}
              </p>
              <p className="mt-1 text-[11px] text-[#1A1A1A]/55">{a.when}</p>
            </div>
            <span
              className={`${anton.className} text-[16px] uppercase tracking-tight text-[#1A1A1A]`}
            >
              +{a.pts} pts
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ───────────────────────── section label ───────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#1A1A1A]/55">
      {children}
    </p>
  );
}

/* ───────────────────────── sticky CTA ───────────────────────── */

function RedeemCta({ cash }: { cash: string }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-center">
      <div className="pointer-events-auto w-full max-w-[440px] px-5 pb-[112px] pt-10">
        <div
          className="pointer-events-none absolute inset-x-0 -top-4 h-16"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #FFFFFF 60%)",
          }}
          aria-hidden
        />
        <button
          type="button"
          className={`${anton.className} relative h-14 w-full rounded-full bg-[#0E0E0E] text-[15px] uppercase tracking-[0.18em] text-white shadow-[0_18px_36px_-14px_rgba(0,0,0,0.45)]`}
        >
          Redeem {cash} now
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────── glyphs ───────────────────────── */

function GiftGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M3 8h12v8.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V8Z"
        stroke="#FFFFFF"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M2 5.5h14V8H2zM9 5.5v11M5.5 5.5C5 4.5 5 3 6.5 3S9 5.5 9 5.5M12.5 5.5C13 4.5 13 3 11.5 3S9 5.5 9 5.5"
        stroke="#FFFFFF"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StatusBar() {
  return (
    <div className="flex h-11 items-center justify-between px-6 pt-2 text-[15px] font-medium">
      <span>9:41</span>
      <div className="h-7 w-[110px] rounded-full bg-black" />
      <span className="flex items-center gap-1.5">
        <SignalGlyph />
        <WifiGlyph />
        <BatteryGlyph />
      </span>
    </div>
  );
}

function SignalGlyph() {
  return (
    <svg width="17" height="11" viewBox="0 0 17 11" fill="none" aria-hidden>
      <rect x="0" y="7" width="3" height="4" rx="0.5" fill="currentColor" />
      <rect x="4.5" y="5" width="3" height="6" rx="0.5" fill="currentColor" />
      <rect x="9" y="3" width="3" height="8" rx="0.5" fill="currentColor" />
      <rect
        x="13.5"
        y="0.5"
        width="3"
        height="10.5"
        rx="0.5"
        fill="currentColor"
      />
    </svg>
  );
}

function WifiGlyph() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden>
      <path
        d="M1 4.5a10 10 0 0 1 14 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M3.5 7a6.5 6.5 0 0 1 9 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="8" cy="10" r="1.3" fill="currentColor" />
    </svg>
  );
}

function BatteryGlyph() {
  return (
    <svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden>
      <rect
        x="0.5"
        y="0.5"
        width="22"
        height="11"
        rx="3"
        stroke="currentColor"
        opacity="0.5"
      />
      <rect x="2" y="2" width="16" height="8" rx="1.5" fill="currentColor" />
      <rect
        x="24"
        y="4"
        width="1.5"
        height="4"
        rx="0.75"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  );
}
