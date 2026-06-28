# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> Smoke tests - critical routes >> should have no accessibility violations on /
- Location: e2e\smoke.spec.ts:47:9

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -   1
+ Received  + 919

- Array []
+ Array [
+   Object {
+     "description": "Ensure ARIA attributes are not prohibited for an element's role",
+     "help": "Elements must only use permitted ARIA attributes",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.12/aria-prohibited-attr?application=playwright",
+     "id": "aria-prohibited-attr",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [],
+         "failureSummary": "Fix all of the following:
+   aria-label attribute cannot be used on a span with no valid role attribute.",
+         "html": "<span aria-label=\"◌ Folio MMXXVII\"><span aria-hidden=\"true\">◌ Folio MMXXVII</span></span>",
+         "impact": "serious",
+         "none": Array [
+           Object {
+             "data": Object {
+               "messageKey": "noRoleSingular",
+               "nodeName": "span",
+               "prohibited": Array [
+                 "aria-label",
+               ],
+               "role": null,
+             },
+             "id": "aria-prohibited-attr",
+             "impact": "serious",
+             "message": "aria-label attribute cannot be used on a span with no valid role attribute.",
+             "relatedNodes": Array [],
+           },
+         ],
+         "target": Array [
+           "span[aria-label=\"◌ Folio MMXXVII\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [],
+         "failureSummary": "Fix all of the following:
+   aria-label attribute cannot be used on a span with no valid role attribute.",
+         "html": "<span aria-label=\"§02 — Selected Works\"><span aria-hidden=\"true\">§02 — Selected Works</span></span>",
+         "impact": "serious",
+         "none": Array [
+           Object {
+             "data": Object {
+               "messageKey": "noRoleSingular",
+               "nodeName": "span",
+               "prohibited": Array [
+                 "aria-label",
+               ],
+               "role": null,
+             },
+             "id": "aria-prohibited-attr",
+             "impact": "serious",
+             "message": "aria-label attribute cannot be used on a span with no valid role attribute.",
+             "relatedNodes": Array [],
+           },
+         ],
+         "target": Array [
+           "span[aria-label=\"§02 — Selected Works\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [],
+         "failureSummary": "Fix all of the following:
+   aria-label attribute cannot be used on a span with no valid role attribute.",
+         "html": "<span aria-label=\"24\"><span aria-hidden=\"true\">0</span></span>",
+         "impact": "serious",
+         "none": Array [
+           Object {
+             "data": Object {
+               "messageKey": "noRoleSingular",
+               "nodeName": "span",
+               "prohibited": Array [
+                 "aria-label",
+               ],
+               "role": null,
+             },
+             "id": "aria-prohibited-attr",
+             "impact": "serious",
+             "message": "aria-label attribute cannot be used on a span with no valid role attribute.",
+             "relatedNodes": Array [],
+           },
+         ],
+         "target": Array [
+           "span[aria-label=\"24\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [],
+         "failureSummary": "Fix all of the following:
+   aria-label attribute cannot be used on a span with no valid role attribute.",
+         "html": "<span aria-label=\"05\"><span aria-hidden=\"true\">0<!-- -->0</span></span>",
+         "impact": "serious",
+         "none": Array [
+           Object {
+             "data": Object {
+               "messageKey": "noRoleSingular",
+               "nodeName": "span",
+               "prohibited": Array [
+                 "aria-label",
+               ],
+               "role": null,
+             },
+             "id": "aria-prohibited-attr",
+             "impact": "serious",
+             "message": "aria-label attribute cannot be used on a span with no valid role attribute.",
+             "relatedNodes": Array [],
+           },
+         ],
+         "target": Array [
+           ".border-l.pl-6.reveal:nth-child(2) > .text-\\[clamp\\(3rem\\,7vw\\,6\\.5rem\\)\\].leading-none.tracking-tightest > span[aria-label=\"05\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [],
+         "failureSummary": "Fix all of the following:
+   aria-label attribute cannot be used on a span with no valid role attribute.",
+         "html": "<span aria-label=\"05\"><span aria-hidden=\"true\">0<!-- -->0</span></span>",
+         "impact": "serious",
+         "none": Array [
+           Object {
+             "data": Object {
+               "messageKey": "noRoleSingular",
+               "nodeName": "span",
+               "prohibited": Array [
+                 "aria-label",
+               ],
+               "role": null,
+             },
+             "id": "aria-prohibited-attr",
+             "impact": "serious",
+             "message": "aria-label attribute cannot be used on a span with no valid role attribute.",
+             "relatedNodes": Array [],
+           },
+         ],
+         "target": Array [
+           ".border-l.pl-6.reveal:nth-child(3) > .text-\\[clamp\\(3rem\\,7vw\\,6\\.5rem\\)\\].leading-none.tracking-tightest > span[aria-label=\"05\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [],
+         "failureSummary": "Fix all of the following:
+   aria-label attribute cannot be used on a span with no valid role attribute.",
+         "html": "<span aria-label=\"98\"><span aria-hidden=\"true\">0</span></span>",
+         "impact": "serious",
+         "none": Array [
+           Object {
+             "data": Object {
+               "messageKey": "noRoleSingular",
+               "nodeName": "span",
+               "prohibited": Array [
+                 "aria-label",
+               ],
+               "role": null,
+             },
+             "id": "aria-prohibited-attr",
+             "impact": "serious",
+             "message": "aria-label attribute cannot be used on a span with no valid role attribute.",
+             "relatedNodes": Array [],
+           },
+         ],
+         "target": Array [
+           "span[aria-label=\"98\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [],
+         "failureSummary": "Fix all of the following:
+   aria-label attribute cannot be used on a span with no valid role attribute.",
+         "html": "<span aria-label=\"§09 — Process\"><span aria-hidden=\"true\">§09 — Process</span></span>",
+         "impact": "serious",
+         "none": Array [
+           Object {
+             "data": Object {
+               "messageKey": "noRoleSingular",
+               "nodeName": "span",
+               "prohibited": Array [
+                 "aria-label",
+               ],
+               "role": null,
+             },
+             "id": "aria-prohibited-attr",
+             "impact": "serious",
+             "message": "aria-label attribute cannot be used on a span with no valid role attribute.",
+             "relatedNodes": Array [],
+           },
+         ],
+         "target": Array [
+           "span[aria-label=\"§09 — Process\"]",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.aria",
+       "wcag2a",
+       "wcag412",
+       "EN-301-549",
+       "EN-9.4.1.2",
+       "RGAAv4",
+       "RGAA-7.1.1",
+     ],
+   },
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
+         "html": "<h3 class=\"mt-4 font-serif text-3xl tracking-tightest\">Editorial Restraint</h3>",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".pt-6.reveal.border-t:nth-child(1) > .text-3xl",
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
+         "html": "<ul class=\"grid grid-cols-2 gap-y-10 md:grid-cols-4\">",
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
+                 "html": "<div class=\"reveal border-l border-warmwhite/15 pl-6\" style=\"transition-delay: 0s;\">",
+                 "target": Array [
+                   ".border-l.pl-6.reveal:nth-child(1)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal border-l border-warmwhite/15 pl-6\" style=\"transition-delay: 0.06s;\">",
+                 "target": Array [
+                   ".border-l.pl-6.reveal:nth-child(2)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal border-l border-warmwhite/15 pl-6\" style=\"transition-delay: 0.12s;\">",
+                 "target": Array [
+                   ".border-l.pl-6.reveal:nth-child(3)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal border-l border-warmwhite/15 pl-6\" style=\"transition-delay: 0.18s;\">",
+                 "target": Array [
+                   ".border-l.pl-6.reveal:nth-child(4)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "target": Array [
+           ".gap-y-10",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [],
+         "failureSummary": "Fix all of the following:
+   List element has direct children that are not allowed: div",
+         "html": "<ul class=\"mt-16 grid grid-cols-1 gap-px bg-warmwhite/15 border border-warmwhite/15 md:grid-cols-2\">",
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
+                   ".md\\:grid-cols-2.gap-px.mt-16 > .reveal:nth-child(1)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.08s;\">",
+                 "target": Array [
+                   ".md\\:grid-cols-2.gap-px.mt-16 > .reveal:nth-child(2)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.16s;\">",
+                 "target": Array [
+                   ".md\\:grid-cols-2.gap-px.mt-16 > .reveal:nth-child(3)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.24s;\">",
+                 "target": Array [
+                   ".md\\:grid-cols-2.gap-px.mt-16 > .reveal:nth-child(4)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "target": Array [
+           ".md\\:grid-cols-2.gap-px.mt-16",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [],
+         "failureSummary": "Fix all of the following:
+   List element has direct children that are not allowed: div",
+         "html": "<ul class=\"mt-16 divide-y divide-warmwhite/15 border-t border-warmwhite/15\">",
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
+                   "div[data-section-id=\"capabilities\"] > .py-28.md\\:py-40 > .mx-auto.max-w-\\[1640px\\].md\\:px-10 > .divide-y.divide-warmwhite\\/15.mt-16 > .reveal:nth-child(1)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.05s;\">",
+                 "target": Array [
+                   "div[data-section-id=\"capabilities\"] > .py-28.md\\:py-40 > .mx-auto.max-w-\\[1640px\\].md\\:px-10 > .divide-y.divide-warmwhite\\/15.mt-16 > .reveal:nth-child(2)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.1s;\">",
+                 "target": Array [
+                   "div[data-section-id=\"capabilities\"] > .py-28.md\\:py-40 > .mx-auto.max-w-\\[1640px\\].md\\:px-10 > .divide-y.divide-warmwhite\\/15.mt-16 > .reveal:nth-child(3)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.15s;\">",
+                 "target": Array [
+                   "div[data-section-id=\"capabilities\"] > .py-28.md\\:py-40 > .mx-auto.max-w-\\[1640px\\].md\\:px-10 > .divide-y.divide-warmwhite\\/15.mt-16 > .reveal:nth-child(4)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "target": Array [
+           "div[data-section-id=\"capabilities\"] > .py-28.md\\:py-40 > .mx-auto.max-w-\\[1640px\\].md\\:px-10 > .divide-y.divide-warmwhite\\/15.mt-16",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [],
+         "failureSummary": "Fix all of the following:
+   List element has direct children that are not allowed: div",
+         "html": "<ul class=\"mt-16 divide-y divide-warmwhite/15 border-y border-warmwhite/15\">",
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
+                   ".divide-y.divide-warmwhite\\/15.border-y > .reveal:nth-child(1)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.05s;\">",
+                 "target": Array [
+                   ".divide-y.divide-warmwhite\\/15.border-y > .reveal:nth-child(2)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.1s;\">",
+                 "target": Array [
+                   ".divide-y.divide-warmwhite\\/15.border-y > .reveal:nth-child(3)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0.15s;\">",
+                 "target": Array [
+                   ".divide-y.divide-warmwhite\\/15.border-y > .reveal:nth-child(4)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "target": Array [
+           ".divide-y.divide-warmwhite\\/15.border-y",
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
+         "html": "<li class=\"flex flex-col justify-between bg-ink-900 p-8 md:p-12 h-full\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(1) > .p-8.md\\:p-12.bg-ink-900",
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
+         "html": "<li class=\"flex flex-col justify-between bg-ink-900 p-8 md:p-12 h-full\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(2) > .p-8.md\\:p-12.bg-ink-900",
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
+         "html": "<li class=\"flex flex-col justify-between bg-ink-900 p-8 md:p-12 h-full\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(3) > .p-8.md\\:p-12.bg-ink-900",
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
+         "html": "<li class=\"flex flex-col justify-between bg-ink-900 p-8 md:p-12 h-full\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(4) > .p-8.md\\:p-12.bg-ink-900",
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
+         "html": "<li class=\"grid grid-cols-1 gap-6 py-10 md:grid-cols-12 md:gap-10 md:py-14\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(1) > .md\\:py-14.py-10.md\\:gap-10",
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
+         "html": "<li class=\"grid grid-cols-1 gap-6 py-10 md:grid-cols-12 md:gap-10 md:py-14\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(2) > .md\\:py-14.py-10.md\\:gap-10",
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
+         "html": "<li class=\"grid grid-cols-1 gap-6 py-10 md:grid-cols-12 md:gap-10 md:py-14\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(3) > .md\\:py-14.py-10.md\\:gap-10",
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
+         "html": "<li class=\"grid grid-cols-1 gap-6 py-10 md:grid-cols-12 md:gap-10 md:py-14\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(4) > .md\\:py-14.py-10.md\\:gap-10",
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
+           ".divide-y.divide-warmwhite\\/15.border-y > .reveal:nth-child(1) > li",
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
+           ".divide-y.divide-warmwhite\\/15.border-y > .reveal:nth-child(2) > li",
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
+           ".divide-y.divide-warmwhite\\/15.border-y > .reveal:nth-child(3) > li",
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
+           ".divide-y.divide-warmwhite\\/15.border-y > .reveal:nth-child(4) > li",
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
+     "description": "Ensure [role=\"img\"] elements have alternative text",
+     "help": "[role=\"img\"] elements must have alternative text",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.12/role-img-alt?application=playwright",
+     "id": "role-img-alt",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "aria-label",
+             "impact": "serious",
+             "message": "aria-label attribute does not exist or is empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "aria-labelledby",
+             "impact": "serious",
+             "message": "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": Object {
+               "messageKey": "noAttr",
+             },
+             "id": "non-empty-title",
+             "impact": "serious",
+             "message": "Element has no title attribute",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   aria-label attribute does not exist or is empty
+   aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
+   Element has no title attribute",
+         "html": "<canvas aria-label=\"\" role=\"img\" class=\"absolute inset-0 h-full w-full mix-blend-screen opacity-80\" width=\"320\" height=\"224\"></canvas>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"aura-void\"] > .h-56.w-80.scale-95 > .opacity-80[aria-label=\"\"][width=\"320\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "aria-label",
+             "impact": "serious",
+             "message": "aria-label attribute does not exist or is empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "aria-labelledby",
+             "impact": "serious",
+             "message": "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": Object {
+               "messageKey": "noAttr",
+             },
+             "id": "non-empty-title",
+             "impact": "serious",
+             "message": "Element has no title attribute",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   aria-label attribute does not exist or is empty
+   aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
+   Element has no title attribute",
+         "html": "<canvas aria-label=\"\" role=\"img\" class=\"absolute inset-0 h-full w-full mix-blend-screen opacity-80\" width=\"320\" height=\"224\"></canvas>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"terminal-state\"] > .h-56.w-80.scale-95 > .opacity-80[aria-label=\"\"][width=\"320\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "aria-label",
+             "impact": "serious",
+             "message": "aria-label attribute does not exist or is empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "aria-labelledby",
+             "impact": "serious",
+             "message": "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": Object {
+               "messageKey": "noAttr",
+             },
+             "id": "non-empty-title",
+             "impact": "serious",
+             "message": "Element has no title attribute",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   aria-label attribute does not exist or is empty
+   aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
+   Element has no title attribute",
+         "html": "<canvas aria-label=\"\" role=\"img\" class=\"absolute inset-0 h-full w-full mix-blend-screen opacity-80\" width=\"320\" height=\"224\"></canvas>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"monolith-ui\"] > .h-56.w-80.scale-95 > .opacity-80[aria-label=\"\"][width=\"320\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "aria-label",
+             "impact": "serious",
+             "message": "aria-label attribute does not exist or is empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "aria-labelledby",
+             "impact": "serious",
+             "message": "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": Object {
+               "messageKey": "noAttr",
+             },
+             "id": "non-empty-title",
+             "impact": "serious",
+             "message": "Element has no title attribute",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   aria-label attribute does not exist or is empty
+   aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
+   Element has no title attribute",
+         "html": "<canvas aria-label=\"\" role=\"img\" class=\"absolute inset-0 h-full w-full mix-blend-screen opacity-80\" width=\"320\" height=\"224\"></canvas>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"kinetica\"] > .h-56.w-80.scale-95 > .opacity-80[aria-label=\"\"][width=\"320\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "aria-label",
+             "impact": "serious",
+             "message": "aria-label attribute does not exist or is empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "aria-labelledby",
+             "impact": "serious",
+             "message": "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": Object {
+               "messageKey": "noAttr",
+             },
+             "id": "non-empty-title",
+             "impact": "serious",
+             "message": "Element has no title attribute",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   aria-label attribute does not exist or is empty
+   aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
+   Element has no title attribute",
+         "html": "<canvas aria-label=\"\" role=\"img\" class=\"absolute inset-0 h-full w-full mix-blend-screen opacity-80\" width=\"320\" height=\"224\"></canvas>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"void-engine\"] > .h-56.w-80.scale-95 > .opacity-80[aria-label=\"\"][width=\"320\"]",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.text-alternatives",
+       "wcag2a",
+       "wcag111",
+       "section508",
+       "section508.22.a",
+       "TTv5",
+       "TT7.a",
+       "EN-301-549",
+       "EN-9.1.1.1",
+       "ACT",
+       "RGAAv4",
+       "RGAA-1.1.1",
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
        - listitem [ref=e18]:
          - link "Works" [ref=e19]:
            - /url: /works
            - generic [ref=e20]: Works
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
    - generic [ref=e48]:
      - generic [ref=e51]:
        - paragraph [ref=e52]:
          - generic "◌ Folio MMXXVII" [ref=e53]
        - generic [ref=e54]:
          - heading "Delowar Hossain." [level=1] [ref=e55]:
            - generic [ref=e57]:
              - generic [ref=e58]: D
              - generic [ref=e59]: e
              - generic [ref=e60]: l
              - generic [ref=e61]: o
              - generic [ref=e62]: w
              - generic [ref=e63]: a
              - generic [ref=e64]: r
            - generic [ref=e66]:
              - generic [ref=e67]: H
              - generic [ref=e68]: o
              - generic [ref=e69]: s
              - generic [ref=e70]: s
              - generic [ref=e71]: a
              - generic [ref=e72]: i
              - generic [ref=e73]: "n"
              - generic [ref=e74]: .
          - generic [ref=e75]:
            - paragraph [ref=e76]: Creative Developer. Award-grade web experiences where typography, motion, and engineering converge.
            - generic [ref=e77]:
              - link "Selected Works" [ref=e79]:
                - /url: /works
                - text: Selected Works
                - generic [ref=e80]: ↗
              - link "Start a Project" [ref=e82]:
                - /url: /contact
      - generic [ref=e85]:
        - generic [ref=e86]:
          - generic [ref=e87]: UI / UX DESIGN
          - generic [ref=e88]: •
        - generic [ref=e89]:
          - generic [ref=e90]: WEBGL
          - generic [ref=e91]: •
        - generic [ref=e92]:
          - generic [ref=e93]: THREE.JS
          - generic [ref=e94]: •
        - generic [ref=e95]:
          - generic [ref=e96]: GSAP
          - generic [ref=e97]: •
        - generic [ref=e98]:
          - generic [ref=e99]: CREATIVE DIRECTION
          - generic [ref=e100]: •
        - generic [ref=e101]:
          - generic [ref=e102]: WEB DESIGN
          - generic [ref=e103]: •
        - generic [ref=e104]:
          - generic [ref=e105]: LOGO & BRANDING
          - generic [ref=e106]: •
        - generic [ref=e107]:
          - generic [ref=e108]: FRAMER · WEBFLOW
          - generic [ref=e109]: •
        - generic [ref=e110]:
          - generic [ref=e111]: GLSL SHADERS
          - generic [ref=e112]: •
        - generic [ref=e113]:
          - generic [ref=e114]: AI INTEGRATION
          - generic [ref=e115]: •
        - generic [ref=e116]:
          - generic [ref=e117]: MMXXVII
          - generic [ref=e118]: •
        - generic [ref=e119]:
          - generic [ref=e120]: UI / UX DESIGN
          - generic [ref=e121]: •
        - generic [ref=e122]:
          - generic [ref=e123]: WEBGL
          - generic [ref=e124]: •
        - generic [ref=e125]:
          - generic [ref=e126]: THREE.JS
          - generic [ref=e127]: •
        - generic [ref=e128]:
          - generic [ref=e129]: GSAP
          - generic [ref=e130]: •
        - generic [ref=e131]:
          - generic [ref=e132]: CREATIVE DIRECTION
          - generic [ref=e133]: •
        - generic [ref=e134]:
          - generic [ref=e135]: WEB DESIGN
          - generic [ref=e136]: •
        - generic [ref=e137]:
          - generic [ref=e138]: LOGO & BRANDING
          - generic [ref=e139]: •
        - generic [ref=e140]:
          - generic [ref=e141]: FRAMER · WEBFLOW
          - generic [ref=e142]: •
        - generic [ref=e143]:
          - generic [ref=e144]: GLSL SHADERS
          - generic [ref=e145]: •
        - generic [ref=e146]:
          - generic [ref=e147]: AI INTEGRATION
          - generic [ref=e148]: •
        - generic [ref=e149]:
          - generic [ref=e150]: MMXXVII
          - generic [ref=e151]: •
    - generic [ref=e154]:
      - paragraph [ref=e155]: §01 — Manifesto
      - paragraph [ref=e157]: I believe an interface should disappear, leaving only the canvas and the content. I build digital products at the intersection of brutalist editorial design and fluid, high-performance creative development — where typography, motion, and engineering converge into a single physical-feeling experience.
      - generic [ref=e159]:
        - generic [ref=e160]:
          - paragraph [ref=e161]: ◊ Practitioner
          - paragraph [ref=e162]:
            - text: Delowar Hossain — self-taught creative developer from Joypurhat, Bangladesh, currently an aspiring software engineer reading
            - link "B.Sc. Computer Science at University of the People" [ref=e163]:
              - /url: https://www.uopeople.edu/
            - text: . Building for the web since 2023.
        - link "Full story" [ref=e164]:
          - /url: /about
          - text: Full story
          - generic [ref=e165]: ↗
      - generic [ref=e166]:
        - generic [ref=e167]:
          - paragraph [ref=e168]: Direction
          - heading "Editorial Restraint" [level=3] [ref=e169]
          - paragraph [ref=e170]: Massive whitespace. Strict grids. Type that demands attention. Decisions, not decoration.
        - generic [ref=e171]:
          - paragraph [ref=e172]: Engineering
          - heading "Performance Discipline" [level=3] [ref=e173]
          - paragraph [ref=e174]: Sub-50 ms interactions. 60 fps motion. Lighthouse 95+. Craft, measured.
        - generic [ref=e175]:
          - paragraph [ref=e176]: System
          - heading "Production-Grade Motion" [level=3] [ref=e177]
          - paragraph [ref=e178]: Choreographed scroll, GSAP timelines, custom shaders — repeatable, accessible, calm.
    - generic [ref=e182]:
      - generic [ref=e183]:
        - generic [ref=e184]: Creative Developer
        - generic [ref=e185]: •
      - generic [ref=e186]:
        - generic [ref=e187]: Three.js · GLSL · WebGL
        - generic [ref=e188]: •
      - generic [ref=e189]:
        - generic [ref=e190]: Editorial Type
        - generic [ref=e191]: •
      - generic [ref=e192]:
        - generic [ref=e193]: Next.js · Nuxt · React
        - generic [ref=e194]: •
      - generic [ref=e195]:
        - generic [ref=e196]: Logo & Brand · Webflow · Framer
        - generic [ref=e197]: •
      - generic [ref=e198]:
        - generic [ref=e199]: Art Direction
        - generic [ref=e200]: •
      - generic [ref=e201]:
        - generic [ref=e202]: AI Integration · RAG
        - generic [ref=e203]: •
      - generic [ref=e204]:
        - generic [ref=e205]: Creative Developer
        - generic [ref=e206]: •
      - generic [ref=e207]:
        - generic [ref=e208]: Three.js · GLSL · WebGL
        - generic [ref=e209]: •
      - generic [ref=e210]:
        - generic [ref=e211]: Editorial Type
        - generic [ref=e212]: •
      - generic [ref=e213]:
        - generic [ref=e214]: Next.js · Nuxt · React
        - generic [ref=e215]: •
      - generic [ref=e216]:
        - generic [ref=e217]: Logo & Brand · Webflow · Framer
        - generic [ref=e218]: •
      - generic [ref=e219]:
        - generic [ref=e220]: Art Direction
        - generic [ref=e221]: •
      - generic [ref=e222]:
        - generic [ref=e223]: AI Integration · RAG
        - generic [ref=e224]: •
    - generic [ref=e227]:
      - generic [ref=e228]:
        - generic [ref=e229]:
          - paragraph [ref=e230]:
            - generic "§02 — Selected Works" [ref=e231]
          - heading "Selected & Targeted." [level=2] [ref=e232]:
            - text: Selected &
            - text: Targeted.
        - link "View All Archive" [ref=e233]:
          - /url: /works
          - text: View All Archive
          - generic [ref=e234]: ↗
      - list [ref=e235]:
        - listitem [ref=e236]:
          - 'link "Open case study: Aura Void — WebGL · Creative Direction, 2027" [ref=e238]':
            - /url: /works/aura-void
            - generic [ref=e239]:
              - generic [ref=e240]: 01 · 2027
              - generic [ref=e241]: Aura Void
            - generic [ref=e242]:
              - generic [ref=e243]: WebGL · Creative Direction
              - generic [ref=e244]: Three.js · GLSL · GSAP
            - generic:
              - img "Aura Void"
              - img
        - listitem [ref=e245]:
          - 'link "Open case study: Terminal State — Creative Direction · Editorial, 2025" [ref=e247]':
            - /url: /works/terminal-state
            - generic [ref=e248]:
              - generic [ref=e249]: 02 · 2025
              - generic [ref=e250]: Terminal State
            - generic [ref=e251]:
              - generic [ref=e252]: Creative Direction · Editorial
              - generic [ref=e253]: Next.js · GSAP · Framer Motion
            - generic:
              - img "Terminal State"
              - img
        - listitem [ref=e254]:
          - 'link "Open case study: Monolith UI — Design Systems · Engineering, 2025" [ref=e256]':
            - /url: /works/monolith-ui
            - generic [ref=e257]:
              - generic [ref=e258]: 03 · 2025
              - generic [ref=e259]: Monolith UI
            - generic [ref=e260]:
              - generic [ref=e261]: Design Systems · Engineering
              - generic [ref=e262]: React · Radix · TypeScript
            - generic:
              - img "Monolith UI"
              - img
        - listitem [ref=e263]:
          - 'link "Open case study: Kinetica — Typography · Motion, 2025" [ref=e265]':
            - /url: /works/kinetica
            - generic [ref=e266]:
              - generic [ref=e267]: 04 · 2025
              - generic [ref=e268]: Kinetica
            - generic [ref=e269]:
              - generic [ref=e270]: Typography · Motion
              - generic [ref=e271]: Variable Fonts · GSAP · WebGL
            - generic:
              - img "Kinetica"
              - img
        - listitem [ref=e272]:
          - 'link "Open case study: Void Engine — Audio-Visual Experience, 2024" [ref=e274]':
            - /url: /works/void-engine
            - generic [ref=e275]:
              - generic [ref=e276]: 05 · 2024
              - generic [ref=e277]: Void Engine
            - generic [ref=e278]:
              - generic [ref=e279]: Audio-Visual Experience
              - generic [ref=e280]: Three.js · GLSL · Web Audio API
            - generic:
              - img "Void Engine"
              - img
    - generic [ref=e284]:
      - generic [ref=e285]:
        - paragraph [ref=e286]: §03 — Reel · 02:17
        - heading "Six chapters, one quiet reel." [level=2] [ref=e287]:
          - text: Six chapters,
          - generic [ref=e288]: one quiet reel.
        - paragraph [ref=e289]: A vertical reel of selected motion work, 2026–2027. Open it fullscreen with the play pill, or jump to any chapter.
        - generic [ref=e290]:
          - button "Play immersive reel" [ref=e291]: Play immersive reel
          - link "Chapter index ↗" [ref=e293]:
            - /url: /showreel
      - list [ref=e295]:
        - listitem [ref=e296]:
          - generic [ref=e297]: §01
          - generic [ref=e298]: Aura Void · the noise field
          - generic [ref=e299]: Build
          - generic [ref=e300]: 00:24
        - listitem [ref=e301]:
          - generic [ref=e302]: §02
          - generic [ref=e303]: Halcyon OS · ambient AI surfaces
          - generic [ref=e304]: Concept
          - generic [ref=e305]: 00:31
        - listitem [ref=e306]:
          - generic [ref=e307]: §03
          - generic [ref=e308]: Echo Atlas · binaural cities
          - generic [ref=e309]: Build
          - generic [ref=e310]: 00:42
        - listitem [ref=e311]:
          - generic [ref=e312]: §04
          - generic [ref=e313]: On craft, in 2027
          - generic [ref=e314]: Reflection
          - generic [ref=e315]: 00:58
    - generic [ref=e317]:
      - generic [ref=e318]:
        - paragraph [ref=e319]: §04 — Milestones · 2023 → 2027
        - heading "Five years. Five chapters. One slow, deliberate climb." [level=2] [ref=e320]:
          - text: Five years. Five chapters.
          - generic [ref=e321]: One slow, deliberate climb.
      - generic [ref=e323]:
        - complementary [ref=e324]:
          - generic [ref=e325]:
            - paragraph [ref=e326]: ◊ scroll the chapters
            - generic [ref=e327]:
              - generic [ref=e329]: §01 / 05
              - generic [ref=e330]: ·
              - generic [ref=e331]: "2023"
            - generic [ref=e332]:
              - generic [ref=e333]: "2023"
              - generic [ref=e334]: "2024"
              - generic [ref=e335]: "2025"
              - generic [ref=e336]: "2026"
              - generic [ref=e337]: "2027"
            - paragraph [ref=e338]: First line of code
            - paragraph [ref=e339]: Scroll to walk through the chapters. The year on the left flips as you cross each entry — every right-hand card carries its own year badge so nothing slips by.
            - list [ref=e340]:
              - listitem [ref=e341]
              - listitem [ref=e342]
              - listitem [ref=e343]
              - listitem [ref=e344]
              - listitem [ref=e345]
        - list [ref=e346]:
          - listitem [ref=e347]:
            - generic: "2023"
            - generic [ref=e348]:
              - paragraph [ref=e351]:
                - generic [ref=e352]: §01
                - text: ·2023
              - heading "First line of code" [level=3] [ref=e353]
              - paragraph [ref=e354]: Started the programming journey at 17. Daily HTML + CSS reps, vanilla JS experiments, and the first deployed personal site at 2023.delowarhossain.dev.
          - listitem [ref=e355]:
            - generic: "2024"
            - generic [ref=e356]:
              - paragraph [ref=e359]:
                - generic [ref=e360]: §02
                - text: ·2024
              - heading "First freelance brief" [level=3] [ref=e361]
              - paragraph [ref=e362]: Picked up React, Tailwind, and the Next.js mental model. Shipped the 2024.delowarhossain.dev rebuild and the first client landing pages.
          - listitem [ref=e363]:
            - generic: "2025"
            - generic [ref=e364]:
              - paragraph [ref=e367]:
                - generic [ref=e368]: §03
                - text: ·2025
              - heading "WebGL + motion deep-dive" [level=3] [ref=e369]
              - paragraph [ref=e370]: Went all-in on GSAP, Lenis, and raw WebGL2. Rebuilt the portfolio at 2025.delowarhossain.dev around shader-driven heroes and editorial typography.
          - listitem [ref=e371]:
            - generic: "2026"
            - generic [ref=e372]:
              - paragraph [ref=e375]:
                - generic [ref=e376]: §04
                - text: ·2026
              - heading "Studio voice locked in" [level=3] [ref=e377]
              - paragraph [ref=e378]: Shipped the 2026.delowarhossain.dev edition — editorial-first, scroll-pinned process timelines, and the first WebGL displacement transitions.
          - listitem [ref=e379]:
            - generic: "2027"
            - generic [ref=e380]:
              - paragraph [ref=e383]:
                - generic [ref=e384]: §05
                - text: ·2027
              - heading "MMXXVII · Creative-Folio" [level=3] [ref=e385]
              - paragraph [ref=e386]: Next.js 16 · React 19 · GSAP · Lenis · raw WebGL2. Open for Q1 ’27 → Q4 ’27. Two ambitious products in active development.
    - generic [ref=e390]:
      - generic [ref=e391]:
        - paragraph [ref=e392]: §05 — /now
        - heading "What I'm doing right now." [level=2] [ref=e393]:
          - text: What I'm
          - generic [ref=e394]: doing right now.
        - paragraph [ref=e395]: Updated roughly once a month. The full /now page has the recent commits feed, the books I'm reading, and what's on the deck.
        - link "Open /now" [ref=e396]:
          - /url: /now
          - text: Open /now
          - generic [ref=e397]: ↗
      - list [ref=e398]:
        - listitem [ref=e399]:
          - paragraph [ref=e400]: BUILDING
          - paragraph [ref=e401]: Aura Void v2 — cursor-attractive fluid sim shader
        - listitem [ref=e402]:
          - paragraph [ref=e403]: WRITING
          - paragraph [ref=e404]: ‘Flexible page transitions’ essay (April ’26)
        - listitem [ref=e405]:
          - paragraph [ref=e406]: READING
          - paragraph [ref=e407]: ‘Designing Sound’ — Andy Farnell
        - listitem [ref=e408]:
          - paragraph [ref=e409]: LISTENING
          - paragraph [ref=e410]: Floating Points — Cascade
    - list [ref=e414]:
      - generic [ref=e415]:
        - paragraph [ref=e416]:
          - generic "24" [ref=e417]: "0"
        - paragraph [ref=e418]: Selected Works
      - generic [ref=e419]:
        - paragraph [ref=e420]:
          - generic "05" [ref=e421]:
            - generic [ref=e422]: "00"
        - paragraph [ref=e423]: Years Coding
      - generic [ref=e424]:
        - paragraph [ref=e425]:
          - generic "05" [ref=e426]:
            - generic [ref=e427]: "00"
        - paragraph [ref=e428]: Portfolios Shipped
      - generic [ref=e429]:
        - paragraph [ref=e430]:
          - generic "98" [ref=e431]: "0"
        - paragraph [ref=e432]: Avg. Lighthouse
    - generic [ref=e435]:
      - generic [ref=e436]:
        - paragraph [ref=e437]: §06 — Testimonials
        - heading "Kind words, earned." [level=2] [ref=e438]
      - list [ref=e439]:
        - listitem [ref=e441]:
          - blockquote [ref=e442]: “Delowar turned a vague brief into a site that won us an Awwwards mention in its first week. His command of motion and editorial restraint is unmatched.”
          - generic [ref=e443]:
            - generic [ref=e444]: NV
            - generic [ref=e445]:
              - paragraph [ref=e446]: Nora Vásquez
              - paragraph [ref=e447]: Head of Brand, Meridian Studio
        - listitem [ref=e449]:
          - blockquote [ref=e450]: “Working with Delowar felt like pairing with someone who speaks design and engineering at native fluency. Our conversion rate jumped 34% after the redesign.”
          - generic [ref=e451]:
            - generic [ref=e452]: AP
            - generic [ref=e453]:
              - paragraph [ref=e454]: Aiden Park
              - paragraph [ref=e455]: Co-Founder & CEO, Luminary AI
        - listitem [ref=e457]:
          - blockquote [ref=e458]: “He shipped a WebGL hero, a full design system, and a CMS integration — in six weeks. The codebase was the cleanest handoff I've ever received.”
          - generic [ref=e459]:
            - generic [ref=e460]: PS
            - generic [ref=e461]:
              - paragraph [ref=e462]: Priya Shankar
              - paragraph [ref=e463]: Engineering Lead, Sonder Health
        - listitem [ref=e465]:
          - blockquote [ref=e466]: “Every detail — from scroll easing to kerning — was intentional. The result felt like a physical object, not a website.”
          - generic [ref=e467]:
            - generic [ref=e468]: ML
            - generic [ref=e469]:
              - paragraph [ref=e470]: Marcus Lindqvist
              - paragraph [ref=e471]: Creative Director, Atelier Nord
    - generic [ref=e474]:
      - generic [ref=e475]:
        - paragraph [ref=e476]: §08 — Expertise
        - heading "What I do, in detail." [level=2] [ref=e477]
      - list [ref=e478]:
        - listitem [ref=e480]:
          - paragraph [ref=e481]: "01"
          - heading "Creative Development" [level=3] [ref=e482]
          - paragraph [ref=e483]: Pushing the boundaries of the browser. Custom 3D environments, complex shader materials, and fluid particle systems that respond to interaction with microscopic precision.
          - list [ref=e484]:
            - listitem [ref=e485]: WebGL
            - listitem [ref=e486]: Three.js
            - listitem [ref=e487]: GLSL
            - listitem [ref=e488]: GSAP
        - listitem [ref=e490]:
          - paragraph [ref=e491]: "02"
          - heading "UI / UX Design" [level=3] [ref=e492]
          - paragraph [ref=e493]: Crafting minimalist, intuitive interfaces that prioritise content and motion. Rigid grids and editorial whitespace to frame digital narratives effectively.
          - list [ref=e494]:
            - listitem [ref=e495]: UI / UX
            - listitem [ref=e496]: Design Systems
            - listitem [ref=e497]: Webflow
            - listitem [ref=e498]: Framer
        - listitem [ref=e500]:
          - paragraph [ref=e501]: "03"
          - heading "Art Direction" [level=3] [ref=e502]
          - paragraph [ref=e503]: Defining the visual language. From typography selection to color grading and motion choreography, every pixel aligns with the core brand identity.
          - list [ref=e504]:
            - listitem [ref=e505]: Art Direction
            - listitem [ref=e506]: Logo & Branding
            - listitem [ref=e507]: Typography
            - listitem [ref=e508]: Motion
        - listitem [ref=e510]:
          - paragraph [ref=e511]: "04"
          - heading "Full-Stack Engineering" [level=3] [ref=e512]
          - paragraph [ref=e513]: Production-grade systems with AI integration. Full-stack architecture, edge deployments, real-time pipelines, and pragmatic dev-ex.
          - list [ref=e514]:
            - listitem [ref=e515]: Next.js
            - listitem [ref=e516]: Node / Python
            - listitem [ref=e517]: AI / RAG
            - listitem [ref=e518]: DevOps
      - generic [ref=e519]:
        - paragraph [ref=e520]: Process · Discovery → Design → Prototype → Production
        - link "View Services" [ref=e521]:
          - /url: /services
          - text: View Services
          - generic [ref=e522]: ↗
    - generic [ref=e525]:
      - generic [ref=e526]:
        - paragraph [ref=e527]:
          - generic "§09 — Process" [ref=e528]
        - heading "Concept to Shader." [level=2] [ref=e529]
      - navigation "Process phases" [ref=e530]:
        - button "Phase I · Discovery" [ref=e531]
        - button "Phase II · Design" [ref=e532]
        - button "Phase III · Prototype" [ref=e533]
        - button "Phase IV · Production" [ref=e534]
      - generic [ref=e536]:
        - article [ref=e537]:
          - generic: "01"
          - generic [ref=e538]:
            - generic [ref=e539]:
              - generic [ref=e540]: Phase I
              - generic [ref=e541]: 1–2 weeks
            - heading "Discovery" [level=3] [ref=e542]
            - paragraph [ref=e543]: Understand narrative constraints. Map the audience, the systems, and the technical envelope before a single pixel.
            - list [ref=e544]:
              - listitem [ref=e545]:
                - generic [ref=e546]: "01"
                - generic [ref=e547]: Brief intake & strategic call
              - listitem [ref=e548]:
                - generic [ref=e549]: "02"
                - generic [ref=e550]: Audience + competitive landscape audit
              - listitem [ref=e551]:
                - generic [ref=e552]: "03"
                - generic [ref=e553]: Content + technical inventory
              - listitem [ref=e554]:
                - generic [ref=e555]: "04"
                - generic [ref=e556]: Information architecture sketch
              - listitem [ref=e557]:
                - generic [ref=e558]: "05"
                - generic [ref=e559]: Success metrics + KPI agreement
            - generic [ref=e560]:
              - generic [ref=e561]:
                - paragraph [ref=e562]: Deliverables
                - list [ref=e563]:
                  - listitem [ref=e564]: · Discovery deck (PDF)
                  - listitem [ref=e565]: · Sitemap + content matrix
                  - listitem [ref=e566]: · Tone-of-voice notes
              - generic [ref=e567]:
                - paragraph [ref=e568]: Tools
                - list [ref=e569]:
                  - listitem [ref=e570]: Figma · FigJam
                  - listitem [ref=e571]: Notion
                  - listitem [ref=e572]: Linear
                  - listitem [ref=e573]: Loom
            - paragraph [ref=e574]: Phase 1 of 4
        - article [ref=e575]:
          - generic: "02"
          - generic [ref=e576]:
            - generic [ref=e577]:
              - generic [ref=e578]: Phase II
              - generic [ref=e579]: 2–3 weeks
            - heading [level=3] [ref=e580]: Design
            - paragraph [ref=e581]: Establish the visual grid, typography rules, and static art direction. Prototype the silence between elements.
            - list [ref=e582]:
              - listitem [ref=e583]:
                - generic [ref=e584]: "01"
                - generic [ref=e585]: Mood-board + reference cull
              - listitem [ref=e586]:
                - generic [ref=e587]: "02"
                - generic [ref=e588]: Type + colour token system
              - listitem [ref=e589]:
                - generic [ref=e590]: "03"
                - generic [ref=e591]: Editorial grid + key frames
              - listitem [ref=e592]:
                - generic [ref=e593]: "04"
                - generic [ref=e594]: High-fidelity static comps
              - listitem [ref=e595]:
                - generic [ref=e596]: "05"
                - generic [ref=e597]: Accessibility + contrast pass
            - generic [ref=e598]:
              - generic [ref=e599]:
                - paragraph [ref=e600]: Deliverables
                - list [ref=e601]:
                  - listitem [ref=e602]: · Design system tokens
                  - listitem [ref=e603]: · Static high-fidelity pages
                  - listitem [ref=e604]: · Logo / brand mark exploration
              - generic [ref=e605]:
                - paragraph [ref=e606]: Tools
                - list [ref=e607]:
                  - listitem [ref=e608]: Figma
                  - listitem [ref=e609]: Tailwind tokens
                  - listitem [ref=e610]: Style Dictionary
            - paragraph [ref=e611]: Phase 2 of 4
        - article [ref=e612]:
          - generic: "03"
          - generic [ref=e613]:
            - generic [ref=e614]:
              - generic [ref=e615]: Phase III
              - generic [ref=e616]: 2–4 weeks
            - heading [level=3] [ref=e617]: Prototype
            - paragraph [ref=e618]: Draft core WebGL scenes, motion curves, and the choreography between page transitions and content systems.
            - list [ref=e619]:
              - listitem [ref=e620]:
                - generic [ref=e621]: "01"
                - generic [ref=e622]: Motion script + easing studies
              - listitem [ref=e623]:
                - generic [ref=e624]: "02"
                - generic [ref=e625]: Interactive prototype in Next.js
              - listitem [ref=e626]:
                - generic [ref=e627]: "03"
                - generic [ref=e628]: WebGL / shader sketches
              - listitem [ref=e629]:
                - generic [ref=e630]: "04"
                - generic [ref=e631]: Page-transition choreography
              - listitem [ref=e632]:
                - generic [ref=e633]: "05"
                - generic [ref=e634]: Performance budget set
            - generic [ref=e635]:
              - generic [ref=e636]:
                - paragraph [ref=e637]: Deliverables
                - list [ref=e638]:
                  - listitem [ref=e639]: · Clickable Next.js prototype
                  - listitem [ref=e640]: · Motion design doc
                  - listitem [ref=e641]: · Shader & canvas studies
              - generic [ref=e642]:
                - paragraph [ref=e643]: Tools
                - list [ref=e644]:
                  - listitem [ref=e645]: Next.js · React
                  - listitem [ref=e646]: GSAP · ScrollTrigger
                  - listitem [ref=e647]: Three.js · raw WebGL2
                  - listitem [ref=e648]: Lenis
            - paragraph [ref=e649]: Phase 3 of 4
        - article [ref=e650]:
          - generic: "04"
          - generic [ref=e651]:
            - generic [ref=e652]:
              - generic [ref=e653]: Phase IV
              - generic [ref=e654]: 3–6 weeks
            - heading [level=3] [ref=e655]: Production
            - paragraph [ref=e656]: Write custom GLSL shaders, build the engineering layer, ship with measurable performance and accessibility.
            - list [ref=e657]:
              - listitem [ref=e658]:
                - generic [ref=e659]: "01"
                - generic [ref=e660]: Component build-out + content wiring
              - listitem [ref=e661]:
                - generic [ref=e662]: "02"
                - generic [ref=e663]: GLSL / shader production pass
              - listitem [ref=e664]:
                - generic [ref=e665]: "03"
                - generic [ref=e666]: Performance budget audit (Core Web Vitals)
              - listitem [ref=e667]:
                - generic [ref=e668]: "04"
                - generic [ref=e669]: Accessibility audit (WCAG AA)
              - listitem [ref=e670]:
                - generic [ref=e671]: "05"
                - generic [ref=e672]: SEO + structured data sweep
              - listitem [ref=e673]:
                - generic [ref=e674]: "06"
                - generic [ref=e675]: Hand-off + launch retainer
            - generic [ref=e676]:
              - generic [ref=e677]:
                - paragraph [ref=e678]: Deliverables
                - list [ref=e679]:
                  - listitem [ref=e680]: · Production codebase (TypeScript)
                  - listitem [ref=e681]: · Lighthouse + a11y report
                  - listitem [ref=e682]: · Launch + 30-day retainer
              - generic [ref=e683]:
                - paragraph [ref=e684]: Tools
                - list [ref=e685]:
                  - listitem [ref=e686]: TypeScript
                  - listitem [ref=e687]: Next.js 16
                  - listitem [ref=e688]: GLSL
                  - listitem [ref=e689]: Vercel / Cloudflare
                  - listitem [ref=e690]: Playwright
            - paragraph [ref=e691]: Phase 4 of 4
      - generic [ref=e692]:
        - generic [ref=e693]:
          - button "Previous phase" [disabled] [ref=e694]: ←
          - button "Next phase" [ref=e695]: →
        - generic [ref=e696]:
          - progressbar "Process phase progress" [ref=e697]
          - paragraph [ref=e702]: Phase I · Discovery · 1–2 weeks · 01 / 04
    - region "Portfolios — every year a new portfolio" [ref=e704]:
      - generic [ref=e705]:
        - generic [ref=e706]:
          - generic [ref=e707]:
            - paragraph [ref=e708]: ◊ §12 — Portfolios
            - heading "Every year a new portfolio." [level=2] [ref=e709]
            - paragraph [ref=e710]: The studio rebuilds its portfolio from scratch every year — a different codename, a different visual register, a different idea about what a portfolio should be. 5 editions and counting, each one still live at its own subdomain.
          - link "See all 05 editions" [ref=e711]:
            - /url: /portfolios
            - text: See all 05 editions
            - generic [ref=e712]: ↗
        - list [ref=e713]:
          - listitem [ref=e714]:
            - article [ref=e715]:
              - generic: "2027"
              - generic [ref=e716]: MMXXVII
              - heading "The Compiled Thought" [level=3] [ref=e718]
              - paragraph [ref=e719]: Editorial newsroom architecture. WebGL hero, Lenis-smoothed scroll, scroll-driven process timeline, 30 live lab experiments. Built for sub-100ms interaction, AA contrast, and dual JSON-LD + AI-engine surfaces.
              - generic [ref=e720]:
                - link "Open the 2027 portfolio (The Compiled Thought) in a new tab" [ref=e721]:
                  - /url: https://2027.delowarhossain.dev
                  - text: ↗ 2027.delowarhossain.dev
                - link "✦ You are here" [ref=e722]:
                  - /url: /portfolios
          - listitem [ref=e723]:
            - article [ref=e724]:
              - generic: "2026"
              - generic [ref=e725]: MMXXVI
              - heading "Studio Press" [level=3] [ref=e727]
              - paragraph [ref=e728]: Single-page editorial micro-folio. Variable-font scroll, three case studies, an inline showreel. Pruned to the bare essentials between two larger systems.
              - generic [ref=e729]:
                - link "Open the 2026 portfolio (Studio Press) in a new tab" [ref=e730]:
                  - /url: https://2026.delowarhossain.dev
                  - text: ↗ 2026.delowarhossain.dev
                - link "↗ View archive" [ref=e731]:
                  - /url: /portfolios
          - listitem [ref=e732]:
            - article [ref=e733]:
              - generic: "2025"
              - generic [ref=e734]: MMXXV
              - heading "Terminal State" [level=3] [ref=e736]
              - paragraph [ref=e737]: Monolith design-system showcase. Dark UI, dense data, terminal aesthetics. Built around a colour-token system, a custom kinetic cursor and an audio-reactive prelude.
              - generic [ref=e738]:
                - link "Open the 2025 portfolio (Terminal State) in a new tab" [ref=e739]:
                  - /url: https://2025.delowarhossain.dev
                  - text: ↗ 2025.delowarhossain.dev
                - link "↗ View archive" [ref=e740]:
                  - /url: /portfolios
          - listitem [ref=e741]:
            - article [ref=e742]:
              - generic: "2024"
              - generic [ref=e743]: MMXXIV
              - heading "Void Engine" [level=3] [ref=e745]
              - paragraph [ref=e746]: "Experimental folio leaning hard on Three.js: GPU particles, post-processing chain, a custom shader-based page transition. Optimised for desktop showpiece browsing."
              - generic [ref=e747]:
                - link "Open the 2024 portfolio (Void Engine) in a new tab" [ref=e748]:
                  - /url: https://2024.delowarhossain.dev
                  - text: ↗ 2024.delowarhossain.dev
                - link "↗ View archive" [ref=e749]:
                  - /url: /portfolios
    - generic [ref=e752]:
      - generic [ref=e753]:
        - generic [ref=e754]:
          - paragraph [ref=e755]: §10 — Journal
          - heading "Notes on the craft." [level=2] [ref=e756]
        - link "All Posts" [ref=e757]:
          - /url: /journal
          - text: All Posts
          - generic [ref=e758]: ↗
      - list [ref=e759]:
        - listitem [ref=e761]:
          - 'link "Read: Flexible page transitions: borrowing from Patrick Heng — Motion, 11 min read, 2027.04.18" [ref=e762]':
            - /url: /journal/flexible-page-transitions
            - generic [ref=e763]: 2027.04.18
            - generic [ref=e764]: "Flexible page transitions: borrowing from Patrick Heng"
            - generic [ref=e765]: Motion
            - generic [ref=e766]: 11 min read
        - listitem [ref=e768]:
          - 'link "Read: Scroll as a medium, not a mechanic — Scroll, 9 min read, 2027.02.02" [ref=e769]':
            - /url: /journal/scroll-as-a-medium
            - generic [ref=e770]: 2027.02.02
            - generic [ref=e771]: Scroll as a medium, not a mechanic
            - generic [ref=e772]: Scroll
            - generic [ref=e773]: 9 min read
        - listitem [ref=e775]:
          - 'link "Read: Shader Math: from a single noise field to a world — WebGL, 12 min read, 2025.11.12" [ref=e776]':
            - /url: /journal/shader-math-deep-dive
            - generic [ref=e777]: 2025.11.12
            - generic [ref=e778]: "Shader Math: from a single noise field to a world"
            - generic [ref=e779]: WebGL
            - generic [ref=e780]: 12 min read
        - listitem [ref=e782]:
          - 'link "Read: The Quiet Grid: editorial restraint as a UX strategy — Design, 8 min read, 2025.08.22" [ref=e783]':
            - /url: /journal/the-quiet-grid
            - generic [ref=e784]: 2025.08.22
            - generic [ref=e785]: "The Quiet Grid: editorial restraint as a UX strategy"
            - generic [ref=e786]: Design
            - generic [ref=e787]: 8 min read
    - generic [ref=e790]:
      - paragraph [ref=e791]: §11 — Beyond Home
      - heading "Continue exploring." [level=2] [ref=e792]
      - generic [ref=e793]:
        - generic [ref=e794]:
          - paragraph [ref=e795]: Identity
          - list [ref=e796]:
            - listitem [ref=e797]:
              - link "About / Story — Background, philosophy, journey." [ref=e798]:
                - /url: /about
                - paragraph [ref=e799]:
                  - generic [ref=e800]: About / Story
                  - generic [ref=e801]: ↗
                - paragraph [ref=e802]: Background, philosophy, journey.
            - listitem [ref=e803]:
              - link "Resume — Experience, education, recognition targets." [ref=e804]:
                - /url: /resume
                - paragraph [ref=e805]:
                  - generic [ref=e806]: Resume
                  - generic [ref=e807]: ↗
                - paragraph [ref=e808]: Experience, education, recognition targets.
            - listitem [ref=e809]:
              - link "Colophon — How this site was made." [ref=e810]:
                - /url: /colophon
                - paragraph [ref=e811]:
                  - generic [ref=e812]: Colophon
                  - generic [ref=e813]: ↗
                - paragraph [ref=e814]: How this site was made.
        - generic [ref=e815]:
          - paragraph [ref=e816]: Practice
          - list [ref=e817]:
            - listitem [ref=e818]:
              - link "Selected Works — Case studies & process." [ref=e819]:
                - /url: /works
                - paragraph [ref=e820]:
                  - generic [ref=e821]: Selected Works
                  - generic [ref=e822]: ↗
                - paragraph [ref=e823]: Case studies & process.
            - listitem [ref=e824]:
              - link "Archive — Every project, every year." [ref=e825]:
                - /url: /archive
                - paragraph [ref=e826]:
                  - generic [ref=e827]: Archive
                  - generic [ref=e828]: ↗
                - paragraph [ref=e829]: Every project, every year.
            - listitem [ref=e830]:
              - link "The Lab — Shaders, motion, experiments." [ref=e831]:
                - /url: /lab
                - paragraph [ref=e832]:
                  - generic [ref=e833]: The Lab
                  - generic [ref=e834]: ↗
                - paragraph [ref=e835]: Shaders, motion, experiments.
        - generic [ref=e836]:
          - paragraph [ref=e837]: Connect
          - list [ref=e838]:
            - listitem [ref=e839]:
              - link "Services & Process — Engagement scope, retainer or project." [ref=e840]:
                - /url: /services
                - paragraph [ref=e841]:
                  - generic [ref=e842]: Services & Process
                  - generic [ref=e843]: ↗
                - paragraph [ref=e844]: Engagement scope, retainer or project.
            - listitem [ref=e845]:
              - link "Journal — Notes on craft, motion, AI." [ref=e846]:
                - /url: /journal
                - paragraph [ref=e847]:
                  - generic [ref=e848]: Journal
                  - generic [ref=e849]: ↗
                - paragraph [ref=e850]: Notes on craft, motion, AI.
            - listitem [ref=e851]:
              - link "Contact — Start a project or just say hi." [ref=e852]:
                - /url: /contact
                - paragraph [ref=e853]:
                  - generic [ref=e854]: Contact
                  - generic [ref=e855]: ↗
                - paragraph [ref=e856]: Start a project or just say hi.
  - contentinfo [ref=e858]:
    - region "Studio status" [ref=e859]:
      - generic [ref=e860]:
        - generic [ref=e861]:
          - generic [ref=e864]: 21:48 BD
          - generic [ref=e865]: ·
          - generic [ref=e866]: Joypurhat · BD
          - generic [ref=e867]: ·
          - generic [ref=e868]: 176 GH
          - generic [ref=e869]: ·
          - generic [ref=e870]: MMXXVII
          - generic [ref=e871]: ·
          - link "University of the People — B.Sc. Computer Science (in progress)" [ref=e872]:
            - /url: https://www.uopeople.edu/
            - text: B.Sc. CS · UoPeople
          - generic [ref=e873]: ·
          - generic "Time until MMXXVII (2027-01-01, Asia/Dhaka)" [ref=e874]:
            - text: → 186d 02h 11m
            - generic [ref=e875]: MMXXVII
        - link "Open from Q1 ’27 — booking through Q4 ’27" [ref=e876]:
          - /url: /contact
          - text: Open from Q1 ’27 — booking through Q4 ’27
          - generic [ref=e878]: ↗
    - generic [ref=e879]:
      - generic [ref=e880]:
        - generic [ref=e881]:
          - paragraph [ref=e882]: ◊ Open from Q1 ’27 — booking through Q4 ’27 · Selected projects
          - heading "Have an idea? Let's build it." [level=2] [ref=e883]:
            - generic [ref=e884]: Have an idea?
            - generic [ref=e885]: Let's build it.
          - generic [ref=e886]:
            - link "hello@delowarhossain.dev" [ref=e887]:
              - /url: /contact
              - text: hello@delowarhossain.dev
              - generic [ref=e888]: ↗
            - button "Copy email address to clipboard" [ref=e889]: ⎘
        - generic [ref=e890]:
          - generic [ref=e891]:
            - paragraph [ref=e892]: Pages
            - list [ref=e893]:
              - listitem [ref=e894]:
                - link "Index" [ref=e895]:
                  - /url: /
              - listitem [ref=e896]:
                - link "Works" [ref=e897]:
                  - /url: /works
              - listitem [ref=e898]:
                - link "Lab" [ref=e899]:
                  - /url: /lab
              - listitem [ref=e900]:
                - link "Process" [ref=e901]:
                  - /url: /process
              - listitem [ref=e902]:
                - link "About" [ref=e903]:
                  - /url: /about
              - listitem [ref=e904]:
                - link "Resume" [ref=e905]:
                  - /url: /resume
              - listitem [ref=e906]:
                - link "Journal" [ref=e907]:
                  - /url: /journal
              - listitem [ref=e908]:
                - link "Services" [ref=e909]:
                  - /url: /services
              - listitem [ref=e910]:
                - link "Uses" [ref=e911]:
                  - /url: /uses
              - listitem [ref=e912]:
                - link "Contact" [ref=e913]:
                  - /url: /contact
              - listitem [ref=e914]:
                - link "AI Summary" [ref=e915]:
                  - /url: /ai
          - generic [ref=e916]:
            - paragraph [ref=e917]: Connect
            - list [ref=e918]:
              - listitem [ref=e919]:
                - link "GITHUB" [ref=e920]:
                  - /url: https://github.com/mdhossain-2437
              - listitem [ref=e921]:
                - link "LINKEDIN" [ref=e922]:
                  - /url: https://www.linkedin.com/in/mdhossain2437
              - listitem [ref=e923]:
                - link "TWITTER" [ref=e924]:
                  - /url: https://twitter.com/mdhossain2437
              - listitem [ref=e925]:
                - link "INSTAGRAM" [ref=e926]:
                  - /url: https://www.instagram.com/mdhossain2437
              - listitem [ref=e927]:
                - link "FACEBOOK" [ref=e928]:
                  - /url: https://www.facebook.com/mdhossain2437
              - listitem [ref=e929]:
                - link "READ.CV" [ref=e930]:
                  - /url: https://read.cv/delowar
          - generic [ref=e931]:
            - paragraph [ref=e932]: Studio
            - list [ref=e933]:
              - listitem [ref=e934]:
                - link "Now" [ref=e935]:
                  - /url: /now
              - listitem [ref=e936]:
                - link "Uses" [ref=e937]:
                  - /url: /uses
              - listitem [ref=e938]:
                - link "Brand" [ref=e939]:
                  - /url: /brand
              - listitem [ref=e940]:
                - link "Colors" [ref=e941]:
                  - /url: /colors
              - listitem [ref=e942]:
                - link "Changelog" [ref=e943]:
                  - /url: /changelog
              - listitem [ref=e944]:
                - link "Showreel" [ref=e945]:
                  - /url: /showreel
              - listitem [ref=e946]:
                - link "Atlas" [ref=e947]:
                  - /url: /atlas
              - listitem [ref=e948]:
                - link "Recognition" [ref=e949]:
                  - /url: /awards
              - listitem [ref=e950]:
                - link "Achievements" [ref=e951]:
                  - /url: /achievements
              - listitem [ref=e952]:
                - link "Colophon" [ref=e953]:
                  - /url: /colophon
              - listitem [ref=e954]:
                - link "Privacy" [ref=e955]:
                  - /url: /legal/privacy
              - listitem [ref=e956]:
                - link "Terms" [ref=e957]:
                  - /url: /legal/terms
      - generic [ref=e958]:
        - generic [ref=e959]:
          - paragraph [ref=e960]: ◌ Signed
          - img "Delowar Hossain signature" [ref=e961]:
            - generic [ref=e963]: Delowar Hossain
        - paragraph [ref=e965]: handwritten in vector — strokes draw on view
      - generic [ref=e966]:
        - button "Quote of the day — click to copy" [ref=e968]:
          - generic [ref=e969]: ◊ Quote of the day · 206 / 365
          - generic [ref=e970]: “A particle system with art direction is weather.”
        - paragraph [ref=e971]:
          - text: ◌ A new quote rotates in at 00:00 UTC.
          - text: Click to copy. Three hundred sixty-five total.
      - generic [ref=e974]:
        - generic [ref=e975]:
          - generic [ref=e976]: DELOWAR HOSSAIN
          - generic [ref=e977]: •
        - generic [ref=e978]:
          - generic [ref=e979]: CREATIVE DEVELOPER
          - generic [ref=e980]: •
        - generic [ref=e981]:
          - generic [ref=e982]: UI / UX DESIGNER
          - generic [ref=e983]: •
        - generic [ref=e984]:
          - generic [ref=e985]: WEBGL · THREE.JS · GLSL
          - generic [ref=e986]: •
        - generic [ref=e987]:
          - generic [ref=e988]: OPEN FROM Q1 ’27 — BOOKING THROUGH Q4 ’27
          - generic [ref=e989]: •
        - generic [ref=e990]:
          - generic [ref=e991]: JOYPURHAT, BANGLADESH
          - generic [ref=e992]: •
        - generic [ref=e993]:
          - generic [ref=e994]: MMXXVII / 03.27
          - generic [ref=e995]: •
        - generic [ref=e996]:
          - generic [ref=e997]: DELOWAR HOSSAIN · MMXXVII
          - generic [ref=e998]: •
        - generic [ref=e999]:
          - generic [ref=e1000]: DELOWAR HOSSAIN
          - generic [ref=e1001]: •
        - generic [ref=e1002]:
          - generic [ref=e1003]: CREATIVE DEVELOPER
          - generic [ref=e1004]: •
        - generic [ref=e1005]:
          - generic [ref=e1006]: UI / UX DESIGNER
          - generic [ref=e1007]: •
        - generic [ref=e1008]:
          - generic [ref=e1009]: WEBGL · THREE.JS · GLSL
          - generic [ref=e1010]: •
        - generic [ref=e1011]:
          - generic [ref=e1012]: OPEN FROM Q1 ’27 — BOOKING THROUGH Q4 ’27
          - generic [ref=e1013]: •
        - generic [ref=e1014]:
          - generic [ref=e1015]: JOYPURHAT, BANGLADESH
          - generic [ref=e1016]: •
        - generic [ref=e1017]:
          - generic [ref=e1018]: MMXXVII / 03.27
          - generic [ref=e1019]: •
        - generic [ref=e1020]:
          - generic [ref=e1021]: DELOWAR HOSSAIN · MMXXVII
          - generic [ref=e1022]: •
      - generic [ref=e1023]:
        - paragraph [ref=e1024]:
          - text: © 2027
          - button "Studio mark" [ref=e1025]: The Compiled Thought
          - text: . All rights reserved · MMXXVII.
        - paragraph [ref=e1026]:
          - text: Lat. 25.10° N · Long. 89.02° E · Joypurhat, Bangladesh ·
          - generic [ref=e1027]: 21:48:38
          - text: BST
        - generic [ref=e1028]:
          - link "◇ local" [ref=e1029]:
            - /url: https://github.com/mdhossain-2437/Creative-Folio
          - button "Toggle motion" [ref=e1030]:
            - generic [ref=e1033]: Motion On
          - generic [ref=e1034]: v MMXXVII / 03.27
  - alert [ref=e1035]
  - navigation:
    - generic:
      - generic:
        - generic: §01
        - generic: /14
      - generic:
        - list:
          - listitem:
            - button
          - listitem:
            - button
          - listitem:
            - button
          - listitem:
            - button
          - listitem:
            - button
          - listitem:
            - button
          - listitem:
            - button
          - listitem:
            - button
          - listitem:
            - button
          - listitem:
            - button
          - listitem:
            - button
          - listitem:
            - button
          - listitem:
            - button
          - listitem:
            - button
      - generic:
        - generic: 0%
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