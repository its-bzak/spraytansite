import { instagram } from "@/config/site";
import { videoContent } from "@/content/video";
import { ExternalButtonLink } from "@/components/ui/Button";

/** Jenna's "stay tuned" note for the at-home kit, with a link to her Instagram. */
export function KitComingSoon({ className = "" }: { className?: string }) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <p className="text-lg leading-relaxed">{videoContent.comingSoon}</p>
      {instagram && (
        <p className="mt-6">
          <ExternalButtonLink href={instagram.href} variant="secondary">
            Follow on Instagram
          </ExternalButtonLink>
        </p>
      )}
    </div>
  );
}
