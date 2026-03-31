'use client'
import { useEffect, useState, useRef } from 'react'

const LINES = [
  { text: '$ easychip generate', type: 'cmd', delay: 300 },
  { text: '', type: 'blank', delay: 0 },
  { text: '> Describe your hardware module:', type: 'prompt', delay: 200 },
  { text: '"Design a 4-bit ALU with add, subtract,', type: 'input', delay: 100 },
  { text: ' AND, OR operations and a carry-out flag"', type: 'input', delay: 0 },
  { text: '', type: 'blank', delay: 300 },
  { text: '✓ Parsing specification...', type: 'check', delay: 400 },
  { text: '✓ Generating RTL...', type: 'check', delay: 600 },
  { text: '✓ Running testbench (17/17 passed)', type: 'check', delay: 600 },
  { text: '✓ Synthesis check (Yosys + SKY130)', type: 'check', delay: 600 },
  { text: '', type: 'blank', delay: 300 },
  { text: '// ── Generated Verilog ──────────────────', type: 'comment', delay: 200 },
  { text: 'module alu_4bit (', type: 'code-kw', delay: 100 },
  { text: '  input  [3:0] a, b,', type: 'code', delay: 80 },
  { text: '  input  [1:0] op,', type: 'code', delay: 80 },
  { text: '  output reg [3:0] result,', type: 'code', delay: 80 },
  { text: '  output carry_out', type: 'code', delay: 80 },
  { text: ');', type: 'code', delay: 80 },
  { text: '  always @(*) begin', type: 'code-kw', delay: 100 },
  { text: "    case (op)", type: 'code-kw', delay: 80 },
  { text: "      2'b00: {carry_out, result} = a + b;", type: 'code', delay: 80 },
  { text: "      2'b01: {carry_out, result} = a - b;", type: 'code', delay: 80 },
  { text: "      2'b10: result = a & b;", type: 'code', delay: 80 },
  { text: "      2'b11: result = a | b;", type: 'code', delay: 80 },
  { text: '    endcase', type: 'code-kw', delay: 80 },
  { text: '  end', type: 'code-kw', delay: 80 },
  { text: 'endmodule', type: 'code-kw', delay: 100 },
]

function getColor(type: string) {
  switch (type) {
    case 'cmd': return '#FAFAFA'
    case 'prompt': return '#A1A1AA'
    case 'input': return '#10B981'
    case 'check': return '#10B981'
    case 'comment': return '#A1A1AA'
    case 'code-kw': return '#3B82F6'
    case 'code': return '#FAFAFA'
    default: return '#FAFAFA'
  }
}

export default function Terminal() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    setVisibleLines(0)
    let totalDelay = 0

    const timeouts: ReturnType<typeof setTimeout>[] = []
    LINES.forEach((line, idx) => {
      totalDelay += line.delay + (line.type === 'blank' ? 0 : 60)
      const t = setTimeout(() => setVisibleLines(idx + 1), totalDelay)
      timeouts.push(t)
    })
    return () => timeouts.forEach(clearTimeout)
  }, [started])

  return (
    <div ref={ref} style={{
      background: '#0F0F12',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 10,
      overflow: 'hidden',
      fontFamily: 'var(--mono)',
      fontSize: 12,
      lineHeight: 1.7,
      boxShadow: '0 0 40px rgba(59,130,246,0.1), 0 20px 60px rgba(0,0,0,0.5)',
      maxWidth: '100%',
    }}>
      {/* Title bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '10px 14px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        background: '#1A1A1E',
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444', display: 'block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B', display: 'block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981', display: 'block' }} />
        <span style={{ flex: 1, textAlign: 'center', color: '#A1A1AA', fontSize: 11, marginRight: 28 }}>
          easychip — rtl-gen
        </span>
      </div>

      {/* Terminal body */}
      <div style={{ padding: '16px 20px', minHeight: 380 }}>
        {LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{ color: getColor(line.type), whiteSpace: 'pre' }}>
            {line.text || '\u00A0'}
          </div>
        ))}
        {visibleLines < LINES.length && (
          <span style={{ display: 'inline-block', width: 8, height: 14, background: '#3B82F6', verticalAlign: 'text-bottom', animation: 'blink 1s step-end infinite' }} />
        )}
      </div>
    </div>
  )
}
