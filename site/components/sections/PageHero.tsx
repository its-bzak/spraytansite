import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

/** Top-of-page block; renders the page's single <h1>. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="bg-blush-soft py-14 md:py-20">
      <Container>
        <p className="mb-3 text-sm font-semibold tracking-widest uppercase">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blush-deep align-middle" />
          {eyebrow}
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        {lead && (
          <div className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {lead}
          </div>
        )}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </Container>
    </div>
  );
}
