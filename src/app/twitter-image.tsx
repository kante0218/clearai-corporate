import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "clearAI株式会社（クリアエーアイ）| 中小企業向けAI導入支援を7領域でワンストップ";

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #1f2937 60%, #000000 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#ffffff",
            }}
          />
          <span
            style={{
              fontSize: 22,
              letterSpacing: 6,
              color: "#9ca3af",
              textTransform: "uppercase",
            }}
          >
            clearAI Inc. / クリアエーアイ
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            AIで、すべてを
            <br />
            クリアにする。
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#cbd5e1",
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            中小企業向けAI導入支援を7領域でワンストップ
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "#94a3b8",
          }}
        >
          <div style={{ display: "flex", gap: 28 }}>
            <span>AIコンサル</span>
            <span>AI顧問</span>
            <span>AI研修</span>
            <span>Claude特化</span>
            <span>補助金</span>
          </div>
          <div style={{ fontWeight: 700, color: "#e2e8f0" }}>clearai.jp</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
