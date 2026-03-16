'use client'

import { useEffect, useState, useRef } from 'react'
import CodeBlock from '@/components/shared/CodeBlock'

const AUTO_PROMPT = 'Design a parameterised 8-bit UART transmitter with configurable baud rate divider, start/stop bits, parity control, and a TX-ready status flag.'

const MOCK_RTL = `module uart_tx #(
    parameter CLK_FREQ  = 50_000_000,
    parameter BAUD_RATE = 115200,
    parameter DATA_BITS = 8,
    parameter PARITY_EN = 1
) (
    input  wire        clk,
    input  wire        rst_n,
    input  wire        tx_start,
    input  wire [7:0]  tx_data,
    input  wire        parity_mode, // 0=even, 1=odd
    output reg         tx,
    output reg         tx_ready
);
    localparam BAUD_DIV = CLK_FREQ / BAUD_RATE;
    localparam IDLE=0, START=1, DATA=2, PARITY=3, STOP=4;

    reg [2:0]  state;
    reg [15:0] baud_cnt;
    reg [3:0]  bit_idx;
    reg [7:0]  shift_reg;
    reg        parity_bit;

    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            state <= IDLE; tx <= 1'b1; tx_ready <= 1'b1;
            baud_cnt <= 0; bit_idx <= 0;
        end else begin
            case (state)
                IDLE: begin
                    tx <= 1'b1; tx_ready <= 1'b1;
                    if (tx_start) begin
                        shift_reg  <= tx_data;
                        parity_bit <= parity_mode ^ ^tx_data;
                        tx_ready   <= 1'b0;
                        baud_cnt   <= 0;
                        state      <= START;
                    end
                end
                START: begin
                    tx <= 1'b0;
                    if (baud_cnt == BAUD_DIV-1) begin
                        baud_cnt <= 0; bit_idx <= 0; state <= DATA;
                    end else baud_cnt <= baud_cnt + 1;
                end
                DATA: begin
                    tx <= shift_reg[0];
                    if (baud_cnt == BAUD_DIV-1) begin
                        baud_cnt  <= 0;
                        shift_reg <= shift_reg >> 1;
                        if (bit_idx == DATA_BITS-1)
                            state <= PARITY_EN ? PARITY : STOP;
                        else bit_idx <= bit_idx + 1;
                    end else baud_cnt <= baud_cnt + 1;
                end
                PARITY: begin
                    tx <= parity_bit;
                    if (baud_cnt == BAUD_DIV-1) begin
                        baud_cnt <= 0; state <= STOP;
                    end else baud_cnt <= baud_cnt + 1;
                end
                STOP: begin
                    tx <= 1'b1;
                    if (baud_cnt == BAUD_DIV-1) begin
                        baud_cnt <= 0; state <= IDLE;
                    end else baud_cnt <= baud_cnt + 1;
                end
            endcase
        end
    end
endmodule`

const STAGES = ['Architect', 'RTL Gen', 'Simulate', 'Debug', 'Formal', 'Synthesize']

type PlayState = 'typing' | 'waiting' | 'pipeline' | 'done'

export default function AutoPlayground() {
  const [typed, setTyped] = useState('')
  const [playState, setPlayState] = useState<PlayState>('typing')
  const [activeStage, setActiveStage] = useState(-1)
  const [showResult, setShowResult] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let i = 0
    // Auto-type the prompt
    const typeNext = () => {
      if (i < AUTO_PROMPT.length) {
        setTyped(AUTO_PROMPT.slice(0, i + 1))
        i++
        timerRef.current = setTimeout(typeNext, 28 + Math.random() * 20)
      } else {
        // Pause before triggering generation
        timerRef.current = setTimeout(() => {
          setPlayState('pipeline')
          runPipeline(0)
        }, 800)
      }
    }

    timerRef.current = setTimeout(typeNext, 600)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const runPipeline = (stage: number) => {
    if (stage >= STAGES.length) {
      timerRef.current = setTimeout(() => {
        setPlayState('done')
        setShowResult(true)
      }, 300)
      return
    }
    setActiveStage(stage)
    timerRef.current = setTimeout(() => runPipeline(stage + 1), 550 + Math.random() * 200)
  }

  const isRunning = playState === 'pipeline'
  const isDone = playState === 'done'

  return (
    <div className="flex flex-col gap-4">
      {/* Prompt box */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-indigo-400" />
          <span className="text-xs text-text-muted font-mono uppercase tracking-wider">Specification</span>
        </div>
        <p className="text-sm text-text-primary font-mono leading-relaxed min-h-[60px]">
          {typed}
          {playState === 'typing' && <span className="cursor-blink text-indigo-400 ml-0.5">█</span>}
        </p>
      </div>

      {/* Pipeline indicator */}
      {playState !== 'typing' && (
        <div className="glass-card rounded-xl px-4 py-3">
          <div className="flex items-center gap-1 overflow-x-auto">
            {STAGES.map((stage, i) => {
              const complete = isDone || i < activeStage
              const active = isRunning && i === activeStage
              return (
                <div key={stage} className="flex items-center gap-1 flex-shrink-0">
                  <div
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                      complete
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : active
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 animate-pulse'
                        : 'bg-white/5 text-text-muted border border-white/5'
                    }`}
                  >
                    {complete && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />}
                    {stage}
                  </div>
                  {i < STAGES.length - 1 && (
                    <div className={`w-3 h-px flex-shrink-0 ${complete ? 'bg-emerald-500/40' : 'bg-white/8'}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Output */}
      {showResult && (
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 bg-bg-card/40 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-text-primary">RTL</span>
              <span className="text-xs text-text-muted">·</span>
              <span className="text-xs text-indigo-400 font-mono">uart_tx</span>
            </div>
            <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="4.5" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.6)" strokeWidth="1"/>
                <path d="M2.5 5l1.5 1.5 3-3" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              PASS · formal verified
            </span>
          </div>
          <div className="max-h-[280px] overflow-auto">
            <CodeBlock
              language="verilog"
              customStyle={{ margin: 0, borderRadius: 0, fontSize: '11px', background: '#020810' }}
              showLineNumbers
            >
              {MOCK_RTL}
            </CodeBlock>
          </div>
        </div>
      )}
    </div>
  )
}
