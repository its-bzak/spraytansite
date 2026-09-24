import type { ReactNode } from "react";
import { directionsUrl, formatAddress, siteConfig } from "@/config/site";
import { Placeholder } from "@/components/ui/Placeholder";
import { SocialLinks } from "./SocialLinks";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 py-5 sm:grid-cols-3 sm:gap-6">
      <dt className="font-semibold">{label}</dt>
      <dd className="sm:col-span-2">{children}</dd>
    </div>
  );
}

export function ContactDetails() {
  const { address, serviceArea, phone, email, hours, socials } = siteConfig;

  return (
    <dl className="divide-y divide-ink/15 border-y border-ink/15">
      <Row label="Studio">
        <address className="not-italic">{formatAddress(address)}</address>
        <a
          href={directionsUrl(address)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-block font-semibold underline underline-offset-4"
        >
          Get directions
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </Row>
      <Row label="Mobile">
        {serviceArea ?? (
          <Placeholder inline>towns/areas covered by mobile appointments</Placeholder>
        )}
      </Row>
      <Row label="Phone">
        {phone ? (
          <a href={`tel:${phone}`} className="underline underline-offset-4">
            {phone}
          </a>
        ) : (
          <Placeholder inline>phone number</Placeholder>
        )}
      </Row>
      <Row label="Email">
        {email ? (
          <a href={`mailto:${email}`} className="underline underline-offset-4">
            {email}
          </a>
        ) : (
          <Placeholder inline>email address</Placeholder>
        )}
      </Row>
      <Row label="Hours">
        {hours ?? <Placeholder inline>business hours</Placeholder>}
      </Row>
      <Row label="Social">
        {socials.length > 0 ? (
          <SocialLinks />
        ) : (
          <Placeholder inline>social media links</Placeholder>
        )}
      </Row>
    </dl>
  );
}
