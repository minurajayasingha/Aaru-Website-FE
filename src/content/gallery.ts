export type GalleryImage = { src: string; alt: string; category: GalleryCategory };
export type GalleryCategory = "residential" | "interior" | "lifestyle" | "maps";

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: "residential", label: "Residential" },
  { id: "interior", label: "Interior" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "maps", label: "Maps & Plans" },
];

export const galleryImages: GalleryImage[] = [
  { src: "/images/gallery/residential-1.jpg", alt: "Aaru residences at sunset by the lagoon", category: "residential" },
  { src: "/images/gallery/residential-2.jpg", alt: "Lagoon reflecting palm trees at Aaru", category: "residential" },
  { src: "/images/gallery/interior-1.jpg", alt: "Outdoor shower with tropical planting", category: "interior" },
  { src: "/images/gallery/interior-2.jpg", alt: "Suite bedroom with lagoon view", category: "interior" },
  { src: "/images/gallery/lifestyle-1.jpg", alt: "Poolside daybed at sunset", category: "lifestyle" },
  { src: "/images/gallery/lifestyle-2.jpg", alt: "Signature restaurant terrace at dusk", category: "lifestyle" },
  { src: "/images/gallery/maps-1.jpg", alt: "Aaru ground floor site map", category: "maps" },
];
