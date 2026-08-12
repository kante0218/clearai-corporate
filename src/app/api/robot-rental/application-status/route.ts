import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { finalizeVerifiedRentalApplication } from "@/lib/robot-rental-finalize";
import { RENTAL_IDENTITY_COOKIE, readRentalSession } from "@/lib/robot-rental-session";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const requestUrl = new URL(request.url);
  if (origin) {
    try {
      if (new URL(origin).host !== requestUrl.host) {
        return NextResponse.json({ error: "無効なリクエストです。" }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: "無効なリクエストです。" }, { status: 403 });
    }
  }

  const cookieStore = await cookies();
  const sessionId = readRentalSession(cookieStore.get(RENTAL_IDENTITY_COOKIE)?.value);
  if (!sessionId) return NextResponse.json({ status: "missing" }, { status: 400 });

  try {
    const verification = await getStripe().identity.verificationSessions.retrieve(sessionId);
    if (verification.status === "verified") {
      const result = await finalizeVerifiedRentalApplication(verification);
      return NextResponse.json({ status: "verified", checkoutUrl: result.checkoutUrl });
    }
    return NextResponse.json({ status: verification.status, resumeUrl: verification.url ?? null });
  } catch (error) {
    console.error("[robot-rental] failed to read application status", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ error: "本人確認結果を確認できませんでした。" }, { status: 502 });
  }
}
