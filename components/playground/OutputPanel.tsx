'use client'

import { useState } from 'react'
import type { GenerateResponse } from '@/lib/types'
import CodeBlock from '@/components/shared/CodeBlock'
import EmailGate from './EmailGate'

type Tab = 'rtl' | 'testbench' | 'logs'

interface Props {
  result: GenerateResponse | null
  loading: boolean
  error: string | null
  unlocked: boolean
  onUnlock: () => void
}

export default function OutputPanel({ result, loading, error, unlocked, onUnlock }: Props) {
  const [tab, setTab] = useState<Tab>('rtl')
  const [copied, setCopied] = useState(false)

  const content = result
    ? tab === 'rtl'
      ? result.rtl
      : tab === 'testbench'
      ? result.testbench
      : [result.compile_log, result.simulation_log].filter(Boolean).join('\n\n')
    : ''

  const lineCount = content ? content.split('\n').length : 0

  const handleCopy = () => {
    if (!content) return
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    if (!content) return
    const ext = tab === 'logs' ? 'txt' : 'sv'
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `output.${ext}`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="glass-card rounded-xl overflow-hidden">
        {/* Skeleton tab bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <div className="w-16 h-4 bg-white/5 rounded animate-pulse" />
          <div className="w-20 h-4 bg-white/5 rounded animate-pulse" />
          <div className="w-12 h-4 bg-white/5 rounded animate-pulse" />
        </div>
        {/* Skeleton content with pulsing glow */}
        <div className="p-6 space-y-3 min-h-[400px]">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-5 h-5 rounded-full border-2 border-indigo-500/40 border-t-indigo-400 animate-spin"
            />
            <span className="text-sm text-text-secondary animate-pulse">Generating RTL…</span>
          </div>
          {[100, 75, 88, 60, 92, 70, 55].map((w, i) => (
            <div
              key={i}
              className="h-3 bg-white/5 rounded animate-pulse"
              style={{ width: `${w}%`, animationDelay: `${i * 0.1}s` }}
            />
          ))}
          <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
            {[40, 65, 50].map((w, i) => (
              <div
                key={i}
                className="h-3 bg-indigo-500/10 rounded animate-pulse"
                style={{ width: `${w}%`, animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="glass-card border border-red-500/20 rounded-xl p-6 min-h-[200px]">
        <div className="flex items-start gap-3">
          <svg className="flex-shrink-0 text-red-400 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" fill="rgba(239,68,68,0.12)" stroke="rgba(239,68,68,0.5)" strokeWidth="1"/>
            <path d="M8 4v4M8 10.5v.5" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <p className="text-sm text-red-400 font-mono leading-relaxed">{error}</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div
        className="rounded-xl min-h-[400px] flex flex-col items-center justify-center gap-4"
        style={{
          background: 'repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(255,255,255,0.015) 8px, rgba(255,255,255,0.015) 9px)',
          border: '1px dashed rgba(255,255,255,0.1)',
        }}
      >
        <svg className="text-text-muted" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="5" y="5" width="30" height="30" rx="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3"/>
          <path d="M14 20h12M20 14v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <div className="text-center">
          <p className="text-sm font-medium text-text-secondary">Generated RTL will appear here</p>
          <p className="text-xs text-text-muted mt-1">Enter a spec and click Generate</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative glass-card rounded-xl overflow-hidden">
      {/* Email gate overlay — shown when result exists but user hasn't unlocked */}
      {!unlocked && <EmailGate onUnlock={onUnlock} />}

      {/* Tab bar */}
      <div className={`flex items-center justify-between border-b border-white/5 bg-bg-card/40 px-1 ${!unlocked ? 'blur-sm pointer-events-none select-none' : ''}`}>
        <div className="flex">
          {(['rtl', 'testbench', 'logs'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative px-4 py-2.5 text-xs font-medium capitalize transition-colors ${
                tab === t ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              {t === 'rtl' ? 'RTL' : t === 'testbench' ? 'Testbench' : 'Logs'}
              {tab === t && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full"
                  style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}
                />
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 mr-2">
          <button
            onClick={handleDownload}
            className="text-xs text-text-muted hover:text-text-primary px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-1"
            title="Download"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v7M3 5.5l3 3 3-3M1 10h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={handleCopy}
            className="text-xs text-text-muted hover:text-text-primary px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Metadata row */}
      <div className={`flex items-center gap-4 px-4 py-2 border-b border-white/5 bg-bg-card/20 text-xs text-text-muted font-mono ${!unlocked ? 'blur-sm pointer-events-none select-none' : ''}`}>
        {result.rtl && (
          <span className="text-indigo-400">
            {result.rtl.match(/module\s+(\w+)/)?.[1] ?? 'module'}
          </span>
        )}
        <span>{lineCount} lines</span>
        {result.test_result && (
          <span className={result.test_result === 'PASS' ? 'text-emerald-400' : 'text-red-400'}>
            {result.test_result}
          </span>
        )}
      </div>

      {/* Code */}
      <div className={`max-h-[600px] overflow-auto ${!unlocked ? 'blur-sm pointer-events-none select-none' : ''}`}>
        <CodeBlock
          language={tab === 'logs' ? 'text' : 'verilog'}
          customStyle={{ margin: 0, borderRadius: 0, fontSize: '12px', background: '#020810' }}
          showLineNumbers={tab !== 'logs'}
        >
          {content || '// No content'}
        </CodeBlock>
      </div>
    </div>
  )
}
