'use client'

import { useState, useCallback } from 'react'
import { SPEC_CATEGORIES } from '@/lib/specs/spec-options'
import { generateFolderStructure } from '@/lib/specs/folder-generator'
import { usePlaygroundStore } from '@/stores/playground-store'
import { createClient } from '@/lib/supabase/client'

export default function SpecsPanel() {
  const { specs, setSpec, setFolderTree, profile, projectName } = usePlaygroundStore()
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    architecture: true,
  })
  const [generating, setGenerating] = useState(false)

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const canGenerate = !!specs.architecture

  const handleGenerate = useCallback(async () => {
    if (!canGenerate || generating) return
    setGenerating(true)

    try {
      const tree = generateFolderStructure(specs)
      setFolderTree(tree)

      // Save to Supabase
      if (profile?.id) {
        const supabase = createClient()
        await supabase.from('projects').upsert({
          user_id: profile.id,
          project_name: projectName,
          specs,
          folder_structure: tree,
          updated_at: new Date().toISOString(),
        })
      }
    } catch (err) {
      console.error('Generation failed:', err)
    } finally {
      setGenerating(false)
    }
  }, [canGenerate, generating, specs, setFolderTree, profile, projectName])

  return (
    <div
      style={{
        background: '#0A0A0A',
        borderRight: '1px solid #222222',
        overflowY: 'auto',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Header */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: '#555555',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: 20,
        }}
      >
        01 — Specification
      </div>

      {/* Sections */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {SPEC_CATEGORIES.map((cat) => {
          const isOpen = !!openSections[cat.id]
          const isSelected = !!specs[cat.id]

          return (
            <div key={cat.id} style={{ marginBottom: 2 }}>
              {/* Section header */}
              <button
                onClick={() => toggleSection(cat.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 0',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'color 200ms ease',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    color: '#555555',
                    width: 18,
                    flexShrink: 0,
                  }}
                >
                  {cat.number}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 13,
                    color: isSelected ? '#FAFAFA' : '#888888',
                    flex: 1,
                    transition: 'color 200ms ease',
                  }}
                >
                  {cat.title}
                </span>
                {isSelected && (
                  <span style={{ color: '#22C55E', fontSize: 12, flexShrink: 0 }}>✓</span>
                )}
                <span
                  style={{
                    color: '#555555',
                    fontSize: 10,
                    flexShrink: 0,
                    transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 200ms ease',
                  }}
                >
                  ▸
                </span>
              </button>

              {/* Dropdown */}
              {isOpen && (
                <div style={{ paddingLeft: 26, paddingBottom: 8 }}>
                  <select
                    value={specs[cat.id] || ''}
                    onChange={(e) => setSpec(cat.id, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      background: '#111111',
                      border: '1px solid #222222',
                      borderRadius: 8,
                      color: specs[cat.id] ? '#FAFAFA' : '#555555',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 12,
                      outline: 'none',
                      cursor: 'pointer',
                      transition: 'border-color 200ms ease',
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23555555' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 10px center',
                      paddingRight: 28,
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#333333')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#222222')}
                  >
                    <option value="" disabled>
                      Select {cat.title.toLowerCase()}...
                    </option>
                    {cat.options.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Footer note */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: '#555555',
          marginTop: 16,
          marginBottom: 12,
          lineHeight: 1.5,
        }}
      >
        Custom text specs — coming in beta.
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={!canGenerate || generating}
        style={{
          width: '100%',
          padding: '12px 0',
          background: canGenerate ? '#FAFAFA' : '#1A1A1A',
          color: canGenerate ? '#0A0A0A' : '#555555',
          border: canGenerate ? 'none' : '1px solid #222222',
          borderRadius: 8,
          fontSize: 13,
          fontFamily: 'var(--font-sans)',
          fontWeight: 600,
          cursor: canGenerate ? 'pointer' : 'not-allowed',
          transition: 'opacity 200ms ease',
          opacity: generating ? 0.7 : 1,
        }}
        onMouseEnter={(e) => {
          if (canGenerate) e.currentTarget.style.opacity = '0.9'
        }}
        onMouseLeave={(e) => {
          if (canGenerate) e.currentTarget.style.opacity = generating ? '0.7' : '1'
        }}
      >
        {generating ? 'Generating...' : 'Generate Project →'}
      </button>
    </div>
  )
}
