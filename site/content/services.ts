/**
 * NEEDS_CONFIRMATION: names, prices and durations come from Jenna's existing
 * GlossGenius listing and must be confirmed by the client before launch.
 * Descriptions are only written where the listing itself states the fact;
 * anything else is left for the client to supply.
 */
export type Service = {
  id: string;
  name: string;
  price: string;
  duration: string;
  kind: "studio" | "mobile" | "add-on";
  /** Undefined = client has not supplied a description yet. */
  description?: string;
  /** Shown as a placeholder when `description` is missing. */
  descriptionNeeded?: string;
};

export const services: Service[] = [
  {
    id: "studio-spray-tan",
    name: "Studio Spray Tan",
    price: "$60",
    duration: "45 min",
    kind: "studio",
    description: "An appointment at Jenna's studio in Easton, MA.",
  },
  {
    id: "mobile-spray-tan",
    name: "Mobile Spray Tan",
    price: "$80",
    duration: "60 min",
    kind: "mobile",
    description: "A house-call appointment: Jenna comes to you.",
  },
  {
    id: "prep-post-spray-hydration",
    name: "Prep And Post Spray Hydration",
    price: "$15",
    duration: "5 min",
    kind: "add-on",
    descriptionNeeded: "what this add-on includes",
  },
];
