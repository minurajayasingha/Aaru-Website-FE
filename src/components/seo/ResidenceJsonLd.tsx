import { JsonLd } from "./JsonLd";
import type { Residence } from "@/content/residences";
import { siteConfig } from "@/content/site";

/**
 * Extracts the leading integer from a label like "2 BD" or "4 BD".
 * Returns undefined (rather than throwing) if no integer can be found.
 */
function parseRoomCount(bedroomLabel: string): number | undefined {
  const match = bedroomLabel.match(/\d+/);
  if (!match) return undefined;
  const value = Number.parseInt(match[0], 10);
  return Number.isFinite(value) ? value : undefined;
}

/**
 * Extracts a single numeric floor size (in sqft) from labels like
 * "+2,000 sqft". Returns undefined for ranges (e.g. "1,600-1,800 sqft")
 * or any label that doesn't cleanly resolve to a single number, since a
 * range can't be represented safely as a single QuantitativeValue.
 */
function parseSingleFloorSize(sizeLabel: string): number | undefined {
  if (/-/.test(sizeLabel)) return undefined;
  const match = sizeLabel.match(/[\d,]+/);
  if (!match) return undefined;
  const value = Number.parseInt(match[0].replace(/,/g, ""), 10);
  return Number.isFinite(value) ? value : undefined;
}

export function ResidenceJsonLd({ residence }: { residence: Residence }) {
  const numberOfRooms = parseRoomCount(residence.bedroomLabel);
  const floorSizeValue = parseSingleFloorSize(residence.sizeLabel);

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Accommodation",
        name: residence.name,
        description: residence.description,
        url: `${siteConfig.url}/residences/${residence.slug}`,
        image: `${siteConfig.url}${residence.heroImage.src}`,
        ...(numberOfRooms !== undefined ? { numberOfRooms } : {}),
        ...(floorSizeValue !== undefined
          ? {
              floorSize: {
                "@type": "QuantitativeValue",
                value: floorSizeValue,
                unitText: "sqft",
              },
            }
          : {}),
      }}
    />
  );
}
