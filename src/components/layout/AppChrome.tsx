"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { FooterSection } from "./FooterSection";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

interface AppChromeProps {
  children: React.ReactNode;
  contactPhone: string;
  contactEmail: string;
}

export function AppChrome({ children, contactPhone, contactEmail }: AppChromeProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <SmoothScroll />
      <OrganizationJsonLd contactPhone={contactPhone} contactEmail={contactEmail} />
      <Navbar contactPhone={contactPhone} />
      <main>{children}</main>
      <FooterSection contactPhone={contactPhone} contactEmail={contactEmail} />
    </>
  );
}
