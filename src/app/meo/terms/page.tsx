import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "MEO支援の利用条件", alternates: { canonical: "https://clearai.jp/meo/terms" } };

export default function MeoTermsPage() {
  return <main className="mx-auto max-w-3xl px-6 pb-16 pt-28 text-sm leading-[1.9] text-neutral-800 sm:pt-36">
    <Link href="/meo/apply" className="inline-flex min-h-11 items-center underline underline-offset-4">お申し込みへ戻る</Link>
    <h1 className="mt-5 text-2xl font-bold sm:text-3xl">MEO支援の利用条件</h1>
    <p className="mt-4">提供者：ClearAI株式会社／更新日・同意バージョン：2026年11月3日</p>
    <p className="mt-4"><Link href="/terms" className="underline">ClearAI利用規約</Link>と本条件が適用されます。MEO支援について内容が異なる場合は本条件を優先します。申込フォーム送信・アカウント設定だけでは契約や料金は発生せず、対象店舗・開始日を確認して別途契約を締結します。</p>
    <h2 className="mt-8 text-xl font-bold">料金・契約期間・解約</h2>
    <p className="mt-3">1店舗あたり月額30,000円（税別）／33,000円（税込）、最低契約期間6か月です。初期6か月の総額は1店舗あたり198,000円（税込）。初期6か月は通常の中途解約ができません。法令上認められる解除・取消しや、当社の債務不履行等を理由とする解除を妨げません。解約・更新・支払日と方法は正式な契約時に確認し、解約のご連絡は info@clearai.jp で受け付けます。日割り返金は原則行いませんが、法令上必要な場合や当社が認めた場合は除きます。通信費は利用者負担です。</p>
    <h2 className="mt-8 text-xl font-bold">支援範囲と承認</h2>
    <ul className="mt-3 list-disc space-y-3 pl-5"><li>1店舗につき月4回のGoogleビジネスプロフィール投稿支援。内容は店舗責任者に確認し、承認後に投稿します。</li><li>口コミ返信案を、対象の口コミと必要情報を確認してから2営業日以内に作成します。営業日は日本の土日祝日を除きます。返信は店舗責任者の承認後に行います。</li><li>月次レポートを提供します。取得できない指標は未取得として示し、実測値を推測で埋めません。</li><li>契約時に合意したキーワード・計測地点で月1回、検索順位を計測します。結果は計測条件により変わり、順位・来店・売上の向上や特定の掲載を保証しません。</li></ul>
    <p className="mt-3">必要情報・承認が未着の場合、投稿等の実施時期を調整します。承認なしの投稿は行いません。支援範囲の追加・変更は事前に個別合意します。</p>
    <h2 className="mt-8 text-xl font-bold">店舗の権限・Google連携</h2>
    <p className="mt-3">申込者は対象店舗を申し込む正当な権限を有するものとします。Google上の取得・投稿には、対象店舗の管理権限、店舗管理者による接続への同意、必要なGoogle APIの承認と有効な接続が必要です。条件がそろうまで自動取得・投稿は開始しません。GoogleのパスワードをClearAIへ渡す必要はありません。AIの返信案は誤りを含む可能性があるため、投稿前に店舗責任者が確認します。本プランでは自動投稿を包括的に許可したものとは扱いません。</p>
    <h2 className="mt-8 text-xl font-bold">MEOのデータの取り扱い</h2>
    <p className="mt-3"><Link href="/privacy" className="underline">ClearAIプライバシーポリシー</Link>に加え、MEOでは店舗・連絡先情報、Google連携情報、口コミ、返信案、承認履歴、取得できる指標と申込同意記録を、受付・本人確認・支援・レポート・安全な運用のために取り扱います。申込同意の各項目、規約バージョン、サーバー受付日時を記録します。Google連携・AIによる分析・決済の利用時には、それぞれGoogle等の必要な委託先へ処理に必要な情報を送信します。一般の広告メール配信への同意を申し込みの条件に含めません。</p>
    <p className="mt-3">会社ごとにアクセスを分離し、Google接続の解除と自動処理の停止を受け付けます。契約終了時のデータの返却・削除と保存期間は正式な契約で確認します。削除や個人情報に関するご相談は info@clearai.jp へご連絡ください。法令上制限できない当社の責任を免除するものではありません。</p>
    <p className="mt-8"><Link href="/meo/apply" className="inline-flex min-h-11 items-center underline underline-offset-4">条件を確認して申し込みへ戻る</Link></p>
  </main>;
}
