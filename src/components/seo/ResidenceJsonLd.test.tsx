import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ResidenceJsonLd } from "./ResidenceJsonLd";
import type { Residence } from "@/content/residences";

const baseResidence: Residence = {
  slug: "garden-condos",
  name: "Garden Condos",
  floorLabel: "Ground Floor",
  unitBadge: "3 Unit",
  bedroomLabel: "2 BD",
  sizeLabel: "+2,000 sqft",
  priceLabel: "740,000 USD",
  rateLabel: "350 USD / sqft",
  unitsAvailableLabel: "3 Units",
  description: "Three exclusive ground-floor lagoon residences.",
  heroImage: { src: "/images/residences/garden-condos/hero.jpg", alt: "Garden Condos hero" },
  heroImageMobile: { src: "/images/residences/garden-condos/hero-mobile.jpg", alt: "Garden Condos hero" },
  cardImage: { src: "/images/residences/garden-condos/card.jpg", alt: "Garden Condos hero" },
  layoutGallery: [{ src: "/images/residences/garden-condos/layout-1.jpg", alt: "Garden Condos layout" }],
  amenities: ["2 Bedrooms"],
  amenitiesSectionTitle: "Unit Amenities",
  cardAmenities: [],
  gallerySections: [],
  otherResidencesOrder: [],
};

function renderJsonLd(residence: Residence) {
  const { container } = render(<ResidenceJsonLd residence={residence} />);
  const script = container.querySelector('script[type="application/ld+json"]');
  expect(script).not.toBeNull();
  return JSON.parse(script!.innerHTML);
}

describe("ResidenceJsonLd", () => {
  it("emits a valid Accommodation type with numeric numberOfRooms and floorSize for a single-number size", () => {
    const data = renderJsonLd(baseResidence);

    expect(data["@type"]).toBe("Accommodation");
    expect(data.numberOfRooms).toBe(2);
    expect(data.floorSize).toEqual({
      "@type": "QuantitativeValue",
      value: 2000,
      unitText: "sqft",
    });
  });

  it("omits floorSize (without throwing) when the size label is a range", () => {
    const rangeResidence: Residence = {
      ...baseResidence,
      slug: "condos",
      name: "Condos",
      bedroomLabel: "2 BD",
      sizeLabel: "1,600-1,800 sqft",
    };

    const data = renderJsonLd(rangeResidence);

    expect(data["@type"]).toBe("Accommodation");
    expect(data.numberOfRooms).toBe(2);
    expect(data.floorSize).toBeUndefined();
  });
});
