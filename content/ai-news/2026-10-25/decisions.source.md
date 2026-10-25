# OpenAI Decisions APIが正式提供　分類や選択を業務の中で高速化

ClearAI編集部｜作成日：2026年10月25日｜発表日：2026年10月22日

OpenAIは2026年10月22日、分類や選択、採点に特化した「Decisions API」の一般提供を開始しました。GPT-6 Lunaを基盤とし、答えの範囲をあらかじめ決めた問いを処理します。問い合わせの振り分けなど、繰り返し発生する小さな判断への活用が想定されています。 [公式発表](https://openai.com/index/decisions-api/)

![テキスト、画像、JSONをDecisions APIで判断し、アプリ側の処理につなげる図](01-decision-flow.png)

図1　入力から業務処理までの概念図。編集部作成。

## 目次

- [何が変わるのか](#news)
- [3つの判断形式と料金](#types)
- [仮想例　問い合わせの一次仕分け](#example)
- [導入前に確かめたいこと](#limits)

<a id="news"></a>

## 何が変わるのか

OpenAIによると、Responses API経由でGPT-6 Lunaを使う場合と比べ、最大10倍高速に判断できます。ただし「最大」という比較であり、すべての業務で同じ速度差が出ると受け取らないことが大切です。公開ベータからは、GPT-Liveとのネイティブ連携や、再利用する入力のキャッシュ機能などが加わりました。 [公式発表](https://openai.com/index/decisions-api/)

ClearAI編集部では、文章を生成する前段階の仕分けを、独立した処理として設計しやすくなる点に注目しています。たとえば「どの窓口が扱うか」を決めてから、その担当業務に合った処理へ渡す構成です。これは製品仕様からの編集部の考察であり、導入効果を保証するものではありません。

<a id="types"></a>

## 3つの判断形式と料金

回答形式は3種類です。predicateは条件が成立する確率を推定し、choiceは用意した選択肢から1つを選びます。scoreは順序のある評価段階の番号を確率で重みづけした平均で、整数になるとは限りません。入力にはテキスト、画像、JSONを使えます。 [開発者ガイド](https://developers.openai.com/api/docs/guides/decisions)

1リクエストに含められる質問は最大400問です。前の答えに依存する質問は、別のリクエストに分けます。料金は未キャッシュ入力100万トークン当たり0.10米ドルで、出力トークンへの課金はありません。キャッシュ書き込みや地域処理、長い入力には別途条件があるため、見積もり時は最新仕様の確認が必要です。 [仕様・料金](https://developers.openai.com/api/docs/guides/decisions)

![predicateは条件、choiceは選択、scoreは採点に使うという比較図](02-answer-types.png)

図2　公式仕様を基に整理した3つの回答形式。編集部作成。

<a id="example"></a>

## 仮想例　問い合わせの一次仕分け

ここからは編集部が考えた仮想例です。法人向けサービスの窓口で、問い合わせを「営業」「契約」「操作」「その他」に分類するとします。まず過去の問い合わせを担当者が分類し、判断に迷った理由も整理します。そのうえで選択肢の説明を作り、APIの分類結果と人の判断を比較します。

運用時は「その他」や判断が曖昧な案件を、人が確認する列に送る設計が考えられます。分類と、顧客への返信や契約内容の変更は分けて扱います。単に仕分け時間を見るだけでなく、担当部署間の差し戻しが増えないかも確認すると、現場に合うか判断しやすくなります。これは実在企業の事例ではなく、削減率などの実績値も示していません。

![仮想的な問い合わせを分類し、担当窓口または人の確認に回す流れ](03-hypothetical-routing.png)

図3　問い合わせの振り分けを想定した仮想例。編集部作成。

<a id="limits"></a>

## 導入前に確かめたいこと

Decisions APIの結果を使って実際の操作を行うのはアプリ側です。自由な説明文や独自形式のデータ生成が必要な用途とは、使い分けが必要です。公式ガイドは、正解ラベル付きの実例を用い、誤検知と見逃しの影響に応じて判断のしきい値を決めるよう案内しています。 [回答の解釈と用途](https://developers.openai.com/api/docs/guides/decisions)

質問によっては回答を拒否する場合もあります。通常の分類結果とは分けて扱い、確認先を決めておく必要があります。 [APIリファレンス](https://developers.openai.com/api/reference/resources/decisions/methods/create)

評価には通常の案件だけでなく例外も含め、変更後も継続して確認します。OpenAIの評価ガイドも、人の判断との照合や継続評価を重視しています。 [評価のベストプラクティス](https://developers.openai.com/api/docs/guides/evaluation-best-practices)

編集部としては、最初から全件を自動処理するのではなく、対象を1種類に絞り、品質、待ち時間、費用、人に戻す条件を一緒に測る進め方を勧めます。速い判断を、安心して使える業務の流れにつなげることが導入の要点です。

![品質、待ち時間、費用、例外処理の4つの確認項目](04-rollout-checklist.png)

図4　自社で導入を評価するための確認項目。編集部作成。

## 出典と確認日

すべて2026年10月25日確認。料金・仕様は変更される可能性があります。

- [OpenAI公式発表（2026年10月22日）](https://openai.com/index/decisions-api/)
- [Decisions API 開発者ガイド](https://developers.openai.com/api/docs/guides/decisions)
- [評価のベストプラクティス](https://developers.openai.com/api/docs/guides/evaluation-best-practices)
- [Decisions API リファレンス](https://developers.openai.com/api/reference/resources/decisions/methods/create)
