'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'

/**
 * The numbered narrative - one flowing editorial sentence carrying the
 * three product motions, words filling from dim to bright as you scroll.
 * Each word is an inline span followed by a plain-text space so the
 * paragraph wraps naturally at every word boundary.
 */

type Token = { text: string; marker?: string }

const SENTENCE: Token[] = [
  { text: 'EasyChip' },
  { text: 'checks', marker: '01' },
  { text: 'your' },
  { text: 'RTL' },
  { text: 'the' },
  { text: 'moment' },
  { text: 'it' },
  { text: 'exists,' },
  { text: 'implements', marker: '02' },
  { text: 'from' },
  { text: 'spec' },
  { text: 'to' },
  { text: 'GDSII' },
  { text: 'in' },
  { text: 'one' },
  { text: 'cockpit,' },
  { text: 'and' },
  { text: 'signs' },
  { text: 'off', marker: '03' },
  { text: 'without' },
  { text: 'your' },
  { text: 'IP' },
  { text: 'ever' },
  { text: 'leaving' },
  { text: 'your' },
  { text: 'infrastructure.' },
]

function Marker({ value }: { value: string }) {
  return (
    <sup className="ml-0.5 font-mono text-[0.32em] font-medium tracking-widest text-brand-cyan">
      {value}
    </sup>
  )
}

function Word({
  token,
  index,
  total,
  progress,
}: {
  token: Token
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const start = (index / total) * 0.85
  const end = start + 0.15
  const opacity = useTransform(progress, [start, end], [0.18, 1])

  return (
    <>
      <motion.span style={{ opacity }} className="inline">
        {token.text}
        {token.marker && <Marker value={token.marker} />}
      </motion.span>{' '}
    </>
  )
}

export default function NarrativeStatement() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.4'],
  })

  return (
    <section ref={ref} className="border-t border-hair">
      <div className="mx-auto max-w-5xl px-6 py-28 md:py-40">
        <p className="editorial text-3xl leading-[1.25] text-ink md:text-5xl md:leading-[1.2]">
          {reduce
            ? SENTENCE.map((t, i) => (
                <span key={`${t.text}-${i}`}>
                  {t.text}
                  {t.marker && <Marker value={t.marker} />}{' '}
                </span>
              ))
            : SENTENCE.map((t, i) => (
                <Word
                  key={`${t.text}-${i}`}
                  token={t}
                  index={i}
                  total={SENTENCE.length}
                  progress={scrollYProgress}
                />
              ))}
        </p>
      </div>
    </section>
  )
}
