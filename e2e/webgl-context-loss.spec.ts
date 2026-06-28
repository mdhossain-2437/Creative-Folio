import { test, expect } from "@playwright/test";

test.describe("WebGL context-loss handling", () => {
  test("should handle WebGL context loss on homepage without crashing", async ({
    page,
  }) => {
    test.setTimeout(60000);

    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Trigger WebGL context loss via page script
    const contextLost = await page.evaluate(() => {
      // Try to find and lose WebGL contexts
      const canvas = document.querySelector("canvas");
      if (!canvas) return "no-canvas";

      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) return "no-webgl-context";

      const ext = gl.getExtension("WEBGL_lose_context");
      if (!ext) return "no-lose-context-extension";

      ext.loseContext();
      return "context-lost-triggered";
    });

    // Wait a moment for any error handlers to run
    await page.waitForTimeout(1000);

    // Page should still be responsive
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);

    // No console errors should be thrown
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    // Navigate to another section to test recovery
    await page.goto("/works");
    await page.waitForLoadState("domcontentloaded");

    expect(errors).toHaveLength(0);
  });

  test("should handle WebGL context loss on lab page without crashing", async ({
    page,
  }) => {
    test.setTimeout(60000);

    await page.goto("/lab");
    await page.waitForLoadState("domcontentloaded");

    // Trigger WebGL context loss via page script
    const contextLost = await page.evaluate(() => {
      const canvases = document.querySelectorAll("canvas");
      let lostCount = 0;

      canvases.forEach((canvas) => {
        const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
        if (gl) {
          const ext = gl.getExtension("WEBGL_lose_context");
          if (ext) {
            ext.loseContext();
            lostCount++;
          }
        }
      });

      return lostCount > 0 ? `${lostCount}-contexts-lost` : "no-contexts-lost";
    });

    // Wait a moment for any error handlers to run
    await page.waitForTimeout(1000);

    // Page should still be responsive
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);

    // No console errors should be thrown
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    // Navigate to home to test recovery
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    expect(errors).toHaveLength(0);
  });
});
