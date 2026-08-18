import type { Metadata } from "next";
import { galleryCategories } from "@/content/gallery";
import { getAllGalleryImages } from "@/db/queries/galleryImages";
import { toAdminGalleryImages } from "@/content/admin/gallery";
import { GalleryView } from "@/components/admin/GalleryView";

export const metadata: Metadata = {
  title: "Gallery",
};

export default async function AdminGalleryPage() {
  const images = toAdminGalleryImages(await getAllGalleryImages());
  return <GalleryView initialImages={images} categories={galleryCategories} />;
}
