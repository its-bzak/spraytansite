import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { PageHero } from "@/components/sections/PageHero";
import { BookNowButton } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact Spray Tan By Jenna: studio location in Easton, MA, mobile appointments, and how to book online.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        lead="The fastest way to get an appointment is to book online."
      >
        <BookNowButton size="lg" />
      </PageHero>

      <Section labelledBy="details-heading">
        <SectionHeading id="details-heading" title="Location and contact details" />
        <div className="mt-8 max-w-3xl">
          <ContactDetails />
        </div>
      </Section>
    </>
  );
}
