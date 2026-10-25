# 1PasswordがAI向けログイン連携を発表 パスワードを渡さず作業を任せる仕組み

**ClearAI｜AIニュース解説**  
確認日：2026年10月25日

AIにWeb作業を頼んでも、ログイン画面で手が止まる。そんな場面を減らす仕組みが登場しました。1Passwordは2026年10月22日、「1Password for Agents」を発表しました。利用者が許可したログイン情報を1Passwordが入力し、AIにパスワードそのものを渡さず作業を続けられるようにする仕組みです。 [発表記事](https://1password.com/blog/1password-for-ai-agents)

## 目次

- [利用者が承認し 1Passwordが直接入力](#mechanism)
- [現在の対象は個人と家族向け 連携先は順次拡大](#availability)
- [業務では情報収集や下書きの補助に注目](#business)
- [ログイン後の操作にも確認が必要](#safety)

<a id="mechanism"></a>

## 利用者が承認し 1Passwordが直接入力

対応エージェントがログインを必要とすると、1Passwordへの利用要求が届きます。利用者は対象のアカウントを確認して承認または拒否し、承認した場合は1Passwordがパスワードやワンタイムコードをサイトへ直接入力します。複数のログイン候補があれば、使うものを選べます。 [公式資料](https://1password.com/personal-ai-agent-integrations)

連携しただけで、保管庫全体をAIに開放するわけではありません。ただし、承認を求められる頻度や使える機能は連携先で異なります。「どのAIでも同じ手順で使える」と考えず、個別の案内を確認することが大切です。 [公式資料](https://1password.com/personal-ai-agent-integrations)

![ログイン要求から承認、直接入力、作業再開までの流れ](01-login-flow.png)

*図1：ログイン要求から承認、直接入力、作業再開までの流れ。編集部作成。*

<a id="availability"></a>

## 現在の対象は個人と家族向け 連携先は順次拡大

10月25日に確認した公式案内では、新しい個人向け連携の対象は1Password.comのIndividualとFamiliesです。追加料金なしで含まれますが、1Password.euと1Password.caは未対応です。Grok Bot向けの案内では、BusinessとTeam Starter Packも対象外と明記されています。法人アカウントで一律に使える新機能として紹介するのは適切ではありません。 [公式資料](https://1password.com/partners/spacexsi-grokbot)

MetaのMuseとSpaceXSIのGrok Botは、数日かけて順次展開する案内です。一方、Claude Duet、ChatGPT Workとdots、Town Townieは近日対応予定とされています。発表された連携先の一覧と、今すぐ自分の環境で使える機能は分けて確認しましょう。 [公式資料](https://1password.com/blog/1password-for-ai-agents)

![個人・家族向けの利用資格と、順次展開・近日対応予定の連携先](02-availability.png)

*図2：個人・家族向けの利用資格と、順次展開・近日対応予定の連携先。編集部作成。*

<a id="business"></a>

## 業務では情報収集や下書きの補助に注目

編集部が注目するのは、ログインのたびに人へ操作を戻す負担を減らせる可能性です。たとえば、出張の領収書を集めて経費精算の下書きを用意する、予約内容を確認して予定を整理するといった準備作業が考えられます。これは活用の検討例であり、各エージェントでの実行や業務システムへの対応を保証するものではありません。

企業で検討する場合は、まず社内のAI利用規程と対象アカウントの管理ルールを確認します。個人向けプランで試せることと、会社の情報を扱ってよいことは別の判断です。確認用のデータから始め、支払い・送信・公開などの確定操作は人が判断する運用が現実的です。

![情報収集、下書き作成、人による確定判断という業務検討例](03-business-workflow.png)

*図3：情報収集、下書き作成、人による確定判断という業務検討例。編集部作成。*

<a id="safety"></a>

## ログイン後の操作にも確認が必要

パスワードをAIに見せない仕組みでも、ログイン済みのアカウント内では情報の閲覧や操作が可能になります。公式FAQも、承認前にアカウントと依頼内容を見直すよう案内しています。Museの個別案内には購入やメール送信前の確認が記載されていますが、これを全エージェント共通の仕様とは捉えないようにしましょう。 [公式資料](https://1password.com/partners/meta-muse)

Claude向けの技術資料も、ログイン後の振る舞いはエージェント側の保護策に依存すると説明しています。端末の侵害や送信先サイトに関するリスクまでなくなるわけではありません。導入時は、認証情報の保護と操作権限の管理を併せて確認する必要があります。 [公式資料](https://support.1password.com/1password-claude-security/)

![ログイン時の確認事項とログイン後の操作管理の違い](04-security-boundary.png)

*図4：ログイン時の確認事項とログイン後の操作管理の違い。編集部作成。*

## 出典

- [発表記事](https://1password.com/blog/1password-for-ai-agents)
- [製品ページとFAQ](https://1password.com/personal-ai-agent-integrations)
- [Muse連携の案内](https://1password.com/partners/meta-muse)
- [Grok Bot連携の案内](https://1password.com/partners/spacexsi-grokbot)
- [Claude連携のセキュリティ資料](https://support.1password.com/1password-claude-security/)

※提供状況は確認日時点。図は仕組みを説明するための編集部制作物で、製品画面ではありません。
