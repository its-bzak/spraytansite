import type { Metadata } from "next";
import { faqItems, faqTopicsNeeded } from "@/content/faq";
import { buildMetadata } from "@/lib/metadata";
import { Accordion } from "@/components/ui/Accordion";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = buildMetadata({
  title: "FAQ & Info",
  description:
    "Answers about spray tan appointments with Jenna in Easton, MA: locations, appointment length, pricing and how to book.",
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
        </div>
      </Section>

      <Section tone="soft" labelledBy="faq-more-heading">
        <SectionHeading id="faq-more-heading" title="More information" />
        <div className="mt-8 max-w-3xl">
          <Placeholder>
            <p>
              Jenna needs to write the answers for these topics before they are
              published:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              {faqTopicsNeeded.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </Placeholder>
          <p className="mt-6">
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
