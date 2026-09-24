import "server-only";
import { cookies } from "next/headers";
import { siteConfig } from "@/config/site";
import { signAccessToken, verifyAccessToken } from "./access-token";
import type { VideoConfig } from "./env";
import { getPaidSession } from "./stripe";

export const ACCESS_COOKIE = "video_access";

/** 400 days: the longest lifetime browsers allow. The emailed link restores access after that. */
const COOKIE_MAX_AGE = 400 * 24 * 60 * 60;

export const accessCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/video",
  maxAge: COOKIE_MAX_AGE,
} as const;

/** Personal link emailed to the buyer; opening it on any device grants access. */
export function accessLinkUrl(config: VideoConfig, sessionId: string) {
  const token = signAccessToken(sessionId, config.accessTokenSecret);
  return `${siteConfig.url}/video/unlock?t=${encodeURIComponent(token)}`;
}

/** True if this visitor's cookie maps to a paid, un-refunded purchase. */
export async function hasVideoAccess(config: VideoConfig) {
  const token = (await cookies()).get(ACCESS_COOKIE)?.value;
  const sessionId = verifyAccessToken(token, config.accessTokenSecret);
  if (!sessionId) return false;
  return (await getPaidSession(config, sessionId)) !== null;
}
