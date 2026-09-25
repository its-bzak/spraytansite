import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";

type Variant = "primary" | "secondary" | "inverse" | "blush";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-zinc-800",
  secondary: "border border-ink bg-paper text-ink hover:bg-blush-soft",
  inverse: "bg-paper text-ink hover:bg-blush",
  blush: "bg-blush text-ink hover:bg-blush-deep",
};

const sizes: Record<Size, string> = {
  sm: "px-5 text-sm min-h-11",
  md: "px-6 text-base min-h-12",
  lg: "px-8 text-base min-h-14",
};

export function buttonStyles(
  variant: Variant = "primary",
  size: Size = "md",
  className = "",
) {
  return [
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors",
    variants[variant],
    sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

/** Internal navigation button. */
export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
}: ButtonProps & { href: string }) {
  return (
    <Link href={href} className={buttonStyles(variant, size, className)}>
      {children}
    </Link>
  );
}

/**
 * The only component that links to the booking provider. Every "Book Now"
 * on the site renders through here. `href` defaults to the full service list
 * (siteConfig.bookingUrl); service cards pass serviceBookingUrl() instead so
 * GlossGenius opens with that service already selected.
 */
export function BookNowButton({
  href = siteConfig.bookingUrl,
  variant = "primary",
  size = "md",
  className,
  children = "Book Now",
}: Partial<ButtonProps> & { href?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonStyles(variant, size, className)}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
