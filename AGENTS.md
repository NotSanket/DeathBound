# DEATHBOUND project guidance

## Product context

DEATHBOUND is a premium competitive client and analytics ecosystem for a fictional 3v3 FPS. It is not the playable game. The current scope is Phase 1: visual foundation and the Overview experience.

## Stack

- React, Vite, and strict TypeScript
- React Router for client navigation
- Tailwind CSS plus a custom CSS visual layer
- Motion for restrained transitions
- Recharts for performance visualization
- Lucide React for functional icons
- Original inline SVG only for proprietary brand and rank insignias

## Architecture

- Domain types live in `src/data/models.ts`.
- Deterministic demo records and computed dashboard statistics live in `src/data/demoData.ts`.
- Shared structural components belong in `src/components`.
- Pages compose components and own route-level state.
- Do not hardcode duplicate statistics in presentation components; derive them from the shared data layer.

## Design conventions

- Preserve tactical brutalist geometry, fine one-pixel borders, compact telemetry, and asymmetric hierarchy.
- Use coral for competition/action, mint for performance/victory, gold for prestige, and blue for intelligence/context.
- Avoid generic rounded cards, glassmorphism, purple neon, excessive glow, stock art, and decorative controls without behavior.
- Use Barlow Condensed for competitive display typography and Manrope for body/interface copy.
- New motion must communicate hierarchy, status, or selection and respect reduced-motion preferences.

## Scope constraints

- Do not add Supabase, authentication, an Express server, or gameplay in Phase 1.
- Phase 2 routes stay intentional placeholders until their scheduled implementation.
- Future performance data must originate from a completed 3v3 match: exactly two teams, three unique participants per team, and normalized player/match/team/participant records.
- Preserve accessible focus states, semantic controls, typed data, and responsive behavior.
