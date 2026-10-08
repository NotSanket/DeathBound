# DEATHBOUND

Phase 1.7 **VANTA ROSE** frontend for a fictional 3v3 competitive FPS analytics ecosystem. The locally runnable client combines a premium dark esports Arena scoreboard, synchronized tactical map intelligence, player dossiers, rank ascension, derived combat telemetry, a searchable command palette, focus mode, responsive navigation, deterministic demo data, and intentionally staged Phase 2 routes.

## Run locally

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://127.0.0.1:5173`).

Production validation:

```bash
npm run lint
npm run build
npm run preview
```

## Structure

```text
src/
  components/       Application shell, systems, branding, and arena modules
  context/          Shared match, dossier, command, and focus state
  data/             Typed domain models, deterministic records, and derivations
  pages/            Overview and Phase 2 placeholders
  App.tsx            Route map
  styles.css         Tokens, responsive layout, and visual system
docs/
  DESIGN_SYSTEM.md   Visual and interaction conventions
  PROJECT_ROADMAP.md Delivery phases and architectural boundaries
```

## Scope

Phase 1 remains frontend-only. It does not connect to Supabase, authenticate users, submit matches, or implement a playable game. Every displayed performance metric is calculated from shared demo match records and is explicitly labeled as simulated data.

## Vanta Rose controls

- Press `Ctrl+K` or `Cmd+K` to search routes, competitors, match records, and interface commands.
- Select any scoreboard or leaderboard competitor to open their dossier.
- Use the Arena arrows or archive strip to switch matches.
- Use **Focus** in the command strip to isolate the selected match.
