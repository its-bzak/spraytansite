import { BookNowButton } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

/** Closing conversion block. Used at the end of every page. */
export function CtaBanner({
  title = "Ready to book?",
  description = "Choose a studio or mobile appointment and pick a time that works for you.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Section tone="dark" labelledBy="cta-heading">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="max-w-xl">
          <h2
            id="cta-heading"
            className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            {title}
          </h2>
          <p className="mt-3 text-lg text-zinc-300">{description}</p>
        </div>
        <BookNowButton variant="blush" size="lg" />
      </div>
    </Section>
  );
}
