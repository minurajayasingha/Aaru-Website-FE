"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

type UnitLayoutGalleryProps = {
  images: { src: string; alt: string }[];
};

export function UnitLayoutGallery({ images }: UnitLayoutGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  return (
    <div className="flex gap-3 w-full lg:w-6/12 ">
      <div className="flex flex-col gap-2">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show layout image ${index + 1}`}
            aria-current={index === activeIndex}
            className={cn(
              "relative h-12 w-12 shrink-0 overflow-hidden rounded-input border-2 bg-white sm:h-16 sm:w-16",
              index === activeIndex ? "border-brand-gold" : "border-transparent",
            )}
          >
            <Image src={image.src} alt="" fill className="object-contain" />
          </button>
        ))}
      </div>
      <div className="relative aspect-[5/4] flex-1 overflow-hidden rounded-card border border-brand-forest-100 bg-white">
        <AnimatePresence initial={false}>
          {active && (
            <motion.div
              key={active.src}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image src={active.src} alt={active.alt} fill className="object-contain" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
