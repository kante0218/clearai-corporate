export const CONSENT_COOKIE = "clearai-cookie-consent";
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;
export type CookieConsent = "accepted" | "rejected";

export function readCookieConsent(cookies: string): CookieConsent | null {
  const value = cookies.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${CONSENT_COOKIE}=`))?.slice(CONSENT_COOKIE.length + 1);
  return value === "v1:accepted" ? "accepted" : value === "v1:rejected" ? "rejected" : null;
}

export function consentCookie(value: CookieConsent, secure: boolean): string {
  return `${CONSENT_COOKIE}=v1:${value}; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax${secure ? "; Secure" : ""}`;
}

export function validMeasurementId(value: string | undefined): string | null {
  return value && /^G-[A-Z0-9]{5,20}$/.test(value) && !/^G-(?:X+|0+|PLACEHOLDER|YOUR.*|TEST.*)$/.test(value) ? value : null;
}

export function canLoadAnalytics(consent: CookieConsent | null, id: string | undefined): boolean {
  return consent === "accepted" && validMeasurementId(id) !== null;
}

declare global {
interface Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  [key: `ga-disable-${string}`]: boolean | undefined;
}
}

export function isAnalyticsPage(pathname: string): boolean {
  return !/^\/robot-rental\/apply(?:\/|$)/.test(pathname);
}

export function sanitizedAnalyticsUrl(value: string): string {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? `${url.origin}${url.pathname}` : "";
  } catch {
    return "";
  }
}

export function trackPageView(id: string | undefined): void {
  if (!isAnalyticsPage(window.location.pathname) || !canLoadAnalytics(readCookieConsent(document.cookie), id)) return;
  window.gtag?.("config", id, {
    send_page_view: false,
    page_location: sanitizedAnalyticsUrl(window.location.href),
    page_referrer: sanitizedAnalyticsUrl(document.referrer),
  });
  window.gtag?.("event", "page_view", {
    page_location: sanitizedAnalyticsUrl(window.location.href),
    page_referrer: sanitizedAnalyticsUrl(document.referrer),
  });
}

export function enableAnalytics(id: string | undefined): void {
  if (!isAnalyticsPage(window.location.pathname) || !canLoadAnalytics(readCookieConsent(document.cookie), id)) return;
  if (document.getElementById("clearai-analytics")) return;
  const analytics = window;
  analytics[`ga-disable-${id}`] = false;
  analytics.dataLayer = analytics.dataLayer || [];
  analytics.gtag = function () { analytics.dataLayer!.push(arguments); };
  analytics.gtag("consent", "default", {
    analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
  });
  analytics.gtag("js", new Date());
  analytics.gtag("config", id, {
    allow_google_signals: false, allow_ad_personalization_signals: false,
    cookie_expires: CONSENT_MAX_AGE, cookie_update: false, send_page_view: false,
    page_location: sanitizedAnalyticsUrl(window.location.href),
    page_referrer: sanitizedAnalyticsUrl(document.referrer),
  });
  const script = document.createElement("script");
  script.id = "clearai-analytics";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);
}

export function disableAnalytics(id: string | undefined): void {
  const analytics = window;
  if (validMeasurementId(id)) analytics[`ga-disable-${id}`] = true;
  analytics.gtag?.("consent", "update", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  document.getElementById("clearai-analytics")?.remove();
  // Remove only Analytics cookies; rental identity and consent cookies remain intact.
  const domains = window.location.hostname.split(".").map((_, index, parts) => parts.slice(index).join("."));
  for (const part of document.cookie.split(";")) {
    const name = part.trim().split("=")[0];
    if (!/^_ga(?:_|$)|^_gid$|^_gat(?:_|$)/.test(name)) continue;
    const expired = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
    document.cookie = expired;
    for (const domain of domains) document.cookie = `${expired}; Domain=${domain}`;
  }
}

export function reconcileAnalyticsConsent(id: string | undefined): CookieConsent | null {
  const consent = readCookieConsent(document.cookie);
  if (consent !== "accepted" || !isAnalyticsPage(window.location.pathname)) {
    const wasLoaded = Boolean(document.getElementById("clearai-analytics"));
    disableAnalytics(id);
    if (wasLoaded) window.location.reload();
  }
  return consent;
}
