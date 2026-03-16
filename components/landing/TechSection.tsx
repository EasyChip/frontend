'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion'

const stages = [
  { id: 'arch',  label: 'Architect',  running: 'Parsing specification...' },
  { id: 'gen',   label: 'RTL Gen',    running: 'Generating Verilog...' },
  { id: 'sim',   label: 'Simulate',   running: 'Running Icarus Verilog...' },
  { id: 'dbg',   label: 'Debug',      running: 'Resolving edge cases...' },
  { id: 'fml',   label: 'Formal',     running: 'Running SymbiYosys BMC...' },
  { id: 'syn',   label: 'Synthesize', running: 'Generating netlist...' },
]

const PANELS = [
  {
    title: 'spec.txt',
    lang: 'text',
    content: `# Design Specification
# 4-bit synchronous up-counter
# Active-low reset, clock enable
# Overflow detection output

Analyzing specification...
Identifying modules: 1
Inferring interfaces: clk, rst_n, en
Output module: counter_4bit`,
  },
  {
    title: 'output.v',
    lang: 'verilog',
    content: `module counter_4bit (
  input  wire clk,
  input  wire rst_n,
  input  wire en,
  output reg  [3:0] count,
  output wire overflow
);
  assign overflow = (count == 4'hF) & en;
  always @(posedge clk or negedge rst_n)
    if (!rst_n) count <= 4'h0;
    else if (en) count <= count + 1'b1;
endmodule`,
  },
  {
    title: 'sim.log',
    lang: 'log',
    content: `[SIM] Compiling testbench...
[SIM] Running 10000 cycles
[SIM] Cycle   0: count=0000 rst_n=0
[SIM] Cycle   1: count=0000 en=1
[SIM] Cycle   2: count=0001 ✓
[SIM] Cycle  15: count=1111 overflow=1 ✓
[SIM] Cycle  16: count=0000 ✓
[SIM] Assertions: PASS (127/127)`,
  },
  {
    title: 'debug.log',
    lang: 'log',
    content: `[DBG] Checking overflow on reset edge...
[DBG] Issue detected: priority encoding
[DBG] Applying fix...
[DBG] Re-running assertions...
[DBG] Cycle 1: rst_n=0 overflow=0 ✓
[DBG] Fix verified. No regressions.
[DBG] Status: RESOLVED ✓`,
  },
  {
    title: 'formal.log',
    lang: 'log',
    content: `[BMC] Initializing SymbiYosys...
[BMC] Depth: 20 cycles
[BMC] Property 1: count range...  PASS
[BMC] Property 2: overflow logic. PASS
[BMC] Property 3: reset behavior. PASS
[BMC] Property 4: enable gating.. PASS
[BMC] Bounded Model Check: VERIFIED ✓`,
  },
  {
    title: 'synth.rpt',
    lang: 'log',
    content: `[SYN] Technology: generic
[SYN] Cells: 12 (LUT4: 8, FF: 4)
[SYN] Area: 48 GE
[SYN] Frequency: 250 MHz @ 65nm
[SYN] Power: 0.8 mW est.
[SYN] Netlist: counter_4bit.v ✓
[SYN] Tapeout ready.`,
  },
]

function ChipLayout() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 py-4">
      <p className="text-label text-text-tertiary">silicon tapeout ready</p>
      <svg viewBox="0 0 200 200" className="w-44 h-44">
        {/* Package */}
        <rect x="8" y="8" width="184" height="184" rx="10" fill="rgba(212,168,67,0.05)" stroke="rgba(212,168,67,0.35)" strokeWidth="1.5"/>
        {/* Die */}
        <rect x="28" y="28" width="144" height="144" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
        {/* Functional blocks */}
        <rect x="38" y="38" width="52" height="42" rx="3" fill="rgba(212,168,67,0.1)" stroke="rgba(212,168,67,0.3)" strokeWidth="0.8"/>
        <text x="64" y="63" fontSize="7" fill="rgba(212,168,67,0.8)" textAnchor="middle" fontFamily="monospace">COUNT</text>
        <rect x="110" y="38" width="52" height="42" rx="3" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8"/>
        <text x="136" y="63" fontSize="7" fill="rgba(255,255,255,0.4)" textAnchor="middle" fontFamily="monospace">CLK/RST</text>
        <rect x="38" y="94" width="52" height="36" rx="3" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8"/>
        <text x="64" y="116" fontSize="7" fill="rgba(255,255,255,0.4)" textAnchor="middle" fontFamily="monospace">ENABLE</text>
        <rect x="110" y="94" width="52" height="36" rx="3" fill="rgba(212,168,67,0.1)" stroke="rgba(212,168,67,0.3)" strokeWidth="0.8"/>
        <text x="136" y="116" fontSize="7" fill="rgba(212,168,67,0.8)" textAnchor="middle" fontFamily="monospace">OVF</text>
        {/* Interconnects */}
        <line x1="90" y1="59" x2="110" y2="59" stroke="rgba(212,168,67,0.4)" strokeWidth="1"/>
        <line x1="64" y1="80" x2="64" y2="94" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8"/>
        <line x1="136" y1="80" x2="136" y2="94" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8"/>
        <line x1="90" y1="112" x2="110" y2="112" stroke="rgba(212,168,67,0.3)" strokeWidth="0.8"/>
        {/* I/O pads top */}
        {[48, 72, 100, 128, 152].map((x, i) => (
          <rect key={`t${i}`} x={x - 5} y="10" width="10" height="14" rx="2" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5"/>
        ))}
        {/* I/O pads bottom */}
        {[48, 72, 100, 128, 152].map((x, i) => (
          <rect key={`b${i}`} x={x - 5} y="176" width="10" height="14" rx="2" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5"/>
        ))}
        {/* I/O pads left */}
        {[48, 78, 108, 138].map((y, i) => (
          <rect key={`l${i}`} x="10" y={y - 5} width="14" height="10" rx="2" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5"/>
        ))}
        {/* I/O pads right */}
        {[48, 78, 108, 138].map((y, i) => (
          <rect key={`r${i}`} x="176" y={y - 5} width="14" height="10" rx="2" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5"/>
        ))}
        {/* VERIFIED badge */}
        <rect x="62" y="146" width="76" height="18" rx="9" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.5)" strokeWidth="1"/>
        <text x="100" y="159" fontSize="8" fill="#10b981" textAnchor="middle" fontFamily="monospace" fontWeight="bold">VERIFIED ✓</text>
      </svg>
      <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
        14 lines · 12 cells · tapeout ready
      </div>
    </div>
  )
}

function CodePanel({ panel, active }: { panel: typeof PANELS[0]; active: boolean }) {
  const isLog = panel.lang === 'log' || panel.lang === 'text'
  const lines = panel.content.split('\n')

  return (
    <div className="flex flex-col h-full">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5 flex-shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/50"/>
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"/>
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/50"/>
        <span className="ml-2 text-[10px] text-text-tertiary font-mono">{panel.title}</span>
        {active && (
          <span className="ml-auto flex items-center gap-1 text-[9px] font-mono" style={{ color: 'var(--accent-amber)' }}>
            <span className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-amber)' }}/>
            running
          </span>
        )}
      </div>
      {/* Code */}
      <div className="flex-1 overflow-x-auto p-3" style={{ background: 'rgba(4,8,16,0.7)' }}>
        <pre className="text-[10px] font-mono leading-relaxed min-w-max">
          {lines.map((line, i) => (
            <div key={i} className={
              isLog
                ? line.includes('✓') || line.includes('PASS') || line.includes('VERIFIED') || line.includes('RESOLVED')
                  ? 'text-emerald-400'
                  : line.startsWith('[')
                  ? 'text-text-secondary'
                  : 'text-text-tertiary'
                : line.startsWith('//')
                ? 'text-text-tertiary'
                : line.includes('module') || line.includes('input') || line.includes('output') || line.includes('always') || line.includes('assign') || line.includes('endmodule')
                ? 'text-blue-300/80'
                : 'text-green-400'
            }>
              {line || ' '}
            </div>
          ))}
          {active && <span className="cursor-blink" style={{ color: 'var(--accent-amber)' }}>█</span>}
        </pre>
      </div>
    </div>
  )
}

export default function TechSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.25 })
  const prefersReduced = useReducedMotion()

  const [stageStatus, setStageStatus] = useState<('waiting' | 'running' | 'pass')[]>(
    Array(stages.length).fill('waiting')
  )
  const [panelIndex, setPanelIndex] = useState(0)
  const [allDone, setAllDone] = useState(false)

  useEffect(() => {
    if (!isInView) return
    let cancelled = false
    const delay = (ms: number) => new Promise<void>(r => setTimeout(r, ms))
    const stageDuration = prefersReduced ? 0 : 900
    const passPause = prefersReduced ? 0 : 200

    async function runPipeline() {
      await delay(400)
      for (let i = 0; i < stages.length; i++) {
        if (cancelled) return
        setPanelIndex(i)
        setStageStatus(prev => { const n = [...prev]; n[i] = 'running'; return n })
        await delay(stageDuration)
        if (cancelled) return
        setStageStatus(prev => { const n = [...prev]; n[i] = 'pass'; return n })
        await delay(passPause)
      }
      if (!cancelled) setAllDone(true)
    }

    runPipeline()
    return () => { cancelled = true }
  }, [isInView, prefersReduced])

  return (
    <section className="py-14 px-4">
      <div className="section-container">
        <div className="text-center mb-10">
          <p className="text-label text-text-tertiary mb-4">Under the Hood</p>
          <h2 className="text-display-2 text-text-primary mb-4">
            Serious verification infrastructure,{' '}
            <span className="text-text-secondary">zero setup.</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Enterprise-grade toolchain. No licenses. No config. Just results.
          </p>
        </div>

        <div ref={ref} className="glass-1 rounded-2xl border border-white/8 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* Left: Dynamic code → chip panel */}
            <div
              className="min-h-[420px] relative border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col"
              style={{ background: 'rgba(4,8,16,0.5)' }}
            >
              <AnimatePresence mode="wait">
                {allDone ? (
                  <motion.div
                    key="chip"
                    className="flex-1 flex flex-col"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                  >
                    <ChipLayout />
                  </motion.div>
                ) : (
                  <motion.div
                    key={panelIndex}
                    className="flex-1 flex flex-col"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CodePanel
                      panel={PANELS[panelIndex]}
                      active={stageStatus[panelIndex] === 'running'}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Pipeline stages */}
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <p className="text-label text-text-tertiary mb-5">6-Stage Verification Pipeline</p>

              <div className="space-y-1.5">
                {stages.map((stage, i) => {
                  const status = stageStatus[i]
                  return (
                    <div key={stage.id}>
                      <motion.div
                        className="flex items-center gap-3 rounded-xl px-4 py-3 border transition-all duration-300"
                        style={{
                          background: status === 'running'
                            ? 'rgba(212,168,67,0.06)'
                            : status === 'pass'
                            ? 'rgba(16,185,129,0.04)'
                            : 'rgba(255,255,255,0.02)',
                          borderColor: status === 'running'
                            ? 'rgba(212,168,67,0.3)'
                            : status === 'pass'
                            ? 'rgba(16,185,129,0.2)'
                            : 'rgba(255,255,255,0.06)',
                          borderLeftWidth: '2px',
                          borderLeftColor: status === 'running'
                            ? 'rgba(212,168,67,0.6)'
                            : status === 'pass'
                            ? 'rgba(16,185,129,0.5)'
                            : 'rgba(255,255,255,0.08)',
                        }}
                        initial={{ opacity: 0, x: 16 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                      >
                        <span className="text-[10px] font-mono text-text-tertiary w-5 flex-shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>

                        {/* Status dot */}
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
                          style={{
                            backgroundColor: status === 'running'
                              ? 'var(--accent-amber)'
                              : status === 'pass'
                              ? '#10b981'
                              : 'rgba(255,255,255,0.15)',
                            boxShadow: status === 'running'
                              ? '0 0 6px var(--accent-amber)'
                              : status === 'pass'
                              ? '0 0 6px #10b981'
                              : 'none',
                          }}
                        />

                        <span
                          className="text-sm font-medium flex-1 transition-colors duration-300"
                          style={{
                            color: status === 'running'
                              ? 'var(--text-primary)'
                              : status === 'pass'
                              ? 'var(--text-primary)'
                              : 'var(--text-tertiary)',
                          }}
                        >
                          {stage.label}
                        </span>

                        <span
                          className="text-[10px] font-mono font-semibold transition-all duration-300"
                          style={{
                            color: status === 'running'
                              ? 'var(--accent-amber)'
                              : status === 'pass'
                              ? '#10b981'
                              : 'rgba(255,255,255,0.12)',
                          }}
                        >
                          {status === 'running' ? 'RUN' : status === 'pass' ? 'PASS' : '···'}
                        </span>
                      </motion.div>

                      {i < stages.length - 1 && (
                        <div className="flex justify-start pl-[3.25rem] py-0.5">
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <line x1="5" y1="0" x2="5" y2="5" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M2 4l3 3 3-3" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Status line */}
              <div className="flex items-center gap-2 mt-4">
                <span
                  className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: allDone ? '#10b981' : 'var(--accent-amber)', boxShadow: allDone ? '0 0 6px #10b981' : '0 0 6px var(--accent-amber)' }}
                />
                <span
                  className="text-[10px] font-mono transition-colors duration-300"
                  style={{ color: allDone ? '#10b981' : 'var(--accent-amber)' }}
                >
                  {allDone ? 'All stages passing · 1 attempt' : 'Pipeline running…'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
