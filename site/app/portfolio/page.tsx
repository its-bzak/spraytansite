import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { PortfolioGallery } from "@/components/sections/PortfolioGallery";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio",
  description:
    "Photos of spray tans by Jenna, serving Easton, MA and nearby with studio and mobile appointments.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Portfolio"
        lead="A look at Jenna's work."
      />
      <Section labelledBy="gallery-heading">
        <h2 id="gallery-heading" className="sr-only">
          Gallery
        </h2>
        <PortfolioGallery />
      </Section>
      <CtaBanner />
    </>
  );
}
