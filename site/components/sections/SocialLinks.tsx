import { siteConfig } from "@/config/site";

/** Renders nothing until the client supplies social links. */
export function SocialLinks({ className = "" }: { className?: string }) {
  if (siteConfig.socials.length === 0) return null;
  return (
    <ul className={`flex flex-wrap gap-x-5 gap-y-2 ${className}`}>
      {siteConfig.socials.map(({ label, href }) => (
        <li key={href}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            {label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
