import type { GalleryImage } from "@/db/schema";
import type { GalleryCategory } from "@/content/gallery";

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

export function toAdminGalleryImages(rows: GalleryImage[]): AdminGalleryImage[] {
  return rows.map((row) => ({
    id: String(row.id),
    src: `/images/gallery/${row.category}/${row.filename}`,
    name: row.displayName,
    category: row.category,
    width: row.width,
    height: row.height,
    status: row.status,
  }));
}
