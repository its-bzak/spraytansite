/**
 * Must match Jenna's GlossGenius menu: `npm run check:booking` compares the
 * names, prices, durations and booking tokens below with her live listing.
 *
 * NEEDS_CONFIRMATION: the price and duration are her current GlossGenius
 * listing. She is setting LA prices; update them when her menu changes.
 */
export type Service = {
  id: string;
  name: string;
  price: string;
  duration: string;
  kind: "mobile" | "add-on";
  description: string;
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
    id: "mobile-spray-tan",
    name: "Mobile Spray Tan",
    price: "$80",
    duration: "60 min",
    kind: "mobile",
    description:
      "A full-body spray tan with your custom formula. Jenna comes to you in the Los Angeles area.",
    bookingToken: "1000f-dcbc1b41-09d8-4caa-9d41-2f0b8372842f",
  },
];

// The lists below are Jenna's own copy (October 2026), lightly copyedited.

/** What every mobile spray tan includes. */
export const included = [
  "In-depth consultation to choose your custom formula",
  "pH-balancing prep spray and hydrating setting spray",
  "Full-body spray application with blending and drying techniques",
  "Fragrance additive of your choice: vanilla, pineapple or coconut",
  "A skin-boosting additive: choose from an anti-aging or skin-nourishing concentrate",
  "Finishing powder to eliminate post-spray stickiness",
  "All disposables: hair nets, foot pads and disposable underwear",
];

/** Formulas offered at the consultation, with how long to wait before rinsing. */
export const formulas = [
  { name: "Classic overnight", rinseTime: "8–12 hours" },
  { name: "Rapid rinse", rinseTime: "1–5 hours" },
  { name: "Clear", rinseTime: "1–5 hours" },
];

/** Aftercare products available to buy at the appointment. */
export const retailProducts = [
  "Body lotion",
  "Gradual tan extend lotion",
  "Spray-tan-safe shower gel",
  "Spray-tan-safe SPF 30 sunscreen",
];
