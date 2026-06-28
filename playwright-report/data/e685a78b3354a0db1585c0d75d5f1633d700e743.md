# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> Smoke tests - critical routes >> should have no accessibility violations on /process
- Location: e2e\smoke.spec.ts:47:9

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 39

- Array []
+ Array [
+   Object {
+     "description": "Ensure all page content is contained by landmarks",
+     "help": "All page content should be contained by landmarks",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.12/region?application=playwright",
+     "id": "region",
+     "impact": "moderate",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<div aria-hidden=\"false\" class=\"pointer-events-none fixed inset-0 z-[90] flex items-end justify-between bg-ink-950 px-6 pb-10 pt-12 transition-[transform,opacity] duration-1000 ease-out md:px-10 translate-y-0 opacity-100\">",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".z-\\[90\\]",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.keyboard",
+       "best-practice",
+       "RGAAv4",
+       "RGAA-9.2.1",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "↓ Skip to content" [ref=e2]:
    - /url: "#main-content"
  - generic:
    - generic:
      - paragraph: ◌ Folio MMXXVII
      - paragraph: Loading folio
    - generic:
      - paragraph: "100"
  - button:
    - generic: Reel · 02:17
  - button "Scroll to top":
    - img
  - generic [ref=e3]:
    - generic [ref=e4]: ◊
    - generic [ref=e5]:
      - paragraph [ref=e6]: New here?
      - paragraph [ref=e7]: Press / or ⌘K to fly. Try ? for the full keyboard map.
    - button "Dismiss nudge" [ref=e8]: ×
  - 'button "Atmosphere: Aura · warm peach · press T to cycle, Shift-click to share link" [ref=e10]':
    - generic [ref=e14]: AURA
  - banner:
    - navigation "Primary" [ref=e15]:
      - link "Delowar Hossain — home" [ref=e16]:
        - /url: /
        - generic [ref=e17]: Delowar Hossain
        - generic [ref=e18]: ◊ MMXXVII
      - list [ref=e19]:
        - listitem [ref=e20]:
          - link "Index" [ref=e21]:
            - /url: /
            - generic [ref=e22]: Index
        - listitem [ref=e23]:
          - link "Works" [ref=e24]:
            - /url: /works
            - generic [ref=e25]: Works
        - listitem [ref=e26]:
          - link "Lab" [ref=e27]:
            - /url: /lab
            - generic [ref=e28]: Lab
        - listitem [ref=e29]:
          - link "About" [ref=e30]:
            - /url: /about
            - generic [ref=e31]: About
        - listitem [ref=e32]:
          - link "Resume" [ref=e33]:
            - /url: /resume
            - generic [ref=e34]: Resume
        - listitem [ref=e35]:
          - link "Journal" [ref=e36]:
            - /url: /journal
            - generic [ref=e37]: Journal
        - listitem [ref=e38]:
          - link "Services" [ref=e39]:
            - /url: /services
            - generic [ref=e40]: Services
        - listitem [ref=e41]:
          - link "Contact" [ref=e42]:
            - /url: /contact
            - generic [ref=e43]: Contact
      - generic [ref=e44]:
        - button "Sound effects off — press S to toggle" [ref=e45]:
          - generic [ref=e46]: ·
          - generic [ref=e47]: Mute
        - button "Open command palette (Cmd+K)" [ref=e48]: ⌘K
        - link "Start a Project" [ref=e49]:
          - /url: /contact
  - main [ref=e51]:
    - generic [ref=e54]:
      - paragraph [ref=e55]: §04 — How I work
      - heading "The Process." [level=1] [ref=e56]:
        - generic [ref=e59]: The
        - generic [ref=e63]: Process.
      - generic [ref=e64]:
        - paragraph [ref=e65]: Four phases, calibrated for ambitious creative briefs. Each one earns the right to the next — no production code until the design system is settled.
        - list [ref=e66]:
          - listitem [ref=e67]:
            - paragraph [ref=e68]: Phases
            - paragraph [ref=e69]: "04"
          - listitem [ref=e70]:
            - paragraph [ref=e71]: Default duration
            - paragraph [ref=e72]: 6 — 9 weeks
          - listitem [ref=e73]:
            - paragraph [ref=e74]: Owners
            - paragraph [ref=e75]: Solo + cherry-picked partners
          - listitem [ref=e76]:
            - paragraph [ref=e77]: Output
            - paragraph [ref=e78]: Production code + handover
    - list [ref=e81]:
      - listitem [ref=e82]:
        - text: "01"
        - paragraph [ref=e83]: LISTEN
      - listitem [ref=e84]:
        - text: "02"
        - paragraph [ref=e85]: SKETCH
      - listitem [ref=e86]:
        - text: "03"
        - paragraph [ref=e87]: BUILD
      - listitem [ref=e88]:
        - text: "04"
        - paragraph [ref=e89]: SHIP
    - generic [ref=e92]:
      - generic [ref=e93]:
        - generic [ref=e94]: "01"
        - paragraph [ref=e95]: Phase I · LISTEN
      - generic [ref=e96]:
        - heading "Discovery" [level=2] [ref=e98]
        - paragraph [ref=e99]: Understand narrative constraints. Map the audience, the systems, and the technical envelope before a single pixel.
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Inputs
            - generic [ref=e103]: Brief · references · constraints
          - listitem [ref=e104]:
            - generic [ref=e105]: Output
            - generic [ref=e106]: Concept doc · moodboard · plan
          - listitem [ref=e107]:
            - generic [ref=e108]: Tools
            - generic [ref=e109]: Figma · Are.na · iA Writer
          - listitem [ref=e110]:
            - generic [ref=e111]: Days
            - generic [ref=e112]: 5 — 8 working days
    - generic [ref=e115]:
      - generic [ref=e116]:
        - generic [ref=e117]: "02"
        - paragraph [ref=e118]: Phase II · SKETCH
      - generic [ref=e119]:
        - heading "Design" [level=2] [ref=e121]
        - paragraph [ref=e122]: Establish the visual grid, typography rules, and static art direction. Prototype the silence between elements.
        - list [ref=e123]:
          - listitem [ref=e124]:
            - generic [ref=e125]: Inputs
            - generic [ref=e126]: Tokens · grid · type system
          - listitem [ref=e127]:
            - generic [ref=e128]: Output
            - generic [ref=e129]: High-fidelity Figma · motion spec
          - listitem [ref=e130]:
            - generic [ref=e131]: Tools
            - generic [ref=e132]: Figma · Lottie · After Effects
          - listitem [ref=e133]:
            - generic [ref=e134]: Days
            - generic [ref=e135]: 10 — 14 working days
    - generic [ref=e138]:
      - generic [ref=e139]:
        - generic [ref=e140]: "03"
        - paragraph [ref=e141]: Phase III · BUILD
      - generic [ref=e142]:
        - heading "Prototype" [level=2] [ref=e144]
        - paragraph [ref=e145]: Draft core WebGL scenes, motion curves, and the choreography between page transitions and content systems.
        - list [ref=e146]:
          - listitem [ref=e147]:
            - generic [ref=e148]: Inputs
            - generic [ref=e149]: Visual system · interaction map
          - listitem [ref=e150]:
            - generic [ref=e151]: Output
            - generic [ref=e152]: Coded prototype · WebGL scenes
          - listitem [ref=e153]:
            - generic [ref=e154]: Tools
            - generic [ref=e155]: Next.js · Three.js · GSAP
          - listitem [ref=e156]:
            - generic [ref=e157]: Days
            - generic [ref=e158]: 10 — 12 working days
    - generic [ref=e161]:
      - generic [ref=e162]:
        - generic [ref=e163]: "04"
        - paragraph [ref=e164]: Phase IV · SHIP
      - generic [ref=e165]:
        - heading "Production" [level=2] [ref=e167]
        - paragraph [ref=e168]: Write custom GLSL shaders, build the engineering layer, ship with measurable performance and accessibility.
        - list [ref=e169]:
          - listitem [ref=e170]:
            - generic [ref=e171]: Inputs
            - generic [ref=e172]: Approved prototype · CMS plan
          - listitem [ref=e173]:
            - generic [ref=e174]: Output
            - generic [ref=e175]: Shipped site · Loom handover
          - listitem [ref=e176]:
            - generic [ref=e177]: Tools
            - generic [ref=e178]: Vercel · Cloudflare · Sanity
          - listitem [ref=e179]:
            - generic [ref=e180]: Days
            - generic [ref=e181]: 8 — 10 working days
    - generic [ref=e183]:
      - paragraph [ref=e184]: Like the process? Let's start the conversation.
      - generic [ref=e185]:
        - link "Brief me" [ref=e186]:
          - /url: /contact
          - text: Brief me
          - generic [ref=e187]: ↗
        - link "See tiers" [ref=e188]:
          - /url: /services
          - text: See tiers
          - generic [ref=e189]: ↗
  - contentinfo [ref=e191]:
    - region "Studio status" [ref=e192]:
      - generic [ref=e193]:
        - generic [ref=e194]:
          - generic [ref=e197]: 21:48 BD
          - generic [ref=e198]: ·
          - generic [ref=e199]: Joypurhat · BD
          - generic [ref=e200]: ·
          - generic [ref=e201]: 176 GH
          - generic [ref=e202]: ·
          - generic [ref=e203]: MMXXVII
          - generic [ref=e204]: ·
          - link "University of the People — B.Sc. Computer Science (in progress)" [ref=e205]:
            - /url: https://www.uopeople.edu/
            - text: B.Sc. CS · UoPeople
          - generic [ref=e206]: ·
          - generic "Time until MMXXVII (2027-01-01, Asia/Dhaka)" [ref=e207]:
            - text: → 186d 02h 11m
            - generic [ref=e208]: MMXXVII
        - link "Open from Q1 ’27 — booking through Q4 ’27" [ref=e209]:
          - /url: /contact
          - text: Open from Q1 ’27 — booking through Q4 ’27
          - generic [ref=e211]: ↗
    - generic [ref=e212]:
      - generic [ref=e213]:
        - generic [ref=e214]:
          - paragraph [ref=e215]: ◊ Open from Q1 ’27 — booking through Q4 ’27 · Selected projects
          - heading "Have an idea? Let's build it." [level=2] [ref=e216]:
            - generic [ref=e217]: Have an idea?
            - generic [ref=e218]: Let's build it.
          - generic [ref=e219]:
            - link "hello@delowarhossain.dev" [ref=e220]:
              - /url: /contact
              - text: hello@delowarhossain.dev
              - generic [ref=e221]: ↗
            - button "Copy email address to clipboard" [ref=e222]: ⎘
        - generic [ref=e223]:
          - generic [ref=e224]:
            - paragraph [ref=e225]: Pages
            - list [ref=e226]:
              - listitem [ref=e227]:
                - link "Index" [ref=e228]:
                  - /url: /
              - listitem [ref=e229]:
                - link "Works" [ref=e230]:
                  - /url: /works
              - listitem [ref=e231]:
                - link "Lab" [ref=e232]:
                  - /url: /lab
              - listitem [ref=e233]:
                - link "Process" [ref=e234]:
                  - /url: /process
              - listitem [ref=e235]:
                - link "About" [ref=e236]:
                  - /url: /about
              - listitem [ref=e237]:
                - link "Resume" [ref=e238]:
                  - /url: /resume
              - listitem [ref=e239]:
                - link "Journal" [ref=e240]:
                  - /url: /journal
              - listitem [ref=e241]:
                - link "Services" [ref=e242]:
                  - /url: /services
              - listitem [ref=e243]:
                - link "Uses" [ref=e244]:
                  - /url: /uses
              - listitem [ref=e245]:
                - link "Contact" [ref=e246]:
                  - /url: /contact
              - listitem [ref=e247]:
                - link "AI Summary" [ref=e248]:
                  - /url: /ai
          - generic [ref=e249]:
            - paragraph [ref=e250]: Connect
            - list [ref=e251]:
              - listitem [ref=e252]:
                - link "GITHUB" [ref=e253]:
                  - /url: https://github.com/mdhossain-2437
              - listitem [ref=e254]:
                - link "LINKEDIN" [ref=e255]:
                  - /url: https://www.linkedin.com/in/mdhossain2437
              - listitem [ref=e256]:
                - link "TWITTER" [ref=e257]:
                  - /url: https://twitter.com/mdhossain2437
              - listitem [ref=e258]:
                - link "INSTAGRAM" [ref=e259]:
                  - /url: https://www.instagram.com/mdhossain2437
              - listitem [ref=e260]:
                - link "FACEBOOK" [ref=e261]:
                  - /url: https://www.facebook.com/mdhossain2437
              - listitem [ref=e262]:
                - link "READ.CV" [ref=e263]:
                  - /url: https://read.cv/delowar
          - generic [ref=e264]:
            - paragraph [ref=e265]: Studio
            - list [ref=e266]:
              - listitem [ref=e267]:
                - link "Now" [ref=e268]:
                  - /url: /now
              - listitem [ref=e269]:
                - link "Uses" [ref=e270]:
                  - /url: /uses
              - listitem [ref=e271]:
                - link "Brand" [ref=e272]:
                  - /url: /brand
              - listitem [ref=e273]:
                - link "Colors" [ref=e274]:
                  - /url: /colors
              - listitem [ref=e275]:
                - link "Changelog" [ref=e276]:
                  - /url: /changelog
              - listitem [ref=e277]:
                - link "Showreel" [ref=e278]:
                  - /url: /showreel
              - listitem [ref=e279]:
                - link "Atlas" [ref=e280]:
                  - /url: /atlas
              - listitem [ref=e281]:
                - link "Recognition" [ref=e282]:
                  - /url: /awards
              - listitem [ref=e283]:
                - link "Achievements" [ref=e284]:
                  - /url: /achievements
              - listitem [ref=e285]:
                - link "Colophon" [ref=e286]:
                  - /url: /colophon
              - listitem [ref=e287]:
                - link "Privacy" [ref=e288]:
                  - /url: /legal/privacy
              - listitem [ref=e289]:
                - link "Terms" [ref=e290]:
                  - /url: /legal/terms
      - generic [ref=e291]:
        - generic [ref=e292]:
          - paragraph [ref=e293]: ◌ Signed
          - img "Delowar Hossain signature" [ref=e294]:
            - generic [ref=e296]: Delowar Hossain
        - paragraph [ref=e298]: handwritten in vector — strokes draw on view
      - generic [ref=e299]:
        - button "Quote of the day — click to copy" [ref=e301]:
          - generic [ref=e302]: ◊ Quote of the day · 206 / 365
          - generic [ref=e303]: “A particle system with art direction is weather.”
        - paragraph [ref=e304]:
          - text: ◌ A new quote rotates in at 00:00 UTC.
          - text: Click to copy. Three hundred sixty-five total.
      - generic [ref=e307]:
        - generic [ref=e308]:
          - generic [ref=e309]: DELOWAR HOSSAIN
          - generic [ref=e310]: •
        - generic [ref=e311]:
          - generic [ref=e312]: CREATIVE DEVELOPER
          - generic [ref=e313]: •
        - generic [ref=e314]:
          - generic [ref=e315]: UI / UX DESIGNER
          - generic [ref=e316]: •
        - generic [ref=e317]:
          - generic [ref=e318]: WEBGL · THREE.JS · GLSL
          - generic [ref=e319]: •
        - generic [ref=e320]:
          - generic [ref=e321]: OPEN FROM Q1 ’27 — BOOKING THROUGH Q4 ’27
          - generic [ref=e322]: •
        - generic [ref=e323]:
          - generic [ref=e324]: JOYPURHAT, BANGLADESH
          - generic [ref=e325]: •
        - generic [ref=e326]:
          - generic [ref=e327]: MMXXVII / 03.27
          - generic [ref=e328]: •
        - generic [ref=e329]:
          - generic [ref=e330]: DELOWAR HOSSAIN · MMXXVII
          - generic [ref=e331]: •
        - generic [ref=e332]:
          - generic [ref=e333]: DELOWAR HOSSAIN
          - generic [ref=e334]: •
        - generic [ref=e335]:
          - generic [ref=e336]: CREATIVE DEVELOPER
          - generic [ref=e337]: •
        - generic [ref=e338]:
          - generic [ref=e339]: UI / UX DESIGNER
          - generic [ref=e340]: •
        - generic [ref=e341]:
          - generic [ref=e342]: WEBGL · THREE.JS · GLSL
          - generic [ref=e343]: •
        - generic [ref=e344]:
          - generic [ref=e345]: OPEN FROM Q1 ’27 — BOOKING THROUGH Q4 ’27
          - generic [ref=e346]: •
        - generic [ref=e347]:
          - generic [ref=e348]: JOYPURHAT, BANGLADESH
          - generic [ref=e349]: •
        - generic [ref=e350]:
          - generic [ref=e351]: MMXXVII / 03.27
          - generic [ref=e352]: •
        - generic [ref=e353]:
          - generic [ref=e354]: DELOWAR HOSSAIN · MMXXVII
          - generic [ref=e355]: •
      - generic [ref=e356]:
        - paragraph [ref=e357]:
          - text: © 2027
          - button "Studio mark" [ref=e358]: The Compiled Thought
          - text: . All rights reserved · MMXXVII.
        - paragraph [ref=e359]:
          - text: Lat. 25.10° N · Long. 89.02° E · Joypurhat, Bangladesh ·
          - generic [ref=e360]: 21:49:03
          - text: BST
        - generic [ref=e361]:
          - link "◇ local" [ref=e362]:
            - /url: https://github.com/mdhossain-2437/Creative-Folio
          - button "Toggle motion" [ref=e363]:
            - generic [ref=e366]: Motion On
          - generic [ref=e367]: v MMXXVII / 03.27
  - alert [ref=e368]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import AxeBuilder from "@axe-core/playwright";
  3  | 
  4  | // Test critical static routes first
  5  | const criticalRoutes = [
  6  |   "/",
  7  |   "/about",
  8  |   "/works",
  9  |   "/lab",
  10 |   "/process",
  11 |   "/resume",
  12 |   "/journal",
  13 |   "/services",
  14 |   "/uses",
  15 |   "/contact",
  16 |   "/ai",
  17 | ];
  18 | 
  19 | test.describe("Smoke tests - critical routes", () => {
  20 |   criticalRoutes.forEach((route) => {
  21 |     test(`should load ${route} without errors`, async ({ page }) => {
  22 |       test.setTimeout(60000);
  23 | 
  24 |       const errors: string[] = [];
  25 | 
  26 |       page.on("console", (msg) => {
  27 |         if (msg.type() === "error") {
  28 |           errors.push(msg.text());
  29 |         }
  30 |       });
  31 | 
  32 |       const response = await page.goto(route);
  33 |       expect(response?.status()).toBe(200);
  34 | 
  35 |       // Wait for DOM content loaded, not networkidle (faster)
  36 |       await page.waitForLoadState("domcontentloaded");
  37 | 
  38 |       // Assert no console errors
  39 |       expect(errors).toHaveLength(0);
  40 | 
  41 |       // Basic accessibility check - page should have a title
  42 |       const title = await page.title();
  43 |       expect(title).toBeTruthy();
  44 |       expect(title.length).toBeGreaterThan(0);
  45 |     });
  46 | 
  47 |     test(`should have no accessibility violations on ${route}`, async ({
  48 |       page,
  49 |     }) => {
  50 |       test.setTimeout(60000);
  51 | 
  52 |       await page.goto(route);
  53 |       await page.waitForLoadState("domcontentloaded");
  54 | 
  55 |       const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
> 56 |       expect(accessibilityScanResults.violations).toEqual([]);
     |                                                   ^ Error: expect(received).toEqual(expected) // deep equality
  57 |     });
  58 |   });
  59 | });
  60 | 
```