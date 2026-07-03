import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Test critical static routes first
const criticalRoutes = [
  "/",
  "/about",
  "/works",
  "/lab",
  "/lab/particle-systems",
  "/process",
  "/resume",
  "/journal",
  "/services",
  "/uses",
  "/contact",
  "/ai",
  "/showreel",
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

      // The root route covers shared chrome/footer once. Other routes scan the
      // page-specific surface so the suite does not repeatedly traverse the
      // same global marquee/signature/footer DOM on every route.
      const axe = new AxeBuilder({ page });
      axe.exclude('[data-a11y-decorative="true"]');
      if (route !== "/") {
        axe.include("#main-content");
      }

      const accessibilityScanResults = await axe.analyze();
      const blockingViolations = accessibilityScanResults.violations.filter(
        (violation) =>
          violation.impact === "serious" || violation.impact === "critical",
      );
      expect(blockingViolations).toEqual([]);
    });
  });

  test("should resolve the particle systems runtime metric", async ({
    page,
  }) => {
    test.setTimeout(60000);
    await page.emulateMedia({ reducedMotion: "reduce" });

    await page.goto("/lab/particle-systems", { waitUntil: "domcontentloaded" });

    const metric = page.locator("[data-lab-runtime-metric]").first();

    await expect(metric).toHaveAttribute("data-renderer", "Canvas2D");
    await expect(metric).toHaveAttribute(
      "data-device-tier",
      /^(low|mid|high)$/,
    );
    await expect(metric).toContainText("Canvas2D");

    const count = Number(await metric.getAttribute("data-particle-count"));
    expect([1100, 1600, 2200]).toContain(count);
  });

  test("should defer compact lab demo chunks until the grid needs them", async ({
    page,
  }) => {
    test.setTimeout(60000);
    await page.emulateMedia({ reducedMotion: "reduce" });

    await page.goto("/lab", { waitUntil: "domcontentloaded" });

    const shells = page.locator("[data-lab-demo-shell]");
    await expect(shells.first()).toBeAttached();

    const deferredCount = await page
      .locator('[data-lab-demo-armed="false"]')
      .count();
    expect(deferredCount).toBeGreaterThan(0);

    await page.goto("/lab/particle-systems", {
      waitUntil: "domcontentloaded",
    });

    await expect(
      page.locator('[data-lab-demo-shell="particle-systems"]').first(),
    ).toHaveAttribute("data-lab-demo-armed", "true");
  });

  test("should keep the showreel static fallback complete without R3F", async ({
    page,
  }) => {
    test.setTimeout(60000);
    await page.emulateMedia({ reducedMotion: "reduce" });

    await page.goto("/showreel", { waitUntil: "domcontentloaded" });

    await expect(
      page.locator('section[aria-label="3D chapter carousel"]'),
    ).toHaveCount(0);
    await expect(page.locator("[data-showreel-static-list] > li")).toHaveCount(
      4,
    );
    await expect(page.locator("[data-showreel-static-cover] img")).toHaveCount(
      4,
    );
  });
});
