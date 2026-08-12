import Stripe from "stripe";
import { NextResponse } from "next/server";
import { finalizeVerifiedRentalApplication } from "@/lib/robot-rental-finalize";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) return NextResponse.json({ error: "Webhook is not configured" }, { status: 503 });

  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(await request.text(), signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "identity.verification_session.verified") {
    const verification = event.data.object as Stripe.Identity.VerificationSession;
    if (verification.metadata.application_type !== "robot_rental") {
      return NextResponse.json({ received: true });
    }
    try {
      await finalizeVerifiedRentalApplication(verification);
    } catch (error) {
      console.error("[stripe-webhook] rental finalization failed", error instanceof Error ? error.message : "unknown error");
      return NextResponse.json({ error: "Finalization failed" }, { status: 500 });
    }
  }

  if (event.type === "checkout.session.completed") {
    const checkout = event.data.object as Stripe.Checkout.Session;
    if (checkout.metadata?.application_type !== "robot_rental" || checkout.payment_status !== "paid") {
      return NextResponse.json({ received: true });
    }
    const customerId = typeof checkout.customer === "string" ? checkout.customer : null;
    if (customerId) {
      try {
        await getStripe().customers.update(customerId, {
          metadata: {
            application_status: "paid_pending_availability",
            rental_checkout_session_id: checkout.id,
            rental_payment_intent_id: typeof checkout.payment_intent === "string" ? checkout.payment_intent : "",
          },
        });
      } catch (error) {
        console.error("[stripe-webhook] payment finalization failed", error instanceof Error ? error.message : "unknown error");
        return NextResponse.json({ error: "Payment finalization failed" }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}
