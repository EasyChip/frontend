'use client'
import { useEffect, useRef } from 'react'

const PIPELINE_STAGES = [
  { label: 'RTL Generation', status: 'done' },
  { label: 'Formal Verification', status: 'done' },
  { label: 'Self-Improving Loop', status: 'active' },
  { label: 'Cloud API & Playground', status: 'planned' },
]

export default function ModelComingSoon() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') ?? []
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section
      id="ai-model"
      ref={ref}
      style={{
        padding: '120px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60vw',
          height: '40vw',
          background: 'radial-gradient(ellipse, rgba(200,150,46,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '64rem', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Overline */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 16 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              border: '1px solid rgba(200,150,46,0.3)',
              borderRadius: 100,
              padding: '6px 14px',
              fontFamily: 'var(--mono)',
              fontSize: 11,
              color: '#C8962E',
              letterSpacing: '0.08em',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#C8962E',
                display: 'inline-block',
                animation: 'amber-pulse 2s ease-in-out infinite',
              }}
            />
            IN DEVELOPMENT
          </span>
        </div>

        {/* Heading */}
        <h2
          className="reveal"
          style={{
            fontFamily: 'var(--sans)',
            fontWeight: 300,
            fontSize: 'clamp(2.25rem, 5vw, 4.25rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: 'var(--white)',
            textAlign: 'center',
            marginBottom: 20,
            transitionDelay: '0.1s',
          }}
        >
          The AI-Native Model is{' '}
          <span style={{ color: '#C8962E', fontStyle: 'italic' }}>coming soon.</span>
        </h2>

        {/* Description */}
        <p
          className="reveal"
          style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
            color: 'var(--gray)',
            lineHeight: 1.7,
            textAlign: 'center',
            maxWidth: '56ch',
            margin: '0 auto 56px',
            transitionDelay: '0.2s',
          }}
        >
          We&apos;re training a purpose-built model on 31,000+ RTL files with a self-improving
          verification loop. When it ships, you&apos;ll describe hardware in plain English and get
          synthesizable, verified Verilog — no EDA license required.
        </p>

        {/* Pipeline visualization */}
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2,
            marginBottom: 56,
            transitionDelay: '0.3s',
          }}
        >
          {PIPELINE_STAGES.map((stage, i) => (
            <div
              key={stage.label}
              style={{
                padding: '20px 16px',
                background:
                  stage.status === 'active'
                    ? 'rgba(200,150,46,0.08)'
                    : '#111111',
                border: `1px solid ${stage.status === 'active' ? 'rgba(200,150,46,0.3)' : '#1C1C1C'}`,
                borderRadius: i === 0 ? '12px 0 0 12px' : i === PIPELINE_STAGES.length - 1 ? '0 12px 12px 0' : 0,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color:
                    stage.status === 'done'
                      ? '#22C55E'
                      : stage.status === 'active'
                        ? '#C8962E'
                        : '#555555',
                  marginBottom: 8,
                }}
              >
                {stage.status === 'done' ? '✓ Complete' : stage.status === 'active' ? '● Active' : '○ Planned'}
              </div>
              <div
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: 14,
                  fontWeight: 500,
                  color:
                    stage.status === 'planned' ? '#555555' : 'var(--white)',
                }}
              >
                {stage.label}
              </div>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
            marginBottom: 48,
            transitionDelay: '0.4s',
          }}
        >
          {[
            {
              title: 'Self-Improving',
              desc: 'Every generation attempt feeds back into the model — failures become training signal, not wasted cycles.',
            },
            {
              title: 'Verification-First',
              desc: 'Built-in formal verification and simulation. RTL ships only after it passes — no silent failures.',
            },
            {
              title: 'Open & Accessible',
              desc: 'No $50K/year EDA licenses. Open weights, open PDK compatibility. Chip design for everyone.',
            },
          ].map((card) => (
            <div
              key={card.title}
              style={{
                padding: '28px 24px',
                background: '#111111',
                border: '1px solid #1C1C1C',
                borderRadius: 12,
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#2A2A2A' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1C1C1C' }}
            >
              <h3
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#C8962E',
                  letterSpacing: '0.04em',
                  marginBottom: 10,
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: 14,
                  color: 'var(--gray)',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal" style={{ textAlign: 'center', transitionDelay: '0.5s' }}>
          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 13,
              color: '#555555',
              marginBottom: 20,
            }}
          >
            Beta access begins Q3 2026. Join the waitlist to be first in line.
          </p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('ec:openWaitlist'))}
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 11,
              fontWeight: 500,
              background: 'var(--amber)',
              color: '#0A0A0A',
              padding: '0.75rem 1.5rem',
              borderRadius: 2,
              border: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              letterSpacing: '0.08em',
              boxShadow: '0 0 20px var(--amber-glow)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
          >
            Join Waitlist →
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #ai-model { padding: 80px 24px !important; }
          #ai-model [style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          #ai-model [style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
          #ai-model [style*="border-radius: 12px 0 0 12px"],
          #ai-model [style*="border-radius: 0 12px 12px 0"] {
            border-radius: 8px !important;
          }
        }
      `}</style>
    </section>
  )
}
