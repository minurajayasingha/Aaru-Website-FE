"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Lightbox, type LightboxImage } from "@/components/ui/Lightbox";
import type { EnrichedGallerySection } from "@/lib/residenceGalleryImages";

export function ResidenceGallerySection({ section }: { section: EnrichedGallerySection }) {
  const [selectedImage, setSelectedImage] = useState<LightboxImage | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  function closeLightbox() {
    setSelectedImage(null);
    lastTriggerRef.current?.focus();
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-subheading uppercase text-para-md text-brand-forest-700 pl-4">{section.heading}</h3>
      {section.layout === "row" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {section.images.map((image) => (
            <button
              key={image.src}
              type="button"
              onClick={(event) => {
                lastTriggerRef.current = event.currentTarget;
                setSelectedImage(image);
              }}
              className="relative aspect-[4/5] cursor-zoom-in overflow-hidden rounded-card"
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
          {section.images.map((image) => (
            <button
              key={image.src}
              type="button"
              onClick={(event) => {
                lastTriggerRef.current = event.currentTarget;
                setSelectedImage(image);
              }}
              className="relative aspect-[21/7] cursor-zoom-in overflow-hidden rounded-card"
              aria-label={`View larger image: ${image.alt}`}
            >
              <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <Lightbox image={selectedImage} onClose={closeLightbox} />
    </div>
  );
}
