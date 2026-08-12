import { createHmac } from "crypto";
import { checkBotId } from "botid/server";
import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { modelLabel, parseRentalApplication, RENTAL_MODELS } from "@/lib/robot-rental-order";
import { RENTAL_IDENTITY_COOKIE, signRentalSession } from "@/lib/robot-rental-session";

export const runtime = "nodejs";

const attempts = new Map<string, { count: number; expires: number }>();

function allowedOrigin(request: Request) {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get("origin");
  if (!origin) return null;
  try {
    const parsed = new URL(origin);
    const sameHost = parsed.host === requestUrl.host;
    const production = ["clearai.jp", "www.clearai.jp"].includes(parsed.hostname);
    const local = ["localhost", "127.0.0.1"].includes(parsed.hostname);
    return sameHost || production || local ? parsed.origin : null;
  } catch {
    return null;
  }
}

function withinRateLimit(request: Request) {
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  if (attempts.size > 2000) {
    for (const [ip, entry] of attempts) {
      if (entry.expires < now) attempts.delete(ip);
    }
    if (attempts.size > 2000) attempts.delete(attempts.keys().next().value ?? "");
  }
  const current = attempts.get(key);
  if (!current || current.expires < now) {
    attempts.set(key, { count: 1, expires: now + 10 * 60 * 1000 });
    return true;
  }
  if (current.count >= 4) return false;
  current.count += 1;
  return true;
}

function applicationFingerprint(parts: string[]) {
  const secret = process.env.ROBOT_RENTAL_SESSION_SECRET ?? process.env.STRIPE_SECRET_KEY;
  if (!secret) throw new Error("Robot rental session secret is not configured");
  return createHmac("sha256", secret).update(JSON.stringify(parts)).digest("hex").slice(0, 32);
}

export async function POST(request: Request) {
  if (process.env.NEXT_PUBLIC_ROBOT_RENTAL_APPLICATION_ENABLED !== "true") {
    return NextResponse.json({ error: "現在、オンライン申込の準備中です。" }, { status: 404 });
  }

  const origin = allowedOrigin(request);
  if (!origin) return NextResponse.json({ error: "無効なリクエストです。" }, { status: 403 });
  const bot = await checkBotId();
  if (bot.isBot) return NextResponse.json({ error: "自動送信は受け付けていません。" }, { status: 403 });
  if (!withinRateLimit(request)) {
    return NextResponse.json({ error: "短時間に複数の申込がありました。10分ほど空けて再度お試しください。" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "入力内容を確認できませんでした。" }, { status: 400 });
  }

  const parsed = parseRentalApplication(body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });
  if (parsed.value.website) return NextResponse.json({ url: `${origin}/robot-rental` });

  const application = parsed.value;
  const stripe = getStripe();
  const fingerprint = applicationFingerprint([
    application.submissionId,
    application.company,
    application.name,
    application.email,
    application.phone,
    application.postalCode,
    application.prefecture,
    application.address1,
    application.address2,
    application.model,
    application.grade,
    application.startDate,
    String(application.nights),
    application.engineerPlan,
    String(application.engineerHours),
    application.useCase,
  ]);

  try {
    const customer = await stripe.customers.create(
      {
        name: application.name,
        description: application.company,
        email: application.email,
        phone: application.phone,
        address: {
          country: "JP",
          postal_code: application.postalCode,
          state: application.prefecture,
          line1: application.address1,
          line2: application.address2 || undefined,
        },
        shipping: {
          name: application.name,
          phone: application.phone,
          address: {
            country: "JP",
            postal_code: application.postalCode,
            state: application.prefecture,
            line1: application.address1,
            line2: application.address2 || undefined,
          },
        },
        metadata: {
          application_type: "robot_rental",
          application_status: "identity_pending",
          submission_id: application.submissionId,
          model: application.model,
          model_name: modelLabel(application.model),
          grade: application.grade,
          rental_start: application.startDate,
          rental_return: parsed.returnDate,
          rental_nights: String(application.nights),
          engineer_plan: application.engineerPlan,
          engineer_hours: String(application.engineerHours),
          engineer_amount_excluding_tax: String(parsed.amountExcludingTax - (RENTAL_MODELS[application.model].grades[application.grade as keyof typeof RENTAL_MODELS[typeof application.model]["grades"]] as readonly number[])[application.nights - 1]),
          amount_excluding_tax: String(parsed.amountExcludingTax),
          amount_including_tax: String(parsed.amountIncludingTax),
          use_case: application.useCase,
        },
      },
      { idempotencyKey: `rental-customer-${fingerprint}` },
    );
    const verification = await stripe.identity.verificationSessions.create(
      {
        type: "document",
        client_reference_id: customer.id,
        related_customer: customer.id,
        provided_details: {
          email: application.email,
          phone: application.phone,
        },
        options: {
          document: {
            allowed_types: ["driving_license"],
            require_live_capture: true,
            require_matching_selfie: true,
          },
        },
        return_url: `${origin}/robot-rental/apply/complete`,
        metadata: {
          application_type: "robot_rental",
          submission_id: application.submissionId,
          model: application.model,
          grade: application.grade,
        },
      },
      { idempotencyKey: `rental-identity-${fingerprint}` },
    );

    await stripe.customers.update(customer.id, {
      metadata: { identity_session_id: verification.id },
    });

    if (!verification.url) throw new Error("Stripe Identity URL was not returned");

    const response = NextResponse.json({ url: verification.url });
    response.cookies.set(RENTAL_IDENTITY_COOKIE, signRentalSession(verification.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });
    return response;
  } catch (error) {
    console.error("[robot-rental] failed to start identity session", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ error: "本人確認を開始できませんでした。時間をおいて再度お試しください。" }, { status: 502 });
  }
}
