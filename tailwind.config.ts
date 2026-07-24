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
        heading: ["var(--font-heading)", "serif"],
        subheading: ["var(--font-subheading)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      fontSize: {
        // Heading (Fraunces) — 37px / 60px / 96px
        "heading-sm": ["2.3125rem", { lineHeight: "1.2" }],
        "heading-md": ["3.75rem", { lineHeight: "1.1" }],
        "heading-lg": ["6rem", { lineHeight: "1.05" }],
        // Subheading (Marcellus SC) — 12px / 20px / 28px
        "subheading-sm": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.1em" }],
        "subheading-md": ["1.25rem", { lineHeight: "1.3", letterSpacing: "0.02em" }],
        "subheading-lg": ["1.75rem", { lineHeight: "1.3", letterSpacing: "0.08em" }],
        // Paragraph (Inter) — 18px / 24px / 28px
        "body-sm": ["1.125rem", { lineHeight: "1.5" }],
        "body-md": ["1.5rem", { lineHeight: "1.5" }],
        "body-lg": ["1.75rem", { lineHeight: "1.5" }],
      },
      fontWeight: {
        // Use anywhere: font-thin / font-normal / font-bold.
        // Fraunces (heading) and Inter (body) support all three.
        // Marcellus SC (subheading) is a single-weight font from Google — only 400 renders.
        thin: "200",
        normal: "400",
        bold: "700",
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
