import type { Metadata } from "next";
import { Marcellus_SC, Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { FooterSection } from "@/components/layout/FooterSection";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { siteConfig } from "@/content/site";

const heading = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const subheading = Marcellus_SC({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-subheading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${subheading.variable} ${body.variable}`}>
      <body className="font-body">
        <SmoothScroll />
        <OrganizationJsonLd />
        <Navbar />
        <main>{children}</main>
        <FooterSection />
      </body>
    </html>
  );
}
