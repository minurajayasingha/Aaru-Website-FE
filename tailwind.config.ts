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
            900: "#173329",
          },
          cream: "#f4f2ee",
          "cream-dark": "#e9e4d8",
          gold: "#b5915d",
          "gold-light": "#d4b483",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        subheading: ["var(--font-subheading)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      fontSize: {
        /// headings
        "h-01": ["3.5rem", { lineHeight: "1.05" , letterSpacing: "0em" }],//main headings big heros sections headings 
        "h-02": ["2.75rem", { lineHeight: "1.5" , letterSpacing: "0em" }],//main headings big heros sections headings 
        //Paragraphs
        "para-lg": ["1.5rem", { lineHeight: "1.2", letterSpacing: "0.2em"  }],//footer link headings
        "para-md": ["1.25rem", { lineHeight: "1", letterSpacing: "0.2em" }],//eye brows
        "para-sm": ["1rem", { lineHeight: "1", letterSpacing: "0em" }],//paragarphs/buttons
        "para-xs": ["0.9rem", { lineHeight: "1", letterSpacing: "0em" }],// navbar links
        "para-xxs": ["0.8rem", { lineHeight: "1", letterSpacing: "0em" }],//footer links/form fileds naming
      },
      fontWeight: {
        // Use anywhere: font-thin / font-normal / font-bold.
        // Fraunces (heading) and Inter (body) support all three.
        // Marcellus SC (subheading) is a single-weight font from Google — only 400 renders.
        thin: "200",
        light: "300",
        normal: "400",
        bold: "700",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
        // 140px side margin at the 1920px reference design — expressed as a
        // percentage so it scales proportionally with viewport width instead
        // of staying a fixed pixel value. 140 / 1920 = 7.2917%.
        "section-x": "7.2917%",
        "section-s": "10%",
      },
      borderRadius: {
        button: "0.375rem",
        input: "0.375rem",
        card: "0.75rem",
      },
      boxShadow: {
        card: "0 4px 24px 0 rgba(11, 32, 22, 0.08)",
        card2: "0 4px 24px 0 rgba(11, 32, 22, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
