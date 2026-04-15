"use client";

/**
 * ChipGridBackground — a subtle, fixed SVG background that evokes
 * a chip floorplan / PCB layout. Faint grid, trace routes, pad dots,
 * and IP-block outlines in very low-opacity amber on the dark canvas.
 */
export function ChipGridBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          {/* Fine grid pattern — chip layout cells */}
          <pattern
            id="chip-grid-fine"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(200,150,46,0.22)"
              strokeWidth="0.5"
            />
          </pattern>

          {/* Coarse grid — major routing channels */}
          <pattern
            id="chip-grid-coarse"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 200 0 L 0 0 0 200"
              fill="none"
              stroke="rgba(200,150,46,0.28)"
              strokeWidth="1"
            />
          </pattern>

          {/* Pad pattern — via dots at intersections */}
          <pattern
            id="chip-pads"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="0" cy="0" r="2" fill="rgba(200,150,46,0.30)" />
            <circle cx="200" cy="0" r="2" fill="rgba(200,150,46,0.30)" />
            <circle cx="0" cy="200" r="2" fill="rgba(200,150,46,0.30)" />
            <circle cx="200" cy="200" r="2" fill="rgba(200,150,46,0.30)" />
            <circle cx="100" cy="100" r="1.5" fill="rgba(200,150,46,0.22)" />
          </pattern>
        </defs>

        {/* Base grids */}
        <rect width="100%" height="100%" fill="url(#chip-grid-fine)" />
        <rect width="100%" height="100%" fill="url(#chip-grid-coarse)" />
        <rect width="100%" height="100%" fill="url(#chip-pads)" />

        {/* IP block outlines — faint dashed rectangles suggesting functional blocks */}
        <g stroke="rgba(200,150,46,0.25)" strokeWidth="1.2" fill="none" strokeDasharray="6 4">
          <rect x="8%" y="12%" width="18%" height="22%" rx="2" />
          <rect x="74%" y="8%" width="20%" height="16%" rx="2" />
          <rect x="55%" y="60%" width="22%" height="25%" rx="2" />
          <rect x="5%" y="65%" width="16%" height="20%" rx="2" />
          <rect x="30%" y="35%" width="25%" height="18%" rx="2" />
        </g>

        {/* Signal trace routes — orthogonal lines like metal layers */}
        <g stroke="rgba(200,150,46,0.28)" strokeWidth="1" fill="none">
          {/* Horizontal buses */}
          <path d="M 0 200 H 300 L 310 210 H 600 L 610 200 H 900" />
          <path d="M 100 450 H 400 L 410 440 H 700 L 710 450 H 1200" />
          <path d="M 0 680 H 250 L 260 690 H 550 L 560 680 H 1100" />

          {/* Vertical buses */}
          <path d="M 300 0 V 200 L 310 210 V 450 L 300 460 V 800" />
          <path d="M 700 0 V 150 L 710 160 V 440 L 700 450 V 900" />
          <path d="M 1000 0 V 300 L 1010 310 V 600" />

          {/* Diagonal jogs */}
          <path d="M 300 200 L 310 210" />
          <path d="M 700 150 L 710 160" />
          <path d="M 600 450 L 610 440" />
        </g>

        {/* Via/pad highlights at route intersections */}
        <g fill="rgba(200,150,46,0.30)">
          <circle cx="300" cy="200" r="3" />
          <circle cx="700" cy="450" r="3" />
          <circle cx="310" cy="210" r="2.5" />
          <circle cx="610" cy="200" r="2.5" />
          <circle cx="400" cy="450" r="2.5" />
          <circle cx="710" cy="160" r="2.5" />
          <circle cx="1000" cy="300" r="2.5" />
          <circle cx="250" cy="680" r="2.5" />
          <circle cx="560" cy="680" r="2.5" />
        </g>

        {/* Corner die marks */}
        <g stroke="rgba(200,150,46,0.28)" strokeWidth="1.2" fill="none">
          <path d="M 30 10 L 10 10 L 10 30" />
          <path d="M 30 10 L 10 10 L 10 30" transform="scale(-1,1) translate(-100%, 0)" style={{ transformOrigin: '50% 0' }} />
        </g>

        {/* Faint radial glow from center — chip core emphasis */}
        <radialGradient id="chip-glow" cx="50%" cy="45%" r="40%">
          <stop offset="0%" stopColor="rgba(200,150,46,0.15)" />
          <stop offset="100%" stopColor="rgba(200,150,46,0)" />
        </radialGradient>
        <rect width="100%" height="100%" fill="url(#chip-glow)" />
      </svg>
    </div>
  );
}
