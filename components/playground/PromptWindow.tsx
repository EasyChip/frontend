'use client'

import { useState } from 'react'
import { usePlaygroundStore } from '@/stores/playground-store'
import TokenBadge from './TokenBadge'

export default function PromptWindow() {
  const { profile, setComingSoonModalOpen } = usePlaygroundStore()
  const [input, setInput] = useState('')
  const tokens = profile?.tokens_remaining ?? 0

  const handleSubmit = () => {
    setComingSoonModalOpen(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#0A0A0A',
        borderLeft: '1px solid #1C1C1C',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid #1C1C1C',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: '#888888',
          }}
        >
          easychip — rtl-gen
        </span>
        <TokenBadge count={tokens} />
      </div>

      {/* Message area — empty state */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 24px',
          overflowY: 'auto',
        }}
      >
        <div style={{ maxWidth: 320, textAlign: 'center' }}>
          <p
            style={{
              color: '#FAFAFA',
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              fontWeight: 500,
              marginBottom: 16,
            }}
          >
            Welcome to EasyChip RTL Gen.
          </p>
          <p
            style={{
              color: '#555555',
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              lineHeight: 1.7,
              marginBottom: 24,
            }}
          >
            Describe changes to your hardware
            <br />
            design and the AI will generate
            <br />
            verified Verilog.
          </p>

          <div
            style={{
              textAlign: 'left',
              display: 'inline-block',
            }}
          >
            {[
              'Add parity bit support',
              'Generate the full FSM',
              'Write a testbench for edge X',
            ].map((suggestion) => (
              <div
                key={suggestion}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  color: '#888888',
                  padding: '4px 0',
                  cursor: 'pointer',
                  transition: 'color 200ms ease',
                }}
                onClick={() => {
                  setInput(suggestion)
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FAFAFA')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#888888')}
              >
                ▸ &quot;{suggestion}&quot;
              </div>
            ))}
          </div>

          <p
            style={{
              color: '#555555',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              marginTop: 24,
            }}
          >
            Model launching Q3 2026.
          </p>
        </div>
      </div>

      {/* Input area */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: '1px solid #1C1C1C',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 8,
            background: '#111111',
            border: '1px solid #1C1C1C',
            borderRadius: 8,
            padding: '10px 12px',
            transition: 'border-color 200ms ease',
          }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your hardware change... ▋"
            rows={1}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#FAFAFA',
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              resize: 'none',
              lineHeight: 1.5,
              maxHeight: 120,
            }}
            onFocus={(e) => {
              const parent = e.currentTarget.parentElement
              if (parent) parent.style.borderColor = '#C8962E'
            }}
            onBlur={(e) => {
              const parent = e.currentTarget.parentElement
              if (parent) parent.style.borderColor = '#1C1C1C'
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: '#C8962E',
              color: '#0A0A0A',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: 14,
              fontWeight: 700,
              transition: 'opacity 200ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}
