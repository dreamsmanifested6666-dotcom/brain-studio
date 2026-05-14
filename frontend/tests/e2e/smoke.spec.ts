import { test, expect } from "@playwright/test";

/**
 * Smoke tests — verify the critical surfaces of the site load and
 * render their canonical content in each locale.
 *
 * Note: these tests run against POST-HYDRATION DOM (page.locator, not
 * just response body). That's a deliberate upgrade after a regression
 * where SSR rendered fine but client hydration crashed (SearchPalette
 * was mounted outside NextIntlClientProvider). curl + SSR-only tests
 * missed the bug; post-hydration assertions catch it.
 */

const LOCALES = ["en", "es", "ca", "th", "ja", "zh-CN"] as const;

test.describe("infrastructure", () => {
  test("root redirects to /en", async ({ page }) => {
    const response = await page.goto("/");
    expect(page.url()).toMatch(/\/en\/?$/);
    expect(response?.ok()).toBeTruthy();
  });

  test("sitemap.xml is served", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    expect(body).toContain("<urlset");
    expect(body).toContain("hreflang");
    for (const loc of LOCALES) {
      expect(body).toContain(`/${loc}`);
    }
  });

  test("robots.txt is served and points at sitemap", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    expect(body).toMatch(/User-Agent: \*/i);
    expect(body).toContain("Sitemap:");
    expect(body).toContain("/sitemap.xml");
  });

  test("security headers present", async ({ request }) => {
    const res = await request.get("/en");
    expect(res.ok()).toBeTruthy();
    const headers = res.headers();
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["permissions-policy"]).toContain("camera=()");
  });

  test("hreflang Link header lists all locales", async ({ request }) => {
    const res = await request.get("/en");
    const link = res.headers()["link"] ?? "";
    for (const loc of LOCALES) {
      expect(link).toContain(`hreflang="${loc}"`);
    }
    expect(link).toContain('hreflang="x-default"');
  });
});

test.describe("per-locale homepage — post-hydration", () => {
  for (const locale of LOCALES) {
    test(`/${locale} renders without falling into the global-error UI`, async ({
      page,
    }) => {
      const response = await page.goto(`/${locale}`);
      expect(response?.ok()).toBeTruthy();
      await expect(page).toHaveTitle(/Brain Studio/i);
      // Post-hydration check: <main> survives + html.id is not error.
      // This is what catches the SearchPalette-style hydration crash
      // that the pre-fix suite missed.
      await expect(page.locator("main")).toBeVisible();
      const htmlId = await page.locator("html").getAttribute("id");
      expect(htmlId, "html should not have __next_error__").not.toBe(
        "__next_error__",
      );
    });
  }
});

test.describe("atlas", () => {
  for (const locale of LOCALES) {
    test(`/${locale}/atlas index renders`, async ({ page }) => {
      const response = await page.goto(`/${locale}/atlas`);
      expect(response?.ok()).toBeTruthy();
      await expect(page.locator("main")).toBeVisible();
      const ifgLink = page.locator(`a[href*="/${locale}/atlas/ifg_left"]`).first();
      await expect(ifgLink).toBeVisible();
    });

    test(`/${locale}/atlas/ifg_left region page renders`, async ({ page }) => {
      const response = await page.goto(`/${locale}/atlas/ifg_left`);
      expect(response?.ok()).toBeTruthy();
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator("article h2").first()).toBeVisible();
    });
  }
});

test.describe("locale-specific scripts", () => {
  const SCRIPT_PROBES: Record<string, RegExp> = {
    en: /Broca's region/,
    es: /Región de Broca|área de Broca/,
    ca: /regió de Broca|àrea de Broca/i,
    th: /[฀-๿]/,
    ja: /[぀-ゟ゠-ヿ一-鿿]/,
    "zh-CN": /[一-鿿]/,
  };

  for (const [locale, probe] of Object.entries(SCRIPT_PROBES)) {
    test(`/${locale}/atlas/ifg_left body uses expected script`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/atlas/ifg_left`);
      const articleText =
        (await page.locator("article").first().textContent()) ?? "";
      expect(articleText).toMatch(probe);
    });
  }
});
