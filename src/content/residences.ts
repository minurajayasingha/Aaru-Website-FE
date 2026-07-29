export type GalleryImage = { src: string; alt: string };

export type GallerySection = {
  heading: string;
  /** "row" lays images side by side sharing the width; "banner" stacks each image full-width. */
  layout: "row" | "banner";
  images: GalleryImage[];
};

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
  /** Big banner image on the residence detail page. */
  heroImage: GalleryImage;
  /** Image shown on the residence cards (home page row + /residences listing). */
  cardImage: GalleryImage;
  /** Thumbnail-switchable floor plan images shown in the Unit Layout section. */
  layoutGallery: GalleryImage[];
  amenities: string[];
  /** Extra amenities (beyond bed/size) shown as icon+label on the residence card. Pick any count from `amenities`. */
  cardAmenities: string[];
  gallerySections: GallerySection[];
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
    heroImage: { src: "/images/residences/garden-condos/hero.jpg", alt: "Garden Condos at sunset with private pools" },
    cardImage: { src: "/images/residences/garden-condos/card.jpg", alt: "Garden Condos at sunset with private pools" },
    layoutGallery: [
      { src: "/images/residences/garden-condos/layout-1.jpg", alt: "Garden Condos ground floor unit layout plan" },
      { src: "/images/residences/garden-condos/layout-2.jpg", alt: "Garden Condos unit layout, alternate view" },
      { src: "/images/residences/garden-condos/layout-3.jpg", alt: "Garden Condos unit layout, alternate view" },
      { src: "/images/residences/garden-condos/layout-4.jpg", alt: "Garden Condos unit layout, alternate view" },
    ],
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
    cardAmenities: ["bed", "size", "Access to Clubhouse"],
    gallerySections: [
      {
        heading: "Suit View",
        layout: "row",
        images: [
          { src: "/images/residences/garden-condos/gallery-suit-view-1.jpg", alt: "Garden Condos poolside deck at sunset" },
          { src: "/images/residences/garden-condos/gallery-suit-view-2.jpg", alt: "Lagoon view from Garden Condos" },
          { src: "/images/residences/garden-condos/gallery-suit-view-3.jpg", alt: "Outdoor shower with tropical planting" },
        ],
      },
      {
        heading: "Suit Room",
        layout: "banner",
        images: [
          { src: "/images/residences/garden-condos/gallery-suit-room-1.jpg", alt: "Garden Condos bedroom with lagoon view" },
        ],
      },
    ],
  },
  {
    slug: "elevated-condos",
    name: "Elevated Condos",
    floorLabel: "1st & 2nd Floor",
    unitBadge: "16 Unit",
    bedroomLabel: "2 BD",
    sizeLabel: "1,600-1,800 sqft",
    priceLabel: "556,000 USD",
    rateLabel: "Price on request",
    unitsAvailableLabel: "16 Units",
    description:
      "Sixteen elevated residences across the first and second floors, framing panoramic lagoon views from private balconies. Designed for privacy and comfort with refined interiors and direct access to Aaru's shared clubhouse and amenities.",
    heroImage: { src: "/images/residences/elevated-condos/hero.jpg", alt: "Elevated Condos building exterior with pool" },
    cardImage: { src: "/images/residences/elevated-condos/card.jpg", alt: "Elevated Condos building exterior with pool" },
    layoutGallery: [
      { src: "/images/residences/elevated-condos/layout-1.jpg", alt: "Elevated Condos floor unit layout plan" },
      { src: "/images/residences/elevated-condos/layout-2.jpg", alt: "Elevated Condos unit layout, alternate view" },
      { src: "/images/residences/elevated-condos/layout-3.jpg", alt: "Elevated Condos unit layout, alternate view" },
      { src: "/images/residences/elevated-condos/layout-4.jpg", alt: "Elevated Condos unit layout, alternate view" },
    ],
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
    cardAmenities: ["bed", "size", "Elevated Lagoon Views"],
    gallerySections: [
      {
        heading: "Suit View",
        layout: "banner",
        images: [
          { src: "/images/residences/elevated-condos/gallery-suit-view-1.jpg", alt: "Elevated Condos exterior at dusk" },
          { src: "/images/residences/elevated-condos/gallery-suit-view-2.jpg", alt: "Balcony view from an Elevated Condo" },
          { src: "/images/residences/elevated-condos/gallery-suit-view-3.jpg", alt: "Balcony view from an Elevated Condo" },
        ],
      },
    ],
  },
  {
    slug: "private-villas",
    name: "Private Villas",
    floorLabel: "Residences",
    unitBadge: "3 Unit",
    bedroomLabel: "4 BD",
    sizeLabel: "5,700+ sqft",
    priceLabel: "1,734,000 USD",
    rateLabel: "Price on request",
    unitsAvailableLabel: "3 Units",
    description:
      "Three fully private villas set among palm gardens, each with its own pool, garden deck, and four bedrooms of refined coastal living — the most exclusive way to call Aaru home.",
    heroImage: { src: "/images/residences/private-villas/hero.jpg", alt: "Private Villas with palm trees and pool" },
    cardImage: { src: "/images/residences/private-villas/card.jpg", alt: "Private Villas with palm trees and pool" },
    layoutGallery: [
      { src: "/images/residences/private-villas/layout-1.jpg", alt: "Private Villas unit layout plan" },
      { src: "/images/residences/private-villas/layout-2.jpg", alt: "Private Villas unit layout, alternate view" },
      { src: "/images/residences/private-villas/layout-3.jpg", alt: "Private Villas unit layout, alternate view" },
      { src: "/images/residences/private-villas/layout-4.jpg", alt: "Private Villas unit layout, alternate view" },
    ],
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
    cardAmenities: ["bed", "size", "Private Pool", "Garden Deck"],
    gallerySections: [
      {
        heading: "Suit View",
        layout: "banner",
        images: [
          { src: "/images/residences/private-villas/gallery-suit-view-1.jpg", alt: "Private Villas exterior with garden pool" },
          { src: "/images/residences/private-villas/gallery-suit-view-2.jpg", alt: "Private Villas living room with lagoon view" },
          { src: "/images/residences/private-villas/gallery-suit-view-3.jpg", alt: "Private Villas pool deck at sunset" },
        ],
      },
      {
        heading: "Suit Room",
        layout: "row",
        images: [
          { src: "/images/residences/private-villas/gallery-suit-room-1.jpg", alt: "Private Villas bedroom" },
          { src: "/images/residences/private-villas/gallery-suit-room-2.jpg", alt: "Private Villas dining chair detail" },
          { src: "/images/residences/private-villas/gallery-suit-room-3.jpg", alt: "Private Villas bathroom vanity" },
        ],
      },
    ],
  },
];

export function getResidenceBySlug(slug: string): Residence | undefined {
  return residences.find((r) => r.slug === slug);
}
