# Spray Tan By Jenna — website

Next.js 16 (App Router), TypeScript, Tailwind CSS 4. Every page is statically generated.

## Scripts

```bash
npm run dev        # http://localhost:3000
npm run build
npm run start
npm run lint
npx tsc --noEmit
npm run test:e2e   # see "Tests" below
```

## Where things live

| What | Where |
|---|---|
| Business details: name, booking URL, address, phone, email, hours, socials, nav | `config/site.ts` |
| Services, FAQ, portfolio, reviews, video text | `content/*.ts` |
| Paid video (Stripe, Cloudflare Stream, Resend) | `lib/`, `app/video/`, `app/api/stripe/webhook/` |
| Pages | `app/<route>/page.tsx` |
| Shared UI (buttons, sections, placeholders) | `components/ui/` |
| Header, footer, mobile nav, sticky Book Now bar | `components/layout/` |
| Page sections | `components/sections/` |
| Metadata and structured data | `lib/metadata.ts`, `lib/schema.ts` |
| Brand colours and font tokens | `app/globals.css` |

Rules:
- **Book Now:** always render `BookNowButton`. It's the only component that links to GlossGenius, so the URL lives in one place.
- **Missing content:** use `Placeholder` / `ImageFrame` (without `src`). Never write stand-in copy. The full list of what's still missing is in `../CONTENT-CHECKLIST.md`.

## Environment

All variables are documented in `.env.example`. Copy it to `.env.local` for development.

- `NEXT_PUBLIC_SITE_URL`: the production origin, e.g. `https://example.com`. It is **required for production**. Canonical URLs, Open Graph, the sitemap, robots, JSON-LD, Stripe redirects and emailed links fall back to `http://localhost:3000` without it.
- **Paid video variables:** until *all* of them are set, `/video` shows a "not set up yet" notice. The build and tests need none of them.

## Paid video

How it works:
- There is no database; Stripe is the record of who paid.
- **Buy:** "Buy access" opens Stripe Checkout. Stripe then redirects to `/video/unlock?session_id=…`, which confirms the payment with Stripe and sets a signed, httpOnly `video_access` cookie.
- **Email:** the webhook (`checkout.session.completed`) emails the buyer a personal link, `/video/unlock?t=<signed token>`. It restores access on any device. "Email my link" re-sends it to past buyers.
- **Refunds:** every view of `/video` re-checks the purchase with Stripe, so a full refund removes access.
- **Playback:** the player uses a Cloudflare Stream URL signed locally, which expires after 4 hours. The video itself must have `requireSignedURLs` enabled.
- **Limits:** a buyer's link can be shared, since there are no accounts, and screen recording can't be prevented.

Test locally in Stripe test mode:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook   # prints STRIPE_WEBHOOK_SECRET
npm run dev
```

Pay with card `4242 4242 4242 4242`, any future date and any CVC. In test mode, Resend only delivers to your own Resend account email.

## Tests

Playwright + axe tests in `e2e/` cover:
- no horizontal scroll at 375/768/1024/1440
- no console errors
- WCAG 2.1 AA (axe)
- one `h1` per page
- Book Now links
- internal links
- the mobile menu
- SEO tags

They run against the production build:

```bash
npm run build
npx next start -p 3100     # leave running in a second terminal
npm run test:e2e
```

Start the server yourself as shown. If Playwright starts it, the runner hangs for minutes on exit on Windows. First-time setup: `npx playwright install chromium`.
