import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = buildMetadata({
  title: "About Jenna",
  description:
    "Meet Jenna, the spray tan artist behind Spray Tan By Jenna, offering studio and mobile appointments in Easton, MA.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Meet Jenna"
        lead="Spray tanning at Jenna's studio in Easton, MA, or at your home."
      />

      <Section labelledBy="story-heading">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="story-heading" title="Jenna's story" />
            <div className="mt-8">
              <Placeholder>
                <p>
                  Jenna&apos;s bio is needed: her background, how she got
                  started, and anything she wants clients to know. Credentials,
                  certifications or years of experience are only published if
                  she confirms them.
                </p>
              </Placeholder>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/portfolio" variant="secondary">
                See the portfolio
              </ButtonLink>
              <ButtonLink href="/training" variant="secondary">
                Training program
              </ButtonLink>
            </div>
          </div>
          <ImageFrame
            alt="Portrait of Jenna"
            neededLabel="headshot or portrait of Jenna"
            aspect="aspect-[4/5]"
          />
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
