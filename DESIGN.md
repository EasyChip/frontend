---
name: EasyChip
description: Deep-space dark, one prism gradient, spent once per view.
colors:
  brand-cyan: "#00E5EE"
  brand-blue: "#0196E8"
  brand-indigo: "#4E55FC"
  brand-violet: "#7C08F5"
  brand-magenta: "#C400FE"
  void: "#04060F"
  base: "#080B16"
  surface-1: "#0D1120"
  surface-2: "#141A2E"
  hair: "#1E2740"
  line: "#2A3557"
  ink: "#F5F7FA"
  ink-2: "#A7B0C6"
  ink-3: "#6B7590"
  on-accent: "#04060F"
  success: "#00D68F"
  warning: "#F5A623"
  error: "#FF4D6D"
typography:
  display:
    fontFamily: "Sora, ui-sans-serif, system-ui, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Sora, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.5rem"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Sora, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "999px"
spacing:
  gutter: "24px"
  card: "24px"
  header-gap: "40px"
  header-gap-lg: "56px"
  section-y: "96px"
  section-y-lg: "128px"
components:
  button-primary:
    backgroundColor: "{colors.brand-violet}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    padding: "0 24px"
    height: "40px"
  button-primary-lg:
    backgroundColor: "{colors.brand-violet}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    padding: "0 32px"
    height: "48px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "0 24px"
    height: "40px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.brand-cyan}"
    rounded: "{rounded.full}"
    padding: "0"
    height: "40px"
  card-tool:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "24px"
  input-field:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "48px"
  status-pill-live:
    backgroundColor: "rgba(0, 229, 238, 0.15)"
    textColor: "{colors.brand-cyan}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  status-pill-in-development:
    backgroundColor: "rgba(124, 8, 245, 0.20)"
    textColor: "#C79BFF"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
---

# Design System: EasyChip

> **Canonical.** This file is the single source of truth for EasyChip's visual system: color, type, layout, depth, form, and components. `internal/DESIGN.md` is the brand-asset appendix — logo geometry, clear space, mark usage, and the asset production list — and holds no token values.

## Overview

**Creative North Star: "The Quiet Instrument"**

EasyChip looks like a piece of test equipment powered on in a dark room. The default state is near-black, hairline-ruled, and silent — a calm instrument panel that asks nothing of the eye until you touch it. Structure is carried by tonal steps and 1px rules, not by boxes, fills, or shadows. Nothing glows at rest.

Then the instrument responds. Light is the entire interaction language: a cursor-tracked spotlight sweeps the surface it hovers, a conic beam orbits a card's border, a live status dot breathes cyan, a specular sheen crosses a button once and is gone. Every one of these is a response to the user, never ambient decoration. The system emits light rather than casting shadow — depth here is a matter of what is powered on, not what is stacked.

The one loud thing is the prism gradient — cyan through blue, indigo, violet, to magenta — and it is spent exactly once per view. That scarcity is not a stylistic preference; it is what makes the gradient read as the brand rather than as chrome. A page that uses it twice has already diluted it. Restraint everywhere, one blaze of color where it counts.

The personality axes, in the order they resolve conflicts: **technical over playful**, **dark over light**, **prismatic over flat**, **calm surface over loud everywhere**. EasyChip is precision made vivid — a technical product for chip engineers, rendered with the clarity of cut crystal on deep space.

**Key Characteristics:**

- Near-black void base carrying ~95% of surface area; color is punctuation, never field
- Hairline structure — 1px rules at two weights do the work borders and shadows would do elsewhere
- Light as the interaction language: spotlight, beam, sheen, LED, all state-triggered
- Monospace as a first-class brand voice, not code styling
- One prism gradient, once per view
- 2% film grain over everything, killing OLED banding and giving the void a material floor

## Colors

A tuned blue-black ladder holds the surface; a five-stop prism holds the identity. The neutrals are never neutral-gray — every step carries blue, so the void reads as deep space rather than as switched-off screen.

### Primary

- **Bias Violet** (`#7C08F5`): The action color. Every primary button, the nav CTA, the mobile drawer's closing action. White text passes on it. It is the only brand solid used as a large fill.
- **Probe Cyan** (`#00E5EE`): The instrument light. Live status, links on dark, focus rings, the corner via that lights on card hover, hover glows at low alpha. It is a *signal*, not a surface — cyan appears as text, stroke, dot, or halo, and only as a fill at ≤15% alpha.

### Secondary

- **Signal Blue** (`#0196E8`): Second gradient stop; standalone use is informational only.
- **Trace Indigo** (`#4E55FC`): Mid-gradient stop; carries hover glows that need to sit between cyan and violet.
- **Prism Magenta** (`#C400FE`): The gradient's tail and its highest-emphasis note. Standalone use is rare by design.

### Neutral

- **Deep Void** (`#04060F`): The page base. The canvas the whole identity sits on, and the browser theme color.
- **Substrate** (`#080B16`): Default section background — the one step up from void that separates a band from the page without drawing a box.
- **Panel** (`#0D1120`): Cards, panels, dropdown surfaces, input fields.
- **Raised Panel** (`#141A2E`): Hover and elevated states, popovers, skeleton bases.
- **Hairline** (`#1E2740`): The default border on every card, divider, and section edge. This is the global `*` border color — it is the system's structural grammar.
- **Rule** (`#2A3557`): The stronger stroke. Inputs, scrollbar thumb, and any separation that must survive next to a hairline.
- **Instrument White** (`#F5F7FA`): Headings and body copy on dark. Never pure white.
- **Cool Slate** (`#A7B0C6`): Supporting copy, ledes, secondary nav labels. The workhorse for anything that is read but not led with.
- **Muted Slate** (`#6B7590`): Captions, eyebrows, meta, disabled, in-development tile names. Non-essential only.
- **On-Accent Dark** (`#04060F`): Text on cyan or other light fills.

### Semantic

- **Success** (`#00D68F`) in-family mint · **Warning** (`#F5A623`) amber · **Error** (`#FF4D6D`) rose · **Info** = Probe Cyan.

### The prism gradient

Canonical stops, 135° top-left to bottom-right: `#00E5EE → #0196E8 28% → #4E55FC 54% → #7C08F5 78% → #C400FE`. Two-stop shorthand for text and thin accents: `#00E5EE → #7C08F5` at 90°, or the three-stop `#00E5EE → #7C08F5 70% → #C400FE` when the tail is wanted.

### Named Rules

**The Rule of One.** The prism gradient appears **once per view** — the hero H1, on a single non-wrapping word — plus hairline accents (a beam, a focus ring). It is never a fill for buttons, cards, or backgrounds, and **sitewide chrome never spends it**: the scroll-progress rail, the active-nav rail, and the comparison-table cap are all solid Probe Cyan, because chrome would otherwise burn the page's one gradient moment before any content rendered. Audit test: screenshot any page and count the gradient moments. More than one means the page is wrong, not bold.

**The Dark-on-Cyan Rule.** Never white text on Probe Cyan. Cyan fills take On-Accent Dark (`#04060F`). White on Bias Violet passes and is correct.

**The Void Is the Brand Rule.** No full-white page backgrounds, ever. If a light context is genuinely unavoidable (print, a third-party doc), use Instrument White with the mark on white — never the gradient as a large fill.

**The Muted-Is-Meta Rule.** Instrument White and Cool Slate on Deep Void or Panel clear WCAG AA comfortably and carry everything a user must read. Muted Slate is for non-essential meta only — captions, eyebrows, disabled, timestamps. If a sentence matters, it is not Muted Slate.

**The 15% Ceiling Rule.** A brand color used as a *fill* stops at 15% alpha (status pills at `/15` and `/20`, spotlight at `0.07`, streak at `0.06`). Above that it is text, stroke, or glow — never a surface.

## Typography

**Display Font:** Sora (with `ui-sans-serif, system-ui, sans-serif`)
**Body Font:** Inter (with `ui-sans-serif, system-ui, sans-serif`)
**Label / Mono Font:** JetBrains Mono (with `ui-monospace, monospace`)

**Character:** A rounded-geometric display that echoes the faceted wordmark without imitating it, over a neutral workhorse body that stays out of its way, with an engineering monospace that is treated as a third voice rather than a code affordance. The pairing is deliberate, not defaults: characterful display, invisible body, mono as the tell that this is a tool for engineers.

### Hierarchy

- **Display** (Sora 700, 4.5rem, LH 1.02, −0.02em): Hero H1 only. Drops to 40–48px on mobile.
- **Headline** (Sora 700, 3.5rem, LH 1.05, −0.02em): Page H1 below the hero, major section openers.
- **Title** (Sora 600, 2rem → 1.5rem → 1.25rem, LH 1.15–1.3, −0.01em → 0): Section H2, card H3, sub-heads.
- **Body** (Inter 400, 1rem/1.125rem, LH 1.6): All prose. Ledes run 1.125rem in Cool Slate; body max width stays inside `max-w-3xl` for comfortable measure.
- **Small** (Inter 400, 0.875rem, LH 1.5): Card copy, captions, form help, footnotes. The floor for anything a user must actually read is 16px — small is for support, never for substance.
- **Code / Data** (JetBrains Mono 400, 0.875–1rem, LH 1.5): CLI output, RTL snippets, spec values.
- **Label** (JetBrains Mono 500, 0.75rem, +0.08em, UPPERCASE): Eyebrows, status pills, category chips, spec keys, data.

Full step set behind the five roles: Display XL 4.5rem · Display L 3.5rem · H1 2.5rem/1.1 · H2 2rem/1.15 · H3 1.5rem/1.2 · H4 1.25rem/1.3 · Body L 1.125rem · Body 1rem · Small 0.875rem. Tracking tightens as size grows: −0.02em at display, −0.01em at H1–H2, 0 from H3 down.

### Named Rules

**The One Word Rule.** Gradient text appears on the hero H1 only, on one word or one line — never a paragraph, never a metric, never body copy. Everything else is Instrument White or Cool Slate.

**The Solid Fallback Rule.** Every gradient-text element declares its solid color (Probe Cyan) *before* the clip, and goes transparent only inside `@supports (background-clip: text)`. A word that fails to clip must still be readable. Gradient is never the only signal for meaning.

**The Mono Is a Voice Rule.** JetBrains Mono is brand voice, not code styling. It carries status, categories, specs, and data — short strings, uppercase, wide-tracked. It never sets a sentence.

**The No-Kicker Rule.** A mono label directly above a heading is banned. The heading carries its own weight, and a kicker that restates the page or section name is a label for something already named. Mono labels something the reader cannot otherwise know — a status, a category, a stage code — and when that information belongs to a heading's section, it goes *below* the heading as a caption. `Section` has no eyebrow prop, so this cannot be reintroduced by accident.

**Two display weights, two utilities.** `.editorial` is the display voice (Sora 700, −0.02em) and belongs to the hero H1 and page H1 only. `.editorial-title` is the section step (Sora 600, −0.01em) and carries every H2 and H3. One utility could not be both weights the ramp calls for, which is why the split exists.

## Layout

A centered single-column spine, not a grid system. Content lives in one of two containers and the choice between them is the whole layout decision: `max-w-6xl` (1152px) for standard sections and prose, `max-w-7xl` (1280px) reserved for the nav bar and content grids that genuinely need the width. Gutter is a flat 24px at every breakpoint.

Vertical rhythm is section-scale, not element-scale: 96px of section padding on mobile rising to 128px at `md`, with a 40px → 56px gap between a section's header block and its content. That gap is deliberately smaller than the gap between sections, so a heading reads as attached to its own content rather than floating between two of them. Section headers cap at `max-w-3xl` even inside a wider container, so a lede never runs to the full measure. The result is a page that reads as a sequence of well-spaced statements rather than a dense document.

Responsive behavior is a collapse, not a rearrangement. Tool grids run 3-up → 2-up → 1-up, the nav collapses to a full-height drawer below `lg` (1024px), and display type steps down roughly a third. Nothing reflows into a different reading order.

### Named Rules

**The Two-Container Rule.** `max-w-6xl` by default; `max-w-7xl` only for the nav and true grids. A third container width is a bug, not a design decision.

**The Breathing Room Rule.** Section padding never drops below 96px. If a page feels long, cut a section — do not compress the rhythm.

## Elevation & Depth

This system has essentially no drop shadows. Depth is built from three things: the tonal ramp (void → substrate → panel → raised panel), 1px hairlines, and emitted light. A card is "above" the page because it is one tonal step lighter and outlined by a hairline, not because it floats.

Light is the only elevation that moves. On hover a card gains a cursor-tracked radial spotlight (Probe Cyan at 0.07 alpha, 340px radius), a conic beam orbits its border on a 3.2s loop, its corner via switches from Rule to Probe Cyan, and the whole card lifts 2px. A primary button gains a violet glow and a single specular sheen crossing at 105°. Nothing is lit before it is touched.

The one true shadow in the system is the nav dropdown (`shadow-xl shadow-black/40`) — an overlay leaving the document plane, which is the only case where a cast shadow is honest.

Over all of it sits a fixed 2% film-grain layer. It is not texture for its own sake: it gives the near-black a material floor and eliminates the gradient banding that flat dark UIs show on OLED panels.

### Shadow Vocabulary

- **Glow Cyan** (`0 0 40px rgba(0, 229, 238, 0.35)`): Reserved for the mark and hero-scale emitters.
- **Glow Violet** (`0 0 40px rgba(124, 8, 245, 0.35)`): Large violet emitters.
- **Glow Violet Small** (`0 0 24px rgba(124, 8, 245, 0.25)`): Primary button hover. The one glow most users actually see.
- **Overlay Shadow** (`0 20px 25px -5px rgba(0,0,0,0.4)`): Nav dropdown only.

### Named Rules

**The Flat-Until-Touched Rule.** Surfaces are flat and unlit at rest. Every glow, beam, spotlight, and sheen is a response to hover, focus, or live status. Ambient decorative glow is banned — it makes the instrument look like it is malfunctioning.

**The Light-Not-Shadow Rule.** Depth is emitted, not cast. If a component needs to feel raised, move it up the tonal ramp and give it a hairline. Reach for `box-shadow` with a black value only for true overlays.

## Shapes

Two form families, and the boundary between them is functional. **Interactive controls are pills** — every button, status pill, LED dot, scrollbar thumb, and gradient underline terminates in a full 999px radius. **Containers are panels** — cards at 16px, inputs and dropdown items at 12px, tiles and skeletons at 8px, large feature surfaces at 24px.

Borders are the primary structural device and come at exactly two weights: Hairline (`#1E2740`) as the global default on every element, and Rule (`#2A3557`) where an edge must assert itself against a hairline neighbor. A dashed hairline marks the honest-absence state — the future-track tiles for Analog and RF use `border-dashed` on a transparent background to read as *not yet built* without a label having to say so.

### Motifs

Four recurring geometries, drawn from the mark and banner. The first is the signature; the rest are supporting accents used sparingly.

- **Faceted prism / low-poly crystal** *(signature)*: angular beveled planes catching light. The mark, hero graphics, and the platform consolidation diagram — the suite rendered as facets of one crystal sitting above the signoff engines.
- **Circuit traces**: thin cyan/blue PCB-trace lines with small node dots as delicate corner and edge accents. Decorative only, low opacity, never behind text.
- **Chevron light streaks**: diagonal shard forms implying forward motion. Behind heroes and section breaks, at low intensity — the CTA band's 6% drifting streak is the reference implementation.
- **Glow / bloom**: gradient elements emitting a soft halo on the void. The mark, primary CTAs on hover, active states.

3D and rendered imagery follows the same geometry: faceted low-poly in the prism gradient on the void, lit consistently top-left cool to bottom-right warm, matching the mark.

The **consolidation map** is the flagship diagram — the suite drawn in the faceted prism language, sitting above the signoff engines. It is built to be the thing people screenshot, and it is the one place the geometry is allowed to carry an argument rather than decorate one.

### Named Rules

**The Pill-and-Panel Rule.** If it responds to a click, it is a pill. If it holds content, it is a panel. Nothing lands between the two — a 999px card or a square button is off-system.

**The Dashed-Means-Absent Rule.** A dashed border means "does not exist yet." Never use it decoratively.

**The One Motif Rule.** One dominant motif per section. Traces plus chevrons plus glow plus gradient in the same band is noise, and it reads as a template rather than an instrument.

## Components

### Buttons

- **Shape:** Full pill (999px), `h-10` at md and `h-12` at lg, with 24px / 32px horizontal padding.
- **Primary:** Bias Violet fill, white text, medium weight. Carries the `sheen` utility — a white 105° specular band sweeps across once on hover over 550ms. Hover also adds Glow Violet Small and `brightness(1.1)`; active presses to `scale(0.98)` and `brightness(0.95)`.
- **Secondary:** Transparent with a Rule border and Instrument White text. Hover fills to Raised Panel, brightens the border to Muted Slate, and adds a faint cyan wash (`0 0 20px rgba(0,229,238,0.08)`).
- **Ghost:** Probe Cyan text, underline on hover at 4px offset. No box.
- **Rule:** One primary button per view. A page with two primaries has no primary.

### Status Pills

- **Style:** Mono label, uppercase, 0.65rem, full pill, 10px / 4px padding.
- **Live:** Probe Cyan at 15% on cyan text, preceded by a 6px `led-dot` breathing on a 2.4s ease-in-out loop with a cyan halo that rises and falls. The breathing dot is the system's signature "powered on" signal.
- **In Development:** Bias Violet at 20% with `#C79BFF` text. No dot — nothing is breathing yet.
- **Roadmap:** Raised Panel with Muted Slate text. Deliberately the quietest thing on the page.

### Cards

- **Corner Style:** 16px (`rounded-lg`).
- **Background:** Panel over the page; in-development tiles drop to `Panel/60` and lift to full Panel on hover.
- **Border:** Hairline at rest, brightening to Rule on hover.
- **Shadow Strategy:** None. See Elevation & Depth — spotlight, beam, and a 2px lift.
- **Internal Padding:** 24px.
- **Signature behavior — the probe surface:** `GlowCard` writes `--spot-x` / `--spot-y` from `pointermove` directly to the element's style, so the radial spotlight tracks the cursor with **zero React re-renders**. The `border-beam` conic highlight orbits via an `@property`-registered `--beam-angle`, so the animation runs on the compositor. This performance discipline is part of the component, not an implementation detail.

### Tool Cards

- **Live:** A probe surface. Mono category eyebrow top-left, Live pill top-right, a 1.5px corner **via** dot that switches from Rule to Probe Cyan on hover, tool name in display type, tagline in Cool Slate, and a cyan "Explore →" affordance that fades in and slides 2px on hover. The whole card is one click target via an `::after` inset overlay on the title link.
- **In Development:** A compact tile — name, mono category, pill. Nothing more. The restraint is the honesty.
- **Future Track:** Dashed hairline, transparent background, Muted Slate name, Roadmap pill.

### Inputs

- **Style:** Panel background, Rule border, 12px radius, 48px tall, 16px horizontal padding, Muted Slate placeholder.
- **Focus:** Border shifts to Probe Cyan; the global `:focus-visible` ring (2px cyan, 2px offset) covers keyboard focus. No glow — inputs are the one place the instrument stays quiet.
- **Error:** Message in Error rose beneath the field, announced via `aria-live`.
- **Success:** The field is replaced by a confirmation panel with a cyan-30% border, not a toast.

### Navigation

- **Style:** Transparent over the void at rest; on scroll it gains a backdrop blur and a Hairline bottom border. 64px tall, `max-w-7xl`, 24px gutter.
- **Links:** Cool Slate at 14px, brightening to Instrument White on hover. The active route carries a 2px pill-radius gradient underline. Dropdown chevrons rotate 180° on group hover.
- **Dropdowns:** 288px Panel card, Hairline border, 16px radius, with the one real drop shadow in the system. Items carry a title in Instrument White and a description in Muted Slate.
- **CTA:** A single Bias Violet pill at 36px, right-aligned, with the violet hover glow.
- **Mobile:** Below `lg`, a full-height drawer over `void/95` with backdrop blur, items staggering in on `fade-up`, and a sticky bottom bar holding the primary CTA at full width.

### Section

The rhythm primitive every page is built from: optional mono eyebrow in Muted Slate, display-type title, Cool Slate lede at 1.125rem light, then content. Header block caps at `max-w-3xl`, or centers when the section is centered. This component is why the site has consistent rhythm — new sections compose it rather than re-specifying padding.

### CTA Band

The closer on every page: a Substrate band above a Hairline top border, holding a centered display-type headline, a lede, and a primary + secondary pair. Behind it, a 160px-wide prism-gradient chevron streak at 6% opacity drifts across on a 14s loop — the one ambient motion in the system, and it is deliberately almost invisible.

### Motion Vocabulary

`fade-up` (12px rise + fade, 0.7s expo) for reveals · `sheen` (550ms) on primary buttons · `beam-orbit` (3.2s linear) on card hover · `led-breathe` (2.4s) on live status · `streak-drift` (14s) on CTA bands · `marquee-x` (30s, pauses on hover) on the engines row · `shimmer-sweep` (1.5s) on skeletons · `caret-blink`, `signal-x`, and `trace-pulse` for terminal, pipeline, and consolidation-map graphics. Standard easing is `cubic-bezier(0.16, 1, 0.3, 1)`; state transitions run 150–250ms.

## Do's and Don'ts

### Do:

- **Do** keep the void dark base as the default and spend the prism gradient once per view.
- **Do** treat JetBrains Mono as a brand voice — eyebrows, labels, status, specs, data.
- **Do** build depth from the tonal ramp and hairlines, and let light appear only in response to the user.
- **Do** compose new sections from `Section` so vertical rhythm stays 96px → 128px sitewide.
- **Do** drive cursor-reactive effects through CSS custom properties written straight to the element (the `GlowCard` pattern) so pointer motion never triggers a React render.
- **Do** ship every gradient-text element with its solid Probe Cyan fallback declared first.
- **Do** render product screenshots in this exact dark ramp so they read as native to the site.
- **Do** give in-development things a name, a category, and a pill — and nothing else.

### Don't:

- **Don't** gradient-fill buttons, cards, or backgrounds. The gradient stops being special the moment it becomes a surface.
- **Don't** put white text on Probe Cyan, or use a brand color as a fill above 15% alpha.
- **Don't** use full-white page backgrounds, or the retired navy `#0F1B2D` / mint `#00C896` / amber palette.
- **Don't** add ambient glow, glow at rest, or a second CTA-band streak. Unprompted light reads as malfunction.
- **Don't** reach for `box-shadow` with a black value outside true overlays.
- **Don't** introduce a third container width or a third border weight.
- **Don't** stack motifs — traces, chevrons, glow, and gradient in one section is noise. One dominant motif per section.
- **Don't** use stock photography or generic "glowing brain" AI imagery.
- **Don't** re-typeset, recolor, rotate, or effect the logo, and never place the mark on mid-tones or on the gradient. See `internal/DESIGN.md` for mark geometry and clear space.
- **Don't** animate anything that ignores the global `prefers-reduced-motion` kill-switch in `@layer base`.
