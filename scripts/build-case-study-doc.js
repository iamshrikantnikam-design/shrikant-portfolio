/**
 * Build MoodPlan case study .docx for upload to Claude Design.
 * Run: node build-case-study-doc.js
 * Output: case-study-moodplan.docx
 */

const fs = require("fs");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  Header,
  Footer,
  AlignmentType,
  PageOrientation,
  LevelFormat,
  TabStopType,
  TabStopPosition,
  HeadingLevel,
  BorderStyle,
  WidthType,
  ShadingType,
  PageNumber,
  PageBreak,
  ImageRun,
} = require("docx");

/* ── screen image embedder ─────────────────────────────────────────
   Wraps the actual PNG export in an ImageRun, sized to a portrait
   phone aspect (roughly 9:19.5). Returns a centred Paragraph. */
function ScreenImage(filename) {
  const path = `public/case-study/moodplan/screens/${filename}`;
  if (!fs.existsSync(path)) {
    return new Paragraph({
      children: [
        new TextRun({
          text: `[ Screen export not found: ${filename} ]`,
          italics: true,
          color: "AA0000",
        }),
      ],
      alignment: AlignmentType.CENTER,
    });
  }
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 200, after: 200 },
    children: [
      new ImageRun({
        type: "png",
        data: fs.readFileSync(path),
        // Portrait phone — keeps the long edge under page width with breathing room.
        transformation: { width: 240, height: 510 },
        altText: {
          title: filename.replace(".png", ""),
          description: `MoodPlan ${filename.replace(".png", "")} screen export`,
          name: filename.replace(".png", ""),
        },
      }),
    ],
  });
}

/* ── colour tokens (mirrored from the case study) ─────────────────── */
const TEAL = "22B5A6";
const TEAL_LIGHT = "7DE5DA";
const AMBER = "F2C26B";
const PURPLE = "5650D9";
const PURPLE_LIGHT = "C2BCFF";
const CREAM = "EFE7D2";
const INK_BG = "04130F";

/* ── small builders ───────────────────────────────────────────────── */
function H1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text, bold: true })],
  });
}
function H2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun({ text, bold: true })],
  });
}
function H3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    children: [new TextRun({ text, bold: true })],
  });
}
function P(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, ...opts })],
    spacing: { after: 160 },
  });
}
function Quote(text, attribution) {
  return [
    new Paragraph({
      children: [new TextRun({ text: "“" + text + "”", italics: true })],
      spacing: { before: 160, after: 80 },
      indent: { left: 720 },
    }),
    new Paragraph({
      children: [new TextRun({ text: "— " + attribution, italics: true, color: "666666" })],
      spacing: { after: 240 },
      indent: { left: 720 },
    }),
  ];
}
function Eyebrow(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text: text.toUpperCase(),
        bold: true,
        size: 18,
        color: TEAL,
      }),
    ],
    spacing: { after: 120 },
  });
}
function Bullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "bullets", level },
    children: [new TextRun({ text })],
    spacing: { after: 80 },
  });
}
function NumberedBullet(text) {
  return new Paragraph({
    numbering: { reference: "numbers", level: 0 },
    children: [new TextRun({ text })],
    spacing: { after: 80 },
  });
}
function Pull(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 32, color: "1A8E84" })],
    spacing: { before: 240, after: 240 },
    indent: { left: 360 },
  });
}
function Source(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text: "Source · " + text,
        italics: true,
        size: 18,
        color: "888888",
      }),
    ],
    spacing: { after: 160 },
  });
}

/* ── table cell helper ─────────────────────────────────────────────── */
const cellBorder = {
  style: BorderStyle.SINGLE,
  size: 4,
  color: "CCCCCC",
};
const cellBorders = {
  top: cellBorder,
  bottom: cellBorder,
  left: cellBorder,
  right: cellBorder,
};
function cell(text, opts = {}) {
  const { width = 4680, fill, header = false } = opts;
  return new TableCell({
    borders: cellBorders,
    width: { size: width, type: WidthType.DXA },
    shading: fill ? { fill, type: ShadingType.CLEAR } : undefined,
    margins: { top: 120, bottom: 120, left: 160, right: 160 },
    children: [
      new Paragraph({
        children: [new TextRun({ text, bold: header })],
      }),
    ],
  });
}

/* ────────────────────────────────────────────────────────────────────
   DOCUMENT BODY
───────────────────────────────────────────────────────────────────── */
const children = [];

/* === COVER === */
children.push(
  new Paragraph({
    children: [
      new TextRun({
        text: "MoodPlan",
        bold: true,
        size: 96,
      }),
    ],
    spacing: { before: 2400, after: 0 },
    alignment: AlignmentType.CENTER,
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: "A planner to your feelings.",
        bold: true,
        size: 56,
        color: "1A8E84",
      }),
    ],
    spacing: { after: 360 },
    alignment: AlignmentType.CENTER,
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: "Most apps plan around time. MoodPlan plans around energy — the only resource that determines what gets done.",
        italics: true,
        size: 24,
        color: "555555",
      }),
    ],
    spacing: { after: 720 },
    alignment: AlignmentType.CENTER,
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: "AI Product Design · Case Study · 2026",
        bold: true,
        size: 18,
        color: TEAL,
      }),
    ],
    alignment: AlignmentType.CENTER,
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: "Shrikant Nikam · UI/UX designer · Pune, India",
        size: 18,
        color: "777777",
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 720 },
  }),
  new Paragraph({ children: [new PageBreak()] }),
);

/* === TABLE OF CONTENTS === */
children.push(H1("Contents"));
const toc = [
  ["01", "Hero"],
  ["02", "The Problem"],
  ["03", "Research"],
  ["04", "The Tension"],
  ["05", "The Solution"],
  ["06", "Screen Details — five screens, one product"],
  ["07", "The Three Principles"],
  ["08", "The Reward System"],
  ["09", "Interactive Prototype"],
  ["10", "Reflections"],
  ["11", "Design System"],
];
toc.forEach(([n, label]) => {
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: n + "  ", bold: true, color: TEAL }),
        new TextRun({ text: label }),
      ],
      spacing: { after: 80 },
    }),
  );
});
children.push(new Paragraph({ children: [new PageBreak()] }));

/* === 01 HERO === */
children.push(
  Eyebrow("01 — Hero"),
  H1("A planner to your feelings."),
  P(
    "Most apps plan around time. MoodPlan plans around energy — the only resource that determines what gets done.",
    { italics: true },
  ),
);

/* Hero data cluster */
children.push(
  H3("Hero data cluster"),
  Bullet("2× Task completion"),
  Bullet("340 Reward points"),
  Bullet("5 Screens designed"),
);
children.push(
  H3("Meta context"),
  Bullet("Peak · Mon & Tue"),
  Bullet("Dip · 1–3pm rest"),
  Bullet("Matched · 78% done"),
  Bullet("Streak · 7 days"),
  Bullet("Energy key · Deep focus (purple) → Medium (amber) → Easy win (teal)"),
);
children.push(new Paragraph({ children: [new PageBreak()] }));

/* === 02 PROBLEM === */
children.push(
  Eyebrow("02 — The Problem"),
  H1("The problem was never the plan. It was the person the plan forgot to ask."),
);

children.push(
  P("Tuesday. Half the energy of Monday. Same alarm. Same calendar. Same list."),
  P("You already know — before you've opened a single app — today is not that day."),
  P("And yet every tool you open treats it like it is."),
);

children.push(Pull("Productivity software has a blind spot the size of a person."));

children.push(
  P(
    "It knows your deadlines. It knows your meetings. It knows when you're free. What it has never asked — in thirty years of building calendars and planners — is how much you have to give today.",
  ),
  P(
    "Time and energy are not the same resource. You can have four free hours and zero capacity to use them. The hour on the calendar is a container; what you bring to it is something else entirely.",
  ),
);

children.push(H3("Stat callouts"));
children.push(
  P("1 in 4 users abandons a mobile app after a single open.", { bold: true }),
  Source("Statista, mobile app retention 2023"),
  P(
    "46% of Gen Z report being stressed all the time. Gen Z reports the highest workplace burnout of any generation tracked.",
    { bold: true },
  ),
  Source("Deloitte Gen Z & Millennial Survey 2024"),
);
children.push(new Paragraph({ children: [new PageBreak()] }));

/* === 03 RESEARCH === */
children.push(Eyebrow("03 — Research"), H1("I started with conversations."));

children.push(
  P(
    "Before a single screen was sketched, I needed to understand one thing: why do people who genuinely want to be productive still fail at it — consistently, despite the apps, the planning, the intention?",
  ),
  P("So I talked to people. Not as users. As people."),
);

children.push(H3("Methodology"));
children.push(
  Bullet("5 people interviewed"),
  Bullet("Age range: 21–26"),
  Bullet("Cities: Pune, Mumbai, Nashik"),
  Bullet("Each already using 2+ productivity apps"),
);

children.push(
  Pull("They didn't talk about the apps failing. They talked about themselves failing."),
);

children.push(
  P(
    "Every person I spoke to described the same sequence: a plan made the night before, a morning that didn't feel like the plan expected, a slow guilty drift away from it. By 4pm, the list was untouched and the feeling was shame.",
  ),
  P(
    "Not frustration with the tool. Shame. The kind that makes you delete the app and start fresh next week with a different one.",
  ),
);

/* Insight 01 */
children.push(
  H2("Insight 01 — Energy, not time"),
  P("Energy has a shape. Productivity tools pretend it doesn't.", { bold: true }),
  P(
    "Every person described the same arc — sharp in the morning, a dip after lunch, a possible recovery mid-afternoon. This is biology, not preference. Cortisol peaks in the morning; adenosine builds through the day; the post-lunch dip is documented and universal.",
  ),
  Source("Borbély, two-process model of sleep (1982); Monk, Industrial Health (2005)"),
  P(
    "Open Notion, open Google Calendar, open Todoist. None of them know that 2pm is a different kind of hour than 10am. They will cheerfully schedule your hardest task at your worst moment and call it efficiency.",
  ),
  ...Quote(
    "Some days I wake up and I know it's going to be a bad day for deep work. But all my apps just show me the same list.",
    "Priya, 22 · BMS student, Mumbai",
  ),
  H3("What this unlocked: AI as biological ally"),
  P(
    "The AI maps task energy demand — deep, medium, easy — against the energy the user reports each morning. Hard tasks go in the sharp window. Admin in the dip. The planner becomes a biological ally, not a digital clipboard.",
  ),
);

/* Insight 02 */
children.push(
  H2("Insight 02 — The morning window"),
  P("The morning is the highest-leverage moment nobody designs for.", { bold: true }),
  P(
    "Across every conversation, the same pattern: people who had their best days had a clear picture of the day before it started. Ten minutes of intention beat two hours of replanning later.",
  ),
  P(
    "Most apps greet you with a wall of tasks. No prioritisation for the person who just woke up. No acknowledgement that you might be a different version of yourself today.",
  ),
  ...Quote(
    "If I don't plan in the morning it doesn't happen. But opening five apps at 8am is too much. So I just don't.",
    "Rohan, 24 · Junior developer, Pune",
  ),
  H3("What this unlocked: the morning check-in is the entire product"),
  P(
    "Thirty seconds. Mood. Energy. Done. The AI takes that input and does the rest. No friction at the moment when friction costs the most.",
  ),
);

/* Insight 03 */
children.push(
  H2("Insight 03 — Guilt, not complexity"),
  P("Gen Z doesn't abandon apps because they're hard. They abandon them because they feel bad.", {
    bold: true,
  }),
  P(
    "When I asked people why they stopped using a productivity app, the answer was almost never complexity. It was a version of: the app made me feel like I was failing it.",
  ),
  P(
    "These apps assume accountability and guilt are the same thing. They are not. Guilt is shame without direction — and apps that make users feel guilty don't get better engagement. They get deleted.",
  ),
  ...Quote(
    "Every app I've tried makes me feel like I'm failing it. Not that it's failing me.",
    "Meera, 23 · Graphic design student, Nashik",
  ),
  H3("What this unlocked: low energy mode — rest as a legitimate outcome"),
  P(
    "When a user reports low energy, the app doesn't show the full task list and hope for the best. It says “that's okay,” moves the hard tasks to tomorrow, and pays the user points for resting.",
  ),
);

children.push(H3("What the research changed"));
children.push(
  Pull("You are not consistent. You are human. The app should absorb that — not punish you for it."),
  P(
    "I came in expecting to design a smarter scheduler. The research redirected me toward something quieter — a product that treats the person as the variable, not the constant.",
  ),
);
children.push(new Paragraph({ children: [new PageBreak()] }));

/* === 04 TENSION === */
children.push(
  Eyebrow("04 — The Tension"),
  H1("The core tension this product had to resolve."),
);
children.push(
  H3("On one hand: People need structure"),
  P(
    "Without a frame for the day, work scatters. Lists pile up. Decisions burn energy that should have gone into the work itself.",
  ),
  H3("On the other: Rigid structure breaks"),
  P(
    "The moment a real human shows up — tired, anxious, distracted, or just having an off day — the rigid plan stops helping and starts accusing.",
  ),
);
children.push(
  P(
    "Most productivity tools solve for the structure and ignore the human. MoodPlan had to do the opposite — hold the structure loosely, put the human first, and let the AI carry the rigidity so the user doesn't have to.",
  ),
);
children.push(
  Eyebrow("Which led to one question"),
  Pull(
    "What would a planner look like if it started every single day by asking how you feel — and actually changed what it showed you based on the answer?",
  ),
);
children.push(new Paragraph({ children: [new PageBreak()] }));

/* === 05 SOLUTION === */
children.push(
  Eyebrow("05 — The Solution"),
  H1("Not a smarter calendar. A planner that finally knows who it's talking to."),
);
children.push(
  Eyebrow("The solution in one sentence"),
  Pull(
    "A daily planner that starts with how you feel — reads your energy, understands your patterns, and reorganises your entire day around the version of you that actually showed up this morning.",
  ),
);

children.push(
  H2("How it works"),
  P("Thirty seconds in the morning. The rest of the day, rearranged for you.", { bold: true }),
  P(
    "Every morning, one check-in. The user selects their mood from five named states and drags a slider for energy level. That is the entire input.",
  ),
  P(
    "The AI takes that signal — mood, energy, and historical patterns — and quietly reshuffles the task list. Deep focus moves into the sharpest hours. Medium tasks land mid-day. Easy wins anchor the evening. If energy is critically low, heavy tasks move to tomorrow.",
  ),
  P(
    "Over time, the app learns. It notices the user is sharper on Tuesday mornings; it notices the 2pm crash; it anticipates instead of asking. The user stops fighting the tool and starts trusting it.",
  ),
);
children.push(new Paragraph({ children: [new PageBreak()] }));

/* === 06 SCREENS === */
children.push(
  Eyebrow("06 — Screen Details"),
  H1("Five screens. One product."),
);
children.push(
  P(
    "Every screen is one moment in the user's day — the morning check-in, the live timeline, the new-task input, the weekly mirror, the hard day. Each one earns its place by answering a specific question the research raised.",
  ),
);

/* S1 */
children.push(
  H2("S1 — Home · Morning check-in"),
  P("The 30-second moment that sets the entire day.", { italics: true, bold: true }),
  ScreenImage("s1-home.png"),
  P(
    "The first thing the app asks is the only question that matters: how are you, today, right now? A mood pill (Great, Okay, Low, Anxious) and an energy gauge — that's the entire input. The AI takes those two signals and rebuilds the day around them before the user has put the phone down.",
  ),
  H3("Key elements"),
  Bullet("Mood selector — five named states. Tap-once interaction."),
  Bullet("Energy gauge — 68% with semicircle visual, drag-to-change slider."),
  Bullet("AI-sorted day — tasks already arranged by deep focus / medium / easy."),
  Bullet("Reward + streak strip — 340 pts ≈ ₹34, 7-day streak. Real-world value, always visible."),
  H3("Design choice"),
  P(
    "The greeting uses the user's name (“Good morning, Priya”). It's a small thing. It changes the tone of the entire app from “tool” to “someone who knows you.”",
  ),
);

/* S2 */
children.push(
  H2("S2 — Today · Day view"),
  P("The plan, after the AI has read the morning.", { italics: true, bold: true }),
  ScreenImage("s2-day.png"),
  P(
    "Tasks are colour-coded by energy demand and dropped onto a vertical timeline. A “Now” marker tracks where the user is right now — and the AI explains every choice it made above the timeline, in plain language.",
  ),
  H3("Key elements"),
  Bullet("Energy key legend — three swatches teaching the colour language once."),
  Bullet(
    "AI reasoning callout — “MoodPlan moved 2 tasks. Deep work at 11:30am — your peak window.”",
  ),
  Bullet("Timeline with Now indicator — live position + colour-coded task blocks."),
  Bullet("Reward strip — +10 pts check-in · +5 pts task done · 340 total."),
  H3("Design choice"),
  P(
    "Colour does most of the work — purple for deep focus, amber for medium, teal for easy. The user reads the day in two seconds before reading a single word.",
  ),
);

/* S3 */
children.push(
  H2("S3 — Add a task"),
  P("Tell MoodPlan what it needs. It'll find the right time.", { italics: true, bold: true }),
  ScreenImage("s3-add-task.png"),
  P(
    "Adding a task isn't scheduling — it's tagging. The user picks a duration and an energy demand. The AI does the scheduling, and tells the user up-front exactly when and why it will land in the day.",
  ),
  H3("Key elements"),
  Bullet("How long pills — 30m / 1hr / 90m / 2hr+ (coarse on purpose)."),
  Bullet("Energy needed cards — three options matching the day-view colour language."),
  Bullet(
    "AI scheduling preview — “Will schedule during your next deep focus window — tomorrow 9–10:30am.”",
  ),
  Bullet("Reward preview — “Earn +5 pts toward your ₹34 voucher.”"),
  H3("Design choice"),
  P(
    "No date picker. No time picker. The AI commits to a slot and shows its work before the user has to ask — removing both friction and anxiety in the same gesture.",
  ),
);

/* S4 */
children.push(
  H2("S4 — Insights · Your patterns"),
  P("Seven days of you, made legible.", { italics: true, bold: true }),
  ScreenImage("s4-insights.png"),
  P(
    "The Insights tab is the long-term reward for showing up. Energy vs tasks completed across the week. Patterns the user didn't know they had. The 2× completion-rate stat that proves the whole premise of the app.",
  ),
  H3("Key elements"),
  Bullet("Energy vs tasks chart — side-by-side bars, week at a glance."),
  Bullet(
    "Peak day callout — “Your peak days are Mon & Tue. MoodPlan front-loads deep work.”",
  ),
  Bullet(
    "Pattern recognition cards — best deep work before noon · 1–3pm crash · weekend rest zone.",
  ),
  Bullet("2× completion stat — 78% completion this week vs 34% before MoodPlan."),
  H3("Design choice"),
  P(
    "Insights are descriptive, not prescriptive. The app tells the user what it noticed — never what they should change. The behaviour change happens because the user understands themselves better, not because the app nags.",
  ),
);

/* S5 */
children.push(
  H2("S5 — Low energy mode"),
  P("“That's okay, Priya.” Rest as a legitimate outcome.", {
    italics: true,
    bold: true,
  }),
  ScreenImage("s5-low-energy.png"),
  P(
    "When the user reports low energy, the app does not show them their normal day and hope they push through. It rebuilds. Heavy tasks move to tomorrow. Only the genuinely manageable stays. The first sentence on screen is “That's okay.” — said by name, not by category.",
  ),
  H3("Key elements"),
  Bullet(
    "Mode banner — “Low energy mode is on · 3 deep tasks moved to tomorrow.”",
  ),
  Bullet("What's on today — easy only — errands, easy emails, a scheduled rest block."),
  Bullet("Moved to tomorrow — strikethrough list. Visible, accounted for, not lost."),
  Bullet(
    "Rest fully button — equally weighted alongside “Start my light day.” Rest earns +30 pts.",
  ),
  H3("Design choice"),
  P(
    "The app says “that's okay” before it says anything else. Most products would treat low energy as a state to be fixed. MoodPlan treats it as a legitimate way the day can go — and pays the user for it.",
  ),
);
children.push(new Paragraph({ children: [new PageBreak()] }));

/* === 07 PRINCIPLES === */
children.push(
  Eyebrow("07 — The Three Principles"),
  H1("Every screen, every interaction was tested against three principles."),
);
children.push(
  P("If a decision couldn't be justified by at least one of them, it was cut.", {
    italics: true,
  }),
);

/* Principle 01 */
children.push(
  H2("Principle 01 — Colour communicates before language does"),
  P(
    "A user should be able to read their day without reading a single word. Purple means deep focus — cognitively demanding, needs your best hours. Amber means medium energy — manageable, works at most points in the day. Teal means easy win — low effort, right for the evening or a low-energy day.",
  ),
  P(
    "This is not a colour preference. It is a language. And like any language, it only works if it is consistent. The same colours appear on the morning check-in, the day timeline, the task creation screen, the weekly insights. A user who learns the system on day one reads it fluently by day three — without ever consulting a guide.",
  ),
  P(
    "The energy legend bar on the day view came from testing this principle against a real observation. The colour system was clear to the person who designed it. It was not automatically clear to someone seeing it for the first time. The legend teaches the language once and then disappears into habit. That is the right role for a legend — teacher, not crutch.",
  ),
);

/* Principle 02 */
children.push(
  H2("Principle 02 — The AI must show its reasoning"),
  P(
    "There is a particular kind of anxiety that comes from a product that acts on your behalf without explaining itself. You open the app. Something has moved. You don't know why. You don't know if it was right. You feel less in control than you did before.",
  ),
  P(
    "MoodPlan avoids this by making the AI's reasoning visible at every step. On the day view: “MoodPlan moved 2 tasks. Deep work placed at 11:30am — your peak window. Emails pushed after your break.” On the task creation screen: “MoodPlan will schedule this during your next deep focus window — tomorrow 9–10:30am based on your energy pattern.” On the low energy screen: “3 deep tasks moved to tomorrow.”",
  ),
  P(
    "Not a notification. Not a badge. A plain sentence in plain language, placed directly where the user is looking, before they have a chance to feel confused.",
  ),
);

/* Principle 03 */
children.push(
  H2("Principle 03 — Rest is productive · The app must believe this too"),
  P(
    "This was the hardest principle to hold. Every instinct in productivity design pulls toward more — more tasks, more completion, more streaks, more accountability. The entire category is built on the implicit promise that doing more is the goal.",
  ),
  P(
    "MoodPlan is built on a different premise. Not as a failure state. Not as a concession. As a legitimate, point-earning, schedule-worthy outcome.",
  ),
  P(
    "Rest blocks appear on the day timeline as scheduled tasks — not as empty space. Low energy mode earns reward points. The “Rest fully” button exists as a real, equally-weighted option alongside “Start my light day.” The first thing the app says when you report low energy is not a suggestion to push through. It is: “That's okay.”",
  ),
);
children.push(new Paragraph({ children: [new PageBreak()] }));

/* === 08 REWARD SYSTEM === */
children.push(
  Eyebrow("08 — The Reward System"),
  H1("Where behaviour change meets the business model."),
);
children.push(
  P(
    "MoodPlan includes a points-based reward system threaded through every screen. Check in every morning — earn points. Complete a task — earn points. Maintain a streak — earn points. Rest on a low energy day — earn points.",
  ),
  P(
    "Those points convert to real discount vouchers redeemable with partner brands — Swiggy, Zepto, Myntra. One hundred points equals ten rupees. Three hundred and forty points — the number visible across every screen in this case study — equals a thirty-four rupee voucher, ready to redeem.",
  ),
  P(
    "This is not gamification for engagement's sake. It is a closed loop that benefits everyone in the system. The user gets tangible value for showing up consistently. The partner brands get access to a retained, engaged Gen Z audience. MoodPlan gets daily active users with genuine motivation to return — not because of a streak notification, but because their self-care is literally paying them back.",
  ),
  P(
    "The dark reward card that appears at the bottom of every screen is designed to be the highest-contrast element in the UI. Against the warm cream palette, that black card stops the eye every time. It is a constant, quiet reminder that this app is working for the user — not just asking things of them.",
  ),
);

children.push(H3("What MoodPlan is not"));
children.push(
  Bullet("Not a habit tracker. Streaks aren't the goal."),
  Bullet("Not a wellness app. Meditation isn't the core value."),
  Bullet("Not a calendar replacement. It doesn't want to own your schedule."),
  Bullet(
    "It wants thirty seconds of your morning and to give you back the rest of the day, better arranged than you would have arranged it yourself.",
  ),
);
children.push(
  Pull("The point of view: the person matters more than the plan."),
);
children.push(new Paragraph({ children: [new PageBreak()] }));

/* === 09 PROTOTYPE === */
children.push(
  Eyebrow("09 — Interactive Prototype"),
  H1("Tap through it. Run a morning yourself."),
);
children.push(
  P(
    "A real, working prototype — not a recording. Tap a mood, drag your energy, watch the AI rebuild your day. Drop the energy under 40 to see the low-energy mode trigger automatically. Add a task. Tap a task to mark it done and earn points. Every state change is real React state.",
  ),
);
children.push(H3("Try-it sequence"));
children.push(
  NumberedBullet("Pick a mood"),
  NumberedBullet("Drag energy"),
  NumberedBullet("Plan my day"),
  NumberedBullet("Tap tasks to complete"),
  NumberedBullet("Try energy < 40 to trigger low-energy mode"),
);
children.push(new Paragraph({ children: [new PageBreak()] }));

/* === 10 REFLECTIONS === */
children.push(
  Eyebrow("10 — Reflections"),
  H1("What this project taught me about designing for humans, not users."),
);
children.push(
  P(
    "This started as an exercise. It became something else — a system that takes someone seriously on the days when nothing else does.",
  ),
  P(
    "MoodPlan is a worked-out concept and prototype, not a shipped product. The 340 points, the 7-day streak, the ₹34 voucher are scenarios — not lived data. The research foundation, three principles, and five screens are the part that holds up under scrutiny.",
  ),
);

children.push(H2("What I'd change if I started again"));
children.push(
  Pull("Every input field is an invitation for the user to stop telling the truth."),
  P(
    "The first version of the morning check-in was four screens long. Mood. Energy. Time available. Tasks selected. Real users would have abandoned it by screen two.",
  ),
  P(
    "The final two-screen version came from cutting hard — and from one piece of feedback that landed early: “If it takes more than thirty seconds, I'm just going to lie to it.”",
  ),
  P(
    "AI products are most honest when the user is not asked to perform. If I were starting over, I'd push that further. Even the energy slider could be replaced with a single tap on a four-state pill — Empty, Low, Okay, Charged. Less granularity. More truth.",
  ),
);

children.push(H2("What's next — energy as input is a category, not a feature"));
children.push(
  P(
    "MoodPlan as a concept is more interesting than MoodPlan as a single app. The real bet underneath this project is that the next decade of consumer software is going to stop assuming users are consistent — and start designing for variability as the default state.",
  ),
  P(
    "I'd like to take the energy-as-input idea into other surfaces. A reading app that suggests shorter pieces on low days. A learning app that pulls back when you're recovering. A messaging tool that protects deep-focus windows from incoming pings. The same observation, applied to different parts of the day.",
  ),
);
children.push(H3("Three forward-looking bets"));
children.push(
  Bullet("V2 Concept — replace the slider with a single tap (Empty · Low · Okay · Charged)."),
  Bullet(
    "Validation — run a 14-day study with the prototype and five real users; measure whether the AI's reasoning sentences actually build trust over time, or just become noise.",
  ),
  Bullet(
    "The wider bet — apply energy-as-input elsewhere: reading, learning, messaging. Any surface where the question “what should this person do right now?” belongs to the product, not the user.",
  ),
);

children.push(H2("The final word"));
children.push(
  Pull(
    "I'm a small-town kid with a fine arts degree, designing my way into AI product design one project at a time. MoodPlan is the closest thing I've made so far to a product I genuinely want to use.",
  ),
  P("That feels like the right place to start."),
);
children.push(new Paragraph({ children: [new PageBreak()] }));

/* ════════════════════════════════════════════════════════════════
   DESIGN SYSTEM
═══════════════════════════════════════════════════════════════ */
children.push(Eyebrow("11 — Design System"), H1("Design system"));

children.push(H2("Colour palette"));
children.push(P("The case study's dark theme + cream product surfaces."));
const colorRow = (name, hex, role) =>
  new TableRow({
    children: [
      cell(name, { width: 2400 }),
      cell("#" + hex.toUpperCase(), { width: 2000 }),
      cell("", { width: 800, fill: hex }),
      cell(role, { width: 4160 }),
    ],
  });
children.push(
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2400, 2000, 800, 4160],
    rows: [
      new TableRow({
        children: [
          cell("Token", { width: 2400, header: true, fill: "EEEEEE" }),
          cell("Hex", { width: 2000, header: true, fill: "EEEEEE" }),
          cell("Swatch", { width: 800, header: true, fill: "EEEEEE" }),
          cell("Role", { width: 4160, header: true, fill: "EEEEEE" }),
        ],
      }),
      colorRow("Page background", INK_BG, "Hero + every section's bg-[#04130F]"),
      colorRow("Teal", TEAL, "Primary CTA, easy-win category"),
      colorRow("Teal light", TEAL_LIGHT, "Headline accent, eyebrow dot, link colour"),
      colorRow("Amber", AMBER, "Medium-energy category, kicker accents"),
      colorRow("Purple", PURPLE, "Deep-focus category, live-now card bg"),
      colorRow("Purple light", PURPLE_LIGHT, "Soft purple accents on insight cards"),
      colorRow("Cream", CREAM, "Mobile screen bg + product-mock cards"),
      colorRow("Ink", "0A1714", "Text on cream surfaces, dark CTAs"),
      colorRow("Black card", "020907", "High-contrast reward card"),
    ],
  }),
);

children.push(H2("Typography hierarchy"));
const typeRow = (tier, spec, role) =>
  new TableRow({
    children: [
      cell(tier, { width: 2400, header: true }),
      cell(spec, { width: 3000 }),
      cell(role, { width: 3960 }),
    ],
  });
children.push(
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2400, 3000, 3960],
    rows: [
      new TableRow({
        children: [
          cell("Tier", { width: 2400, header: true, fill: "EEEEEE" }),
          cell("Spec (mob → desktop)", { width: 3000, header: true, fill: "EEEEEE" }),
          cell("Used for", { width: 3960, header: true, fill: "EEEEEE" }),
        ],
      }),
      typeRow("Header", "36 → 48 → 64 → 72 px", "Section H2 (Problem · Research · etc)"),
      typeRow("Header 2", "28 → 36 → 48 px", "Sub-section H3, pull-quotes, block titles"),
      typeRow("Card title", "20 → 24 px", "Card-level h4 (insight / tension / proof)"),
      typeRow("Copy", "16 → 17 px", "Body paragraphs"),
      typeRow("Sub copy", "14 → 15 px", "Smaller body inside cards"),
      typeRow("Eyebrow", "12 px uppercase", "Labels, kickers"),
      typeRow("Tiny kicker", "10–11 px uppercase", "Stat labels, micro-labels"),
    ],
  }),
);
children.push(
  P(
    "Font family: SF Pro Display / -apple-system. All text uses letter-spacing -0.02em globally; headlines tighten further to -0.025em / -0.035em.",
  ),
);

children.push(H2("Spacing & layout"));
children.push(
  Bullet("12-column grid · 32 px padding · 8 px gutter (toggle with Cmd+G)"),
  Bullet("Section padding: 128 px (mobile) → 160 px (desktop) — py-32 md:py-40"),
  Bullet("Inter-block spacing: 32 → 48 → 64 → 80 → 128 px (deliberate scale)"),
  Bullet("Hero centred title: 100vh viewport, vertically centred"),
  Bullet("Card stage: orbital — cards positioned on absolute rings around the centred title"),
);

children.push(H2("Component patterns"));
children.push(
  Bullet(
    "Eyebrow — teal dot + 12 px uppercase tracking 0.18em label (e.g. “02 — The problem”)",
  ),
  Bullet(
    "Pull-line — 28→48 px font-bold, mixed muted + teal text for emphasis breaks (e.g. “You are not consistent. You are human.”)",
  ),
  Bullet(
    "Stat card — soft tinted bg, blur glow corner, big number (48–56 px), citation in tiny grey",
  ),
  Bullet(
    "Insight block — number kicker + accent eyebrow + H2 + body paragraphs + quote card + design-unlock card",
  ),
  Bullet(
    "Phone frame — rounded 42 px outer bezel, cream content area, 9:19.5 aspect, drop shadow",
  ),
  Bullet("DotPill — bordered rounded-full pill with coloured dot + label/note text"),
  Bullet(
    "EnergyKeyBar — three connected segments showing Deep focus / Medium / Easy win in their colours",
  ),
);

children.push(H2("Animation system"));
children.push(
  Bullet(
    "Butterfly-in entrance — cards converge from stage centre, scale 0.35 → 1, rotate fold-in → 0°, 1.2 s cubic-bezier(0.22, 1, 0.36, 1) (currently retired in favour of orbital).",
  ),
  Bullet(
    "Planetary orbit — each card orbits the title at its own radius (260–360 px) and period (12–28 s), all counter-clockwise. Inner rings spin faster. Card stays upright via counter-rotation.",
  ),
  Bullet(
    "Phase delays — five cards spread around their orbits via negative animation-delay so they aren't bunched.",
  ),
  Bullet("Honours prefers-reduced-motion: animations disabled for users who request it."),
);

children.push(H2("Energy → colour language"));
children.push(
  P(
    "The most load-bearing system in MoodPlan. Three colours; one meaning each; consistent across every surface.",
  ),
  Bullet("Purple (#5650D9) → Deep focus — high cognitive demand. Best in peak hours."),
  Bullet("Amber (#F2C26B) → Medium — manageable. Works mid-day."),
  Bullet("Teal (#22B5A6) → Easy win — low effort. Evening or low-energy days."),
);

/* ────────────────────────────────────────────────────────────────────
   BUILD DOCUMENT
───────────────────────────────────────────────────────────────────── */
const doc = new Document({
  creator: "Shrikant Nikam",
  title: "MoodPlan Case Study",
  description: "MoodPlan — A planner to your feelings. Full case study + design system.",
  styles: {
    default: {
      document: {
        run: { font: "Arial", size: 22 }, // 11pt body
      },
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 48, bold: true, font: "Arial", color: "0A1714" },
        paragraph: { spacing: { before: 360, after: 240 }, outlineLevel: 0 },
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: "0A1714" },
        paragraph: { spacing: { before: 320, after: 160 }, outlineLevel: 1 },
      },
      {
        id: "Heading3",
        name: "Heading 3",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: TEAL },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 2 },
      },
    ],
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
      {
        reference: "numbers",
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "%1.",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 }, // US Letter
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "MoodPlan — Case Study",
                  size: 18,
                  color: "888888",
                }),
                new TextRun({ text: "\tShrikant Nikam · 2026", size: 18, color: "888888" }),
              ],
              tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "Page ", size: 18, color: "888888" }),
                new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "888888" }),
              ],
            }),
          ],
        }),
      },
      children,
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("case-study-moodplan.docx", buffer);
  console.log(
    "✓ case-study-moodplan.docx written (" +
      (buffer.length / 1024).toFixed(1) +
      " KB)",
  );
});
