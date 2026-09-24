import { directionsUrl, formatAddress, siteConfig } from "@/config/site";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Studio and mobile service info; supports local SEO on the home page. */
export function LocationSection() {
  const { address, serviceArea } = siteConfig;

  return (
    <Section tone="soft" labelledBy="location-heading">
      <SectionHeading
        id="location-heading"
        eyebrow="Where"
        title="Studio or mobile appointments"
        description="Visit Jenna's studio in Easton, MA, or book a mobile appointment at home."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-paper p-6 sm:p-8">
          <h3 className="text-xl font-semibold tracking-tight">Studio</h3>
          <address className="mt-3 text-lg not-italic">
            {formatAddress(address)}
          </address>
          <p className="mt-4">
            <a
              href={directionsUrl(address)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-4"
            >
              Get directions
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
        <div className="rounded-3xl bg-paper p-6 sm:p-8">
          <h3 className="text-xl font-semibold tracking-tight">Mobile</h3>
          <p className="mt-3 text-lg">
            Jenna comes to you for house-call appointments.
          </p>
          <p className="mt-4 text-muted">
            {serviceArea ?? (
              <Placeholder inline>
                towns/areas covered by mobile appointments
              </Placeholder>
            )}
          </p>
        </div>
      </div>
    </Section>
  );
}
