# Content checklist: Spray Tan By Jenna

Everything the site needs from Jenna before launch. Nothing on the site was made up. Anything not supplied shows on the page as a pink **PLACEHOLDER** box.

Paths in the "Goes in" column are relative to `site/`.

## 1. Please confirm (taken from the current GlossGenius page)

| Item | Current value on the site | Goes in |
|---|---|---|
| Booking link | https://jennacrossley.glossgenius.com/services | `config/site.ts` → `bookingUrl` |
| Studio address | 3 Roosevelt Cir, Easton, MA 02375 | `config/site.ts` → `address` |
| OK to show the address publicly? | Currently shown in footer, Contact, Home, FAQ and search data | `config/site.ts` |
| Studio Spray Tan | $60 · 45 min | `content/services.ts` |
| Mobile Spray Tan | $80 · 60 min | `content/services.ts` |
| Prep And Post Spray Hydration | $15 · 5 min | `content/services.ts` |
| Any services missing from that list? | — | `content/services.ts` |

## 2. Needed from Jenna

**Contact and location** (`config/site.ts`)
- [ ] Phone number
- [ ] Email address
- [ ] Business hours
- [ ] Social media links (which platforms and the URLs)
- [ ] Towns/areas covered by mobile appointments

**Services** (`content/services.ts`, `app/services/page.tsx`)
- [ ] What the Prep And Post Spray Hydration add-on includes
- [ ] "What to expect" during an appointment
- [ ] Does GlossGenius have a direct booking link for each service? If so, each service card can link straight to it.

**FAQ answers** (`content/faq.ts`). These are Jenna's policies, so they haven't been drafted:
- [ ] How to prepare before an appointment
- [ ] Aftercare
- [ ] Cancellation, late and no-show policy
- [ ] Deposits or payment
- [ ] Mobile appointment requirements (space, setup, etc.)

**About** (`app/about/page.tsx`)
- [ ] Jenna's bio or story
- [ ] Any certifications, training or years of experience (only published if Jenna confirms them)

**Reviews** (`content/reviews.ts`, shown on Home and About)
- [ ] The reviews Jenna wants shown, copied word for word from Google or GlossGenius
- [ ] Each reviewer's permission, and how they'd like to be credited (e.g. "Sarah M.")
- [ ] Her Google reviews link, for "Read all reviews on Google" (`config/site.ts` → `googleReviewsUrl`)
- If there are no reviews yet, the section is removed from both pages instead.

**Paid video** (`content/video.ts`, page at `/video`)
- [ ] The video file (uploaded to Cloudflare Stream, not to the site)
- [ ] Title and description
- [ ] What it is. Is it part of the training program? This decides where it's linked from. For now it's only in the footer.
- [ ] Price (set in Stripe, which the site reads, so it can be changed without a code change)
- [ ] Refund policy for video purchases

**Legal** (`app/terms/page.tsx`, `app/privacy/page.tsx`). Needed now that the site takes payments:
- [ ] Terms of sale and use. Her GlossGenius site has a Terms page that may be reusable.
- [ ] Privacy policy covering Stripe payments, the purchase email and the access cookie. Her GlossGenius site has one that may be reusable.
- [ ] Sales tax on digital goods: a question for her accountant. Stripe Tax can collect it if needed.

**Training** (`app/training/page.tsx`)
- [ ] Program name and what it covers
- [ ] Format and duration
- [ ] Price
- [ ] Who it's for and any prerequisites
- [ ] Certification, if any
- [ ] How people sign up (GlossGenius, email, another platform?)

**Photos** (in `public/`, referenced from the files below)
- [ ] Hero photo for the home page (`components/sections/Hero.tsx`)
- [ ] Headshot or portrait of Jenna (`app/about/page.tsx`)
- [ ] Portfolio photos, plus confirmation that each person pictured agreed to be published (`content/portfolio.ts`)

**Brand**
- [ ] Logo, SVG preferred. Until then the site uses a text wordmark and a temporary "J" favicon (`app/icon.tsx`).
- [ ] Approve the baby pink (`#f8d7e2`) or supply the exact colour (`app/globals.css`)

## 3. Launch blockers (developer)

- [ ] **Domain.** Set `NEXT_PUBLIC_SITE_URL=https://<domain>` in the hosting environment. Without it, canonical links, social previews, the sitemap and search data all point to `http://localhost:3000`.
- [ ] Hosting decided and set up. It must run Node server code (e.g. Vercel), not static files only, because of the paid video.
- [ ] **Paid video accounts** (all env vars are listed in `site/.env.example`):
  - [ ] Stripe account in Jenna's name, business verified. Create the video Product and a one-time Price.
  - [ ] Stripe webhook: `https://<domain>/api/stripe/webhook`, event `checkout.session.completed`
  - [ ] Cloudflare account with Stream. Upload the video, set `requireSignedURLs: true`, create a signing key.
  - [ ] Resend account, with the sending domain verified by DNS (needs the domain)
  - [ ] Test the full purchase in Stripe test mode on the live domain before switching to live keys
- [ ] Analytics: needed or not?
- [ ] Does Jenna have a Google Business Profile? If so, add it to `socials` and `googleReviewsUrl`, and make sure its name, address and phone match the site.
- [ ] Final sweep. This must return nothing but the component definitions:
      `grep -rn "PLACEHOLDER\|NEEDS_CONFIRMATION\|MISSING\|<Placeholder\|neededLabel" site/app site/components site/config site/content`
