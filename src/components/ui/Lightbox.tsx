"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

export type LightboxImage = { src: string; alt: string; width: number; height: number };

type LightboxProps = {
  image: LightboxImage | null;
  onClose: () => void;
  /** When given, shows a left/right arrow to step to the neighboring image without closing. */
  onPrev?: () => void;
  onNext?: () => void;
};

export function Lightbox({ image, onClose, onPrev, onNext }: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!image) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev?.();
      if (event.key === "ArrowRight") onNext?.();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [image, onClose, onPrev, onNext]);

  if (!mounted) return null;

  // Portalled straight to <body> so this is never affected by an ancestor's
  // CSS - a `will-change: transform` (or an actual transform) anywhere
  // above it in the tree would otherwise make that ancestor the containing
  // block for this "fixed" overlay instead of the real viewport.
  return createPortal(
    <AnimatePresence>
      {image && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          className={cn(
            "fixed inset-0 z-[100] flex items-center justify-center bg-brand-forest-900/70 backdrop-blur-xl",
            // Landscape photos are width-bound on a narrow phone screen - the
            // generous p-6/p-10 backdrop padding was eating into the little
            // vertical room they had left, so it shrinks for them to let the
            // image itself take up more of the screen.
            image.width >= image.height ? "p-3 sm:p-6" : "p-6 sm:p-10",
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={onClose}
        >
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="96vw"
              priority
              className={cn(
                "h-auto w-auto rounded-card object-contain shadow-card",
                image.width >= image.height ? "max-h-[92vh] max-w-[96vw]" : "max-h-[85vh] max-w-[90vw]",
              )}
            />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close image"
              className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-forest-900 shadow-card transition-transform duration-200 hover:scale-105 hover:bg-brand-cream-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
            >
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4">
                <path
                  d="M2 2l12 12M14 2L2 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </motion.div>

          {onPrev && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onPrev();
              }}
              aria-label="Previous image"
              className="fixed left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-forest-900 shadow-card transition-transform duration-200 hover:scale-105 hover:bg-brand-cream-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 sm:left-6"
            >
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4">
                <path
                  d="M10 2L4 8l6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          {onNext && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onNext();
              }}
              aria-label="Next image"
              className="fixed right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-forest-900 shadow-card transition-transform duration-200 hover:scale-105 hover:bg-brand-cream-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 sm:right-6"
            >
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4">
                <path
                  d="M6 2l6 6-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
