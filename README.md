# Shrikant Portfolio

Personal portfolio site — Next.js 16 (App Router) + Tailwind v4 + TypeScript.

## Stack

- **Next.js 16.2.4** (App Router, Turbopack dev server)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- Geist / SF Pro Display typography

> ⚠️ This Next.js version has breaking changes from the major you may know. See `AGENTS.md` and check `node_modules/next/dist/docs/` for the up-to-date API before writing new code.

## Prerequisites

- **Node.js 20+** (Next.js 16 requires it)
- **npm** (lockfile is `package-lock.json`)

## Setup on a new machine

```bash
cd "Shrikant Portfolio"
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Running on another device on the same Wi-Fi

The dev server already binds to all interfaces (`-H 0.0.0.0` is set in `.claude/launch.json`, and you can pass it directly: `npm run dev -- -H 0.0.0.0`).

1. Find your machine's LAN IP:
   ```bash
   ipconfig getifaddr en0    # Wi-Fi on macOS
   ```
2. From the other device, visit `http://<that-ip>:3000`.
3. Both devices must be on the same network. On macOS, ensure the firewall isn't blocking port 3000 (System Settings → Network → Firewall).

Common private subnets (`192.168.x.x`, `10.x.x.x`, `172.16-31.x.x`) are pre-allowlisted in `next.config.ts` via `allowedDevOrigins` — needed for Next.js 16's cross-origin dev guard.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Turbopack dev server on port 3000 |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `node scripts/build-case-study-doc.js` | Export the MoodPlan case study as a `.docx` (uses the `docx` package — install with `npm i -D docx` if needed) |

## Project layout

```
.
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home
│   ├── globals.css               # Tailwind + design tokens + custom animations
│   ├── about/                    # /about
│   ├── design-system/            # /design-system — token + component reference
│   ├── moodplan-logo/            # /moodplan-logo — brand sheet
│   ├── moodplan-splash/          # /moodplan-splash — animated splash
│   ├── case-study/
│   │   └── moodplan/             # /case-study/moodplan
│   │       ├── page.tsx
│   │       ├── _sections/        # Page sections (hero, problem, etc.)
│   │       └── _prototype/       # Interactive in-page prototype
│   └── components/               # Shared UI components
├── public/
│   └── case-study/moodplan/      # Case study assets (logos, screens)
├── scripts/
│   └── build-case-study-doc.js   # Generate the .docx case study
├── docs/
│   ├── DESIGN.md                 # Design system + decisions
│   └── SESSION.md                # Notes from the last working session
├── .claude/
│   └── launch.json               # Claude Code dev-server config
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

Component naming convention: PascalCase files in `app/components/` for shared, `_sections/` (underscore-prefixed) for route-local groups (Next.js treats `_*` folders as private and excludes them from routing).

## Routes

| Path | Source |
| --- | --- |
| `/` | [app/page.tsx](app/page.tsx) |
| `/about` | [app/about/page.tsx](app/about/page.tsx) |
| `/design-system` | [app/design-system/page.tsx](app/design-system/page.tsx) |
| `/moodplan-logo` | [app/moodplan-logo/page.tsx](app/moodplan-logo/page.tsx) |
| `/moodplan-splash` | [app/moodplan-splash/page.tsx](app/moodplan-splash/page.tsx) |
| `/case-study/moodplan` | [app/case-study/moodplan/page.tsx](app/case-study/moodplan/page.tsx) |

## Where to look first

- **Design tokens & global animations** → [app/globals.css](app/globals.css)
- **Home page composition** → [app/page.tsx](app/page.tsx)
- **Component library** → [app/components/](app/components/)
- **Design write-up** → [docs/DESIGN.md](docs/DESIGN.md)
- **Last session notes** → [docs/SESSION.md](docs/SESSION.md)
