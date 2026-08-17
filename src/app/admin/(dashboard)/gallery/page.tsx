import type { Metadata } from "next";
import { galleryCategories, getGalleryCategories } from "@/content/gallery";
import { toAdminGalleryImages } from "@/content/admin/gallery";
import { GalleryView } from "@/components/admin/GalleryView";

export const metadata: Metadata = {
  title: "Gallery",
};

export default function AdminGalleryPage() {
  const images = toAdminGalleryImages(getGalleryCategories());
  return <GalleryView initialImages={images} categories={galleryCategories} />;
}
