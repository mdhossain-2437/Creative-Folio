import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  outputDir: ".playwright-results",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "html" : "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  webServer: {
    command: "pnpm start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
    env: {
      ...process.env,
      CONTACT_ROUTE_TEST_MODE: "1",
      RESEND_API_KEY: process.env.RESEND_API_KEY ?? "re_test_mock",
      CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL ?? "studio@example.com",
      CONTACT_FROM_EMAIL:
        process.env.CONTACT_FROM_EMAIL ?? "Delowar Studio <contact@example.com>",
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // Firefox and WebKit disabled due to graphics issues on this system
    // Re-enable in CI where hardware is more stable
  ],
});
