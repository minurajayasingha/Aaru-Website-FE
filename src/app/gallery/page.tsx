import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { getGalleryCategories } from "@/content/gallery";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description: "Discover Aaru through stunning visual stories: residential, interior and lifestyle.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Gallery"
        subtitle="Discover Aaru through stunning visual stories"
        imageSrc="/images/hero/gallery.png"
        mobileImageSrc="/images/hero/mobile/gallery.jpg"
        imageAlt="Aerial view of Aaru's residences beside the beach at sunset"
        height="lg"
      />
      <Reveal once={false}>
        <GalleryGrid categories={getGalleryCategories()} />
      </Reveal>
    </>
  );
}
