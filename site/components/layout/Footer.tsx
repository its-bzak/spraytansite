import Link from "next/link";
import { formatAddress, navLinks, siteConfig } from "@/config/site";
import { BookNowButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import { SocialLinks } from "@/components/sections/SocialLinks";

export function Footer() {
  const { name, address, phone, email } = siteConfig;

  return (
    <footer
      data-tone="dark"
      className="bg-ink pt-16 pb-28 text-paper sm:pb-10"
    >
      <Container>
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="text-xl font-semibold tracking-tight">{name}</p>
            <p className="mt-3 max-w-xs text-zinc-300">
              {siteConfig.tagline}.
            </p>
            <div className="mt-6">
              <BookNowButton variant="blush" />
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold tracking-widest uppercase">
              Explore
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 md:grid-cols-1">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-block py-2 text-zinc-300 hover:text-paper"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold tracking-widest uppercase">
              Visit &amp; contact
            </h2>
            <address className="mt-4 space-y-2 text-zinc-300 not-italic">
              <p>{formatAddress(address)}</p>
              {phone && (
                <p>
                  <a href={`tel:${phone}`} className="hover:text-paper">
                    {phone}
                  </a>
                </p>
              )}
              {email && (
                <p>
                  <a href={`mailto:${email}`} className="hover:text-paper">
                    {email}
                  </a>
                </p>
              )}
            </address>
            {(!phone || !email) && (
              <p className="mt-2">
                <Placeholder inline>
                  {[!phone && "phone", !email && "email"]
                    .filter(Boolean)
                    .join(" & ")}
                </Placeholder>
              </p>
            )}
            <SocialLinks className="mt-4" />
          </div>
        </div>

        <p className="mt-14 border-t border-white/15 pt-6 text-sm text-zinc-400">
          &copy; {new Date().getFullYear()} {name}. All rights reserved.
          Site designed and built by Barczak Development
        </p>
      </Container>
    </footer>
  );
}
