'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePlaygroundStore } from '@/stores/playground-store'
import { createClient } from '@/lib/supabase/client'

export default function TopBar() {
  const router = useRouter()
  const { profile, projectName, setProjectName } = usePlaygroundStore()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(projectName)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSave = () => {
    const trimmed = draft.trim()
    if (trimmed) setProjectName(trimmed)
    else setDraft(projectName)
    setEditing(false)
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  const initials = profile?.full_name
    ? profile.full_name.charAt(0).toUpperCase()
    : '?'

  return (
    <header
      style={{
        height: 48,
        background: '#0A0A0A',
        borderBottom: '1px solid #222222',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        position: 'relative',
        zIndex: 50,
      }}
    >
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="/logo.png" height={24} alt="EasyChip" style={{ height: 24 }} />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            color: '#888888',
            letterSpacing: '0.02em',
          }}
        >
          Playground
        </span>
      </div>

      {/* Center — project name */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {editing ? (
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave()
              if (e.key === 'Escape') {
                setDraft(projectName)
                setEditing(false)
              }
            }}
            onBlur={handleSave}
            style={{
              background: '#111111',
              border: '1px solid #333333',
              borderRadius: 8,
              padding: '4px 12px',
              color: '#FAFAFA',
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              outline: 'none',
              textAlign: 'center',
              minWidth: 180,
            }}
          />
        ) : (
          <button
            onClick={() => {
              setDraft(projectName)
              setEditing(true)
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FAFAFA',
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              cursor: 'pointer',
              padding: '4px 12px',
              borderRadius: 8,
              transition: 'background 200ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#1A1A1A')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            {projectName}
          </button>
        )}
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Settings gear */}
        <Link
          href="/playground/settings"
          style={{
            color: '#888888',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 32,
            height: 32,
            borderRadius: 8,
            transition: 'color 200ms ease, background 200ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#FAFAFA'
            e.currentTarget.style.background = '#1A1A1A'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#888888'
            e.currentTarget.style.background = 'transparent'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.32 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </Link>

        {/* User avatar + dropdown */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: '#FAFAFA',
              color: '#0A0A0A',
              border: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 200ms ease',
            }}
          >
            {initials}
          </button>

          {dropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: 40,
                right: 0,
                width: 240,
                background: '#111111',
                border: '1px solid #222222',
                borderRadius: 8,
                padding: '8px 0',
                zIndex: 100,
              }}
            >
              {/* Profile info */}
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #222222' }}>
                <div style={{ color: '#FAFAFA', fontSize: 13, fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
                  {profile?.full_name || 'User'}
                </div>
                <div style={{ color: '#555555', fontSize: 11, fontFamily: 'var(--font-mono)', marginTop: 2 }}>
                  {profile?.email || '—'}
                </div>
                {profile?.position && (
                  <span
                    style={{
                      display: 'inline-block',
                      marginTop: 8,
                      padding: '2px 8px',
                      borderRadius: 8,
                      border: '1px solid #222222',
                      color: '#888888',
                      fontSize: 10,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {profile.position}
                  </span>
                )}
              </div>

              {/* Actions */}
              <Link
                href="/playground/settings"
                onClick={() => setDropdownOpen(false)}
                style={{
                  display: 'block',
                  padding: '10px 16px',
                  color: '#888888',
                  fontSize: 13,
                  fontFamily: 'var(--font-sans)',
                  textDecoration: 'none',
                  transition: 'background 200ms ease, color 200ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1A1A1A'
                  e.currentTarget.style.color = '#FAFAFA'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#888888'
                }}
              >
                Account Settings
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px 16px',
                  background: 'transparent',
                  border: 'none',
                  color: '#888888',
                  fontSize: 13,
                  fontFamily: 'var(--font-sans)',
                  cursor: 'pointer',
                  transition: 'background 200ms ease, color 200ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1A1A1A'
                  e.currentTarget.style.color = '#FAFAFA'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#888888'
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
