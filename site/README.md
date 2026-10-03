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
npm run check:booking  # compare content/services.ts with the live GlossGenius menu
```

## Where things live

| What | Where |
|---|---|
| Business details: name, booking URL, service area, phone, email, hours, socials, nav | `config/site.ts` |
| Services (with what's included, formulas, retail products), FAQ, portfolio, reviews, at-home kit text | `content/*.ts` |
| At-home kit page and paid video (Stripe, Cloudflare Stream, Resend) | `lib/`, `app/video/`, `app/api/stripe/webhook/` |
| Pages | `app/<route>/page.tsx` |
| Shared UI (buttons, sections, placeholders) | `components/ui/` |
| Header, footer, mobile nav, sticky Book Now bar | `components/layout/` |
| Page sections | `components/sections/` |
| Metadata and structured data | `lib/metadata.ts`, `lib/schema.ts` |
| Brand colours and font tokens | `app/globals.css` |

Rules:
- **Book Now:** always render `BookNowButton`. It's the only component that links to GlossGenius, so the URL lives in one place. By default it opens the full service list. Service cards pass `href={serviceBookingUrl(token)}`, which opens GlossGenius with that service already selected. The token is each service's `bookingToken` in `content/services.ts`.
- **GlossGenius drift:** `npm run check:booking` fetches her live GlossGenius menu and fails if a booking token is stale or a name, price or duration differs from `content/services.ts`. It needs network access, so it isn't part of the e2e suite. Run it before deploying and after she edits her menu.
- **Missing content:** leave it out. Components render nothing until their content exists (Reviews, contact rows, socials), and the e2e suite fails if a linked page shows a placeholder. Never write stand-in copy. List what's missing in `../CONTENT-CHECKLIST.md`. `Placeholder` is used only by the unlinked, unindexed Terms and Privacy pages.

## Environment

All variables are documented in `.env.example`. Copy it to `.env.local` for development.

- `NEXT_PUBLIC_SITE_URL`: the production origin, e.g. `https://example.com`. It is **required for production**, and Vercel production builds fail without it (`next.config.ts`). Canonical URLs, Open Graph, the sitemap, robots, JSON-LD, Stripe redirects and emailed links fall back to `http://localhost:3000` without it.
- **Paid video variables:** until *all* of them are set, `/video` shows the at-home kit's "coming soon" notice. The build and tests need none of them.

## Deploying (Vercel)

1. Import the GitHub repo and set **Root Directory** to `site`. Next.js is detected automatically.
2. Set `NEXT_PUBLIC_SITE_URL` for Production. The paid video variables can wait until the kit launches.
3. Add the domain in Vercel and point its DNS there.
4. Before each deploy, run `npm run check:booking`. After deploying, check `/robots.txt`, `/sitemap.xml` and a social preview of the home page.

## Adding photos

Keep the full-size originals in `../client-originals/` (git ignores it). Put web copies in `public/`, with:
- the long edge at most 2400px, JPEG at about quality 80
- metadata stripped. This matters because phone photos can carry GPS location. `sharp` drops it by default.
- descriptive kebab-case file names, like the existing ones
- alt text describing only what's visible, with no outcome claims

## Paid video

`/video` is the at-home spray tan kit page. Until checkout is configured it shows Jenna's "coming soon" note. Today's checkout sells access to the video only; selling the physical kit will need shipping-address collection and personalization (see `../CONTENT-CHECKLIST.md`).

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
