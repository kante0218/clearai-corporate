"use client";

import { unstable_ViewTransition as ViewTransition } from "react";

/**
 * ページ遷移トランジション（View Transitions API・実験的）。
 * next.config の experimental.viewTransition を有効化した上で、ページ内容を
 * <ViewTransition> でラップすると、ナビゲーションのたびに旧→新のスナップショットが
 * ブラウザの View Transitions API で滑らかにクロスフェードする。
 * template.tsx は遷移ごとに再マウントされるため、これがページ移動の演出になる。
 * 未対応ブラウザでは即時遷移（グレースフルデグラデーション）。
 * 見た目の時間調整は globals.css の ::view-transition-* で行う。
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <ViewTransition>{children}</ViewTransition>;
}
