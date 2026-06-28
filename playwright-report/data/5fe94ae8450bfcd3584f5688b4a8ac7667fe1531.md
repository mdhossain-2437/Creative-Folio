# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> Smoke tests - critical routes >> should have no accessibility violations on /lab
- Location: e2e\smoke.spec.ts:47:9

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -   1
+ Received  + 911

- Array []
+ Array [
+   Object {
+     "description": "Ensure the order of headings is semantically correct",
+     "help": "Heading levels should only increase by one",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.12/heading-order?application=playwright",
+     "id": "heading-order",
+     "impact": "moderate",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "heading-order",
+             "impact": "moderate",
+             "message": "Heading order invalid",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Heading order invalid",
+         "html": "<h3 class=\"break-words font-serif text-xl leading-tight tracking-tighter md:text-2xl\">Fluid Dynamics Shader</h3>",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(1) > .bg-ink-900.h-full.relative > .p-6.md\\:p-8.flex-1 > div > h3",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.semantics",
+       "best-practice",
+     ],
+   },
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
+         "html": "<ul class=\"grid grid-cols-1 gap-px overflow-hidden bg-warmwhite/15 md:grid-cols-2 lg:grid-cols-3\">",
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
+                   ".reveal:nth-child(1)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(2)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(3)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(4)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(5)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(6)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(7)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(8)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(9)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(10)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(11)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(12)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(13)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(14)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(15)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(16)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(17)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(18)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(19)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(20)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(21)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(22)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(23)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(24)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(25)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(26)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(27)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(28)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(29)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \">",
+                 "target": Array [
+                   ".reveal:nth-child(30)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "target": Array [
+           ".gap-px.md\\:grid-cols-2.lg\\:grid-cols-3",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(1) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(2) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(3) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(4) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(5) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(6) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(7) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(8) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(9) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(10) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(11) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(12) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(13) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(14) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(15) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(16) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(17) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(18) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(19) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(20) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(21) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(22) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(23) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(24) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(25) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(26) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(27) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(28) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(29) > .bg-ink-900.h-full.relative",
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
+         "html": "<li class=\"group relative flex h-full flex-col bg-ink-900\" style=\"transform-style:preserve-3d;transition:transform 600ms cubic-bezier(0.22, 1, 0.36, 1);will-change:transform\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(30) > .bg-ink-900.h-full.relative",
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
        - listitem [ref=e30]:
          - link "About" [ref=e31]:
            - /url: /about
            - generic [ref=e32]: About
        - listitem [ref=e33]:
          - link "Resume" [ref=e34]:
            - /url: /resume
            - generic [ref=e35]: Resume
        - listitem [ref=e36]:
          - link "Journal" [ref=e37]:
            - /url: /journal
            - generic [ref=e38]: Journal
        - listitem [ref=e39]:
          - link "Services" [ref=e40]:
            - /url: /services
            - generic [ref=e41]: Services
        - listitem [ref=e42]:
          - link "Contact" [ref=e43]:
            - /url: /contact
            - generic [ref=e44]: Contact
      - generic [ref=e45]:
        - button "Sound effects off — press S to toggle" [ref=e46]:
          - generic [ref=e47]: ·
          - generic [ref=e48]: Mute
        - button "Open command palette (Cmd+K)" [ref=e49]: ⌘K
        - link "Start a Project" [ref=e50]:
          - /url: /contact
  - main [ref=e52]:
    - generic [ref=e55]:
      - paragraph [ref=e56]: §02 — Experimentation
      - heading "The Lab." [level=1] [ref=e57]:
        - generic [ref=e60]: The
        - generic [ref=e64]: Lab.
      - generic [ref=e65]:
        - paragraph [ref=e66]: A collection of technical explorations focusing on WebGL, GLSL shaders, audio-reactive systems and creative coding patterns. Where code meets art.
        - list [ref=e67]:
          - listitem [ref=e68]:
            - paragraph [ref=e69]: Live demos
            - paragraph [ref=e70]: "30"
          - listitem [ref=e71]:
            - paragraph [ref=e72]: Tech
            - paragraph [ref=e73]: WebGL · GLSL
          - listitem [ref=e74]:
            - paragraph [ref=e75]: Updated
            - paragraph [ref=e76]: Weekly
    - generic [ref=e78]:
      - generic [ref=e79]:
        - paragraph [ref=e80]: ◊ 30 live experiments · hover any tile to feel it react
        - button "Random experiment R" [ref=e81]:
          - text: Random experiment
          - generic [ref=e83]: R
      - generic [ref=e84]:
        - generic [ref=e85]:
          - button "All 30" [pressed] [ref=e86]:
            - generic [ref=e87]: All
            - generic [ref=e88]: "30"
          - button "WebGL 1" [ref=e89]:
            - generic [ref=e90]: WebGL
            - generic [ref=e91]: "1"
          - button "Three.js 1" [ref=e92]:
            - generic [ref=e93]: Three.js
            - generic [ref=e94]: "1"
          - button "Particles 1" [ref=e95]:
            - generic [ref=e96]: Particles
            - generic [ref=e97]: "1"
          - button "Type 3" [ref=e98]:
            - generic [ref=e99]: Type
            - generic [ref=e100]: "3"
          - button "Motion 1" [ref=e101]:
            - generic [ref=e102]: Motion
            - generic [ref=e103]: "1"
          - button "Audio 1" [ref=e104]:
            - generic [ref=e105]: Audio
            - generic [ref=e106]: "1"
          - button "Glitch 1" [ref=e107]:
            - generic [ref=e108]: Glitch
            - generic [ref=e109]: "1"
          - button "Performance 1" [ref=e110]:
            - generic [ref=e111]: Performance
            - generic [ref=e112]: "1"
          - button "Simulation 1" [ref=e113]:
            - generic [ref=e114]: Simulation
            - generic [ref=e115]: "1"
          - button "Geometry 1" [ref=e116]:
            - generic [ref=e117]: Geometry
            - generic [ref=e118]: "1"
          - button "Vector 1" [ref=e119]:
            - generic [ref=e120]: Vector
            - generic [ref=e121]: "1"
          - button "Parametric 1" [ref=e122]:
            - generic [ref=e123]: Parametric
            - generic [ref=e124]: "1"
          - button "Behaviour 1" [ref=e125]:
            - generic [ref=e126]: Behaviour
            - generic [ref=e127]: "1"
          - button "Optics 1" [ref=e128]:
            - generic [ref=e129]: Optics
            - generic [ref=e130]: "1"
          - button "Symmetry 1" [ref=e131]:
            - generic [ref=e132]: Symmetry
            - generic [ref=e133]: "1"
          - button "Implicit 1" [ref=e134]:
            - generic [ref=e135]: Implicit
            - generic [ref=e136]: "1"
          - button "Tiling 1" [ref=e137]:
            - generic [ref=e138]: Tiling
            - generic [ref=e139]: "1"
          - button "Topography 1" [ref=e140]:
            - generic [ref=e141]: Topography
            - generic [ref=e142]: "1"
          - button "Throwback 1" [ref=e143]:
            - generic [ref=e144]: Throwback
            - generic [ref=e145]: "1"
          - button "Space 1" [ref=e146]:
            - generic [ref=e147]: Space
            - generic [ref=e148]: "1"
          - button "Curl 1" [ref=e149]:
            - generic [ref=e150]: Curl
            - generic [ref=e151]: "1"
          - button "Physics 1" [ref=e152]:
            - generic [ref=e153]: Physics
            - generic [ref=e154]: "1"
          - button "Demo 1" [ref=e155]:
            - generic [ref=e156]: Demo
            - generic [ref=e157]: "1"
          - button "Cellular 1" [ref=e158]:
            - generic [ref=e159]: Cellular
            - generic [ref=e160]: "1"
          - button "Optical 1" [ref=e161]:
            - generic [ref=e162]: Optical
            - generic [ref=e163]: "1"
          - button "Network 1" [ref=e164]:
            - generic [ref=e165]: Network
            - generic [ref=e166]: "1"
          - button "SDF 1" [ref=e167]:
            - generic [ref=e168]: SDF
            - generic [ref=e169]: "1"
          - button "Origami 1" [ref=e170]:
            - generic [ref=e171]: Origami
            - generic [ref=e172]: "1"
        - list [ref=e173]:
          - listitem [ref=e175]:
            - link "01 · WebGL Live · interactive ↗" [ref=e176]:
              - /url: /lab/fluid-dynamics
              - generic: 01 · WebGL
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to fluid-dynamics" [ref=e178]: ⎘
            - generic [ref=e179]:
              - generic [ref=e180]:
                - heading "Fluid Dynamics Shader" [level=3] [ref=e181]
                - paragraph [ref=e182]: Custom GLSL fragment shader implementing a lightweight Navier–Stokes simulation for interactive background distortions.
              - link "GLSL · 2027 · Open playground →" [ref=e183]:
                - /url: /lab/fluid-dynamics
          - listitem [ref=e185]:
            - link "02 · Three.js Live · interactive ↗" [ref=e186]:
              - /url: /lab/volumetric-lighting
              - generic: 02 · Three.js
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to volumetric-lighting" [ref=e188]: ⎘
            - generic [ref=e189]:
              - generic [ref=e190]:
                - heading "Volumetric Lighting" [level=3] [ref=e191]
                - paragraph [ref=e192]: Raymarching experiments focusing on soft shadows and atmospheric scattering through procedurally-generated fog volumes.
              - link "Three.js · 2027 · Open playground →" [ref=e193]:
                - /url: /lab/volumetric-lighting
          - listitem [ref=e195]:
            - link "03 · Particles Live · interactive ↗" [ref=e196]:
              - /url: /lab/particle-systems
              - generic: 03 · Particles
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to particle-systems" [ref=e198]: ⎘
            - generic [ref=e199]:
              - generic [ref=e200]:
                - heading "Particle Systems" [level=3] [ref=e201]
                - paragraph [ref=e202]: Tier-aware particle system with curl-noise-style advection, click shockwaves and frame-budgeted rendering.
              - link "Canvas2D · 2027 · Open playground →" [ref=e203]:
                - /url: /lab/particle-systems
          - listitem [ref=e205]:
            - link "MOTION 04 · Type Live · interactive ↗" [ref=e206]:
              - /url: /lab/variable-font-scroll
              - generic [ref=e208]: MOTION
              - generic: 04 · Type
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to variable-font-scroll" [ref=e209]: ⎘
            - generic [ref=e210]:
              - generic [ref=e211]:
                - heading "Variable Font Scroll" [level=3] [ref=e212]
                - paragraph [ref=e213]: Scroll velocity → variable font axes (wght, wdth, slnt) for living, kinetic display headlines.
              - link "Variable Fonts · 2025 · Open playground →" [ref=e214]:
                - /url: /lab/variable-font-scroll
          - listitem [ref=e216]:
            - link "05 · Motion Live · interactive ↗" [ref=e217]:
              - /url: /lab/magnetic-cursor
              - generic: 05 · Motion
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to magnetic-cursor" [ref=e219]: ⎘
            - generic [ref=e220]:
              - generic [ref=e221]:
                - heading "Magnetic Cursor Field" [level=3] [ref=e222]
                - paragraph [ref=e223]: A vector field that warps cursor trails into local minima of an SDF — feels physical, not animated.
              - link "GSAP · 2025 · Open playground →" [ref=e224]:
                - /url: /lab/magnetic-cursor
          - listitem [ref=e226]:
            - link "06 · Audio Live · interactive ↗" [ref=e227]:
              - /url: /lab/fft-material
              - generic: 06 · Audio
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to fft-material" [ref=e229]: ⎘
            - generic [ref=e230]:
              - generic [ref=e231]:
                - heading "FFT Reactive Material" [level=3] [ref=e232]
                - paragraph [ref=e233]: Web Audio API → uniforms that drive material roughness, emissive color, and displacement.
              - link "Web Audio · 2025 · Open playground →" [ref=e234]:
                - /url: /lab/fft-material
          - listitem [ref=e236]:
            - link "07 · Glitch Live · interactive ↗" [ref=e237]:
              - /url: /lab/shader-storm
              - generic: 07 · Glitch
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to shader-storm" [ref=e239]: ⎘
            - generic [ref=e240]:
              - generic [ref=e241]:
                - heading "Shader Storm" [level=3] [ref=e242]
                - paragraph [ref=e243]: A composable post-processing chain triggered by the Konami code. RGB shift, scanlines, hue cycling — layered live.
              - link "Postprocessing · 2027 · Open playground →" [ref=e244]:
                - /url: /lab/shader-storm
          - listitem [ref=e246]:
            - link "GLYPH 08 · Type Live · interactive ↗" [ref=e247]:
              - /url: /lab/signed-distance-letters
              - generic [ref=e249]:
                - generic [ref=e250]: GLYPH
                - generic [ref=e251]: GLYPH
                - text: GLYPH
              - generic: 08 · Type
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to signed-distance-letters" [ref=e252]: ⎘
            - generic [ref=e253]:
              - generic [ref=e254]:
                - heading "Signed-Distance Letters" [level=3] [ref=e255]
                - paragraph [ref=e256]: Glyphs rendered from a signed-distance field for crisp scaling, soft glow, and instant kerning experiments.
              - link "SDF · 2027 · Open playground →" [ref=e257]:
                - /url: /lab/signed-distance-letters
          - listitem [ref=e259]:
            - link "09 · Performance Live · interactive ↗" [ref=e260]:
              - /url: /lab/latency-canvas
              - generic: 09 · Performance
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to latency-canvas" [ref=e262]: ⎘
            - generic [ref=e263]:
              - generic [ref=e264]:
                - heading "Latency Canvas" [level=3] [ref=e265]
                - paragraph [ref=e266]: A frame-pacing visualizer drawing your real input → pixel latency. Every dot is one frame, colored by jank.
              - link "Performance · 2027 · Open playground →" [ref=e267]:
                - /url: /lab/latency-canvas
          - listitem [ref=e269]:
            - link "10 · Simulation Live · interactive ↗" [ref=e270]:
              - /url: /lab/reaction-diffusion
              - generic: 10 · Simulation
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to reaction-diffusion" [ref=e272]: ⎘
            - generic [ref=e273]:
              - generic [ref=e274]:
                - heading "Reaction Diffusion" [level=3] [ref=e275]
                - paragraph [ref=e276]: A Gray–Scott reaction-diffusion field running on a single canvas pass. Hover seeds chemistry continuously; click reseeds the field.
              - link "Cellular · 2027 · Open playground →" [ref=e277]:
                - /url: /lab/reaction-diffusion
          - listitem [ref=e279]:
            - link "11 · Geometry Live · interactive ↗" [ref=e280]:
              - /url: /lab/voronoi-cells
              - generic: 11 · Geometry
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to voronoi-cells" [ref=e282]: ⎘
            - generic [ref=e283]:
              - generic [ref=e284]:
                - heading "Voronoi Cells" [level=3] [ref=e285]
                - paragraph [ref=e286]: A Voronoi tessellation of moving sites — the cursor adds a heavy site that warps the entire diagram in real time.
              - link "Computational Geom · 2027 · Open playground →" [ref=e287]:
                - /url: /lab/voronoi-cells
          - listitem [ref=e289]:
            - link "12 · Vector Live · interactive ↗" [ref=e290]:
              - /url: /lab/flow-field
              - generic: 12 · Vector
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to flow-field" [ref=e292]: ⎘
            - generic [ref=e293]:
              - generic [ref=e294]:
                - heading "Flow Field Vectors" [level=3] [ref=e295]
                - paragraph [ref=e296]: A grid of arrows reading the curl of a procedural noise field. The cursor injects a local rotational bias into the flow.
              - link "Curl Noise · 2027 · Open playground →" [ref=e297]:
                - /url: /lab/flow-field
          - listitem [ref=e299]:
            - link "13 · Parametric Live · interactive ↗" [ref=e300]:
              - /url: /lab/lissajous-orbits
              - generic: 13 · Parametric
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to lissajous-orbits" [ref=e302]: ⎘
            - generic [ref=e303]:
              - generic [ref=e304]:
                - heading "Lissajous Orbits" [level=3] [ref=e305]
                - paragraph [ref=e306]: Layered Lissajous curves whose ratios shift with cursor position. The body of the page becomes the parametric instrument.
              - link "Parametric · 2027 · Open playground →" [ref=e307]:
                - /url: /lab/lissajous-orbits
          - listitem [ref=e309]:
            - link "14 · Behaviour Live · interactive ↗" [ref=e310]:
              - /url: /lab/boids-flock
              - generic: 14 · Behaviour
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to boids-flock" [ref=e312]: ⎘
            - generic [ref=e313]:
              - generic [ref=e314]:
                - heading "Boids Flock" [level=3] [ref=e315]
                - paragraph [ref=e316]: Reynolds-style flocking — separation, alignment, cohesion. The cursor attracts the flock; hold ⇧ while moving to flip it into a predator.
              - link "Agents · 2027 · Open playground →" [ref=e317]:
                - /url: /lab/boids-flock
          - listitem [ref=e319]:
            - link "15 · Optics Live · interactive ↗" [ref=e320]:
              - /url: /lab/wave-interference
              - generic: 15 · Optics
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to wave-interference" [ref=e322]: ⎘
            - generic [ref=e323]:
              - generic [ref=e324]:
                - heading "Wave Interference" [level=3] [ref=e325]
                - paragraph [ref=e326]: Concentric wavefronts emitted from multiple sources. The cursor is a live source; click to drop a permanent emitter and watch the interference fringe form.
              - link "Wave Optics · 2027 · Open playground →" [ref=e327]:
                - /url: /lab/wave-interference
          - listitem [ref=e329]:
            - link "16 · Symmetry Live · interactive ↗" [ref=e330]:
              - /url: /lab/kaleidoscope
              - generic: 16 · Symmetry
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to kaleidoscope" [ref=e332]: ⎘
            - generic [ref=e333]:
              - generic [ref=e334]:
                - heading "Kaleidoscope Mirror" [level=3] [ref=e335]
                - paragraph [ref=e336]: A six-fold mirrored brush. The cursor draws into one wedge and the geometry replicates around the centre with alternating chirality.
              - link "Reflection · 2027 · Open playground →" [ref=e337]:
                - /url: /lab/kaleidoscope
          - listitem [ref=e339]:
            - link "17 · Implicit Live · interactive ↗" [ref=e340]:
              - /url: /lab/metaballs
              - generic: 17 · Implicit
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to metaballs" [ref=e342]: ⎘
            - generic [ref=e343]:
              - generic [ref=e344]:
                - heading "Metaballs Field" [level=3] [ref=e345]
                - paragraph [ref=e346]: A field of additive radial gradients approximating an iso-surface. Spheres float and merge softly; the cursor adds a bright bump that pulls the field with it.
              - link "Implicit Surfaces · 2027 · Open playground →" [ref=e347]:
                - /url: /lab/metaballs
          - listitem [ref=e349]:
            - link "18 · Tiling Live · interactive ↗" [ref=e350]:
              - /url: /lab/truchet-tiles
              - generic: 18 · Tiling
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to truchet-tiles" [ref=e352]: ⎘
            - generic [ref=e353]:
              - generic [ref=e354]:
                - heading "Truchet Tiles" [level=3] [ref=e355]
                - paragraph [ref=e356]: A grid of tiles whose orientations are seeded by the cursor — drag to retune the pattern; tile arcs snap into continuous serpentine rivers.
              - link "Generative · 2027 · Open playground →" [ref=e357]:
                - /url: /lab/truchet-tiles
          - listitem [ref=e359]:
            - link "19 · Topography Live · interactive ↗" [ref=e360]:
              - /url: /lab/perlin-terrain
              - generic: 19 · Topography
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to perlin-terrain" [ref=e362]: ⎘
            - generic [ref=e363]:
              - generic [ref=e364]:
                - heading "Perlin Terrain" [level=3] [ref=e365]
                - paragraph [ref=e366]: A scrolling 2.5D heightfield drawn line-by-line from a Perlin field. The cursor lifts the ridge it hovers; click to shift the scroll direction.
              - link "Heightfield · 2027 · Open playground →" [ref=e367]:
                - /url: /lab/perlin-terrain
          - listitem [ref=e369]:
            - link "20 · Throwback Live · interactive ↗" [ref=e370]:
              - /url: /lab/dvd-bouncer
              - generic: 20 · Throwback
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to dvd-bouncer" [ref=e372]: ⎘
            - generic [ref=e373]:
              - generic [ref=e374]:
                - heading "DVD Bouncer" [level=3] [ref=e375]
                - paragraph [ref=e376]: The classic 90s screensaver — colour cycles on every wall hit. Click to nudge the trajectory; hold ⇧ to spawn a second DVD that tracks the first.
              - link "Demoscene · 2027 · Open playground →" [ref=e377]:
                - /url: /lab/dvd-bouncer
          - listitem [ref=e379]:
            - link "21 · Space Live · interactive ↗" [ref=e380]:
              - /url: /lab/starfield-warp
              - generic: 21 · Space
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to starfield-warp" [ref=e382]: ⎘
            - generic [ref=e383]:
              - generic [ref=e384]:
                - heading "Starfield Warp" [level=3] [ref=e385]
                - paragraph [ref=e386]: Radial starfield with trails. Cursor warps the field's vanishing point; click pushes the warp factor up so the trails stretch into hyperdrive.
              - link "Radial · 2027 · Open playground →" [ref=e387]:
                - /url: /lab/starfield-warp
          - listitem [ref=e389]:
            - link "22 · Curl Live · interactive ↗" [ref=e390]:
              - /url: /lab/vortex-spiral
              - generic: 22 · Curl
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to vortex-spiral" [ref=e392]: ⎘
            - generic [ref=e393]:
              - generic [ref=e394]:
                - heading "Vortex Spiral" [level=3] [ref=e395]
                - paragraph [ref=e396]: A logarithmic spiral of particles orbiting the cursor. Inward bias drags them home, outward bias kicks them into a fleeing galaxy.
              - link "Polar · 2027 · Open playground →" [ref=e397]:
                - /url: /lab/vortex-spiral
          - listitem [ref=e399]:
            - link "23 · Physics Live · interactive ↗" [ref=e400]:
              - /url: /lab/rope-physics
              - generic: 23 · Physics
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to rope-physics" [ref=e402]: ⎘
            - generic [ref=e403]:
              - generic [ref=e404]:
                - heading "Rope Physics" [level=3] [ref=e405]
                - paragraph [ref=e406]: A Verlet-integrated rope pinned to the top edge — the cursor grabs the free end and the chain swings with gravity, friction and slack.
              - link "Verlet · 2027 · Open playground →" [ref=e407]:
                - /url: /lab/rope-physics
          - listitem [ref=e409]:
            - link "24 · Demo Live · interactive ↗" [ref=e410]:
              - /url: /lab/plasma-classic
              - generic: 24 · Demo
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to plasma-classic" [ref=e412]: ⎘
            - generic [ref=e413]:
              - generic [ref=e414]:
                - heading "Plasma Classic" [level=3] [ref=e415]
                - paragraph [ref=e416]: A four-sine plasma palette running per-pixel through a low-cost lookup. Cursor offsets the palette index for live colour mood shifts.
              - link "Demoscene · 2027 · Open playground →" [ref=e417]:
                - /url: /lab/plasma-classic
          - listitem [ref=e419]:
            - link "25 · Cellular Live · interactive ↗" [ref=e420]:
              - /url: /lab/sand-piles
              - generic: 25 · Cellular
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to sand-piles" [ref=e422]: ⎘
            - generic [ref=e423]:
              - generic [ref=e424]:
                - heading "Falling Sand" [level=3] [ref=e425]
                - paragraph [ref=e426]: A two-state falling-sand automaton — drag to paint sand, watch it settle into piles. Click to convert sand to stone so other grains pile on it.
              - link "Automata · 2027 · Open playground →" [ref=e427]:
                - /url: /lab/sand-piles
          - listitem [ref=e429]:
            - link "26 · Optical Live · interactive ↗" [ref=e430]:
              - /url: /lab/rotation-blur
              - generic: 26 · Optical
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to rotation-blur" [ref=e432]: ⎘
            - generic [ref=e433]:
              - generic [ref=e434]:
                - heading "Rotation Blur" [level=3] [ref=e435]
                - paragraph [ref=e436]: A pinwheel of radial spokes rendered with progressive motion-blur. Cursor controls the angular velocity — fast feels like a turbine, slow like a fan.
              - link "Optics · 2027 · Open playground →" [ref=e437]:
                - /url: /lab/rotation-blur
          - listitem [ref=e439]:
            - link "27 · Network Live · interactive ↗" [ref=e440]:
              - /url: /lab/constellation-net
              - generic: 27 · Network
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to constellation-net" [ref=e442]: ⎘
            - generic [ref=e443]:
              - generic [ref=e444]:
                - heading "Constellation Net" [level=3] [ref=e445]
                - paragraph [ref=e446]: Floating nodes that connect to one another inside a proximity radius — the cursor is the brightest node, lit lines fade with distance.
              - link "Graph · 2027 · Open playground →" [ref=e447]:
                - /url: /lab/constellation-net
          - listitem [ref=e449]:
            - link "28 · SDF Live · interactive ↗" [ref=e450]:
              - /url: /lab/morphing-blob
              - generic: 28 · SDF
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to morphing-blob" [ref=e452]: ⎘
            - generic [ref=e453]:
              - generic [ref=e454]:
                - heading "Morphing Blob" [level=3] [ref=e455]
                - paragraph [ref=e456]: A super-formula blob whose petals breathe with time. The cursor distorts the SDF locally; click to lock the current silhouette as a still.
              - link "Implicit · 2027 · Open playground →" [ref=e457]:
                - /url: /lab/morphing-blob
          - listitem [ref=e459]:
            - link "29 · Type Live · interactive ↗" [ref=e460]:
              - /url: /lab/chromatic-aberration
              - generic: 29 · Type
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to chromatic-aberration" [ref=e462]: ⎘
            - generic [ref=e463]:
              - generic [ref=e464]:
                - heading "Chromatic Aberration" [level=3] [ref=e465]
                - paragraph [ref=e466]: Three-layer RGB-shifted typography whose offset scales with cursor velocity. Standing still it crisps; flicking the mouse shears it apart.
              - link "Type Glitch · 2027 · Open playground →" [ref=e467]:
                - /url: /lab/chromatic-aberration
          - listitem [ref=e469]:
            - link "30 · Origami Live · interactive ↗" [ref=e470]:
              - /url: /lab/paper-folding
              - generic: 30 · Origami
              - generic: Live · interactive
              - generic: ↗
            - button "Copy link to paper-folding" [ref=e472]: ⎘
            - generic [ref=e473]:
              - generic [ref=e474]:
                - heading "Paper Folding" [level=3] [ref=e475]
                - paragraph [ref=e476]: A grid of triangle folds whose crease angles follow a noise field. Cursor pulls the field's centre; the paper crinkles toward your hover.
              - link "Folded · 2027 · Open playground →" [ref=e477]:
                - /url: /lab/paper-folding
    - generic [ref=e480]:
      - generic [ref=e481]:
        - generic [ref=e482]: GLSL · FRAGMENT SHADER
        - generic [ref=e483]: •
      - generic [ref=e484]:
        - generic [ref=e485]: RAYMARCHING · SDF
        - generic [ref=e486]: •
      - generic [ref=e487]:
        - generic [ref=e488]: PARTICLES · FIELD
        - generic [ref=e489]: •
      - generic [ref=e490]:
        - generic [ref=e491]: CURL NOISE · FBM
        - generic [ref=e492]: •
      - generic [ref=e493]:
        - generic [ref=e494]: WEB AUDIO · FFT
        - generic [ref=e495]: •
      - generic [ref=e496]:
        - generic [ref=e497]: VARIABLE FONTS
        - generic [ref=e498]: •
      - generic [ref=e499]:
        - generic [ref=e500]: GRAY-SCOTT · REACTION
        - generic [ref=e501]: •
      - generic [ref=e502]:
        - generic [ref=e503]: VORONOI · GEOMETRY
        - generic [ref=e504]: •
      - generic [ref=e505]:
        - generic [ref=e506]: BOIDS · FLOCKING
        - generic [ref=e507]: •
      - generic [ref=e508]:
        - generic [ref=e509]: LISSAJOUS · PARAMETRIC
        - generic [ref=e510]: •
      - generic [ref=e511]:
        - generic [ref=e512]: GLSL · FRAGMENT SHADER
        - generic [ref=e513]: •
      - generic [ref=e514]:
        - generic [ref=e515]: RAYMARCHING · SDF
        - generic [ref=e516]: •
      - generic [ref=e517]:
        - generic [ref=e518]: PARTICLES · FIELD
        - generic [ref=e519]: •
      - generic [ref=e520]:
        - generic [ref=e521]: CURL NOISE · FBM
        - generic [ref=e522]: •
      - generic [ref=e523]:
        - generic [ref=e524]: WEB AUDIO · FFT
        - generic [ref=e525]: •
      - generic [ref=e526]:
        - generic [ref=e527]: VARIABLE FONTS
        - generic [ref=e528]: •
      - generic [ref=e529]:
        - generic [ref=e530]: GRAY-SCOTT · REACTION
        - generic [ref=e531]: •
      - generic [ref=e532]:
        - generic [ref=e533]: VORONOI · GEOMETRY
        - generic [ref=e534]: •
      - generic [ref=e535]:
        - generic [ref=e536]: BOIDS · FLOCKING
        - generic [ref=e537]: •
      - generic [ref=e538]:
        - generic [ref=e539]: LISSAJOUS · PARAMETRIC
        - generic [ref=e540]: •
    - generic [ref=e542]:
      - generic [ref=e543]:
        - paragraph [ref=e544]: §03 — The Arsenal
        - heading "The tools behind the work." [level=2] [ref=e545]
      - generic [ref=e546]:
        - generic [ref=e547]:
          - paragraph [ref=e548]: Core Frameworks
          - list [ref=e549]:
            - listitem [ref=e550]: React / Next.js
            - listitem [ref=e551]: Vue / Nuxt
            - listitem [ref=e552]: SvelteKit
            - listitem [ref=e553]: TypeScript
        - generic [ref=e554]:
          - paragraph [ref=e555]: Creative / WebGL
          - list [ref=e556]:
            - listitem [ref=e557]: Three.js / R3F
            - listitem [ref=e558]: GLSL Shaders
            - listitem [ref=e559]: GSAP / Lenis
            - listitem [ref=e560]: Framer Motion
        - generic [ref=e561]:
          - paragraph [ref=e562]: Styling & UI
          - list [ref=e563]:
            - listitem [ref=e564]: Tailwind CSS
            - listitem [ref=e565]: Radix UI
            - listitem [ref=e566]: Variable Fonts
            - listitem [ref=e567]: Motion Systems
        - generic [ref=e568]:
          - paragraph [ref=e569]: Backend & AI
          - list [ref=e570]:
            - listitem [ref=e571]: Node.js / FastAPI
            - listitem [ref=e572]: LangChain · OpenAI
            - listitem [ref=e573]: PostgreSQL · Supabase
            - listitem [ref=e574]: Vercel · Cloudflare
  - contentinfo [ref=e576]:
    - region "Studio status" [ref=e577]:
      - generic [ref=e578]:
        - generic [ref=e579]:
          - generic [ref=e582]: 21:48 BD
          - generic [ref=e583]: ·
          - generic [ref=e584]: Joypurhat · BD
          - generic [ref=e585]: ·
          - generic [ref=e586]: 176 GH
          - generic [ref=e587]: ·
          - generic [ref=e588]: MMXXVII
          - generic [ref=e589]: ·
          - link "University of the People — B.Sc. Computer Science (in progress)" [ref=e590]:
            - /url: https://www.uopeople.edu/
            - text: B.Sc. CS · UoPeople
          - generic [ref=e591]: ·
          - generic "Time until MMXXVII (2027-01-01, Asia/Dhaka)" [ref=e592]:
            - text: → 186d 02h 11m
            - generic [ref=e593]: MMXXVII
        - link "Open from Q1 ’27 — booking through Q4 ’27" [ref=e594]:
          - /url: /contact
          - text: Open from Q1 ’27 — booking through Q4 ’27
          - generic [ref=e596]: ↗
    - generic [ref=e597]:
      - generic [ref=e598]:
        - generic [ref=e599]:
          - paragraph [ref=e600]: ◊ Open from Q1 ’27 — booking through Q4 ’27 · Selected projects
          - heading "Have an idea? Let's build it." [level=2] [ref=e601]:
            - generic [ref=e602]: Have an idea?
            - generic [ref=e603]: Let's build it.
          - generic [ref=e604]:
            - link "hello@delowarhossain.dev" [ref=e605]:
              - /url: /contact
              - text: hello@delowarhossain.dev
              - generic [ref=e606]: ↗
            - button "Copy email address to clipboard" [ref=e607]: ⎘
        - generic [ref=e608]:
          - generic [ref=e609]:
            - paragraph [ref=e610]: Pages
            - list [ref=e611]:
              - listitem [ref=e612]:
                - link "Index" [ref=e613]:
                  - /url: /
              - listitem [ref=e614]:
                - link "Works" [ref=e615]:
                  - /url: /works
              - listitem [ref=e616]:
                - link "Lab" [ref=e617]:
                  - /url: /lab
              - listitem [ref=e618]:
                - link "Process" [ref=e619]:
                  - /url: /process
              - listitem [ref=e620]:
                - link "About" [ref=e621]:
                  - /url: /about
              - listitem [ref=e622]:
                - link "Resume" [ref=e623]:
                  - /url: /resume
              - listitem [ref=e624]:
                - link "Journal" [ref=e625]:
                  - /url: /journal
              - listitem [ref=e626]:
                - link "Services" [ref=e627]:
                  - /url: /services
              - listitem [ref=e628]:
                - link "Uses" [ref=e629]:
                  - /url: /uses
              - listitem [ref=e630]:
                - link "Contact" [ref=e631]:
                  - /url: /contact
              - listitem [ref=e632]:
                - link "AI Summary" [ref=e633]:
                  - /url: /ai
          - generic [ref=e634]:
            - paragraph [ref=e635]: Connect
            - list [ref=e636]:
              - listitem [ref=e637]:
                - link "GITHUB" [ref=e638]:
                  - /url: https://github.com/mdhossain-2437
              - listitem [ref=e639]:
                - link "LINKEDIN" [ref=e640]:
                  - /url: https://www.linkedin.com/in/mdhossain2437
              - listitem [ref=e641]:
                - link "TWITTER" [ref=e642]:
                  - /url: https://twitter.com/mdhossain2437
              - listitem [ref=e643]:
                - link "INSTAGRAM" [ref=e644]:
                  - /url: https://www.instagram.com/mdhossain2437
              - listitem [ref=e645]:
                - link "FACEBOOK" [ref=e646]:
                  - /url: https://www.facebook.com/mdhossain2437
              - listitem [ref=e647]:
                - link "READ.CV" [ref=e648]:
                  - /url: https://read.cv/delowar
          - generic [ref=e649]:
            - paragraph [ref=e650]: Studio
            - list [ref=e651]:
              - listitem [ref=e652]:
                - link "Now" [ref=e653]:
                  - /url: /now
              - listitem [ref=e654]:
                - link "Uses" [ref=e655]:
                  - /url: /uses
              - listitem [ref=e656]:
                - link "Brand" [ref=e657]:
                  - /url: /brand
              - listitem [ref=e658]:
                - link "Colors" [ref=e659]:
                  - /url: /colors
              - listitem [ref=e660]:
                - link "Changelog" [ref=e661]:
                  - /url: /changelog
              - listitem [ref=e662]:
                - link "Showreel" [ref=e663]:
                  - /url: /showreel
              - listitem [ref=e664]:
                - link "Atlas" [ref=e665]:
                  - /url: /atlas
              - listitem [ref=e666]:
                - link "Recognition" [ref=e667]:
                  - /url: /awards
              - listitem [ref=e668]:
                - link "Achievements" [ref=e669]:
                  - /url: /achievements
              - listitem [ref=e670]:
                - link "Colophon" [ref=e671]:
                  - /url: /colophon
              - listitem [ref=e672]:
                - link "Privacy" [ref=e673]:
                  - /url: /legal/privacy
              - listitem [ref=e674]:
                - link "Terms" [ref=e675]:
                  - /url: /legal/terms
      - generic [ref=e676]:
        - generic [ref=e677]:
          - paragraph [ref=e678]: ◌ Signed
          - img "Delowar Hossain signature" [ref=e679]:
            - generic [ref=e681]: Delowar Hossain
        - paragraph [ref=e683]: handwritten in vector — strokes draw on view
      - generic [ref=e684]:
        - button "Quote of the day — click to copy" [ref=e686]:
          - generic [ref=e687]: ◊ Quote of the day · 206 / 365
          - generic [ref=e688]: “A particle system with art direction is weather.”
        - paragraph [ref=e689]:
          - text: ◌ A new quote rotates in at 00:00 UTC.
          - text: Click to copy. Three hundred sixty-five total.
      - generic [ref=e692]:
        - generic [ref=e693]:
          - generic [ref=e694]: DELOWAR HOSSAIN
          - generic [ref=e695]: •
        - generic [ref=e696]:
          - generic [ref=e697]: CREATIVE DEVELOPER
          - generic [ref=e698]: •
        - generic [ref=e699]:
          - generic [ref=e700]: UI / UX DESIGNER
          - generic [ref=e701]: •
        - generic [ref=e702]:
          - generic [ref=e703]: WEBGL · THREE.JS · GLSL
          - generic [ref=e704]: •
        - generic [ref=e705]:
          - generic [ref=e706]: OPEN FROM Q1 ’27 — BOOKING THROUGH Q4 ’27
          - generic [ref=e707]: •
        - generic [ref=e708]:
          - generic [ref=e709]: JOYPURHAT, BANGLADESH
          - generic [ref=e710]: •
        - generic [ref=e711]:
          - generic [ref=e712]: MMXXVII / 03.27
          - generic [ref=e713]: •
        - generic [ref=e714]:
          - generic [ref=e715]: DELOWAR HOSSAIN · MMXXVII
          - generic [ref=e716]: •
        - generic [ref=e717]:
          - generic [ref=e718]: DELOWAR HOSSAIN
          - generic [ref=e719]: •
        - generic [ref=e720]:
          - generic [ref=e721]: CREATIVE DEVELOPER
          - generic [ref=e722]: •
        - generic [ref=e723]:
          - generic [ref=e724]: UI / UX DESIGNER
          - generic [ref=e725]: •
        - generic [ref=e726]:
          - generic [ref=e727]: WEBGL · THREE.JS · GLSL
          - generic [ref=e728]: •
        - generic [ref=e729]:
          - generic [ref=e730]: OPEN FROM Q1 ’27 — BOOKING THROUGH Q4 ’27
          - generic [ref=e731]: •
        - generic [ref=e732]:
          - generic [ref=e733]: JOYPURHAT, BANGLADESH
          - generic [ref=e734]: •
        - generic [ref=e735]:
          - generic [ref=e736]: MMXXVII / 03.27
          - generic [ref=e737]: •
        - generic [ref=e738]:
          - generic [ref=e739]: DELOWAR HOSSAIN · MMXXVII
          - generic [ref=e740]: •
      - generic [ref=e741]:
        - paragraph [ref=e742]:
          - text: © 2027
          - button "Studio mark" [ref=e743]: The Compiled Thought
          - text: . All rights reserved · MMXXVII.
        - paragraph [ref=e744]:
          - text: Lat. 25.10° N · Long. 89.02° E · Joypurhat, Bangladesh ·
          - generic [ref=e745]: 21:48:45
          - text: BST
        - generic [ref=e746]:
          - link "◇ local" [ref=e747]:
            - /url: https://github.com/mdhossain-2437/Creative-Folio
          - button "Toggle motion" [ref=e748]:
            - generic [ref=e751]: Motion On
          - generic [ref=e752]: v MMXXVII / 03.27
  - alert [ref=e753]
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