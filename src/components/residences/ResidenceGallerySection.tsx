import Image from "next/image";
import type { GallerySection } from "@/content/residences";

export function ResidenceGallerySection({ section }: { section: GallerySection }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-subheading uppercase text-para-md text-brand-forest-700 pl-4">{section.heading}</h3>
      {section.layout === "row" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {section.images.map((image) => (
            <div key={image.src} className="relative aspect-[4/5] overflow-hidden rounded-card">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {section.images.map((image) => (
            <div key={image.src} className="relative aspect-[21/7] overflow-hidden rounded-card">
              <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
