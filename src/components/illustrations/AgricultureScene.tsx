export default function AgricultureScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 560"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="agSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d1fae5" />
          <stop offset="50%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#f0fdf4" />
        </linearGradient>
        <linearGradient id="fieldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
        <linearGradient id="droneGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="1200" height="560" fill="url(#agSky)" />

      {/* Distant hills — stretched across full width */}
      <path
        d="M 0 330 Q 180 275 360 312 Q 540 348 720 302 Q 900 256 1080 306 Q 1140 320 1200 310 L 1200 560 L 0 560 Z"
        fill="#bbf7d0"
        opacity="0.55"
      />
      <path
        d="M 0 378 Q 220 340 440 364 Q 660 388 880 354 Q 1040 330 1200 360 L 1200 560 L 0 560 Z"
        fill="#a7f3d0"
        opacity="0.65"
      />

      {/* Field rows — perspective, wide */}
      <path d="M 100 560 L 200 380 L 1000 380 L 1100 560 Z" fill="#6ee7b7" opacity="0.40" />

      {/* Furrow lines */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
        const x1 = 100 + i * 112;
        const x2 = 200 + i * 90;
        return (
          <line
            key={i}
            x1={x1}
            y1={560}
            x2={x2}
            y2={380}
            stroke="#34d399"
            strokeWidth={i === 4 ? 4 : 2.5}
            opacity={0.35 + i * 0.03}
          />
        );
      })}

      {/* Crop plants — scattered across full width */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((col) =>
        [0, 1, 2, 3].map((row) => {
          const baseX = 120 + col * 108;
          const baseY = 548 - row * 36;
          const shrink = row * 0.10;
          const x = baseX + (baseX > 600 ? shrink * 40 : -shrink * 40);
          const y = baseY;
          const size = 10 - row * 1.5;
          return (
            <g key={`${col}-${row}`} transform={`translate(${x}, ${y})`}>
              <line x1={0} y1={0} x2={0} y2={-size * 1.4} stroke="#059669" strokeWidth="2" />
              <ellipse cx={-size * 0.8} cy={-size * 0.8} rx={size * 0.7} ry={size * 0.3} fill="#10b981" opacity="0.9" transform={`rotate(-35, ${-size * 0.8}, ${-size * 0.8})`} />
              <ellipse cx={size * 0.8} cy={-size * 0.9} rx={size * 0.7} ry={size * 0.3} fill="#059669" opacity="0.9" transform={`rotate(35, ${size * 0.8}, ${-size * 0.9})`} />
              <ellipse cx={0} cy={-size * 1.4} rx={size * 0.5} ry={size * 0.25} fill="#10b981" opacity="0.85" />
            </g>
          );
        })
      )}

      {/* Sensor pole — left */}
      <line x1="220" y1="410" x2="220" y2="344" stroke="#6b7280" strokeWidth="3" />
      <rect x="206" y="334" width="28" height="20" rx="4" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
      <circle cx="220" cy="344" r="4" fill="#059669" />
      <path d="M 206 340 Q 196 336 196 331 Q 196 326 206 322" stroke="#34d399" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
      <path d="M 202 340 Q 188 335 188 330 Q 188 325 202 320" stroke="#34d399" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />

      {/* Sensor pole — right */}
      <line x1="980" y1="410" x2="980" y2="350" stroke="#6b7280" strokeWidth="3" />
      <rect x="966" y="340" width="28" height="20" rx="4" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
      <circle cx="980" cy="350" r="4" fill="#059669" />
      <path d="M 994 346 Q 1004 342 1004 337 Q 1004 332 994 328" stroke="#34d399" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
      <path d="M 998 346 Q 1012 341 1012 336 Q 1012 331 998 326" stroke="#34d399" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />

      {/* Robot arm — left edge */}
      <g transform="translate(80, 390)">
        <rect x="-18" y="0" width="36" height="24" rx="5" fill="#6b7280" />
        <rect x="-7" y="-66" width="14" height="68" rx="5" fill="#9ca3af" />
        <g transform="translate(0, -66) rotate(-28)">
          <rect x="-5" y="-52" width="10" height="54" rx="4" fill="#d1d5db" />
          <g transform="translate(0, -54)">
            <rect x="-10" y="-8" width="9" height="16" rx="2.5" fill="#4b5563" />
            <rect x="1" y="-8" width="9" height="16" rx="2.5" fill="#4b5563" />
          </g>
        </g>
        <circle cx="0" cy="-66" r="8" fill="#6b7280" />
      </g>

      {/* Robot arm — right edge */}
      <g transform="translate(1120, 390) scale(-1,1)">
        <rect x="-18" y="0" width="36" height="24" rx="5" fill="#6b7280" />
        <rect x="-7" y="-66" width="14" height="68" rx="5" fill="#9ca3af" />
        <g transform="translate(0, -66) rotate(-28)">
          <rect x="-5" y="-52" width="10" height="54" rx="4" fill="#d1d5db" />
          <g transform="translate(0, -54)">
            <rect x="-10" y="-8" width="9" height="16" rx="2.5" fill="#4b5563" />
            <rect x="1" y="-8" width="9" height="16" rx="2.5" fill="#4b5563" />
          </g>
        </g>
        <circle cx="0" cy="-66" r="8" fill="#6b7280" />
      </g>

      {/* Drone — center, floating high */}
      <g transform="translate(600, 180)">
        <ellipse cx="0" cy="0" rx="32" ry="16" fill="url(#droneGrad)" stroke="#e2e8f0" strokeWidth="2" />
        <circle cx="0" cy="6" r="8" fill="#334155" />
        <circle cx="0" cy="6" r="5" fill="#1e293b" />
        <circle cx="0" cy="6" r="2" fill="#60a5fa" opacity="0.8" />

        <line x1="-32" y1="0" x2="-60" y2="-16" stroke="#9ca3af" strokeWidth="4" strokeLinecap="round" />
        <line x1="32" y1="0" x2="60" y2="-16" stroke="#9ca3af" strokeWidth="4" strokeLinecap="round" />
        <line x1="-32" y1="0" x2="-60" y2="16" stroke="#9ca3af" strokeWidth="4" strokeLinecap="round" />
        <line x1="32" y1="0" x2="60" y2="16" stroke="#9ca3af" strokeWidth="4" strokeLinecap="round" />

        <ellipse cx="-60" cy="-16" rx="20" ry="5" fill="#94a3b8" opacity="0.55" />
        <ellipse cx="60" cy="-16" rx="20" ry="5" fill="#94a3b8" opacity="0.55" />
        <ellipse cx="-60" cy="16" rx="20" ry="5" fill="#94a3b8" opacity="0.55" />
        <ellipse cx="60" cy="16" rx="20" ry="5" fill="#94a3b8" opacity="0.55" />

        <circle cx="-60" cy="-16" r="4" fill="#6b7280" />
        <circle cx="60" cy="-16" r="4" fill="#6b7280" />
        <circle cx="-60" cy="16" r="4" fill="#6b7280" />
        <circle cx="60" cy="16" r="4" fill="#6b7280" />

        <line x1="0" y1="16" x2="0" y2="70" stroke="#34d399" strokeWidth="2" strokeDasharray="5 4" opacity="0.65" />
        <circle cx="0" cy="76" r="4" fill="#059669" opacity="0.45" />

        <ellipse cx="0" cy="-24" rx="26" ry="8" fill="none" stroke="#34d399" strokeWidth="2" opacity="0.45" />
        <ellipse cx="0" cy="-36" rx="38" ry="11" fill="none" stroke="#34d399" strokeWidth="1.5" opacity="0.28" />
      </g>

      {/* Data lines: drone to sensors */}
      <line x1="537" y1="182" x2="220" y2="348" stroke="#059669" strokeWidth="2" strokeDasharray="6 5" opacity="0.35" />
      <line x1="663" y1="182" x2="980" y2="354" stroke="#059669" strokeWidth="2" strokeDasharray="6 5" opacity="0.35" />

      {/* Clouds — left */}
      <g transform="translate(40, 70)">
        <ellipse cx="70" cy="34" rx="64" ry="26" fill="white" opacity="0.80" />
        <ellipse cx="44" cy="42" rx="40" ry="22" fill="white" opacity="0.80" />
        <ellipse cx="96" cy="42" rx="36" ry="20" fill="white" opacity="0.80" />
      </g>

      {/* Clouds — right */}
      <g transform="translate(1040, 80)">
        <ellipse cx="56" cy="28" rx="52" ry="22" fill="white" opacity="0.72" />
        <ellipse cx="34" cy="34" rx="32" ry="17" fill="white" opacity="0.72" />
        <ellipse cx="78" cy="34" rx="28" ry="15" fill="white" opacity="0.72" />
      </g>

      {/* Cloud — center-left */}
      <g transform="translate(350, 52)">
        <ellipse cx="42" cy="22" rx="38" ry="17" fill="white" opacity="0.65" />
        <ellipse cx="24" cy="28" rx="24" ry="13" fill="white" opacity="0.65" />
        <ellipse cx="60" cy="28" rx="20" ry="11" fill="white" opacity="0.65" />
      </g>

      {/* Cloud — center-right */}
      <g transform="translate(810, 60)">
        <ellipse cx="42" cy="22" rx="40" ry="17" fill="white" opacity="0.62" />
        <ellipse cx="24" cy="28" rx="24" ry="13" fill="white" opacity="0.62" />
        <ellipse cx="60" cy="28" rx="20" ry="11" fill="white" opacity="0.62" />
      </g>

      {/* Birds — left */}
      <path d="M 160 120 Q 168 113 176 120" stroke="#059669" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M 188 106 Q 195 100 202 106" stroke="#059669" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />

      {/* Birds — right */}
      <path d="M 1000 110 Q 1008 103 1016 110" stroke="#059669" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M 1030 124 Q 1036 118 1042 124" stroke="#059669" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />

      {/* Data readout bubble — right side */}
      <rect x="870" y="240" width="130" height="72" rx="10" fill="white" stroke="#a7f3d0" strokeWidth="2" opacity="0.95" />
      <text x="935" y="262" textAnchor="middle" fill="#059669" fontSize="10" fontFamily="sans-serif" fontWeight="bold">センサーデータ</text>
      <text x="935" y="280" textAnchor="middle" fill="#10b981" fontSize="13" fontFamily="sans-serif" fontWeight="bold">温度 24.2°C</text>
      <text x="935" y="298" textAnchor="middle" fill="#6b7280" fontSize="10" fontFamily="sans-serif">湿度 68% / CO₂ 412ppm</text>
      <line x1="870" y1="276" x2="666" y2="198" stroke="#a7f3d0" strokeWidth="2" strokeDasharray="5 4" opacity="0.65" />

      {/* Soil bars — center bottom */}
      <rect x="466" y="510" width="18" height="28" rx="4" fill="#059669" opacity="0.65" />
      <rect x="492" y="498" width="18" height="40" rx="4" fill="#10b981" opacity="0.75" />
      <rect x="518" y="506" width="18" height="32" rx="4" fill="#059669" opacity="0.65" />
      <rect x="544" y="492" width="18" height="46" rx="4" fill="#34d399" opacity="0.80" />
      <rect x="570" y="502" width="18" height="36" rx="4" fill="#059669" opacity="0.70" />
      <rect x="596" y="510" width="18" height="28" rx="4" fill="#059669" opacity="0.65" />
      <rect x="622" y="496" width="18" height="42" rx="4" fill="#10b981" opacity="0.75" />
      <text x="564" y="488" textAnchor="middle" fill="#065f46" fontSize="9" fontFamily="sans-serif" opacity="0.65">土壌センサー</text>
    </svg>
  );
}
