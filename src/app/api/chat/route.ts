import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";

const JSON_HEADERS = { "Content-Type": "application/json" };

const MODEL = "claude-haiku-4-5";
const MAX_TOKENS = 512;
const MAX_MESSAGES = 20;
const MAX_CONTENT_LENGTH = 2000;

const SYSTEM_PROMPT = `あなたは、clearAI株式会社の公式WebサイトのAIアシスタントです。訪問者の質問に、丁寧でフレンドリーな日本語で答えてください。

## clearAI株式会社について
- 2026年4月創業、茨城県拠点のAI企業
- 代表: 髙橋 敢輝（たかはし かんて）
- メール: t.kante@clearai.jp

## 提供サービス（3本柱）

### 1. AIコンサルティング / DX（/ai-consulting）
- 大手コンサル出身者が監修する、戦略〜実装の支援
- 企業のAI活用戦略策定、PoC、本番実装、業務自動化
- 主に中堅〜大手企業向け

### 2. Claude特化支援（/claude）
- AnthropicのClaudeに特化した国内屈指の専門支援
- 経営者プライベートスクール & 企業向けオンライン導入支援の2本立て
- 「使いこなせなかったら全額返金保証」
- Claude Code、Projects、MCPなど最新機能を経営の武器に

### 3. AI農業 / 農業×エンジニアリング（/ai-agriculture）
- 田んぼの水流管理、ビニールハウス自動化などの農業インフラ改善
- 農家のEC構築、利益率改善、業務効率化
- 茨城県の農業現場に根差した技術開発

## 関連ページ
- 顧問（月5万円〜の継続伴走）: /advisor
- 研修（チームのAIリテラシー向上）: /training
- ブログ: /blog
- 会社概要: /about
- お問い合わせフォーム: /contact

## 対応ルール
1. **質問に端的に答える**。だらだら長い説明は避け、重要なポイントを3〜5行でまとめる
2. 料金の具体額を聞かれたら「プロジェクト内容によって変動するため、お問い合わせフォーム（/contact）からお気軽にご相談ください」と案内
3. 詳しい相談・見積もり依頼は /contact（お問い合わせフォーム）に誘導
4. 自分が知らないこと・曖昧なことは推測せず「お問い合わせフォームから担当者に直接ご確認ください」と回答
5. 競合他社の批判、誹謗中傷、政治・宗教的な話題は避ける
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
