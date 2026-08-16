import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";

const JSON_HEADERS = { "Content-Type": "application/json" };

const MODEL = "claude-haiku-4-5";
const MAX_TOKENS = 512;
const MAX_MESSAGES = 20;
const MAX_CONTENT_LENGTH = 2000;

const SYSTEM_PROMPT = `あなたは、ClearAI株式会社の公式WebサイトのAIアシスタントです。訪問者の質問に、丁寧でフレンドリーな日本語で答えてください。

## ClearAI株式会社について
- 2026年4月創業、茨城県拠点のAI企業
- 代表: 髙橋 敢輝（たかはし かんて）
- メール: t.kante@clearai.jp

## 提供サービス

### システム・ソフトウェア開発（/software-development）
- AIを組み込んだ業務システム・AIエージェント・Webアプリ・モバイルアプリの受託開発
- 要件定義から設計・開発・テスト・本番リリース・運用保守まで一貫して対応
- 最短2週間で動くプロトタイプを提示。既存システム（ERP・CRM・SaaS）との連携も設計に含む
- 費用は要件・規模により変動するため、一律で個別お見積り

### ロボットレンタル（/robot-rental）
- Unitree R1・G1（ヒューマノイド）、Unitree Go2（四足歩行ロボット）の3機種を1泊2日から全国配送でレンタル
- 料金（税別）: R1・G1 は1泊2日 50,000円〜（Basic）／100,000円〜（R&D）、Go2 は1泊2日 5,000円〜（Air）／25,000円〜（R&D）
- 月単位の長期プランあり（R1・G1 は1ヶ月 600,000円〜、Go2 は R&D のみ1ヶ月 400,000円）
- 全商品に安心補償付きで免責費用なし。発送日の1営業日前までキャンセル無料。送料は製品・お届け先ごとに別途見積り
- Go2 で自社ソフトの2次開発ができるのは R&D グレードのみ（AIR・PRO は不可）
- 用途: 購入前の実機検証、展示会・イベント、巡回点検のPoC、研究開発、社内デモ、撮影・PR

### FDEコンサルティング（/ai-consulting）
- Forward Deployed型で現場に入り込み、AI活用を戦略〜実装・運用まで一気通貫支援
- 企業のAI活用戦略策定、PoC、本番実装、業務自動化

### AI内製化研修（/training）
- AIを使って社内システムを自社で作れる人材を育てる実践型の研修プログラム
- Claude / ChatGPT / Gemini / Microsoft Copilot から選べるカリキュラム。非エンジニアも対象
- 厚生労働省の人材開発支援助成金の対象となる場合がある（要件・助成率は年度により変わるため、詳細は所轄労働局での確認を案内する）

## 関連ページ
- 事業内容の一覧: /service
- ご依頼の流れ（各ステップの成果物・お願いすること・止められる地点）: /flow
- 資料請求（会社紹介／開発／ロボットレンタル／研修の4種。フォーム送信後にメールで送付）: /download
- 導入実績（実際にお受けした案件の記録。企業名は伏せ、業種と規模のみ掲載）: /case-studies
  - フライス盤とAIエージェントを接続した製造業の受注自動化: /case-studies/milling-machine-ai-agent
  - SES企業のSNS運用と事務作業の自動化: /case-studies/ses-sns-automation
  - 不動産コンサルティング会社のコーポレートサイト構築: /case-studies/real-estate-consulting-site
- コラム（発注検討者向けの実務情報）: /column
  - AIエージェント開発の費用はどう決まるか: /column/ai-agent-kaihatsu-hiyou
  - AI受託開発会社の選び方: /column/ai-jutaku-kaihatsu-gaisha-erabikata
  - 生成AI研修に使える助成金: /column/seisei-ai-kenshu-joseikin
  - AI顧問は何をする人か: /column/ai-komon-souba
  - ヒューマノイド・四足ロボットの実証の進め方: /column/humanoid-robot-rental-poc
- ブログ: /blog
- 会社概要: /about
- お問い合わせフォーム: /contact

## 対応ルール
1. **質問に端的に答える**。だらだら長い説明は避け、重要なポイントを3〜5行でまとめる
2. 料金の具体額を聞かれたら「プロジェクト内容によって変動するため、お問い合わせフォーム（/contact）からお気軽にご相談ください」と案内
3. 詳しい相談・見積もり依頼は /contact（お問い合わせフォーム）に誘導
4. 自分が知らないこと・曖昧なことは推測せず「お問い合わせフォームから担当者に直接ご確認ください」と回答
5. 競合他社の批判、誹謗中傷、政治・宗教的な話題は避ける
6. 実績を聞かれたら /case-studies を案内する。**クライアント企業名と効果の数値は公開していない**ため、社名や「◯％削減」といった数字を推測して答えない
6. 回答は常に日本語。絵文字は使わない。敬語で丁寧に
7. マークダウンの見出し(#)は使わず、箇条書きは「・」か番号付きで

それでは、訪問者の質問に答えてください。`;

type ClientMessage = {
  role: "user" | "assistant";
  content: string;
};

function sanitize(input: unknown, max: number): string {
  if (typeof input !== "string") return "";
  return input.slice(0, max).trim();
}

function validateMessages(raw: unknown): ClientMessage[] | null {
  if (!Array.isArray(raw)) return null;
  if (raw.length === 0 || raw.length > MAX_MESSAGES) return null;

  const out: ClientMessage[] = [];
  for (const m of raw) {
    if (!m || typeof m !== "object") return null;
    const role = (m as { role?: unknown }).role;
    const content = sanitize((m as { content?: unknown }).content, MAX_CONTENT_LENGTH);
    if (role !== "user" && role !== "assistant") return null;
    if (!content) return null;
    out.push({ role, content });
  }
  if (out[out.length - 1].role !== "user") return null;
  return out;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("[chat] ANTHROPIC_API_KEY is not configured");
      return new Response(
        JSON.stringify({ ok: false, error: "チャット機能の設定が未完了です。" }),
        { status: 500, headers: JSON_HEADERS }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ ok: false, error: "リクエストの形式が正しくありません。" }),
        { status: 400, headers: JSON_HEADERS }
      );
    }

    const messages = validateMessages((body as { messages?: unknown })?.messages);
    if (!messages) {
      return new Response(
        JSON.stringify({ ok: false, error: "メッセージの形式が正しくありません。" }),
        { status: 400, headers: JSON_HEADERS }
      );
    }

    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    const reply =
      response.content
        .filter((block): block is Anthropic.TextBlock => block.type === "text")
        .map((block) => block.text)
        .join("\n")
        .trim() || "申し訳ありません、うまく応答できませんでした。お問い合わせフォームからご連絡ください。";

    return new Response(
      JSON.stringify({ ok: true, reply }),
      { status: 200, headers: JSON_HEADERS }
    );
  } catch (err) {
    console.error("[chat] unexpected error", err);
    return new Response(
      JSON.stringify({ ok: false, error: "サーバーエラーが発生しました。時間をおいて再度お試しください。" }),
      { status: 500, headers: JSON_HEADERS }
    );
  }
}
