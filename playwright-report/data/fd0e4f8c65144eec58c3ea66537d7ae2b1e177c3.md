# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> Smoke tests - critical routes >> should have no accessibility violations on /journal
- Location: e2e\smoke.spec.ts:47:9

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -   1
+ Received  + 306

- Array []
+ Array [
+   Object {
+     "description": "Ensure that lists are structured correctly",
+     "help": "<ul> and <ol> must only directly contain <li>, <script> or <template> elements",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.12/list?application=playwright",
+     "id": "list",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [],
+         "failureSummary": "Fix all of the following:
+   List element has direct children that are not allowed: div",
+         "html": "<ul class=\"divide-y divide-warmwhite/15\">",
+         "impact": "serious",
+         "none": Array [
+           Object {
+             "data": Object {
+               "values": "div",
+             },
+             "id": "only-listitems",
+             "impact": "serious",
+             "message": "List element has direct children that are not allowed: div",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0s;\">",
+                 "target": Array [
+                   ".reveal:nth-child(1)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.04s;\">",
+                 "target": Array [
+                   ".reveal:nth-child(2)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.08s;\">",
+                 "target": Array [
+                   ".reveal:nth-child(3)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.12s;\">",
+                 "target": Array [
+                   ".reveal:nth-child(4)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.16s;\">",
+                 "target": Array [
+                   ".reveal:nth-child(5)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.2s;\">",
+                 "target": Array [
+                   ".reveal:nth-child(6)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.24s;\">",
+                 "target": Array [
+                   ".reveal:nth-child(7)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.28s;\">",
+                 "target": Array [
+                   ".reveal:nth-child(8)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "target": Array [
+           ".divide-y",
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
+             "data": null,
+             "id": "listitem",
+             "impact": "serious",
+             "message": "List item does not have a <ul>, <ol> parent element",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   List item does not have a <ul>, <ol> parent element",
+         "html": "<li>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(1) > li",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "listitem",
+             "impact": "serious",
+             "message": "List item does not have a <ul>, <ol> parent element",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   List item does not have a <ul>, <ol> parent element",
+         "html": "<li>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(2) > li",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "listitem",
+             "impact": "serious",
+             "message": "List item does not have a <ul>, <ol> parent element",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   List item does not have a <ul>, <ol> parent element",
+         "html": "<li>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(3) > li",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "listitem",
+             "impact": "serious",
+             "message": "List item does not have a <ul>, <ol> parent element",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   List item does not have a <ul>, <ol> parent element",
+         "html": "<li>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(4) > li",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "listitem",
+             "impact": "serious",
+             "message": "List item does not have a <ul>, <ol> parent element",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   List item does not have a <ul>, <ol> parent element",
+         "html": "<li>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(5) > li",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "listitem",
+             "impact": "serious",
+             "message": "List item does not have a <ul>, <ol> parent element",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   List item does not have a <ul>, <ol> parent element",
+         "html": "<li>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(6) > li",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "listitem",
+             "impact": "serious",
+             "message": "List item does not have a <ul>, <ol> parent element",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   List item does not have a <ul>, <ol> parent element",
+         "html": "<li>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(7) > li",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "listitem",
+             "impact": "serious",
+             "message": "List item does not have a <ul>, <ol> parent element",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   List item does not have a <ul>, <ol> parent element",
+         "html": "<li>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(8) > li",
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
  - 'button "Atmosphere: Aura · warm peach · press T to cycle, Shift-click to share link" [ref=e4]':
    - generic [ref=e8]: AURA
  - banner:
    - navigation "Primary" [ref=e9]:
      - link "Delowar Hossain — home" [ref=e10]:
        - /url: /
        - generic [ref=e11]: Delowar Hossain
        - generic [ref=e12]: ◊ MMXXVII
      - list [ref=e13]:
        - listitem [ref=e14]:
          - link "Index" [ref=e15]:
            - /url: /
            - generic [ref=e16]: Index
        - listitem [ref=e17]:
          - link "Works" [ref=e18]:
            - /url: /works
            - generic [ref=e19]: Works
        - listitem [ref=e20]:
          - link "Lab" [ref=e21]:
            - /url: /lab
            - generic [ref=e22]: Lab
        - listitem [ref=e23]:
          - link "About" [ref=e24]:
            - /url: /about
            - generic [ref=e25]: About
        - listitem [ref=e26]:
          - link "Resume" [ref=e27]:
            - /url: /resume
            - generic [ref=e28]: Resume
        - listitem [ref=e29]:
          - link "Journal" [ref=e30]:
            - /url: /journal
            - generic [ref=e31]: Journal
        - listitem [ref=e33]:
          - link "Services" [ref=e34]:
            - /url: /services
            - generic [ref=e35]: Services
        - listitem [ref=e36]:
          - link "Contact" [ref=e37]:
            - /url: /contact
            - generic [ref=e38]: Contact
      - generic [ref=e39]:
        - button "Sound effects off — press S to toggle" [ref=e40]:
          - generic [ref=e41]: ·
          - generic [ref=e42]: Mute
        - button "Open command palette (Cmd+K)" [ref=e43]: ⌘K
        - link "Start a Project" [ref=e44]:
          - /url: /contact
  - main [ref=e46]:
    - generic [ref=e49]:
      - paragraph [ref=e50]: §04 — Journal
      - heading "Journal & Notes." [level=1] [ref=e51]:
        - generic [ref=e54]: Journal
        - generic [ref=e56]:
          - generic [ref=e58]: "&"
          - generic [ref=e60]: Notes.
      - generic [ref=e61]:
        - paragraph [ref=e62]: Thoughts, experiments and technical deep-dives into creative development and computational design.
        - list [ref=e63]:
          - listitem [ref=e64]:
            - paragraph [ref=e65]: Posts
            - paragraph [ref=e66]: "8"
          - listitem [ref=e67]:
            - paragraph [ref=e68]: Topics
            - paragraph [ref=e69]: WebGL · Type · AI
          - listitem [ref=e70]:
            - paragraph [ref=e71]: Cadence
            - paragraph [ref=e72]: Monthly
    - generic [ref=e74]:
      - link "RSS / Atom feed" [ref=e76]:
        - /url: /journal/feed.xml
        - generic [ref=e77]: ≋
        - generic [ref=e78]: RSS / Atom feed
      - generic [ref=e79]:
        - generic [ref=e80]: Date
        - generic [ref=e81]: Title
        - generic [ref=e82]: Category
        - generic [ref=e83]: Read
      - list [ref=e84]:
        - listitem [ref=e86]:
          - 'link "Read: Flexible page transitions: borrowing from Patrick Heng — Motion, 11 min read, 2027.04.18" [ref=e87]':
            - /url: /journal/flexible-page-transitions
            - generic [ref=e88]: 2027.04.18
            - generic [ref=e89]: "Flexible page transitions: borrowing from Patrick Heng"
            - generic [ref=e90]: Motion
            - generic [ref=e91]: 11 min read
            - paragraph [ref=e92]: How to build a route-curtain system that morphs the destination title through the wipe — and how to keep your Lighthouse score above 95 while doing it.
        - listitem [ref=e94]:
          - 'link "Read: Scroll as a medium, not a mechanic — Scroll, 9 min read, 2027.02.02" [ref=e95]':
            - /url: /journal/scroll-as-a-medium
            - generic [ref=e96]: 2027.02.02
            - generic [ref=e97]: Scroll as a medium, not a mechanic
            - generic [ref=e98]: Scroll
            - generic [ref=e99]: 9 min read
            - paragraph [ref=e100]: "Reframing scroll: not a way to consume content faster, but a timeline you can choreograph. A taxonomy of scroll patterns we use at the studio in 2027."
        - listitem [ref=e102]:
          - 'link "Read: Shader Math: from a single noise field to a world — WebGL, 12 min read, 2025.11.12" [ref=e103]':
            - /url: /journal/shader-math-deep-dive
            - generic [ref=e104]: 2025.11.12
            - generic [ref=e105]: "Shader Math: from a single noise field to a world"
            - generic [ref=e106]: WebGL
            - generic [ref=e107]: 12 min read
            - paragraph [ref=e108]: How one well-tuned noise function — and a careful color ramp — can stand in for an entire scene. A practical tour of the math we use in production.
        - listitem [ref=e110]:
          - 'link "Read: The Quiet Grid: editorial restraint as a UX strategy — Design, 8 min read, 2025.08.22" [ref=e111]':
            - /url: /journal/the-quiet-grid
            - generic [ref=e112]: 2025.08.22
            - generic [ref=e113]: "The Quiet Grid: editorial restraint as a UX strategy"
            - generic [ref=e114]: Design
            - generic [ref=e115]: 8 min read
            - paragraph [ref=e116]: Why dropping density and trusting whitespace makes information-dense products feel calmer, smarter, and faster.
        - listitem [ref=e118]:
          - 'link "Read: RAG Without the Noise: building accurate AI features — AI, 14 min read, 2025.06.11" [ref=e119]':
            - /url: /journal/rag-without-the-noise
            - generic [ref=e120]: 2025.06.11
            - generic [ref=e121]: "RAG Without the Noise: building accurate AI features"
            - generic [ref=e122]: AI
            - generic [ref=e123]: 14 min read
            - paragraph [ref=e124]: Notes from shipping retrieval-augmented features into production. Embeddings, chunking strategies, and a hard line on hallucinations.
        - listitem [ref=e126]:
          - 'link "Read: Typography is the product — Type, 7 min read, 2025.02.18" [ref=e127]':
            - /url: /journal/typography-as-product
            - generic [ref=e128]: 2025.02.18
            - generic [ref=e129]: Typography is the product
            - generic [ref=e130]: Type
            - generic [ref=e131]: 7 min read
            - paragraph [ref=e132]: On variable fonts, reading rhythm, and the case for hand-tuned type pairings instead of ‘safe’ system stacks.
        - listitem [ref=e134]:
          - 'link "Read: WebGL on low-end devices: graceful degradation playbook — Performance, 10 min read, 2027.03.04" [ref=e135]':
            - /url: /journal/webgl-on-low-end-devices
            - generic [ref=e136]: 2027.03.04
            - generic [ref=e137]: "WebGL on low-end devices: graceful degradation playbook"
            - generic [ref=e138]: Performance
            - generic [ref=e139]: 10 min read
            - paragraph [ref=e140]: Detecting Swiftshader, throttled GPUs, and battery-saver mode — and falling back to a static gradient that still feels intentional.
        - listitem [ref=e142]:
          - 'link "Read: Command palettes aren’t just for devs — UI, 6 min read, 2027.01.09" [ref=e143]':
            - /url: /journal/command-palettes-arent-just-for-devs
            - generic [ref=e144]: 2027.01.09
            - generic [ref=e145]: Command palettes aren’t just for devs
            - generic [ref=e146]: UI
            - generic [ref=e147]: 6 min read
            - paragraph [ref=e148]: Why ⌘K belongs on portfolios, agency sites, and even e-commerce — and how to design one that doesn’t feel like Notion.
  - contentinfo [ref=e150]:
    - region "Studio status" [ref=e151]:
      - generic [ref=e152]:
        - generic [ref=e153]:
          - generic [ref=e156]: 21:49 BD
          - generic [ref=e157]: ·
          - generic [ref=e158]: Joypurhat · BD
          - generic [ref=e159]: ·
          - generic [ref=e160]: 176 GH
          - generic [ref=e161]: ·
          - generic [ref=e162]: MMXXVII
          - generic [ref=e163]: ·
          - link "University of the People — B.Sc. Computer Science (in progress)" [ref=e164]:
            - /url: https://www.uopeople.edu/
            - text: B.Sc. CS · UoPeople
          - generic [ref=e165]: ·
          - generic "Time until MMXXVII (2027-01-01, Asia/Dhaka)" [ref=e166]:
            - text: → 186d 02h 10m
            - generic [ref=e167]: MMXXVII
        - link "Open from Q1 ’27 — booking through Q4 ’27" [ref=e168]:
          - /url: /contact
          - text: Open from Q1 ’27 — booking through Q4 ’27
          - generic [ref=e170]: ↗
    - generic [ref=e171]:
      - generic [ref=e172]:
        - generic [ref=e173]:
          - paragraph [ref=e174]: ◊ Open from Q1 ’27 — booking through Q4 ’27 · Selected projects
          - heading "Have an idea? Let's build it." [level=2] [ref=e175]:
            - generic [ref=e176]: Have an idea?
            - generic [ref=e177]: Let's build it.
          - generic [ref=e178]:
            - link "hello@delowarhossain.dev" [ref=e179]:
              - /url: /contact
              - text: hello@delowarhossain.dev
              - generic [ref=e180]: ↗
            - button "Copy email address to clipboard" [ref=e181]: ⎘
        - generic [ref=e182]:
          - generic [ref=e183]:
            - paragraph [ref=e184]: Pages
            - list [ref=e185]:
              - listitem [ref=e186]:
                - link "Index" [ref=e187]:
                  - /url: /
              - listitem [ref=e188]:
                - link "Works" [ref=e189]:
                  - /url: /works
              - listitem [ref=e190]:
                - link "Lab" [ref=e191]:
                  - /url: /lab
              - listitem [ref=e192]:
                - link "Process" [ref=e193]:
                  - /url: /process
              - listitem [ref=e194]:
                - link "About" [ref=e195]:
                  - /url: /about
              - listitem [ref=e196]:
                - link "Resume" [ref=e197]:
                  - /url: /resume
              - listitem [ref=e198]:
                - link "Journal" [ref=e199]:
                  - /url: /journal
              - listitem [ref=e200]:
                - link "Services" [ref=e201]:
                  - /url: /services
              - listitem [ref=e202]:
                - link "Uses" [ref=e203]:
                  - /url: /uses
              - listitem [ref=e204]:
                - link "Contact" [ref=e205]:
                  - /url: /contact
              - listitem [ref=e206]:
                - link "AI Summary" [ref=e207]:
                  - /url: /ai
          - generic [ref=e208]:
            - paragraph [ref=e209]: Connect
            - list [ref=e210]:
              - listitem [ref=e211]:
                - link "GITHUB" [ref=e212]:
                  - /url: https://github.com/mdhossain-2437
              - listitem [ref=e213]:
                - link "LINKEDIN" [ref=e214]:
                  - /url: https://www.linkedin.com/in/mdhossain2437
              - listitem [ref=e215]:
                - link "TWITTER" [ref=e216]:
                  - /url: https://twitter.com/mdhossain2437
              - listitem [ref=e217]:
                - link "INSTAGRAM" [ref=e218]:
                  - /url: https://www.instagram.com/mdhossain2437
              - listitem [ref=e219]:
                - link "FACEBOOK" [ref=e220]:
                  - /url: https://www.facebook.com/mdhossain2437
              - listitem [ref=e221]:
                - link "READ.CV" [ref=e222]:
                  - /url: https://read.cv/delowar
          - generic [ref=e223]:
            - paragraph [ref=e224]: Studio
            - list [ref=e225]:
              - listitem [ref=e226]:
                - link "Now" [ref=e227]:
                  - /url: /now
              - listitem [ref=e228]:
                - link "Uses" [ref=e229]:
                  - /url: /uses
              - listitem [ref=e230]:
                - link "Brand" [ref=e231]:
                  - /url: /brand
              - listitem [ref=e232]:
                - link "Colors" [ref=e233]:
                  - /url: /colors
              - listitem [ref=e234]:
                - link "Changelog" [ref=e235]:
                  - /url: /changelog
              - listitem [ref=e236]:
                - link "Showreel" [ref=e237]:
                  - /url: /showreel
              - listitem [ref=e238]:
                - link "Atlas" [ref=e239]:
                  - /url: /atlas
              - listitem [ref=e240]:
                - link "Recognition" [ref=e241]:
                  - /url: /awards
              - listitem [ref=e242]:
                - link "Achievements" [ref=e243]:
                  - /url: /achievements
              - listitem [ref=e244]:
                - link "Colophon" [ref=e245]:
                  - /url: /colophon
              - listitem [ref=e246]:
                - link "Privacy" [ref=e247]:
                  - /url: /legal/privacy
              - listitem [ref=e248]:
                - link "Terms" [ref=e249]:
                  - /url: /legal/terms
      - generic [ref=e250]:
        - generic [ref=e251]:
          - paragraph [ref=e252]: ◌ Signed
          - img "Delowar Hossain signature" [ref=e253]:
            - generic [ref=e255]: Delowar Hossain
        - paragraph [ref=e257]: handwritten in vector — strokes draw on view
      - generic [ref=e258]:
        - button "Quote of the day — click to copy" [ref=e260]:
          - generic [ref=e261]: ◊ Quote of the day · 206 / 365
          - generic [ref=e262]: “A particle system with art direction is weather.”
        - paragraph [ref=e263]:
          - text: ◌ A new quote rotates in at 00:00 UTC.
          - text: Click to copy. Three hundred sixty-five total.
      - generic [ref=e266]:
        - generic [ref=e267]:
          - generic [ref=e268]: DELOWAR HOSSAIN
          - generic [ref=e269]: •
        - generic [ref=e270]:
          - generic [ref=e271]: CREATIVE DEVELOPER
          - generic [ref=e272]: •
        - generic [ref=e273]:
          - generic [ref=e274]: UI / UX DESIGNER
          - generic [ref=e275]: •
        - generic [ref=e276]:
          - generic [ref=e277]: WEBGL · THREE.JS · GLSL
          - generic [ref=e278]: •
        - generic [ref=e279]:
          - generic [ref=e280]: OPEN FROM Q1 ’27 — BOOKING THROUGH Q4 ’27
          - generic [ref=e281]: •
        - generic [ref=e282]:
          - generic [ref=e283]: JOYPURHAT, BANGLADESH
          - generic [ref=e284]: •
        - generic [ref=e285]:
          - generic [ref=e286]: MMXXVII / 03.27
          - generic [ref=e287]: •
        - generic [ref=e288]:
          - generic [ref=e289]: DELOWAR HOSSAIN · MMXXVII
          - generic [ref=e290]: •
        - generic [ref=e291]:
          - generic [ref=e292]: DELOWAR HOSSAIN
          - generic [ref=e293]: •
        - generic [ref=e294]:
          - generic [ref=e295]: CREATIVE DEVELOPER
          - generic [ref=e296]: •
        - generic [ref=e297]:
          - generic [ref=e298]: UI / UX DESIGNER
          - generic [ref=e299]: •
        - generic [ref=e300]:
          - generic [ref=e301]: WEBGL · THREE.JS · GLSL
          - generic [ref=e302]: •
        - generic [ref=e303]:
          - generic [ref=e304]: OPEN FROM Q1 ’27 — BOOKING THROUGH Q4 ’27
          - generic [ref=e305]: •
        - generic [ref=e306]:
          - generic [ref=e307]: JOYPURHAT, BANGLADESH
          - generic [ref=e308]: •
        - generic [ref=e309]:
          - generic [ref=e310]: MMXXVII / 03.27
          - generic [ref=e311]: •
        - generic [ref=e312]:
          - generic [ref=e313]: DELOWAR HOSSAIN · MMXXVII
          - generic [ref=e314]: •
      - generic [ref=e315]:
        - paragraph [ref=e316]:
          - text: © 2027
          - button "Studio mark" [ref=e317]: The Compiled Thought
          - text: . All rights reserved · MMXXVII.
        - paragraph [ref=e318]:
          - text: Lat. 25.10° N · Long. 89.02° E · Joypurhat, Bangladesh ·
          - generic [ref=e319]: 21:49:07
          - text: BST
        - generic [ref=e320]:
          - link "◇ local" [ref=e321]:
            - /url: https://github.com/mdhossain-2437/Creative-Folio
          - button "Toggle motion" [ref=e322]:
            - generic [ref=e325]: Motion On
          - generic [ref=e326]: v MMXXVII / 03.27
  - alert [ref=e327]
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