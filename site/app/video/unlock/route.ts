import { NextResponse, type NextRequest } from "next/server";
import { signAccessToken, verifyAccessToken } from "@/lib/access-token";
import { getVideoConfig } from "@/lib/env";
import { getPaidSession } from "@/lib/stripe";
import { ACCESS_COOKIE, accessCookieOptions } from "@/lib/video-access";

/**
 * Grants access by setting the cookie, then sends the visitor to /video.
 * - `?session_id=` comes from Stripe's success redirect.
 * - `?t=` comes from the emailed access link.
 * Either way the purchase is confirmed with Stripe first.
 */
export async function GET(request: NextRequest) {
  const config = getVideoConfig();
  const params = request.nextUrl.searchParams;
  const toVideo = (query = "") => new URL(`/video${query}`, request.url);

  if (!config) return NextResponse.redirect(toVideo());

  const sessionId =
    params.get("session_id") ??
    verifyAccessToken(params.get("t") ?? undefined, config.accessTokenSecret);

  const session = sessionId ? await getPaidSession(config, sessionId) : null;
  if (!session) return NextResponse.redirect(toVideo("?error=1"));

  const response = NextResponse.redirect(toVideo());
  response.cookies.set(
    ACCESS_COOKIE,
    signAccessToken(session.id, config.accessTokenSecret),
    accessCookieOptions,
  );
  return response;
}
