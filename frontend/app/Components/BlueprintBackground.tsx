"use client";

/**
 * BlueprintBackground
 * Renders an engineering-grade blueprint grid overlay at <10% opacity.
 * Includes: dot grid, hairline guides, measurement marks, coordinate labels,
 * diagonal hatch indicators, and CAD anchor points.
 */
export default function BlueprintBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      style={{ opacity: 0.06 }}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Dot grid pattern */}
          <pattern
            id="bp-dots"
            x="0"
            y="0"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="16" cy="16" r="0.6" fill="black" />
          </pattern>

          {/* Major grid lines */}
          <pattern
            id="bp-grid-major"
            x="0"
            y="0"
            width="160"
            height="160"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0" y1="0" x2="160" y2="0"
              stroke="black"
              strokeWidth="0.3"
            />
            <line
              x1="0" y1="0" x2="0" y2="160"
              stroke="black"
              strokeWidth="0.3"
            />
          </pattern>

          {/* Minor grid lines */}
          <pattern
            id="bp-grid-minor"
            x="0"
            y="0"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0" y1="0" x2="32" y2="0"
              stroke="black"
              strokeWidth="0.15"
              strokeDasharray="2 6"
            />
            <line
              x1="0" y1="0" x2="0" y2="32"
              stroke="black"
              strokeWidth="0.15"
              strokeDasharray="2 6"
            />
          </pattern>
        </defs>

        {/* Layers */}
        <rect width="100%" height="100%" fill="url(#bp-dots)" />
        <rect width="100%" height="100%" fill="url(#bp-grid-minor)" />
        <rect width="100%" height="100%" fill="url(#bp-grid-major)" />

        {/* Horizontal measurement ruler - top */}
        <line
          x1="80" y1="24" x2="95%" y2="24"
          stroke="black" strokeWidth="0.3"
        />
        {/* Tick marks on ruler */}
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`tick-h-${i}`}
            x1={80 + i * 64}
            y1="20"
            x2={80 + i * 64}
            y2="28"
            stroke="black"
            strokeWidth="0.3"
          />
        ))}

        {/* Vertical measurement ruler - left */}
        <line
          x1="24" y1="80" x2="24" y2="95%"
          stroke="black" strokeWidth="0.3"
        />
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`tick-v-${i}`}
            x1="20"
            y1={80 + i * 64}
            x2="28"
            y2={80 + i * 64}
            stroke="black"
            strokeWidth="0.3"
          />
        ))}

        {/* Coordinate labels */}
        {[
          { x: 80, y: 16, label: "0" },
          { x: 400, y: 16, label: "320" },
          { x: 720, y: 16, label: "640" },
          { x: 1040, y: 16, label: "960" },
        ].map((coord) => (
          <text
            key={coord.label}
            x={coord.x}
            y={coord.y}
            fill="black"
            fontSize="7"
            fontFamily="var(--font-sans)"
            opacity="0.6"
          >
            {coord.label}
          </text>
        ))}

        {/* Y-axis coordinate labels */}
        {[
          { x: 6, y: 84, label: "0" },
          { x: 6, y: 340, label: "256" },
          { x: 6, y: 596, label: "512" },
        ].map((coord) => (
          <text
            key={`y-${coord.label}`}
            x={coord.x}
            y={coord.y}
            fill="black"
            fontSize="7"
            fontFamily="var(--font-sans)"
            opacity="0.6"
          >
            {coord.label}
          </text>
        ))}

        {/* Anchor / crosshair points */}
        {[
          [160, 160],
          [480, 320],
          [800, 480],
          [320, 480],
          [640, 160],
        ].map(([cx, cy], i) => (
          <g key={`anchor-${i}`} opacity="0.4">
            <line
              x1={cx - 6} y1={cy} x2={cx + 6} y2={cy}
              stroke="black" strokeWidth="0.4"
            />
            <line
              x1={cx} y1={cy - 6} x2={cx} y2={cy + 6}
              stroke="black" strokeWidth="0.4"
            />
            <circle
              cx={cx} cy={cy} r="3"
              fill="none" stroke="black" strokeWidth="0.3"
            />
          </g>
        ))}

        {/* Diagonal hatch indicators */}
        <line
          x1="0" y1="100%" x2="120" y2="0"
          stroke="black" strokeWidth="0.15"
          strokeDasharray="4 16"
          opacity="0.3"
        />
        <line
          x1="100%" y1="100%" x2="85%" y2="0"
          stroke="black" strokeWidth="0.15"
          strokeDasharray="4 16"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}
