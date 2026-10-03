# Content checklist: Spray Tan By Jenna

Everything the site still needs from Jenna. Nothing on the site was made up. Anything she hasn't supplied yet is left off the site until it arrives, instead of showing a placeholder.

Paths in the "Goes in" column are relative to `site/`.

## Supplied (October 2026)

- [x] LA mobile spray tan copy: what's included, formulas and rinse times, retail aftercare products (`content/services.ts`; Home and Services pages)
- [x] At-home kit "coming soon" copy (`content/video.ts`; `/video` and Services)
- [x] Training and consulting copy (`app/training/page.tsx`)
- [x] Instagram handle @spraytanbyjenna (`config/site.ts` → `socials`)
- [x] Photos: hero, portrait, portfolio, Services and Training

Her copy was lightly copyedited (punctuation, hyphenation, "pH"). No meaning was changed.

## 1. Please confirm

| Item | Current value on the site | Goes in |
|---|---|---|
| Booking link | https://jennacrossley.glossgenius.com/services | `config/site.ts` → `bookingUrl` |
| Mobile Spray Tan price and time in LA | $80 · 60 min (her current GlossGenius listing, set in Massachusetts) | GlossGenius, then `content/services.ts` |
| Instagram profile | https://www.instagram.com/spraytanbyjenna/ (couldn't be checked automatically) | `config/site.ts` → `socials` |
| Prep And Post Spray Hydration ($15 add-on) | Removed: the LA package includes both sprays | `content/services.ts` |
| About page | Shows two lines from her own LA and training copy until her bio arrives | `app/about/page.tsx` |

## 2. GlossGenius updates for LA (Jenna)

- [ ] Remove "Studio Spray Tan" and "Prep And Post Spray Hydration"
- [ ] Set the LA price and duration for "Mobile Spray Tan" (or tell us its new name)
- [ ] Update her business location in GlossGenius
- [ ] Optional: a free "training call" service, so the 15-minute training call can be booked online

Then run `npm run check:booking` from `site/`. Until her menu changes it fails, listing exactly the two removed services. That's expected.

## 3. Needed from Jenna

**Contact and area** (`config/site.ts`)
- [ ] Phone number, if it should be public
- [ ] Email address
- [ ] Hours or availability
- [ ] Which parts of LA she covers, and any travel fee
- [ ] How people should request the 15-minute training call: phone, email, Instagram message or a GlossGenius booking

**FAQ answers** (`content/faq.ts`). These are her policies, so they haven't been drafted:
- [ ] How to prepare before an appointment
- [ ] Aftercare, beyond the products she sells
- [ ] Cancellation, late and no-show policy
- [ ] Deposits or payment
- [ ] Mobile appointment requirements (space, setup, etc.)

**About** (`app/about/page.tsx`)
- [ ] Jenna's bio or story
- [ ] Any certifications, training or years of experience (only published if Jenna confirms them)

**Reviews** (`content/reviews.ts`; the section appears on Home and About once there's at least one)
- [ ] The reviews Jenna wants shown, copied word for word from Google or GlossGenius
- [ ] Each reviewer's permission, and how they'd like to be credited (e.g. "Sarah M.")
- [ ] Her Google reviews link, for "Read all reviews on Google" (`config/site.ts` → `googleReviewsUrl`)

**Training** (`app/training/page.tsx`)
- [ ] OK to mention that trainees receive a certificate of completion? Her training photo shows one.
- [ ] Does she travel for on-site training, or only within LA?

**At-home kit and video** (`content/video.ts`, page at `/video`). Needed before it goes on sale:
- [ ] What's in the kit and how it's personalized
- [ ] Price (set in Stripe, which the site reads, so it can change without a code change), shipping and refund policy
- [ ] The video file (uploaded to Cloudflare Stream, not to the site)
- Developer work when she's ready: checkout currently sells video access only. A physical kit needs Stripe shipping-address collection, a way to collect personalization details, and new wording for the purchase email (`lib/email.ts`).

**Legal** (`app/terms/page.tsx`, `app/privacy/page.tsx`). Required before the kit goes on sale. Until then both pages are unlinked and kept out of search.
- [ ] Terms of sale and use, including refunds. Her GlossGenius site has a Terms page that may be reusable.
- [ ] Privacy policy covering Stripe payments, the purchase email and the access cookie. Her GlossGenius site has one that may be reusable.
- [ ] Sales tax on the kit and video: a question for her accountant. Stripe Tax can collect it if needed.
- When the text arrives: add Terms and Privacy back to `secondaryLinks` in `config/site.ts`, and remove `robots: { index: false }` from both pages.

**Photos** (web copies in `public/`; full-size originals in `client-originals/`, which git ignores. See "Adding photos" in `site/README.md`.)
- [ ] The tans she has done on herself, for the at-home kit page
- [ ] Photos from her recent salon training, for the Training page
- [ ] Confirmation that each person pictured (portfolio, Services and Training photos) agreed to be published
- [ ] Optional: LA photos as her work there builds up

**Brand**
- [ ] Logo, SVG preferred. Until then the site uses a text wordmark and a temporary "J" favicon (`app/icon.tsx`).
- [ ] Approve the baby pink (`#f8d7e2`) or supply the exact colour (`app/globals.css`)

## 4. Launch blockers (developer)

- [ ] **Domain.** Set `NEXT_PUBLIC_SITE_URL=https://<domain>` for Production in Vercel. Production builds on Vercel fail without it, so canonical links, social previews, the sitemap and search data can't ship pointing at `http://localhost:3000`.
- [ ] **Vercel project.** Import the GitHub repo and set the Root Directory to `site`. It must run Node server code, not static files only, because of `/video` and the Stripe webhook.
- [ ] Jenna's GlossGenius menu is updated for LA and `npm run check:booking` passes
- [ ] The Instagram link opens her profile
- [ ] Google Business Profile for LA, set up as a service-area business with the address hidden. Add it to `socials` and `googleReviewsUrl`, and make sure its name and phone match the site.
- [ ] Analytics: needed or not?
- [ ] Final sweep. No linked page may show a placeholder (the e2e suite checks this). Markers that remain should only cover hidden or unconfirmed content:
      `grep -rn "PLACEHOLDER\|NEEDS_CONFIRMATION\|MISSING\|<Placeholder\|neededLabel" site/app site/components site/config site/content`

**Paid video accounts**, needed only when the kit launches (all env vars are listed in `site/.env.example`):
- [ ] Stripe account in Jenna's name, business verified. Create the Product and a one-time Price.
- [ ] Stripe webhook: `https://<domain>/api/stripe/webhook`, event `checkout.session.completed`
- [ ] Cloudflare account with Stream. Upload the video, set `requireSignedURLs: true`, create a signing key.
- [ ] Resend account, with the sending domain verified by DNS (needs the domain)
- [ ] Test the full purchase in Stripe test mode on the live domain before switching to live keys
