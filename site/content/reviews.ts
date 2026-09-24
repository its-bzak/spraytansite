export type Review = {
  /** Exact wording from the original review. Do not edit or combine reviews. */
  quote: string;
  /** Reviewer credit as they agreed to it, e.g. "Sarah M." */
  author: string;
  source: "Google" | "GlossGenius";
  /** e.g. "March 2026" */
  date?: string;
};

/**
 * MISSING: real reviews chosen by Jenna, each with the reviewer's permission
 * to be quoted. Never write or paraphrase reviews.
 */
export const reviews: Review[] = [];
