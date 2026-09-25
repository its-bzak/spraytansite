import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ButtonLink } from "@/components/ui/Button";
import { PhotoRow, type Photo } from "@/components/ui/PhotoRow";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const photos: Photo[] = [
  {
    src: "/airbrush-spray-tan-application-model-zebra-swimsuit.jpeg",
    alt: "Airbrush spray gun being used on a model in a zebra-print swimsuit",
    caption: "Airbrush application",
  },
  {
    src: "/mobile-spray-tanning-tent-setup-bedroom-norvell.jpeg",
    alt: "Pop-up spray tan tent with foot pads and a Norvell equipment case set up in a bedroom",
    caption: "Mobile appointment setup",
  },
  {
    src: "/professional-spray-tan-solution-aftercare-equipment.jpeg",
    alt: "Tanning solution bottles, a spray gun, a brush and an aftercare card on a counter",
    caption: "Solutions, tools and aftercare card",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Spray Tan Services",
  description:
    "Studio and mobile spray tan appointments in Easton, MA, with prices and appointment lengths. Book online with Jenna.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Spray tan services"
        lead="Choose a studio appointment in Easton, MA, or a mobile appointment at your home."
      />

      <Section labelledBy="services-list-heading">
        <SectionHeading
          id="services-list-heading"
          title="Appointments and add-ons"
          description="Prices and times below are from Jenna's booking page."
        />
        <div className="mt-10">
          <ServicesGrid />
        </div>
        <div className="mt-12">
          <PhotoRow photos={photos} />
        </div>
      </Section>

      <Section tone="soft" labelledBy="expect-heading">
        <SectionHeading
          id="expect-heading"
          eyebrow="Before you book"
          title="What to expect"
        />
        <div className="mt-8 max-w-2xl">
          <Placeholder>
            <p>
              Jenna needs to describe what happens during an appointment and how
              to prepare. Nothing is drafted here, so no advice or claims are
              published without her approval.
            </p>
          </Placeholder>
          <p className="mt-6">
            <ButtonLink href="/faq" variant="secondary">
              Read the FAQ
            </ButtonLink>
          </p>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
