import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = buildMetadata({
  title: "Training Program",
  description:
    "Learn about Jenna's training program and how to get in touch about it.",
  path: "/training",
});

/** MISSING: everything below the intro must come from the client. */
const detailsNeeded = [
  "Program name",
  "What the training covers",
  "Format and duration",
  "Price",
  "Who it is for and any prerequisites",
  "Certification, if any (only if real)",
  "How people enroll",
];

export default function TrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="Training"
        title="Jenna's training program"
        lead="Interested in the training program? Get in touch to ask about it."
      >
        <ButtonLink href="/contact" size="lg">
          Ask about training
        </ButtonLink>
      </PageHero>

      <Section labelledBy="training-details-heading">
        <SectionHeading id="training-details-heading" title="Program details" />
        <div className="mt-8 max-w-3xl">
          <Placeholder>
            <p>Jenna needs to provide the following before this page is complete:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              {detailsNeeded.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Placeholder>
        </div>
      </Section>
    </>
  );
}
