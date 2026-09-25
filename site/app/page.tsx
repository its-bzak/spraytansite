import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Hero } from "@/components/sections/Hero";
import { LinkCards } from "@/components/sections/LinkCards";
import { LocationSection } from "@/components/sections/LocationSection";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { Reviews } from "@/components/sections/Reviews";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Spray Tanning in Easton, MA",
    description:
      "Book a spray tan with Jenna at her studio in Easton, MA, or schedule a mobile house-call appointment. See services and book online.",
    path: "/",
  }),
  // Home uses the absolute site title rather than "%s | Spray Tan By Jenna".
  title: { absolute: "Spray Tan By Jenna | Spray Tanning in Easton, MA" },
};

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section labelledBy="services-heading">
        <SectionHeading
          id="services-heading"
          eyebrow="Services"
          title="Choose your appointment"
          description="Studio and mobile spray tan appointments, plus an optional add-on."
        />
        <div className="mt-10">
          <ServicesGrid />
        </div>
        <div className="mt-8">
          <ButtonLink href="/services" variant="secondary">
            See all service details
          </ButtonLink>
        </div>
      </Section>

      <PortfolioPreview />
      <LocationSection />
      <LinkCards />
      <Reviews tone="soft" />
      <CtaBanner />
    </>
  );
}
