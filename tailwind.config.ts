import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "var(--color-racing-green)",
        technical: "var(--color-midnight-navy)",
        canvas: "var(--color-warm-bone)",
        surface: "var(--color-white)",
        data: "var(--color-data-blue)",
        accent: "var(--color-heritage-gold)",
        muted: "var(--color-slate)",
        success: "var(--color-status-green)",
        warning: "var(--color-status-amber)",
        danger: "var(--color-status-red)",
        ink: "var(--color-ink)",
        sand: "var(--color-sand)",
        steel: "var(--color-steel)",
        ember: "var(--color-ember)",
        mist: "var(--color-mist)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
      },
      boxShadow: {
        panel: "0 20px 60px rgba(17, 29, 43, 0.12)",
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(15, 23, 42, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
