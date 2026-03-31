'use client'

interface TokenBadgeProps {
  count: number
}

export default function TokenBadge({ count }: TokenBadgeProps) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color: '#888888',
        letterSpacing: '0.02em',
      }}
    >
      ⬡ {count.toLocaleString()} tokens
    </span>
  )
}
