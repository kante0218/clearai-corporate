"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

type Section = {
  title: string;
  body: string;
  bullets?: string[];
  extra?: string;
};

type Copy = {
  label: string;
  title: string;
  sections: Section[];
  date: string;
};

const COPY: Record<"ja" | "en", Copy> = {
  ja: {
    label: "Privacy Policy",
    title: "プライバシーポリシー",
    sections: [
      {
        title: "1. 個人情報の取り扱いについて",
        body: "ClearAI株式会社（以下「当社」）は、お客様の個人情報を適切に保護し、取り扱うことが社会的責務であると考え、以下の方針に基づき個人情報の保護に努めます。",
      },
      {
        title: "2. 個人情報の収集",
        body: "当社は、サービスの提供にあたり、お客様の同意のもと、お名前、メールアドレス、電話番号、会社名、配送先、利用目的等の個人情報を収集することがあります。ロボットレンタルの本人確認では、Stripe Identityを通じて本人確認書類、顔写真および確認結果を取り扱います。本人確認書類と顔写真の画像は当社のサーバーには保存しません。",
      },
      {
        title: "3. 個人情報の利用目的",
        body: "収集した個人情報は、以下の目的で利用いたします。",
        bullets: [
          "サービスの提供・運営",
          "お問い合わせへの対応",
          "サービスの改善・新サービスの開発",
          "お客様への重要なお知らせの連絡",
          "ロボットレンタルの本人確認、審査、契約、請求および不正利用防止",
        ],
      },
      {
        title: "4. 個人情報の第三者提供",
        body: "当社は、法令に基づく場合を除き、お客様の同意なく第三者に個人情報を提供することはありません。",
      },
      {
        title: "5. 外部サービスへの取り扱いの委託",
        body: "当社は、本人確認および決済・請求のためStripe, Inc.およびその関連会社が提供するStripe Identity・Stripe Billing等を利用します。これらのサービスへ提供された情報は、Stripeのプライバシーポリシーおよびサービス条件に従って取り扱われます。当社は本人確認結果を受領し、申込審査・契約管理に必要な範囲で利用します。",
      },
      {
        title: "6. 個人情報の管理",
        body: "当社は、個人情報の漏洩、滅失またはき損の防止のために、適切なセキュリティ対策を講じます。",
      },
      {
        title: "7. Cookie・アクセス解析",
        body: "当サイトでは、Cookie設定の選択を180日間保存するファーストパーティCookieを使用します。ロボットレンタルの本人確認に必要なCookieは、サービス提供のために使用します。アクセス解析は、許可した方に限り、Google Analyticsの設定が有効な場合に実行します。閲覧したページ、端末・ブラウザ情報などがGoogleへ送信され、サイト改善のために処理されます。Googleシグナルは使用しません。広告はGoogle AdSenseの設定・審査が完了した場合に限り、アクセス解析とは別の「広告Cookieを許可」で同意した方へ配信します。広告の選択は180日間保存し、記事ページの「広告の設定を変更」から変更できます。Googleは広告の配信・不正利用防止等にCookieを使用します。閲覧履歴に基づく広告はリクエストしません。Google AnalyticsのCookieの有効期間は180日です。フッターの「Cookie設定」からいつでも拒否・許可を変更でき、拒否すると以降の計測を停止し、このサイトのAnalytics Cookieを削除します。記事のいいねの重複防止には署名した匿名IDのCookie（最長1年）、コメントの連続投稿防止には短期Cookieを使用します。投稿者名と本文は内容確認後に公開し、匿名IDのハッシュとともにmicroCMSに保存します。連続操作を抑えるためIPアドレスをハッシュ化して一時的に処理し、生のIPはこの機能の保存先へ記録しません。記事の閲覧履歴はおすすめ表示のため最大50件をブラウザ内に保存し、サーバーへ送信しません。言語設定はブラウザのローカルストレージに保存します。",
      },
      {
        title: "8. お問い合わせ",
        body: "個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください。",
        extra: "ClearAI株式会社\nメール: info@clearai.jp",
      },
    ],
    date: "制定日: 2025年1月1日 / 最終改定日: 2026年10月25日",
  },
  en: {
    label: "Privacy Policy",
    title: "Privacy Policy",
    sections: [
      {
        title: "1. Handling of personal information",
        body: 'ClearAI Inc. ("the Company") regards the proper protection and handling of personal information as a social responsibility, and will endeavor to protect personal information based on the policy below.',
      },
      {
        title: "2. Collection of personal information",
        body: "In providing services, the Company may collect personal information such as name, email address, phone number, company name, delivery address, and intended use with the customer's consent. For robot-rental identity checks, identification documents, facial images, and verification results are handled through Stripe Identity. Images of identity documents and faces are not stored on the Company's servers.",
      },
      {
        title: "3. Purposes of use",
        body: "Collected personal information is used for the following purposes:",
        bullets: [
          "Provision and operation of services",
          "Response to inquiries",
          "Improvement of services and development of new services",
          "Important communications to customers",
          "Identity verification, screening, contracting, billing, and fraud prevention for robot rentals",
        ],
      },
      {
        title: "4. Provision to third parties",
        body: "Except as required by law, the Company does not provide personal information to third parties without the customer's consent.",
      },
      {
        title: "5. Service providers",
        body: "For identity verification, payments, and billing, the Company uses Stripe Identity, Stripe Billing, and related services provided by Stripe, Inc. and its affiliates. Information provided to these services is handled in accordance with Stripe's privacy policy and service terms. The Company receives verification results and uses them only as needed to review applications and manage contracts.",
      },
      {
        title: "6. Management of personal information",
        body: "The Company implements appropriate security measures to prevent leakage, loss, or damage of personal information.",
      },
      {
        title: "7. Cookies and analytics",
        body: "We use a first-party cookie to store your cookie choice for 180 days. Essential robot-rental identity cookies support the requested service. Google Analytics runs only after you allow analytics and only when a measurement ID is configured. Visited pages and device/browser information are sent to Google to help improve this site. Google signals are disabled. Once AdSense setup and site approval are complete, ads may load only after separate advertising-cookie consent. This choice lasts 180 days and can be changed from the article advertising settings. Google may use cookies for ad delivery and fraud prevention; we request non-personalized ads. Analytics cookies expire after 180 days. You can change your choice through Cookie settings in the footer; rejection stops future measurement and deletes this site’s Analytics cookies. Article likes use a signed anonymous-ID cookie for up to one year; comment cooldowns use a short-lived cookie. Display names and comment text are published after moderation and stored with an anonymous-ID hash in microCMS. We temporarily hash IP addresses for rate limiting without storing raw IPs in this feature. Up to 50 read article IDs are kept only in browser storage for recommendations. Language preferences are stored in browser local storage.",
      },
      {
        title: "8. Contact",
        body: "Please direct inquiries regarding the handling of personal information to the address below.",
        extra: "ClearAI Inc.\nEmail: info@clearai.jp",
      },
    ],
    date: "Effective date: January 1, 2025 / Last updated: October 25, 2026",
  },
};

export default function PrivacyPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-3xl mx-auto px-6 pt-40 pb-20">
        <p className="text-sm font-semibold text-neutral-900 mb-4">{t.label}</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-12">{t.title}</h1>

        <div className="prose text-gray-600 leading-relaxed space-y-8">
          {t.sections.map((section, index) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-gray-900 mb-3">{section.title}</h2>
              <p>{section.body}</p>
              {index === 4 && <p className="mt-3 flex flex-wrap gap-4"><a href="https://stripe.com/privacy" className="underline underline-offset-4">Stripe Privacy Policy</a><a href="https://stripe.com/legal/ssa" className="underline underline-offset-4">Stripe Services Agreement</a></p>}
              {index === 6 && <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[560px] border-collapse text-sm"><caption className="mb-3 text-left">{lang === "ja" ? "Cookieとブラウザ保存の一覧" : "Summary of the policy above"}</caption><thead><tr>{(lang === "ja" ? ["目的", "保存先", "期間・件数", "変更方法"] : ["Purpose", "Storage", "Duration / limit", "Controls"]).map(label => <th key={label} scope="col" className="border border-gray-300 p-3 text-left">{label}</th>)}</tr></thead><tbody>{(lang === "ja" ? [
                ["Cookie設定・広告の選択", "ブラウザのCookie", "180日", "フッターのCookie設定・記事の広告設定"],
                ["Google Analytics", "Cookie・Googleへの送信", "Cookieは180日", "Cookie設定から拒否・許可を変更"],
                ["いいねの重複防止", "匿名IDのCookie", "最長1年", "ブラウザのCookie削除"],
                ["コメント連続投稿防止", "短期Cookie", "短期（本文に具体日数の記載なし）", "ブラウザのCookie削除"],
                ["おすすめ・言語設定", "ブラウザのローカルストレージ", "閲覧履歴は最大50件・言語の期間は未規定", "ブラウザのサイトデータ削除"],
              ] : [
                ["Cookie / advertising choice", "Browser cookies", "180 days", "Footer cookie settings / article ad settings"],
                ["Google Analytics", "Cookies and transmission to Google", "Cookies: 180 days", "Cookie settings"],
                ["Duplicate likes", "Anonymous ID cookie", "Up to one year", "Browser cookie controls"],
                ["Comment cooldown", "Short-lived cookie", "Short term; no exact duration specified above", "Browser cookie controls"],
                ["Recommendations / language", "Browser local storage", "Up to 50 read IDs; no language expiry specified", "Browser site-data controls"],
              ]).map(row => <tr key={row[0]}>{row.map(cell => <td key={cell} className="border border-gray-300 p-3">{cell}</td>)}</tr>)}</tbody></table></div>}
              {section.bullets && (
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              {section.extra && (
                <p className="mt-2">
                  {section.extra.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < section.extra!.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </p>
              )}
            </div>
          ))}

          <p><button data-ui-button="control" type="button" className="underline underline-offset-4" onClick={() => window.dispatchEvent(new Event("clearai-cookie-settings"))}>{lang === "ja" ? "Cookie設定を変更する" : "Change cookie settings"}</button></p>
          <p className="text-sm text-gray-400 mt-8">{t.date}</p>
        </div>
      </section>
    </main>
  );
}
