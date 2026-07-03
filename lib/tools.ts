/**
 * EasyChip tool registry - the single public-safe source of truth for
 * every tool surface on the site (/tools, /platform, tool pages, sitemap,
 * structured data).
 *
 * PUBLIC-SAFE ONLY. This file ships to the client. It must never contain:
 * internal model/pipeline details, completion percentages, build phases,
 * tier/effort allocation, owner notes, or competitor price figures.
 */

export type ToolStatus = 'live' | 'in-development'

export type BucketId = 'design' | 'verify' | 'implement' | 'signoff' | 'advance'

export interface Bucket {
  id: BucketId
  /** Short verb-led name */
  name: string
  /** Journey position, 1-based */
  order: number
  tagline: string
  description: string
  /** Flow stages covered, shown as mono eyebrow chips */
  stages: string[]
}

export interface ComparisonRow {
  dimension: string
  easychip: string
  oss: string
  commercial: string
}

export interface Comparison {
  /** e.g. "Verilator / Verible" */
  ossName: string
  /** e.g. "Synopsys VC SpyGlass Lint" */
  commercialName: string
  rows: ComparisonRow[]
}

export interface Capability {
  title: string
  body: string
}

export interface Tool {
  /** Stable id (tracker id) */
  id: string
  name: string
  /** Live tools have full pages at /tools/[slug]; in-dev tools have none */
  slug: string | null
  bucket: BucketId | 'platform'
  /** Flow stage label, e.g. "S2 - RTL Quality / Static Signoff" */
  stage: string
  category: string
  status: ToolStatus
  /* ---- marketing fields, live tools only ---- */
  tagline?: string
  problem?: string
  description?: string
  capabilities?: Capability[]
  /** Supported formats / standards / outputs */
  specs?: string[]
  /** Proven engines/libraries we build on - public credibility signal */
  engines?: string[]
  /** Open-source distribution (VisUPF) */
  openSource?: {
    downloadPath?: string
    license?: string
    note?: string
  }
  comparison?: Comparison
  related?: string[]
}

/* ================================================================
   The five buckets - RTL → GDSII → 3D-IC, plus Analog & RF ahead.
   The Platform layer (Escanor, FlowBit, Silicrate…) sits above them.
   ================================================================ */

export const BUCKETS: Bucket[] = [
  {
    id: 'design',
    name: 'Design',
    order: 1,
    tagline: 'From intent to RTL',
    description:
      'Turn specs and architecture decisions into clean, reviewable RTL - register maps, interconnect, memory, and clocking included.',
    stages: ['S0 Spec & Architecture', 'S1 RTL Design'],
  },
  {
    id: 'verify',
    name: 'Verify',
    order: 2,
    tagline: 'From RTL quality to functional closure',
    description:
      'Catch issues the moment they exist: static signoff on the RTL itself, then simulation, testbenches, assertions, coverage, and debug in one loop.',
    stages: ['S2 RTL Quality / Static Signoff', 'S3 Functional Verification'],
  },
  {
    id: 'implement',
    name: 'Implement',
    order: 3,
    tagline: 'From netlist to routed silicon',
    description:
      'Synthesis, floorplanning, power delivery, place-and-route, static timing, extraction, and ECO - the physical flow as one connected cockpit.',
    stages: ['S4 Synthesis & DFT', 'S5 Floorplan → Route → Timing/ECO'],
  },
  {
    id: 'signoff',
    name: 'Sign Off',
    order: 4,
    tagline: 'From analysis to tapeout confidence',
    description:
      'Power integrity, electromigration, thermal, DRC, LVS, ERC and final GDS checks - the last mile before silicon, without the last-mile chaos.',
    stages: ['S6 Power Integrity & Reliability', 'S7 Physical Verification & Signoff'],
  },
  {
    id: 'advance',
    name: 'Advance',
    order: 5,
    tagline: 'Beyond the single die',
    description:
      '3D-IC and advanced packaging today; analog and RF design flows next. The platform grows in every direction chips do.',
    stages: ['S8 Advanced Packaging / 3D-IC', 'Analog (in development)', 'RF (in development)'],
  },
]

/* ================================================================
   Live tools - full marketing pages
   ================================================================ */

const LIVE_TOOLS: Tool[] = [
  {
    id: 'T11',
    name: 'LintBit',
    slug: 'lintbit',
    bucket: 'verify',
    stage: 'S2 - RTL Quality / Static Signoff',
    category: 'RTL Linting',
    status: 'live',
    tagline: 'Catch RTL issues before they reach signoff - deep SystemVerilog linting in your editor and your CI.',
    problem:
      'RTL problems found at signoff cost days; the same problems found while typing cost seconds. Most teams either pay for a heavyweight static-signoff licence or run fragmented open-source checks with no editor integration and no consistent reporting.',
    description:
      'LintBit is a modern RTL linter built on the pyslang SystemVerilog frontend - with an LSP server for live in-editor diagnostics, SARIF output for CI pipelines, and guided fixers that repair issues instead of just flagging them.',
    capabilities: [
      {
        title: 'Deep SystemVerilog analysis',
        body: 'Full-fidelity parsing via the slang frontend - the same class of language accuracy the big static tools rely on, on every file you save.',
      },
      {
        title: 'Live in your editor',
        body: 'A Language Server Protocol (LSP) implementation puts diagnostics inline in VS Code and any LSP-capable editor, while you type.',
      },
      {
        title: 'CI-native reporting',
        body: 'SARIF output drops straight into GitHub / GitLab code-scanning views, so lint results live where code review happens.',
      },
      {
        title: 'Fixers, not just flags',
        body: 'Guided auto-fixes repair common violations directly, turning lint from a report you triage into a step that cleans the code.',
      },
    ],
    specs: ['Verilog / SystemVerilog', 'LSP (editor integration)', 'SARIF (CI/code scanning)', 'Runs locally via Escanor'],
    engines: ['pyslang / slang'],
    comparison: {
      ossName: 'Verilator / Verible',
      commercialName: 'Commercial static-signoff lint',
      rows: [
        { dimension: 'SystemVerilog language accuracy', easychip: 'Full-fidelity slang frontend', oss: 'Good, with gaps in newer constructs', commercial: 'Full' },
        { dimension: 'In-editor diagnostics (LSP)', easychip: 'Built in', oss: 'Partial (Verible LSP)', commercial: 'Rare / IDE-locked' },
        { dimension: 'CI integration', easychip: 'SARIF out of the box', oss: 'Text output, custom glue', commercial: 'Proprietary reports' },
        { dimension: 'Auto-fix', easychip: 'Guided fixers', oss: 'Limited (Verible format)', commercial: 'No' },
        { dimension: 'Platform context', easychip: 'One suite, shared design context', oss: 'Standalone', commercial: 'Standalone tool silo' },
        { dimension: 'Deployment', easychip: 'Local-first via Escanor', oss: 'Local', commercial: 'Licence server, per-seat' },
      ],
    },
    related: ['vissdc', 'visupf', 'wavebit'],
  },
  {
    id: 'T14',
    name: 'VisUPF',
    slug: 'visupf',
    bucket: 'verify',
    stage: 'S2 - RTL Quality / Static Signoff',
    category: 'Power Intent (UPF)',
    status: 'live',
    tagline: 'Author and visualize UPF power intent - see your power domains instead of hand-writing brittle files.',
    problem:
      'UPF is written by hand, reviewed by eye, and debugged at integration - where a wrong isolation strategy or a missed level shifter becomes a silicon-threatening bug. Low-power static checking is locked behind enterprise licences.',
    description:
      'VisUPF gives power intent a visual, checkable workflow: author UPF with structure instead of raw text, see domains, supplies and strategies rendered as a diagram, and run low-power static checks against your RTL before integration. Open source, and free to use.',
    capabilities: [
      {
        title: 'Visual power-domain authoring',
        body: 'Domains, supply networks, isolation and retention strategies as a live diagram - the review artifact and the source of truth are the same thing.',
      },
      {
        title: 'Low-power static checks',
        body: 'Check power intent against the RTL netlist structure early, catching missing isolation and domain-crossing issues before they reach signoff.',
      },
      {
        title: 'Desktop-native and local',
        body: 'A fast desktop app. Your RTL and power intent never leave your machine.',
      },
      {
        title: 'Open source',
        body: 'VisUPF is open source - download it, run it, and inspect exactly what it does with your design data.',
      },
    ],
    specs: ['UPF power intent', 'Verilog RTL', 'Desktop app (Tauri)', 'Runs locally'],
    engines: ['pyverilog'],
    openSource: {
      downloadPath: '/downloads',
      note: 'Free and open source.',
    },
    comparison: {
      ossName: 'Hand-written UPF + scripts',
      commercialName: 'Commercial low-power static tools',
      rows: [
        { dimension: 'Authoring model', easychip: 'Visual + structured', oss: 'Raw text by hand', commercial: 'Text + proprietary GUI' },
        { dimension: 'Power-domain visualization', easychip: 'Built in, live', oss: 'None', commercial: 'Yes' },
        { dimension: 'Static low-power checks', easychip: 'Included', oss: 'None', commercial: 'Yes, licence-gated' },
        { dimension: 'Cost to start', easychip: 'Free, open source', oss: 'Free', commercial: 'Enterprise licence' },
        { dimension: 'Data residency', easychip: '100% local desktop app', oss: 'Local', commercial: 'Licence server dependent' },
      ],
    },
    related: ['lintbit', 'vissdc', 'regbit'],
  },
  {
    id: 'T13',
    name: 'VisSDC',
    slug: 'vissdc',
    bucket: 'verify',
    stage: 'S2 - RTL Quality / Static Signoff',
    category: 'Timing Constraints (SDC)',
    status: 'live',
    tagline: 'Lint, merge, and formally prove your timing constraints - and draft them from natural language.',
    problem:
      'Bad SDC is invisible until timing signoff disagrees with reality. Constraints drift across blocks, merges silently conflict, and nobody can prove an exception is actually safe - the tools that can are six-figure enterprise seats.',
    description:
      'VisSDC treats constraints as a first-class design artifact: a rule-based linter for SDC hygiene, structured merging across blocks, formal proofs of constraint properties using Yosys and the Z3 solver, and natural-language drafting for the boilerplate.',
    capabilities: [
      {
        title: 'Constraint linting',
        body: 'A comprehensive rule set catches malformed, conflicting, and suspicious constraints before they poison a timing run.',
      },
      {
        title: 'Formal constraint proofs',
        body: 'Formally check constraint properties against the design with Yosys + Z3 - turning "we think this false path is safe" into a proof.',
      },
      {
        title: 'Block-to-top merging',
        body: 'Merge constraints across hierarchy with conflicts surfaced explicitly, not discovered at top-level timing.',
      },
      {
        title: 'Natural-language drafting',
        body: 'Describe the constraint you mean; get syntactically correct SDC to review - the deterministic checks still gate everything.',
      },
    ],
    specs: ['SDC constraints', 'Verilog RTL', 'Formal engine: Yosys + Z3', 'Runs locally via Escanor'],
    engines: ['Yosys', 'Z3'],
    comparison: {
      ossName: 'Ad-hoc scripts',
      commercialName: 'Commercial constraint-verification tools',
      rows: [
        { dimension: 'SDC lint rules', easychip: 'Comprehensive rule set', oss: 'Homegrown, partial', commercial: 'Comprehensive' },
        { dimension: 'Formal proof of constraints', easychip: 'Yosys + Z3, included', oss: 'None', commercial: 'Yes, licence-gated' },
        { dimension: 'NL → SDC drafting', easychip: 'Built in, verified after', oss: 'None', commercial: 'Emerging add-ons' },
        { dimension: 'Cross-block merge', easychip: 'Structured, conflict-aware', oss: 'Manual concatenation', commercial: 'Yes' },
        { dimension: 'Deployment', easychip: 'Local-first via Escanor', oss: 'Local', commercial: 'Licence server, per-seat' },
      ],
    },
    related: ['lintbit', 'sac', 'stella'],
  },
  {
    id: 'T09',
    name: 'RegBit',
    slug: 'regbit',
    bucket: 'design',
    stage: 'S1 - RTL Design',
    category: 'Register Automation',
    status: 'live',
    tagline: 'One register spec, every output - RTL, UVM RAL, C headers, and documentation that never drift apart.',
    problem:
      'Registers live in a spreadsheet, the RTL lives in a repo, the firmware headers live in another, and the documentation lies about all three. Every mismatch is an integration bug waiting for bring-up to find it.',
    description:
      'RegBit generates everything from a single register specification: synthesizable RTL, UVM register-abstraction-layer models for verification, C headers for firmware, and human-readable documentation - all guaranteed consistent because they share one source.',
    capabilities: [
      {
        title: 'Spec → synthesizable RTL',
        body: 'Generate clean, reviewable register-block RTL directly from the specification, with standard bus interfaces.',
      },
      {
        title: 'Verification included',
        body: 'UVM RAL models come out of the same spec, so the testbench and the design can never disagree about a field.',
      },
      {
        title: 'Firmware-ready headers',
        body: 'C headers generated in lockstep - hardware and software teams read from the same truth.',
      },
      {
        title: 'Docs that stay true',
        body: 'Register documentation regenerates with every change instead of rotting in a wiki.',
      },
    ],
    specs: ['Register spec input', 'Verilog RTL output', 'UVM RAL', 'C headers', 'Docs output', 'Runs locally via Escanor'],
    engines: ['ANTLR4 grammar toolchain'],
    comparison: {
      ossName: 'Spreadsheets + homegrown scripts',
      commercialName: 'Commercial register-management suites',
      rows: [
        { dimension: 'Single source of truth', easychip: 'One spec, all outputs', oss: 'Spreadsheet drift', commercial: 'Yes' },
        { dimension: 'RTL generation', easychip: 'Included', oss: 'Custom scripts', commercial: 'Yes' },
        { dimension: 'UVM RAL generation', easychip: 'Included', oss: 'Rare', commercial: 'Yes' },
        { dimension: 'C header generation', easychip: 'Included', oss: 'Custom scripts', commercial: 'Yes' },
        { dimension: 'Cost model', easychip: 'Platform access', oss: 'Free + maintenance burden', commercial: 'Enterprise licence' },
        { dimension: 'Deployment', easychip: 'Local-first via Escanor', oss: 'Local', commercial: 'Licence server' },
      ],
    },
    related: ['lintbit', 'visupf', 'flowbit'],
  },
  {
    id: 'T21',
    name: 'WaveBit',
    slug: 'wavebit',
    bucket: 'verify',
    stage: 'S3 - Functional Verification',
    category: 'Waveform Debug',
    status: 'live',
    tagline: 'A waveform viewer that understands your design - protocol decoding and AI-assisted debug, at desktop speed.',
    problem:
      'Debug is where verification time actually goes, and the standard options are a dated free viewer or an enterprise debug seat. Raw signal traces make you decode protocols in your head, bit by bit.',
    description:
      'WaveBit is a modern, desktop-native waveform viewer built in Rust for speed on large dumps - with six protocol decoders that turn raw signals into readable transactions, and AI assistance that helps you interrogate what you\'re seeing.',
    capabilities: [
      {
        title: 'Built for large waveforms',
        body: 'A Rust core and the Wellen waveform engine keep multi-gigabyte dumps scrolling smoothly.',
      },
      {
        title: 'Protocol decoding',
        body: 'Six protocol decoders render buses as transactions, not bit soup - read what the design did, not just what the wires held.',
      },
      {
        title: 'AI-assisted investigation',
        body: 'Ask questions of the trace and get oriented in unfamiliar signals faster; the waveform stays the ground truth.',
      },
      {
        title: 'Desktop-native, local',
        body: 'Your simulation dumps never leave your machine.',
      },
    ],
    specs: ['Standard waveform formats', 'Six protocol decoders', 'Desktop app (Tauri + Rust)', 'Runs locally'],
    engines: ['Wellen'],
    comparison: {
      ossName: 'GTKWave / Surfer',
      commercialName: 'Enterprise debug platforms',
      rows: [
        { dimension: 'Large-dump performance', easychip: 'Rust core, built for scale', oss: 'Struggles at size (GTKWave)', commercial: 'Strong' },
        { dimension: 'Protocol decoding', easychip: '6 decoders built in', oss: 'Limited / plugin-dependent', commercial: 'Yes' },
        { dimension: 'AI-assisted debug', easychip: 'Built in', oss: 'None', commercial: 'Emerging, licence-gated' },
        { dimension: 'Modern UX', easychip: 'Native desktop app', oss: 'Dated (GTKWave) / young (Surfer)', commercial: 'Workstation-class' },
        { dimension: 'Cost to start', easychip: 'Platform access', oss: 'Free', commercial: 'Enterprise seat' },
      ],
    },
    related: ['lintbit', 'vissdc', 'flowbit'],
  },
  {
    id: 'T23',
    name: 'Stella',
    slug: 'stella',
    bucket: 'implement',
    stage: 'S4 - Synthesis & DFT',
    category: 'RTL Synthesis',
    status: 'live',
    tagline: 'A modern RTL synthesis suite - clean C++ core, built to be scripted, inspected, and trusted.',
    problem:
      'Synthesis sits at the center of the flow, but for most teams it\'s either a black-box enterprise licence or an open engine that\'s hard to integrate cleanly into modern, reproducible pipelines.',
    description:
      'Stella is EasyChip\'s synthesis suite: a modern C++17 codebase in the Yosys class of open synthesis technology, designed from the start for platform integration - structured inputs and outputs, scriptability, and reproducible runs inside FlowBit pipelines.',
    capabilities: [
      {
        title: 'Modern synthesis core',
        body: 'A clean C++17 implementation of RTL-to-netlist synthesis, engineered for maintainability and integration rather than accreted over decades.',
      },
      {
        title: 'Pipeline-native',
        body: 'First-class FlowBit integration: synthesis runs as a reproducible node in your flow graph, not a shell script with side effects.',
      },
      {
        title: 'Inspectable by design',
        body: 'Structured, machine-readable outputs at every stage - what happened in synthesis is data you can query, not a log you grep.',
      },
    ],
    specs: ['Verilog RTL input', 'Gate-level netlist output', 'FlowBit-native', 'Runs locally via Escanor'],
    engines: [],
    comparison: {
      ossName: 'Yosys',
      commercialName: 'Commercial synthesis platforms',
      rows: [
        { dimension: 'Codebase', easychip: 'Modern C++17, built for integration', oss: 'Mature, broad, complex', commercial: 'Decades of accretion, closed' },
        { dimension: 'Structured I/O', easychip: 'Native JSON/YAML state', oss: 'Partial', commercial: 'Proprietary databases' },
        { dimension: 'Flow integration', easychip: 'FlowBit node out of the box', oss: 'Script it yourself', commercial: 'Vendor flow lock-in' },
        { dimension: 'Deployment', easychip: 'Local-first via Escanor', oss: 'Local', commercial: 'Licence server, per-seat' },
      ],
    },
    related: ['sac', 'vissdc', 'flowbit'],
  },
  {
    id: 'T32',
    name: 'SAC',
    slug: 'sac',
    bucket: 'implement',
    stage: 'S5c - Timing / Parasitic / ECO',
    category: 'Static Timing Analysis',
    status: 'live',
    tagline: 'A static timing engine with a real Python API - timing analysis you can script, query, and automate.',
    problem:
      'STA is the heartbeat of physical design, yet most teams interact with it through TCL incantations and log files. Automating timing-driven decisions means parsing text meant for humans.',
    description:
      'SAC is a modern static timing analysis engine (C++20) with first-class Python bindings and structured JSON/YAML reporting - so timing data becomes something your scripts, your flows, and your AI tooling can actually consume.',
    capabilities: [
      {
        title: 'Modern STA core',
        body: 'A C++20 timing engine in the OpenSTA class, engineered for clean integration into automated flows.',
      },
      {
        title: 'Python-first interface',
        body: 'pybind11 bindings expose the timer as a library: query paths, slacks, and constraints programmatically instead of scraping reports.',
      },
      {
        title: 'Structured reporting',
        body: 'JSON/YAML timing reports feed dashboards, regressions, and downstream tools without a single regex.',
      },
    ],
    specs: ['Gate-level netlist + SDC', 'Python API (pybind11)', 'JSON / YAML reports', 'Runs locally via Escanor'],
    engines: [],
    comparison: {
      ossName: 'OpenSTA',
      commercialName: 'Commercial signoff timers',
      rows: [
        { dimension: 'Scripting interface', easychip: 'Native Python API', oss: 'TCL', commercial: 'TCL' },
        { dimension: 'Report format', easychip: 'Structured JSON/YAML', oss: 'Text reports', commercial: 'Text + proprietary DB' },
        { dimension: 'Automation-readiness', easychip: 'Built as a library', oss: 'Built as a binary', commercial: 'Built as a seat' },
        { dimension: 'Flow integration', easychip: 'FlowBit node out of the box', oss: 'Script it yourself', commercial: 'Vendor flow lock-in' },
        { dimension: 'Deployment', easychip: 'Local-first via Escanor', oss: 'Local', commercial: 'Licence server, per-seat' },
      ],
    },
    related: ['stella', 'vissdc', 'flowbit'],
  },
  {
    id: 'T48',
    name: 'FlowBit',
    slug: 'flowbit',
    bucket: 'platform',
    stage: 'X - Platform',
    category: 'Flow Orchestration',
    status: 'live',
    tagline: 'Orchestrate your entire EDA flow as a graph - reproducible runs, convergence loops, and full visibility.',
    problem:
      'Real chip flows are DAGs pretending to be Makefiles. Reruns aren\'t reproducible, partial failures mean starting over, and nobody can see where time actually went.',
    description:
      'FlowBit is a desktop-native DAG orchestrator built in Rust for EDA workloads: compose tools into flow graphs with subgraphs and convergence loops, run them reproducibly, and watch execution live. It\'s the connective tissue of the EasyChip platform - every tool is a FlowBit node.',
    capabilities: [
      {
        title: 'Flows as graphs',
        body: 'Model the real structure of your flow - dependencies, subgraphs, and iterative convergence loops - instead of flattening it into scripts.',
      },
      {
        title: 'Reproducible by construction',
        body: 'Runs are deterministic and resumable; a failed node reruns from where it failed, with the same inputs, every time.',
      },
      {
        title: 'Built for EDA in Rust',
        body: 'A Tokio-based async core handles long-running tool jobs and live monitoring without the fragility of shell orchestration.',
      },
      {
        title: 'The platform\'s backbone',
        body: 'Every EasyChip tool ships as a first-class FlowBit node - one graph from RTL to GDSII.',
      },
    ],
    specs: ['DAG flows + subgraphs', 'Convergence loops', 'Desktop app (Tauri + Rust)', 'Runs locally via Escanor'],
    engines: [],
    comparison: {
      ossName: 'FuseSoC / Edalize / Make',
      commercialName: 'Commercial flow managers',
      rows: [
        { dimension: 'Flow model', easychip: 'True DAG + subgraphs + loops', oss: 'Linear targets / recipes', commercial: 'DAG' },
        { dimension: 'Convergence loops', easychip: 'First-class', oss: 'Manual scripting', commercial: 'Partial' },
        { dimension: 'Live execution view', easychip: 'Built-in desktop UI', oss: 'Logs', commercial: 'Yes' },
        { dimension: 'Tool ecosystem', easychip: 'Entire EasyChip suite as nodes', oss: 'Adapters you maintain', commercial: 'Vendor-centric' },
        { dimension: 'Deployment', easychip: 'Local-first', oss: 'Local', commercial: 'Licence server' },
      ],
    },
    related: ['silicrate', 'stella', 'sac'],
  },
  {
    id: 'T49',
    name: 'Silicrate',
    slug: 'silicrate',
    bucket: 'platform',
    stage: 'X - Platform',
    category: 'PDK Management',
    status: 'live',
    tagline: 'The PDK substrate - immutable, content-addressed process kits with lockfiles, so every run is reproducible.',
    problem:
      'PDKs are giant, versioned-by-folder-name, and quietly mutated. When a run can\'t be reproduced six months later, the kit is usually why - and nobody can prove what changed.',
    description:
      'Silicrate manages process design kits the way modern software manages dependencies: content-addressed immutable storage, lockfiles that pin exactly what a flow consumed, and a clean API for tools to resolve kit assets - reproducibility as infrastructure, not discipline.',
    capabilities: [
      {
        title: 'Content-addressed storage',
        body: 'Every kit asset is stored by content hash - identical inputs are provably identical, and mutation is impossible by construction.',
      },
      {
        title: 'Lockfiles for silicon',
        body: 'Flows record exactly which kit contents they consumed; reruns resolve the same bits, byte for byte.',
      },
      {
        title: 'One interface across kits',
        body: 'Tools resolve PDK assets through a single API instead of hard-coded paths into vendor folder trees.',
      },
    ],
    specs: ['PDK asset management', 'Content-addressed store', 'Lockfiles', 'API for tool integration', 'Runs locally via Escanor'],
    engines: [],
    comparison: {
      ossName: 'Folder trees + environment variables',
      commercialName: 'Vendor-bundled kit management',
      rows: [
        { dimension: 'Integrity', easychip: 'Content-hash guaranteed', oss: 'Hope + naming conventions', commercial: 'Vendor-managed' },
        { dimension: 'Reproducibility', easychip: 'Lockfile-pinned', oss: 'None', commercial: 'Partial' },
        { dimension: 'Tool interface', easychip: 'Uniform API', oss: 'Hard-coded paths', commercial: 'Per-vendor' },
        { dimension: 'Deployment', easychip: 'Local-first', oss: 'Local', commercial: 'Bundled with seats' },
      ],
    },
    related: ['flowbit', 'stella', 'sac'],
  },
]

/* ================================================================
   In-development tools - name + category only, by design.
   No descriptions until they ship (honest status labels).
   ================================================================ */

const inDev = (
  id: string,
  name: string,
  bucket: BucketId | 'platform',
  stage: string,
  category: string
): Tool => ({ id, name, slug: null, bucket, stage, category, status: 'in-development' })

const IN_DEVELOPMENT_TOOLS: Tool[] = [
  /* ---- Design (S0 + S1) ---- */
  inDev('T01', 'SpecBit', 'design', 'S0', 'Spec & Architecture'),
  inDev('T02', 'ArchBit', 'design', 'S0', 'Architecture Exploration'),
  inDev('T03', 'HLSBit', 'design', 'S0', 'High-Level Synthesis'),
  inDev('T04', 'SoCBit', 'design', 'S0', 'SoC Assembly & Interconnect'),
  inDev('T05', 'MemBit', 'design', 'S0', 'Memory Compilation'),
  inDev('T06', 'ClkBit', 'design', 'S0', 'Clock & Reset Architecture'),
  inDev('T08', 'AI RTL', 'design', 'S1', 'AI RTL Design'),
  inDev('T10', 'IPCatBit', 'design', 'S1', 'IP Catalog & Packaging'),
  inDev('T07', 'FPGA Forge', 'design', 'S0', 'FPGA Fabric'),

  /* ---- Verify (S2 + S3) ---- */
  inDev('T12', 'CDCBit', 'verify', 'S2', 'CDC / RDC Analysis'),
  inDev('T15', 'DFTBit', 'verify', 'S2', 'DFT Readiness'),
  inDev('T16', 'SimBit', 'verify', 'S3', 'Simulation'),
  inDev('T17', 'TBGen', 'verify', 'S3', 'Testbench Generation'),
  inDev('T18', 'AssertBit', 'verify', 'S3', 'Assertions'),
  inDev('T19', 'CovBit', 'verify', 'S3', 'Coverage'),
  inDev('T20', 'FormalBit', 'verify', 'S3', 'Formal Verification'),
  inDev('T22', 'TriageBit', 'verify', 'S3', 'Regression Triage'),

  /* ---- Implement (S4 + S5) ---- */
  inDev('T24', 'LECBit', 'implement', 'S4', 'Logic Equivalence'),
  inDev('T25', 'ScanBit', 'implement', 'S4', 'Scan & ATPG'),
  inDev('T26', 'PowerBit', 'implement', 'S4', 'Power Estimation'),
  inDev('T27', 'FloorBit', 'implement', 'S5a', 'Floorplanning'),
  inDev('T28', 'PDNBit', 'implement', 'S5a', 'Power Delivery Network'),
  inDev('T29', 'PlaceBit', 'implement', 'S5b', 'Placement'),
  inDev('T30', 'CTSBit', 'implement', 'S5b', 'Clock Tree Synthesis'),
  inDev('T31', 'RouteBit', 'implement', 'S5b', 'Routing'),
  inDev('T33', 'ExtractBit', 'implement', 'S5c', 'Parasitic Extraction'),
  inDev('T34', 'ECOBit', 'implement', 'S5c', 'Engineering Change Orders'),
  inDev('T35', 'SiliconDiff', 'implement', 'S5c', 'Netlist / Layout Diff'),

  /* ---- Sign Off (S6 + S7) ---- */
  inDev('T36', 'PIBit', 'signoff', 'S6', 'Power Integrity'),
  inDev('T37', 'EMBit', 'signoff', 'S6', 'Electromigration'),
  inDev('T38', 'ThermalBit', 'signoff', 'S6', 'Thermal Analysis'),
  inDev('T39', 'DRCBit', 'signoff', 'S7', 'Design Rule Checking'),
  inDev('T40', 'LVSBit', 'signoff', 'S7', 'Layout vs. Schematic'),
  inDev('T41', 'ERCBit', 'signoff', 'S7', 'Electrical Rule Checking'),
  inDev('T42', 'PVBit', 'signoff', 'S7', 'Physical Verification Suite'),
  inDev('T43', 'GDSBit', 'signoff', 'S7', 'Final Checks & GDS Export'),

  /* ---- Advance (S8 + beyond) ---- */
  inDev('T44', 'BloxBit', 'advance', 'S8', '3DBLOX Modeling'),
  inDev('T45', 'Chiplet3DBit', 'advance', 'S8', '3D Partitioning'),
  inDev('T46', 'InterposerBit', 'advance', 'S8', 'Interposer / 2.5D Planning'),

  /* ---- Platform (cross-cutting) ---- */
  inDev('T50', 'DocBit', 'platform', 'X', 'Design Documentation'),
  inDev('T51', 'ProjBit', 'platform', 'X', 'Design Data Management'),
]

/* ================================================================
   Public API
   ================================================================ */

export const TOOLS: Tool[] = [...LIVE_TOOLS, ...IN_DEVELOPMENT_TOOLS]

export const LIVE = LIVE_TOOLS

export function getTool(slug: string): Tool | undefined {
  return LIVE_TOOLS.find((t) => t.slug === slug)
}

export function toolsByBucket(bucket: BucketId | 'platform'): Tool[] {
  return TOOLS.filter((t) => t.bucket === bucket).sort((a, b) =>
    a.status === b.status ? 0 : a.status === 'live' ? -1 : 1
  )
}

export function getBucket(id: BucketId): Bucket {
  return BUCKETS.find((b) => b.id === id)!
}

/** Future expansion tracks shown in the Advance bucket - no tool names yet, honestly labeled. */
export const FUTURE_TRACKS = [
  { name: 'Analog Design Suite', note: 'In development' },
  { name: 'RF Design Suite', note: 'In development' },
]

/** Counts for metric bands - derived, never hand-maintained. */
export const TOOL_COUNTS = {
  total: TOOLS.length,
  live: LIVE_TOOLS.length,
  inDevelopment: IN_DEVELOPMENT_TOOLS.length,
}
