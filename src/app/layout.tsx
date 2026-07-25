import type { Metadata } from "next";
import { Marcellus_SC, Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { CtaBannerGate } from "@/components/layout/CtaBannerGate";
import { Footer } from "@/components/layout/Footer";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
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
        <OrganizationJsonLd />
        <Navbar />
        <main>{children}</main>
        <CtaBannerGate />
        <Footer />
      </body>
    </html>
  );
}
