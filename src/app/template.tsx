/**
 * ページ遷移トランジション（CSS のみ）。
 * template.tsx はナビゲーションのたびに再マウントされるので、.page-transition の
 * CSS アニメーションが「ページ移動のたび」に再生される。
 * JS 非依存なので SSR/no-JS でもコンテンツは必ず表示され、opacity のみのため
 * 配下の position:fixed 要素の座標基準も壊さない。prefers-reduced-motion は
 * globals.css 側で無効化される。
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-transition">{children}</div>;
}
