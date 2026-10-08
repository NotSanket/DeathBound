# DEATHBOUND // VANTA ROSE Design System

## Creative doctrine

VANTA ROSE combines editorial combat-HUD precision with mature luxury esports presentation. Rich smoked-plum surfaces dominate the composition; rose, sea-glass, champagne, and orchid are sparse semantic signals. Visual impact comes from scale, tonal depth, typography, one-pixel rules, information hierarchy, and purposeful interaction rather than decorative glow or repeated dashboard cards.

## Color system

| Token | Value | Semantic role |
|---|---:|---|
| `--db-bg` | `#100F12` | Primary application field |
| `--db-bg-secondary` | `#19151B` | Deep smoked-plum modules |
| `--db-surface` | `#262127` | Primary panel surface |
| `--db-surface-elevated` | `#302932` | Raised controls and panel headers |
| `--db-surface-hover` | `#3B303B` | Restrained interactive hover |
| `--db-border` | `#403640` | Hairline structure |
| `--db-border-strong` | `#594653` | Strong panel separation |
| `--db-text` | `#F0EAF0` | Pearl primary text |
| `--db-text-secondary` | `#AC9FA9` | Supporting interface text |
| `--db-text-muted` | `#8E838D` | Metadata and inactive identity |
| `--db-accent-primary` | `#D56784` | Vanta Rose selection and competitive emphasis |
| `--db-accent-primary-soft` | `#E6A0B1` | High-value rose highlight |
| `--db-accent-primary-deep` | `#9D425F` | Filled primary controls |
| `--db-accent-positive` | `#92B9B0` | Victory and positive performance |
| `--db-accent-positive-deep` | `#567F78` | Tactical linework and support |
| `--db-accent-prestige` | `#D5B68A` | MVP and elite prestige |
| `--db-accent-analytic` | `#A89CC7` | Advanced analytics and rank context |

Color is semantic. Rose marks identity, active navigation, selected records, and primary competitive values. Sea glass marks victory and positive performance. Champagne stays scarce and prestigious. Orchid is limited to advanced analytics and ranked support. Neutral surfaces must dominate every viewport.

Tier metals remain distinct: muted copper for Bronze, cool platinum for Silver, champagne for Gold, icy sea glass for Diamond, and champagne/orchid context for Elite.

## Typography

- **Saira Condensed:** major headlines, scores, ranks, callsigns, and section titles.
- **Space Grotesk:** readable interface copy and concise explanations.
- **IBM Plex Mono:** match IDs, controls, timestamps, K/D/A, coordinates, and system labels.
- Display typography may be very large, but dense data labels must remain legible at normal browser zoom.
- Numeric tables use tabular alignment and fixed column structure.

## Composition

- Desktop navigation uses a 78px fixed command rail with hover/focus descriptions.
- The top command strip owns current section, selected match, demo status, command access, and focus mode.
- The Arena is the primary visual object and uses layered graphite-plum surfaces with precise team contrast.
- Map intelligence uses low-saturation sea-glass linework with rose site markers.
- Leaderboard, rank progression, telemetry, and activity use distinct visual densities rather than interchangeable cards.
- Chamfered edges are selective and structural.

## Core components

### Arena scoreboard

- Exactly two teams and three competitors per team.
- Match selection updates score, map, teams, MVP, rows, and command-strip context together.
- The winning score receives controlled rose emphasis; victory labels use sea glass.
- MVP recognition uses champagne and performance bars represent only match eliminations.
- Every player row is a dossier control.

### Player dossier

- Global modal drawer with Escape and explicit close controls.
- Layered plum surfaces, rose identity, champagne rank detail, and sea-glass performance states.
- Uses calculated lifetime statistics and recent participant records.
- Performance bars and trends reflect recorded match data.

### Rank ascension

- Bronze, Silver, Gold, Diamond, and Elite share one geometric insignia language.
- Complexity increases with tier while metallic identities remain distinct.
- Tier inspection explains thresholds without modifying rating.
- Prototype thresholds are always labeled demonstrative.

### Combat telemetry

- Rating, K/D, and win-rate series are calculated cumulatively from player match participation.
- Rating uses rose, positive K/D uses sea glass, and win conversion uses muted orchid.
- Tooltips, axes, grid lines, unit labels, and metric colors remain explicit.

### Command palette

- Opens with `Ctrl+K` or `Cmd+K`.
- Supports search, arrow-key selection, Enter execution, and Escape dismissal.
- Navigation, player inspection, match selection, and focus mode are real commands.

## Interaction principles

- Keep transitions under roughly 400ms.
- Animate only hierarchy, selection, progression, or spatial state.
- Preserve underlying selection when focus mode changes.
- Hover states use surface shifts, fine rules, or restrained color blocking rather than fluorescent glow.
- Respect `prefers-reduced-motion` globally.
- All controls require visible keyboard focus and accurate accessible names.

## Responsive behavior

- At narrower desktop widths, the map stacks below the Arena and analytical systems become single-column.
- Below 760px, the command rail becomes a fixed bottom navigation strip.
- Scoreboard team rosters stack vertically while preserving full K/D/A data.
- The player dossier occupies the full mobile width.
- Horizontal record selection may scroll; the document itself must not overflow horizontally.
