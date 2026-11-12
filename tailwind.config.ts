import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#050816",
        deep: "#0A1028",
        cyan: { DEFAULT: "#00D9FF" },
        violet: { DEFAULT: "#7D5FFF" },
        mint: { DEFAULT: "#00FFAA" },
        amber: { DEFAULT: "#FFB547" },
        mist: "#9AA6C7",
      },
      fontFamily: {
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
