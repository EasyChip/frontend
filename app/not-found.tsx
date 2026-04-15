import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', background: '#0A0A0A', display: 'flex',
      alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
      fontFamily: 'var(--font-sans)', color: '#FAFAFA', textAlign: 'center',
      padding: '32px', paddingTop: 80,
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 80, fontWeight: 700,
        color: 'rgba(200,150,46,0.12)', lineHeight: 1,
      }}>404</span>
      <h1 style={{ fontSize: 24, fontWeight: 500, margin: '16px 0 12px' }}>
        Page not found
      </h1>
      <p style={{ fontSize: 14, color: '#555555', margin: '0 0 32px', maxWidth: 400 }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div style={{ display: 'flex', gap: 12 }}>
        <Link href="/" style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500,
          background: '#C8962E', color: '#0A0A0A', padding: '12px 24px',
          borderRadius: 2, textDecoration: 'none', letterSpacing: '0.08em',
        }}>Go Home →</Link>
        <Link href="/tools" style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500,
          background: 'transparent', color: '#888888', padding: '12px 24px',
          borderRadius: 2, border: '1px solid #1C1C1C', textDecoration: 'none',
          letterSpacing: '0.08em',
        }}>Browse Tools</Link>
      </div>
    </div>
  )
}
