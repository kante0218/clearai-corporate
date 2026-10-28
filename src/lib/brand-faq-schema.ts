/**
 * Brand-level FAQ structured data.
 *
 * Emitted only from the homepage: a FAQPage repeated on every URL competes with
 * the per-article FAQPage that /column/[slug] declares for its own questions.
 */
export const brandFaqSchema =  {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://clearai.jp/#brand-faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "ClearAI株式会社の読み方は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "「クリアエーアイ」と読みます。英語表記は ClearAI Inc. で、「クリアAI」「クリア・エーアイ」「クリアーエーアイ」などの表記でも呼ばれます。",
      },
    },
    {
      "@type": "Question",
      "name": "ClearAI（クリアエーアイ）は何をしている会社ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ClearAI株式会社は、日本の中小企業向けにAIの受託開発と導入支援を行うAI企業です。システム・ソフトウェア開発、ロボットレンタル、AIO（AI検索最適化）、Codex研修、ホームページ制作、SNS運用代行を提供しています。AIOではAI検索で企業情報が正しく理解・参照されるための現状確認、改善、継続的な測定を支援します。AI回答での引用や掲載、検索順位、売上を保証するものではありません。",
      },
    },
    {
      "@type": "Question",
      "name": "ClearAI（クリアエーアイ）はどこにありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "茨城県に本社を置く日本のAI企業で、2026年4月に設立されました。代表取締役は髙橋 敢輝。お問い合わせは info@clearai.jp まで。",
      },
    },
    {
      "@type": "Question",
      "name": "社名「ClearAI」の由来は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "「clear（明確な・クリアな）」と「AI」を組み合わせた造語です。難解なAI技術を分かりやすく・誠実に、現場に根ざした形で届けるという理念を社名に込めています。",
      },
    },
    {
      "@type": "Question",
      "name": "中小企業や個人事業主でもAI導入の相談はできますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい。ClearAIは中小企業・個人事業主のAI導入支援を中心に据えています。小さく試すための短期の伴走支援から、業務システムの受託開発、社内で作れる人材を育てるCodex研修まで、規模と段階に合わせた選択肢があります。研修費用については、厚生労働省の人材開発支援助成金の対象となる場合があります。初回相談は無料、メール・オンライン面談にて全国対応しています。",
      },
    },
    {
      "@type": "Question",
      "name": "ClearAIの対応エリアはどこですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "本社は茨城県ですが、オンラインを基本として日本全国に対応しています。開発・コンサルティング・研修のいずれも、リモートでの実施を前提に設計されているため、所在地による制約はありません。必要に応じて訪問も行います。",
      },
    },
    {
      "@type": "Question",
      "name": "ClearAIはどんな技術に対応していますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "生成AIはClaude（Anthropic）、OpenAI、Gemini を中心に、業務要件に応じて選定します。開発言語・フレームワークは、Web が Next.js / React / TypeScript、バックエンドが Python / Node.js / Go、Mac・iOS アプリは Swift（SwiftUI）、インフラは AWS / Google Cloud / Vercel / Docker に対応しています。既存の基幹システム・SFA・グループウェアとの連携も行います。",
      },
    },
    {
      "@type": "Question",
      "name": "ClearAIに相談する際、要件が固まっていなくても大丈夫ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "問題ありません。むしろ「何を自動化すべきか」を決める段階からのご相談が最も多く、対象業務の見極めと合格ラインの定義を一緒に行うところから支援しています。現状の業務にかかっている時間と人数が分かれば、実現可否と進め方の方向性をお伝えできます。初回のご相談は無料です。",
      },
    },
  ],
};
