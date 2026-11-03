import styles from "./AdvertiseTrialSlot.module.css";

const ADVERTISE_ORIGIN = "https://advertise.clearai.jp";
const SLOT_ID = "clearai-home-trial";

export default function AdvertiseTrialSlot({ english = false }: { english?: boolean }) {
  return <section id="advertise-trial" className={styles.section} aria-label={english ? "Sponsor advertisement — trial placement" : "スポンサー広告・試験掲載"}>
    <iframe
      className={styles.frame}
      src={`${ADVERTISE_ORIGIN}/api/advertise/embed/${SLOT_ID}?showSupport=1${english ? "&lang=en" : ""}`}
      title={english ? "ClearAI sponsor advertisement" : "ClearAIのスポンサー広告枠"}
      loading="lazy"
      referrerPolicy="no-referrer"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
      allow="camera 'none'; microphone 'none'; geolocation 'none'; payment 'none'; clipboard-read 'none'; clipboard-write 'none'"
    />
    <noscript><a href="/contact?service=advertise&amp;slot=clearai-home-trial">{english ? "Ask about sponsorship" : "広告掲載について問い合わせる"}</a></noscript>
  </section>;
}
