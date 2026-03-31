'use client'

interface FileNode {
  name: string
  type: 'file' | 'folder'
  tag?: string
  content?: string
  children?: FileNode[]
}

interface FilePreviewProps {
  filePath: string | null
  fileNode: FileNode | null
}

export default function FilePreview({ filePath, fileNode }: FilePreviewProps) {
  if (!fileNode || !filePath) {
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
  const content = fileNode.content || '// No content available'
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

      {/* Code area */}
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

function highlightLine(line: string): string {
  const commentIdx = line.indexOf('//')
  if (commentIdx !== -1) {
    const before = line.slice(0, commentIdx)
    const comment = line.slice(commentIdx)
    return `${highlightCode(before)}<span style="color:#555555;font-style:italic">${escapeHtml(comment)}</span>`
  }

  if (line.startsWith('#') || line.startsWith('|') || line.startsWith('-')) {
    return `<span style="color:#888888">${escapeHtml(line)}</span>`
  }

  return highlightCode(line)
}

function highlightCode(code: string): string {
  let result = escapeHtml(code)

  result = result.replace(
    /&quot;([^&]*?)&quot;/g,
    '<span style="color:#22C55E">&quot;$1&quot;</span>'
  )

  result = result.replace(
    /\b(\d+&#39;[bhdo][\da-fA-F_]+|\d+)\b/g,
    '<span style="color:#888888">$1</span>'
  )

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
