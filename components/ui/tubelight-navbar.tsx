"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
  /** Optional section element id to watch for scroll-based active state */
  sectionId?: string
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  onOpenWaitlist?: () => void
}

export function NavBar({ items, className, onOpenWaitlist }: NavBarProps) {
  // Empty string = nothing active (default landing page state)
  const [activeTab, setActiveTab] = useState("")

  useEffect(() => {
    // Collect all items that have a watchable section id
    const watchable = items.filter((item) => item.sectionId)
    if (watchable.length === 0) return

    const observers: IntersectionObserver[] = []

    watchable.forEach((item) => {
      const el = document.getElementById(item.sectionId!)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveTab(item.name)
          }
        },
        {
          // Trigger when the section occupies the top 40% of the viewport
          rootMargin: "-10% 0px -55% 0px",
          threshold: 0,
        },
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [items])

  return (
    <div
      className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-4",
        className,
      )}
    >
      <div
        className="flex items-center gap-1 border border-white/10 backdrop-blur-xl py-1.5 px-2 rounded-full shadow-2xl shadow-black/40"
        style={{ background: "rgba(8,10,12,0.80)" }}
      >
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-sm tracking-tight flex-shrink-0 px-3 py-1.5 rounded-full transition-colors hover:opacity-80"
          style={{ color: "var(--text-primary)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="EasyChip logo" width={22} height={22} style={{ objectFit: 'contain' }} />
          <span className="hidden sm:inline">EasyChip</span>
        </Link>

        {/* Separator */}
        <div className="w-px h-4 flex-shrink-0 mx-1" style={{ background: "rgba(255,255,255,0.1)" }} />

        {/* Tubelight nav items */}
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer font-semibold px-4 py-2 rounded-full transition-colors duration-200 flex-shrink-0",
                "hover:text-white",
                isActive ? "text-white" : "text-white/50",
              )}
              style={{ fontSize: "0.7rem", letterSpacing: "0.06em" }}
            >
              {/* Desktop: text label */}
              <span className="hidden md:inline">{item.name}</span>
              {/* Mobile: icon only */}
              <span className="md:hidden">
                <Icon size={15} strokeWidth={2.5} />
              </span>

              {/* Tubelight glow when active */}
              {isActive && (
                <motion.div
                  layoutId="tubelight-lamp"
                  className="absolute inset-0 w-full rounded-full -z-10"
                  style={{ background: "rgba(212,168,67,0.10)" }}
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                >
                  {/* Top glow bar */}
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-t-full"
                    style={{ background: "var(--accent-amber)" }}
                  >
                    {/* Outer bloom */}
                    <div
                      className="absolute rounded-full blur-md"
                      style={{
                        width: 48,
                        height: 20,
                        background: "rgba(212,168,67,0.30)",
                        top: -6,
                        left: -8,
                      }}
                    />
                    {/* Mid bloom */}
                    <div
                      className="absolute rounded-full blur-sm"
                      style={{
                        width: 32,
                        height: 16,
                        background: "rgba(212,168,67,0.22)",
                        top: -4,
                        left: -2,
                      }}
                    />
                    {/* Core bloom */}
                    <div
                      className="absolute rounded-full blur-[3px]"
                      style={{
                        width: 16,
                        height: 10,
                        background: "rgba(212,168,67,0.40)",
                        top: -2,
                        left: 6,
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}

        {/* Separator */}
        <div className="w-px h-4 flex-shrink-0 mx-1" style={{ background: "rgba(255,255,255,0.1)" }} />

        {/* CTA button */}
        <button
          onClick={onOpenWaitlist}
          className="hidden md:inline-flex items-center justify-center rounded-full cursor-pointer transition-opacity hover:opacity-85 flex-shrink-0 font-mono font-semibold uppercase tracking-widest"
          style={{
            fontSize: "0.58rem",
            padding: "0.45rem 1rem",
            background: "var(--accent-amber)",
            color: "#080a0c",
            letterSpacing: "0.1em",
          }}
        >
          Early Access
        </button>

        {/* Mobile CTA icon */}
        <button
          onClick={onOpenWaitlist}
          className="md:hidden flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
          style={{ background: "var(--accent-amber)" }}
          aria-label="Get Early Access"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M7 3l3 3-3 3" stroke="#080a0c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
