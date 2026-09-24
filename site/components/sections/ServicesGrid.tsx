import { services, type Service } from "@/content/services";
import { BookNowButton } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";

const kindLabel: Record<Service["kind"], string> = {
  studio: "Studio",
  mobile: "Mobile",
  "add-on": "Add-on",
};

export function ServicesGrid() {
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {services.map((service) => (
        <li key={service.id} className="flex">
          <article className="flex w-full flex-col rounded-3xl border border-ink/15 bg-paper p-6 sm:p-8">
            <p className="inline-flex w-fit rounded-full bg-blush px-3 py-1 text-xs font-semibold tracking-wide uppercase">
              {kindLabel[service.kind]}
            </p>
            <h3 className="mt-4 text-xl font-semibold tracking-tight">
              {service.name}
            </h3>
            <p className="mt-2 text-muted">
              <span className="font-semibold text-ink">{service.price}</span>
              <span aria-hidden="true"> · </span>
              <span className="sr-only">, </span>
              {service.duration}
            </p>
            <div className="mt-4 flex-1 leading-relaxed text-muted">
              {service.description ?? (
                <Placeholder inline>{service.descriptionNeeded}</Placeholder>
              )}
            </div>
            <div className="mt-6">
              <BookNowButton size="sm" variant="secondary">
                Book Now
                <span className="sr-only"> for {service.name}</span>
              </BookNowButton>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
