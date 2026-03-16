export default function CircuitBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.04 }}
      >
        <defs>
          <radialGradient id="circuit-fade" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="circuit-mask">
            <rect width="100%" height="100%" fill="url(#circuit-fade)" />
          </mask>
        </defs>
        <g mask="url(#circuit-mask)" stroke="rgba(255,255,255,0.8)" strokeWidth="0.5" fill="none">
          {/* Horizontal traces */}
          <line x1="0" y1="120" x2="100%" y2="120" />
          <line x1="0" y1="240" x2="100%" y2="240" />
          <line x1="0" y1="360" x2="100%" y2="360" />
          <line x1="0" y1="480" x2="100%" y2="480" />
          <line x1="0" y1="600" x2="100%" y2="600" />
          {/* Vertical traces */}
          <line x1="120" y1="0" x2="120" y2="100%" />
          <line x1="240" y1="0" x2="240" y2="100%" />
          <line x1="360" y1="0" x2="360" y2="100%" />
          <line x1="480" y1="0" x2="480" y2="100%" />
          <line x1="600" y1="0" x2="600" y2="100%" />
          <line x1="720" y1="0" x2="720" y2="100%" />
          <line x1="840" y1="0" x2="840" y2="100%" />
          <line x1="960" y1="0" x2="960" y2="100%" />
          <line x1="1080" y1="0" x2="1080" y2="100%" />
          <line x1="1200" y1="0" x2="1200" y2="100%" />
          <line x1="1320" y1="0" x2="1320" y2="100%" />
          {/* Junction dots */}
          <circle cx="120" cy="120" r="2" fill="rgba(255,255,255,0.8)" stroke="none" />
          <circle cx="240" cy="120" r="2" fill="rgba(255,255,255,0.8)" stroke="none" />
          <circle cx="360" cy="120" r="2" fill="rgba(255,255,255,0.8)" stroke="none" />
          <circle cx="480" cy="120" r="2" fill="rgba(255,255,255,0.8)" stroke="none" />
          <circle cx="600" cy="120" r="2" fill="rgba(255,255,255,0.8)" stroke="none" />
          <circle cx="120" cy="240" r="2" fill="rgba(255,255,255,0.8)" stroke="none" />
          <circle cx="360" cy="240" r="2" fill="rgba(255,255,255,0.8)" stroke="none" />
          <circle cx="600" cy="240" r="2" fill="rgba(255,255,255,0.8)" stroke="none" />
          <circle cx="840" cy="240" r="2" fill="rgba(255,255,255,0.8)" stroke="none" />
          <circle cx="240" cy="360" r="2" fill="rgba(255,255,255,0.8)" stroke="none" />
          <circle cx="480" cy="360" r="2" fill="rgba(255,255,255,0.8)" stroke="none" />
          <circle cx="720" cy="360" r="2" fill="rgba(255,255,255,0.8)" stroke="none" />
          <circle cx="960" cy="360" r="2" fill="rgba(255,255,255,0.8)" stroke="none" />
          <circle cx="120" cy="480" r="2" fill="rgba(255,255,255,0.8)" stroke="none" />
          <circle cx="360" cy="480" r="2" fill="rgba(255,255,255,0.8)" stroke="none" />
          <circle cx="600" cy="480" r="2" fill="rgba(255,255,255,0.8)" stroke="none" />
          <circle cx="840" cy="480" r="2" fill="rgba(255,255,255,0.8)" stroke="none" />
          {/* Short accent traces */}
          <line x1="120" y1="120" x2="240" y2="120" strokeWidth="1.5" stroke="rgba(91,106,240,0.6)" />
          <line x1="360" y1="240" x2="360" y2="360" strokeWidth="1.5" stroke="rgba(91,106,240,0.6)" />
          <line x1="600" y1="120" x2="720" y2="120" strokeWidth="1.5" stroke="rgba(5,200,220,0.6)" />
          <line x1="840" y1="360" x2="840" y2="480" strokeWidth="1.5" stroke="rgba(130,87,230,0.6)" />
        </g>
      </svg>
    </div>
  )
}
