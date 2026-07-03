import type { FaqItem } from '@/components/ui/Faq'

/**
 * Master FAQ bank (content pack 02_positioning §9).
 * Only answers that are true-by-derivation today; facts pending intake
 * (pricing figures, compliance posture) stay at the honest general level.
 */

export const FAQ_BANK = {
  replacesSignoff: {
    q: 'Does EasyChip replace Cadence / Synopsys / Siemens?',
    a: 'No. EasyChip is the cockpit above your signoff engines — it consolidates and orchestrates the secondary toolchain around them and owns the integration and developer-experience layer, not the signoff itself. You keep the engines the industry already trusts.',
  },
  ipWhereGoes: {
    q: 'Where does my IP / PDK go?',
    a: 'With Escanor, nowhere — it runs the platform entirely on your own infrastructure, with no design data leaving your machines. Local-first is a hard invariant across every tool we ship.',
  },
  vsChatGpt: {
    q: 'How is this different from ChatGPT writing Verilog, or other AI-EDA tools?',
    a: 'Two things. Breadth: EasyChip is a full platform across the flow, not one AI task. Discipline: AI proposes, deterministic engines verify — no output is trusted until a deterministic engine has checked it.',
  },
  liveVsRoadmap: {
    q: "What's live today vs. in development?",
    a: 'Nine tools are live today — LintBit, VisUPF, VisSDC, RegBit, WaveBit, Stella, SAC, FlowBit, and Silicrate — spanning design, verification, implementation, and the platform layer. Everything else on the site is labeled In Development or Roadmap. We label status honestly on every tool, always.',
  },
  howToTry: {
    q: 'How do I try it, and what does it cost?',
    a: 'Book a demo and we\'ll walk you through the platform on your use case, or join early access to get tools as they open up. VisUPF is free and open source. For pricing, talk to us — plans are shaped around individuals, teams, and IP-sensitive enterprises.',
  },
  integrates: {
    q: 'Does it integrate with my existing flow?',
    a: 'Yes. EasyChip wraps standard engines and standard formats — it fits alongside your current flow rather than forcing a rip-and-replace. Tools compose as nodes in FlowBit graphs, and everything can run locally.',
  },
  whichEngines: {
    q: 'Which engines does EasyChip build on?',
    a: 'We orchestrate proven open engines rather than reinventing signoff — including OpenROAD, Yosys, Verilator, Icarus, SymbiYosys with Z3, KLayout, and Netgen — alongside our own modern cores for synthesis (Stella) and timing (SAC).',
  },
} as const

export const HOME_FAQ: FaqItem[] = [
  FAQ_BANK.replacesSignoff,
  FAQ_BANK.ipWhereGoes,
  FAQ_BANK.vsChatGpt,
  FAQ_BANK.liveVsRoadmap,
  FAQ_BANK.howToTry,
  FAQ_BANK.integrates,
]

export const PLATFORM_FAQ: FaqItem[] = [
  FAQ_BANK.replacesSignoff,
  FAQ_BANK.liveVsRoadmap,
  FAQ_BANK.integrates,
  FAQ_BANK.whichEngines,
]

export const ESCANOR_FAQ: FaqItem[] = [
  FAQ_BANK.ipWhereGoes,
  FAQ_BANK.replacesSignoff,
  FAQ_BANK.howToTry,
]

export const PRICING_FAQ: FaqItem[] = [
  FAQ_BANK.howToTry,
  FAQ_BANK.replacesSignoff,
  FAQ_BANK.ipWhereGoes,
]

/** Engines named publicly as a credibility signal (build spec D2.3). */
export const WRAPPED_ENGINES = [
  'OpenROAD',
  'Yosys',
  'Verilator',
  'Icarus Verilog',
  'SymbiYosys + Z3',
  'KLayout',
  'Netgen',
] as const
