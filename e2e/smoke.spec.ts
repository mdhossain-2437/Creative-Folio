import { test, expect } from "@playwright/test";

// Test critical static routes first
const criticalRoutes = [
  "/",
  "/about",
  "/works",
  "/lab",
  "/process",
  "/resume",
  "/journal",
  "/services",
  "/uses",
  "/contact",
  "/ai",
];

test.describe("Smoke tests - critical routes", () => {
  test.use({ timeout: 60000 });

  criticalRoutes.forEach((route) => {
    test(`should load ${route} without errors`, async ({ page }) => {
      const errors: string[] = [];

      page.on("console", (msg) => {
        if (msg.type() === "error") {
          errors.push(msg.text());
        }
      });

      const response = await page.goto(route);
      expect(response?.status()).toBe(200);

      // Wait for DOM content loaded, not networkidle (faster)
      await page.waitForLoadState("domcontentloaded");

      // Assert no console errors
      expect(errors).toHaveLength(0);

      // Basic accessibility check - page should have a title
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);
    });
  });
});
