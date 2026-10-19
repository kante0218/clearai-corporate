"use client";

import { useRef, useState } from "react";
import styles from "./AgentTrainingPage.module.css";

type Lesson = { title: string; description: string; topics: readonly string[]; output: string };

export default function TrainingCurriculumTabs({ lessons, toolName }: { lessons: readonly Lesson[]; toolName: string }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const lesson = lessons[active];

  return (
    <div className={styles.curriculumBox}>
      <div className={styles.tabs} role="tablist" aria-label="研修カリキュラム">
        {lessons.map((item, index) => (
          <button key={item.title} ref={(element) => { tabs.current[index] = element; }} type="button" role="tab" id={`lesson-tab-${index}`} aria-selected={active === index} aria-controls="lesson-panel" tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => {
            let next = index;
            if (event.key === "ArrowRight") next = (index + 1) % lessons.length;
            else if (event.key === "ArrowLeft") next = (index - 1 + lessons.length) % lessons.length;
            else if (event.key === "Home") next = 0;
            else if (event.key === "End") next = lessons.length - 1;
            else return;
            event.preventDefault();
            setActive(next);
            tabs.current[next]?.focus();
          }}>
            <span>{index === 0 ? "受講前" : `第${index}回`}</span>
            <strong>{index === 0 ? "事前準備" : ["基本操作", "業務で実践", "チーム活用", "実務課題"][index - 1]}</strong>
          </button>
        ))}
      </div>
      <div className={styles.lessonPanel} role="tabpanel" id="lesson-panel" aria-labelledby={`lesson-tab-${active}`} tabIndex={0}>
        <div>
          <p className={styles.lessonLabel}>{active === 0 ? "安心して始めるために" : `${toolName} 実践プログラム`}</p>
          <h3>{lesson.title}</h3>
          <p>{lesson.description}</p>
          <ul className={styles.checkList}>{lesson.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
        </div>
        <div className={styles.lessonPreview}>
          <div className={styles.previewBar}><i /><i /><i /><span>演習・成果物のイメージ</span></div>
          <div className={styles.previewPaper}>
            <span className={styles.documentIcon} aria-hidden="true">≡</span>
            <strong>{lesson.output}</strong>
            <div className={styles.paperLines}><i /><i /><i /></div>
            <p><span>確認する</span><span>修正する</span><span>共有する</span></p>
          </div>
          <p className={styles.previewNote}>学んだことを、持ち帰れる形に。</p>
        </div>
      </div>
    </div>
  );
}
