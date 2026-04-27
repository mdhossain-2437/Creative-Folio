import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#070708",
          900: "#0c0c0c",
          800: "#131313",
          700: "#1f201f",
          600: "#525259",
          500: "#717179",
          400: "#c6c6c7",
        },
        bone: "#e5e2e0",
        peach: "#e3bfb4",
        warmwhite: "#efece9",
        electric: "#cdfa00",
        paper: "#f3efe9",
      },
      fontFamily: {
        serif: ["var(--font-newsreader)", "Newsreader", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter: "-0.03em",
        widest: "0.22em",
      },
      transitionTimingFunction: {
        ease: "cubic-bezier(0.6, 0.05, 0.01, 0.99)",
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        marqueeReverse: "marquee 50s linear infinite reverse",
        "spin-slow": "spin 28s linear infinite",
        flicker: "flicker 5s linear infinite",
        "digit-roll": "digitRoll 6s steps(10, end) infinite",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        flicker: {
          "0%,100%": { opacity: "1" },
          "48%": { opacity: "1" },
          "50%": { opacity: "0.85" },
          "52%": { opacity: "1" },
        },
        digitRoll: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
        pulseSoft: {
          "0%,100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
