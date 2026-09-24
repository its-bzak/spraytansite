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
| Services, FAQ, portfolio data | `content/*.ts` |
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

`NEXT_PUBLIC_SITE_URL`: the production origin, e.g. `https://example.com`. It is **required for production**. Canonical URLs, Open Graph, the sitemap, robots and JSON-LD fall back to `http://localhost:3000` without it.

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
