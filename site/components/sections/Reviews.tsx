import { siteConfig } from "@/config/site";
import { reviews } from "@/content/reviews";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Curated client reviews. No rating markup: these are hand-picked quotes.
 * Renders nothing until Jenna supplies reviews.
 */
export function Reviews({ tone = "default" }: { tone?: "default" | "soft" }) {
  if (reviews.length === 0) return null;
  const { googleReviewsUrl } = siteConfig;

  return (
    <Section tone={tone} labelledBy="reviews-heading">
      <SectionHeading id="reviews-heading" eyebrow="Reviews" title="What clients say" />

      <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map(({ quote, author, source, date }) => (
          <li key={`${author}-${quote.slice(0, 24)}`}>
            <figure className="flex h-full flex-col rounded-3xl border border-ink/15 bg-paper p-6 sm:p-8">
              <blockquote className="flex-1 text-lg leading-relaxed">
                <p>&ldquo;{quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-semibold">{author}</span>
                <span className="text-muted">
                  {" "}
                  · via {source}
                  {date && ` · ${date}`}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {googleReviewsUrl && (
        <p className="mt-8">
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-4"
          >
            Read all reviews on Google
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      )}
    </Section>
  );
}
