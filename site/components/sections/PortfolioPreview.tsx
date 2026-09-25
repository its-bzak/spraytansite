import { portfolioItems } from "@/content/portfolio";
import { ButtonLink } from "@/components/ui/Button";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Home page teaser: the featured portfolio photos, linking to /portfolio. */
export function PortfolioPreview() {
  const featured = portfolioItems.filter((item) => item.featured);
  if (featured.length === 0) return null;

  return (
    <Section labelledBy="work-heading">
      <SectionHeading
        id="work-heading"
        eyebrow="Portfolio"
        title="Recent work"
        description="Spray tans by Jenna for weddings, proms, events and everyday."
      />
      <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {featured.map(({ src, alt }) => (
          <li key={src}>
            <ImageFrame
              src={src}
              alt={alt}
              aspect="aspect-[4/5]"
              position="object-top"
              sizes="(min-width: 768px) 33vw, 50vw"
            />
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <ButtonLink href="/portfolio" variant="secondary">
          See the full portfolio
        </ButtonLink>
      </div>
    </Section>
  );
}
