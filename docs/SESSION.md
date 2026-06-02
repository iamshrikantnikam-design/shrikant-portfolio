# Session — 2026-05-17

Snapshot of work done in the last working session, captured so the next laptop can pick up cleanly.

## Context

- Original project lived at `~/Documents/shrikant/Claude Websites/portfolio/` on a laggy machine running an old macOS.
- Goal of this session: get the dev server reachable from another device on the same Wi-Fi, then migrate the project to a fresh Desktop folder ready to move to a newer laptop.

## Changes made

### 1. Dev server bound to all interfaces

[.claude/launch.json](../.claude/launch.json) now passes `-H 0.0.0.0` to `next dev` so the server listens on the LAN, not just `localhost`:

```json
"runtimeArgs": ["run", "dev", "--", "-H", "0.0.0.0"]
```

### 2. `next.config.ts` — cross-origin dev guard

Next.js 16 blocks cross-origin requests to dev resources (HMR, `/_next/*`) by default. Added `allowedDevOrigins` with the common private LAN subnets so any device on the same Wi-Fi can reach the dev server without extra config:

```ts
allowedDevOrigins: [
  "192.168.0.0/16",
  "10.0.0.0/8",
  "172.16.0.0/12",
],
```

Previously the file was empty (just the bootstrap stub). The original session used a hardcoded `"192.168.1.22"`; that was generalised to subnets so it works on any laptop.

### 3. Project migration to Desktop

Copied the project to `~/Desktop/Shrikant Portfolio/` with `rsync`, excluding:

- `node_modules/` — will reinstall on the new machine
- `.next/`, `tsconfig.tsbuildinfo` — build artifacts
- `.DS_Store` — macOS clutter
- `screens /` (folder name had a trailing space) — orphan, not referenced anywhere
- `case-study-moodplan.docx` — output of `build-case-study-doc.js`; regenerate as needed
- `public/nocturne.html`, `public/animated-logo.html`, `public/hop-text-demo.html` — orphan HTML demos, not linked from the app
- `public/logo.webp`, `public/logo png.webp` — orphans (the only reference was inside `nocturne.html`)

After copy, also removed the unreferenced Next.js bootstrap SVGs in `public/`: `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`.

### 4. Folder reorganisation in the Desktop copy

- `build-case-study-doc.js` → `scripts/build-case-study-doc.js` (kept out of the project root)
- New `docs/` folder with `DESIGN.md` and this `SESSION.md`
- `README.md` rewritten — was still the `create-next-app` boilerplate

### 5. No app/source code changes

Routes, components, styles, and the case study are byte-identical to the source project — only configuration, docs, and folder layout changed.

## How to pick this up on the new laptop

1. Copy the `Shrikant Portfolio/` folder to the new machine (USB / AirDrop / cloud).
2. Install Node 20+ if it isn't already.
3. `cd "Shrikant Portfolio" && npm install && npm run dev`
4. Open <http://localhost:3000>.
5. For LAN access from another device, follow the "Running on another device" section in [README.md](../README.md).

## Open items / next session

Nothing blocking — the migration left the app in a working state. Likely next steps based on the project state:

- Add a second case study (the `/case-study/moodplan/` pattern under `app/case-study/` is the template).
- Decide whether the `K`-key skeleton mode should ship in production or remain a dev-only easter egg.
- Reintroduce dark mode (the tokens are already defined in `globals.css`, just unused).
- The `scripts/build-case-study-doc.js` script imports `docx` — that package isn't in `package.json`. Install with `npm i -D docx` before running.

## Files touched

| File | Change |
| --- | --- |
| `.claude/launch.json` | Added `-H 0.0.0.0` |
| `next.config.ts` | Added `allowedDevOrigins` |
| `README.md` | Full rewrite |
| `docs/DESIGN.md` | New |
| `docs/SESSION.md` | New (this file) |
| `scripts/build-case-study-doc.js` | Moved from root |
| `public/` | Removed orphan SVGs + HTML demos |
