import Link from "next/link";
import { resendAccessLink, startCheckout } from "@/app/video/actions";
import { buttonStyles } from "@/components/ui/Button";

type Notice = "sent" | "invalid" | "error" | null;

const notices: Record<Exclude<Notice, null>, string> = {
  sent: "If that email has a purchase, we've sent it a new access link. Check your inbox (and spam folder).",
  invalid: "Please enter a valid email address.",
  error: "That access link didn't work. Enter the email you paid with and we'll send a new one.",
};

export function VideoPaywall({
  price,
  notice,
}: {
  price: string | null;
  notice: Notice;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border border-ink/15 p-6 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight">Get access</h2>
        <p className="mt-3 text-muted">
          One payment, lifetime access. After checkout you&apos;ll come straight
          back here, and we&apos;ll email you a personal link so you can watch
          on any device.
        </p>
        {price && (
          <p className="mt-6 text-3xl font-semibold tracking-tight">{price}</p>
        )}
        <form action={startCheckout} className="mt-6">
          <button type="submit" className={buttonStyles("primary", "lg")}>
            Buy access
          </button>
        </form>
        <p className="mt-4 text-sm text-muted">
          Secure payment by Stripe. By purchasing you agree to the{" "}
          <Link href="/terms" className="underline underline-offset-4">
            terms
          </Link>
          .
        </p>
      </div>

      <div className="rounded-3xl bg-blush-soft p-6 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          Already purchased?
        </h2>
        <p className="mt-3 text-muted">
          Enter the email you used at checkout and we&apos;ll send your access
          link again.
        </p>
        {notice && (
          <p
            role="status"
            className="mt-4 rounded-2xl bg-paper p-4 text-sm font-medium"
          >
            {notices[notice]}
          </p>
        )}
        <form action={resendAccessLink} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="access-email" className="sr-only">
            Email address
          </label>
          <input
            id="access-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="min-h-12 w-full rounded-full border border-ink/30 bg-paper px-5 text-base placeholder:text-zinc-500"
          />
          <button type="submit" className={buttonStyles("secondary", "md")}>
            Email my link
          </button>
        </form>
      </div>
    </div>
  );
}
