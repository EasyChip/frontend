export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #1C1C1C',
      padding: '40px 48px',
      position: 'relative', zIndex: 1,
    }}>
      <div style={{
        maxWidth: '80rem', margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--gray)' }}>
            &copy; 2026 EasyChip
          </span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'rgba(161,161,170,0.4)' }}>&middot;</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--gray)' }}>
            Built in India 🇮🇳
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <a href="https://linkedin.com/company/easychip" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--gray)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#C8962E' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--gray)' }}
          >
            LinkedIn
          </a>
          <a href="https://github.com/EasyChip" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--gray)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#C8962E' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--gray)' }}
          >
            GitHub
          </a>
          <a href="mailto:f20220056@goa.bits-pilani.ac.in"
            style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--gray)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#C8962E' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--gray)' }}
          >
            f20220056@goa.bits-pilani.ac.in
          </a>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { footer { padding: 32px 24px !important; } }`}</style>
    </footer>
  )
}
