import Image from "next/image";

type ImageFrameProps = {
  alt: string;
  aspect?: string;
  /** object-position class that controls the crop, e.g. "object-top". */
  position?: string;
  preload?: boolean;
  sizes?: string;
  className?: string;
} & (
  | { src: string; neededLabel?: never }
  | {
      src?: undefined;
      /** Describes the photo the client needs to provide. */
      neededLabel: string;
    }
);

/**
 * Photo slot. `alt` is required so accessible text is enforced at compile
 * time. With no `src`, a clearly marked placeholder is shown instead.
 */
export function ImageFrame({
  src,
  alt,
  neededLabel,
  aspect = "aspect-[4/5]",
  position = "object-center",
  preload = false,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  className = "",
}: ImageFrameProps) {
  const shape = `relative w-full overflow-hidden rounded-3xl ${aspect} ${className}`;

  if (!src) {
    return (
      <div
        role="img"
        aria-label={`Photo placeholder: ${neededLabel}`}
        className={`${shape} flex items-center justify-center border-2 border-dashed border-blush-deep bg-blush p-6 text-center`}
      >
        <p className="max-w-xs text-sm font-semibold">
          PLACEHOLDER PHOTO: {neededLabel}
        </p>
      </div>
    );
  }

  return (
    <div className={shape}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        className={`object-cover ${position}`}
      />
    </div>
  );
}
