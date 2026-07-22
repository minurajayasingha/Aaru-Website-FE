import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          forest: {
            50: "#eef2f0",
            100: "#d7e0da",
            200: "#aec1b5",
            300: "#84a290",
            400: "#5c826b",
            500: "#3c5c46",
            600: "#2b4834",
            700: "#1c3524",
            800: "#122a1c",
            900: "#0b2016",
          },
          cream: "#f4f1ea",
          "cream-dark": "#e9e4d8",
          gold: "#b9925a",
          "gold-light": "#d4b483",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      borderRadius: {
        button: "0.375rem",
        input: "0.375rem",
        card: "0.75rem",
      },
      boxShadow: {
        card: "0 4px 24px 0 rgba(11, 32, 22, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
