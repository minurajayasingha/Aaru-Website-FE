export type Residence = {
  slug: string;
  name: string;
  floorLabel: string;
  unitBadge: string;
  bedroomLabel: string;
  sizeLabel: string;
  priceLabel: string;
  rateLabel: string;
  unitsAvailableLabel: string;
  description: string;
  heroImage: { src: string; alt: string };
  layoutImage: { src: string; alt: string };
  amenities: string[];
  gallery: { src: string; alt: string }[];
};

export const residences: Residence[] = [
  {
    slug: "garden-condos",
    name: "Garden Condos",
    floorLabel: "Ground Floor",
    unitBadge: "3 Unit",
    bedroomLabel: "2 BD",
    sizeLabel: "+2,000 sqft",
    priceLabel: "740,000 USD",
    rateLabel: "350 USD / sqft",
    unitsAvailableLabel: "3 Units",
    description:
      "Three exclusive ground-floor lagoon residences designed for effortless living by the lagoon, with only 3 units available. Each home features private garden decks, private pools, and breathtaking sunset views over the water. Refined architecture blends seamlessly with lush surroundings, offering privacy, comfort, and a deep connection to the natural beauty of Arugam Bay.",
    heroImage: { src: "/images/residences/garden-condos-hero.jpg", alt: "Garden Condos at sunset with private pools" },
    layoutImage: { src: "/images/residences/garden-condos-layout.jpg", alt: "Garden Condos ground floor unit layout plan" },
    amenities: [
      "2 Bedrooms",
      "+2000 sqft",
      "Garden Deck",
      "Private Pool",
      "Sunset Lagoon Views",
      "En-suite Bathrooms",
      "Spacious Living Area",
      "Indoor / Outdoor Living",
      "Premium Finishes",
      "Access to Clubhouse",
    ],
    gallery: [
      { src: "/images/residences/garden-condos-1.jpg", alt: "Garden Condos poolside deck at sunset" },
      { src: "/images/residences/garden-condos-2.jpg", alt: "Lagoon view from Garden Condos" },
      { src: "/images/residences/garden-condos-3.jpg", alt: "Outdoor shower with tropical planting" },
      { src: "/images/residences/garden-condos-4.jpg", alt: "Garden Condos bedroom with lagoon view" },
    ],
  },
  {
    slug: "elevated-condos",
    name: "Elevated Condos",
    floorLabel: "1st & 2nd Floor",
    unitBadge: "16 Unit",
    bedroomLabel: "2 BD",
    sizeLabel: "1,600-1,800 sqft",
    priceLabel: "Price on request",
    rateLabel: "Price on request",
    unitsAvailableLabel: "16 Units",
    description:
      "Sixteen elevated residences across the first and second floors, framing panoramic lagoon views from private balconies. Designed for privacy and comfort with refined interiors and direct access to Aaru's shared clubhouse and amenities.",
    heroImage: { src: "/images/residences/elevated-condos-hero.jpg", alt: "Elevated Condos building exterior with pool" },
    layoutImage: { src: "/images/residences/elevated-condos-layout.jpg", alt: "Elevated Condos floor unit layout plan" },
    amenities: [
      "2 Bedrooms",
      "1,600-1,800 sqft",
      "Elevated Lagoon Views",
      "Private Balcony",
      "En-suite Bathrooms",
      "Spacious Living Area",
      "Premium Finishes",
      "Access to Clubhouse",
    ],
    gallery: [
      { src: "/images/residences/elevated-condos-1.jpg", alt: "Elevated Condos exterior at dusk" },
      { src: "/images/residences/elevated-condos-2.jpg", alt: "Balcony view from an Elevated Condo" },
    ],
  },
  {
    slug: "private-villas",
    name: "Private Villas",
    floorLabel: "Residences",
    unitBadge: "3 Unit",
    bedroomLabel: "4 BD",
    sizeLabel: "+2,000 sqft",
    priceLabel: "Price on request",
    rateLabel: "Price on request",
    unitsAvailableLabel: "3 Units",
    description:
      "Three fully private villas set among palm gardens, each with its own pool, garden deck, and four bedrooms of refined coastal living — the most exclusive way to call Aaru home.",
    heroImage: { src: "/images/residences/private-villas-hero.jpg", alt: "Private Villas with palm trees and pool" },
    layoutImage: { src: "/images/residences/private-villas-layout.jpg", alt: "Private Villas unit layout plan" },
    amenities: [
      "4 Bedrooms",
      "+2000 sqft",
      "Private Pool",
      "Garden Deck",
      "En-suite Bathrooms",
      "Spacious Living Area",
      "Premium Finishes",
      "Access to Clubhouse",
    ],
    gallery: [
      { src: "/images/residences/private-villas-1.jpg", alt: "Private Villas exterior with garden pool" },
    ],
  },
];

export function getResidenceBySlug(slug: string): Residence | undefined {
  return residences.find((r) => r.slug === slug);
}
