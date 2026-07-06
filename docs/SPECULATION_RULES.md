# Speculation Rules API

## Current State

Speculation Rules are active as a progressive enhancement, not as a baseline
navigation dependency.

The normal navigation warmup still comes from:

- `<Link prefetch={false}>` by default, with measured exceptions only.
- `RoutePrefetcher`, loaded by `LazyChrome` after a quiet window.
- Route-level dynamic imports and static generation.

`RoutePrefetcher` now also installs `<link rel="speculationrules">` only when:

1. The browser reports support through `HTMLScriptElement.supports`.
2. The page is visible.
3. The connection is not Save-Data, `slow-2g`, `2g`, or `3g`.

## Rules Route

`src/app/speculation-rules/route.ts` returns
`application/speculationrules+json`.

Active rules:

- `prefetch`: `/works`, `/lab`, `/journal`, `/about`, `/ai`
- `prerender`: `/works`, `/lab`

Prerender uses `eagerness: "conservative"` and only includes stable, public,
side-effect-free GET routes. Dynamic slugs, API routes, contact form paths,
media-heavy showreel, and legal pages are intentionally excluded.

## Constrained Connections

The route returns an empty ruleset when request headers indicate:

- `Save-Data: on`
- `ECT: slow-2g`
- `ECT: 2g`
- `ECT: 3g`

The response varies on `Save-Data` and `ECT` and uses private short caching so
one user's constrained rules do not get served as a shared CDN default.

## Verification

Automated smoke coverage checks:

- The default route returns a valid speculation-rules object.
- Save-Data requests return empty `prefetch` and `prerender` arrays.
- 2g/3g request hints also return empty rules.

Manual browser verification:

```js
document.querySelector('link[rel="speculationrules"]')?.href;
```

On capable Chromium, after `LazyChrome` loads and the page has been quiet, this
should point to `/speculation-rules`. On Save-Data or slow network hints, it
should stay absent.
