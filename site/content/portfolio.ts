export type PortfolioCategory = "weddings" | "events" | "everyday" | "studio";

export type PortfolioItem = {
  src: string;
  /** Describe only what is visible in the photo; no outcome claims. */
  alt: string;
  category: PortfolioCategory;
  /** Shown in the "Recent work" preview on the home page. */
  featured?: boolean;
  caption?: string;
  width: number;
  height: number;
};

/** Display order and headings for the gallery groups. */
export const portfolioCategories: { id: PortfolioCategory; title: string }[] = [
  { id: "weddings", title: "Weddings and engagements" },
  { id: "events", title: "Special events and prom" },
  { id: "everyday", title: "Everyday and vacation" },
  { id: "studio", title: "Studio shoot" },
];

/**
 * MISSING: the client's confirmation that each person pictured has agreed to
 * have their photo published.
 */
export const portfolioItems: PortfolioItem[] = [
  // Weddings and engagements
  {
    src: "/bridal-spray-tan-glow-wedding-day-prep.jpeg",
    alt: "Smiling bride in a lace wedding dress looking over her shoulder while her veil is adjusted",
    category: "weddings",
    featured: true,
    width: 1600,
    height: 2400,
  },
  {
    src: "/bride-and-groom-kissing-outdoor-wedding-portraits.jpeg",
    alt: "Bride and groom kissing on a stone terrace in front of trees, the bride holding a bouquet",
    category: "weddings",
    featured: true,
    width: 1179,
    height: 1466,
  },
  {
    src: "/flawless-wedding-spray-tan-bride-first-dance.jpeg",
    alt: "Groom dipping the bride for a kiss in a ballroom as guests cheer",
    category: "weddings",
    width: 1169,
    height: 1320,
  },
  {
    src: "/bridal-spray-tan-custom-airbrush-glow-wedding-dress.jpeg",
    alt: "Smiling bride in a strapless lace ball gown",
    category: "weddings",
    width: 1206,
    height: 1809,
  },
  {
    src: "/couples-wedding-spray-tan-natural-sunless-beach-glow.jpeg",
    alt: "Couple kissing in the beach dunes at sunset, the woman in a white sundress",
    category: "weddings",
    width: 1365,
    height: 2048,
  },
  {
    src: "/bride-and-groom-eating-late-night-wedding-snacks.jpeg",
    alt: "Bride and groom sharing a late-night snack at their reception",
    category: "weddings",
    width: 1179,
    height: 1569,
  },

  // Special events and prom
  {
    src: "/prom-spray-tan-custom-sunless-glow-pink-dress.jpeg",
    alt: "Smiling young woman in a strapless pink lace prom dress holding a bouquet by a pool",
    category: "events",
    featured: true,
    width: 1800,
    height: 2400,
  },
  {
    src: "/special-event-spray-tan-glow-blue-formal-dress.jpeg",
    alt: "Smiling woman in a pale blue satin halter dress",
    category: "events",
    featured: true,
    width: 1138,
    height: 1437,
  },
  {
    src: "/special-event-spray-tan-wedding-guest-glow.jpeg",
    alt: "Woman in a green satin halter gown holding hands with a man in a black suit on a lawn",
    category: "events",
    featured: true,
    width: 1800,
    height: 2400,
  },
  {
    src: "/special-event-spray-tan-red-dress-glamour-glow.jpeg",
    alt: "Woman in a strapless red satin gown taking a mirror selfie",
    category: "events",
    width: 1179,
    height: 1568,
  },
  {
    src: "/special-event-spray-tan-model-black-dress-outdoors.jpeg",
    alt: "Woman in a black gown looking back over her shoulder in a garden",
    category: "events",
    width: 1134,
    height: 1420,
  },

  // Everyday and vacation
  {
    src: "/summer-vacation-spray-tan-glowing-results-waterfront.jpeg",
    alt: "Two women in strapless dresses on a waterfront boardwalk at sunset",
    category: "everyday",
    featured: true,
    width: 1536,
    height: 2048,
  },
  {
    src: "/vacation-ready-spray-tan-flawless-summer-glow.jpeg",
    alt: "Woman in sunglasses and a cream two-piece outfit posing on a dock by the water",
    category: "everyday",
    width: 1800,
    height: 2400,
  },
  {
    src: "/fitness-model-celsius-energy-drink-glowing-tan.jpeg",
    alt: "Smiling woman in a black crop top and leggings holding a can of Celsius",
    category: "everyday",
    width: 1800,
    height: 2400,
  },
  {
    src: "/flawless-custom-spray-tan-results-everyday-glow.jpeg",
    alt: "Woman in a grey crop top taking a mirror selfie",
    category: "everyday",
    width: 660,
    height: 880,
  },
  {
    src: "/natural-sunless-tanning-glow-development-mirror-selfie.jpeg",
    alt: "Woman in a purple top and sweatpants taking a mirror selfie",
    category: "everyday",
    width: 1242,
    height: 2208,
  },

  // Studio shoot
  {
    src: "/sunless-tanning-aftercare-products-model.jpeg",
    alt: "Model in a zebra-print swimsuit holding Sjolie Sunless skincare products",
    category: "studio",
    width: 1536,
    height: 2304,
  },
  {
    src: "/sjolie-sunless-tanning-product-lineup-model-swimsuit.jpeg",
    alt: "Model in a zebra-print swimsuit seated behind a row of Sjolie Sunless products",
    category: "studio",
    width: 2304,
    height: 1536,
  },
  {
    src: "/gloss-post-tan-setting-spray-bottle-model-back.jpeg",
    alt: "Bottle of Gloss post tan setting and hydration spray resting on a model's stomach",
    category: "studio",
    width: 1536,
    height: 2304,
  },
];
