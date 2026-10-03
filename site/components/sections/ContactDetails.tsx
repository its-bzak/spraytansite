import type { ReactNode } from "react";
import { serviceAreaLabel, siteConfig } from "@/config/site";
import { SocialLinks } from "./SocialLinks";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 py-5 sm:grid-cols-3 sm:gap-6">
      <dt className="font-semibold">{label}</dt>
      <dd className="sm:col-span-2">{children}</dd>
    </div>
  );
}

/** Each detail appears once Jenna has supplied it. */
export function ContactDetails() {
  const { phone, email, hours, socials } = siteConfig;

  return (
    <dl className="divide-y divide-ink/15 border-y border-ink/15">
      <Row label="Service area">
        Mobile spray tans in {serviceAreaLabel}. Jenna comes to you.
      </Row>
      {phone && (
        <Row label="Phone">
          <a href={`tel:${phone}`} className="underline underline-offset-4">
            {phone}
          </a>
        </Row>
      )}
      {email && (
        <Row label="Email">
          <a href={`mailto:${email}`} className="underline underline-offset-4">
            {email}
          </a>
        </Row>
      )}
      {hours && <Row label="Hours">{hours}</Row>}
      {socials.length > 0 && (
        <Row label="Social">
          <SocialLinks />
        </Row>
      )}
    </dl>
  );
}
