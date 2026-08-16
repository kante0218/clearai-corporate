import type { Metadata } from "next";

const description =
  "ClearAI株式会社（クリアエーアイ）へのご相談から納品・定着までの流れ。無料相談・ヒアリング・要件定義・プロトタイプ・本番開発・運用まで、各ステップで何が起き、どちらが何を用意するのかを事前にご確認いただけます。";

export const metadata: Metadata = {
  title: "ご依頼の流れ｜相談から納品・定着まで",
  description,
  keywords: [
    "AI開発 発注 流れ",
    "システム開発 依頼 流れ",
    "AI導入 進め方",
    "ClearAI 相談",
    "ClearAI",
    "クリアエーアイ",
  ],
  alternates: { canonical: "https://clearai.jp/flow" },
  openGraph: {
    title: "ご依頼の流れ | ClearAI株式会社",
    description,
    url: "https://clearai.jp/flow",
    type: "website",
    locale: "ja_JP",
    siteName: "ClearAI株式会社",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ご依頼の流れ | ClearAI株式会社",
    description,
    images: ["/images/logo.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "ご依頼の流れ", item: "https://clearai.jp/flow" },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "ClearAIへのご依頼の流れ（システム・ソフトウェア開発）",
  description:
    "無料相談から業務ヒアリング、要件定義・お見積り、ご契約、プロトタイプ、本番開発、運用保守までの標準的な進め方。",
  step: [
    { name: "無料相談（30分）", text: "対象業務と現状の課題を伺い、AIで解くべきかどうかも含めてお伝えします。" },
    { name: "業務ヒアリング", text: "実データと業務フローを確認し、対象業務と合格ラインの案を整理します。" },
    { name: "要件定義・お見積り", text: "要件定義書・構成図・概算工数をお出しし、合格ラインをすり合わせます。" },
    { name: "ご契約", text: "成果物の権利、データの取り扱い、体制の継続性を明記して契約します。" },
    { name: "プロトタイプ", text: "最短2週間で動くものを構築し、実データで評価いただきます。" },
    { name: "本番開発・リリース", text: "設計・実装・テスト・データ移行を行い、本番稼働まで担当します。" },
    { name: "運用保守・改善", text: "リリース後の監視・改善・機能追加、社内への引き継ぎ支援を行います。" },
  ].map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.name,
    text: s.text,
  })),
};

export default function FlowLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
    </>
  );
}
