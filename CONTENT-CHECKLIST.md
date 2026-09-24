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
- [ ] Testimonials or reviews, only with each client's permission (otherwise the site won't have a reviews section)

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
- [ ] Hosting decided and set up.
- [ ] Analytics and privacy policy: needed or not?
- [ ] Does Jenna have a Google Business Profile? If so, add it to `socials`, and make sure its name, address and phone match the site.
- [ ] Final sweep. This must return nothing but the component definitions:
      `grep -rn "PLACEHOLDER\|NEEDS_CONFIRMATION\|MISSING\|<Placeholder\|neededLabel" site/app site/components site/config site/content`
