// microCMS blog seeder - run after API creation
// Usage: node scripts/seed-blogs.mjs

const SERVICE_DOMAIN = "clearai2026";
const API_KEY = "U2C6sdlZnA2sTUzt5QhYWSTCHH1yIxdqrhja";
const ENDPOINT = "blogs";

const posts = [
  {
    id: "company-founding-2026",
    title: "clear AI株式会社を設立しました",
    excerpt: "2026年4月、AIコンサルティングと農業×エンジニアリングの2事業を柱に、clear AI株式会社を茨城県にて設立いたしました。",
    content: `<h2>設立のご挨拶</h2><p>このたび、2026年4月にclear AI株式会社を設立いたしました。</p><p>当社は「AIで、すべてをクリアにする。」をミッションに掲げ、<strong>AIコンサルティング事業</strong>と<strong>農業×エンジニアリング事業</strong>の2つの事業を展開してまいります。</p><h2>事業概要</h2><h3>AIコンサルティング事業</h3><p>企業のAI戦略策定から実装・運用まで、一気通貫で伴走するコンサルティングサービスを提供します。「AIを導入したいが何から始めればいいかわからない」という企業様に寄り添い、確実に成果を出すAI活用を支援します。</p><h3>農業×エンジニアリング事業</h3><p>エンジニアの力で農家の経営を支援します。ECサイト構築による直販体制の確立、データに基づく利益率改善、業務効率化まで、農家の「稼ぐ力」を総合的にサポートします。</p><p>今後とも、よろしくお願いいたします。</p>`,
    category: "お知らせ",
    author: "clear AI株式会社",
    readTime: "3分",
  },
  {
    id: "ai-consulting-service-launch",
    title: "AIコンサルティングサービスの提供を開始しました",
    excerpt: "企業のAI戦略策定から実装・運用まで一気通貫で支援するAIコンサルティングサービスの提供を開始いたしました。",
    content: `<h2>サービス開始のお知らせ</h2><p>clear AI株式会社は、企業向けAIコンサルティングサービスの提供を開始いたしました。</p><h2>サービスの特徴</h2><h3>1. 課題ドリブンなアプローチ</h3><p>流行の技術を押し付けるのではなく、貴社の業務課題から逆算してAIを選定します。ROIを試算し、優先度の高い領域から着手する実行可能な計画を立案します。</p><h3>2. ベンダーニュートラル</h3><p>特定のAIベンダーに縛られることなく、OpenAI・Anthropic・Google・オープンソースを横断的に比較・選定します。</p><h3>3. 実装まで一気通貫</h3><p>戦略提案だけで終わらせません。PoCから本番稼働、運用定着まで、エンジニアチームが伴走します。</p><h2>ご相談について</h2><p>「何から始めればいいかわからない」でも大丈夫です。まずはお気軽にお問い合わせください。</p>`,
    category: "お知らせ",
    author: "clear AI株式会社",
    readTime: "4分",
  },
  {
    id: "agriculture-engineering-launch",
    title: "農業×エンジニアリング事業を開始 ― EC構築で農家の直販を支援",
    excerpt: "エンジニアの力で農家の経営を支える「農業×エンジニアリング事業」を開始。EC構築・利益率改善・業務効率化をワンストップで提供します。",
    content: `<h2>農業×エンジニアリング事業のご紹介</h2><p>clear AI株式会社は、農家の経営をエンジニアリングの力で支援する「農業×エンジニアリング事業」を開始いたしました。</p><h2>なぜ農業にエンジニアリングが必要なのか</h2><p>日本の農業は、良いものを作っても利益が残らないという構造的な課題を抱えています。JA や卸を経由する従来の流通では、生産者の手取りは小売価格の20〜30%程度にとどまります。</p><p>一方で、ECサイトを通じた直販であれば、中間マージンを大幅に削減し、利益率を飛躍的に向上させることが可能です。</p><h2>提供するサービス</h2><ul><li><strong>EC・ネット販売構築</strong>：Shopifyなどを活用した農家専用ECサイトの企画・構築・運用支援</li><li><strong>利益率改善コンサルティング</strong>：原価構造の分析から販路の最適化まで</li><li><strong>業務効率化・DX支援</strong>：受発注管理、在庫管理、顧客管理のシステム導入</li><li><strong>ブランディング支援</strong>：産地・生産者のストーリーを活かしたブランド構築</li></ul>`,
    category: "お知らせ",
    author: "clear AI株式会社",
    readTime: "5分",
  },
  {
    id: "generative-ai-business-guide-2026",
    title: "中小企業のための生成AI活用ガイド ― 2026年版",
    excerpt: "ChatGPTやClaudeなどの生成AIを中小企業の業務にどう活かすか。導入の第一歩から具体的な活用事例まで解説します。",
    content: `<h2>生成AIは中小企業にこそ効く</h2><p>「生成AIは大企業のもの」と思われがちですが、実は中小企業こそ導入効果が大きい技術です。限られた人員で多くの業務をこなす中小企業にとって、AIによる業務効率化は即効性のある経営改善策となります。</p><h2>すぐに始められる3つの活用法</h2><h3>1. カスタマーサポートの自動化</h3><p>よくある問い合わせへの回答を生成AIに任せることで、対応工数を50%以上削減できます。24時間対応も実現し、顧客満足度の向上にも貢献します。</p><h3>2. 社内ナレッジの検索・活用</h3><p>社内マニュアルや過去の提案書を生成AIと連携させることで、「あの資料どこだっけ？」を解消。新入社員のオンボーディング時間も大幅に短縮できます。</p><h3>3. マーケティングコンテンツの作成</h3><p>ブログ記事、SNS投稿、メールマガジンの下書きをAIが作成。人間が最終チェック・編集することで、コンテンツ制作の速度を3倍以上に引き上げられます。</p><h2>導入を成功させるポイント</h2><p>まずは小さく始めること。全社導入を目指すのではなく、1つの業務、1つの部署から。効果を実感してから横展開するのが、中小企業における生成AI導入の鉄則です。</p>`,
    category: "AI活用",
    author: "clear AI株式会社",
    readTime: "6分",
  },
  {
    id: "ec-direct-sales-agriculture",
    title: "農家のEC直販が利益率を変える ― 始め方と成功のポイント",
    excerpt: "農産物のEC直販を始めるための具体的なステップと、成功している農家に共通するポイントを解説します。",
    content: `<h2>なぜ今、農家にEC直販なのか</h2><p>農産物の流通は大きな転換期を迎えています。消費者の「生産者から直接買いたい」というニーズは年々高まり、コロナ禍以降、食品のEC市場は急速に拡大しました。</p><p>従来の卸売市場経由では、生産者の手取りは小売価格の20〜30%程度。一方、EC直販であれば70〜80%の利益率を実現できます。</p><h2>EC直販の始め方</h2><h3>ステップ1：プラットフォーム選定</h3><p>Shopify、BASEなど、初期費用を抑えて始められるプラットフォームを選びましょう。月額費用、決済手数料、カスタマイズ性を比較して、自分の規模に合ったものを選ぶことが重要です。</p><h3>ステップ2：商品設計</h3><p>単品売りだけでなく、セット販売や定期便（サブスクリプション）を組み合わせることで、客単価とリピート率を高められます。</p><h3>ステップ3：集客の仕組み化</h3><p>Instagram等のSNSでの発信、生産過程のストーリー共有が効果的です。「顔が見える農業」は消費者の信頼を得る最強のマーケティングです。</p><h2>成功のポイント</h2><p>最も大切なのは「続けること」。最初の売上は小さくても、SNSでのファンづくりとリピーター育成を地道に続けることで、安定した直販チャネルが構築できます。</p>`,
    category: "導入事例",
    author: "clear AI株式会社",
    readTime: "5分",
  },
];

async function createPost(post) {
  const url = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/${ENDPOINT}`;
  const body = {
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    author: post.author,
    readTime: post.readTime,
  };

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-MICROCMS-API-KEY": API_KEY,
    },
    body: JSON.stringify({ id: post.id, ...body }),
  });

  if (!res.ok) {
    // Try POST with content ID in URL instead
    const res2 = await fetch(`${url}/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-MICROCMS-API-KEY": API_KEY,
      },
      body: JSON.stringify(body),
    });
    if (!res2.ok) {
      const text = await res2.text();
      console.error(`FAIL [${res2.status}] ${post.id}: ${text}`);
      return;
    }
  }

  console.log(`OK ${post.id}`);
}

async function main() {
  console.log("Seeding blogs to microCMS...");
  console.log(`Domain: ${SERVICE_DOMAIN}, Endpoint: ${ENDPOINT}`);
  console.log("---");

  for (const post of posts) {
    await createPost(post);
  }

  console.log("---");
  console.log("Done! Verifying...");

  const res = await fetch(
    `https://${SERVICE_DOMAIN}.microcms.io/api/v1/${ENDPOINT}?limit=10`,
    { headers: { "X-MICROCMS-API-KEY": API_KEY } }
  );
  const data = await res.json();
  console.log(`Total posts: ${data.totalCount ?? 0}`);
  if (data.contents) {
    data.contents.forEach((p) => console.log(`  - ${p.title}`));
  }
}

main().catch(console.error);
