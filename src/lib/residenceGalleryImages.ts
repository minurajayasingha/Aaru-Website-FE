import fs from "fs";
import path from "path";
import { imageSize } from "image-size";
import type { GalleryImage, GallerySection } from "@/content/residences";

/** A gallery-section image enriched with its real pixel dimensions, needed to size the lightbox without distorting it. */
export type GallerySectionImage = GalleryImage & { width: number; height: number };

export type EnrichedGallerySection = {
  heading: string;
  layout: "row" | "banner";
  images: GallerySectionImage[];
};

const DEFAULT_ASPECT = { width: 4, height: 3 };

function readImageDimensions(publicSrc: string): { width: number; height: number } {
  try {
    const filePath = path.join(process.cwd(), "public", publicSrc);
    const buffer = fs.readFileSync(filePath);
    const { width, height } = imageSize(buffer);
    return width && height ? { width, height } : DEFAULT_ASPECT;
  } catch {
    return DEFAULT_ASPECT;
  }
}

/**
 * residences.ts is imported by both server and client components (e.g. the
 * style guide), so it can't import `fs` itself. This reads each gallery
 * image's real dimensions at render time instead - only called from server
 * components (the residence detail page).
 */
export function enrichGallerySections(sections: GallerySection[]): EnrichedGallerySection[] {
  return sections.map((section) => ({
    ...section,
    images: section.images.map((image) => ({ ...image, ...readImageDimensions(image.src) })),
  }));
}
