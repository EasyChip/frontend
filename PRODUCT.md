# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary — investors and enterprise evaluators.** This site is EasyChip's digital footprint, not a client-usage surface. Its job is to let an investor or a prospective customer understand the product end to end without a meeting, and then start one. There is no signed-in product area; every path converges on a conversation.

Two audiences read it, in this order:

1. **Investors.** Pre-seed and seed. They need the thesis, the market, what is actually built, what is validated, and who is building it. They are looking for evidence that the hard part is done.
2. **Chip teams and design houses.** CAD/EDA leads, verification leads and RTL designers at fabless startups, IP vendors and design-service houses running full custom flows. They need to know what is live, whether it runs on their own machines, and whether it is deterministic. Their first question is not price, it is whether the RTL leaves the building.

The engineers who become users are the same people who validated the product: 41 surveyed across CAD/EDA and RTL design roles, with five to six sessions putting a working build in front of a practising engineer.

## Product Purpose

EasyChip is an AI-native EDA platform that replaces the **secondary tier** of chip design — every tool that is not a core signoff engine — with a single suite built in-house, orchestrated from one place, with proprietary models attached to every stage.

A chip takes 12–24 months, and very little of that is design. The time goes into moving data between tools that were never built to talk to each other, rebuilding context the previous stage already had, and waiting on licence servers. A design team runs roughly forty point tools from six to ten vendors, each with its own formats, scripts and failure modes. Fix the handoffs and you do not save a step — you save the loop.

Success for this site: an investor finishes it understanding that fifty production tools exist and were built without outside capital; a chip team finishes it understanding that the whole thing runs on their own hardware and reruns bit-identically. Both then book a demo.

## Positioning

**We rebuild the secondary tier, not the signoff core.** EasyChip does not attempt to displace the core signoff engines from Cadence, Synopsys or Siemens. (Retired 2026-08-27: the shorthand "the cockpit, not the engine" is no longer used anywhere. The site groups its own suite into nine *engines*, so the line told a reader the company does not build the thing every page says it built nine of.) It takes the forty tools around them — the ones nobody consolidated, nobody modernised and nobody made AI-native — and makes them one product.

Four differentiators, in the order the product earns them:

1. **We own the engines.** Fifty tools built in-house across all nine engines, not wrappers over someone else's software. Competitors building agent layers over incumbent software are shipping a feature the incumbent can ship next quarter; owning the engines underneath is not.
2. **Deterministic by default.** The same input produces a bit-identical result, every run, on every machine. Offline signed licences, no licence daemon.
3. **Local-first, and the IP never leaves.** Escanor drives the whole flow from the customer's own machine. Air-gapped teams fully supported. No telemetry.
4. **AI across every stage.** Proprietary models read the structured context fifty engines already emit, so the assistant understands the design rather than the file in front of it.

## Operating Context

**Nine engines, one shared context.** The flow the product maps to, and the L1 orchestration layer above it. *Vocabulary settled 2026-08-27: these nine groups are called **engines**, not stages, on the site and here. Do not reintroduce "stage".*

| | Engine | Tools |
|---|---|---|
| L1 | Orchestration | Escanor (local-first CLI) · FlowBit (flow management) · Silicrate (PDK & IP management) |
| 01 | Spec & Architecture | EasyDesign |
| 02 | RTL Design | RegBit · IPCatBit |
| 03 | RTL Quality & Static Signoff | LintBit · CDCBit · VisSDC · VisUPF · DFTBit |
| 04 | Functional Verification | TBGen · SimBit · WaveBit |
| 05 | Synthesis & DFT | Stella · ScanBit · PowerBit |
| 06 | Floorplanning | Tessera · PDNBit · GhostCell |
| 07 | Timing / Parasitic / ECO | SAC · ExtractBit |
| 08 | Power Integrity & Reliability | PIBit · EMBit · ThermalBit |
| 09 | Physical Verification & Signoff | Lexa |

This taxonomy is product truth. Future work must not re-cut it for visual convenience.

**Where the time goes.** Every boundary between those stages is a manual handoff today. Context is rebuilt rather than carried; constraints, clock intent and waivers are re-authored by hand at each stage. Failures point backwards slowly — a late CDC violation tells you a rule broke, not which decision six weeks earlier broke it. And results are not reproducible, so teams re-verify work they have already done.

**How it is evaluated.** Demos run on the prospect's own machine against their own RTL. Nothing is uploaded, which is what makes the first meeting possible at all. Warm introductions come through BITSAA, investor portfolios and the DLI network.

**Where the company is.** EasyChip Private Limited, Bengaluru, India. Pre-seed as of August 2026.

## Capabilities and Constraints

**Built and running.** Fifty tools written in-house. All nine engines are complete end to end. The DevOps and ML layers on top are what is being built now.

**Live today** — public and demo-able: **Escanor, FlowBit, LintBit, RegMap (RegBit) and VisUPF.** VisUPF is free and open source.

**In build:** packaging and distribution (Apptainer images, offline signed licences, reproducible builds), and the ML layer across the suite — the models and the shared context they run on.

**Next:** design-partner beta, deterministic only, with no AI in the initial release. **CDCBit is the commercial wedge** — no credible open-source CDC analyser exists and incumbents charge $200K–$400K per team for that one check.

**The determinism contract.** Bit-identical reruns. Offline signed licences. No licence daemon. Nothing leaves the customer's network. Air-gap supported. This is the first thing engineers asked for, ahead of any feature.

**The AI layer, as it may be described publicly.** Models are attached per tool rather than one model for everything, each trained on its own domain and its own deterministic feedback. Frontier LLMs are used at the *interface* — the CLI — for natural-language intent and explanation, with routing, redaction and egress under EasyChip's control. **AI output is architecturally separated from deterministic results:** it is advisory, it is labelled, it is auditable, and it never enters a CI gate by default. Every deterministic run is training signal.

**The IP guarantee — publish the guarantee, never the mechanism.** Confirmed 2026-08-27. The site may state plainly that no third-party frontier model ever sees the design, and that the models which touch IP are proprietary and run on customer hardware. It must not name model architecture, base models, training method, routing internals, or the pipeline. The guarantee is a product promise; the mechanism stays private.

**Technical constraints.** Next.js 16 App Router, React 19, Tailwind CSS v4, TypeScript. Supabase is used for one thing only: storing inbound leads. Demo booking runs through Calendly. There is no authenticated product area on this site.

**Explicitly undecided — future work must not resolve these alone:**

- Privacy and Terms binding text; interim honest notices are live.
- Company LinkedIn page and X handle.
- Whether individual per-tool detail pages return.

## Brand Commitments

- **Name:** EasyChip. Legal entity **EasyChip Private Limited**, Bengaluru. Canonical domain `https://www.easychip.org` — the Vercel mirror must never be canonical.
- **Tagline:** "Prompt In · Silicon Out", with no terminal periods. It is the home page H1, set as a two-line statement, and the one-line mono lockup in the footer. *Changed 2026-08-27 by explicit direction; it previously read "Prompt In. Silicon Out." and was barred from the H1. It ships in one form only — do not reintroduce the periods in one place and not the other.*
- **Positioning line:** "Fifty tools. Nine engines. One shared context."
- **Closing line:** "Any engineer should be able to go from idea to silicon without a $500,000 licence standing in the way."
- **Voice:** direct, technical, credible to a working EDA engineer. Short sentences, active voice, specific and labelled claims. No superlatives, no exclamation marks, no emoji. Emphasis is written into the sentence, never typographically shouted. We explain; we do not sell.
- **Identity:** replaced 2026-08-27. The mark is a **line-drawn square die with twelve pin stubs**, strictly monochrome, in `public/brand/`. The faceted EC monogram and the cyan→violet→magenta prism gradient are **retired** and must not reappear.

## Evidence on Hand

**Cleared to publish (confirmed 2026-08-27):**

- **What is built:** 50 tools, 9 stages, complete end to end. Five live today.
- **Validation:** 41 engineers surveyed across CAD/EDA and RTL design roles; 5–6 live product demos on engineers' own machines. Four findings, in the order they recurred: determinism before features; licence servers are a daily tax; nothing leaves the building; tool sprawl is the hidden cost. **This validates the infrastructure thesis. It does not yet validate the physical-design and reliability roadmap** — that is what the design-partner beta is scoped to test, and the site must say so.
- **Capital position:** zero equity raised to date. Fifty production tools built by two people with no outside capital.
- **Incubation:** **BITS Pilani SMCC WILP** — a two-year MoU for co-development and resource sharing toward MVP development. Workspace, stipend and mentors. **No equity taken.** This is a co-development MoU, *not* a BITS Pilani incubation in the equity sense, and must be described that way.
- **Open-source VisUPF** — real and shipping.
- **Market sizing** (2024 → 2030): EDA software $15.4B @ 9.4% → $26.5B; semiconductor IP $8.2B @ 9.5% → $14.2B; custom chip design $5.9B @ 10.6% → $10.8B; AI chip design acceleration $1.8B @ 38.0% → $13.3B. TAM $34.4B @ 12.3% → $69B. SAM $12.1B. SOM 500–800 teams. Incumbents hold 74% of the market across three vendors.
- **Pricing:** Phase 1 wedge $40K per team per year (CDCBit + Escanor CLI). Phase 2 bundle $50–150K per team per year (15–20 tools). Phase 3 full suite $100K+ per bundle. ~40 → ~15 tools maintained after consolidation; 85%+ gross margin at scale; ~6 month sales cycle.
- **Roadmap:** month 3 Escanor beta at design partners; month 6 five paying teams; months 9–12 ten paying teams and seed opens; month 18 full suite plus AI layer, 15–20 tools contracted.
- **Founders:** Rakshit Mishra (Co-founder & CEO — product and frontend; owns customer development and industry validation) and Parth Parekh (Co-founder & CTO — backend, infrastructure and AI systems; owns the orchestration layer, delivery pipeline and ML layer). They met at BITS Pilani Goa doing device-physics research on Cadence and Sentaurus TCAD; the tools were slow enough that the workaround became the company.
- **Conferences:** DVCon India, Bengaluru, September 2026. SEMICON India, Delhi, September 2026. Engineer-led, not booth-led.

**Not cleared — must not appear, and must not be worked around with lookalike claims:**

- **The raise terms** — amount, equity percentage, post-money valuation and instrument. Withheld pending explicit approval.
- **Named investor and adviser conversations.** Nothing about who is in a room.
- **Named prospect and pipeline companies.** The wave-one/two/three target lists stay private; naming a company as a prospect is a disclosure about them, not about EasyChip.
- **Founders' personal email addresses.** Contact runs through the site's own form and `founder@easychip.org`.
- **Y Combinator.** Startup School credits are not YC investment. Never use the YC name or logo, never "backed by YC."
- **Customers, design partners, testimonials, case studies and logos.** None exist yet. The beta is *next*, not current — the site must not imply paying customers.
- **Any metric not in the list above.** Every number ships labelled as survey result, target, or projection.

**Reference documents (never deployed):** `internal/design-kit/arch/` (architecture deck, CONFIDENTIAL), `internal/design-kit/` (the brand kit this identity is built from), `internal/content/` (copy source docs, written against the retired positioning — supersede before reuse).

## Product Principles

1. **Honest status is the credibility.** Built, live, in build and next are four different words and the site uses them precisely. The beta has not happened; nothing may imply it has.
2. **The guarantee is public; the mechanism is not.** What the product does and what the customer gets — never how the models are built or routed.
3. **Determinism before features.** It is the first thing engineers asked for and the first thing the product claims.
4. **We own the engines, and we say what we do not own.** Deliberately narrow: no attempt on core signoff, stated in every room.
5. **State absences; never fabricate around them.** No customers, no funding, no partners yet. Missing proof renders as an honest absence or an omitted module — never as invented content.

## Accessibility & Inclusion

No external standard has been committed. Preserve as a floor: `prefers-reduced-motion` support, visible focus rings, screen-reader-only text where labels are visual, and `aria-live` on form state. The audience is working engineers, frequently on managed corporate machines — the site must degrade gracefully without JavaScript. Text contrast follows the monochrome ramp: body copy on the black ground uses `--off-white`, never the muted greys.
