import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { Reviews } from "@/components/sections/Reviews";
import { ButtonLink } from "@/components/ui/Button";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = buildMetadata({
  title: "About Jenna",
  description:
    "Meet Jenna, the spray tan artist behind Spray Tan By Jenna, now offering mobile spray tans in Los Angeles plus spray tan training and consulting.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Meet Jenna"
        lead="Mobile spray tans in Los Angeles, plus hands-on spray tan training and consulting."
      />

      <Section labelledBy="story-heading">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            {/* Interim: two lines from Jenna's own LA and training copy.
                MISSING: her bio, which replaces this (CONTENT-CHECKLIST.md). */}
            <SectionHeading id="story-heading" title="Now in Los Angeles" />
            <div className="mt-6 space-y-4 text-lg leading-relaxed">
              <p>
                From the East Coast to the West Coast, I am now offering mobile
                spray tans in the LA area.
              </p>
              <p>
                I&apos;ve worked with both high-volume established salons and
                individuals to teach them how to spray tan and how to be
                successful long term.
              </p>
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
            src="/about-portrait.jpeg"
            alt="Jenna seated on a Norvell equipment case holding two airbrush spray guns"
            aspect="aspect-[4/5]"
          />
        </div>
      </Section>

      <Reviews tone="soft" />
      <CtaBanner />
    </>
  );
}
