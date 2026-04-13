export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const ALLOWED_SIZES = ["~50名", "51-200名", "201-500名", "501-1000名", "1001名~", ""];

export interface ContactFormData {
  company: string;
  name: string;
  email: string;
  phone?: string;
  size?: string;
  message: string;
}

export function validateContactForm(data: ContactFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.company || data.company.trim().length === 0) {
    errors.company = "会社名は必須です。";
  } else if (data.company.trim().length > 200) {
    errors.company = "会社名は200文字以内でご入力ください。";
  }

  if (!data.name || data.name.trim().length === 0) {
    errors.name = "ご担当者名は必須です。";
  } else if (data.name.trim().length > 100) {
    errors.name = "ご担当者名は100文字以内でご入力ください。";
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

  if (!data.message || data.message.trim().length === 0) {
    errors.message = "ご相談内容は必須です。";
  } else if (data.message.trim().length < 10) {
    errors.message = "ご相談内容は10文字以上でご入力ください。";
  } else if (data.message.trim().length > 5000) {
    errors.message = "ご相談内容は5000文字以内でご入力ください。";
  }

  return errors;
}
