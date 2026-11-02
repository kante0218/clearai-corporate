import styles from "./AdvertiseTrialSlot.module.css";

const EMBED_URL = "https://clearai-meo-dashboard.clearryusei.workers.dev/api/advertise/embed/clearai-home-trial";

export default function AdvertiseTrialSlot({ english = false }: { english?: boolean }) {
  return (
    <section id="advertise-trial" className={styles.section} aria-label={english ? "Sponsor advertisement — trial placement" : "スポンサー広告・試験掲載"}>
      <div className={styles.container}>
        <div className={styles.caption}><span>{english ? "Sponsor advertisement · Trial" : "スポンサー広告・試験掲載"}</span><span>Advertise</span></div>
        <iframe className={styles.frame} src={EMBED_URL} title={english ? "ClearAI sponsor advertisement" : "ClearAIのスポンサー広告枠"} loading="lazy" referrerPolicy="no-referrer" sandbox="allow-popups allow-popups-to-escape-sandbox" />
        <a className={styles.contact} href="/contact?service=advertise&slot=clearai-home-trial">{english ? "Ask about advertising here" : "広告掲載について問い合わせる"}</a>
      </div>
    </section>
  );
}
