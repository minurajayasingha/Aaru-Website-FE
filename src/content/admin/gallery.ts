import type { GalleryCategory, GalleryCategoryContent } from "@/content/gallery";

export type AdminGalleryStatus = "active" | "inactive";

export type AdminGalleryImage = {
  id: string;
  src: string;
  name: string;
  category: GalleryCategory;
  width: number;
  height: number;
  status: AdminGalleryStatus;
};

/** Alt text is "{Name} — Aaru {Category} Gallery" (or just the suffix if the file had no usable name). */
function deriveName(alt: string): string {
  const [name] = alt.split(" — ");
  return name && name.trim().length > 0 ? name.trim() : "Untitled";
}

export function toAdminGalleryImages(categories: GalleryCategoryContent[]): AdminGalleryImage[] {
  return categories.flatMap((category) =>
    category.images.map((image) => ({
      id: image.src,
      src: image.src,
      name: deriveName(image.alt),
      category: category.id,
      width: image.width,
      height: image.height,
      status: "active" as const,
    })),
  );
}
