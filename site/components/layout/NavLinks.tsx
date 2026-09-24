"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/config/site";

/** Client component only so the current page can be marked with aria-current. */
export function NavLinks({
  orientation,
  onNavigate,
}: {
  orientation: "horizontal" | "vertical";
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  const list =
    orientation === "horizontal"
      ? "flex items-center gap-1"
      : "flex flex-col divide-y divide-ink/10";
  const item =
    orientation === "horizontal"
      ? "rounded-full px-3 py-2 text-sm font-medium"
      : "block py-4 text-xl font-semibold";

  return (
    <ul className={list}>
      {navLinks.map(({ label, href }) => {
        const current = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={current ? "page" : undefined}
              className={`${item} ${
                current
                  ? "bg-blush text-ink"
                  : "text-ink/80 hover:bg-blush-soft hover:text-ink"
              }`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
