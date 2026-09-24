import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = buildMetadata({
  title: "Terms",
  description: "Terms of sale and use for Spray Tan By Jenna, including video purchases.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      needed="Terms of sale and use are needed from Jenna, including the refund policy for video purchases. Her GlossGenius site already has a Terms page that may be reusable."
    />
  );
}
