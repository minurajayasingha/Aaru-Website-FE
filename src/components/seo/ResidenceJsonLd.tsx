import { JsonLd } from "./JsonLd";
import type { Residence } from "@/content/residences";
import { siteConfig } from "@/content/site";

export function ResidenceJsonLd({ residence }: { residence: Residence }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Residence",
        name: residence.name,
        description: residence.description,
        url: `${siteConfig.url}/residences/${residence.slug}`,
        image: `${siteConfig.url}${residence.heroImage.src}`,
        numberOfRooms: residence.bedroomLabel,
        floorSize: {
          "@type": "QuantitativeValue",
          value: residence.sizeLabel,
        },
      }}
    />
  );
}
