import { PageHero } from "./PageHero";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";

/** Legal pages stay placeholders: their text must come from Jenna or her lawyer. */
export function LegalPage({ title, needed }: { title: string; needed: string }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} />
      <Section>
        <div className="max-w-3xl">
          <Placeholder>
            <p>{needed}</p>
          </Placeholder>
        </div>
      </Section>
    </>
  );
}
