# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> Smoke tests - critical routes >> should have no accessibility violations on /services
- Location: e2e\smoke.spec.ts:47:9

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -   1
+ Received  + 531

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
+         "html": "<ul class=\"mt-16 grid grid-cols-1 gap-px overflow-hidden bg-warmwhite/15 md:grid-cols-3\">",
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
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".gap-px.md\\:grid-cols-3.mt-16 > .reveal:nth-child(1)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".gap-px.md\\:grid-cols-3.mt-16 > .reveal:nth-child(2)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".gap-px.md\\:grid-cols-3.mt-16 > .reveal:nth-child(3)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "target": Array [
+           ".gap-px.md\\:grid-cols-3.mt-16",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [],
+         "failureSummary": "Fix all of the following:
+   List element has direct children that are not allowed: div",
+         "html": "<ul class=\"mt-12 space-y-px overflow-hidden bg-warmwhite/15\">",
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
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".space-y-px > .reveal:nth-child(1)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".space-y-px > .reveal:nth-child(2)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".space-y-px > .reveal:nth-child(3)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".space-y-px > .reveal:nth-child(4)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "target": Array [
+           ".space-y-px",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [],
+         "failureSummary": "Fix all of the following:
+   List element has direct children that are not allowed: div",
+         "html": "<ol class=\"mt-16 grid grid-cols-1 gap-px overflow-hidden bg-warmwhite/15 md:grid-cols-4\">",
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
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   "ol > .reveal:nth-child(1)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   "ol > .reveal:nth-child(2)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   "ol > .reveal:nth-child(3)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   "ol > .reveal:nth-child(4)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "target": Array [
+           "ol",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [],
+         "failureSummary": "Fix all of the following:
+   List element has direct children that are not allowed: div",
+         "html": "<ul class=\"md:col-span-9 grid grid-cols-1 gap-6 md:grid-cols-3\">",
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
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".md\\:grid-cols-3.md\\:col-span-9.gap-6 > .reveal:nth-child(1)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".md\\:grid-cols-3.md\\:col-span-9.gap-6 > .reveal:nth-child(2)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".md\\:grid-cols-3.md\\:col-span-9.gap-6 > .reveal:nth-child(3)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "target": Array [
+           ".md\\:grid-cols-3.md\\:col-span-9.gap-6",
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
+         "html": "<li class=\"relative flex h-full flex-col gap-7 bg-ink-900 p-8 md:p-10\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(1) > .gap-7.md\\:p-10.relative",
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
+         "html": "<li class=\"relative flex h-full flex-col gap-7 bg-ink-900 p-8 md:p-10\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(2) > .gap-7.md\\:p-10.relative",
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
+         "html": "<li class=\"relative flex h-full flex-col gap-7 bg-ink-900 p-8 md:p-10\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(3) > .gap-7.md\\:p-10.relative",
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
+         "html": "<li class=\"grid grid-cols-1 gap-6 bg-ink-900 p-8 md:grid-cols-12 md:gap-10 md:p-12\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(1) > .md\\:gap-10.md\\:p-12.gap-6",
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
+         "html": "<li class=\"grid grid-cols-1 gap-6 bg-ink-900 p-8 md:grid-cols-12 md:gap-10 md:p-12\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(2) > .md\\:gap-10.md\\:p-12.gap-6",
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
+         "html": "<li class=\"grid grid-cols-1 gap-6 bg-ink-900 p-8 md:grid-cols-12 md:gap-10 md:p-12\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(3) > .md\\:gap-10.md\\:p-12.gap-6",
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
+         "html": "<li class=\"grid grid-cols-1 gap-6 bg-ink-900 p-8 md:grid-cols-12 md:gap-10 md:p-12\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(4) > .md\\:gap-10.md\\:p-12.gap-6",
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
+         "html": "<li class=\"flex h-full flex-col gap-6 bg-ink-950 p-8 md:p-10\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(1) > .md\\:p-10.bg-ink-950.gap-6",
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
+         "html": "<li class=\"flex h-full flex-col gap-6 bg-ink-950 p-8 md:p-10\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(2) > .md\\:p-10.bg-ink-950.gap-6",
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
+         "html": "<li class=\"flex h-full flex-col gap-6 bg-ink-950 p-8 md:p-10\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(3) > .md\\:p-10.bg-ink-950.gap-6",
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
+         "html": "<li class=\"flex h-full flex-col gap-6 bg-ink-950 p-8 md:p-10\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(4) > .md\\:p-10.bg-ink-950.gap-6",
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
+         "html": "<li class=\"aura relative flex h-full flex-col gap-5 rounded-md border border-warmwhite/15 bg-ink-900 p-8\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(1) > .aura.gap-5.rounded-md",
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
+         "html": "<li class=\"aura relative flex h-full flex-col gap-5 rounded-md border border-warmwhite/15 bg-ink-900 p-8\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(2) > .aura.gap-5.rounded-md",
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
+         "html": "<li class=\"aura relative flex h-full flex-col gap-5 rounded-md border border-warmwhite/15 bg-ink-900 p-8\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(3) > .aura.gap-5.rounded-md",
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
        - listitem [ref=e32]:
          - link "Services" [ref=e33]:
            - /url: /services
            - generic [ref=e34]: Services
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
      - paragraph [ref=e50]: § Services & Process
      - heading "Expertise & Engagements." [level=1] [ref=e51]:
        - generic [ref=e54]: Expertise
        - generic [ref=e56]:
          - generic [ref=e58]: "&"
          - generic [ref=e60]: Engagements.
      - generic [ref=e61]:
        - paragraph [ref=e62]: Specialising in high-end digital experiences. Merging technical precision with editorial art direction to create recognition-ready interactive platforms.
        - list [ref=e63]:
          - listitem [ref=e64]:
            - paragraph [ref=e65]: Booking
            - paragraph [ref=e66]: Q1 — Q4 / 2027
          - listitem [ref=e67]:
            - paragraph [ref=e68]: Models
            - paragraph [ref=e69]: Project · Retainer
          - listitem [ref=e70]:
            - paragraph [ref=e71]: Industries
            - paragraph [ref=e72]: SaaS · AI · Studios
          - listitem [ref=e73]:
            - paragraph [ref=e74]: Time zone
            - paragraph [ref=e75]: GMT+6
      - generic [ref=e77]:
        - link "Start a Project" [ref=e78]:
          - /url: /contact
          - text: Start a Project
          - generic [ref=e79]: ↗
        - link "See Selected Works" [ref=e80]:
          - /url: /works
          - text: See Selected Works
          - generic [ref=e81]: ↗
    - generic [ref=e83]:
      - generic [ref=e84]:
        - paragraph [ref=e85]: ◊ Tiers
        - heading "Three ways to work together." [level=2] [ref=e86]
      - list [ref=e87]:
        - listitem [ref=e89]:
          - generic [ref=e90]:
            - generic [ref=e91]: §01
            - generic [ref=e92]: 2–3 weeks
          - heading "Sprint" [level=3] [ref=e93]
          - paragraph [ref=e94]: A focused 2–3 week burst. We pick one painful surface and turn it into a high-fidelity, production-ready slice.
          - list [ref=e95]:
            - listitem [ref=e96]:
              - generic [ref=e98]: 1 hero / landing surface
            - listitem [ref=e99]:
              - generic [ref=e101]: 1 motion system + interaction spec
            - listitem [ref=e102]:
              - generic [ref=e104]: Hand-off + Loom walkthrough
          - generic [ref=e105]:
            - generic [ref=e106]:
              - paragraph [ref=e107]: Best for
              - paragraph [ref=e108]: Pre-seed teams who need a hero moment yesterday.
            - generic [ref=e109]:
              - paragraph [ref=e110]: From
              - paragraph [ref=e111]: From $4,800
        - listitem [ref=e113]:
          - generic [ref=e114]:
            - generic [ref=e115]: §02
            - generic [ref=e116]: 6–9 weeks
          - heading "Engagement" [level=3] [ref=e117]
          - paragraph [ref=e118]: A 6–9 week embedded build covering everything from art direction to shipped front-end.
          - list [ref=e119]:
            - listitem [ref=e120]:
              - generic [ref=e122]: Full marketing site (8–12 routes)
            - listitem [ref=e123]:
              - generic [ref=e125]: Custom WebGL hero / interaction layer
            - listitem [ref=e126]:
              - generic [ref=e128]: Editorial typography + design tokens
            - listitem [ref=e129]:
              - generic [ref=e131]: CMS-ready handover (MDX or Sanity)
          - generic [ref=e132]:
            - generic [ref=e133]:
              - paragraph [ref=e134]: Best for
              - paragraph [ref=e135]: Series-A studios shipping a flagship site of the year contender.
            - generic [ref=e136]:
              - paragraph [ref=e137]: From
              - paragraph [ref=e138]: From $14,400
        - listitem [ref=e140]:
          - generic [ref=e141]:
            - generic [ref=e142]: §03
            - generic [ref=e143]: 3–6 month minimums
          - heading "Retainer" [level=3] [ref=e144]
          - paragraph [ref=e145]: "A monthly partnership: I’m the always-on creative partner for your most ambitious moments."
          - list [ref=e146]:
            - listitem [ref=e147]:
              - generic [ref=e149]: Weekly creative direction + paired build sessions
            - listitem [ref=e150]:
              - generic [ref=e152]: Quarterly identity + motion refresh
            - listitem [ref=e153]:
              - generic [ref=e155]: Award submissions + launch press kits
            - listitem [ref=e156]:
              - generic [ref=e158]: Performance + accessibility quarterly review
          - generic [ref=e159]:
            - generic [ref=e160]:
              - paragraph [ref=e161]: Best for
              - paragraph [ref=e162]: In-house creative teams that need a senior partner without a senior hire.
            - generic [ref=e163]:
              - paragraph [ref=e164]: From
              - paragraph [ref=e165]: $8,800/mo
    - generic [ref=e167]:
      - paragraph [ref=e168]: ◊ Capabilities · what each tier draws from
      - list [ref=e169]:
        - listitem [ref=e171]:
          - generic [ref=e172]: "01"
          - heading "Creative Development" [level=3] [ref=e173]
          - paragraph [ref=e174]: Pushing the boundaries of the browser. Custom 3D environments, complex shader materials, and fluid particle systems that respond to interaction with microscopic precision.
          - list [ref=e175]:
            - listitem [ref=e176]: WebGL
            - listitem [ref=e177]: Three.js
            - listitem [ref=e178]: GLSL
            - listitem [ref=e179]: GSAP
        - listitem [ref=e181]:
          - generic [ref=e182]: "02"
          - heading "UI / UX Design" [level=3] [ref=e183]
          - paragraph [ref=e184]: Crafting minimalist, intuitive interfaces that prioritise content and motion. Rigid grids and editorial whitespace to frame digital narratives effectively.
          - list [ref=e185]:
            - listitem [ref=e186]: UI / UX
            - listitem [ref=e187]: Design Systems
            - listitem [ref=e188]: Webflow
            - listitem [ref=e189]: Framer
        - listitem [ref=e191]:
          - generic [ref=e192]: "03"
          - heading "Art Direction" [level=3] [ref=e193]
          - paragraph [ref=e194]: Defining the visual language. From typography selection to color grading and motion choreography, every pixel aligns with the core brand identity.
          - list [ref=e195]:
            - listitem [ref=e196]: Art Direction
            - listitem [ref=e197]: Logo & Branding
            - listitem [ref=e198]: Typography
            - listitem [ref=e199]: Motion
        - listitem [ref=e201]:
          - generic [ref=e202]: "04"
          - heading "Full-Stack Engineering" [level=3] [ref=e203]
          - paragraph [ref=e204]: Production-grade systems with AI integration. Full-stack architecture, edge deployments, real-time pipelines, and pragmatic dev-ex.
          - list [ref=e205]:
            - listitem [ref=e206]: Next.js
            - listitem [ref=e207]: Node / Python
            - listitem [ref=e208]: AI / RAG
            - listitem [ref=e209]: DevOps
    - generic [ref=e211]:
      - generic [ref=e212]:
        - paragraph [ref=e213]: ◊ Process
        - heading "Concept to Shader." [level=2] [ref=e214]
      - list [ref=e215]:
        - listitem [ref=e217]:
          - generic [ref=e218]: Phase I
          - heading "Discovery" [level=3] [ref=e219]
          - paragraph [ref=e220]: Understand narrative constraints. Map the audience, the systems, and the technical envelope before a single pixel.
        - listitem [ref=e222]:
          - generic [ref=e223]: Phase II
          - heading "Design" [level=3] [ref=e224]
          - paragraph [ref=e225]: Establish the visual grid, typography rules, and static art direction. Prototype the silence between elements.
        - listitem [ref=e227]:
          - generic [ref=e228]: Phase III
          - heading "Prototype" [level=3] [ref=e229]
          - paragraph [ref=e230]: Draft core WebGL scenes, motion curves, and the choreography between page transitions and content systems.
        - listitem [ref=e232]:
          - generic [ref=e233]: Phase IV
          - heading "Production" [level=3] [ref=e234]
          - paragraph [ref=e235]: Write custom GLSL shaders, build the engineering layer, ship with measurable performance and accessibility.
    - generic [ref=e237]:
      - paragraph [ref=e239]: ◊ Engagements
      - list [ref=e240]:
        - listitem [ref=e242]:
          - paragraph [ref=e243]: Fixed scope, 4 — 12 weeks
          - heading "Project" [level=3] [ref=e244]
          - paragraph [ref=e245]: Sites, microsites, and case-study pages. Discovery → Production with measurable performance and a public outcome.
        - listitem [ref=e247]:
          - paragraph [ref=e248]: Monthly, 30h+
          - heading "Retainer" [level=3] [ref=e249]
          - paragraph [ref=e250]: Ongoing creative engineering, motion systems and design support. For studios and AI-native product teams shipping quickly.
        - listitem [ref=e252]:
          - paragraph [ref=e253]: Long-term, embedded
          - heading "Studio Lead" [level=3] [ref=e254]
          - paragraph [ref=e255]: Lead creative engineering inside a product team. Build motion systems, hire, and codify a craft language.
  - contentinfo [ref=e257]:
    - region "Studio status" [ref=e258]:
      - generic [ref=e259]:
        - generic [ref=e260]:
          - generic [ref=e263]: 21:49 BD
          - generic [ref=e264]: ·
          - generic [ref=e265]: Joypurhat · BD
          - generic [ref=e266]: ·
          - generic [ref=e267]: 176 GH
          - generic [ref=e268]: ·
          - generic [ref=e269]: MMXXVII
          - generic [ref=e270]: ·
          - link "University of the People — B.Sc. Computer Science (in progress)" [ref=e271]:
            - /url: https://www.uopeople.edu/
            - text: B.Sc. CS · UoPeople
          - generic [ref=e272]: ·
          - generic "Time until MMXXVII (2027-01-01, Asia/Dhaka)" [ref=e273]:
            - text: → 186d 02h 10m
            - generic [ref=e274]: MMXXVII
        - link "Open from Q1 ’27 — booking through Q4 ’27" [ref=e275]:
          - /url: /contact
          - text: Open from Q1 ’27 — booking through Q4 ’27
          - generic [ref=e277]: ↗
    - generic [ref=e278]:
      - generic [ref=e279]:
        - generic [ref=e280]:
          - paragraph [ref=e281]: ◊ Open from Q1 ’27 — booking through Q4 ’27 · Selected projects
          - heading "Have an idea? Let's build it." [level=2] [ref=e282]:
            - generic [ref=e283]: Have an idea?
            - generic [ref=e284]: Let's build it.
          - generic [ref=e285]:
            - link "hello@delowarhossain.dev" [ref=e286]:
              - /url: /contact
              - text: hello@delowarhossain.dev
              - generic [ref=e287]: ↗
            - button "Copy email address to clipboard" [ref=e288]: ⎘
        - generic [ref=e289]:
          - generic [ref=e290]:
            - paragraph [ref=e291]: Pages
            - list [ref=e292]:
              - listitem [ref=e293]:
                - link "Index" [ref=e294]:
                  - /url: /
              - listitem [ref=e295]:
                - link "Works" [ref=e296]:
                  - /url: /works
              - listitem [ref=e297]:
                - link "Lab" [ref=e298]:
                  - /url: /lab
              - listitem [ref=e299]:
                - link "Process" [ref=e300]:
                  - /url: /process
              - listitem [ref=e301]:
                - link "About" [ref=e302]:
                  - /url: /about
              - listitem [ref=e303]:
                - link "Resume" [ref=e304]:
                  - /url: /resume
              - listitem [ref=e305]:
                - link "Journal" [ref=e306]:
                  - /url: /journal
              - listitem [ref=e307]:
                - link "Services" [ref=e308]:
                  - /url: /services
              - listitem [ref=e309]:
                - link "Uses" [ref=e310]:
                  - /url: /uses
              - listitem [ref=e311]:
                - link "Contact" [ref=e312]:
                  - /url: /contact
              - listitem [ref=e313]:
                - link "AI Summary" [ref=e314]:
                  - /url: /ai
          - generic [ref=e315]:
            - paragraph [ref=e316]: Connect
            - list [ref=e317]:
              - listitem [ref=e318]:
                - link "GITHUB" [ref=e319]:
                  - /url: https://github.com/mdhossain-2437
              - listitem [ref=e320]:
                - link "LINKEDIN" [ref=e321]:
                  - /url: https://www.linkedin.com/in/mdhossain2437
              - listitem [ref=e322]:
                - link "TWITTER" [ref=e323]:
                  - /url: https://twitter.com/mdhossain2437
              - listitem [ref=e324]:
                - link "INSTAGRAM" [ref=e325]:
                  - /url: https://www.instagram.com/mdhossain2437
              - listitem [ref=e326]:
                - link "FACEBOOK" [ref=e327]:
                  - /url: https://www.facebook.com/mdhossain2437
              - listitem [ref=e328]:
                - link "READ.CV" [ref=e329]:
                  - /url: https://read.cv/delowar
          - generic [ref=e330]:
            - paragraph [ref=e331]: Studio
            - list [ref=e332]:
              - listitem [ref=e333]:
                - link "Now" [ref=e334]:
                  - /url: /now
              - listitem [ref=e335]:
                - link "Uses" [ref=e336]:
                  - /url: /uses
              - listitem [ref=e337]:
                - link "Brand" [ref=e338]:
                  - /url: /brand
              - listitem [ref=e339]:
                - link "Colors" [ref=e340]:
                  - /url: /colors
              - listitem [ref=e341]:
                - link "Changelog" [ref=e342]:
                  - /url: /changelog
              - listitem [ref=e343]:
                - link "Showreel" [ref=e344]:
                  - /url: /showreel
              - listitem [ref=e345]:
                - link "Atlas" [ref=e346]:
                  - /url: /atlas
              - listitem [ref=e347]:
                - link "Recognition" [ref=e348]:
                  - /url: /awards
              - listitem [ref=e349]:
                - link "Achievements" [ref=e350]:
                  - /url: /achievements
              - listitem [ref=e351]:
                - link "Colophon" [ref=e352]:
                  - /url: /colophon
              - listitem [ref=e353]:
                - link "Privacy" [ref=e354]:
                  - /url: /legal/privacy
              - listitem [ref=e355]:
                - link "Terms" [ref=e356]:
                  - /url: /legal/terms
      - generic [ref=e357]:
        - generic [ref=e358]:
          - paragraph [ref=e359]: ◌ Signed
          - img "Delowar Hossain signature" [ref=e360]:
            - generic [ref=e362]: Delowar Hossain
        - paragraph [ref=e364]: handwritten in vector — strokes draw on view
      - generic [ref=e365]:
        - button "Quote of the day — click to copy" [ref=e367]:
          - generic [ref=e368]: ◊ Quote of the day · 206 / 365
          - generic [ref=e369]: “A particle system with art direction is weather.”
        - paragraph [ref=e370]:
          - text: ◌ A new quote rotates in at 00:00 UTC.
          - text: Click to copy. Three hundred sixty-five total.
      - generic [ref=e373]:
        - generic [ref=e374]:
          - generic [ref=e375]: DELOWAR HOSSAIN
          - generic [ref=e376]: •
        - generic [ref=e377]:
          - generic [ref=e378]: CREATIVE DEVELOPER
          - generic [ref=e379]: •
        - generic [ref=e380]:
          - generic [ref=e381]: UI / UX DESIGNER
          - generic [ref=e382]: •
        - generic [ref=e383]:
          - generic [ref=e384]: WEBGL · THREE.JS · GLSL
          - generic [ref=e385]: •
        - generic [ref=e386]:
          - generic [ref=e387]: OPEN FROM Q1 ’27 — BOOKING THROUGH Q4 ’27
          - generic [ref=e388]: •
        - generic [ref=e389]:
          - generic [ref=e390]: JOYPURHAT, BANGLADESH
          - generic [ref=e391]: •
        - generic [ref=e392]:
          - generic [ref=e393]: MMXXVII / 03.27
          - generic [ref=e394]: •
        - generic [ref=e395]:
          - generic [ref=e396]: DELOWAR HOSSAIN · MMXXVII
          - generic [ref=e397]: •
        - generic [ref=e398]:
          - generic [ref=e399]: DELOWAR HOSSAIN
          - generic [ref=e400]: •
        - generic [ref=e401]:
          - generic [ref=e402]: CREATIVE DEVELOPER
          - generic [ref=e403]: •
        - generic [ref=e404]:
          - generic [ref=e405]: UI / UX DESIGNER
          - generic [ref=e406]: •
        - generic [ref=e407]:
          - generic [ref=e408]: WEBGL · THREE.JS · GLSL
          - generic [ref=e409]: •
        - generic [ref=e410]:
          - generic [ref=e411]: OPEN FROM Q1 ’27 — BOOKING THROUGH Q4 ’27
          - generic [ref=e412]: •
        - generic [ref=e413]:
          - generic [ref=e414]: JOYPURHAT, BANGLADESH
          - generic [ref=e415]: •
        - generic [ref=e416]:
          - generic [ref=e417]: MMXXVII / 03.27
          - generic [ref=e418]: •
        - generic [ref=e419]:
          - generic [ref=e420]: DELOWAR HOSSAIN · MMXXVII
          - generic [ref=e421]: •
      - generic [ref=e422]:
        - paragraph [ref=e423]:
          - text: © 2027
          - button "Studio mark" [ref=e424]: The Compiled Thought
          - text: . All rights reserved · MMXXVII.
        - paragraph [ref=e425]:
          - text: Lat. 25.10° N · Long. 89.02° E · Joypurhat, Bangladesh ·
          - generic [ref=e426]: 21:49:10
          - text: BST
        - generic [ref=e427]:
          - link "◇ local" [ref=e428]:
            - /url: https://github.com/mdhossain-2437/Creative-Folio
          - button "Toggle motion" [ref=e429]:
            - generic [ref=e432]: Motion On
          - generic [ref=e433]: v MMXXVII / 03.27
  - alert [ref=e434]
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