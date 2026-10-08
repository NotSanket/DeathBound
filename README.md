# DEATHBOUND

Phase 1 frontend foundation for a fictional 3v3 competitive FPS analytics ecosystem. This repository contains the locally runnable Arena Overview, deterministic demo data, functional analytics controls, responsive navigation, and intentionally staged Phase 2 routes.

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
  components/       Shell, design primitives, branding, dashboard sections
  data/             Typed domain models and deterministic demo records
  pages/            Overview and Phase 2 placeholders
  App.tsx            Route map
  styles.css         Tokens, responsive layout, and visual system
docs/
  DESIGN_SYSTEM.md   Visual and interaction conventions
  PROJECT_ROADMAP.md Delivery phases and architectural boundaries
```

## Scope

Phase 1 is frontend-only. It does not connect to Supabase, authenticate users, submit matches, or implement a playable game. Every displayed metric is calculated from the shared demo match records and is explicitly labeled as demo data.
