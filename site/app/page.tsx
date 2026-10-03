import type { Metadata } from "next";
import { serviceAreaLabel } from "@/config/site";
import { included } from "@/content/services";
import { buildMetadata } from "@/lib/metadata";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Hero } from "@/components/sections/Hero";
import { LinkCards } from "@/components/sections/LinkCards";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { Reviews } from "@/components/sections/Reviews";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ButtonLink } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Mobile Spray Tans in Los Angeles",
    description:
      "Book a mobile spray tan with Jenna in the Los Angeles area. She comes to you with a custom formula and full-body application. Book online.",
    path: "/",
  }),
  // Home uses the absolute site title rather than "%s | Spray Tan By Jenna".
  title: { absolute: "Spray Tan By Jenna | Mobile Spray Tans in Los Angeles" },
};

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section labelledBy="services-heading">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              id="services-heading"
              eyebrow="Services"
              title="Mobile spray tans"
              description={`Jenna comes to you in ${serviceAreaLabel}. Every appointment includes:`}
            />
            <CheckList items={included} className="mt-8" />
          </div>
          <div className="lg:pt-24">
            <ServicesGrid />
          </div>
        </div>
        <div className="mt-10">
          <ButtonLink href="/services" variant="secondary">
            See formulas and aftercare
          </ButtonLink>
        </div>
      </Section>

      <PortfolioPreview tone="soft" />
      <LinkCards />
      <Reviews tone="soft" />
      <CtaBanner />
    </>
  );
}
