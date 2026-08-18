import type { Metadata } from "next";
import { Marcellus_SC, Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { AppChrome } from "@/components/layout/AppChrome";
import { siteConfig } from "@/content/site";
import { getSiteSettings } from "@/db/queries/siteSettings";

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { contactPhone, contactEmail } = await getSiteSettings();

  return (
    <html lang="en" className={`${heading.variable} ${subheading.variable} ${body.variable}`} suppressHydrationWarning>
      <body className="font-body" suppressHydrationWarning>
        <AppChrome contactPhone={contactPhone} contactEmail={contactEmail}>
          {children}
        </AppChrome>
      </body>
    </html>
  );
}
