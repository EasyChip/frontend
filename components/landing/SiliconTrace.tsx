'use client'

export default function SiliconTrace() {
  return (
    <svg
      viewBox="0 0 1200 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity: 0.15,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      {/* Horizontal traces */}
      <path d="M0 200 H400 L450 250 H800 L850 200 H1200" className="trace-path" />
      <path d="M0 400 H300 L350 350 H600 L650 400 H900 L950 450 H1200" className="trace-path" />
      <path d="M0 600 H200 L250 550 H700 L750 600 H1200" className="trace-path" />

      {/* Vertical traces */}
      <path d="M300 0 V300 L350 350 V600 L300 650 V800" className="trace-path" />
      <path d="M600 0 V200 L650 250 V500 L600 550 V800" className="trace-path" />
      <path d="M900 0 V250 L950 300 V550 L900 600 V800" className="trace-path" />

      {/* Diagonal connectors */}
      <path d="M150 100 L300 200" className="trace-path" />
      <path d="M500 300 L650 400" className="trace-path" />
      <path d="M800 150 L950 300" className="trace-path" />

      {/* Junction nodes */}
      {[
        [300, 200], [600, 250], [900, 300],
        [350, 350], [650, 400], [950, 450],
        [250, 550], [600, 550], [900, 600],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="3"
          fill="var(--amber)"
          opacity="0.6"
        >
          <animate
            attributeName="opacity"
            values="0.3;0.8;0.3"
            dur={`${2 + (i % 3)}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      <style>{`
        .trace-path {
          stroke: var(--amber);
          stroke-width: 1;
          fill: none;
          stroke-dasharray: 80 920;
          stroke-dashoffset: 0;
          animation: trace-flow 8s linear infinite;
        }
        .trace-path:nth-child(2) { animation-delay: -1s; }
        .trace-path:nth-child(3) { animation-delay: -2s; }
        .trace-path:nth-child(4) { animation-delay: -3s; }
        .trace-path:nth-child(5) { animation-delay: -4s; }
        .trace-path:nth-child(6) { animation-delay: -5s; }
        .trace-path:nth-child(7) { animation-delay: -1.5s; }
        .trace-path:nth-child(8) { animation-delay: -3.5s; }
        .trace-path:nth-child(9) { animation-delay: -5.5s; }
        @media (prefers-reduced-motion: reduce) {
          .trace-path { animation: none; stroke-dasharray: none; opacity: 0.3; }
          circle animate { display: none; }
        }
      `}</style>
    </svg>
  )
}
