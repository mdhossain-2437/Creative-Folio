import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

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
  test.describe.configure({ mode: "serial" });

  criticalRoutes.forEach((route) => {
    test(`should load ${route} without errors`, async ({ page }) => {
      test.setTimeout(60000);
      await page.emulateMedia({ reducedMotion: "reduce" });

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

    test(`should have no accessibility violations on ${route}`, async ({
      page,
    }) => {
      test.setTimeout(120000);
      await page.emulateMedia({ reducedMotion: "reduce" });

      await page.goto(route);
      await page.waitForLoadState("domcontentloaded");

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      const blockingViolations = accessibilityScanResults.violations.filter(
        (violation) =>
          violation.impact === "serious" || violation.impact === "critical",
      );
      expect(blockingViolations).toEqual([]);
    });
  });
});
