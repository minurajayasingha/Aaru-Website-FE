"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { FooterSection } from "./FooterSection";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <SmoothScroll />
      <OrganizationJsonLd />
      <Navbar />
      <main>{children}</main>
      <FooterSection />
    </>
  );
}
