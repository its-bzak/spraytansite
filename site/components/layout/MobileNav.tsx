"use client";

import { useEffect, useId, useState } from "react";
import { BookNowButton } from "@/components/ui/Button";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { NavLinks } from "./NavLinks";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-12 w-12 items-center justify-center rounded-full hover:bg-blush-soft"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        {open ? (
          <CloseIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-ink/10 bg-paper px-5 pt-2 pb-6 shadow-lg sm:px-8"
      >
        <nav aria-label="Mobile">
          <NavLinks orientation="vertical" onNavigate={() => setOpen(false)} />
        </nav>
        <div className="mt-4">
          <BookNowButton size="lg" className="w-full" />
        </div>
      </div>
    </div>
  );
}
