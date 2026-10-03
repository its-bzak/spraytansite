import type { Metadata } from "next";
import { faqItems } from "@/content/faq";
import { buildMetadata } from "@/lib/metadata";
import { Accordion } from "@/components/ui/Accordion";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = buildMetadata({
  title: "FAQ & Info",
  description:
    "Answers about mobile spray tans with Jenna in Los Angeles: what's included, rinse times, aftercare products, pricing and how to book.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ & Info"
        title="Frequently asked questions"
        lead="Quick answers about appointments with Jenna."
      />

      <Section labelledBy="faq-heading">
        <SectionHeading id="faq-heading" title="Appointments" />
        <div className="mt-8 max-w-3xl">
          <Accordion items={faqItems} />
          <p className="mt-8">
            <ButtonLink href="/contact" variant="secondary">
              Contact Jenna
            </ButtonLink>
          </p>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
