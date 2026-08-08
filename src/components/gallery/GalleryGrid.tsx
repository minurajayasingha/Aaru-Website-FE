"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Tabs } from "@/components/ui/Tabs";
import { Lightbox } from "@/components/ui/Lightbox";
import { Container } from "@/components/ui/Container";
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
          // Each image keeps its own real aspect ratio (via inline
          // aspectRatio, from the width/height read off the file on disk) at
          // a fixed row height, and flex-wrap lets it grow to fill the row —
          // landscape photos end up wide, portrait/square ones stay narrow,
          // instead of every photo being forced into the same box shape.
          <div className="flex flex-wrap gap-4">
            {active.images.map((image) => (
              <button
                key={image.src}
                type="button"
                onClick={(event) => {
                  lastTriggerRef.current = event.currentTarget;
                  setSelectedImage(image);
                }}
                style={{ aspectRatio: `${image.width} / ${image.height}` }}
                className="relative h-[160px] grow cursor-zoom-in overflow-hidden rounded-card sm:h-[180px] lg:h-[200px]"
                aria-label={`View larger image: ${image.alt}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </Container>

      <Lightbox image={selectedImage} onClose={closeLightbox} />
    </div>
  );
}
