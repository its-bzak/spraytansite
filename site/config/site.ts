/**
 * Single source of truth for business details.
 *
 * NEEDS_CONFIRMATION: values marked below have NOT yet been confirmed by the
 * client. `null` means she has not supplied the information yet; the site
 * leaves it out until she does (see CONTENT-CHECKLIST.md).
 */

export type ServiceArea = {
  city: string;
  region: string;
  country: string;
};

export type SocialLink = { label: string; href: string };

export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  /** Production origin. Set NEXT_PUBLIC_SITE_URL once the domain is known. */
  url: string;
  bookingUrl: string;
  /** Mobile appointments only, so no street address is published. */
  serviceArea: ServiceArea;
  phone: string | null;
  email: string | null;
  hours: string | null;
  socials: SocialLink[];
  /** Public Google reviews page for the business. */
  googleReviewsUrl: string | null;
};

export const siteConfig: SiteConfig = {
  name: "Spray Tan By Jenna",
  tagline: "Mobile spray tanning in Los Angeles",
  description:
    "Mobile spray tans in the Los Angeles area. Jenna comes to you with a custom formula and full-body application. View services and book online.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000", // NEEDS_CONFIRMATION: domain
  bookingUrl: "https://jennacrossley.glossgenius.com/services", // NEEDS_CONFIRMATION: approved booking URL
  serviceArea: { city: "Los Angeles", region: "CA", country: "US" },
  phone: null, // MISSING
  email: null, // MISSING
  hours: null, // MISSING
  socials: [
    // NEEDS_CONFIRMATION: handle from Jenna's email; check it opens her profile
    { label: "Instagram", href: "https://www.instagram.com/spraytanbyjenna/" },
  ],
  googleReviewsUrl: null, // MISSING: Google Business Profile reviews link
};

/** For use mid-sentence: "Mobile spray tans in the Los Angeles area". */
export const serviceAreaLabel = `the ${siteConfig.serviceArea.city} area`;

/** Her Instagram profile, which the at-home kit's coming-soon notice points to. */
export const instagram = siteConfig.socials.find(
  ({ label }) => label === "Instagram",
);

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Training", href: "/training" },
] as const;

/**
 * Footer-only links; kept out of the main nav, which is full at 1024px.
 * Terms and Privacy come back here once Jenna supplies their text.
 */
export const secondaryLinks = [
  { label: "At-home kit", href: "/video" },
] as const;

/** Booking link that opens GlossGenius with one service already selected. */
export function serviceBookingUrl(token: string) {
  return `${siteConfig.bookingUrl}?service_token=${encodeURIComponent(token)}`;
}
