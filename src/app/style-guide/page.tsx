import type { Metadata } from "next";
import { StyleGuideContent } from "./StyleGuideContent";

// Internal design-system reference page. Deliberately NOT linked from
// src/content/nav.ts and NOT listed in src/app/sitemap.ts — it must stay
// undiscoverable via navigation, and `robots` below keeps it out of search
// indexes for anyone who finds the URL directly.
export const metadata: Metadata = {
  title: "Style Guide",
  description: "Internal design-system reference — not part of the public site.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StyleGuidePage() {
  return <StyleGuideContent />;
}
