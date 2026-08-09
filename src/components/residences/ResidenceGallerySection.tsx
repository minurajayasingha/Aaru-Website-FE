"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/ui/Lightbox";
import { cn } from "@/lib/cn";
import type { EnrichedGallerySection } from "@/lib/residenceGalleryImages";

export function ResidenceGallerySection({ section }: { section: EnrichedGallerySection }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const selectedImage = selectedIndex !== null ? section.images[selectedIndex] : null;

  // Which section is "Suit View" vs "Suit Room" isn't tied to `layout`
  // consistently across residences (e.g. Private Villas' Suit View is
  // "banner" while its Suit Room is "row"), so the bigger mobile crop is
  // keyed on the section name itself, not the layout type - otherwise this
  // enlarges whichever section happens to share a layout with the one
  // that's meant to change.
  const isSuitView = section.heading === "Suit View";

  function closeLightbox() {
    setSelectedIndex(null);
    lastTriggerRef.current?.focus();
  }

  // Wraps around at either end so the arrows never dead-end.
  function showPrev() {
    setSelectedIndex((index) => (index === null ? null : (index - 1 + section.images.length) % section.images.length));
  }
  function showNext() {
    setSelectedIndex((index) => (index === null ? null : (index + 1) % section.images.length));
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-subheading uppercase text-para-md text-brand-forest-700 pl-4">{section.heading}</h3>
      {section.layout === "row" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {section.images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={(event) => {
                lastTriggerRef.current = event.currentTarget;
                setSelectedIndex(index);
              }}
              className={cn(
                "relative cursor-zoom-in overflow-hidden rounded-card",
                isSuitView ? "aspect-[16/9] sm:aspect-[4/5]" : "aspect-[4/5]",
              )}
              aria-label={`View larger image: ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {section.images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={(event) => {
                lastTriggerRef.current = event.currentTarget;
                setSelectedIndex(index);
              }}
              className={cn(
                "relative cursor-zoom-in overflow-hidden rounded-card",
                isSuitView ? "aspect-[16/9] sm:aspect-[21/7]" : "aspect-[21/7]",
              )}
              aria-label={`View larger image: ${image.alt}`}
            >
              <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <Lightbox
        image={selectedImage}
        onClose={closeLightbox}
        onPrev={section.images.length > 1 ? showPrev : undefined}
        onNext={section.images.length > 1 ? showNext : undefined}
      />
    </div>
  );
}
