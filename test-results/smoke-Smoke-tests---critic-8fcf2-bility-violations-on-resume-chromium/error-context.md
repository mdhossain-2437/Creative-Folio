# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> Smoke tests - critical routes >> should have no accessibility violations on /resume
- Location: e2e\smoke.spec.ts:47:9

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -    1
+ Received  + 1746

- Array []
+ Array [
+   Object {
+     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 2.24,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#4c4b4a",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.24 (foreground color: #4c4b4a, background color: #0c0c0c, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.24 (foreground color: #4c4b4a, background color: #0c0c0c, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"font-sans text-[10px] uppercase tracking-widest text-warmwhite/55\">◊ Contents</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".sticky > .text-warmwhite\\/55",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 3.71,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#7a6862",
+               "fontSize": "6.8pt (9px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.71 (foreground color: #7a6862, background color: #0c0c0c, font size: 6.8pt (9px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.71 (foreground color: #7a6862, background color: #0c0c0c, font size: 6.8pt (9px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"display-num font-mono text-[9px] text-peach\">§<!-- -->01</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".text-\\[9px\\].text-peach.font-mono",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 2.24,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#4c4b4a",
+               "fontSize": "6.8pt (9px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.24 (foreground color: #4c4b4a, background color: #0c0c0c, font size: 6.8pt (9px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.24 (foreground color: #4c4b4a, background color: #0c0c0c, font size: 6.8pt (9px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"display-num font-mono text-[9px] text-warmwhite/55\">§<!-- -->02</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"#experience\"] > .text-\\[9px\\].font-mono.display-num",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 2.24,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#4c4b4a",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.24 (foreground color: #4c4b4a, background color: #0c0c0c, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.24 (foreground color: #4c4b4a, background color: #0c0c0c, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span>Experience</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"#experience\"] > span:nth-child(2)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 2.24,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#4c4b4a",
+               "fontSize": "6.8pt (9px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.24 (foreground color: #4c4b4a, background color: #0c0c0c, font size: 6.8pt (9px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.24 (foreground color: #4c4b4a, background color: #0c0c0c, font size: 6.8pt (9px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"display-num font-mono text-[9px] text-warmwhite/55\">§<!-- -->03</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"#recognition\"] > .text-\\[9px\\].font-mono.display-num",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 2.24,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#4c4b4a",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.24 (foreground color: #4c4b4a, background color: #0c0c0c, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.24 (foreground color: #4c4b4a, background color: #0c0c0c, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span>Recognition</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"#recognition\"] > span:nth-child(2)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 2.24,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#4c4b4a",
+               "fontSize": "6.8pt (9px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.24 (foreground color: #4c4b4a, background color: #0c0c0c, font size: 6.8pt (9px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.24 (foreground color: #4c4b4a, background color: #0c0c0c, font size: 6.8pt (9px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"display-num font-mono text-[9px] text-warmwhite/55\">§<!-- -->04</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"#tools\"] > .text-\\[9px\\].font-mono.display-num",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 2.24,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#4c4b4a",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.24 (foreground color: #4c4b4a, background color: #0c0c0c, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.24 (foreground color: #4c4b4a, background color: #0c0c0c, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span>Tools</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"#tools\"] > span:nth-child(2)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 2.24,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#4c4b4a",
+               "fontSize": "6.8pt (9px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.24 (foreground color: #4c4b4a, background color: #0c0c0c, font size: 6.8pt (9px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.24 (foreground color: #4c4b4a, background color: #0c0c0c, font size: 6.8pt (9px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"display-num font-mono text-[9px] text-warmwhite/55\">§<!-- -->05</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"#education\"] > .text-\\[9px\\].font-mono.display-num",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 2.24,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#4c4b4a",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.24 (foreground color: #4c4b4a, background color: #0c0c0c, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.24 (foreground color: #4c4b4a, background color: #0c0c0c, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span>Education</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"#education\"] > span:nth-child(2)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 2.24,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#4c4b4a",
+               "fontSize": "6.8pt (9px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.24 (foreground color: #4c4b4a, background color: #0c0c0c, font size: 6.8pt (9px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.24 (foreground color: #4c4b4a, background color: #0c0c0c, font size: 6.8pt (9px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"display-num font-mono text-[9px] text-warmwhite/55\">§<!-- -->06</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"#disciplines\"] > .text-\\[9px\\].font-mono.display-num",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 2.24,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#4c4b4a",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.24 (foreground color: #4c4b4a, background color: #0c0c0c, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.24 (foreground color: #4c4b4a, background color: #0c0c0c, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span>Disciplines</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"#disciplines\"] > span:nth-child(2)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 2.97,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#5e5d5b",
+               "fontSize": "10.5pt (14px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.97 (foreground color: #5e5d5b, background color: #0c0c0c, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.97 (foreground color: #5e5d5b, background color: #0c0c0c, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"mb-8 max-w-3xl font-sans text-sm leading-relaxed text-warmwhite/70\">Targets are labelled until a public, verifiable result exists. Earned recognitions will move into the same ledger with proof links.</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".mb-8",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 3.71,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#7a6862",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.71 (foreground color: #7a6862, background color: #0c0c0c, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<li class=\"flex flex-col gap-3 bg-ink-900 p-6 md:p-8\">",
+                 "target": Array [
+                   "#recognition > .mt-8 > .gap-px.md\\:grid-cols-2.bg-warmwhite\\/15 > .p-6.md\\:p-8.bg-ink-900:nth-child(1)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.71 (foreground color: #7a6862, background color: #0c0c0c, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"font-sans text-[10px] uppercase tracking-widest text-peach\">Target<!-- --> · <!-- -->Awwwards<!-- --> ·<!-- --> <!-- -->2027 target</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".p-6.md\\:p-8.bg-ink-900:nth-child(1) > .text-peach",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 2.71,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#585756",
+               "fontSize": "10.5pt (14px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.71 (foreground color: #585756, background color: #0c0c0c, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<li class=\"flex flex-col gap-3 bg-ink-900 p-6 md:p-8\">",
+                 "target": Array [
+                   "#recognition > .mt-8 > .gap-px.md\\:grid-cols-2.bg-warmwhite\\/15 > .p-6.md\\:p-8.bg-ink-900:nth-child(1)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.71 (foreground color: #585756, background color: #0c0c0c, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"font-sans text-sm leading-relaxed text-warmwhite/65\">Target for Aura Void once the project has public launch evidence, a verified case-study URL, and real performance metrics.</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".p-6.md\\:p-8.bg-ink-900:nth-child(1) > .text-sm.leading-relaxed.text-warmwhite\\/65",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 3.71,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#7a6862",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.71 (foreground color: #7a6862, background color: #0c0c0c, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<li class=\"flex flex-col gap-3 bg-ink-900 p-6 md:p-8\">",
+                 "target": Array [
+                   "#recognition > .mt-8 > .gap-px.md\\:grid-cols-2.bg-warmwhite\\/15 > .p-6.md\\:p-8.bg-ink-900:nth-child(2)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.71 (foreground color: #7a6862, background color: #0c0c0c, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"font-sans text-[10px] uppercase tracking-widest text-peach\">Target<!-- --> · <!-- -->The FWA<!-- --> ·<!-- --> <!-- -->2027 target</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".p-6.md\\:p-8.bg-ink-900:nth-child(2) > .text-peach",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 2.71,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#585756",
+               "fontSize": "10.5pt (14px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.71 (foreground color: #585756, background color: #0c0c0c, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<li class=\"flex flex-col gap-3 bg-ink-900 p-6 md:p-8\">",
+                 "target": Array [
+                   "#recognition > .mt-8 > .gap-px.md\\:grid-cols-2.bg-warmwhite\\/15 > .p-6.md\\:p-8.bg-ink-900:nth-child(2)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.71 (foreground color: #585756, background color: #0c0c0c, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"font-sans text-sm leading-relaxed text-warmwhite/65\">Target for the editorial product-system work after public launch, source links, and submission materials are complete.</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".p-6.md\\:p-8.bg-ink-900:nth-child(2) > .text-sm.leading-relaxed.text-warmwhite\\/65",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 3.71,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#7a6862",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.71 (foreground color: #7a6862, background color: #0c0c0c, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<li class=\"flex flex-col gap-3 bg-ink-900 p-6 md:p-8\">",
+                 "target": Array [
+                   "#recognition > .mt-8 > .gap-px.md\\:grid-cols-2.bg-warmwhite\\/15 > .p-6.md\\:p-8.bg-ink-900:nth-child(3)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.71 (foreground color: #7a6862, background color: #0c0c0c, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"font-sans text-[10px] uppercase tracking-widest text-peach\">Target<!-- --> · <!-- -->CSS Design Awards<!-- --> ·<!-- --> <!-- -->2027 target</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".p-6.md\\:p-8.bg-ink-900:nth-child(3) > .text-peach",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 2.71,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#585756",
+               "fontSize": "10.5pt (14px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.71 (foreground color: #585756, background color: #0c0c0c, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<li class=\"flex flex-col gap-3 bg-ink-900 p-6 md:p-8\">",
+                 "target": Array [
+                   "#recognition > .mt-8 > .gap-px.md\\:grid-cols-2.bg-warmwhite\\/15 > .p-6.md\\:p-8.bg-ink-900:nth-child(3)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.71 (foreground color: #585756, background color: #0c0c0c, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"font-sans text-sm leading-relaxed text-warmwhite/65\">Target for interface precision, calm complexity, and production-friendly AI workflow craft once evidence is verifiable.</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".p-6.md\\:p-8.bg-ink-900:nth-child(3) > .text-sm.leading-relaxed.text-warmwhite\\/65",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 3.71,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#7a6862",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.71 (foreground color: #7a6862, background color: #0c0c0c, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<li class=\"flex flex-col gap-3 bg-ink-900 p-6 md:p-8\">",
+                 "target": Array [
+                   "#recognition > .mt-8 > .gap-px.md\\:grid-cols-2.bg-warmwhite\\/15 > .p-6.md\\:p-8.bg-ink-900:nth-child(4)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.71 (foreground color: #7a6862, background color: #0c0c0c, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"font-sans text-[10px] uppercase tracking-widest text-peach\">Target<!-- --> · <!-- -->Product Hunt<!-- --> ·<!-- --> <!-- -->2027 target</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".p-6.md\\:p-8.bg-ink-900:nth-child(4) > .text-peach",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 2.71,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#585756",
+               "fontSize": "10.5pt (14px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.71 (foreground color: #585756, background color: #0c0c0c, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<li class=\"flex flex-col gap-3 bg-ink-900 p-6 md:p-8\">",
+                 "target": Array [
+                   "#recognition > .mt-8 > .gap-px.md\\:grid-cols-2.bg-warmwhite\\/15 > .p-6.md\\:p-8.bg-ink-900:nth-child(4)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.71 (foreground color: #585756, background color: #0c0c0c, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"font-sans text-sm leading-relaxed text-warmwhite/65\">Launch target for a real Product Hunt campaign; no ranking is public until a verified campaign link exists.</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".p-6.md\\:p-8.bg-ink-900:nth-child(4) > .text-sm.leading-relaxed.text-warmwhite\\/65",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 2.71,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#585756",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.71 (foreground color: #585756, background color: #0c0c0c, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"bg-ink-900 p-6 md:p-8\">",
+                 "target": Array [
+                   "#tools > .mt-8 > .gap-px.md\\:grid-cols-2.bg-warmwhite\\/15 > .p-6.md\\:p-8.bg-ink-900:nth-child(1)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.71 (foreground color: #585756, background color: #0c0c0c, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"font-sans text-[10px] uppercase tracking-widest text-warmwhite/65\">Core Frameworks</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "#tools > .mt-8 > .gap-px.md\\:grid-cols-2.bg-warmwhite\\/15 > .p-6.md\\:p-8.bg-ink-900:nth-child(1) > .text-warmwhite\\/65",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 2.71,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#585756",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.71 (foreground color: #585756, background color: #0c0c0c, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"bg-ink-900 p-6 md:p-8\">",
+                 "target": Array [
+                   "#tools > .mt-8 > .gap-px.md\\:grid-cols-2.bg-warmwhite\\/15 > .p-6.md\\:p-8.bg-ink-900:nth-child(2)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.71 (foreground color: #585756, background color: #0c0c0c, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"font-sans text-[10px] uppercase tracking-widest text-warmwhite/65\">Creative / WebGL</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "#tools > .mt-8 > .gap-px.md\\:grid-cols-2.bg-warmwhite\\/15 > .p-6.md\\:p-8.bg-ink-900:nth-child(2) > .text-warmwhite\\/65",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 2.71,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#585756",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.71 (foreground color: #585756, background color: #0c0c0c, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"bg-ink-900 p-6 md:p-8\">",
+                 "target": Array [
+                   "#tools > .mt-8 > .gap-px.md\\:grid-cols-2.bg-warmwhite\\/15 > .p-6.md\\:p-8.bg-ink-900:nth-child(3)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.71 (foreground color: #585756, background color: #0c0c0c, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"font-sans text-[10px] uppercase tracking-widest text-warmwhite/65\">Styling &amp; UI</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "#tools > .mt-8 > .gap-px.md\\:grid-cols-2.bg-warmwhite\\/15 > .p-6.md\\:p-8.bg-ink-900:nth-child(3) > .text-warmwhite\\/65",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 2.71,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#585756",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.71 (foreground color: #585756, background color: #0c0c0c, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"bg-ink-900 p-6 md:p-8\">",
+                 "target": Array [
+                   "#tools > .mt-8 > .gap-px.md\\:grid-cols-2.bg-warmwhite\\/15 > .p-6.md\\:p-8.bg-ink-900:nth-child(4)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.71 (foreground color: #585756, background color: #0c0c0c, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"font-sans text-[10px] uppercase tracking-widest text-warmwhite/65\">Backend &amp; AI</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "#tools > .mt-8 > .gap-px.md\\:grid-cols-2.bg-warmwhite\\/15 > .p-6.md\\:p-8.bg-ink-900:nth-child(4) > .text-warmwhite\\/65",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 2.97,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#5e5d5b",
+               "fontSize": "10.5pt (14px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.97 (foreground color: #5e5d5b, background color: #0c0c0c, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.97 (foreground color: #5e5d5b, background color: #0c0c0c, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"max-w-3xl font-sans text-sm leading-relaxed text-warmwhite/70\">Came to programming after Political Science, self-taught from<!-- --> <!-- -->2023<!-- -->, and now formalizing the craft through Computer Science while keeping the systems-thinking background visible.</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "#education > .mt-8 > .max-w-3xl.text-warmwhite\\/70.text-sm",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 2.71,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#585756",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.71 (foreground color: #585756, background color: #0c0c0c, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.71 (foreground color: #585756, background color: #0c0c0c, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"col-span-12 font-mono text-[11px] uppercase tracking-widest text-warmwhite/65 md:col-span-3\">In progress</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".last\\:pb-0.grid-cols-12.py-6:nth-child(1) > .md\\:col-span-3.font-mono.col-span-12",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 2.71,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#585756",
+               "fontSize": "10.5pt (14px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.71 (foreground color: #585756, background color: #0c0c0c, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.71 (foreground color: #585756, background color: #0c0c0c, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"col-span-12 font-sans text-sm leading-relaxed text-warmwhite/65 md:col-span-4\">B.Sc. Computer Science (in progress)<!-- --> · <!-- -->Aspiring Software Engineer</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".last\\:pb-0.grid-cols-12.py-6:nth-child(1) > .md\\:col-span-4.text-sm.leading-relaxed",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 2.71,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#585756",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.71 (foreground color: #585756, background color: #0c0c0c, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.71 (foreground color: #585756, background color: #0c0c0c, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"col-span-12 font-mono text-[11px] uppercase tracking-widest text-warmwhite/65 md:col-span-3\">2020 — 2024</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".last\\:pb-0.grid-cols-12.py-6:nth-child(2) > .md\\:col-span-3.font-mono.col-span-12",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 2.71,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#585756",
+               "fontSize": "10.5pt (14px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.71 (foreground color: #585756, background color: #0c0c0c, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.71 (foreground color: #585756, background color: #0c0c0c, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"col-span-12 font-sans text-sm leading-relaxed text-warmwhite/65 md:col-span-4\">Bachelor of Arts<!-- --> · <!-- -->Scholarly Modernity</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".last\\:pb-0.grid-cols-12.py-6:nth-child(2) > .md\\:col-span-4.text-sm.leading-relaxed",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 3.51,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#696867",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.51 (foreground color: #696867, background color: #0c0c0c, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.51 (foreground color: #696867, background color: #0c0c0c, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<li class=\"rounded-full border border-warmwhite/20 px-5 py-2 font-sans text-[11px] uppercase tracking-widest text-warmwhite/80\">UI/UX Design</li>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".px-5.border-warmwhite\\/20.py-2:nth-child(1)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 3.51,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#696867",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.51 (foreground color: #696867, background color: #0c0c0c, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.51 (foreground color: #696867, background color: #0c0c0c, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<li class=\"rounded-full border border-warmwhite/20 px-5 py-2 font-sans text-[11px] uppercase tracking-widest text-warmwhite/80\">Web Design</li>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".px-5.border-warmwhite\\/20.py-2:nth-child(2)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 3.51,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#696867",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.51 (foreground color: #696867, background color: #0c0c0c, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.51 (foreground color: #696867, background color: #0c0c0c, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<li class=\"rounded-full border border-warmwhite/20 px-5 py-2 font-sans text-[11px] uppercase tracking-widest text-warmwhite/80\">Logo &amp; Branding</li>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".px-5.border-warmwhite\\/20.py-2:nth-child(3)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 3.51,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#696867",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.51 (foreground color: #696867, background color: #0c0c0c, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.51 (foreground color: #696867, background color: #0c0c0c, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<li class=\"rounded-full border border-warmwhite/20 px-5 py-2 font-sans text-[11px] uppercase tracking-widest text-warmwhite/80\">Webflow Design</li>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".px-5.border-warmwhite\\/20.py-2:nth-child(4)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 3.51,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#696867",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.51 (foreground color: #696867, background color: #0c0c0c, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.51 (foreground color: #696867, background color: #0c0c0c, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<li class=\"rounded-full border border-warmwhite/20 px-5 py-2 font-sans text-[11px] uppercase tracking-widest text-warmwhite/80\">Framer Design</li>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".px-5.border-warmwhite\\/20.py-2:nth-child(5)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 3.51,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#696867",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.51 (foreground color: #696867, background color: #0c0c0c, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.51 (foreground color: #696867, background color: #0c0c0c, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<li class=\"rounded-full border border-warmwhite/20 px-5 py-2 font-sans text-[11px] uppercase tracking-widest text-warmwhite/80\">Creative Development</li>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".px-5.border-warmwhite\\/20.py-2:nth-child(6)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 3.51,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#696867",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.51 (foreground color: #696867, background color: #0c0c0c, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.51 (foreground color: #696867, background color: #0c0c0c, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<li class=\"rounded-full border border-warmwhite/20 px-5 py-2 font-sans text-[11px] uppercase tracking-widest text-warmwhite/80\">Three.js · WebGL</li>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".px-5.border-warmwhite\\/20.py-2:nth-child(7)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 3.51,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#696867",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.51 (foreground color: #696867, background color: #0c0c0c, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.51 (foreground color: #696867, background color: #0c0c0c, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<li class=\"rounded-full border border-warmwhite/20 px-5 py-2 font-sans text-[11px] uppercase tracking-widest text-warmwhite/80\">GLSL Shaders</li>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".px-5.border-warmwhite\\/20.py-2:nth-child(8)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 3.51,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#696867",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.51 (foreground color: #696867, background color: #0c0c0c, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.51 (foreground color: #696867, background color: #0c0c0c, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<li class=\"rounded-full border border-warmwhite/20 px-5 py-2 font-sans text-[11px] uppercase tracking-widest text-warmwhite/80\">GSAP · Lenis</li>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".px-5.border-warmwhite\\/20.py-2:nth-child(9)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 3.51,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#696867",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.51 (foreground color: #696867, background color: #0c0c0c, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.51 (foreground color: #696867, background color: #0c0c0c, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<li class=\"rounded-full border border-warmwhite/20 px-5 py-2 font-sans text-[11px] uppercase tracking-widest text-warmwhite/80\">Next.js · Nuxt.js</li>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".px-5.border-warmwhite\\/20.py-2:nth-child(10)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 3.51,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#696867",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.51 (foreground color: #696867, background color: #0c0c0c, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.51 (foreground color: #696867, background color: #0c0c0c, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<li class=\"rounded-full border border-warmwhite/20 px-5 py-2 font-sans text-[11px] uppercase tracking-widest text-warmwhite/80\">Art Direction</li>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".px-5.border-warmwhite\\/20.py-2:nth-child(11)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#0c0c0c",
+               "contrastRatio": 3.51,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#696867",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.51 (foreground color: #696867, background color: #0c0c0c, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section class=\"bg-ink-900 py-24 md:py-32\">",
+                 "target": Array [
+                   ".py-24",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.51 (foreground color: #696867, background color: #0c0c0c, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<li class=\"rounded-full border border-warmwhite/20 px-5 py-2 font-sans text-[11px] uppercase tracking-widest text-warmwhite/80\">AI Integration</li>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".px-5.border-warmwhite\\/20.py-2:nth-child(12)",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.color",
+       "wcag2aa",
+       "wcag143",
+       "TTv5",
+       "TT13.c",
+       "EN-301-549",
+       "EN-9.1.4.3",
+       "ACT",
+       "RGAAv4",
+       "RGAA-3.2.1",
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
+         "html": "<h4 class=\"font-serif text-2xl tracking-tighter\">Site of the Day</h4>",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".p-6.md\\:p-8.bg-ink-900:nth-child(1) > h4",
+         ],
+       },
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
+         "html": "<h4 class=\"col-span-12 font-serif text-2xl leading-tight tracking-tighter md:col-span-5\">",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".last\\:pb-0.grid-cols-12.py-6:nth-child(1) > h4",
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
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0s;\">",
+                 "target": Array [
+                   ".reveal:nth-child(2)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0s;\">",
+                 "target": Array [
+                   ".reveal:nth-child(3)",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"reveal \" style=\"transition-delay: 0s;\">",
+                 "target": Array [
+                   ".reveal:nth-child(4)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "target": Array [
+           "#experience > .mt-8 > .divide-y.divide-warmwhite\\/15",
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
+         "html": "<li class=\"grid grid-cols-12 items-baseline gap-4 py-6\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(1) > .grid-cols-12.py-6.gap-4",
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
+         "html": "<li class=\"grid grid-cols-12 items-baseline gap-4 py-6\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(2) > .grid-cols-12.py-6.gap-4",
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
+         "html": "<li class=\"grid grid-cols-12 items-baseline gap-4 py-6\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(3) > .grid-cols-12.py-6.gap-4",
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
+         "html": "<li class=\"grid grid-cols-12 items-baseline gap-4 py-6\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".reveal:nth-child(4) > .grid-cols-12.py-6.gap-4",
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
        - generic: Profile
        - link "Jump to Profile" [ref=e5]:
          - /url: "#profile"
      - listitem [ref=e6]:
        - generic: Experience
        - link "Jump to Experience" [ref=e7]:
          - /url: "#experience"
      - listitem [ref=e8]:
        - generic: Recognition
        - link "Jump to Recognition" [ref=e9]:
          - /url: "#recognition"
      - listitem [ref=e10]:
        - generic: Tools
        - link "Jump to Tools" [ref=e11]:
          - /url: "#tools"
      - listitem [ref=e12]:
        - generic: Education
        - link "Jump to Education" [ref=e13]:
          - /url: "#education"
      - listitem [ref=e14]:
        - generic: Disciplines
        - link "Jump to Disciplines" [ref=e15]:
          - /url: "#disciplines"
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
        - listitem [ref=e45]:
          - link "Resume" [ref=e46]:
            - /url: /resume
            - generic [ref=e47]: Resume
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
      - paragraph [ref=e69]: § Resume — A Living Document
      - heading "Delowar Hossain." [level=1] [ref=e70]:
        - generic [ref=e73]: Delowar
        - generic [ref=e77]: Hossain.
      - generic [ref=e78]:
        - paragraph [ref=e79]: A condensed view of the work, the practice, and the recognition. Updated continuously — selected items only.
        - list [ref=e80]:
          - listitem [ref=e81]:
            - paragraph [ref=e82]: Role
            - paragraph [ref=e83]: Creative Developer
          - listitem [ref=e84]:
            - paragraph [ref=e85]: Location
            - paragraph [ref=e86]: Joypurhat, Bangladesh
          - listitem [ref=e87]:
            - paragraph [ref=e88]: Email
            - paragraph [ref=e89]: hello@delowarhossain.dev
          - listitem [ref=e90]:
            - paragraph [ref=e91]: Studio
            - paragraph [ref=e92]: The Compiled Thought
      - generic [ref=e94]:
        - link "Download resume PDF (2027 edition)" [ref=e95]:
          - /url: /resume.pdf
          - text: Download PDF (2027)
          - generic [ref=e96]: ↓
        - link "Open Drive mirror of the resume (new tab)" [ref=e97]:
          - /url: https://drive.google.com/file/d/1u7AbFJlZBbZUuDZdmEfxRPb4viRdxZwu/view?usp=sharing
          - text: Drive mirror
          - generic [ref=e98]: ↗
    - generic [ref=e100]:
      - complementary [ref=e101]:
        - navigation "Resume sections" [ref=e102]:
          - paragraph [ref=e103]: ◊ Contents
          - list [ref=e104]:
            - listitem [ref=e105]:
              - link "§01 Profile" [ref=e106]:
                - /url: "#profile"
                - generic [ref=e107]: §01
                - generic [ref=e108]: Profile
            - listitem [ref=e110]:
              - link "§02 Experience" [ref=e111]:
                - /url: "#experience"
                - generic [ref=e112]: §02
                - generic [ref=e113]: Experience
            - listitem [ref=e114]:
              - link "§03 Recognition" [ref=e115]:
                - /url: "#recognition"
                - generic [ref=e116]: §03
                - generic [ref=e117]: Recognition
            - listitem [ref=e118]:
              - link "§04 Tools" [ref=e119]:
                - /url: "#tools"
                - generic [ref=e120]: §04
                - generic [ref=e121]: Tools
            - listitem [ref=e122]:
              - link "§05 Education" [ref=e123]:
                - /url: "#education"
                - generic [ref=e124]: §05
                - generic [ref=e125]: Education
            - listitem [ref=e126]:
              - link "§06 Disciplines" [ref=e127]:
                - /url: "#disciplines"
                - generic [ref=e128]: §06
                - generic [ref=e129]: Disciplines
      - generic [ref=e130]:
        - generic [ref=e131]:
          - heading "Profile" [level=2] [ref=e132]
          - paragraph [ref=e134]: Creative Developer & UI / UX Designer based in Joypurhat, Bangladesh. Building immersive, performance-focused web products at the intersection of editorial design, WebGL and AI integration.
        - generic [ref=e135]:
          - heading "Experience" [level=2] [ref=e136]
          - list [ref=e138]:
            - listitem [ref=e140]:
              - generic [ref=e141]: 2026 — Now
              - heading "Creative Developer · The Compiled Thought" [level=3] [ref=e142]
              - paragraph [ref=e143]: Building award-tier creative engineering for the studio. Shipping immersive WebGL, scroll-driven editorial systems, and AI-native product surfaces.
            - listitem [ref=e145]:
              - generic [ref=e146]: 2025 — 2026
              - heading "Frontend & Motion Engineer" [level=3] [ref=e147]
              - paragraph [ref=e148]: Went deep on GSAP, Lenis, and raw WebGL2. Built shader-driven heroes, scroll-pinned process timelines, and the first WebGL displacement transitions.
            - listitem [ref=e150]:
              - generic [ref=e151]: 2024 — 2025
              - heading "Freelance React Developer" [level=3] [ref=e152]
              - paragraph [ref=e153]: Picked up Next.js, Tailwind, and the App Router. Shipped client landing pages, the 2024.delowarhossain.dev rebuild, and first end-to-end Vercel deployments.
            - listitem [ref=e155]:
              - generic [ref=e156]: 2023 — 2024
              - heading "First line of code" [level=3] [ref=e157]
              - paragraph [ref=e158]: Started the programming journey at 17. Daily HTML + CSS reps, vanilla JS experiments, and the first deployed personal site at 2023.delowarhossain.dev.
        - generic [ref=e159]:
          - heading "Recognition" [level=2] [ref=e160]
          - generic [ref=e161]:
            - paragraph [ref=e162]: Targets are labelled until a public, verifiable result exists. Earned recognitions will move into the same ledger with proof links.
            - list [ref=e163]:
              - listitem [ref=e164]:
                - paragraph [ref=e165]: Target · Awwwards · 2027 target
                - heading "Site of the Day" [level=4] [ref=e166]
                - paragraph [ref=e167]: Target for Aura Void once the project has public launch evidence, a verified case-study URL, and real performance metrics.
              - listitem [ref=e168]:
                - paragraph [ref=e169]: Target · The FWA · 2027 target
                - heading "FWA of the Day" [level=4] [ref=e170]
                - paragraph [ref=e171]: Target for the editorial product-system work after public launch, source links, and submission materials are complete.
              - listitem [ref=e172]:
                - paragraph [ref=e173]: Target · CSS Design Awards · 2027 target
                - heading "Best UI Design" [level=4] [ref=e174]
                - paragraph [ref=e175]: Target for interface precision, calm complexity, and production-friendly AI workflow craft once evidence is verifiable.
              - listitem [ref=e176]:
                - paragraph [ref=e177]: Target · Product Hunt · 2027 target
                - heading "#3 Product of the Day" [level=4] [ref=e178]
                - paragraph [ref=e179]: Launch target for a real Product Hunt campaign; no ranking is public until a verified campaign link exists.
        - generic [ref=e180]:
          - heading "Tools" [level=2] [ref=e181]
          - generic [ref=e183]:
            - generic [ref=e184]:
              - paragraph [ref=e185]: Core Frameworks
              - list [ref=e186]:
                - listitem [ref=e187]: React / Next.js
                - listitem [ref=e188]: Vue / Nuxt
                - listitem [ref=e189]: SvelteKit
                - listitem [ref=e190]: TypeScript
            - generic [ref=e191]:
              - paragraph [ref=e192]: Creative / WebGL
              - list [ref=e193]:
                - listitem [ref=e194]: Three.js / R3F
                - listitem [ref=e195]: GLSL Shaders
                - listitem [ref=e196]: GSAP / Lenis
                - listitem [ref=e197]: Framer Motion
            - generic [ref=e198]:
              - paragraph [ref=e199]: Styling & UI
              - list [ref=e200]:
                - listitem [ref=e201]: Tailwind CSS
                - listitem [ref=e202]: Radix UI
                - listitem [ref=e203]: Variable Fonts
                - listitem [ref=e204]: Motion Systems
            - generic [ref=e205]:
              - paragraph [ref=e206]: Backend & AI
              - list [ref=e207]:
                - listitem [ref=e208]: Node.js / FastAPI
                - listitem [ref=e209]: LangChain · OpenAI
                - listitem [ref=e210]: PostgreSQL · Supabase
                - listitem [ref=e211]: Vercel · Cloudflare
        - generic [ref=e212]:
          - heading "Education" [level=2] [ref=e213]
          - generic [ref=e214]:
            - paragraph [ref=e215]: Came to programming after Political Science, self-taught from 2023, and now formalizing the craft through Computer Science while keeping the systems-thinking background visible.
            - generic [ref=e216]:
              - generic [ref=e217]:
                - generic [ref=e218]: In progress
                - heading "University of the People" [level=4] [ref=e219]:
                  - link "University of the People" [ref=e220]:
                    - /url: https://www.uopeople.edu/
                - paragraph [ref=e221]: B.Sc. Computer Science (in progress) · Aspiring Software Engineer
              - generic [ref=e222]:
                - generic [ref=e223]: 2020 — 2024
                - heading "B.A. Political Science" [level=4] [ref=e224]
                - paragraph [ref=e225]: Bachelor of Arts · Scholarly Modernity
        - generic [ref=e226]:
          - heading "Disciplines" [level=2] [ref=e227]
          - list [ref=e229]:
            - listitem [ref=e230]: UI/UX Design
            - listitem [ref=e231]: Web Design
            - listitem [ref=e232]: Logo & Branding
            - listitem [ref=e233]: Webflow Design
            - listitem [ref=e234]: Framer Design
            - listitem [ref=e235]: Creative Development
            - listitem [ref=e236]: Three.js · WebGL
            - listitem [ref=e237]: GLSL Shaders
            - listitem [ref=e238]: GSAP · Lenis
            - listitem [ref=e239]: Next.js · Nuxt.js
            - listitem [ref=e240]: Art Direction
            - listitem [ref=e241]: AI Integration
  - contentinfo [ref=e243]:
    - region "Studio status" [ref=e244]:
      - generic [ref=e245]:
        - generic [ref=e246]:
          - generic [ref=e249]: 21:48 BD
          - generic [ref=e250]: ·
          - generic [ref=e251]: Joypurhat · BD
          - generic [ref=e252]: ·
          - generic [ref=e253]: 176 GH
          - generic [ref=e254]: ·
          - generic [ref=e255]: MMXXVII
          - generic [ref=e256]: ·
          - link "University of the People — B.Sc. Computer Science (in progress)" [ref=e257]:
            - /url: https://www.uopeople.edu/
            - text: B.Sc. CS · UoPeople
          - generic [ref=e258]: ·
          - generic "Time until MMXXVII (2027-01-01, Asia/Dhaka)" [ref=e259]:
            - text: → 186d 02h 11m
            - generic [ref=e260]: MMXXVII
        - link "Open from Q1 ’27 — booking through Q4 ’27" [ref=e261]:
          - /url: /contact
          - text: Open from Q1 ’27 — booking through Q4 ’27
          - generic [ref=e263]: ↗
    - generic [ref=e264]:
      - generic [ref=e265]:
        - generic [ref=e266]:
          - paragraph [ref=e267]: ◊ Open from Q1 ’27 — booking through Q4 ’27 · Selected projects
          - heading "Have an idea? Let's build it." [level=2] [ref=e268]:
            - generic [ref=e269]: Have an idea?
            - generic [ref=e270]: Let's build it.
          - generic [ref=e271]:
            - link "hello@delowarhossain.dev" [ref=e272]:
              - /url: /contact
              - text: hello@delowarhossain.dev
              - generic [ref=e273]: ↗
            - button "Copy email address to clipboard" [ref=e274]: ⎘
        - generic [ref=e275]:
          - generic [ref=e276]:
            - paragraph [ref=e277]: Pages
            - list [ref=e278]:
              - listitem [ref=e279]:
                - link "Index" [ref=e280]:
                  - /url: /
              - listitem [ref=e281]:
                - link "Works" [ref=e282]:
                  - /url: /works
              - listitem [ref=e283]:
                - link "Lab" [ref=e284]:
                  - /url: /lab
              - listitem [ref=e285]:
                - link "Process" [ref=e286]:
                  - /url: /process
              - listitem [ref=e287]:
                - link "About" [ref=e288]:
                  - /url: /about
              - listitem [ref=e289]:
                - link "Resume" [ref=e290]:
                  - /url: /resume
              - listitem [ref=e291]:
                - link "Journal" [ref=e292]:
                  - /url: /journal
              - listitem [ref=e293]:
                - link "Services" [ref=e294]:
                  - /url: /services
              - listitem [ref=e295]:
                - link "Uses" [ref=e296]:
                  - /url: /uses
              - listitem [ref=e297]:
                - link "Contact" [ref=e298]:
                  - /url: /contact
              - listitem [ref=e299]:
                - link "AI Summary" [ref=e300]:
                  - /url: /ai
          - generic [ref=e301]:
            - paragraph [ref=e302]: Connect
            - list [ref=e303]:
              - listitem [ref=e304]:
                - link "GITHUB" [ref=e305]:
                  - /url: https://github.com/mdhossain-2437
              - listitem [ref=e306]:
                - link "LINKEDIN" [ref=e307]:
                  - /url: https://www.linkedin.com/in/mdhossain2437
              - listitem [ref=e308]:
                - link "TWITTER" [ref=e309]:
                  - /url: https://twitter.com/mdhossain2437
              - listitem [ref=e310]:
                - link "INSTAGRAM" [ref=e311]:
                  - /url: https://www.instagram.com/mdhossain2437
              - listitem [ref=e312]:
                - link "FACEBOOK" [ref=e313]:
                  - /url: https://www.facebook.com/mdhossain2437
              - listitem [ref=e314]:
                - link "READ.CV" [ref=e315]:
                  - /url: https://read.cv/delowar
          - generic [ref=e316]:
            - paragraph [ref=e317]: Studio
            - list [ref=e318]:
              - listitem [ref=e319]:
                - link "Now" [ref=e320]:
                  - /url: /now
              - listitem [ref=e321]:
                - link "Uses" [ref=e322]:
                  - /url: /uses
              - listitem [ref=e323]:
                - link "Brand" [ref=e324]:
                  - /url: /brand
              - listitem [ref=e325]:
                - link "Colors" [ref=e326]:
                  - /url: /colors
              - listitem [ref=e327]:
                - link "Changelog" [ref=e328]:
                  - /url: /changelog
              - listitem [ref=e329]:
                - link "Showreel" [ref=e330]:
                  - /url: /showreel
              - listitem [ref=e331]:
                - link "Atlas" [ref=e332]:
                  - /url: /atlas
              - listitem [ref=e333]:
                - link "Recognition" [ref=e334]:
                  - /url: /awards
              - listitem [ref=e335]:
                - link "Achievements" [ref=e336]:
                  - /url: /achievements
              - listitem [ref=e337]:
                - link "Colophon" [ref=e338]:
                  - /url: /colophon
              - listitem [ref=e339]:
                - link "Privacy" [ref=e340]:
                  - /url: /legal/privacy
              - listitem [ref=e341]:
                - link "Terms" [ref=e342]:
                  - /url: /legal/terms
      - generic [ref=e343]:
        - generic [ref=e344]:
          - paragraph [ref=e345]: ◌ Signed
          - img "Delowar Hossain signature" [ref=e346]:
            - generic [ref=e348]: Delowar Hossain
        - paragraph [ref=e350]: handwritten in vector — strokes draw on view
      - generic [ref=e351]:
        - button "Quote of the day — click to copy" [ref=e353]:
          - generic [ref=e354]: ◊ Quote of the day · 206 / 365
          - generic [ref=e355]: “A particle system with art direction is weather.”
        - paragraph [ref=e356]:
          - text: ◌ A new quote rotates in at 00:00 UTC.
          - text: Click to copy. Three hundred sixty-five total.
      - generic [ref=e359]:
        - generic [ref=e360]:
          - generic [ref=e361]: DELOWAR HOSSAIN
          - generic [ref=e362]: •
        - generic [ref=e363]:
          - generic [ref=e364]: CREATIVE DEVELOPER
          - generic [ref=e365]: •
        - generic [ref=e366]:
          - generic [ref=e367]: UI / UX DESIGNER
          - generic [ref=e368]: •
        - generic [ref=e369]:
          - generic [ref=e370]: WEBGL · THREE.JS · GLSL
          - generic [ref=e371]: •
        - generic [ref=e372]:
          - generic [ref=e373]: OPEN FROM Q1 ’27 — BOOKING THROUGH Q4 ’27
          - generic [ref=e374]: •
        - generic [ref=e375]:
          - generic [ref=e376]: JOYPURHAT, BANGLADESH
          - generic [ref=e377]: •
        - generic [ref=e378]:
          - generic [ref=e379]: MMXXVII / 03.27
          - generic [ref=e380]: •
        - generic [ref=e381]:
          - generic [ref=e382]: DELOWAR HOSSAIN · MMXXVII
          - generic [ref=e383]: •
        - generic [ref=e384]:
          - generic [ref=e385]: DELOWAR HOSSAIN
          - generic [ref=e386]: •
        - generic [ref=e387]:
          - generic [ref=e388]: CREATIVE DEVELOPER
          - generic [ref=e389]: •
        - generic [ref=e390]:
          - generic [ref=e391]: UI / UX DESIGNER
          - generic [ref=e392]: •
        - generic [ref=e393]:
          - generic [ref=e394]: WEBGL · THREE.JS · GLSL
          - generic [ref=e395]: •
        - generic [ref=e396]:
          - generic [ref=e397]: OPEN FROM Q1 ’27 — BOOKING THROUGH Q4 ’27
          - generic [ref=e398]: •
        - generic [ref=e399]:
          - generic [ref=e400]: JOYPURHAT, BANGLADESH
          - generic [ref=e401]: •
        - generic [ref=e402]:
          - generic [ref=e403]: MMXXVII / 03.27
          - generic [ref=e404]: •
        - generic [ref=e405]:
          - generic [ref=e406]: DELOWAR HOSSAIN · MMXXVII
          - generic [ref=e407]: •
      - generic [ref=e408]:
        - paragraph [ref=e409]:
          - text: © 2027
          - button "Studio mark" [ref=e410]: The Compiled Thought
          - text: . All rights reserved · MMXXVII.
        - paragraph [ref=e411]:
          - text: Lat. 25.10° N · Long. 89.02° E · Joypurhat, Bangladesh ·
          - generic [ref=e412]: 21:49:04
          - text: BST
        - generic [ref=e413]:
          - link "◇ local" [ref=e414]:
            - /url: https://github.com/mdhossain-2437/Creative-Folio
          - button "Toggle motion" [ref=e415]:
            - generic [ref=e418]: Motion On
          - generic [ref=e419]: v MMXXVII / 03.27
  - alert [ref=e420]
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