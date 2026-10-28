"use client";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const notices = {
  en: { original: "Articles and published case-study details are shown in their original Japanese. Navigation and forms follow your language choice.", legal: "This legal document is shown in Japanese. No Chinese or Korean legal translation is provided.", files: "Downloadable PDFs, ZIP contents, sample files and automated emails remain in Japanese." },
  "zh-CN": { original: "文章和已发布案例详情保留日语原文。导航和表单使用您选择的语言。", legal: "本法律文件显示日语原文。目前不提供中文或韩文法律译文。", files: "下载的PDF、ZIP内容、示例文件及自动回复邮件仍为日语。" },
  ko: { original: "기사와 공개 사례 상세 내용은 일본어 원문으로 표시됩니다. 메뉴와 양식은 선택한 언어로 표시됩니다.", legal: "이 법적 문서는 일본어 원문으로 표시됩니다. 중국어·한국어 법률 번역은 제공하지 않습니다.", files: "다운로드 PDF, ZIP 내용, 샘플 파일 및 자동 회신 메일은 일본어로 제공됩니다." },
};
export default function LanguageScopeNotice() {
  const { locale } = useLanguage();
  const path = usePathname();
  if (locale === "ja") return null;
  const kind = ["/privacy", "/terms"].includes(path) && locale !== "en" ? "legal" : /^\/(blog|column|case-studies)(\/|$)/.test(path) ? "original" : path === "/download" ? "files" : null;
  if (!kind) return null;
  return <aside className="language-scope-note" lang={locale}>{notices[locale][kind]}</aside>;
}
