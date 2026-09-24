import type { ReactNode } from "react";
import { Container } from "./Container";

type Tone = "default" | "soft" | "dark";

const tones: Record<Tone, string> = {
  default: "bg-paper text-ink",
  soft: "bg-blush-soft text-ink",
  dark: "bg-ink text-paper",
};

export function Section({
  children,
  tone = "default",
  labelledBy,
  id,
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  /** id of the heading that names this section. */
  labelledBy?: string;
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-tone={tone}
      className={`${tones[tone]} py-16 md:py-24 ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}
