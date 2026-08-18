import { getActiveGalleryImages } from "@/db/queries/galleryImages";

export type GalleryCategory = "residential" | "interior" | "lifestyle" | "maps";

export type GalleryImage = { src: string; alt: string; width: number; height: number };

export type GalleryCategoryContent = {
  id: GalleryCategory;
  label: string;
  icon: string;
  images: GalleryImage[];
};

export const galleryCategories: { id: GalleryCategory; label: string; icon: string }[] = [
  { id: "residential", label: "Residential", icon: "/images/icons/gallery/residential.svg" },
  { id: "interior", label: "Interior", icon: "/images/icons/gallery/interior.svg" },
  { id: "lifestyle", label: "Lifestyle", icon: "/images/icons/gallery/lifestyle.svg" },
  { id: "maps", label: "Vicinity", icon: "/images/icons/gallery/maps.svg" },
];

export async function getGalleryCategories(): Promise<GalleryCategoryContent[]> {
  const activeImages = await getActiveGalleryImages();

  return galleryCategories.map((category) => ({
    ...category,
    images: activeImages
      .filter((image) => image.category === category.id)
      .map((image) => ({
        src: `/images/gallery/${image.category}/${image.filename}`,
        alt: `${image.displayName} — Aaru ${category.label} Gallery`,
        width: image.width,
        height: image.height,
      })),
  }));
}
