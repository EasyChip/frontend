'use client'

import BookMeeting from '@/components/booking/BookMeeting'
import Link from 'next/link'
import Image from 'next/image'

export default function BookPage() {
  return (
    <div style={{
      minHeight: '100vh', background: '#0A0A0A', fontFamily: 'var(--font-sans)',
      color: '#FAFAFA', display: 'flex', flexDirection: 'column',
    }}>
      {/* Top bar */}
      <header style={{
        height: 56, borderBottom: '1px solid #1C1C1C', display: 'flex',
        alignItems: 'center', padding: '0 24px', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Image src="/logo.png" alt="EasyChip" width={28} height={28} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 600,
            color: '#C8962E', letterSpacing: '-0.01em',
          }}>EasyChip</span>
        </Link>
        <Link href="/" style={{ fontSize: 13, color: '#555555', textDecoration: 'none' }}>
          ← Back to site
        </Link>
      </header>

      {/* Booking content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32, maxWidth: 520 }}>
          <h1 style={{ fontSize: 28, fontWeight: 600, margin: '0 0 8px' }}>
            Book a Meeting
          </h1>
          <p style={{ fontSize: 14, color: '#888888', margin: 0, lineHeight: 1.6 }}>
            Schedule a 30-minute call with the EasyChip founding team.
            Discuss your use case, see a demo, or explore collaboration.
          </p>
        </div>

        <div style={{
          width: '100%', maxWidth: 700, flex: 1, minHeight: 500,
          borderRadius: 12, overflow: 'hidden',
          border: '1px solid #1C1C1C',
        }}>
          <BookMeeting inline context="General Discussion" />
        </div>

        {/* Fallback */}
        <p style={{ marginTop: 20, fontSize: 12, color: '#555555', textAlign: 'center' }}>
          Can&apos;t see the calendar?{' '}
          <a
            href={process.env.NEXT_PUBLIC_CALCOM_BOOKING_URL || 'https://cal.com/rakshit-mishra-5x7tan'}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#C8962E', textDecoration: 'none' }}
          >
            Open directly on Cal.com →
          </a>
        </p>
      </div>
    </div>
  )
}
