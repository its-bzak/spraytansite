import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { PhotoRow, type Photo } from "@/components/ui/PhotoRow";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = buildMetadata({
  title: "Spray Tan Training and Consulting",
  description:
    "Hands-on spray tan training and consulting with Jenna: a curated starter kit, training with live models, product and marketing guides, and ongoing support.",
  path: "/training",
});

// The copy on this page is Jenna's own (October 2026), lightly copyedited.
const steps = [
  "We have a 15-minute phone call to discuss your individual goals with spray tanning.",
  "I then put together a few options for training and start-up kits, and we go from there! Options are created based on your current business, schedule and budget.",
  "I will order your entire setup and we will schedule an on-site training.",
  "I will also assist you in setting up your space.",
];

const photos: Photo[] = [
  {
    src: "/certified-spray-tan-technician-training-salon.jpeg",
    alt: "Jenna and three women in a salon, one holding a certificate of completion",
  },
  {
    src: "/expert-spray-tan-artist-airbrush-gun-setup.jpeg",
    alt: "Woman holding an airbrush spray gun and hose beside a spray tan tent",
  },
  {
    src: "/custom-airbrush-tanning-application-salon-tent.jpeg",
    alt: "Woman kneeling to airbrush a client's legs inside a spray tan tent",
  },
];

export default function TrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="Training"
        title="Spray tan training and consulting"
        lead="I am pleased to announce I am now offering spray tan training! My training is hands-on and all-inclusive."
      >
        <ButtonLink href="/contact" size="lg">
          Ask about training
        </ButtonLink>
      </PageHero>

      <Section labelledBy="training-included-heading">
        <SectionHeading id="training-included-heading" title="What's included" />
        <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed">
          <p>
            I include a personally curated starter kit, hands-on training with
            live models, product and marketing guides and so much more. After a
            full in-depth training day and tools to get started, you will feel
            confident and prepared to offer a profitable new service.
          </p>
          <p>
            I also offer ongoing support and guidance as you go. Any questions
            or issues you run into along the way, I am here to help you.
          </p>
        </div>
        <div className="mt-12">
          <PhotoRow photos={photos} />
        </div>
      </Section>

      <Section tone="soft" labelledBy="training-who-heading">
        <SectionHeading id="training-who-heading" title="Who it's for" />
        <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed">
          <p>
            Whether you&apos;re an already established beauty business or any
            individual looking to start a business of their own, I will create a
            plan for you.
          </p>
          <p>
            I&apos;ve worked with both high-volume established salons and
            individuals to teach them how to spray tan and how to be successful
            long term.
          </p>
        </div>
      </Section>

      <Section labelledBy="training-steps-heading">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="training-steps-heading" title="How it works" />
            <ol className="mt-8 space-y-6">
              {steps.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blush font-semibold"
                  >
                    {index + 1}
                  </span>
                  <p className="pt-1 text-lg leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-xl font-semibold tracking-tight">
              No guesswork and no trial and error.
            </p>
            <p className="mt-8">
              <ButtonLink href="/contact">Ask about training</ButtonLink>
            </p>
          </div>
          <ImageFrame
            src="/mobile-spray-tan-tent-salon-setup-belloccio-norvell.jpeg"
            alt="Pop-up Belloccio spray tan tent with foot pads, a spray machine and a Norvell equipment case set up in a salon"
          />
        </div>
      </Section>
    </>
  );
}
