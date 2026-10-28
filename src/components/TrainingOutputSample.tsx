export default function TrainingOutputSample({ english = false }: { english?: boolean }) {
  return (
    <section aria-labelledby="training-output-sample" className="mx-auto max-w-6xl px-6 py-10">
      <h2 id="training-output-sample" className="text-2xl font-bold text-neutral-900">{english ? "Explore an illustrative exercise" : "演習・成果物の説明用サンプル"}</h2>
      <p className="mt-3 text-sm leading-7 text-neutral-700">{english ? "This sample explains a possible workflow. It is not an actual client deliverable, an observed result, or a promise that every program includes this exercise. The exercise and acceptance criteria are agreed for your team." : "会議メモ整理を題材にした説明用サンプルです。実際の納品物・導入実績や、全研修に含む演習を示すものではありません。実施する題材と完成条件は、受講目的に合わせて相談します。"}</p>
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <article className="rounded-lg border border-neutral-300 p-5">
          <h3 className="font-bold text-neutral-900">{english ? "1. Input and expected output" : "1. 入力と出力の例"}</h3>
          <dl className="mt-4 space-y-4 text-sm leading-7 text-neutral-700"><div><dt className="font-semibold">{english ? "Input" : "入力"}</dt><dd>{english ? "A meeting note with confidential information removed" : "機密情報を除いた会議メモ"}</dd></div><div><dt className="font-semibold">{english ? "Output fields" : "出力欄"}</dt><dd>{english ? "Decisions / action items / owner / deadline / unresolved questions" : "決定事項／次の作業／担当／期限／未確認事項"}</dd></div><div><dt className="font-semibold">{english ? "Missing information" : "不明な情報"}</dt><dd>{english ? "Mark it as unconfirmed; do not fill it by guessing." : "推測して補わず、「未確認」と記録する。"}</dd></div></dl>
        </article>
        <article className="rounded-lg border border-neutral-300 p-5">
          <h3 className="font-bold text-neutral-900">{english ? "2. Example instruction" : "2. プロンプト・手順書の例"}</h3>
          <blockquote className="mt-4 border-l-2 border-neutral-400 pl-4 text-sm leading-7 text-neutral-700">{english ? "Organise this note into decisions and action items. For each item, list the supporting passage, owner and deadline. Leave unclear fields unconfirmed. Do not send messages or modify the source file." : "このメモを決定事項と次の作業に整理してください。各項目に根拠となる記述、担当、期限を添えてください。不明な欄は未確認とし、原文にない情報を足さないでください。送信や原本の変更は行わないでください。"}</blockquote>
          <p className="mt-4 text-sm leading-7 text-neutral-700">{english ? "Process: prepare a copy → issue the instruction → compare with the original → correct → approve sharing." : "手順：作業用コピーを準備 → 指示 → 原文と照合 → 修正 → 共有前に承認。"}</p>
        </article>
        <article className="rounded-lg border border-neutral-300 p-5">
          <h3 className="font-bold text-neutral-900">{english ? "3. Review before sharing" : "3. 試作品の確認項目"}</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-neutral-700">
            {(english ? ["Every item can be traced to the input.", "Names, numbers and deadlines match the original.", "Missing fields are clearly marked.", "Only authorised people can view the output.", "Errors and unexpected inputs are reviewed before business use."] : ["出力項目を原文の記述に照合できる", "氏名・数値・期限が原文と一致する", "未確認の項目が明示されている", "共有先と閲覧権限が適切である", "業務利用前に誤りや想定外の入力を確認する"]).map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>
      </div>
      <a href="/downloads/training-output-sample.txt" download className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-neutral-900 underline underline-offset-4">{english ? "Save the Japanese sample and blank worksheet (text)" : "説明例と空欄の記入シートを保存する（テキスト）"}</a>
    </section>
  );
}
