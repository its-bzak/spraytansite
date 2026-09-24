import "server-only";
import { createSign } from "node:crypto";
import type { VideoConfig } from "./env";

/** How long a playback URL works. Longer than the video, short enough to be useless if shared. */
const TOKEN_TTL_SECONDS = 4 * 60 * 60;

const base64url = (value: object) =>
  Buffer.from(JSON.stringify(value)).toString("base64url");

/**
 * Signed Cloudflare Stream embed URL. The video must have
 * `requireSignedURLs: true`; the token is an RS256 JWT signed locally with a
 * Stream signing key, so no Cloudflare API call is made per view.
 */
export function signedStreamEmbedUrl(config: VideoConfig) {
  const header = base64url({ alg: "RS256", kid: config.streamKeyId });
  const payload = base64url({
    sub: config.streamVideoUid,
    kid: config.streamKeyId,
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
  });
  const signature = createSign("RSA-SHA256")
    .update(`${header}.${payload}`)
    .sign(config.streamKeyPem, "base64url");
  const token = `${header}.${payload}.${signature}`;

  return `https://customer-${config.streamCustomerCode}.cloudflarestream.com/${token}/iframe`;
}
