import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-3xl mx-auto px-6 pt-40 pb-20">
        <p className="text-sm font-semibold text-blue-600 mb-4">Terms of Service</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-12">利用規約</h1>

        <div className="prose text-gray-600 leading-relaxed space-y-8">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">第1条（適用）</h2>
            <p>本規約は、clear AI株式会社（以下「当社」）が提供するすべてのサービス（以下「本サービス」）の利用に関する条件を定めるものです。</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">第2条（利用登録）</h2>
            <p>登録希望者が当社の定める方法によって利用登録を申請し、当社がこれを承認することによって、利用登録が完了するものとします。</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">第3条（禁止事項）</h2>
            <p>ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>当社のサービスの運営を妨害する行為</li>
              <li>他のユーザーに迷惑をかける行為</li>
              <li>不正アクセスをする行為</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">第4条（免責事項）</h2>
            <p>当社は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">第5条（サービス内容の変更等）</h2>
            <p>当社は、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">第6条（準拠法・裁判管轄）</h2>
            <p>本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</p>
          </div>

          <p className="text-sm text-gray-400 mt-8">制定日: 2025年1月1日</p>
        </div>
      </section>
    </main>
  );
}
