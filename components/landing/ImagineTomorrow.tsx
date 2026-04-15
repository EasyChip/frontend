'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { content } from '@/lib/content'
import { useEffect, useState, useRef } from 'react'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

function PipelineDemo() {
  const { imagineTomorrow } = content
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  // phase: 0=idle, 1=typing prompt, 2+=stage index (0-based) being revealed, done=stages.length+2
  const [promptText, setPromptText] = useState('')
  const [typingDone, setTypingDone] = useState(false)
  const [activeStage, setActiveStage] = useState(-1) // -1=not started
  const [stageLinesVisible, setStageLinesVisible] = useState<number[]>([])
  const [showStatus, setShowStatus] = useState(false)
  const totalStages = imagineTomorrow.stages.length

  useEffect(() => {
    if (!isInView) return

    if (prefersReduced) {
      setPromptText(imagineTomorrow.prompt)
      setTypingDone(true)
      setActiveStage(totalStages - 1)
      setStageLinesVisible(imagineTomorrow.stages.map(s => s.lines.length))
      setShowStatus(true)
      return
    }

    // Step 1: type prompt
    let cancelled = false
    const startDelay = setTimeout(() => {
      let i = 0
      const typeTimer = setInterval(() => {
        if (cancelled) { clearInterval(typeTimer); return }
        i++
        setPromptText(imagineTomorrow.prompt.slice(0, i))
        if (i >= imagineTomorrow.prompt.length) {
          clearInterval(typeTimer)
          setTypingDone(true)
          // Step 2: reveal stages one by one
          setTimeout(() => revealStages(0), 500)
        }
      }, 22)
    }, 600)

    function revealStages(stageIdx: number) {
      if (cancelled || stageIdx >= totalStages) {
        // All stages done → show status
        setTimeout(() => { if (!cancelled) setShowStatus(true) }, 400)
        return
      }

      setActiveStage(stageIdx)
      const lines = imagineTomorrow.stages[stageIdx].lines
      let lineIdx = 0
      const lineTimer = setInterval(() => {
        if (cancelled) { clearInterval(lineTimer); return }
        lineIdx++
        setStageLinesVisible(prev => {
          const next = [...prev]
          next[stageIdx] = lineIdx
          return next
        })
        if (lineIdx >= lines.length) {
          clearInterval(lineTimer)
          setTimeout(() => revealStages(stageIdx + 1), 350)
        }
      }, 90)
    }

    // Init stageLinesVisible
    setStageLinesVisible(new Array(totalStages).fill(0))

    return () => {
      cancelled = true
      clearTimeout(startDelay)
    }
  }, [isInView, prefersReduced, imagineTomorrow, totalStages])

  const stageIcons = ['◇', '⬡', '△', '✓']
  const stageColors = ['var(--amber)', 'var(--amber)', 'var(--amber)', '#4ade80']

  return (
    <div ref={ref} style={{ maxWidth: 720, margin: '0 auto' }}>
      {/* Terminal window */}
      <div
        style={{
          background: '#0D0D0D',
          border: '1px solid var(--border)',
          borderRadius: 12,
          overflow: 'hidden',
          fontFamily: 'var(--mono)',
          fontSize: '0.8rem',
          lineHeight: 1.7,
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '12px 16px',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#333' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#333' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#333' }} />
          <span style={{ marginLeft: 12, color: 'var(--gray)', fontSize: '0.7rem' }}>easychip — intent-to-silicon</span>
        </div>

        {/* Terminal body */}
        <div style={{ padding: '20px 16px' }}>
          {/* Prompt input */}
          <div style={{ marginBottom: 20 }}>
            <span style={{ color: '#666', fontSize: '0.7rem', marginBottom: 4, display: 'block' }}>DESCRIBE YOUR CHIP</span>
            <span style={{ color: 'var(--amber)' }}>→ </span>
            <span style={{ color: 'var(--white)' }}>{promptText}</span>
            {!typingDone && <span className="animate-blink" style={{ color: 'var(--amber)' }}>▌</span>}
          </div>

          {/* Pipeline stages */}
          {typingDone && (
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
              {imagineTomorrow.stages.map((stage, idx) => {
                const isActive = idx <= activeStage
                const linesShown = stageLinesVisible[idx] || 0
                const isDone = linesShown >= stage.lines.length

                if (!isActive) return null

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease }}
                    style={{ marginBottom: 20 }}
                  >
                    {/* Stage header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span style={{
                        color: isDone ? stageColors[idx] : 'var(--gray)',
                        fontSize: '0.85rem',
                        transition: 'color 0.3s',
                      }}>
                        {isDone ? stageIcons[idx] : '○'}
                      </span>
                      <span style={{
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: isDone ? 'var(--white)' : 'var(--gray)',
                        fontWeight: 500,
                        transition: 'color 0.3s',
                      }}>
                        {stage.label}
                      </span>
                      {!isDone && idx === activeStage && (
                        <span className="animate-blink" style={{ color: 'var(--amber)', fontSize: '0.6rem' }}>●</span>
                      )}
                    </div>

                    {/* Stage output lines */}
                    <div style={{ paddingLeft: 24 }}>
                      {stage.lines.slice(0, linesShown).map((line, li) => (
                        <div
                          key={li}
                          style={{
                            color: idx === 1 ? 'var(--amber)' : '#888',
                            opacity: idx === 1 ? 0.85 : 0.7,
                            fontSize: idx === 1 ? '0.78rem' : '0.75rem',
                            fontFamily: 'var(--mono)',
                            whiteSpace: 'pre',
                          }}
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* Final status */}
          {showStatus && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                borderTop: '1px solid var(--border)',
                paddingTop: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ color: '#4ade80', fontSize: '0.85rem' }}>✓</span>
              <span style={{ color: '#4ade80', fontSize: '0.75rem' }}>
                {imagineTomorrow.statusLine}
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ImagineTomorrow() {
  const { imagineTomorrow } = content
  const prefersReduced = useReducedMotion()
  const shouldAnimate = !prefersReduced

  return (
    <section
      style={{
        padding: '120px 24px',
        maxWidth: 800,
        margin: '0 auto',
      }}
    >
      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease }}
        style={{ textAlign: 'center', marginBottom: 24 }}
      >
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.75rem',
            color: 'var(--amber)',
            letterSpacing: '0.1em',
          }}
        >
          {imagineTomorrow.marker}
        </span>
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.75rem',
            color: 'var(--gray)',
            letterSpacing: '0.1em',
            marginLeft: 12,
            textTransform: 'uppercase',
          }}
        >
          {imagineTomorrow.label}
        </span>
      </motion.div>

      <motion.h2
        initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        style={{
          fontFamily: 'var(--display, var(--sans))',
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          fontWeight: 200,
          color: 'var(--white)',
          textAlign: 'center',
          marginBottom: 56,
          letterSpacing: '-0.02em',
        }}
      >
        {imagineTomorrow.description}
      </motion.h2>

      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: 30 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.2, ease }}
      >
        <PipelineDemo />
      </motion.div>

      <motion.p
        initial={shouldAnimate ? { opacity: 0 } : false}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: 0.4, ease }}
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.8rem',
          color: 'var(--gray)',
          textAlign: 'center',
          marginTop: 32,
          fontStyle: 'italic',
        }}
      >
        {imagineTomorrow.note}
      </motion.p>
    </section>
  )
}
