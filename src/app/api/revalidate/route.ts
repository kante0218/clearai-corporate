import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secret = request.headers.get("X-MICROCMS-Signature");
  if (secret !== process.env.MICROCMS_WEBHOOK_SECRET) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  revalidatePath("/blog", "layout");
  return NextResponse.json({ revalidated: true });
}
