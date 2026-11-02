"use client";

import { useEffect, useRef } from "react";
import styles from "./AdvertiseTrialSlot.module.css";

const ADVERTISE_ORIGIN = "https://clearai-meo-dashboard.clearryusei.workers.dev";
const SLOT_ID = "clearai-home-trial";

export default function AdvertiseTrialSlot({ english = false }: { english?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!host.current) return;
    // The widget may move its mount; keep movable DOM outside React's ownership.
    const mount = document.createElement("section");
    mount.dataset.advertiseSlot = SLOT_ID;
    mount.className = styles.section;
    mount.setAttribute("aria-label", english ? "Sponsor advertisement — trial placement" : "スポンサー広告・試験掲載");
    const frame = document.createElement("iframe");
    frame.dataset.advertiseFrame = "";
    frame.className = styles.frame;
    frame.src = `${ADVERTISE_ORIGIN}/api/advertise/embed/${SLOT_ID}`;
    frame.title = english ? "ClearAI sponsor advertisement" : "ClearAIのスポンサー広告枠";
    frame.loading = "lazy";
    frame.referrerPolicy = "no-referrer";
    frame.setAttribute("sandbox", "allow-popups allow-popups-to-escape-sandbox");
    mount.appendChild(frame);
    host.current.appendChild(mount);
    const script = document.createElement("script");
    script.src = `${ADVERTISE_ORIGIN}/api/advertise/widget/${SLOT_ID}.js`;
    script.async = true;
    host.current.appendChild(script);
    return () => {
      mount.dispatchEvent(new Event("advertise:destroy"));
      mount.remove();
      script.remove();
    };
  }, [english]);
  return <div id="advertise-trial" ref={host}><noscript><a href="/contact?service=advertise&amp;slot=clearai-home-trial">{english ? "Ask about sponsorship" : "広告掲載について問い合わせる"}</a></noscript></div>;
}
