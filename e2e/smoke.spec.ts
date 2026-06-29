import { test, expect, type Page } from "@playwright/test";
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

const A11Y_STABLE_CSS = `
      *,
      *::before,
      *::after {
        animation-delay: 0s !important;
        animation-duration: 0.001s !important;
        transition-delay: 0s !important;
        transition-duration: 0.001s !important;
      }

      .reveal,
      .reveal.is-in,
      .mask-reveal,
      .mask-reveal.is-in {
        opacity: 1 !important;
        transform: none !important;
        filter: none !important;
      }
    `;

async function prepareStaticA11yScan(page: Page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript((css) => {
    const inject = () => {
      if (document.getElementById("a11y-static-scan-style")) return;
      const style = document.createElement("style");
      style.id = "a11y-static-scan-style";
      style.textContent = css;
      (document.head ?? document.documentElement).appendChild(style);
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", inject, { once: true });
      return;
    }

    inject();
  }, A11Y_STABLE_CSS);
}

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
      await prepareStaticA11yScan(page);

      await page.goto(route, { waitUntil: "domcontentloaded" });

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      const blockingViolations = accessibilityScanResults.violations.filter(
        (violation) =>
          violation.impact === "serious" || violation.impact === "critical",
      );
      expect(blockingViolations).toEqual([]);
    });
  });
});
