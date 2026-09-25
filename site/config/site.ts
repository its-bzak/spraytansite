/**
 * Single source of truth for business details.
 *
 * NEEDS_CONFIRMATION: values marked below were taken from Jenna's existing
 * GlossGenius site and have NOT yet been confirmed by the client.
 * `null` means the client has not supplied the information yet.
 */

export type Address = {
  street: string;
  city: string;
  region: string;
  postalCode: string;
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
  address: Address;
  serviceArea: string | null;
  phone: string | null;
  email: string | null;
  hours: string | null;
  socials: SocialLink[];
  /** Public Google reviews page for the business. */
  googleReviewsUrl: string | null;
};

export const siteConfig: SiteConfig = {
  name: "Spray Tan By Jenna",
  tagline: "Studio and mobile spray tanning in Easton, MA",
  description:
    "Spray tan appointments with Jenna, at her studio in Easton, MA or at your home. View services and book online.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000", // NEEDS_CONFIRMATION: domain
  bookingUrl: "https://jennacrossley.glossgenius.com/services", // NEEDS_CONFIRMATION: approved booking URL
  address: {
    // NEEDS_CONFIRMATION: studio address (and whether it may be shown publicly)
    street: "3 Roosevelt Cir",
    city: "Easton",
    region: "MA",
    postalCode: "02375",
    country: "US",
  },
  serviceArea: null, // MISSING: towns/regions covered by mobile appointments
  phone: null, // MISSING
  email: null, // MISSING
  hours: null, // MISSING
  socials: [], // MISSING: platform handles/URLs
  googleReviewsUrl: null, // MISSING: Google Business Profile reviews link
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Training", href: "/training" },
] as const;

/** Footer-only links; kept out of the main nav, which is full at 1024px. */
export const secondaryLinks = [
  { label: "Video", href: "/video" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
] as const;

export function formatAddress({ street, city, region, postalCode }: Address) {
  return `${street}, ${city}, ${region} ${postalCode}`;
}

/** Booking link that opens GlossGenius with one service already selected. */
export function serviceBookingUrl(token: string) {
  return `${siteConfig.bookingUrl}?service_token=${encodeURIComponent(token)}`;
}

export function directionsUrl(address: Address) {
  const query = encodeURIComponent(formatAddress(address));
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
