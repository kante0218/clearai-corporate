export function todayInJapan(now = new Date()) {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Tokyo" }).format(now);
}

export function addDays(date: string, days: number) {
  const value = new Date(`${date}T12:00:00Z`);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
}

export function moveMonth(date: string, months: number) {
  const value = new Date(`${date}T12:00:00Z`);
  const day = value.getUTCDate();
  value.setUTCDate(1);
  value.setUTCMonth(value.getUTCMonth() + months);
  const lastDay = new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth() + 1, 0)).getUTCDate();
  value.setUTCDate(Math.min(day, lastDay));
  return value.toISOString().slice(0, 10);
}

export function formatRentalDate(date: string, locale = "ja-JP") {
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric", weekday: "short", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}
