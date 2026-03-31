'use client'

import { useEffect, useRef, useState } from 'react'

const EXAMPLES = [
  {
    prompt: '> describe: 8-bit ALU with carry-lookahead',
    verilog: [
      'module alu_8bit (',
      '  input  [7:0] a, b,',
      '  input  [2:0] op,',
      '  output [7:0] result,',
      '  output       carry',
      ');',
    ],
  },
  {
    prompt: '> describe: RISC-V pipeline stage with forwarding',
    verilog: [
      'module ex_stage (',
      '  input  [31:0] rs1, rs2,',
      '  input  [ 4:0] rd,',
      '  input  [31:0] imm,',
      '  output [31:0] alu_out',
      ');',
    ],
  },
  {
    prompt: '> describe: SPI master with configurable clock divider',
    verilog: [
      'module spi_master (',
      '  input        clk, rst_n,',
      '  input  [7:0] tx_data,',
      '  output       sclk, mosi,',
      '  output       done',
      ');',
    ],
  },
]

type Phase = 'typing-prompt' | 'pause-after-prompt' | 'typing-verilog' | 'show-pass' | 'pause-end'

export default function Hero() {
  const [exIdx, setExIdx]             = useState(0)
  const [promptText, setPromptText]   = useState('')
  const [verilogLines, setVerilogLines] = useState<string[]>([])
  const [showPass, setShowPass]       = useState(false)
  const [phase, setPhase]             = useState<Phase>('typing-prompt')

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const ex = EXAMPLES[exIdx]
    let charIdx = 0
    let lineIdx = 0

    const clearTimer = () => { if (timerRef.current) clearTimeout(timerRef.current) }

    const typePrompt = () => {
      if (charIdx < ex.prompt.length) {
        setPromptText(ex.prompt.slice(0, charIdx + 1))
        charIdx++
        timerRef.current = setTimeout(typePrompt, 36)
      } else {
        setPhase('pause-after-prompt')
        timerRef.current = setTimeout(startVerilog, 800)
      }
    }

    const startVerilog = () => {
      setPhase('typing-verilog')
      typeVerilogLine()
    }

    const typeVerilogLine = () => {
      if (lineIdx < ex.verilog.length) {
        const line = ex.verilog[lineIdx]
        lineIdx++
        setVerilogLines(prev => [...prev, line])
        timerRef.current = setTimeout(typeVerilogLine, 180)
      } else {
        setPhase('show-pass')
        timerRef.current = setTimeout(() => {
          setShowPass(true)
          timerRef.current = setTimeout(reset, 2200)
        }, 300)
      }
    }

    const reset = () => {
      setPromptText('')
      setVerilogLines([])
      setShowPass(false)
      setPhase('typing-prompt')
      charIdx = 0
      lineIdx = 0
      setExIdx(prev => (prev + 1) % EXAMPLES.length)
    }

    setPhase('typing-prompt')
    timerRef.current = setTimeout(typePrompt, 400)

    return clearTimer
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exIdx])

  /* Scroll reveal */
  const sectionRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal, .reveal-left')
    if (!els) return
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add('visible'); observer.unobserve(e.target) } }),
      { threshold: 0.15 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 60,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="section-container" style={{ width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          padding: '5rem 0',
        }}>
          {/* Left: copy */}
          <div>
            {/* Label */}
            <div
              className="reveal"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--teal)',
                marginBottom: 24,
                animationDelay: '0.1s',
              }}
            >
              — AI-Native EDA
            </div>

            {/* Headline */}
            <h1
              className="reveal"
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 'clamp(56px, 8vw, 96px)',
                fontWeight: 300,
                letterSpacing: '-0.03em',
                lineHeight: 1.0,
                color: 'var(--white)',
                marginBottom: 28,
                animationDelay: '0.25s',
              }}
            >
              Natural Language<br />
              to{' '}
              <em style={{ color: 'var(--teal)', fontStyle: 'normal' }}>Silicon.</em>
            </h1>

            {/* Subtext */}
            <p
              className="reveal"
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 18,
                fontWeight: 300,
                color: 'var(--gray)',
                maxWidth: 460,
                lineHeight: 1.6,
                marginBottom: 36,
                animationDelay: '0.4s',
              }}
            >
              Describe a hardware module in plain English. EasyChip generates
              verified, synthesisable Verilog — ready for tape-out.
            </p>

            {/* CTAs */}
            <div
              className="reveal"
              style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 40, animationDelay: '0.55s' }}
            >
              <a href="#cta" className="btn-primary" style={{ fontSize: 12 }}>
                Request Access →
              </a>
              <a
                href="#how-it-works"
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 12,
                  color: 'var(--gray)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--gray)')}
              >
                See how it works ↓
              </a>
            </div>

            {/* Stat pills */}
            <div
              className="reveal"
              style={{ display: 'flex', gap: 8, flexWrap: 'wrap', animationDelay: '0.7s' }}
            >
              {['Phase 12 / 20 complete', '31K+ RTL training files', '17/17 tests passing'].map(s => (
                <span key={s} className="stat-pill">{s}</span>
              ))}
            </div>
          </div>

          {/* Right: terminal */}
          <div className="hero-terminal reveal" style={{ animationDelay: '0.4s' }}>
            <div style={{
              background: '#0a0f18',
              border: '1px solid var(--border)',
              borderRadius: 4,
              overflow: 'hidden',
              fontFamily: 'var(--mono)',
              fontSize: 13,
              lineHeight: 1.7,
            }}>
              {/* Terminal chrome */}
              <div style={{
                padding: '10px 14px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'inline-block' }} />
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'inline-block' }} />
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'inline-block' }} />
                <span style={{ marginLeft: 8, fontSize: 10, color: 'rgba(240,244,255,0.25)', letterSpacing: '0.06em' }}>
                  easychip — rtl-gen
                </span>
              </div>
              {/* Terminal body */}
              <div style={{ padding: '16px 20px', minHeight: 220 }}>
                {/* Prompt line */}
                <div style={{ color: 'var(--teal)', marginBottom: 6 }}>
                  {promptText}
                  {(phase === 'typing-prompt') && (
                    <span style={{ animation: 'typing-cursor 1s step-end infinite' }}>▋</span>
                  )}
                </div>
                {/* Verilog lines */}
                {verilogLines.map((line, i) => (
                  <div key={i} style={{ color: 'var(--white)', opacity: 0.9 }}>{line}</div>
                ))}
                {/* Cursor while typing verilog */}
                {phase === 'typing-verilog' && (
                  <span style={{ color: 'var(--white)', animation: 'typing-cursor 1s step-end infinite' }}>▋</span>
                )}
                {/* PASS badge */}
                {showPass && (
                  <div style={{
                    marginTop: 12,
                    color: '#22C55E',
                    fontFamily: 'var(--mono)',
                    fontSize: 12,
                    letterSpacing: '0.04em',
                  }}>
                    ✓ PASS · verified · synthesisable
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive: hide terminal on mobile */}
      <style>{`
        @media (max-width: 768px) {
          #hero > div > div {
            grid-template-columns: 1fr !important;
          }
          .hero-terminal { display: none !important; }
          #hero h1 {
            font-size: clamp(40px, 10vw, 56px) !important;
          }
        }
      `}</style>
    </section>
  )
}
