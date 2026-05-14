import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Automated accessibility scan with axe-core under WCAG 2.1 A + AA.
 * Surfaces non-critical violations on stdout and fails only on
 * `impact === "critical"`.
 */

const PAGES = [
  { path: "/en", label: "homepage" },
  { path: "/en/atlas", label: "atlas-index" },
  { path: "/en/atlas/ifg_left", label: "atlas-region" },
  { path: "/en/bridges", label: "bridges" },
  { path: "/en/tours", label: "tours" },
  { path: "/en/about", label: "about" },
] as const;

for (const { path, label } of PAGES) {
  test(`a11y: ${label} (${path})`, async ({ page }, testInfo) => {
    await page.goto(path);
    await page.waitForLoadState("domcontentloaded");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      // color-contrast: tuned in the brand palette; needs designer
      // sign-off before flipping to error.
      .disableRules(["color-contrast"])
      .analyze();

    await testInfo.attach(`axe-${label}.json`, {
      body: JSON.stringify(results, null, 2),
      contentType: "application/json",
    });

    if (results.violations.length > 0) {
      console.log(
        `\n[${label}] ${results.violations.length} a11y violation(s):`,
      );
      for (const v of results.violations) {
        console.log(
          `  - [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} node${v.nodes.length === 1 ? "" : "s"})`,
        );
      }
    }

    const criticals = results.violations.filter(
      (v) => v.impact === "critical",
    );
    expect(
      criticals,
      `${label}: ${criticals.length} critical a11y violation(s) ` +
        criticals.map((v) => `[${v.id}]`).join(" "),
    ).toEqual([]);
  });
}
