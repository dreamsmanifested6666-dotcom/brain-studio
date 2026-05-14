import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config — smoke + a11y suite.
 *
 * Tests run against the live production deployment by default
 * (BASE_URL env var, falling back to brain-studio-kappa.vercel.app).
 *
 * To run against a local server (e.g. claude-preview on :3002):
 *   BASE_URL=http://localhost:3002 pnpm test:e2e
 */
const BASE_URL =
  process.env.BASE_URL ?? "https://brain-studio-kappa.vercel.app";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // Default retry once even locally — Vercel edge cold-starts produce
  // flaky first-run failures on cold paths.
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
