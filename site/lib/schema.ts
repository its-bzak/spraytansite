import { siteConfig } from "@/config/site";

/**
 * LocalBusiness structured data. Only fields the client has supplied are
 * emitted; nothing is guessed. No ratings or reviews until real ones exist.
 */
export function localBusinessSchema() {
  const { address, phone, email, socials } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    ...(phone && { telephone: phone }),
    ...(email && { email }),
    ...(socials.length > 0 && { sameAs: socials.map((s) => s.href) }),
  };
}
