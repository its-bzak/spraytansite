import "server-only";

/**
 * Server-side configuration for the paid video. Every variable is required;
 * if any is missing the feature is treated as not set up yet and /video shows
 * a "not available" state instead of failing. See .env.example.
 */
export type VideoConfig = {
  stripeSecretKey: string;
  stripeWebhookSecret: string;
  stripePriceId: string;
  accessTokenSecret: string;
  streamCustomerCode: string;
  streamVideoUid: string;
  streamKeyId: string;
  /** PEM private key, decoded from base64. */
  streamKeyPem: string;
  resendApiKey: string;
  emailFrom: string;
};

export function getVideoConfig(): VideoConfig | null {
  const env = {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    stripePriceId: process.env.STRIPE_VIDEO_PRICE_ID,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    streamCustomerCode: process.env.CLOUDFLARE_STREAM_CUSTOMER_CODE,
    streamVideoUid: process.env.CLOUDFLARE_STREAM_VIDEO_UID,
    streamKeyId: process.env.CLOUDFLARE_STREAM_KEY_ID,
    streamKeyPem: process.env.CLOUDFLARE_STREAM_KEY_PEM,
    resendApiKey: process.env.RESEND_API_KEY,
    emailFrom: process.env.EMAIL_FROM,
  };

  if (Object.values(env).some((value) => !value)) return null;

  const config = env as VideoConfig;
  return {
    ...config,
    streamKeyPem: Buffer.from(config.streamKeyPem, "base64").toString("utf8"),
  };
}
