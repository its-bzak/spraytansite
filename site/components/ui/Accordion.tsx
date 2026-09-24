import type { ReactNode } from "react";
import { ChevronDownIcon } from "./icons";

export type AccordionItem = { question: string; answer: ReactNode };

/** Native <details> disclosure: keyboard and screen-reader accessible, no JS. */
export function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className="divide-y divide-ink/15 border-y border-ink/15">
      {items.map(({ question, answer }) => (
        <details key={question} className="group">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
            <span>{question}</span>
            <ChevronDownIcon className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
          </summary>
          <div className="pb-6 leading-relaxed text-muted">{answer}</div>
        </details>
      ))}
    </div>
  );
}
