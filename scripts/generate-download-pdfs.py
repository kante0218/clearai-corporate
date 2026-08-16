#!/usr/bin/env python3
"""Generate the four PDF guides delivered from clearai.jp/download."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "downloads"
OUTPUT.mkdir(parents=True, exist_ok=True)

REGULAR_FONT = "/System/Library/Fonts/Supplemental/Arial Unicode.ttf"
pdfmetrics.registerFont(TTFont("ClearAI-Regular", REGULAR_FONT))
pdfmetrics.registerFont(TTFont("ClearAI-Bold", REGULAR_FONT))

INK = colors.HexColor("#111827")
MUTED = colors.HexColor("#667085")
LINE = colors.HexColor("#E5E7EB")
PALE = colors.HexColor("#F6F7F8")
WHITE = colors.white

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="JPBody", fontName="ClearAI-Regular", fontSize=10, leading=18, textColor=INK, wordWrap="CJK"))
styles.add(ParagraphStyle(name="JPSmall", fontName="ClearAI-Regular", fontSize=8, leading=13, textColor=MUTED, wordWrap="CJK"))
styles.add(ParagraphStyle(name="JPH1", fontName="ClearAI-Bold", fontSize=25, leading=35, textColor=INK, wordWrap="CJK", spaceAfter=7 * mm))
styles.add(ParagraphStyle(name="JPH2", fontName="ClearAI-Bold", fontSize=17, leading=25, textColor=INK, wordWrap="CJK", spaceBefore=3 * mm, spaceAfter=4 * mm))
styles.add(ParagraphStyle(name="JPH3", fontName="ClearAI-Bold", fontSize=11, leading=17, textColor=INK, wordWrap="CJK", spaceAfter=2 * mm))
styles.add(ParagraphStyle(name="TableHeader", fontName="ClearAI-Bold", fontSize=9, leading=14, textColor=WHITE, wordWrap="CJK"))
styles.add(ParagraphStyle(name="CoverKicker", fontName="ClearAI-Bold", fontSize=9, leading=13, textColor=INK, tracking=1.2, spaceAfter=9 * mm))
styles.add(ParagraphStyle(name="CoverTitle", fontName="ClearAI-Bold", fontSize=29, leading=42, textColor=INK, wordWrap="CJK", spaceAfter=8 * mm))
styles.add(ParagraphStyle(name="CoverLead", fontName="ClearAI-Regular", fontSize=11, leading=21, textColor=MUTED, wordWrap="CJK"))
styles.add(ParagraphStyle(name="Number", fontName="ClearAI-Bold", fontSize=20, leading=24, textColor=colors.HexColor("#9CA3AF")))
styles.add(ParagraphStyle(name="CardBody", fontName="ClearAI-Regular", fontSize=9, leading=16, textColor=MUTED, wordWrap="CJK"))


def footer(canvas, doc):
    canvas.saveState()
    width, _ = A4
    canvas.setStrokeColor(LINE)
    canvas.line(18 * mm, 13 * mm, width - 18 * mm, 13 * mm)
    canvas.setFont("ClearAI-Regular", 7)
    canvas.setFillColor(MUTED)
    canvas.drawString(18 * mm, 8 * mm, "clearAI株式会社  |  clearai.jp  |  info@clearai.jp")
    canvas.drawRightString(width - 18 * mm, 8 * mm, str(doc.page))
    canvas.restoreState()


def document(path: Path):
    doc = BaseDocTemplate(
        str(path), pagesize=A4, rightMargin=18 * mm, leftMargin=18 * mm,
        topMargin=18 * mm, bottomMargin=18 * mm, title=path.stem, author="clearAI株式会社",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
    doc.addPageTemplates([PageTemplate(id="all", frames=[frame], onPage=footer)])
    return doc


def cover(title, lead, edition="事業紹介資料 / 2026"):
    return [
        Spacer(1, 34 * mm),
        Paragraph(edition, styles["CoverKicker"]),
        Paragraph(title, styles["CoverTitle"]),
        Table([[""]], colWidths=[40 * mm], rowHeights=[2.5 * mm], style=TableStyle([("BACKGROUND", (0, 0), (-1, -1), INK)])),
        Spacer(1, 9 * mm),
        Paragraph(lead, styles["CoverLead"]),
        Spacer(1, 45 * mm),
        Paragraph("clearAI", ParagraphStyle("Brand", parent=styles["JPBody"], fontName="ClearAI-Bold", fontSize=16)),
        Paragraph("AI・ソフトウェア・ロボットを、現場で使える状態まで。", styles["JPSmall"]),
        PageBreak(),
    ]


def section(title, lead=None):
    items = [Paragraph(title, styles["JPH1"])]
    if lead:
        items.extend([Paragraph(lead, styles["JPBody"]), Spacer(1, 5 * mm)])
    return items


def bullet_list(items):
    return [Paragraph(f"●　{item}", styles["JPBody"]) for item in items]


def cards(items, columns=2):
    rows = []
    for start in range(0, len(items), columns):
        cells = []
        for index, (title, body) in enumerate(items[start:start + columns], start=start + 1):
            cells.append([
                Paragraph(f"{index:02}", styles["Number"]),
                Paragraph(title, styles["JPH3"]),
                Paragraph(body, styles["CardBody"]),
            ])
        while len(cells) < columns:
            cells.append([])
        rows.append(cells)
    table = Table(rows, colWidths=[(174 * mm - (columns - 1) * 5 * mm) / columns] * columns, hAlign="LEFT")
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), PALE),
        ("BOX", (0, 0), (-1, -1), 0.5, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 5, WHITE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 7 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 6 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6 * mm),
    ]))
    return table


def data_table(headers, rows, widths=None):
    data = [[Paragraph(h, styles["TableHeader"]) for h in headers]]
    data += [[Paragraph(str(cell), styles["JPSmall"]) for cell in row] for row in rows]
    table = Table(data, colWidths=widths, repeatRows=1, hAlign="LEFT")
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), INK),
        ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
        ("GRID", (0, 0), (-1, -1), 0.5, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 4 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 3.5 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3.5 * mm),
    ]))
    return table


def build_company():
    story = cover("clearAI 会社紹介資料", "システム開発、ロボットレンタル、AI内製化研修、AIコンサルティング。課題に合わせて、構想から運用まで一つのチームで支援します。")
    story += section("4つの事業を、必要な順番で。", "単独サービスの提供だけでなく、課題整理・人材育成・実装・現場検証を横断して組み合わせます。")
    story += [cards([
        ("システム・ソフトウェア開発", "業務に合わせたAIシステムを、要件整理から実装・運用まで。"),
        ("ロボットレンタル", "Unitree R1・G1・Go2を短期から全国配送。購入前検証にも対応。"),
        ("AI内製化研修", "参加者自身が業務成果物を作り、社内で改善を続けられる状態へ。"),
        ("AIコンサルティング・DX", "課題整理、ROI設計、PoC、本番導入、定着まで伴走。"),
    ]), PageBreak()]
    story += section("支援の進め方", "最初に『何を作るか』ではなく、『どの判断を良くするか』を決めます。")
    story += [cards([
        ("ヒアリング", "現場・経営双方の課題、制約、既存データを整理します。"),
        ("提案・設計", "対象業務、合格ライン、測定方法、進め方を明文化します。"),
        ("試作・検証", "小さく作り、実データと実際の利用者で早期に確かめます。"),
        ("本番・定着", "権限、運用、教育、改善サイクルまで整えて引き渡します。"),
    ]), Spacer(1, 8 * mm), Paragraph("意思決定のポイント", styles["JPH2"])]
    story += bullet_list(["成果指標が定義されているか", "現場の利用者が検証に参加しているか", "本番運用の責任者と改善方法が決まっているか"])
    story += [PageBreak()]
    story += section("ご相談いただくテーマの例")
    story += [cards([
        ("問い合わせ対応の自動化", "社内文書と連携した検索・回答、履歴管理、有人引き継ぎ。"),
        ("帳票・文書処理", "OCR、分類、転記、承認フローを組み合わせた業務短縮。"),
        ("製造・点検の高度化", "画像・センサー・ロボットを使った記録、判定、巡回検証。"),
        ("社内AI活用の定着", "業務ルール、教育、ガバナンス、効果測定を一体で整備。"),
    ]), Spacer(1, 10 * mm)]
    story += section("会社概要")
    story += [data_table(["項目", "内容"], [
        ["会社名", "clearAI株式会社"], ["所在地", "茨城県を拠点に全国対応"],
        ["事業", "AI・ソフトウェア開発、ロボットレンタル、AI研修、AIコンサルティング"],
        ["Web", "https://clearai.jp"], ["お問い合わせ", "info@clearai.jp"],
    ], [38 * mm, 136 * mm])]
    document(OUTPUT / "company-guide.pdf").build(story)


def build_software():
    story = cover("システム・ソフトウェア開発\n事業紹介資料", "AIを組み込んだ業務システムを、使われる状態まで。見積の考え方、着手前の判断、開発プロセス、権利・データの扱いを整理しました。")
    story += section("『作ったが使われない』を避ける", "AI開発では精度だけでなく、現場フロー・例外処理・責任分界が成否を左右します。")
    story += [cards([
        ("対象業務を絞る", "誰のどの作業を、どこまで変えるかを一文で定義します。"),
        ("合格ラインを決める", "精度、時間、コスト、確認工数の許容範囲を先に決めます。"),
        ("測り方を決める", "検証データ、比較対象、判断者を固定して評価を再現可能にします。"),
        ("運用を設計する", "AIが迷った時の人への引き継ぎ、ログ、更新責任を決めます。"),
    ]), PageBreak()]
    story += section("開発プロセス", "最短2週間のプロトタイプで重要な仮説を先に検証し、投資判断を段階化します。")
    story += [data_table(["段階", "主な作業", "判断すること"], [
        ["01 Discovery", "業務観察・要件整理・データ確認", "対象業務と成功指標"],
        ["02 Prototype", "重要画面・AI処理の試作", "技術成立性と利用価値"],
        ["03 Build", "本実装・外部連携・権限設計", "本番要件を満たすか"],
        ["04 Validate", "実データ検証・セキュリティ確認", "合格ラインを超えたか"],
        ["05 Release", "移行・教育・監視・改善", "継続運用できるか"],
    ], [35 * mm, 78 * mm, 61 * mm]), Spacer(1, 8 * mm)]
    story += section("対応領域")
    story += bullet_list(["業務システム・ダッシュボード", "生成AI・RAG・チャットボット", "OCR・文書処理", "外部API・SaaS連携", "モバイル・現場アプリ", "クラウド・運用基盤"])
    story += [PageBreak()]
    story += section("見積書で確認する5項目")
    story += [cards([
        ("要件定義", "調査・業務整理・プロトタイプが含まれるか。"),
        ("データ整備", "抽出、クレンジング、ラベル付けの責任と費用。"),
        ("外部費用", "AI API、クラウド、SaaS、ライセンスの扱い。"),
        ("テスト・移行", "受入条件、既存データ移行、教育の範囲。"),
        ("保守・改善", "障害対応、モデル更新、追加開発の契約単位。"),
        ("前提と除外", "見積に含まれない作業と、変更時の計算方法。"),
    ]), Spacer(1, 8 * mm)]
    story += section("契約・権利・データ")
    story += bullet_list(["成果物・ソースコード・学習物の権利帰属を契約前に明確化", "入力データの保管場所、保存期間、再利用可否を明記", "本番アクセス権、秘密情報、委託先の管理範囲を合意", "検収条件と仕様変更の手続きを書面化"])
    story += [Spacer(1, 8 * mm), Paragraph("個別見積：info@clearai.jp / https://clearai.jp/software-development", styles["JPBody"])]
    document(OUTPUT / "software-development-guide.pdf").build(story)


def build_robot():
    story = cover("ロボットレンタル\n事業紹介資料", "Unitree R1・G1・Go2を1泊2日から全国へ。機種、グレード、料金、補償、検証時のチェックポイントをまとめました。")
    story += section("3機種の選び方")
    story += [data_table(["機種", "主な用途", "特徴", "1泊2日〜（税別）"], [
        ["Unitree R1", "展示・撮影・接客デモ", "軽量な中型ヒューマノイド", "Basic ¥50,000 / R&D ¥100,000"],
        ["Unitree G1", "研究開発・実証・展示", "深度カメラ + 3D LiDAR", "Basic ¥50,000 / R&D ¥100,000"],
        ["Unitree Go2", "巡回・点検・イベント", "四足歩行・4D LiDAR L1", "Air ¥5,000 / R&D ¥25,000"],
    ], [27 * mm, 43 * mm, 51 * mm, 53 * mm]), Spacer(1, 8 * mm), Paragraph("グレードの注意", styles["JPH2"])]
    story += bullet_list(["2次開発（自社ソフトの実装）が可能なのはR&Dグレードのみ", "Go2 AIR / PROはソフトウェア開発用途に非対応", "オプションハンドやオペレーター帯同は個別見積"])
    story += [PageBreak()]
    story += section("料金の目安", "表示価格は税別、送料は機種・配送先ごとの個別見積です。")
    story += [data_table(["期間", "R1 Basic", "R1 R&D", "G1 Basic", "G1 R&D", "Go2 Air", "Go2 R&D"], [
        ["1泊2日", "¥50,000", "¥100,000", "¥50,000", "¥100,000", "¥5,000", "¥25,000"],
        ["3泊4日", "¥125,000", "¥250,000", "¥125,000", "¥250,000", "¥30,000", "¥60,000"],
        ["7泊8日", "¥250,000", "¥500,000", "¥250,000", "¥500,000", "¥60,000", "¥120,000"],
        ["1か月", "¥600,000", "¥1,200,000", "¥600,000", "¥1,200,000", "—", "¥400,000"],
        ["3か月", "¥1,551,000", "¥3,102,000", "¥1,551,000", "¥3,102,000", "—", "¥900,000"],
    ], [25 * mm] + [24.8 * mm] * 6), Spacer(1, 7 * mm)]
    story += bullet_list(["延長：R1・G1 ¥40,000/日、Go2 ¥5,000/日（税別）", "8泊9日以上、7か月超は個別見積", "1か月は30泊31日として計算"])
    story += [PageBreak()]
    story += section("補償・キャンセル・利用条件")
    story += [cards([
        ("安心補償付き", "通常の利用範囲での破損は免責費用なし。"),
        ("キャンセル無料", "発送日の1営業日前までの連絡でキャンセル料なし。"),
        ("全国配送", "送料は配送先と機種に応じて事前見積。"),
        ("延長相談", "レンタル中も1日単位で延長を相談可能。"),
    ]), Spacer(1, 8 * mm)]
    story += section("現場チェックリスト")
    story += bullet_list(["通路幅、扉、段差、傾斜、床材", "照明、逆光、鏡・ガラス、屋内外の区分", "人・台車・車両との交錯、安全確保エリア", "通信環境、電源、充電場所、稼働時間", "取得データ、撮影可否、立入権限"])
    story += [PageBreak()]
    story += section("実証で測る指標")
    story += [data_table(["観点", "測定例"], [
        ["走行・動作", "完走率、停止回数、段差通過、転倒・復帰"],
        ["運用", "準備時間、充電回数、操作者工数、教育時間"],
        ["安全", "人との距離、緊急停止、立入管理、ヒヤリハット"],
        ["事業性", "削減時間、代替できる作業、導入費用、回収期間"],
    ], [48 * mm, 126 * mm]), Spacer(1, 9 * mm), Paragraph("空き状況・送料込み見積：info@clearai.jp / https://clearai.jp/robot-rental", styles["JPBody"])]
    document(OUTPUT / "robot-rental-guide.pdf").build(story)


def build_training():
    story = cover("AI内製化研修\n事業紹介資料", "聞くだけで終わらず、自社の業務成果物を作る研修。カリキュラム、料金、助成金、受講後の定着支援をまとめました。")
    story += section("内製化で戻せる力", "すべてを自社開発するのではなく、日々の小さな改善を社内で回し、外部開発の発注精度も上げます。")
    story += [cards([
        ("基礎", "生成AIの仕組み、情報管理、プロンプト、業務分解。"),
        ("実装", "自動化、データ処理、簡易アプリ、API連携をハンズオン。"),
        ("成果物", "参加者が自部署のテーマを使い、実務で使う形に仕上げます。"),
        ("定着", "社内ルール、レビュー、改善会、相談窓口まで設計します。"),
    ]), PageBreak()]
    story += section("料金プラン", "表示は通常価格（税別）。助成金の適用額は企業・研修・申請状況で異なります。")
    story += [data_table(["プラン", "対象・時間", "通常価格", "助成金適用後の目安", "主な内容"], [
        ["ライト", "3〜5名 / 全5回・10時間", "¥800,000〜", "¥200,000〜", "オンライン / 1テーマ / 申請支援"],
        ["スタンダード", "5〜10名 / 全10回・20時間〜", "¥2,000,000", "¥500,000前後", "対面可 / 実務テーマ / 3か月フォロー"],
        ["プレミアム", "10〜20名 / 全社", "¥3,000,000〜", "¥750,000〜", "部門横断 / 複数テーマ / 個別設計"],
    ], [27 * mm, 41 * mm, 29 * mm, 38 * mm, 39 * mm]), Spacer(1, 8 * mm)]
    story += section("研修で作る成果物の例")
    story += bullet_list(["問い合わせ回答案の生成と確認フロー", "社内規程・マニュアルの検索アシスタント", "定例レポートの収集・整形・要約", "見積・提案・議事録の作成支援", "簡易な業務アプリ・ダッシュボード"])
    story += [PageBreak()]
    story += section("人材開発支援助成金", "助成金の活用は、訓練開始前の計画提出と要件確認が重要です。採択や支給を保証するものではありません。")
    story += [data_table(["段階", "行うこと"], [
        ["01 対象確認", "企業・従業員・訓練内容が制度要件に合うか確認"],
        ["02 計画作成", "訓練日程、対象者、費用、カリキュラムを確定"],
        ["03 事前申請", "所定期限までに計画届などを提出"],
        ["04 研修実施", "出席・実施記録・費用支払いの証憑を保管"],
        ["05 支給申請", "研修終了後、期限内に必要書類を提出"],
    ], [40 * mm, 134 * mm]), Spacer(1, 8 * mm), Paragraph("制度の最新要件は厚生労働省・労働局の案内をご確認ください。", styles["JPSmall"]), PageBreak()]
    story += section("受講の流れと定着支援")
    story += [cards([
        ("業務ヒアリング", "対象部門、参加者、成果物テーマ、情報管理条件を確認。"),
        ("カリキュラム設計", "レベルと業務に合わせて演習・宿題・評価を調整。"),
        ("研修・制作", "手を動かしながら、実際に使う成果物を段階的に作成。"),
        ("成果発表", "効果・課題・改善案を共有し、次の実装判断へ。"),
        ("アフターフォロー", "利用状況を確認し、詰まりやルールを改善。"),
        ("社内展開", "講師役、テンプレート、レビュー会を整えて横展開。"),
    ]), Spacer(1, 9 * mm), Paragraph("研修相談・助成金の事前確認：info@clearai.jp / https://clearai.jp/training", styles["JPBody"])]
    document(OUTPUT / "ai-training-guide.pdf").build(story)


if __name__ == "__main__":
    build_company()
    build_software()
    build_robot()
    build_training()
    for file in sorted(OUTPUT.glob("*.pdf")):
        print(f"created {file} ({file.stat().st_size:,} bytes)")
