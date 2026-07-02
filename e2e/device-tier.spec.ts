import { expect, test } from "@playwright/test";

declare global {
  interface Window {
    __creativeFolioDeviceProfileChanges?: number;
  }
}

test.describe("device-tier GPU probe", () => {
  test("downgrades after a slow GPU timing probe and emits a profile-change event", async ({
    page,
  }) => {
    test.setTimeout(60000);

    await page.addInitScript(() => {
      Object.defineProperty(Navigator.prototype, "deviceMemory", {
        configurable: true,
        get: () => 2,
      });
      Object.defineProperty(Navigator.prototype, "hardwareConcurrency", {
        configurable: true,
        get: () => 2,
      });

      window.__creativeFolioDeviceProfileChanges = 0;
      window.addEventListener("creative-folio:device-profile-change", () => {
        window.__creativeFolioDeviceProfileChanges =
          (window.__creativeFolioDeviceProfileChanges ?? 0) + 1;
      });

      const debugRendererInfo = {
        UNMASKED_VENDOR_WEBGL: 0x9245,
        UNMASKED_RENDERER_WEBGL: 0x9246,
      };
      const renderer = "NVIDIA GeForce RTX 4090";
      const vendor = "NVIDIA Corporation";

      type WebGlLike = {
        RENDERER: number;
        VENDOR: number;
        getExtension(name: string): unknown;
        getParameter(parameter: number): unknown;
        finish(): void;
      };
      type WebGlCtor = { prototype: WebGlLike };

      const patchWebGL = (ctor: WebGlCtor | undefined) => {
        if (!ctor) return;

        const { prototype } = ctor;
        const getExtension = prototype.getExtension;
        const getParameter = prototype.getParameter;
        const finish = prototype.finish;

        prototype.getExtension = function (
          this: WebGlLike,
          name: string,
        ) {
          if (name === "WEBGL_debug_renderer_info") return debugRendererInfo;
          return getExtension.call(this, name);
        };

        prototype.getParameter = function (
          this: WebGlLike,
          parameter: number,
        ) {
          if (parameter === debugRendererInfo.UNMASKED_RENDERER_WEBGL) {
            return renderer;
          }
          if (parameter === debugRendererInfo.UNMASKED_VENDOR_WEBGL) {
            return vendor;
          }
          if (parameter === this.RENDERER) return renderer;
          if (parameter === this.VENDOR) return vendor;
          return getParameter.call(this, parameter);
        };

        prototype.finish = function (this: WebGlLike) {
          const start = performance.now();
          while (performance.now() - start < 32) {
            // Busy-wait in this isolated test page to emulate a slow GPU fence.
          }
          return finish.call(this);
        };
      };

      patchWebGL(window.WebGLRenderingContext);
      patchWebGL(window.WebGL2RenderingContext);
    });

    await page.goto("/lab/particle-systems", { waitUntil: "domcontentloaded" });

    const metric = page.locator("[data-lab-runtime-metric]").first();

    await expect(metric).toHaveAttribute("data-device-tier", "low");
    await expect(metric).toHaveAttribute("data-gpu-renderer-signal", "capable");
    await expect(metric).toHaveAttribute("data-gpu-renderer-adjustment", "1");
    await expect(metric).toHaveAttribute("data-gpu-timing-adjustment", "-2");
    await expect(metric).toHaveAttribute("data-gpu-timing-status", "measured");

    const profileChangeCount = await page.evaluate(
      () => window.__creativeFolioDeviceProfileChanges ?? 0,
    );
    expect(profileChangeCount).toBeGreaterThanOrEqual(1);
  });
});
