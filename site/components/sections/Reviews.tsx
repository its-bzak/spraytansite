import { siteConfig } from "@/config/site";
import { reviews } from "@/content/reviews";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Curated client reviews. No rating markup: these are hand-picked quotes. */
export function Reviews({ tone = "default" }: { tone?: "default" | "soft" }) {
  const { googleReviewsUrl } = siteConfig;

  return (
    <Section tone={tone} labelledBy="reviews-heading">
      <SectionHeading id="reviews-heading" eyebrow="Reviews" title="What clients say" />

      {reviews.length === 0 ? (
        <Placeholder className="mt-10 max-w-3xl">
          <p>
            Real reviews chosen by Jenna are needed, from Google or GlossGenius,
            each with the reviewer&apos;s permission and how they&apos;d like
            to be credited.
          </p>
        </Placeholder>
      ) : (
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
      )}

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
