# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary — startup and small chip teams** (confirmed 2026-08-27). Engineers and technical leads at teams that cannot carry forty vendor relationships or the licence cost behind them. The job: get from RTL through signoff without hand-assembling the secondary toolchain, and without a rip-and-replace of the flow they already run. Breadth-as-one-platform is the hook; the integration story and cost-versus-incumbents are the proof they ask for.

Secondary audiences — real, served, but not leading:

- **Enterprise / IP-sensitive teams**, including foundry-NDA teams whose PDKs and IP cannot touch a third-party cloud. Served by Escanor's local-first execution. Proof they need: local-first guarantees and a security posture.
- **Individual engineers and academics** currently stitching open tools together by hand. Entry points: open-source VisUPF, real docs, a free or low tier.

Two operating situations already exist in the codebase:

1. **Anonymous evaluation** — a visitor reading marketing surfaces, deciding whether the breadth claim is credible and what is actually live.
2. **Signed-in early access** — a Supabase-authenticated account area (`/login`, `/onboarding`, `/dashboard`, `/admin/events`). Onboarding captures full name, company, role, company stage, interest areas, and primary use case; the dashboard shows that profile plus per-tool event history.

## Product Purpose

EasyChip is an AI-native EDA platform that consolidates the secondary tools chip teams juggle — linting, power intent, timing constraints, register automation, waveform debug, synthesis, static timing, flow orchestration, PDK management, and dozens more in development — into a single platform. It orchestrates industry-standard engines rather than replacing signoff.

Success for the public site: a chip engineer or team lead understands what is live today versus in development, finds the breadth claim credible, and converts to a demo booking or an early-access request. Success for the account area: an early-access user completes onboarding and returns to the tools.

## Positioning

**The cockpit, not the engine.** EasyChip sits above Cadence / Synopsys / Siemens and orchestrates them; it does not attempt to replace signoff. That stance is deliberate — it de-risks the buyer relationship rather than threatening it.

Four differentiators, in the order the product actually earns them:

1. **Breadth is the moat** — a portfolio spanning the flow, not a point tool.
2. **Escanor, true local-first** — the suite runs entirely on customer infrastructure; IP never leaves.
3. **Non-threatening to signoff** — orchestration, not replacement.
4. **AI proposes, deterministic engines verify** — the discipline that separates this from "an LLM writes Verilog."

## Operating Context

- **The flow it maps to.** Five buckets ordered along the real design journey: Design (S0–S1) → Verify (S2–S3) → Implement (S4–S5) → Sign Off (S6–S7) → Advance (S8, 3D-IC, with Analog and RF suites ahead). A cross-cutting Platform layer (Escanor, FlowBit, Silicrate, DocBit, ProjBit) sits above the buckets. This taxonomy is product truth; future work must not re-cut it for visual convenience.
- **Adoption model.** Additive, alongside the flow a team already runs — never a migration.
- **Evaluation surfaces.** 22 routes: the marketing site under `app/(site)`, per-tool pages at `/tools/[slug]` for live tools only, plus the authenticated app shell.
- **Conversion mechanics as shipped.** Primary CTA "Book a Demo" → `/contact`; secondary "Get Early Access" → `/contact#early-access`. Booking runs through Cal.com (`NEXT_PUBLIC_CALCOM_BOOKING_URL`, currently falling back to a personal link); forms run through Formspree.
- **Content pipeline.** `internal/content/` is the never-deployed copy source of truth — `02_positioning_messaging_voice.md` is the messaging bible, and `CONTENT_TODO.md` maps every pending fact to the exact file that consumes it. Copy changes originate there, not in components.

## Capabilities and Constraints

**Live today — 9 tools with full pages:** LintBit (RTL linting), VisUPF (power intent), VisSDC (timing constraints), RegBit (register automation), WaveBit (waveform debug), Stella (RTL synthesis), SAC (static timing), FlowBit (flow orchestration), Silicrate (PDK management). Escanor is live as the local-first CLI orchestrator with its own page.

**In development — roughly 45 registry entries** carrying name, bucket, stage, and category only. No descriptions until they ship. Analog and RF are listed as future tracks with no tool names yet.

**Status labels are sacred.** "Live" means live. A tool is promoted only by flipping its entry in `lib/tools.ts`; nothing is described before it exists.

**IP guard — absolute.** Public surfaces stay at the capability-and-outcome layer. Never publish: multi-LLM architecture, orchestrator/RTL/verification model roles, base model names, training method (SFT/GRPO/DPO), DCO / Design Context Object, tokenizer specifics, training data, completion percentages, internal build phases, tier or effort allocation, or competitor price figures. If a draft drifts toward "how it is built," it is wrong.

**Metric discipline.** Every number ships labeled as target, projection, or pilot result. Unlabeled metrics are not publishable. Metric bands are currently registry-derived only.

**Technical constraints.** Next.js 16 App Router, React 19, Tailwind CSS v4, TypeScript. Motion via Framer Motion and Lenis; 3D via React Three Fiber, Drei, and postprocessing. Supabase for auth, profiles, and tool events. `lib/tools.ts` ships to the client and must stay public-safe. The contact email is obfuscated at render time — never a plain `mailto:` in the HTML.

**Deliberately withheld surfaces.** `/security` and `/customers` are live but `noindex` and out of navigation until their facts land. Only `founder@easychip.org` is published; `sales@`, `press@`, `careers@`, and `security@` are withheld until confirmed. The VisUPF tarball is not yet in `public/downloads/`, so `VISUPF_DOWNLOAD` is `null` and the download block renders a packaging-in-progress state rather than a dead link.

**Explicitly undecided — future work must not resolve these on its own:**

- The sitewide H1 (see Brand Commitments).
- Escanor access mechanics: download versus request, and supported platforms.
- Privacy and Terms binding text; interim honest notices are live.
- Security page facts: compliance posture, data-handling model, disclosure contact.
- Publishable metrics the team can stand behind.
- Company LinkedIn page and X handle; a branded team Cal.com link.
- Whether the FlowBit "710 tests" figure may be published (currently not published).
- Analog and RF tool names.

## Brand Commitments

- **Name:** EasyChip. Canonical domain `https://www.easychip.org` — the `easychip.vercel.app` mirror must never be canonical.
- **Tagline lockup:** "Prompt In. Silicon Out" — a lockup under the logo, never the H1. Punctuation is still unresolved between the banner (comma) and the brand notes (periods).
- **H1 — OPEN DECISION (2026-08-27).** The shipped `SITE.h1`, "Chip Design Made Simpler," is **provisional**. Candidates on the table: the shipped line, "The cockpit for chip design," and "One platform for everything around signoff." Until this is settled, treat sitewide headline copy as unratified and do not silently pick one.
- **Positioning line:** "The cockpit for chip design — not the engine."
- **Region line:** "Built in India, for chip teams worldwide."
- **Voice:** direct, technical, credible to a working EDA engineer. Short sentences, active voice, specific and labeled claims. We explain; we do not sell. Say "consolidates," "orchestrates," "runs on your infrastructure," "verified by deterministic engines." Avoid hype ("revolutionary," "10x," "magic"), unlabeled metrics, "replace your EDA vendor," and anything implying replacement of signoff.
- **Identity assets on hand:** `internal/branding/logo.png` (faceted EC monogram, transparent), `logo_with_bg.png`, `banner.png`; shipped brand assets in `public/brand/`. A visual system already exists and is documented at `internal/DESIGN.md` — deep-space dark base with a cyan → violet → magenta prism gradient, values sampled from the delivered assets. It supersedes the older navy / mint / amber notes.

## Evidence on Hand

**Cleared to publish (confirmed 2026-08-27):**

- **BITS Pilani incubation**, subject to the program's own wording and logo rules.
- **Open-source VisUPF** — real, shipping, and the strongest public artifact once the tarball lands.
- **GitHub organization:** `https://github.com/EasyChip`.
- **Wrapped engines** as a credibility signal (OpenROAD, Yosys, Verilator, Icarus, SymbiYosys + Z3, KLayout, Netgen and similar), listed per tool in the registry — naming sign-off still to be confirmed.
- **Founders, public:** Rakshit Mishra (Co-founder & CEO) and Parth Parekh (Co-founder & CTO), with LinkedIn links. Bios and photos are pending; initials avatars ship in the interim. A third name was deliberately removed from public listing on 2026-07-05 and must not be reinstated.

**Not cleared — must not appear, and must not be worked around with lookalike claims:**

- **NVIDIA Inception** — not cleared as of 2026-08-27.
- **Y Combinator** — Startup School credits are not YC investment. Never use the YC name or logo, never "backed by YC."
- **Design partners, customer names, testimonials, case studies, and quotes** — none exist. The home proof module is intentionally omitted rather than filled.
- **Grants and awards** — won-versus-pending status unresolved; nothing publishable.
- **Benchmarks, pricing claims, licensing claims, and deployment claims** — do not invent any.

**Reference documents (never deployed):** `internal/content/` (23 docs), `internal/DESIGN.md`, `internal/EasyChip_Website_Build_Spec.md`, `internal/EasyChip_Website_Gap_Analysis.md` (4 July 2026 crawl with a ranked priority-fix list), `CONTENT_TODO.md`.

## Product Principles

1. **Honest status is the product's credibility.** Live means live; in-development gets a name and nothing more. The site's honesty about its own maturity is what makes the breadth claim believable.
2. **Capability and outcome, never mechanism.** What it does and what you get — never how it is built internally. The IP guard is a hard boundary, not a style preference.
3. **Orchestrate; never threaten signoff.** Every surface positions the product above the incumbent engines, not against them.
4. **Breadth is the argument.** Any surface that shows a fraction of the portfolio argues against the thesis. Show the flow, and show where the product already stands in it.
5. **State absences; never fabricate around them.** Missing proof, missing metrics, and missing facts render as honest empty states or omitted modules — never as invented content or placeholder-shaped claims.

## Accessibility & Inclusion

No external standard has been committed. Observed in the incumbent code and treated as a floor to preserve: `prefers-reduced-motion` handling (material, given Lenis smooth scroll, Framer Motion, and R3F 3D work), `focus-visible` styling, screen-reader-only text, and `aria-live` on form state. The audience is working engineers, frequently on managed corporate machines — degradation without JavaScript or WebGL should stay graceful.
