---
name: EasyChip
description: A strictly monochrome instrument system where emphasis is brightness, never colour.
colors:
  instrument-black: "#0B0B0B"
  panel-black: "#141414"
  well-grey: "#1E1E1E"
  muted-grey: "#6E6E6E"
  secondary-grey: "#A3A3A3"
  bright-grey: "#D4D4D4"
  off-white: "#F2F2F2"
  signal-white: "#FFFFFF"
  hairline: "rgba(255,255,255,0.14)"
  hairline-dark: "rgba(11,11,11,0.12)"
typography:
  display-1:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(40px, 4.6vw, 68px)"
    fontWeight: 300
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  display-2:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(28px, 2.8vw, 42px)"
    fontWeight: 300
    lineHeight: 1.14
    letterSpacing: "-0.02em"
  display-3:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(19px, 1.5vw, 24px)"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  body-lg:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  body-sm:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.12em"
  label-sm:
    fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.12em"
  meta:
    fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0.12em"
rounded:
  sm: "4px"
  md: "10px"
  lg: "20px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  section-gap: "48px"
  section-y: "120px"
  section-y-compact: "96px"
  page-margin: "clamp(16px, 3vw, 40px)"
  page-max: "1440px"
  label-col: "180px"
components:
  button-solid:
    backgroundColor: "{colors.signal-white}"
    textColor: "{colors.instrument-black}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
  button-solid-hover:
    backgroundColor: "{colors.bright-grey}"
    textColor: "{colors.instrument-black}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.off-white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "11px 21px"
  button-outline-hover:
    backgroundColor: "{colors.well-grey}"
    textColor: "{colors.off-white}"
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.secondary-grey}"
    typography: "{typography.label}"
    padding: "0"
  button-text-hover:
    backgroundColor: "transparent"
    textColor: "{colors.signal-white}"
  card:
    backgroundColor: "{colors.panel-black}"
    textColor: "{colors.off-white}"
    rounded: "{rounded.md}"
    padding: "24px 22px 26px"
  card-light:
    backgroundColor: "transparent"
    textColor: "{colors.instrument-black}"
    rounded: "{rounded.md}"
    padding: "24px 22px 26px"
  input:
    backgroundColor: "{colors.well-grey}"
    textColor: "{colors.off-white}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
    width: "100%"
  input-focus:
    backgroundColor: "{colors.well-grey}"
    textColor: "{colors.off-white}"
  list-row:
    backgroundColor: "transparent"
    textColor: "{colors.off-white}"
    typography: "{typography.body}"
    padding: "20px 0"
  news-bar:
    backgroundColor: "{colors.signal-white}"
    textColor: "{colors.instrument-black}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
  hero-frame:
    backgroundColor: "{colors.panel-black}"
    textColor: "{colors.off-white}"
    rounded: "{rounded.lg}"
    height: "680px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.secondary-grey}"
    typography: "{typography.label}"
    padding: "0"
  nav-cta:
    backgroundColor: "{colors.signal-white}"
    textColor: "{colors.instrument-black}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "10px 18px"
---

# Design System: EasyChip

## Overview

**Creative North Star: "The Instrument Panel"**

This is a measuring instrument, not a brochure. The ground is near-black, the panels sit one step above it, the rules are a single hairline wide, and every small piece of text is set in uppercase mono like a channel name silk-screened onto a bench tool. The system reads as calibrated rather than styled: nothing glows, nothing floats, nothing animates on arrival. Its credibility comes from a restraint that a working engineer recognises as competence.

The system is strictly monochrome, and that is the load-bearing decision. There is no accent hue anywhere — not in links, not in status, not in charts, not in focus rings. Emphasis is produced entirely by brightness: a full line drops to secondary grey and the phrase that carries the argument lifts to pure white. Because white is the only escalation available, it stays scarce, and scarcity is what makes it read as emphasis rather than decoration.

Composition is a two-column margin note. Every section places a 180px uppercase mono label beside its content column, so a page scans as the index of a document rather than a stack of marketing bands. Full-bleed desaturated macro hardware photography opens a page inside a 20px-cornered frame with the chrome living inside the frame; everything below is flat panels and hairline rules on the black ground, with the light ground used only as an occasional hard cut in the scroll.

**Key Characteristics:**
- Strictly monochrome — no hue is permitted anywhere in the interface
- Emphasis by brightness: dim the line, lift the phrase to pure white
- A 180px mono label column beside content on every section
- Hairline rules (1px, 14% white) instead of shadows
- Two type registers only: Archivo 300 statements and uppercase IBM Plex Mono labels
- Flat by default — exactly one shadow exists in the whole system
- Photography desaturated to near-monochrome before it may ship

## Colors

A single achromatic ramp from near-black to pure white, with nothing between them but grey. Contrast, not hue, is the entire vocabulary.

### Primary
- **Signal White** (#FFFFFF): The only escalation in the system. It fills primary action pills, carries the emphasised phrase inside a dimmed line, marks the EasyChip column of a comparison row, and draws the focus ring. It is the loudest thing available, so it lands on a few words per screen and never on a paragraph.
- **Off White** (#F2F2F2): Default text on the dark ground, and the light-ground surface itself for inverted sections. Body copy and headings are set in this — never in one of the muted greys.

### Neutral
- **Instrument Black** (#0B0B0B): The page ground, everywhere. Also the text colour on inverted light sections and inside white pills.
- **Panel Black** (#141414): Raised panels — cards, the embedded scheduler frame, the hero frame's fallback fill. One step above the ground, never more.
- **Well Grey** (#1E1E1E): Recessed surfaces — form fields, hover fills on outline controls, the scrollbar thumb.
- **Bright Grey** (#D4D4D4): The hover state of a white pill. It is a dimming, not a tint.
- **Secondary Grey** (#A3A3A3): Secondary text on dark — body copy under a headline, idle navigation items, and the dimmed carrier line an emphasised phrase sits inside.
- **Muted Grey** (#6E6E6E): Inactive and structural text — section labels, card indices, footer column heads, row meta. Legible but explicitly subordinate.
- **Hairline** (rgba(255,255,255,0.14)): Every border and divider on the dark ground.
- **Hairline Dark** (rgba(11,11,11,0.12)): The same divider on the light ground.

### Named Rules

**The No-Hue Rule.** There is no accent colour in this system and there is no exception. Status, links, validation, focus and data all resolve to a step on the achromatic ramp. If a problem seems to need a hue, it needs a brightness step or a mono label instead.

**The Brightness Emphasis Rule.** Emphasis is produced by dimming the surroundings, not by brightening in place. Drop the carrier line to Secondary Grey (#A3A3A3), then lift only the load-bearing phrase to Signal White. Never bold, never underline, never enlarge for emphasis.

**The Scarce White Rule.** Pure white is reserved for primary actions, emphasised phrases, the focus ring and the news bar. Body text is Off White. If more than a couple of things on a screen are pure white, the emphasis has stopped working.

## Typography

**Display Font:** Archivo, weight 300 (with Helvetica Neue, Arial fallback)
**Body Font:** Archivo, weights 400/500/600 (same family, same stack)
**Label/Mono Font:** IBM Plex Mono (with ui-monospace, SFMono-Regular, Menlo fallback)

**Character:** One light-weight grotesque doing all the talking, one uppercase mono doing all the labelling. Archivo at 300 with -0.02em tracking makes a large statement feel drawn rather than shouted; IBM Plex Mono at 10–12px with 0.12em tracking makes every small piece of text read as an instrument marking. There is no third face and there is never a serif.

### Hierarchy
- **Display 1** (Archivo 300, clamp 40→68px, line-height 1.08, -0.02em): The single page statement inside a hero frame. One per page, two lines, no terminal period.
- **Display 2** (Archivo 300, clamp 28→42px, line-height 1.14, -0.02em): Section titles beside the label column, and the large figure in a stat card.
- **Display 3** (Archivo 400, clamp 19→24px, line-height 1.35, -0.01em): Sub-statements — the footer closing line, form success copy, mobile navigation items.
- **Body Large** (Archivo 400, 16px, line-height 1.625): The lead paragraph that opens a section's content column.
- **Body** (Archivo 400, 14px, line-height 1.6): The document default, set on `body`. Constrained to roughly 46ch, widened to 62ch only for a section lead.
- **Body Small** (Archivo 400, 12px, line-height 1.625): Supporting copy — hero sub-lines, card bodies, footer links, comparison cells, form hints.
- **Label** (IBM Plex Mono 500, 11px, 0.12em, uppercase): Every named marker in the system — section labels, button text, nav items, card labels, footer column heads.
- **Label Small** (IBM Plex Mono 400, 10px, 0.12em, uppercase): Indices and enumerations inside a card, where the marking must sit quieter than the label it numbers.
- **Meta** (IBM Plex Mono 400, 12px, 0.12em, not uppercased by default): Dates, identifiers and tabular data in the meta column of a list row.

### Named Rules

**The Two Registers Rule.** Statements are Archivo 300; everything small is uppercase mono. There is no third register and no third family. If a piece of text is neither a statement nor a marking, it is body copy at 14px and it takes no special treatment.

**The Display Namespace Rule.** The display utilities are named `display-1` / `display-2` / `display-3` and are deliberately outside the `text-*` namespace. tailwind-merge collapses every `text-*` class into a single conflict group, so a utility named `text-display-1` is silently dropped the moment it meets `text-off-white` on the same element — the colour survives, the font size disappears, and nothing errors. Any future size utility must stay outside `text-*` for the same reason.

**The Mono Marking Rule.** Uppercase mono is a marking, not a headline garnish. It names a column, a stage, a date, an index or a status — something the reader could not infer from the statement beside it. It never restates the heading it accompanies.

## Layout

The spatial model is a document with a margin. Every section is a two-track grid: a 180px track for the uppercase mono label and a `minmax(0, 1fr)` track for content, with a 32px gutter. Below 900px the grid collapses to one column and the label sits above its content, because a 180px margin has nowhere to go on a phone. Content below a label/title block re-enters the same grid with an empty first track, so body copy stays aligned to the content column rather than to the page edge.

Page margin is `clamp(16px, 3vw, 40px)`, applied to every section, the chrome and the hero frame alike, so a single vertical edge runs the whole length of the page. Content centres inside a 1440px maximum width. Vertical rhythm is 120px between sections on desktop and 96px below the `md` breakpoint, with 48px between a section's title block and its body. The footer runs at 64px vertical padding, the top bar at 22px.

Measure is enforced rather than suggested: 46ch body copy, 62ch section lead, 34ch footer positioning line, 820px section title. Any grid track that contains a scrollable table carries `min-w-0`, because a grid track otherwise sizes to its widest child and widens the whole page instead of scrolling inside itself.

Responsive behaviour is layout-only: the label column collapses at 900px, navigation swaps to a mono Menu/Close toggle at the `md` breakpoint, and card grids reflow. No type ramp step changes at a breakpoint; the display clamps handle scale continuously.

### Named Rules

**The Label Column Rule.** Every section carries a mono label in the 180px column beside its statement. The label is wayfinding — it names the section the way a margin note names a paragraph — and it sits *beside* the statement, never stacked above it as a kicker.

**The Single Edge Rule.** Every full-width element uses the same `clamp(16px, 3vw, 40px)` page margin and the same 1440px maximum. Nothing gets its own container width.

## Elevation & Depth

This system is flat. Depth comes entirely from tonal layering and hairlines: the #0B0B0B ground, the #141414 panel one step above it, the #1E1E1E well one step below it, and a 1px 14%-white rule wherever two surfaces meet. Nothing is lifted, nothing is blurred behind, and no surface casts a shadow onto another.

There is exactly one shadow in the entire system, and it exists for a contrast reason rather than a depth one.

### Shadow Vocabulary
- **Bar Lift** (`box-shadow: 0 2px 24px rgba(0,0,0,0.35)`): Applied only to the white news bar floating over hero photography. A pure-white bar on a photograph has no edge of its own; this soft dark spread gives it one. It is not available to any other element.

### Named Rules

**The One Shadow Rule.** Bar Lift is the only shadow in the system and it belongs to the news bar alone. Cards, panels, buttons, dialogs and hover states are flat. If something needs to separate from its background, it gets a hairline or a tonal step, not a shadow.

**The Hairline Rule.** Separation is one pixel of 14% white on dark (12% black on light) and never more. There is no 2px rule, no double rule, and no heavier divider for emphasis.

### Motion

All transitions run 120–240ms on `cubic-bezier(.2, .7, .2, 1)` and touch colour, background and opacity only. 120ms is the default for hover and focus; 240ms is reserved for a state change large enough to need following. Nothing moves in space: no parallax, no scroll-triggered reveal, no entrance animation, no scale or bounce on press. `prefers-reduced-motion: reduce` collapses every duration to 0.01ms and disables smooth scrolling.

**The Colour-Only Motion Rule.** Motion changes what a thing looks like, never where it is. If a transition needs `transform`, the interaction has been designed wrong for this system.

## Shapes

Four corner values, each tied to a class of object, and nothing else in the system is rounded. Media and bars take 4px — a corner just soft enough to read as a screen element rather than a bleed. Cards and panels take 10px. Full-bleed frames, the hero above all, take 20px, the largest corner in the system, which is what signals "this is a frame, not a section". Controls that get pressed take a full pill.

Everything else is square. Borders are always a single hairline, never a colour and never a heavier weight. The small square dot in a mono label and the square die of the chip mark are the recurring geometry: right angles at small scale, one soft frame at large scale.

Photography is desaturated, high-contrast macro hardware — wafers, dies, signal fields — near-monochrome by the time it ships, exported as WebP at 1200 and 2000 wide in `public/media/`, each with an inlined low-res placeholder so the frame is never empty. Source images are desaturated with ffmpeg before use, so no residual hue can enter the system through an image.

Over photography the scrim is two ramps, not one. A short strong top band (80% at 0%, 45% at 14%, 8% at 28%, transparent at 38%) guarantees the nav and news bar clear their ground whatever the photograph does; the base ramp (15% at the top to 85% at the bottom) carries the low-anchored statement. The base ramp alone assumed dark-topped photography and left nav items at roughly 1.2:1 over a bright wafer, which is exactly why the top band exists.

### Named Rules

**The Four Corners Rule.** 4px media and bars, 10px cards, 20px full-bleed frames, pill on controls. Nothing else is rounded and no fifth radius is introduced.

**The Two-Ramp Scrim Rule.** Any full-bleed photograph carrying chrome uses both ramps. A single top-to-bottom ramp is only safe if the image is already dark where the chrome sits, and the system does not get to assume that.

**The Desaturation Gate Rule.** An image enters the system only after it is desaturated to near-monochrome. There is no colour-photography exception for "just the hero".

## Components

### Buttons
- **Character:** Uppercase mono verbs on a pill. Actions read as commands on an instrument.
- **Shape:** Full pill on solid and outline; the text variant has no shape at all.
- **Solid (primary):** Pure white fill, Instrument Black text, 12px/22px padding. Hover deepens to Bright Grey. One per view.
- **Outline (secondary):** Transparent with a hairline border, Off White text, 11px/21px padding so the border does not shift the baseline against a solid sibling. Hover fills Well Grey.
- **Text (tertiary):** Secondary Grey mono, no chrome. Hover lifts to Signal White and adds an underline at 4px offset.
- **Motion:** Colour transition at 120ms on the system easing. No scale, no lift, no bounce on press.
- **Detail:** A trailing ↗ set in mono marks an action that leaves the page. Disabled drops to 50% opacity.

### Cards / Containers
- **Character:** A panel, not a tile. Fill, hairline, corner, nothing else.
- **Corner Style:** 10px.
- **Background:** Panel Black on dark; transparent with a 12% black hairline on the light ground.
- **Shadow Strategy:** None. See Elevation & Depth.
- **Border:** 1px hairline.
- **Internal Padding:** 24px top, 22px sides, 26px bottom, with a 14px gap between elements.
- **Anatomy:** mono index (Label Small, Muted Grey) → figure (Display 2) → mono label → 12px grey body. That is the whole card; there is no image slot and no footer.

### Inputs / Fields
- **Style:** Well Grey fill, hairline border, 4px radius, 12px/16px padding, Off White text, Muted Grey placeholder, full width.
- **Label:** Uppercase mono at 11px in Muted Grey, 10px above the field. An optional field appends the word "optional" in normal case with tracking reset.
- **Focus:** The border goes pure white at 120ms. Interactive elements additionally carry the global 2px white `:focus-visible` outline at 2px offset — the only ring in a system with no accent.
- **Error:** Message text in pure white at 12px inside an `aria-live` region. There is no red.

### Navigation
- **Style:** Transparent bar sitting *inside* the hero frame rather than pinned to the viewport, so the page scrolls out from under it and the opening stays cinematic.
- **Typography:** Uppercase mono labels at 11px, 30px apart.
- **States:** Idle Secondary Grey; current page and hover Signal White; 120ms colour transition. The primary CTA is a small white pill (10px/18px).
- **Light variant:** Idle 55% black, active pure black, CTA inverts to a black pill.
- **Mobile:** A mono Menu/Close text toggle below `md` opens a hairline-topped stack of Display 3 links with the CTA pill beneath.
- **Lockup:** 16px tall in the nav, 18px in the footer, drawn from `public/brand/`.

### List Rows
- **Character:** A ruled index, not a stack of cards.
- **Style:** A hairline top rule, 20px vertical padding, and a 180px / 1fr / auto grid that echoes the section label column — mono meta, then title in Archivo 500, then a mono action with a trailing ↗.
- **Hover:** The row tints 3% white (3% black on light) at 120ms. This is the system's only row feedback; there is no lift and no border change.

### News Bar (signature)
- **Character:** The one true current message, floating white over the hero photograph.
- **Style:** Pure white fill, Instrument Black text, 4px radius, 12px/16px padding, carrying Bar Lift — the only shadow in the system.
- **Anatomy:** a mono label behind an 11px hairline-ringed circle, a truncating 12px message link, a mono action word, and a mono × dismiss that lifts from 60% black to full black on hover.

### Comparison Row (signature)
- **Character:** The argument made structurally. A 180px mono dimension label, the current state in Muted Grey, the EasyChip state in Signal White — emphasis by brightness applied to an entire column rather than a phrase.

### Iconography
The chip mark — a line-drawn square die with twelve pin stubs, in `public/brand/` — is the only drawn graphic in the system. Every other symbol is typographic, set in IBM Plex Mono at label size and inheriting the current colour: ↗ ↑↓ ✓ ↺ ■ × ▶. There is no icon font, no icon library and no emoji.

## Do's and Don'ts

### Do:
- **Do** produce emphasis by dimming the carrier line to Secondary Grey (#A3A3A3) and lifting only the load-bearing phrase to Signal White.
- **Do** give every section a mono label in the 180px column beside its statement, and let it collapse above the content below 900px.
- **Do** keep new size utilities outside the `text-*` namespace, as `display-1` / `display-2` / `display-3` already are — tailwind-merge drops a `text-*` size the moment it meets a `text-*` colour.
- **Do** set every small piece of text in uppercase IBM Plex Mono at 10–12px with 0.12em tracking.
- **Do** separate surfaces with a 1px hairline (14% white on dark, 12% black on light) or a tonal step between #0B0B0B, #141414 and #1E1E1E.
- **Do** hold to the four corner values: 4px media and bars, 10px cards, 20px full-bleed frames, pill on controls.
- **Do** keep transitions at 120–240ms on `cubic-bezier(.2, .7, .2, 1)` and restrict them to colour, background and opacity.
- **Do** run both scrim ramps under any full-bleed photograph that carries chrome.
- **Do** desaturate photography to near-monochrome before it ships, and export at 1200 and 2000 wide as WebP with a placeholder.
- **Do** keep the lockup small — 16px in the nav, 18px in the footer, never above roughly 28px.
- **Do** cap measure: 46ch body, 62ch section lead, 820px section title.

### Don't:
- **Don't** introduce an accent hue anywhere — not for links, status, validation, focus rings or data. There is no hue in this system.
- **Don't** reintroduce the retired identity: the cyan→violet→magenta prism gradient, the faceted EC monogram, or Sora / Inter / JetBrains Mono.
- **Don't** add a shadow. Bar Lift belongs to the news bar and to nothing else.
- **Don't** use a serif, or any third typeface beyond Archivo and IBM Plex Mono.
- **Don't** create a fifth radius, a 2px rule, or a heavier divider for emphasis.
- **Don't** animate on scroll, parallax a hero, reveal on entry, or scale and bounce a control on press.
- **Don't** set body copy in Muted Grey (#6E6E6E) — it is for labels, indices and structural text only.
- **Don't** stack a mono label above a heading as a kicker; the label belongs in the column beside the statement.
- **Don't** ship an icon font, an icon library, or an emoji — the chip mark is the only drawn graphic and every other symbol is a mono glyph.
- **Don't** enlarge the lockup into a background graphic or a watermark.
- **Don't** bold, underline or upsize a word for emphasis; brightness is the only emphasis mechanism.
