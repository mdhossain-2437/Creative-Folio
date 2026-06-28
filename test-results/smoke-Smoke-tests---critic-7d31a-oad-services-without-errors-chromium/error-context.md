# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> Smoke tests - critical routes >> should load /services without errors
- Location: e2e\smoke.spec.ts:22:9

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/services
Call log:
  - navigating to "http://localhost:3000/services", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | // Test critical static routes first
  4  | const criticalRoutes = [
  5  |   "/",
  6  |   "/about",
  7  |   "/works",
  8  |   "/lab",
  9  |   "/process",
  10 |   "/resume",
  11 |   "/journal",
  12 |   "/services",
  13 |   "/uses",
  14 |   "/contact",
  15 |   "/ai",
  16 | ];
  17 | 
  18 | test.describe("Smoke tests - critical routes", () => {
  19 |   test.use({ timeout: 60000 });
  20 | 
  21 |   criticalRoutes.forEach((route) => {
  22 |     test(`should load ${route} without errors`, async ({ page }) => {
  23 |       const errors: string[] = [];
  24 | 
  25 |       page.on("console", (msg) => {
  26 |         if (msg.type() === "error") {
  27 |           errors.push(msg.text());
  28 |         }
  29 |       });
  30 | 
> 31 |       const response = await page.goto(route);
     |                                   ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/services
  32 |       expect(response?.status()).toBe(200);
  33 | 
  34 |       // Wait for DOM content loaded, not networkidle (faster)
  35 |       await page.waitForLoadState("domcontentloaded");
  36 | 
  37 |       // Assert no console errors
  38 |       expect(errors).toHaveLength(0);
  39 | 
  40 |       // Basic accessibility check - page should have a title
  41 |       const title = await page.title();
  42 |       expect(title).toBeTruthy();
  43 |       expect(title.length).toBeGreaterThan(0);
  44 |     });
  45 |   });
  46 | });
  47 | 
```