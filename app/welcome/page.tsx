'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

const TOTAL_STEPS = 4

const FILE_TREE = `uart_tx/
├── src/
│   ├── design.v
│   └── design.sv
├── tb/
│   └── test_uart_tx.py
├── syn/
│   └── synth.ys
└── docs/
    └── README.md`

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

export default function WelcomePage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [visible, setVisible] = useState(true)

  const finish = useCallback(() => {
    localStorage.setItem('easychip_onboarded', 'true')
    router.push('/playground')
  }, [router])

  const goTo = useCallback(
    (next: number) => {
      if (next < 0 || next > TOTAL_STEPS - 1) return
      setVisible(false)
      setTimeout(() => {
        setStep(next)
        setVisible(true)
      }, 150)
    },
    []
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

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        color: '#FAFAFA',
        fontFamily: 'var(--font-sans)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Bar: Progress + Skip */}
      <div style={{ padding: '24px 32px 0' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: '#888888',
            }}
          >
            Step {step + 1} of {TOTAL_STEPS}
          </span>
          <button
            onClick={finish}
            style={{
              background: 'none',
              border: 'none',
              color: '#888888',
              fontSize: 13,
              fontFamily: 'var(--font-sans)',
              cursor: 'pointer',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FAFAFA')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#888888')}
          >
            Skip
          </button>
        </div>

        {/* Progress Bar */}
        <div
          style={{
            display: 'flex',
            gap: 4,
            height: 2,
          }}
        >
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                background: i <= step ? '#FAFAFA' : '#222222',
                borderRadius: 1,
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 32px',
          maxWidth: 640,
          margin: '0 auto',
          width: '100%',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
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
        }}
      >
        <button
          onClick={prev}
          disabled={step === 0}
          style={{
            background: 'none',
            border: '1px solid #222222',
            color: step === 0 ? '#333333' : '#FAFAFA',
            padding: '10px 20px',
            borderRadius: 8,
            fontSize: 14,
            fontFamily: 'var(--font-sans)',
            cursor: step === 0 ? 'not-allowed' : 'pointer',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => {
            if (step !== 0) e.currentTarget.style.borderColor = '#333333'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#222222'
          }}
        >
          ← Back
        </button>
        <button
          onClick={next}
          style={{
            background: '#FAFAFA',
            color: '#0A0A0A',
            border: 'none',
            padding: '10px 24px',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500,
            fontFamily: 'var(--font-sans)',
            cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          {step === TOTAL_STEPS - 1 ? 'Enter Playground →' : 'Next →'}
        </button>
      </div>
    </div>
  )
}

/* ─── Steps ───────────────────────────────────────────────────────────── */

function SectionLabel({ number, title }: { number: number; title: string }) {
  return (
    <h1
      style={{
        fontSize: 28,
        fontWeight: 500,
        margin: '0 0 24px',
        fontFamily: 'var(--font-sans)',
        letterSpacing: '-0.02em',
      }}
    >
      <span style={{ color: '#888888' }}>
        {String(number).padStart(2, '0')} —{' '}
      </span>
      {title}
    </h1>
  )
}

function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 15,
        lineHeight: 1.7,
        color: '#888888',
        margin: '0 0 16px',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {children}
    </p>
  )
}

function Step1() {
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
        style={{
          display: 'flex',
          gap: 12,
          marginTop: 24,
          flexWrap: 'wrap',
        }}
      >
        {['Describe', 'Generate', 'Verify', 'Synthesise'].map((label, i) => (
          <div
            key={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                color: '#FAFAFA',
                padding: '6px 14px',
                border: '1px solid #222222',
                borderRadius: 6,
              }}
            >
              {label}
            </span>
            {i < 3 && (
              <span style={{ color: '#333333', fontSize: 14 }}>→</span>
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
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '8px 12px',
              border: '1px solid #222222',
              borderRadius: 6,
              background: '#111111',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: '#888888',
                minWidth: 18,
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ fontSize: 13, color: '#FAFAFA' }}>{field}</span>
          </div>
        ))}
      </div>
      <BodyText>
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
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          lineHeight: 1.8,
          color: '#FAFAFA',
          background: '#111111',
          border: '1px solid #222222',
          borderRadius: 8,
          padding: '20px 24px',
          margin: '16px 0 20px',
          whiteSpace: 'pre',
          overflowX: 'auto',
        }}
      >
        {FILE_TREE}
      </div>
      <BodyText>This part is free. Always.</BodyText>
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
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          color: '#FAFAFA',
          background: '#111111',
          border: '1px solid #222222',
          borderRadius: 8,
          padding: '20px 24px',
          margin: '16px 0 20px',
        }}
      >
        <span style={{ color: '#888888' }}>{'> '}</span>
        Generate a UART transmitter with configurable baud rate
        <span
          style={{
            display: 'inline-block',
            width: 8,
            height: 16,
            background: '#FAFAFA',
            marginLeft: 2,
            verticalAlign: 'text-bottom',
            animation: 'cursor-blink 1s step-end infinite',
          }}
        />
        <style>{`
          @keyframes cursor-blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}</style>
      </div>
      <BodyText>
        You have 50,000 tokens to start. Prompt-based generation is a paid feature.
      </BodyText>
    </div>
  )
}
