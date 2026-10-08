# DEATHBOUND project guidance

## Product context

DEATHBOUND is a premium competitive client and analytics ecosystem for a fictional 3v3 FPS. It is not the playable game. The current release is Phase 1.7: **VANTA ROSE**, a mature luxury-esports intelligence workspace built on deterministic local demo records.

## Stack

- React, Vite, and strict TypeScript
- React Router for client navigation
- Tailwind CSS plus a custom CSS visual layer
- Motion for short, purposeful transitions
- Recharts for derived performance visualization
- Lucide React for functional icons
- Original inline SVG only for proprietary brand, map, and rank graphics

## Architecture

- Domain types live in `src/data/models.ts`.
- Deterministic match records, map metadata, tier thresholds, validation, lifetime statistics, leaderboard entries, and player trends live in `src/data/demoData.ts`.
- Shared Blacksite interaction state lives in `src/context/BlacksiteContext.tsx`.
- Shell-level systems such as the command palette and player dossier live in `src/components/BlacksiteSystems.tsx`.
- Overview modules live in `src/components/OverviewSections.tsx`.
- Pages compose components and own route-level presentation only.
- Never hardcode duplicate performance statistics in presentation components; derive them from match participants.

## Vanta Rose design conventions

- Art direction: combat HUD precision, dark editorial luxury, and premium esports broadcast graphics.
- Vanta `#100F12`, smoked plum `#19151B`, and layered plum surfaces dominate the interface.
- Pearl `#F0EAF0`, soft mauve, and muted mauve provide text hierarchy without pale panel blocks.
- Vanta Rose `#D56784` marks identity, active navigation, selected records, and primary competitive emphasis.
- Sea Glass `#92B9B0` marks victories, positive performance, and tactical intelligence.
- Champagne `#D5B68A` is reserved for MVP and elite prestige.
- Muted Orchid `#A89CC7` is used sparingly for advanced analytics and rank support.
- Space Grotesk is interface text, Saira Condensed is display/score typography, and IBM Plex Mono is technical metadata.
- Preserve the 78px compact command rail, precise active treatments, asymmetric composition, mixed surface densities, and dark Arena centerpiece.
- Avoid fluorescent chartreuse/orange, large pale surfaces, generic rounded cards, glassmorphism, blue SaaS styling, decorative fake telemetry, random gradients, and controls without behavior.
- Motion must communicate selection, hierarchy, or state; always respect reduced-motion preferences.

## Interaction contracts

- Selected match state synchronizes the command strip, record selector, scoreboard, map intelligence, and activity feed.
- Scoreboard and leaderboard competitors open the global player dossier.
- `Ctrl+K` / `Cmd+K` opens the global command palette; Escape closes palettes and drawers.
- Focus mode preserves data while minimizing navigation and secondary analysis.
- Rank ladder inspection never mutates player ratings.
- Secondary routes remain intentionally designed Phase 2 previews.

## Data and scope constraints

- Every performance record must originate from a completed match.
- Every match has exactly two teams, three distinct players per team, and six unique participants.
- Kills, deaths, and assists must be nonnegative and references must remain valid.
- Player lifetime metrics, trends, activity records, and leaderboard standings derive from the shared dataset.
- Do not add Supabase, authentication, an Express server, SQL schema work, or gameplay during Phase 1.
- Preserve accessible focus states, semantic controls, typed data, and responsive behavior.
