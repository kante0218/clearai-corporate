import Image from "next/image";

// Intrinsic aspect ratio of the brand mark PNG (public/images/logo-mark*.png)
const MARK_W = 743;
const MARK_H = 866;

export default function Logo({
  size = 32,
  className = "",
  white = false,
}: {
  size?: number;
  className?: string;
  white?: boolean;
}) {
  return (
    <Image
      src={white ? "/images/logo-mark-white.png" : "/images/logo-mark.png"}
      alt="clearAI"
      width={Math.round((size * MARK_W) / MARK_H)}
      height={size}
      className={className}
      priority
    />
  );
}
