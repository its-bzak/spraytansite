import { BookNowButton } from "@/components/ui/Button";

/** Persistent mobile-only booking bar; the header button covers larger screens. */
export function StickyBookBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-paper/95 px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur sm:hidden">
      <BookNowButton size="lg" className="w-full" />
    </div>
  );
}
