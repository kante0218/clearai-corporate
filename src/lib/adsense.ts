export const ADS_CONSENT_COOKIE = "clearai-advertising-consent";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;
export type AdsConsent = "accepted" | "rejected";

export function validPublisherId(value: string | undefined): string | null {
  return value && /^ca-pub-\d{16}$/.test(value) ? value : null;
}
export function adsTxt(value: string | undefined): string | null {
  const id = validPublisherId(value);
  return id ? `google.com, ${id.slice(3)}, DIRECT, f08c47fec0942fa0\n` : null;
}
export function readAdsConsent(cookies: string): AdsConsent | null {
  const value = cookies.split(";").map(part => part.trim()).find(part => part.startsWith(`${ADS_CONSENT_COOKIE}=`))?.slice(ADS_CONSENT_COOKIE.length + 1);
  return value === "v1:accepted" ? "accepted" : value === "v1:rejected" ? "rejected" : null;
}
export function adsConsentCookie(value: AdsConsent, secure: boolean) {
  return `${ADS_CONSENT_COOKIE}=v1:${value}; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax${secure ? "; Secure" : ""}`;
}
export function canLoadAds(consent: AdsConsent | null, publisherId: string | undefined) {
  return consent === "accepted" && validPublisherId(publisherId) !== null;
}

type AdsQueue = unknown[] & { requestNonPersonalizedAds?: number; pauseAdRequests?: number };
declare global { interface Window { adsbygoogle?: AdsQueue } }

export function enableAds(publisherId: string | undefined) {
  const id = validPublisherId(publisherId);
  if (!id || !canLoadAds(readAdsConsent(document.cookie), id)) return;
  const queue = window.adsbygoogle = window.adsbygoogle || [];
  queue.requestNonPersonalizedAds = 1;
  queue.pauseAdRequests = 0;
  if (document.getElementById("clearai-adsense")) return;
  queue.push({ google_ad_client: id, enable_page_level_ads: true });
  const script = document.createElement("script");
  script.id = "clearai-adsense";
  script.async = true;
  script.crossOrigin = "anonymous";
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${id}`;
  document.head.appendChild(script);
}
export function disableAds() {
  if (window.adsbygoogle) window.adsbygoogle.pauseAdRequests = 1;
  document.getElementById("clearai-adsense")?.remove();
}
