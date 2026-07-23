import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/metadata";
import { getGalleryImages, galleryCategories } from "@/content/gallery";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description: "Discover Aaru through stunning visual stories: residential, interior, lifestyle, and maps & plans.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <section className="relative flex h-[50vh] items-center justify-center text-center text-brand-cream">
        <Image
          src="/images/hero/gallery.jpg"
          alt="Aerial view of Aaru's residences beside the beach at sunset"
          fill
          priority
          className="object-cover"
        />
        <h1 className="relative z-10 font-display text-4xl md:text-6xl">Gallery</h1>
      </section>
      <GalleryGrid images={getGalleryImages()} categories={galleryCategories} />
    </>
  );
}
