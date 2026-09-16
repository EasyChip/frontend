/**
 * The orchestrator, in five parts.
 *
 * These are ordered the way the films are, which is the order the work happens:
 * a block goes in, becomes a testable revision, gets placed and routed with an
 * engineer at the keyboard, survives signoff, and is closed formally. Numbering
 * them is legitimate here for the reason it usually is not - this is one design,
 * `tt_um_regfile` on sky130hd, carried end to end, not five unrelated features
 * dressed as a sequence.
 *
 * Each claim is written as a refusal because that is what an engineer is buying:
 * not a feature, the removal of a daily tax. The body of each says only what its
 * film actually shows, so nothing here is a claim the evidence does not cover.
 */
export interface Feature {
  index: string
  /** The refusal. */
  claim: string
  /** One line, in plain terms. */
  lead: string
  /** What the film actually shows. */
  body: string
  /**
   * Three quantities the run itself produced, read off the film.
   *
   * These are here for a content reason and a layout reason, and the layout
   * reason came second. A claim and a 16:9 window are different heights, so the
   * prose column ended a couple of hundred pixels short of the evidence beside
   * it. The honest fix was not padding: the column was missing the part a CAD
   * lead actually reads. Every figure below is on screen in the film it sits
   * next to.
   */
  evidence: { figure: string; label: string }[]
  video: string
  poster: string
  duration: string
  /** Accessible name for the theater. */
  label: string
}

export const FEATURES: Feature[] = [
  {
    index: '01',
    claim: 'No hand-written TCL',
    lead: 'One request sets up the whole flow.',
    body: 'An engineer hands over a block and a target: the tinytapeout regfile, sky130hd, front end to PD. Escanor writes the plan, names the receiver, triages six lint findings down to the two a human has to decide, proves the netlist against the RTL, and packages r1 with every file hashed.',
    evidence: [
      { figure: '42', label: 'Plan lines' },
      { figure: '6', label: 'Findings, none real' },
      { figure: '7', label: 'Files hashed' },
    ],
    video: '/media/escanor-01-project.mp4',
    poster: '/media/escanor-01-project-poster.webp',
    duration: '1:03',
    label: 'Managed delivery, front end to PD',
  },
  {
    index: '02',
    claim: 'No silent changes',
    lead: 'Every revision is proved against the last.',
    body: 'r2 adds a scan chain and generates patterns with the SAT engine, reaching 100% test coverage on 44 patterns. Then it proves r2 is the same design as r1. The first proof run failed on the outputs, and that log was kept beside the one that passed.',
    evidence: [
      { figure: '100%', label: 'Test coverage' },
      { figure: '44', label: 'Patterns kept' },
      { figure: '2', label: 'Proof runs, first failed' },
    ],
    video: '/media/escanor-02-testable.mp4',
    poster: '/media/escanor-02-testable-poster.webp',
    duration: '0:53',
    label: 'From r1 to a testable r2',
  },
  {
    index: '03',
    claim: 'No black box',
    lead: 'Every engine runs in a session you can watch, and take over.',
    body: 'Tessera opens as a visible console and GUI, not a batch job, once the r1 hashes are checked against the manifest. The engineer takes the keyboard and redoes placement by hand. The clock tree is built on their placement, and the agent clears a routing error in place.',
    evidence: [
      { figure: '46%', label: 'Utilisation, by hand' },
      { figure: '32', label: 'Clock sinks' },
      { figure: '102', label: 'Instances' },
    ],
    video: '/media/escanor-03-session.mp4',
    poster: '/media/escanor-03-session-poster.webp',
    duration: '1:25',
    label: 'Engineer and agent, one terminal',
  },
  {
    index: '04',
    claim: 'No babysitting',
    lead: 'It reads the logs, diagnoses failures, and reruns only what broke.',
    body: 'Timing, IR drop and equivalence run in parallel. Two come back failed. Escanor reads both, rebuilds the power collateral, hands the equivalence checker an immutable manifest, and reruns the two that broke. The first-pass failures stay in the final report.',
    evidence: [
      { figure: '3', label: 'Agents in parallel' },
      { figure: '2', label: 'Failures kept' },
      { figure: '0.321', label: 'mV worst IR drop' },
    ],
    video: '/media/escanor-04-recovery.mp4',
    poster: '/media/escanor-04-recovery-poster.webp',
    duration: '1:13',
    label: 'Two agents fail, Escanor recovers',
  },
  {
    index: '05',
    claim: 'No unearned passes',
    lead: 'A bounded result is not a proof, and it will not sign one.',
    body: 'A property holds through depth 20. Asked to call that a pass, Escanor refuses: a bounded run does not establish the inductive step, so it cannot close the requirement. It states what closure needs, proves it by k-induction, and keeps the bounded run on record as preliminary evidence.',
    evidence: [
      { figure: '20', label: 'Bounded depth' },
      { figure: 'k-induction', label: 'Proof method' },
      { figure: 'Closed', label: 'Formal verdict' },
    ],
    video: '/media/escanor-05-proof.mp4',
    poster: '/media/escanor-05-proof-poster.webp',
    duration: '1:10',
    label: 'It will not claim a pass it did not earn',
  },
]

/** Every film in the series runs on the same design. */
export const FEATURE_WINDOW_TITLE = 'Escanor · tt_um_regfile'
