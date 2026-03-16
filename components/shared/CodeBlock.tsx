'use client'

import dynamic from 'next/dynamic'
import type { CSSProperties, ReactNode } from 'react'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const SyntaxHighlighter = dynamic(
  () => import('react-syntax-highlighter').then((mod) => mod.Prism),
  { ssr: false }
)

interface Props {
  language: string
  children: string
  showLineNumbers?: boolean
  customStyle?: CSSProperties
  className?: string
  fallback?: ReactNode
}

export default function CodeBlock({
  language,
  children,
  showLineNumbers = false,
  customStyle,
  className,
  fallback,
}: Props) {
  return (
    <div className={className}>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={customStyle}
        showLineNumbers={showLineNumbers}
      >
        {children}
      </SyntaxHighlighter>
      {fallback}
    </div>
  )
}
