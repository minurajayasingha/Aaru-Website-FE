import { JsonLd } from "./JsonLd";
import { siteConfig } from "@/content/site";

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.contactEmail,
        telephone: siteConfig.contactPhone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Arugam Bay",
          addressCountry: "LK",
        },
      }}
    />
  );
}
