const description =
  "ClearAI株式会社（クリアエーアイ）のAI内製化研修。AIを使って社内システムを自社で作れる人材を育てる実践型プログラム。Claude / ChatGPT / Gemini / Microsoft Copilot から選べるカリキュラムで、非エンジニアでも研修中に動く社内ツールが完成します。人材開発支援助成金の活用を見据え、訓練実施機関として必要な添付資料を提供します。";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI内製化研修",
  provider: {
    "@type": "Organization",
    name: "ClearAI株式会社",
    url: "https://clearai.jp",
  },
  areaServed: { "@type": "Country", name: "日本" },
  name: "AI内製化研修",
  description,
  url: "https://clearai.jp/training",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "AI内製化研修", item: "https://clearai.jp/training" },
  ],
};

export default function TrainingOverviewSchema() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}
