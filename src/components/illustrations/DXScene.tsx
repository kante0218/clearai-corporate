export default function DXScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 400"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="dxBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eff6ff" />
          <stop offset="100%" stopColor="#f8fafc" />
        </linearGradient>
        <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e40af" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="panelGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="cityGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#bfdbfe" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="500" height="400" fill="url(#dxBg)" rx="16" />

      {/* City skyline silhouette */}
      <g opacity="0.18">
        <rect x="10" y="260" width="28" height="110" fill="#2563eb" rx="2" />
        <rect x="22" y="240" width="14" height="20" fill="#2563eb" rx="1" />
        <rect x="42" y="270" width="22" height="100" fill="#3b82f6" rx="2" />
        <rect x="68" y="250" width="18" height="120" fill="#2563eb" rx="2" />
        <rect x="90" y="265" width="24" height="105" fill="#60a5fa" rx="2" />
        <rect x="118" y="242" width="16" height="128" fill="#2563eb" rx="2" />
        <rect x="420" y="255" width="30" height="115" fill="#2563eb" rx="2" />
        <rect x="455" y="268" width="24" height="102" fill="#3b82f6" rx="2" />
        <rect x="452" y="248" width="14" height="20" fill="#3b82f6" rx="1" />
        <rect x="480" y="260" width="20" height="110" fill="#60a5fa" rx="2" />
      </g>

      {/* Main monitor / dashboard */}
      <rect x="110" y="80" width="280" height="190" rx="12" fill="white" stroke="#bfdbfe" strokeWidth="2" />
      <rect x="110" y="80" width="280" height="32" rx="12" fill="url(#panelGrad)" />
      {/* header dots */}
      <circle cx="130" cy="96" r="5" fill="rgba(255,255,255,0.35)" />
      <circle cx="148" cy="96" r="5" fill="rgba(255,255,255,0.35)" />
      <circle cx="166" cy="96" r="5" fill="rgba(255,255,255,0.35)" />
      {/* Screen label */}
      <text x="250" y="100" textAnchor="middle" fill="white" fontSize="11" fontFamily="sans-serif" opacity="0.85">AI Analytics Dashboard</text>

      {/* Dashboard content */}
      {/* Bar chart */}
      <rect x="130" y="200" width="18" height="50" rx="3" fill="#2563eb" opacity="0.7" />
      <rect x="154" y="185" width="18" height="65" rx="3" fill="#2563eb" opacity="0.85" />
      <rect x="178" y="165" width="18" height="85" rx="3" fill="#2563eb" />
      <rect x="202" y="175" width="18" height="75" rx="3" fill="#2563eb" opacity="0.9" />
      <rect x="226" y="155" width="18" height="95" rx="3" fill="#1d4ed8" />

      {/* Line chart */}
      <polyline
        points="260,245 280,220 302,230 325,200 348,210 370,185"
        stroke="#60a5fa"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="260" cy="245" r="3.5" fill="#2563eb" />
      <circle cx="280" cy="220" r="3.5" fill="#2563eb" />
      <circle cx="302" cy="230" r="3.5" fill="#2563eb" />
      <circle cx="325" cy="200" r="3.5" fill="#2563eb" />
      <circle cx="348" cy="210" r="3.5" fill="#2563eb" />
      <circle cx="370" cy="185" r="3.5" fill="#1d4ed8" />

      {/* Mini metrics */}
      <rect x="262" y="125" width="55" height="30" rx="5" fill="#eff6ff" />
      <text x="289" y="136" textAnchor="middle" fill="#1d4ed8" fontSize="8" fontFamily="sans-serif" fontWeight="bold">+42%</text>
      <text x="289" y="147" textAnchor="middle" fill="#93c5fd" fontSize="7" fontFamily="sans-serif">効率化</text>

      <rect x="323" y="125" width="55" height="30" rx="5" fill="#eff6ff" />
      <text x="350" y="136" textAnchor="middle" fill="#1d4ed8" fontSize="8" fontFamily="sans-serif" fontWeight="bold">-60%</text>
      <text x="350" y="147" textAnchor="middle" fill="#93c5fd" fontSize="7" fontFamily="sans-serif">コスト</text>

      {/* Monitor stand */}
      <rect x="238" y="270" width="24" height="20" rx="3" fill="#dbeafe" />
      <rect x="218" y="288" width="64" height="8" rx="4" fill="#bfdbfe" />

      {/* Network nodes - left side */}
      <circle cx="50" cy="160" r="14" fill="white" stroke="#93c5fd" strokeWidth="2" />
      <circle cx="50" cy="160" r="8" fill="#bfdbfe" />
      <circle cx="50" cy="160" r="4" fill="#2563eb" />

      <circle cx="60" cy="230" r="11" fill="white" stroke="#93c5fd" strokeWidth="2" />
      <circle cx="60" cy="230" r="6" fill="#bfdbfe" />
      <circle cx="60" cy="230" r="3" fill="#2563eb" />

      <circle cx="75" cy="300" r="9" fill="white" stroke="#bfdbfe" strokeWidth="1.5" />
      <circle cx="75" cy="300" r="4" fill="#dbeafe" />

      {/* Lines connecting nodes to monitor */}
      <line x1="64" y1="160" x2="110" y2="148" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />
      <line x1="71" y1="230" x2="110" y2="200" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
      <line x1="84" y1="296" x2="110" y2="255" stroke="#bfdbfe" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />

      {/* Network nodes - right side */}
      <circle cx="450" cy="150" r="14" fill="white" stroke="#93c5fd" strokeWidth="2" />
      <circle cx="450" cy="150" r="8" fill="#bfdbfe" />
      <circle cx="450" cy="150" r="4" fill="#2563eb" />

      <circle cx="445" cy="225" r="11" fill="white" stroke="#93c5fd" strokeWidth="2" />
      <circle cx="445" cy="225" r="6" fill="#bfdbfe" />
      <circle cx="445" cy="225" r="3" fill="#2563eb" />

      <circle cx="430" cy="295" r="9" fill="white" stroke="#bfdbfe" strokeWidth="1.5" />
      <circle cx="430" cy="295" r="4" fill="#dbeafe" />

      {/* Lines from right nodes to monitor */}
      <line x1="436" y1="150" x2="390" y2="148" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />
      <line x1="434" y1="225" x2="390" y2="205" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
      <line x1="421" y1="291" x2="390" y2="255" stroke="#bfdbfe" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />

      {/* Data flow particles on lines */}
      <circle cx="87" cy="154" r="3" fill="#2563eb" opacity="0.8" />
      <circle cx="90" cy="215" r="2.5" fill="#3b82f6" opacity="0.7" />
      <circle cx="413" cy="154" r="3" fill="#2563eb" opacity="0.8" />
      <circle cx="415" cy="216" r="2.5" fill="#3b82f6" opacity="0.7" />

      {/* Bottom connection line */}
      <line x1="60" y1="230" x2="445" y2="225" stroke="#dbeafe" strokeWidth="1" strokeDasharray="6 4" opacity="0.5" />

      {/* Small floating labels */}
      <rect x="24" y="140" width="34" height="14" rx="3" fill="#2563eb" />
      <text x="41" y="150" textAnchor="middle" fill="white" fontSize="7" fontFamily="sans-serif">AI</text>

      <rect x="434" y="130" width="34" height="14" rx="3" fill="#2563eb" />
      <text x="451" y="140" textAnchor="middle" fill="white" fontSize="7" fontFamily="sans-serif">DATA</text>

      {/* Decorative grid dots */}
      {[...Array(6)].map((_, row) =>
        [...Array(5)].map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={150 + col * 50}
            cy={350 + row * 14}
            r="1.5"
            fill="#bfdbfe"
            opacity="0.5"
          />
        ))
      )}

      {/* Small floating chip icons */}
      <rect x="170" y="330" width="36" height="24" rx="5" fill="white" stroke="#bfdbfe" strokeWidth="1.5" />
      <rect x="176" y="336" width="24" height="12" rx="2" fill="#dbeafe" />
      <line x1="170" y1="339" x2="164" y2="339" stroke="#93c5fd" strokeWidth="1.5" />
      <line x1="170" y1="345" x2="164" y2="345" stroke="#93c5fd" strokeWidth="1.5" />
      <line x1="206" y1="339" x2="212" y2="339" stroke="#93c5fd" strokeWidth="1.5" />
      <line x1="206" y1="345" x2="212" y2="345" stroke="#93c5fd" strokeWidth="1.5" />

      <rect x="290" y="330" width="36" height="24" rx="5" fill="white" stroke="#bfdbfe" strokeWidth="1.5" />
      <rect x="296" y="336" width="24" height="12" rx="2" fill="#dbeafe" />
      <line x1="290" y1="339" x2="284" y2="339" stroke="#93c5fd" strokeWidth="1.5" />
      <line x1="290" y1="345" x2="284" y2="345" stroke="#93c5fd" strokeWidth="1.5" />
      <line x1="326" y1="339" x2="332" y2="339" stroke="#93c5fd" strokeWidth="1.5" />
      <line x1="326" y1="345" x2="332" y2="345" stroke="#93c5fd" strokeWidth="1.5" />
    </svg>
  );
}
