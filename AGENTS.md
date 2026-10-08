# DEATHBOUND project guidance

## Product context

DEATHBOUND is a premium competitive client and analytics ecosystem for a fictional 3v3 FPS. It is not the playable game. The current release is Phase 1.5: **BLACKSITE**, an industrial competitive-intelligence workspace built on deterministic local demo records.

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

## Blacksite design conventions

- Art direction: industrial editorial brutalism, combat HUD precision, and premium esports broadcast graphics.
- Carbon `#0D0D0B` and graphite `#181815` are primary surfaces. Do not reintroduce navy as a primary surface.
- Warm ivory `#F1ECDD` is the high-contrast editorial surface.
- Chartreuse `#DCFC54` marks active controls, targets, and selected states.
- Combat orange `#FF6547` marks decisive competitive information and victory emphasis.
- Rank violet `#AA91F5` is reserved for ascension and elite-rank context.
- Championship gold `#D7B56D` marks prestige and MVP treatment.
- Space Grotesk is interface text, Saira Condensed is display/score typography, and IBM Plex Mono is technical metadata.
- Preserve the 78px compact command rail, angular active treatments, asymmetric composition, mixed surface densities, and the ivory Arena centerpiece.
- Avoid generic rounded cards, glassmorphism, blue SaaS styling, decorative fake telemetry, random gradients, and controls without behavior.
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
