export default function AgricultureScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 400"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
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
        <linearGradient id="soilGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a7f3d0" />
          <stop offset="100%" stopColor="#6ee7b7" />
        </linearGradient>
        <linearGradient id="droneGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="500" height="400" fill="url(#agSky)" rx="16" />

      {/* Distant hills */}
      <path
        d="M 0 240 Q 80 200 160 230 Q 240 255 320 220 Q 400 190 500 225 L 500 400 L 0 400 Z"
        fill="#bbf7d0"
        opacity="0.6"
      />
      <path
        d="M 0 270 Q 100 245 200 262 Q 300 278 400 255 Q 450 246 500 260 L 500 400 L 0 400 Z"
        fill="#a7f3d0"
        opacity="0.7"
      />

      {/* Field rows - perspective crop rows */}
      <g>
        {/* Row background */}
        <path d="M 60 400 L 100 290 L 400 290 L 440 400 Z" fill="#6ee7b7" opacity="0.5" />

        {/* Individual furrow rows */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const x1 = 60 + i * 55;
          const x2 = 100 + i * 46;
          return (
            <line
              key={i}
              x1={x1}
              y1={400}
              x2={x2}
              y2={290}
              stroke="#34d399"
              strokeWidth={i === 3 ? 3 : 2}
              opacity={0.4 + i * 0.04}
            />
          );
        })}

        {/* Crop plants along rows */}
        {[0, 1, 2, 3, 4, 5].map((col) =>
          [0, 1, 2, 3].map((row) => {
            const baseX = 80 + col * 55;
            const baseY = 390 - row * 26;
            const shrink = row * 0.12;
            const x = baseX + (baseX > 250 ? shrink * 30 : -shrink * 30);
            const y = baseY;
            const size = 9 - row * 1.5;
            return (
              <g key={`${col}-${row}`} transform={`translate(${x}, ${y})`}>
                {/* Stem */}
                <line x1={0} y1={0} x2={0} y2={-size * 1.4} stroke="#059669" strokeWidth="1.5" />
                {/* Leaves */}
                <ellipse cx={-size * 0.8} cy={-size * 0.8} rx={size * 0.7} ry={size * 0.3} fill="#10b981" opacity="0.9" transform={`rotate(-35, ${-size * 0.8}, ${-size * 0.8})`} />
                <ellipse cx={size * 0.8} cy={-size * 0.9} rx={size * 0.7} ry={size * 0.3} fill="#059669" opacity="0.9" transform={`rotate(35, ${size * 0.8}, ${-size * 0.9})`} />
                {/* Top leaf */}
                <ellipse cx={0} cy={-size * 1.4} rx={size * 0.5} ry={size * 0.25} fill="#10b981" opacity="0.85" />
              </g>
            );
          })
        )}
      </g>

      {/* Sensor pole 1 */}
      <line x1="155" y1="305" x2="155" y2="260" stroke="#6b7280" strokeWidth="2.5" />
      <rect x="145" y="252" width="20" height="14" rx="3" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
      <circle cx="155" cy="259" r="3" fill="#059669" />
      {/* Sensor signal waves */}
      <path d="M 145 255 Q 138 252 138 248 Q 138 244 145 241" stroke="#34d399" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.8" />
      <path d="M 142 255 Q 132 251 132 247 Q 132 243 142 239" stroke="#34d399" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5" />

      {/* Sensor pole 2 */}
      <line x1="345" y1="305" x2="345" y2="265" stroke="#6b7280" strokeWidth="2.5" />
      <rect x="335" y="257" width="20" height="14" rx="3" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
      <circle cx="345" cy="264" r="3" fill="#059669" />
      <path d="M 355 260 Q 362 257 362 253 Q 362 249 355 246" stroke="#34d399" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.8" />
      <path d="M 358 260 Q 368 256 368 252 Q 368 248 358 244" stroke="#34d399" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5" />

      {/* Robot arm / harvester arm */}
      <g transform="translate(60, 285)">
        {/* Base */}
        <rect x="-14" y="0" width="28" height="18" rx="4" fill="#6b7280" />
        {/* Arm segment 1 */}
        <rect x="-5" y="-50" width="10" height="52" rx="4" fill="#9ca3af" />
        {/* Arm segment 2 - angled */}
        <g transform="translate(0, -50) rotate(-25)">
          <rect x="-4" y="-40" width="8" height="42" rx="3" fill="#d1d5db" />
          {/* Gripper */}
          <g transform="translate(0, -42)">
            <rect x="-8" y="-6" width="7" height="12" rx="2" fill="#4b5563" />
            <rect x="1" y="-6" width="7" height="12" rx="2" fill="#4b5563" />
          </g>
        </g>
        {/* Joint circle */}
        <circle cx="0" cy="-50" r="6" fill="#6b7280" />
      </g>

      {/* Drone body */}
      <g transform="translate(250, 130)">
        {/* Central body */}
        <ellipse cx="0" cy="0" rx="22" ry="12" fill="url(#droneGrad)" stroke="#e2e8f0" strokeWidth="1.5" />
        {/* Camera */}
        <circle cx="0" cy="4" r="6" fill="#334155" />
        <circle cx="0" cy="4" r="3.5" fill="#1e293b" />
        <circle cx="0" cy="4" r="1.5" fill="#60a5fa" opacity="0.8" />

        {/* Arms */}
        <line x1="-22" y1="0" x2="-42" y2="-12" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round" />
        <line x1="22" y1="0" x2="42" y2="-12" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round" />
        <line x1="-22" y1="0" x2="-42" y2="12" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round" />
        <line x1="22" y1="0" x2="42" y2="12" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round" />

        {/* Rotors */}
        <ellipse cx="-42" cy="-12" rx="14" ry="4" fill="#94a3b8" opacity="0.6" />
        <ellipse cx="42" cy="-12" rx="14" ry="4" fill="#94a3b8" opacity="0.6" />
        <ellipse cx="-42" cy="12" rx="14" ry="4" fill="#94a3b8" opacity="0.6" />
        <ellipse cx="42" cy="12" rx="14" ry="4" fill="#94a3b8" opacity="0.6" />

        {/* Rotor centers */}
        <circle cx="-42" cy="-12" r="3" fill="#6b7280" />
        <circle cx="42" cy="-12" r="3" fill="#6b7280" />
        <circle cx="-42" cy="12" r="3" fill="#6b7280" />
        <circle cx="42" cy="12" r="3" fill="#6b7280" />

        {/* Spray/scan line from drone */}
        <line x1="0" y1="12" x2="0" y2="50" stroke="#34d399" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />
        <circle cx="0" cy="55" r="3" fill="#059669" opacity="0.5" />

        {/* Signal rings above drone */}
        <ellipse cx="0" cy="-18" rx="18" ry="6" fill="none" stroke="#34d399" strokeWidth="1.5" opacity="0.5" />
        <ellipse cx="0" cy="-26" rx="26" ry="8" fill="none" stroke="#34d399" strokeWidth="1" opacity="0.3" />
      </g>

      {/* Data connection lines: drone to sensors */}
      <line x1="207" y1="132" x2="155" y2="265" stroke="#059669" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.4" />
      <line x1="293" y1="132" x2="345" y2="268" stroke="#059669" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.4" />

      {/* Clouds - lighter, earthy toned */}
      <g transform="translate(30, 60)">
        <ellipse cx="50" cy="25" rx="46" ry="19" fill="white" opacity="0.8" />
        <ellipse cx="32" cy="30" rx="28" ry="16" fill="white" opacity="0.8" />
        <ellipse cx="68" cy="30" rx="26" ry="15" fill="white" opacity="0.8" />
      </g>

      <g transform="translate(360, 80)">
        <ellipse cx="38" cy="20" rx="36" ry="16" fill="white" opacity="0.7" />
        <ellipse cx="22" cy="24" rx="22" ry="12" fill="white" opacity="0.7" />
        <ellipse cx="54" cy="24" rx="20" ry="11" fill="white" opacity="0.7" />
      </g>

      {/* Small cloud */}
      <g transform="translate(170, 50)">
        <ellipse cx="28" cy="16" rx="26" ry="12" fill="white" opacity="0.6" />
        <ellipse cx="16" cy="20" rx="16" ry="9" fill="white" opacity="0.6" />
        <ellipse cx="40" cy="20" rx="14" ry="8" fill="white" opacity="0.6" />
      </g>

      {/* Bird 1 */}
      <path d="M 400 100 Q 406 94 412 100" stroke="#059669" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
      {/* Bird 2 */}
      <path d="M 420 112 Q 425 107 430 112" stroke="#059669" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />

      {/* Data readout bubble */}
      <rect x="380" y="190" width="96" height="52" rx="8" fill="white" stroke="#a7f3d0" strokeWidth="1.5" opacity="0.95" />
      <text x="428" y="208" textAnchor="middle" fill="#059669" fontSize="8" fontFamily="sans-serif" fontWeight="bold">センサーデータ</text>
      <text x="428" y="222" textAnchor="middle" fill="#10b981" fontSize="10" fontFamily="sans-serif" fontWeight="bold">温度 24.2°C</text>
      <text x="428" y="234" textAnchor="middle" fill="#6b7280" fontSize="8" fontFamily="sans-serif">湿度 68% / CO₂ 412ppm</text>
      {/* Arrow from bubble to drone */}
      <line x1="380" y1="215" x2="300" y2="155" stroke="#a7f3d0" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />

      {/* Soil moisture indicators at base of field */}
      <rect x="195" y="365" width="14" height="20" rx="3" fill="#059669" opacity="0.7" />
      <rect x="215" y="358" width="14" height="27" rx="3" fill="#10b981" opacity="0.8" />
      <rect x="235" y="363" width="14" height="22" rx="3" fill="#059669" opacity="0.7" />
      <rect x="255" y="355" width="14" height="30" rx="3" fill="#34d399" opacity="0.85" />
      <rect x="275" y="361" width="14" height="24" rx="3" fill="#059669" opacity="0.75" />
      <text x="250" y="350" textAnchor="middle" fill="#065f46" fontSize="7" fontFamily="sans-serif" opacity="0.7">土壌センサー</text>
    </svg>
  );
}
