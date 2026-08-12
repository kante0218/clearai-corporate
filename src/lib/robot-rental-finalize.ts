import { Resend } from "resend";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "info@clearai.jp";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "clearAI <onboarding@resend.dev>";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

export async function finalizeVerifiedRentalApplication(session: Stripe.Identity.VerificationSession) {
  if (session.status !== "verified") throw new Error("Identity verification is not complete");
  const stripe = getStripe();
  const customerId = typeof session.related_customer === "string" ? session.related_customer : null;
  if (!customerId) throw new Error("Verified session has no related customer");
  const retrieved = await stripe.customers.retrieve(customerId);
  if (retrieved.deleted) throw new Error("Rental customer was deleted");
  const customer = retrieved as Stripe.Customer;
  const metadata = customer.metadata;
  const amount = Number(metadata.amount_including_tax);
  if (!Number.isInteger(amount) || amount < 1) throw new Error("Invalid rental amount");

  let checkoutSessionId = metadata.rental_checkout_session_id;
  let checkoutUrl: string | null = null;
  if (checkoutSessionId) {
    checkoutUrl = (await stripe.checkout.sessions.retrieve(checkoutSessionId)).url;
  } else {
    const siteUrl = (process.env.NEXT_PUBLIC_APP_URL ?? "https://clearai.jp").replace(/\/$/, "");
    const checkout = await stripe.checkout.sessions.create({
      mode: "payment",
      customer: customer.id,
      customer_update: { address: "auto", shipping: "auto" },
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      line_items: [{ quantity: 1, price_data: {
        currency: "jpy", unit_amount: amount,
        product_data: {
          name: `${metadata.model_name} ロボットレンタル`,
          description: `${metadata.grade} / ${metadata.rental_nights}泊${Number(metadata.rental_nights) + 1}日 / 初日ハードウェアエンジニア帯同込み（送料別）`,
        },
      } }],
      success_url: `${siteUrl}/robot-rental/apply/complete?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/robot-rental/apply/complete?payment=canceled`,
      metadata: {
        application_type: "robot_rental", verification_session_id: session.id,
        model: metadata.model, grade: metadata.grade,
        rental_start: metadata.rental_start, rental_return: metadata.rental_return,
        rental_nights: metadata.rental_nights,
        engineer_plan: metadata.engineer_plan, engineer_hours: metadata.engineer_hours,
      },
      integration_identifier: "clearai-rental-qwertyui",
    }, { idempotencyKey: `rental-checkout-${session.id}` });
    checkoutSessionId = checkout.id;
    checkoutUrl = checkout.url;
    await stripe.customers.update(customer.id, { metadata: {
      application_status: "identity_verified_payment_pending", identity_status: "verified",
      identity_session_id: session.id, rental_checkout_session_id: checkoutSessionId,
    } });
  }

  if (process.env.RESEND_API_KEY && customer.email) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const engineer = metadata.engineer_plan === "day" ? "1日（100,000円・税別）" : `${metadata.engineer_hours}時間（10,000円/時・税別）`;
    const summary = `${metadata.model_name} / ${metadata.grade} / ${metadata.rental_start}〜${metadata.rental_return} / 初日エンジニア帯同 ${engineer}`;
    await Promise.all([
      resend.emails.send({ from: FROM_EMAIL, to: [TO_EMAIL], replyTo: customer.email,
        subject: `【本人確認済み・決済待ち】ロボットレンタル ${metadata.model_name}`,
        text: `${customer.description ?? ""}\n${customer.name ?? ""}\n${customer.email}\n${summary}\nStripe Checkout: ${checkoutSessionId}`,
        html: `<div style="font-family:sans-serif;padding:28px"><h2>本人確認済み・決済待ち</h2><p>${escapeHtml(summary)}</p><p>Stripe Checkout: ${escapeHtml(checkoutSessionId)}</p></div>`,
      }, { idempotencyKey: `rental-admin-${session.id}` }),
      resend.emails.send({ from: FROM_EMAIL, to: [customer.email], subject: "【clearAI】本人確認が完了しました",
        text: `${customer.name ?? "お客様"} 様\n\n本人確認が完了しました。画面からStripe決済を完了してください。送料は配送先確認後に別途ご案内します。\n\n${summary}`,
        html: `<div style="font-family:sans-serif;padding:32px"><h2>本人確認が完了しました</h2><p>${escapeHtml(customer.name ?? "お客様")} 様</p><p>画面からStripe決済を完了してください。送料は配送先確認後に別途ご案内します。</p><p>${escapeHtml(summary)}</p></div>`,
      }, { idempotencyKey: `rental-customer-${session.id}` }),
    ]);
  }
  if (!checkoutUrl) throw new Error("Checkout URL was not returned");
  return { checkoutSessionId, checkoutUrl };
}
