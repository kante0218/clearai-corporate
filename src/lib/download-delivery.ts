import { DOCUMENT_KEYS, DOCUMENT_LABELS, type DocumentKey } from "./validators";

export const DOCUMENT_FILES: Record<DocumentKey, string> = {
  "robot-rental": "robot-rental-guide.pdf",
  aio: "aio-guide.pdf",
  "website-production": "website-production-guide.pdf",
  "sns-management": "sns-management-guide.pdf",
  meo: "meo-guide.pdf",
};
export const DOCUMENT_ZIP = "clearai-guides-current.zip";

/** Pure delivery content shared by the response and receipt; never sends email. */
export function buildDownloadDelivery(requested: readonly string[]) {
  const documents = [...new Set(requested.filter((key): key is DocumentKey =>
    (DOCUMENT_KEYS as readonly string[]).includes(key)))];
  if (!documents.length) return null;
  const files = documents.map(key => ({ key, title: DOCUMENT_LABELS[key], url: `https://clearai.jp/downloads/${DOCUMENT_FILES[key]}` }));
  const all = documents.length === DOCUMENT_KEYS.length;
  const zipUrl = all ? `https://clearai.jp/downloads/${DOCUMENT_ZIP}` : null;
  const downloadUrl = zipUrl ?? files[0].url;
  const title = all ? `事業紹介資料 ${DOCUMENT_KEYS.length}点セット` : files.map(file => file.title).join("／");
  const text = `${title}をご請求いただきありがとうございます。\n\n以下のURLから資料をご覧ください。\n` +
    (zipUrl ? `${DOCUMENT_KEYS.length}資料まとめて：${zipUrl}\n` : "") +
    files.map(file => `${file.title}：${file.url}`).join("\n") +
    "\n\nご不明点がございましたら info@clearai.jp までご連絡ください。";
  const html = '<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;max-width:600px;margin:0 auto;padding:32px;color:#171717">' +
    '<p style="font-size:14px;line-height:1.8">資料をご請求いただきありがとうございます。</p>' +
    (zipUrl ? `<p style="margin:24px 0"><a href="${zipUrl}" style="display:inline-block;background:#171717;color:#fff;text-decoration:none;padding:14px 22px;border-radius:999px;font-size:14px;font-weight:600">${DOCUMENT_KEYS.length}資料をまとめてダウンロード</a></p>` : "") +
    '<ul style="font-size:14px;line-height:2;padding-left:18px">' +
    files.map(file => `<li><a href="${file.url}" style="color:#171717">${file.title}</a></li>`).join("") +
    '</ul><p style="margin-top:28px;font-size:12px;color:#737373">ClearAI株式会社</p></div>';
  return { documents, files, zipUrl, downloadUrl, title, text, html };
}
