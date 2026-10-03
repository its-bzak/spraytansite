import { siteConfig } from "@/config/site";

/**
 * LocalBusiness structured data. Only fields the client has supplied are
 * emitted; nothing is guessed. No ratings or reviews until real ones exist.
 * Appointments are mobile, so the address is city-level with no street.
 */
export function localBusinessSchema() {
  const { serviceArea, phone, email, socials } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: serviceArea.city,
      addressRegion: serviceArea.region,
      addressCountry: serviceArea.country,
    },
    areaServed: { "@type": "City", name: serviceArea.city },
    ...(phone && { telephone: phone }),
    ...(email && { email }),
    ...(socials.length > 0 && { sameAs: socials.map((s) => s.href) }),
  };
}
