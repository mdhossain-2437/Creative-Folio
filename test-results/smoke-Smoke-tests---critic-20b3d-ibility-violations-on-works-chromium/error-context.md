# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> Smoke tests - critical routes >> should have no accessibility violations on /works
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
+         "html": "<ul class=\"grid grid-cols-1 items-stretch gap-px overflow-hidden bg-warmwhite/15 md:grid-cols-2\">",
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
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.05s;\">",
+                 "target": Array [
+                   ".reveal:nth-child(2)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.1s;\">",
+                 "target": Array [
+                   ".reveal:nth-child(3)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.15s;\">",
+                 "target": Array [
+                   ".reveal:nth-child(4)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.2s;\">",
+                 "target": Array [
+                   ".reveal:nth-child(5)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.25s;\">",
+                 "target": Array [
+                   ".reveal:nth-child(6)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.3s;\">",
+                 "target": Array [
+                   ".reveal:nth-child(7)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.35s;\">",
+                 "target": Array [
+                   ".reveal:nth-child(8)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "target": Array [
+           ".items-stretch",
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
+         "html": "<li class=\"h-full bg-ink-900\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(1) > .bg-ink-900.h-full",
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
+         "html": "<li class=\"h-full bg-ink-900\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(2) > .bg-ink-900.h-full",
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
+         "html": "<li class=\"h-full bg-ink-900\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(3) > .bg-ink-900.h-full",
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
+         "html": "<li class=\"h-full bg-ink-900\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(4) > .bg-ink-900.h-full",
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
+         "html": "<li class=\"h-full bg-ink-900\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(5) > .bg-ink-900.h-full",
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
+         "html": "<li class=\"h-full bg-ink-900\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(6) > .bg-ink-900.h-full",
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
+         "html": "<li class=\"h-full bg-ink-900\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(7) > .bg-ink-900.h-full",
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
+         "html": "<li class=\"h-full bg-ink-900\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(8) > .bg-ink-900.h-full",
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
        - listitem [ref=e21]:
          - link "Lab" [ref=e22]:
            - /url: /lab
            - generic [ref=e23]: Lab
        - listitem [ref=e24]:
          - link "About" [ref=e25]:
            - /url: /about
            - generic [ref=e26]: About
        - listitem [ref=e27]:
          - link "Resume" [ref=e28]:
            - /url: /resume
            - generic [ref=e29]: Resume
        - listitem [ref=e30]:
          - link "Journal" [ref=e31]:
            - /url: /journal
            - generic [ref=e32]: Journal
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
      - paragraph [ref=e50]: §02 — Selected & Works
      - heading "Selected & Works." [level=1] [ref=e51]:
        - generic [ref=e54]: Selected
        - generic [ref=e56]:
          - generic [ref=e58]: "&"
          - generic [ref=e60]: Works.
      - generic [ref=e61]:
        - paragraph [ref=e62]: A curated collection of digital experiences, interactive installations, and experimental web architecture. Exploring the intersection of motion, depth, and editorial typography.
        - list [ref=e63]:
          - listitem [ref=e64]:
            - paragraph [ref=e65]: Years
            - paragraph [ref=e66]: 2023 — Now
          - listitem [ref=e67]:
            - paragraph [ref=e68]: Total
            - paragraph [ref=e69]: "32"
          - listitem [ref=e70]:
            - paragraph [ref=e71]: Recognition
            - paragraph [ref=e72]: Targets labelled
          - listitem [ref=e73]:
            - paragraph [ref=e74]: Available
            - paragraph [ref=e75]: Q1 ’27
    - region "Drag to explore the archive — infinite canvas" [ref=e76]:
      - generic [ref=e77]:
        - generic:
          - link [ref=e78]:
            - /url: /works/aura-void
            - img [ref=e79]
            - generic:
              - generic: 01 · Aura Void
              - generic: "2027"
          - link [ref=e80]:
            - /url: /works/terminal-state
            - img [ref=e81]
            - generic:
              - generic: 02 · Terminal State
              - generic: "2025"
          - link [ref=e82]:
            - /url: /works/monolith-ui
            - img [ref=e83]
            - generic:
              - generic: 03 · Monolith UI
              - generic: "2025"
          - link [ref=e84]:
            - /url: /works/kinetica
            - img [ref=e85]
            - generic:
              - generic: 04 · Kinetica
              - generic: "2025"
          - link [ref=e86]:
            - /url: /works/void-engine
            - img [ref=e87]
            - generic:
              - generic: 05 · Void Engine
              - generic: "2024"
          - link [ref=e88]:
            - /url: /works/crackit
            - img [ref=e89]
            - generic:
              - generic: 06 · CrackIt
              - generic: "2027"
          - link [ref=e90]:
            - /url: /works/halcyon-os
            - img [ref=e91]
            - generic:
              - generic: 07 · Halcyon OS
              - generic: "2027"
          - link [ref=e92]:
            - /url: /works/echo-atlas
            - img [ref=e93]
            - generic:
              - generic: 08 · Echo Atlas
              - generic: "2027"
          - link [ref=e94]:
            - /url: /works/aura-void
            - img [ref=e95]
            - generic:
              - generic: 01 · Aura Void
              - generic: "2027"
          - link [ref=e96]:
            - /url: /works/terminal-state
            - img [ref=e97]
            - generic:
              - generic: 02 · Terminal State
              - generic: "2025"
          - link [ref=e98]:
            - /url: /works/monolith-ui
            - img [ref=e99]
            - generic:
              - generic: 03 · Monolith UI
              - generic: "2025"
          - link [ref=e100]:
            - /url: /works/kinetica
            - img [ref=e101]
            - generic:
              - generic: 04 · Kinetica
              - generic: "2025"
          - link [ref=e102]:
            - /url: /works/void-engine
            - img [ref=e103]
            - generic:
              - generic: 05 · Void Engine
              - generic: "2024"
          - link [ref=e104]:
            - /url: /works/crackit
            - img [ref=e105]
            - generic:
              - generic: 06 · CrackIt
              - generic: "2027"
          - link [ref=e106]:
            - /url: /works/halcyon-os
            - img [ref=e107]
            - generic:
              - generic: 07 · Halcyon OS
              - generic: "2027"
          - link [ref=e108]:
            - /url: /works/echo-atlas
            - img [ref=e109]
            - generic:
              - generic: 08 · Echo Atlas
              - generic: "2027"
          - link [ref=e110]:
            - /url: /works/aura-void
            - img [ref=e111]
            - generic:
              - generic: 01 · Aura Void
              - generic: "2027"
          - link [ref=e112]:
            - /url: /works/terminal-state
            - img [ref=e113]
            - generic:
              - generic: 02 · Terminal State
              - generic: "2025"
          - link [ref=e114]:
            - /url: /works/monolith-ui
            - img [ref=e115]
            - generic:
              - generic: 03 · Monolith UI
              - generic: "2025"
          - link [ref=e116]:
            - /url: /works/kinetica
            - img [ref=e117]
            - generic:
              - generic: 04 · Kinetica
              - generic: "2025"
          - link [ref=e118]:
            - /url: /works/void-engine
            - img [ref=e119]
            - generic:
              - generic: 05 · Void Engine
              - generic: "2024"
          - link [ref=e120]:
            - /url: /works/crackit
            - img [ref=e121]
            - generic:
              - generic: 06 · CrackIt
              - generic: "2027"
          - link [ref=e122]:
            - /url: /works/halcyon-os
            - img [ref=e123]
            - generic:
              - generic: 07 · Halcyon OS
              - generic: "2027"
          - link [ref=e124]:
            - /url: /works/echo-atlas
            - img [ref=e125]
            - generic:
              - generic: 08 · Echo Atlas
              - generic: "2027"
          - link [ref=e126]:
            - /url: /works/aura-void
            - img [ref=e127]
            - generic:
              - generic: 01 · Aura Void
              - generic: "2027"
          - link [ref=e128]:
            - /url: /works/terminal-state
            - img [ref=e129]
            - generic:
              - generic: 02 · Terminal State
              - generic: "2025"
          - link [ref=e130]:
            - /url: /works/monolith-ui
            - img [ref=e131]
            - generic:
              - generic: 03 · Monolith UI
              - generic: "2025"
          - link [ref=e132]:
            - /url: /works/kinetica
            - img [ref=e133]
            - generic:
              - generic: 04 · Kinetica
              - generic: "2025"
          - link [ref=e134]:
            - /url: /works/void-engine
            - img [ref=e135]
            - generic:
              - generic: 05 · Void Engine
              - generic: "2024"
          - link [ref=e136]:
            - /url: /works/crackit
            - img [ref=e137]
            - generic:
              - generic: 06 · CrackIt
              - generic: "2027"
          - link [ref=e138]:
            - /url: /works/halcyon-os
            - img [ref=e139]
            - generic:
              - generic: 07 · Halcyon OS
              - generic: "2027"
          - link [ref=e140]:
            - /url: /works/echo-atlas
            - img [ref=e141]
            - generic:
              - generic: 08 · Echo Atlas
              - generic: "2027"
          - generic:
            - link "Aura Void 01 · Aura Void 2027" [ref=e142]:
              - /url: /works/aura-void
              - img "Aura Void" [ref=e143]
              - generic:
                - generic: 01 · Aura Void
                - generic: "2027"
            - link "Terminal State 02 · Terminal State 2025" [ref=e144]:
              - /url: /works/terminal-state
              - img "Terminal State" [ref=e145]
              - generic:
                - generic: 02 · Terminal State
                - generic: "2025"
            - link "Monolith UI 03 · Monolith UI 2025" [ref=e146]:
              - /url: /works/monolith-ui
              - img "Monolith UI" [ref=e147]
              - generic:
                - generic: 03 · Monolith UI
                - generic: "2025"
            - link "Kinetica 04 · Kinetica 2025" [ref=e148]:
              - /url: /works/kinetica
              - img "Kinetica" [ref=e149]
              - generic:
                - generic: 04 · Kinetica
                - generic: "2025"
            - link "Void Engine 05 · Void Engine 2024" [ref=e150]:
              - /url: /works/void-engine
              - img "Void Engine" [ref=e151]
              - generic:
                - generic: 05 · Void Engine
                - generic: "2024"
            - link "CrackIt 06 · CrackIt 2027" [ref=e152]:
              - /url: /works/crackit
              - img "CrackIt" [ref=e153]
              - generic:
                - generic: 06 · CrackIt
                - generic: "2027"
            - link "Halcyon OS 07 · Halcyon OS 2027" [ref=e154]:
              - /url: /works/halcyon-os
              - img "Halcyon OS" [ref=e155]
              - generic:
                - generic: 07 · Halcyon OS
                - generic: "2027"
            - link "Echo Atlas 08 · Echo Atlas 2027" [ref=e156]:
              - /url: /works/echo-atlas
              - img "Echo Atlas" [ref=e157]
              - generic:
                - generic: 08 · Echo Atlas
                - generic: "2027"
          - link [ref=e158]:
            - /url: /works/aura-void
            - img [ref=e159]
            - generic:
              - generic: 01 · Aura Void
              - generic: "2027"
          - link [ref=e160]:
            - /url: /works/terminal-state
            - img [ref=e161]
            - generic:
              - generic: 02 · Terminal State
              - generic: "2025"
          - link [ref=e162]:
            - /url: /works/monolith-ui
            - img [ref=e163]
            - generic:
              - generic: 03 · Monolith UI
              - generic: "2025"
          - link [ref=e164]:
            - /url: /works/kinetica
            - img [ref=e165]
            - generic:
              - generic: 04 · Kinetica
              - generic: "2025"
          - link [ref=e166]:
            - /url: /works/void-engine
            - img [ref=e167]
            - generic:
              - generic: 05 · Void Engine
              - generic: "2024"
          - link [ref=e168]:
            - /url: /works/crackit
            - img [ref=e169]
            - generic:
              - generic: 06 · CrackIt
              - generic: "2027"
          - link [ref=e170]:
            - /url: /works/halcyon-os
            - img [ref=e171]
            - generic:
              - generic: 07 · Halcyon OS
              - generic: "2027"
          - link [ref=e172]:
            - /url: /works/echo-atlas
            - img [ref=e173]
            - generic:
              - generic: 08 · Echo Atlas
              - generic: "2027"
          - link [ref=e174]:
            - /url: /works/aura-void
            - img [ref=e175]
            - generic:
              - generic: 01 · Aura Void
              - generic: "2027"
          - link [ref=e176]:
            - /url: /works/terminal-state
            - img [ref=e177]
            - generic:
              - generic: 02 · Terminal State
              - generic: "2025"
          - link [ref=e178]:
            - /url: /works/monolith-ui
            - img [ref=e179]
            - generic:
              - generic: 03 · Monolith UI
              - generic: "2025"
          - link [ref=e180]:
            - /url: /works/kinetica
            - img [ref=e181]
            - generic:
              - generic: 04 · Kinetica
              - generic: "2025"
          - link [ref=e182]:
            - /url: /works/void-engine
            - img [ref=e183]
            - generic:
              - generic: 05 · Void Engine
              - generic: "2024"
          - link [ref=e184]:
            - /url: /works/crackit
            - img [ref=e185]
            - generic:
              - generic: 06 · CrackIt
              - generic: "2027"
          - link [ref=e186]:
            - /url: /works/halcyon-os
            - img [ref=e187]
            - generic:
              - generic: 07 · Halcyon OS
              - generic: "2027"
          - link [ref=e188]:
            - /url: /works/echo-atlas
            - img [ref=e189]
            - generic:
              - generic: 08 · Echo Atlas
              - generic: "2027"
          - link [ref=e190]:
            - /url: /works/aura-void
            - img [ref=e191]
            - generic:
              - generic: 01 · Aura Void
              - generic: "2027"
          - link [ref=e192]:
            - /url: /works/terminal-state
            - img [ref=e193]
            - generic:
              - generic: 02 · Terminal State
              - generic: "2025"
          - link [ref=e194]:
            - /url: /works/monolith-ui
            - img [ref=e195]
            - generic:
              - generic: 03 · Monolith UI
              - generic: "2025"
          - link [ref=e196]:
            - /url: /works/kinetica
            - img [ref=e197]
            - generic:
              - generic: 04 · Kinetica
              - generic: "2025"
          - link [ref=e198]:
            - /url: /works/void-engine
            - img [ref=e199]
            - generic:
              - generic: 05 · Void Engine
              - generic: "2024"
          - link [ref=e200]:
            - /url: /works/crackit
            - img [ref=e201]
            - generic:
              - generic: 06 · CrackIt
              - generic: "2027"
          - link [ref=e202]:
            - /url: /works/halcyon-os
            - img [ref=e203]
            - generic:
              - generic: 07 · Halcyon OS
              - generic: "2027"
          - link [ref=e204]:
            - /url: /works/echo-atlas
            - img [ref=e205]
            - generic:
              - generic: 08 · Echo Atlas
              - generic: "2027"
          - link [ref=e206]:
            - /url: /works/aura-void
            - img [ref=e207]
            - generic:
              - generic: 01 · Aura Void
              - generic: "2027"
          - link [ref=e208]:
            - /url: /works/terminal-state
            - img [ref=e209]
            - generic:
              - generic: 02 · Terminal State
              - generic: "2025"
          - link [ref=e210]:
            - /url: /works/monolith-ui
            - img [ref=e211]
            - generic:
              - generic: 03 · Monolith UI
              - generic: "2025"
          - link [ref=e212]:
            - /url: /works/kinetica
            - img [ref=e213]
            - generic:
              - generic: 04 · Kinetica
              - generic: "2025"
          - link [ref=e214]:
            - /url: /works/void-engine
            - img [ref=e215]
            - generic:
              - generic: 05 · Void Engine
              - generic: "2024"
          - link [ref=e216]:
            - /url: /works/crackit
            - img [ref=e217]
            - generic:
              - generic: 06 · CrackIt
              - generic: "2027"
          - link [ref=e218]:
            - /url: /works/halcyon-os
            - img [ref=e219]
            - generic:
              - generic: 07 · Halcyon OS
              - generic: "2027"
          - link [ref=e220]:
            - /url: /works/echo-atlas
            - img [ref=e221]
            - generic:
              - generic: 08 · Echo Atlas
              - generic: "2027"
        - generic:
          - generic: Drag to roam · 8 projects · ∞ infinite field
        - button "◌ recenter" [ref=e222]
    - list [ref=e225]:
      - listitem [ref=e227]:
        - 'link "Open case study: Aura Void — WebGL · Creative Direction, 2027" [ref=e228]':
          - /url: /works/aura-void
          - generic [ref=e229]:
            - img "Aura Void" [ref=e231]
            - generic [ref=e234]:
              - generic [ref=e235]: 01 — WebGL · Creative Direction
              - generic [ref=e236]: "2027"
          - generic [ref=e237]:
            - heading "Aura Void" [level=3] [ref=e238]
            - paragraph [ref=e239]: An ambient WebGL world built around a single noise field — pressure, depth, and reflection driven entirely by GLSL. v2 introduces a tactile, physics-aware cursor that pulls the field into local minima.
            - list [ref=e240]:
              - listitem [ref=e241]: Three.js
              - listitem [ref=e242]: GLSL
              - listitem [ref=e243]: GSAP
              - listitem [ref=e244]: Lenis
            - paragraph [ref=e245]: "Target: Awwwards · Site of the Day"
      - listitem [ref=e247]:
        - 'link "Open case study: Terminal State — Creative Direction · Editorial, 2025" [ref=e248]':
          - /url: /works/terminal-state
          - generic [ref=e249]:
            - img "Terminal State" [ref=e251]
            - generic [ref=e254]:
              - generic [ref=e255]: 02 — Creative Direction · Editorial
              - generic [ref=e256]: "2025"
          - generic [ref=e257]:
            - heading "Terminal State" [level=3] [ref=e258]
            - paragraph [ref=e259]: A typography-driven editorial system for a generative AI studio. Long-form narratives meet kinetic display type and a strict grid — fluid through phone, tablet, and ultrawide.
            - list [ref=e260]:
              - listitem [ref=e261]: Next.js
              - listitem [ref=e262]: GSAP
              - listitem [ref=e263]: Framer Motion
            - paragraph [ref=e264]: "Target: The FWA · FWA of the Day"
      - listitem [ref=e266]:
        - 'link "Open case study: Monolith UI — Design Systems · Engineering, 2025" [ref=e267]':
          - /url: /works/monolith-ui
          - generic [ref=e268]:
            - img "Monolith UI" [ref=e270]
            - generic [ref=e273]:
              - generic [ref=e274]: 03 — Design Systems · Engineering
              - generic [ref=e275]: "2025"
          - generic [ref=e276]:
            - heading "Monolith UI" [level=3] [ref=e277]
            - paragraph [ref=e278]: A design system for an enterprise data platform. Density, contrast, and motion calibrated for power users handling 30K+ daily sessions — now with a token pipeline that ships through Style Dictionary.
            - list [ref=e279]:
              - listitem [ref=e280]: React
              - listitem [ref=e281]: Radix
              - listitem [ref=e282]: TypeScript
              - listitem [ref=e283]: Storybook
            - paragraph [ref=e284]: "Target: CSS Design Awards · UI of the Day"
      - listitem [ref=e286]:
        - 'link "Open case study: Kinetica — Typography · Motion, 2025" [ref=e287]':
          - /url: /works/kinetica
          - generic [ref=e288]:
            - img "Kinetica" [ref=e290]
            - generic [ref=e293]:
              - generic [ref=e294]: 04 — Typography · Motion
              - generic [ref=e295]: "2025"
          - generic [ref=e296]:
            - heading "Kinetica" [level=3] [ref=e297]
            - paragraph [ref=e298]: A kinetic typography study turned product. Variable fonts mapped to scroll, audio amplitude, and reactive cursor velocity — the type behaves like a living organism.
            - list [ref=e299]:
              - listitem [ref=e300]: Variable Fonts
              - listitem [ref=e301]: GSAP
              - listitem [ref=e302]: WebGL
            - paragraph [ref=e303]: — Selected work
      - listitem [ref=e305]:
        - 'link "Open case study: Void Engine — Audio-Visual Experience, 2024" [ref=e306]':
          - /url: /works/void-engine
          - generic [ref=e307]:
            - img "Void Engine" [ref=e309]
            - generic [ref=e312]:
              - generic [ref=e313]: 05 — Audio-Visual Experience
              - generic [ref=e314]: "2024"
          - generic [ref=e315]:
            - heading "Void Engine" [level=3] [ref=e316]
            - paragraph [ref=e317]: A real-time audio-reactive 3D scene rendered with custom raymarching. Audio FFT bins drive volumetric lighting and material color grading — originally an installation, now a web port.
            - list [ref=e318]:
              - listitem [ref=e319]: Three.js
              - listitem [ref=e320]: GLSL
              - listitem [ref=e321]: Web Audio API
            - paragraph [ref=e322]: — Selected work
      - listitem [ref=e324]:
        - 'link "Open case study: CrackIt — Product · AI, 2027" [ref=e325]':
          - /url: /works/crackit
          - generic [ref=e326]:
            - img "CrackIt" [ref=e328]
            - generic [ref=e331]:
              - generic [ref=e332]: 06 — Product · AI
              - generic [ref=e333]: "2027"
          - generic [ref=e334]:
            - heading "CrackIt" [level=3] [ref=e335]
            - paragraph [ref=e336]: Mobile exam-prep companion with a custom RAG pipeline, syllabus-aware quizzes, and a quiet, paper-like interface. 2027 update adds an offline mode and live tutor handoff.
            - list [ref=e337]:
              - listitem [ref=e338]: React Native
              - listitem [ref=e339]: LangChain
              - listitem [ref=e340]: Supabase
            - paragraph [ref=e341]: "Target: Product Hunt · #3 Product of the Day"
      - listitem [ref=e343]:
        - 'link "Open case study: Halcyon OS — AI Workspace · Editorial, 2027" [ref=e344]':
          - /url: /works/halcyon-os
          - generic [ref=e345]:
            - img "Halcyon OS" [ref=e347]
            - generic [ref=e350]:
              - generic [ref=e351]: 07 — AI Workspace · Editorial
              - generic [ref=e352]: "2027"
          - generic [ref=e353]:
            - heading "Halcyon OS" [level=3] [ref=e354]
            - paragraph [ref=e355]: A serene AI-first workspace for writers. Predictive outlines fade in like ambient mist; commands surface contextually instead of through menus.
            - list [ref=e356]:
              - listitem [ref=e357]: Next.js
              - listitem [ref=e358]: OpenAI
              - listitem [ref=e359]: tRPC
              - listitem [ref=e360]: Drizzle
            - paragraph [ref=e361]: — Selected work
      - listitem [ref=e363]:
        - 'link "Open case study: Echo Atlas — Spatial Audio · WebXR, 2027" [ref=e364]':
          - /url: /works/echo-atlas
          - generic [ref=e365]:
            - img "Echo Atlas" [ref=e367]
            - generic [ref=e370]:
              - generic [ref=e371]: 08 — Spatial Audio · WebXR
              - generic [ref=e372]: "2027"
          - generic [ref=e373]:
            - heading "Echo Atlas" [level=3] [ref=e374]
            - paragraph [ref=e375]: Walk through a sound-mapped city in your browser. WebXR-ready, but designed first for keyboard + mouse — binaural audio steered by your gaze.
            - list [ref=e376]:
              - listitem [ref=e377]: Three.js
              - listitem [ref=e378]: WebXR
              - listitem [ref=e379]: Web Audio API
            - paragraph [ref=e380]: — Selected work
    - generic [ref=e382]:
      - generic [ref=e383]:
        - heading "The Archive" [level=2] [ref=e384]
        - link "Full Archive" [ref=e385]:
          - /url: /archive
          - text: Full Archive
          - generic [ref=e386]: ↗
      - list [ref=e387]:
        - listitem [ref=e388]:
          - generic [ref=e389]: "2027"
          - generic [ref=e390]: Halcyon OS
          - generic [ref=e391]: AI Workspace
          - generic [ref=e392]: Product Design
        - listitem [ref=e393]:
          - generic [ref=e394]: "2027"
          - generic [ref=e395]: Echo Atlas
          - generic [ref=e396]: Spatial / WebXR
          - generic [ref=e397]: Concept · WebGL
        - listitem [ref=e398]:
          - generic [ref=e399]: "2027"
          - generic [ref=e400]: Aura Void v2
          - generic [ref=e401]: WebGL
          - generic [ref=e402]: Creative Direction
        - listitem [ref=e403]:
          - generic [ref=e404]: "2027"
          - generic [ref=e405]: CrackIt 3.0
          - generic [ref=e406]: Product / AI
          - generic [ref=e407]: Product · Engineering
        - listitem [ref=e408]:
          - generic [ref=e409]: "2026"
          - generic [ref=e410]: Studio Press
          - generic [ref=e411]: Editorial
          - generic [ref=e412]: Solo · End-to-end
        - listitem [ref=e413]:
          - generic [ref=e414]: "2025"
          - generic [ref=e415]: Terminal State
          - generic [ref=e416]: Editorial
          - generic [ref=e417]: Art Direction
  - contentinfo [ref=e419]:
    - region "Studio status" [ref=e420]:
      - generic [ref=e421]:
        - generic [ref=e422]:
          - generic [ref=e425]: 21:48 BD
          - generic [ref=e426]: ·
          - generic [ref=e427]: Joypurhat · BD
          - generic [ref=e428]: ·
          - generic [ref=e429]: 176 GH
          - generic [ref=e430]: ·
          - generic [ref=e431]: MMXXVII
          - generic [ref=e432]: ·
          - link "University of the People — B.Sc. Computer Science (in progress)" [ref=e433]:
            - /url: https://www.uopeople.edu/
            - text: B.Sc. CS · UoPeople
          - generic [ref=e434]: ·
          - generic "Time until MMXXVII (2027-01-01, Asia/Dhaka)" [ref=e435]:
            - text: → 186d 02h 11m
            - generic [ref=e436]: MMXXVII
        - link "Open from Q1 ’27 — booking through Q4 ’27" [ref=e437]:
          - /url: /contact
          - text: Open from Q1 ’27 — booking through Q4 ’27
          - generic [ref=e439]: ↗
    - generic [ref=e440]:
      - generic [ref=e441]:
        - generic [ref=e442]:
          - paragraph [ref=e443]: ◊ Open from Q1 ’27 — booking through Q4 ’27 · Selected projects
          - heading "Have an idea? Let's build it." [level=2] [ref=e444]:
            - generic [ref=e445]: Have an idea?
            - generic [ref=e446]: Let's build it.
          - generic [ref=e447]:
            - link "hello@delowarhossain.dev" [ref=e448]:
              - /url: /contact
              - text: hello@delowarhossain.dev
              - generic [ref=e449]: ↗
            - button "Copy email address to clipboard" [ref=e450]: ⎘
        - generic [ref=e451]:
          - generic [ref=e452]:
            - paragraph [ref=e453]: Pages
            - list [ref=e454]:
              - listitem [ref=e455]:
                - link "Index" [ref=e456]:
                  - /url: /
              - listitem [ref=e457]:
                - link "Works" [ref=e458]:
                  - /url: /works
              - listitem [ref=e459]:
                - link "Lab" [ref=e460]:
                  - /url: /lab
              - listitem [ref=e461]:
                - link "Process" [ref=e462]:
                  - /url: /process
              - listitem [ref=e463]:
                - link "About" [ref=e464]:
                  - /url: /about
              - listitem [ref=e465]:
                - link "Resume" [ref=e466]:
                  - /url: /resume
              - listitem [ref=e467]:
                - link "Journal" [ref=e468]:
                  - /url: /journal
              - listitem [ref=e469]:
                - link "Services" [ref=e470]:
                  - /url: /services
              - listitem [ref=e471]:
                - link "Uses" [ref=e472]:
                  - /url: /uses
              - listitem [ref=e473]:
                - link "Contact" [ref=e474]:
                  - /url: /contact
              - listitem [ref=e475]:
                - link "AI Summary" [ref=e476]:
                  - /url: /ai
          - generic [ref=e477]:
            - paragraph [ref=e478]: Connect
            - list [ref=e479]:
              - listitem [ref=e480]:
                - link "GITHUB" [ref=e481]:
                  - /url: https://github.com/mdhossain-2437
              - listitem [ref=e482]:
                - link "LINKEDIN" [ref=e483]:
                  - /url: https://www.linkedin.com/in/mdhossain2437
              - listitem [ref=e484]:
                - link "TWITTER" [ref=e485]:
                  - /url: https://twitter.com/mdhossain2437
              - listitem [ref=e486]:
                - link "INSTAGRAM" [ref=e487]:
                  - /url: https://www.instagram.com/mdhossain2437
              - listitem [ref=e488]:
                - link "FACEBOOK" [ref=e489]:
                  - /url: https://www.facebook.com/mdhossain2437
              - listitem [ref=e490]:
                - link "READ.CV" [ref=e491]:
                  - /url: https://read.cv/delowar
          - generic [ref=e492]:
            - paragraph [ref=e493]: Studio
            - list [ref=e494]:
              - listitem [ref=e495]:
                - link "Now" [ref=e496]:
                  - /url: /now
              - listitem [ref=e497]:
                - link "Uses" [ref=e498]:
                  - /url: /uses
              - listitem [ref=e499]:
                - link "Brand" [ref=e500]:
                  - /url: /brand
              - listitem [ref=e501]:
                - link "Colors" [ref=e502]:
                  - /url: /colors
              - listitem [ref=e503]:
                - link "Changelog" [ref=e504]:
                  - /url: /changelog
              - listitem [ref=e505]:
                - link "Showreel" [ref=e506]:
                  - /url: /showreel
              - listitem [ref=e507]:
                - link "Atlas" [ref=e508]:
                  - /url: /atlas
              - listitem [ref=e509]:
                - link "Recognition" [ref=e510]:
                  - /url: /awards
              - listitem [ref=e511]:
                - link "Achievements" [ref=e512]:
                  - /url: /achievements
              - listitem [ref=e513]:
                - link "Colophon" [ref=e514]:
                  - /url: /colophon
              - listitem [ref=e515]:
                - link "Privacy" [ref=e516]:
                  - /url: /legal/privacy
              - listitem [ref=e517]:
                - link "Terms" [ref=e518]:
                  - /url: /legal/terms
      - generic [ref=e519]:
        - generic [ref=e520]:
          - paragraph [ref=e521]: ◌ Signed
          - img "Delowar Hossain signature" [ref=e522]:
            - generic [ref=e524]: Delowar Hossain
        - paragraph [ref=e526]: handwritten in vector — strokes draw on view
      - generic [ref=e527]:
        - button "Quote of the day — click to copy" [ref=e529]:
          - generic [ref=e530]: ◊ Quote of the day · 206 / 365
          - generic [ref=e531]: “A particle system with art direction is weather.”
        - paragraph [ref=e532]:
          - text: ◌ A new quote rotates in at 00:00 UTC.
          - text: Click to copy. Three hundred sixty-five total.
      - generic [ref=e535]:
        - generic [ref=e536]:
          - generic [ref=e537]: DELOWAR HOSSAIN
          - generic [ref=e538]: •
        - generic [ref=e539]:
          - generic [ref=e540]: CREATIVE DEVELOPER
          - generic [ref=e541]: •
        - generic [ref=e542]:
          - generic [ref=e543]: UI / UX DESIGNER
          - generic [ref=e544]: •
        - generic [ref=e545]:
          - generic [ref=e546]: WEBGL · THREE.JS · GLSL
          - generic [ref=e547]: •
        - generic [ref=e548]:
          - generic [ref=e549]: OPEN FROM Q1 ’27 — BOOKING THROUGH Q4 ’27
          - generic [ref=e550]: •
        - generic [ref=e551]:
          - generic [ref=e552]: JOYPURHAT, BANGLADESH
          - generic [ref=e553]: •
        - generic [ref=e554]:
          - generic [ref=e555]: MMXXVII / 03.27
          - generic [ref=e556]: •
        - generic [ref=e557]:
          - generic [ref=e558]: DELOWAR HOSSAIN · MMXXVII
          - generic [ref=e559]: •
        - generic [ref=e560]:
          - generic [ref=e561]: DELOWAR HOSSAIN
          - generic [ref=e562]: •
        - generic [ref=e563]:
          - generic [ref=e564]: CREATIVE DEVELOPER
          - generic [ref=e565]: •
        - generic [ref=e566]:
          - generic [ref=e567]: UI / UX DESIGNER
          - generic [ref=e568]: •
        - generic [ref=e569]:
          - generic [ref=e570]: WEBGL · THREE.JS · GLSL
          - generic [ref=e571]: •
        - generic [ref=e572]:
          - generic [ref=e573]: OPEN FROM Q1 ’27 — BOOKING THROUGH Q4 ’27
          - generic [ref=e574]: •
        - generic [ref=e575]:
          - generic [ref=e576]: JOYPURHAT, BANGLADESH
          - generic [ref=e577]: •
        - generic [ref=e578]:
          - generic [ref=e579]: MMXXVII / 03.27
          - generic [ref=e580]: •
        - generic [ref=e581]:
          - generic [ref=e582]: DELOWAR HOSSAIN · MMXXVII
          - generic [ref=e583]: •
      - generic [ref=e584]:
        - paragraph [ref=e585]:
          - text: © 2027
          - button "Studio mark" [ref=e586]: The Compiled Thought
          - text: . All rights reserved · MMXXVII.
        - paragraph [ref=e587]:
          - text: Lat. 25.10° N · Long. 89.02° E · Joypurhat, Bangladesh ·
          - generic [ref=e588]: 21:48:29
          - text: BST
        - generic [ref=e589]:
          - link "◇ local" [ref=e590]:
            - /url: https://github.com/mdhossain-2437/Creative-Folio
          - button "Toggle motion" [ref=e591]:
            - generic [ref=e594]: Motion On
          - generic [ref=e595]: v MMXXVII / 03.27
  - alert [ref=e596]
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