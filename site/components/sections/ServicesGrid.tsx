import { serviceBookingUrl } from "@/config/site";
import { services, type Service } from "@/content/services";
import { BookNowButton } from "@/components/ui/Button";

const kindLabel: Record<Service["kind"], string> = {
  mobile: "Mobile",
  "add-on": "Add-on",
};

// One column per service, up to three. Full class names so Tailwind sees them.
const columns: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
};

export function ServicesGrid() {
  return (
    <ul
      className={`grid gap-6 ${columns[Math.min(services.length, 3)] ?? ""}`}
    >
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
            <p className="mt-4 flex-1 leading-relaxed text-muted">
              {service.description}
            </p>
            <div className="mt-6">
              <BookNowButton
                size="sm"
                variant="secondary"
                href={
                  service.bookingToken
                    ? serviceBookingUrl(service.bookingToken)
                    : undefined
                }
              >
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
