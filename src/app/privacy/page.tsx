import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-3xl mx-auto px-6 pt-40 pb-20">
        <p className="text-sm font-semibold text-blue-600 mb-4">Privacy Policy</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-12">プライバシーポリシー</h1>

        <div className="prose text-gray-600 leading-relaxed space-y-8">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. 個人情報の取り扱いについて</h2>
            <p>clearAI株式会社（以下「当社」）は、お客様の個人情報を適切に保護し、取り扱うことが社会的責務であると考え、以下の方針に基づき個人情報の保護に努めます。</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. 個人情報の収集</h2>
            <p>当社は、サービスの提供にあたり、お客様の同意のもと、お名前、メールアドレス、電話番号、会社名等の個人情報を収集することがあります。</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. 個人情報の利用目的</h2>
            <p>収集した個人情報は、以下の目的で利用いたします。</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>サービスの提供・運営</li>
              <li>お問い合わせへの対応</li>
              <li>サービスの改善・新サービスの開発</li>
              <li>お客様への重要なお知らせの連絡</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. 個人情報の第三者提供</h2>
            <p>当社は、法令に基づく場合を除き、お客様の同意なく第三者に個人情報を提供することはありません。</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. 個人情報の管理</h2>
            <p>当社は、個人情報の漏洩、滅失またはき損の防止のために、適切なセキュリティ対策を講じます。</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. お問い合わせ</h2>
            <p>個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください。</p>
            <p className="mt-2">clearAI株式会社<br />メール: info@and-clearai.com</p>
          </div>

          <p className="text-sm text-gray-400 mt-8">制定日: 2025年1月1日</p>
        </div>
      </section>
    </main>
  );
}
