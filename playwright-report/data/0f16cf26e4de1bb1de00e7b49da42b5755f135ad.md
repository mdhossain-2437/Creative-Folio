# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> Smoke tests - critical routes >> should have no accessibility violations on /about
- Location: e2e\smoke.spec.ts:47:9

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -   1
+ Received  + 430

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
+         "html": "<ol class=\"md:col-span-9\">",
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
+                   "#education > .md\\:grid-cols-12.mx-auto.max-w-\\[1640px\\] > ol > .reveal:nth-child(1)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.05s;\">",
+                 "target": Array [
+                   "#education > .md\\:grid-cols-12.mx-auto.max-w-\\[1640px\\] > ol > .reveal:nth-child(2)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "target": Array [
+           "#education > .md\\:grid-cols-12.mx-auto.max-w-\\[1640px\\] > ol",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [],
+         "failureSummary": "Fix all of the following:
+   List element has direct children that are not allowed: div",
+         "html": "<ul class=\"md:col-span-8 grid grid-cols-1 gap-3 md:grid-cols-2\">",
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
+                   ".md\\:col-span-8.md\\:grid-cols-2 > .reveal:nth-child(1)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.04s;\">",
+                 "target": Array [
+                   ".md\\:col-span-8.md\\:grid-cols-2 > .reveal:nth-child(2)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.08s;\">",
+                 "target": Array [
+                   ".md\\:col-span-8.md\\:grid-cols-2 > .reveal:nth-child(3)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.12s;\">",
+                 "target": Array [
+                   ".md\\:col-span-8.md\\:grid-cols-2 > .reveal:nth-child(4)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.16s;\">",
+                 "target": Array [
+                   ".reveal:nth-child(5)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "target": Array [
+           ".md\\:col-span-8.md\\:grid-cols-2",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [],
+         "failureSummary": "Fix all of the following:
+   List element has direct children that are not allowed: div",
+         "html": "<ol class=\"md:col-span-9\">",
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
+                   "#journey > .md\\:grid-cols-12.mx-auto.max-w-\\[1640px\\] > ol > .reveal:nth-child(1)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.05s;\">",
+                 "target": Array [
+                   "#journey > .md\\:grid-cols-12.mx-auto.max-w-\\[1640px\\] > ol > .reveal:nth-child(2)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.1s;\">",
+                 "target": Array [
+                   "ol > .reveal:nth-child(3)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.15s;\">",
+                 "target": Array [
+                   "ol > .reveal:nth-child(4)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "target": Array [
+           "#journey > .md\\:grid-cols-12.mx-auto.max-w-\\[1640px\\] > ol",
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
+         "html": "<li class=\"grid grid-cols-12 items-baseline gap-4 border-b border-warmwhite/15 py-7 last:border-b-0\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(1) > .py-7.grid-cols-12.last\\:border-b-0",
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
+         "html": "<li class=\"grid grid-cols-12 items-baseline gap-4 border-b border-warmwhite/15 py-7 last:border-b-0\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(2) > .py-7.grid-cols-12.last\\:border-b-0",
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
+         "html": "<li class=\"flex flex-col gap-2 rounded-2xl border border-warmwhite/15 bg-ink-950 p-5\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(1) > .p-5.rounded-2xl.gap-2",
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
+         "html": "<li class=\"flex flex-col gap-2 rounded-2xl border border-warmwhite/15 bg-ink-950 p-5\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(2) > .p-5.rounded-2xl.gap-2",
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
+         "html": "<li class=\"flex flex-col gap-2 rounded-2xl border border-warmwhite/15 bg-ink-950 p-5\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(3) > .p-5.rounded-2xl.gap-2",
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
+         "html": "<li class=\"flex flex-col gap-2 rounded-2xl border border-warmwhite/15 bg-ink-950 p-5\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(4) > .p-5.rounded-2xl.gap-2",
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
+         "html": "<li class=\"flex flex-col gap-2 rounded-2xl border border-warmwhite/15 bg-ink-950 p-5\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(5) > .p-5.rounded-2xl.gap-2",
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
+         "html": "<li class=\"grid grid-cols-12 items-baseline gap-4 border-b border-warmwhite/15 py-8 last:border-b-0\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(1) > .py-8.grid-cols-12.last\\:border-b-0",
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
+         "html": "<li class=\"grid grid-cols-12 items-baseline gap-4 border-b border-warmwhite/15 py-8 last:border-b-0\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(2) > .py-8.grid-cols-12.last\\:border-b-0",
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
+         "html": "<li class=\"grid grid-cols-12 items-baseline gap-4 border-b border-warmwhite/15 py-8 last:border-b-0\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(3) > .py-8.grid-cols-12.last\\:border-b-0",
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
+         "html": "<li class=\"grid grid-cols-12 items-baseline gap-4 border-b border-warmwhite/15 py-8 last:border-b-0\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(4) > .py-8.grid-cols-12.last\\:border-b-0",
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
  - navigation "Section progress":
    - list [ref=e3]:
      - listitem [ref=e4]:
        - generic: Philosophy
        - link "Jump to Philosophy" [ref=e5]:
          - /url: "#philosophy"
      - listitem [ref=e6]:
        - generic: Signals
        - link "Jump to Signals" [ref=e7]:
          - /url: "#signals"
      - listitem [ref=e8]:
        - generic: Education
        - link "Jump to Education" [ref=e9]:
          - /url: "#education"
      - listitem [ref=e10]:
        - generic: Open Source
        - link "Jump to Open Source" [ref=e11]:
          - /url: "#open-source"
      - listitem [ref=e12]:
        - generic: Journey
        - link "Jump to Journey" [ref=e13]:
          - /url: "#journey"
      - listitem [ref=e14]:
        - generic: Expertise
        - link "Jump to Expertise" [ref=e15]:
          - /url: "#expertise"
  - generic [ref=e16]:
    - generic [ref=e17]: ◊
    - generic [ref=e18]:
      - paragraph [ref=e19]: New here?
      - paragraph [ref=e20]: Press / or ⌘K to fly. Try ? for the full keyboard map.
    - button "Dismiss nudge" [ref=e21]: ×
  - 'button "Atmosphere: Aura · warm peach · press T to cycle, Shift-click to share link" [ref=e23]':
    - generic [ref=e27]: AURA
  - banner:
    - navigation "Primary" [ref=e28]:
      - link "Delowar Hossain — home" [ref=e29]:
        - /url: /
        - generic [ref=e30]: Delowar Hossain
        - generic [ref=e31]: ◊ MMXXVII
      - list [ref=e32]:
        - listitem [ref=e33]:
          - link "Index" [ref=e34]:
            - /url: /
            - generic [ref=e35]: Index
        - listitem [ref=e36]:
          - link "Works" [ref=e37]:
            - /url: /works
            - generic [ref=e38]: Works
        - listitem [ref=e39]:
          - link "Lab" [ref=e40]:
            - /url: /lab
            - generic [ref=e41]: Lab
        - listitem [ref=e42]:
          - link "About" [ref=e43]:
            - /url: /about
            - generic [ref=e44]: About
        - listitem [ref=e46]:
          - link "Resume" [ref=e47]:
            - /url: /resume
            - generic [ref=e48]: Resume
        - listitem [ref=e49]:
          - link "Journal" [ref=e50]:
            - /url: /journal
            - generic [ref=e51]: Journal
        - listitem [ref=e52]:
          - link "Services" [ref=e53]:
            - /url: /services
            - generic [ref=e54]: Services
        - listitem [ref=e55]:
          - link "Contact" [ref=e56]:
            - /url: /contact
            - generic [ref=e57]: Contact
      - generic [ref=e58]:
        - button "Sound effects off — press S to toggle" [ref=e59]:
          - generic [ref=e60]: ·
          - generic [ref=e61]: Mute
        - button "Open command palette (Cmd+K)" [ref=e62]: ⌘K
        - link "Start a Project" [ref=e63]:
          - /url: /contact
  - main [ref=e65]:
    - generic [ref=e68]:
      - paragraph [ref=e69]: §01 — About / Story
      - heading "Delowar Hossain." [level=1] [ref=e70]:
        - generic [ref=e73]: Delowar
        - generic [ref=e77]: Hossain.
      - generic [ref=e78]:
        - paragraph [ref=e79]: Bridging brutalist editorial design and fluid, high-performance creative development. I build digital experiences that feel physical.
        - list [ref=e80]:
          - listitem [ref=e81]:
            - paragraph [ref=e82]: Base
            - paragraph [ref=e83]: Joypurhat, Bangladesh
          - listitem [ref=e84]:
            - paragraph [ref=e85]: Studio
            - paragraph [ref=e86]: The Compiled Thought
          - listitem [ref=e87]:
            - paragraph [ref=e88]: Reading
            - paragraph [ref=e89]: B.Sc. CS · UoPeople
          - listitem [ref=e90]:
            - paragraph [ref=e91]: Practice
            - paragraph [ref=e92]: Aspiring Software Engineer
      - generic [ref=e94]:
        - link "Download Resume" [ref=e95]:
          - /url: /resume
          - text: Download Resume
          - generic [ref=e96]: ↗
        - link "Get in Touch" [ref=e97]:
          - /url: /contact
          - text: Get in Touch
          - generic [ref=e98]: ↗
    - generic [ref=e100]:
      - generic [ref=e102]:
        - figure [ref=e103]:
          - img "Delowar Hossain — portrait" [ref=e104]
        - generic [ref=e105]: ◊ Delowar Hossain · Joypurhat, Bangladesh
      - generic [ref=e106]:
        - paragraph [ref=e107]: ◊ Philosophy
        - paragraph [ref=e109]: I work where creative frontend engineering, scalable architecture and AI integration meet — building interfaces that feel distinct, perform well, and turn technical complexity into something clear, useful, and memorable.
        - paragraph [ref=e111]:
          - text: Delowar Hossain (also known as Delowar) is a self-taught creative developer, UI/UX designer, and aspiring software engineer based in Panchbibi, Joypurhat, Bangladesh. He is currently studying B.Sc. Computer Science at the University of the People (online), building a formal foundation on top of years of independent practice. He has been building for the web since 2023 and works independently under the studio name The Compiled Thought. His practice spans creative frontend engineering with WebGL, Three.js, GLSL, GSAP, Lenis, and Next.js — alongside design systems, motion systems, and generative AI integration into product interfaces. He works remotely with clients worldwide and is
          - generic [ref=e112]: currently open from q1 ’27 — booking through q4 ’27
          - text: .
    - generic [ref=e115]:
      - generic [ref=e116]:
        - generic [ref=e117]: WEBGL
        - generic [ref=e118]: •
      - generic [ref=e119]:
        - generic [ref=e120]: THREE.JS
        - generic [ref=e121]: •
      - generic [ref=e122]:
        - generic [ref=e123]: GLSL
        - generic [ref=e124]: •
      - generic [ref=e125]:
        - generic [ref=e126]: REACT
        - generic [ref=e127]: •
      - generic [ref=e128]:
        - generic [ref=e129]: TAILWIND
        - generic [ref=e130]: •
      - generic [ref=e131]:
        - generic [ref=e132]: GSAP
        - generic [ref=e133]: •
      - generic [ref=e134]:
        - generic [ref=e135]: FRAMER
        - generic [ref=e136]: •
      - generic [ref=e137]:
        - generic [ref=e138]: WEBFLOW
        - generic [ref=e139]: •
      - generic [ref=e140]:
        - generic [ref=e141]: WEBGL
        - generic [ref=e142]: •
      - generic [ref=e143]:
        - generic [ref=e144]: THREE.JS
        - generic [ref=e145]: •
      - generic [ref=e146]:
        - generic [ref=e147]: GLSL
        - generic [ref=e148]: •
      - generic [ref=e149]:
        - generic [ref=e150]: REACT
        - generic [ref=e151]: •
      - generic [ref=e152]:
        - generic [ref=e153]: TAILWIND
        - generic [ref=e154]: •
      - generic [ref=e155]:
        - generic [ref=e156]: GSAP
        - generic [ref=e157]: •
      - generic [ref=e158]:
        - generic [ref=e159]: FRAMER
        - generic [ref=e160]: •
      - generic [ref=e161]:
        - generic [ref=e162]: WEBFLOW
        - generic [ref=e163]: •
    - generic [ref=e165]:
      - generic [ref=e166]:
        - paragraph [ref=e167]: ◊ Personal Signals
        - heading "The non-traditional path." [level=2] [ref=e168]
      - generic [ref=e169]:
        - generic [ref=e171]:
          - paragraph [ref=e172]: Base
          - heading "Joypurhat, Bangladesh" [level=3] [ref=e173]
          - paragraph [ref=e174]: Grounded locally, building for a global digital audience.
        - generic [ref=e176]:
          - paragraph [ref=e177]: Path
          - heading "Self-Taught Developer" [level=3] [ref=e178]
          - paragraph [ref=e179]: Built through curiosity, repetition, experimentation and independent study.
        - generic [ref=e181]:
          - paragraph [ref=e182]: Background
          - heading "Not from a CSE Track" [level=3] [ref=e183]
          - paragraph [ref=e184]: A non-traditional path that shaped a different way of thinking about technology.
        - generic [ref=e186]:
          - paragraph [ref=e187]: Current Mode
          - heading "Web + AI Learning" [level=3] [ref=e188]
          - paragraph [ref=e189]: Growing deeper at the intersection of creative frontend craft and intelligent systems.
    - generic [ref=e191]:
      - generic [ref=e192]:
        - paragraph [ref=e193]: ◊ Education
        - heading "Aspiring software engineer." [level=2] [ref=e194]
        - paragraph [ref=e195]: Formal Computer Science studies stacked on top of years of self-taught practice — political-science fluency in systems, CS fluency in their machinery.
      - list [ref=e196]:
        - listitem [ref=e198]:
          - generic [ref=e199]: B.Sc. Computer Science (in progress)
          - heading "Visit University of the People (opens in a new tab)" [level=3] [ref=e200]:
            - link "Visit University of the People (opens in a new tab)" [ref=e201]:
              - /url: https://www.uopeople.edu/
              - text: University of the People
          - paragraph [ref=e202]: Aspiring Software Engineer
        - listitem [ref=e204]:
          - generic [ref=e205]: Bachelor of Arts
          - heading "B.A. Political Science" [level=3] [ref=e206]
          - paragraph [ref=e207]: Scholarly Modernity
    - generic [ref=e209]:
      - generic [ref=e210]:
        - paragraph [ref=e211]: ◊ Open Source · GitHub
        - heading "127+ public repos." [level=2] [ref=e212]:
          - generic [ref=e213]: 127+
          - text: public repos.
        - paragraph [ref=e214]: A passionate self-taught developer from Bangladesh.
        - link "Open mdhossain-2437 GitHub profile in a new tab" [ref=e215]:
          - /url: https://github.com/mdhossain-2437
          - text: "@mdhossain-2437"
          - generic [ref=e216]: ↗
      - list [ref=e217]:
        - listitem [ref=e219]:
          - link "Open open-multi-agent on GitHub (new tab)" [ref=e220]:
            - /url: https://github.com/mdhossain-2437/open-multi-agent
            - text: open-multi-agent
          - paragraph [ref=e221]: Production-grade multi-agent orchestration framework.
        - listitem [ref=e223]:
          - link "Open Creative-Folio on GitHub (new tab)" [ref=e224]:
            - /url: https://github.com/mdhossain-2437/Creative-Folio
            - text: Creative-Folio
          - paragraph [ref=e225]: This portfolio (MMXXVII edition).
        - listitem [ref=e227]:
          - link "Open streamflix on GitHub (new tab)" [ref=e228]:
            - /url: https://github.com/mdhossain-2437/streamflix
            - text: streamflix
          - paragraph [ref=e229]: Streaming UI experiment, Next.js + TypeScript.
        - listitem [ref=e231]:
          - link "Open nexify-engine on GitHub (new tab)" [ref=e232]:
            - /url: https://github.com/mdhossain-2437/nexify-engine
            - text: nexify-engine
          - paragraph [ref=e233]: Creative engine playground.
        - listitem [ref=e235]:
          - link "Open open-source-the-compiled-thought-themes on GitHub (new tab)" [ref=e236]:
            - /url: https://github.com/mdhossain-2437/open-source-the-compiled-thought-themes
            - text: open-source-the-compiled-thought-themes
          - paragraph [ref=e237]: Dark themes, developer fonts, animations.
    - generic [ref=e239]:
      - paragraph [ref=e241]: ◊ The Journey
      - list [ref=e242]:
        - listitem [ref=e244]:
          - generic [ref=e245]: 2026 — Now
          - heading "Creative Developer · The Compiled Thought" [level=3] [ref=e246]
          - paragraph [ref=e247]: Building award-tier creative engineering for the studio. Shipping immersive WebGL, scroll-driven editorial systems, and AI-native product surfaces.
        - listitem [ref=e249]:
          - generic [ref=e250]: 2025 — 2026
          - heading "Frontend & Motion Engineer" [level=3] [ref=e251]
          - paragraph [ref=e252]: Went deep on GSAP, Lenis, and raw WebGL2. Built shader-driven heroes, scroll-pinned process timelines, and the first WebGL displacement transitions.
        - listitem [ref=e254]:
          - generic [ref=e255]: 2024 — 2025
          - heading "Freelance React Developer" [level=3] [ref=e256]
          - paragraph [ref=e257]: Picked up Next.js, Tailwind, and the App Router. Shipped client landing pages, the 2024.delowarhossain.dev rebuild, and first end-to-end Vercel deployments.
        - listitem [ref=e259]:
          - generic [ref=e260]: 2023 — 2024
          - heading "First line of code" [level=3] [ref=e261]
          - paragraph [ref=e262]: Started the programming journey at 17. Daily HTML + CSS reps, vanilla JS experiments, and the first deployed personal site at 2023.delowarhossain.dev.
    - generic [ref=e264]:
      - paragraph [ref=e265]: ◊ Expertise
      - heading "6 domains, one practice." [level=2] [ref=e266]
      - list [ref=e267]:
        - listitem [ref=e268]: UI/UX Design
        - listitem [ref=e269]: Web Design
        - listitem [ref=e270]: Logo & Branding
        - listitem [ref=e271]: Webflow Design
        - listitem [ref=e272]: Framer Design
        - listitem [ref=e273]: Creative Development
        - listitem [ref=e274]: Three.js · WebGL
        - listitem [ref=e275]: GLSL Shaders
        - listitem [ref=e276]: GSAP · Lenis
        - listitem [ref=e277]: Next.js · Nuxt.js
        - listitem [ref=e278]: Art Direction
        - listitem [ref=e279]: AI Integration
  - contentinfo [ref=e281]:
    - region "Studio status" [ref=e282]:
      - generic [ref=e283]:
        - generic [ref=e284]:
          - generic [ref=e287]: 21:47 BD
          - generic [ref=e288]: ·
          - generic [ref=e289]: Joypurhat · BD
          - generic [ref=e290]: ·
          - generic [ref=e291]: 176 GH
          - generic [ref=e292]: ·
          - generic [ref=e293]: MMXXVII
          - generic [ref=e294]: ·
          - link "University of the People — B.Sc. Computer Science (in progress)" [ref=e295]:
            - /url: https://www.uopeople.edu/
            - text: B.Sc. CS · UoPeople
          - generic [ref=e296]: ·
          - generic "Time until MMXXVII (2027-01-01, Asia/Dhaka)" [ref=e297]:
            - text: → 186d 02h 12m
            - generic [ref=e298]: MMXXVII
        - link "Open from Q1 ’27 — booking through Q4 ’27" [ref=e299]:
          - /url: /contact
          - text: Open from Q1 ’27 — booking through Q4 ’27
          - generic [ref=e301]: ↗
    - generic [ref=e302]:
      - generic [ref=e303]:
        - generic [ref=e304]:
          - paragraph [ref=e305]: ◊ Open from Q1 ’27 — booking through Q4 ’27 · Selected projects
          - heading "Have an idea? Let's build it." [level=2] [ref=e306]:
            - generic [ref=e307]: Have an idea?
            - generic [ref=e308]: Let's build it.
          - generic [ref=e309]:
            - link "hello@delowarhossain.dev" [ref=e310]:
              - /url: /contact
              - text: hello@delowarhossain.dev
              - generic [ref=e311]: ↗
            - button "Copy email address to clipboard" [ref=e312]: ⎘
        - generic [ref=e313]:
          - generic [ref=e314]:
            - paragraph [ref=e315]: Pages
            - list [ref=e316]:
              - listitem [ref=e317]:
                - link "Index" [ref=e318]:
                  - /url: /
              - listitem [ref=e319]:
                - link "Works" [ref=e320]:
                  - /url: /works
              - listitem [ref=e321]:
                - link "Lab" [ref=e322]:
                  - /url: /lab
              - listitem [ref=e323]:
                - link "Process" [ref=e324]:
                  - /url: /process
              - listitem [ref=e325]:
                - link "About" [ref=e326]:
                  - /url: /about
              - listitem [ref=e327]:
                - link "Resume" [ref=e328]:
                  - /url: /resume
              - listitem [ref=e329]:
                - link "Journal" [ref=e330]:
                  - /url: /journal
              - listitem [ref=e331]:
                - link "Services" [ref=e332]:
                  - /url: /services
              - listitem [ref=e333]:
                - link "Uses" [ref=e334]:
                  - /url: /uses
              - listitem [ref=e335]:
                - link "Contact" [ref=e336]:
                  - /url: /contact
              - listitem [ref=e337]:
                - link "AI Summary" [ref=e338]:
                  - /url: /ai
          - generic [ref=e339]:
            - paragraph [ref=e340]: Connect
            - list [ref=e341]:
              - listitem [ref=e342]:
                - link "GITHUB" [ref=e343]:
                  - /url: https://github.com/mdhossain-2437
              - listitem [ref=e344]:
                - link "LINKEDIN" [ref=e345]:
                  - /url: https://www.linkedin.com/in/mdhossain2437
              - listitem [ref=e346]:
                - link "TWITTER" [ref=e347]:
                  - /url: https://twitter.com/mdhossain2437
              - listitem [ref=e348]:
                - link "INSTAGRAM" [ref=e349]:
                  - /url: https://www.instagram.com/mdhossain2437
              - listitem [ref=e350]:
                - link "FACEBOOK" [ref=e351]:
                  - /url: https://www.facebook.com/mdhossain2437
              - listitem [ref=e352]:
                - link "READ.CV" [ref=e353]:
                  - /url: https://read.cv/delowar
          - generic [ref=e354]:
            - paragraph [ref=e355]: Studio
            - list [ref=e356]:
              - listitem [ref=e357]:
                - link "Now" [ref=e358]:
                  - /url: /now
              - listitem [ref=e359]:
                - link "Uses" [ref=e360]:
                  - /url: /uses
              - listitem [ref=e361]:
                - link "Brand" [ref=e362]:
                  - /url: /brand
              - listitem [ref=e363]:
                - link "Colors" [ref=e364]:
                  - /url: /colors
              - listitem [ref=e365]:
                - link "Changelog" [ref=e366]:
                  - /url: /changelog
              - listitem [ref=e367]:
                - link "Showreel" [ref=e368]:
                  - /url: /showreel
              - listitem [ref=e369]:
                - link "Atlas" [ref=e370]:
                  - /url: /atlas
              - listitem [ref=e371]:
                - link "Recognition" [ref=e372]:
                  - /url: /awards
              - listitem [ref=e373]:
                - link "Achievements" [ref=e374]:
                  - /url: /achievements
              - listitem [ref=e375]:
                - link "Colophon" [ref=e376]:
                  - /url: /colophon
              - listitem [ref=e377]:
                - link "Privacy" [ref=e378]:
                  - /url: /legal/privacy
              - listitem [ref=e379]:
                - link "Terms" [ref=e380]:
                  - /url: /legal/terms
      - generic [ref=e381]:
        - generic [ref=e382]:
          - paragraph [ref=e383]: ◌ Signed
          - img "Delowar Hossain signature" [ref=e384]:
            - generic [ref=e386]: Delowar Hossain
        - paragraph [ref=e388]: handwritten in vector — strokes draw on view
      - generic [ref=e389]:
        - button "Quote of the day — click to copy" [ref=e391]:
          - generic [ref=e392]: ◊ Quote of the day · 206 / 365
          - generic [ref=e393]: “A particle system with art direction is weather.”
        - paragraph [ref=e394]:
          - text: ◌ A new quote rotates in at 00:00 UTC.
          - text: Click to copy. Three hundred sixty-five total.
      - generic [ref=e397]:
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
          - generic [ref=e423]: DELOWAR HOSSAIN
          - generic [ref=e424]: •
        - generic [ref=e425]:
          - generic [ref=e426]: CREATIVE DEVELOPER
          - generic [ref=e427]: •
        - generic [ref=e428]:
          - generic [ref=e429]: UI / UX DESIGNER
          - generic [ref=e430]: •
        - generic [ref=e431]:
          - generic [ref=e432]: WEBGL · THREE.JS · GLSL
          - generic [ref=e433]: •
        - generic [ref=e434]:
          - generic [ref=e435]: OPEN FROM Q1 ’27 — BOOKING THROUGH Q4 ’27
          - generic [ref=e436]: •
        - generic [ref=e437]:
          - generic [ref=e438]: JOYPURHAT, BANGLADESH
          - generic [ref=e439]: •
        - generic [ref=e440]:
          - generic [ref=e441]: MMXXVII / 03.27
          - generic [ref=e442]: •
        - generic [ref=e443]:
          - generic [ref=e444]: DELOWAR HOSSAIN · MMXXVII
          - generic [ref=e445]: •
      - generic [ref=e446]:
        - paragraph [ref=e447]:
          - text: © 2027
          - button "Studio mark" [ref=e448]: The Compiled Thought
          - text: . All rights reserved · MMXXVII.
        - paragraph [ref=e449]:
          - text: Lat. 25.10° N · Long. 89.02° E · Joypurhat, Bangladesh ·
          - generic [ref=e450]: 21:48:13
          - text: BST
        - generic [ref=e451]:
          - link "◇ local" [ref=e452]:
            - /url: https://github.com/mdhossain-2437/Creative-Folio
          - button "Toggle motion" [ref=e453]:
            - generic [ref=e456]: Motion On
          - generic [ref=e457]: v MMXXVII / 03.27
  - alert [ref=e458]
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