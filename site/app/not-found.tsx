import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { BookNowButton, ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <PageHero
      eyebrow="404"
      title="Page not found"
      lead="That page doesn't exist or has moved."
    >
      <ButtonLink href="/" variant="secondary" size="lg">
        Back to home
      </ButtonLink>
      <BookNowButton size="lg" />
    </PageHero>
  );
}
