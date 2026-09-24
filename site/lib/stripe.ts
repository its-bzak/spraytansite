import "server-only";
import Stripe from "stripe";
import { siteConfig } from "@/config/site";
import type { VideoConfig } from "./env";

/** Marks our Checkout Sessions so only video purchases unlock the video. */
const PRODUCT_TAG = "video";

let client: Stripe | null = null;

function stripe(config: VideoConfig) {
  client ??= new Stripe(config.stripeSecretKey);
  return client;
}

/** Price as set by Jenna in the Stripe dashboard, e.g. "$25.00". */
export async function getVideoPrice(config: VideoConfig) {
  const price = await stripe(config).prices.retrieve(config.stripePriceId);
  if (price.unit_amount == null) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
  }).format(price.unit_amount / 100);
}

export async function createCheckoutSession(config: VideoConfig) {
  const session = await stripe(config).checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: config.stripePriceId, quantity: 1 }],
    metadata: { product: PRODUCT_TAG },
    success_url: `${siteConfig.url}/video/unlock?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteConfig.url}/video`,
  });
  if (!session.url) throw new Error("Stripe did not return a Checkout URL");
  return session.url;
}

/** Paid, tagged as a video purchase, and not fully refunded. */
export function isVideoPurchase(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") return false;
  if (session.metadata?.product !== PRODUCT_TAG) return false;

  const intent = session.payment_intent;
  if (intent && typeof intent === "object") {
    const charge = intent.latest_charge;
    if (charge && typeof charge === "object" && charge.refunded) return false;
  }
  return true;
}

/**
 * The Checkout Session if it is a paid, un-refunded video purchase; otherwise
 * null. Unknown or malformed ids return null rather than throwing.
 */
export async function getPaidSession(config: VideoConfig, sessionId: string) {
  if (!sessionId.startsWith("cs_")) return null;
  try {
    const session = await stripe(config).checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent.latest_charge"],
    });
    return isVideoPurchase(session) ? session : null;
  } catch (error) {
    if (error instanceof Stripe.errors.StripeInvalidRequestError) return null;
    throw error;
  }
}

/** Most recent paid video purchase made with this email, if any. */
export async function findPaidSessionByEmail(config: VideoConfig, email: string) {
  const sessions = await stripe(config).checkout.sessions.list({
    customer_details: { email },
    status: "complete",
    limit: 20,
    expand: ["data.payment_intent.latest_charge"],
  });
  return sessions.data.find(isVideoPurchase) ?? null;
}

export function constructWebhookEvent(
  config: VideoConfig,
  payload: string,
  signature: string,
) {
  return stripe(config).webhooks.constructEvent(
    payload,
    signature,
    config.stripeWebhookSecret,
  );
}
