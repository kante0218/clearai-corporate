"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getBlogs } from "@/lib/microcms";

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
    desc: "clearAI株式会社（読み方：クリアエーアイ）の全ページ一覧です。目的のページへ素早くアクセスしてください。",
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
          { label: "ロボットレンタル", href: "/robot-rental" },
        ],
      },
      {
        title: "農業×エンジニアリング事業",
        links: [
          { label: "農業×エンジニアリング", href: "/ai-agriculture" },
          { label: "農業分野のお問い合わせ", href: "/contact?service=agriculture" },
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
    desc: "A full list of pages on clearAI Inc. Jump to the page you need.",
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
          { label: "Robot Rental", href: "/robot-rental" },
        ],
      },
      {
        title: "Agriculture × Engineering",
        links: [
          { label: "Agriculture × Engineering", href: "/ai-agriculture" },
          { label: "Agriculture inquiry", href: "/contact?service=agriculture" },
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

      <section className="max-w-5xl mx-auto px-6 lg:px-10 pt-40 pb-24">
        <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-4">
          {t.label}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
          {t.title}
        </h1>
        <p className="text-base text-gray-600 leading-relaxed mb-16 max-w-2xl">
          {t.desc}
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {t.sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      → {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {posts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
              {t.blogHeading}
            </h2>
            <ul className="space-y-3">
              {posts.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/blog/${p.id}`}
                    className="text-sm text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    → {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-20 pt-10 border-t border-gray-200 text-sm text-gray-500">
          <p>
            {t.xmlNoteA}{" "}
            <a
              href="/sitemap.xml"
              className="text-blue-600 hover:text-blue-700 underline"
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
