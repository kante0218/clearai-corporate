import { adsTxt } from "@/lib/adsense";

export function GET() {
  const content = adsTxt(process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID);
  return new Response(content ?? "Not found\n", {
    status: content ? 200 : 404,
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
