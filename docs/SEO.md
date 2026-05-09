# SEO + Generative-Engine Optimisation Playbook

> Companion: [`KNOWLEDGE_BASE.md`](./KNOWLEDGE_BASE.md), [`PERFORMANCE.md`](./PERFORMANCE.md).

The site competes on two front lines:

1. **Search engines** (Google, Bing, Yandex, Brave, DuckDuckGo) — wins by
   classical SEO (sitemap + robots + structured data + canonical + image
   alts + branded title template).
2. **Generative engines** (ChatGPT, Perplexity, Claude, Gemini, You) —
   wins by being *citable*: clean prose, hard facts, structured `<dl>`,
   FAQ schema, llms.txt convention, broad AI-crawler allow-list.

The North-Star goal is: someone searches **"Delowar Hossain"** on Google
and the first result is `delowarhossain.dev`, with a Knowledge Panel
showing the portrait + tagline + studio, the alumniOf line listing
University of the People, and a sitelinks tree.

---

## 1. Branded Identity Signals

Google builds a Knowledge Panel for a name when the entity-resolution
graph has enough cross-confirming signals. We feed all of them:

### `Person` JSON-LD

In `src/components/seo/JsonLd.tsx` we ship a `Person` node with:

- `givenName`, `familyName`, `additionalName`, multiple `alternateName`
  values (Delowar / Md Delowar Hossain / delowarhossain).
- `image` as an `ImageObject` (URL + width + height + caption).
- `address` (Joypurhat, Rajshahi, BD).
- `jobTitle`, `hasOccupation` with `skills`.
- `knowsLanguage` (en + bn), `knowsAbout` (~20 entries).
- `email`, `url`, `mainEntityOfPage`, `subjectOf` (resume PDF).
- `sameAs` array — GitHub, LinkedIn, Twitter, read.cv. **Every** sameAs
  must resolve. Broken links cost trust.
- `alumniOf` — array of two `EducationalOrganization` entries:
  University of the People (with `url`) + B.A. Political Science.
- `award` array (Awwwards, CSS Design Awards, FWA, Product Hunt).

### Cross-references

Stable `@id` cross-refs link the four nodes into one graph:

```
#person  ⇄  #organization  (worksFor, founder)
#person  ⇄  #website        (copyrightHolder, author)
#person  ⇄  #profilepage    (mainEntity)
```

This is what makes Google realise the site **is** the person, not just
mentions of them.

### Title template

`src/app/layout.tsx` exports:

```ts
title: { default: "Delowar Hossain — …", template: "%s · Delowar Hossain" }
```

Every page's `metadata.title` becomes `<page> · Delowar Hossain`. Branded
search benefits from this — the name appears in every SERP entry.

### Self-confirming sameAs

The classical entity-validation flow: GitHub profile bio links to
`delowarhossain.dev`, the site's `Person.sameAs` lists the GitHub URL.
Maintain this two-way handshake on every external profile (LinkedIn,
read.cv, X/Twitter).

---

## 2. Sitemap + Robots + Verification

### `/sitemap.xml`

Generated from `src/app/sitemap.ts`. Includes:

- Every static route with `lastmod` + `priority` + `changeFrequency`.
- Every dynamic route generated from `data.ts` (works, journal, lab).
- `<image:image>` entries for portrait + project covers + OG cards
  (Google Image SEO).
- `/llms.txt`, `/llms-full.txt`, `/ai` — exposed for AI crawlers.

### `/robots.txt`

Generated from `src/app/robots.ts`. Two rule blocks:

- `User-agent: *` → `Allow: /`, `Disallow: /api/`.
- Explicit `Allow: /` for 16+ AI crawlers including: GPTBot, ClaudeBot,
  PerplexityBot, Google-Extended, Applebot-Extended, Bingbot,
  OAI-SearchBot, ChatGPT-User, MistralAI-User, YouBot, DuckAssistBot,
  CCBot, FirecrawlBot.
- `Sitemap:` line at the bottom pointing at `/sitemap.xml`.

### Verification meta tags

`src/app/layout.tsx > metadata.verification` reads three env vars:

- `NEXT_PUBLIC_GOOGLE_VERIFICATION` → `<meta name="google-site-verification">`
- `NEXT_PUBLIC_BING_VERIFICATION` → `<meta name="msvalidate.01">`
- `NEXT_PUBLIC_YANDEX_VERIFICATION` → `<meta name="yandex-verification">`

If unset, the meta tag is omitted entirely (no broken `content=""`).
Set in Vercel Project → Environment Variables.

---

## 3. IndexNow

Bing/Yandex/Naver/Seznam/Yep accept instant URL-change pings via the
[IndexNow](https://www.indexnow.org) protocol — much faster than waiting
for a crawl.

### Key file: `/indexnow.txt`

`src/app/indexnow.txt/route.ts` returns a UTF-8 text body containing the
key. Default key is hardcoded:

```
fd368c2ed2b146b08786d891a327f465
```

This is **safe and intentional** — IndexNow keys are public by design,
search engines GET the file to verify ownership before accepting URL
pings. The key is in the public asset surface either way.

To rotate, set `NEXT_PUBLIC_INDEXNOW_KEY` in Vercel env. The route uses
the env value if set, otherwise falls back to the hardcoded default.

### Ping endpoint: `POST /api/indexnow`

`src/app/api/indexnow/route.ts` accepts a JSON body and fans out the
announcement to api.indexnow.org. Run after every deploy, or wire to a
post-deploy hook in Vercel.

### After deploy

1. Visit `https://delowarhossain.dev/indexnow.txt` — should return the
   key as a plain-text string.
2. POST a test URL list to `/api/indexnow`.
3. Verify in Bing Webmaster Tools → IndexNow tab that pings are
   accepted.

---

## 4. Per-Page Metadata

Every `page.tsx` should export `metadata` with at minimum:

```ts
export const metadata: Metadata = {
  title: "Page name",
  description: "1–2 sentences for SERPs and OG.",
  alternates: { canonical: "/path" },
};
```

The title template prepends nothing — Next does the merge with the
layout-level template. Description should be **distinct** per page (not
the global tagline copy-pasted).

### OG / Twitter

Edge-rendered OG images live at `<route>/opengraph-image.tsx` (and
`twitter-image.tsx` for X). They use `next/og` `ImageResponse` and run on
the Edge runtime. Pattern: portrait + name + role + URL on a 1200×630
ink-950 canvas with peach accent.

Routes with custom OG cards:

- `/` (homepage)
- `/about`
- `/now`
- `/uses`
- `/works/[slug]` (per-project)
- `/journal/[slug]` (per-post)
- `/lab/[slug]` (per-experiment)

Adding a new OG card: copy `src/app/about/opengraph-image.tsx`, change
the title + meta line, keep the layout (portrait left, text right).

---

## 5. Generative-Engine Optimisation (GEO)

LLMs scrape the web for training data and run live-retrieval against
indexed sites. To be cited well, give them clean, structured, factual
copy.

### `/llms.txt` and `/llms-full.txt`

Following the [llmstxt.org](https://llmstxt.org) convention:

- `/llms.txt` — a manifest. Site purpose, who built it, links to the
  full content blocks (works, journal, lab, services, etc.).
- `/llms-full.txt` — full plain-text dump of all primary content. Easy
  to crawl, easy to ingest.

Both are routes (`src/app/llms.txt/route.ts`, `src/app/llms-full.txt/route.ts`)
that return `text/plain`.

### `/ai` page

A clean factual snapshot tuned for AI citation:

- Portrait + name in `<h1>`.
- `<dl>` of hard facts (location, languages, availability, contact).
- Service list as a `<ul>` with prose descriptions.
- Recent works as a `<ul>` with prose descriptions.
- 8-question FAQ wrapped in `FAQPage` JSON-LD.
- `BreadcrumbList` JSON-LD.
- "Ask the folio" prompt copier — three click-to-copy prompts pre-formed
  for ChatGPT / Perplexity / Claude that cite `delowarhossain.dev`.

When updating identity facts, **update `/ai` too** — it's the AI-engine
mirror of `/about` and is the most likely page to be cited.

### Plain-prose blocks

Every primary page (`/about`, `/services`, `/now`, `/ai`) leads with a
plain-prose paragraph naming the entity, location, studio, languages.
This gives the LLM unbroken text to quote.

Don't bury facts inside ASCII-art layouts or marquee text — those are
beautiful for humans and invisible to LLM token streams.

---

## 6. Submission + Monitoring

### After every meaningful deploy

1. Submit the URL to **Google Search Console** → URL Inspection →
   Request Indexing. (Even when you have a sitemap, this nudges the
   crawl queue.)
2. Submit to **Bing Webmaster Tools** → URL Submission. (Bing also
   accepts the IndexNow ping.)
3. Submit to **Brave Search webmaster** at
   https://search.brave.com/help/webmaster-help.
4. Wait 24–72 hours, then check rankings for "Delowar Hossain" and
   variations.

### Monitor

| Tool | Watches | Cadence |
| --- | --- | --- |
| Google Search Console | Impressions, clicks, position for branded + non-branded queries | weekly |
| Bing Webmaster Tools | Same for Bing + Yahoo | weekly |
| https://validator.schema.org | JSON-LD parse errors | after every JsonLd edit |
| https://search.google.com/test/rich-results | Eligibility for FAQ / Person / SiteLinks / Logo | after every JsonLd edit |
| https://csp-evaluator.withgoogle.com | CSP grade | after every `next.config.mjs` edit |
| https://securityheaders.com | Headers grade | after every deploy |
| https://hstspreload.org | HSTS preload eligibility | once, after 30 days of HSTS in prod |

---

## 7. Branded-Search Tactics for "Delowar Hossain"

These are the levers when ranking for the name itself:

1. **Identity surfaces.** Every social handle, profile, byline that says
   "Delowar Hossain" + links to `delowarhossain.dev` is a vote. Maintain
   GitHub bio, LinkedIn headline, Twitter bio, read.cv, Awwwards profile,
   Behance profile, Dribbble profile.
2. **Self-references.** Site uses the full name in `<h1>` on `/`,
   `/about`, `/ai`, `/resume`. Every page title contains the name via the
   template.
3. **Image SEO.** Portrait `/profile.png` is referenced from `/about`,
   `/ai`, JSON-LD `Person.image`, sitemap `<image:image>`, OG image
   route. Filename + alt text both contain "Delowar Hossain".
4. **AI-engine citations.** ChatGPT/Claude/Perplexity citations now show
   in some of Google's results. Being canonical on `/llms.txt` and `/ai`
   is a forward path.
5. **Backlinks from authoritative profiles.** Awwwards SOTD, FWA, CSS
   Design Awards, Product Hunt — all sources of high-authority backlinks.
   Maintain those profiles.
6. **Structured data freshness.** Bump `dateModified` on `ProfilePage`
   when significant content changes (rebrand, new role, new project).

### What NOT to do

- Don't keyword-stuff. Repeating "Delowar Hossain" 50 times in copy
  triggers spam classifiers.
- Don't fake awards or backlinks.
- Don't redirect from a domain you don't control.
- Don't submit a partial sitemap.
- Don't use cloaking / different content for crawlers vs humans.

---

## 8. International / Local

The Bangla-speaking audience matters too. Currently:

- `knowsLanguage: ["en", "bn"]` in Person schema.
- `availableLanguage: ["English", "Bengali"]` on contactPoint.
- `address.addressCountry.name: "BD"`.

Future-2028 task: ship a Bangla locale (`/bn/`) for `/about`, `/services`,
`/contact`. Add `hreflang="bn"` alternates. The current
`metadata.alternates.languages` is already wired in
`src/app/layout.tsx` — just add the `bn` entry once the translations are
ready.

---

## 9. Anti-Patterns Encountered

These mistakes have been made and fixed in earlier PRs. Don't repeat
them.

- **`alumniOf` as a single object.** Schema.org allows arrays —
  switching to array unblocks listing both UoPeople and Political
  Science. Always use array form unless there's exactly one entity.
- **Hard-coded domain in OG / canonical.** Always use `metadataBase` +
  relative paths. Inline domains break preview deploys.
- **Broken `sameAs` URLs.** `linkedin.com/in/mdhossain-2437` (with dash)
  was the original schema entry; the actual handle is
  `mdhossain2437` (no dash). One broken `sameAs` undermines all of
  them. Verify each with `curl -I` before merge.
- **Missing image alt with name.** "portrait" alone doesn't help SEO.
  Always: `alt="Delowar Hossain — portrait"`.
- **`og:image` set but `twitter:image` missing.** Both must be present;
  X uses `twitter:image` exclusively.
- **`description` on `<head>` longer than 160 chars.** Gets truncated in
  SERPs. Keep it tight.
