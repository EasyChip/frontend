'use client'

import { useState, useCallback, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PromptInput from '@/components/playground/PromptInput'
import OutputPanel from '@/components/playground/OutputPanel'
import StatusBadge from '@/components/playground/StatusBadge'
import PipelineIndicator from '@/components/playground/PipelineIndicator'
import { generateRTL } from '@/lib/api'
import type { GenerateResponse } from '@/lib/types'

export default function PlaygroundPage() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GenerateResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [unlocked, setUnlocked] = useState(false)

  // Check if user has already unlocked on a previous visit
  useEffect(() => {
    const isUnlocked = localStorage.getItem('ec_unlocked') === 'true'
    setUnlocked(isUnlocked)
  }, [])

  const handleUnlock = () => setUnlocked(true)

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) return
    setLoading(true)
    setError(null)
    try {
      const data = await generateRTL({ prompt })
      setResult(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [prompt])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        handleGenerate()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleGenerate])

  const pipelineStatus = loading
    ? 'loading'
    : error
    ? 'fail'
    : result
    ? result.test_result === 'PASS'
      ? 'pass'
      : 'fail'
    : 'idle'

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold mb-1.5">
            <span className="gradient-text">RTL Playground</span>
          </h1>
          <p className="text-text-secondary text-sm">
            Prompt a hardware module. Get formally verified Verilog back.
          </p>
        </div>

        {/* Pipeline indicator */}
        <div className="mb-6">
          <PipelineIndicator status={pipelineStatus} activeStage={loading ? 1 : pipelineStatus === 'pass' ? 5 : 0} />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6">
          {/* Left: input */}
          <div className="space-y-4">
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              onGenerate={handleGenerate}
              loading={loading}
            />

            {/* Metadata panel when result exists */}
            {result && !loading && (
              <div className="glass-card rounded-xl p-4 space-y-2.5 text-xs font-mono">
                <p className="text-text-muted uppercase tracking-wider text-[10px] font-semibold">Generation metadata</p>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Status</span>
                  <StatusBadge
                    status={error ? 'error' : result.test_result === 'PASS' ? 'pass' : 'fail'}
                    attempts={result.attempts}
                  />
                </div>
                {result.attempts !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Attempts</span>
                    <span className="text-text-primary">{result.attempts}</span>
                  </div>
                )}
                {result.test_result && (
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Formal result</span>
                    <span className={result.test_result === 'PASS' ? 'text-emerald-400' : 'text-red-400'}>
                      {result.test_result}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: output */}
          <div>
            <OutputPanel
              result={result}
              loading={loading}
              error={error}
              unlocked={unlocked}
              onUnlock={handleUnlock}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
