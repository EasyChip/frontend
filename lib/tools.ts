/**
 * The EasyChip suite — the public-safe source of truth for every tool surface.
 *
 * Rebuilt 2026-08-27 from the current architecture deck. Fifty tools are built
 * in-house across nine stages, all nine complete end to end; the DevOps and ML
 * layers on top are what is being built now.
 *
 * PUBLIC-SAFE ONLY. This file ships to the client. It must never carry model
 * or pipeline detail, completion percentages, internal build phases, or
 * competitor price figures.
 */

/**
 * `live`  — public and demo-able today.
 * `built` — written and functional, not yet released for outside use.
 */
export type ToolStatus = 'live' | 'built'

export interface Tool {
  name: string
  /** One line, engineering-plain. Present for every tool we describe publicly. */
  note?: string
  status: ToolStatus
}

export interface Stage {
  /** Two-digit index; the sequence is the design flow and carries meaning. */
  id: string
  name: string
  /** What the stage is for, in one plain sentence. */
  summary: string
  tools: Tool[]
}

/** L1 — the orchestration layer that drives every stage below it. */
export const ORCHESTRATION: Tool[] = [
  { name: 'Escanor', note: 'Local-first CLI. Drives the whole flow from the customer’s own machine.', status: 'live' },
  { name: 'FlowBit', note: 'Flow management. Owns the flow graph across all nine stages.', status: 'live' },
  { name: 'Silicrate', note: 'PDK and IP management.', status: 'built' },
]

/** L2 — the nine stages, in flow order. */
export const STAGES: Stage[] = [
  {
    id: '01',
    name: 'Spec & Architecture',
    summary: 'Turning a written specification into a structure the rest of the flow can read.',
    tools: [{ name: 'EasyDesign', status: 'built' }],
  },
  {
    id: '02',
    name: 'RTL Design',
    summary: 'Register maps and IP packaging, generated rather than hand-maintained.',
    tools: [
      { name: 'RegBit', note: 'Register automation. Published earlier as RegMap.', status: 'live' },
      { name: 'IPCatBit', status: 'built' },
    ],
  },
  {
    id: '03',
    name: 'RTL Quality & Static Signoff',
    summary: 'Catching design faults while the RTL is being written, not at signoff.',
    tools: [
      { name: 'LintBit', note: 'RTL linting.', status: 'live' },
      { name: 'CDCBit', note: 'Clock-domain crossing analysis.', status: 'built' },
      { name: 'VisSDC', note: 'Timing constraints.', status: 'built' },
      { name: 'VisUPF', note: 'Power intent. Free and open source.', status: 'live' },
      { name: 'DFTBit', status: 'built' },
    ],
  },
  {
    id: '04',
    name: 'Functional Verification',
    summary: 'Testbenches, simulation and waveform debug in one loop.',
    tools: [
      { name: 'TBGen', status: 'built' },
      { name: 'SimBit', status: 'built' },
      { name: 'WaveBit', status: 'built' },
    ],
  },
  {
    id: '05',
    name: 'Synthesis & DFT',
    summary: 'From RTL to a netlist, with test structures and power accounted for.',
    tools: [
      { name: 'Stella', note: 'RTL synthesis.', status: 'built' },
      { name: 'ScanBit', status: 'built' },
      { name: 'PowerBit', status: 'built' },
    ],
  },
  {
    id: '06',
    name: 'Floorplanning',
    summary: 'Placing the design and delivering power to it.',
    tools: [
      { name: 'Tessera', status: 'built' },
      { name: 'PDNBit', status: 'built' },
      { name: 'GhostCell', status: 'built' },
    ],
  },
  {
    id: '07',
    name: 'Timing / Parasitic / ECO',
    summary: 'Closing timing and carrying late changes without losing the context.',
    tools: [
      { name: 'SAC', note: 'Static timing analysis.', status: 'built' },
      { name: 'ExtractBit', status: 'built' },
    ],
  },
  {
    id: '08',
    name: 'Power Integrity & Reliability',
    summary: 'Power integrity, electromigration and thermal, before tapeout.',
    tools: [
      { name: 'PIBit', status: 'built' },
      { name: 'EMBit', status: 'built' },
      { name: 'ThermalBit', status: 'built' },
    ],
  },
  {
    id: '09',
    name: 'Physical Verification & Signoff',
    summary: 'The last mile of checks before silicon.',
    tools: [{ name: 'Lexa', status: 'built' }],
  },
]

/** Total tools written in-house across the suite. */
export const SUITE_SIZE = 50

export const NAMED_TOOLS = [...ORCHESTRATION, ...STAGES.flatMap((s) => s.tools)]

export const LIVE_TOOLS = NAMED_TOOLS.filter((t) => t.status === 'live')

export const COUNTS = {
  suite: SUITE_SIZE,
  stages: STAGES.length,
  named: NAMED_TOOLS.length,
  live: LIVE_TOOLS.length,
} as const

/** The commercial wedge. One check, priced against what incumbents charge for it. */
export const WEDGE = {
  tool: 'CDCBit',
  note: 'No credible open-source CDC analyser exists, and incumbents charge $200K–$400K per team for this one check.',
} as const
