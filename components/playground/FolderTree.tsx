'use client'

import { useState, useCallback } from 'react'
import { usePlaygroundStore } from '@/stores/playground-store'

interface FileNode {
  name: string
  type: 'file' | 'folder'
  tag?: string
  content?: string
  children?: FileNode[]
}

const TAG_COLORS: Record<string, string> = {
  RTL: '#22C55E',
  TB: '#EAB308',
  SYN: '#3B82F6',
  DOC: '#FAFAFA',
  PKG: '#A855F7',
  MEM: '#F97316',
}

function getFilePath(node: FileNode, parentPath: string): string {
  return parentPath ? `${parentPath}/${node.name}` : node.name
}

function TreeNode({
  node,
  depth,
  parentPath,
  expandedPaths,
  toggleExpand,
  selectedFile,
  onSelectFile,
}: {
  node: FileNode
  depth: number
  parentPath: string
  expandedPaths: Set<string>
  toggleExpand: (path: string) => void
  selectedFile: string | null
  onSelectFile: (path: string, node: FileNode) => void
}) {
  const path = getFilePath(node, parentPath)
  const isFolder = node.type === 'folder'
  const isExpanded = expandedPaths.has(path)
  const isSelected = selectedFile === path

  return (
    <div>
      <div
        onClick={() => {
          if (isFolder) {
            toggleExpand(path)
          } else {
            onSelectFile(path, node)
          }
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 8px',
          paddingLeft: depth * 16 + 8,
          cursor: 'pointer',
          background: isSelected ? '#1A1A1A' : 'transparent',
          borderLeft: isSelected ? '2px solid #FAFAFA' : '2px solid transparent',
          transition: 'background 200ms ease',
          userSelect: 'none',
        }}
        onMouseEnter={(e) => {
          if (!isSelected) e.currentTarget.style.background = '#111111'
        }}
        onMouseLeave={(e) => {
          if (!isSelected) e.currentTarget.style.background = 'transparent'
        }}
      >
        {isFolder ? (
          <span style={{ color: '#555555', fontSize: 10, width: 12, flexShrink: 0, fontFamily: 'var(--font-mono)' }}>
            {isExpanded ? '▾' : '▸'}
          </span>
        ) : (
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: TAG_COLORS[node.tag || ''] || '#555555',
              flexShrink: 0,
              marginLeft: 2,
              marginRight: 1,
            }}
          />
        )}
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: isFolder ? '#888888' : '#FAFAFA',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {node.name}
        </span>
      </div>

      {isFolder && isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.name}
              node={child}
              depth={depth + 1}
              parentPath={path}
              expandedPaths={expandedPaths}
              toggleExpand={toggleExpand}
              selectedFile={selectedFile}
              onSelectFile={onSelectFile}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function FolderTree() {
  const { folderTree, selectedFile, setSelectedFile } = usePlaygroundStore()
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set(['project_root']))
  const [previewNode, setPreviewNode] = useState<FileNode | null>(null)

  const toggleExpand = useCallback((path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev)
      if (next.has(path)) next.delete(path)
      else next.add(path)
      return next
    })
  }, [])

  const handleSelectFile = useCallback(
    (path: string, node: FileNode) => {
      setSelectedFile(path)
      setPreviewNode(node)
    },
    [setSelectedFile]
  )

  // Empty state
  if (!folderTree) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
        }}
      >
        <p
          style={{
            color: '#555555',
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            textAlign: 'center',
            lineHeight: 1.7,
          }}
        >
          Generate a project to see the file
          <br />
          structure here.
          <span style={{ animation: 'typing-cursor 1s step-end infinite' }}> ▋</span>
        </p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Tree panel */}
      <div
        style={{
          width: '35%',
          borderRight: '1px solid #222222',
          overflowY: 'auto',
          paddingTop: 8,
          paddingBottom: 8,
        }}
      >
        <TreeNode
          node={folderTree}
          depth={0}
          parentPath=""
          expandedPaths={expandedPaths}
          toggleExpand={toggleExpand}
          selectedFile={selectedFile}
          onSelectFile={handleSelectFile}
        />
      </div>

      {/* Preview panel */}
      <div style={{ width: '65%', overflow: 'hidden' }}>
        <FilePreviewInline node={previewNode} filePath={selectedFile} />
      </div>
    </div>
  )
}

// Inline file preview (within FolderTree split)
function FilePreviewInline({ node, filePath }: { node: FileNode | null; filePath: string | null }) {
  if (!node || !filePath) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p style={{ color: '#555555', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
          Select a file to preview its contents.
        </p>
      </div>
    )
  }

  const pathParts = filePath.split('/')
  const breadcrumb = pathParts.join(' / ')
  const content = node.content || '// No content available'
  const lines = content.split('\n')

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Breadcrumb */}
      <div
        style={{
          padding: '8px 16px',
          borderBottom: '1px solid #222222',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: '#555555',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        {breadcrumb}
      </div>

      {/* Code */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
        {lines.map((line, i) => (
          <div key={i} style={{ display: 'flex', minHeight: 20 }}>
            <span
              style={{
                width: 48,
                textAlign: 'right',
                paddingRight: 16,
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: '#555555',
                flexShrink: 0,
                userSelect: 'none',
              }}
            >
              {i + 1}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                whiteSpace: 'pre',
                flex: 1,
              }}
              dangerouslySetInnerHTML={{ __html: highlightLine(line) }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// Simple regex-based syntax highlighting
function highlightLine(line: string): string {
  // Comments
  const commentIdx = line.indexOf('//')
  if (commentIdx !== -1) {
    const before = line.slice(0, commentIdx)
    const comment = line.slice(commentIdx)
    return `${highlightCode(before)}<span style="color:#555555;font-style:italic">${escapeHtml(comment)}</span>`
  }

  // Markdown / text files — no highlighting
  if (line.startsWith('#') || line.startsWith('|') || line.startsWith('-')) {
    return `<span style="color:#888888">${escapeHtml(line)}</span>`
  }

  return highlightCode(line)
}

function highlightCode(code: string): string {
  let result = escapeHtml(code)

  // Strings
  result = result.replace(
    /&quot;([^&]*?)&quot;/g,
    '<span style="color:#22C55E">&quot;$1&quot;</span>'
  )

  // Numbers (standalone)
  result = result.replace(
    /\b(\d+&#39;[bhdo][\da-fA-F_]+|\d+)\b/g,
    '<span style="color:#888888">$1</span>'
  )

  // Verilog keywords
  const keywords = [
    'module', 'endmodule', 'input', 'output', 'inout',
    'always', 'case', 'endcase', 'begin', 'end',
    'reg', 'wire', 'parameter', 'localparam',
    'assign', 'posedge', 'negedge', 'if', 'else',
    'initial', 'integer', 'genvar', 'generate', 'endgenerate',
    'default', 'or', 'and', 'not',
  ]
  const kwPattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g')
  result = result.replace(kwPattern, '<span style="color:#FAFAFA;font-weight:bold">$1</span>')

  return result
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
