import { JWT } from "google-auth-library";

// ---------------------------------------------------------------------------
// ClearAI booking — Google Calendar integration (service account + DWD)
//
// Auth: a Google Cloud service account with domain-wide delegation that
// impersonates a clearai.jp Workspace user (BOOKING_IMPERSONATE_SUBJECT).
// Impersonation is what lets us read FreeBusy, create events, attach a real
// Google Meet link, and send invites — all as the actual user.
//
// Required env vars (set in Vercel):
//   GOOGLE_SA_CLIENT_EMAIL        service account email
//   GOOGLE_SA_PRIVATE_KEY         service account private key (PEM, \n escaped ok)
//   BOOKING_CALENDAR_ID           calendar to book on (e.g. t.kante@clearai.jp)
//   BOOKING_IMPERSONATE_SUBJECT   user to impersonate (defaults to calendar id)
// ---------------------------------------------------------------------------

export const TIMEZONE = "Asia/Tokyo"; // Japan has no DST → JST is always UTC+9.
export const SLOT_MINUTES = 30;
const MIN_NOTICE_MINUTES = 180; // earliest bookable = now + 3h
const HORIZON_DAYS = 30; // how far ahead bookings are allowed

// Business hours per weekday in JST. [startHour, endHour) or null = closed.
const BUSINESS_HOURS: Record<number, [number, number] | null> = {
  0: null, // Sun
  1: [10, 18], // Mon
  2: [10, 18], // Tue
  3: [10, 18], // Wed
  4: [10, 18], // Thu
  5: [10, 18], // Fri
  6: [10, 17], // Sat
};

const CAL_API = "https://www.googleapis.com/calendar/v3";
const WEEKDAY_INDEX: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

interface SaEnv {
  clientEmail: string;
  privateKey: string;
  calendarId: string;
  subject: string;
}

function getEnv(): SaEnv | null {
  const clientEmail = process.env.GOOGLE_SA_CLIENT_EMAIL;
  const rawKey = process.env.GOOGLE_SA_PRIVATE_KEY;
  const calendarId = process.env.BOOKING_CALENDAR_ID;
  if (!clientEmail || !rawKey || !calendarId) return null;
  const privateKey = rawKey.replace(/\\n/g, "\n").replace(/^"|"$/g, "");
  const subject = process.env.BOOKING_IMPERSONATE_SUBJECT || calendarId;
  return { clientEmail, privateKey, calendarId, subject };
}

export function isConfigured(): boolean {
  return getEnv() !== null;
}

async function getAccessToken(env: SaEnv): Promise<string> {
  const client = new JWT({
    email: env.clientEmail,
    key: env.privateKey,
    scopes: ["https://www.googleapis.com/auth/calendar"],
    subject: env.subject,
  });
  const { token } = await client.getAccessToken();
  if (!token) throw new Error("Failed to obtain Google access token");
  return token;
}

interface BusyInterval {
  start: number; // epoch ms
  end: number;
}

async function fetchBusy(env: SaEnv, token: string, timeMinISO: string, timeMaxISO: string): Promise<BusyInterval[]> {
  const res = await fetch(`${CAL_API}/freeBusy`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ timeMin: timeMinISO, timeMax: timeMaxISO, timeZone: TIMEZONE, items: [{ id: env.calendarId }] }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`freeBusy failed: ${res.status} ${body}`);
  }
  const data = await res.json();
  const cal = data?.calendars?.[env.calendarId];
  const busy: Array<{ start: string; end: string }> = cal?.busy ?? [];
  return busy.map((b) => ({ start: Date.parse(b.start), end: Date.parse(b.end) }));
}

// ---- JST date helpers (no DST, so a fixed +09:00 offset is exact) ----------
function jstDateStr(d: Date): string {
  // en-CA → YYYY-MM-DD
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIMEZONE, year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
}
function jstWeekday(dateStr: string): number {
  const d = new Date(`${dateStr}T12:00:00+09:00`);
  const wd = new Intl.DateTimeFormat("en-US", { timeZone: TIMEZONE, weekday: "short" }).format(d);
  return WEEKDAY_INDEX[wd];
}
function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

export interface DayAvailability {
  date: string; // YYYY-MM-DD (JST)
  weekday: number;
  slots: string[]; // ["10:00","10:30", ...] JST
}

export interface AvailabilityResult {
  configured: boolean;
  timezone: string;
  slotMinutes: number;
  days: DayAvailability[];
}

export async function getAvailability(): Promise<AvailabilityResult> {
  const env = getEnv();
  if (!env) return { configured: false, timezone: TIMEZONE, slotMinutes: SLOT_MINUTES, days: [] };

  const token = await getAccessToken(env);
  const now = new Date();
  const horizonEnd = new Date(now.getTime() + HORIZON_DAYS * 86400000);
  const busy = await fetchBusy(env, token, now.toISOString(), horizonEnd.toISOString());

  const earliest = now.getTime() + MIN_NOTICE_MINUTES * 60000;
  const slotMs = SLOT_MINUTES * 60000;
  const todayStr = jstDateStr(now);
  const anchor = Date.parse(`${todayStr}T12:00:00+09:00`);

  const days: DayAvailability[] = [];
  for (let offset = 0; offset <= HORIZON_DAYS; offset++) {
    const dateStr = jstDateStr(new Date(anchor + offset * 86400000));
    const weekday = jstWeekday(dateStr);
    const hours = BUSINESS_HOURS[weekday];
    if (!hours) continue;

    const [startHour, endHour] = hours;
    const slots: string[] = [];
    for (let mins = startHour * 60; mins + SLOT_MINUTES <= endHour * 60; mins += SLOT_MINUTES) {
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      const slotStart = Date.parse(`${dateStr}T${pad(h)}:${pad(m)}:00+09:00`);
      const slotEnd = slotStart + slotMs;
      if (slotStart < earliest) continue;
      const overlaps = busy.some((b) => slotStart < b.end && slotEnd > b.start);
      if (overlaps) continue;
      slots.push(`${pad(h)}:${pad(m)}`);
    }
    if (slots.length > 0) days.push({ date: dateStr, weekday, slots });
  }

  return { configured: true, timezone: TIMEZONE, slotMinutes: SLOT_MINUTES, days };
}

export interface BookingInput {
  date: string; // YYYY-MM-DD
  time: string; // HH:mm (JST)
  name: string;
  email: string;
  company?: string;
  note?: string;
}

export interface BookingResult {
  ok: boolean;
  meetLink?: string;
  htmlLink?: string;
  startISO?: string;
  error?: string;
  code?: "not_configured" | "slot_taken" | "invalid" | "server";
}

function isValidSlot(date: string, time: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) return false;
  const [h, m] = time.split(":").map(Number);
  const weekday = jstWeekday(date);
  const hours = BUSINESS_HOURS[weekday];
  if (!hours) return false;
  if (m !== 0 && m !== 30) return false;
  const mins = h * 60 + m;
  return mins >= hours[0] * 60 && mins + SLOT_MINUTES <= hours[1] * 60;
}

export async function createBooking(input: BookingInput): Promise<BookingResult> {
  const env = getEnv();
  if (!env) return { ok: false, code: "not_configured", error: "Booking is not configured." };

  if (!isValidSlot(input.date, input.time)) {
    return { ok: false, code: "invalid", error: "Invalid time slot." };
  }

  const startISO = `${input.date}T${input.time}:00+09:00`;
  const startMs = Date.parse(startISO);
  const endMs = startMs + SLOT_MINUTES * 60000;
  const endISO = new Date(endMs).toISOString();

  // Reject past / too-soon bookings.
  if (startMs < Date.now() + MIN_NOTICE_MINUTES * 60000) {
    return { ok: false, code: "slot_taken", error: "This slot is no longer available." };
  }

  const token = await getAccessToken(env);

  // Re-check the specific slot against the live calendar (double-booking guard).
  const busy = await fetchBusy(env, token, new Date(startMs).toISOString(), endISO);
  if (busy.some((b) => startMs < b.end && endMs > b.start)) {
    return { ok: false, code: "slot_taken", error: "This slot was just taken." };
  }

  const descLines = [
    "ClearAI 無料相談のご予約",
    `お名前: ${input.name}`,
    input.company ? `会社名: ${input.company}` : "",
    `メール: ${input.email}`,
    "",
    input.note ? `ご相談内容:\n${input.note}` : "",
  ].filter(Boolean);

  // End time as JST wall-clock (YYYY-MM-DDTHH:mm:00) for the Calendar API.
  const endParts = new Intl.DateTimeFormat("en-CA", { timeZone: TIMEZONE, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date(endMs));
  const ep = (t: string) => endParts.find((p) => p.type === t)?.value ?? "00";
  const endDateTimeJst = `${ep("year")}-${ep("month")}-${ep("day")}T${ep("hour")}:${ep("minute")}:00`;

  const event = {
    summary: `ClearAI 無料相談 / ${input.name}様`,
    description: descLines.join("\n"),
    start: { dateTime: `${input.date}T${input.time}:00`, timeZone: TIMEZONE },
    end: { dateTime: endDateTimeJst, timeZone: TIMEZONE },
    attendees: [{ email: input.email }],
    conferenceData: {
      createRequest: {
        requestId: globalThis.crypto?.randomUUID?.() ?? `clearai-${startMs}`,
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
    reminders: { useDefault: true },
  };

  const res = await fetch(`${CAL_API}/calendars/${encodeURIComponent(env.calendarId)}/events?conferenceDataVersion=1&sendUpdates=all`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("[booking] create event failed", res.status, body);
    return { ok: false, code: "server", error: "Failed to create the booking." };
  }

  const data = await res.json();
  const meetLink: string | undefined =
    data?.hangoutLink ?? data?.conferenceData?.entryPoints?.find((e: { entryPointType?: string; uri?: string }) => e.entryPointType === "video")?.uri;

  return { ok: true, meetLink, htmlLink: data?.htmlLink, startISO };
}
