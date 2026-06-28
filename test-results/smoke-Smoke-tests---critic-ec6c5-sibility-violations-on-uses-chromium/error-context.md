# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> Smoke tests - critical routes >> should have no accessibility violations on /uses
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
  - status:
    - generic [ref=e3]:
      - paragraph [ref=e4]: ★ Unlocked
      - paragraph [ref=e5]: Tinkerer
      - paragraph [ref=e6]: Read the /uses page. You wanted to know what's on the desk.
  - generic [ref=e7]:
    - generic [ref=e8]: ◊
    - generic [ref=e9]:
      - paragraph [ref=e10]: New here?
      - paragraph [ref=e11]: Press / or ⌘K to fly. Try ? for the full keyboard map.
    - button "Dismiss nudge" [ref=e12]: ×
  - 'button "Atmosphere: Aura · warm peach · press T to cycle, Shift-click to share link" [ref=e14]':
    - generic [ref=e18]: AURA
  - banner:
    - navigation "Primary" [ref=e19]:
      - link "Delowar Hossain — home" [ref=e20]:
        - /url: /
        - generic [ref=e21]: Delowar Hossain
        - generic [ref=e22]: ◊ MMXXVII
      - list [ref=e23]:
        - listitem [ref=e24]:
          - link "Index" [ref=e25]:
            - /url: /
            - generic [ref=e26]: Index
        - listitem [ref=e27]:
          - link "Works" [ref=e28]:
            - /url: /works
            - generic [ref=e29]: Works
        - listitem [ref=e30]:
          - link "Lab" [ref=e31]:
            - /url: /lab
            - generic [ref=e32]: Lab
        - listitem [ref=e33]:
          - link "About" [ref=e34]:
            - /url: /about
            - generic [ref=e35]: About
        - listitem [ref=e36]:
          - link "Resume" [ref=e37]:
            - /url: /resume
            - generic [ref=e38]: Resume
        - listitem [ref=e39]:
          - link "Journal" [ref=e40]:
            - /url: /journal
            - generic [ref=e41]: Journal
        - listitem [ref=e42]:
          - link "Services" [ref=e43]:
            - /url: /services
            - generic [ref=e44]: Services
        - listitem [ref=e45]:
          - link "Contact" [ref=e46]:
            - /url: /contact
            - generic [ref=e47]: Contact
      - generic [ref=e48]:
        - button "Sound effects off — press S to toggle" [ref=e49]:
          - generic [ref=e50]: ·
          - generic [ref=e51]: Mute
        - button "Open command palette (Cmd+K)" [ref=e52]: ⌘K
        - link "Start a Project" [ref=e53]:
          - /url: /contact
  - main [ref=e55]:
    - generic [ref=e58]:
      - paragraph [ref=e59]: § 03 — Uses
      - heading "What I actually use." [level=1] [ref=e60]:
        - generic [ref=e61]:
          - generic [ref=e63]: What
          - generic [ref=e65]: I
        - generic [ref=e67]:
          - generic [ref=e69]: actually
          - generic [ref=e71]: use.
      - generic [ref=e72]:
        - paragraph [ref=e73]: The opinionated answer to ‘what's your setup?’ — the editor, hardware, fonts, and dev tools that pull their weight in 2026. Refreshed each year.
        - list [ref=e74]:
          - listitem [ref=e75]:
            - paragraph [ref=e76]: Edition
            - paragraph [ref=e77]: MMXXVII
          - listitem [ref=e78]:
            - paragraph [ref=e79]: Refreshed
            - paragraph [ref=e80]: Q2
          - listitem [ref=e81]:
            - paragraph [ref=e82]: Replaces
            - paragraph [ref=e83]: uses-2025.md
          - listitem [ref=e84]:
            - paragraph [ref=e85]: Inspired by
            - paragraph [ref=e86]: uses.tech
    - generic [ref=e89]:
      - generic [ref=e90]:
        - generic [ref=e91]:
          - paragraph [ref=e92]: 01 — Where I write code
          - heading "Editor & shell" [level=2] [ref=e93]
        - list [ref=e94]:
          - listitem [ref=e95]:
            - paragraph [ref=e96]: Cursor
            - paragraph [ref=e97]: Daily driver. Composer + agent for refactors.
          - listitem [ref=e98]:
            - paragraph [ref=e99]: VS Code
            - paragraph [ref=e100]: Backup, especially for live-share sessions.
          - listitem [ref=e101]:
            - paragraph [ref=e102]: Vim keybindings
            - paragraph [ref=e103]: Habit from 2018. Hard to give up.
          - listitem [ref=e104]:
            - paragraph [ref=e105]: Warp
            - paragraph [ref=e106]: Terminal. AI command suggestions stay on by default.
          - listitem [ref=e107]:
            - paragraph [ref=e108]: fish + starship
            - paragraph [ref=e109]: Minimal prompt with git status & duration.
          - listitem [ref=e110]:
            - paragraph [ref=e111]: tmux
            - paragraph [ref=e112]: Two windows, four panes — server, logs, scratch, editor.
      - generic [ref=e113]:
        - generic [ref=e114]:
          - paragraph [ref=e115]: 02 — Where I debug
          - heading "Browser & dev tools" [level=2] [ref=e116]
        - list [ref=e117]:
          - listitem [ref=e118]:
            - paragraph [ref=e119]: Chrome Canary
            - paragraph [ref=e120]: Lighthouse, Performance panel, GPU layer overlay.
          - listitem [ref=e121]:
            - paragraph [ref=e122]: Firefox Developer Edition
            - paragraph [ref=e123]: Spider-mode for shader fallbacks.
          - listitem [ref=e124]:
            - paragraph [ref=e125]: Safari Tech Preview
            - paragraph [ref=e126]: Catches subtle WebGL2 bugs Chrome hides.
          - listitem [ref=e127]:
            - paragraph [ref=e128]: Spector.js
            - paragraph [ref=e129]: WebGL frame inspector — captures every GL call per frame.
          - listitem [ref=e130]:
            - paragraph [ref=e131]: Polypane
            - paragraph [ref=e132]: Multi-viewport simultaneous rendering for responsive QA.
      - generic [ref=e133]:
        - generic [ref=e134]:
          - paragraph [ref=e135]: 03 — Where I move pixels
          - heading "Design" [level=2] [ref=e136]
        - list [ref=e137]:
          - listitem [ref=e138]:
            - paragraph [ref=e139]: Figma
            - paragraph [ref=e140]: Source of truth for systems, components and editorial layouts.
          - listitem [ref=e141]:
            - paragraph [ref=e142]: Affinity Designer
            - paragraph [ref=e143]: Vector + print exports the studio actually ships.
          - listitem [ref=e144]:
            - paragraph [ref=e145]: Procreate
            - paragraph [ref=e146]: Sketches before any pixel work begins.
          - listitem [ref=e147]:
            - paragraph [ref=e148]: Tldraw
            - paragraph [ref=e149]: Whiteboarding architecture diagrams.
      - generic [ref=e150]:
        - generic [ref=e151]:
          - paragraph [ref=e152]: 04 — What this site is set in
          - heading "Type" [level=2] [ref=e153]
        - list [ref=e154]:
          - listitem [ref=e155]:
            - paragraph [ref=e156]: Newsreader
            - paragraph [ref=e157]: Hero serif. Variable display weight.
          - listitem [ref=e158]:
            - paragraph [ref=e159]: Inter
            - paragraph [ref=e160]: UI sans across the system.
          - listitem [ref=e161]:
            - paragraph [ref=e162]: JetBrains Mono
            - paragraph [ref=e163]: Code, eyebrows, the studio clock.
          - listitem [ref=e164]:
            - paragraph [ref=e165]: Söhne
            - paragraph [ref=e166]: Used in editorial work. Licensed via Klim.
          - listitem [ref=e167]:
            - paragraph [ref=e168]: Fraunces
            - paragraph [ref=e169]: Variable serif for moody experiments.
      - generic [ref=e170]:
        - generic [ref=e171]:
          - paragraph [ref=e172]: 05 — On the desk
          - heading "Hardware" [level=2] [ref=e173]
        - list [ref=e174]:
          - listitem [ref=e175]:
            - paragraph [ref=e176]: MacBook Pro 14” M3 Pro
            - paragraph [ref=e177]: Primary machine. 36 GB · 1 TB.
          - listitem [ref=e178]:
            - paragraph [ref=e179]: LG UltraFine 4K
            - paragraph [ref=e180]: Single 27” monitor. P3 calibrated.
          - listitem [ref=e181]:
            - paragraph [ref=e182]: Keychron Q1 Pro
            - paragraph [ref=e183]: Wireless, hot-swap, browns. Silenced.
          - listitem [ref=e184]:
            - paragraph [ref=e185]: Logitech MX Master 3S
            - paragraph [ref=e186]: Mouse. Quiet click is non-negotiable.
          - listitem [ref=e187]:
            - paragraph [ref=e188]: Audio-Technica ATH-M50x
            - paragraph [ref=e189]: Mixing & focus. Wired.
          - listitem [ref=e190]:
            - paragraph [ref=e191]: Anker eraser-grey desk mat
            - paragraph [ref=e192]: Quiet under the keyboard.
      - generic [ref=e193]:
        - generic [ref=e194]:
          - paragraph [ref=e195]: 06 — Production
          - heading "Stack & deploy" [level=2] [ref=e196]
        - list [ref=e197]:
          - listitem [ref=e198]:
            - paragraph [ref=e199]: Next.js 15
            - paragraph [ref=e200]: App Router, edge runtime where it pays off.
          - listitem [ref=e201]:
            - paragraph [ref=e202]: TypeScript strict
            - paragraph [ref=e203]: "No `any`. No `getattr`-style escapes."
          - listitem [ref=e204]:
            - paragraph [ref=e205]: Tailwind CSS
            - paragraph [ref=e206]: Plus a small set of hand-tuned tokens.
          - listitem [ref=e207]:
            - paragraph [ref=e208]: Three.js + GLSL
            - paragraph [ref=e209]: All shaders authored, not lifted.
          - listitem [ref=e210]:
            - paragraph [ref=e211]: GSAP + Lenis
            - paragraph [ref=e212]: Scroll choreography across the site.
          - listitem [ref=e213]:
            - paragraph [ref=e214]: Vercel
            - paragraph [ref=e215]: Hosting. Preview deploy per PR.
          - listitem [ref=e216]:
            - paragraph [ref=e217]: Cloudflare Stream
            - paragraph [ref=e218]: Showreel. HLS.
      - generic [ref=e219]:
        - generic [ref=e220]:
          - paragraph [ref=e221]: 07 — Daily
          - heading "Apps that pull weight" [level=2] [ref=e222]
        - list [ref=e223]:
          - listitem [ref=e224]:
            - paragraph [ref=e225]: Linear
            - paragraph [ref=e226]: Project tracking. Cycle-based.
          - listitem [ref=e227]:
            - paragraph [ref=e228]: Raycast
            - paragraph [ref=e229]: Launcher + clipboard history + window manager.
          - listitem [ref=e230]:
            - paragraph [ref=e231]: 1Password
            - paragraph [ref=e232]: Passwords + SSH keys + dev secrets.
          - listitem [ref=e233]:
            - paragraph [ref=e234]: Obsidian
            - paragraph [ref=e235]: Studio notebook. Backed up to a private repo.
          - listitem [ref=e236]:
            - paragraph [ref=e237]: Arc
            - paragraph [ref=e238]: Personal browsing. Spaces per project.
    - generic [ref=e240]:
      - paragraph [ref=e241]: ◊ Caveat
      - heading "None of this is a recommendation — it's the setup that survived contact with my own work in 2026. Yours should be different." [level=3] [ref=e242]
  - contentinfo [ref=e244]:
    - region "Studio status" [ref=e245]:
      - generic [ref=e246]:
        - generic [ref=e247]:
          - generic [ref=e250]: 21:49 BD
          - generic [ref=e251]: ·
          - generic [ref=e252]: Joypurhat · BD
          - generic [ref=e253]: ·
          - generic [ref=e254]: 176 GH
          - generic [ref=e255]: ·
          - generic [ref=e256]: MMXXVII
          - generic [ref=e257]: ·
          - link "University of the People — B.Sc. Computer Science (in progress)" [ref=e258]:
            - /url: https://www.uopeople.edu/
            - text: B.Sc. CS · UoPeople
          - generic [ref=e259]: ·
          - generic "Time until MMXXVII (2027-01-01, Asia/Dhaka)" [ref=e260]:
            - text: → 186d 02h 10m
            - generic [ref=e261]: MMXXVII
        - link "Open from Q1 ’27 — booking through Q4 ’27" [ref=e262]:
          - /url: /contact
          - text: Open from Q1 ’27 — booking through Q4 ’27
          - generic [ref=e264]: ↗
    - generic [ref=e265]:
      - generic [ref=e266]:
        - generic [ref=e267]:
          - paragraph [ref=e268]: ◊ Open from Q1 ’27 — booking through Q4 ’27 · Selected projects
          - heading "Have an idea? Let's build it." [level=2] [ref=e269]:
            - generic [ref=e270]: Have an idea?
            - generic [ref=e271]: Let's build it.
          - generic [ref=e272]:
            - link "hello@delowarhossain.dev" [ref=e273]:
              - /url: /contact
              - text: hello@delowarhossain.dev
              - generic [ref=e274]: ↗
            - button "Copy email address to clipboard" [ref=e275]: ⎘
        - generic [ref=e276]:
          - generic [ref=e277]:
            - paragraph [ref=e278]: Pages
            - list [ref=e279]:
              - listitem [ref=e280]:
                - link "Index" [ref=e281]:
                  - /url: /
              - listitem [ref=e282]:
                - link "Works" [ref=e283]:
                  - /url: /works
              - listitem [ref=e284]:
                - link "Lab" [ref=e285]:
                  - /url: /lab
              - listitem [ref=e286]:
                - link "Process" [ref=e287]:
                  - /url: /process
              - listitem [ref=e288]:
                - link "About" [ref=e289]:
                  - /url: /about
              - listitem [ref=e290]:
                - link "Resume" [ref=e291]:
                  - /url: /resume
              - listitem [ref=e292]:
                - link "Journal" [ref=e293]:
                  - /url: /journal
              - listitem [ref=e294]:
                - link "Services" [ref=e295]:
                  - /url: /services
              - listitem [ref=e296]:
                - link "Uses" [ref=e297]:
                  - /url: /uses
              - listitem [ref=e298]:
                - link "Contact" [ref=e299]:
                  - /url: /contact
              - listitem [ref=e300]:
                - link "AI Summary" [ref=e301]:
                  - /url: /ai
          - generic [ref=e302]:
            - paragraph [ref=e303]: Connect
            - list [ref=e304]:
              - listitem [ref=e305]:
                - link "GITHUB" [ref=e306]:
                  - /url: https://github.com/mdhossain-2437
              - listitem [ref=e307]:
                - link "LINKEDIN" [ref=e308]:
                  - /url: https://www.linkedin.com/in/mdhossain2437
              - listitem [ref=e309]:
                - link "TWITTER" [ref=e310]:
                  - /url: https://twitter.com/mdhossain2437
              - listitem [ref=e311]:
                - link "INSTAGRAM" [ref=e312]:
                  - /url: https://www.instagram.com/mdhossain2437
              - listitem [ref=e313]:
                - link "FACEBOOK" [ref=e314]:
                  - /url: https://www.facebook.com/mdhossain2437
              - listitem [ref=e315]:
                - link "READ.CV" [ref=e316]:
                  - /url: https://read.cv/delowar
          - generic [ref=e317]:
            - paragraph [ref=e318]: Studio
            - list [ref=e319]:
              - listitem [ref=e320]:
                - link "Now" [ref=e321]:
                  - /url: /now
              - listitem [ref=e322]:
                - link "Uses" [ref=e323]:
                  - /url: /uses
              - listitem [ref=e324]:
                - link "Brand" [ref=e325]:
                  - /url: /brand
              - listitem [ref=e326]:
                - link "Colors" [ref=e327]:
                  - /url: /colors
              - listitem [ref=e328]:
                - link "Changelog" [ref=e329]:
                  - /url: /changelog
              - listitem [ref=e330]:
                - link "Showreel" [ref=e331]:
                  - /url: /showreel
              - listitem [ref=e332]:
                - link "Atlas" [ref=e333]:
                  - /url: /atlas
              - listitem [ref=e334]:
                - link "Recognition" [ref=e335]:
                  - /url: /awards
              - listitem [ref=e336]:
                - link "Achievements" [ref=e337]:
                  - /url: /achievements
              - listitem [ref=e338]:
                - link "Colophon" [ref=e339]:
                  - /url: /colophon
              - listitem [ref=e340]:
                - link "Privacy" [ref=e341]:
                  - /url: /legal/privacy
              - listitem [ref=e342]:
                - link "Terms" [ref=e343]:
                  - /url: /legal/terms
      - generic [ref=e344]:
        - generic [ref=e345]:
          - paragraph [ref=e346]: ◌ Signed
          - img "Delowar Hossain signature" [ref=e347]:
            - generic [ref=e349]: Delowar Hossain
        - paragraph [ref=e351]: handwritten in vector — strokes draw on view
      - generic [ref=e352]:
        - button "Quote of the day — click to copy" [ref=e354]:
          - generic [ref=e355]: ◊ Quote of the day · 206 / 365
          - generic [ref=e356]: “A particle system with art direction is weather.”
        - paragraph [ref=e357]:
          - text: ◌ A new quote rotates in at 00:00 UTC.
          - text: Click to copy. Three hundred sixty-five total.
      - generic [ref=e360]:
        - generic [ref=e361]:
          - generic [ref=e362]: DELOWAR HOSSAIN
          - generic [ref=e363]: •
        - generic [ref=e364]:
          - generic [ref=e365]: CREATIVE DEVELOPER
          - generic [ref=e366]: •
        - generic [ref=e367]:
          - generic [ref=e368]: UI / UX DESIGNER
          - generic [ref=e369]: •
        - generic [ref=e370]:
          - generic [ref=e371]: WEBGL · THREE.JS · GLSL
          - generic [ref=e372]: •
        - generic [ref=e373]:
          - generic [ref=e374]: OPEN FROM Q1 ’27 — BOOKING THROUGH Q4 ’27
          - generic [ref=e375]: •
        - generic [ref=e376]:
          - generic [ref=e377]: JOYPURHAT, BANGLADESH
          - generic [ref=e378]: •
        - generic [ref=e379]:
          - generic [ref=e380]: MMXXVII / 03.27
          - generic [ref=e381]: •
        - generic [ref=e382]:
          - generic [ref=e383]: DELOWAR HOSSAIN · MMXXVII
          - generic [ref=e384]: •
        - generic [ref=e385]:
          - generic [ref=e386]: DELOWAR HOSSAIN
          - generic [ref=e387]: •
        - generic [ref=e388]:
          - generic [ref=e389]: CREATIVE DEVELOPER
          - generic [ref=e390]: •
        - generic [ref=e391]:
          - generic [ref=e392]: UI / UX DESIGNER
          - generic [ref=e393]: •
        - generic [ref=e394]:
          - generic [ref=e395]: WEBGL · THREE.JS · GLSL
          - generic [ref=e396]: •
        - generic [ref=e397]:
          - generic [ref=e398]: OPEN FROM Q1 ’27 — BOOKING THROUGH Q4 ’27
          - generic [ref=e399]: •
        - generic [ref=e400]:
          - generic [ref=e401]: JOYPURHAT, BANGLADESH
          - generic [ref=e402]: •
        - generic [ref=e403]:
          - generic [ref=e404]: MMXXVII / 03.27
          - generic [ref=e405]: •
        - generic [ref=e406]:
          - generic [ref=e407]: DELOWAR HOSSAIN · MMXXVII
          - generic [ref=e408]: •
      - generic [ref=e409]:
        - paragraph [ref=e410]:
          - text: © 2027
          - button "Studio mark" [ref=e411]: The Compiled Thought
          - text: . All rights reserved · MMXXVII.
        - paragraph [ref=e412]:
          - text: Lat. 25.10° N · Long. 89.02° E · Joypurhat, Bangladesh ·
          - generic [ref=e413]: 21:49:18
          - text: BST
        - generic [ref=e414]:
          - link "◇ local" [ref=e415]:
            - /url: https://github.com/mdhossain-2437/Creative-Folio
          - button "Toggle motion" [ref=e416]:
            - generic [ref=e419]: Motion On
          - generic [ref=e420]: v MMXXVII / 03.27
  - alert [ref=e421]
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