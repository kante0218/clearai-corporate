"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import Script from "next/script";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getBlogs } from "@/lib/microcms";

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function SectionHead({
  index,
  kicker,
  title,
  desc,
  dark = false,
}: {
  index: string;
  kicker: ReactNode;
  title: ReactNode;
  desc?: ReactNode;
  dark?: boolean;
}) {
  return (
    <Reveal className="mb-12 lg:mb-16 max-w-3xl">
      <div className={`flex items-center gap-4 border-b pb-4 ${dark ? "border-white/25" : "border-neutral-900"}`}>
        <span className={`font-mono text-xs font-bold tabular-nums ${dark ? "text-white" : "text-neutral-900"}`}>§{index}</span>
        <span className={`font-mono text-[11px] font-medium uppercase tracking-[0.25em] ${dark ? "text-neutral-400" : "text-neutral-500"}`}>{kicker}</span>
      </div>
      <h2 className={`mt-8 text-[18px] sm:text-xl lg:text-2xl font-bold leading-[1.15] sm:leading-[1.05] tracking-[-0.02em] text-balance whitespace-pre-line ${dark ? "text-white" : "text-neutral-900"}`}>
        {title}
      </h2>
      {desc && <p className={`mt-6 text-[15px] leading-relaxed text-pretty ${dark ? "text-neutral-400" : "text-neutral-600"}`}>{desc}</p>}
    </Reveal>
  );
}

type Copy = {
  label: string;
  title: string;
  desc: string;
  sections: { title: string; links: { label: string; href: string }[] }[];
  blogHeading: string;
  xmlNoteA: string;
  xmlNoteB: string;
};

const COPY: Record<"ja" | "en", Copy> = {
  ja: {
    label: "Sitemap",
    title: "サイトマップ",
    desc: "clearAI株式会社（クリアエーアイ）の全ページ一覧から、目的のページへ素早くアクセスできます。",
    sections: [
      {
        title: "会社情報",
        links: [
          { label: "ホーム", href: "/" },
          { label: "会社概要（clearAI / クリアエーアイ）", href: "/about" },
          { label: "よくあるご質問", href: "/faq" },
          { label: "お問い合わせ", href: "/contact" },
          { label: "お知らせ・ブログ", href: "/blog" },
        ],
      },
      {
        title: "AI事業",
        links: [
          { label: "AIコンサルティング", href: "/ai-consulting" },
          { label: "AI顧問", href: "/advisor" },
          { label: "AI研修", href: "/training" },
          { label: "補助金・助成金サポート", href: "/subsidy" },
          { label: "Claude特化", href: "/claude" },
          { label: "AI広告運用", href: "/advertising" },
          { label: "ウェブサイト作成", href: "/website" },
          { label: "SNS運用代行", href: "/sns" },
          { label: "ロボットレンタル", href: "/robot-rental" },
          { label: "研究開発", href: "/research" },
        ],
      },
      {
        title: "その他",
        links: [
          { label: "プライバシーポリシー", href: "/privacy" },
          { label: "利用規約", href: "/terms" },
        ],
      },
    ],
    blogHeading: "ブログ記事",
    xmlNoteA: "XMLサイトマップは",
    xmlNoteB: "にあります（検索エンジン向け）。",
  },
  en: {
    label: "Sitemap",
    title: "Sitemap",
    desc: "A full list of clearAI Inc. pages — jump directly to what you need.",
    sections: [
      {
        title: "Company",
        links: [
          { label: "Home", href: "/" },
          { label: "About clearAI Inc.", href: "/about" },
          { label: "FAQ", href: "/faq" },
          { label: "Contact", href: "/contact" },
          { label: "News & Blog", href: "/blog" },
        ],
      },
      {
        title: "AI Business",
        links: [
          { label: "AI Consulting", href: "/ai-consulting" },
          { label: "AI Advisor", href: "/advisor" },
          { label: "AI Training", href: "/training" },
          { label: "Subsidy Support", href: "/subsidy" },
          { label: "Claude Specialized", href: "/claude" },
          { label: "AI Advertising", href: "/advertising" },
          { label: "Website Production", href: "/website" },
          { label: "SNS Management", href: "/sns" },
          { label: "Robot Rental", href: "/robot-rental" },
          { label: "Research & Development", href: "/research" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
        ],
      },
    ],
    blogHeading: "Blog posts",
    xmlNoteA: "XML sitemap is at ",
    xmlNoteB: " (for search engines).",
  },
};

type BlogItem = { id: string; title: string };

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://clearai.jp" },
    { "@type": "ListItem", position: 2, name: "サイトマップ", item: "https://clearai.jp/sitemap-page" },
  ],
};

export default function HtmlSitemapPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  const [posts, setPosts] = useState<BlogItem[]>([]);

  useEffect(() => {
    getBlogs()
      .then(({ contents }) => {
        setPosts(contents.map((p) => ({ id: p.id, title: p.title })));
      })
      .catch(() => {
        setPosts([]);
      });
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Script
        id="schema-breadcrumb-sitemap"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ─── 00. MASTHEAD ────────────────────────────────────────────────── */}
      <section className="max-w-[1800px] mx-auto px-6 lg:px-8 pt-40 pb-16 lg:pb-24">
        <Reveal>
          <div className="flex items-center gap-4 border-b border-neutral-900 pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
            <span className="font-bold text-neutral-900">§00</span>
            <span>{t.label}</span>
            <span className="ml-auto tabular-nums text-neutral-400">
              {String(t.sections.length).padStart(2, "0")} / INDEX
            </span>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-10 text-[7vw] sm:text-3xl lg:text-4xl font-bold leading-[0.95] tracking-[-0.04em] text-balance text-neutral-900">
            {t.title}
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-pretty text-neutral-600">
            {t.desc}
          </p>
        </Reveal>
      </section>

      {/* ─── LINK INDEX (per-category mono lists) ────────────────────────── */}
      <section className="max-w-[1800px] mx-auto px-6 lg:px-8 pb-8">
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
          {t.sections.map((section, si) => (
            <div key={section.title}>
              <Reveal>
                <div className="flex items-center gap-4 border-b border-neutral-900 pb-4">
                  <span className="font-mono text-xs font-bold tabular-nums text-neutral-900">
                    §{String(si + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-500">
                    {section.title}
                  </span>
                  <span className="ml-auto font-mono text-[10px] tabular-nums text-neutral-400">
                    {String(section.links.length).padStart(2, "0")}
                  </span>
                </div>
              </Reveal>
              <div className="border-t border-neutral-900">
                {section.links.map((link, li) => (
                  <Reveal key={link.href} delay={li * 40}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-4 border-b border-neutral-200 py-4 transition-colors duration-200 hover:bg-neutral-50"
                    >
                      <span className="font-mono text-[10px] tabular-nums text-neutral-400 group-hover:text-neutral-900">
                        {String(li + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[15px] text-neutral-900 group-hover:underline underline-offset-4 decoration-neutral-900">
                        {link.label}
                      </span>
                      <span className="ml-auto font-mono text-neutral-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-neutral-900">
                        →
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── BLOG INDEX ──────────────────────────────────────────────────── */}
      {posts.length > 0 && (
        <section className="max-w-[1800px] mx-auto px-6 lg:px-8 pt-16 pb-8">
          <Reveal>
            <div className="flex items-center gap-4 border-b border-neutral-900 pb-4">
              <span className="font-mono text-xs font-bold tabular-nums text-neutral-900">
                §{String(t.sections.length + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-500">
                {t.blogHeading}
              </span>
              <span className="ml-auto font-mono text-[10px] tabular-nums text-neutral-400">
                {String(posts.length).padStart(2, "0")}
              </span>
            </div>
          </Reveal>
          <div className="border-t border-neutral-900">
            {posts.map((p, i) => (
              <Reveal key={p.id} delay={i * 30}>
                <Link
                  href={`/blog/${p.id}`}
                  className="group flex items-center gap-4 border-b border-neutral-200 py-4 transition-colors duration-200 hover:bg-neutral-50"
                >
                  <span className="font-mono text-[10px] tabular-nums text-neutral-400 group-hover:text-neutral-900">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] text-neutral-900 group-hover:underline underline-offset-4 decoration-neutral-900">
                    {p.title}
                  </span>
                  <span className="ml-auto font-mono text-neutral-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-neutral-900">
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ─── XML NOTE ────────────────────────────────────────────────────── */}
      <section className="max-w-[1800px] mx-auto px-6 lg:px-8 pt-12 pb-28">
        <div className="border-t border-neutral-900 pt-6 font-mono text-[13px] text-neutral-500">
          <p>
            {t.xmlNoteA}{" "}
            <a
              href="/sitemap.xml"
              className="text-neutral-900 underline underline-offset-4 decoration-neutral-400 transition-colors hover:decoration-neutral-900"
            >
              /sitemap.xml
            </a>{" "}
            {t.xmlNoteB}
          </p>
        </div>
      </section>
    </main>
  );
}
