import { cn } from '@/lib/utils'

/* The two type registers of the system, and nothing else.
   Statements are Archivo 300. Everything small is uppercase mono. */

type Tone = 'body' | 'secondary' | 'muted' | 'inverse'

/**
 * Text tones.
 *
 * `muted` deliberately resolves to #A3A3A3, not #6E6E6E. Grey-1 measures
 * 3.85:1 on the ground and under 3:1 on a card, which put the whole label
 * column — and the live/built status labels — below the readable floor. It is
 * now reserved for hairlines and rules. Three text levels remain, so the
 * brightness-emphasis system still has range: white for emphasis, off-white
 * for body, #A3A3A3 for anything secondary.
 */
const TONE: Record<Tone, string> = {
  body: 'text-off-white',
  secondary: 'text-gray-2',
  muted: 'text-gray-2',
  inverse: 'text-black',
}

/**
 * Uppercase mono label. The system's only small-text register.
 *
 * This is a *label*, not a kicker: it names a column, a stage, a date or a
 * status — something the reader cannot infer from the heading beside it.
 */
export function Eyebrow({
  children,
  tone = 'body',
  bracket = false,
  dot = false,
  className,
}: {
  children: React.ReactNode
  tone?: Tone
  bracket?: boolean
  dot?: boolean
  className?: string
}) {
  return (
    <span className={cn('label inline-flex items-center gap-2', TONE[tone], className)}>
      {dot && <span aria-hidden className="inline-block h-[5px] w-[5px] bg-current" />}
      {bracket ? <span>[&nbsp;{children}&nbsp;]</span> : children}
    </span>
  )
}

/**
 * Emphasis span. In a system with no accent colour, emphasis is brightness:
 * the surrounding line is dimmed and the phrase that matters lifts to the
 * extreme — white on the dark ground, black on a light section.
 */
export function Accent({
  children,
  inverse = false,
}: {
  children: React.ReactNode
  inverse?: boolean
}) {
  return <span className={inverse ? 'text-black' : 'text-white'}>{children}</span>
}

const LEVEL = {
  1: 'display-1',
  2: 'display-2',
  3: 'display-3',
} as const

/**
 * Light-weight grotesque display statement. Short noun phrases, no period.
 * `dim` drops the whole line to secondary so an <Accent> inside it reads.
 */
export function Headline({
  children,
  level = 2,
  as,
  dim = false,
  inverse = false,
  className,
}: {
  children: React.ReactNode
  level?: 1 | 2 | 3
  as?: 'h1' | 'h2' | 'h3' | 'p'
  dim?: boolean
  inverse?: boolean
  className?: string
}) {
  const Tag = as ?? (level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3')
  return (
    <Tag
      className={cn(
        LEVEL[level],
        inverse ? 'text-black' : dim ? 'text-gray-2' : 'text-off-white',
        className
      )}
    >
      {children}
    </Tag>
  )
}

/** Plain body copy. Engineering-plain, third person for the company. */
export function Body({
  children,
  className,
  tone = 'secondary',
}: {
  children: React.ReactNode
  className?: string
  tone?: Tone
}) {
  return <p className={cn('max-w-[46ch] leading-relaxed', TONE[tone], className)}>{children}</p>
}

/**
 * A definition row: mono term in the label column, plain statement beside it.
 *
 * This is the structure the nine-stage list uses, generalised. It exists so a
 * set of three related facts does not default to three equal cards — the
 * system reads as one instrument when its content sits on shared rules rather
 * than in separate boxes.
 */
export function DefinitionRow({
  term,
  children,
  index,
  light = false,
}: {
  term: string
  children: React.ReactNode
  index?: string
  light?: boolean
}) {
  return (
    <div
      className={cn(
        'grid gap-4 border-t py-7 md:grid-cols-[180px_1fr] md:gap-8',
        light ? 'border-black/12' : 'border-[color:var(--hairline)]'
      )}
    >
      <div className="flex items-baseline gap-3">
        {index && (
          // black/65 on #F2F2F2 measures ~10.3:1. black/50 was 3.58:1 — the
          // inverse branch has to clear the floor too, not just the dark one.
          <span className={cn('label', light ? 'text-black/65' : 'text-gray-2')}>{index}</span>
        )}
      </div>
      <div>
        <h3 className={cn('display-3', light ? 'text-black' : 'text-off-white')}>{term}</h3>
        <p
          className={cn(
            'mt-2 max-w-[62ch] text-xs leading-relaxed',
            light ? 'text-black/70' : 'text-gray-2'
          )}
        >
          {children}
        </p>
      </div>
    </div>
  )
}
