"use client";

import { useState } from "react";
import Image from "next/image";
import { Tabs } from "@/components/ui/Tabs";
import type { GalleryCategoryContent, GalleryCategory } from "@/content/gallery";

type GalleryGridProps = {
  categories: GalleryCategoryContent[];
};

export function GalleryGrid({ categories }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>(categories[0].id);
  const active = categories.find((category) => category.id === activeCategory) ?? categories[0];

  return (
    <div className="flex flex-col">
      <div className="bg-brand-forest-900 py-6">
        <Tabs
          tabs={categories.map((category) => ({ id: category.id, label: category.label, icon: category.icon }))}
          activeId={activeCategory}
          onChange={(id) => setActiveCategory(id as GalleryCategory)}
        />
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-section-s py-12 md:px-section-x lg:gap-12 lg:py-16">
        {active.sections.length === 0 && (
          <p className="font-body text-para-sm text-brand-forest-700">More photos coming soon.</p>
        )}
        {active.sections.map((section) => (
          <div key={section.slug} className="flex flex-col gap-4">
            {section.heading && (
              <h3 className="font-subheading uppercase text-para-xs text-black md:pl-6">
                {section.heading}
              </h3>
            )}
            <div className="flex flex-wrap gap-4 sm:gap-4">
              {section.images.map((image) => (
                <div
                  key={image.src}
                  style={{ aspectRatio: `${image.width} / ${image.height}` }}
                  className="relative h-[160px] grow overflow-hidden rounded-card sm:h-[180px] lg:h-[200px]"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
