"use client";

import { useId } from "react";
import styles from "./SuccessCheck.module.css";

export default function SuccessCheck() {
  const gradientId = useId();
  return <svg className={styles.successIcon} viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
    <defs><linearGradient id={gradientId} x1="5" y1="32" x2="59" y2="32" gradientUnits="userSpaceOnUse"><stop stopColor="#e35aaf" /><stop offset="0.5" stopColor="#e053dd" /><stop offset="1" stopColor="#ae5df5" /></linearGradient></defs>
    <circle className={styles.circle} cx="32" cy="32" r="27" pathLength="1" stroke={`url(#${gradientId})`} strokeWidth="3" />
    <path className={styles.check} d="M19 33l9 9 18-20" pathLength="1" stroke={`url(#${gradientId})`} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}
