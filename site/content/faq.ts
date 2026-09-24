import { formatAddress, siteConfig } from "@/config/site";
import type { AccordionItem } from "@/components/ui/Accordion";
import { services } from "./services";

/**
 * NEEDS_CONFIRMATION: these answers only restate facts from Jenna's existing
 * GlossGenius listing. Policy answers (prep, aftercare, cancellation, etc.)
 * are Jenna's to write and are NOT drafted here.
 */
const [studio, mobile] = services;

export const faqItems: AccordionItem[] = [
  {
    question: "Where are appointments held?",
    answer: `Studio appointments are at ${formatAddress(siteConfig.address)}. Jenna also offers mobile (house-call) appointments.`,
  },
  {
    question: "How long does an appointment take?",
    answer: `The ${studio.name} is listed at ${studio.duration} and the ${mobile.name} at ${mobile.duration}.`,
  },
  {
    question: "How much does a spray tan cost?",
    answer: `The ${studio.name} is listed at ${studio.price} and the ${mobile.name} at ${mobile.price}. See the Services page for all current options.`,
  },
  {
    question: "How do I book?",
    answer:
      "Appointments are booked online through Jenna's GlossGenius booking page. Use any Book Now button on this site.",
  },
];

/** Topics Jenna needs to answer before they can be published. */
export const faqTopicsNeeded = [
  "How to prepare before an appointment",
  "Aftercare",
  "Cancellation, late and no-show policy",
  "Deposits or payment",
  "Mobile appointment service area and requirements",
];
