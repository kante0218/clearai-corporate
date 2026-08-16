import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI導入・システム開発の無料相談",
  description: "AI導入、業務システム開発、AI内製化を、戦略整理から実装・運用まで一気通貫で支援します。簡単な質問から無料でご相談いただけます。",
  robots: { index: false, follow: false },
};

export default function AiDevelopmentConsultationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
