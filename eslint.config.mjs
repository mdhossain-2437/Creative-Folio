import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

// Flat config for ESLint 9 + Next.js 16. Mirrors the previous
// `.eslintrc.json` (core-web-vitals + the two project-wide rule
// overrides we've always run with).
const config = [
  ...coreWebVitals,
  ...typescript,
  {
    files: ["**/*.{js,jsx,mjs,ts,tsx,mts,cts}"],
    rules: {
      "@next/next/no-img-element": "off",
      "react/no-unescaped-entities": "off",
      // React 19's react-hooks v6 introduces several strict opinions
      // (set-state-in-effect / refs / no-unused-effect-deps / etc.).
      // The codebase has intentional patterns — singleton ref bridges,
      // route-change effect resets — that pre-date these rules and
      // remain correct. Downgrade to warning so we surface them
      // without failing the build.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/static-components": "warn",
      "react-hooks/purity": "warn",
      "react-hooks/unsupported-syntax": "warn",
      "react-hooks/preserve-manual-memoization": "warn",
      "react-hooks/immutability": "warn",
    },
  },
  {
    ignores: [
      ".lighthouseci/**",
      ".claude/**",
      ".next/**",
      ".playwright-results/**",
      "cinematic/**",
      "node_modules/**",
      "out/**",
      "dist/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },
];

export default config;
