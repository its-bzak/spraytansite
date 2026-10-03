import { serviceAreaLabel } from "@/config/site";
import type { AccordionItem } from "@/components/ui/Accordion";
import { formulas, services } from "./services";

/**
 * These answers only restate facts from Jenna's own copy and her GlossGenius
 * listing. Policy answers (prep, aftercare, cancellation, etc.) are Jenna's
 * to write and are NOT drafted here; see CONTENT-CHECKLIST.md.
 */
const [mobile] = services;

export const faqItems: AccordionItem[] = [
  {
    question: "Where are appointments held?",
    answer: `All appointments are mobile: Jenna comes to you in ${serviceAreaLabel}.`,
  },
  {
    question: "What's included in a mobile spray tan?",
    answer:
      "An in-depth consultation to choose your custom formula, pH-balancing prep spray and hydrating setting spray, full-body application, a fragrance and a skin-boosting additive of your choice, finishing powder and all disposables. The Services page has the full list.",
  },
  {
    question: "How long does an appointment take?",
    answer: `The ${mobile.name} is listed at ${mobile.duration}.`,
  },
  {
    question: "How much does a spray tan cost?",
    answer: `The ${mobile.name} is listed at ${mobile.price}. See the Services page for everything that's included.`,
  },
  {
    question: "When do I rinse off my tan?",
    answer: `It depends on the formula you choose at your consultation. ${formulas
      .map(({ name, rinseTime }) => `${name}: rinse after ${rinseTime}.`)
      .join(" ")}`,
  },
  {
    question: "Can I buy aftercare products?",
    answer:
      "Yes. A body lotion, gradual tan extend lotion, spray-tan-safe shower gel and spray-tan-safe SPF 30 sunscreen are available to purchase at your appointment, to maintain and extend the life of your tan.",
  },
  {
    question: "How do I book?",
    answer:
      "Appointments are booked online through Jenna's GlossGenius booking page. Use any Book Now button on this site.",
  },
  {
    question: "Do you offer spray tan training?",
    answer:
      "Yes. Jenna offers hands-on spray tan training and consulting, for established beauty businesses and for anyone starting a business of their own. See the Training page for how it works.",
  },
];
