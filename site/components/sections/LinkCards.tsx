import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const cards = [
  {
    href: "/portfolio",
    title: "Portfolio",
    text: "Browse photos of Jenna's work.",
  },
  {
    href: "/faq",
    title: "FAQ",
    text: "Find answers about appointments.",
  },
  {
    href: "/training",
    title: "Training",
    text: "Learn about Jenna's training program.",
  },
] as const;

/** Internal links from the home page to secondary sections. */
export function LinkCards() {
  return (
    <Section labelledBy="more-heading">
      <SectionHeading id="more-heading" eyebrow="Explore" title="Learn more" />
      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {cards.map(({ href, title, text }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex h-full flex-col rounded-3xl border border-ink/15 p-6 transition-colors hover:bg-blush-soft sm:p-8"
            >
              <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 flex-1 text-muted">{text}</p>
              <ArrowRightIcon className="mt-6 h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
