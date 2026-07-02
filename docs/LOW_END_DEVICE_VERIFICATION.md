# Low-End Device Verification

Use this checklist when validating the live site on a real low-end Android
device. Emulation is useful for development, but this pass is for physical
hardware after deployment.

## Device Target

Record these before testing:

- Device model:
- Android version:
- Chrome version:
- Network: Wi-Fi / 4G / 3G / metered:
- Battery saver: on / off:
- Site URL:
- Build SHA:

Recommended baseline: an Android phone with 2-4 GB RAM, integrated mobile GPU,
and current stable Chrome.

## Routes

Test these routes with motion on first, then repeat the same routes with the
site motion toggle off:

- `/`
- `/works`
- `/lab`
- `/lab/particle-systems`
- `/showreel`
- `/contact`
- `/resume`

## Device Tier Output

Open Chrome remote debugging, visit `/lab/particle-systems`, wait for the page
to hydrate, then run:

```js
const metric = document.querySelector("[data-lab-runtime-metric]");
({
  tier: metric?.getAttribute("data-device-tier"),
  renderer: metric?.getAttribute("data-renderer"),
  particles: metric?.getAttribute("data-particle-count"),
});
```

Expected:

- Real low-end Android should usually report `low` or `mid`.
- Renderer should match the active path, currently `Canvas2D` for particle
  systems.
- Particle count should match the tiered runtime:
  - `low`: `1100`
  - `mid`: `1600`
  - `high`: `2200`

If a visibly weak device reports `high`, capture the device model, Chrome
version, and Performance trace. Treat that as a tiering bug to investigate.

## Scroll FPS Notes

Use Chrome DevTools Performance Monitor or a Performance trace.

Record:

- Route:
- Motion: on / off:
- Device tier:
- Lowest sustained FPS during a 10-second scroll:
- Long tasks over 100 ms:
- Blank canvas or missing hero: yes / no:
- Input delay noticeable while scrolling: yes / no:
- Notes:

Acceptance thresholds:

- Motion on: sustained scroll should stay at or above 30 FPS on low-tier
  hardware after the first warm-up second.
- Motion off: sustained scroll should feel native and should not show repeated
  long tasks over 100 ms.
- No route may show a blank canvas, frozen hero, sideways overflow, or blocked
  navigation.
- First interaction after load should respond within roughly 100 ms.

## Context-Loss Check

On `/` and `/lab`, trigger context loss from remote debugging:

```js
document.querySelectorAll("canvas").forEach((canvas) => {
  const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
  gl?.getExtension("WEBGL_lose_context")?.loseContext();
});
```

Expected:

- Page remains navigable.
- No uncaught page errors.
- Acceptable console telemetry: `[WebGL Error] context_lost ...`.
- Unacceptable: repeated uncaught exceptions, blank page, stuck route
  transition, or scroll lock.

## Result Template

```md
## Real Device Pass

- Date:
- Tester:
- Device:
- Android / Chrome:
- URL / SHA:
- Network:
- Motion on result:
- Motion off result:
- `/lab/particle-systems` tier / renderer / particles:
- Worst sustained FPS:
- Long task notes:
- Context-loss result:
- Verdict: pass / needs follow-up
```

Do not mark Todo 10 fully live-verified until this template is filled from a
physical device. The repository-side requirement is this checklist plus the
existing automated gate.
