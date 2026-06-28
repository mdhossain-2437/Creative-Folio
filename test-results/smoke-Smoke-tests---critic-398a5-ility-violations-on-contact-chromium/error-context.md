# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> Smoke tests - critical routes >> should have no accessibility violations on /contact
- Location: e2e\smoke.spec.ts:47:9

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -   1
+ Received  + 145

- Array []
+ Array [
+   Object {
+     "description": "Ensure <li> elements are used semantically",
+     "help": "<li> elements must be contained in a <ul> or <ol>",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.12/listitem?application=playwright",
+     "id": "listitem",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "messageKey": "roleNotValid",
+             },
+             "id": "listitem",
+             "impact": "serious",
+             "message": "List item parent element has a role that is not role=\"list\"",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   List item parent element has a role that is not role=\"list\"",
+         "html": "<li>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "ul[role=\"radiogroup\"] > li:nth-child(1)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "messageKey": "roleNotValid",
+             },
+             "id": "listitem",
+             "impact": "serious",
+             "message": "List item parent element has a role that is not role=\"list\"",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   List item parent element has a role that is not role=\"list\"",
+         "html": "<li>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "ul[role=\"radiogroup\"] > li:nth-child(2)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "messageKey": "roleNotValid",
+             },
+             "id": "listitem",
+             "impact": "serious",
+             "message": "List item parent element has a role that is not role=\"list\"",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   List item parent element has a role that is not role=\"list\"",
+         "html": "<li>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "ul[role=\"radiogroup\"] > li:nth-child(3)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "messageKey": "roleNotValid",
+             },
+             "id": "listitem",
+             "impact": "serious",
+             "message": "List item parent element has a role that is not role=\"list\"",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   List item parent element has a role that is not role=\"list\"",
+         "html": "<li>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "ul[role=\"radiogroup\"] > li:nth-child(4)",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.structure",
+       "wcag2a",
+       "wcag131",
+       "EN-301-549",
+       "EN-9.1.3.1",
+       "RGAAv4",
+       "RGAA-9.3.1",
+     ],
+   },
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
      - generic [ref=e45]:
        - button "Sound effects off — press S to toggle" [ref=e46]:
          - generic [ref=e47]: ·
          - generic [ref=e48]: Mute
        - button "Open command palette (Cmd+K)" [ref=e49]: ⌘K
        - link "Start a Project" [ref=e50]:
          - /url: /contact
  - main [ref=e52]:
    - generic [ref=e55]:
      - paragraph [ref=e56]: § Contact & Colophon
      - heading "Start a Project." [level=1] [ref=e57]:
        - generic [ref=e58]:
          - generic [ref=e60]: Start
          - generic [ref=e62]: a
        - generic [ref=e66]: Project.
      - generic [ref=e67]:
        - paragraph [ref=e68]: The fastest way is the form below — or write directly. I read everything and reply within 48 hours, weekdays.
        - list [ref=e69]:
          - listitem [ref=e70]:
            - paragraph [ref=e71]: Email
            - paragraph [ref=e72]: hello@delowarhossain.dev
          - listitem [ref=e73]:
            - paragraph [ref=e74]: Booking
            - paragraph [ref=e75]: Q1 — Q4 / 2027
          - listitem [ref=e76]:
            - paragraph [ref=e77]: Time zone
            - paragraph [ref=e78]: GMT+6
          - listitem [ref=e79]:
            - paragraph [ref=e80]: Location
            - paragraph [ref=e81]: Joypurhat, Bangladesh
    - generic [ref=e83]:
      - generic [ref=e84]:
        - paragraph [ref=e85]: ◊ §01 — Direct Inquiry
        - link "hello@delowarhossain.dev" [ref=e86]:
          - /url: mailto:hello@delowarhossain.dev
          - generic [ref=e87]: ↗
          - generic [ref=e88]: hello@delowarhossain.dev
        - paragraph [ref=e89]: Briefs, retainers, collaborations — or just a hello. I read every line and reply within 48 hours, weekdays.
        - generic [ref=e90]:
          - generic [ref=e91]:
            - term [ref=e92]: Location
            - definition [ref=e93]: Panchbibi, Joypurhat, Bangladesh
          - generic [ref=e94]:
            - term [ref=e95]: Studio
            - definition [ref=e96]: The Compiled Thought
          - generic [ref=e97]:
            - term [ref=e98]: Hours
            - definition [ref=e99]: Mon — Fri · 09:00 → 18:00
          - generic [ref=e100]:
            - term [ref=e101]: Time zone
            - definition [ref=e102]: GMT+6
          - generic [ref=e103]:
            - term [ref=e104]: Booking
            - definition [ref=e105]: Open · Q1 — Q4 / 2027
          - generic [ref=e106]:
            - term [ref=e107]: Reply
            - definition [ref=e108]: ≤ 48 hours, weekdays
      - generic [ref=e109]:
        - paragraph [ref=e110]: ◊ §02 — The Brief
        - generic [ref=e112]:
          - generic [ref=e113]:
            - generic [ref=e114]:
              - generic [ref=e115]: Your name*
              - textbox "Your name" [ref=e116]:
                - /placeholder: Delowar Hossain
            - generic [ref=e117]:
              - generic [ref=e118]: Email address*
              - textbox "Email address" [ref=e119]:
                - /placeholder: hello@studio.com
            - generic [ref=e120]:
              - text: Company / Studio
              - textbox "Company / Studio" [ref=e121]:
                - /placeholder: The Compiled Thought
            - generic [ref=e122]:
              - text: Project URL or brief
              - textbox "Project URL or brief" [ref=e123]:
                - /placeholder: https://…
          - group "◊ What do you need" [ref=e124]:
            - generic [ref=e125]: ◊ What do you need
            - list [ref=e126]:
              - listitem [ref=e127]:
                - button "Web Design" [ref=e128]
              - listitem [ref=e129]:
                - button "UI/UX" [ref=e130]
              - listitem [ref=e131]:
                - button "Logo & Branding" [ref=e132]
              - listitem [ref=e133]:
                - button "Webflow" [ref=e134]
              - listitem [ref=e135]:
                - button "Framer" [ref=e136]
              - listitem [ref=e137]:
                - button "WebGL" [ref=e138]
              - listitem [ref=e139]:
                - button "AI Integration" [ref=e140]
              - listitem [ref=e141]:
                - button "Other" [ref=e142]
          - group "◊ Budget range" [ref=e143]:
            - generic [ref=e144]: ◊ Budget range
            - radiogroup "Budget range" [ref=e145]:
              - listitem [ref=e146]:
                - radio "< $5k" [ref=e147]
              - listitem [ref=e148]:
                - radio "$5k — $15k" [checked] [ref=e149]
              - listitem [ref=e150]:
                - radio "$15k — $30k" [ref=e151]
              - listitem [ref=e152]:
                - radio "$30k+" [ref=e153]
          - generic [ref=e154]:
            - generic [ref=e155]: ◊ Project details
            - textbox "◊ Project details" [ref=e156]:
              - /placeholder: Tell me what you’re building, the audience, the vibe, the rough timeline…
            - paragraph [ref=e157]: 0 / 2000
          - generic [ref=e158]:
            - paragraph [ref=e159]:
              - text: By sending you agree to our minimal
              - link "privacy policy" [ref=e160]:
                - /url: /legal/privacy
              - text: .
            - button "Send Inquiry" [ref=e162]
    - generic [ref=e164]:
      - generic [ref=e165]:
        - paragraph [ref=e166]: ◊ §03 — Elsewhere
        - paragraph [ref=e167]: Quieter rooms — process notes, reels, and code.
      - list [ref=e169]:
        - listitem [ref=e170]:
          - link "Open GITHUB in a new tab" [ref=e171]:
            - /url: https://github.com/mdhossain-2437
            - generic [ref=e172]: GITHUB
            - generic [ref=e173]: ↗
        - listitem [ref=e174]:
          - link "Open LINKEDIN in a new tab" [ref=e175]:
            - /url: https://www.linkedin.com/in/mdhossain2437
            - generic [ref=e176]: LINKEDIN
            - generic [ref=e177]: ↗
        - listitem [ref=e178]:
          - link "Open TWITTER in a new tab" [ref=e179]:
            - /url: https://twitter.com/mdhossain2437
            - generic [ref=e180]: TWITTER
            - generic [ref=e181]: ↗
        - listitem [ref=e182]:
          - link "Open INSTAGRAM in a new tab" [ref=e183]:
            - /url: https://www.instagram.com/mdhossain2437
            - generic [ref=e184]: INSTAGRAM
            - generic [ref=e185]: ↗
        - listitem [ref=e186]:
          - link "Open FACEBOOK in a new tab" [ref=e187]:
            - /url: https://www.facebook.com/mdhossain2437
            - generic [ref=e188]: FACEBOOK
            - generic [ref=e189]: ↗
        - listitem [ref=e190]:
          - link "Open READ.CV in a new tab" [ref=e191]:
            - /url: https://read.cv/delowar
            - generic [ref=e192]: READ.CV
            - generic [ref=e193]: ↗
    - generic [ref=e195]:
      - paragraph [ref=e197]: ◊ §04 — Colophon
      - generic [ref=e198]:
        - paragraph [ref=e199]: The architecture of this digital experience is built upon a modern, performance-driven stack. Designed in Figma, built with Next.js, Three.js, GSAP, Lenis and Framer Motion. Typeset in Newsreader, Inter and JetBrains Mono.
        - list [ref=e200]:
          - listitem [ref=e201]:
            - paragraph [ref=e202]: Next.js
            - paragraph [ref=e203]: Framework
          - listitem [ref=e204]:
            - paragraph [ref=e205]: GSAP
            - paragraph [ref=e206]: Animation
          - listitem [ref=e207]:
            - paragraph [ref=e208]: Three.js
            - paragraph [ref=e209]: WebGL
          - listitem [ref=e210]:
            - paragraph [ref=e211]: Lenis
            - paragraph [ref=e212]: Scroll
  - contentinfo [ref=e214]:
    - region "Studio status" [ref=e215]:
      - generic [ref=e216]:
        - generic [ref=e217]:
          - generic [ref=e220]: 21:49 BD
          - generic [ref=e221]: ·
          - generic [ref=e222]: Joypurhat · BD
          - generic [ref=e223]: ·
          - generic [ref=e224]: 176 GH
          - generic [ref=e225]: ·
          - generic [ref=e226]: MMXXVII
          - generic [ref=e227]: ·
          - link "University of the People — B.Sc. Computer Science (in progress)" [ref=e228]:
            - /url: https://www.uopeople.edu/
            - text: B.Sc. CS · UoPeople
          - generic [ref=e229]: ·
          - generic "Time until MMXXVII (2027-01-01, Asia/Dhaka)" [ref=e230]:
            - text: → 186d 02h 10m
            - generic [ref=e231]: MMXXVII
        - link "Open from Q1 ’27 — booking through Q4 ’27" [ref=e232]:
          - /url: /contact
          - text: Open from Q1 ’27 — booking through Q4 ’27
          - generic [ref=e234]: ↗
    - generic [ref=e235]:
      - generic [ref=e236]:
        - generic [ref=e237]:
          - paragraph [ref=e238]: ◊ Open from Q1 ’27 — booking through Q4 ’27 · Selected projects
          - heading "Have an idea? Let's build it." [level=2] [ref=e239]:
            - generic [ref=e240]: Have an idea?
            - generic [ref=e241]: Let's build it.
          - generic [ref=e242]:
            - link "hello@delowarhossain.dev" [ref=e243]:
              - /url: /contact
              - text: hello@delowarhossain.dev
              - generic [ref=e244]: ↗
            - button "Copy email address to clipboard" [ref=e245]: ⎘
        - generic [ref=e246]:
          - generic [ref=e247]:
            - paragraph [ref=e248]: Pages
            - list [ref=e249]:
              - listitem [ref=e250]:
                - link "Index" [ref=e251]:
                  - /url: /
              - listitem [ref=e252]:
                - link "Works" [ref=e253]:
                  - /url: /works
              - listitem [ref=e254]:
                - link "Lab" [ref=e255]:
                  - /url: /lab
              - listitem [ref=e256]:
                - link "Process" [ref=e257]:
                  - /url: /process
              - listitem [ref=e258]:
                - link "About" [ref=e259]:
                  - /url: /about
              - listitem [ref=e260]:
                - link "Resume" [ref=e261]:
                  - /url: /resume
              - listitem [ref=e262]:
                - link "Journal" [ref=e263]:
                  - /url: /journal
              - listitem [ref=e264]:
                - link "Services" [ref=e265]:
                  - /url: /services
              - listitem [ref=e266]:
                - link "Uses" [ref=e267]:
                  - /url: /uses
              - listitem [ref=e268]:
                - link "Contact" [ref=e269]:
                  - /url: /contact
              - listitem [ref=e270]:
                - link "AI Summary" [ref=e271]:
                  - /url: /ai
          - generic [ref=e272]:
            - paragraph [ref=e273]: Connect
            - list [ref=e274]:
              - listitem [ref=e275]:
                - link "GITHUB" [ref=e276]:
                  - /url: https://github.com/mdhossain-2437
              - listitem [ref=e277]:
                - link "LINKEDIN" [ref=e278]:
                  - /url: https://www.linkedin.com/in/mdhossain2437
              - listitem [ref=e279]:
                - link "TWITTER" [ref=e280]:
                  - /url: https://twitter.com/mdhossain2437
              - listitem [ref=e281]:
                - link "INSTAGRAM" [ref=e282]:
                  - /url: https://www.instagram.com/mdhossain2437
              - listitem [ref=e283]:
                - link "FACEBOOK" [ref=e284]:
                  - /url: https://www.facebook.com/mdhossain2437
              - listitem [ref=e285]:
                - link "READ.CV" [ref=e286]:
                  - /url: https://read.cv/delowar
          - generic [ref=e287]:
            - paragraph [ref=e288]: Studio
            - list [ref=e289]:
              - listitem [ref=e290]:
                - link "Now" [ref=e291]:
                  - /url: /now
              - listitem [ref=e292]:
                - link "Uses" [ref=e293]:
                  - /url: /uses
              - listitem [ref=e294]:
                - link "Brand" [ref=e295]:
                  - /url: /brand
              - listitem [ref=e296]:
                - link "Colors" [ref=e297]:
                  - /url: /colors
              - listitem [ref=e298]:
                - link "Changelog" [ref=e299]:
                  - /url: /changelog
              - listitem [ref=e300]:
                - link "Showreel" [ref=e301]:
                  - /url: /showreel
              - listitem [ref=e302]:
                - link "Atlas" [ref=e303]:
                  - /url: /atlas
              - listitem [ref=e304]:
                - link "Recognition" [ref=e305]:
                  - /url: /awards
              - listitem [ref=e306]:
                - link "Achievements" [ref=e307]:
                  - /url: /achievements
              - listitem [ref=e308]:
                - link "Colophon" [ref=e309]:
                  - /url: /colophon
              - listitem [ref=e310]:
                - link "Privacy" [ref=e311]:
                  - /url: /legal/privacy
              - listitem [ref=e312]:
                - link "Terms" [ref=e313]:
                  - /url: /legal/terms
      - generic [ref=e314]:
        - generic [ref=e315]:
          - paragraph [ref=e316]: ◌ Signed
          - img "Delowar Hossain signature" [ref=e317]:
            - generic [ref=e319]: Delowar Hossain
        - paragraph [ref=e321]: handwritten in vector — strokes draw on view
      - generic [ref=e322]:
        - button "Quote of the day — click to copy" [ref=e324]:
          - generic [ref=e325]: ◊ Quote of the day · 206 / 365
          - generic [ref=e326]: “A particle system with art direction is weather.”
        - paragraph [ref=e327]:
          - text: ◌ A new quote rotates in at 00:00 UTC.
          - text: Click to copy. Three hundred sixty-five total.
      - generic [ref=e330]:
        - generic [ref=e331]:
          - generic [ref=e332]: DELOWAR HOSSAIN
          - generic [ref=e333]: •
        - generic [ref=e334]:
          - generic [ref=e335]: CREATIVE DEVELOPER
          - generic [ref=e336]: •
        - generic [ref=e337]:
          - generic [ref=e338]: UI / UX DESIGNER
          - generic [ref=e339]: •
        - generic [ref=e340]:
          - generic [ref=e341]: WEBGL · THREE.JS · GLSL
          - generic [ref=e342]: •
        - generic [ref=e343]:
          - generic [ref=e344]: OPEN FROM Q1 ’27 — BOOKING THROUGH Q4 ’27
          - generic [ref=e345]: •
        - generic [ref=e346]:
          - generic [ref=e347]: JOYPURHAT, BANGLADESH
          - generic [ref=e348]: •
        - generic [ref=e349]:
          - generic [ref=e350]: MMXXVII / 03.27
          - generic [ref=e351]: •
        - generic [ref=e352]:
          - generic [ref=e353]: DELOWAR HOSSAIN · MMXXVII
          - generic [ref=e354]: •
        - generic [ref=e355]:
          - generic [ref=e356]: DELOWAR HOSSAIN
          - generic [ref=e357]: •
        - generic [ref=e358]:
          - generic [ref=e359]: CREATIVE DEVELOPER
          - generic [ref=e360]: •
        - generic [ref=e361]:
          - generic [ref=e362]: UI / UX DESIGNER
          - generic [ref=e363]: •
        - generic [ref=e364]:
          - generic [ref=e365]: WEBGL · THREE.JS · GLSL
          - generic [ref=e366]: •
        - generic [ref=e367]:
          - generic [ref=e368]: OPEN FROM Q1 ’27 — BOOKING THROUGH Q4 ’27
          - generic [ref=e369]: •
        - generic [ref=e370]:
          - generic [ref=e371]: JOYPURHAT, BANGLADESH
          - generic [ref=e372]: •
        - generic [ref=e373]:
          - generic [ref=e374]: MMXXVII / 03.27
          - generic [ref=e375]: •
        - generic [ref=e376]:
          - generic [ref=e377]: DELOWAR HOSSAIN · MMXXVII
          - generic [ref=e378]: •
      - generic [ref=e379]:
        - paragraph [ref=e380]:
          - text: © 2027
          - button "Studio mark" [ref=e381]: The Compiled Thought
          - text: . All rights reserved · MMXXVII.
        - paragraph [ref=e382]:
          - text: Lat. 25.10° N · Long. 89.02° E · Joypurhat, Bangladesh ·
          - generic [ref=e383]: 21:49:30
          - text: BST
        - generic [ref=e384]:
          - link "◇ local" [ref=e385]:
            - /url: https://github.com/mdhossain-2437/Creative-Folio
          - button "Toggle motion" [ref=e386]:
            - generic [ref=e389]: Motion On
          - generic [ref=e390]: v MMXXVII / 03.27
  - alert [ref=e391]
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