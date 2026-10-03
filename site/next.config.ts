import type { NextConfig } from "next";

// Without the production origin, canonical URLs, social previews, the sitemap
// and search data all point at localhost. Fail the production build instead.
if (process.env.VERCEL_ENV === "production" && !process.env.NEXT_PUBLIC_SITE_URL) {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL must be set for production builds (see .env.example).",
  );
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
