import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'solid' | 'outline' | 'text'

/**
 * Actions are uppercase mono verbs: BOOK A DEMO, SEE THE PLATFORM.
 *
 * Three variants and no more: solid white pill (primary), hairline outline
 * pill (secondary), mono text link (tertiary). Press deepens colour only -
 * no scale, no bounce.
 */
const VARIANTS: Record<Variant, string> = {
  solid:
    'rounded-full bg-white px-[22px] py-3 text-black hover:bg-gray-3',
  outline:
    'rounded-full border border-[color:var(--hairline)] px-[21px] py-[11px] text-off-white hover:bg-graphite',
  text: 'text-gray-2 underline-offset-4 hover:text-white hover:underline',
}

/**
 * The same three variants on the inverse ground. Not a tint of the dark set -
 * a solid pill has to swap both fill and label or it disappears into #F2F2F2,
 * and the hairline has to become a black alpha for the same reason.
 */
const LIGHT_VARIANTS: Record<Variant, string> = {
  solid:
    'rounded-full bg-black px-[22px] py-3 text-white hover:bg-graphite',
  outline:
    'rounded-full border border-[color:var(--hairline-dark)] px-[21px] py-[11px] text-black hover:bg-black/5',
  text: 'text-black/70 underline-offset-4 hover:text-black hover:underline',
}

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: Variant
  /** Trailing ↗ for an action that leaves the page. */
  arrow?: boolean
  /** Render on the inverse (light) ground. */
  light?: boolean
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'text',
  arrow = false,
  light = false,
  type = 'button',
  disabled,
  className,
}: ButtonProps) {
  const classes = cn(
    'label inline-flex items-center gap-2 whitespace-nowrap transition-colors duration-[120ms] ease-[var(--ease-out)] disabled:opacity-50',
    (light ? LIGHT_VARIANTS : VARIANTS)[variant],
    className
  )

  const content = (
    <>
      {children}
      {arrow && <span aria-hidden>↗</span>}
    </>
  )

  if (href) {
    const external = href.startsWith('http')
    if (external) {
      return (
        <a href={href} target="_blank" rel="noreferrer" className={classes}>
          {content}
        </a>
      )
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  )
}
