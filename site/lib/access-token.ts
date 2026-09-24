import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Stateless proof of purchase: `base64url(checkoutSessionId).base64url(hmac)`.
 * The same token is stored in the access cookie and put in emailed links.
 * It only proves which Checkout Session it was issued for; the session is
 * still checked with Stripe on every view so refunds revoke access.
 */

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function signAccessToken(sessionId: string, secret: string) {
  const payload = Buffer.from(sessionId, "utf8").toString("base64url");
  return `${payload}.${sign(payload, secret)}`;
}

/** Returns the Checkout Session id, or null if the token is malformed or forged. */
export function verifyAccessToken(
  token: string | undefined,
  secret: string,
): string | null {
  if (!token) return null;
  const [payload, signature, ...rest] = token.split(".");
  if (!payload || !signature || rest.length > 0) return null;

  const expected = Buffer.from(sign(payload, secret));
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return null;
  }
  return Buffer.from(payload, "base64url").toString("utf8");
}
