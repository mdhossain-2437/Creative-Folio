# Indexing & Ranking Checklist — "Delowar Hossain"

> Companion to [`SEO.md`](./SEO.md). This is the **do-this-now** list to get
> every page indexed and to rank for the branded queries *Delowar Hossain*
> and *The Compiled Thought* on Google, Bing, and Yahoo, with the portrait +
> Knowledge Panel on the right.
>
> The code side is done (canonicals, structured data, image SEO, sitemap,
> robots, IndexNow, OG images). The steps below are the parts only the site
> owner can do — they need your Google/Bing accounts and DNS/env access.

---

## What the code already guarantees

- ✅ Every page now emits a correct **self-referencing canonical** (the old
  bug made all pages canonicalize to the homepage → de-indexed; fixed).
- ✅ Rich JSON-LD: `Person`, `Organization`, `WebSite`, `ProfilePage`,
  `FAQPage`, per-page `WebPage` + `BreadcrumbList`. Entity graph cross-linked
  by `@id` so Google knows the site **is** Delowar Hossain.
- ✅ `Person.image` is a structured `ImageObject` with the exact portrait
  dimensions (1317×1194) → image↔entity link for the Knowledge-Panel photo.
- ✅ `/sitemap.xml` with `<image:image>` entries (portrait on every entity
  page), `/robots.txt` allowing Google/Bing + AI crawlers, `/indexnow.txt`.
- ✅ Studio/entity terms (`The Compiled Thought`, `Compiled Thought`,
  `2027.delowarhossain.dev`) appear in structured data and metadata without
  keyword stuffing.
- ✅ OG + Twitter image cards on every key route.

---

## Step 1 — Verify ownership (once per engine)

The site reads verification tokens from env vars and renders the meta tags
automatically (see `src/app/layout.tsx > metadata.verification`). Set these in
**Vercel → Project → Settings → Environment Variables**, then redeploy:

| Env var | Where to get it |
| --- | --- |
| `NEXT_PUBLIC_GOOGLE_VERIFICATION` | Google Search Console → Add property (URL-prefix) → HTML tag method → copy the `content` value |
| `NEXT_PUBLIC_BING_VERIFICATION` | Bing Webmaster Tools → Add site → Meta tag → copy the `content` value |
| `NEXT_PUBLIC_YANDEX_VERIFICATION` | Yandex Webmaster → copy the meta `content` value |

> **Yahoo** uses Bing's index — verifying Bing covers Yahoo. Set the Bing one.
> Prefer the **Domain property** in GSC (DNS TXT) if you can — it covers
> http/https + www/non-www in one shot. The meta-tag method above also works.

After redeploy, click **Verify** in each console.

---

## Step 2 — Submit the sitemap

1. **Google Search Console** → *Sitemaps* → enter `sitemap.xml` → Submit.
2. **Bing Webmaster Tools** → *Sitemaps* → submit
   `https://2027.delowarhossain.dev/sitemap.xml`.
3. Confirm it reads "Success" and shows the discovered URL count (~40+).

---

## Step 3 — Request indexing for the key pages

In GSC → **URL Inspection**, paste each and click **Request Indexing**
(do the entity pages first — they carry the portrait + Person schema):

```
https://2027.delowarhossain.dev/
https://2027.delowarhossain.dev/about
https://2027.delowarhossain.dev/ai
https://2027.delowarhossain.dev/resume
https://2027.delowarhossain.dev/works
https://2027.delowarhossain.dev/contact
```

The rest get picked up from the sitemap within a few days.

---

## Step 4 — Ping IndexNow (instant Bing/Yandex/Yahoo)

The key file is live at `https://2027.delowarhossain.dev/indexnow.txt`. After a
deploy, POST the changed URLs to the built-in endpoint:

```bash
curl -X POST https://2027.delowarhossain.dev/api/indexnow \
  -H "Content-Type: application/json" \
  -d '{"urls":["https://2027.delowarhossain.dev/","https://2027.delowarhossain.dev/about"]}'
```

Confirm acceptance in **Bing Webmaster Tools → IndexNow**.

---

## Step 5 — Validate structured data (no GSC errors)

Run these after every deploy that touches `JsonLd.tsx` / `PageSchema.tsx`:

- https://search.google.com/test/rich-results — paste the homepage URL.
  Expect: **Person**, **FAQ**, **Breadcrumb**, **Logo/Organization** eligible,
  zero errors.
- https://validator.schema.org — paste the URL; expect 0 errors.
- GSC → **Enhancements** + **Pages** report → should show 0 "duplicate
  canonical" / "excluded" errors after the canonical fix propagates.

---

## Step 6 — Strengthen the entity (the ranking levers)

Ranking #1 for a personal name is mostly **entity confirmation + backlinks**.
The two-way handshake matters most: each profile must list
`2027.delowarhossain.dev` in its website field, and the site's `Person.sameAs`
(in `src/lib/site.ts > socials`) must list that profile back.

- [ ] GitHub bio → website = `2027.delowarhossain.dev`
- [ ] LinkedIn → Contact info → website = `2027.delowarhossain.dev`
- [ ] X/Twitter, Instagram, Facebook bios → link the domain
- [ ] Awwwards / CSS Design Awards / FWA / Product Hunt / Behance / Dribbble
      profiles → link the domain
- [ ] Keep every `sameAs` URL in `site.ts` resolving (a broken one hurts trust)

Use natural anchors when you can: `Delowar Hossain`,
`The Compiled Thought`, or `creative developer portfolio`. Do not buy bulk
links or submit to spam directories.

---

## Honest expectations

- **Indexing** of every page: fully in your control now — the canonical fix +
  sitemap + request-indexing gets there in days.
- **Ranking #1 for "Delowar Hossain"**: the on-site signals are maxed out, but
  final position depends on backlinks, domain age, and any other people/brands
  sharing the name. Expect steady climb over 2–8 weeks as Google rebuilds the
  entity; the steps above remove every on-site blocker.
- **Knowledge Panel + portrait on the right**: this is Google's call — it
  appears once the entity has enough cross-confirming signals (the schema +
  sameAs handshake above is exactly what triggers it). It can take weeks and
  cannot be forced, only earned with the signals we now emit.
