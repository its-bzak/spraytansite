import Image from "next/image";
import { portfolioCategories, portfolioItems } from "@/content/portfolio";
import { Placeholder } from "@/components/ui/Placeholder";

export function PortfolioGallery() {
  if (portfolioItems.length === 0) {
    return (
      <Placeholder>
        <p>
          Portfolio photos are needed from Jenna, along with confirmation that
          each person pictured has agreed to have their photo published.
        </p>
      </Placeholder>
    );
  }

  const groups = portfolioCategories
    .map((category) => ({
      ...category,
      items: portfolioItems.filter((item) => item.category === category.id),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="space-y-16">
      {groups.map(({ id, title, items }) => (
        <div key={id}>
          <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
          {/* Masonry via CSS columns, so mixed portrait sizes show uncropped. */}
          <ul className="mt-6 columns-2 gap-4 md:columns-3 md:gap-6">
            {items.map(({ src, alt, caption, width, height }) => (
              <li key={src} className="mb-4 break-inside-avoid md:mb-6">
                <figure>
                  <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="h-auto w-full rounded-2xl"
                  />
                  {caption && (
                    <figcaption className="mt-2 text-sm text-muted">
                      {caption}
                    </figcaption>
                  )}
                </figure>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
