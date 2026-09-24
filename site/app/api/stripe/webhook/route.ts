import type Stripe from "stripe";
import { sendAccessEmail } from "@/lib/email";
import { getVideoConfig } from "@/lib/env";
import { constructWebhookEvent, isVideoPurchase } from "@/lib/stripe";
import { accessLinkUrl } from "@/lib/video-access";

/**
 * Stripe webhook: emails the buyer their access link after checkout.
 * Subscribe the endpoint to `checkout.session.completed`. A non-2xx response
 * makes Stripe retry, so email failures return 500.
 */
export async function POST(request: Request) {
  const config = getVideoConfig();
  if (!config) return new Response("Not configured", { status: 503 });

  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response("Missing signature", { status: 400 });

  let event: Stripe.Event;
  try {
    event = constructWebhookEvent(config, await request.text(), signature);
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const email = session.customer_details?.email;
    if (email && isVideoPurchase(session)) {
      try {
        await sendAccessEmail(config, email, accessLinkUrl(config, session.id));
      } catch (error) {
        console.error(error);
        return new Response("Email failed", { status: 500 });
      }
    }
  }

  return new Response("ok");
}
