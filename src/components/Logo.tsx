import Image from "next/image";

// Intrinsic aspect ratio of the hummingbird mark PNG (public/images/logo-clear-bird.png).
// The artwork is a transparent-background gradient mark, so it reads on both
// the white header and the dark footer without a separate light/dark variant.
const MARK_W = 665;
const MARK_H = 547;

export default function Logo({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/images/logo-clear-bird.png"
      alt="ClearAI"
      width={Math.round((size * MARK_W) / MARK_H)}
      height={size}
      className={className}
      priority
    />
  );
}
