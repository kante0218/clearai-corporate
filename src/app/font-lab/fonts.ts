import { Zen_Kaku_Gothic_New, Noto_Sans_JP, BIZ_UDPGothic } from "next/font/google";

// ローカル検証専用。ここで読んだ書体は /font-lab のツリーにしか適用されない。
const zenKaku = Zen_Kaku_Gothic_New({ subsets: ["latin"], weight: ["400", "500", "700", "900"], display: "swap" });
const notoSansJp = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "500", "700", "900"], display: "swap" });
const bizUdp = BIZ_UDPGothic({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });

const HELVETICA = '"Helvetica Neue", Helvetica, Arial';

export type FontCandidate = {
  id: string;
  name: string;
  latin: string;
  /** Webフォント読み込みの有無 */
  delivery: string;
  note: string;
  /** どんな会社に見えるか */
  impression: string;
  stack: string;
  current?: boolean;
};

export const CANDIDATES: FontCandidate[] = [
  {
    id: "current",
    name: "Zen Kaku Gothic New（現行）",
    latin: "Helvetica Neue（欧文だけ別書体）",
    delivery: "Webフォント",
    note: "筑紫ゴシックに寄せたデザイン書体。欧文をHelveticaにしているため、英数字だけ和文と表情が違う。",
    impression: "洗練・デザイン寄り。線が細く軽い。日本語サイトとしてはやや作り込んだ顔。",
    stack: `${HELVETICA}, ${zenKaku.style.fontFamily}, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif`,
    current: true,
  },
  {
    id: "hiragino",
    name: "ヒラギノ角ゴシック ProN",
    latin: "ヒラギノの従属欧文（同一書体）",
    delivery: "OS標準・読み込みゼロ",
    note: "Mac/iPhoneの標準和文書体。日本のWebサイトでいちばん見慣れている字面。Windowsでは游ゴシック→メイリオに自動で落ちる。",
    impression: "普通・自然・素直。「日本語のサイト」として何の引っかかりもない。表示も最速。",
    stack: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic Medium", "Yu Gothic", YuGothic, Meiryo, sans-serif',
  },
  {
    id: "yugothic",
    name: "游ゴシック体",
    latin: "游ゴシックの従属欧文（同一書体）",
    delivery: "OS標準・読み込みゼロ",
    note: "Mac/Windows両方に入っている日本語書体。企業サイト・IR資料で定番。ふところが狭く、線が上品。",
    impression: "きちんと・端正・落ち着き。大人の会社に見える。ヒラギノより少しかたい。",
    // macOS は "游ゴシック体"/YuGothic でしか当たらない（"Yu Gothic Medium" は未解決）。
    // Windows 用の名前は後ろに置き、太さの出る Medium を優先する。
    stack: '"游ゴシック体", YuGothic, "Yu Gothic Medium", "游ゴシック Medium", "Yu Gothic", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
  },
  {
    id: "noto",
    name: "Noto Sans JP（源ノ角ゴシック）",
    latin: "Noto Sans JPの従属欧文（同一書体）",
    delivery: "Webフォント",
    note: "AdobeとGoogleが日本語のために作った書体。日本のコーポレートサイトで最も採用が多い。全端末で同じ見た目になる。",
    impression: "王道・可読性最強・無難。誰の環境でも崩れない安心感。",
    stack: `${notoSansJp.style.fontFamily}, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif`,
  },
  {
    id: "bizud",
    name: "BIZ UDPGothic",
    latin: "BIZ UDの従属欧文（同一書体）",
    delivery: "Webフォント",
    note: "モリサワのビジネス向けUD書体。行政・自治体・企業の業務文書で標準的に使われている。",
    impression: "堅実・誠実・公的。見慣れた業務書類の字面で、中小企業の決裁者に効く。",
    stack: `${bizUdp.style.fontFamily}, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif`,
  },
  {
    id: "yumincho",
    name: "游明朝体",
    latin: "游明朝の従属欧文（同一書体）",
    delivery: "OS標準・読み込みゼロ",
    note: "Mac/Windows標準の明朝。金融・士業・老舗メーカーの系統。見出しだけ明朝にする使い方もできる。",
    impression: "格式・重厚・信頼。スタートアップ感は消え、腰の据わった会社に見える。",
    stack: '"Yu Mincho", YuMincho, "游明朝体", "Hiragino Mincho ProN", "MS PMincho", serif',
  },
];
