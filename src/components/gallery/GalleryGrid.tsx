"use client";

import { useState } from "react";
import Image from "next/image";
import { Tabs } from "@/components/ui/Tabs";
import type { GalleryImage, GalleryCategory } from "@/content/gallery";

type GalleryGridProps = {
  images: GalleryImage[];
  categories: { id: GalleryCategory; label: string }[];
};

export function GalleryGrid({ images, categories }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>(categories[0].id);
  const visibleImages = images.filter((image) => image.category === activeCategory);

  return (
    <div className="flex flex-col gap-10">
      <div className="bg-brand-forest-800 py-8">
        <Tabs
          tabs={categories.map((category) => ({ id: category.id, label: category.label }))}
          activeId={activeCategory}
          onChange={(id) => setActiveCategory(id as GalleryCategory)}
        />
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 pb-24 md:grid-cols-3">
        {visibleImages.map((image) => (
          <div key={image.src} className="relative aspect-[4/3] overflow-hidden rounded-card">
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
