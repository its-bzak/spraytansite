import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { navLinks, secondaryLinks, siteConfig } from "../config/site";

const routes = [...navLinks, ...secondaryLinks].map((link) => link.href);
const viewports = [375, 768, 1024, 1440].map((width) => ({
  width,
  height: 900,
}));

for (const viewport of viewports) {
  test.describe(`${viewport.width}px`, () => {
    test.use({ viewport });

    for (const route of routes) {
      test(`${route}: layout, console, a11y`, async ({ page }) => {
        const problems: string[] = [];
        page.on("console", (msg) => {
          if (["error", "warning"].includes(msg.type())) {
            problems.push(`${msg.type()}: ${msg.text()}`);
          }
        });
        page.on("pageerror", (err) => problems.push(`pageerror: ${err.message}`));

        await page.goto(route);

        // No horizontal scrolling.
        const overflow = await page.evaluate(
          () =>
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
        );
        expect(overflow, "horizontal overflow (px)").toBeLessThanOrEqual(0);

        // Heading hierarchy: exactly one h1.
        await expect(page.locator("h1")).toHaveCount(1);

        // Accessibility (WCAG 2.x A/AA).
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
          .analyze();
        expect(
          results.violations.map((v) => `${v.id}: ${v.nodes.length} node(s)`),
        ).toEqual([]);

        expect(problems).toEqual([]);
      });
    }
  });
}

test("every Book Now link points to the booking URL in a new tab", async ({
  page,
}) => {
  for (const route of routes) {
    await page.goto(route);
    const links = page.getByRole("link", { name: /book now/i });
    const count = await links.count();
    expect(count, `${route} has a Book Now link`).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      await expect(link).toHaveAttribute("href", siteConfig.bookingUrl);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
    }
  }
});

test("all internal links resolve", async ({ page, request }) => {
  const hrefs = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    const found = await page
      .locator("a[href^='/']")
      .evaluateAll((els) => els.map((el) => el.getAttribute("href") ?? ""));
    found.forEach((href) => hrefs.add(href.split("#")[0] || "/"));
  }
  for (const href of hrefs) {
    const response = await request.get(href);
    expect(response.status(), href).toBe(200);
  }
});

test.describe("mobile menu", () => {
  test.use({ viewport: { width: 375, height: 800 } });

  test("opens, lists every page, closes with Escape", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: /open menu/i });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();

    const nav = page.getByRole("navigation", { name: "Mobile" });
    await expect(nav).toBeVisible();
    for (const { label } of navLinks) {
      await expect(nav.getByRole("link", { name: label })).toBeVisible();
    }

    await page.keyboard.press("Escape");
    await expect(nav).toBeHidden();
    await expect(
      page.getByRole("button", { name: /open menu/i }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  test("header leaves booking to the sticky bar and fits the wordmark", async ({
    page,
  }) => {
    await page.goto("/");
    const header = page.getByRole("banner");
    await expect(header.getByRole("link", { name: /book now/i })).toHaveCount(0);

    const wordmark = header.getByRole("link", { name: siteConfig.name });
    const { height, lineHeight } = await wordmark.evaluate((el) => ({
      height: el.getBoundingClientRect().height,
      lineHeight: parseFloat(getComputedStyle(el).lineHeight),
    }));
    expect(height, "wordmark wraps").toBeLessThanOrEqual(lineHeight + 1);
  });

  test("navigating closes the menu", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /open menu/i }).click();
    await page
      .getByRole("navigation", { name: "Mobile" })
      .getByRole("link", { name: "Services" })
      .click();
    await expect(page).toHaveURL(/\/services$/);
    await expect(page.getByRole("navigation", { name: "Mobile" })).toBeHidden();
  });
});

test.describe("paid video", () => {
  // The suite runs without Stripe/Cloudflare/Resend keys.
  test("without configuration, /video shows no player", async ({ page }) => {
    await page.goto("/video");
    await expect(page.getByText(/isn.t set up yet/)).toBeVisible();
    await expect(page.locator("iframe")).toHaveCount(0);
  });

  test("unlock endpoint never grants access without a valid purchase", async ({
    page,
    context,
  }) => {
    for (const query of ["?session_id=cs_test_fake", "?t=forged.token", ""]) {
      await page.goto(`/video/unlock${query}`);
      await expect(page).toHaveURL(/\/video(\?.*)?$/);
    }
    const cookies = await context.cookies();
    expect(cookies.find((c) => c.name === "video_access")).toBeUndefined();
    await expect(page.locator("iframe")).toHaveCount(0);
  });

  test("webhook rejects unsigned requests", async ({ request }) => {
    const response = await request.post("/api/stripe/webhook", { data: "{}" });
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });
});

test("robots.txt keeps private endpoints out of search", async ({ request }) => {
  const body = await (await request.get("/robots.txt")).text();
  expect(body).toContain("Disallow: /api/");
  expect(body).toContain("Disallow: /video/unlock");
});

test("SEO basics on every page", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    await expect(page, route).toHaveTitle(/Spray Tan By Jenna/);
    await expect(page.locator("meta[name='description']")).toHaveAttribute(
      "content",
      /.{50,}/,
    );
    await expect(page.locator("link[rel='canonical']")).toHaveCount(1);
    await expect(page.locator("meta[property='og:title']")).toHaveCount(1);
    await expect(page.locator("meta[property='og:image']")).toHaveCount(1);
    await expect(
      page.locator("script[type='application/ld+json']"),
    ).toHaveCount(1);
  }
});
