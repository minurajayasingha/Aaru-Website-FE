"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Tabs } from "@/components/ui/Tabs";
import { Lightbox } from "@/components/ui/Lightbox";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import type { GalleryCategoryContent, GalleryCategory, GalleryImage } from "@/content/gallery";

type GalleryGridProps = {
  categories: GalleryCategoryContent[];
};

export function GalleryGrid({ categories }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>(categories[0].id);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const active = categories.find((category) => category.id === activeCategory) ?? categories[0];

  function closeLightbox() {
    setSelectedImage(null);
    lastTriggerRef.current?.focus();
  }

  // A very wide/panoramic photo (e.g. a 3.6:1 banner shot) would get
  // squeezed to a sliver if it had to fit a single masonry column, so it
  // breaks out of the column flow and spans the full row width instead —
  // shown at a size that actually does it justice.
  function isWide(image: GalleryImage) {
    return image.width / image.height >= 1.8;
  }

  return (
    <div className="flex flex-col">
      <div className="bg-brand-forest-900 py-6">
        <Tabs
          tabs={categories.map((category) => ({ id: category.id, label: category.label, icon: category.icon }))}
          activeId={activeCategory}
          onChange={(id) => setActiveCategory(id as GalleryCategory)}
        />
      </div>

      <Container className="py-12 lg:py-16">
        {active.images.length === 0 ? (
          <p className="font-body text-para-sm text-brand-forest-700">More photos coming soon.</p>
        ) : (
          // A Pinterest-style masonry via CSS columns, rather than a
          // justified grid — every column fills top-down independently, so
          // photo heights stagger naturally instead of lining up into neat
          // shared-height rows. Each image keeps its own real aspect ratio
          // (width/height read off the file on disk) since it's sized
          // intrinsically (w-full, h-auto) rather than cropped into a fill box.
          <div className="columns-2 gap-2 sm:columns-3 lg:columns-4">
            {active.images.map((image) => {
              const wide = isWide(image);
              return (
                <button
                  key={image.src}
                  type="button"
                  onClick={(event) => {
                    lastTriggerRef.current = event.currentTarget;
                    setSelectedImage(image);
                  }}
                  className={cn(
                    "mb-2 block w-full break-inside-avoid cursor-zoom-in overflow-hidden rounded-button",
                    wide && "[column-span:all]",
                  )}
                  aria-label={`View larger image: ${image.alt}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes={wide ? "100vw" : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"}
                    className="h-auto w-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        )}
      </Container>

      <Lightbox image={selectedImage} onClose={closeLightbox} />
    </div>
  );
}
