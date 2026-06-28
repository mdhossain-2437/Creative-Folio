# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> Smoke tests - critical routes >> should have no accessibility violations on /ai
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
  - navigation "Section progress":
    - list [ref=e3]:
      - listitem [ref=e4]:
        - generic: Identity
        - link "Jump to Identity" [ref=e5]:
          - /url: "#identity"
      - listitem [ref=e6]:
        - generic: Expertise
        - link "Jump to Expertise" [ref=e7]:
          - /url: "#expertise"
      - listitem [ref=e8]:
        - generic: Selected works
        - link "Jump to Selected works" [ref=e9]:
          - /url: "#works"
      - listitem [ref=e10]:
        - generic: FAQ
        - link "Jump to FAQ" [ref=e11]:
          - /url: "#faq"
      - listitem [ref=e12]:
        - generic: Read more
        - link "Jump to Read more" [ref=e13]:
          - /url: "#more"
  - generic [ref=e14]:
    - generic [ref=e15]: ◊
    - generic [ref=e16]:
      - paragraph [ref=e17]: New here?
      - paragraph [ref=e18]: Press / or ⌘K to fly. Try ? for the full keyboard map.
    - button "Dismiss nudge" [ref=e19]: ×
  - 'button "Atmosphere: Aura · warm peach · press T to cycle, Shift-click to share link" [ref=e21]':
    - generic [ref=e25]: AURA
  - banner:
    - navigation "Primary" [ref=e26]:
      - link "Delowar Hossain — home" [ref=e27]:
        - /url: /
        - generic [ref=e28]: Delowar Hossain
        - generic [ref=e29]: ◊ MMXXVII
      - list [ref=e30]:
        - listitem [ref=e31]:
          - link "Index" [ref=e32]:
            - /url: /
            - generic [ref=e33]: Index
        - listitem [ref=e34]:
          - link "Works" [ref=e35]:
            - /url: /works
            - generic [ref=e36]: Works
        - listitem [ref=e37]:
          - link "Lab" [ref=e38]:
            - /url: /lab
            - generic [ref=e39]: Lab
        - listitem [ref=e40]:
          - link "About" [ref=e41]:
            - /url: /about
            - generic [ref=e42]: About
        - listitem [ref=e43]:
          - link "Resume" [ref=e44]:
            - /url: /resume
            - generic [ref=e45]: Resume
        - listitem [ref=e46]:
          - link "Journal" [ref=e47]:
            - /url: /journal
            - generic [ref=e48]: Journal
        - listitem [ref=e49]:
          - link "Services" [ref=e50]:
            - /url: /services
            - generic [ref=e51]: Services
        - listitem [ref=e52]:
          - link "Contact" [ref=e53]:
            - /url: /contact
            - generic [ref=e54]: Contact
      - generic [ref=e55]:
        - button "Sound effects off — press S to toggle" [ref=e56]:
          - generic [ref=e57]: ·
          - generic [ref=e58]: Mute
        - button "Open command palette (Cmd+K)" [ref=e59]: ⌘K
        - link "Start a Project" [ref=e60]:
          - /url: /contact
  - main [ref=e62]:
    - generic [ref=e65]:
      - paragraph [ref=e66]: § AI Summary — Plain Facts
      - heading "Delowar Hossain." [level=1] [ref=e67]:
        - generic [ref=e70]: Delowar
        - generic [ref=e74]: Hossain.
      - generic [ref=e75]:
        - paragraph [ref=e76]: A factual, plain-language snapshot for AI search engines and human skim-readers. Everything here is canonical.
        - list [ref=e77]:
          - listitem [ref=e78]:
            - paragraph [ref=e79]: Role
            - paragraph [ref=e80]: Creative Developer
          - listitem [ref=e81]:
            - paragraph [ref=e82]: Base
            - paragraph [ref=e83]: Joypurhat, Bangladesh
          - listitem [ref=e84]:
            - paragraph [ref=e85]: Email
            - paragraph [ref=e86]: hello@delowarhossain.dev
          - listitem [ref=e87]:
            - paragraph [ref=e88]: Edition
            - paragraph [ref=e89]: MMXXVII
    - generic [ref=e91]:
      - generic [ref=e92]:
        - img "Delowar Hossain — portrait" [ref=e94]
        - paragraph [ref=e95]: ◊ Delowar Hossain · Joypurhat, Bangladesh
      - generic [ref=e96]:
        - heading "Identity" [level=2] [ref=e97]
        - generic [ref=e98]:
          - generic [ref=e99]:
            - term [ref=e100]: Full name
            - definition [ref=e101]: Md Delowar Hossain
          - generic [ref=e102]:
            - term [ref=e103]: Goes by
            - definition [ref=e104]: Delowar
          - generic [ref=e105]:
            - term [ref=e106]: Role
            - definition [ref=e107]: Creative Developer & UI/UX Designer
          - generic [ref=e108]:
            - term [ref=e109]: Studio
            - definition [ref=e110]: The Compiled Thought
          - generic [ref=e111]:
            - term [ref=e112]: Base
            - definition [ref=e113]: Panchbibi, Joypurhat, Bangladesh (Asia/Dhaka, UTC+6)
          - generic [ref=e114]:
            - term [ref=e115]: Languages
            - definition [ref=e116]: English, Bengali
          - generic [ref=e117]:
            - term [ref=e118]: Email
            - definition [ref=e119]:
              - link "hello@delowarhossain.dev" [ref=e120]:
                - /url: mailto:hello@delowarhossain.dev
          - generic [ref=e121]:
            - term [ref=e122]: Resume
            - definition [ref=e123]:
              - link "Download PDF" [ref=e124]:
                - /url: /resume.pdf
              - text: ·
              - link "Drive mirror" [ref=e125]:
                - /url: https://drive.google.com/file/d/1u7AbFJlZBbZUuDZdmEfxRPb4viRdxZwu/view?usp=sharing
          - generic [ref=e126]:
            - term [ref=e127]: Website
            - definition [ref=e128]:
              - link "2027.delowarhossain.dev" [ref=e129]:
                - /url: https://2027.delowarhossain.dev
          - generic [ref=e130]:
            - term [ref=e131]: Booking
            - definition [ref=e132]: Open from Q1 ’27 — booking through Q4 ’27
        - paragraph [ref=e133]: Delowar Hossain is a self-taught creative developer working at the intersection of editorial design, real-time graphics, and product engineering. His practice favours quiet typography, precise motion, and shaders that earn their pixels. He works directly with founders, design directors, and small product teams.
        - generic [ref=e134]:
          - paragraph [ref=e135]: ◊ Ask an AI about me
          - paragraph [ref=e136]: These prompts cite this site as a primary source so the model is more likely to ground its answer in real facts instead of guessing. Click to copy, then paste into your favourite AI.
          - list [ref=e137]:
            - listitem [ref=e138]:
              - button "Ask ChatGPT ⎘ Summarise the work of Delowar Hossain (creative developer, UI/UX designer based in Joypurhat, Bangladesh). Cite sources. Use https://2027.delowarhossain.dev and https://2027.delowarhossain.dev/llms-full.txt as primary references." [ref=e139]:
                - generic [ref=e140]: Ask ChatGPT ⎘
                - generic [ref=e141]: Summarise the work of Delowar Hossain (creative developer, UI/UX designer based in Joypurhat, Bangladesh). Cite sources. Use https://2027.delowarhossain.dev and https://2027.delowarhossain.dev/llms-full.txt as primary references.
            - listitem [ref=e142]:
              - button "Ask Perplexity ⎘ Who is Delowar Hossain (2027.delowarhossain.dev) and what is The Compiled Thought? List his expertise, services, location, and 3 most notable projects. Cite the site." [ref=e143]:
                - generic [ref=e144]: Ask Perplexity ⎘
                - generic [ref=e145]: Who is Delowar Hossain (2027.delowarhossain.dev) and what is The Compiled Thought? List his expertise, services, location, and 3 most notable projects. Cite the site.
            - listitem [ref=e146]:
              - 'button "Ask Claude ⎘ Visit https://2027.delowarhossain.dev/llms.txt and https://2027.delowarhossain.dev/llms-full.txt. Then summarise Delowar Hossain''s practice in 5 bullets: identity, location, expertise, signature projects, and how to contact him." [ref=e147]':
                - generic [ref=e148]: Ask Claude ⎘
                - generic [ref=e149]: "Visit https://2027.delowarhossain.dev/llms.txt and https://2027.delowarhossain.dev/llms-full.txt. Then summarise Delowar Hossain's practice in 5 bullets: identity, location, expertise, signature projects, and how to contact him."
          - paragraph [ref=e150]:
            - text: ◌ Verified citation targets — see
            - link "/llms.txt" [ref=e151]:
              - /url: /llms.txt
            - text: and
            - link "/llms-full.txt" [ref=e152]:
              - /url: /llms-full.txt
    - generic [ref=e153]:
      - generic [ref=e154]:
        - paragraph [ref=e156]: ◊ Expertise
        - list [ref=e157]:
          - listitem [ref=e158]:
            - generic [ref=e160]: UI/UX Design
          - listitem [ref=e161]:
            - generic [ref=e163]: Web Design
          - listitem [ref=e164]:
            - generic [ref=e166]: Logo & Branding
          - listitem [ref=e167]:
            - generic [ref=e169]: Webflow Design
          - listitem [ref=e170]:
            - generic [ref=e172]: Framer Design
          - listitem [ref=e173]:
            - generic [ref=e175]: Creative Development
          - listitem [ref=e176]:
            - generic [ref=e178]: Three.js · WebGL
          - listitem [ref=e179]:
            - generic [ref=e181]: GLSL Shaders
          - listitem [ref=e182]:
            - generic [ref=e184]: GSAP · Lenis
          - listitem [ref=e185]:
            - generic [ref=e187]: Next.js · Nuxt.js
          - listitem [ref=e188]:
            - generic [ref=e190]: Art Direction
          - listitem [ref=e191]:
            - generic [ref=e193]: AI Integration
      - generic [ref=e194]:
        - paragraph [ref=e196]: ◊ Services
        - list [ref=e197]:
          - listitem [ref=e198]:
            - heading "01 · Creative Development" [level=3] [ref=e199]
            - paragraph [ref=e200]: Pushing the boundaries of the browser. Custom 3D environments, complex shader materials, and fluid particle systems that respond to interaction with microscopic precision.
          - listitem [ref=e201]:
            - heading "02 · UI / UX Design" [level=3] [ref=e202]
            - paragraph [ref=e203]: Crafting minimalist, intuitive interfaces that prioritise content and motion. Rigid grids and editorial whitespace to frame digital narratives effectively.
          - listitem [ref=e204]:
            - heading "03 · Art Direction" [level=3] [ref=e205]
            - paragraph [ref=e206]: Defining the visual language. From typography selection to color grading and motion choreography, every pixel aligns with the core brand identity.
          - listitem [ref=e207]:
            - heading "04 · Full-Stack Engineering" [level=3] [ref=e208]
            - paragraph [ref=e209]: Production-grade systems with AI integration. Full-stack architecture, edge deployments, real-time pipelines, and pragmatic dev-ex.
    - generic [ref=e211]:
      - paragraph [ref=e213]: ◊ Selected works
      - list [ref=e214]:
        - listitem [ref=e215]:
          - link "Aura Void" [ref=e216]:
            - /url: /works/aura-void
          - generic [ref=e217]: — An ambient WebGL world built around a single noise field — pressure, depth, and reflection driven entirely by GLSL. v2 introduces a tactile, physics-aware cursor that pulls the field into local minima.
        - listitem [ref=e218]:
          - link "Terminal State" [ref=e219]:
            - /url: /works/terminal-state
          - generic [ref=e220]: — A typography-driven editorial system for a generative AI studio. Long-form narratives meet kinetic display type and a strict grid — fluid through phone, tablet, and ultrawide.
        - listitem [ref=e221]:
          - link "Monolith UI" [ref=e222]:
            - /url: /works/monolith-ui
          - generic [ref=e223]: — A design system for an enterprise data platform. Density, contrast, and motion calibrated for power users handling 30K+ daily sessions — now with a token pipeline that ships through Style Dictionary.
        - listitem [ref=e224]:
          - link "Kinetica" [ref=e225]:
            - /url: /works/kinetica
          - generic [ref=e226]: — A kinetic typography study turned product. Variable fonts mapped to scroll, audio amplitude, and reactive cursor velocity — the type behaves like a living organism.
        - listitem [ref=e227]:
          - link "Void Engine" [ref=e228]:
            - /url: /works/void-engine
          - generic [ref=e229]: — A real-time audio-reactive 3D scene rendered with custom raymarching. Audio FFT bins drive volumetric lighting and material color grading — originally an installation, now a web port.
        - listitem [ref=e230]:
          - link "CrackIt" [ref=e231]:
            - /url: /works/crackit
          - generic [ref=e232]: — Mobile exam-prep companion with a custom RAG pipeline, syllabus-aware quizzes, and a quiet, paper-like interface. 2027 update adds an offline mode and live tutor handoff.
        - listitem [ref=e233]:
          - link "Halcyon OS" [ref=e234]:
            - /url: /works/halcyon-os
          - generic [ref=e235]: — A serene AI-first workspace for writers. Predictive outlines fade in like ambient mist; commands surface contextually instead of through menus.
        - listitem [ref=e236]:
          - link "Echo Atlas" [ref=e237]:
            - /url: /works/echo-atlas
          - generic [ref=e238]: — Walk through a sound-mapped city in your browser. WebXR-ready, but designed first for keyboard + mouse — binaural audio steered by your gaze.
    - generic [ref=e240]:
      - paragraph [ref=e242]: ◊ FAQ
      - generic [ref=e243]:
        - generic [ref=e244]:
          - term [ref=e245]: Who is Delowar Hossain?
          - definition [ref=e246]: Delowar Hossain is a creative developer and UI/UX designer based in Joypurhat, Bangladesh. He builds immersive, performance-focused web experiences for studios and product teams worldwide, working at the intersection of editorial design, WebGL/Three.js, motion (GSAP), and AI integration. He runs an independent studio called "The Compiled Thought".
        - generic [ref=e247]:
          - term [ref=e248]: Where is Delowar Hossain based?
          - definition [ref=e249]: Joypurhat, Bangladesh (Asia/Dhaka, UTC+6). He works remotely with clients globally.
        - generic [ref=e250]:
          - term [ref=e251]: How do I contact Delowar Hossain?
          - definition [ref=e252]: "Email hello@delowarhossain.dev. Project inquiries are welcomed. Booking window: Open from Q1 ’27 — booking through Q4 ’27. Response time is typically within 24 hours on weekdays."
        - generic [ref=e253]:
          - term [ref=e254]: What does Delowar Hossain specialise in?
          - definition [ref=e255]: Creative frontend engineering with WebGL, Three.js, GLSL shaders, GSAP, Lenis, Next.js 15, React, TypeScript, and Tailwind CSS. UI/UX design for editorial, product, and brand surfaces. Generative AI integration into product interfaces.
        - generic [ref=e256]:
          - term [ref=e257]: What kind of projects does Delowar Hossain take?
          - definition [ref=e258]: "Marketing and product sites for design-led brands, immersive case-study experiences, generative product interfaces, design-system + motion-system rebuilds, art direction for digital launches. Typical engagement: 6–14 weeks."
        - generic [ref=e259]:
          - term [ref=e260]: What is Delowar Hossain's background?
          - definition [ref=e261]: Self-taught creative developer and aspiring software engineer. Currently studying B.Sc. Computer Science at the University of the People (online), on top of a B.A. in Political Science. Active web practice since 2023. Works under the studio "The Compiled Thought".
        - generic [ref=e262]:
          - term [ref=e263]: Can I download Delowar Hossain's resume?
          - definition [ref=e264]: Yes. The 2026 resume is available as a PDF at https://2027.delowarhossain.dev/resume.pdf.
        - generic [ref=e265]:
          - term [ref=e266]: What is the current edition of the portfolio?
          - definition [ref=e267]: MMXXVII (2027). The site is updated continuously.
    - generic [ref=e269]:
      - paragraph [ref=e270]:
        - text: Need more? Read
        - link "the long-form story" [ref=e271]:
          - /url: /about
        - text: ", scan the"
        - link "resume" [ref=e272]:
          - /url: /resume
        - text: ", or"
        - link "write directly" [ref=e273]:
          - /url: mailto:hello@delowarhossain.dev
        - text: .
      - paragraph [ref=e274]: Last updated · MMXXVII (2027)
  - contentinfo [ref=e276]:
    - region "Studio status" [ref=e277]:
      - generic [ref=e278]:
        - generic [ref=e279]:
          - generic [ref=e282]: 21:49 BD
          - generic [ref=e283]: ·
          - generic [ref=e284]: Joypurhat · BD
          - generic [ref=e285]: ·
          - generic [ref=e286]: 176 GH
          - generic [ref=e287]: ·
          - generic [ref=e288]: MMXXVII
          - generic [ref=e289]: ·
          - link "University of the People — B.Sc. Computer Science (in progress)" [ref=e290]:
            - /url: https://www.uopeople.edu/
            - text: B.Sc. CS · UoPeople
          - generic [ref=e291]: ·
          - generic "Time until MMXXVII (2027-01-01, Asia/Dhaka)" [ref=e292]:
            - text: → 186d 02h 10m
            - generic [ref=e293]: MMXXVII
        - link "Open from Q1 ’27 — booking through Q4 ’27" [ref=e294]:
          - /url: /contact
          - text: Open from Q1 ’27 — booking through Q4 ’27
          - generic [ref=e296]: ↗
    - generic [ref=e297]:
      - generic [ref=e298]:
        - generic [ref=e299]:
          - paragraph [ref=e300]: ◊ Open from Q1 ’27 — booking through Q4 ’27 · Selected projects
          - heading "Have an idea? Let's build it." [level=2] [ref=e301]:
            - generic [ref=e302]: Have an idea?
            - generic [ref=e303]: Let's build it.
          - generic [ref=e304]:
            - link "hello@delowarhossain.dev" [ref=e305]:
              - /url: /contact
              - text: hello@delowarhossain.dev
              - generic [ref=e306]: ↗
            - button "Copy email address to clipboard" [ref=e307]: ⎘
        - generic [ref=e308]:
          - generic [ref=e309]:
            - paragraph [ref=e310]: Pages
            - list [ref=e311]:
              - listitem [ref=e312]:
                - link "Index" [ref=e313]:
                  - /url: /
              - listitem [ref=e314]:
                - link "Works" [ref=e315]:
                  - /url: /works
              - listitem [ref=e316]:
                - link "Lab" [ref=e317]:
                  - /url: /lab
              - listitem [ref=e318]:
                - link "Process" [ref=e319]:
                  - /url: /process
              - listitem [ref=e320]:
                - link "About" [ref=e321]:
                  - /url: /about
              - listitem [ref=e322]:
                - link "Resume" [ref=e323]:
                  - /url: /resume
              - listitem [ref=e324]:
                - link "Journal" [ref=e325]:
                  - /url: /journal
              - listitem [ref=e326]:
                - link "Services" [ref=e327]:
                  - /url: /services
              - listitem [ref=e328]:
                - link "Uses" [ref=e329]:
                  - /url: /uses
              - listitem [ref=e330]:
                - link "Contact" [ref=e331]:
                  - /url: /contact
              - listitem [ref=e332]:
                - link "AI Summary" [ref=e333]:
                  - /url: /ai
          - generic [ref=e334]:
            - paragraph [ref=e335]: Connect
            - list [ref=e336]:
              - listitem [ref=e337]:
                - link "GITHUB" [ref=e338]:
                  - /url: https://github.com/mdhossain-2437
              - listitem [ref=e339]:
                - link "LINKEDIN" [ref=e340]:
                  - /url: https://www.linkedin.com/in/mdhossain2437
              - listitem [ref=e341]:
                - link "TWITTER" [ref=e342]:
                  - /url: https://twitter.com/mdhossain2437
              - listitem [ref=e343]:
                - link "INSTAGRAM" [ref=e344]:
                  - /url: https://www.instagram.com/mdhossain2437
              - listitem [ref=e345]:
                - link "FACEBOOK" [ref=e346]:
                  - /url: https://www.facebook.com/mdhossain2437
              - listitem [ref=e347]:
                - link "READ.CV" [ref=e348]:
                  - /url: https://read.cv/delowar
          - generic [ref=e349]:
            - paragraph [ref=e350]: Studio
            - list [ref=e351]:
              - listitem [ref=e352]:
                - link "Now" [ref=e353]:
                  - /url: /now
              - listitem [ref=e354]:
                - link "Uses" [ref=e355]:
                  - /url: /uses
              - listitem [ref=e356]:
                - link "Brand" [ref=e357]:
                  - /url: /brand
              - listitem [ref=e358]:
                - link "Colors" [ref=e359]:
                  - /url: /colors
              - listitem [ref=e360]:
                - link "Changelog" [ref=e361]:
                  - /url: /changelog
              - listitem [ref=e362]:
                - link "Showreel" [ref=e363]:
                  - /url: /showreel
              - listitem [ref=e364]:
                - link "Atlas" [ref=e365]:
                  - /url: /atlas
              - listitem [ref=e366]:
                - link "Recognition" [ref=e367]:
                  - /url: /awards
              - listitem [ref=e368]:
                - link "Achievements" [ref=e369]:
                  - /url: /achievements
              - listitem [ref=e370]:
                - link "Colophon" [ref=e371]:
                  - /url: /colophon
              - listitem [ref=e372]:
                - link "Privacy" [ref=e373]:
                  - /url: /legal/privacy
              - listitem [ref=e374]:
                - link "Terms" [ref=e375]:
                  - /url: /legal/terms
      - generic [ref=e376]:
        - generic [ref=e377]:
          - paragraph [ref=e378]: ◌ Signed
          - img "Delowar Hossain signature" [ref=e379]:
            - generic [ref=e381]: Delowar Hossain
        - paragraph [ref=e383]: handwritten in vector — strokes draw on view
      - generic [ref=e384]:
        - button "Quote of the day — click to copy" [ref=e386]:
          - generic [ref=e387]: ◊ Quote of the day · 206 / 365
          - generic [ref=e388]: “A particle system with art direction is weather.”
        - paragraph [ref=e389]:
          - text: ◌ A new quote rotates in at 00:00 UTC.
          - text: Click to copy. Three hundred sixty-five total.
      - generic [ref=e392]:
        - generic [ref=e393]:
          - generic [ref=e394]: DELOWAR HOSSAIN
          - generic [ref=e395]: •
        - generic [ref=e396]:
          - generic [ref=e397]: CREATIVE DEVELOPER
          - generic [ref=e398]: •
        - generic [ref=e399]:
          - generic [ref=e400]: UI / UX DESIGNER
          - generic [ref=e401]: •
        - generic [ref=e402]:
          - generic [ref=e403]: WEBGL · THREE.JS · GLSL
          - generic [ref=e404]: •
        - generic [ref=e405]:
          - generic [ref=e406]: OPEN FROM Q1 ’27 — BOOKING THROUGH Q4 ’27
          - generic [ref=e407]: •
        - generic [ref=e408]:
          - generic [ref=e409]: JOYPURHAT, BANGLADESH
          - generic [ref=e410]: •
        - generic [ref=e411]:
          - generic [ref=e412]: MMXXVII / 03.27
          - generic [ref=e413]: •
        - generic [ref=e414]:
          - generic [ref=e415]: DELOWAR HOSSAIN · MMXXVII
          - generic [ref=e416]: •
        - generic [ref=e417]:
          - generic [ref=e418]: DELOWAR HOSSAIN
          - generic [ref=e419]: •
        - generic [ref=e420]:
          - generic [ref=e421]: CREATIVE DEVELOPER
          - generic [ref=e422]: •
        - generic [ref=e423]:
          - generic [ref=e424]: UI / UX DESIGNER
          - generic [ref=e425]: •
        - generic [ref=e426]:
          - generic [ref=e427]: WEBGL · THREE.JS · GLSL
          - generic [ref=e428]: •
        - generic [ref=e429]:
          - generic [ref=e430]: OPEN FROM Q1 ’27 — BOOKING THROUGH Q4 ’27
          - generic [ref=e431]: •
        - generic [ref=e432]:
          - generic [ref=e433]: JOYPURHAT, BANGLADESH
          - generic [ref=e434]: •
        - generic [ref=e435]:
          - generic [ref=e436]: MMXXVII / 03.27
          - generic [ref=e437]: •
        - generic [ref=e438]:
          - generic [ref=e439]: DELOWAR HOSSAIN · MMXXVII
          - generic [ref=e440]: •
      - generic [ref=e441]:
        - paragraph [ref=e442]:
          - text: © 2027
          - button "Studio mark" [ref=e443]: The Compiled Thought
          - text: . All rights reserved · MMXXVII.
        - paragraph [ref=e444]:
          - text: Lat. 25.10° N · Long. 89.02° E · Joypurhat, Bangladesh ·
          - generic [ref=e445]: 21:49:30
          - text: BST
        - generic [ref=e446]:
          - link "◇ local" [ref=e447]:
            - /url: https://github.com/mdhossain-2437/Creative-Folio
          - button "Toggle motion" [ref=e448]:
            - generic [ref=e451]: Motion On
          - generic [ref=e452]: v MMXXVII / 03.27
  - alert [ref=e453]
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