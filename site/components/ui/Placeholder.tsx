import type { ReactNode } from "react";

/**
 * Visibly marks content the client has not supplied yet. Searchable with
 * `grep -r PLACEHOLDER` before launch. Never use for real copy.
 */
export function Placeholder({
  children,
  inline = false,
  className = "",
}: {
  children: ReactNode;
  inline?: boolean;
  className?: string;
}) {
  if (inline) {
    return (
      <span
        className={`rounded bg-blush px-1.5 py-0.5 text-sm font-medium text-ink ${className}`}
      >
        PLACEHOLDER: {children}
      </span>
    );
  }
  return (
    <div
      role="note"
      className={`rounded-2xl border-2 border-dashed border-blush-deep bg-blush-soft p-6 text-ink ${className}`}
    >
      <p className="text-sm font-semibold tracking-wide uppercase">
        Placeholder
      </p>
      <div className="mt-2 leading-relaxed">{children}</div>
    </div>
  );
}
