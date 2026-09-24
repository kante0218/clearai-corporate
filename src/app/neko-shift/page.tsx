import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "猫シフト（Neko Shift）サポート・プライバシー",
  description: "猫シフトの使い方、お問い合わせ、アプリ内データと任意のカレンダー連携に関するプライバシーポリシー。",
  alternates: { canonical: "https://clearai.jp/neko-shift" },
};

export default function NekoShiftPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <article className="mx-auto max-w-3xl px-6 pt-36 pb-20 sm:pt-40">
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">猫シフト（Neko Shift）</h1>
        <p className="mt-5 text-lg leading-relaxed text-gray-600">
          シフトを記録して、給与の見込みを確認。働いた時間に応じて、ねこたちが集まるiPhoneアプリです。
        </p>
        <nav aria-label="このページの内容" className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm underline underline-offset-4">
          <a href="#support">使い方・サポート</a>
          <a href="#privacy">アプリのプライバシーポリシー</a>
          <a href="#contact">お問い合わせ</a>
        </nav>

        <section id="support" className="mt-14 scroll-mt-28 space-y-6 leading-relaxed text-gray-600">
          <h2 className="text-2xl font-bold text-gray-900">使い方・サポート</h2>
          <ol className="list-decimal space-y-3 pl-6">
            <li>勤務先を作成し、時給などの給与条件を設定します。アカウント登録やログインは不要です。</li>
            <li>シフトの開始・終了時刻、休憩時間などを登録します。勤務先ごとの条件から給与の見込みを確認できます。</li>
            <li>登録したシフトの終了後、休憩を除く実働時間に応じて、ねこと「にぼし」が増えます。ねこは通常20匹とひみつの5匹。にぼしでごはんをあげられます。</li>
          </ol>
          <div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">ねこやにぼしが増えないとき</h3>
            <p>まだ終了していないシフトは対象になりません。シフトの終了日時と休憩時間を確認して、アプリを開き直してください。いちど出会ったねこは、シフトを修正したり、ごはんをあげたりしても残ります。</p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">カレンダーへの書き出し</h3>
            <p>カレンダー連携は任意です。アプリから書き出しを操作すると、許可したiPhoneのカレンダー、または認証したGoogleカレンダーへシフトを登録・更新します。自動的に外部へ同期する機能ではありません。連携できないときは、端末のカレンダー権限やGoogleアカウントの接続設定を確認してください。</p>
          </div>
          <p>給与の表示は登録内容に基づく見込みです。実際の支給額は勤務先の給与明細で確認してください。本アプリは税務・労務に関する専門的な助言を提供するものではありません。</p>
        </section>

        <section id="privacy" className="mt-14 scroll-mt-28 space-y-6 border-t border-gray-200 pt-10 leading-relaxed text-gray-600">
          <h2 className="text-2xl font-bold text-gray-900">アプリのプライバシーポリシー</h2>
          <p>ClearAI株式会社は、猫シフト（Neko Shift）で扱う情報について、以下のとおり定めます。この方針はアプリに適用されます。当ウェブサイトやお問い合わせに関する情報の取り扱いは、<Link href="/privacy" className="underline underline-offset-4">当社のプライバシーポリシー</Link>をご確認ください。</p>
          <div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">端末に保存する情報</h3>
            <p>勤務先、時給などの給与条件、シフトの日時・休憩・手当・メモ、給与の見込み、ねこの獲得状況・名前・ごはんなどの情報は、端末内に保存します。これらの情報を当社のサーバーへ自動送信しません。アプリ専用のアカウントは作成しません。端末のバックアップは、利用者のOS・バックアップ設定に従います。</p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">任意のカレンダー連携</h3>
            <p>利用者が書き出しを実行した場合に限り、予定のタイトル（勤務先名を含む）、開始・終了日時、勤務先の住所、メモ、および重複登録を防ぐためのシフト識別子を連携先へ渡します。iPhoneのカレンダーは端末で許可したカレンダーへ保存され、カレンダー側の設定に応じてiCloudなどへ同期される場合があります。</p>
            <p className="mt-3">Googleカレンダーへ書き出す場合は、Googleの認証画面で同意を得て、予定の参照・作成・更新に必要な権限を使用します。認証情報はGoogleのSDKを通じて端末上で管理し、当社のサーバーへ送信しません。既に書き出した予定を確認し、重複を防いで更新するためにもこの権限を使用します。Googleへ送信する情報には、<a href="https://policies.google.com/privacy?hl=ja" className="underline underline-offset-4">Googleのプライバシーポリシー</a>が適用されます。</p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">広告・解析・課金</h3>
            <p>当社独自の広告配信や行動解析、アプリ内課金は行いません。広告目的の追跡や、利用者のデータの販売は行いません。任意のGoogle連携では、GoogleのSDKが端末情報や利用状況などを機能提供や分析のために扱う場合があり、Googleのプライバシーポリシーが適用されます。</p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">データの削除と連携の解除</h3>
            <p>シフトは編集画面から、勤務先は勤務先一覧のスワイプ操作で削除できます。ねこのデータなどを含む端末内のアプリデータは、iPhoneからアプリを削除することで削除できます。「Appを取り除く」はデータが残るため、データも消す場合は「Appを削除」を選んでください。バックアップに含まれる情報の削除は、ご利用のバックアップ設定で管理してください。</p>
            <p className="mt-3">Google連携は<a href="https://myaccount.google.com/connections" className="underline underline-offset-4">Googleアカウントの接続管理</a>からアクセス権を取り消せます。iPhoneのカレンダー権限は端末の設定から変更できます。アプリの削除や連携の解除だけでは、書き出した予定は消えません。不要な予定は連携先のカレンダーで削除してください。</p>
          </div>
          <p className="text-sm">制定・最終更新日：2026年9月25日</p>
        </section>

        <section id="contact" className="mt-14 scroll-mt-28 border-t border-gray-200 pt-10 leading-relaxed text-gray-600">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">お問い合わせ</h2>
          <p>不具合や使い方、情報の取り扱いについては、ClearAI株式会社までご連絡ください。</p>
          <a href="mailto:info@clearai.jp?subject=%E7%8C%AB%E3%82%B7%E3%83%95%E3%83%88%E3%81%AE%E3%81%8A%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B" className="mt-4 inline-block break-all font-semibold text-gray-900 underline underline-offset-4">info@clearai.jp</a>
          <p className="mt-4">不具合の場合は、iPhoneの機種、iOSとアプリのバージョン、起きた現象をお知らせください。勤務先の情報や個人情報を含む画面を送る場合は、不要な情報を隠してください。お問い合わせで受け取ったメールアドレスや内容は、対応のために使用します。</p>
        </section>
      </article>
    </main>
  );
}
