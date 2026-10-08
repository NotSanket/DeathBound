# DEATHBOUND Design System

## Visual principle

Tactical brutalism meets premium science fiction: compact, exact, cinematic, and operational. Hierarchy comes from typography, borders, spacing, alignment, and selective color—not from generic card elevation.

## Color tokens

| Role | Value | Use |
|---|---:|---|
| Void | `#0A0D13` | Application background |
| Surface | `#111821` | Primary panels |
| Raised | `#192331` | Interactive and elevated fields |
| Line | `#2A3543` | One-pixel panel structure |
| Bone | `#F1EEE6` | Primary typography |
| Muted | `#A9B4C3` | Secondary typography |
| Coral | `#FF625A` | Competition, active navigation, defeat |
| Mint | `#52D6C4` | Victory, positive performance, system health |
| Gold | `#E7BD71` | Prestige, MVP, top rank |
| Intelligence | `#97ABDA` | Contextual data and neutral analysis |

Disabled states use reduced opacity and no accent. Warnings use gold unless they concern a match outcome, where coral applies.

## Typography

- **Barlow Condensed:** headlines, scores, rank values, callsigns, and large numbers.
- **Manrope:** controls, metadata, labels, and body copy.
- Major interface labels are uppercase with controlled tracking.
- Tabular numeric alignment is required in scoreboards and rankings.

## Components

- `TacticalPanel` provides chamfered structure and entry motion.
- `PanelHeader` uses a two-digit section index and compact uppercase title.
- `BrandMark` and `RankEmblem` are original SVG assets; preserve their geometry.
- Interactive rows use position change and background contrast, never large glows.
- Result colors must remain contextual: mint is victory and coral is defeat.

## Layout

- Desktop shell uses a fixed 248px command rail and sticky 58px top bar.
- Dense grids collapse at 1180px; bottom navigation replaces the side rail below 820px.
- The featured 3v3 scoreboard remains the dominant Overview object.
- Panels use 18px grid spacing and one-pixel borders.

## Interaction

- Route transitions: short opacity and vertical shift.
- Score changes: brief positional reveal.
- Table hovers: restrained 3px shift.
- All buttons and links need keyboard-visible focus.
- `prefers-reduced-motion` disables nonessential animation and the ambient scoreboard sweep.
