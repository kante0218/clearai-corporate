---
name: seo-rank-watch
description: clearai.jp の Google 検索順位を測定し、検索意図に基づいて毎回1キーワードだけ改善し、7日間観察して実測で判定する。継続 SEO 運用や SEO Rank Watch の実行時に使う。
---

# SEO Rank Watch

目的は1位を狙えるキーワードを1つ選び、検索ニーズへの不足を1つ改善し、7日間観察すること。1位は保証しない。1位達成後は監視のみ続ける。独自 SERP スクレイピングは禁止。

## データと測定

リポジトリ直下 `data/seo/` の3つの JSON 配列を使う。

- `watchwords.json`: `{ "keyword": "AI内製化研修", "targetPath": "/training", "priority": 1 }`。優先度は正整数、小さいほど優先。検索実態・提供サービス・対象ページの根拠がある語のみ登録する。
- `rank-history.json`: 追記専用の測定 snapshot 配列。過去レコードの修正・削除・並べ替えは禁止。スクリプトは排他ロック＋一時ファイルの atomic rename で既存レコードを保って追記する。手動編集でロックを回避しない。
- `improvement-log.json`: キーワードごとの状態と追記式 `actions`、`reviews`。`active` は改善候補、`observing` は観察中、`achieved` は実測1位で監視のみ。

```sh
node .claude/skills/seo-rank-watch/scripts/fetch_gsc_ranks.mjs --repo '<REPO_PATH>' --append
node .claude/skills/seo-rank-watch/scripts/fetch_gsc_ranks.mjs --repo '<REPO_PATH>' --days 7 --append
node .claude/skills/seo-rank-watch/scripts/fetch_gsc_ranks.mjs --self-test
```

GSC を正とする。既存 `google-auth-library` の ADC または `GOOGLE_APPLICATION_CREDENTIALS` を利用し、認証情報は出力・コミットしない。既定プロパティは `sc-domain:clearai.jp`、必要なら `GSC_SITE_URL` を指定する。アカウントには当該 GSC プロパティの閲覧権限が必要。秘密ファイルを作成・変更する場合はリポジトリの承認ルールに従う。

既定28日、終了日は GSC の America/Los_Angeles 日付で今日−3日、`dataState: final`、検索種別 web、全デバイス・全地域。監視語は query と対象 URL の完全一致で取得する。snapshot は `source`, `capturedAt`, `range`, `scope`, `ranks`, `discoveries` を保持。`rank` は丸めない平均順位。discovery は別クエリの上位25,000行で、API自身の制限もあり網羅的ではない。`rank: null, impressions: 0` は成功応答で行がない意味であり、未インデックスとは断定しない。API/認証失敗時は失敗を報告し、測定値を作らず履歴に追記しない。

GSC が利用できない、または当日順位確認が必要な場合のみ WebSearch を使う。上位結果への掲載は概算であり Google 実順位と扱わない。結果に見当たらなくても順位は null / 不明。履歴には別形式 `{ "source": "websearch", "capturedAt": "<ISO>", "query": "<検索語>", "note": "<概算・測定不能理由>", "urls": ["<確認URL>"], "ranks": [{ "keyword": "<検索語>", "targetPath": "<パス>", "rank": null, "impressions": null, "clicks": null }] }` を追記できる。GSC の0件とは区別する。WebSearch のURL・取得日時・クエリ・推定である旨は改善/レビュー記録に残し、GSC snapshot に混ぜない。WebSearch を使って achieved 判定や GSC との差分算出をしない。

## 1回の実行

### 1. 測定する

28日 GSC を追記し、同じ source・期間日数・property・対象ページ・device・country・検索種別・aggregation・dimensions の直前 snapshot と変化を比較する。比較不能は不明。未登録の有望な discovery クエリも確認する。28日平均の変動は改善の効果判定に使わない。

### 2. レビュー期限を確認する

`nextReviewDate <= 今日` の observing をレビューする。以下の条件を満たさない場合は observing のまま延期理由と次回日付を記録し、再改善しない。

- `deployedAt`（本番反映を検証した ISO timestamp）から最低168時間経過している。
- `--days 7` の GSC final データの7日間がすべて本番反映後である。PT の公開日は部分日なので除外し、startDate は公開PT日の翌日以降とする。取得遅延があれば7日目に判定せず延期する。
- 比較元は改善前に取得・保存した同じ条件の7日 `baseline7`。28日を代用しない。範囲・取得時刻・scope・rank・impressions・clicks を保存する。

有効な7日 GSC の丸め前 `rank === 1` かつ impressions > 0 → achieved。1.04 など表示丸めで1位になる値は未達成。平均順位1はその測定範囲での結果であり全検索への保証ではない。

1位未達で比較可能な baseline より順位改善 → active。効果なし／悪化 → active、前回と異なる改善方法を次回選ぶ。reviews に対象期間、数値、比較条件、結果、判断日を追記する。欠測を順位悪化にしない。

baseline が認証不能・欠測で存在しない場合、十分な公開後7日 GSC を新しい基準として保存し「前後比較不能」と記録する。1位判定以外の効果は断定せず active に戻して次の改善に進める。公開後データも未取得なら observing のまま、測定不能と次回確認日を記録する。初回取得不能を理由に永遠に効果判定待ちにはしないが、測定失敗を成功に置き換えない。

achieved も測定を継続し、比較可能な実測で1位を失った場合はレビュー理由を記録して active に戻す。

### 3. 改善語を1つだけ選ぶ

observing と achieved を除き、次の順序で選ぶ。観察中の targetPath は別キーワード経由でも変更しない。

1. 2〜10位・impressions あり。1位に近いものを優先。
2. 11〜20位・impressions が多いもの。
3. レビュー済みで改善したが1位未達、または効果なしのもの。
4. 優先度が高い rank: null の語。
5. GSC で発見した有望な未登録クエリ。

1〜2位未満の平均順位（例1.4）も実測1位には達していない候補として1番目の近接群に含める。根拠ある候補がなければ測定とレポートだけで終了。無理に作らない。

### 4. 検索意図を分析する

変更前に「誰が・何を知りたくて検索しているか」を1〜2文で定義。WebSearch で現在の上位1〜3ページを開き、URLと確認日を記録して対象ページと比較する。検索ニーズに足りない情報を具体的なギャップとして特定する。文字数を増やすこと自体を目的にしない。必要な実データがないなら創作せず提案に留める。

### 5. 1キーワードに1つの改善を実装する

title / description / intro / FAQ、欠けた情報、実データ、記事・地域・詳細ページ間の内部リンクなどからギャップに必要なものだけ選ぶ。内部リンクは読者の次の疑問・行動につながるものにする。noindex 変更と大きなページ構造変更は提案して承認を得る。1実行中に2つ目のキーワードを改善しない。

改善前の7日 baseline を取得できれば保存し、取得不能なら理由付き null とする。リポジトリの既存検証と本番反映手順を実施。コードを置いただけで観察開始にせず、本番URLで変更を確認して deployedAt を確定する。デプロイ失敗は状態と未完了事項に明記する。

### 6. 記録して観察する

```json
{
  "keyword": "AI内製化研修",
  "targetPath": "/training",
  "status": "observing",
  "deployedAt": "<verified ISO timestamp>",
  "nextReviewDate": "<本番反映日+7日 YYYY-MM-DD>",
  "actions": [{
    "date": "<ISO timestamp>",
    "rankAtAction": null,
    "baseline7": null,
    "baselineUnavailableReason": "<取得不能の理由。取得できた場合は省略>",
    "needs": "<検索ニーズ>",
    "gap": "<上位ページとの比較で特定した不足>",
    "sources": ["<比較したURL>"],
    "done": "<実際に行った1つの改善>",
    "deployedAt": "<verified ISO timestamp>"
  }],
  "reviews": []
}
```

nextReviewDate は最短のレビュー開始日であり、168時間・完全な公開後7日窓の条件を優先する。観察中は期日前に絶対に再改善しない。既存 actions/reviews を消さず追記する。`data/seo/*.json` の関連変更を Git にコミットする。既存改善・監視ジョブと同時変更を避ける。

## 報告

毎回簡潔に、前回から大きく上昇／下降した語、今回の効果判定、選んだ1語と理由、検索ニーズ、実際の変更、本番URL、observing の語と nextReviewDate を報告する。不明・認証不能・比較不能は明記し、改善を予測で断定しない。効果は次回の実測で判断する。

API仕様: https://developers.google.com/webmaster-tools/v1/searchanalytics/query
