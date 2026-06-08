# Agent Skills - Creative-Folio

This file defines repo-specific skills an AI agent should apply while working
on Creative-Folio. These are not external plugins; they are disciplined habits
for preventing hallucination and producing careful engineering work.

## Skill 1: Source-First Orientation

Trigger: every task.

Steps:

1. Run `git status --short --branch`.
2. Read `AGENTS.md`.
3. Identify the likely source-of-truth files for the request.
4. Read nearby code before editing.
5. Keep notes about which file proved each assumption.

Do not answer architecture, dependency, command, route, SEO, or content
questions from memory when the repo can be inspected.

## Skill 2: Brief-Driven Implementation

Trigger: any meaningful code or content change.

Write or mentally establish:

- Outcome: what the user sees or gains.
- Scope: smallest files that need changes.
- Verification: commands, browser checks, validators.
- Rollback: whether a simple revert is enough.

If scope grows, pause and re-check whether the extra work belongs in this
change.

## Skill 3: Pattern Mirroring

Trigger: adding or changing a route, component, API handler, WebGL component,
metadata block, or content entry.

Steps:

1. Find the closest existing example in the same folder.
2. Match naming, exports, prop shape, class style, metadata shape, and cleanup
   style.
3. Only introduce a new abstraction if it removes real duplication or matches
   an existing local pattern.

Examples:

- New page: mirror another `src/app/<slug>/page.tsx`.
- New OG image: mirror sibling `opengraph-image.tsx`.
- New WebGL piece: mirror `src/components/webgl/HeroFluidDisplacement.tsx`.
- New API route: mirror `src/app/api/github/route.ts` cache/fallback posture.

## Skill 4: Performance Guardian

Trigger: scroll, motion, canvas, WebGL, cursor, preloader, route transition,
prefetch, media, or large visual changes.

Checklist:

- No React state on the scroll hot path.
- Use CSS custom properties or stable refs for live scroll values.
- rAF loops are paused with `IntersectionObserver`.
- rAF/listeners/observers are cleaned up.
- Reduced motion exits early or provides a calmer path.
- Save-Data and slow connection hints are respected.
- DPR is capped for canvas/WebGL.
- Heavy client components are lazy-loaded when appropriate.

Read `docs/PERFORMANCE.md` before editing performance-sensitive code.

## Skill 5: SEO/GEO Steward

Trigger: pages, routes, identity, public content, JSON-LD, sitemap, robots,
llms routes, OG/Twitter images.

Checklist:

- Page exports `metadata`.
- Canonical uses relative paths with root `metadataBase`.
- Sitemap includes the public route.
- OG/Twitter image behavior is present when expected.
- JSON-LD graph remains valid.
- `alumniOf` remains an array sourced from `site.education`.
- `/llms.txt` and `/llms-full.txt` mirror major public content changes.
- `site.ts` remains the identity source of truth.

Read `docs/SEO.md` before SEO/GEO edits.

## Skill 6: Security Steward

Trigger: headers, CSP, external URLs, APIs, env vars, media origins, scripts,
analytics, forms, GitHub/API integrations.

Checklist:

- No secrets are committed.
- Server-only env vars do not cross into client components.
- New external origins are added only to necessary CSP directives.
- New image/media origins are reflected in `next.config.mjs`.
- API routes have explicit cache behavior and fallback strategy.
- Security headers are not weakened.
- Identity URLs in `sameAs` and `rel="me"` remain verified.

Read `SECURITY.md` before security-sensitive edits.

## Skill 7: Design-System Steward

Trigger: UI, layout, copy, color, typography, motion, cards, navigation,
creative sections.

Checklist:

- Use Tailwind tokens, not raw component-level color values.
- Preserve contrast rules.
- Match the local typography rhythm.
- Keep first-viewport identity clear.
- Avoid generic marketing filler.
- Avoid redesigning unrelated sections.
- Ensure mobile and desktop text fit without overlap.
- Keep cursor and modal z-index contracts intact.

## Skill 8: Dependency Gatekeeper

Trigger: adding or upgrading packages.

Checklist:

- Confirm the existing stack cannot solve the problem.
- Prefer official docs for version-sensitive implementation.
- Use pnpm only.
- Keep lockfile changes intentional.
- Do not combine major framework upgrades with feature work.
- Document new patterns in `docs/KNOWLEDGE_BASE.md` or the relevant doc.

## Skill 9: Verification Reporter

Trigger: before final response, commit, push, or PR.

Steps:

1. Run relevant checks from `docs/AGENT_VERIFICATION_MATRIX.md`.
2. Run `git diff --check`.
3. Inspect `git diff` or staged diff.
4. Report exactly what passed, failed, or was skipped.

Never claim confidence from checks that were not run.

## Skill 10: Main-Branch Safety

Trigger: commit or push requests.

Rules:

- Confirm branch with `git status --short --branch`.
- Commit only scoped files.
- Do not include unrelated dirty changes.
- Do not force-push to `main`.
- Push to `origin/main` only when the user explicitly wants direct main
  publishing or the repo policy for the task says so.
- If checks cannot run, document why in the final response.
