export default function SkyScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 400"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Sky gradient background */}
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bfdbfe" />
          <stop offset="55%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#eff6ff" />
        </linearGradient>
        <linearGradient id="sunGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
        <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#bae6fd" />
        </linearGradient>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect width="500" height="400" fill="url(#skyGrad)" rx="16" />

      {/* Sun glow */}
      <ellipse cx="370" cy="110" rx="80" ry="80" fill="url(#sunGlow)" />

      {/* Sun */}
      <circle cx="370" cy="110" r="38" fill="url(#sunGrad)" />
      <circle cx="370" cy="110" r="28" fill="#fde68a" />

      {/* Sun rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 370 + Math.cos(rad) * 44;
        const y1 = 110 + Math.sin(rad) * 44;
        const x2 = 370 + Math.cos(rad) * 56;
        const y2 = 110 + Math.sin(rad) * 56;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#fbbf24"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.7"
          />
        );
      })}

      {/* Light rays from sun downward */}
      <line x1="370" y1="148" x2="340" y2="320" stroke="#fde68a" strokeWidth="1.5" opacity="0.18" />
      <line x1="370" y1="148" x2="390" y2="320" stroke="#fde68a" strokeWidth="1.5" opacity="0.18" />
      <line x1="370" y1="148" x2="420" y2="320" stroke="#fde68a" strokeWidth="1.5" opacity="0.13" />

      {/* Cloud 1 - large, center-left */}
      <g transform="translate(60, 90)">
        <ellipse cx="60" cy="30" rx="55" ry="22" fill="white" opacity="0.95" />
        <ellipse cx="38" cy="36" rx="32" ry="18" fill="white" opacity="0.95" />
        <ellipse cx="82" cy="36" rx="28" ry="16" fill="white" opacity="0.95" />
        <ellipse cx="60" cy="40" rx="50" ry="14" fill="white" opacity="0.95" />
      </g>

      {/* Cloud 2 - medium, upper right */}
      <g transform="translate(250, 55)">
        <ellipse cx="45" cy="24" rx="42" ry="18" fill="white" opacity="0.85" />
        <ellipse cx="28" cy="29" rx="24" ry="14" fill="white" opacity="0.85" />
        <ellipse cx="62" cy="29" rx="22" ry="13" fill="white" opacity="0.85" />
        <ellipse cx="45" cy="32" rx="40" ry="11" fill="white" opacity="0.85" />
      </g>

      {/* Cloud 3 - small, left-upper */}
      <g transform="translate(10, 50)">
        <ellipse cx="34" cy="20" rx="30" ry="14" fill="white" opacity="0.75" />
        <ellipse cx="20" cy="24" rx="18" ry="11" fill="white" opacity="0.75" />
        <ellipse cx="48" cy="24" rx="16" ry="10" fill="white" opacity="0.75" />
        <ellipse cx="34" cy="27" rx="28" ry="9" fill="white" opacity="0.75" />
      </g>

      {/* Cloud 4 - small, far right mid */}
      <g transform="translate(430, 145)">
        <ellipse cx="28" cy="16" rx="26" ry="12" fill="white" opacity="0.70" />
        <ellipse cx="16" cy="20" rx="16" ry="9" fill="white" opacity="0.70" />
        <ellipse cx="40" cy="20" rx="14" ry="8" fill="white" opacity="0.70" />
      </g>

      {/* Cloud 5 - wispy, lower left area */}
      <g transform="translate(30, 185)">
        <ellipse cx="40" cy="14" rx="38" ry="10" fill="white" opacity="0.60" />
        <ellipse cx="22" cy="18" rx="20" ry="8" fill="white" opacity="0.60" />
        <ellipse cx="58" cy="18" rx="18" ry="7" fill="white" opacity="0.60" />
      </g>

      {/* Birds - simple V shapes */}
      {/* Bird 1 */}
      <path d="M 155 140 Q 160 134 165 140" stroke="#60a5fa" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Bird 2 */}
      <path d="M 170 128 Q 176 122 182 128" stroke="#60a5fa" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Bird 3 (smaller, farther) */}
      <path d="M 200 118 Q 204 114 208 118" stroke="#93c5fd" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Horizon / ground */}
      <ellipse cx="250" cy="400" rx="320" ry="95" fill="url(#groundGrad)" opacity="0.7" />

      {/* Rolling hills */}
      <path
        d="M 0 320 Q 80 270 160 300 Q 220 320 280 290 Q 350 260 420 300 Q 460 316 500 310 L 500 400 L 0 400 Z"
        fill="#bae6fd"
        opacity="0.55"
      />
      <path
        d="M 0 345 Q 70 315 140 335 Q 210 355 290 330 Q 370 310 450 340 Q 475 350 500 342 L 500 400 L 0 400 Z"
        fill="#e0f2fe"
        opacity="0.65"
      />

      {/* Distant mountains / cityscape silhouette */}
      <path
        d="M 40 330 L 70 295 L 100 330 L 120 308 L 145 330 L 170 300 L 195 330 L 230 310 L 260 330"
        stroke="#93c5fd"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />

      {/* Flag on a hill */}
      <line x1="300" y1="298" x2="300" y2="260" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 300 260 L 322 268 L 300 276 Z" fill="#2563eb" opacity="0.9" />
      {/* Hill beneath flag */}
      <ellipse cx="300" cy="305" rx="28" ry="12" fill="#7dd3fc" opacity="0.5" />

      {/* Sparkle dots */}
      <circle cx="420" cy="200" r="2.5" fill="#fbbf24" opacity="0.7" />
      <circle cx="435" cy="185" r="1.5" fill="#fbbf24" opacity="0.5" />
      <circle cx="408" cy="192" r="1.5" fill="#fbbf24" opacity="0.5" />

      {/* Light beam horizontal band */}
      <rect x="0" y="155" width="500" height="18" fill="#fef9c3" opacity="0.08" rx="4" />
    </svg>
  );
}
