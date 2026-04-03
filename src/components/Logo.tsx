export default function Logo({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 8-pointed star made of overlapping rhombus shapes */}
      {/* Dark blue petals */}
      <path d="M60 10 L72 48 L60 60 L48 48 Z" fill="#1e56a0" />
      <path d="M60 110 L48 72 L60 60 L72 72 Z" fill="#1e56a0" />
      <path d="M10 60 L48 48 L60 60 L48 72 Z" fill="#2b6cb0" />
      <path d="M110 60 L72 72 L60 60 L72 48 Z" fill="#2b6cb0" />
      {/* Cyan/lighter petals */}
      <path d="M25 25 L48 48 L60 60 L48 48 L25 25Z" fill="none" />
      <path d="M22 22 L52 46 L60 60 L46 52 Z" fill="#2591c5" />
      <path d="M98 22 L68 46 L60 60 L74 52 Z" fill="#22b8cf" />
      <path d="M22 98 L46 68 L60 60 L52 74 Z" fill="#22b8cf" />
      <path d="M98 98 L74 68 L60 60 L68 74 Z" fill="#2591c5" />
      {/* Center white star cutout */}
      <circle cx="60" cy="60" r="8" fill="white" />
    </svg>
  );
}
