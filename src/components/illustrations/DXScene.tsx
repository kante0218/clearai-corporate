export default function DXScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 560"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="dxBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eff6ff" />
          <stop offset="100%" stopColor="#f0f9ff" />
        </linearGradient>
        <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e40af" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="panelGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="1200" height="560" fill="url(#dxBg)" />

      {/* City skyline silhouette — spread across full width */}
      <g opacity="0.15">
        {/* Left cluster */}
        <rect x="20" y="360" width="36" height="170" fill="#2563eb" rx="2" />
        <rect x="36" y="336" width="18" height="24" fill="#2563eb" rx="1" />
        <rect x="62" y="378" width="28" height="152" fill="#3b82f6" rx="2" />
        <rect x="96" y="348" width="22" height="182" fill="#2563eb" rx="2" />
        <rect x="124" y="368" width="30" height="162" fill="#60a5fa" rx="2" />
        <rect x="162" y="336" width="20" height="194" fill="#2563eb" rx="2" />
        <rect x="188" y="358" width="26" height="172" fill="#3b82f6" rx="2" />
        {/* Center-left */}
        <rect x="280" y="380" width="24" height="150" fill="#2563eb" rx="2" />
        <rect x="310" y="360" width="18" height="170" fill="#60a5fa" rx="2" />
        {/* Center-right */}
        <rect x="870" y="376" width="24" height="154" fill="#60a5fa" rx="2" />
        <rect x="900" y="358" width="18" height="172" fill="#2563eb" rx="2" />
        {/* Right cluster */}
        <rect x="1000" y="356" width="36" height="174" fill="#2563eb" rx="2" />
        <rect x="1042" y="370" width="28" height="160" fill="#3b82f6" rx="2" />
        <rect x="1038" y="348" width="18" height="22" fill="#3b82f6" rx="1" />
        <rect x="1076" y="360" width="24" height="170" fill="#60a5fa" rx="2" />
        <rect x="1106" y="346" width="20" height="184" fill="#2563eb" rx="2" />
        <rect x="1132" y="362" width="30" height="168" fill="#3b82f6" rx="2" />
        <rect x="1168" y="358" width="26" height="172" fill="#60a5fa" rx="2" />
      </g>

      {/* Main dashboard monitor — center */}
      <rect x="360" y="100" width="480" height="300" rx="16" fill="white" stroke="#bfdbfe" strokeWidth="2.5" />
      <rect x="360" y="100" width="480" height="48" rx="16" fill="url(#panelGrad)" />
      {/* Titlebar dots */}
      <circle cx="394" cy="124" r="7" fill="rgba(255,255,255,0.32)" />
      <circle cx="418" cy="124" r="7" fill="rgba(255,255,255,0.32)" />
      <circle cx="442" cy="124" r="7" fill="rgba(255,255,255,0.32)" />
      <text x="600" y="128" textAnchor="middle" fill="white" fontSize="15" fontFamily="sans-serif" opacity="0.88">AI Analytics Dashboard</text>

      {/* Bar chart — left side of dashboard */}
      <rect x="390" y="300" width="26" height="72" rx="4" fill="#2563eb" opacity="0.70" />
      <rect x="424" y="278" width="26" height="94" rx="4" fill="#2563eb" opacity="0.85" />
      <rect x="458" y="250" width="26" height="122" rx="4" fill="#2563eb" />
      <rect x="492" y="264" width="26" height="108" rx="4" fill="#2563eb" opacity="0.90" />
      <rect x="526" y="234" width="26" height="138" rx="4" fill="#1d4ed8" />

      {/* Line chart — right side */}
      <polyline
        points="580,358 622,318 666,335 712,295 758,308 804,272"
        stroke="#60a5fa"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="580" cy="358" r="5" fill="#2563eb" />
      <circle cx="622" cy="318" r="5" fill="#2563eb" />
      <circle cx="666" cy="335" r="5" fill="#2563eb" />
      <circle cx="712" cy="295" r="5" fill="#2563eb" />
      <circle cx="758" cy="308" r="5" fill="#2563eb" />
      <circle cx="804" cy="272" r="5" fill="#1d4ed8" />

      {/* Mini metric cards */}
      <rect x="582" y="170" width="80" height="44" rx="6" fill="#eff6ff" />
      <text x="622" y="188" textAnchor="middle" fill="#1d4ed8" fontSize="11" fontFamily="sans-serif" fontWeight="bold">+42%</text>
      <text x="622" y="205" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="sans-serif">効率化</text>

      <rect x="680" y="170" width="80" height="44" rx="6" fill="#eff6ff" />
      <text x="720" y="188" textAnchor="middle" fill="#1d4ed8" fontSize="11" fontFamily="sans-serif" fontWeight="bold">-60%</text>
      <text x="720" y="205" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="sans-serif">コスト</text>

      <rect x="778" y="170" width="80" height="44" rx="6" fill="#eff6ff" />
      <text x="818" y="188" textAnchor="middle" fill="#1d4ed8" fontSize="11" fontFamily="sans-serif" fontWeight="bold">98%</text>
      <text x="818" y="205" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="sans-serif">精度</text>

      {/* Monitor stand */}
      <rect x="576" y="400" width="48" height="28" rx="4" fill="#dbeafe" />
      <rect x="536" y="426" width="128" height="12" rx="6" fill="#bfdbfe" />

      {/* Network nodes — LEFT side, spread far */}
      <circle cx="90" cy="200" r="20" fill="white" stroke="#93c5fd" strokeWidth="2.5" />
      <circle cx="90" cy="200" r="12" fill="#bfdbfe" />
      <circle cx="90" cy="200" r="6" fill="#2563eb" />

      <circle cx="110" cy="310" r="16" fill="white" stroke="#93c5fd" strokeWidth="2.5" />
      <circle cx="110" cy="310" r="9" fill="#bfdbfe" />
      <circle cx="110" cy="310" r="4" fill="#2563eb" />

      <circle cx="140" cy="420" r="13" fill="white" stroke="#bfdbfe" strokeWidth="2" />
      <circle cx="140" cy="420" r="6" fill="#dbeafe" />

      <circle cx="240" cy="160" r="16" fill="white" stroke="#93c5fd" strokeWidth="2" />
      <circle cx="240" cy="160" r="9" fill="#bfdbfe" />
      <circle cx="240" cy="160" r="4" fill="#2563eb" />

      {/* Connecting lines — left nodes to monitor */}
      <line x1="110" y1="200" x2="360" y2="220" stroke="#93c5fd" strokeWidth="2" strokeDasharray="5 4" opacity="0.65" />
      <line x1="126" y1="310" x2="360" y2="290" stroke="#93c5fd" strokeWidth="2" strokeDasharray="5 4" opacity="0.55" />
      <line x1="153" y1="415" x2="360" y2="370" stroke="#bfdbfe" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.45" />
      <line x1="256" y1="163" x2="360" y2="175" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.55" />

      {/* Network nodes — RIGHT side, spread far */}
      <circle cx="1110" cy="200" r="20" fill="white" stroke="#93c5fd" strokeWidth="2.5" />
      <circle cx="1110" cy="200" r="12" fill="#bfdbfe" />
      <circle cx="1110" cy="200" r="6" fill="#2563eb" />

      <circle cx="1090" cy="310" r="16" fill="white" stroke="#93c5fd" strokeWidth="2.5" />
      <circle cx="1090" cy="310" r="9" fill="#bfdbfe" />
      <circle cx="1090" cy="310" r="4" fill="#2563eb" />

      <circle cx="1060" cy="420" r="13" fill="white" stroke="#bfdbfe" strokeWidth="2" />
      <circle cx="1060" cy="420" r="6" fill="#dbeafe" />

      <circle cx="960" cy="160" r="16" fill="white" stroke="#93c5fd" strokeWidth="2" />
      <circle cx="960" cy="160" r="9" fill="#bfdbfe" />
      <circle cx="960" cy="160" r="4" fill="#2563eb" />

      {/* Connecting lines — right nodes to monitor */}
      <line x1="1090" y1="200" x2="840" y2="220" stroke="#93c5fd" strokeWidth="2" strokeDasharray="5 4" opacity="0.65" />
      <line x1="1074" y1="310" x2="840" y2="290" stroke="#93c5fd" strokeWidth="2" strokeDasharray="5 4" opacity="0.55" />
      <line x1="1047" y1="415" x2="840" y2="370" stroke="#bfdbfe" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.45" />
      <line x1="944" y1="163" x2="840" y2="175" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.55" />

      {/* Data flow particles */}
      <circle cx="225" cy="212" r="4" fill="#2563eb" opacity="0.8" />
      <circle cx="232" cy="302" r="3.5" fill="#3b82f6" opacity="0.7" />
      <circle cx="975" cy="212" r="4" fill="#2563eb" opacity="0.8" />
      <circle cx="968" cy="302" r="3.5" fill="#3b82f6" opacity="0.7" />

      {/* Horizontal dashed connector */}
      <line x1="110" y1="310" x2="1090" y2="310" stroke="#dbeafe" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.40" />

      {/* Floating labels */}
      <rect x="50" y="178" width="50" height="18" rx="4" fill="#2563eb" />
      <text x="75" y="190" textAnchor="middle" fill="white" fontSize="9" fontFamily="sans-serif">AI</text>

      <rect x="200" y="138" width="56" height="18" rx="4" fill="#2563eb" />
      <text x="228" y="150" textAnchor="middle" fill="white" fontSize="9" fontFamily="sans-serif">MODEL</text>

      <rect x="1100" y="178" width="50" height="18" rx="4" fill="#2563eb" />
      <text x="1125" y="190" textAnchor="middle" fill="white" fontSize="9" fontFamily="sans-serif">DATA</text>

      <rect x="944" y="138" width="56" height="18" rx="4" fill="#2563eb" />
      <text x="972" y="150" textAnchor="middle" fill="white" fontSize="9" fontFamily="sans-serif">CLOUD</text>

      {/* Decorative grid dots — bottom strip */}
      {[...Array(5)].map((_, row) =>
        [...Array(10)].map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={200 + col * 90}
            cy={490 + row * 16}
            r="2"
            fill="#bfdbfe"
            opacity="0.45"
          />
        ))
      )}

      {/* Chip icons — bottom center */}
      <rect x="460" y="470" width="48" height="32" rx="6" fill="white" stroke="#bfdbfe" strokeWidth="2" />
      <rect x="468" y="478" width="32" height="16" rx="3" fill="#dbeafe" />
      <line x1="460" y1="484" x2="450" y2="484" stroke="#93c5fd" strokeWidth="2" />
      <line x1="460" y1="490" x2="450" y2="490" stroke="#93c5fd" strokeWidth="2" />
      <line x1="508" y1="484" x2="518" y2="484" stroke="#93c5fd" strokeWidth="2" />
      <line x1="508" y1="490" x2="518" y2="490" stroke="#93c5fd" strokeWidth="2" />

      <rect x="680" y="470" width="48" height="32" rx="6" fill="white" stroke="#bfdbfe" strokeWidth="2" />
      <rect x="688" y="478" width="32" height="16" rx="3" fill="#dbeafe" />
      <line x1="680" y1="484" x2="670" y2="484" stroke="#93c5fd" strokeWidth="2" />
      <line x1="680" y1="490" x2="670" y2="490" stroke="#93c5fd" strokeWidth="2" />
      <line x1="728" y1="484" x2="738" y2="484" stroke="#93c5fd" strokeWidth="2" />
      <line x1="728" y1="490" x2="738" y2="490" stroke="#93c5fd" strokeWidth="2" />
    </svg>
  );
}
