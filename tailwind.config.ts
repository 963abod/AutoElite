import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#FAF9F6",
        surface: "#F5F2EB",
        "surface-2": "#EFECE6",
        line: "#E5E0D8",
        ink: "#1C1F1D",
        "ink-soft": "#5B5750",
        champagne: {
          DEFAULT: "#C5A880",
          deep: "#A9895E",
          pale: "#E7DAC5",
        },
        whatsapp: "#25D366",
      },
      fontFamily: {
        arabic: ["var(--font-plex-arabic)", "Tajawal", "sans-serif"],
      },
      boxShadow: {
        ambient: "0 10px 30px -10px rgba(28,31,29,0.08)",
        "ambient-lg": "0 24px 60px -20px rgba(28,31,29,0.14)",
        card: "0 1px 2px rgba(28,31,29,0.04), 0 12px 24px -14px rgba(28,31,29,0.10)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      letterSpacing: {
        tightnum: "-0.01em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
