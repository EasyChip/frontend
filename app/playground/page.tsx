'use client'

import { useState } from 'react'
import TopBar from '@/components/playground/TopBar'
import SpecsPanel from '@/components/playground/SpecsPanel'
import FolderTree from '@/components/playground/FolderTree'
import PromptWindow from '@/components/playground/PromptWindow'
import ComingSoonModal from '@/components/playground/ComingSoonModal'
import { usePlaygroundStore } from '@/stores/playground-store'

export default function PlaygroundPage() {
  const { specsPanelOpen, toggleSpecsPanel } = usePlaygroundStore()
  const [mobileTab, setMobileTab] = useState<'specs' | 'editor' | 'prompt'>('editor')

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#0A0A0A' }}>
      <TopBar />

      {/* Mobile banner */}
      <div
        className="block lg:hidden"
        style={{
          padding: '8px 16px',
          background: '#111111',
          borderBottom: '1px solid #1C1C1C',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: '#555555',
          textAlign: 'center',
        }}
      >
        EasyChip Playground is best experienced on desktop.
      </div>

      {/* Mobile tab nav */}
      <div
        className="flex lg:hidden"
        style={{
          borderBottom: '1px solid #1C1C1C',
          background: '#0A0A0A',
        }}
      >
        {(['specs', 'editor', 'prompt'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setMobileTab(tab)}
            style={{
              flex: 1,
              padding: '10px 0',
              background: 'transparent',
              border: 'none',
              borderBottom: mobileTab === tab ? '2px solid #C8962E' : '2px solid transparent',
              color: mobileTab === tab ? '#FAFAFA' : '#555555',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              cursor: 'pointer',
              transition: 'color 200ms ease',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main content area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          overflow: 'hidden',
          minHeight: 0,
        }}
      >
        {/* ---- Desktop layout (>=1280px) ---- */}
        <div className="hidden xl:flex" style={{ width: '100%', height: '100%' }}>
          {/* Specs Panel ~25% */}
          <div style={{ width: '25%', height: '100%', flexShrink: 0 }}>
            <SpecsPanel />
          </div>

          {/* Folder + FilePreview ~40% */}
          <div style={{ width: '40%', height: '100%', overflow: 'hidden' }}>
            <FolderTree />
          </div>

          {/* Prompt Window ~35% */}
          <div style={{ width: '35%', height: '100%' }}>
            <PromptWindow />
          </div>
        </div>

        {/* ---- Tablet layout (768-1279px) ---- */}
        <div className="hidden md:flex xl:hidden" style={{ width: '100%', height: '100%' }}>
          {/* Collapsible specs drawer */}
          {specsPanelOpen && (
            <div
              style={{
                width: 280,
                height: '100%',
                flexShrink: 0,
                position: 'relative',
                zIndex: 10,
              }}
            >
              <SpecsPanel />
            </div>
          )}

          {/* Toggle specs button */}
          <button
            onClick={toggleSpecsPanel}
            style={{
              width: 24,
              height: '100%',
              background: '#111111',
              border: 'none',
              borderRight: '1px solid #1C1C1C',
              color: '#555555',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              flexShrink: 0,
              transition: 'color 200ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FAFAFA')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#555555')}
          >
            {specsPanelOpen ? '◂' : '▸'}
          </button>

          {/* Stacked: Folder + Prompt */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', minWidth: 0 }}>
            <div style={{ height: '50%', overflow: 'hidden', borderBottom: '1px solid #1C1C1C' }}>
              <FolderTree />
            </div>
            <div style={{ height: '50%', overflow: 'hidden' }}>
              <PromptWindow />
            </div>
          </div>
        </div>

        {/* ---- Mobile layout (<768px) ---- */}
        <div className="flex md:hidden" style={{ width: '100%', height: '100%' }}>
          {mobileTab === 'specs' && (
            <div style={{ width: '100%', height: '100%' }}>
              <SpecsPanel />
            </div>
          )}
          {mobileTab === 'editor' && (
            <div style={{ width: '100%', height: '100%' }}>
              <FolderTree />
            </div>
          )}
          {mobileTab === 'prompt' && (
            <div style={{ width: '100%', height: '100%' }}>
              <PromptWindow />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          height: 32,
          background: '#0A0A0A',
          borderTop: '1px solid #1C1C1C',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: '#555555',
          }}
        >
          easychip playground — demo v0.1
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: '#555555',
          }}
        >
          © 2026 BITS Pilani
        </span>
      </footer>

      {/* Modal */}
      <ComingSoonModal />
    </div>
  )
}
