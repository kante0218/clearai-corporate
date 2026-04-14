export default function SkyScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 560"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
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

      {/* Sky background */}
      <rect width="1200" height="560" fill="url(#skyGrad)" />

      {/* Sun — right side, upper area */}
      <ellipse cx="950" cy="140" rx="110" ry="110" fill="url(#sunGlow)" />
      <circle cx="950" cy="140" r="52" fill="url(#sunGrad)" />
      <circle cx="950" cy="140" r="38" fill="#fde68a" />

      {/* Sun rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 950 + Math.cos(rad) * 60;
        const y1 = 140 + Math.sin(rad) * 60;
        const x2 = 950 + Math.cos(rad) * 78;
        const y2 = 140 + Math.sin(rad) * 78;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#fbbf24"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.65"
          />
        );
      })}

      {/* Light rays from sun downward */}
      <line x1="950" y1="192" x2="880" y2="520" stroke="#fde68a" strokeWidth="2" opacity="0.12" />
      <line x1="950" y1="192" x2="970" y2="520" stroke="#fde68a" strokeWidth="2" opacity="0.12" />
      <line x1="950" y1="192" x2="1060" y2="520" stroke="#fde68a" strokeWidth="2" opacity="0.08" />

      {/* Cloud 1 — large, center-left */}
      <g transform="translate(80, 110)">
        <ellipse cx="90" cy="42" rx="82" ry="32" fill="white" opacity="0.95" />
        <ellipse cx="56" cy="52" rx="48" ry="26" fill="white" opacity="0.95" />
        <ellipse cx="124" cy="52" rx="42" ry="24" fill="white" opacity="0.95" />
        <ellipse cx="90" cy="58" rx="76" ry="20" fill="white" opacity="0.95" />
      </g>

      {/* Cloud 2 — medium, upper center */}
      <g transform="translate(480, 60)">
        <ellipse cx="70" cy="34" rx="64" ry="26" fill="white" opacity="0.88" />
        <ellipse cx="44" cy="42" rx="38" ry="20" fill="white" opacity="0.88" />
        <ellipse cx="96" cy="42" rx="34" ry="18" fill="white" opacity="0.88" />
        <ellipse cx="70" cy="48" rx="60" ry="16" fill="white" opacity="0.88" />
      </g>

      {/* Cloud 3 — small, far left */}
      <g transform="translate(0, 60)">
        <ellipse cx="50" cy="28" rx="46" ry="20" fill="white" opacity="0.78" />
        <ellipse cx="30" cy="34" rx="28" ry="16" fill="white" opacity="0.78" />
        <ellipse cx="70" cy="34" rx="24" ry="14" fill="white" opacity="0.78" />
      </g>

      {/* Cloud 4 — wispy, right-mid area */}
      <g transform="translate(1070, 180)">
        <ellipse cx="42" cy="22" rx="38" ry="16" fill="white" opacity="0.72" />
        <ellipse cx="24" cy="28" rx="24" ry="12" fill="white" opacity="0.72" />
        <ellipse cx="60" cy="28" rx="20" ry="11" fill="white" opacity="0.72" />
      </g>

      {/* Cloud 5 — wispy, left-mid */}
      <g transform="translate(30, 240)">
        <ellipse cx="58" cy="18" rx="54" ry="14" fill="white" opacity="0.60" />
        <ellipse cx="32" cy="24" rx="30" ry="11" fill="white" opacity="0.60" />
        <ellipse cx="84" cy="24" rx="28" ry="10" fill="white" opacity="0.60" />
      </g>

      {/* Cloud 6 — far right below sun */}
      <g transform="translate(1080, 290)">
        <ellipse cx="50" cy="20" rx="46" ry="15" fill="white" opacity="0.55" />
        <ellipse cx="28" cy="26" rx="28" ry="11" fill="white" opacity="0.55" />
        <ellipse cx="72" cy="26" rx="24" ry="10" fill="white" opacity="0.55" />
      </g>

      {/* Birds — left cluster */}
      <path d="M 310 190 Q 318 182 326 190" stroke="#60a5fa" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 335 174 Q 344 166 353 174" stroke="#60a5fa" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 378 160 Q 384 154 390 160" stroke="#93c5fd" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Birds — right cluster near sun */}
      <path d="M 750 110 Q 758 103 766 110" stroke="#93c5fd" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 780 98 Q 786 93 792 98" stroke="#93c5fd" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Horizon / rolling hills */}
      <ellipse cx="600" cy="560" rx="800" ry="160" fill="url(#groundGrad)" opacity="0.6" />

      <path
        d="M 0 440 Q 180 380 360 420 Q 520 454 680 400 Q 840 350 1000 410 Q 1100 440 1200 428 L 1200 560 L 0 560 Z"
        fill="#bae6fd"
        opacity="0.52"
      />
      <path
        d="M 0 480 Q 160 448 320 468 Q 500 490 680 458 Q 860 426 1040 470 Q 1120 486 1200 470 L 1200 560 L 0 560 Z"
        fill="#e0f2fe"
        opacity="0.62"
      />

      {/* Distant mountain / city silhouette — spread wide */}
      <path
        d="M 80 462 L 128 418 L 176 462 L 210 432 L 246 462 L 290 424 L 336 462 L 390 435 L 440 462"
        stroke="#93c5fd"
        strokeWidth="2"
        fill="none"
        opacity="0.35"
      />
      <path
        d="M 760 468 L 808 428 L 856 468 L 892 440 L 926 468 L 968 432 L 1008 468 L 1056 440 L 1100 468"
        stroke="#93c5fd"
        strokeWidth="2"
        fill="none"
        opacity="0.28"
      />

      {/* Flag on a hill — center */}
      <line x1="600" y1="420" x2="600" y2="366" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
      <path d="M 600 366 L 634 378 L 600 390 Z" fill="#2563eb" opacity="0.88" />
      <ellipse cx="600" cy="428" rx="40" ry="16" fill="#7dd3fc" opacity="0.45" />

      {/* Sparkle dots — right side near sun */}
      <circle cx="1060" cy="270" r="3" fill="#fbbf24" opacity="0.7" />
      <circle cx="1082" cy="248" r="2" fill="#fbbf24" opacity="0.5" />
      <circle cx="1040" cy="258" r="2" fill="#fbbf24" opacity="0.5" />

      {/* Light beam horizontal band */}
      <rect x="0" y="210" width="1200" height="24" fill="#fef9c3" opacity="0.06" />
    </svg>
  );
}
