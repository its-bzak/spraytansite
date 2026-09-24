import Image from "next/image";
import { portfolioItems } from "@/content/portfolio";
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

  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
      {portfolioItems.map(({ src, alt, caption, width, height }) => (
        <li key={src}>
          <figure>
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes="(min-width: 768px) 33vw, 50vw"
              className="h-auto w-full rounded-2xl object-cover"
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
  );
}
