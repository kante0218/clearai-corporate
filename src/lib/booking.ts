/**
 * Scheduling link for a meeting with the founder (髙橋 敢輝).
 *
 * All "相談する / ミーティングを予約する" CTAs point here rather than at the contact
 * form, so a prospect picks a slot instead of waiting on a reply. The contact form
 * stays for document requests (`/contact?doc=`) and general email enquiries.
 *
 * Verified 2026-08-08: resolves to "髙橋敢輝 | TimeRex".
 */
export const BOOKING_URL = "https://timerex.net/s/t.kante_dce9/1e5913f8";

/** Props to spread onto an <a> so the booking page opens in a new tab safely. */
export const BOOKING_LINK_PROPS = {
  href: BOOKING_URL,
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
