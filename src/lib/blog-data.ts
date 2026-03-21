export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  thumbnail: string;
}

export const categories = ["すべて", "AI活用", "テクノロジー", "導入事例", "お知らせ"];

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-interview-future-2026",
    title: "AI面接が変える採用の未来 ― 2026年の最新トレンド",
    excerpt: "AI技術の急速な進化により、採用プロセスは大きく変わりつつあります。企業と求職者の双方にメリットをもたらすAI面接の最新動向を解説します。",
    content: `AI面接技術は2026年に入り、飛躍的な進化を遂げています。従来の採用プロセスでは、書類選考から最終面接まで平均して4〜6週間を要していましたが、AI面接の導入により、このプロセスを大幅に短縮することが可能になっています。

## AI面接の3つの進化ポイント

### 1. 自然言語処理の高度化
最新のAIモデルは、候補者の回答内容だけでなく、論理的思考力や問題解決能力を高精度で評価できるようになりました。

### 2. バイアスの排除
人間の面接官が無意識に持つバイアスを排除し、公平な評価を実現します。

### 3. データドリブンな意思決定
面接結果を定量化し、採用チーム全体で客観的な判断が可能になります。

## 導入企業の声

すでに多くの企業がAI面接を導入し、採用効率の向上と候補者体験の改善を実感しています。clear AIの「導（みちびき）」は、日本市場に特化したAI面接プラットフォームとして、200社以上の企業に導入されています。`,
    category: "AI活用",
    date: "2026-03-15",
    readTime: "5分",
    author: "clear AI編集部",
    thumbnail: "#3b82f6",
  },
  {
    slug: "enterprise-ai-implementation-guide",
    title: "企業のAI導入完全ガイド ― 失敗しないための5つのステップ",
    excerpt: "AI導入を検討する企業が増える中、成功と失敗を分ける要因は何か。数十社の導入支援実績から見えた、確実に成果を出すための方法論を公開。",
    content: `企業のAI導入は、もはや「するかしないか」ではなく「いつ、どのように導入するか」のフェーズに入っています。

## ステップ1: 課題の明確化
AI導入の第一歩は、解決すべきビジネス課題を明確にすることです。

## ステップ2: データの棚卸し
AIの精度はデータの質に直結します。既存データの状態を把握しましょう。

## ステップ3: スモールスタート
いきなり全社展開するのではなく、特定の部署やプロセスから始めることが重要です。

## ステップ4: 効果測定
KPIを設定し、導入効果を定量的に測定します。

## ステップ5: スケーリング
成果が確認できたら、段階的に適用範囲を拡大していきます。`,
    category: "AI活用",
    date: "2026-03-10",
    readTime: "8分",
    author: "clear AI編集部",
    thumbnail: "#8b5cf6",
  },
  {
    slug: "case-study-techforward",
    title: "導入事例：株式会社テックフォワード ― 採用コスト70%削減の軌跡",
    excerpt: "従来の採用プロセスに課題を抱えていたテックフォワード社が、clear AIのソリューション導入で劇的な改善を達成した事例をご紹介。",
    content: `株式会社テックフォワードは、年間100名以上のエンジニアを採用する成長企業です。

## 導入前の課題
- 採用コストが年間5,000万円を超えていた
- 面接官の工数が膨大で、コア業務に集中できない
- 選考基準にバラつきがあり、ミスマッチが頻発

## clear AIソリューションの導入
「導（みちびき）」のAI面接とAI導入支援を組み合わせた包括的なソリューションを導入。

## 成果
- 採用コスト70%削減（年間3,500万円の削減）
- 面接工数50%削減
- 入社後1年以内の離職率が15%→5%に改善`,
    category: "導入事例",
    date: "2026-03-05",
    readTime: "6分",
    author: "clear AI編集部",
    thumbnail: "#10b981",
  },
  {
    slug: "chatgpt-business-use-cases",
    title: "ChatGPT・生成AIの企業活用 ― 成功事例から学ぶ実践ガイド",
    excerpt: "生成AIを業務に活用する企業が急増中。カスタマーサポート、文書作成、データ分析など、具体的な活用シーンと成果を紹介します。",
    content: `生成AIの企業活用は、2025年後半から加速度的に広がっています。

## 活用シーン1: カスタマーサポート
AIチャットボットの導入で、問い合わせ対応の70%を自動化。

## 活用シーン2: 文書作成の効率化
契約書、レポート、メールのドラフト作成をAIが支援。

## 活用シーン3: データ分析
大量のデータから瞬時にインサイトを抽出。

clear AIでは、これらの活用シーンに応じたAI導入支援を提供しています。`,
    category: "テクノロジー",
    date: "2026-02-28",
    readTime: "7分",
    author: "clear AI編集部",
    thumbnail: "#f59e0b",
  },
  {
    slug: "clearai-series-a-announcement",
    title: "clear AI、シリーズA資金調達を完了 ― AI面接と企業AI導入の二軸で事業拡大へ",
    excerpt: "clear AI株式会社は、AI面接プラットフォーム「導」と企業向けAI導入支援の二軸で事業拡大を加速します。",
    content: `clear AI株式会社は、事業拡大に向けた新たなフェーズに入りました。

## 2つの事業領域

### 導（みちびき）
AI面接プラットフォームとして、求職者と企業のマッチング精度を飛躍的に向上させます。

### AI導入支援
企業のAI活用を包括的にサポート。戦略策定から実装、運用まで一貫して支援します。

## 今後の展望
2026年度中に導入企業500社を目指し、AI技術の民主化を推進していきます。`,
    category: "お知らせ",
    date: "2026-02-20",
    readTime: "3分",
    author: "clear AI広報",
    thumbnail: "#ef4444",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  if (category === "すべて") return blogPosts;
  return blogPosts.filter((post) => post.category === category);
}
