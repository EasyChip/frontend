'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'

const TOTAL_STEPS = 4

const FILE_TREE_LINES: { text: string; type: 'folder' | 'file' }[] = [
  { text: 'uart_tx/', type: 'folder' },
  { text: '├── src/', type: 'folder' },
  { text: '│   ├── design.v', type: 'file' },
  { text: '│   └── design.sv', type: 'file' },
  { text: '├── tb/', type: 'folder' },
  { text: '│   └── test_uart_tx.py', type: 'file' },
  { text: '├── syn/', type: 'folder' },
  { text: '│   └── synth.ys', type: 'file' },
  { text: '└── docs/', type: 'folder' },
  { text: '    └── README.md', type: 'file' },
]

const SPEC_FIELDS = [
  'Module Name & Function',
  'Interface — Ports & Widths',
  'Clock & Reset',
  'Parameters & Configurability',
  'Functional Behaviour (FSM/Logic)',
  'Timing Constraints',
  'Memory & Storage Elements',
  'Edge Cases & Corner Cases',
  'Target Technology',
]

/* ─── Global keyframes injected once ──────────────────────────────────── */
const GLOBAL_STYLES = `
@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
@keyframes code-pulse {
  0%, 100% { box-shadow: 0 0 12px 0 rgba(200,150,46,0.08); }
  50% { box-shadow: 0 0 24px 4px rgba(200,150,46,0.18); }
}
@keyframes stagger-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes slide-right-in {
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes slide-left-in {
  from { opacity: 0; transform: translateX(-40px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes slide-right-out {
  from { opacity: 1; transform: translateX(0); }
  to   { opacity: 0; transform: translateX(-40px); }
}
@keyframes slide-left-out {
  from { opacity: 1; transform: translateX(0); }
  to   { opacity: 0; transform: translateX(40px); }
}
`

export default function WelcomePage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [animClass, setAnimClass] = useState<string>('anim-in-right')
  const [animating, setAnimating] = useState(false)
  const dirRef = useRef<'forward' | 'backward'>('forward')
  const contentRef = useRef<HTMLDivElement>(null)

  const finish = useCallback(() => {
    localStorage.setItem('easychip_onboarded', 'true')
    router.push('/playground')
  }, [router])

  const goTo = useCallback(
    (next: number) => {
      if (next < 0 || next > TOTAL_STEPS - 1 || animating) return
      const dir = next > step ? 'forward' : 'backward'
      dirRef.current = dir
      setAnimating(true)
      setAnimClass(dir === 'forward' ? 'anim-out-right' : 'anim-out-left')
      setTimeout(() => {
        setStep(next)
        setAnimClass(dir === 'forward' ? 'anim-in-right' : 'anim-in-left')
        setTimeout(() => setAnimating(false), 350)
      }, 200)
    },
    [step, animating]
  )

  const next = useCallback(() => {
    if (step === TOTAL_STEPS - 1) {
      finish()
    } else {
      goTo(step + 1)
    }
  }, [step, goTo, finish])

  const prev = useCallback(() => {
    goTo(step - 1)
  }, [step, goTo])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [next, prev])

  const isLast = step === TOTAL_STEPS - 1

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        color: '#FAFAFA',
        fontFamily: 'var(--font-sans)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{GLOBAL_STYLES}</style>
      <style>{`
        .anim-in-right  { animation: slide-right-in 0.35s cubic-bezier(.22,1,.36,1) forwards; }
        .anim-in-left   { animation: slide-left-in  0.35s cubic-bezier(.22,1,.36,1) forwards; }
        .anim-out-right { animation: slide-right-out 0.2s  ease-in forwards; }
        .anim-out-left  { animation: slide-left-out  0.2s  ease-in forwards; }
        .step-title     { animation: stagger-in 0.4s cubic-bezier(.22,1,.36,1) 0.05s both; }
        .step-body      { animation: stagger-in 0.4s cubic-bezier(.22,1,.36,1) 0.12s both; }
        .step-content   { animation: stagger-in 0.4s cubic-bezier(.22,1,.36,1) 0.22s both; }
        .step-footer    { animation: stagger-in 0.4s cubic-bezier(.22,1,.36,1) 0.30s both; }
        .nav-btn { transition: transform 0.2s ease, border-color 0.2s, color 0.2s, box-shadow 0.2s, opacity 0.2s; }
        .nav-btn:hover { transform: scale(1.02); }
        .pill-step { transition: box-shadow 0.25s ease, border-color 0.25s ease; }
        .pill-step:hover { box-shadow: 0 0 12px 0 rgba(200,150,46,0.2); border-color: rgba(200,150,46,0.3) !important; }
        .spec-row { transition: border-color 0.2s ease, border-left-color 0.2s ease; }
        .spec-row:hover { border-left-color: #C8962E !important; }
        .enter-glow { box-shadow: 0 0 20px 2px rgba(200,150,46,0.25); }
        .enter-glow:hover { box-shadow: 0 0 28px 6px rgba(200,150,46,0.35); }
      `}</style>

      {/* Ambient glow behind content area */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,150,46,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Circuit trace decorations — left */}
      <div
        style={{
          position: 'absolute',
          left: 24,
          top: '20%',
          bottom: '20%',
          width: 1,
          background: 'linear-gradient(to bottom, transparent, rgba(200,150,46,0.08) 30%, rgba(200,150,46,0.08) 70%, transparent)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 24,
          top: '35%',
          width: 12,
          height: 1,
          background: 'rgba(200,150,46,0.08)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 24,
          top: '55%',
          width: 20,
          height: 1,
          background: 'rgba(200,150,46,0.08)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 36,
          top: '35%',
          width: 4,
          height: 4,
          borderRadius: '50%',
          background: 'rgba(200,150,46,0.15)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Circuit trace decorations — right */}
      <div
        style={{
          position: 'absolute',
          right: 24,
          top: '25%',
          bottom: '25%',
          width: 1,
          background: 'linear-gradient(to bottom, transparent, rgba(200,150,46,0.06) 30%, rgba(200,150,46,0.06) 70%, transparent)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 24,
          top: '45%',
          width: 16,
          height: 1,
          background: 'rgba(200,150,46,0.06)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 24,
          top: '65%',
          width: 10,
          height: 1,
          background: 'rgba(200,150,46,0.06)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 40,
          top: '45%',
          width: 4,
          height: 4,
          borderRadius: '50%',
          background: 'rgba(200,150,46,0.12)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Top Bar */}
      <div style={{ padding: '24px 32px 0', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img
              src="/logo.png"
              alt="EasyChip"
              style={{ width: 32, height: 'auto' }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                color: '#C8962E',
                fontWeight: 600,
              }}
            >
              EasyChip
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: '#555555',
                letterSpacing: '0.05em',
              }}
            >
              {String(step + 1).padStart(2, '0')}{' '}
              <span style={{ color: '#333333' }}>/</span>{' '}
              {String(TOTAL_STEPS).padStart(2, '0')}
            </span>
            <button
              onClick={finish}
              style={{
                background: 'none',
                border: 'none',
                color: '#555555',
                fontSize: 13,
                fontFamily: 'var(--font-sans)',
                cursor: 'pointer',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FAFAFA')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#555555')}
            >
              Skip
            </button>
          </div>
        </div>

        {/* Progress Bar — single smooth fill */}
        <div
          style={{
            height: 2,
            background: '#1C1C1C',
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${((step + 1) / TOTAL_STEPS) * 100}%`,
              background: 'linear-gradient(90deg, #C8962E, #d4a94a)',
              borderRadius: 1,
              transition: 'width 0.5s cubic-bezier(.22,1,.36,1)',
            }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div
        ref={contentRef}
        className={animClass}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 32px',
          maxWidth: 640,
          margin: '0 auto',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {step === 0 && <Step1 />}
        {step === 1 && <Step2 />}
        {step === 2 && <Step3 />}
        {step === 3 && <Step4 />}
      </div>

      {/* Bottom Nav */}
      <div
        style={{
          padding: '24px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: 640,
          margin: '0 auto',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <button
          className="nav-btn"
          onClick={prev}
          disabled={step === 0}
          style={{
            background: 'none',
            border: '1px solid #1C1C1C',
            color: step === 0 ? '#2A2A2A' : '#888888',
            padding: '10px 20px',
            borderRadius: 8,
            fontSize: 14,
            fontFamily: 'var(--font-sans)',
            cursor: step === 0 ? 'not-allowed' : 'pointer',
          }}
          onMouseEnter={(e) => {
            if (step !== 0) e.currentTarget.style.borderColor = '#2A2A2A'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#1C1C1C'
          }}
        >
          ← Back
        </button>
        <button
          className={`nav-btn ${isLast ? 'enter-glow' : ''}`}
          onClick={next}
          style={{
            background: '#C8962E',
            color: '#0A0A0A',
            border: 'none',
            padding: isLast ? '12px 28px' : '10px 24px',
            borderRadius: 8,
            fontSize: isLast ? 15 : 14,
            fontWeight: 600,
            fontFamily: 'var(--font-mono)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.3s ease, opacity 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.92')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          {isLast ? 'Enter Playground →' : 'Continue →'}
        </button>
      </div>
    </div>
  )
}

/* ─── Shared Components ───────────────────────────────────────────────── */

function SectionLabel({ number, title }: { number: number; title: string }) {
  return (
    <h1
      className="step-title"
      style={{
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 200,
        margin: '0 0 24px',
        fontFamily: 'var(--font-sans)',
        letterSpacing: '-0.02em',
        color: '#FAFAFA',
      }}
    >
      <span
        style={{
          color: '#555555',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.45em',
          fontWeight: 400,
        }}
      >
        {String(number).padStart(2, '0')} —{' '}
      </span>
      {title}
    </h1>
  )
}

function BodyText({
  children,
  className = 'step-body',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={className}
      style={{
        fontSize: 16,
        lineHeight: 1.8,
        color: '#888888',
        margin: '0 0 16px',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {children}
    </p>
  )
}

/* ─── Steps ───────────────────────────────────────────────────────────── */

function Step1() {
  const pills = ['Describe', 'Generate', 'Verify', 'Synthesise']
  return (
    <div>
      <SectionLabel number={1} title="Welcome to EasyChip" />
      <BodyText>
        You&apos;re about to design hardware the way software engineers write code.
      </BodyText>
      <BodyText>
        No Verilog knowledge needed. No EDA license required. No vendor lock-in.
      </BodyText>
      <div
        className="step-content"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          marginTop: 24,
          flexWrap: 'wrap',
          position: 'relative',
        }}
      >
        {pills.map((label, i) => (
          <div
            key={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 0,
            }}
          >
            <span
              className="pill-step"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                color: '#FAFAFA',
                padding: '8px 16px',
                border: '1px solid #1C1C1C',
                borderLeft: '2px solid',
                borderImage: 'linear-gradient(to bottom, #C8962E, rgba(200,150,46,0.2)) 1',
                borderRadius: 6,
                background: '#111111',
                cursor: 'default',
                position: 'relative',
              }}
            >
              {label}
            </span>
            {i < pills.length - 1 && (
              <div
                style={{
                  width: 28,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: 1,
                    background: 'linear-gradient(90deg, #1C1C1C, rgba(200,150,46,0.2), #1C1C1C)',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    color: '#555555',
                    fontSize: 11,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  →
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function Step2() {
  return (
    <div>
      <SectionLabel number={2} title="Define Your Hardware" />
      <BodyText>
        Each project starts with a structured specification. EasyChip guides you
        through 9 fields:
      </BodyText>
      <div
        className="step-content"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          margin: '16px 0 20px',
        }}
      >
        {SPEC_FIELDS.map((field, i) => (
          <div
            key={field}
            className="spec-row"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '8px 12px',
              border: '1px solid #1C1C1C',
              borderLeft: '2px solid transparent',
              borderRadius: 6,
              background: '#111111',
              animation: `stagger-in 0.35s cubic-bezier(.22,1,.36,1) ${0.22 + i * 0.04}s both`,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: '#C8962E',
                minWidth: 18,
                fontWeight: 600,
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ fontSize: 13, color: '#FAFAFA' }}>{field}</span>
          </div>
        ))}
      </div>
      <BodyText className="step-footer">
        Each has preset options for quick starts. Custom text input coming in beta.
      </BodyText>
    </div>
  )
}

function Step3() {
  return (
    <div>
      <SectionLabel number={3} title="Your Project, Instantly" />
      <BodyText>
        Based on your specs, EasyChip generates a complete project folder structure.
      </BodyText>
      <div className="step-content">
        {/* Code block header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            background: '#0E0E0E',
            border: '1px solid #1C1C1C',
            borderBottom: 'none',
            borderRadius: '8px 8px 0 0',
            marginTop: 16,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#C8962E',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: '#555555',
            }}
          >
            project_root
          </span>
        </div>
        {/* Code block body */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            lineHeight: 1.8,
            background: '#0D0D0D',
            borderLeft: '2px solid rgba(200,150,46,0.25)',
            border: '1px solid #1C1C1C',
            borderTop: 'none',
            borderRadius: '0 0 8px 8px',
            padding: '16px 20px',
            marginBottom: 20,
            whiteSpace: 'pre',
            overflowX: 'auto',
          }}
        >
          {FILE_TREE_LINES.map((line, i) => (
            <div key={i}>
              <span
                style={{
                  color: line.type === 'folder' ? '#C8962E' : '#FAFAFA',
                }}
              >
                {line.type === 'file'
                  ? (() => {
                      const dotIdx = line.text.lastIndexOf('.')
                      if (dotIdx === -1) return line.text
                      const name = line.text.slice(0, dotIdx)
                      const ext = line.text.slice(dotIdx)
                      return (
                        <>
                          {name}
                          <span style={{ color: '#555555' }}>{ext}</span>
                        </>
                      )
                    })()
                  : line.text}
              </span>
            </div>
          ))}
        </div>
      </div>
      <BodyText className="step-footer">This part is free. Always.</BodyText>
    </div>
  )
}

function Step4() {
  return (
    <div>
      <SectionLabel number={4} title="AI Generation (Coming Soon)" />
      <BodyText>
        Once our model is live, you&apos;ll type prompts to generate, iterate, and
        verify your hardware.
      </BodyText>
      <div
        className="step-content"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          color: '#FAFAFA',
          background: '#0D0D0D',
          borderLeft: '2px solid rgba(200,150,46,0.25)',
          border: '1px solid #1C1C1C',
          borderRadius: 8,
          padding: '20px 24px',
          margin: '16px 0 20px',
          animation: 'code-pulse 3s ease-in-out infinite',
        }}
      >
        <span style={{ color: '#555555' }}>{'> '}</span>
        Generate a UART transmitter with configurable baud rate
        <span
          style={{
            display: 'inline-block',
            width: 10,
            height: 18,
            background: '#C8962E',
            marginLeft: 3,
            verticalAlign: 'text-bottom',
            borderRadius: 1,
            animation: 'cursor-blink 1s step-end infinite',
          }}
        />
      </div>
      <BodyText className="step-footer">
        You have 50,000 tokens to start. Prompt-based generation is a paid feature.
      </BodyText>
    </div>
  )
}
