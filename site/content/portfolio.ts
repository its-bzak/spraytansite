export type PortfolioItem = {
  src: string;
  /** Describe only what is visible in the photo; no outcome claims. */
  alt: string;
  caption?: string;
  width: number;
  height: number;
};

/**
 * MISSING: real result photos, plus the client's confirmation that each
 * person has agreed to have their photo published.
 */
export const portfolioItems: PortfolioItem[] = [];
