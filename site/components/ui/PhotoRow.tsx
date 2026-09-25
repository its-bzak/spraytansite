import { ImageFrame } from "./ImageFrame";

export type Photo = {
  src: string;
  /** Describe only what is visible in the photo; no outcome claims. */
  alt: string;
  caption?: string;
};

/** A row of supporting photos: one column on mobile, three from `md` up. */
export function PhotoRow({ photos }: { photos: Photo[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {photos.map(({ src, alt, caption }) => (
        <li key={src}>
          <figure>
            <ImageFrame
              src={src}
              alt={alt}
              aspect="aspect-[4/5]"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
            {caption && (
              <figcaption className="mt-3 text-sm text-muted">
                {caption}
              </figcaption>
            )}
          </figure>
        </li>
      ))}
    </ul>
  );
}
