import { JsonLd } from "./JsonLd";
import { siteConfig } from "@/content/site";

interface OrganizationJsonLdProps {
  contactPhone: string;
  contactEmail: string;
}

export function OrganizationJsonLd({ contactPhone, contactEmail }: OrganizationJsonLdProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
        email: contactEmail,
        telephone: contactPhone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Arugam Bay",
          addressCountry: "LK",
        },
      }}
    />
  );
}
