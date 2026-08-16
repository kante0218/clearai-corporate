import { getAvailability, TIMEZONE, SLOT_MINUTES } from "@/lib/google-calendar";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getAvailability();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("[availability] error", err);
    // Fail safe: report "not configured" so the page falls back to the Google embed.
    return new Response(
      JSON.stringify({ configured: false, timezone: TIMEZONE, slotMinutes: SLOT_MINUTES, days: [] }),
      { status: 200, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } }
    );
  }
}
