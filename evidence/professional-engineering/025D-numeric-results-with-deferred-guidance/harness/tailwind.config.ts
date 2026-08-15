import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "../../../../components/**/*.{js,ts,jsx,tsx}", "../../../../lib/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {
    colors: { ink: "var(--color-ink)", sand: "var(--color-sand)", steel: "var(--color-steel)", ember: "var(--color-ember)", canvas: "var(--color-warm-bone)" },
    fontFamily: { sans: ["var(--font-sans)"], display: ["var(--font-display)"] },
    boxShadow: { panel: "0 20px 60px rgba(17, 29, 43, 0.12)" }
  } }, plugins: [],
};
export default config;
