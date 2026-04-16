'use client'

import { useState, useEffect, useCallback } from 'react'
import { QRCodeSVG } from 'qrcode.react'

const TABS = [
  {
    id: 'product',
    label: 'Product',
    url: 'https://easychip.vercel.app',
    caption: 'Scan to open easychip.vercel.app',
  },
  {
    id: 'founders',
    label: 'Founders',
    url: 'https://easychip.vercel.app/connect',
    caption: 'Scan to connect with the founders',
  },
  {
    id: 'signin',
    label: 'Sign In',
    url: 'https://easychip.vercel.app/login',
    caption: 'Scan to sign in to EasyChip',
  },
] as const

type TabId = (typeof TABS)[number]['id']

function isValidTab(hash: string): hash is TabId {
  return TABS.some((t) => t.id === hash)
}

export default function CardTabs() {
  const [activeTab, setActiveTab] = useState<TabId>('product')

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (isValidTab(hash)) {
      setActiveTab(hash)
    }

    const onHashChange = () => {
      const h = window.location.hash.slice(1)
      if (isValidTab(h)) {
        setActiveTab(h)
      } else {
        setActiveTab('product')
      }
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const handleTabChange = useCallback((id: TabId) => {
    setActiveTab(id)
    if (id === 'product') {
      history.replaceState(null, '', window.location.pathname)
    } else {
      window.location.hash = id
    }
  }, [])

  const active = TABS.find((t) => t.id === activeTab)!

  return (
    <>
      {/* Tab bar */}
      <nav className="w-full mb-6" role="tablist">
        <div className="flex">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex-1 pb-3 text-[14px] font-medium font-display border-b-2 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 ${
                activeTab === tab.id
                  ? 'text-white border-mint'
                  : 'text-white/50 border-transparent hover:text-white/70'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Mint label above QR */}
      <span className="text-[10px] font-semibold font-display text-mint uppercase tracking-[0.12em] mb-3">
        {active.label}
      </span>

      {/* QR card */}
      <div
        className="relative rounded-[20px] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
        style={{
          width: 'min(75vw, 75vh, 420px)',
          height: 'min(75vw, 75vh, 420px)',
        }}
        role="tabpanel"
        aria-label={`${active.label} QR code`}
      >
        {TABS.map((tab) => (
          <div
            key={tab.id}
            className={`absolute inset-6 transition-opacity duration-150 ${
              activeTab === tab.id
                ? 'opacity-100'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <QRCodeSVG
              value={tab.url}
              size={420}
              level="M"
              includeMargin={false}
              fgColor="#0F1B2D"
              bgColor="#FFFFFF"
              className="w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* Caption below QR */}
      <div className="text-center mt-4">
        <p className="text-[12px] font-mono text-white/60">
          {active.url.replace('https://', '')}
        </p>
        <p className="text-[14px] font-display text-white/85 mt-1">
          {active.caption}
        </p>
      </div>
    </>
  )
}
