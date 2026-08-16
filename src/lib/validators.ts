export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const ALLOWED_SIZES = ["~50名", "51-200名", "201-500名", "501-1000名", "1001名~", ""];
export const INQUIRY_TYPES = ["business", "engineer", "other"] as const;
export type InquiryType = (typeof INQUIRY_TYPES)[number];

/** Service keys used via ?service= query param to pre-select inquiry context */
export const SERVICE_KEYS = [
  "software-development",
  "robot-rental",
  "consulting",
  "advisor",
  "sns",
  "education",
  "ceo",
  "claude-code",
  "subsidy",
  "advertising",
  "website",
] as const;
export type ServiceKey = (typeof SERVICE_KEYS)[number];

export const SERVICE_LABELS: Record<ServiceKey, string> = {
  "software-development": "システム・ソフトウェア開発",
  "robot-rental": "ロボットレンタル",
  consulting: "AIコンサル・DX",
  advisor: "AI顧問",
  sns: "SNS運用代行",
  education: "AI研修",
  ceo: "経営者向けAI活用",
  "claude-code": "Claude特化（スクール／導入支援）",
  subsidy: "補助金・助成金サポート",
  advertising: "AI広告運用",
  website: "ウェブサイト作成",
};

/** Downloadable business decks sent directly from /download. */
export const DOCUMENT_KEYS = [
  "company",
  "software-development",
  "robot-rental",
  "training",
] as const;
export type DocumentKey = (typeof DOCUMENT_KEYS)[number];

export const DOCUMENT_LABELS: Record<DocumentKey, string> = {
  company: "会社紹介資料",
  "software-development": "システム・ソフトウェア開発 事業紹介資料",
  "robot-rental": "ロボットレンタル 事業紹介資料",
  training: "AI内製化研修 事業紹介資料",
};

export interface ContactFormData {
  inquiryType?: string;
  company?: string;
  name: string;
  email: string;
  phone?: string;
  size?: string;
  position?: string;
  experience?: string;
  portfolio?: string;
  message: string;
}

export function validateContactForm(data: ContactFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  const inquiryType: InquiryType =
    data.inquiryType && (INQUIRY_TYPES as readonly string[]).includes(data.inquiryType)
      ? (data.inquiryType as InquiryType)
      : "business";

  // 会社名: business のみ必須
  if (inquiryType === "business") {
    if (!data.company || data.company.trim().length === 0) {
      errors.company = "会社名は必須です。";
    } else if (data.company.trim().length > 200) {
      errors.company = "会社名は200文字以内でご入力ください。";
    }
  } else if (data.company && data.company.trim().length > 200) {
    errors.company = "会社名は200文字以内でご入力ください。";
  }

  if (!data.name || data.name.trim().length === 0) {
    errors.name = "お名前は必須です。";
  } else if (data.name.trim().length > 100) {
    errors.name = "お名前は100文字以内でご入力ください。";
  }

  if (!data.email || data.email.trim().length === 0) {
    errors.email = "メールアドレスは必須です。";
  } else if (!isValidEmail(data.email.trim())) {
    errors.email = "有効なメールアドレスを入力してください。";
  }

  if (data.phone && data.phone.trim().length > 50) {
    errors.phone = "電話番号は50文字以内でご入力ください。";
  }

  if (data.size !== undefined && data.size !== null && !ALLOWED_SIZES.includes(data.size)) {
    errors.size = "有効な従業員規模を選択してください。";
  }

  // エンジニア応募固有
  if (inquiryType === "engineer") {
    if (!data.position || data.position.trim().length === 0) {
      errors.position = "希望ポジションは必須です。";
    } else if (data.position.trim().length > 100) {
      errors.position = "希望ポジションは100文字以内でご入力ください。";
    }

    if (data.experience && data.experience.trim().length > 100) {
      errors.experience = "経験年数は100文字以内でご入力ください。";
    }

    if (data.portfolio && data.portfolio.trim().length > 500) {
      errors.portfolio = "URLは500文字以内でご入力ください。";
    }
  }

  if (!data.message || data.message.trim().length === 0) {
    errors.message = inquiryType === "engineer" ? "自己紹介は必須です。" : "ご相談内容は必須です。";
  } else if (data.message.trim().length < 10) {
    errors.message = inquiryType === "engineer" ? "自己紹介は10文字以上でご入力ください。" : "ご相談内容は10文字以上でご入力ください。";
  } else if (data.message.trim().length > 5000) {
    errors.message = "5000文字以内でご入力ください。";
  }

  return errors;
}
