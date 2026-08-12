export const RENTAL_MODELS = {
  r1: {
    name: "Unitree R1",
    grades: {
      Basic: [50000, 90000, 125000, 160000, 190000, 215000, 250000],
      "R&D": [100000, 180000, 250000, 320000, 380000, 430000, 500000],
    },
  },
  g1: {
    name: "Unitree G1",
    grades: {
      Basic: [50000, 90000, 125000, 160000, 190000, 215000, 250000],
      "R&D": [100000, 180000, 250000, 320000, 380000, 430000, 500000],
    },
  },
  go2: {
    name: "Unitree Go2",
    grades: {
      Air: [5000, 25000, 30000, 40000, 45000, 50000, 60000],
      "R&D": [25000, 40000, 60000, 80000, 90000, 100000, 120000],
    },
  },
} as const;

export type RentalModelId = keyof typeof RENTAL_MODELS;

export type RentalApplication = {
  submissionId: string;
  model: RentalModelId;
  grade: string;
  nights: number;
  engineerPlan: "hourly" | "day";
  engineerHours: number;
  startDate: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  postalCode: string;
  prefecture: string;
  address1: string;
  address2: string;
  useCase: RentalUseCase;
  website: string;
  accepted: boolean;
};

export const ENGINEER_HOURLY_RATE = 10000;
export const ENGINEER_DAY_RATE = 100000;

export const RENTAL_USE_CASES = {
  exhibition: "展示会・イベント",
  validation: "購入前の実機検証",
  poc: "巡回・点検のPoC",
  research: "研究開発",
  filming: "撮影・PR",
  other: "その他",
} as const;

export type RentalUseCase = keyof typeof RENTAL_USE_CASES;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function isModel(value: string): value is RentalModelId {
  return Object.prototype.hasOwnProperty.call(RENTAL_MODELS, value);
}

function isUseCase(value: string): value is RentalUseCase {
  return Object.prototype.hasOwnProperty.call(RENTAL_USE_CASES, value);
}

export function parseRentalApplication(input: unknown):
  | { ok: true; value: RentalApplication; amountExcludingTax: number; amountIncludingTax: number; returnDate: string }
  | { ok: false; error: string } {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, error: "入力内容を確認できませんでした。" };
  }

  const body = input as Record<string, unknown>;
  const submissionId = clean(body.submissionId, 36);
  const model = clean(body.model, 10);
  const grade = clean(body.grade, 20);
  const nights = Number(body.nights);
  const engineerPlan = clean(body.engineerPlan, 10);
  const engineerHours = Number(body.engineerHours);
  const startDate = clean(body.startDate, 10);
  const company = clean(body.company, 120);
  const name = clean(body.name, 80);
  const email = clean(body.email, 254).toLowerCase();
  const phone = clean(body.phone, 30);
  const postalCode = clean(body.postalCode, 12);
  const prefecture = clean(body.prefecture, 20);
  const address1 = clean(body.address1, 160);
  const address2 = clean(body.address2, 160);
  const useCase = clean(body.useCase, 30);
  const website = clean(body.website, 200);
  const accepted = body.accepted === true;

  if (!UUID_PATTERN.test(submissionId)) return { ok: false, error: "申込を開始し直してください。" };
  if (!isModel(model)) return { ok: false, error: "機種を選び直してください。" };
  if (!Object.prototype.hasOwnProperty.call(RENTAL_MODELS[model].grades, grade)) {
    return { ok: false, error: "グレードを選び直してください。" };
  }
  if (!Number.isInteger(nights) || nights < 1 || nights > 7) {
    return { ok: false, error: "利用期間を選び直してください。" };
  }
  if (engineerPlan !== "hourly" && engineerPlan !== "day") {
    return { ok: false, error: "初日のエンジニア帯同プランを選択してください。" };
  }
  if (engineerPlan === "hourly" && (!Number.isInteger(engineerHours) || engineerHours < 1 || engineerHours > 9)) {
    return { ok: false, error: "時間帯同は1〜9時間で指定してください。" };
  }
  if (!DATE_PATTERN.test(startDate)) return { ok: false, error: "利用開始日を入力してください。" };

  const start = new Date(`${startDate}T00:00:00+09:00`);
  const japanDate = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Tokyo" });
  const today = japanDate.format(new Date());
  if (Number.isNaN(start.getTime()) || japanDate.format(start) !== startDate || startDate < today) {
    return { ok: false, error: "利用開始日は本日以降を指定してください。" };
  }
  if (!company || !name || !email || !phone || !postalCode || !prefecture || !address1 || !isUseCase(useCase)) {
    return { ok: false, error: "必須項目をすべて入力してください。" };
  }
  if (!EMAIL_PATTERN.test(email)) return { ok: false, error: "メールアドレスを確認してください。" };
  if (!accepted) return { ok: false, error: "利用条件と個人情報の取り扱いへの同意が必要です。" };

  const prices = RENTAL_MODELS[model].grades[grade as keyof typeof RENTAL_MODELS[typeof model]["grades"]] as readonly number[];
  const rentalAmountExcludingTax = prices[nights - 1];
  const engineerAmountExcludingTax = engineerPlan === "day"
    ? ENGINEER_DAY_RATE
    : engineerHours * ENGINEER_HOURLY_RATE;
  const amountExcludingTax = rentalAmountExcludingTax + engineerAmountExcludingTax;
  const amountIncludingTax = Math.round(amountExcludingTax * 1.1);
  const returnAt = new Date(start);
  returnAt.setUTCDate(returnAt.getUTCDate() + nights);
  const returnDate = japanDate.format(returnAt);

  return {
    ok: true,
    value: {
      submissionId,
      model,
      grade,
      nights,
      engineerPlan,
      engineerHours: engineerPlan === "day" ? 10 : engineerHours,
      startDate,
      company,
      name,
      email,
      phone,
      postalCode,
      prefecture,
      address1,
      address2,
      useCase,
      website,
      accepted,
    },
    amountExcludingTax,
    amountIncludingTax,
    returnDate,
  };
}

export function modelLabel(model: RentalModelId) {
  return RENTAL_MODELS[model].name;
}

export function useCaseLabel(useCase: RentalUseCase) {
  return RENTAL_USE_CASES[useCase];
}
