import type { ReactNode } from "react";

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold tracking-widest uppercase">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blush-deep align-middle" />
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
      >
        {title}
      </Tag>
      {description && (
        <div className="mt-4 text-lg leading-relaxed opacity-80">
          {description}
        </div>
      )}
    </div>
  );
}
