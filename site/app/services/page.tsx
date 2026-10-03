import type { Metadata } from "next";
import { serviceAreaLabel } from "@/config/site";
import { formulas, included, retailProducts } from "@/content/services";
import { videoContent } from "@/content/video";
import { buildMetadata } from "@/lib/metadata";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { KitComingSoon } from "@/components/sections/KitComingSoon";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ButtonLink } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { PhotoRow, type Photo } from "@/components/ui/PhotoRow";
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
  title: "Mobile Spray Tan Services",
  description:
    "Mobile spray tans in the Los Angeles area: what's included, custom formulas and rinse times, aftercare products and prices. Book online with Jenna.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Mobile spray tans in Los Angeles"
        lead={`Jenna comes to you in ${serviceAreaLabel}, with a custom formula and everything included.`}
      />

      <Section labelledBy="included-heading">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              id="included-heading"
              title="What's included"
              description="Every mobile spray tan includes:"
            />
            <CheckList items={included} className="mt-8" />
          </div>
          <div className="lg:pt-20">
            <ServicesGrid />
            <p className="mt-4 text-sm text-muted">
              Price and time are from Jenna&apos;s booking page.
            </p>
          </div>
        </div>
        <div className="mt-16">
          <PhotoRow photos={photos} />
        </div>
      </Section>

      <Section tone="soft" labelledBy="formulas-heading">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              id="formulas-heading"
              eyebrow="Your consultation"
              title="Choose your formula"
              description="Every appointment starts with an in-depth consultation to choose your custom formula."
            />
            <ul className="mt-8 space-y-4">
              {formulas.map(({ name, rinseTime }) => (
                <li key={name} className="rounded-3xl bg-paper p-6">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {name}
                  </h3>
                  <p className="mt-1 text-muted">Rinse after {rinseTime}</p>
                </li>
              ))}
            </ul>
          </div>
          <ImageFrame
            src="/sjolie-sunless-tanning-solution-bottles-technician.jpeg"
            alt="Woman holding an armful of Glazed Sunless tanning solution bottles"
            position="object-top"
          />
        </div>
      </Section>

      <Section labelledBy="aftercare-heading">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              id="aftercare-heading"
              eyebrow="Aftercare"
              title="Keep your glow going"
              description="Retail products to maintain and extend the life of your tan are available to purchase at your appointment."
            />
            <CheckList items={retailProducts} className="mt-8" />
            <p className="mt-10">
              <ButtonLink href="/faq" variant="secondary">
                Read the FAQ
              </ButtonLink>
            </p>
          </div>
          <ImageFrame
            src="/sjolie-retail-tanning-skincare-product-display.jpeg"
            alt="Boxed Sjolie Sunless products on a counter: sugar scrub, shower gel, SPF 30 mineral sunscreen, Tan Extend lotion and Body Renew moisturizer"
          />
        </div>
      </Section>

      <Section tone="soft" labelledBy="kit-heading">
        <SectionHeading
          id="kit-heading"
          eyebrow="Coming soon"
          title={videoContent.title}
          description={videoContent.description}
        />
        <KitComingSoon className="mt-6" />
      </Section>

      <CtaBanner />
    </>
  );
}
