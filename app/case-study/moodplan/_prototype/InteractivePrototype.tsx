"use client";

import { useMemo, useState, useEffect } from "react";

/* ────────────────────────────────────────────────────────────────────────────
   MoodPlan — interactive in-page prototype.

   Five real screens wired together with React state:

     home        →  morning check-in (mood + energy + AI sorted preview)
     today       →  day timeline with Now indicator
     add-task    →  task creation flow
     insights    →  weekly patterns
     low-energy  →  shown automatically when energy < 40 on "Plan my day"

   Flow
     • Tap a mood pill, drag the energy slider — the AI-sorted day reorders
       in real time using the energy mapping.
     • Tap "Plan my day" → routes to today, OR low-energy if energy < 40.
     • On today, tap a task to complete it (+5 pts). Tap "+" to add one.
     • Add task → fill name + duration + energy → "Add to my day" pushes it
       into the list and returns to today with a +5 reward.
     • Bottom tabs swap between home / today / insights at any time.
     • On low-energy: "Start my light day" goes to today (heavy tasks moved
       out). "Rest fully" awards +30 pts and shows an empty rest-day state.

   The component is one file on purpose — every screen is a small inner fn
   so the state and the visuals stay legible together. Tailwind + inline
   styles only; no animation libraries.
──────────────────────────────────────────────────────────────────────────── */

/* ── tokens ─────────────────────────────────────────────────────────────── */
const CREAM = "#EFE7D2";
const CREAM_2 = "#E5D9BD";
const INK = "#0A1714";
const INK_SOFT = "rgba(10,23,20,0.55)";
const INK_FAINT = "rgba(10,23,20,0.10)";

const TEAL = "#22B5A6";
const TEAL_LIGHT = "#7DE5DA";
const TEAL_SOFT = "#CDEDE8";

const AMBER = "#D8A246";
const AMBER_LIGHT = "#F2C26B";
const AMBER_SOFT = "#F4DFB8";

const PURPLE = "#5650D9";
const PURPLE_LIGHT = "#C2BCFF";
const PURPLE_SOFT = "#D8D4FA";

const BLACK_CARD = "#0A0F0E";

/* ── types ──────────────────────────────────────────────────────────────── */
type Screen = "home" | "today" | "add-task" | "insights" | "low-energy";
type Mood = "Great" | "Okay" | "Low" | "Anxious";
type Energy = "deep" | "medium" | "easy";
type Status = "done" | "now" | "todo";

type Task = {
  id: string;
  title: string;
  energy: Energy;
  durationMin: number;
  start: string; // "11:30 AM"
  end: string; // "1:00 PM"
  status: Status;
};

const ENERGY_META: Record<
  Energy,
  { label: string; chip: string; chipFg: string; bar: string; bg: string }
> = {
  deep: {
    label: "Deep focus",
    chip: PURPLE,
    chipFg: "#fff",
    bar: PURPLE,
    bg: PURPLE_SOFT,
  },
  medium: {
    label: "Medium",
    chip: AMBER_LIGHT,
    chipFg: INK,
    bar: AMBER,
    bg: AMBER_SOFT,
  },
  easy: {
    label: "Easy win",
    chip: TEAL,
    chipFg: "#fff",
    bar: TEAL,
    bg: TEAL_SOFT,
  },
};

/* ── seed tasks (match the screen exports) ──────────────────────────────── */
const SEED: Task[] = [
  {
    id: "t1",
    title: "Finish client deck",
    energy: "deep",
    durationMin: 120,
    start: "9:00 AM",
    end: "11:00 AM",
    status: "done",
  },
  {
    id: "t2",
    title: "Design homepage wireframe",
    energy: "deep",
    durationMin: 90,
    start: "11:30 AM",
    end: "1:00 PM",
    status: "now",
  },
  {
    id: "t3",
    title: "Reply to 3 client emails",
    energy: "medium",
    durationMin: 60,
    start: "2:00 PM",
    end: "3:00 PM",
    status: "todo",
  },
  {
    id: "t4",
    title: "Buy groceries",
    energy: "easy",
    durationMin: 30,
    start: "6:00 PM",
    end: "6:30 PM",
    status: "todo",
  },
];

/* ───────────────────────────────────────────────────────────────────────── */

export function InteractivePrototype() {
  const [screen, setScreen] = useState<Screen>("home");
  const [mood, setMood] = useState<Mood>("Okay");
  const [energy, setEnergy] = useState(68);
  const [tasks, setTasks] = useState<Task[]>(SEED);
  const [points, setPoints] = useState(340);
  const [streak] = useState(7);
  const [restMode, setRestMode] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // pop-up reward toast that fades after 1.6s
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1600);
    return () => clearTimeout(t);
  }, [toast]);

  // trigger low-energy detection on "Plan my day"
  function handlePlanDay() {
    if (energy < 40) setScreen("low-energy");
    else {
      setRestMode(false);
      setScreen("today");
    }
  }

  function completeTask(id: string) {
    setTasks((ts) =>
      ts.map((t) =>
        t.id === id
          ? { ...t, status: "done" as Status }
          : t.status === "done" || t.status === "now"
            ? t
            : t,
      ),
    );
    setPoints((p) => p + 5);
    setToast("+5 pts · Task done");
  }

  function addTask(title: string, energyTag: Energy, dur: number) {
    const newId = `t${Date.now()}`;
    const newTask: Task = {
      id: newId,
      title,
      energy: energyTag,
      durationMin: dur,
      start: "Tomorrow 9:00 AM",
      end: "10:30 AM",
      status: "todo",
    };
    setTasks((ts) => [...ts, newTask]);
    setPoints((p) => p + 5);
    setToast("+5 pts · Task added");
    setScreen("today");
  }

  function chooseLightDay() {
    // Move deep tasks to "tomorrow" — drop from list
    setTasks((ts) => ts.filter((t) => t.energy !== "deep"));
    setRestMode(false);
    setScreen("today");
    setToast("+10 pts · Light day started");
    setPoints((p) => p + 10);
  }

  function chooseRestFully() {
    setTasks([]);
    setRestMode(true);
    setScreen("today");
    setToast("+30 pts · Rest counts");
    setPoints((p) => p + 30);
  }

  // sort tasks by energy mapping (highest energy → deep first)
  const sortedTasks = useMemo(() => {
    const order: Record<Energy, number> =
      energy >= 70
        ? { deep: 0, medium: 1, easy: 2 }
        : energy >= 40
          ? { medium: 0, deep: 1, easy: 2 }
          : { easy: 0, medium: 1, deep: 2 };
    return [...tasks].sort(
      (a, b) =>
        order[a.energy] - order[b.energy] ||
        Number(a.status === "done") - Number(b.status === "done"),
    );
  }, [tasks, energy]);

  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      {/* tap label */}
      <p className="mb-4 text-center text-[12px] font-medium uppercase tracking-[0.18em] text-white/55">
        Tap to interact ·{" "}
        <span style={{ color: TEAL_LIGHT }}>Live prototype</span>
      </p>

      {/* phone shell */}
      <div
        className="relative overflow-hidden rounded-[44px] border p-[6px] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.8)]"
        style={{
          background: "linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)",
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="relative flex h-[760px] flex-col overflow-hidden rounded-[38px]"
          style={{ background: CREAM }}
        >
          {/* status bar */}
          <StatusBar screen={screen} />

          {/* screen body — flex-1, scrolls */}
          <div className="relative flex-1 overflow-y-auto pb-2">
            {screen === "home" && (
              <HomeScreen
                mood={mood}
                setMood={setMood}
                energy={energy}
                setEnergy={setEnergy}
                tasks={sortedTasks}
                points={points}
                streak={streak}
                onPlan={handlePlanDay}
                onAddTask={() => setScreen("add-task")}
              />
            )}
            {screen === "today" && (
              <TodayScreen
                tasks={tasks}
                energy={energy}
                points={points}
                onComplete={completeTask}
                onAddTask={() => setScreen("add-task")}
                restMode={restMode}
              />
            )}
            {screen === "add-task" && (
              <AddTaskScreen
                onAdd={addTask}
                onCancel={() => setScreen("today")}
                points={points}
              />
            )}
            {screen === "insights" && <InsightsScreen points={points} />}
            {screen === "low-energy" && (
              <LowEnergyScreen
                onLight={chooseLightDay}
                onRest={chooseRestFully}
                onOverride={() => setScreen("today")}
              />
            )}
          </div>

          {/* bottom tabs (hidden on add-task / low-energy modal-like screens) */}
          {screen !== "add-task" && screen !== "low-energy" && (
            <BottomTabs current={screen} onChange={setScreen} />
          )}

          {/* toast */}
          {toast && (
            <div className="pointer-events-none absolute left-1/2 top-14 z-30 -translate-x-1/2">
              <div
                className="rounded-full px-4 py-2 text-[12px] font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                style={{ background: INK, color: "#fff" }}
              >
                {toast}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* hint row under phone */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-[11px] uppercase tracking-[0.12em] text-white/45">
        <Hint dot={TEAL_LIGHT} label={`Energy ${energy}%`} />
        <Hint dot={PURPLE_LIGHT} label={`Mood · ${mood}`} />
        <Hint dot={AMBER_LIGHT} label={`${points} pts`} />
        <Hint dot="#fff" label={`${streak}-day streak`} />
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────── status bar */

function StatusBar({ screen }: { screen: Screen }) {
  const time =
    screen === "today"
      ? "11:24"
      : screen === "insights"
        ? "9:07"
        : screen === "low-energy"
          ? "8:54"
          : screen === "add-task"
            ? "11:24"
            : "9:07";
  return (
    <div
      className="flex h-9 items-center justify-between px-6 pt-2 text-[13px] font-semibold"
      style={{ color: INK }}
    >
      <span>{time}</span>
      <div className="flex items-center gap-1.5">
        <span aria-hidden className="inline-block h-2 w-2 rounded-full" style={{ background: INK }} />
        <span aria-hidden className="inline-block h-2 w-2 rounded-full" style={{ background: INK }} />
        <span
          aria-hidden
          className="inline-block h-2.5 w-5 rounded-[3px] border"
          style={{ borderColor: INK }}
        />
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────── home screen */

function HomeScreen({
  mood,
  setMood,
  energy,
  setEnergy,
  tasks,
  points,
  streak,
  onPlan,
  onAddTask,
}: {
  mood: Mood;
  setMood: (m: Mood) => void;
  energy: number;
  setEnergy: (n: number) => void;
  tasks: Task[];
  points: number;
  streak: number;
  onPlan: () => void;
  onAddTask: () => void;
}) {
  const moods: Mood[] = ["Great", "Okay", "Low", "Anxious"];
  const energyLabel =
    energy >= 70
      ? "High charge"
      : energy >= 40
        ? "Medium charge"
        : "Low charge";

  return (
    <div className="flex flex-col gap-4 px-5 pt-4">
      {/* header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[13px]" style={{ color: INK_SOFT }}>
            Good morning
          </p>
          <h1
            className="mt-0.5 text-[26px] font-black tracking-[-0.02em]"
            style={{ color: INK }}
          >
            Priya
          </h1>
        </div>
        <div className="relative">
          <span
            aria-hidden
            className="grid h-12 w-12 place-items-center rounded-full text-[22px]"
            style={{ background: AMBER_SOFT }}
          >
            ☕
          </span>
          <span
            aria-hidden
            className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full"
            style={{ background: AMBER }}
          />
        </div>
      </div>

      {/* mood + energy row */}
      <div className="grid grid-cols-2 gap-3">
        {/* mood card */}
        <div
          className="rounded-[18px] p-3"
          style={{ background: "#F8DDC9", color: INK }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-[0.16em]"
            style={{ color: "#B25025" }}
          >
            Mood
          </p>
          <ul className="mt-2 space-y-1.5">
            {moods.map((m) => {
              const on = m === mood;
              return (
                <li key={m}>
                  <button
                    onClick={() => setMood(m)}
                    className="flex w-full items-center gap-2 rounded-full px-2.5 py-1.5 text-left text-[12px] font-semibold transition-colors"
                    style={{
                      background: on ? "#C45A20" : "transparent",
                      color: on ? "#fff" : INK,
                    }}
                  >
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{
                        background: on ? "#fff" : "#C45A20",
                      }}
                    />
                    {m}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* energy card */}
        <div
          className="rounded-[18px] p-4"
          style={{ background: PURPLE_SOFT, color: INK }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-[0.16em]"
            style={{ color: PURPLE }}
          >
            Energy
          </p>
          <div className="mt-3 flex flex-col items-center">
            {/* semicircle */}
            <svg viewBox="0 0 120 70" className="h-12 w-24" aria-hidden>
              <path
                d="M 12 60 A 48 48 0 0 1 108 60"
                stroke="rgba(86,80,217,0.18)"
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 12 60 A 48 48 0 0 1 108 60"
                stroke={PURPLE}
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="151"
                strokeDashoffset={151 - (151 * energy) / 100}
                style={{ transition: "stroke-dashoffset 350ms ease" }}
              />
            </svg>
            <div className="-mt-1 flex items-baseline">
              <span
                className="text-[28px] font-black leading-none tracking-[-0.03em]"
                style={{ color: PURPLE }}
              >
                {energy}
              </span>
              <span className="text-[14px] font-bold" style={{ color: PURPLE }}>
                %
              </span>
            </div>
            <p className="mt-0.5 text-[11px]" style={{ color: PURPLE }}>
              {energyLabel}
            </p>
          </div>
          {/* slider — drag to adjust */}
          <div className="mt-2">
            <input
              type="range"
              min={0}
              max={100}
              value={energy}
              onChange={(e) => setEnergy(Number(e.target.value))}
              aria-label="Energy level"
              className="moodplan-slider w-full"
              style={{ accentColor: PURPLE }}
            />
            <p
              className="mt-0.5 text-center text-[9px] uppercase tracking-[0.12em]"
              style={{ color: "rgba(86,80,217,0.6)" }}
            >
              drag to change
            </p>
          </div>
        </div>
      </div>

      {/* AI sorted day card */}
      <div
        className="rounded-[18px] p-4"
        style={{ background: TEAL_SOFT, color: INK }}
      >
        <div className="flex items-center justify-between">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.16em]"
            style={{ color: "#0E7A6D" }}
          >
            AI sorted your day
          </p>
          <span
            className="text-[10px]"
            style={{ color: "rgba(14,122,109,0.7)" }}
          >
            {tasks.length} tasks · Thu
          </span>
        </div>
        <ul className="mt-3 space-y-2">
          {tasks.slice(0, 4).map((t) => (
            <li
              key={t.id}
              className="rounded-2xl p-3"
              style={{
                background:
                  t.status === "done"
                    ? "rgba(255,255,255,0.55)"
                    : t.status === "now"
                      ? PURPLE
                      : ENERGY_META[t.energy].bg,
                color: t.status === "now" ? "#fff" : INK,
                opacity: t.status === "done" ? 0.55 : 1,
              }}
            >
              <p
                className="text-[9px] font-bold uppercase tracking-[0.1em]"
                style={{
                  color:
                    t.status === "now"
                      ? "rgba(255,255,255,0.75)"
                      : t.status === "done"
                        ? INK_SOFT
                        : ENERGY_META[t.energy].chip,
                }}
              >
                {ENERGY_META[t.energy].label} ·{" "}
                {t.status === "done"
                  ? "Done"
                  : t.status === "now"
                    ? "Now"
                    : "Up next"}
              </p>
              <p
                className={`mt-0.5 text-[14px] font-bold leading-tight ${
                  t.status === "done" ? "line-through" : ""
                }`}
              >
                {t.title}
              </p>
              <p
                className="mt-0.5 text-[11px]"
                style={{
                  color:
                    t.status === "now"
                      ? "rgba(255,255,255,0.75)"
                      : INK_SOFT,
                }}
              >
                {t.start} – {t.end}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* reward + streak row */}
      <div className="grid grid-cols-2 gap-3">
        <div
          className="rounded-[18px] p-4"
          style={{ background: BLACK_CARD, color: "#fff" }}
        >
          <p className="text-[10px] uppercase tracking-[0.12em] text-white/55">
            Reward points
          </p>
          <p className="mt-1 text-[26px] font-black leading-none">{points}</p>
          <p className="mt-1 text-[11px] text-white/60">
            = ₹{Math.round(points / 10)} voucher ready
          </p>
          <button
            className="mt-3 inline-flex h-7 items-center rounded-full px-3 text-[11px] font-semibold"
            style={{ background: AMBER_LIGHT, color: INK }}
          >
            Redeem now
          </button>
        </div>
        <div
          className="rounded-[18px] p-4"
          style={{ background: AMBER_SOFT, color: INK }}
        >
          <p
            className="text-[10px] uppercase tracking-[0.12em]"
            style={{ color: "#7A5A1A" }}
          >
            Streak
          </p>
          <p
            className="mt-1 text-[26px] font-black leading-none"
            style={{ color: AMBER }}
          >
            {streak}
          </p>
          <p
            className="mt-1 text-[11px]"
            style={{ color: "rgba(122,90,26,0.75)" }}
          >
            days in a row
          </p>
          <div className="mt-2 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                aria-hidden
                className="inline-block h-2 w-2 rounded-full"
                style={{
                  background: i < 5 ? AMBER : "rgba(122,90,26,0.18)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CTA + add task */}
      <div className="flex flex-col gap-2 pb-2">
        <button
          onClick={onPlan}
          className="h-12 w-full rounded-full text-[15px] font-bold tracking-[0.01em]"
          style={{ background: "#C45A20", color: "#fff" }}
        >
          Plan my day →
        </button>
        <button
          onClick={onAddTask}
          className="h-9 w-full rounded-full border text-[12px] font-semibold"
          style={{ borderColor: INK_FAINT, color: INK_SOFT }}
        >
          + Add a task
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────── today screen */

function TodayScreen({
  tasks,
  energy,
  points,
  onComplete,
  onAddTask,
  restMode,
}: {
  tasks: Task[];
  energy: number;
  points: number;
  onComplete: (id: string) => void;
  onAddTask: () => void;
  restMode: boolean;
}) {
  if (restMode || tasks.length === 0) {
    return (
      <div className="flex flex-col gap-4 px-5 pt-4">
        <Header backLabel="Back" title="Your day" subtitle="Rest day" />
        <div
          className="flex flex-col items-center rounded-[20px] p-8 text-center"
          style={{ background: AMBER_SOFT }}
        >
          <span aria-hidden className="text-[40px]">
            🌙
          </span>
          <p
            className="mt-3 text-[20px] font-black"
            style={{ color: INK }}
          >
            Today is a rest day.
          </p>
          <p
            className="mt-2 text-[13px] leading-[1.6]"
            style={{ color: INK_SOFT }}
          >
            All tasks moved to tomorrow. Recover. We&rsquo;ll pick this up
            when you have more to give.
          </p>
          <p
            className="mt-4 text-[12px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: AMBER }}
          >
            +30 pts banked · {points} pts total
          </p>
        </div>
      </div>
    );
  }

  const now = tasks.find((t) => t.status === "now");
  return (
    <div className="flex flex-col gap-3 px-5 pt-4">
      <Header
        backLabel="Back"
        title="Your day"
        subtitle={`AI sorted · ${energy}% energy`}
      />

      <span
        className="self-start rounded-full px-3 py-1 text-[11px] font-semibold"
        style={{ background: "#F8DDC9", color: "#C45A20" }}
      >
        📅 Thursday, 16 Apr
      </span>

      {/* energy key legend */}
      <div
        className="rounded-[16px] p-3"
        style={{ background: "rgba(255,255,255,0.65)", border: `1px solid ${INK_FAINT}` }}
      >
        <p
          className="text-[9px] font-bold uppercase tracking-[0.14em]"
          style={{ color: INK_SOFT }}
        >
          Energy key — what each colour means
        </p>
        <div className="mt-2 flex h-2 w-full overflow-hidden rounded-full">
          <span style={{ background: PURPLE, flex: 1 }} />
          <span style={{ background: AMBER, flex: 1 }} />
          <span style={{ background: TEAL, flex: 1 }} />
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2 text-[10px]">
          <KeyItem dot={PURPLE} label="Deep focus" sub="High brain power" />
          <KeyItem dot={AMBER} label="Medium" sub="Manageable" />
          <KeyItem dot={TEAL} label="Easy win" sub="Low effort" />
        </div>
      </div>

      {/* AI reasoning */}
      <div
        className="flex gap-2 rounded-[14px] p-3"
        style={{ background: TEAL_SOFT }}
      >
        <span
          aria-hidden
          className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full text-[10px] font-bold"
          style={{ background: TEAL, color: "#fff" }}
        >
          ⓘ
        </span>
        <p className="text-[11px] leading-[1.5]" style={{ color: INK }}>
          <span className="font-semibold">MoodPlan moved 2 tasks.</span>{" "}
          Deep work placed at {now?.start ?? "11:30am"} — your peak window.
          Emails pushed to 2pm after your recharge break.
        </p>
      </div>

      {/* Timeline header */}
      <div className="mt-1 flex items-center justify-between">
        <p
          className="text-[10px] font-bold uppercase tracking-[0.16em]"
          style={{ color: INK_SOFT }}
        >
          Timeline
        </p>
        <div
          className="flex h-6 rounded-full p-0.5 text-[10px] font-semibold"
          style={{ background: INK_FAINT }}
        >
          <span
            className="grid place-items-center rounded-full px-3"
            style={{ background: "#fff", color: INK }}
          >
            Day
          </span>
          <span
            className="grid place-items-center px-3"
            style={{ color: INK_SOFT }}
          >
            Week
          </span>
        </div>
      </div>

      {/* timeline */}
      <ul className="space-y-2">
        {tasks.map((t) => (
          <li key={t.id} className="flex items-stretch gap-3">
            {/* time gutter */}
            <div className="w-12 flex-shrink-0">
              <p
                className="text-[11px] font-semibold"
                style={{ color: t.status === "now" ? "#C45A20" : INK_SOFT }}
              >
                {t.start.replace(":00", "").replace(" AM", "AM").replace(" PM", "PM").replace("AM", " AM").replace("PM", " PM")}
              </p>
              <span
                aria-hidden
                className="mt-1 inline-block h-2 w-2 rounded-full"
                style={{
                  background:
                    t.status === "now"
                      ? "#C45A20"
                      : t.status === "done"
                        ? INK_FAINT
                        : ENERGY_META[t.energy].chip,
                }}
              />
            </div>
            {/* card */}
            <button
              onClick={() => t.status !== "done" && onComplete(t.id)}
              className="flex-1 rounded-2xl p-3 text-left transition-transform active:scale-[0.99]"
              style={{
                background:
                  t.status === "done"
                    ? "rgba(255,255,255,0.55)"
                    : t.status === "now"
                      ? PURPLE
                      : ENERGY_META[t.energy].bg,
                color: t.status === "now" ? "#fff" : INK,
                opacity: t.status === "done" ? 0.6 : 1,
              }}
            >
              <p
                className="text-[9px] font-bold uppercase tracking-[0.12em]"
                style={{
                  color:
                    t.status === "now"
                      ? "rgba(255,255,255,0.85)"
                      : t.status === "done"
                        ? INK_SOFT
                        : ENERGY_META[t.energy].chip,
                }}
              >
                {t.status === "now" && "Live now · "}
                {ENERGY_META[t.energy].label.toUpperCase()}
                {t.status === "done" && " · DONE"}
              </p>
              <p
                className={`mt-0.5 text-[14px] font-bold leading-tight ${
                  t.status === "done" ? "line-through" : ""
                }`}
              >
                {t.title}
              </p>
              <p
                className="mt-0.5 text-[11px]"
                style={{
                  color:
                    t.status === "now"
                      ? "rgba(255,255,255,0.75)"
                      : INK_SOFT,
                }}
              >
                {t.start} – {t.end} · {t.durationMin} min
              </p>
            </button>
          </li>
        ))}
      </ul>

      {/* bottom reward strip */}
      <div
        className="mt-2 flex items-center justify-between rounded-full px-4 py-2"
        style={{ background: BLACK_CARD, color: "#fff" }}
      >
        <span className="flex items-center gap-2 text-[11px]">
          <span
            aria-hidden
            className="grid h-5 w-5 place-items-center rounded-full text-[10px]"
            style={{ background: AMBER_LIGHT, color: INK }}
          >
            ★
          </span>
          +10 pts check-in · +5 task done
        </span>
        <span className="text-[14px] font-bold">{points}</span>
      </div>

      {/* add task FAB-style row */}
      <button
        onClick={onAddTask}
        className="mb-2 mt-1 inline-flex h-10 items-center justify-center gap-2 rounded-full text-[13px] font-semibold"
        style={{ background: "#C45A20", color: "#fff" }}
      >
        + Add a task
      </button>

      <p className="text-center text-[10px]" style={{ color: INK_SOFT }}>
        Tap any task to mark it done.
      </p>
    </div>
  );
}

/* ───────────────────────────────────────────── add task screen */

function AddTaskScreen({
  onAdd,
  onCancel,
  points,
}: {
  onAdd: (title: string, e: Energy, dur: number) => void;
  onCancel: () => void;
  points: number;
}) {
  const [title, setTitle] = useState("Prepare presentation slides");
  const [duration, setDuration] = useState(90);
  const [energy, setEnergy] = useState<Energy>("deep");

  return (
    <div className="flex flex-col gap-3 px-5 pt-4 pb-3">
      {/* drag handle */}
      <div className="flex justify-center">
        <span
          className="block h-1 w-10 rounded-full"
          style={{ background: INK_FAINT }}
        />
      </div>

      <div className="flex items-center justify-between">
        <h2
          className="text-[24px] font-black tracking-[-0.02em]"
          style={{ color: INK }}
        >
          Add a task
        </h2>
        <button
          onClick={onCancel}
          className="text-[12px] font-semibold"
          style={{ color: INK_SOFT }}
        >
          Cancel
        </button>
      </div>
      <p className="-mt-1 text-[12px]" style={{ color: INK_SOFT }}>
        Tell MoodPlan what it needs — it&rsquo;ll find the right time.
      </p>

      <div>
        <p
          className="text-[10px] font-bold uppercase tracking-[0.14em]"
          style={{ color: INK_SOFT }}
        >
          Task name
        </p>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 w-full rounded-2xl border-2 bg-transparent px-4 py-3 text-[14px] font-semibold outline-none focus:border-current"
          style={{ borderColor: "#C45A20", color: INK }}
        />
      </div>

      <div>
        <p
          className="text-[10px] font-bold uppercase tracking-[0.14em]"
          style={{ color: INK_SOFT }}
        >
          How long?
        </p>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {[
            { d: 30, label: "30m", sub: "Quick" },
            { d: 60, label: "1 hr", sub: "Short" },
            { d: 90, label: "90m", sub: "Medium" },
            { d: 120, label: "2 hr+", sub: "Long" },
          ].map((opt) => {
            const on = opt.d === duration;
            return (
              <button
                key={opt.d}
                onClick={() => setDuration(opt.d)}
                className="flex flex-col items-center rounded-2xl border-2 px-2 py-3"
                style={{
                  borderColor: on ? "#C45A20" : INK_FAINT,
                  background: on ? "#FCEAD5" : "transparent",
                  color: INK,
                }}
              >
                <span className="text-[14px] font-bold">{opt.label}</span>
                <span className="mt-0.5 text-[10px]" style={{ color: INK_SOFT }}>
                  {opt.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p
          className="text-[10px] font-bold uppercase tracking-[0.14em]"
          style={{ color: INK_SOFT }}
        >
          Energy needed
        </p>
        <ul className="mt-2 space-y-2">
          <EnergyOption
            on={energy === "deep"}
            onClick={() => setEnergy("deep")}
            color={PURPLE}
            bg={PURPLE_SOFT}
            kicker="Deep focus"
            sub="Full brain power. Best in your peak hours."
            icon="✦"
          />
          <EnergyOption
            on={energy === "medium"}
            onClick={() => setEnergy("medium")}
            color={AMBER}
            bg={AMBER_SOFT}
            kicker="Medium energy"
            sub="Manageable. Works mid-morning or afternoon."
            icon="⏱"
          />
          <EnergyOption
            on={energy === "easy"}
            onClick={() => setEnergy("easy")}
            color={TEAL}
            bg={TEAL_SOFT}
            kicker="Easy win"
            sub="Low effort. Good for evenings or low-energy days."
            icon="✓"
          />
        </ul>
      </div>

      {/* AI scheduling preview */}
      <div
        className="flex gap-2 rounded-[14px] p-3"
        style={{ background: TEAL_SOFT }}
      >
        <span
          aria-hidden
          className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full text-[10px] font-bold"
          style={{ background: TEAL, color: "#fff" }}
        >
          ⓘ
        </span>
        <p className="text-[11px] leading-[1.5]" style={{ color: INK }}>
          <span className="font-semibold">MoodPlan will schedule this</span>{" "}
          during your next {ENERGY_META[energy].label.toLowerCase()} window —
          looks like tomorrow 9–10:30am based on your energy pattern.
        </p>
      </div>

      {/* reward strip */}
      <div
        className="flex items-center justify-between rounded-full px-4 py-2"
        style={{ background: BLACK_CARD, color: "#fff" }}
      >
        <span className="flex items-center gap-2 text-[11px]">
          <span
            aria-hidden
            className="grid h-5 w-5 place-items-center rounded-full text-[10px]"
            style={{ background: AMBER_LIGHT, color: INK }}
          >
            ★
          </span>
          Complete this task → earn{" "}
          <span style={{ color: AMBER_LIGHT }} className="font-bold">
            +5 pts
          </span>{" "}
          toward your ₹{Math.round((points + 5) / 10)} voucher
        </span>
      </div>

      <button
        onClick={() => onAdd(title || "Untitled task", energy, duration)}
        className="mt-1 h-12 rounded-full text-[15px] font-bold"
        style={{ background: "#C45A20", color: "#fff" }}
      >
        Add to my day
      </button>
    </div>
  );
}

function EnergyOption({
  on,
  onClick,
  color,
  bg,
  kicker,
  sub,
  icon,
}: {
  on: boolean;
  onClick: () => void;
  color: string;
  bg: string;
  kicker: string;
  sub: string;
  icon: string;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className="flex w-full items-center gap-3 rounded-[16px] border-2 p-3 text-left"
        style={{
          background: on ? bg : `${bg}80`,
          borderColor: on ? color : "transparent",
        }}
      >
        <span
          aria-hidden
          className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl text-[14px] font-bold"
          style={{ background: color, color: "#fff" }}
        >
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-bold" style={{ color }}>
            {kicker}
          </p>
          <p className="text-[11px]" style={{ color: INK_SOFT }}>
            {sub}
          </p>
        </div>
        <span
          className="grid h-5 w-5 place-items-center rounded-full border-2"
          style={{ borderColor: on ? color : INK_FAINT, background: on ? color : "transparent" }}
        >
          {on && (
            <span
              aria-hidden
              className="block h-1.5 w-1.5 rounded-full"
              style={{ background: "#fff" }}
            />
          )}
        </span>
      </button>
    </li>
  );
}

/* ───────────────────────────────────────────── insights screen */

function InsightsScreen({ points }: { points: number }) {
  const days = [
    { d: "Thu", e: 32, t: 18 },
    { d: "Fri", e: 38, t: 22 },
    { d: "Sat", e: 22, t: 12 },
    { d: "Sun", e: 18, t: 8 },
    { d: "Mon", e: 88, t: 70 },
    { d: "Tue", e: 92, t: 75 },
    { d: "Wed", e: 60, t: 50, today: true },
  ];
  const max = 100;

  return (
    <div className="flex flex-col gap-3 px-5 pt-4">
      <div className="flex items-start justify-between">
        <div>
          <h2
            className="text-[24px] font-black tracking-[-0.02em]"
            style={{ color: INK }}
          >
            Your patterns
          </h2>
          <p className="text-[12px]" style={{ color: INK_SOFT }}>
            7 days of energy + tasks
          </p>
        </div>
        <span
          className="rounded-full px-3 py-1 text-[10px] font-semibold"
          style={{ background: "#F8DDC9", color: "#C45A20" }}
        >
          📅 Apr 10 – 16
        </span>
      </div>

      {/* chart */}
      <div
        className="rounded-[18px] p-4"
        style={{ background: "rgba(255,255,255,0.65)", border: `1px solid ${INK_FAINT}` }}
      >
        <div className="mb-2 flex items-center justify-between">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.14em]"
            style={{ color: INK_SOFT }}
          >
            Energy vs tasks done
          </p>
          <div className="flex gap-2 text-[10px]" style={{ color: INK_SOFT }}>
            <span className="flex items-center gap-1">
              <span
                aria-hidden
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: PURPLE }}
              />
              Energy
            </span>
            <span className="flex items-center gap-1">
              <span
                aria-hidden
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: TEAL }}
              />
              Tasks
            </span>
          </div>
        </div>

        <div className="flex h-32 items-end justify-between gap-1.5">
          {days.map((d) => (
            <div key={d.d} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex h-28 w-full items-end justify-center gap-0.5">
                <span
                  className="w-2 rounded-t-sm"
                  style={{
                    height: `${(d.e / max) * 100}%`,
                    background: d.today ? "#C45A20" : PURPLE,
                  }}
                />
                <span
                  className="w-2 rounded-t-sm"
                  style={{
                    height: `${(d.t / max) * 100}%`,
                    background: d.today ? "#E08A57" : TEAL,
                  }}
                />
              </div>
              <span
                className="text-[9px]"
                style={{ color: d.today ? "#C45A20" : INK_SOFT, fontWeight: d.today ? 700 : 500 }}
              >
                {d.d}
              </span>
            </div>
          ))}
        </div>

        <div
          className="mt-3 flex gap-2 rounded-[12px] p-2.5"
          style={{ background: PURPLE_SOFT }}
        >
          <span
            aria-hidden
            className="grid h-5 w-5 flex-shrink-0 place-items-center rounded-full text-[10px]"
            style={{ background: PURPLE, color: "#fff" }}
          >
            ✦
          </span>
          <p className="text-[10px] leading-[1.5]" style={{ color: INK }}>
            <span className="font-bold">
              Your peak days are Mon &amp; Tue.
            </span>{" "}
            MoodPlan now front-loads deep focus work into those days
            automatically.
          </p>
        </div>
      </div>

      {/* What MoodPlan noticed */}
      <p
        className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em]"
        style={{ color: INK_SOFT }}
      >
        What MoodPlan noticed
      </p>
      <NoticedCard
        color={PURPLE}
        bg={PURPLE_SOFT}
        title="You do your best deep work before noon"
        body="83% of your completed deep focus tasks happened before 12pm. MoodPlan will keep protecting your mornings."
      />
      <NoticedCard
        color={AMBER}
        bg={AMBER_SOFT}
        title="You crash between 1–3pm every day"
        body="Energy drops 40% after lunch. MoodPlan now blocks this window for breaks or easy wins only — never deep work."
      />
      <NoticedCard
        color="#C45A20"
        bg="#F8DDC9"
        title="Weekends are your rest zone"
        body="Your energy is consistently low on Sat & Sun. MoodPlan avoids scheduling anything heavy on weekends unless you ask."
      />
      <NoticedCard
        color={TEAL}
        bg={TEAL_SOFT}
        title="Tasks matched to energy = 2× completion"
        body="This week you completed 78% of mood-matched tasks vs 34% the week before MoodPlan. Keep it up."
      />

      {/* week summary */}
      <div
        className="mt-1 flex items-center justify-between rounded-[18px] p-4"
        style={{ background: BLACK_CARD, color: "#fff" }}
      >
        <div>
          <p className="text-[10px] uppercase tracking-[0.12em] text-white/55">
            This week
          </p>
          <p className="mt-1 text-[26px] font-black leading-none">18</p>
          <p className="mt-1 text-[10px] text-white/55">
            tasks completed · +90 pts earned
          </p>
        </div>
        <div className="text-right">
          <p
            className="text-[14px] font-bold"
            style={{ color: AMBER_LIGHT }}
          >
            {points} pts total
          </p>
          <button
            className="mt-2 inline-flex h-7 items-center rounded-full px-3 text-[11px] font-semibold"
            style={{ background: AMBER_LIGHT, color: INK }}
          >
            Redeem ₹{Math.round(points / 10)}
          </button>
        </div>
      </div>
    </div>
  );
}

function NoticedCard({
  color,
  bg,
  title,
  body,
}: {
  color: string;
  bg: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[14px] p-3" style={{ background: bg }}>
      <div className="flex items-start gap-2">
        <span
          aria-hidden
          className="grid h-5 w-5 flex-shrink-0 place-items-center rounded-full text-[10px] font-bold"
          style={{ background: color, color: "#fff" }}
        >
          ✦
        </span>
        <div className="min-w-0">
          <p className="text-[12px] font-bold" style={{ color }}>
            {title}
          </p>
          <p
            className="mt-1 text-[10px] leading-[1.5]"
            style={{ color: INK_SOFT }}
          >
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────── low-energy screen */

function LowEnergyScreen({
  onLight,
  onRest,
  onOverride,
}: {
  onLight: () => void;
  onRest: () => void;
  onOverride: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 px-5 pt-4">
      <div
        className="flex flex-col items-center rounded-[20px] p-6 text-center"
        style={{ background: "rgba(255,255,255,0.65)" }}
      >
        <span
          aria-hidden
          className="grid h-12 w-12 place-items-center rounded-full text-[26px]"
          style={{ background: INK_FAINT }}
        >
          ☁
        </span>
        <p
          className="mt-4 text-[22px] font-black tracking-[-0.02em]"
          style={{ color: INK }}
        >
          That&rsquo;s okay, Priya.
        </p>
        <p
          className="mt-2 max-w-[260px] text-[12px] leading-[1.55]"
          style={{ color: INK_SOFT }}
        >
          Low energy days happen. MoodPlan has already adjusted your day —
          only the essentials, nothing heavy.
        </p>
      </div>

      <div
        className="rounded-[16px] p-4"
        style={{ background: PURPLE_SOFT }}
      >
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold"
            style={{ background: PURPLE, color: "#fff" }}
          >
            ☀
          </span>
          <p className="text-[13px] font-bold" style={{ color: PURPLE }}>
            Low energy mode is on
          </p>
        </div>
        <p
          className="mt-1 text-[11px]"
          style={{ color: "rgba(86,80,217,0.85)" }}
        >
          3 deep tasks moved to tomorrow
        </p>
        <p
          className="mt-3 text-[12px] leading-[1.55]"
          style={{ color: PURPLE }}
        >
          Your heavy work is safely rescheduled. Today is for small wins,
          rest, and showing up gently. You still earn points — rest counts
          too.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={onLight}
            className="h-10 rounded-full text-[12px] font-bold"
            style={{ background: PURPLE, color: "#fff" }}
          >
            Keep light day
          </button>
          <button
            onClick={onOverride}
            className="h-10 rounded-full text-[12px] font-bold"
            style={{ background: PURPLE_LIGHT, color: PURPLE }}
          >
            Override
          </button>
        </div>
      </div>

      <p
        className="text-[10px] font-bold uppercase tracking-[0.14em]"
        style={{ color: INK_SOFT }}
      >
        What&rsquo;s on today — easy only
      </p>

      <MiniRow color={TEAL} bg={TEAL_SOFT} title="Buy groceries" sub="Anytime today · ~30 min" pts="+5 pts" icon="✓" />
      <MiniRow color={TEAL} bg={TEAL_SOFT} title="Reply to 3 emails" sub="Afternoon · ~20 min" pts="+5 pts" icon="≡" />
      <MiniRow color={INK_SOFT} bg="rgba(255,255,255,0.55)" title="Rest block" sub="Scheduled · 1–3 PM" pts="+3 pts" icon="🌙" />

      <div
        className="rounded-[14px] p-3"
        style={{ background: AMBER_SOFT }}
      >
        <p
          className="text-[11px] font-bold"
          style={{ color: "#7A5A1A" }}
        >
          Moved to tomorrow
        </p>
        <p
          className="mt-0.5 text-[10px]"
          style={{ color: "rgba(122,90,26,0.7)" }}
        >
          MoodPlan will reschedule these automatically
        </p>
        <ul className="mt-2 space-y-1">
          {[
            { t: "Design homepage wireframe", w: "→ Thu 9am", c: PURPLE },
            { t: "Prepare presentation slides", w: "→ Thu 11am", c: PURPLE },
            { t: "Client strategy call prep", w: "→ Fri 10am", c: PURPLE },
          ].map((x) => (
            <li
              key={x.t}
              className="flex items-center justify-between rounded-lg px-2 py-1.5 text-[11px]"
              style={{ background: "rgba(255,255,255,0.5)" }}
            >
              <span className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: x.c }}
                />
                <span
                  className="line-through"
                  style={{ color: "rgba(122,90,26,0.85)" }}
                >
                  {x.t}
                </span>
              </span>
              <span style={{ color: "rgba(122,90,26,0.7)" }}>{x.w}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-2 rounded-[14px] p-3" style={{ background: TEAL_SOFT }}>
        <span
          aria-hidden
          className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full text-[14px]"
          style={{ background: TEAL, color: "#fff" }}
        >
          ✿
        </span>
        <div className="min-w-0">
          <p className="text-[12px] font-bold" style={{ color: INK }}>
            2-minute breathing exercise
          </p>
          <p className="text-[10px]" style={{ color: INK_SOFT }}>
            Low energy often improves with a short reset. Takes less than a
            song.
          </p>
          <p className="mt-1 text-[11px] font-semibold" style={{ color: TEAL }}>
            Start now →
          </p>
        </div>
      </div>

      <div
        className="flex items-center justify-between rounded-full px-4 py-2"
        style={{ background: BLACK_CARD, color: "#fff" }}
      >
        <span className="flex items-center gap-2 text-[11px]">
          <span
            aria-hidden
            className="grid h-5 w-5 place-items-center rounded-full text-[10px]"
            style={{ background: AMBER_LIGHT, color: INK }}
          >
            ★
          </span>
          Rest days still earn points
        </span>
        <span className="text-[14px] font-bold">340</span>
      </div>

      <p
        className="text-center text-[10px]"
        style={{ color: INK_SOFT }}
      >
        Check-in today → +10 pts already banked
      </p>

      <div className="grid grid-cols-2 gap-2 pb-2">
        <button
          onClick={onLight}
          className="h-12 rounded-full text-[14px] font-bold"
          style={{ background: "#C45A20", color: "#fff" }}
        >
          Start my light day
        </button>
        <button
          onClick={onRest}
          className="h-12 rounded-full text-[14px] font-bold"
          style={{ background: INK_FAINT, color: INK }}
        >
          Rest fully
        </button>
      </div>
    </div>
  );
}

function MiniRow({
  color,
  bg,
  title,
  sub,
  pts,
  icon,
}: {
  color: string;
  bg: string;
  title: string;
  sub: string;
  pts: string;
  icon: string;
}) {
  return (
    <div
      className="flex items-center justify-between rounded-[14px] p-3"
      style={{ background: bg }}
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="grid h-8 w-8 place-items-center rounded-full text-[12px]"
          style={{ background: color, color: "#fff" }}
        >
          {icon}
        </span>
        <div>
          <p className="text-[13px] font-bold" style={{ color: INK }}>
            {title}
          </p>
          <p className="text-[10px]" style={{ color: INK_SOFT }}>
            {sub}
          </p>
        </div>
      </div>
      <span
        className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
        style={{ background: TEAL, color: "#fff" }}
      >
        {pts}
      </span>
    </div>
  );
}

/* ───────────────────────────────────────────── shared bits */

function Header({
  backLabel,
  title,
  subtitle,
}: {
  backLabel: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start justify-between">
      <span
        aria-label={backLabel}
        className="grid h-8 w-8 place-items-center rounded-full text-[16px]"
        style={{ background: INK_FAINT, color: INK }}
      >
        ‹
      </span>
      <div className="text-right">
        <h2
          className="text-[20px] font-black tracking-[-0.02em]"
          style={{ color: INK }}
        >
          {title}
        </h2>
        <p className="text-[11px]" style={{ color: INK_SOFT }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function KeyItem({ dot, label, sub }: { dot: string; label: string; sub: string }) {
  return (
    <div className="flex flex-col">
      <span className="flex items-center gap-1 text-[10px] font-bold" style={{ color: INK }}>
        <span aria-hidden className="inline-block h-2 w-2 rounded-full" style={{ background: dot }} />
        {label}
      </span>
      <span className="text-[9px]" style={{ color: INK_SOFT }}>
        {sub}
      </span>
    </div>
  );
}

function Hint({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: dot }} />
      {label}
    </span>
  );
}

function BottomTabs({
  current,
  onChange,
}: {
  current: Screen;
  onChange: (s: Screen) => void;
}) {
  const tabs: { id: Screen; label: string; icon: string }[] = [
    { id: "home", label: "Home", icon: "▣" },
    { id: "today", label: "Today", icon: "▤" },
    { id: "insights", label: "Insights", icon: "◷" },
  ];
  return (
    <div
      className="flex items-center justify-around border-t px-4 py-2"
      style={{ background: CREAM_2, borderColor: INK_FAINT }}
    >
      {tabs.map((t) => {
        const on = current === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className="flex flex-col items-center gap-0.5"
            style={{ color: on ? "#C45A20" : INK_SOFT }}
          >
            <span aria-hidden className="text-[16px]">
              {t.icon}
            </span>
            <span className="text-[9px] font-semibold">{t.label}</span>
          </button>
        );
      })}
      <button
        className="flex flex-col items-center gap-0.5"
        style={{ color: INK_SOFT }}
      >
        <span aria-hidden className="text-[16px]">
          ◉
        </span>
        <span className="text-[9px] font-semibold">Profile</span>
      </button>
    </div>
  );
}
