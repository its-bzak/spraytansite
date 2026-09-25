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
  /**
   * GlossGenius service token (the `token` field on her public services
   * page). Book Now opens GlossGenius with this service already selected.
   * If the service is deleted and re-created in GlossGenius the token
   * changes; the link then falls back to the unselected service list.
   * `npm run check:booking` reports stale tokens.
   */
  bookingToken?: string;
};

export const services: Service[] = [
  {
    id: "studio-spray-tan",
    name: "Studio Spray Tan",
    price: "$60",
    duration: "45 min",
    kind: "studio",
    description: "An appointment at Jenna's studio in Easton, MA.",
    bookingToken: "1000f-c8e2e818-9f2c-4223-914e-7b0fbb6a81ff",
  },
  {
    id: "mobile-spray-tan",
    name: "Mobile Spray Tan",
    price: "$80",
    duration: "60 min",
    kind: "mobile",
    description: "A house-call appointment: Jenna comes to you.",
    bookingToken: "1000f-dcbc1b41-09d8-4caa-9d41-2f0b8372842f",
  },
  {
    id: "prep-post-spray-hydration",
    name: "Prep And Post Spray Hydration",
    price: "$15",
    duration: "5 min",
    kind: "add-on",
    descriptionNeeded: "what this add-on includes",
    // No bookingToken: it's chosen alongside a tan, so Book Now opens the
    // full service list. Its GlossGenius token, for reference, is
    // 1000f-63f32dbd-b356-420c-a31b-b124dd378e9a.
  },
];
