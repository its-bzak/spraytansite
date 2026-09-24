"use server";

import { redirect } from "next/navigation";
import { sendAccessEmail } from "@/lib/email";
import { getVideoConfig } from "@/lib/env";
import { createCheckoutSession, findPaidSessionByEmail } from "@/lib/stripe";
import { accessLinkUrl } from "@/lib/video-access";

export async function startCheckout() {
  const config = getVideoConfig();
  if (!config) redirect("/video");
  redirect(await createCheckoutSession(config));
}

/**
 * Re-sends the access link to a past buyer. The visitor sees the same message
 * whether or not a purchase exists, so this can't be used to check emails.
 */
export async function resendAccessLink(formData: FormData) {
  const config = getVideoConfig();
  const email = String(formData.get("email") ?? "").trim();
  if (!config || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    redirect("/video?sent=invalid");
  }

  const session = await findPaidSessionByEmail(config, email);
  if (session) {
    await sendAccessEmail(config, email, accessLinkUrl(config, session.id));
  }
  redirect("/video?sent=1");
}
