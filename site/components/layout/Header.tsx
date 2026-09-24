import Link from "next/link";
import { siteConfig } from "@/config/site";
import { BookNowButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <Container className="relative flex h-16 items-center justify-between gap-4">
        {/* Text wordmark until the client supplies a logo. */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight sm:text-xl"
        >
          {siteConfig.name}
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <NavLinks orientation="horizontal" />
        </nav>

        <div className="flex items-center gap-2">
          {/* Wrapper handles visibility: buttonStyles' own inline-flex would
              override a `hidden` class on the button. Phones use StickyBookBar. */}
          <div className="hidden sm:block">
            <BookNowButton size="sm" />
          </div>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
