import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Spray Tan By Jenna handles personal information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      needed="A privacy policy is needed from Jenna. It should cover payments through Stripe, the purchase email sent through Resend, and the cookie that remembers video access. Her GlossGenius site already has a Privacy Policy that may be reusable."
    />
  );
}
