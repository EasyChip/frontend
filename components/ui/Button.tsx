import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 whitespace-nowrap'

const variants: Record<Variant, string> = {
  // DESIGN §6 - solid violet primary, white text, glow + specular sheen on hover. One per view.
  primary:
    'sheen bg-brand-violet text-white hover:shadow-glow-violet-sm hover:brightness-110 active:scale-[0.98] active:brightness-95',
  secondary:
    'border border-line text-ink hover:bg-surface-2 hover:border-ink-3 hover:shadow-[0_0_20px_rgba(0,229,238,0.08)] active:scale-[0.98]',
  ghost:
    'text-brand-cyan hover:underline underline-offset-4',
}

const sizes: Record<Size, string> = {
  md: 'h-10 px-6 text-sm',
  lg: 'h-12 px-8 text-base',
}

interface ButtonProps {
  href: string
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
}

export default function Button({ href, variant = 'primary', size = 'md', className, children }: ButtonProps) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)}>
      {children}
    </Link>
  )
}
