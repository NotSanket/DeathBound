# DEATHBOUND // BLACKSITE Design System

## Creative doctrine

BLACKSITE combines industrial editorial brutalism, futuristic combat-HUD precision, and premium competitive broadcast graphics. Visual impact comes from scale, contrast, typography, thin rules, information hierarchy, and purposeful interaction—not decorative glow or repeated dashboard cards.

## Color system

| Token | Value | Semantic role |
|---|---:|---|
| Carbon | `#0D0D0B` | Application field and deepest contrast |
| Graphite | `#181815` | Primary dark modules |
| Dark surface | `#22221F` | Raised controls and supporting structures |
| Warm ivory | `#F1ECDD` | Arena centerpiece and dominant editorial contrast |
| Muted bone | `#B7B4A8` | Supporting text and inactive identity |
| Electric chartreuse | `#DCFC54` | Selection, navigation, targets, progress, active commands |
| Combat orange | `#FF6547` | Victory emphasis, score priority, tactical intensity |
| Rank violet | `#AA91F5` | Rank inspection and ascension context |
| Championship gold | `#D7B56D` | MVP and prestige |

Color is semantic. Chartreuse never means defeat; orange is not used as ambient decoration; violet stays within ranked systems; gold remains scarce.

## Typography

- **Saira Condensed:** major headlines, scores, ranks, callsigns, and section titles.
- **Space Grotesk:** readable interface copy and concise explanations.
- **IBM Plex Mono:** match IDs, controls, timestamps, K/D/A, coordinates, and system labels.
- Display typography may be very large, but dense data labels must remain legible at normal browser zoom.
- Numeric tables use tabular alignment and fixed column structure.

## Composition

- Desktop navigation uses a 78px fixed command rail with hover/focus descriptions.
- The top command strip owns current section, selected match, demo status, command access, and focus mode.
- The Arena is the primary visual object and uses a warm ivory surface against the carbon field.
- Map intelligence uses dark technical density and original schematic geometry.
- Leaderboard, rank progression, telemetry, and activity each use different visual densities; they must not become interchangeable cards.
- Chamfered edges are selective and structural.

## Core components

### Arena scoreboard

- Exactly two teams and three competitors per team.
- Match selection updates score, map, teams, MVP, rows, and command-strip context together.
- Performance bars represent only match eliminations.
- Every player row is a dossier control.

### Player dossier

- Global modal drawer with Escape and explicit close controls.
- Uses calculated lifetime statistics and recent participant records.
- Performance bars and trends reflect recorded match data.

### Rank ascension

- Bronze, Silver, Gold, Diamond, and Elite share one geometric insignia language.
- Complexity increases with tier.
- Tier inspection explains thresholds without modifying rating.
- Prototype thresholds are always labeled demonstrative.

### Combat telemetry

- Rating, K/D, and win-rate series are calculated cumulatively from player match participation.
- Tooltips, axes, grid lines, unit labels, and metric colors remain explicit.

### Command palette

- Opens with `Ctrl+K` or `Cmd+K`.
- Supports search, arrow-key selection, Enter execution, and Escape dismissal.
- Navigation, player inspection, match selection, and focus mode are real commands.

## Interaction principles

- Keep transitions under roughly 400ms.
- Animate only hierarchy, selection, progression, or spatial state.
- Preserve underlying selection when focus mode changes.
- Hover states use precision shifts, rules, or color blocking rather than glow.
- Respect `prefers-reduced-motion` globally.
- All controls require visible keyboard focus and accurate accessible names.

## Responsive behavior

- At narrower desktop widths, the map stacks below the Arena and analytical systems become single-column.
- Below 760px, the command rail becomes a fixed bottom navigation strip.
- Scoreboard team rosters stack vertically while preserving full K/D/A data.
- The player dossier occupies the full mobile width.
- Horizontal record selection may scroll; the document itself must not overflow horizontally.
