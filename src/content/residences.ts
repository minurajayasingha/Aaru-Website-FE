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
  /** Separate, art-directed crop of heroImage shown below the `md`
   * breakpoint instead of just object-cover'ing the desktop photo down. */
  heroImageMobile: GalleryImage;
  /** Image shown on the residence cards (home page row + /residences listing). */
  cardImage: GalleryImage;
  /** Thumbnail-switchable floor plan images shown in the Unit Layout section. */
  layoutGallery: GalleryImage[];
  amenities: string[];
  /** Heading text for the "Unit Amenities" section on this residence's detail page. Customizable per residence. */
  amenitiesSectionTitle: string;
  /** Extra amenities (beyond bed/size) shown as icon+label on the residence card. Pick any count from `amenities`. */
  cardAmenities: string[];
  gallerySections: GallerySection[];
  /** Slugs, in display order, for the "Other Residences" cards shown at the bottom of this residence's detail page. */
  otherResidencesOrder: string[];
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
    heroImageMobile: { src: "/images/residences/garden-condos/hero-mobile.jpg", alt: "Garden Condos at sunset with private pools" },
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
    amenitiesSectionTitle: "Unit Amenities",
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
    otherResidencesOrder: ["condos", "private-villas"],
  },
  {
    slug: "condos",
    name: "Condos",
    floorLabel: "1st & 2nd Floor",
    unitBadge: "16 Unit",
    bedroomLabel: "2 BD",
    sizeLabel: "1,600-1,800 sqft",
    priceLabel: "556,000 USD",
    rateLabel: "Price on request",
    unitsAvailableLabel: "16 Units",
    description:
      "Sixteen residences across the first and second floors, framing panoramic lagoon views from private balconies. Designed for privacy and comfort with refined interiors and direct access to Aaru's shared clubhouse and amenities.",
    heroImage: { src: "/images/residences/condos/hero.jpg", alt: "Condos building exterior with pool" },
    heroImageMobile: { src: "/images/residences/condos/hero-mobile.jpg", alt: "Condos building exterior with pool" },
    cardImage: { src: "/images/residences/condos/card.jpg", alt: "Condos building exterior with pool" },
    layoutGallery: [
      { src: "/images/residences/condos/layout-1.jpg", alt: "Condos floor unit layout plan" },
      { src: "/images/residences/condos/layout-2.jpg", alt: "Condos unit layout, alternate view" },
      { src: "/images/residences/condos/layout-3.jpg", alt: "Condos unit layout, alternate view" },
      { src: "/images/residences/condos/layout-4.jpg", alt: "Condos unit layout, alternate view" },
    ],
    amenities: [
      "2 Bedrooms",
      "1,600-1,800 sqft",
      "Lagoon Views",
      "En-suite Bathrooms",
      "Spacious Living Area",
      "Premium Finishes",
      "Access to Clubhouse",      
      "Spacious Living Area",
      "Indoor / Outdoor Living",
      "Premium Finishes",
    ],
    amenitiesSectionTitle: "Unit Amenities",
    cardAmenities: ["bed", "size", "Lagoon Views"],
    gallerySections: [
      {
        heading: "Suit View",
        layout: "banner",
        images: [
          { src: "/images/residences/condos/gallery-suit-view-1.jpg", alt: "Condos exterior at dusk" },
          { src: "/images/residences/condos/gallery-suit-view-2.jpg", alt: "Balcony view from an Condo" },
          { src: "/images/residences/condos/gallery-suit-view-3.jpg", alt: "Balcony view from an Condo" },
        ],
      },
    ],
    otherResidencesOrder: ["garden-condos", "private-villas"],
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
    heroImageMobile: { src: "/images/residences/private-villas/hero-mobile.jpg", alt: "Private Villas with palm trees and pool" },
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
      "Spacious Living Area",
      "Indoor / Outdoor Living",
    ],
    amenitiesSectionTitle: "Rooftop Deck",
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
    otherResidencesOrder: ["garden-condos", "condos"],
  },
];

export function getResidenceBySlug(slug: string): Residence | undefined {
  return residences.find((r) => r.slug === slug);
}
