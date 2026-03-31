'use client'

import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  connections: number[]
}

interface Pulse {
  fromNode: number
  toNode: number
  progress: number
  speed: number
}

export default function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let nodes: Node[] = []
    let edges: [number, number][] = []
    let pulses: Pulse[] = []

    const AMBER = { r: 200, g: 150, b: 46 }
    const TRACE_COLOR = 'rgba(200, 150, 46, 0.08)'
    const NODE_COLOR = 'rgba(200, 150, 46, 0.15)'
    const PULSE_COLOR = `rgba(${AMBER.r}, ${AMBER.g}, ${AMBER.b}, 0.6)`

    function resize() {
      const dpr = window.devicePixelRatio || 1
      canvas!.width = window.innerWidth * dpr
      canvas!.height = window.innerHeight * dpr
      canvas!.style.width = window.innerWidth + 'px'
      canvas!.style.height = window.innerHeight + 'px'
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildCircuit()
    }

    function buildCircuit() {
      nodes = []
      edges = []
      pulses = []

      const w = window.innerWidth
      const h = window.innerHeight
      const spacing = 80
      const cols = Math.ceil(w / spacing) + 1
      const rows = Math.ceil(h / spacing) + 1

      // Create grid nodes with slight jitter
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const jitterX = (Math.random() - 0.5) * 20
          const jitterY = (Math.random() - 0.5) * 20
          nodes.push({
            x: col * spacing + jitterX,
            y: row * spacing + jitterY,
            connections: [],
          })
        }
      }

      // Create connections — horizontal, vertical, and some diagonal
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = row * cols + col

          // Horizontal (right)
          if (col < cols - 1 && Math.random() < 0.4) {
            const right = idx + 1
            edges.push([idx, right])
            nodes[idx].connections.push(right)
            nodes[right].connections.push(idx)
          }

          // Vertical (down)
          if (row < rows - 1 && Math.random() < 0.4) {
            const down = idx + cols
            edges.push([idx, down])
            nodes[idx].connections.push(down)
            nodes[down].connections.push(idx)
          }

          // Diagonal (down-right), sparse
          if (col < cols - 1 && row < rows - 1 && Math.random() < 0.08) {
            const diag = idx + cols + 1
            edges.push([idx, diag])
            nodes[idx].connections.push(diag)
            nodes[diag].connections.push(idx)
          }
        }
      }

      // Seed initial pulses
      for (let i = 0; i < Math.floor(edges.length * 0.06); i++) {
        spawnPulse()
      }
    }

    function spawnPulse() {
      if (edges.length === 0) return
      const [a, b] = edges[Math.floor(Math.random() * edges.length)]
      const direction = Math.random() < 0.5
      pulses.push({
        fromNode: direction ? a : b,
        toNode: direction ? b : a,
        progress: 0,
        speed: 0.003 + Math.random() * 0.006,
      })
    }

    function draw() {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx!.clearRect(0, 0, w, h)

      // Draw traces
      ctx!.lineWidth = 1
      ctx!.strokeStyle = TRACE_COLOR
      ctx!.beginPath()
      for (const [a, b] of edges) {
        const na = nodes[a]
        const nb = nodes[b]
        ctx!.moveTo(na.x, na.y)
        // L-shaped trace: go horizontal first, then vertical
        if (Math.abs(na.x - nb.x) > 10 && Math.abs(na.y - nb.y) > 10) {
          ctx!.lineTo(nb.x, na.y)
          ctx!.lineTo(nb.x, nb.y)
        } else {
          ctx!.lineTo(nb.x, nb.y)
        }
      }
      ctx!.stroke()

      // Draw nodes (only those with connections)
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].connections.length === 0) continue
        const n = nodes[i]
        const size = nodes[i].connections.length > 2 ? 2.5 : 1.5
        ctx!.fillStyle = NODE_COLOR
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, size, 0, Math.PI * 2)
        ctx!.fill()
      }

      // Draw and update pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        p.progress += p.speed

        if (p.progress >= 1) {
          // Chain: move to a random neighbor
          const currentNode = p.toNode
          const neighbors = nodes[currentNode].connections
          if (neighbors.length > 0 && Math.random() < 0.7) {
            const next = neighbors[Math.floor(Math.random() * neighbors.length)]
            p.fromNode = currentNode
            p.toNode = next
            p.progress = 0
            p.speed = 0.003 + Math.random() * 0.006
          } else {
            pulses.splice(i, 1)
            spawnPulse()
          }
          continue
        }

        const na = nodes[p.fromNode]
        const nb = nodes[p.toNode]

        // Compute position along L-shaped path
        let px: number, py: number
        const isLShaped = Math.abs(na.x - nb.x) > 10 && Math.abs(na.y - nb.y) > 10
        if (isLShaped) {
          const midX = nb.x
          const midY = na.y
          const totalDist =
            Math.abs(na.x - midX) + Math.abs(midY - nb.y)
          const hDist = Math.abs(na.x - midX)
          const splitPoint = hDist / totalDist

          if (p.progress < splitPoint) {
            const t = p.progress / splitPoint
            px = na.x + (midX - na.x) * t
            py = na.y
          } else {
            const t = (p.progress - splitPoint) / (1 - splitPoint)
            px = midX
            py = midY + (nb.y - midY) * t
          }
        } else {
          px = na.x + (nb.x - na.x) * p.progress
          py = na.y + (nb.y - na.y) * p.progress
        }

        // Glow
        const gradient = ctx!.createRadialGradient(px, py, 0, px, py, 12)
        gradient.addColorStop(0, PULSE_COLOR)
        gradient.addColorStop(1, 'rgba(200, 150, 46, 0)')
        ctx!.fillStyle = gradient
        ctx!.beginPath()
        ctx!.arc(px, py, 12, 0, Math.PI * 2)
        ctx!.fill()

        // Bright core
        ctx!.fillStyle = `rgba(${AMBER.r}, ${AMBER.g}, ${AMBER.b}, 0.9)`
        ctx!.beginPath()
        ctx!.arc(px, py, 2, 0, Math.PI * 2)
        ctx!.fill()
      }

      // Maintain pulse count
      const targetPulses = Math.floor(edges.length * 0.06)
      while (pulses.length < targetPulses) {
        spawnPulse()
      }

      // Radial vignette overlay — darker center for card readability
      const gradient = ctx!.createRadialGradient(
        w * 0.5,
        h * 0.5,
        0,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.7
      )
      gradient.addColorStop(0, 'rgba(10, 10, 10, 0.6)')
      gradient.addColorStop(0.5, 'rgba(10, 10, 10, 0.2)')
      gradient.addColorStop(1, 'rgba(10, 10, 10, 0)')
      ctx!.fillStyle = gradient
      ctx!.fillRect(0, 0, w, h)

      animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        background: '#0A0A0A',
        pointerEvents: 'none',
      }}
    />
  )
}
