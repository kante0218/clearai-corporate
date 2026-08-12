import { createHmac, timingSafeEqual } from "crypto";

export const RENTAL_IDENTITY_COOKIE = "clearai_rental_identity";

function signature(value: string) {
  const key = process.env.ROBOT_RENTAL_SESSION_SECRET ?? process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Robot rental session secret is not configured");
  return createHmac("sha256", key).update(value).digest("base64url");
}

export function signRentalSession(verificationSessionId: string) {
  return `${verificationSessionId}.${signature(verificationSessionId)}`;
}

export function readRentalSession(value: string | undefined) {
  if (!value) return null;
  const separator = value.lastIndexOf(".");
  if (separator < 1) return null;
  const sessionId = value.slice(0, separator);
  const supplied = value.slice(separator + 1);
  const expected = signature(sessionId);
  const suppliedBuffer = Buffer.from(supplied);
  const expectedBuffer = Buffer.from(expected);
  if (suppliedBuffer.length !== expectedBuffer.length) return null;
  return timingSafeEqual(suppliedBuffer, expectedBuffer) ? sessionId : null;
}
